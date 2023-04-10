//该组件即为调用三个Form的组件，addForm对应添加用户，editForm对应编辑用户，adminForm对应编辑管理者；
//该组件有两个参数，一个是data，代表预编辑数据，一个参数是type，代表要使用的用途，通过对type的判断调用不同的组件，设置不同的title文字和颜色样式实现组件的可复用性
//该组件实际上是返回一个p标签，该p标签携带着一个modal对话框
import { Modal} from "antd";
import { useState } from "react";
import EditForm from "./editForm";
import AddForm from "./addForm";
import AdminForm from "./adminForm";

const Edit = (props: { data: string; type: number }) => {
  const { data, type } = props;
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  let myColor = "#5290f4";
  let titleStr = "编辑用户";
  let editContext = <EditForm data={data} />;
  let editContext2 = (
    <p style={{ color: myColor }} onClick={showModal}>
      {titleStr}
    </p>
  );
  if (type === 2) {
    titleStr = "添加用户";
    editContext = <AddForm />;
    myColor = "white";
    editContext2 = (
      <span style={{ color: myColor }} onClick={showModal}>
      {titleStr}
    </span>
    )
  }
  if(type===3){
    titleStr = "修改个人信息";
    editContext = <AdminForm data = {data} />
    myColor="black"
    editContext2 = (
      <>
      <p style={{ color: myColor }} onClick={showModal}>
      {titleStr}
      </p>
      </>)
  }
  return (
    <>
      {editContext2}
      <Modal
        style={{ fontWeight: "bold" }}
        title={titleStr}
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        {editContext}
      </Modal>
    </>
  );
};

export default Edit;
