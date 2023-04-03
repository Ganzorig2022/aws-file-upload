// const { S3 } = require('aws-sdk');

// const s3 = new S3();

const {
  GetObjectCommand,
  S3Client,
  ListObjectsV2Command,
} = require('@aws-sdk/client-s3');
const client = new S3Client({});

module.exports.getURL = async (event) => {
  // const { bucketName, fileName } = JSON.parse(event.body);

  try {
    const command = new ListObjectsV2Command({
      Bucket: 'ganzo-s3-bucket', // "ganzo-s3-bucket"
      // Key: 'car.png', // "car.png"
    });
    const params = {
      Bucket: 'ganzo-s3-bucket', // "ganzo-s3-bucket"
      Key: 'car.png', // "car.png"
      // ContentType: contentType, // "image.png"
      // Expires: expiredIn, // 3000
    };

    const Contents = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    console.log('<<<<<<<<<<<<<<<<<STRING', Contents);

    // const url = s3.getObject(params, function (err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else {
    //     console.log('DATAAAAAAAAAAAAAA', data);
    //     res.send({ data });
    //   }
    // });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
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
