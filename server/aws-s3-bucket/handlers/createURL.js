const { S3 } = require('aws-sdk');

const s3 = new S3();

module.exports.createURL = async (event) => {
  const { bucketName, fileName, contentType } = JSON.parse(event.body);

  try {
    const params = {
      Bucket: bucketName, // "ganzo-s3-bucket"
      Key: fileName, // "car.png"
      ContentType: contentType, // "image.png"
      Expires: 3600, // 1 hour
    };

    const preSignUrl = s3.getSignedUrl('putObject', params);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({
        message: 'Upload is successfull',
        preSignUrl,
      }),
    };
  } catch (error) {
    console.log('<<<<<<Pre-Sign URL ERROR>>>>>', error);

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
