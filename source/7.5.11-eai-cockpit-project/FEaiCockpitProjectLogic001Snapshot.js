//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectLogic001Snapshot = function FEaiCockpitProjectLogic001Snapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitProjectLogic001Snapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitProjectLogic001Snapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitProjectLogic001Snapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitProjectLogic001Snapshot_setup;
   o.processLogic   = MO.FEaiCockpitProjectLogic001Snapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitProjectLogic001Snapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001Snapshot_onPaintBegin = function FEaiCockpitProjectLogic001Snapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001Snapshot_onPaintEnd = function FEaiCockpitProjectLogic001Snapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001Snapshot_construct = function FEaiCockpitProjectLogic001Snapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(1, 1, 0);
   o._cellSize.set(6, 4);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001Snapshot_setup = function FEaiCockpitProjectLogic001Snapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001Snapshot_processLogic = function FEaiCockpitProjectLogic001Snapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic001Snapshot_dispose = function FEaiCockpitProjectLogic001Snapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
