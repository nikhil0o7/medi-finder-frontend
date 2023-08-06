/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./Login.scss";
import logo from "../../assets/logoMain.png";
import { useNavigate } from "react-router-dom";
import { Layout, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { AppService } from "../../services/app.service";
import { IAlertProps } from "../../components/AlertMessage/IAlertProps";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useAppDispatch } from "../../hooks";
import { modifyEmail, modifyisAdmin } from "../../reducers/getUserDetails";

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

const Login = () => {
  const appService = new AppService();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState<IAlertProps>({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });
  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });
  const dispatchLoginDetails = useAppDispatch();

  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };
  const checkUser = () => {
    appService.userLogin(loginVals).then((res: any) => {
      let str = res.data;
      let arr = str.split(" and ");
      let firstPart = arr[0];
      let secondPart = arr[1];
      if (firstPart === "User logged in successfully") {
        // console.log("success", secondPart);
        dispatchLoginDetails(modifyEmail(loginVals.email));
        dispatchLoginDetails(modifyisAdmin(secondPart));
        navigate("/dashboard");
      } else if (firstPart === "Invalid username or password") {
        console.log(res.data);
        setShowAlert({
          success: false,
          message: res.data,
          show: true,
          type: "danger",
        });
      } else {
        console.log(res.data);
        setShowAlert({
          success: false,
          message: "Some errror",
          show: true,
          type: "danger",
        });
      }
    });
  };
  return (
    <>
      <Space
        direction="vertical"
        // onSubmit={forgotpswd ? passwordReset : checkUser}
        style={{ width: "100%" }}
        size={[0, 48]}
      >
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
          <div className="logPageAlert">
            {showAlert.show ? (
              <AlertMessage
                success={showAlert.success}
                message={showAlert.message}
                alertDisplay={alertMessageDisplay}
                type={showAlert.type}
              />
            ) : null}
          </div>
          <Content style={contentStyle}>
            {/* <Title>LOGIN</Title>
            <br></br> */}

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={checkUser}
              labelCol={{ span: 15 }}
              wrapperCol={{ span: 20 }}
              style={{ minWidth: 300, maxWidth: 600 }}
              autoComplete="off"
            >
              <Form.Item
                name="loginEmail"
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
                  prefix={
                    <UserOutlined className="site-form-item-icon loginInput" />
                  }
                  onChange={(e) =>
                    setLoginVals({ ...loginVals, email: e.target.value })
                  }
                  placeholder="User Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={
                    <LockOutlined className="site-form-item-icon loginInput" />
                  }
                  onChange={(e) =>
                    setLoginVals({ ...loginVals, password: e.target.value })
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              {/* <div
                className="loginForgotPassword"
                style={{ marginRight: "100px" }}
                onClick={() => {
                  setForgotpwd(true);
                  console.log(forgotpswd);
                }}
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
                  Log In
                </Button>
              </Form.Item>

              <div className="loginRegisterDiv" style={{ marginRight: "50px" }}>
                Not a User? <Link to="/registration">Register now!</Link>
              </div>
            </Form>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Login;
