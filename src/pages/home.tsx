import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product from "../components/Product";
import { useProduct } from "../state/globalState";

const Home = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ loading, setLoading ] = useState(true)

  const {dataArray, setDataArray} = useProduct()

  useEffect(() => { setDataArray() }, [])
  useEffect(() => { setLoading(false) }, [dataArray])
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
function useProducts() {
  throw new Error("Function not implemented.");
} // o que é iso e porque está aqui ?

