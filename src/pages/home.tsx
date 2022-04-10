import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product from "../components/Product";
import { useProduct } from "../state/globalState";

const Home = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ loading, setLoading ] = useState(true)

  const {products, setProducts} = useProduct()

  useEffect(() => { setProducts() }, [])
  useEffect(() => { setLoading(false) }, [products])
  return (
    loading ?
    <div> </div> 
    :
    <>
    <Header setIsOpen={setIsOpen} />
    <Container>
      {
        products.map((product) => <Product {...product} key={product.id}/>)
      }
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container> ) 
    </>
  );
};

export default Home;
