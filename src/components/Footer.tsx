"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { FaInstagram } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
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
                    disableDefaultUI: true, // Minimal map controls
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
        <footer className="relative z-10 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Column 1: Contact Info + CTA */}
                <div className="flex flex-col space-y-4 text-gray-700">
                    <div className="leading-relaxed">
                        <Link href={"/contact"}
                            className="underline mb-3 transition-colors hover:bg-black hover:text-white inline-block">
                            Contact us
                        </Link>
                        <a href="tel:+81334081613"
                            className="block hover:text-gray-900 transition-colors"
                        >
                            Phone:+81 3-3408-1613
                        </a>
                        <a
                            href="mailto:yoyaku@ptail.co.jp"
                            className="block hover:text-gray-900 transition-colors"
                        >
                            Email:yoyaku@ptail.co.jp
                        </a>
                        {/* Hours */}
                        <div>
                            <div className="font-medium mb-0">Hours:</div>
                            <div className="ml-5">
                                <div className="text-sm text-gray-600">
                                    Mon – Sun: 10:00 – 18:00
                                    <br />
                                    <span className="italic text-xs">
                                        *Last appointment 1 hour before closing
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Column 2: Small Map */}
                <div className="w-full h-48 rounded overflow-hidden">
                    <div ref={mapRef} className="w-full h-full" />
                </div>

                {/* Column 3: Social + Helpful Links */}
                <div className="flex flex-col space-y-6 text-gray-700">
                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-light tracking-wide mb-3">
                            Follow us on social
                        </h3>
                        <div className="flex space-x-6 text-2xl">
                            <a
                                href="https://www.instagram.com/hollywood_beauty_cellar/"
                                className="hover:text-gray-900 transition-colors"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://lin.ee/26rRaXm"
                                className="hover:text-gray-900 transition-colors"
                                aria-label="LINE"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SiLine />
                            </a>
                        </div>
                    </div>

                    {/* Helpful Links (FAQ, Privacy, etc.) */}
                    <div>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <a
                                    href="/faq"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            {/* Add any other links you need here */}
                        </ul>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm mt-4">
                        &copy; {new Date().getFullYear()} Ponytail Co., Ltd. All rights
                        reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}
