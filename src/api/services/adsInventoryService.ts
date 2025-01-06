import apiClient from "../apiClient";

import type { AdsInventory, Website } from "#/entity";

export enum AdsInventoryApi {
	AdsInventory = "/ads-inventories",
}

const getAdsInventory = (filters: {
	websiteId?: string;
	formatTypeCode?: string;
	status?: string;
}) =>
	apiClient.post<AdsInventory[]>({
		url: AdsInventoryApi.AdsInventory,
		data: filters,
	});

export default {
	getAdsInventory,
};
