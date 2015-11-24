//==========================================================
// <T>号令动态。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitNoticeDynamic = function FEaiCockpitNoticeDynamic(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'notice.dynamic';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitNoticeDynamic_construct;
   // @method
   o.setup      = MO.FEaiCockpitNoticeDynamic_setup;
   // @method
   o.process    = MO.FEaiCockpitNoticeDynamic_process;
   // @method
   o.dispose    = MO.FEaiCockpitNoticeDynamic_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamic_construct = function FEaiCockpitNoticeDynamic_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamic_setup = function FEaiCockpitNoticeDynamic_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitNoticeDynamicSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitNoticeDynamicView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitNoticeDynamic_process = function FEaiCockpitNoticeDynamic_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamic_dispose = function FEaiCockpitNoticeDynamic_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
