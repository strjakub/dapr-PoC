
import express from 'express';
import fetch from 'isomorphic-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { DaprClient, HttpMethod } from "@dapr/dapr";

const app = express();
app.use(express.json());

const port = '3000';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, 'public');

const daprHost = "127.0.0.1";
const daprPort = "9001";

const client = new DaprClient({ daprHost, daprPort });

const serviceAppId = "server";
const serviceMethod = "health";


app.get('/health', async (_req, res) => {
    const response = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.GET);
    console.log(response);
    res.json(response);
});

app.get('/', (_req, res) => {
    res.sendFile(join(publicPath, 'index.html'));
});



app.use(express.static(join(__dirname, 'public')));
app.listen(port, () => console.log(`Node App listening on port ${port}!`));