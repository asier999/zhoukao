var http = require('http'),
fs = require('fs'),
urlLib = require('url');

http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = urlLib.parse(req.url,true).query;

	//[‘今天天气不错的’][''][""]
	//console.log(json.titName)
	fs.readFile('./所有的文章.txt','utf8',function(err,data){
		if(err){
			console.log('err:'+err);
		}
		else{

			function toString(data,need){
				if(data.indexOf(need)!=-1){
					data = data.replace(need,'"');
					return toString(data,need);
				}
				else{
					return data;
				}
			};
			var l = toString(data,'‘');
			var r = toString(l,'’');

			res.write(r);
			res.end();

		}
	});


}).listen(2139);


http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = urlLib.parse(req.url,true).query;

	//console.log(json.titName)

	fs.writeFile('./所有的文章/'+json.titName+'.txt',json.inner,function(err){
		if(err){
			console.log(err);
		}
		else{
			res.write('发布完毕');
			res.end();


			fs.readFile('./所有的文章.txt','utf8',function(err,data){
				if(err){
					console.log('err:'+err);
				}
				else{

					function toString(data,need){
						if(data.indexOf(need)!=-1){
							data = data.replace(need,'"');
							return toString(data,need);
						}
						else{
							return data;
						}
					};
					var l = toString(data,'‘');
					var r = toString(l,'’');
					//var lastArr = JSON.parse(r);
					var allArr = JSON.parse(r);
					allArr.push(json.titName);
					fs.writeFile('./所有的文章.txt',JSON.stringify(allArr),function(err){
						if(err){
							console.log('err:'+err);
						}
						else{
							console.log('写入成功');
						}
					})
					//res.write(r);
					//res.end();
					//var d = data.replace('‘','"');
					//var c = d.replace('’','"');
					//console.log(JSON.parse(c));
					//console.log(JSON.parse(data));
					//console.log(eval('('+data+')'));
				}
			});


		}
	})


}).listen(2138);

http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = urlLib.parse(req.url,true).query;

	fs.readFile('./所有的文章/'+json.titName+'.txt',function(err,data){
		if(err){
			console.log('err:'+err);
		}
		else{
			res.write(data);
			res.end();
		}
	})


}).listen(2140)













