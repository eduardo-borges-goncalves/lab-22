import { useEffect, useState } from "react";
import { useCart, useProduct } from "../../state/globalState";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

export type ProductProps = {
  id: number;
  name: string;
  picture: string;
  price: number;
  quantity: number;
}

const Product = ({ id, name, price, picture, quantity }: ProductProps) => {
  const [ quantityBuy, setQuantityBuy ] = useState(1)
  
  const {cart, setCart } = useCart()
  
  let priceTotal = price * quantityBuy;
  let formattedPrice = priceTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

  function setCartGlobal (quantity:number, type: string) {
    let indexIsOnCart = -1
    cart.map( (car) => {
      if (car.name === name ) {
        indexIsOnCart = cart.indexOf(car)
      }
    })
    
    quantity >= 0 &&
     setCart(id, name, picture, quantity, price, true, indexIsOnCart);
  }

  function changeQuantityBuy (typeAction:string, quantity: number) {
    if (typeAction === "sub" && quantityBuy > 0 ){
      setQuantityBuy(quantityBuy - 1) 
    }
    if (typeAction === "sum"){
      setQuantityBuy(quantityBuy + 1)
    }
    setCartGlobal(quantity, typeAction)
  }


  return (
  <Wrapper>
    <img src={picture} alt={`Imagem de referência ${name}`} />

    <Info>
      <Column>
        <Text>{ name }</Text>
        <Text>{ formattedPrice }</Text>
      </Column>

      <WrapperIncrementor>
        <Incrementor 
          id={id} 
          quantity={quantityBuy}
          changeQuantityBuy={changeQuantityBuy}
        />
      </WrapperIncrementor>
    </Info>
  </Wrapper>
  );
}

export default Product;
