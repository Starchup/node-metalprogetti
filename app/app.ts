import
{
	Server,
	ServerDelegate
}
from "./classes/Server";

/**
 * Main server implementation
 */
const server = new Server(443, (request: any) =>
{
	// Handle Status method
	if (request.method === 'GET' && request.url === '/')
	{
		return Promise.resolve('OK');
	}

	throw new Error('Method or URL invalid');
});