import manifest from './manifest';

describe('server configuration', () => {
    it('should include a server manifest', () => {
        expect(manifest).toMatchSnapshot();
    });
});
