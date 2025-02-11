"use client";

import Image from 'next/image';
import Navigation from '@/components/Navigation';

const services = [
  {
    id: 1,
    name: 'Hair Styling',
    description: 'Expert cuts, styling, and color treatments tailored to enhance your natural beauty.',
    price: '¥8,000~',
    image: '/images/service-hair.jpg',
    duration: '60-120 min'
  },
  {
    id: 2,
    name: 'Hair Treatment',
    description: 'Revitalize your hair with our premium conditioning and repair treatments.',
    price: '¥12,000~',
    image: '/images/service-treatment.jpg',
    duration: '45-60 min'
  },
  {
    id: 3,
    name: 'Color & Highlights',
    description: 'Customized color solutions using the finest products for vibrant, lasting results.',
    price: '¥15,000~',
    image: '/images/service-color.jpg',
    duration: '120-180 min'
  }
];

export default function Services() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Our Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the pinnacle of beauty and wellness with our curated selection of premium services.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12">
            {services.map((service) => (
              <div 
                key={service.id}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-light">{service.name}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Starting Price</span>
                      <span className="font-medium">{service.price}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Duration</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <button className="mt-8 bg-transparent border border-gold-600 text-gold-600 px-8 py-3 hover:bg-gold-600 hover:text-white transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-warm-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl mb-6 font-light">
              Personalized Consultation
            </h3>
            <p className="text-gray-600 mb-8">
              Every service begins with a thorough consultation to understand your needs and preferences, ensuring results that exceed your expectations.
            </p>
            <button className="bg-gold-600 text-white px-8 py-3 hover:bg-gold-700 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
} 