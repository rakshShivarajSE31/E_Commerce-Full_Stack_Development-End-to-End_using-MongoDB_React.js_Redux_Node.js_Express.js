


import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-t from-gray-400 via-gray-400 to-transparent min-h-screen py-16">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-red mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://media.istockphoto.com/id/1449032425/photo/shopping-bag-full-of-healthy-food-on-blue.webp?b=1&s=170667a&w=0&k=20&c=FsWV_fWhTFhGtQq2KN0Kt3tqcqR5yk_ck0_qpRgu7tU="
              alt="Company Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <p className="text-lg text-black font-bold mb-4 ">
              At Grocery-Express, we are committed to providing you with the best quality groceries and a hassle-free shopping experience. Our journey began with a simple idea: to make grocery shopping convenient and affordable for everyone.
            </p>
            <p className="text-lg text-black font-bold mb-4">
              We work directly with local farmers and suppliers to ensure that you receive the freshest produce and products. From fresh vegetables to pantry essentials, we have a wide selection to cater to your needs.
            </p>
            <p className="text-lg text-black font-bold mb-4">
              Our dedicated team is always working to improve our service and bring you the latest products at competitive prices. With our easy-to-use website and fast delivery, you can enjoy a stress-free shopping experience from the comfort of your home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
