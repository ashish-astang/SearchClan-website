import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const StaySearch = ({ fontColor, buttonColor }) => {
	const [destination, setDestination] = useState('');
	const [checkInDate, setCheckInDate] = useState('');
	const [checkOutDate, setCheckOutDate] = useState('');
	const [rooms, setRooms] = useState(1);
	const [adults, setAdults] = useState(1);
	const [children, setChildren] = useState(0);
	const [additionalInputs, setAdditionalInputs] = useState('');

	const handleStayFormSubmit = () => {
		console.log('Stay form submitted successfully!');
	};

	return (
		<div className={`${fontColor}`}>
			<div className='mt-4'>
				<label className=''>Destination</label>
				<span className='flex flex-col items-end mt-2'>
					<input
						type='text'
						className='w-full h-12 p-2 border rounded'
						placeholder='Enter your destination'
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
					/>
					<Icon
						icon='mdi:location'
						height={26}
						color={'${fontColor}'}
						className='relative -top-10 -left-2 z-10'
						tabIndex={-1}
					/>
				</span>
			</div>
			<div className='flex -mt-3 gap-x-8'>
				<div className='w-1/2'>
					<label className=''>Check In</label>
					<input
						type='date'
						className='w-full h-12 mt-2 p-2 border rounded'
						min={new Date().toISOString().split('T')[0]}
						value={checkInDate}
						onChange={(e) => setCheckInDate(e.target.value)}
					/>
				</div>
				<div className='w-1/2'>
					<label className=''>Check Out</label>
					<input
						type='date'
						className='w-full h-12 mt-2 p-2 border rounded'
						min={new Date().toISOString().split('T')[0]}
						value={checkOutDate}
						onChange={(e) => setCheckOutDate(e.target.value)}
					/>
				</div>
			</div>
			<div className='mt-4'>
				<div>
					<label className=''>Rooms & Guests</label>
				</div>
				<div className='flex gap-x-8 h-12'>
					<select
						className='w-full h-12 mt-2 p-2 border rounded'
						value={rooms}
						onChange={(e) => setRooms(parseInt(e.target.value))}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
							<option
								key={num}
								value={num}>
								{num} Rooms
							</option>
						))}
					</select>
					<select
						className='w-full h-12 mt-2 p-2 border rounded'
						value={adults}
						onChange={(e) => setAdults(parseInt(e.target.value))}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
							<option
								key={num}
								value={num}>
								{num} Guests
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='mt-4'>
				<label className=''>Additional Inputs</label>
				<input
					type='text'
					className='w-full mt-2 p-2 border rounded h-12'
					placeholder='Any additional preferences'
					value={additionalInputs}
					onChange={(e) => setAdditionalInputs(e.target.value)}
				/>
			</div>
			<div className='mt-4 flex justify-end'>
				<button
					className={`${buttonColor} text-white px-6 py-2 rounded-full hover:shadow-xl hover:scale-105`}
					onClick={handleStayFormSubmit}>
					Take me there!
				</button>
			</div>
		</div>
	);
};

export default StaySearch;
