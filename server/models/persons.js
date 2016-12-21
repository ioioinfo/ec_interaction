var _ = require('lodash');
var EventProxy = require('eventproxy');

var persons = function(server) {
	return {
		find_persons: function(person_ids, callback) {
			var query = `select * FROM persons where id in (?) and flag =0`;

			server.plugins['mysql'].pool.getConnection(function(err, connection) {

				connection.query(query, [person_ids], function(err, results) {
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

module.exports = persons;
