import { Form, Input, Select, Modal } from "antd";
import { useEffect } from "react";

import type { AdsInventory, AdsFormat, Website } from "#/entity";

export type AdsInventoryModalProps = {
	formValue: Partial<AdsInventory>;
	websites?: Website[];
	adsFormats: AdsFormat[];
	title: string;
	show: boolean;
	onOk: (values: AdsInventory) => void;
	onCancel: VoidFunction;
};

export function AdsInventoryModal({
	title,
	show,
	formValue,
	websites,
	adsFormats,
	onOk,
	onCancel,
}: AdsInventoryModalProps) {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({ ...formValue });
	}, [formValue, form]);

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			onOk(values);
		} catch (error) {
			// Handle validation error
		}
	};

	return (
		<Modal title={title} open={show} onOk={handleSubmit} onCancel={onCancel}>
			<Form
				form={form}
				initialValues={formValue}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				layout="horizontal"
			>
				{/* Website Dropdown */}
				<Form.Item
					label="Website"
					name={["website", "id"]}
					rules={[{ required: true, message: "Please select a website!" }]}
				>
					<Select placeholder="Select a website">
						{(websites ?? []).map((website) => (
							<Select.Option key={website.id} value={website.id}>
								{website.domain}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				{/* Ads Format Dropdown */}
				<Form.Item
					label="Ad Format"
					name={["adsFormat", "code"]}
					rules={[{ required: true, message: "Please select an ad format!" }]}
				>
					<Select placeholder="Select ad format">
						{adsFormats.map((format) => (
							<Select.Option key={format.code} value={format.code}>
								{format.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				{/* Input Code */}
				<Form.Item
					label="Input Code"
					name="inputCode"
					rules={[
						{ required: true, message: "Please enter the input code!" },
					]}
				>
					<Input.TextArea placeholder="Enter input code" className="h-100"/>
				</Form.Item>

				{/* Description */}
				<Form.Item label="Description" name="desc">
					<Input.TextArea placeholder="Enter description" />
				</Form.Item>
			</Form>
		</Modal>
	);
}
