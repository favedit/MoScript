//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitTitle = function FEaiCockpitTitle(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'title';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = false;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitTitle_construct;
   // @method
   o.setup      = MO.FEaiCockpitTitle_setup;
   // @method
   o.process    = MO.FEaiCockpitTitle_process;
   // @method
   o.dispose    = MO.FEaiCockpitTitle_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitle_construct = function FEaiCockpitTitle_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitle_setup = function FEaiCockpitTitle_setup(){
   var o = this;
   o.__base.FEaiCockpitModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitTitleSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitTitleView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitTitle_process = function FEaiCockpitTitle_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitle_dispose = function FEaiCockpitTitle_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
