import React, { PropsWithChildren } from 'react';
import Sidebar from '@components/layout/Sidebar';
import Header from '@components/layout/Header';
import { Spinner } from '@material-tailwind/react';

type Props = PropsWithChildren<{
  isLoading?: boolean;
}>;

const Layout: React.FC<Props> = ({ children, isLoading }) => {
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-8 flex-1">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner className="w-12 h-12" />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
