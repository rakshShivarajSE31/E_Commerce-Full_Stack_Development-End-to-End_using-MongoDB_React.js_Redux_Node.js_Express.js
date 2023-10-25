

import React from 'react';

const Success = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-400 animate-bounce mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-4xl font-extrabold text-gray-800 mt-6 text-center">Payment Successful</h2>
        <p className="text-gray-600 text-lg mt-2 text-center">Thank you for your purchase! 😄</p>

        <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center justify-center rounded-full mt-6 mx-auto">
          <p className="text-sm text-navy-400 font-medium inline-block flex items-center">Express!!!</p>
          <img
            src="https://t3.ftcdn.net/jpg/04/73/02/64/360_F_473026422_k3XjtqTh0Br3Iw8IfhlB9c72n9dqi9n5.jpg"
            alt="Express"
            className="h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
