import { FIELD_MAPPING } from './const.js';

/**
 * Phân tích phản hồi từ Google Visualization API thành mảng đối tượng sinh viên.
 * @param {Response} response - Đối tượng Response từ fetch
 * @returns {Promise<Array>} Mảng các đối tượng sinh viên đã được ánh xạ
 * @throws {Error} Nếu không thể phân tích dữ liệu
 */
export async function parseresponseToObject(response) {
	const text = await response.text();

	const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?/);
	if (!jsonMatch?.[1]) {
		throw new Error('Không thể phân tích dữ liệu từ Google Sheet.');
	}

	try {
		const data = JSON.parse(jsonMatch[1]);
		return parseAndMapTable(data);
	} catch (error) {
		throw new Error('Dữ liệu JSON không hợp lệ.');
	}
}

/**
 * Chuyển đổi dữ liệu từ Google Visualization API thành mảng đối tượng.
 * @param {Object} json - Dữ liệu JSON từ Google Visualization API
 * @returns {Array<Object>} Mảng các đối tượng sinh viên với tên trường đã ánh xạ
 * @throws {Error} Nếu dữ liệu không hợp lệ
 */
export function parseAndMapTable(json) {
	if (!json?.table?.cols || !json?.table?.rows) {
		throw new Error('Dữ liệu không hợp lệ.');
	}

	const cols = json.table.cols.map((col) => col.label);
	const rows = json.table.rows;

	return rows.map((row) => {
		const obj = {};
		row.c.forEach((cell, idx) => {
			const colLabel = cols[idx]?.toLowerCase().trim();
			if (colLabel && FIELD_MAPPING[colLabel]) {
				obj[FIELD_MAPPING[colLabel].field] = cell?.v ?? null;
			}
		});
		return obj;
	});
}
