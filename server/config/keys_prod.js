module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  AWS_BUCKET_NAME: "pooch-dev",
  AWSaccessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  AWS_REGION: "us-west-1",
  pgPool: {
     connectionString: process.env.DATABASE_URL,
     ssl: true
  }
};
