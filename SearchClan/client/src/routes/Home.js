import logo from '../assets/logo.svg';
import tbo from '../assets/tbo.svg';
import line1 from '../assets/line1.svg';
import line2 from '../assets/line2.svg';
import line3 from '../assets/line3.svg';
import main from '../assets/main.png';
import plane from '../assets/plane.svg';
import ham from '../assets/ham.svg';
import map from '../assets/map.png';
import pointer from '../assets/pointer.svg';
import medicalIcon from '../assets/medicalIcon.svg';
import meetingIcon from '../assets/meetingIcon.svg';
import weddingIcon from '../assets/weddingIcon.svg';
import vacationIcon from '../assets/vacationIcon.svg';
import medicalAvatar1 from '../assets/medicalAvatar1.svg';
import meetingAvatar1 from '../assets/meetingAvatar1.svg';
import weddingAvatar1 from '../assets/weddingAvatar1.svg';
import vacationAvatar1 from '../assets/vacationAvatar1.svg';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='w-full h-full bg-light-yellow overflow-auto'>
			<div className='h-1/10 m-8 flex justify-between'>
				<img src={logo} alt='LOGO' className='w-32' />
				<div className='w-1/3 h-12 flex mt-8 bg-white rounded-3xl shadow-lg overflow-hidden'>
					<div className='px-12 py-3 uppercase  animate-marquee whitespace-nowrap overflow-hidden'>
						Searchclan is one-stop solution for all your travel voes!
					</div>
					{/* <div className='absolute px-12 py-3 text-sky-400 uppercase animate-marquee2 whitespace-nowrap overflow-hidden'>
						Searchclan is one-stop solution for all your travel voes!
					</div> */}
				</div>
				<img src={tbo} alt='TBO' className='w-40' />
			</div>
			<div className='mt-12'>
				<div className='flex flex-row justify-left'>
					<div className='flex-col'>
						<img src={line1} alt='' className='' />
					</div>
					<div className='flex-col'>
						<p className='mx-16 text-bold text-xl text-faded-black'>
							LET'S MAKE THE BEST TRIP EVER!
						</p>
						<p className=' mt-4 font-semibold text-faded-black text-7xl leading-snug'>
							<span className='mx-16'>Your new</span>
							<div className='flex flex-row mx-6'>
								<img src={plane} alt='' className='w-12 h-full' />
								<span className='bg-gradient-to-l from-high-green'>travel</span>
							</div>
							<span className='mx-16'>partner</span>
						</p>
						<p className='mx-16 w-full mt-8 text-bold text-xl text-light-gray'>
							Explore beautiful destinations at your price
						</p>
					</div>
					<img src={line2} alt='' className='w-2/12' />
					<img src={main} alt='' className='w-2/5' />
					<img src={line3} alt='' className='w-1/12' />
				</div>
			</div>
			<div className='w-full flex justify-center'>
				<div className='w-3/4 h-64 flex flex-row justify-center items-end mt-20'>
					<div className='w-64 h-64 bg-light-orange rounded-3xl rounded-br-none shadow-xl flex flex-col justify-center'>
						<div className='mt-4 text-voilet-text text-xl font-semibold flex justify-center'>
							Online Booking
						</div>
						<div className='w-60 h-28 mt-8 bg-map flex justify-center self-center p-4'>
							<div className='flex flex-col justify-center items-center'>
								<img src={pointer} alt='' className='w-8' />
								<span className='text-voilet-text text-2xl font-semibold mt-3'>Choose</span>
								<p className='text-voilet-text text-base font-normal'>your companion</p>
							</div>
						</div>
					</div>
					<div className='h-48  bg-white rounded-r-3xl flex flex-row shadow-xl'>
						<div className='flex items-center justify-between gap-x-5 mx-5'>
							<div className='relative h-40 w-40 bg-pastel-blue rounded-2xl group cursor-pointer'>
								<Link to='/medical'>
									<div className='w-10 h-10 bg-white rounded-md flex justify-center items-center ml-8 mt-8 mb-4'>
										<img src={medicalIcon} alt='' className='w-7 p-0.5' />
									</div>
									<div className='ml-6'>
										<h1 className='text-voilet-text text-xl font-semibold'>Medical</h1>
										<p className='text-voilet-text text-base font-normal'>Tourism</p>
									</div>
									<div className='absolute left-0 top-0 w-full h-full bg-cover bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
										<img
											src={medicalAvatar1}
											alt='Hovered Image'
											className='h-52 absolute -left-21.75 -top-16 pointer-events-none'
										/>
									</div>
								</Link>
							</div>
							<div className='relative h-40 w-40 bg-pastel-purple rounded-2xl group cursor-pointer'>
								<Link to='/meetings'>
									<div className='w-10 h-10 bg-white rounded-md flex justify-center items-center ml-8 mt-8 mb-4'>
										<img src={meetingIcon} alt='' className='w-7 p-0.5' />
									</div>
									<div className='ml-6'>
										<h1 className='text-voilet-text text-xl font-semibold'>Meetings</h1>
										<p className='text-voilet-text text-base font-normal'>Tourism</p>
									</div>
									<div className='absolute left-0 top-0 w-full h-full bg-cover bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
										<img
											src={meetingAvatar1}
											alt='Hovered Image'
											className='h-52 absolute -left-19.25 -top-12 pointer-events-none'
										/>
									</div>
								</Link>
							</div>
							<div className='relative h-40 w-40 bg-pastel-red rounded-2xl group cursor-pointer'>
								<Link to='/weddings'>
									<div className='w-10 h-10 bg-white rounded-md flex justify-center items-center ml-8 mt-8 mb-4'>
										<img src={weddingIcon} alt='' className='w-7 p-0.5' />
									</div>
									<div className='ml-6'>
										<h1 className='text-voilet-text text-xl font-semibold'>Weddings</h1>
										<p className='text-voilet-text text-base font-normal'>Tourism</p>
									</div>
									<div className='absolute left-0 top-0 w-full h-full bg-cover bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
										<img
											src={weddingAvatar1}
											alt='Hovered Image'
											className='h-52 absolute -left-23 pointer-events-none'
										/>
									</div>
								</Link>
							</div>
							<div className='relative h-40 w-40 bg-pastel-green rounded-2xl group cursor-pointer'>
								<Link to='/vacation'>
									<div className='w-10 h-10 bg-white rounded-md flex justify-center items-center ml-8 mt-8 mb-4'>
										<img src={vacationIcon} alt='' className='w-7 p-0.5' />
									</div>
									<div className='ml-6'>
										<h1 className='text-voilet-text text-xl font-semibold'>Vacation</h1>
										<p className='text-voilet-text text-base font-normal'>Tourism</p>
									</div>
									<div className='absolute left-0 top-0 w-full h-full bg-cover bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
										<img
											src={vacationAvatar1}
											alt='Hovered Image'
											className='h-52 absolute -top-43 pointer-events-none'
										/>
									</div>
								</Link>
							</div>
							<div className=''>
								<img src={ham} alt='' className='' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
