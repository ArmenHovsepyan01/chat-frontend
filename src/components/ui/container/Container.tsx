import { FC, ReactNode } from 'react';

interface IContainer {
  children: ReactNode;
}

const Container: FC<IContainer> = ({ children }) => {
  return <div className={'max-w-1500 m-auto'}>{children}</div>;
};

export default Container;
