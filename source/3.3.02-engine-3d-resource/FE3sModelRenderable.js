//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150415
//==========================================================
MO.FE3sModelRenderable = function FE3sModelRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sRenderable);
   //..........................................................
   // @attribute
   o._meshGuid   = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._mesh       = MO.Class.register(o, new MO.AGetSet('_mesh'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sModelRenderable_construct;
   // @method
   o.unserialize = MO.FE3sModelRenderable_unserialize;
   o.saveConfig  = MO.FE3sModelRenderable_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sModelRenderable_construct = function FE3sModelRenderable_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sModelRenderable_unserialize = function FE3sModelRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   // 读取属性
   o._meshGuid = input.readString();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sModelRenderable_saveConfig = function FE3sModelRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sRenderable.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('mesh_guid', o._meshGuid);
}
