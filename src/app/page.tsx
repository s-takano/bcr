import Image from "next/image";

export function AboutSection() {
  return (
    <div className="relative h-screen">
      {/* Background flowing images */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute top-[50%] left-[-20%] w-[120vh] h-[120vh]
                     overflow-hidden rounded-full
                     -translate-y-1/3
                     animate-flowLeft"
          style={{
            animationDelay: '0.3s',
            animationDuration: '120s'
          }}
        >
          <Image src="/images/about.jpg" alt="Flowing image" fill className="object-cover object-[50%_60%]" />
        </div>

        <div
          className="absolute top-[50%] left-[70vw] w-[72vh] h-[72vh]
                     overflow-hidden rounded-full 
                     -translate-y-1/2
                     animate-flowLeft"
          style={{ 
            animationDelay: '0.6s',
            animationDuration: '120s'
          }}
        >
          <Image src="/images/takano.jpg" alt="Flowing image 2" fill className="object-cover" />
        </div>

        <div
          className="absolute top-[60%] left-[120vw] w-[72vh] h-[72vh]
                     overflow-hidden rounded-full 
                     -translate-y-1/2
                     animate-flowLeft"
          style={{ 
            animationDelay: '0.9s',
            animationDuration: '120s'
          }}
        >
          <Image src="/images/yokoyama.jpg" alt="Flowing image 3" fill className="object-cover" />
        </div>

        <div 
          className="absolute top-[50%] left-[180%] w-[72vh] h-[72vh]
                     overflow-hidden rounded-full 
                     -translate-y-1/2
                     animate-flowLeft"
          style={{ 
            animationDelay: '1.2s',
            animationDuration: '120s'
          }}
        >
          <Image src="/images/naito.jpg" alt="Flowing image 4" fill className="object-cover" />
        </div>
      </div>

      {/* Center white section that hides images */}
      <div className="absolute inset-0 flex">
        <div className="flex-1" />
        <div className="w-1/3 bg-white transform -skew-x-12 relative">
          <div className="absolute inset-0 flex items-center justify-center skew-x-12">
            {/* Adjusted spacing & hierarchy here */}
            <div className="text-center max-w-2xl px-4 py-8 md:px-8 md:py-12">
              <h2 className="text-6xl md:text-6xl mb-6">
                About us
              </h2>
              <p className="text-2xl md:text-3xl mb-2 font-semibold">
                大きな感動は、
              </p>
              <p className="text-2xl md:text-3xl mb-6 font-semibold">
                小さな表現に眠っている。
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                お店に入った瞬間に感じる、特別な空間。
                気持ちのいいおもてなしで、なりたい私になれる予感。
                美しくなったアイラッシュやネイルに、思わず笑顔。
                お店を出る頃には、大きな感動でいっぱいになっている。
                小さなときめきが重なるごとき、世界はもっと美しく見えてくる。
              </p>
              <button className="px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
                Brand concept
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-gray-800 font-sans relative">
      {/* Navigation with background transition */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-gold-600 text-2xl font-light">
            BEAUTY CELLAR BY HOLLYWOOD
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-white text-sm hover:opacity-80 transition-colors">
              Home
            </a>
            <a href="#" className="text-white text-sm hover:opacity-80 transition-colors">
              About
            </a>
            <a href="#" className="text-white text-sm hover:opacity-80 transition-colors">
              Services
            </a>
            <a href="#" className="text-white text-sm hover:opacity-80 transition-colors">
              Gallery
            </a>
            <a href="#" className="text-white text-sm hover:opacity-80 transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section - made sticky */}
      <section className="fixed inset-0 w-full h-screen">
        {/* Background image */}
        <div className="absolute inset-0 transform translate-x-64 -ml-64">
          <Image
            src="/images/hero-model1.jpg"
            alt="Model with manicure"
            fill
            className="object-cover object-[50%_20%]"
            priority
          />
        </div>

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.5), transparent 70%)"
          }}
        ></div>
        
        {/* White text overlay */}
        <div className="relative z-10 flex flex-col justify-center h-full px-12 md:px-16">
          <div className="max-w-2xl">
            {/* Main Hero Headline */}
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl leading-none mb-2 sm:mb-4 max-w-md">
              Elevate Beauty,
              <br />
              Timeless&nbsp;Elegance
            </h1>

            {/* Sub-Heading */}
            <p className="text-white text-lg md:text-xl font-extralight tracking-wide leading-relaxed max-w-md mb-8">
              Where time-honored expertise meets
              <br className="hidden md:block" />
              modern hair artistry—
              <br className="hidden md:block" />
              revealing your natural radiance
              <br className="hidden md:block" />
              in every strand.
            </p>


            {/* CTA */}
            <button className="text-gold-600 bg-black/20 border border-gold-600 
                             px-10 py-4 text-base md:text-lg 
                             hover:bg-gold-600 hover:text-gray-900 transition-colors font-semibold">
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* Spacer to push content below hero height */}
      <div className="h-screen"></div>

      {/* About Section - will slide over hero */}
      <section className="relative z-20 bg-white">
        <AboutSection />
      </section>

      {/* ... Additional sections ... */}
    </main>
  );
}
