import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-soft flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
      <div className="w-16 h-16 mb-6 relative">
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <h3 className="font-cormorant text-2xl mb-4 text-gray-800">{title}</h3>
      <p className="font-montserrat text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard; 