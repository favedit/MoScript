//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
MO.FE3sMeshDisplay = function FE3sMeshDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._matrix     = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   o._renderable = MO.Class.register(o, new MO.AGetter('_renderable'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sMeshDisplay_construct;
   // @method
   o.unserialize = MO.FE3sMeshDisplay_unserialize;
   o.saveConfig  = MO.FE3sMeshDisplay_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sMeshDisplay_construct = function FE3sMeshDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._renderable = MO.Class.create(MO.FE3sRenderable);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sMeshDisplay_unserialize = function FE3sMeshDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._matrix.unserialize(p);
   o._material.unserialize(p);
   o._renderable.unserialize(p);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.FE3sMeshDisplay_saveConfig = function FE3sMeshDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   o._matrix.saveConfig(p.create('Matrix'));
   o._material.saveConfig(p.create('Material'));
   o._renderable.saveConfig(p.create('Renderable'));
}
