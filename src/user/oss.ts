import multer from 'multer';
import * as fs from 'node:fs';

// oss = object storage service
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		try {
			fs.mkdirSync('uploads');
		} catch (error) {
			console.error(error);
		}
		cb(null, 'uploads');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() +
			'-' +
			Math.round(Math.random() * 1e9) +
			'-' +
			file.originalname;
		cb(null, file.fieldname + '-' + uniqueSuffix);
	},
});

// const upload = multer({ storage: storage });
export { storage };
