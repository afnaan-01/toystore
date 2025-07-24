import { RiTruckLine, RiCustomerService2Line, RiCheckboxCircleLine } from 'react-icons/ri';

export default function ServiceFeatures() {
    const features = [
        {
            icon: <RiTruckLine size={24} />,
            title: 'FREE AND FAST DELIVERY',
            description: 'Free delivery for all orders over ₹499',
        },
        {
            icon: <RiCustomerService2Line size={24} />,
            title: '24/7 CUSTOMER SERVICE',
            description: 'Friendly 24/7 customer support',
        },
        {
            icon: <RiCheckboxCircleLine size={24} />,
            title: 'MONEY BACK GUARANTEE',
            description: 'We return money within 3 days',
        },
    ];

    return (
        <section className="py-10 bg-white text-center">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-gray-700">
                        {/* Icon Wrapper */}
                        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center">
                                {feature.icon}
                            </div>
                        </div>
                        {/* Title */}
                        <h3 className="text-sm md:text-base font-bold mb-1 uppercase">{feature.title}</h3>
                        {/* Description */}
                        <p className="text-xs md:text-sm text-gray-500">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
