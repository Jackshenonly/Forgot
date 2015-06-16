function delWord(el) {
	var input = $api.prev(el, '.txt');
	input.value = '';
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



function add_pwd() {
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
			//对command(口令)进行md5加密，id,和where不加密用作=》判断，其他进行base64加密。
			var where = $api.byId("where").value;
			var base64 = new Base64();
			var account = base64.encode($api.byId("account").value);
			var pwd = base64.encode($api.byId("pwd").value);
			var hint = base64.encode($api.byId("hint").value);
			var remarks = base64.encode($api.byId("remarks").value);

			var command = hex_md5($api.byId("command").value);
			

			
			var item = {}
			//为每一个密码分配一个唯一标记id，删除时用。
			item["id"] = mjson.pwd[mjson.pwd.length-1].id + 1;
			item["where"] = where;
			item["account"] = account;
			item["pwd"] = pwd;
			item["command"] = command;
			item["hint"] = hint;
			item["remarks"] = remarks;
			mjson.pwd.push(item);

			text = $api.jsonToStr(mjson);
			//对文件pwd.txt内容进行des加密
			var des_text = des_encode(text);
			
			writeFile("pwd.txt", des_text);
			api.execScript({
				name:'pwdList',
	            script: 'getData();'
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

};
