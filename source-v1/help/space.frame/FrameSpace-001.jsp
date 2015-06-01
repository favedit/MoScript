<%@ page contentType='text/html;charset=utf-8' %>
<%@ include file='/apl/public.inc' %>
<je:css/>
<je:js type='runtime'/>
<SCRIPT src="FFrameBar.js"></SCRIPT>
<SCRIPT src="FFrameSheet.js"></SCRIPT>
<STYLE>
.FCalendarEditor_TimePanel
   {
   filter: progid:DXImageTransform.Microsoft.Gradient(gradienttype=1,startcolorstr=#FFFFFF,endcolorstr=#eae3d5);
   }
</STYLE>
<SCRIPT>
//----------------------------------------------------------
function _onLoadedAll(){
   MoJS.initialize();
   // 建立分割器
   var lp = RClass.create(FLgSpliter);
   lp.dragBackgroundColor = '#78AAAA';
   lp.link(id_split, id_left);
   lp.build();
   // 建立分割器
   var fsb = RControl.fromXml(xFrameBar, id_space_box);
   fsb.selectByIndex(0);
   //fsb.build();
   // 创建主菜单
   RWindow.setEnable(true);
}
//----------------------------------------------------------
function _onload(){
   RWindow.connect(window);
   RWindow.setEnable(false, true);
   RLoader.loadJs('mobj','logic');
   RLoader.waitJs(new TInvoke(null, _onLoadedAll), 'mobj', 'logic');
}
</SCRIPT>
<!--------------------------------------------------------->
<XML ID='xFrameBar'>
<FrameBar>
   <FrameSheet name='n1' label="个人空间1"/>
   <FrameSheet name='n2' label="个人空间2"/>
   <FrameSheet name='n3' label="个人空间3"/>
   <FrameSheet name='n4' label="个人空间4"/>
</FrameBar>
</XML>
<!--------------------------------------------------------->
<BODY onload='_onload()' disabled style='margin:0' scroll='no'>
<jh:form name='fmMain'>
<!-- Workspace - Begin ------------------------------------>

<TABLE width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' style='background:url(space.gif)'>
<TR>
   <TD height='24' bgcolor='#9CAAC1' style='color:#FFFFFF;padding-left:20;'>
      <TABLE width='100%' height='100%' border='0' cellpadding='0' cellspacing='0'>
      <TR>
         <TD style='color:#FFFFFF;padding-left:20;'>
            返回首页 | 添加评论 | 关闭
         </TD>
         <TD align='right' style='color:#FFFFFF;padding-right:20;'>
            <INPUT value='搜索' style='width:200'>
         </TD>
      </TR>
      </TABLE>
   </TD>
</TR>
<TR>
   <TD height='9' style='background:url(drop.png)'></TD>
</TR>
<TR>
   <TD>



<TABLE width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' style='background:url(space.gif)'>
<TR>
<TD id='id_left' width='240' style='padding-top:6;padding-left:6;padding-bottom:6'>
   <TABLE width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' style='table-layout:fixed'>
   <TR>
      <TD height='2'>
         <DIV style='display:block;overflow:hidden;width:100%;border:0;padding:0;height:1px;margin:0 2px;background-color:#32425f;'></DIV>
         <DIV style='display:block;overflow:hidden;width:100%;height:1px;border-left:1 solid #32425f; border-right:1 solid #32425f;margin:0 1px;background-color:#3F5378;'></DIV>
      </TD>
   </TR>
   <TR>
      <TD height='20' style='border-left:1 solid #32425f;border-right:1 solid #32425f;'>
         <TABLE width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' bgcolor='#3F5378'>
         <TR>
            <TD style='color:#FFFFFF' style='padding-left:6'>知识库目录</TD>
         </TR>
         </TABLE>
      </TD>
   </TR>
   <TR>
      <TD height='20' bgcolor='#BCC7D8' style='border-left:1 solid #32425f;border-right:1 solid #32425f;'>
         <DIV id='id_tree'>123</DIV>
      </TD>
   </TR>
   <TR>
      <TD valign='top' bgcolor='#FFFFFF' style='border-left:1 solid #32425f;border-right:1 solid #32425f;'>
         <DIV id='id_tree'>123</DIV>
      </TD>
   </TR>
   <TR>
      <TD height='2'>
         <DIV style='display:block;overflow:hidden;width:100%;height:1px;border-left:1 solid #32425f; border-right:1 solid #32425f;margin:0 1px;background-color:#FFFFFF;'></DIV>
         <DIV style='display:block;overflow:hidden;width:100%;border:0;padding:0;height:1px;margin:0 2px;background-color:#32425f;'></DIV>
      </TD>
   </TR>
   </TABLE>
</TD>
<TD id='id_split' width='4'></TD>
<TD style='padding-top:6;padding-right:6;padding-bottom:6'>
   <TABLE width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' style='table-layout:fixed'>
   <TR>
      <TD height='27' valign='top' style='padding-left:12'>
         <TABLE width='100%' height='100%' border='0' cellpadding='0' cellspacing='0'>
         <TR>
            <TD id='id_space_box'></TD>
            <TD align='right' style='padding-right:8'><IMG src='menu_next.png'></TD>
         </TR>
         </TABLE>
      </TD>
   </TR>
   <TR>
      <TD height='2'>
         <DIV style='display:block;overflow:hidden;width:100%;border:0;padding:0;height:1px;margin:0 2px;background-color:#32425f;'></DIV>
         <DIV style='display:block;overflow:hidden;width:100%;height:1px;border-left:1 solid #32425f; border-right:1 solid #32425f;margin:0 1px;background-color:#FFFFFF;'></DIV>
      </TD>
   </TR>
   <TR>
      <TD valign='top' bgcolor='#FFFFFF' style='border-left:1 solid #32425f;border-right:1 solid #32425f;'>
         <DIV id='id_tree'>123</DIV>
      </TD>
   </TR>
   <TR>
      <TD height='2'>
         <DIV style='display:block;overflow:hidden;width:100%;height:1px;border-left:1 solid #32425f; border-right:1 solid #32425f;margin:0 1px;background-color:#FFFFFF;'></DIV>
         <DIV style='display:block;overflow:hidden;width:100%;border:0;padding:0;height:1px;margin:0 2px;background-color:#32425f;'></DIV>
      </TD>
   </TR>
   </TABLE>
<!-- Workspace - End -------------------------------------->
</TD>
</TR>
</TABLE>
<!-- Background - end ------------------------------------->
</TD>
</TR>
</TABLE>
</jh:form>
</BODY>
</HTML>
