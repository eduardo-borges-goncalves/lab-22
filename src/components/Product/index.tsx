import { useState } from "react";
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

  let priceTotal = price * quantityBuy;
  let formattedPrice = priceTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

  function changeQuantityBuy (typeAction:string) {
    if (typeAction === "sub" && quantityBuy > 0 )
      setQuantityBuy(quantityBuy - 1) 
    else if (typeAction === "sum")
      setQuantityBuy(quantityBuy + 1)
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
          changeQuantityBuy={changeQuantityBuy} />
      </WrapperIncrementor>
    </Info>
  </Wrapper>
  );
}

export default Product;
