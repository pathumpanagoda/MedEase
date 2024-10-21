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
  DatePicker,
} from "antd";
import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import staffAppointmentService from "../../services/staffAppointmentService";
import appointmentService from "../../services/appointmentService";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]); // For pending appointments
  const [previousAppointments, setPreviousAppointments] = useState([]); // For previous appointments
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchPendingAppointments();
    fetchPreviousAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    setLoading(true);
    try {
      const data = await staffAppointmentService.getAllStaffAppointments();
      setAppointments(data);
    } catch (error) {
      message.error("Failed to fetch pending appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousAppointments = async () => {
    try {
      const data = await appointmentService.getAllAppointments(); // Assuming this gets all appointments
      setPreviousAppointments(data);
    } catch (error) {
      message.error("Failed to fetch previous appointments");
    }
  };

  const handlePreviousAppointmentChange = (value) => {
    const appointment = previousAppointments.find((app) => app._id === value);
    if (appointment) {
      form.setFieldsValue({
        patientName: appointment.patientName,
        doctorName: appointment.doctorName,
        venue: appointment.venue || "",
        appointmentDate: appointment.appointmentDate || null,
      });
    }
  };

  const showModal = (appointment) => {
    setSelectedAppointment(appointment);
    form.setFieldsValue({
      timeSlot: appointment.timeSlot || "",
      venue: appointment.venue || "",
    });
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    form.validateFields().then(async (values) => {
      try {
        const updatedAppointment = {
          ...selectedAppointment,
          ...values,
          status: "Confirmed",
          appointmentDate: values.appointmentDate.toDate(),
        };

        await staffAppointmentService.updateStaffAppointment(
          selectedAppointment._id,
          updatedAppointment
        );

        message.success("Appointment confirmed successfully");
        setIsModalVisible(false);
        fetchPendingAppointments();
      } catch (error) {
        message.error("Failed to confirm appointment");
      }
    });
  };

  const handleReject = async (id) => {
    try {
      await staffAppointmentService.updateStaffAppointment(id, {
        status: "Rejected",
      });
      message.success("Appointment rejected successfully");
      fetchPendingAppointments();
    } catch (error) {
      message.error("Failed to reject appointment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await staffAppointmentService.deleteStaffAppointment(id);
      message.success("Appointment deleted successfully");
      fetchPendingAppointments();
    } catch (error) {
      message.error("Failed to delete appointment");
    }
  };

  const handleCreate = async () => {
    form.validateFields().then(async (values) => {
      try {
        const newAppointment = {
          ...values,
          status: "Pending", // Assuming new appointments are pending by default
        };

        await staffAppointmentService.createStaffAppointment(newAppointment);
        message.success("New appointment created successfully");
        setIsModalVisible(false);
        fetchPendingAppointments();
      } catch (error) {
        message.error("Failed to create appointment");
      }
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Staff Appointments Report", 14, 22);
    const data = filteredAppointments.map((appointment) => [
      appointment.patientName,
      appointment.doctorName,
      appointment.hospital,
      appointment.appointmentDate,
      appointment.status,
    ]);

    doc.autoTable({
      head: [
        [
          "Patient Name",
          "Doctor Name",
          "Hospital",
          "Appointment Date",
          "Status",
        ],
      ],
      body: data,
      startY: 30,
    });

    doc.save("staff_appointments_report.pdf");
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
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date) => new Date(date).toDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button
            disabled={record.status === "Confirmed"}
            onClick={() => showModal(record)}
            style={{ marginRight: 8, color: "#FF6B6B", borderColor: "#FF6B6B" }}
          >
            Confirm
          </Button>
          <Popconfirm
            title="Are you sure you want to reject this appointment?"
            onConfirm={() => handleReject(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={record.status === "Rejected"}
              style={{ color: "#FF6B6B", borderColor: "#FF6B6B" }}
            >
              Reject
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you want to reject this appointment?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{
                color: "#FF6B6B",
                borderColor: "#FF6B6B",
                marginLeft: 8,
              }}
            ></Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Input.Search
        placeholder="Search by patient or doctor"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      {/* <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{
          marginBottom: 16,
          backgroundColor: "#FF6B6B",
          borderColor: "#FF6B6B",
        }}
      >
        Create New Appointment
      </Button> */}
      <Button
        type="default"
        onClick={handleGeneratePDF}
        style={{
          marginBottom: 16,
          marginLeft: 8,
          backgroundColor: "#FF6B6B",
          borderColor: "#FF6B6B",
          color: "#fff",
        }}
        icon={<FilePdfOutlined />}
      >
        Generate PDF
      </Button>
      <Table
        columns={columns}
        dataSource={filteredAppointments}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title="Confirm or Create Appointment"
        visible={isModalVisible}
        onOk={selectedAppointment ? handleConfirm : handleCreate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="patientName"
            label="Patient Name"
            rules={[
              { required: true, message: "Please input the patient name!" },
            ]}
          >
            <Input disabled={!!selectedAppointment} placeholder={selectedAppointment?.patientName} />
          </Form.Item>
          <Form.Item
            name="doctorName"
            label="Doctor Name"
            rules={[
              { required: true, message: "Please input the doctor name!" },
            ]}
          >
            <Input disabled={!!selectedAppointment} placeholder={selectedAppointment?.doctorName}/>
          </Form.Item>
          <Form.Item
            name="previousAppointment"
            label="Select Previous Appointment"
            rules={[
              {
                required: true,
                message: "Please select a previous appointment!",
              },
            ]}
          >
            <Select
              placeholder="Select previous appointment"
              onChange={handlePreviousAppointmentChange}
            >
              {previousAppointments.map((app) => (
                <Option key={app._id} value={app._id}>
                  {app.patientName} - {app.doctorName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="hospital"
            label="Hospital"
            rules={[{ required: true, message: "Please input the hospital!" }]}
          >
            <Input placeholder="Enter venue" />
          </Form.Item>
          <Form.Item
            name="appointmentDate"
            label="Appointment Date"
            rules={[
              {
                required: true,
                message: "Please select the appointment date!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffAppointments;
