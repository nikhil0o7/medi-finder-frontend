import React from "react";
import { Layout, theme } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { sidebarToggle } from "../../reducers/dashboardVals";
import {
  MenuFoldOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const NavDashBoard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("email");
  const UserSignOut = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    navigate(0);
    navigate("/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "Username",
      label: (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <b>{isAuthenticated}</b>
      ),
    },
    {
      key: "Logout",
      label: (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a rel="noopener noreferrer" onClick={() => UserSignOut()} href="#">
          <LoginOutlined style={{ marginRight: "10px" }} />
          Logout
        </a>
      ),
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dashboardVals = useAppSelector((state) => state.dashboardValsreducer);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatchStore = useAppDispatch();
  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        {React.createElement(
          dashboardVals.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => {
              // dispatchStore(sidebarToggle(true));
              dispatchStore(sidebarToggle(!dashboardVals.collapsed));
            },
          }
        )}
        <b style={{ fontSize: "25px" }}>{dashboardVals.heading}</b>
        <b style={{ float: "right", fontSize: "30px", marginRight: "30px" }}>
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <UserOutlined />
          </Dropdown>
        </b>
      </Header>
    </>
  );
};

export default NavDashBoard;
