//与addform类似，不过传入一个参数data用于初始化表单的值，便于编辑
import "antd/dist/antd.min.css";
import "../index.css";
import { Button, Form, Input, message, Select } from "antd";
import { post_fetch } from "../fetch";
const { Option } = Select
const AdminForm = (props:{data:string}) => {
    const{data}=props;
    const dataJson = JSON.parse(data);
  const onFinish = (values: any) => {
    post_fetch("/editAdmin", values).then(async (ret: any) => {
      let  resdata = await ret;
      resdata = JSON.parse(resdata);
      if (resdata.code === -1) {
       message.error(resdata.msg);
      } else if (resdata.code === -2) {
        console.log(resdata.msg);
        message.error(resdata.msg);
      } else {
        message.success("修改成功!");
        setTimeout(() => {
          window.location.href="/app";
        }, 1000);
      }
    });
  };
  return (
    <Form
      layout="horizontal"
      name="basic"
      labelCol={{ span: 8, offset: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
    <Form.Item
        label="账号"
        name="username"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.username}
        >
        <Input readOnly/>
      </Form.Item>
      <Form.Item
        label="昵称"
        name="name"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.name}
        rules={[{ required: true, message: "昵称不能为空!" }]}
        >
        <Input/>
      </Form.Item>
      
      <Form.Item
        label="性别"
        name="gender"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.gender}
        rules={[{ required: true ,message:"性别不能为空"}]}>
        <Select
          placeholder="选择性别"
          allowClear
        >
          <Option value="男">男</Option>
          <Option value="女">女</Option>
          <Option value="其他">其他</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="年龄"
        name="age"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.age}
        rules={[ {required: true, message: "请输入年龄" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="国籍"
        name="country"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.country}
        rules={[ {required: true, message: "请输入国籍" }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="头像"
        name="avatar"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.avatar}
        rules={[{ required: true, message: "请输入头像网址!" }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="password"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input placeholder="请确认密码"/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit">
         确认修改
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AdminForm;