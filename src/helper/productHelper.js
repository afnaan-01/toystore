//quantity of product increment and decrement

export const handleIncrement = (id, setProductItems) => {
    setProductItems((prev) =>
        prev.map((product) => {
            const productId = product._id ?? product.id; // use _id if available, otherwise id
            if (productId === id && product.quantity < 20) {
                return { ...product, quantity: Number(product.quantity) + 1 };
            }
            return product;
        })
    );
};

export const handleDecrement = (id, setProductItems) => {
    setProductItems((prev) =>
        prev.map((product) => {
            const productId = product._id ?? product.id;
            if (productId === id && product.quantity > 1) {
                return { ...product, quantity: Number(product.quantity) - 1 };
            }
            return product;
        })
    );
};