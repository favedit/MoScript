//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectDynamic = function FEaiCockpitProjectDynamic(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Project.Dynamic';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitProjectDynamic_construct;
   // @method
   o.setup       = MO.FEaiCockpitProjectDynamic_setup;
   // @method
   o.process     = MO.FEaiCockpitProjectDynamic_process;
   // @method
   o.dispose     = MO.FEaiCockpitProjectDynamic_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamic_construct = function FEaiCockpitProjectDynamic_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamic_setup = function FEaiCockpitProjectDynamic_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitProjectDynamicSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitProjectDynamicView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitProjectDynamic_process = function FEaiCockpitProjectDynamic_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamic_dispose = function FEaiCockpitProjectDynamic_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
