"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { Loader } from "@googlemaps/js-api-loader";

export default function Contact() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const { Map } = await loader.importLibrary('maps');
        await loader.importLibrary('places');
        
        const map = new Map(mapRef.current!, {
          center: { lat: 35.6604, lng: 139.7290 },
          zoom: 17,
          styles: [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                { saturation: -100 },
                { lightness: 20 }
              ]
            }
          ]
        });

        const placesService = new google.maps.places.PlacesService(map);
        const placeId = 'ChIJafUBm_mLGGAR14swzZQc85c';

        placesService.getDetails({
          placeId: placeId,
          fields: ['geometry', 'name']
        }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const position = {
              lat: place.geometry?.location?.lat() || 35.6604,
              lng: place.geometry?.location?.lng() || 139.7290
            };

            map.setCenter(position);
            
            new google.maps.Marker({
              position,
              map,
              title: "BEAUTY CELLAR BY HOLLYWOOD"
            });
          }
        });

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, []);

  // Minimal form state for demonstration
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (send data to API, etc.)
    console.log(formData);
  };

  return (
    <main className="flex flex-col w-full">
      {/* Row 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-full">
        {/* Left Column: Image */}
        <div className="bg-[#f5f3ec] flex items-center
          object-cover 
          justify-center md:justify-end
          px-2 py-10 md:px-10 md:py-16">
          <div className="relative w-[400px] h-[400px] md:h-[400px] lg:w-[600px]">
            <Image
              src="/images/0080-2.jpg"
              alt="model"
              fill
              className="object-cover object-right object-cover object-[50%_40%] md:object-[50%_50%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        {/* Right Column: Contact Form */}
        <div className="flex flex-col justify-center max-w-xl
          px-5 py-10 md:px-10 md:py-16">
          <h2 className="text-xl md:text-2xl mb-6">
            Fill the form below:
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-light mb-1"
                >
                  FIRST NAME
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-gray-500 outline-none py-2 bg-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-light mb-1"
                >
                  LAST NAME
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-gray-500 outline-none py-2 bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-light mb-1">
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-gray-500 outline-none py-2 bg-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-light mb-1"
              >
                SUBJECT
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-gray-500 outline-none py-2 bg-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-light mb-1"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-gray-500 outline-none py-2 bg-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors"
            >
              SEND
            </button>
          </form>
        </div>
      </section>

      {/* Row 2 */}
      <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] max-w-6xl mx-auto w-full
        px-4 md:px-8 py-12 md:py-16">

        {/* Left Column: Address & Links */}
        <div className="flex flex-col justify-center space-y-8 order-1 md:order-2">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-3">Contact:</h3>
            <p className="text-sm text-gray-600">
              Phone:{" "}
              <a
                href="tel:+81334081613"
                className="underline hover:text-gray-800"
              >
                +81 3-3408-1613
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:yoyaku@ptail.co.jp"
                className="underline hover:text-gray-800"
              >
                yoyaku@ptail.co.jp
              </a>
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium mb-3">Connect with us:</h3>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/hollywood_beauty_cellar/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl hover:text-gray-800 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://lin.ee/26rRaXm"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl hover:text-gray-800 transition-colors"
                  aria-label="LINE"
                >
                  <SiLine />
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-medium mb-3">Address:</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Roppongi Hills Hollywood Beauty Plaza 3F
              <br />
              6-4-1 Roppongi, Minato-ku
              <br />
              Tokyo, 106-0032, Japan
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-medium mb-3">Hours:</h3>
            <p className="text-sm text-gray-600">
              Mon – Sun: 10:00 – 18:00
              <br />
              <span className="italic text-xs">
                *Last appointment 1 hour before closing
              </span>
            </p>
          </div>

        </div>

        {/* Map */}
        <div className="order-1 md:order-1 p-10 flex justify-center items-center">
          <div ref={mapRef} className="w-full h-full" />
        </div>
        
        {/* Right Column: Another Image */}
        {/*<div className="order-1 md:order-1 p-10 flex justify-center items-center">
          <div className="relative w-full h-[400px] md:h-[400px]">
            <Image
              src="/images/tokyo-night.jpg"
              alt="Another Tokyo cityscape"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>*/}
      </section>
    </main>
  );
}
