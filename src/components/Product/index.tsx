import { useEffect, useState } from "react";
import { useCart } from "../../state/globalState";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

export type ProductProps = {
  id: number;
  name: string;
  picture: string;
  price: number;
  quantity: number;
}

const Product = ({ id, name, price, quantity, picture }: ProductProps) => {

  const [ totalFormatted, setTotalFormatted ] = useState("")
 
  const { cart, setCart } = useCart()

  useEffect(() => {
    let quantityToPrice = cart.filter(item=> item.id === id)
    if (quantityToPrice.length > 0) {
      let priceTotal = price * quantityToPrice[0].quantity
      setTotalFormatted(priceTotal.toLocaleString('pt-br',
        {style:"currency", currency:"BRL"}))
    } else setTotalFormatted('')
  }, [cart])

  let formattedPrice = price.toLocaleString('pt-br',{style: 'currency',
  currency: 'BRL'});

  function setProductInCart (amount:number) {
    let product = {id, name, quantity: amount, picture, price}
    quantity >= amount ? setCart(product)
    : window.alert(`Ixxe, só temos ${quantity} unidades desse produto 
      no nosso estoque`)
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
        <Incrementor id={id} setProductInCart={setProductInCart} />
      </WrapperIncrementor>
    </Info>
  </Wrapper>
  );
}

export default Product;
