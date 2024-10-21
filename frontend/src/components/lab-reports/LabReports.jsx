import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import labReportService from "../../services/labReportService";
import patientService from "../../services/patientService";
import { uploadFile } from "../../services/uploadFIleService";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

const LabReports = () => {
  const [labReports, setLabReports] = useState([]);
  const [filteredLabReports, setFilteredLabReports] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingLabReport, setEditingLabReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const doctorId = "507f191e810c19729de860ea";

  useEffect(() => {
    fetchLabReports();
    fetchPatients();
  }, []);

  useEffect(() => {
    setFilteredLabReports(
      labReports.filter(
        (report) =>
          (report.patientId ?? "")
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          report.reportDetails.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, labReports]);

  const fetchLabReports = async () => {
    setLoading(true);
    try {
      const data = await labReportService.getAllLabReports();
      setLabReports(data);
      setFilteredLabReports(data);
    } catch (error) {
      message.error("Failed to fetch lab reports");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const data = await patientService.getAllPatients();
      setPatients(data);
    } catch (error) {
      message.error("Failed to fetch patients");
    }
  };

  const showModal = (labReport = null) => {
    setEditingLabReport(labReport);
    if (labReport) {
      form.setFieldsValue(labReport);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setCreateLoading(false);
    setUpdateLoading(false);
    form.validateFields().then(async (values) => {
      const reportDetailsRegex = /^[\w\s.,!?()-]{10,500}$/;

      if (!reportDetailsRegex.test(values.reportDetails)) {
        message.error(
          "Report details must be between 10 and 500 characters and can only contain letters, numbers, and basic punctuation!"
        );
        return;
      }

      try {
        setCreateLoading(true);
        setUpdateLoading(true);
        let fileUrl = "";
        if (values.reportFile && values.reportFile.file) {
          fileUrl = await uploadFile(values.reportFile.file.originFileObj);
        }

        if (editingLabReport) {
          setUpdateLoading(true);
          await labReportService.updateLabReport(editingLabReport._id, {
            ...values,
            fileUrl: fileUrl || editingLabReport.reportFile,
            doctorId: doctorId,
          });
          message.success("Lab report updated successfully");
          setUpdateLoading(false);
        } else {
          setCreateLoading(true);
          await labReportService.createLabReport({
            ...values,
            fileUrl: fileUrl,
            doctorId: doctorId,
          });
          message.success("Lab report created successfully");
          setCreateLoading(false);
        }
        setIsModalVisible(false);
        fetchLabReports();
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
      await labReportService.deleteLabReport(id);
      message.success("Lab report deleted successfully");
      fetchLabReports();
    } catch (error) {
      message.error("Failed to delete lab report");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Lab Reports List", 14, 22);

    const data = labReports.map((report) => [
      report.patientId.name,
      report.reportDetails,
      report.status,
    ]);

    doc.autoTable({
      head: [["Patient Name", "Report Details", "Status"]],
      body: data,
      startY: 30,
    });

    doc.save("lab-reports.pdf");
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientId",
      key: "patientName",
      sorter: (a, b) => a.patientId.localeCompare(b.patientId),
    },
    {
      title: "Report Details",
      dataIndex: "reportDetails",
      key: "reportDetails",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Report File",
      dataIndex: "fileUrl",
      key: "fileUrl",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            View Report
          </a>
        ) : (
          "No file uploaded"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8, color: "#FF6B6B", borderColor: "#FF6B6B" }}
          />
          <Popconfirm
            title="Are you sure you want to delete this lab report?"
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
        placeholder="Search by patient name or report details"
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
        Add Lab Report
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
        dataSource={filteredLabReports}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title={editingLabReport ? "Edit Lab Report" : "Add Lab Report"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{
          style: { backgroundColor: "#FF6B6B", borderColor: "#FF6B6B" },
          loading: createLoading || updateLoading,
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="patientId"
            label="Patient"
            rules={[{ required: true, message: "Please select a patient!" }]}
          >
            <Select placeholder="Select a patient">
              {patients.map((patient) => (
                <Option key={patient._id} value={patient.name}>
                  {patient.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="reportDetails"
            label="Report Details"
            rules={[
              { required: true, message: "Please input the report details!" },
              {
                pattern: /^[\w\s.,!?()-]{10,500}$/,
                message:
                  "Report details must be between 10 and 500 characters and can only contain letters, numbers, and basic punctuation!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select a status">
              <Option value="Pending">Pending</Option>
              <Option value="Distributed">Distributed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="reportFile" label="Report File">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LabReports;
