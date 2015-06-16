function createDir(Dir_name) {
	var fs = api.require('fs');
	fs.createDir({
		path : 'fs://' + Dir_name,
	}, function(ret, err) {
		var status = ret.status;
		if (status) {
			api.alert({
				msg : '初始化密码目录成功！'
			});
		} else {
			api.alert({
				msg : err.msg
			});
		};
	});

}

function createFile(File_name) {
	fs.createFile({
		path : 'fs://forgot/' + File_name,
	}, function(ret, err) {
		var status = ret.status;
		if (status) {
			api.alert({
				msg : '初始化密码文件成功！'
			});
		} else {
			api.alert({
				msg : err.msg
			});
		};
	});
}

function writeFile(File_name,text) {
	api.writeFile({
		path : 'fs://forgot/'+File_name,
		data : text,
		append:false,
	}, function(ret, err) {
		var status = ret.status;
		if (status) {
			api.toast({
	            msg:'更新密码文件成功！'
            });
		} else {
			api.alert({
				msg : err.msg
			});
		}
	});
}

