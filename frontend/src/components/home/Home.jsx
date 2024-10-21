import React, { useState } from "react";
import { Layout, Menu, Button, Typography, Row, Col, Card } from "antd";
import { UserOutlined, PhoneOutlined, LogoutOutlined } from "@ant-design/icons";
import AuthModal from "../user/AuthModal";
import MakeAppointment from "../appointments/MakeAppointment";
import Img1 from "../../assets/backg1.png";
import Img2 from "../../assets/backg4.png";
import partner1 from "../../assets/image 1.png";
import partner2 from "../../assets/image 2.png";
import partner3 from "../../assets/image 3.png";
import partner4 from "../../assets/image 4.png";
import partner5 from "../../assets/image 5.png";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const MedEaseLandingPage = () => {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isMakeAppointmentModalOpen, setIsAppointModalOpen] = useState(false);

  const showAuthModal = () => {
    setIsAuthModalVisible(true);
  };

  const handleAuthModalCancel = () => {
    setIsAuthModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header style={{ background: "#fff", padding: "0 50px" }}>
        <div className="logo" style={{ float: "left" }}>
          <Title level={4} style={{ margin: "16px 0", color: "#333" }}>
            MedEase<span style={{ color: "#ff69b4" }}>*</span>
          </Title>
        </div>
        <Menu mode="horizontal" style={{ float: "right" }}>
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="services">Services</Menu.Item>
          <Menu.Item key="hospitals">Hospitals</Menu.Item>
          <Menu.Item key="about">About</Menu.Item>
          {localStorage.getItem("user") && (
            <Menu.Item
              onClick={() => {
                setIsAppointModalOpen(true);
              }}
              key="appointment"
            >
              Make Appointment
            </Menu.Item>
          )}
          {!localStorage.getItem("user") && (
            <Menu.Item key="login">
              <Button onClick={showAuthModal} icon={<UserOutlined />}>
                Login
              </Button>
            </Menu.Item>
          )}
          {localStorage.getItem("user") && (
            <Menu.Item key="logout">
              <Button
                onClick={() => {
                  localStorage.clear();
                    window.location.reload();
                  }}
                  icon={<LogoutOutlined />}
                  >
                  Logout
                  </Button>
                </Menu.Item>
                )}
                <Menu.Item key="call">
                <Button type="primary" icon={<PhoneOutlined />} danger>
                  CALL AMBULANCE
                </Button>
                </Menu.Item>
              </Menu>
              </Header>
              <Content
              style={{
                padding: "0 50px",
                background: "linear-gradient(to bottom, #fff1f0, #fff)",
                flex: "1 0 auto",
              }}
              >
              <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
                <Col span={12}>
                <Title
                  style={{
                  color: "#4a0e0b",
                  fontSize: "80px",
                  fontWeight: "20px",
                  marginBottom: 0,
                  fontFamily: "calibri",
                  }}
                >
                  EMPOWERING HEALTH,
                  <span style={{ color: "#ff69b4" }}> <b>ONE CLICK AT A TIME</b></span>
                </Title>
                <Paragraph style={{ marginTop: 16 }}>
                  Explore The Excellence Of Our Partner Hospitals, Where Advanced
                  Medicine Meets Compassionate Care. Get An Inside Look At Cutting-
                  Edge Treatments, Dedicated Professionals
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  style={{ background: "#FF7787", borderColor: "#ff69b4" }}
                >
                  Shedule An Appointment
                </Button>
                <Button size="large" style={{ marginLeft: 16 }}>
                  Our Services
                </Button>
                </Col>
                <Col span={12}>
                <Card
                  cover={<img alt="Doctor with patient" src={Img1} />}
                  style={{ marginBottom: 16, borderRadius: 30, height: 400 }}
                ></Card>
                <Card
                  cover={<img alt="Hospital emergency entrance" src={Img2} />}
                  style={{
                  marginBottom: 150,
                  borderRadius: 30,
                  width: 600,
                  height: 200,
                  marginLeft: -200,
                  position: "relative",
                  }}
                >
                
                </Card>
                </Col>
              </Row>
              <Row
                justify="space-around"
                align="middle"
                style={{ marginTop: 32, marginBottom: 32 }}
              >
                {/* Partner logos would go here */}
          <Col>
            <div ><img src={partner1} alt="Partner Logo" style={{width: "150px"}} /></div>
          </Col>
          <Col>
            <div ><img src={partner2} alt="Partner Logo" style={{width: "150px"}}/></div>
          </Col>
          <Col>
            <div ><img src={partner3} alt="Partner Logo" style={{width: "150px"}}/></div>
          </Col>
          <Col>
            <div ><img src={partner4} alt="Partner Logo" style={{width: "150px"}}/></div>
          </Col>
          <Col>
            <div ><img src={partner5} alt="Partner Logo" style={{width: "150px"}}/></div>
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{ background: "#DC5B6A", color: "#fff", textAlign: "center", flexShrink: 0, height: "200px" }}>
        <Row justify="center" align="middle">
          <Col span={8}>
            <Title level={5} style={{ color: "#fff" }}>Contact Us</Title>
            <Paragraph>Email: support@medease.com</Paragraph>
            <Paragraph>Phone: +123 456 7890</Paragraph>
          </Col>
          <Col span={8}>
            <Title level={5} style={{ color: "#fff" }}>Follow Us</Title>
            <Button type="link" style={{ color: "#FFCCD2" }}>Facebook</Button>
            <Button type="link" style={{ color: "#FFCCD2" }}>Twitter</Button>
            <Button type="link" style={{ color: "#FFCCD2" }}>Instagram</Button>
          </Col>
          <Col span={8}>
            <Title level={5} style={{ color: "#fff" }}>Legal</Title>
            <Paragraph>© 2024 MedEase. All Rights Reserved.</Paragraph>
            <Paragraph>Privacy Policy | Terms of Service</Paragraph>
          </Col>
        </Row>
      </Footer>
      <AuthModal
        visible={isAuthModalVisible}
        onCancel={handleAuthModalCancel}
      />
      <MakeAppointment
        visible={isMakeAppointmentModalOpen}
        onClose={() => {
          setIsAppointModalOpen(false);
        }}
      />
    </Layout>
  );
};

export default MedEaseLandingPage;
