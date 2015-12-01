//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectLogic003 = function FEaiCockpitProjectLogic003(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Project.logic.003';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitProjectLogic003_construct;
   // @method
   o.setup       = MO.FEaiCockpitProjectLogic003_setup;
   // @method
   o.process     = MO.FEaiCockpitProjectLogic003_process;
   // @method
   o.dispose     = MO.FEaiCockpitProjectLogic003_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic003_construct = function FEaiCockpitProjectLogic003_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic003_setup = function FEaiCockpitProjectLogic003_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitProjectLogic003Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitProjectLogic003View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitProjectLogic003_process = function FEaiCockpitProjectLogic003_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic003_dispose = function FEaiCockpitProjectLogic003_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
