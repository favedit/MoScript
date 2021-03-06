//==========================================================
// <T>共享资源菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsShareResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName      = 'resource.share.resource.MenuBar';
   //..........................................................
   // @attribute
   o._controlRefresh = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsShareResourceMenuBar_onBuilded;
   // @event
   o.onRefreshClick  = FDsShareResourceMenuBar_onRefreshClick;
   //..........................................................
   // @method
   o.construct       = FDsShareResourceMenuBar_construct;
   // @method
   o.dispose         = FDsShareResourceMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareResourceMenuBar_onBuilded(p){
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
function FDsShareResourceMenuBar_onRefreshClick(event){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsShareResourceMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsShareResourceMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
