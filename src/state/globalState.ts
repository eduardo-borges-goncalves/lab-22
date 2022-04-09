import axios from "axios";
import React, { SetStateAction } from "react";
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
  setCart: (id:number,name:string, picture:string, quantity:number, price:number, drop:boolean, index: number) => void, 
}

export const useCart = create <Cart> ( set =>({
  cart: [],
  setCart: (id:number,name:string,picture:string,quantity:number,price:number, drop:boolean, index:number) => {

    if (drop && index >= 0) {  
      set( ({cart}) => (
        { cart: cart.filter(item => item.id !== id) })      
      )
    } 
    set( ({cart})=>({ cart:[...cart,{id,name,picture,quantity,price}] }) )
  }
}))




