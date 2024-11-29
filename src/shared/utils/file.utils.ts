export class FileUtils {
	static toBase64(file: Express.Multer.File): string {
		if (!file || !file.buffer) {
			throw new Error('Invalid file: Buffer is required');
		}
		return file.buffer.toString('base64');
	}
}