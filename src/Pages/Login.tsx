//page目录下的六个组件是路由组件，Login是用户登录界面，设置了一张背景图，蛮好看的；
import "antd/dist/antd.min.css";
import "../index.css";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { store, login } from "../store";
import { post_fetch } from "../fetch";
import Background from "../linghua.png";
let resdata;
const Login = () => {
  const onFinish = (values: any) => {
    //这里的post_fetch同样进行了判断来自服务端的数据状态作出不同的响应
    post_fetch("/login", values).then(async (ret) => {
      resdata = await ret;
      resdata = JSON.parse(resdata);
      if (resdata.code === -1) {
        console.log(resdata.msg);
      } else if (resdata.code === -2) {
        console.log(resdata.msg);
        message.error(resdata.msg);
      } else {
        store.dispatch(login());
        message.success("登陆成功！");
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        padding:"120px",
        backgroundSize: "cover",
        backgroundPosition: " center",
        width: "100%",
        height: "100% ",
        backgroundImage: `url(${Background})`,
      }}
    >
      <span
        style={{
          color:"white",
          fontWeight: "bold",
          fontSize: "20px",
          textAlign: "center",
          display: "block",
          marginTop: "0px",
        }}
      >
        登陆
      </span>
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          //label="Username"
          name="username"
          style={{ marginBottom: "15px" }}
        >
          <Input style={{width:"200px" , marginLeft:"556px"}} placeholder="用户名" />
        </Form.Item>

        <Form.Item
          //label="Password"
          name="password"
          style={{ marginBottom: "15px" }}
        >
          <Input.Password  style={{width:"200px",marginLeft:"556px"}} placeholder="密码" />
        </Form.Item>
        <Form.Item >
          <Button  type="primary" style={{marginLeft:"580px",background:"pink",borderColor:"pink"}}>
            <Link to="/">返回</Link>
            </Button>
            <Button type="primary" htmlType="submit" style={{marginLeft:"10px",background:"pink",borderColor:"pink"}}>
            登陆
          </Button>
          
        </Form.Item >
      </Form>
     
    </div>
  );
};

export default Login;

export const data = resdata;
