import { Form, Input, Modal, Radio } from "antd";
import { useEffect } from "react";

import type { Website } from "#/entity";
import { BasicStatus } from "#/enum";

export type WebsiteModalProps = {
  formValue: Partial<Website>;
  title: string;
  show: boolean;
  onOk: (values: Website) => void;
  onCancel: VoidFunction;
};

export function WebsiteModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: WebsiteModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values as Website);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal title={title} open={show} onOk={handleOk} onCancel={onCancel}>
      <Form
        form={form}
        initialValues={formValue}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
      >
        <Form.Item<Website> label="Domain" name="domain" rules={[{ required: true, message: "Please enter the website domain." }]}>
          <Input placeholder="e.g., example.com" />
        </Form.Item>

        <Form.Item<Website> label="Status" name="status" rules={[{ required: true, message: "Please select a status." }]}>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={BasicStatus.ENABLE}>Enable</Radio>
            <Radio value={BasicStatus.DISABLE}>Disable</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<Website> label="Owner" name="owner" rules={[{ required: true, message: "Please enter the owner's name." }]}>
          <Input placeholder="Owner's name" />
        </Form.Item>

        <Form.Item<Website> label="Description" name="desc">
          <Input.TextArea placeholder="Optional description about the website." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
