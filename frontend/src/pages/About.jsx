function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-6 py-12">
      {/* Page container */}
      <div className="bg-white shadow-2xl rounded-2xl max-w-3xl p-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-blue-600">_raj_fr_</span> — a space dedicated to creativity, technology, and innovation.
          <br />
          Our mission is to build modern, efficient, and user-friendly applications that make everyday life smarter and simpler.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          This platform is designed with passion, precision, and purpose. 
          Whether it's creating a financial solution, a community project, or a tech tool, 
          we believe in blending functionality with beautiful design.
        </p>

        <div className="border-t border-gray-300 my-6"></div>

        <h2 className="text-2xl font-semibold text-blue-600 mb-3">
          Our Vision
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          To empower the youth and businesses with simple yet powerful digital tools that 
          bring convenience, efficiency, and trust to every interaction.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-3">
          Meet the Creator
        </h2>
        <div className="flex flex-col items-center gap-4 mt-4">
          <img
            src="/profile.jpeg"
            alt="Raj"
            className="w-2/12 h-36 rounded-full border-4 border-blue-400 shadow-lg"
          />
          <p className="text-lg text-gray-800 font-medium">
            <span className="font-semibold">Raj Kashyap</span> — Developer & Designer
          </p>
          <p className="text-gray-600 text-base max-w-md">
            A passionate web developer from India who loves building modern web apps with elegant designs, 
            real functionality, and clean UI.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-6">
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

        <footer className="text-gray-500 text-sm mt-10">rajj
          © {new Date().getFullYear()} _raj_fr_. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default About;
