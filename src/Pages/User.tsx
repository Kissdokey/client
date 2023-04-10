
  //page目录下的六个组件是路由组件，该界面用于展示用户的详细信息，通过操作->详情进入，高度还原了图片中的demo,不足的点在于没有实现响应式布局
  import {  Col,  Row } from "antd";
  import { Layout} from "antd";
  import React from "react";
  import "../index.css";
  import {  Link, useLocation } from "react-router-dom";
  const { Header, Content, Sider } = Layout;
  const App: React.FC = () => {
    const {state}=useLocation();
    console.log(state);
    
    const userJson = JSON.parse(state);
    return (
      <Layout>
        <Header style={{color:"white"}}><div>人员管理系统</div></Header>
        <Layout>
          <Sider width={50} className="site-layout-background">
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
              }}
            >
              <Link to = "/app"><span style={{color:"grey"}}>人员管理</span></Link>
              <span style={{color:"black"}}>/人员详情</span>
              <Content>
                <Row gutter={[40,40] }  >
                    <Col  offset={13} xs={2}>头像:</Col>
                    <Col xs={9}><img style={{width:"100px"}} src={userJson.avatar} alt="头像" /></Col>
               
                    <Col offset={13} xs={2}>姓名:</Col>
                    <Col xs={9}>{userJson.name}</Col>
              
                    <Col offset={13} xs={2}>专业:</Col>
                    <Col  xs={9}>{userJson.Profession}</Col>
             
                    <Col offset={13} xs={2}>学号:</Col>
                    <Col xs={9}>{userJson.stuNum}</Col>
         
                    <Col offset={13} xs={2}>性别:</Col>
                    <Col xs={9}>{userJson.gender}</Col>
              
                    <Col offset={13} xs={2}>电话:</Col>
                    <Col xs={9}>{userJson.phone}</Col>
               
                    <Col offset={13} xs={2}>邮箱:</Col>
                    <Col xs={9}>{userJson.email}</Col>
                </Row>
                </Content>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  };
  
  export default App;
  