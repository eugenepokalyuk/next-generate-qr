import { FC } from 'react';
import Header from './Header';
interface LayoutProps {
    children: any
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;