import * as swaggerFormat from './swaggerResponse';

describe('swagger formatting', () => {
    it('should have a format for success', () => {
        expect(swaggerFormat.successFormat).toMatchSnapshot();
    });

    it('should have a format for bad requests', () => {
        expect(swaggerFormat.badRequestFormat).toMatchSnapshot();
    });

    it('should have a format for unauthorized requests', () => {
        expect(swaggerFormat.unauthorizedFormat).toMatchSnapshot();
    });

    it('should have an internal error format', () => {
        expect(swaggerFormat.internalErrorFormat).toMatchSnapshot();
    });

    it('should have a not implemented format', () => {
        expect(swaggerFormat.notImplementedFormat).toMatchSnapshot();
    });
});
