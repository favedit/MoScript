//==========================================================
// <T>私有资源菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsPrivateResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName      = 'resource.private.resource.MenuBar';
   //..........................................................
   // @attribute
   o._controlRefresh = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsPrivateResourceMenuBar_onBuilded;
   // @event
   o.onRefreshClick  = FDsPrivateResourceMenuBar_onRefreshClick;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsPrivateResourceMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlRefresh.addClickListener(o, o.onRefreshClick);
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsPrivateResourceMenuBar_onRefreshClick(event){
}
