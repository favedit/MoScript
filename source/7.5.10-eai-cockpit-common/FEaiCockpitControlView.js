//==========================================================
// <T>预测视图页面。</T>
//
// @class
// @author maocy
// @history 151122
//==========================================================
MO.FEaiCockpitControlView = function FEaiCockpitControlView(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data            = null;
   o._dataTicker      = null;
   // @attribute
   o._backgroundUri   = MO.Class.register(o, new MO.AGetter('_backgroundUri'));
   o._backgroundImage = null;
   // @attribute
   //o._moduleManager   = MO.Class.register(o, new MO.AGetter('_moduleManager'));
   //..........................................................
   // @event
   o.onPaintBegin     = MO.FEaiCockpitControlView_onPaintBegin;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitControlView_construct;
   // @method
   o.setup            = MO.FEaiCockpitControlView_setup;
   o.processLogic     = MO.FEaiCockpitControlView_processLogic;
   // @method
   o.dispose          = MO.FEaiCockpitControlView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_onPaintBegin = function FEaiCockpitControlView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
   var backgroundImage = o._backgroundImage;
   if(backgroundImage){
      graphic.drawRectangleImage(o._backgroundImage, rectangle);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_construct = function FEaiCockpitControlView_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_setup = function FEaiCockpitControlView_setup(){
   var o = this;
   // 创建图片
   var backgroundUri = o._backgroundUri;
   if(backgroundUri){
      o._backgroundImage = o.loadResourceImage(backgroundUri);
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_processLogic = function FEaiCockpitControlView_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_dispose = function FEaiCockpitControlView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
