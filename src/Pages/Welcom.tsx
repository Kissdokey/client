//page目录下的六个组件是路由组件，该组件是最开始的欢迎界面，鼠标点击进入登录界面
import 'antd/dist/antd.min.css';
import '../index.css';
import { Link } from "react-router-dom"
import Background from "../linghua.png";
// import {store} from "./store"
// import {useState} from "react"
const Welcom = ()=>{
    return (
            <div style={{
                backgroundSize: "cover",
                backgroundPosition:" center", width:"100%",height:"100% ",backgroundImage:`url(${Background})` }}>
            <div>
            
            
                <Link to="/app" >
                    <div  id = "welcomtext" style={{fontWeight:"bolder",fontSize:60,color:"pink",position:"fixed",top:"200px" ,right:"33%"}}>
                        CLICK ME TO START</div>
                    </Link>
            
            </div>
        </div>
        
    );
}
export default Welcom;