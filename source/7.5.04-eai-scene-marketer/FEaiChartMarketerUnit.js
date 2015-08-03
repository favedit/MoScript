//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150803
//==========================================================
MO.FEaiChartMarketerUnit = function FEaiChartMarketerUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._recordDate           = MO.Class.register(o, new MO.AGetter('_recordDate'));
   o._departmentLabel      = MO.Class.register(o, new MO.AGetter('_departmentLabel'));
   o._marketerLabel        = MO.Class.register(o, new MO.AGetter('_marketerLabel'));
   o._customerLabel        = MO.Class.register(o, new MO.AGetter('_customerLabel'));
   o._customerCard         = MO.Class.register(o, new MO.AGetter('_customerCard'));
   o._customerPhone        = MO.Class.register(o, new MO.AGetter('_customerPhone'));
   o._customerActionCd     = MO.Class.register(o, new MO.AGetter('_customerActionCd'));
   o._customerActionAmount = MO.Class.register(o, new MO.AGetter('_customerActionAmount'));
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartMarketerUnit_construct;
   // @method
   o.unserialize           = MO.FEaiChartMarketerUnit_unserialize;
   // @method
   o.dispose               = MO.FEaiChartMarketerUnit_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerUnit_construct = function FEaiChartMarketerUnit_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiChartMarketerUnit_unserialize = function FEaiChartMarketerUnit_unserialize(input){
   var o = this;
   o._recordDate = input.readString();
   o._departmentLabel = input.readString();
   o._marketerLabel = input.readString();
   o._customerLabel = input.readString();
   o._customerCard = input.readString();
   o._customerPhone = input.readString();
   o._customerActionCd = input.readUint8();
   o._customerActionAmount = input.readDouble();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerUnit_dispose = function FEaiChartMarketerUnit_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
