const manifest = {
    connections: [
        {
            port: 3000,
            labels: ['api']
        }
    ],
    registrations: [
        { plugin: 'inert' },
        { plugin: 'vision' },
        { plugin: 'hapi-swagger' },
        { plugin: 'hapi-auth-jwt2' }
    ]
};

export default manifest;
