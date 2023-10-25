import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gradient-to-t from-gray-400 via-gray-400 to-transparent min-h-screen py-16">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-black mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://cdn.dribbble.com/users/6175319/screenshots/17050514/media/381ee379009e5ce7fe598c8db195d8f5.png?resize=400x300&vertical=center"
              alt="Contact Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <p className="text-lg text-black font-bold mb-4">
              We would love to hear from you! If you have any questions, feedback, or inquiries, please feel free to contact us using the information below.
            </p>
            <div className="mb-4">
              <h2 className="text-xl text-black font-bold mb-2">Contact Information:</h2>
              <p className="text-black">Email: contact@example.com</p>
              <p className="text-black">Phone: +1 (123) 456-7890</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl text-black font-bold mb-2">Business Hours:</h2>
              <p className="text-black">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-black">Saturday - Sunday: Closed</p>
            </div>
            <p className="text-lg text-black font-bold">
              We look forward to assisting you and providing excellent service!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
