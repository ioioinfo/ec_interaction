// Base routes for item..
exports.register = function(server, options, next){
	var service_info = "ec interaction service";

	//通过商品id找到评论
	var get_comments_infos = function(product_id, cb){
		server.plugins['models'].product_comments.find_comments(product_id,function(rows){
			if (rows.length > 0) {
				cb(false,rows);
			}else {
				cb(true,"商品信息不存在！");
			}
		});
	};
	//通过商品id找到追评
	var get_again_comments = function(product_id, cb){
		server.plugins['models'].product_comments.find_again_comments(product_id,function(rows){
			if (rows.length > 0) {
				cb(false,rows);
			}else {
				cb(true,"商品信息不存在！");
			}
		});
	};
	//通过人id找到人信息
	var get_persons_infos = function(person_ids, cb){
		server.plugins['models'].persons.find_persons(person_ids,function(rows){
			if (rows.length > 0) {
				cb(false,rows);
			}else {
				cb(true,"评论人信息不存在！");
			}
		});
	};
	//通过评论id找到晒单图片
	var get_saidan_infos = function(comments_ids, cb){
		server.plugins['models'].saidan_pictures.find_saidans(comments_ids,function(rows){
			if (rows.length > 0) {
				cb(false,rows);
			}else {
				cb(true,"评论人信息不存在！");
			}
		});
	};
	server.route([
		//展示一个商品的评论
		{
			method: 'GET',
			path: '/comments_show',
			handler: function(request, reply){
				var product_id = request.query.product_id;
				get_comments_infos(product_id, function(err, rows){
					if (!err) {
						return reply({"success":true,"message":"ok","rows":rows,"service_info":service_info});
					}else {
						return reply({"success":false,"message":rows,"service_info":service_info});
					}
				});
			}
		},
		//展示一个商品的追评
		{
			method: 'GET',
			path: '/again_comments',
			handler: function(request, reply){
				var product_id = request.query.product_id;
				get_again_comments(product_id, function(err, rows){
					if (!err) {
						return reply({"success":true,"message":"ok","rows":rows,"service_info":service_info});
					}else {
						return reply({"success":false,"message":rows,"service_info":service_info});
					}
				});
			}
		},
		//通过评论找人信息
		{
			method: 'GET',
			path: '/comments_persons',
			handler: function(request, reply){
				var person_ids = request.query.person_ids;
				if (!person_ids) {
					return reply({"success":false,"message":"参数错误","service_info":service_info});
				}
				person_ids = JSON.parse(person_ids);
				get_persons_infos(person_ids, function(err, rows){
					if (!err) {
						return reply({"success":true,"message":"ok","rows":rows,"service_info":service_info});
					}else {
						return reply({"success":false,"message":rows,"service_info":service_info});
					}
				});
			}
		},
		//通过评论找晒单
		{
			method: 'GET',
			path: '/comments_saidan',
			handler: function(request, reply){
				var comments_ids = request.query.comments_ids;
				if (!comments_ids) {
					return reply({"success":false,"message":"参数错误","service_info":service_info});
				}
				comments_ids = JSON.parse(comments_ids);
				get_saidan_infos(comments_ids, function(err, rows){
					if (!err) {
						return reply({"success":true,"message":"ok","rows":rows,"service_info":service_info});
					}else {
						return reply({"success":false,"message":rows,"service_info":service_info});
					}
				});
			}
		},


    ]);

    next();
};

exports.register.attributes = {
    name: 'products_base'
};
