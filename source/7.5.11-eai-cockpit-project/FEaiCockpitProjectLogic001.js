//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectLogic001 = function FEaiCockpitProjectLogic001(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Project.logic.001';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitProjectLogic001_construct;
   // @method
   o.setup       = MO.FEaiCockpitProjectLogic001_setup;
   // @method
   o.process     = MO.FEaiCockpitProjectLogic001_process;
   // @method
   o.dispose     = MO.FEaiCockpitProjectLogic001_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001_construct = function FEaiCockpitProjectLogic001_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001_setup = function FEaiCockpitProjectLogic001_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitProjectLogic001Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitProjectLogic001View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitProjectLogic001_process = function FEaiCockpitProjectLogic001_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001_dispose = function FEaiCockpitProjectLogic001_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
