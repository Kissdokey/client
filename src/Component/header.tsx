//Component目录下的三大组件是主界面App下的三大组成部分，header是最上方的页眉部分，pageFooter是下方的分页器，content是中间展示用户信息的部分，row是每一行的内容
//该组件传入一个参数data，也即管理者的个人信息。组件内部用antd框架的popover和Avatar组件，实现了头相的展示和气泡折叠栏
import { Layout, Avatar, Popover, Divider} from "antd";
import "../index.css";
import AdminInformation from "../tools/adminInformation";
import AppAlert from "../tools/alert";
import Edit from "../tools/edit";
const { Header } = Layout;

const AppHeader = (props: { data: string }) => {
  const { data } = props;
  return (
    <Header className="header">
      <div className="title" style={{fontSize:20}} >人员管理系统</div>
     
      <div className="admin">
        <span className="adminName">{JSON.parse(data).name}</span>
        <Popover
          content={
         
            <div>
                 <Divider>
              <Avatar
                className="adminAvatar"
                src={JSON.parse(data).avatar}
                size="large"
              ></Avatar>
               </Divider>
              <AdminInformation data={data} />
              <Edit data={data}  type={3} />
              <AppAlert
                content={"退出登录"}
                type={"确认退出登录？"}
                todo={1}//这里设置todo=1，代表是退出登录的功能
                stuNum=""
              />
            </div>
           
          }
          
        >
          
          <Avatar
            className="adminAvatar"
            src={JSON.parse(data).avatar}
            size="default"
          ></Avatar>
        </Popover>
      </div>
    </Header>
  );
};
export default AppHeader;
