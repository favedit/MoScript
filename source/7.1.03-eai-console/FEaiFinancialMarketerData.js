//==========================================================
// <T>财富数据。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiFinancialData = function FEaiFinancialData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._provinceCode  = MO.Class.register(o, new MO.AGetter('_provinceCode'));
   o._code          = MO.Class.register(o, new MO.AGetter('_code'));
   o._label         = MO.Class.register(o, new MO.AGetter('_label'));
   o._level         = MO.Class.register(o, new MO.AGetter('_level'));
   o._location      = MO.Class.register(o, new MO.AGetter('_location'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiFinancialData_construct;
   // @method
   o.unserialize    = MO.FEaiFinancialData_unserialize;
   // @method
   o.dispose        = MO.FEaiFinancialData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiFinancialData_construct = function FEaiFinancialData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._location = new MO.SPoint3();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiFinancialData_unserialize = function FEaiFinancialData_unserialize(input){
   var o = this;
   o._provinceCode = input.readUint16();
   o._code = input.readUint16();
   o._label = input.readString();
   o._level = input.readUint16();
   o._location.unserialize2(input);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiFinancialData_dispose = function FEaiFinancialData_dispose(){
   var o = this;
   // 清空属性
   o._location = RObject.dispose(o._location);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
