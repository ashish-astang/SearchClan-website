import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import { airportOptions } from '../assets/airportCodes';

const FlightSearch = ({
	fontColor,
	buttonColor,
	showPackages,
	handleFormDetails,
}) => {
	const [fromLocation, setFromLocation] = useState('');
	const [toLocation, setToLocation] = useState('');
	const [departureDate, setDepartureDate] = useState('');
	const [arrivalDate, setArrivalDate] = useState('');
	const [flightAdults, setFlightAdults] = useState(1);
	const [flightChildren, setFlightChildren] = useState(0);
	const [flightAdditionalInputs, setFlightAdditionalInputs] = useState('');

	const handleFlightsFormSubmit = () => {
		if (!fromLocation || !toLocation || !departureDate || !arrivalDate) {
			alert('Please fill in the required fields.');
			return;
		}

		const flightDetails = {
			fromLocation,
			toLocation,
			departureDate,
			arrivalDate,
			flightAdults,
			flightChildren,
			flightAdditionalInputs,
		};
		handleFormDetails(flightDetails);
	};

	const handleSwap = () => {
		// Swap values of fromLocation and toLocation
		let temp = fromLocation;
		setFromLocation(toLocation);
		setToLocation(temp);
	};

	return (
		<div className={`${fontColor}`}>
			<div className='flex mt-6 justify-between items-center'>
				<div className='w-1/2'>
					<label className=''>From</label>
					<Select
						options={airportOptions}
						value={airportOptions.find(
							(option) => option.value === fromLocation
						)}
						onChange={(selectedOption) => setFromLocation(selectedOption.value)}
						isSearchable
						placeholder='Select Departure Location'
					/>
				</div>
				<button
					className='flex items-center justify-center mt-6 border border-black rounded-full w-6 h-6'
					onClick={handleSwap}
					tabIndex={-1}>
					<Icon
						icon='tdesign:swap'
						width={24}
					/>
				</button>
				<div className='w-1/2'>
					<label className=''>To</label>
					<Select
						options={airportOptions}
						value={airportOptions.find((option) => option.value === toLocation)}
						onChange={(selectedOption) => setToLocation(selectedOption.value)}
						isSearchable
						placeholder='Select Arrival Location'
					/>
				</div>
			</div>
			<div className='flex gap-x-8 mt-4'>
				<div className='w-1/2'>
					<label className='  '>Departure Date</label>
					<input
						type='date'
						className='w-full h-12 mt-2 p-2 border rounded'
						min={new Date().toISOString().split('T')[0]}
						value={departureDate}
						onChange={(e) => setDepartureDate(e.target.value)}
					/>
				</div>
				<div className='w-1/2'>
					<label className='  '>Arrival Date</label>
					<input
						type='date'
						className='w-full h-12 mt-2 p-2 border rounded'
						min={new Date().toISOString().split('T')[0]}
						value={arrivalDate}
						onChange={(e) => setArrivalDate(e.target.value)}
					/>
				</div>
			</div>
			<div className='flex flex-col justify-between mt-4'>
				<label className='  '>Travellers</label>
				<div className='flex mt-2 gap-x-8'>
					<select
						className='w-full h-12 mt-2 p-2 border rounded'
						value={flightAdults}
						onChange={(e) => setFlightAdults(parseInt(e.target.value))}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
							<option
								key={num}
								value={num}>
								{num} Adults
							</option>
						))}
					</select>
					<select
						className='w-full h-12 mt-2 p-2 border rounded'
						value={flightChildren}
						onChange={(e) => setFlightChildren(parseInt(e.target.value))}>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
							<option
								key={num}
								value={num}>
								{num} Children
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='mt-4'>
				<label className=''>Additional Inputs</label>
				<input
					type='text'
					className='w-full h-12 mt-2 p-2 border rounded'
					placeholder='Any additional preferences'
					value={flightAdditionalInputs}
					onChange={(e) => setFlightAdditionalInputs(e.target.value)}
				/>
			</div>
			<div className='mt-4 flex justify-end'>
				<button
					className={`${buttonColor} flex flex-row gap-2 text-white px-6 py-2 rounded-full  hover:shadow-xl hover:scale-105`}
					onClick={handleFlightsFormSubmit}>
					Get Flights
					<Icon
						icon='material-symbols-light:flight-takeoff'
						className=''
						color='white'
						width='20'
					/>
				</button>
			</div>
		</div>
	);
};

export default FlightSearch;
