//==========================================================
// <T>变换对象。</T>
//
// @class
// @author maocy
// @version 150626
//==========================================================
MO.FGuiTransform = function FGuiTransform(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._finish   = false;
   //..........................................................
   // @method
   o.construct = MO.FGuiTransform_construct;
   // @method
   o.isFinish  = MO.FGuiTransform_isFinish;
   // @method
   o.start     = MO.FGuiTransform_start;
   o.process   = MO.FGuiTransform_process;
   // @method
   o.dispose   = MO.FGuiTransform_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiTransform_construct = function FGuiTransform_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>判断是否完成。</T>
//
// @method
// @return 是否完成
//==========================================================
MO.FGuiTransform_isFinish = function FGuiTransform_isFinish(){
   return this._finish;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
//==========================================================
MO.FGuiTransform_start = function FGuiTransform_start(){
   var o = this;
   o._finish = false;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiTransform_process = function FGuiTransform_process(){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiTransform_dispose = function FGuiTransform_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
