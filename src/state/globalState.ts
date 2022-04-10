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
  setCart: (id:number,name:string, picture:string, quantity:number, price:number) => void, 
}

export const useCart = create <Cart> ( set =>({
  cart: [],
  setCart: (id:number,name:string,picture:string,quantity:number,price:number) => {
    set( ({cart}) => ({ cart: cart.filter(item => item.id !== id) }) )
    quantity > 0 && set( ({cart}) => ({ cart:[...cart,{id,name,picture,quantity,price}] }) )
  }
}))

type QuantityElement = {
  id: number, 
  quantityPerProduct: number
}

type Quantity = {
  quantity: QuantityElement[], 
  setQuantity: (id:number, quantity: number) => void,
}

export const useQuantity = create <Quantity> ( set => ({
  quantity: [], 
  setQuantity: (id:number, quantityPerProduct: number) => {
    set( ({quantity}) => ({ quantity: quantity.filter(item => item.id !== id)}))
    set( ({quantity})=>({ quantity: [...quantity, {id, quantityPerProduct}] }))
  } 
}))




