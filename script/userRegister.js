var inputWrap = $api.domAll('.input-wrap');
var i = 0, len = inputWrap.length;
for (i; i < len; i++) {
    var txt = $api.dom(inputWrap[i], '.txt');
    var del = $api.dom(inputWrap[i], '.del');
    (function (txt, del) {
        $api.addEvt(txt, 'focus', function () {
            if (txt.value) {
                $api.addCls(del, 'show');
            }
            $api.addCls(txt, 'light');
        });
        $api.addEvt(txt, 'blur', function () {
            $api.removeCls(del, 'show');
            $api.removeCls(txt, 'light');
        });
    })(txt, del);

}

function delWord(el) {
    var input = $api.prev(el, '.txt');
    input.value = '';
}

function ensure() {
    api.showProgress({
        title: '注册中...',
        modal: false
    });
    var name = $api.byId('userName').value;
    var pwd = $api.byId('userPwd').value;
    var pwd2 = $api.byId('userPwd2').value;

	
    if (pwd !== pwd2) {
        api.alert({
            msg: '两次密码不一致'
        }, function (ret, err) {
        api.hideProgress();
                //coding...
        });
        	return;
        
      }
    if(pwd.length<8){
    	api.alert({
    	title:"来自手机的嘲讽！",
            msg: '你不够严肃，密码少于8位！'
        }, function (ret, err) {
        api.hideProgress();
                //coding...
        });
        	return;
    
    }
    if(!name)
    {
    	api.alert({title:"大人别太随意！",msg:'账号不能为空！'});
 
    	api.hideProgress();
    	//coding...
    	return;
    }
   	api.alert({
   		title:"太天真了，你！",
   		msg:"作业要求里面写得很清楚了！只能我一个人登陆，我能开通注册接口！？你看该页面上面的注册前有个逻辑非^_^。\n想揍我？\n你打不着QAQ"
       },function(ret,err){
       	//coding...
       });
    
    
    api.hideProgress();

}

apiready = function () {
    var header = $api.byId('header');
    $api.fixIos7Bar(header);
};