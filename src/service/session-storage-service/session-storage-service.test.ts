import SessionStorageService from './session-storage-service';

describe('SessionStorageService', () => {
    let sessionStorageService: SessionStorageService;

    beforeEach(() => {
        sessionStorageService = new SessionStorageService();
        sessionStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should write a value to session storage', () => {
        const key = 'testKey';
        const value = { data: 'testData' };

        sessionStorageService.write(key, value);

        expect(sessionStorage.getItem(key)).toEqual(JSON.stringify(value));
    });

    it('should read a value from session storage', () => {
        const key = 'testKey';
        const value = { data: 'testData' };
        sessionStorage.setItem(key, JSON.stringify(value));

        const result = sessionStorageService.read(key);

        expect(result).toEqual(value);
    });

    it('should return null if the key does not exist in session storage', () => {
        const result = sessionStorageService.read('nonExistentKey');

        expect(result).toBeNull();
    });

    it('should remove a value from session storage', () => {
        const key = 'testKey';
        const value = { data: 'testData' };
        sessionStorage.setItem(key, JSON.stringify(value));

        sessionStorageService.remove(key);

        expect(sessionStorage.getItem(key)).toBeNull();
    });

    it('should clear all values from session storage', () => {
        sessionStorage.setItem('key1', JSON.stringify({ data: 'data1' }));
        sessionStorage.setItem('key2', JSON.stringify({ data: 'data2' }));

        sessionStorageService.clear();

        expect(sessionStorage.getItem('key1')).toBeNull();
        expect(sessionStorage.getItem('key2')).toBeNull();
    });
});
