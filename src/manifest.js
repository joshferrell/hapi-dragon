const manifest = {
    server: {
        cache: 'redis'
    },
    connections: [
        {
            port: 8000,
            labels: ['api']
        },
        {
            port: 8001,
            labels: ['admin']
        }
    ],
    registrations: [
        { plugin: 'inert' },
        { plugin: 'vision' },
        { plugin: 'hapi-swagger' },
        { plugin: './auth.plugin' }
    ]
};

export default manifest;
