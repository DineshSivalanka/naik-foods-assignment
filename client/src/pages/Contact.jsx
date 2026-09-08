import React from "react";

const Contact = () => {
  return (
    <div className="max-w-[1000px] mx-auto px-5 py-10">
      <h1 className="text-center mb-10 text-3xl font-bold text-gray-900">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-xl">
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-900">Name</label>
              <input type="text" required className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            
            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-900">Email</label>
              <input type="email" required className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            
            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-900">Message</label>
              <textarea required rows="5" className="w-full p-3 rounded-lg border border-gray-200 resize-y focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"></textarea>
            </div>
            
            <button type="submit" className="w-full p-3 text-base bg-primary hover:bg-[#c2410c] text-white border-none rounded-lg cursor-pointer font-bold transition-colors">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information & Map Placeholder */}
        <div className="flex flex-col gap-5">
          <div className="bg-white p-5 border border-gray-200 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Get In Touch</h3>
            <p className="flex items-center gap-2.5 mb-2.5 text-gray-500">
              <span className="text-xl">📍</span> 123 Food Street, Culinary District
            </p>
            <p className="flex items-center gap-2.5 mb-2.5 text-gray-500">
              <span className="text-xl">📞</span> +91 98765 43210
            </p>
            <p className="flex items-center gap-2.5 text-gray-500">
              <span className="text-xl">✉️</span> hello@naikfoods.com
            </p>
          </div>

          <div className="flex-1 bg-gray-200 rounded-xl flex items-center justify-center min-h-[250px] border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">[ Map Placeholder ]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
