//==========================================================
// <T>业绩趋势模块。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitTrend = function FEaiCockpitTrend(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'trend';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._slideshow  = false;
   o._dataTicker = null;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitTrend_construct;
   // @method
   o.setup       = MO.FEaiCockpitTrend_setup;
   // @method
   o.process     = MO.FEaiCockpitTrend_process;
   // @method
   o.dispose     = MO.FEaiCockpitTrend_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrend_construct = function FEaiCockpitTrend_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrend_setup = function FEaiCockpitTrend_setup(){
   var o = this;
   o.__base.FEaiCockpitModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitTrendSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitTrendView);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrend_process = function FEaiCockpitTrend_process(){
   var o = this;
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrend_dispose = function FEaiCockpitTrend_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
