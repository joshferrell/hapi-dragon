import Joi from 'joi';
import { internalErrorFormat, notImplementedFormat } from '../utilities/swaggerResponse';

import { healthStatus, createDependencyHandler } from './health.handler';
import { checkPostgresStatus, checkImgurStatus } from './health.service';

const createHealthRoutes = (logger, imgurUrl, ormConnection) => {
    const imgurStatus = checkImgurStatus(imgurUrl, logger);
    const postgresStatus = checkPostgresStatus(ormConnection, logger);
    const dependencyStatus = createDependencyHandler([imgurStatus, postgresStatus]);

    return [
        {
            method: 'GET',
            path: '/health',
            handler: healthStatus,
            config: {
                auth: false,
                tags: ['api', 'Server Utilities'],
                description: 'Get Up Status of Server',
                notes: [
                    'Returns success status if the server is online'
                ],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            200: {
                                description: 'Server Online',
                                schema: Joi
                                    .object({
                                        status: Joi
                                            .string()
                                            .equal('OK')
                                            .required()
                                    })
                                    .required()
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/health/all',
            handler: dependencyStatus,
            config: {
                auth: false,
                tags: ['api', 'Server Utilities'],
                description: 'Get Up Status of Server Dependencies',
                notes: [
                    'Returns an array of each server dependency with up status and latency'
                ],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            200: {
                                descripton: 'Server Online',
                                schema: Joi
                                    .array()
                                    .length(1)
                                    .unique()
                                    .items(Joi.object({
                                        name: Joi
                                            .string()
                                            .valid('postgres', 'imgur')
                                            .required(),
                                        up: Joi
                                            .boolean()
                                            .required(),
                                        duration: Joi
                                            .number()
                                            .required(),
                                        msg: Joi
                                            .string()
                                            .required()
                                            .label('Human readable response about dependency status')
                                    }))
                                    .required()
                            },
                            ...internalErrorFormat,
                            ...notImplementedFormat
                        }
                    }
                }
            }
        }
    ];
};

export default createHealthRoutes;
