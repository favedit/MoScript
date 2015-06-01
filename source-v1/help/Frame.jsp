<%@ page contentType='text/html;charset=utf-8' %>
<%@ include file='/apl/public.inc' %>
<je:css/>
<je:js type='runtime'/>
<SCRIPT>
var tree = null;
// ---------------------------------------------------------
function onNodeClick(sender, node){
    // 设置基本数据
	fmMain.target = 'frmSpace';
   // 目录页面类型
   var redirect = node.get('redirect')
   if(redirect){
      fmMain.action = top.RContext.context('/ajs/help' + redirect);
      fmMain.submit();
   }
}
//----------------------------------------------------------
function _onLoadedAll(){
   MoJS.initialize();
   // 建立分割器
   var lp = RClass.create(FLgSpliter);
   lp.dragBackgroundColor = '#78AAAA';
   lp.link(id_split, id_left);
   lp.build();
   // 建立树目录
   tree = RControl.fromXml(xTree, $('#id_tree'));
   tree.lsnsClick.push(new TListener(tree, onNodeClick));
   tree.extendAll();
   // 创建主菜单
   RWindow.setEnable(true);
}
//----------------------------------------------------------
function _onload(){
   RWindow.connect(window);
   RWindow.setEnable(false, true);
   RLoader.loadJs('mobj', 'logic');
   RLoader.waitJs(new TInvoke(null, _onLoadedAll), 'mobj', 'logic');
}
</SCRIPT>
<XML id='xTree'>
<TreeView name="enterprise.develop.project.module" label="MoJS - Help" is_config="Y" disp_checked="N">
   <TreeNodeType name="folderType" label="目录类型" type="component" type_name="folder" icon="#company.common.folder" action="list" order_type="ASC"/>
   <TreeNodeType name="formType" label="表单类型" type="collection" type_name="form" icon="#company.common.form" order_type="ASC"/>
   <TreeNodeType name="tableType" label="表格类型" type="component" type_name="table" icon="#company.common.table" order_type="ASC"/>
   <TreeNodeType name="frameTreeType" label="目录设置类型" type="component" type_name="frameTree" icon="#company.common.frameTree" order_type="ASC"/>
   <TreeNode label="运行库" type="folder" is_config="N" checked="N">
      <TreeNode label="项目类型列表" type="table" is_config="Y" checked="N" form="logic.develop.project.TypeList"/>
   </TreeNode>
   <TreeNode label="画面控件" type="folder" is_config="N" checked="N">
      <TreeNode label="表单" type="folder" is_config="N" checked="N">
         <TreeNode name="projectSystemList" label="文件浏览" type="table" is_config="Y" redirect="/Form.FileBrowser/Browser-001.wp"/>
      </TreeNode>
      <TreeNode label="表格" type="folder" is_config="N" checked="N">
         <TreeNode label="系统列表" type="table" is_config="Y" checked="N" form="logic.develop.describe.system.SystemList"/>
         <TreeNode label="系统目录设置" type="frameTree" is_config="Y" checked="N" redirect="/ent/dev/project/SystemTree.wa"/>
      </TreeNode>
      <TreeNode label="控件" type="folder" is_config="N" checked="N">
         <TreeNode label="工具栏" type="table" is_config="Y" checked="N" form="logic.develop.describe.system.SystemList"/>
         <TreeNode label="树目录" type="frameTree" is_config="Y" checked="N" redirect="/ent/dev/project/SystemTree.wa"/>
      </TreeNode>
      <TreeNode label="窗口" type="folder" is_config="N" checked="N">
         <TreeNode name="projectSystemList" label="系统列表" type="table" is_config="Y" checked="N" form="logic.develop.describe.system.SystemList"/>
         <TreeNode name="projectSystemTree" label="系统目录设置" type="frameTree" is_config="Y" checked="N" redirect="/ent/dev/project/SystemTree.wa"/>
      </TreeNode>
   </TreeNode>
   <TreeNode label="工作区" type="folder" is_config="N" checked="N">
      <TreeNode label="表单工作区" type="folder" is_config="N" checked="N">
         <TreeNode label="表单新建" type="table" is_config="Y" checked="N" form="logic.develop.describe.system.SystemList"/>
         <TreeNode label="表单更新" type="frameTree" is_config="Y" checked="N" redirect="/ent/dev/project/SystemTree.wa"/>
      </TreeNode>
      <TreeNode label="页面工作区" type="folder" is_config="N" checked="N">
         <TreeNode label="页面列表" type="table" is_config="Y" checked="N" redirect="/space.frame/FrameSpace-001.wp"/>
      </TreeNode>
   </TreeNode>
</TreeView>
</XML>
<!--------------------------------------------------------->
<BODY onload='_onload()' disabled style='margin:0' scroll='no'>
<jh:form name='fmMain'>
<INPUT type="hidden" name="form_name" style="comEdit">
<INPUT type="hidden" name="form_value" style="comEdit">
<!-- Workspace - Begin ------------------------------------>
<TABLE id='id_workspace' width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' bgcolor='#A5EAEA'>
<TR>
   <TD id='id_left' width='200' valign='top' bgcolor='#FFFFFF'>
      <DIV id='id_tree' style='width:100%; height:100%; overflow:auto'><DIV>
   </TD>
<TD width='3' id='id_split'></TD>
   <TD>
      <IFRAME name='frmSpace' width='100%' height='100%' frameborder='0' src=''></IFRAME>
   </TD>
</TR>
</TABLE>
<!-- Workspace - End -------------------------------------->
<!-- Background - end ------------------------------------->
</jh:form>
</BODY>
</HTML>
