//==========================================================
// <T>资源提供商管理器。</T>
//
// @class
// @author maocy
// @history 15031
//==========================================================
function FE3sResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._factory            = null;
   //..........................................................
   // @method
   o.construct           = FE3sResourceConsole_construct;
   // @method
   o.factory             = FE3sResourceConsole_factory;
   o.create              = FE3sResourceConsole_create;
   o.unserializeResource = FE3sResourceConsole_unserializeResource;
   o.unserialize         = FE3sResourceConsole_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   var factory = o._factory = RClass.create(FClassFactory);
   factory.register('ModelMesh', FE3sModelMesh);
   factory.register('ModelRenderable', FE3sModelRenderable);
}

//==========================================================
// <T>创建一个资源对象。</T>
//
// @param typeName:String 类型名称
// @return 资源对象
//==========================================================
function FE3sResourceConsole_factory(){
   return this._factory;
}

//==========================================================
// <T>创建一个资源对象。</T>
//
// @param typeName:String 类型名称
// @return 资源对象
//==========================================================
function FE3sResourceConsole_create(typeName){
   return this._factory.create(typeName);
}

//==========================================================
// <T>反序列化一个资源。</T>
//
// @param input:FByteStream 数据流
// @return 资源
//==========================================================
function FE3sResourceConsole_unserializeResource(resource, input){
   var o = this;
   resource.unserialize(input);
}

//==========================================================
// <T>反序列化一个资源。</T>
//
// @param input:FByteStream 数据流
// @return 资源
//==========================================================
function FE3sResourceConsole_unserialize(input){
   var o = this;
   var typeName = input.testString();
   var resource = o._factory.create(typeName);
   resource.unserialize(input);
   return resource;
}
