const { S3 } = require('aws-sdk');

const s3 = new S3();

// const { S3Client } = require('@aws-sdk/client-s3');
// const client = new S3Client({});

module.exports.getURL = async (event) => {
  // const { bucketName, fileName } = JSON.parse(event.body);

  try {
    const params = {
      Bucket: 'ganzo-s3-bucket', // "ganzo-s3-bucket"
      Key: 'car.png', // "car.png"
    };

    const url = s3.getObject(params);
    console.log(url);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      // url: url,
      body: JSON.stringify({
        message: 'Download URL is ready',
      }),
    };
  } catch (error) {
    console.log('<<<<<<FILE UPLOAD ERROR>>>>>', error);
    return {
      statusCode: 400, //Bad request
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({
        message: 'Bad request.',
        error: error.message,
      }),
    };
  }
};

// POSTMAN dr "Inhertied auth from" songoltoor PUT request yawuulnaa.
