//==========================================================
// <T>城市资源。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiDepartmentResource = function FEaiDepartmentResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code      = MO.Class.register(o, new MO.AGetter('_code'));
   o._label     = MO.Class.register(o, new MO.AGetter('_label'));
   o._fullLabel = MO.Class.register(o, new MO.AGetter('_fullLabel'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiDepartmentResource_construct;
   // @method
   o.unserialize    = MO.FEaiDepartmentResource_unserialize;
   // @method
   o.dispose        = MO.FEaiDepartmentResource_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiDepartmentResource_construct = function FEaiDepartmentResource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiDepartmentResource_unserialize = function FEaiDepartmentResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   o._label = input.readString();
   o._fullLabel = input.readString();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiDepartmentResource_dispose = function FEaiDepartmentResource_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
