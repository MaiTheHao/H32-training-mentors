import { getData } from './api-service.js';
import { parseresponseToObject } from './data-parser.js';
import { renderStudents } from './ui-service.js';
let intervalId = null;
document.addEventListener('DOMContentLoaded', () => {
	initApp();
});

document.addEventListener('visibilitychange', () => {
	if (document.hidden) {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	} else {
		if (!intervalId) {
			fetchDataWithRetry();
		}
	}
});

function initApp() {
	fetchDataWithRetry();
}

async function fetchDataWithRetry() {
	try {
		const response = await getData();
		const students = await parseresponseToObject(response);
		renderStudents(students);
	} catch (error) {
		console.error('Lỗi khi tải dữ liệu:', error);
		setTimeout(fetchDataWithRetry, 5000);
	} finally {
		intervalId = setInterval(fetchDataWithRetry, 5000);
	}
}
