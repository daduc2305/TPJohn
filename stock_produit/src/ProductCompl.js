import { useEffect, useState } from "react";
import {getProducts, handleDelete} from "./Products";
function ProductCompl({
    product,
    handleDelete,
    handleProductToModify=null,
    getProducts
}) {
     

function handleClick () {
    fetch("http://localhost:5000/delete-product/" +product.id,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((response) => response =>{
        console.log(response);
       
        
     })
     .then(getProducts())
     .then(
        console.log('')
     )
         .catch ((error) => console.error(error));
    }

return(
    <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.nom}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.stock ? "En stock" : "Pas de Stock"}</td>
        <td>
            <button onClick={() => handleProductToModify(product)}>Modifier</button>
        </td>
        <td>
            {/* <button onClick={() => handleClick(product.id)}>Supprimer</button> */}
            <button onClick={handleClick}>Supprimer</button>
        </td>
    </tr>
)
}

export default ProductCompl;