import React, { JSX } from 'react';
import { LayoutProps } from './constants';

export default function DevLayout({ children, navigation }: LayoutProps): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-900">
      {/* <Header
        navigation={navigation}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      /> */}

      <div className="relative isolate">
        {children}
      </div>
      <div className="relative h-[300px] bg-transparent overflow-hidden hidden sm:block">
        <div className="absolute bottom-0 left-1/2 w-[150%] h-48 -translate-x-1/2 bg-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 rounded-t-[20%] md:rounded-t-[50%] bg-gray-900 z-10"></div>
      </div>
      <footer className="bg-gray-900 text-gray-400 hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 pb-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-10">
            <div className="max-w-sm">
              <div className="mb-4">
                {/* Logo o ícono */}
                <span className="text-indigo-400 text-2xl font-bold">⤴</span>
              </div>
              <p className="text-sm leading-relaxed">
                Making the world a better place through constructing elegant hierarchies.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" aria-label="Facebook" className="hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-white">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="#" aria-label="GitHub" className="hover:text-white">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-white">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="text-white font-semibold mb-4">Solutions</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Marketing</a></li>
                  <li><a href="#" className="hover:underline">Analytics</a></li>
                  <li><a href="#" className="hover:underline">Automation</a></li>
                  <li><a href="#" className="hover:underline">Commerce</a></li>
                  <li><a href="#" className="hover:underline">Insights</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Submit ticket</a></li>
                  <li><a href="#" className="hover:underline">Documentation</a></li>
                  <li><a href="#" className="hover:underline">Guides</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">About</a></li>
                  <li><a href="#" className="hover:underline">Blog</a></li>
                  <li><a href="#" className="hover:underline">Jobs</a></li>
                  <li><a href="#" className="hover:underline">Press</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Terms of service</a></li>
                  <li><a href="#" className="hover:underline">Privacy policy</a></li>
                  <li><a href="#" className="hover:underline">License</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            © 2025 Your Company, Inc. All rights reserved.
          </div>
        </div>
        <div className="block sm:hidden w-full h-[35px]"></div>
      </footer>
    </div>
  );
}