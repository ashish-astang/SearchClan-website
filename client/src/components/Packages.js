import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import PackageCard from './PackageCard';
import axios from 'axios';

const Packages = ({ fontColor, handleGoBack, avatarContent, formDetails }) => {
    const [package1, setpackage1] = useState();
    const [apiDone, setApiDone] = useState(false);

    useEffect(() => {
        getPackage();
    }, []);

    const getPackage = async () => {
        const newAvatarContent = avatarContent.replace(/ /g, '%');
        // setTimeout('', 20000);
        const apiUrl = `https://axisapi.onrender.com/packdetail?package=${newAvatarContent}`;
        console.log(apiUrl);

        const response = await axios.get(apiUrl);

        if (response.status !== 200) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        console.log('response', response.data);

        setpackage1(response.data);
        console.log("packageDetails", package1);
        setTimeout('', 1000);
        package1 !== null ? setApiDone(true) : setApiDone(false);
    }

    return (
        <div>
            <div className='flex flex-col m-5 justify-between gap-y-8'>
                <div className='flex items-center gap-x-6'>
                    <button onClick={handleGoBack} className={`${fontColor}`}>
                        <Icon icon="ep:back" width={25} />
                    </button>
                    <span className='text-2xl font-semibold'>
                        <p className={`${fontColor}`}> Available Packages </p>
                    </span>
                </div>
                <div className='gap-y-5 flex flex-col'>
                    {
                        apiDone &&
                        <PackageCard
                            package={package1}
                            formDetails={formDetails}
                        />
                    }
                    {
                        apiDone &&
                        <PackageCard
                            package={package1}
                            formDetails={formDetails}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Packages