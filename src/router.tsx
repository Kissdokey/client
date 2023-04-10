
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login"
import Welcom from "./Pages/Welcom";
import App from "./Pages/App"
import {store} from "./store"
import Error from "./Pages/error";
import User from "./Pages/User";
import {useState} from "react"
import About from "./Pages/About";
//用全局变量store搭配state来检测用户是否处于登录状态，用户处于登录状态，那么他能访问到的路由组和未登录是不一样的，也就避免了登录后可以重复登录的情况
function Router() {
    const [state,setstate]=useState(store.getState().value);
    store.subscribe(()=>{
        setstate(store.getState().value);
    })
    if(state)
    return (
      <Routes>
         <Route path="/" element={<Welcom /> } />
         <Route path="/app" element={<App />} />
         <Route path="/error" element={<Error />} />
         <Route path="/user" element={<User/>} />
         <Route path="/about" element={<About/>} />
      </Routes>
    );
    else
    return(
        <Routes>
        <Route path="/" element={<Welcom />} />
        <Route path="/app" element={<Login />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    )
  }
  export default Router;

    