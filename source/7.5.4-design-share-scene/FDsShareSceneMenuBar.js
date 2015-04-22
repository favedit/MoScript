//==========================================================
// <T>共享场景菜单栏。</T>
//
// @method
// @author maocy
// @history 150422
//==========================================================
function FDsShareSceneMenuBar(o){
   o = RClass.inherits(this, o, FDsSceneMenuBar);
   //..........................................................
   // @property
   o._frameName = 'resource.share.scene.MenuBar';
   //..........................................................
   // @event
   o.onBuilded  = FDsShareSceneMenuBar_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsSceneMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlExecute.addClickListener(o, o.onExecuteClick);
}
