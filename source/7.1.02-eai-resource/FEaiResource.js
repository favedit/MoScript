//==========================================================
// <T>卡片资源。</T>
//
// @class
// @author maocy
// @history 150706
//==========================================================
MO.FEaiResource = function FEaiResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code       = MO.Class.register(o, new MO.AGetter('_code'));
   //..........................................................
   // @method
   o.unserialize = MO.FEaiResource_unserialize;
   o.processLoad = MO.FEaiResource_processLoad;
   return o;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiResource_unserialize = function FEaiResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiResource_processLoad = function FEaiResource_processLoad(){
   var o = this;
   o._code = input.readUint16();
   o._cityCode = input.readUint16();
}
