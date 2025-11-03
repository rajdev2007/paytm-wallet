function Footer() {
  return (
    <footer className="bg-white mt-20 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Column 1 - Logo + Description */}
        <div className="flex flex-col items-center md:items-start">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-32 h-auto mb-3 object-contain" 
          />
          <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
            Simplifying money transfers, investments, and requests — securely and instantly.
          </p>
        </div>

        {/* Column 2 - Links */}
        <div className="py-5">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Quick Links</h3>
          <ul className="text-gray-600 space-y-2">
            <li><a href="/account" className="hover:text-blue-600">Account</a></li>
            <li><a href="/invest" className="hover:text-blue-600">Invest</a></li>
            <li><a href="/transfer" className="hover:text-blue-600">Send Money</a></li>
            <li><a href="/request" className="hover:text-blue-600">Request</a></li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div className="py-5">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Contact</h3>
          <p className="text-gray-600 text-sm">📧 raj.vibes2007@gmail.com</p>
          <p className="text-gray-600 text-sm">📍 Somewhere in New Delhi, India</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <img src="/twitter.svg" className="w-6 h-6 cursor-pointer hover:opacity-75" alt="Twitter" />
            <img src="/instagram.svg" className="w-6 h-6 cursor-pointer hover:opacity-75" alt="Instagram" />
            <img src="/linkedin.svg" className="w-6 h-6 cursor-pointer hover:opacity-75" alt="LinkedIn" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-600">Rajzzzy</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
