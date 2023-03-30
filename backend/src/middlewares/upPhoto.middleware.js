const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION
});

const uploadPhoto = async files => {
    const result = [];
    const promises = files.map((file, i) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const command = new PutObjectCommand(params);
        return s3Client.send(command).then(data => {
            result.push(data.Location);
        });
    });
    await Promise.all(promises);
    return result;
};

module.exports = uploadPhoto;
