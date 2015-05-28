//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsProjectTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   //..........................................................
   // @property
   o._frameName             = 'design3d.project.TabBar';
   //..........................................................
   // @attribute
   o._resourceTypeCd        = 'mesh';
   // @attribute
   o._controlProjectButton  = null;
   o._controlResourceButton = null;
   //o._controlPictureButton = null;
   //o._controlMeshButton    = null;
   //..........................................................
   // @event
   o.onBuilded              = FDsProjectTabBar_onBuilded;
   // @event
   o.onButtonClick          = FDsProjectTabBar_onButtonClick;
   //..........................................................
   // @method
   o.construct              = FDsProjectTabBar_construct;
   // @method
   o.dispose                = FDsProjectTabBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsProjectTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlProjectButton.addClickListener(o, o.onButtonClick);
   o._controlResourceButton.addClickListener(o, o.onButtonClick);
   //o._controlPictureButton.addClickListener(o, o.onButtonClick);
   //o._controlMeshButton.addClickListener(o, o.onButtonClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsProjectTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'project'){
      o._workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   }else if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.ResourceFrameSet);
   //}else if(name == 'picture'){
   //   o._workspace.selectFrameSet(EDsFrameSet.PictureFrameSet);
   //}else if(name == 'mesh'){
   //   o._workspace.selectFrameSet(EDsFrameSet.MeshFrameSet);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsProjectTabBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiTabBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsProjectTabBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiTabBar.dispose.call(o);
}
