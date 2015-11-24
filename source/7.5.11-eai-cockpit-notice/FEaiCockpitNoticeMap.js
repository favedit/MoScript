//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitNoticeMap = function FEaiCockpitNoticeMap(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'notice.map';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitNoticeMap_construct;
   // @method
   o.setup      = MO.FEaiCockpitNoticeMap_setup;
   // @method
   o.process    = MO.FEaiCockpitNoticeMap_process;
   // @method
   o.dispose    = MO.FEaiCockpitNoticeMap_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMap_construct = function FEaiCockpitNoticeMap_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMap_setup = function FEaiCockpitNoticeMap_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitNoticeMapSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitNoticeMapView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitNoticeMap_process = function FEaiCockpitNoticeMap_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMap_dispose = function FEaiCockpitNoticeMap_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
