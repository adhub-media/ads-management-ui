import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import { ADS_FORMAT_LIST } from "@/_mock/assets";
import { IconButton, Iconify } from "@/components/icon";

import { AdsInventoryModal, type AdsInventoryModalProps } from "./adsInventory-modal";

import type { AdsInventory, Role, Website } from "#/entity";
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
	Tooltip,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import adsInventoryService from "@/api/services/adsInventoryService";
import websiteService from "@/api/services/websiteService";
import { AdsInventoryFilter } from "./adsInventory-filter";

type SearchFormFieldType = Pick<Website, "name" | "status">;


export type FilterAdsInventoryType = {
	websiteId?: string;
	formatTypeCode?: string;
	status?: string;
};

const filterForm: FilterAdsInventoryType = {};
export default function AdsInventoryPage() {
	const websites = useQuery({
		queryKey: ["websites"],
		queryFn: websiteService.getWebsiteList,
		
	}).data;
	
	const [adsInventoryModalPros, AdsInventoryModalProps] = useState<AdsInventoryModalProps>({
		formValue: { ...filterForm },
		adsFormats: ADS_FORMAT_LIST,
		websites: websites,
		title: "New",
		show: false,
		onOk: () => {
			AdsInventoryModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			AdsInventoryModalProps((prev) => ({ ...prev, show: false }));
		},
	});

	const [filters, setFilters] = useState(filterForm);

	const { mutate, data, isLoading, isError, error } = useMutation({
    mutationFn: adsInventoryService.getAdsInventory,
    onSuccess: (data) => {
      console.log("Fetched Ads Inventory:", data);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Error fetching ads inventory:", error.message);
      }
    },
  });

	const handleFetch = () => {
    mutate(filters); // Pass the filters to the mutation
  };

	useEffect(() => {
		handleFetch()
	}, [filters])

	const onSearchForm = (values: FilterAdsInventoryType) => {
    setFilters(values); // Update filters when the form is submitted
    handleFetch(); // Call the fetch function with updated filters
  };

	const columns: ColumnsType<AdsInventory> = [
		{
			title: "Website Domain",
			dataIndex: ["website", "domain"],
			width: 250,
			render: (domain, record) => (
				<Tooltip title={`View details for ${domain}`}>
					<span className="text-primary font-medium">{domain}</span>
				</Tooltip>
			),
		},
		{
			title: "Owner",
			dataIndex: ["website", "owner"],
			width: 200,
			render: (owner) => <span>{owner || "N/A"}</span>,
		},
		{
			title: "Ads Format",
			dataIndex: ["adsFormat", "name"],
			width: 150,
			align: "center",
			render: (name) => (
				<Tag color="blue" className="uppercase">
					{name}
				</Tag>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			width: 120,
			align: "center",
			render: (status) => (
				<Tag color={status === "inactive" ? "error" : "success"}>
					{status === "inactive" ? "Inactive" : "Active"}
				</Tag>
			),
		},
		{
			title: "Created By",
			dataIndex: ["createdBy", "username"],
			width: 150,
			render: (username) => <span>{username || "System"}</span>,
		},
		{
			title: "Created Date",
			dataIndex: "createdDate",
			width: 150,
			render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
		},
		{
			title: "Description",
			dataIndex: "desc",
			render: (desc) => (
				<Tooltip title={desc}>
					<span>{desc ? `${desc.slice(0, 50)}...` : "N/A"}</span>
				</Tooltip>
			),
		},
		{
			title: "Action",
			key: "operation",
			width: 150,
			align: "center",
			render: (_, record) => (
				<div className="flex w-full justify-center space-x-2">
					<Tooltip title="Edit">
						<IconButton onClick={() => onEdit(record)}>
							<Iconify icon="solar:pen-bold-duotone" size={18} />
						</IconButton>
					</Tooltip>
					<Popconfirm
						title="Are you sure you want to delete this Ads Inventory?"
						okText="Yes"
						cancelText="No"
						placement="left"
						onConfirm={() => onDelete(record)}
					>
						<Tooltip title="Delete">
							<IconButton>
								<Iconify
									icon="mingcute:delete-2-fill"
									size={18}
									className="text-error"
								/>
							</IconButton>
						</Tooltip>
					</Popconfirm>
				</div>
			),
		},
	];
	

	const onCreate = () => {
		AdsInventoryModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
			},
		}));
	};

	const onEdit = (formValue: AdsInventory) => {
		AdsInventoryModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
			websites: websites
		}));
	};

	return (
		<>
		<Space direction="vertical" size="large" className="w-full">
			<AdsInventoryFilter
			adsFormats={ADS_FORMAT_LIST}
			formValue={filterForm}
			websites={websites || []}
			onOk={onSearchForm}
			/>
			<Card
				title="Ads Management"
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

				<AdsInventoryModal {...adsInventoryModalPros} />
			</Card>
			</Space>
		</>
	);
}
