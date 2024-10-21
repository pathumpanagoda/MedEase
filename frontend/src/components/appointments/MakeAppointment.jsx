import React from "react";
import { Modal, Form, Input, DatePicker, Button, message ,Select,} from "antd";
import { useForm } from "antd/lib/form/Form";
import staffAppointmentService from "../../services/staffAppointmentService";

const { Option } = Select;

const doctorList = [
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  { id: 3, name: "Dr. Brown" },
  { id: 4, name: "Dr. Williams" },
  { id: 5, name: "Dr. Jones" },
];

const MakeAppointment = ({ visible, onClose }) => {
  const [form] = useForm();

  const handleSubmit = async (values) => {
    try {
      await staffAppointmentService.createStaffAppointment(values);
      message.success("Appointment submitted successfully");
      onClose();
    } catch (error) {
      console.error(error);
      message.error(`Error submitting yout appointment`);
    }
  };

  return (
    <Modal
      title="Make an Appointment"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="patientName"
          label="Patient Name"
          rules={[{ required: true, message: "Please enter patient name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="doctorName"
          label="Doctor Name"
          rules={[{ required: true, message: "Please enter doctor name" }]}
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
          rules={[{ required: true, message: "Please enter hospital name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="appointmentDate"
          label="Appointment Date"
          rules={[
            { required: true, message: "Please select appointment date" },
          ]}
        >
          <DatePicker showDate format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MakeAppointment;
