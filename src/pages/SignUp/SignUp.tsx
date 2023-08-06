/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./SignUp.scss";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
// import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { Layout, Space } from "antd";
import logo from "../../assets/logoMain.png";
import { AppService } from "../../services/app.service";

const { Header, Content } = Layout;

const SignUp = () => {
  const navigate = useNavigate();
  const [SignUpVals, setSignUpVals] = useState({
    email: "",
    firstName: "",
    password: "",
    last_name: "",
    is_admin: false,
    phone_number: "000000000",
    date_of_birth: "",
  });
  const appService = new AppService();

  const onFinish = () => {
    appService.signUp(SignUpVals).then((response: any) => {
      console.log(response);
      if (response === 200) {
        console.log("success", response);
        navigate("/login");
      } else {
        console.log("error message");
      }
    });
  };
  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 470,
    lineHeight: "30vh",
    display: "flex",
    backgroundColor: "white",
    paddingTop: "50px",
    justifyContent: "center",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    // color: "#fff",
    height: 170,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "white",
  };

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}>
            <img
              src={logo}
              alt="logo"
              style={{
                height: "200px",
                width: "200px",
                marginRight: "50px",
                marginBottom: "20px",
              }}
            ></img>
          </Header>
          <Content style={contentStyle}>
            {/* <Title>LOGIN</Title>
            <br></br> */}
            <Form
              name="normal_signup"
              className="singup-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              labelCol={{ span: 15 }}
              wrapperCol={{ span: 20 }}
              style={{ minWidth: 300, maxWidth: 600 }}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className="site-form-item-icon loginInput" />
                  }
                  placeholder="Username"
                  onChange={(e) =>
                    setSignUpVals({ ...SignUpVals, firstName: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setSignUpVals({ ...SignUpVals, email: e.target.value })
                  }
                  prefix="@"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={
                    <LockOutlined className="site-form-item-icon loginInput" />
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={
                    <LockOutlined className="site-form-item-icon loginInput" />
                  }
                  onChange={(e) =>
                    setSignUpVals({ ...SignUpVals, password: e.target.value })
                  }
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>
              {/* <div
                className="loginForgotPassword"
                style={{ marginRight: "100px" }}
              >
                <a>Forgot Password?</a>
              </div> */}

              <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sign Up
                </Button>
              </Form.Item>

              <div className="loginRegisterDiv" style={{ marginRight: "50px" }}>
                Already a User? <Link to="/login">Login now!</Link>
              </div>
            </Form>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default SignUp;
