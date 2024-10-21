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
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import appointmentService from "../../services/appointmentService";
import patientService from "../../services/patientService";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

const doctorList = [
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  { id: 3, name: "Dr. Brown" },
  { id: 4, name: "Dr. Williams" },
  { id: 5, name: "Dr. Jones" },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter(
      (appointment) =>
        appointment.patientName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        appointment.doctorName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        appointment.hospital.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchText, appointments]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const [data, patients] = await Promise.all([
        appointmentService.getAllAppointments(),
        patientService.getAllPatients(),
      ]);

      setAppointments(data);
      setFilteredAppointments(data);
      setPatients(patients);
    } catch (error) {
      message.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (appointment = null) => {
    setEditingAppointment(appointment);
    if (appointment) {
      form.setFieldsValue(appointment);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingAppointment) {
          setUpdateLoading(true);
          await appointmentService.updateAppointment(
            editingAppointment._id,
            values
          );
          message.success("Appointment updated successfully");
          setUpdateLoading(false);
        } else {
          setCreateLoading(true);
          await appointmentService.createAppointment(values);
          message.success("Appointment created successfully");
          setCreateLoading(false);
        }
        setIsModalVisible(false);
        fetchAppointments();
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
      await appointmentService.deleteAppointment(id);
      message.success("Appointment deleted successfully");
      fetchAppointments();
    } catch (error) {
      message.error("Failed to delete appointment");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Appointments List", 14, 15);

    const tableColumn = ["Patient Name", "Doctor Name", "Hospital", "Date"];
    const tableRows = filteredAppointments.map((appointment) => [
      appointment.patientName,
      appointment.doctorName,
      appointment.hospital,
      new Date(appointment.date).toLocaleString(),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("appointments.pdf");
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      sorter: (a, b) => a.patientName.localeCompare(b.patientName),
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      sorter: (a, b) => a.doctorName.localeCompare(b.doctorName),
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
      sorter: (a, b) => a.hospital.localeCompare(b.hospital),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ color: "#FF6B6B", borderColor: "#FF6B6B" }}
          />
          <Popconfirm
            title="Are you sure you want to delete this appointment?"
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
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{
            backgroundColor: "#FF6B6B",
            borderColor: "#FF6B6B",
          }}
        >
          Add Appointment
        </Button>
        <Input
          placeholder="Search appointments"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ width: 200 }}
        />
        <Button
          icon={<DownloadOutlined />}
          onClick={generatePDF}
          style={{
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            color: "white",
          }}
        >
          Generate PDF
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredAppointments}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title={editingAppointment ? "Edit Appointment" : "Add Appointment"}
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
            name="patientName"
            label="Patient Name"
            rules={[
              { required: true, message: "Please input the patient name!" },
            ]}
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
            name="doctorName"
            label="Doctor Name"
            rules={[{ required: true, message: "Please select the doctor!" }]}
          >
            <Select placeholder="Select a doctor">
              {doctorList.map((doctor) => (
                <Option key={doctor.id} value={doctor.name}>
                  {doctor.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="hospital"
            label="Hospital"
            rules={[{ required: true, message: "Please input the hospital!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <Input type="datetime-local" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Appointments;
