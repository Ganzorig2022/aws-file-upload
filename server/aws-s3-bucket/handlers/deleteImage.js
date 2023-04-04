require('dotenv').config();

const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const client = new S3Client({});

module.exports.deleteImage = async (event) => {
  const { bucketName, fileName } = JSON.parse(event.body);

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName, // "ganzo-s3-bucket"
      Key: fileName, // "car.png"
    });

    const response = await client.send(command);

    console.log('<<<<<<DELETE RESPONSE>>>>>', response);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({
        message: 'Image Deletion is successful.',
        // data: { Contents, Name },
      }),
    };
  } catch (error) {
    console.log('<<<<<<Image DELETE ERROR>>>>>', error);
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
