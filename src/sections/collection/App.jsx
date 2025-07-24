import React from 'react';
import CollectionCard from './CollectionCard';

const App = () => {
    const collections = [
        {
            id: 1,
            title: "Action Figures",
            imageUrl: "https://i.pinimg.com/736x/80/6a/84/806a84c5da2ed4d13e2010c95c53b658.jpg",
            link: "/collection/action-figures",
        },
        {
            id: 2,
            title: "Educational Toys",
            imageUrl: "https://i.pinimg.com/736x/0a/42/3e/0a423e0018cf745946193cfb5cd152a8.jpg",
            link: "/collection/educational-toys",
        },
        {
            id: 3,
            title: "Remote Control Toys",
            imageUrl: "https://i.pinimg.com/736x/5b/cf/c4/5bcfc49f1cc913c52b5d62bca17b93d1.jpg",
            link: "/collection/remote-control-toys",
        },
        {
            id: 4,
            title: "Building Blocks",
            imageUrl: "https://i.pinimg.com/736x/9f/4e/1c/9f4e1c7dfd94228bdca4c875e6857786.jpg",
            link: "/collection/building-blocks",
        },
    ];



    return (

        <div className='bg-blue-400 sm:pt-16 pt-0'>
            <section className="py-10 max-w-[1350px] mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold font-quicksand text-white mb-6 text-center">
                    Shop by Collection
                </h2>

                <div className="px-2 xl:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {collections.map((item, index) => (
                        <CollectionCard
                            key={index}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            id={item.id}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default App;