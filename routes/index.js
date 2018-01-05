var express = require('express');
var router = express.Router();

// var helper = require('sendgrid').mail;
// var from_email = new helper.Email('guoqianp@gmail.com');
// var to_email = new helper.Email('guoqianp@gmail.com');
// var subject = 'Hello World from the SendGrid Node.js Library!';
// var content = new helper.Content('text/plain', 'Hello, Email!');
// var mail = new helper.Mail(from_email, subject, to_email, content);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', null);
});

router.get('/confirmation', function(req, res, next){
	res.render('confirmation', null)  //res.render('confirmation', 'null') //res.render('confirmation, null')
})

router.post('/:action', function(req, res, next) {  //router.get('/:action', function(req, res, next) {
    var action = req.params.action  //var action = req.query.action



	if (action == 'contact') {
        console.log(req.body)
		
		var helper = require('sendgrid').mail;
		var from_email = new helper.Email('guoqianp@gmail.com');
		var to_email = new helper.Email('guoqianp@gmail.com');		
		var subject = req.body.subject;
		var content = new helper.Content('text/plain', req.body.message);
		var mail = new helper.Mail(from_email, subject, to_email, content);

        //SEND EMAIL

		var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
		var request = sg.emptyRequest({
		  method: 'POST',
		  path: '/v3/mail/send',
		  body: mail.toJSON(),
		});

		sg.API(request, function(error, response) {
		  console.log(response.statusCode);
		  console.log(response.body);
		  console.log(response.headers);

		  if (error) {
		  	res.json({
		  		confirmation: 'fail',
		  		message: error
		  	})

		  	return
		  }

          res.redirect('/confirmation')  //NOT res.redirect('/confirmation', null)
          
		  // res.json({
		  // 	confirmation: 'success',
		  // 	message: response.body
		  // })

		  // return

		});




        
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
