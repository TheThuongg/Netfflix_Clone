const usersRouter = require('./users');
const authRouter = require('./auth');
const movieRouter = require('./movies');
const listRouter = require('./lists');


function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/lists', listRouter);
}

module.exports = route;