import { CreditCard, Headset, Package } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Package className="h-12 w-12 text-gray-700" />,
      title: 'Free Shipping',
      description: 'Free shipping for orders above $180',
    },
    {
      icon: <CreditCard className="h-12 w-12 text-gray-700" />,
      title: 'Flexible Payment',
      description: 'Multiple secure payment options',
    },
    {
      icon: <Headset className="h-12 w-12 text-gray-700" />,
      title: '24x7 Support',
      description: 'We support online all days.',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-16 space-y-8 md:space-y-0">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center text-center md:text-left space-y-2 md:space-y-0 md:space-x-4">
          <div>
            {feature.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-600 text-lg">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
