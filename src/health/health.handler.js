import Boom from 'boom';

export const createDependencyHandler = dependencyChecks => (request, reply) => {
    Promise.all(dependencyChecks.map(x => x()))
        .then(status => {
            status
                .filter(({ up }) => !up)
                .forEach(status => request.log('error', {
                    msg: `${status.name} is down`,
                    status
                }));

            return reply(status);
        })
        .catch(err => {
            request.log('error', {
                msg: 'unable to check dependency status',
                err
            });

            return reply(Boom.badImplementation());
        });
};

export const healthStatus = (request, reply) => reply({ status: 'OK' });
