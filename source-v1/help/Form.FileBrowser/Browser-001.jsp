<HTML>
<HEAD>
<TITLE>eUIS - 个人空间</TITLE>
<LINK rel='shortcut icon' href='/eUIS/ars/icon/site.ico'>
<link rel='bookmark' href='/eUIS/ars/icon/site.ico'>
<LINK rel='stylesheet' href='/eUIS/acs/control.css' type='text/css'>
<LINK rel='stylesheet' href='/eUIS/ats/00/cs/control.css' type='text/css'>
<LINK rel='stylesheet' href='/eUIS/ats/00/cs/lang_cn.css' type='text/css'>
<LINK rel='stylesheet' href='/eUIS/ats/00/cs/site_cn.css' type='text/css'>
<SCRIPT src="/eUIS/ajs/runtime.js"></SCRIPT>
<SCRIPT src="FBrowser.js"></SCRIPT>
<SCRIPT src="FBrowserItem.js"></SCRIPT>
<SCRIPT src="FUploadWindow.js"></SCRIPT>
<SCRIPT src="FUploadWorker.js"></SCRIPT>
<SCRIPT src="FWindow.js"></SCRIPT>
<SCRIPT src="MWinBorder.js"></SCRIPT>
<SCRIPT>
RContext.contextPath = '/eUIS';
RContext.contextTag = '/psn';
RContext.themeId = '00';
RContext.languageId = 'cn';
RContext.uriIcon = '/ats/00/rs/icon';
RContext.uriPicture = '/ats/00/rs/pic';
</SCRIPT>
<SCRIPT>RClass.mode = ERun.Debug;</SCRIPT>
<!--------------------------------------------------------->
<SCRIPT language='javascript'>
var lgMenu = null;
var startDate = new Date();
var __innerHeight = 0;
var __boderHeight = 0;
//----------------------------------------------------------
function _onLoadedAll(){
   MoJS.initialize();
   window.isLoaded = false;
   // 输出调试信息
   //RConsole.find(FLoggerConsole).connect();
   // 创建一个工作空间
   var form = RControl.fromXml(xForm, id_form);
   // 根据模式确定初始操作
   form.dsMode(EMode.Insert);
}
//----------------------------------------------------------
function _onload(){
   RWindow.connect(window);
   RWindow.setEnable(false, true);
   RLoader.loadJs('mobj', 'workspace');
   RLoader.waitJs(new TInvoke(null, _onLoadedAll), 'mobj', 'workspace');
}
</SCRIPT>
<!-- ToolBar ---------------------------------------------->
<XML id='xForm'>
<WebForm name="module.project.progress.task.DevelopProcessForm" label="开发任务" disp_access="FSVOIUDT" disp_fetch="Y" dataset="develop.progress.process" edit_access="FSOPICUDET">
   <Browser label_width="80" name="attachment" label="附件" disp_access="SVIUDTY" width="600" height="200" data_name="ATTACHMENT" data_prepare="SY_ATTACHMENT_DI.Get_Files_Pack('DEVELOP.PROGRESS.PROCESS','A01')" />
</WebForm>
</XML>
<!-- Body - begin ----------------------------------------->
<BODY onload="_onload()" class="Frame_Workspace" style="Frame_Workspace">
<!-- Form begin ------------------------------------------->
<FORM method='POST' name="fmMain">
<!-- Hidden begin ----------------------------------------->
<INPUT type="hidden" name="page_action" style="comEdit">
<INPUT type="hidden" name="form_name" style="comEdit">
<INPUT type="hidden" name="form_action" style="comEdit">
<INPUT type="hidden" name="form_search" style="comEdit">
<INPUT type="hidden" name="form_order" style="comEdit">
<INPUT type="hidden" name="form_pack" style="comEdit">
<INPUT type="hidden" name="form_value" style="comEdit">
<!-- Hidden end ------------------------------------------->
<TABLE border='0' cellpadding='0' cellspacing='0' width='100%' height='100%'>
<!-- Form ------------------------------------------------->
<TR><TD id='id_form' valign='top' style='padding:8;'></TD></TR>
</TABLE>
</FORM>
</BODY>
<!-- Body end --------------------------------------------->

</HTML>
