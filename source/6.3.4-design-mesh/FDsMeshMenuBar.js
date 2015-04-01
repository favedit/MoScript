//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMeshMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName            = 'design3d.mesh.MenuBar';
   //..........................................................
   // @attribute
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsMeshMenuBar_onBuilded;
   // @event
   o.onSaveClick           = FDsMeshMenuBar_onSaveClick;
   o.onCaptureClick        = FDsMeshMenuBar_onCaptureClick;
   //..........................................................
   // @method
   o.construct             = FDsMeshMenuBar_construct;
   // @method
   o.dispose               = FDsMeshMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMeshMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlCaptureButton.addClickListener(o, o.onCaptureClick);
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMeshMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   // 存储配置
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   // 更新处理
   RConsole.find(FE3sMeshConsole).update(xconfig);
}

//==========================================================
// <T>捕捉图像处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMeshMenuBar_onCaptureClick(p){
   var o = this;
   var canvas = o._workspace._canvas;
   canvas.capture();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMeshMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMeshMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
