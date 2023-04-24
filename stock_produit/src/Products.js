import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductCompl from "./ProductCompl";
import Navbar from "./navbar";
import Register from "./register";
import Login from "./login";

function Products(){

    const [products, setProducts] = useState([]);
    const [modification, setModification] = useState(false);
    const [productToModify, setProductToModify] = useState ({});
    const [stock, setStock] = useState(false);


    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
       console.log(Products) 
        //getProducts();
    }, [Products]);
    
    function getProducts(){
        fetch("http://localhost:5000/get-products",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }

        })
    .then((response) => response.json())
    .then ((data) => setProducts(data))
    //.then ((data) => console.log(data))
    .catch ((error) => console.error(error));
    }

    function handleDelete(id) {
        //let compls = products.filter((product) =>product.id !== id);
        let compls = [...products];
        compls.splice(id,1);
        setProducts(compls);
    }

    function handleProductToModify(product){
        setProductToModify(product);
        setModification(true);
    }

    function handleSetModification(){
        setModification(false);
       // getProducts();
    }

return(
<div>
    <br /> <br /><Navbar /> <br />
    <table> 
    <thead>
        <tr>
            <th>id</th>
            <th>nom</th>
            <th>description</th>
            <th>price</th>
            <th>stock</th>
            <th>modifier</th>
            <th>supprimer</th>
        </tr>
    </thead>
    <tbody>
        {products.map((product)=> (
           <ProductCompl key={product.id} product={product} handleDelete={handleDelete} handleProductToModify={handleProductToModify}/>
           
        ))}
    </tbody>
    </table>

    <br />
    <br />
    
    {!modification ? (
        <ProductForm modification ={modification} getProducts={getProducts}/>
    ) : (
        <ProductForm 
            modification ={modification}
            handleSetModification={handleSetModification}
            product={productToModify}
            getProducts={getProducts}
            />
    )}
    

</div>
)


}

export default Products;