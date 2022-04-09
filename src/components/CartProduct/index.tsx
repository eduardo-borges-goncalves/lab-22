import { useCart } from "../../state/globalState"
import { Formatted } from "../Cart"
import Incrementor from "../Incrementor"
import { Column, Info, Wrapper, WrapperIncrementor, Text } from "../Product/styles"

export const CartProduct = ({
  id, 
  name, 
  picture, 
  precoFormado, 
  price, 
  precoTotalNumerico,
  quantity
}: Formatted ) => {
  
  const {cart, setCart } = useCart()
  
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
    setCartGlobal(quantity, typeAction)
  }
  
  return (
  <Wrapper>
    <img src={picture} alt={`Imagem de referência ${name}`} />

    <Info>
      <Column>
        <Text>{ name }</Text>
        <Text>{ precoFormado }</Text>
      </Column>

      <WrapperIncrementor>
        <Incrementor 
          id={id} 
          quantity={quantity}
          changeQuantityBuy={changeQuantityBuy}
        />
      </WrapperIncrementor>
    </Info>
  </Wrapper>
  );
}