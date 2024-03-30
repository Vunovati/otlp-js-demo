import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";
import axios from "axios";
import React, { useState } from "react";
import { trace } from "@opentelemetry/api";
import ProductList from "./ProductList";
import CartModal from "./CartModal";
import { useSessionId } from "./useSessionId";
import Layout from "./Layout";

const { VITE_PRODUCTS_SERVICE_URL, VITE_CART_SERVICE_URL } = import.meta.env;

const tracer = trace.getTracer("webshop-spa");

const queryClient = new QueryClient();

export default function WebShop() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const sessionId = useSessionId();
  const headers = {
    "X-Session-ID": sessionId,
  };
  const { data: products } = useQuery("products", () =>
    axios.get(VITE_PRODUCTS_SERVICE_URL).then((res) => res.data),
  );

  const { data: cart } = useQuery(
    "cart",
    () => {
      return tracer.startActiveSpan("getCart", async (span) => {
        span.setAttribute("sessionId", sessionId);
        const res = await axios.get(VITE_CART_SERVICE_URL, {
          headers,
        });

        span.end();

        return res.data;
      });
    },
    {
      enabled: !!sessionId, // Only fetch cart if we have a session ID
    },
  );

  const { mutate: updateCart } = useMutation({
    mutationFn: async (cartState) => {
      return tracer.startActiveSpan("updateCart", async (span) => {
        span.setAttribute("sessionId", sessionId);
        const res = await axios.post(VITE_CART_SERVICE_URL, cartState, {
          headers,
        });

        span.end();

        return res.data;
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data);
    },
  });

  async function removeItemFromCart(cartItemId) {
    const newCartItems = cart.items
      .filter((p) => p.id !== cartItemId)
      .map((product) => {
        return [product.id, product.quantity];
      });

    return updateCart(newCartItems);
  }

  async function addItemToCart(cartItemId) {
    const cartItemsMap = new Map(
      cart.items.map((item) => [item.id, item.quantity]),
    );

    const updatedItem = cartItemsMap.get(cartItemId);
    if (!updatedItem) {
      cartItemsMap.set(cartItemId, 1);
    }

    return updateCart([...cartItemsMap]);
  }

  async function updateCartItemQuantity(cartItemId, quantity) {
    const cartItemsMap = new Map(
      cart.items.map((item) => [item.id, item.quantity]),
    );

    const updatedItem = cartItemsMap.get(cartItemId);
    if (updatedItem) {
      cartItemsMap.set(cartItemId, quantity);
    }

    return updateCart([...cartItemsMap]);
  }

  const [open, setOpen] = useState(false);

  return (
    <Layout cart={cart} setOpen={setOpen}>
      <ProductList products={products} addItemToCart={addItemToCart} />
      {cart && (
        <CartModal
          cart={cart}
          removeItemFromCart={removeItemFromCart}
          updateCartItemQuantity={updateCartItemQuantity}
          open={open}
          setOpen={setOpen}
        />
      )}
    </Layout>
  );
}
