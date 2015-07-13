//==========================================================
// <T>资源绘制对象。</T>
//
// @class
// @author maocy
// @history 150415
//==========================================================
MO.FE3sDrawable = function FE3sDrawable(o){
   o = MO.Class.inherits(this, o, MO.FE3sComponent);
   //..........................................................
   // @attribute
   o._matrix     = MO.Class.register(o, new MO.AGetter('_matrix'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sDrawable_construct;
   // @method
   o.matrix      = MO.FE3sDrawable_matrix;
   // @method
   o.unserialize = MO.FE3sDrawable_unserialize;
   o.saveConfig  = MO.FE3sDrawable_saveConfig;
   o.clone       = MO.FE3sDrawable_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sDrawable_construct = function FE3sDrawable_construct(){
   var o = this;
   o.__base.FE3sComponent.construct.call(o);
   // 设置属性
   o._matrix = new MO.SMatrix3d();
}

//==========================================================
// <T>从输入流里反序列化数据内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sDrawable_unserialize = function FE3sDrawable_unserialize(input){
   var o = this;
   o.__base.FE3sComponent.unserialize.call(o, input);
   // 读取属性
   o._matrix.unserialize(input);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sDrawable_saveConfig = function FE3sDrawable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sComponent.saveConfig.call(o, xconfig);
   // 存储属性
   o._matrix.saveConfig(xconfig.create('Matrix'));
}

//==========================================================
// <T>克隆资源对象。</T>
//
// @method
// @param instance:FE3sObject 实例对象
// @return FE3sObject 资源对象
//==========================================================
MO.FE3sDrawable_clone = function FE3sDrawable_clone(instance){
   var o = this;
   var result = o.__base.FE3sComponent.clone.call(o, instance);
   result._matrix.assign(o._matrix);
   return result;
}
