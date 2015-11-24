//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitNoticeNewest = function FEaiCockpitNoticeNewest(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'notice.newest';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitNoticeNewest_construct;
   // @method
   o.setup      = MO.FEaiCockpitNoticeNewest_setup;
   // @method
   o.process    = MO.FEaiCockpitNoticeNewest_process;
   // @method
   o.dispose    = MO.FEaiCockpitNoticeNewest_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewest_construct = function FEaiCockpitNoticeNewest_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewest_setup = function FEaiCockpitNoticeNewest_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitNoticeNewestSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitNoticeNewestView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitNoticeNewest_process = function FEaiCockpitNoticeNewest_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewest_dispose = function FEaiCockpitNoticeNewest_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
