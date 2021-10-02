import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EntryPoint from '../app.js';

const entry = new EntryPoint();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || '8000';
const portTls = process.env.PORT_TLS || '465';

const server = http.createServer(entry.app);
const serverSsl = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../cert/key.pem'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname, '../cert/server.crt'), 'utf-8'),
}, entry.app);

server.listen(port, () => process.stdout.write(`SERVER HTTP RUNNING IN PORT: ${port}\nhttp://localhost:${port} \n\n`));
serverSsl.listen(portTls, () => process.stdout.write(`SERVER HTTPS RUNNING IN PORT: ${portTls}\nhttps://localhost:${portTls}\n\n`));
