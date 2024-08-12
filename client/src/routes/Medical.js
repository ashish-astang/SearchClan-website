import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import tbo from '../assets/tbo.svg';
import SearchForm from '../components/SearchForm';

const cities = ['Mumbai', 'Istanbul', 'London', 'Chicago', 'Amsterdam', 'Berlin', 'Turin'];

const Medical = () => {
  const [displayText, setDisplayText] = useState("Choose your Medical Destination");
  const [showWhiteBox, setShowWhiteBox] = useState(false);

  useEffect(() => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    const timeoutIdText = setTimeout(() => {
      setDisplayText(`You can even try out ${randomCity}!`);
    }, 15000);

    const timeoutIdWhiteBox = setTimeout(() => {
      setShowWhiteBox(true);
    }, 1500);

    return () => {
      clearTimeout(timeoutIdText);
      clearTimeout(timeoutIdWhiteBox);
    };
  }, []);

  return (
    <div className='h-full w-full overflow-auto medical-bg'>
      <div className='h-1/10 m-2 flex justify-between'>
        <img src={logo} alt='LOGO' className='w-32 mx-12' />
        {showWhiteBox && (
          <div className='w-1/3 h-16 flex mt-8 bg-white rounded-3xl shadow-lg overflow-hidden'>
            <div className='px-12 py-4 uppercase flex place-self-center whitespace-nowrap overflow-hidden font-bold text-xl text-medical-text'>
              {displayText}
            </div>
          </div>
        )}
        <img src={tbo} alt='TBO' className='w-40 mx-12' />
      </div>
      <div className='mt-20'>
        <SearchForm sector='medical' />
      </div>
    </div>
  );
};

export default Medical;
