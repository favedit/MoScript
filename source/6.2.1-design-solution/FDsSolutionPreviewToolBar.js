//==========================================================
// <T>场景画板工具栏。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsSolutionPreviewToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName             = 'design3d.solution.PreviewToolBar';
   //..........................................................
   // @attribute
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   //..........................................................
   // @event
   o.onBuilded              = FDsSolutionPreviewToolBar_onBuilded;
   // @event
   o.onInsertClick          = FDsSolutionPreviewToolBar_onInsertClick;
   o.onUpdateClick          = FDsSolutionPreviewToolBar_onUpdateClick;
   o.onDeleteLoad           = FDsSolutionPreviewToolBar_onDeleteLoad;
   o.onDeleteClick          = FDsSolutionPreviewToolBar_onDeleteClick;
   //..........................................................
   // @method
   o.construct              = FDsSolutionPreviewToolBar_construct;
   // @method
   o.dispose                = FDsSolutionPreviewToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSolutionPreviewToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 按键事件关联
   //o._controlInsertButton.addClickListener(o, o.onInsertClick);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
}

//==========================================================
// <T>新建按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsSolutionPreviewToolBar_onInsertClick(event){
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsSolutionPreviewToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsSolutionPreviewToolBar_onDeleteLoad(event){
   var o = this;
   var frame = o._workspace._searchContent;
   frame.serviceResearch();
   RWindow.enable();
}

//==========================================================
// <T>删除按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsSolutionPreviewToolBar_onDeleteClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   RWindow.disable();
   // 发送数据请求
   var connection = RConsole.find(FDrProjectConsole).doDelete(guid);
   connection.addLoadListener(o, o.onDeleteLoad);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSolutionPreviewToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSolutionPreviewToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
