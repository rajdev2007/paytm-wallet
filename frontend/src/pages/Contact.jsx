import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // You can connect this to a backend endpoint if needed
      // Example: await axios.post("http://localhost:3000/api/contact", formData);
      console.log("Form submitted:", formData);

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send message. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl p-3 transition duration-200"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 text-gray-700 font-medium">{status}</p>
        )}

        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://www.instagram.com/_raj_fr_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/instagram-logo.png"
              alt="Instagram"
              className="w-8 h-8 hover:opacity-75 transition"
            />
          </a>
          <a
            href="https://github.com/rajdev2007"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/github-logo.png"
              alt="GitHub"
              className="w-8 h-8 hover:opacity-75 transition"
            />
          </a>
          <a
            href="https://x.com/raj_mern"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/twitter-x-logo.png"
              alt="twitter"
              className="w-8 h-8 hover:opacity-75 transition"
            />
          </a>
          <a
              href="https://www.linkedin.com/in/raj-kashyap-28-aug-stfu-sybau/"
              target="_blank"
              rel="noopener noreferrer"
              className="pt-0.5"
            >
            <img 
            src="/linkedin-in-logo.png" 
            className="w-7 h-7 cursor-pointer hover:opacity-75" 
            alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
