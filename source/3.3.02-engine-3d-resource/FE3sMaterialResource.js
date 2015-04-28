//==========================================================
// <T>材质资源。</T>
//
// @class
// @author maocy
// @history 150428
//==========================================================
function FE3sMaterialResource(o){
   o = RClass.inherits(this, o, FE3sResource);
   //..........................................................
   // @attribute
   o._typeName     = 'Material';
   o._dataCompress = true;
   // @attribute
   o._material     = null;
   //..........................................................
   // @method
   o.material      = FE3sMaterialResource_material;
   // @method
   o.unserialize   = FE3sMaterialResource_unserialize;
   return o;
}

//==========================================================
// <T>获得材质。</T>
//
// @return 材质
//==========================================================
function FE3sMaterialResource_material(){
   return this._material;
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sMaterialResource_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   //..........................................................
   // 读取材质
   o._material = RConsole.find(FE3sMaterialConsole).unserialize(input);
   RLogger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
}
