//==========================================================
// <T>号令视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeTableView = function FEaiCockpitNoticeTableView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   // o._backgroundImage      = null;
   // o._logoImage            = null;
   // o._topBar               = null;
   // o._userInfoView         = MO.Class.register(o, new MO.AGetter('_userInfo'));
   // o._newOrderImage        = null;
   // o._orderListImage       = null;
   // o._pbarBgImage          = null;
   // o._pbarFillImage        = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._mainLineWidth        = MO.Class.register(o, new MO.AGetSet('_mainLineWidth'), 5);
   
   //..........................................................
   // @event
   o.textFun               = MO.FEaiCockpitNoticeTableView_textFun;
   o.onImageLoad           = MO.FEaiCockpitNoticeTableView_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeTableView_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeTableView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeTableView_setup;
   o.draw                  = MO.FEaiCockpitNoticeTableView_draw;
   o.processLogic          = MO.FEaiCockpitNoticeTableView_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeTableView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableView_onImageLoad = function FEaiCockpitNoticeTableView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableView_onPaintBegin = function FEaiCockpitNoticeTableView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableView_construct = function FEaiCockpitNoticeTableView_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableView_setup = function FEaiCockpitNoticeTableView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableView_processLogic = function FEaiCockpitNoticeTableView_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableView_dispose = function FEaiCockpitNoticeTableView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
