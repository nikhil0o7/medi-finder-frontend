/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Sidebar.scss";
import {
  // SearchOutlined,
  // UserOutlined,
  DashboardFilled,
  RadarChartOutlined,
  SaveFilled,
  EditFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useAppSelector, useAppDispatch } from "../../hooks";
import logoOnly from "../../assets/logoSidebarSmall.png";
import logo from "../../assets/logoSidebar.png";
import { modifyHeading, componentToggle } from "../../reducers/dashboardVals";

const { Sider } = Layout;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatchStore = useAppDispatch();
  const dashboardVals = useAppSelector((state) => state.dashboardValsreducer);
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  const isAdmin = localStorage.getItem("isAdmin");
  console.log("is", isAdmin);
  console.log(userDetails);
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    handleToggleCollapse();
  }, [dashboardVals.collapsed]);
  const handleMenuClick = (key: string) => {
    // Perform action based on the selected menu item key
    // console.log("Menu clicked:", key);
    if (key === "dashboard") {
      dispatchStore(componentToggle("dashboard"));
      dispatchStore(modifyHeading(key));
    }
    dispatchStore(modifyHeading(key));
    dispatchStore(componentToggle(key));
  };
  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div style={{ overflow: "none", height: "50", width: "50" }}>
          <img
            src={collapsed ? logoOnly : logo}
            alt="Logo"
            style={{
              height: collapsed ? "70px" : "100px", // Set different height based on collapsed state
              width: collapsed ? "80px" : "200px", // Set different width based on collapsed state
            }}
          />
        </div>
        {isAdmin === "true" ? (
          <Menu
            theme="dark"
            mode="inline"
            onClick={({ key }) => handleMenuClick(key)}
            items={[
              {
                key: "dashboard",
                icon: <DashboardFilled />,
                label: "DashBoard",
              },
              {
                key: "Hospitals",
                icon: <RadarChartOutlined />,
                label: "All Hospitals",
              },
              {
                key: "AddHospital",
                icon: <SaveFilled />,
                label: "Add New Hospital",
              },
              {
                key: "4",
                icon: <EditFilled />,
                label: "Edit Hospital",
              },
            ]}
          />
        ) : (
          <Menu
            theme="dark"
            mode="inline"
            onClick={({ key }) => handleMenuClick(key)}
            items={[
              {
                key: "dashboard",
                icon: <DashboardFilled />,
                label: "DashBoard",
              },
              {
                key: "Hospitals",
                icon: <RadarChartOutlined />,
                label: "All Hospitals",
              },
            ]}
          />
        )}
      </Sider>
    </>
  );
};

export default Sidebar;
