import React, {useState} from "react";
import Navbar from "./navbar";

const Register = () =>{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleRegister = async (event) =>{
        event.preventDefault();
        try{
            const response = await fetch ("http://localhost:5000/register", {
                method :"POST",
                headers :{"Content-Type": "application/json"},
                body: JSON.stringify({ firstname, lastname, email, password}),
            });
            const data = await response.json();
            localStorage.setItem("token", data.token);
        } catch (error){
            console.error(error);
        }
    };


    return(
        <div>
            <Navbar />
            <br />
            <h1>Register page</h1>
            <br />

            <form onSubmit={handleRegister}>
            <label>
                    Firstname: 
                    <input
                    type ="text"
                    value={firstname}
                    onChange={(event) =>setFirstname(event.target.value)}
                    />
                </label>
                <label>
                    Lastname: 
                    <input
                    type ="text"
                    value={lastname}
                    onChange={(event) =>setLastname(event.target.value)}
                    />
                </label>
                <label>
                    Username: 
                    <input
                    type ="email"
                    value={email}
                    onChange={(event) =>setEmail(event.target.value)}
                    />
                </label>
                <label>
                    Password: 
                    <input
                    type ="password"
                    value={password}
                    onChange={(event) =>setPassword(event.target.value)}
                    />
                </label>
            </form>
        </div>
    )
    
}

export default Register;