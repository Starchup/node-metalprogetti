const http = require('http');

type PromiseDataCallback = (data: string) => void;
type PromiseErrCallback = (arg: Error) => void;

export function GET(url: string): Promise < string >
{
    return new Promise((resolve: PromiseDataCallback, reject: PromiseErrCallback) =>
    {
        http.get(url, (resp: any) =>
        {
            let data: string = '';
            resp.on('data', (chunk: string) =>
            {
                data += chunk;
            });
            resp.on('end', () =>
            {
                resolve(JSON.parse(data));
            });
        }).on("error", (err: Error) =>
        {
            reject(err);
        });
    });
}

export function POST(url: string, port: string, path: string, data: object): Promise < string >
{
    return new Promise((resolve: PromiseDataCallback, reject: PromiseErrCallback) =>
    {
        const post_req = http.request(
        {
            host: url,
            port: port,
            method: 'POST',
            path: path,
            headers:
            {
                'Content-Type': 'application/json'
            }
        }, function (res: any)
        {
            res.setEncoding('utf8');

            let data: string = '';
            res.on('data', (chunk: string) =>
            {
                data += chunk;
            });
            res.on('end', () =>
            {
                resolve(data);
            });
        }).on("error", (err: Error) =>
        {
            reject(err);
        });

        post_req.write(JSON.stringify(data));
        post_req.end();
    });
}