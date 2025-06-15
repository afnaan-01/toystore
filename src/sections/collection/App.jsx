import React from 'react';
import CollectionCard from './CollectionCard';

const App = () => {
    const collections = [
        {
            title: "Action Figures",
            imageUrl: "https://i.pinimg.com/736x/80/6a/84/806a84c5da2ed4d13e2010c95c53b658.jpg",
            link: "/collections/action-figures",
        },
        {
            title: "Educational Toys",
            imageUrl: "https://i.pinimg.com/736x/0a/42/3e/0a423e0018cf745946193cfb5cd152a8.jpg",
            link: "/collections/educational-toys",
        },
        {
            title: "Remote Control Toys",
            imageUrl: "https://i.pinimg.com/736x/5b/cf/c4/5bcfc49f1cc913c52b5d62bca17b93d1.jpg",
            link: "/collections/remote-control-toys",
        },
        {
            title: "Building Blocks",
            imageUrl: "https://i.pinimg.com/736x/9f/4e/1c/9f4e1c7dfd94228bdca4c875e6857786.jpg",
            link: "/collections/building-blocks",
        },
    ];



    return (
        <section className="px-4 py-10 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Shop by Collection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {collections.map((item, index) => (
                    <CollectionCard
                        key={index}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        link={item.link}
                    />
                ))}
            </div>
        </section>
    );
};

export default App;