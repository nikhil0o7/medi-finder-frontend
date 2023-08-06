// import React from "react";
import "./dashboard.scss";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAppSelector } from "../../hooks";
// import { sidebarToggle } from "../../reducers/dashboardVals";
import NavDashBoard from "../../components/NavDashBoard/NavDashBoard";
import Account from "../Account/Account";
import Hospitals from "../Hospitals/Hospitals";
import HomeBoard from "../HomeBoard/Homeboard";
import AddHospital from "../AddHospital/AddHospital";
import HospitalsInfo from "../HospitalsInfo/HospitalsInfo";
const { Content } = Layout;
const Dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dashboardVals = useAppSelector((state) => state.dashboardValsreducer);

  // const dispatchStore = useAppDispatch();
  return (
    <Layout style={{ height: "100vh" }} hasSider>
      <Sidebar />
      <Layout className="site-layout">
        <NavDashBoard />
        <Content
          style={{
            overflow: "initial",
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {dashboardVals.showComponent === "dashboard" ? <HomeBoard /> : <></>}
          {dashboardVals.showComponent === "Account" ? <Account /> : <></>}
          {dashboardVals.showComponent === "Hospitals" ? <Hospitals /> : <></>}
          {dashboardVals.showComponent === "HospitalsInfo" ? (
            <HospitalsInfo />
          ) : (
            <></>
          )}
          {dashboardVals.showComponent === "AddHospital" ? (
            <AddHospital />
          ) : (
            <></>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
