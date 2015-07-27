//==========================================================
// <T>卡片资源。</T>
//
// @class
// @author maocy
// @history 150706
//==========================================================
MO.FEaiResourcePackage = function FEaiResourcePackage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code       = MO.Class.register(o, new MO.AGetter('_code'));
   //..........................................................
   // @method
   o.unserialize = MO.FEaiResourcePackage_unserialize;
   o.processLoad = MO.FEaiResourcePackage_processLoad;
   return o;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiResourcePackage_unserialize = function FEaiResourcePackage_unserialize(input){
   var o = this;
   o._code = input.readUint16();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiResourcePackage_processLoad = function FEaiResourcePackage_processLoad(){
   var o = this;
   o._code = input.readUint16();
   o._cityCode = input.readUint16();
}
