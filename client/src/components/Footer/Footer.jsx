import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center">
        <nav className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">Link 1</a>
          <a href="#" className="hover:text-gray-300">Link 2</a>
          <a href="#" className="hover:text-gray-300">Link 3</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;