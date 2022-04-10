import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";
import { useEffect, useState } from "react";
import { useQuantity } from "../../state/globalState";

import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  id: number;
  setProductInCart: (quantity: number) => void;
};

const Incrementor = ({
  id, 
  setProductInCart, 
}: IncrementorProps) => {
  const [incrementorQuantity, setIncrementorQuantity] = useState(0)

  const {quantity, setQuantity} = useQuantity()

  useEffect(() => {
    let quantityToIncrementor = quantity.filter(item=> item.id === id)
    if (quantityToIncrementor.length > 0) {
      setIncrementorQuantity(quantityToIncrementor[0].quantityPerProduct)
      setProductInCart( quantityToIncrementor[0].quantityPerProduct )
    }
  }, [quantity])

  function handleSetQuantity(type: string) {
    type === "sub" && incrementorQuantity > 0 && setQuantity(id, incrementorQuantity - 1); 
    type === "sum" && setQuantity(id, incrementorQuantity + 1);
  }

  return (
  <Wrapper>
    <IconWrapper>
      <SubtractIcon 
        aria-label="Subtract item" 
        onClick={()=> handleSetQuantity("sub")}/>
    </IconWrapper>

    <Quantity>{incrementorQuantity}</Quantity>

    <IconWrapper>
      <PlusIcon 
        aria-label="Add item" 
        onClick={()=> handleSetQuantity("sum") }/>
    </IconWrapper>
  </Wrapper>
  )
}

export default Incrementor;
