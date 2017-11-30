var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', null);
});

router.post('/:action', function(req, res, next) {  //router.get('/:action', function(req, res, next) {
    var action = req.params.action  //var action = req.query.action

	if (action == 'contact') {
        console.log(req.body)
        res.render('confirmation', null)
	}
})

router.get('/project/:name', function(req, res, next) { //router.get(':/name', function(req, res, next) {
    var pages = ['campadvisor', 'garage_sale']

	var name = req.params.name

	if (pages.indexOf(name) ==-1){
		res.render('error', {message: "Page does not exist, check your spelling"})

		return
	}

	if (name == name) {
		res.render(name, null)
	}
})

module.exports = router;
