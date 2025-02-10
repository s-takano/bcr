import Image from "next/image";
import { forwardRef } from "react";

const images = [
  {
    src: "/images/about.jpg",
    alt: "Flowing image",
    width: 1108,
    height: 1477,
  },
  {
    src: "/images/takano.jpg",
    alt: "Flowing image 2",
    width: 1672,
    height: 2508,
  },
  {
    src: "/images/yokoyama.jpg",
    alt: "Flowing image 3",
    width: 1672,
    height: 2508,
  },
  {
    src: "/images/naito.jpg",
    alt: "Flowing image 4",
    width: 1672,
    height: 2508,
  },
];

const AboutSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="relative h-screen" ref={ref}>
      {/* Background flowing images container */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-[45%] sm:h-1/4" />
        {/* Outer container for infinite scrolling */}
        <div className="w-[200vw] flex animate-flowLeft">

          {images.concat(images).map((img, index) => (
            <div
              key={index}

              className="flex-shrink-0 mx-4 rounded-full overflow-hidden
                         w-[50vh] h-[50vh] sm:w-[70vh] sm:h-[70vh]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="object-cover"
              />
            </div>


          ))}
        </div>
      </div>

      {/* Center white section that hides images */}
      <div className="absolute inset-0 flex h-[300px] sm:h-full my-10 sm:my-0">
        <div className="flex-1 hidden sd:block sm:block" />
        {/* Remove skew and make full width on mobile */}
        <div className="w-full sm:w-5/12 bg-white sm:transform sm:-skew-x-12 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center sm:skew-x-12">

            <div className="text-center w-full sm:w-[80%] h-full max-w-2xl px-4 py-20
            flex flex-col justify-center items-center">



              <h2 className="text-xl sm:text-2xl md:text-2xl my-2 sm:my-10">
                ABOUT US
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl mb-2 font-semibold">
                Where Tradition Meets Modern Beauty in{" "}
                <strong className="font-bold">Roppongi Hills</strong>
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                With the warmth of Japanese hospitality, BEAUTY CELLAR BY
                HOLLYWOOD offers a complete salon experience—from hair and
                nails to kimono dressing—ensuring every visit feels personal,
                effortless, and inspiring.
              </p>
              <button className="mt-5 px-6 py-3 border border-black rounded-full text-sm hover:bg-black hover:text-white transition-colors">
                Explore Our Story
              </button>
              
            </div>

          </div>
        </div>
        <div className="flex-1 hidden sm:block" />
      </div>
    </div>
  );
});

export default AboutSection;
