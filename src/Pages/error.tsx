//page目录下的六个组件是路由组件，Erro组件是用于出现错误时候跳转的，其内有一个返回首页的按钮，用户可以重新尝试登录
import { Button} from "antd";
import { Empty } from 'antd';
import "../index.css";
import {  Link } from "react-router-dom";

const Error = ()=>{
   // const {errorIfmt} = props;
    return(
        <>
        <div id = "errorPage">
        <Empty description={"出错了！"} />
        <Link id="errorBack" to = "/"><Button type="primary">返回首页 </Button></Link>
        </div>
        </>
    ) 
}
export default Error;