import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";

import { IconButton, Iconify } from "@/components/icon";

import { WebsiteModal, type WebsiteModalProps } from "./website-modal";

import type { Role, Website } from "#/entity";
import { BasicStatus } from "#/enum";
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Popconfirm,
	Row,
	Select,
	Space,
	Tag,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import websiteService from "@/api/services/websiteService";

type SearchFormFieldType = Pick<Website, "name" | "status">;

const DEFAULE_ROLE_VALUE: Role = {
	id: "",
	name: "",
	label: "",
	status: BasicStatus.ENABLE,
	permission: [],
};
export default function WebsitePage() {
	const [roleModalPros, setWebsiteModalProps] = useState<WebsiteModalProps>({
		formValue: {},
		title: "New",
		show: false,
		onOk: () => {
			setWebsiteModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			setWebsiteModalProps((prev) => ({ ...prev, show: false }));
		},
	});
	const [searchForm] = Form.useForm();
	const onSearchFormReset = () => {
		searchForm.resetFields();
	};

	const { data } = useQuery({
		queryKey: ["websites"],
		queryFn: websiteService.getWebsiteList,
	});

	const columns: ColumnsType<Role> = [
		{
			title: "Website",
			dataIndex: "domain",
			width: 300,
		},
		{
			title: "Owner",
			dataIndex: "owner",
		},
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			width: 120,
			render: (status) => (
				<Tag color={status === BasicStatus.DISABLE ? "error" : "success"}>
					{status === BasicStatus.DISABLE ? "Disable" : "Enable"}
				</Tag>
			),
		},
		{ title: "Desc", dataIndex: "desc" },
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray">
					<IconButton onClick={() => onEdit(record)}>
						<Iconify icon="solar:pen-bold-duotone" size={18} />
					</IconButton>
					<Popconfirm
						title="Delete the Role"
						okText="Yes"
						cancelText="No"
						placement="left"
					>
						<IconButton>
							<Iconify
								icon="mingcute:delete-2-fill"
								size={18}
								className="text-error"
							/>
						</IconButton>
					</Popconfirm>
				</div>
			),
		},
	];

	const onCreate = () => {
		setWebsiteModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
				...DEFAULE_ROLE_VALUE,
			},
		}));
	};

	const onEdit = (formValue: Role) => {
		setWebsiteModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<>
		<Space direction="vertical" size="large" className="w-full">
			<Card>
				<Form form={searchForm}>
					<Row gutter={[16, 16]}>
						<Col span={24} lg={6}>
							<Form.Item<SearchFormFieldType>
								label="Website Domain"
								name="name"
								className="!mb-0"
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={24} lg={6}>
							<Form.Item<SearchFormFieldType>
								label="Status"
								name="status"
								className="!mb-0"
							>
								<Select>
									<Select.Option value="enable">
										<Tag color="success">Enable</Tag>
									</Select.Option>
									<Select.Option value="disable">
										<Tag color="error">Disable</Tag>
									</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={24} lg={12}>
							<div className="flex justify-end">
								<Button onClick={onSearchFormReset}>Reset</Button>
								<Button type="primary" className="ml-4">
									Search
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Card>
			<Card
				title="Website Management"
				extra={
					<Button type="primary" onClick={onCreate}>
						New
					</Button>
				}
			>
				<Table
					rowKey="id"
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={data}
				/>

				<WebsiteModal {...roleModalPros} />
			</Card>
		</Space>
		</>
	);
}
