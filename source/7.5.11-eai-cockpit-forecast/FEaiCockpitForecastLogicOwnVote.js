//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogicOwnVote = function FEaiCockpitForecastLogicOwnVote(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.logic.002';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecastLogicOwnVote_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecastLogicOwnVote_setup;
   // @method
   o.process     = MO.FEaiCockpitForecastLogicOwnVote_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecastLogicOwnVote_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVote_construct = function FEaiCockpitForecastLogicOwnVote_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVote_setup = function FEaiCockpitForecastLogicOwnVote_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastLogicOwnVoteSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastLogicOwnVoteView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastLogicOwnVote_process = function FEaiCockpitForecastLogicOwnVote_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVote_dispose = function FEaiCockpitForecastLogicOwnVote_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
