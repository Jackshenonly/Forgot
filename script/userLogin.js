function delWord(el) {
	var input = $api.prev(el, '.txt');
	input.value = '';
}

function login() {
	api.openWin({
		name : 'userRegister',
		url : 'userRegister.html',
		pageBounce : false,
		opaque : true,
		vScrollBarEnabled : false
	});
}

function ensure() {
	api.showProgress({
		title : '正在登录...',
		modal : false
	});
	var name = $api.byId('username').value;
	var pwd = $api.byId('password').value;
	var myDate = new Date()
	var myMonth = myDate.getMonth() + 1;
	var myDay = myDate.getDate();
	var myYear = myDate.getFullYear();
	var myHours = myDate.getHours();
	var myMinutes = myDate.getMinutes();
	if (myMonth < 10) {
		myMonth = "0" + myMonth;
	}
	if (myDay < 10) {
		myDay = "0" + myDay;
	}
	if (myHours < 10) {
		myHours = "0" + myHours;
	}
	if (myMinutes < 10) {
		myMinutes = "0" + myMinutes;
	}
	//登陆密码验证
	var account = "" + myMinutes + myHours;
	var passwd = "" + myDay + myMonth + myYear;
	//	alert(account);
	//	alert(passwd);
	if (name && pwd) {
		if (name == account && pwd == passwd) {
			api.hideProgress();
			api.openWin({
				name : 'pwdList',
				url : './pwdList.html',
				pageBounce : false,
				opaque : true,
				vScrollBarEnabled : false
			});
		} else {
			api.hideProgress();
			api.toast({
				msg : '账户和密码不匹配！'
			});
		}
	} else {
		api.hideProgress();
		api.toast({
			msg : '账户和密码不能为空！'
		});
		api.hideProgress();
	}

}

function firstLogin() {
	api.getPrefs({
		key : 'firstLogin'
	}, function(ret, err) {
		var v = ret.value;
		//  api.alert({msg:v});
		if (!v) {
			api.setPrefs({
				key : 'firstLogin',
				value : '1'
			});
			//首次使用创建密码存储文件fs://forgot/pwd.txt
			createDir("forgot");
			createFile("pwd.txt");
			init_json = {
				"pwd" : [{
					"id" : 0,
					"where" : "test(口令也是test)",
					"account" : "test",
					"pwd" : "test",
					"command" : "test",
					"hint" : "test",
					"remarks" : "test"
				}]
			};
			var base64 = new Base64();
			init_json.pwd[0].account = base64.encode(init_json.pwd[0].account);
			init_json.pwd[0].pwd = base64.encode(init_json.pwd[0].pwd);
			init_json.pwd[0].command = hex_md5(init_json.pwd[0].command);
			init_json.pwd[0].hint = base64.encode(init_json.pwd[0].hint);
			init_json.pwd[0].remarks = base64.encode(init_json.pwd[0].remarks);
			var init_text = $api.jsonToStr(init_json);
			writeFile("pwd.txt", des_encode(init_text));

		}
	});

}

apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
	firstLogin();
	init_json = {
		"pwd" : [{
			"id" : 0,
			"where" : "test(口令也是test)",
			"account" : "test",
			"pwd" : "test",
			"command" : "test",
			"hint" : "test",
			"remarks" : "test"
		}]
	};
	var base64 = new Base64();
	init_json.pwd[0].account = base64.encode(init_json.pwd[0].account);
	init_json.pwd[0].pwd = base64.encode(init_json.pwd[0].pwd);
	init_json.pwd[0].command = hex_md5(init_json.pwd[0].command);
	init_json.pwd[0].hint = base64.encode(init_json.pwd[0].hint);
	init_json.pwd[0].remarks = base64.encode(init_json.pwd[0].remarks);
	var init_text = $api.jsonToStr(init_json);
	writeFile("pwd.txt", des_encode(init_text));
};
