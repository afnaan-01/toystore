import { Button } from "@/components/ui/button";


const Trending = () => {

    const images = [
        {
            image: 'https://i.pinimg.com/736x/d2/d4/e6/d2d4e6418704febee83171bee7c891a6.jpg',
            title: 'Toy Cars',
            price: 349
        },
        {
            image: 'https://i.pinimg.com/736x/65/d3/af/65d3af533389127e009d3ff05c23f1d8.jpg',
            title: 'Teddy Bears',
            price: 499
        },
        {
            image: 'https://i.pinimg.com/736x/d5/d3/9a/d5d39afcf2954fcd1ee8841aff9a6645.jpg',
            title: 'Puzzle',
            price: 249
        },
        {
            image: 'https://i.pinimg.com/736x/be/ac/b8/beacb89f0a8dee637d9d575c6e7f7029.jpg',
            title: 'Balls',
            price: 149
        },
        {
            image: 'https://i.pinimg.com/736x/e7/98/ce/e798cedd73bf4afdeccda414a80d63f7.jpg',
            title: 'Trains Toys',
            price: 299
        },
        {
            image: 'https://i.pinimg.com/736x/9e/7f/04/9e7f044e4b7c95bc352322f8d913dc47.jpg',
            title: 'Toy Bikes',
            price: 299
        },
    ]

    return (
     


        <div className="md:w-1/2 p-3 bg-white rounded-2xl">
            <h2 className="text-2xl font-quicksand font-bold text-center pb-2">Trending Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-7 w-full mx-auto">
                {
                    images.map((elm, index) => {
                        return (
                            <div key={index} className="relative h-fit overflow-hidden rounded cursor-pointer">
                                <div className="aspect-square h-[70%] w-full rounded-xl overflow-hidden">
                                    <img src={elm.image} alt={elm.title} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-col pl-1 items-center justify-center md:items-start">
                                    <span className="md:text-lg font-bold leading-normal">{elm.title}</span>
                                    <span className="font-bold flex gap-2 md:text-lg text-green-500 leading-normal"><span>Under</span>₹{elm.price}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Trending;