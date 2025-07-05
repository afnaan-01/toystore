
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

const banners = [
    {
        bgClass: 'bg-black',
        textClass: 'text-white',
        font: 'font-outfit',
        logo: '/apple-logo.png',
        series: 'iPhone 14 Series',
        title: 'Get Exciting Remote Cars',
        cta: 'Shop Now',
        href: '#',
        picture: 'https://m.media-amazon.com/images/I/61IM8RkVKeL._AC_SY200_.jpg',
    },
    {
        bgClass: 'bg-yellow-300',
        textClass: 'text-gray-900',
        font: 'font-baloo',
        logo: '/lego-logo.png',
        series: 'LEGO® Sets',
        title: 'Robotics Now Here',
        cta: 'Explore',
        href: '#',
        picture: 'https://m.media-amazon.com/images/I/51DBd7O6GEL._AC_SY200_.jpg',
    },
    // Add more banner objects as needed
];


export default function LandingSlider() {


    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimating(false); // Trigger fade-out
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % banners.length);
                setAnimating(true); // Trigger fade-in
            }, 500); // Delay matches fade-out duration
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='flex-1'>
            <section className={`${banners[current].bgClass} ${banners[current].textClass} w-full h-full transition-all duration-500 ease-in-out transform
        ${animating ? 'animate-slideFadeIn' : 'animate-slideFadeOut'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col-reverse md:flex-row items-center gap-8">
                    {/* Left */}
                    <div className="flex-1">

                        <h1
                            className={`${banners[current].font} text-3xl md:text-5xl font-bold leading-tight mb-6`} >
                            {banners[current].title}
                        </h1>
                        <a
                            href={banners[current].href}
                            className="inline-flex items-center gap-2 border-b border-current pb-1 hover:gap-3 transition-all"
                        >
                            {banners[current].cta} <i className="ri-arrow-right-line" />
                        </a>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={banners[current].picture}
                            alt="banner pic"
                            width={500}
                            height={500}
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
