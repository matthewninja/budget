const routes = require('express').Router();
routes.use('/api', require('./api'));

/**
 * Home page
 */
routes.get('/', (req, res) => {
  res.render('home');
});

/**
 * Analysis page
 */
routes.get('/analysis', (req, res) => {
  res.render('analysis');
});

/**
 * Settings page
 */
routes.get('/settings', (req, res) => {
  res.render('settings');
});

module.exports = routes;
