//==========================================================
// <T>共享模版菜单。</T>
//
// @class
// @author maocy
// @history 150416
//==========================================================
function FDsShareTemplateMenuBar(o){
   o = RClass.inherits(this, o, FDsTemplateMenuBar);
   //..........................................................
   // @property
   o._frameName = 'resource.share.template.MenuBar';
   //..........................................................
   // @event
   o.onBuilded  = FDsShareTemplateMenuBar_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareTemplateMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsTemplateMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
}
