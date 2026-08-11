const companyRoutes  = require('./companyRoutes');
const employeeRoutes = require('./employeeRoutes');
const categoryRoutes = require('./categoryRoutes');
const weatherRoutes  = require('./weatherRoutes');
const apiKeyAuth     = require('../middleware/apiKeyAuth');
const basicAuth      = require('../middleware/basicAuth');

module.exports = (app) => {
    app.use('/companies',  apiKeyAuth, companyRoutes);
    app.use('/employees',  apiKeyAuth, employeeRoutes);
    app.use('/categories', basicAuth, categoryRoutes);
    app.use('/weather',    weatherRoutes);
};
