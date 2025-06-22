import React from 'react';

const Skeleton = () => {
    return (
        <section className="px-4 py-7 max-w-6xl mx-auto animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">

                {/* Image Skeleton */}
                <div className="w-full">
                    <div className="w-full aspect-square flex gap-2">
                            <div
                                className="w-full h-auto bg-gray-300 rounded-lg"
                            />
                    </div>

                    {/* Image Changer Skeleton */}
                    <div className="w-full flex justify-center items-center gap-2 mt-4 text-gray-400">
                        <span className="text-4xl"><i className="ri-arrow-left-circle-line"></i></span>
                        <span className="text-4xl"><i className="ri-arrow-right-circle-line"></i></span>
                    </div>
                </div>

                {/* Details Skeleton */}
                <div className="flex flex-col gap-4">

                    {/* Title */}
                    <div className="h-6 w-2/3 bg-gray-300 rounded" />
                    <div className="h-6 w-2/3 bg-gray-300 rounded" />
                    <div className="h-6 w-2/3 bg-gray-300 rounded" />

                    {/* Price and MRP */}
                    <div className="flex gap-2 items-center">
                        <div className="h-8 w-24 bg-gray-300 rounded" />
                        <div className="flex gap-1">
                            <div className="h-4 w-12 bg-gray-300 rounded" />
                            <div className="h-4 w-16 bg-gray-300 rounded" />
                        </div>
                    </div>

                    {/* Quantity Input */}
                    <div>
                        <div className="h-4 w-20 bg-gray-300 mb-2 rounded" />
                        <div className="h-10 w-20 bg-gray-300 rounded" />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <div className="h-10 w-full bg-gray-300 rounded" />
                        <div className="h-10 w-full bg-gray-300 rounded" />
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-5/6" />
                            <div className="h-4 bg-gray-300 rounded w-3/4" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Skeleton;