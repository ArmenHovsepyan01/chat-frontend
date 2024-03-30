import { FC, ReactNode } from 'react';
import Header from '../components/header/Header.tsx';

interface ILayout {
  children: ReactNode;
}
const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
