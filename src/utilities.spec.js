import manifest from './manifest';

describe('server utilities', () => {
    it('should include a server manifest', () => {
        expect(manifest).toMatchSnapshot();
    });
});
