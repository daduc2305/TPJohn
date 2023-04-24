import React, {useState} from "react";
import Navbar from "./navbar";

const Login = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) =>{
        event.preventDefault();
        try{
            const response = await fetch ("http://localhost:5000/login", {
                method :"POST",
                headers :{"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
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
            <h1>Login page</h1>
            <br />

            <form onSubmit={handleLogin}>
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

export default Login;