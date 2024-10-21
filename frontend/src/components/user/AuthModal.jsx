import React, { useState } from "react";
import { Modal, Tabs, Form, Input, Button, InputNumber, message } from "antd";
import userService from "../../services/userService";

const { TabPane } = Tabs;

const AuthModal = ({ visible, onCancel }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();

  const onLoginFinish = async (values) => {
    try {
      await userService.login(values.email, values.password);
      message.success("Login successful");
      onCancel();
    } catch (error) {
      message.error("Login failed: " + error.message);
    }
  };

  const onSignupFinish = async (values) => {
    try {
      await userService.register(values);
      message.success("Signup successful");
      onCancel();
    } catch (error) {
      message.error("Signup failed: " + error.message);
    }
  };

  const loginFields = [
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please input your email!" },
        { type: "email", message: "Please enter a valid email!" },
      ],
    },
    {
      name: "password",
      label: "Password",
      rules: [{ required: true, message: "Please input your password!" }],
    },
  ];

  const signupFields = [
    {
      name: "name",
      label: "Name",
      rules: [{ required: true, message: "Please input your name!" }],
    },
    {
      name: "address",
      label: "Address",
      rules: [{ required: true, message: "Please input your address!" }],
    },
    {
      name: "age",
      label: "Age",
      rules: [{ required: true, message: "Please input your age!" }],
    },
    ...loginFields,
  ];

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title="Authentication"
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Login" key="login">
          <Form form={loginForm} onFinish={onLoginFinish} layout="vertical">
            {loginFields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                <Input type={field.name === "password" ? "password" : "text"} />
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Sign Up" key="signup">
          <Form form={signupForm} onFinish={onSignupFinish} layout="vertical">
            {signupFields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                {field.name === "age" ? (
                  <InputNumber min={1} max={150} />
                ) : (
                  <Input
                    type={field.name === "password" ? "password" : "text"}
                  />
                )}
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
