//==========================================================
// <T>资源渲染。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
function FE3sRenderable(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._matrix     = null;
   //..........................................................
   // @method
   o.construct   = FE3sRenderable_construct;
   // @method
   o.matrix      = FE3sRenderable_matrix;
   // @method
   o.unserialize = FE3sRenderable_unserialize;
   o.saveConfig  = FE3sRenderable_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sRenderable_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FE3sRenderable_matrix(){
   return this._matrix;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sRenderable_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取父信息
   o._matrix.unserialize(p);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sRenderable_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   o._matrix.saveConfig(p.create('Matrix'));
}
