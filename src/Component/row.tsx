//Component目录下的三大组件是主界面App下的三大组成部分，header是最上方的页眉部分，pageFooter是下方的分页器，content是中间展示用户信息的部分，row是每一行的内容
//该组件代表数据展示中的一行，采用antd框架的row，col栅栏响应式布局
import { ManOutlined, QuestionOutlined, SettingOutlined, WomanOutlined } from "@ant-design/icons";
import {  Col, Divider, Popover, Row } from "antd";
import { Link } from "react-router-dom";
import Edit from "../tools/edit";
import AppAlert from "../tools/alert";
const AppRow = (props: { userData: string }) => {
  const { userData } = props;
  //这个处理是因为如果传入数据为空，在下方使用json.parse会报错
  if(userData==="null"){
    return <></>
  }
  //根据性别设置不同的icon图标
  let genderIcon = (<WomanOutlined style={{color:"pink"}} />)
  const jsonData = JSON.parse(userData);
  if (jsonData.gender==="男"){
      genderIcon = (<ManOutlined  style={{color:"#5290f4"}}/>);
  }
  else if(jsonData.gender ==="其他"){
    genderIcon =(<QuestionOutlined />)
  }
  //xs,sm,md,lg,xl是不同屏幕尺寸下每列占24份中的几份，以此实现响应式布局；当屏幕缩小时，将某些不重要的信息设置为0如果想要查看可以点击详情
  return (
    <>
    <Row gutter={[5, 0]} justify="center" align="middle">
      <Col  xs={0} sm={0} md={3} lg={2} xl={2}>
        <img style={{ width: "40%" }} src={jsonData.avatar} alt="头像" />
      </Col>
      <Col  xs={5} sm={5} md={4} lg={2} xl={2}>
        {jsonData.name}
      </Col>
      <Col xs={5} sm={5} md={5} lg={3} xl={3}>
        {jsonData.Profession}
      </Col>
      <Col xs={5} sm={5} md={4} lg={3} xl={3}>
        {jsonData.stuNum}
      </Col>
      <Col xs={4} sm={4} md={4} lg={3} xl={2}>
        {genderIcon}
      </Col>
      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
        {jsonData.phone}
      </Col>
      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
        {jsonData.email}
      </Col>
      <Col xs={5} sm={5} md={4} lg={3} xl={3}>
        <Popover
          content={
            <>
              <Link to = "/user" state={userData} ><p style={{color:"#5290f4"}}>查看</p></Link>
              <Edit data = {userData} type={1}/>
              <AppAlert content="删除" type={"确认删除用户:"+jsonData.name+"?" } todo={2} stuNum={jsonData.stuNum}/>
            </>
          }
        >
          <SettingOutlined style={{ color: "blue", width: 40 }} />
        </Popover>
      </Col>
    </Row>
    <Divider></Divider>
    </>
  );
};
export default AppRow;
