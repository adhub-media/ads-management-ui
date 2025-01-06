import { http, HttpResponse } from "msw";

import { ADS_INVENTORY_LIST } from "@/_mock/assets";
import { AdsInventoryApi } from "@/api/services/adsInventoryService";

const adsInventoryList = http.post(`/api${AdsInventoryApi.AdsInventory}`, async ({ request }) => {
  const { websiteId, adsFormatCode, status } = await request.json();

  const filteredAdsInventory = ADS_INVENTORY_LIST.filter((item) => {
    return (
      (!websiteId || item.website.id === websiteId) &&
      (!adsFormatCode || item.adsFormat.code === adsFormatCode) &&
      (!status || item.status === status)
    );
  });

  return HttpResponse.json({
    status: 0,
    message: "",
    data: filteredAdsInventory,
  });
});

export default [adsInventoryList];

