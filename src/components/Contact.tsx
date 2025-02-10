"use client";

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function Contact() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');
      const placesLib = await loader.importLibrary('places') as google.maps.PlacesLibrary;
      const placesService = new google.maps.places.PlacesService(document.createElement('div'));
      
      // Use Place ID instead of coordinates
      const placeId = 'ChIJafUBm_mLGGAR14swzZQc85c'; // Replace with your business Place ID

      const getPlaceDetails = () => {
        return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
          placesService.getDetails({
            placeId: placeId,
            fields: ['geometry', 'name']
          }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              resolve(place);
            } else {
              reject(status);
            }
          });
        });
      };

      try {
        const place = await getPlaceDetails();
        const position = {
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0
        };

        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: position,
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

          new google.maps.Marker({
            position,
            map,
            title: "BEAUTY CELLAR BY HOLLYWOOD"
          });
        }
      } catch (error) {
        console.error('Error getting place details:', error);
      }
    };

    initMap();
  }, []);

  return (
    <section className="relative h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 mb-10"/>
        <div className="text-center text-2xl md:text-3xl mb-10 font-light">
          Contact Us
        </div>


        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-4 font-light">Location</h3>
              <p className="text-gray-600 leading-relaxed">
                Roppongi Hills Hollywood Beauty Plaza 3F<br />
                6-4-1 Roppongi, Minato-ku<br />
                Tokyo, 106-0032<br />
                Japan
              </p>
            </div>

            <div>
              <h3 className="text-2xl mb-4 font-light">Hours</h3>
              <div className="text-gray-600 space-y-2">
                <p>Monday - Friday: 10:00 - 18:00</p>
                <p>Saturday - Sunday: 10:00 - 18:00</p>
                <p className="text-sm italic mt-2">
                  * Last appointment 1 hour before closing
                </p>
              </div>
            </div>


            <div>
              <h3 className="text-2xl mb-4 font-light">Contact</h3>
              <div className="text-gray-600 space-y-2">
                <p>Phone: <a href="tel:+81345551234" className="hover:text-gold-600 transition-colors">
                  +81 3-3408-1613
                </a></p>
                <p>Email: <a href="mailto:yoyaku@ptail.co.jp" className="hover:text-gold-600 transition-colors">
                  yoyaku@ptail.co.jp

                </a></p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] md:h-full min-h-[400px] rounded-lg overflow-hidden shadow-soft">
            <div ref={mapRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
