//addForm中的AppForm是一个有校验的用户信息表单组件，在Edit组件中进行引用
import "antd/dist/antd.min.css";
import "../index.css";
import { Button, Form, Input, message, Select } from "antd";
import { post_fetch } from "../fetch";
import { useState } from "react";
const { Option } = Select;
const AddForm = () => {
  //设置三组state，用于校验用户的学号，电话，邮箱，其他值要么用select组件选择要么只要不为空即可
  //validateStatu,validateHelp分别代表校验的提示状态和提示信息
  const [validateStatu3, setValidateStatu3] = useState("");
  const [validateHelp3, setValidateHelp3] = useState("");
  const [validateStatu5, setValidateStatu5] = useState("");
  const [validateHelp5, setValidateHelp5] = useState("");
  const [validateStatu6, setValidateStatu6] = useState("");
  const [validateHelp6, setValidateHelp6] = useState("");
  //以handelestuNum为例，regex是创建的正则表达式，利用此正则表达式去检验用户输入的value，如果不符合抛出错误并set状态，该错误被catch继续抛出错误，直至该错误被解决
  const handlestuNum = async (_: any, value: any) => {
    const regex = new RegExp("^U[0-9]{9}");
    if (value === undefined || !value.trim()) {
      setValidateStatu3("error");
      setValidateHelp3("请输入学号");
      throw new Error();
    }
    if (regex.test(value) === false) {
      setValidateStatu3("error");
      setValidateHelp3("学号不符合规则,应为以U开头,后面紧接连续的9个数字");
      throw new Error();
    }
    try {
      const res = async function () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("成功");
          }, 800);
        });
      };
      if (res) {
        setValidateStatu3("success");
        setValidateHelp3("");
        return res;
      }
    } catch (e) {
      throw new Error();
    }
  };
  const handlePhone = async (_: any, value: any) => {
    const regex = new RegExp("^1[3|4|5|7|8]\\d{9}$");
    if (value === undefined || !value.trim()) {
      setValidateStatu5("error");
      setValidateHelp5("请输入电话号码");
      throw new Error();
    }
    if (regex.test(value) === false) {
      setValidateStatu5("error");
      setValidateHelp5("电话号码不符合规则,请检查");
      throw new Error();
    }
    try {
      const res = async function () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("成功");
          }, 800);
        });
      };
      if (res) {
        setValidateStatu5("success");
        setValidateHelp5("");
        return res;
      }
    } catch (e) {
      throw new Error();
    }
  };
  const handleEmail = async (_: any, value: any) => {
    const regex = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (value === undefined || !value.trim()) {
      setValidateStatu6("error");
      setValidateHelp6("请输入邮箱");
      throw new Error();
    }
    if (regex.test(value) === false) {
      setValidateStatu6("error");
      setValidateHelp6("邮箱不符合规则,请检查");
      throw new Error();
    }
    try {
      const res = async function () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("成功");
          }, 800);
        });
      };
      if (res) {
        setValidateStatu6("success");
        setValidateHelp6("");
        return res;
      }
    } catch (e) {
      throw new Error();
    }
  };
  const onFinish = (values: any) => {
    post_fetch("/add", values).then(async (ret: any) => {
      let resdata = await ret;
      resdata = JSON.parse(resdata);
      if (resdata.code === -1) {
        message.error(resdata.msg);
      } else if (resdata.code === -2) {
        console.log(resdata.msg);
        message.error(resdata.msg);
      } else {
        message.success("成功添加至列表！");
        setTimeout(() => {
          window.location.href = "/app";
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
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1, span: 15 }}
        rules={[{ required: true, message: "请输入你的姓名!" }]}
      >
        <Input style={{ color: "black" }} />
      </Form.Item>

      <Form.Item
        label="专业"
        name="Profession"
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1, span: 15 }}
        style={{ marginBottom: "15px" }}
        rules={[{ required: true, message: "专业不能为空!" }]}
      >
        <Select placeholder="选择专业" allowClear>
          <Option value="计算机科学与技术">计算机科学与技术</Option>
          <Option value="人工智能">人工智能</Option>
          <Option value="机械制造">机械制造</Option>
          <Option value="金融管理">金融管理</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="学号"
        name="stuNum"
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1, span: 15 }}
        style={{ marginBottom: "15px" }}
        hasFeedback
        validateTrigger="onBlur" // 输入完成, 失去焦点后开始校
        validateStatus={
          validateStatu3 as| ""| "error"| "success"| "warning"| "validating" | undefined
        }
        help={validateHelp3}
        rules={[{ required: true, message: "请输入你的姓名!" },{ validator: handlestuNum }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="性别"
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1, span: 15 }}
        style={{ marginBottom: "15px" }}
        rules={[{ required: true, message: "性别不能为空" }]}
      >
        <Select placeholder="选择性别" allowClear>
          <Option value="男">男</Option>
          <Option value="女">女</Option>
          <Option value="其他">其他</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="电话"
        name="phone"
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1, span: 15 }}
        style={{ marginBottom: "15px" }}
        hasFeedback
        validateTrigger="onBlur" // 输入完成, 失去焦点后开始校
        validateStatus={
          validateStatu5 as| ""| "error"| "success"| "warning" | "validating"| undefined
        }
        help={validateHelp5}
        rules={[{ required: true, message: "请输入你的姓名!" },{ validator: handlePhone }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1, span: 15 }}
        style={{ marginBottom: "15px" }}
        hasFeedback
        validateTrigger="onBlur" // 输入完成, 失去焦点后开始校
        validateStatus={
          validateStatu6 as| ""| "error"| "success"| "warning"| "validating"| undefined
        }
        help={validateHelp6}
        rules={[{ validator: handleEmail }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="头像"
        name="avatar"
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1, span: 15 }}
        style={{ marginBottom: "15px" }}
        rules={[
          { required: true, message: "请输入正确头像网络地址,系统不负责校验!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit">
          确认添加
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddForm;
