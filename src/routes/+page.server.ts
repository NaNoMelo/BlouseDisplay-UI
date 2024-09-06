import type { Cookies } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import mqtt from 'mqtt';
import { MQTT_HOST, MQTT_PORT, MQTT_USER, MQTT_PASS, TIMEOUT } from '$env/static/private';

const mqttClient = mqtt.connect(`${MQTT_HOST}:${MQTT_PORT}`, {
	username: MQTT_USER,
	password: MQTT_PASS
});
mqttClient.on('error', (e) => {
	console.log(e);
});
mqttClient.on('connect', () => {
	mqttClient.subscribe('blouse/leds/#', (err) => {
		if (err) {
			console.log(err);
		}
	});
	console.log('Connected to MQTT');
});

const grid: string[][] = Array.from({ length: 32 }, () => Array(16).fill('#000000'));
mqttClient.on('message', (topic, message) => {
	if (!topic.startsWith('blouse/leds/')) return;
	const [, , xStr, yStr] = topic.split('/');

	const x = Number(xStr);
	const y = Number(yStr);

	if (isNaN(x) || isNaN(y)) {
		console.error('Invalid topic', topic);
		return;
	}

	console.log(x, y, message.toString());
	grid[x][y] = message.toString();
});

export const load = async ({ cookies }: { cookies: Cookies }) => {
	const timeout = cookies.get('timeout');
	if (!timeout) {
		cookies.set('timeout', '0', { path: '/' });
	}
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return {
		lastPixel: Number(cookies.get('timeout')) || 0,
		grid: grid,
		timeout: Number(TIMEOUT)
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		let timeout = cookies.get('timeout');
		if (!timeout) {
			cookies.set('timeout', '0', { path: '/' });
			timeout = '0';
		}
		if (Number(timeout) + Number(TIMEOUT) < Date.now()) {
			const data = await request.formData();
			console.log(data);
			const { x, y, hex } = Object.fromEntries(data);
			mqttClient.publish(`blouse/leds/${x}/${y}`, hex.toString() || '#000000', { retain: true });

			cookies.set('timeout', Date.now().toString(), { path: '/' });
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		return {
			lastPixel: Number(cookies.get('timeout')) || 0,
			grid: grid,
			timeout: Number(TIMEOUT)
		};
	}
};
