function delWord(el) {
	var input = $api.prev(el, '.txt');
	input.value = '';
}

function PageToadd_pwd() {
	api.openWin({
		name : 'add-pwd',
		url : './add-pwd.html',
		pageBounce : false,
		opaque : true,
		vScrollBarEnabled : false
	});

}

/*获取数据 */
function getData() {

	api.readFile({
		path : 'fs://forgot/pwd.txt'
	}, function(ret, err) {
		des_text = ret.data;
		//des解密
		text = des_decode(des_text);
		mjson = $api.strToJson(text);

		var evalText = doT.template($("#pwd-template").text());
		$("#accordion-903520").html(evalText(mjson));

	});

}

/*检查是否有权限,做相应操作（op）*/
function checkAuthorityAndRun(op, command, hint, pwd_id) {
	//	$api.setStorage("op", op);
	//	$api.setStorage("command", command);
	//	$api.setStorage("pwd_id", pwd_id);
	if (op === "view") {
		api.readFile({
			path : 'fs://forgot/pwd.txt'
		}, function(ret, err) {
			des_text = ret.data;
			//des解密
			text = des_decode(des_text);
			mjson = $api.strToJson(text);

			for (var i = 0; i < mjson.pwd.length; i++) {
				if (mjson.pwd[i].id == pwd_id) {
					api.openWin({
						name : 'pwd-details',
						url : './pwd-details.html',
						pageParam : {
							data : mjson.pwd[i]
						},
						pageBounce : false,
						opaque : true,
						vScrollBarEnabled : false
					});
				}
			}

		});
		return;
	}
	var base64 = new Base64();
	api.prompt({
		title : "请输入口令！",
		msg : "口令提示：" + base64.decode(hint),
		buttons : ['确定', '忘记了']
	}, function(ret, err) {
		//coding...

		if (ret.buttonIndex == 1) {
			if (hex_md5(ret.text) === command) {
				//认证通过
				//				var op = $api.getStorage("op");
				//				var pwd_id = $api.getStorage("pwd_id");
				switch(op) {

					case "delete" :
						api.readFile({
							path : 'fs://forgot/pwd.txt'
						}, function(ret, err) {
							des_text = ret.data;
							//des解密
							text = des_decode(des_text);
							mjson = $api.strToJson(text);

							for (var i = 0; i < mjson.pwd.length; i++) {
								if (mjson.pwd[i].id == pwd_id) {
									mjson.pwd.splice(i, 1);
									break;
								}
							}
							text = $api.jsonToStr(mjson);
							des_text = des_encode(text);
							writeFile("pwd.txt", des_text);
							getData();
						});
						break;
					case "modify" :
						api.readFile({
							path : 'fs://forgot/pwd.txt'
						}, function(ret, err) {
							des_text = ret.data;
							//des解密
							text = des_decode(des_text);
							mjson = $api.strToJson(text);

							for (var i = 0; i < mjson.pwd.length; i++) {
								if (mjson.pwd[i].id == pwd_id) {
									api.openWin({
										name : 'modify-pwd',
										url : './modify-pwd.html',
										pageParam : {
											data : mjson.pwd[i]
										},
										pageBounce : false,
										opaque : true,
										vScrollBarEnabled : false
									});
								}
							}

						});
						break;

				}

			} else {
				api.alert({
					msg : "口令错误！你是个骗子~~~"
				}, function(ret, err) {
					//coding...
				});
			}
		}

	});
}

function searchPwd() {
	var part = document.getElementById("where").value;

	if (part === "") {
		getData();
	} else {
		api.readFile({
			path : 'fs://forgot/pwd.txt'
		}, function(ret, err) {
			des_text = ret.data;
			text = des_decode(des_text);
			mjson = $api.strToJson(text);
			var filter_json = {
				"pwd" : []
			};
			
			for (var i = 0; i < mjson.pwd.length; i++) {
				
				if (mjson.pwd[i].where.indexOf(part) >= 0 ) {
					filter_json.pwd.push(mjson.pwd[i]);

				}

			}

			var evalText = doT.template($("#pwd-template").text());
			$("#accordion-903520").html(evalText(filter_json));

		});
	}

}

apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
	getData();
	api.setRefreshHeaderInfo({
		visible : true,
		// loadingImgae: 'wgt://image/refresh-white.png',
		bgColor : '#f2f2f2',
		textColor : '#4d4d4d',
		textDown : '下拉刷新...',
		textUp : '松开刷新...',
		showTime : true
	}, function(ret, err) {
		//重新获得数据
		getData();
		api.refreshHeaderLoadDone();
	});

	api.addEventListener({
		name : 'scrolltobottom'
	}, function(ret, err) {
		api.toast({
			msg : '已经没有啦！'
		});
		//api.alert({msg:test},function(ret,err){});

		//getBanner(api.pageParam.tid);
		// getData(api.pageParam.tid);
	});

};
