import logo from './logo.svg';
import './App.css';
import Products2 from './products2';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login";
import Register from "./register";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Products2 />,
  },
  {
      path: "/login",
      element: <Login />,
  },
  {
      path: "/register",
      element: <Register />,
  },
  ]);
 
 function App() {
 return (
    <RouterProvider router={router} />
  );
 }
 
 export default App;




/* function App() {
  return (
    <div>
      <Products/>
    </div>
  );
}

export default App;
 */