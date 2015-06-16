/*初始化明文页面*/
function initDetails() {
	var data = api.pageParam.data;
	//	api.alert({msg:data
	//  },function(ret,err){
	//  	//coding...
	//  });
	var base64 = new Base64();
	$api.byId("where").value = data.where;
	$api.byId("account").value = base64.decode(data.account);
	$api.byId("pwd").value = base64.decode(data.pwd);
	//	$api.byId("command").value = data.command;
	//	$api.byId("hint").value = data.hint;
	$api.byId("remarks").value = base64.decode(data.remarks);

}

function checkNull() {
	var where = $api.byId("where").value;
	var account = $api.byId("account").value;
	var pwd = $api.byId("pwd").value;
	var command = $api.byId("command").value;
	var hint = $api.byId("hint").value;
	var remarks = $api.byId("remarks").value;
	if (where && account && pwd && command && hint && remarks) {
		return true
	} else {
		return false
	}
}

function modify() {

	if (!checkNull()) {
		api.alert({
			title : "您不够严肃！",
			msg : "请务必完善信息！"
		}, function(ret, err) {
			//coding...
		});
		return;
	}

	api.readFile({
		path : 'fs://forgot/pwd.txt',
	}, function(ret, err) {
		if (ret.status) {
			des_text = ret.data;
			//des解密
			text = des_decode(des_text);
			
			var mjson = $api.strToJson(text);

			var where = $api.byId("where").value;
			var base64 = new Base64();
			var account = base64.encode($api.byId("account").value);
			var pwd = base64.encode($api.byId("pwd").value);
			var hint = base64.encode($api.byId("hint").value);
			var remarks = base64.encode($api.byId("remarks").value);

			var command = hex_md5($api.byId("command").value);

			var data = api.pageParam.data;
			var item = {}
			item["id"] = data.id;
			item["where"] = where;
			item["account"] = account;
			item["pwd"] = pwd;
			item["command"] = command;
			item["hint"] = hint;
			item["remarks"] = remarks;
			//替换原来的对应id的数据
			for(var i = 0;i < mjson.pwd.length ; i++){
				if (mjson.pwd[i].id ==data.id )
				{	mjson.pwd[i] = item ;}
			}
			
			
			text = $api.jsonToStr(mjson);
			//des加密写回pwd.txt
			des_text = des_encode(text);
			writeFile("pwd.txt", des_text);
			api.execScript({
				name : 'pwdList',
				script : 'getData();'
			});
			setTimeout('api.closeWin()', 1000);
		} else {
			api.alert({
				msg : '错误码: ' + err.code + '错误信息' + err.msg
			});
		}
	});

}

apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
	initDetails();

}; 