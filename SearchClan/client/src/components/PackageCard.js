import React, { Suspense } from 'react';
import Package_world from '../assets/Package_world.svg';
import package_line1 from '../assets/package_line1.svg';
import package_line2 from '../assets/package_line2.svg';
import package_line3 from '../assets/package_line3.svg';
import package_car from '../assets/package_car.svg';
import package_meals from '../assets/package_meals.svg';
import { Icon } from '@iconify/react';

const Deliverables = ({ text, text2, icon, height }) => {
	return (
		<span className='flex flex-col items-center justify-center text-center'>
			<span className='h-8 mt-6'>
				<Icon
					icon={icon}
					height={height}
				/>
			</span>
			<p className='text-[10px] text-gray-500 tracking-tight leading-3 '>
				{text}
				<br />
				{text2 ? text2 : 'Included'}
			</p>
		</span>
	);
};

const PackageCard = ({ buttonColor, package1, formDetails }) => {
	const hotelName = package1?.hotel?.name || '';
	const flights = package1?.flights || [];
	const arrivalAirport = flights[0]?.arrival_airport || '';
	const fromLocation = formDetails?.fromLocation || '';
	const toLocation = formDetails?.toLocation || '';
	const adults = formDetails?.flightAdults || 0;
	const children = formDetails?.flightChildren || 0;
	const estimateAmount = package1?.estimate_cost?.amount || 0;

	return (
		<div className='bg-white rounded-2xl h-64 flex justify-between'>
			<div className='flex items-center p-8 pr-0'>
				<img src={Package_world} />
			</div>
			<div className='flex flex-col justify-between p-5 w-2/4'>
				<span className='text-bolder text-xl font-bold'>{hotelName}</span>
				<div className='text-gray-500 flex gap-x-3 text-lg'>
					<span className='flex items-center gap-x-1'>
						<Icon
							icon='ion:location-outline'
							width='14'
						/>
						<p className='text-xs'>{arrivalAirport}</p>
					</span>
					<span className='flex items-center gap-x-1'>
						<Icon
							icon='teenyicons:clock-outline'
							width='14'
						/>
						<p className='text-xs'>6D/7N</p>
					</span>
				</div>
				<div className='text-gray-600 text-xl flex items-center gap-x-3'>
					<span>{fromLocation}</span>
					<span>
						<img src={package_line1} />
					</span>
					<span>
						<Icon
							icon={'material-symbols:flight'}
							className='rotate-90'
						/>
					</span>
					<span>
						<img src={package_line3} />
					</span>
					<span>{toLocation}</span>
					{/* <span>
						<img src={package_line2} />
					</span>
					<span>
						<Icon icon={'mdi:car-side'} />
					</span>
					<span>
						<img src={package_line3} />
					</span>
					<span>TEH</span> */}
				</div>
				<div className='flex gap-x-5 text-gray-600 justify-between place-items-center'>
					<Deliverables
						text={'Transport'}
						icon={'mdi:plane-car'}
						height={20}
					/>
					<Deliverables
						text={'Meals'}
						icon={'game-icons:hot-meal'}
						height={20}
					/>
					<Deliverables
						text={'Stay'}
						icon={`typcn:home`}
						height={20}
					/>
					<Deliverables
						text={'Airport'}
						text2={'Transfers'}
						icon={'material-symbols-light:flight-takeoff'}
						height={20}
					/>
					<Deliverables
						text={'24x7'}
						text2={'Support'}
						icon={'fluent:person-support-24-filled'}
						height={20}
					/>
				</div>
			</div>
			<div className='border-l-2 p-5 pt-10 gap-y-2 flex flex-col'>
				<div className='flex justify-between'>
					<span className='text-gray-500'>Adults</span>
					<span className='text-gray-800'>{adults}</span>
				</div>
				<div className='flex justify-between'>
					<span className='text-gray-500'>Children</span>
					<span className='text-gray-800'>{children}</span>
				</div>
				<div className='flex justify-between mt-2'>
					<span className='text-gray-500'>Total</span>
					<span className='text-gray-800 text-xl line-through'>
						&#8377; {estimateAmount + estimateAmount * 0.1}
					</span>
				</div>
				<div className='text-right text-2xl text-black font-bold'>
					&#8377; {estimateAmount}
				</div>
				<div
					className={`bg-blue-500 w-36 h-10 text-white text-xl font-semibold px-4 pt-2 pb-1 mt-3 rounded-lg`}>
					<button>Get Details</button>
				</div>
			</div>
		</div>
	);
};

export default PackageCard;
