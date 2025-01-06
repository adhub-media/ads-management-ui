import { AdsFormat, AdsInventory, Website } from "#/entity";
import { Card, Form, Row, Col, Input, Select, Button, Tag } from "antd";
import { useEffect } from "react";
import { FilterAdsInventoryType } from ".";

export type AdsInventoryFilterProps = {
  formValue: FilterAdsInventoryType;
  websites: Website[];
  adsFormats: AdsFormat[];
  onOk: (values: AdsInventory) => void;
};

export function AdsInventoryFilter({
  formValue,
  websites,
  adsFormats,
  onOk,
}: AdsInventoryFilterProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  const handleReset = () => {
    form.resetFields();
    onOk(form.getFieldsValue());
  };

  return (
    <Card>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24} lg={6}>
            <Form.Item label="Website" name="websiteId">
              <Select placeholder="Select a website">
                {websites.map((website) => (
                  <Select.Option key={website.id} value={website.id}>
                    {website.domain}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} lg={6}>
            <Form.Item label="Ads Format" name="adsFormatCode">
              <Select placeholder="Select an ad format">
                {adsFormats.map((format) => (
                  <Select.Option key={format.name} value={format.code}>
                    {format.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} lg={6}>
            <Form.Item label="Status" name="status">
              <Select placeholder="Select status">
                <Select.Option value="active">
                  <Tag color="success">Active</Tag>
                </Select.Option>
                <Select.Option value="inactive">
                  <Tag color="error">Inactive</Tag>
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} lg={6}>
            <div className="flex justify-end">
              <Button onClick={handleReset}>Reset</Button>
              <Button
                type="primary"
                className="ml-4"
                onClick={() => onOk(form.getFieldsValue())}
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
