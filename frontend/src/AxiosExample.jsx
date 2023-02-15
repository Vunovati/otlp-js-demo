import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react"
import ProductList from "./ProductList";
import Cart from "./Cart";

const queryClient = new QueryClient();

export default function AxiosExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { data: products } = useQuery("products", () =>
      axios.get('http://localhost:3000/api/products').then(res => res.data)
  );

  const { data: cart } = useQuery("cart", () =>
      axios.get('http://localhost:3000/api/cart/demo-cart').then(res => res.data)
  );

  const { mutate: updateCart } = useMutation({ mutationFn: cartState => axios.post('http://localhost:3000/api/cart/demo-cart', cartState).then(res => res.data), onSuccess: (data) => {
    queryClient.setQueryData(['cart'], data)
  }
  }  )

  async function removeItemFromCart(cartItemId) {
    const newCartItems = cart.items.map(product => {
      if (product.id === cartItemId) {
        return [cartItemId, product.quantity - 1]
      }

      return [product.id, product.quantity]
    })

    return updateCart(newCartItems)
  }

  async function addItemToCart(cartItemId) {
    const cartItemsMap = new Map(cart.items.map(item => [item.id, item.quantity]))

    const updatedItem = cartItemsMap.get(cartItemId)
    if (updatedItem) {
      cartItemsMap.set(cartItemId, updatedItem.quantity + 1)
    } else {
      cartItemsMap.set(cartItemId, 1)
    }

    return updateCart([...cartItemsMap])
  }

  console.log(`Cart: ${JSON.stringify(cart, null, 2)}`)

  const [open, setOpen] = useState(true)

  return (
    <div>
        <button
          onClick={() => setOpen(true)}
        >
          Cart({cart?.items?.length ?? 0})
        </button>
      <ProductList products={products} addItemToCart={addItemToCart}/>
      <Cart cart={cart} removeItemFromCart={removeItemFromCart} open={open} setOpen={setOpen}/>
    </div>
  );
}
