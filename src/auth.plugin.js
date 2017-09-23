import HapiJWT from 'hapi-auth-jwt2';

const register = (server, options, next) => {
    server.register(HapiJWT);
    server.auth.strategy('jwt', 'jwt', {
        key: 'supersecret', // TODO: obviously use an environment variable :)
        validateFunc: (decoded, request, callback) => callback(null, true),
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');
    next();
};

register.attributes = {
    name: 'auth-wrapper',
    version: '1.0.0'
};

export default register;
