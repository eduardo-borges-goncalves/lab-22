import axios from "axios";
import create from "zustand"
import { ProductProps } from "../components/Product";

type Data = {
  products: ProductProps[],
  setProducts: ()=> void
}

export const useProduct = create <Data> ( set => ({
  products: [],
  setProducts: async () => {
    const response = await axios.get("http://localhost:3001/products")
    set(() =>({products:response.data}))
  }
}))

type Cart = {
  cart: ProductProps[],
  setCart: (product:ProductProps) => void, 
}

export const useCart = create <Cart > ( set =>({
  cart: [],
  setCart: (product:ProductProps) => {
    // set( ({cart}) => ({ cart: cart.filter(item => item.id !== id) }) )
    // quantity > 0 &&
    // set( ({cart}) => ({ cart:[...cart,{ id, name, picture, quantity, price }] }) )

    set( ({cart}) => {
      if (cart.length > 0) {

        let isOnCart = cart.filter( item => item.id === product.id )
        let index = cart.indexOf(isOnCart[0])

        if (isOnCart.length === 0 && product.quantity > 0) // insere 
          cart.push(product)
        if (isOnCart.length > 0 && product.quantity > 0) 
          cart.splice(index, 1, product) // atualiza
        if (product.quantity === 0) cart.splice(index, 1); // deleta

      } else return { cart:[ product ] } // insere

      return { cart: [...cart] } 
    }) 
  }
}))