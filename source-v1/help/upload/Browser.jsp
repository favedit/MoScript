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
   // 获得初始化数据
   var emode = EMode.Insert;
   var formName = "module.project.progress.task.DevelopProcessForm";
   // 初始化工作空间
   RFormSpace.initialize();
   RFormSpace.hTitlePanel = $('#id_title');
   RFormSpace.hHistoryPanel = $('#id_historybar');
   RFormSpace.hToolPanel = $('#id_toolbar');
   RFormSpace.hFormPanel = $('#id_form');
   // 建立标题栏，历史导航栏，工具栏
   RFormSpace.createTitleBar($('#id_title'), xNavigator);
   RFormSpace.createHistoryBar($('#id_historybar'));
   RFormSpace.createToolBar($('#id_toolbar'), xToolBar);
   // 创建一个工作空间
   var _startForm = new Date().getTime();
   var space = RFormSpace.createSpace();
   var form = space.findForm(formName);
   form.dsValues.unpack('210project_id111');
   // 根据模式确定初始操作
   form.dsMode(emode);
   //form.dsFetch(true);
   space.select(true);
   // 设置工作空间信息
   RFormSpace.titleBar.setCaption(form.label);
   // 设置表单
   RWindow.setCaption(form.label);
}
//----------------------------------------------------------
function _onload(){
   RWindow.connect(window);
   RWindow.setEnable(false, true);
   RLoader.loadJs('mobj', 'workspace');
   RLoader.waitJs(new TInvoke(null, _onLoadedAll), 'mobj', 'workspace');
}
</SCRIPT>

<XML ID="xNavigator">
<TitleBar name='titleBar'/>
</XML>

<!-- ToolBar ---------------------------------------------->
<XML id='xToolBar'>
<ToolBar name="logic.common" label="工具栏" is_valid="Y" width="100%">
   <ToolButton name="fetchButton" label="查询" is_valid="Y" icon="#tbr.fetch" action="RFormSpace.doFetch()" type="fetch" hotkey="F2"/>
   <ToolButton name="searchButton" label="搜索" is_valid="Y" icon="#tbr.search" action="RFormSpace.doSearch()" type="search" hotkey="F3"/>
   <ToolButton name="lovButton" label="选取" is_valid="Y" icon="#tbr.picker" action="RFormSpace.doLov()" type="lov" hotkey="F4"/>
   <ToolButton name="zoomButton" label="放大" is_valid="Y" icon="#tbr.zoom" action="RFormSpace.doZoom()" type="zoom" hotkey="F9"/>
   <ToolButtonSplit name="splitButton1" is_valid="Y"/>
   <ToolButton name="insertButton" label="新建" is_valid="Y" icon="#tbr.insert" action="RFormSpace.doPrepare()" type="insert" hotkey="F5"/>
   <ToolButton name="copyButton" label="复制" is_valid="Y" icon="#tbr.copy" action="RFormSpace.doCopy()" type="copy"/>
   <ToolButton name="updateButton" label="更新" is_valid="Y" icon="#tbr.update" action="RFormSpace.doUpdate()" type="update" hotkey="F8"/>
   <ToolButton name="deleteButton" label="删除" is_valid="Y" icon="#tbr.delete" action="RFormSpace.doDelete()" type="delete" hotkey="F6"/>
   <ToolButtonSplit name="splitButton2" is_valid="Y"/>
   <ToolButton name="firstButton" is_valid="Y" icon="#tbr.ds-first" action="RFormSpace.doMovePage(EDataAction.First)" type="first"/>
   <ToolButton name="priorButton" is_valid="Y" icon="#tbr.ds-prior" action="RFormSpace.doMovePage(EDataAction.Prior)" type="prior"/>
   <ToolButton name="nextButton" is_valid="Y" icon="#tbr.ds-next" action="RFormSpace.doMovePage(EDataAction.Next)" type="next"/>
   <ToolButton name="lastButton" is_valid="Y" icon="#tbr.ds-last" action="RFormSpace.doMovePage(EDataAction.Last)" type="last"/>
   <ToolButtonSplit name="splitButton3" is_valid="Y"/>
   <ToolButton name="actionButton" label="操作" is_valid="Y" icon="#tbr.action" action="RFormSpace.doOperateAction()"/>
</ToolBar></XML>

<BODY onload="_onload()" class="Frame_Workspace" style="Frame_Workspace">
<!-- Form begin ------------------------------------------->
<FORM method='POST' name="fmMain">
<INPUT type='hidden' name='_environment'></INPUT>

<!-- Hidden begin ----------------------------------------->
<INPUT type="hidden" name="page_action" style="comEdit">
<INPUT type="hidden" name="form_name" style="comEdit">
<INPUT type="hidden" name="form_parameters" style="comEdit">
<INPUT type="hidden" name="form_action" style="comEdit">
<INPUT type="hidden" name="form_parent" style="comEdit">
<INPUT type="hidden" name="form_search" style="comEdit">
<INPUT type="hidden" name="form_order" style="comEdit">
<INPUT type="hidden" name="form_pack" style="comEdit">
<INPUT type="hidden" name="form_value" style="comEdit">
<INPUT type="hidden" name="ouid" style="comEdit">
<INPUT type="hidden" name="over" style="comEdit">
<!-- Hidden end ------------------------------------------->
<TABLE id='id_content' border='0' cellpadding='0' cellspacing='0' width='100%' height='100%'>
<!-- Title ------------------------------------------------>
<TR><TD height='1' style='overflow:hidden'>
   <DIV id='id_title' class='Workspace_TitleBar'></DIV>
</TD></TR>
<!-- HistoryBar ------------------------------------------->
<TR><TD height='1'>
   <TABLE border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout:fixed'>
   <TR><TD id='id_historybar' class='Workspace_HistoryBar'></TD></TR>
   </TABLE>
</TD></TR>
<!-- ToolBar ---------------------------------------------->
<TR><TD height='1'>
   <TABLE border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout:fixed'>
   <TR><TD id='id_toolbar' class='Workspace_ToolBar'></TD></TR>
   </TABLE>
</TD></TR>
<!-- Form ------------------------------------------------->
<TR><TD id='id_form' valign='top' style='padding:8;'></TD></TR>
</TABLE>
</FORM>
</BODY>
<!-- Body end --------------------------------------------->

</HTML>
