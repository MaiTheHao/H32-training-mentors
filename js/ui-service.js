import { FIELD_MAPPING } from './const.js';

function renderStudents(students) {
	const studentContainer = document.getElementById('student-data');
	if (!studentContainer) {
		console.error('Element with id "student-data" not found');
		return;
	}

	// Clear the loading animation
	studentContainer.innerHTML = '';

	const columns = Object.values(FIELD_MAPPING);

	// Create table container with modern styling
	const tableContainer = document.createElement('div');
	tableContainer.className = 'table-container';

	const table = document.createElement('table');
	table.className = 'data-table';

	// Create table header
	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');
	columns.forEach((col) => {
		const th = document.createElement('th');
		th.textContent = col.field;
		headerRow.appendChild(th);
	});
	thead.appendChild(headerRow);
	table.appendChild(thead);

	// Create table body
	const tbody = document.createElement('tbody');
	students.forEach((student) => {
		const row = document.createElement('tr');

		columns.forEach((col) => {
			const td = document.createElement('td');
			const value = student[col.field];

			if (col.isArray && typeof value === 'string') {
				td.innerHTML = value
					.split(', ')
					.map((val) => `<span class="tag">${val}</span>`)
					.join(' ');
			} else {
				td.textContent = value ?? '';
			}

			row.appendChild(td);
		});

		tbody.appendChild(row);
	});

	table.appendChild(tbody);
	tableContainer.appendChild(table);
	studentContainer.appendChild(tableContainer);

	// Update stats
	updateStats(students.length);
	updateTimestamp();
}

function updateStats(totalMembers) {
	const totalMembersElement = document.getElementById('total-members');
	if (totalMembersElement) {
		totalMembersElement.textContent = totalMembers;
	}
}

function updateTimestamp() {
	const timestampElement = document.getElementById('last-update');
	if (timestampElement) {
		const now = new Date();
		const timeString = now.toLocaleTimeString('vi-VN', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
		timestampElement.textContent = timeString;
	}
}

setInterval(updateTimestamp, 1000);

export { renderStudents };
