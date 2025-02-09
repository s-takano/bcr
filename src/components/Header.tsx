import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-gold.png"
              alt="BEAUTY CELLAR BY HOLLEYWOOD"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Services', '/services'],
              ['Gallery', '/gallery'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-gray-600 hover:text-gold-600 transition-colors duration-200 font-montserrat text-sm tracking-wider"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 