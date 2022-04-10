import { useEffect, useState } from "react";
import { useCart, useProduct, useQuantity } from "../../state/globalState";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

export type ProductProps = {
  id: number;
  name: string;
  picture: string;
  price: number;
  quantity: number;
}

const Product = ({ id, name, price, picture }: ProductProps) => {
  const [ totalFormatted, setTotalFormatted ] = useState("")
 
  const { setCart } = useCart()
  const { quantity } = useQuantity()

  useEffect(() => {
    let quantityToPrice = quantity.filter(item=> item.id === id)
    if (quantityToPrice.length > 0) {
      let priceTotal = price * quantityToPrice[0].quantityPerProduct
      setTotalFormatted(priceTotal.toLocaleString('pt-br', {style:"currency", currency:"BRL"}))
    }
  }, [quantity])

  let formattedPrice = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

  function setProductInCart (quantity:number) {
    quantity >= 0 &&
     setCart(id, name, picture, quantity, price);
  }

  return (
  <Wrapper>
    <img src={picture} alt={`Imagem de referência ${name}`} />

    <Info>
      <Column>
        <Text>{ name }</Text>
        <Text>{ formattedPrice }</Text>
      </Column>
      <Column>
        <Text>{ totalFormatted }</Text>
      </Column>

      <WrapperIncrementor>
        <Incrementor 
          id={id} 
          setProductInCart={setProductInCart}
          />
      </WrapperIncrementor>
    </Info>
  </Wrapper>
  );
}

export default Product;
