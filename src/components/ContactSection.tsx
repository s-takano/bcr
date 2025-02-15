"use client";

import { useEffect, useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { Loader } from "@googlemaps/js-api-loader";

export default function ContactSection() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const { Map } = await loader.importLibrary("maps");
        await loader.importLibrary("places");

        const map = new Map(mapRef.current!, {
          center: { lat: 35.6604, lng: 139.729 },
          zoom: 17,
          styles: [
            {
              featureType: "all",
              elementType: "all",
              stylers: [{ saturation: -100 }, { lightness: 20 }],
            },
          ],
        });

        const placesService = new google.maps.places.PlacesService(map);
        const placeId = "ChIJafUBm_mLGGAR14swzZQc85c";

        placesService.getDetails(
          { placeId, fields: ["geometry", "name"] },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              const position = {
                lat: place.geometry?.location?.lat() || 35.6604,
                lng: place.geometry?.location?.lng() || 139.729,
              };

              map.setCenter(position);

              new google.maps.Marker({
                position,
                map,
                title: "BEAUTY CELLAR BY HOLLYWOOD",
              });
            }
          }
        );
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();
  }, []);

  return (
    <main className="flex flex-col w-full">
      <section
        className="
          max-w-6xl mx-auto w-full
          px-4 md:px-8
          py-12 md:py-16
          grid grid-cols-1 md:grid-cols-[2fr_1fr]
          gap-8
        "
      >
        {/* Contact Info Column */}
        {/*
          On mobile: This is order-2, so it stacks AFTER the map.
          On md+: It's the first column (order-1).
          The grid template places this in the "2fr" part, so it's wider than the map.
        */}
        <div className="order-2 md:order-1 flex flex-col justify-center space-y-8">
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

        {/* Map Column */}
        {/*
          On mobile: This is order-1, so it appears FIRST.
          On md+: It's the second column (order-2).
          The grid template sets this at "1fr", so narrower than the info column.
        */}
        <div className="order-1 md:order-2 flex justify-center items-center p-3 md:p-6">
          {/* Ensure a fixed height for the map so it doesn't overwhelm small screens */}
          <div ref={mapRef} className="w-full h-[300px] md:h-[350px]" />
        </div>
      </section>
    </main>
  );
}
