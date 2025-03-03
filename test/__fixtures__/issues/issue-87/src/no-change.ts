import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client();

export const handler = async (event: any) => {
	const result = await s3.send(
		new PutObjectCommand({
			Bucket: "my-bucket",
			Key: "my-key",
		}),
	);
	return result;
};
