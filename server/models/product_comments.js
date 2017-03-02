var _ = require('lodash');
var EventProxy = require('eventproxy');

var product_comments = function(server) {
	return {
		find_comments: function(product_id, callback) {
			var query = `select * FROM interaction_product_comments where product_id=? and flag =0`;

			server.plugins['mysql'].pool.getConnection(function(err, connection) {

				connection.query(query, [product_id], function(err, results) {
					if (err) {
						throw err;
					}
					connection.release();
					callback(results);
				});
			});
		},
		find_again_comments: function(product_id, callback) {
			var query = `select * FROM interaction_product_comments where product_id=? and is_again =1 and flag =0`;

			server.plugins['mysql'].pool.getConnection(function(err, connection) {

				connection.query(query, [product_id], function(err, results) {
					if (err) {
						throw err;
					}
					connection.release();
					callback(results);
				});
			});
		},

	};
};

module.exports = product_comments;
