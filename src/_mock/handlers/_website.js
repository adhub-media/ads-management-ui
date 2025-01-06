import { http, HttpResponse } from "msw";

import { WEBSITE_LIST } from "@/_mock/assets";
import { WebsiteApi } from "@/api/services/websiteService";

const websiteList = http.get(`/api${WebsiteApi.Website}`, () => {
	return HttpResponse.json({
		status: 0,
		message: "",
		data: WEBSITE_LIST,
	});
});

export default [websiteList];
