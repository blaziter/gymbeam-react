import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Header = () => {
    return (
        <header className='flex flex-row lg:px-24 px-8 pt-4'>
            <Link href='/'>
                <Image
                    src={'/gymbeam.png'}
                    alt='GymBeam logo'
                    width={133}
                    height={37.5}
                    priority
                />
            </Link>
        </header>
    );
};
