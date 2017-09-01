import moment from 'moment';
import cheerio from 'cheerio';

export const checkPostgresStatus = (connection, log) => () => {
    const startTime = moment().format('x');

    return connection
        .authentication()
        .then(() => {
            const duration = startTime - moment().format('x');
            return {
                name: 'postgres',
                up: true,
                msg: `postgres is up. time to query ${duration}`,
                duration
            };
        })
        .catch((err) => {
            const duration = moment().format('x') - startTime;
            log.error(err, 'unable to ping postgres database');
            return {
                name: 'postgres',
                up: false,
                msg: `postgres is down. time to error ${duration}`,
                duration
            };
        });
};

export const parseImgurStatus = (html) => {
    const $ = cheerio.load(html);
    return $('component-inner-container')
        .filter(x => !$(x).hasClass('status-green'))
        .filter(x => $(x).children().first().text() === 'Imgur Free API')
        .length;
};

export const checkImgurStatus = (url, log) => () => {
    const startTime = moment().format('x');

    return fetch(url)
        .then(res => (
            res.status === '200' ?
                res.html() :
                Promise.reject('imgur is down')
        ))
        .then((html) => {
            const duration = startTime - moment().format('x');
            return parseImgurStatus(html) ?
                Promise.resolve({
                    name: 'imgur',
                    up: true,
                    duration,
                    msg: `imgur is up. time to query ${duration}`
                }) :
                Promise.reject('free api is down');
        })
        .catch((err) => {
            const duration = moment().format('x') - startTime;
            log.error(err, 'unable to connect to imgur');
            return {
                name: 'imgur',
                up: false,
                duration,
                msg: `imgur is down. time to error ${duration}`
            };
        });
};
