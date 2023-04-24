import { useEffect, useState } from "react";
import getProducts from "./Products";
function ProductForm({modification, getProducts,handleSetModification=null, product=null}){

    const [newProduct, setNewProduct] = useState({
        nom:"",
        description: "",
        price: "",
        stock: false,

    });
    
    
   useEffect(()=>{
    if (product){
        setNewProduct(product);
    }
    
   },[product])
    

function handleSubmit(event){
    event.preventDefault();
    console.log(newProduct);


   
    fetch("http://localhost:5000/add-product",{
        method: "POST",
        body: JSON.stringify(newProduct),
        headers:{
            "Content-Type": "application/json"
        },

    })
    .then((response) => response =>{
       console.log(response);
      
       
    })
    .then(getProducts())
    .then(
        setNewProduct({
            nom:"",
            description: "",
            price: "",
            stock: false,
           })
    )
        .catch ((error) => console.error(error));
    }

function handleUpdate(event){
    event.preventDefault();
    console.log(newProduct);
    
    fetch("http://localhost:5000/product/" +newProduct.id,{
        method: "PUT",
        body: JSON.stringify(newProduct),
        headers:{
            "Content-Type": "application/json"
        },

    })
    .then((response) => {
       console.log(response);
       setNewProduct({
        nom:"",
        description: "",
        price: "",
        stock: false,
       });
       getProducts();
       handleSetModification();
    })
        .catch ((error) => console.error(error));
    }



    function handleStock(event){
        setNewProduct({ ...newProduct, stock: event.target.checked})
        console.log(event.target.checked)
    }

return (
    <div>
        {!modification ? (
        <h1>Ajouter un produit</h1>
        ) : (
        <h1>Modifier le produit</h1>
        )}
        

        <form onSubmit={!modification ? handleSubmit : handleUpdate}>
            <div>
                <label>Product Name : </label>
                <input 
                    type ="text"
                    value ={newProduct.nom}
                    onChange={(event)=>
                    setNewProduct({ ...newProduct, nom: event.target.value})
                }
                />
            </div>
            <div>
                <label>Product description : </label>
                <textarea 
                    value ={newProduct.description}
                    onChange={(event)=>
                    setNewProduct({ ...newProduct, description: event.target.value})
                }
                />
            </div>
            <div>
                <label>Product price : </label>
                <input 
                    type ="text"
                    value ={newProduct.price}
                    onChange={(event)=>
                    setNewProduct({ ...newProduct, price: event.target.value})
                }
                />
            </div>
            <div>
            <label>stock : </label>
                <input 
                    type ="checkbox"
                    checked ={newProduct.stock}
                    onChange={handleStock}
                
                />
            </div>
            <button>{!modification ? "enregistrer" : "Modifier"}</button>
        </form>
        </div>

)


}



export default ProductForm;