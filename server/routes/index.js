const express = require('express');
const router = express.Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../../components/app'); //Must use babel-node for this to work
//const App = require('../../components/babelified'); //Uncomment if you prefer to not use babel-node


router.get('/', function(req, res, next){
	res.render('layout', {
		reactHtml: ReactDOMServer.renderToString(React.createFactory(App)({}))
	});
});

module.exports = router;
