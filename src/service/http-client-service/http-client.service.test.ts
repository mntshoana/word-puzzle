import { HttpClientService } from './http-client.service';

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid')
}));

describe('HttpClientService', () => {
    let httpClientService: HttpClientService;
    const mockBaseUrl = 'http://mock-api.com';
    const mockTimeout = 25000;

    beforeEach(() => {
        process.env.REACT_APP_API_BASE_URL = mockBaseUrl;
        process.env.REACT_APP_API_TIMEOUT = mockTimeout.toString();
        httpClientService = new HttpClientService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create an instance of HttpClientService', () => {
        expect(httpClientService).toBeTruthy();
    });

    describe('get', () => {
        it('should send a GET request and return the response', async () => {
            const mockResponse = { data: 'mockData' };
            global.fetch = jest.fn().mockResolvedValue({
                status: 200,
                json: jest.fn().mockResolvedValue(mockResponse)
            });

            const response = await httpClientService.get('/endpoint', { param1: 'value1' });

            expect(response).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle errors correctly', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                status: 404,
                statusText: 'Not Found'
            });

            await expect(httpClientService.get('/endpoint', { param1: 'value1' })).rejects.toEqual({
                status: 404,
                message: 'Not Found'
            });
        });
    });

    describe('post', () => {
        it('should send a POST request and return the response', async () => {
            const mockResponse = { data: 'mockData' };
            global.fetch = jest.fn().mockResolvedValue({
                status: 200,
                json: jest.fn().mockResolvedValue(mockResponse)
            });

            const response = await httpClientService.post('/endpoint', { key: 'value' });

            expect(response).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle errors correctly', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                status: 500,
                statusText: 'Internal Server Error'
            });

            await expect(httpClientService.post('/endpoint', { key: 'value' })).rejects.toEqual({
                status: 500,
                message: 'Internal Server Error'
            });
        });
    });

    describe('put', () => {
        it('should send a PUT request and return the response', async () => {
            const mockResponse = { data: 'mockData' };
            global.fetch = jest.fn().mockResolvedValue({
                status: 200,
                json: jest.fn().mockResolvedValue(mockResponse)
            });

            const response = await httpClientService.put('/endpoint', { key: 'value' });

            expect(response).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle errors correctly', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                status: 403,
                statusText: 'Forbidden'
            });

            await expect(httpClientService.put('/endpoint', { key: 'value' })).rejects.toEqual({
                status: 403,
                message: 'Forbidden'
            });
        });
    });

    describe('delete', () => {
        it('should send a DELETE request and return the response', async () => {
            const mockResponse = { data: 'mockData' };
            global.fetch = jest.fn().mockResolvedValue({
                status: 200,
                json: jest.fn().mockResolvedValue(mockResponse)
            })

            const response = await httpClientService.delete('/endpoint', { key: 'value' });

            expect(response).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle errors correctly', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                status: 401,
                statusText: 'Unauthorized'
            });

            await expect(httpClientService.delete('/endpoint', { key: 'value' })).rejects.toEqual({
                status: 401,
                message: 'Unauthorized'
            });
        });
    });
});