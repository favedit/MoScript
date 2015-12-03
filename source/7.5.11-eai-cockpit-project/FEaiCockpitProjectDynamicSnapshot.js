//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectDynamicSnapshot = function FEaiCockpitProjectDynamicSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   o._backgroundUri = '{eai.resource}/cockpit/project/dynamic.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitProjectDynamicSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitProjectDynamicSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitProjectDynamicSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitProjectDynamicSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitProjectDynamicSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitProjectDynamicSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicSnapshot_onPaintBegin = function FEaiCockpitProjectDynamicSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicSnapshot_onPaintEnd = function FEaiCockpitProjectDynamicSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicSnapshot_construct = function FEaiCockpitProjectDynamicSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(12, 1, 0);
   o._cellSize.set(4, 8);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicSnapshot_setup = function FEaiCockpitProjectDynamicSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicSnapshot_processLogic = function FEaiCockpitProjectDynamicSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicSnapshot_dispose = function FEaiCockpitProjectDynamicSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
