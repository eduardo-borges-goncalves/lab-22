import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";
import { useState } from "react";

import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  id: number;
  quantity: number;
  changeQuantityBuy: (typeAction:string) => void;
};

const Incrementor = ({
  id, 
  quantity,
  changeQuantityBuy 
}: IncrementorProps) => {
  
  return (
  <Wrapper>
    <IconWrapper>
      <SubtractIcon 
        aria-label="Subtract item" 
        onClick={()=> changeQuantityBuy("sub")}/>
    </IconWrapper>

    <Quantity>{quantity}</Quantity>

    <IconWrapper>
      <PlusIcon 
        aria-label="Add item" 
        onClick={()=> changeQuantityBuy("sum")}
        />
    </IconWrapper>
  </Wrapper>
  )
}

export default Incrementor;
