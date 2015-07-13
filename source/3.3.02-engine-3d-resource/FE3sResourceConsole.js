//==========================================================
// <T>资源提供商管理器。</T>
//
// @class
// @author maocy
// @history 15031
//==========================================================
MO.FE3sResourceConsole = function FE3sResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._factory            = MO.Class.register(o, new MO.AGetter('_factory'));
   //..........................................................
   // @method
   o.construct           = MO.FE3sResourceConsole_construct;
   // @method
   o.create              = MO.FE3sResourceConsole_create;
   o.unserializeResource = MO.FE3sResourceConsole_unserializeResource;
   o.unserialize         = MO.FE3sResourceConsole_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sResourceConsole_construct = function FE3sResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   var factory = o._factory = MO.Class.create(MO.FClassFactory);
   factory.register('Shape', MO.FE3sShape);
   factory.register('Sprite', MO.FE3sSprite);
   factory.register('ModelMesh', MO.FE3sModelMesh);
   factory.register('ModelRenderable', MO.FE3sModelRenderable);
}

//==========================================================
// <T>创建一个资源对象。</T>
//
// @param typeName:String 类型名称
// @return 资源对象
//==========================================================
MO.FE3sResourceConsole_create = function FE3sResourceConsole_create(typeName){
   return this._factory.create(typeName);
}

//==========================================================
// <T>反序列化一个资源。</T>
//
// @param input:FByteStream 数据流
// @return 资源
//==========================================================
MO.FE3sResourceConsole_unserializeResource = function FE3sResourceConsole_unserializeResource(resource, input){
   var o = this;
   resource.unserialize(input);
}

//==========================================================
// <T>反序列化一个资源。</T>
//
// @param input:FByteStream 数据流
// @return 资源
//==========================================================
MO.FE3sResourceConsole_unserialize = function FE3sResourceConsole_unserialize(input){
   var o = this;
   var typeName = input.testString();
   var resource = o._factory.create(typeName);
   resource.unserialize(input);
   return resource;
}
