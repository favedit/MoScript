//==========================================================
// <T>材质资源。</T>
//
// @class
// @author maocy
// @history 150428
//==========================================================
MO.FE3sMaterialResource = function FE3sMaterialResource(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   //..........................................................
   // @attribute
   o._typeName     = 'Material';
   o._dataCompress = true;
   // @attribute
   o._material     = MO.Class.register(o, new MO.AGetter('_material'));
   //..........................................................
   // @method
   o.unserialize   = MO.FE3sMaterialResource_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sMaterialResource_unserialize = function FE3sMaterialResource_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   //..........................................................
   // 读取材质
   o._material = MO.Console.find(MO.FE3sMaterialConsole).unserialize(input);
   MO.Logger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
}
