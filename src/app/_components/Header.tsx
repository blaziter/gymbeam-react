import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Header = () => {
    return (
        <header className='flex flex-row px-24 pt-4'>
            <Link href='/'>
                <Image
                    src={'/gymbeam.png'}
                    alt='GymBeam logo'
                    width={266}
                    height={75}
                    priority
                />
            </Link>
        </header>
    );
};
