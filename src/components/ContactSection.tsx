"use client";

import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { Loader } from "@googlemaps/js-api-loader";

export default function ContactSection() {
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

  /*
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
  */

  return (
    <main className="flex flex-col w-full">
      {/* Row 1 */}
      <section className="grid grid-cols-[2fr_1fr] max-w-6xl mx-auto w-full
        px-4 md:px-8 py-12 md:py-16">

        {/* Left Column: Address & Links */}
        <div className="flex flex-col justify-center space-y-8 order-2">
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
        <div className="flex order-1 p-3 md:p-10 flex justify-center items-center
          w-full ">
          <div ref={mapRef} className="w-full h-full h-[400px] md:h-[450px]" />
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
