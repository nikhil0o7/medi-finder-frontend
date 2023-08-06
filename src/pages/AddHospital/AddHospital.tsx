// import React from "react";
// import "./index.css";
import { Button, Form, Input, InputNumber } from "antd";
import { Row, Col } from "antd";
const layout = {
  labelCol: { span: 15 },
  wrapperCol: { span: 30 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
};
const AddHospital = () => (
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 900 }}
    validateMessages={validateMessages}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "address"]}
          rules={[{ required: true }]}
          label="Address"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "state"]}
          rules={[{ required: true }]}
          label="State"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "city"]}
          rules={[{ required: true }]}
          label="City"
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name={["user", "type"]}
          rules={[{ required: true }]}
          label="Type"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "ownership"]}
          rules={[{ required: true }]}
          label="Ownership"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "overall_rating"]}
          rules={[{ required: true }]}
          label="Rating"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["user", "zip_code"]}
          rules={[{ required: true }]}
          label="Zip Code"
        >
          <InputNumber />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name={["user", "phone_number"]}
          rules={[{ required: true }]}
          label="Phone Number:"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "Mortality"]}
          rules={[{ required: true }]}
          label="Mortality"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "Safety"]}
          rules={[{ required: true }]}
          label="Safety of Care"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "readmission"]}
          rules={[{ required: true }]}
          label="Readmission"
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={10}>
        <Form.Item
          name={["user", "patient_experience"]}
          label="Patient_Experience:"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "EffectivenessofCare"]}
          rules={[{ required: true }]}
          label="Effectiveness of Care"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "Timeliness"]}
          rules={[{ required: true }]}
          label="Timeliness of Care"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "MedicalImaging"]}
          rules={[{ required: true }]}
          label="Medical Imaging"
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default AddHospital;
