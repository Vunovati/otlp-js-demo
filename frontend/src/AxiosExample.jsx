import {
  QueryClient,
  QueryClientProvider,
  //  useMutation,
  //  useQuery,
} from "react-query";
// import axios from "axios";
import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import { allProducts } from "./mockData";

// const { VITE_PRODUCTS_SERVICE_URL, VITE_CART_SERVICE_URL } = import.meta.env;

const queryClient = new QueryClient();

export default function AxiosExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  //  const { data: productsQ } = useQuery("products", () =>
  //    axios.get(VITE_PRODUCTS_SERVICE_URL).then((res) => res.data)
  //  );
  //
  //  const { data: cartQ } = useQuery("cart", () =>
  //    axios.get(VITE_CART_SERVICE_URL).then((res) => res.data)
  //  );
  //
  //  const { mutate: updateCartQ } = useMutation({
  //    mutationFn: (cartState) =>
  //      axios.post(VITE_CART_SERVICE_URL, cartState).then((res) => res.data),
  //    onSuccess: (data) => {
  //      queryClient.setQueryData(["cart"], data);
  //    },
  //  });

  const products = allProducts;

  const [cart, setCart] = useState({
    items: [{ ...products[0], quantity: 1 }],
    total: products[0].price,
  });

  async function updateCart(newCartItems) {
    console.log(
      `Update cart with new cart items ${JSON.stringify(newCartItems, null, 2)}`
    );

    setCart({
      items: newCartItems.map(([id, quantity]) => ({
        ...products.find((p) => p.id === id),
        quantity,
      })),
      total: newCartItems.reduce(
        (sum, [id, quantity]) =>
          sum + products.find((p) => p.id === id).price * quantity,
        0
      ),
    });
  }

  async function removeItemFromCart(cartItemId) {
    const newCartItems = cart.items.filter((i) => i.id !== cartItemId);

    return updateCart(newCartItems.map((item) => [item.id, item.quantity]));
  }

  async function addItemToCart(cartItemId) {
    console.log(`add item ${cartItemId}`);
    const cartItemsMap = new Map(
      cart.items.map((item) => [item.id, item.quantity])
    );

    const updatedItem = cartItemsMap.get(cartItemId);
    if (updatedItem) {
      cartItemsMap.set(cartItemId, updatedItem.quantity + 1);
    } else {
      cartItemsMap.set(cartItemId, 1);
    }

    return updateCart([...cartItemsMap]);
  }

  const [open, setOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Cart({cart?.items?.length ?? 0})
      </button>
      <ProductList products={products} addItemToCart={addItemToCart} />
      <Cart
        cart={cart}
        removeItemFromCart={removeItemFromCart}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
