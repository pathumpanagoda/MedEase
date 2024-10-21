import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Upload,
} from "antd";
import { QRCodeSVG } from "qrcode.react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  FilePdfOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import patientService from "../../services/patientService";
import { uploadFile } from "../../services/uploadFIleService";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPatient, setEditingPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const showQrModal = (patient) => {
    setSelectedPatient(patient);
    setQrModalVisible(true);
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
          patient.contactInfo.includes(searchText)
      )
    );
  }, [searchText, patients]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await patientService.getAllPatients();
      setPatients(data);
      setFilteredPatients(data); // Initialize filteredPatients with fetched data
    } catch (error) {
      message.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (patient = null) => {
    setEditingPatient(patient);
    if (patient) {
      form.setFieldsValue(patient);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const phoneRegex = /^\d{10}$/;

      if (!phoneRegex.test(values.contactInfo)) {
        message.error("Contact number must be exactly 10 digits!");
        return;
      }

      let url = "https://i.sstatic.net/y9DpT.jpg";
      try {
        const file = values.healthcareCard.file;

        if (file) {
          if (file.originFileObj) {
            url = await uploadFile(file.originFileObj);
          } else {
            url = editingPatient?.healthcareCard;
          }
        } else {
          url = editingPatient?.healthcareCard;
        }

        if (editingPatient) {
          setUpdateLoading(true);
          await patientService.updatePatient(editingPatient._id, {
            ...values,
            healthcareCard: url,
          });
          message.success("Patient updated successfully");
          setUpdateLoading(false);
        } else {
          setCreateLoading(true);
          await patientService.createPatient({
            ...values,
            healthcareCard: url,
          });
          message.success("Patient created successfully");
          setCreateLoading(false);
        }
        setIsModalVisible(false);
        fetchPatients();
      } catch (error) {
        message.error("Operation failed");
        setUpdateLoading(false);
        setCreateLoading(false);
      }
    });
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      await patientService.deletePatient(id);
      message.success("Patient deleted successfully");
      fetchPatients();
    } catch (error) {
      message.error("Failed to delete patient");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Patients List", 14, 22);

    const data = patients.map((patient) => [
      patient.name,
      patient.contactInfo,
      patient.medicalHistory,
    ]);

    doc.autoTable({
      head: [["Name", "Contact Info", "Medical History"]],
      body: data,
      startY: 30,
    });

    doc.save("patients.pdf");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Contact Info",
      dataIndex: "contactInfo",
      key: "contactInfo",
      sorter: (a, b) => a.contactInfo.localeCompare(b.contactInfo),
    },
    {
      title: "Medical History",
      dataIndex: "medicalHistory",
      key: "medicalHistory",
    },
    {
      title: "Healthcare Card",
      dataIndex: "healthcareCard",
      key: "healthcareCard",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            View Card
          </a>
        ) : (
          "No card uploaded"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button
            icon={<EyeOutlined />}
            onClick={() => showQrModal(record)}
            style={{ marginRight: 8, color: "#4CAF50", borderColor: "#4CAF50" }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8, color: "#FF6B6B", borderColor: "#FF6B6B" }}
          />
          <Popconfirm
            title="Are you sure you want to delete this patient?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ color: "#FF6B6B", borderColor: "#FF6B6B" }}
              loading={deleteLoading}
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Input
        placeholder="Search by name or contact"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{
          marginBottom: 16,
          backgroundColor: "#FF6B6B",
          borderColor: "#FF6B6B",
        }}
      >
        Add Patient
      </Button>
      <Button
        type="default"
        icon={<FilePdfOutlined />}
        onClick={handleGeneratePDF}
        style={{
          marginBottom: 16,
          marginLeft: 8,
          backgroundColor: "#FF6B6B",
          borderColor: "#FF6B6B",
          color: "#fff",
        }}
      >
        Generate PDF
      </Button>
      <Table
        columns={columns}
        dataSource={filteredPatients} // Use the filteredPatients for the table data
        rowKey="_id" // Assuming the id field is named "_id"
        loading={loading}
      />
      <Modal
        title={editingPatient ? "Edit Patient" : "Add Patient"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{
          style: { backgroundColor: "#FF6B6B", borderColor: "#FF6B6B" },
          loading: createLoading || updateLoading,
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactInfo"
            label="Contact Info"
            rules={[
              { required: true, message: "Please input the contact info!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="medicalHistory"
            label="Medical History"
            rules={[
              { required: true, message: "Please input the medical history!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="healthcareCard"
            label="Healthcare Card"
            rules={[
              { required: true, message: "Please upload the healthcare card!" },
            ]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Patient QR Code"
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={null}
      >
        {selectedPatient && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {selectedPatient && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <QRCodeSVG value={JSON.stringify(selectedPatient)} size={256} />
                <p style={{ marginTop: 16 }}>
                  Scan this QR code to view patient data
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Patients;
