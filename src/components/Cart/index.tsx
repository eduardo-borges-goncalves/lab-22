import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";

import { Wrapper, Subtotal, Header } from "./styles";
import { useCart } from "../../state/globalState";
import Product from "../Product";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) => {
  const [totalPrice, setTotalPrice] = useState(0)

  const { cart } = useCart()

  useEffect(() => {
    let cumulatedPrice = 0
    cart.map(car => setTotalPrice(cumulatedPrice += car.price * car.quantity))
  }, [cart])

  let formattedPrice = totalPrice.toLocaleString("pt-br", { style: 'currency',
  currency: "BRL" })

  return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <Typography level={5} size="large" fontWeight={600}>
          Produtos no carrinho
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>
      { cart.length > 0 ?
        <>
        { cart.map(product =>
            <Subtotal>
              <Product {...product} key={product.id} />
            </Subtotal> 
          )
        }
        <Subtotal>
          <Typography level={5} size="large" fontWeight={600}>
            Total
          </Typography>
          <Typography>{formattedPrice}</Typography>
        </Subtotal>
        </>
        :
        <Subtotal>
          <Typography level={5} size="large" fontWeight={600}>
            Total
          </Typography>
          <Typography> R$ 0,00 </Typography>
        </Subtotal>
      }
      <Button fullWidth>Finalizar compra</Button>
    </Wrapper>
  );
}

export default MenuPayment;
