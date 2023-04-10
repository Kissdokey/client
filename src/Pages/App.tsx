//page目录下的六个组件是路由组件，App组件用于展示主界面
//在该组件返回值return上进行了分支判断，屏幕宽度过小时，会将左侧Sider收起来，放到下面（此过程需要重新渲染页面，由于实际情况是根据用户设备宽度进行渲染，没有
//网页宽度动态变化的场景，以此没有追踪改状态，如需要测试要手动刷新，当屏幕宽度小于600时，刷新便会变化），结合antd的Grid栅栏布局，实现主界面的响应式布局
import { Button, message } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";
import AppHeader from "../Component/header";
import { Layout } from "antd";
import React from "react";
import "../index.css";
import { get_fetch } from "../fetch";
import { store } from "../store";
import { useState } from "react";
import { Link } from "react-router-dom";
import { delCookie } from "../tools/cookie";
import AppContent from "../Component/content";
const { Content, Sider } = Layout;
const App = () => {
  let responseData;
  //adminData用于记录管理者信息，state搭配redux实现实时检测用户登录状态
  const [adminData, setAdminData] = useState("{}");
  const [state, setstate] = useState(store.getState().value);

  // let adminJson=JSON.parse(adminData);
  if (state === true) {
    //每一个fetch函数都用.then进行所有情况的异常处理，如果网络问题导致的异样，会调用then的第二个回调函数展示，其他情况用户都会
    //返还一个promise对象，respnseData来await接收这个数据，这个数据再用JSON.parse进行解析，内容就是服务端返回的数据了，
    //服务端也进行了异样处理，返回的数据会有code属性，标识数据状态，0代表OK，-1代表服务端的问题，-2代表用户的问题
    //根据code的值给予用户不同的反馈信息
    get_fetch("/admin").then(
      async (res) => {
        //在这里用if-else处理respond-body的不同返回值，如果有state属性代表肯定出错，比如获取数据已经被删除等等，再在下面处理或者跳转到指定出错界面；
        responseData = await res;
        responseData = JSON.parse(responseData);
        if (responseData.code === -1) {
          console.log(responseData.msg);
          //跳转到错误页面
          message.error(responseData.msg);
          setTimeout(() => {
            window.location.href = "/error";
          }, 2000);
        }
        //这里出错只能是用户登陆状态出错，所以跳转到登陆界面->将store更新,如果有cookie那一定是出错的，可能原因是服务端那边session数据更新，需要删掉
        else if (responseData.code === -2) {
          message.error(responseData.msg);
          setTimeout(() => {
            if (document.cookie.indexOf("isLoging") !== -1) {
              delCookie("isLoging");
            }
            window.location.href = "/error";
          }, 2000);
        } else {
          responseData = JSON.stringify(responseData.data);
          setAdminData(responseData);
        }
      },
      (rej) => {
        message.error("网络故障或者或请求被阻止！");
        console.log("网络故障或者或请求被阻止！");
        //跳转到出错界面；
      }
    );
  }
  store.subscribe(() => {
    setstate(store.getState().value);});
  if(document.body.offsetWidth>=600){
    return (
      <Layout>
        <AppHeader data={adminData} />
        <Layout>
          <Sider width={120}  className="site-layout-background">
          <Link to="/app">
              <Button type="primary" style={{ width: 120, borderColor: "black" }}>
              <RadarChartOutlined />
              <span>人员管理</span>
              </Button>
          </Link>
            <Link to="/about">
              <Button type="primary" style={{ width: 120, borderColor: "black" }}>
                <RadarChartOutlined />
                <span>关于亮点</span>
              </Button>
            </Link>
            <Link to="/">
              <Button type="primary" style={{ width: 120, borderColor: "black" }}>
                <span>返回首页</span>
              </Button>
            </Link>
          </Sider>
          <Layout style={{ padding: "0px 24px 0px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 14,
                margin: 0,
              }}>
              <AppContent />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
  else return( <Layout>
    <AppHeader data={adminData} />
    <Layout>
      <Layout style={{ padding: "0px 24px 0px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 14,
            margin: 0,
          }}>
          <AppContent />
          <Link to="/app">
              <Button  style={{ width: 80, borderColor: "black" }}>
              <span>人员管理</span>
              </Button>
          </Link>
            <Link to="/about">
              <Button  style={{ width: 80, borderColor: "black" }}>
                <span>关于</span>
              </Button>
            </Link>
            <Link to="/">
              <Button style={{ width: 80, borderColor: "black" }}>
                <RadarChartOutlined />
                <span>返回首页</span>
              </Button>
            </Link>
        </Content>
      </Layout>
    </Layout>
  </Layout>)
  
};
export default App;
