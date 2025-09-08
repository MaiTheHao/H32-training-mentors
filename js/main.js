import { getData } from './api-service.js';
import { parseresponseToObject } from './data-parser.js';
import { renderStudents } from './ui-service.js';

let timeoutId = null;
let isFetching = false;

document.addEventListener('DOMContentLoaded', () => {
	initApp();
});

document.addEventListener('visibilitychange', () => {
	if (document.hidden) {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	} else {
		if (!timeoutId && !isFetching) {
			fetchDataLoop();
		}
	}
});

function initApp() {
	fetchDataLoop();
}

async function fetchDataLoop() {
	if (isFetching) return;
	isFetching = true;
	try {
		const response = await getData();
		const students = await parseresponseToObject(response);
		renderStudents(students);
	} catch (error) {
		console.error('Lỗi khi tải dữ liệu:', error);
	} finally {
		isFetching = false;
		timeoutId = setTimeout(fetchDataLoop, 5000);
	}
}
