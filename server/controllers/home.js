/**
 * GET /
 * Home page.
 */

exports.index = (req, res) => {
  res.render('home', {
    status: 'API server is running: Thunderbirds are go!',
  });
};
