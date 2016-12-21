var _ = require('lodash');
var EventProxy = require('eventproxy');

var saidan_pictures = function(server) {
	return {
		find_saidans: function(comments_ids, callback) {
			var query = `select product_comments_id, location FROM interaction_saidan_pictures where product_comments_id in (?) and flag =0`;

			server.plugins['mysql'].pool.getConnection(function(err, connection) {

				connection.query(query, [comments_ids], function(err, results) {
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

module.exports = saidan_pictures;
