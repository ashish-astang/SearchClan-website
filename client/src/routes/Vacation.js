import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import tbo from '../assets/tbo.svg';
import SearchForm from '../components/SearchForm';

const Vacation = () => {
	return (
		<div className='h-full w-full overflow-auto vacation-bg'>
			<div className='h-1/10 m-2 flex justify-between'>
				<img
					src={logo}
					alt='LOGO'
					className='w-32 mx-12'
				/>
				<div className='w-1/3 h-12 flex mt-8 bg-white rounded-3xl shadow-lg overflow-hidden'>
					<div className='px-12 py-3 uppercase  animate-marquee whitespace-nowrap overflow-hidden'>
						Searchclan is one-stop solution for all your travel voes!
					</div>
				</div>
				<img
					src={tbo}
					alt='TBO'
					className='w-40 mx-12'
				/>
			</div>

			<div className='mt-20'>
				<SearchForm sector='vacation' />
			</div>
		</div>
	);
};

export default Vacation;
