import glue from 'glue';
import manifest from './manifest';
import createhealthRoutes from './health';

export const startServer = (server) => {
    server.start();
};

export const errorServer = (error) => {
    console.log(error);
};

glue.compose(manifest)
    .then(startServer, errorServer);
