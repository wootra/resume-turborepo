import React, { type PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren) => {
    return <h2 className='font-bold text-2xl'>{children}</h2>;
};

export default Header;
