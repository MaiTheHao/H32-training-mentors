const sheetId = '1jHb_4iIWiIpnU1polZ7yXT7nBk3lBL6WHbTp6LqH9qo';
const gid = '0';

const buildSheetUrl = (sheetId, gid) => `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;

const getData = async () => {
	try {
		const url = buildSheetUrl(sheetId, gid);
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			throw new Error('Lỗi khi lấy dữ liệu từ Google Sheet. Vui lòng kiểm tra quyền chia sẻ công khai.');
		}

		return response;
	} catch (error) {
		console.error('Có lỗi xảy ra:', error);
		throw error;
	}
};

export { getData };
