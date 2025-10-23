import React from "react";
import { FaPhone } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="w-11/12 mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-base-100 p-6 shadow-md rounded-lg flex flex-col items-center text-center space-y-2">
          <FaPhone size={28}></FaPhone>
          <h3 className="text-xl font-bold mb-2">Phone</h3>
          <p>+880 123 456 789</p>
        </div>

        <div className="bg-base-100 p-6 shadow-md rounded-lg flex flex-col items-center text-center space-y-2">
        <MdOutlineEmail size={28} />
          <h3 className="text-xl font-bold mb-2">Email</h3>
          <p>info@toytopia.com</p>
        </div>

        <div className="bg-base-100 p-6 shadow-md rounded-lg flex flex-col items-center text-center space-y-2">
          <IoLocation size={28}></IoLocation>
          <h3 className="text-xl font-bold mb-2">Address</h3>
          <p>123 Toy Street, Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-[400px] md:h-auto">
          <iframe
            title="ToyTopia Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.905737401513!2d90.40774617544462!3d23.810332294632934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf5c2b5a3a13%3A0x2e1c3f0b7e0edb0!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1698123456789!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0 rounded-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="bg-base-100 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows={5}
              required
            ></textarea>
            <button type="submit" className="btn btn-secondary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
