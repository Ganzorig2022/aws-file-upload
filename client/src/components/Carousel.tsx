import React from 'react';
import Image from 'next/image';

type Props = {
  imageURLs: string[];
};

const Carousel = ({ imageURLs }: Props) => {
  return (
    <div>
      <div className='carousel w-full'>
        {imageURLs.length > 0 &&
          imageURLs.map((image, i) => (
            <div id='slide1' className='carousel-item relative w-full' key={i}>
              <Image
                src={image}
                width={500}
                height={500}
                className='w-full'
                alt='Upload image'
              />
              <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
                <a href='#slide4' className='btn btn-circle'>
                  ❮
                </a>
                <a href='#slide2' className='btn btn-circle'>
                  ❯
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
