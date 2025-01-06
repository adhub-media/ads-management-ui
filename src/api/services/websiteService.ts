import apiClient from "../apiClient";

import type { Website } from "#/entity";

export enum WebsiteApi {
	Website = "/websites",
}

const getWebsiteList = () => apiClient.get<Website[]>({ url: WebsiteApi.Website });

export default {
	getWebsiteList,
};
