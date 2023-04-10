//该组件是用于弹出提示信息的，比如用户退出登录和删除用户时，因为是隐藏的所以放到工具类里。
//该组件有四个参数，content是最外层调用该组件的元素的名字，type是modal对话框的标题，todo是代表将要做什么是一个数字，比如1代表退出登录，2代表删除用户
//stuNum是删除用户时候必须传进来的参数，因为stuNum是用户的唯一标识主码，需要以此判断操作对象；
//该组件用参数进行用途的判断，实现了组件的可复用性
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {  Modal,  message } from "antd";
import { get_fetch } from "../fetch";
import { delCookie } from "./cookie";
const AppAlert = (props: { content: string; type: string; todo: number ;stuNum:string}) => {
  const { content, type, todo ,stuNum} = props;
  const { confirm } = Modal;
  const showPromiseConfirm = () => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: type,
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        if (todo === 1) {
          get_fetch("/logout").then((res) => {
            let resData = JSON.parse(res);
            if (resData.code === 0 || resData.code === -2) {
              message.success("退出登陆成功");
              setTimeout(() => {
                delCookie("isLoging");
                window.location.href = "/";
              }, 1000);
            } else {
              message.error("退出登陆失败");
            }
          });
        }
        else if(todo===2){
          // eslint-disable-next-line no-useless-concat
          get_fetch("/delete"+"?"+"stuNum="+stuNum).then((res)=>{
            let resData = JSON.parse(res);
            if(resData.code === 0 ){
              message.success("删除成功");
              setTimeout(() => {
                window.location.href = "/app";
              }, 1000);
            }
            else{
              message.error(resData.msg);
            }
          })
        }
      },
      onCancel() {},
    });
  };
  let mycolor="black";
  if(todo===2){
    mycolor="#5290f4"
  }
  return <p style={{color:mycolor}} onClick={showPromiseConfirm}>{content}</p>;
};

export default AppAlert;
