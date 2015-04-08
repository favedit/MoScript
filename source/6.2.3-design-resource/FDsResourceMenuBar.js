//==========================================================
// <T>资源菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName                  = 'design3d.resource.MenuBar';
   //..........................................................
   // @attribute
   o._controlImportPictureButton = null;
   o._controlImportMeshButton    = null;
   o._controlDeleteButton        = null;
   //..........................................................
   // @event
   o.onBuilded                   = FDsResourceMenuBar_onBuilded;
   // @event
   o.onImportPictureClick        = FDsResourceMenuBar_onImportPictureClick;
   o.onImportMeshClick           = FDsResourceMenuBar_onImportMeshClick;
   o.onDeleteLoad                = FDsResourceMenuBar_onDeleteLoad;
   o.onDeleteClick               = FDsResourceMenuBar_onDeleteClick;
   //..........................................................
   // @method
   o.construct                   = FDsResourceMenuBar_construct;
   // @method
   o.dispose                     = FDsResourceMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   //o._controlImportPictureButton.addClickListener(o, o.onImportPictureClick);
   o._controlImportMeshButton.addClickListener(o, o.onImportMeshClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceMenuBar_onImportPictureClick(p){
   alert('功能未实现。');
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceMenuBar_onImportMeshClick(p){
   var o = this;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourceMenuBar_onDeleteLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   RWindow.enable();
}

//==========================================================
// <T>删除按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourceMenuBar_onDeleteClick(event){
   var o = this;
   var item = o._frameSet._listContent._activeItem;
   if(!item){
      return alert('请选中后再点击删除');
   }
   var typeCd = item._typeCd;
   var guid = item._guid;
   RWindow.disable();
   // 发送数据请求
   var connection = RConsole.find(FDrResourceConsole).doDelete(typeCd, guid);
   connection.addLoadListener(o, o.onDeleteLoad);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
