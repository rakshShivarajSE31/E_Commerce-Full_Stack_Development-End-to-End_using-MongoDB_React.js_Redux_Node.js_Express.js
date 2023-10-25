import React from 'react';

const Cancel = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gradient-to-r from-red-400 to-pink-500 p-16 rounded-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-white animate-bounce mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2 className="text-5xl font-extrabold text-white mt-6">Payment Cancelled</h2>
        <p className="text-white text-xl mt-4">Your payment has been cancelled. 😞</p>
      </div>
    </div>
  );
};

export default Cancel;
