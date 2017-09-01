import Boom from 'boom';

export const createDependencyHandler = dependencyChecks => (request, reply) => {
    Promise.all(dependencyChecks.map(x => x()))
        .then((status) => {
            status
                .filter(({ up }) => !up)
                .forEach(s => request.log('error', {
                    msg: `${s.name} is down`,
                    status: s
                }));

            return reply(status);
        })
        .catch((err) => {
            request.log('error', {
                msg: 'unable to check dependency status',
                err
            });

            return reply(Boom.badImplementation());
        });
};

export const healthStatus = (request, reply) => reply({ status: 'OK' });
