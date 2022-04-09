import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";
import { useState } from "react";
import { useCart, useProduct } from "../../state/globalState";

import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  id: number;
  quantity: number;
  changeQuantityBuy: (typeAction:string, quantity: number) => void;
};

const Incrementor = ({
  id, 
  quantity,
  changeQuantityBuy, 
}: IncrementorProps) => {

  // const {cart} = useCart()
  // console.log("inc", cart)

  return (
  <Wrapper>
    <IconWrapper>
      <SubtractIcon 
        aria-label="Subtract item" 
        onClick={()=> changeQuantityBuy("sub", quantity-1)}/>
    </IconWrapper>

    <Quantity>{quantity}</Quantity>

    <IconWrapper>
      <PlusIcon 
        aria-label="Add item" 
        onClick={()=> changeQuantityBuy("sum", quantity+1)}
        />
    </IconWrapper>
  </Wrapper>
  )
}

export default Incrementor;
