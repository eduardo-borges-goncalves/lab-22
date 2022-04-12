import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";
import { useEffect, useState } from "react";
import { useCart } from "../../state/globalState";

import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  id: number;
  setProductInCart: (amount: number) => void;
};

const Incrementor = ({ id, setProductInCart }: IncrementorProps) => {

  const [incrementorQuantity, setIncrementorQuantity] = useState(0)

  const { cart } = useCart()

  useEffect(() => {
    let quantityAtCart = cart.filter(item=> item.id === id)
    console.log(cart)
    quantityAtCart.length > 0 ?
      setIncrementorQuantity(quantityAtCart[0].quantity)
    : setIncrementorQuantity(0);
  }, [cart])

  function handleSetCart(type: string) {
    type === "sub" && incrementorQuantity > 0 && setProductInCart(incrementorQuantity - 1); 
    type === "sum" && setProductInCart(incrementorQuantity + 1);
  }

  return (
  <Wrapper>
    <IconWrapper>
      <SubtractIcon 
        aria-label="Subtract item" 
        onClick={()=> handleSetCart("sub")}/>
    </IconWrapper>

    <Quantity>{incrementorQuantity}</Quantity>

    <IconWrapper>
      <PlusIcon 
        aria-label="Add item" 
        onClick={()=> handleSetCart("sum") }/>
    </IconWrapper>
  </Wrapper>
  )
}

export default Incrementor;
