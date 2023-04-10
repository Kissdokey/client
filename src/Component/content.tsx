//Component目录下的三大组件是主界面App下的三大组成部分，header是最上方的页眉部分，pageFooter是下方的分页器，content是中间展示用户信息的部分，row是每一行的内容
import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useMemo } from "react";
import { useState } from "react";
import AppRow from "./row";
import { get_fetch } from "../fetch";
import { Button, Input, Divider, message } from "antd";
import { delCookie } from "../tools/cookie";
import Pagenate from "./pageFooter";
import Edit from "../tools/edit";
import { UsergroupAddOutlined } from "@ant-design/icons";
const AppContent = () => {
  let responseData;
  //number是服务端数据总量，一次返回五条数据，每条数据分别用一个state来追踪，这样的好处是，当修改一个用户信息时，返回五条数据只有一条数据是改变的
  //浏览器只会重新渲染改变了的那条数据
  const [number, setNumber] = useState(0);
  const [userData0, setUserData0] = useState("{}");
  const [userData1, setUserData1] = useState("{}");
  const [userData2, setUserData2] = useState("{}");
  const [userData3, setUserData3] = useState("{}");
  const [userData4, setUserData4] = useState("{}");
  const [value,setValue]=useState('');
  //这里用了usememo，只有当value值变化才会重新请求第一页，这个value也是搜索功能的关键，也是重置时候设置的内容
  useMemo(() => {
    get_fetch("/user?page=1&number=5&value="+value).then(
      async (res) => {
        //在这里用if-else处理respond-body的不同返回值，如果有state属性代表肯定出错，比如获取数据已经被删除等等，再在下面处理或者跳转到指定出错界面；
        // eslint-disable-next-line react-hooks/exhaustive-deps
        responseData = res;
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
          setNumber(responseData.length);
          setUserData0(JSON.stringify(responseData.data[0]));
          setUserData1(JSON.stringify(responseData.data[1]));
          setUserData2(JSON.stringify(responseData.data[2]));
          setUserData3(JSON.stringify(responseData.data[3]));
          setUserData4(JSON.stringify(responseData.data[4]));
          // setUserData(responseData.data)
        }
      },
      (rej) => {
        message.error("网络故障或者或请求被阻止！");
        console.log("网络故障或者或请求被阻止！");
        //跳转到出错界面；
      }
    );
  }, [value]);
  const { Search } = Input;
  const onSearch = (value: string) => {
    if(value!==""&&value.trim()!==""){
      value = value.trim();
      setValue(value);
      get_fetch("/user?page=1&number=5&value="+value).then(
        async (res) => {
          //在这里用if-else处理respond-body的不同返回值，如果有state属性代表肯定出错，比如获取数据已经被删除等等，再在下面处理或者跳转到指定出错界面；
          // eslint-disable-next-line react-hooks/exhaustive-deps
          responseData = res;
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
        
            setNumber(responseData.length);
            setUserData0(JSON.stringify(responseData.data[0]));
            setUserData1(JSON.stringify(responseData.data[1]));
            setUserData2(JSON.stringify(responseData.data[2]));
            setUserData3(JSON.stringify(responseData.data[3]));
            setUserData4(JSON.stringify(responseData.data[4]));
            // setUserData(responseData.data)
          }
        },
        (rej) => {
          message.error("网络故障或者或请求被阻止！");
          console.log("网络故障或者或请求被阻止！");
          //跳转到出错界面；
        }
      )
    }
  };
  return (
    <>
      <Content>
        <Button
          type="primary"
          style={{
            width: "20%",
            minWidth: "100px",
            maxWidth: "150px",
            marginBottom: "10px",
            marginRight: "10px",
          }}
        >
          <UsergroupAddOutlined />
          <Edit data="" type={2} />
        </Button>
        <Search
          style={{
            width: "40%",
            minWidth: "100px",
            maxWidth: "200px",
            marginRight: "10px",
          }}
          placeholder="请输入搜索词"
          onSearch={onSearch}
          enterButton
        />
        <Button
          onClick={() => {
            setValue('');
          }}
        >
          重置
        </Button>
        <Row
          gutter={[0, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          justify="center"
          align="middle"
        >
          <Col xs={0} sm={0} md={3} lg={2} xl={2}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>头像</span>
          </Col>
          <Col xs={5} sm={5} md={4} lg={2} xl={2}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>姓名</span>
          </Col>
          <Col xs={5} sm={5} md={5} lg={3} xl={3}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>专业</span>
          </Col>
          <Col xs={5} sm={5} md={4} lg={3} xl={3}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>学号</span>
          </Col>
          <Col xs={4} sm={4} md={4} lg={3} xl={2}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>性别</span>
          </Col>
          <Col xs={0} sm={0} md={0} lg={4} xl={4}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>电话</span>
          </Col>
          <Col xs={0} sm={0} md={0} lg={4} xl={4}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>邮箱</span>
          </Col>
          <Col xs={5} sm={5} md={4} lg={3} xl={3}>
            <span style={{ fontWeight: 600, fontSize: 17 }}>操作</span>
          </Col>
        </Row>
        <Divider></Divider>
        <AppRow userData={userData0} />
        <AppRow userData={userData1} />
        <AppRow userData={userData2} />
        <AppRow userData={userData3} />
        <AppRow userData={userData4} />
        <Pagenate
          setUserData0={setUserData0}
          setUserData1={setUserData1}
          setUserData2={setUserData2}
          setUserData3={setUserData3}
          setUserData4={setUserData4}
          number={number}
          setNumber={setNumber}
          value = {value}
        />
      </Content>
    </>
  );
};

export default AppContent;
