import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ClipboardPage = lazy(() => import("@/pages/functions/clipboard"));

const adsInventory: AppRouteObject = {
	order: 4,
	path: "ads-inventory",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "Ads Inventory",
		icon: (
			<Iconify
				icon="solar:plain-2-bold-duotone"
				className="ant-menu-item-icon"
				size="24"
			/>
		),
		key: "/ads-inventory",
	},
	children: [
		{
			path: "/ads-inventory/websites",
			element: <ClipboardPage />,
			meta: { label: "Websites", key: "/ads-inventory/websites" },
		},
		{
			path: "/ads-inventory/ads-management",
			element: <ClipboardPage />,
			meta: { label: "Ads management", key: "/ads-inventory/ads-management" },
		},
	],
};

export default adsInventory;
