import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";

import { Wrapper, Subtotal, Header } from "./styles";
import { useCart } from "../../state/globalState";
import Product from "../Product";
import { CartProduct } from "../CartProduct";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Adicionar itens ao carrinho, design ao seu critério mas deve conter:
 * - Nome do produto
 * - Imagem
 * - Preço
 * - Incrementador
 */

/*
 * 
 * passar para um array o preço com o id
 * se id já existente, excluir e atualizar o preço 
 * formatar o preço 
 * porque está pegando trezentas vezes?
*/

type Total = {
  id: number, 
  precoTotal: number,
  price: number, 
  name: string, 
  picture: string,
  quantity: number,
}

export type Formatted = {
  id: number, 
  precoFormado: string, 
  name: string, 
  picture: string,
  precoTotalNumerico: number,
  price: number, 
  quantity: number,
}

// refatorar
// ter apenas um total
// lista de produtos no carrinho 
// conectar o incrementor da home com o do carrinho

const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) => {
   
  const [ formattedPrice, setFormattedPrice ] = useState<Formatted[]> ([])
  const [ total, setTotal ] = useState<Total[]> ([])

  const { cart } = useCart()

  useEffect( () => {   
    cart.map( car => {

      let arnaldo:Total[] = total.filter(value => car.id !== value.id) 
      setTotal( [ ...arnaldo, {
        id: car.id,
        price: car.price,
        precoTotal: car.price * car.quantity, 
        picture: car.picture, 
        name: car.name, 
        quantity: car.quantity
      }] ) 
      
    })
  } ,[cart])

  useEffect( () => {  
    let copiaFormatted:Formatted[] = []

      total.map( value => {
        copiaFormatted.push({
          id: value.id, 
          precoFormado: value.precoTotal.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}), 
          name: value.name, 
          picture: value.picture,
          price: value.price, 
          precoTotalNumerico: value.precoTotal,
          quantity: value.quantity,
        })
        setFormattedPrice(copiaFormatted) 
      })
 
  }, [total])
  
  console.log("oi Deus to cansado", formattedPrice)

  return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <Typography level={5} size="large" fontWeight={600}>
          Produtos no carrinho
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>
      {
        formattedPrice.length > 0 && cart[0].quantity > 0 ? 
          <>
            { 
              formattedPrice.map( productPrice => {
                return (
                  <>
                    <Subtotal>
                      <CartProduct { ...productPrice} />
                    </Subtotal>
                    <Subtotal>
                      <Typography level={5} size="large" fontWeight={600}>
                        Total
                      </Typography> 
                      <Typography>{ productPrice.precoFormado }
                      </Typography>
                    </Subtotal>
                  </>
                )
              })
            }
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
