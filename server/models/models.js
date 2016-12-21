// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function(server, options, next){

	server.expose('product_comments', require('./product_comments.js')(server));
	server.expose('persons', require('./persons.js')(server));
	server.expose('saidan_pictures', require('./saidan_pictures.js')(server));
	// server.expose('orders_comments', require('./orders_comments.js')(server));

	next();
}

exports.register.attributes = {
    name: 'models'
};
