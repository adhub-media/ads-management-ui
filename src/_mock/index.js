import { setupWorker } from "msw/browser";

import demoMockApi from "./handlers/_demo";
import orgMockApi from "./handlers/_org";
import userMockApi from "./handlers/_user";
import websiteMockApi from "./handlers/_website";
import adsInventoryMockApi from "./handlers/_adsInventory";

const handlers = [...userMockApi, ...orgMockApi, ...demoMockApi, ...websiteMockApi, ...adsInventoryMockApi];
const worker = setupWorker(...handlers);

export default worker;
