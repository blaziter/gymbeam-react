import Link from 'next/link';
import React from 'react';

import { useNextTranslation } from '@lib/hooks';

export const Footer = () => {
    const { tb } = useNextTranslation(Footer.displayName);

    return (
        <footer className='border-t border-gray-300'>
            <div className='grid grid-cols-2 px-8 py-8 lg:px-24 text-center'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        {tb('footer.author.label', {
                            author: 'Petr Tran - ',
                        })}
                        <Link
                            className='text-blue-500 hover:text-blue-700'
                            href={'https://github.com/blaziter'}
                            target='_blank'
                        >
                            https://github.com/blaziter
                        </Link>
                    </label>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        {tb('footer.purpose.label')}
                    </label>
                </div>
            </div>
        </footer>
    );
};

Footer.displayName = 'app._components.Footer';
