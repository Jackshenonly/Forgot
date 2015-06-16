/*初始化密文页面*/
function initDetails() {
	var data = api.pageParam.data;
	//	api.alert({msg:data
	//  },function(ret,err){
	//  	//coding...
	//  });
	$api.byId("where").value = data.where;
	$api.byId("account").value = data.account;
	$api.byId("pwd").value = data.pwd;
	$api.byId("command").value = data.command;
//	$api.byId("hint").value = data.hint;
	$api.byId("remarks").value = data.remarks;
	$api.byId("where").readOnly = true;
	$api.byId("account").readOnly = true;
	$api.byId("pwd").readOnly = true;
	$api.byId("command").readOnly = true;
	$api.byId("hint").readOnly = true;
	$api.byId("remarks").readOnly = true;
}

/*显示明文*/
function showClearText() {
	var data = api.pageParam.data;
	var base64 = new Base64();
	var hint = base64.decode(data.hint);
	api.prompt({
		title : "请输入口令！",
		msg : "口令提示：" + hint,
		buttons : ['确定', '忘记了']
	}, function(ret, err) {
		//coding...

		if (ret.buttonIndex == 1) {
			if (hex_md5(ret.text) === data.command) {
				$api.byId("where").value = data.where;
				$api.byId("account").value = base64.decode(data.account);
				$api.byId("pwd").value = base64.decode(data.pwd);
				$api.byId("command").value = data.command;
				$api.byId("hint").value = base64.decode(data.hint);
				$api.byId("remarks").value = base64.decode(data.remarks);
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

apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
	initDetails();
}