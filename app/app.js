import { DaprClient, HttpMethod } from "@dapr/dapr";

const daprHost = "127.0.0.1";
const daprPort = "9001";

const client = new DaprClient({ daprHost, daprPort });

const serviceAppId = "server";
const serviceMethod = "generatedId";

const response = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.GET);
await new Promise(x => setTimeout(x, 2000));
