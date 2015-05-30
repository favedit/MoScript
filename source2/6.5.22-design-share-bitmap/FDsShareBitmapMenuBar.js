//==========================================================
// <T>共享位图菜单。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsShareBitmapMenuBar(o){
   o = RClass.inherits(this, o, FDsBitmapMenuBar);
   //..........................................................
   // @property
   o._frameName  = 'resource.share.bitmap.MenuBar';
   //..........................................................
   // @event
   o.onBuilded   = FDsShareBitmapMenuBar_onBuilded;
   o.onBackClick = FDsShareBitmapMenuBar_onBackClick;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsShareBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
   //..........................................................
   // 注册事件
   o._controlBack.addClickListener(o, o.onBackClick);
}

//==========================================================
// <T>后退按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsShareBitmapMenuBar_onBackClick(event){
   var o = this;
   var workspace = o._frameSet._workspace;
   workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
}
