import React, { useState } from "react";
import { Layout, Menu, Input, Switch, Badge, Avatar } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  BarChartOutlined,
  CoffeeOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import DashboardContent from "./DashboardContent";
import Appointments from "./appointments/Appointments";
import Patients from "./patients/Patients";
import StaffAppointments from "./staff-appointments/StaffAppointments";
import LabReports from "./lab-reports/LabReports";
import Userimg from "../assets/user1.png";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const onMenuItemClicked = (index) => {
    setActiveIndex(index);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#fff" }}>
        <div style={{ padding: "20px" }}>
          <h2 style={{ color: "#FF6B6B", margin: 0 }}>MedEase</h2>
        </div>
        <div style={{ padding: "20px", borderBottom: "1px solid #f0f0f0", marginLeft: "20px"}}>
          <img src={Userimg} alt="avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
          <h3 style={{ marginTop: "10px", marginBottom: "5px" }}>Mr. Miran</h3>
          <p style={{ color: "#8c8c8c", margin: 0 }}>
            Specialized Doctor (MBBs)
          </p>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[`${activeIndex}`]}
          style={{ borderRight: 0 }}
        >
          <Menu.Item
            key="1"
            onClick={() => {
              onMenuItemClicked(1);
            }}
            icon={<HomeOutlined />}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              onMenuItemClicked(2);
            }}
            key="2"
            icon={<CalendarOutlined />}
          >
            Appointments
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              onMenuItemClicked(3);
            }}
            key="3"
            icon={<UserOutlined />}
          >
            Patients
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              onMenuItemClicked(4);
            }}
            key="4"
            icon={<BarChartOutlined />}
          >
            Lab reports
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              onMenuItemClicked(5);
            }}
            key="5"
            icon={<CoffeeOutlined />}
          >
            Appointment Requests
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Search placeholder="Search here" style={{ width: 300 }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              style={{ marginRight: "15px" }}
            />
            <Badge dot>
              <BellOutlined style={{ fontSize: "18px", marginRight: "15px" }} />
            </Badge>
            <SettingOutlined
              style={{ fontSize: "18px", marginRight: "15px" }}
            />
            <Avatar icon={<UserOutlined />} />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {activeIndex === 1 && <DashboardContent />}
          {activeIndex === 2 && <Appointments />}
          {activeIndex === 3 && <Patients />}
          {activeIndex === 4 && <LabReports />}
          {activeIndex === 5 && <StaffAppointments />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
