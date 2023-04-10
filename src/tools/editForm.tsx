//该组件为Edit组件所调用，用于编辑用户时候展示对话框。
//该组件实现了用户输入校验和提交数据，是较为重要的组件，详细设计同addform组件
import "antd/dist/antd.min.css";
import "../index.css";
import { Button, Form, Input, message, Select } from "antd";
import { post_fetch } from "../fetch";
import { useState } from "react";
const { Option } = Select
const EditForm = (props:{data:string}) => {
    const [validateStatu5,setValidateStatu5] = useState("")
    const [validateHelp5,setValidateHelp5] = useState("")
    const [validateStatu6,setValidateStatu6] = useState("")
    const [validateHelp6,setValidateHelp6] = useState("")
    const handlePhone = async (_: any,value: any)=>{
        const  regex = new RegExp('^1[3|4|5|7|8]\\d{9}$');
     if(value === undefined || !value.trim()){
         setValidateStatu5("error");
         setValidateHelp5("请输入电话号码");
         throw new Error();
     }
     if(regex.test(value)===false){
         setValidateStatu5("error");
         setValidateHelp5("电话号码不符合规则,请检查");
         throw new Error();
     }
     try {
         const res = async function() {
             return new Promise((resolve, reject) => {
                 setTimeout(() => {
                     resolve("成功");
                 }, 800);
             });
         }; 
         if (res) {
             setValidateStatu5('success');
             setValidateHelp5("");
             return res;
         }
     } catch (e) {
         throw new Error();
     }
 }
 const handleEmail = async (_: any,value: any)=>{
    const  regex = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
 if(value === undefined || !value.trim()){
     setValidateStatu6("error");
     setValidateHelp6("请输入邮箱");
     throw new Error();
 }
 if(regex.test(value)===false){
     setValidateStatu6("error");
     setValidateHelp6("邮箱不符合规则,请检查");
     throw new Error();
 }
 try {
     const res = async function() {
         return new Promise((resolve, reject) => {
             setTimeout(() => {
                 resolve("成功");
             }, 800);
         });
     }; 
     if (res) {
         setValidateStatu6('success');
         setValidateHelp6("");
         return res;
     }
 } catch (e) {
     throw new Error();
 }
}
    const{data}=props;
    const dataJson = JSON.parse(data);
  const onFinish = (values: any) => {
    post_fetch("/edit", values).then(async (ret: any) => {
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
        label="姓名"
        name="name"
        style={{ marginBottom: "15px" }}
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        rules={[{ required: true, message: "请输入姓名" }]}
        initialValue={dataJson.name}
      >
        <Input style={{color:"black"}}  />
      </Form.Item>

      <Form.Item
        label="专业"
        name="Profession"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.Profession}
        rules={[{ required: true, message: "专业不能为空!" }]}
        >
           <Select
            placeholder="选择专业"
            allowClear
          >
            <Option value="计算机科学与技术">计算机科学与技术</Option>
            <Option value="人工智能">人工智能</Option>
            <Option value="机械制造">机械制造</Option>
            <Option value="金融管理">金融管理</Option>
          </Select>
      </Form.Item>
      
      <Form.Item
        label="学号"
        name="stuNum"
        
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.stuNum}
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input  readOnly />
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
        label="电话"
        name="phone"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.phone}
        hasFeedback
        validateTrigger="onBlur" // 输入完成, 失去焦点后开始校
        validateStatus={validateStatu5 as "" | "error" | "success" | "warning" | "validating" | undefined}
        help={validateHelp5}
        rules={[ {required: true, message: "请输入姓名" },{ validator: handlePhone }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="邮箱"
        name="email"
        labelCol={{span:4}}
        wrapperCol={{ offset:1, span: 15 }}
        style={{ marginBottom: "15px" }}
        initialValue={dataJson.email}
        hasFeedback
        validateTrigger="onBlur" // 输入完成, 失去焦点后开始校
        validateStatus={validateStatu6 as "" | "error" | "success" | "warning" | "validating" | undefined}
        help={validateHelp6}
        rules={[ {required: true, message: "请输入姓名" },{ validator: handleEmail }]}
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
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit">
         确认修改
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditForm;