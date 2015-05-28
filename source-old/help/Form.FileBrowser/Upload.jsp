<%@ page contentType='text/html;charset=utf-8' %>
<%@ include file='/apl/public.inc' %>

<HTML>
<HEAD>
<TITLE>eUIS - 用户登录</TITLE>
<LINK rel='shortcut icon' href='<jh:context path='/ars/icon/site.ico'/>'>
<link rel='bookmark' href='<jh:context path='/ars/icon/site.ico'/>'>
<je:css/>
<je:js type='runtime'/>
<SCRIPT src="/eUIS/ajs/mobj.js"></SCRIPT>
<SCRIPT src="/eUIS/ajs/4-ctl.form/FUploadView.js"></SCRIPT>
<SCRIPT src="/eUIS/ajs/4-ctl.form/FUploadItem.js"></SCRIPT>
<!--------------------------------------------------------->
<SCRIPT language='javascript'>
function goLogin(){
	// 存储Cookie
	var loginMind = RHtml.checkGet(fmLogin.login_mind);
	RCookie.set('passport', RBool.isTrue(loginMind) ? fmLogin.passport.value : null);
	RCookie.set('login_date', RDate.format());
	RCookie.set('login_mind', loginMind);
	RCookie.set('login_type', RHtml.radioGet(fmLogin.login_type));
	RCookie.disconnect();
	// 页面跳转
	RTag.goPage(fmLogin, null, "<jh:context/>/apl/login/Login.wa?do=login");
}
//----------------------------------------------------------
function onLoginKeyDown(){
	if(EKey.Enter == event.keyCode){
		goLogin();
	}
}
//----------------------------------------------------------
function _onloadAll(){
   MoJS.initialize();
   //
   var n = RControl.create(FUploadView);
   n.setPanel(id_span);

}
//----------------------------------------------------------
function _onload(){
   RWindow.connect(window);
   RLoader.loadJs('logic');
   RLoader.waitJs(new TInvoke(null, _onloadAll), 'logic');
}
</SCRIPT>
<!--------------------------------------------------------->
<BODY style='margin:0; padding:0' onload='_onload()' style='filter:progid:DXImageTransform.Microsoft.Gradient(gradienttype=0, startcolorstr=#caeeee, endcolorstr=#1d8bb5);'>
<jh:form name='fmLogin' method='post'>

<TABLE width="100%" height='100%' border='0' cellpadding="0" cellspacing="0">
<TR>
<TD width='50%'><DIV></DIV></TD>
<TD width="1" bgcolor="#1C89B3"><jh:img icon='n'/></TD>
<TD>
<TABLE width="100%" height='100%' border="0" cellpadding="0" cellspacing="0" background="<jh:img type='path' src='/login/loginBg.jpg'/>">
<TR><TD height='1'>
<!--------------------------------------------------------->
<TABLE width="933" height='433' border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD height='94'>&nbsp;</TD>
  </TR>
  <TR>
    <TD align='center' valign='top'>
      <TABLE width="100%" height="323" border="0" cellpadding="0" cellspacing="0" STYLE="table-layout:fixed">
      <TR>
        <TD width="116"><jh:img icon='n'/></TD>
        <TD width="100%" valign='top' id='id_span'>
        </TD>
        <TD width="116"><jh:img icon='n'/></TD>
      </TR>
      </TABLE>
    </TD>
  </TR>
</TABLE>
<!--------------------------------------------------------->
</TD></TR>
<TR><TD bgcolor='#DCEDF5' align='center'>
</TD></TR>
</TABLE>
</TD>
<TD width="1" bgcolor="#1C89B3"><jh:img icon='n'/></TD>
<TD width='50%'><DIV></DIV></TD>
</TR>
</TABLE>
</jh:form>
</BODY>
</HTML>
