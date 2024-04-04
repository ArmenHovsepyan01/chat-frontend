import { Bars3Icon } from '@heroicons/react/24/outline';
import { memo } from 'react';

export default memo(function Header() {
  return (
    <header className="fixed w-full bg-slate-50 h-20 z-30 top-0 left-0">
      <nav
        className="mx-auto flex max-w-1500 items-center justify-between p-6 lg:px-8"
        aria-label="Global">
        <div className={'flex justify-center align-center gap-8'}>
          <div className="flex">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
});
