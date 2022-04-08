import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product, { ProductProps } from "../components/Product";

// const data: ProductProps = {
//   id: 1,
//   name: "Product 1",
//   picture:
//     "https://somos.lojaiplace.com.br/wp-content/uploads/2021/04/apple_iphone-12-spring21_purple_04202021.jpg",
//   price: 20.50,
//   quantity: 2
// }

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ loading, setLoading ] = useState(true)
  const [ dataArray, setDataArray ] = useState ([])

  useEffect(() => { buscaProdutos() }, [])
  useEffect(() => { setLoading(false) }, [dataArray])

  async function buscaProdutos () {
    const url = " http://localhost:3001/products"
    const response = await axios.get( url )
    // console.log(response.data)
    setDataArray(response.data)
  }
    
  return (
    loading ?
    <div> </div> :
    <>
      <Header setIsOpen={setIsOpen} />
      {
        dataArray.map((product) => {
          return (
          <Container>
            <Product {...product} />
            <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
          </Container> )
        })
      }
    </>
  );
};

export default Home;
