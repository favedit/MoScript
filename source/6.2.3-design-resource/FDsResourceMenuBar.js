//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName               = 'design3d.resource.MenuBar';
   //..........................................................
   // @attribute
   o._controlImportMeshButton = null;
   //..........................................................
   // @event
   o.onBuilded                = FDsResourceMenuBar_onBuilded;
   // @event
   o.onImportMeshClick        = FDsResourceMenuBar_onImportMeshClick;
   //..........................................................
   // @method
   o.construct                = FDsResourceMenuBar_construct;
   // @method
   o.dispose                  = FDsResourceMenuBar_dispose;
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
   o._controlImportMeshButton.addClickListener(o, o.onImportMeshClick);
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
   dialog._workspace = o._workspace;
   dialog.showPosition(EUiPosition.Center);
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
