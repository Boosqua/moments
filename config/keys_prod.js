module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  AWS_BUCKET_NAME: "memories-ort",
  AWSaccessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  AWS_REGION: "us-west-1",
  pgPool: process.env.DATABASE_URL,
};
