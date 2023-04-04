import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

type Props = {
  imageURLs: string[];
  Keys: string[];
};

const Gallery = ({ imageURLs, Keys }: Props) => {
  const [loading, setLoading] = useState(false);

  const bucketName = 'ganzo-s3-bucket';

  const deleteImage = async (imageName: string) => {
    setLoading(true);
    try {
      const endpoint =
        'https://6d6zx1x3pb.execute-api.us-east-1.amazonaws.com/dev/image';

      const response = await axios.delete(endpoint, {
        data: { bucketName, fileName: imageName },
      });
      setLoading(false);

      console.log('<<<<<<DELETE RESPONSE FROM BACKEND>>>>:', response);
    } catch (error: any) {
      console.log('<<<<<<ERROR FROM BACKEND>>>>:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex space-x-5 items-center justify-between'>
      {imageURLs.length > 0 &&
        imageURLs.map((image, i) => (
          <div
            className='card w-60 bg-base-100 shadow-xl hover:scale-105 transition duration-200'
            key={i}
          >
            <figure className='px-10 pt-10'>
              <img src={image} alt='images' className='rounded-xl w-40' />
            </figure>
            <div className='card-body items-center text-center'>
              {/* <h2 className='card-title'>Images!</h2> */}
              {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
              <div className='card-actions'>
                <button
                  className={`btn ${loading ? 'loading' : ''} btn-primary`}
                  onClick={() => deleteImage(Keys[i])}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Gallery;
