//这是一个隐藏的组件，用于展示admin的信息，被header的头像气泡所调用，所以放到工具栏。
import { useState } from "react";
import { Drawer } from "antd";
const AdminInformation = (props: { data: string }) => {
    const { data } = props;
    let jsonData = JSON.parse(data);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <p onClick={showDrawer}>个人信息</p>
        <Drawer title="个人信息" placement="left" onClose={onClose} open={open}>
          <img  style={{width:"50%" ,borderRadius:"50%"}} src={jsonData.avatar} alt="头像" />
          <div  style={{margin:20 ,fontWeight:500 , fontSize:19}}>昵称:{jsonData.name}</div>
          <div style={{margin:20 ,fontWeight:500 , fontSize:19}}>性别:{jsonData.gender}</div>
          <div style={{margin:20 ,fontWeight:500 , fontSize:19}}>年龄:{jsonData.age}</div>
          <div style={{margin:20 ,fontWeight:500 , fontSize:19}}>国籍:{jsonData.country}</div>
        </Drawer>
      </>
    );
  };
  export default AdminInformation;