module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/index", function(req, res) {
    res.render("index");
  });

  app.get("/saved", function(req, res) {
    res.render("saved");
  });
};
