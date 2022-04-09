import axios from "axios";
import React, { SetStateAction } from "react";
import create from "zustand"
import { ProductProps } from "../components/Product";

type Data = {
  dataArray: ProductProps[],
  setDataArray: ()=> void
}

export const useProduct = create <Data> ( set => ({
  dataArray: [],
  setDataArray: async () => {
    const response = await axios.get("http://localhost:3001/products")
    set(() =>({dataArray:response.data}))
  }
}))

type CartElement = {
  quantity: number | 0,
  price: number, 
  name: string, 
  id: number,
  picture: string,
}

type Cart = {
  cart: CartElement[],
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
function Dispatch<T>(): () => void {
  throw new Error("Function not implemented.");
}



