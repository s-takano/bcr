"use client";

import Image from "next/image";
import React from "react";

const ServicesSection = (() => {
  return (
    <section className="py-0 bg-white">
      <div className="mx-auto">
        {/*
          2 Big Rows (Hair & Aesthetics, then Nail & Kimono).
          Each row: a grid of 2 columns, each column is half the screen in width (on md+).
        */}
        <div className="">
          {/* --- Row 1: Hair & Aesthetics --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 h-[60vh] md:h-[70vh]">
            {/* Hair */}
            <div className="relative w-full h-full overflow-hidden group">
              <Image
                src="/images/service-hair.jpg"
                alt="Hair Service"
                width={1000}
                height={1000}
                className="object-cover object-center transition-transform -translate-y-32 md:translate-y-0 duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                <h3 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                  Hair
                </h3>
                <p className="text-sm md:text-base lg:text-lg mb-4 max-w-sm">
                  From subtle trims to complete transformations, our stylists
                  blend artistry and technique to create your perfect look.
                </p>
                <button className="px-4 py-2 border border-white rounded-full text-sm md:text-base lg:text-lg
                                   hover:bg-white hover:text-black transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Aesthetics */}
            <div className="relative w-full h-full overflow-hidden group">
              <Image
                src="/images/service-aesthetics.jpg"
                alt="Aesthetics Service"
                width={1000}
                height={1000}
                className="object-cover object-center scale-125 transition-transform -translate-y-32 md:translate-y-0 duration-300 group-hover:scale-150"
              />


              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                <h3 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                  Aesthetics
                </h3>
                <p className="text-sm md:text-base lg:text-lg mb-4 max-w-sm">
                  Rejuvenate your skin with specialized facials, advanced
                  treatments, and dedicated care for a radiant glow.
                </p>
                <button className="px-4 py-2 border border-white rounded-full text-sm md:text-base lg:text-lg
                                   hover:bg-white hover:text-black transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* --- Row 2: Nail & Kimono --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 h-[60vh] md:h-[70vh]">
            {/* Nail */}
            <div className="relative w-full h-full overflow-hidden group">
                <Image
                    src="/images/service-nail.jpg"
                    alt="Nail Service"
                    width={1000}
                    height={1000}
                    className="object-cover object-center -translate-y-32 md:translate-y-0 transition-transform duration-300 group-hover:scale-105"
                />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              {/* Overlay Text */}

              <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">

                <h3 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                  Nail
                </h3>
                <p className="text-sm md:text-base lg:text-lg mb-4 max-w-sm">
                  Treat yourself to elegant manicures, pedicures, and nail art 
                  using premium products for lasting brilliance.
                </p>
                <button className="px-4 py-2 border border-white rounded-full text-sm md:text-base lg:text-lg
                                   hover:bg-white hover:text-black transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Kimono */}
            <div className="relative w-full h-full overflow-hidden group">
              <Image
                src="/images/service-kimono.jpg"
                alt="Kimono"
                width={1000}
                height={1000}
                className="object-cover object-center transition-transform -translate-y-10 md:translate-y-0 duration-300 group-hover:scale-105"

              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                <h3 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                  Kimono
                </h3>
                <p className="text-sm md:text-base lg:text-lg mb-4 max-w-sm">
                  Experience timeless Japanese elegance with our expert kimono 
                  fitting and styling services.
                </p>
                <button className="px-4 py-2 border border-white rounded-full text-sm md:text-base lg:text-lg
                                   hover:bg-white hover:text-black transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;
