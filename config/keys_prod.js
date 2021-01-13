module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  AWS_BUCKET_NAME: "memories-ort",
  AWSaccessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  AWS_REGION: "us-west-1",
   pgPool: {
      user: "jlkswqilvqnaqr",
      host: "ec2-52-44-46-66.compute-1.amazonaws.com",
      database: "d6mccecitvmvsj",
      password:
         "658d1785642ad7986fb683fb137642675b12657299d8ae2ca6693972301c7c27",
      port: 5432,
   },
};
