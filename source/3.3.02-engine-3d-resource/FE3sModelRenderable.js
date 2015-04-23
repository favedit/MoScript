//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150415
//==========================================================
function FE3sModelRenderable(o){
   o = RClass.inherits(this, o, FE3sRenderable);
   //..........................................................
   // @attribute
   o._meshGuid   = null;
   o._mesh       = null;
   //..........................................................
   // @method
   o.construct   = FE3sModelRenderable_construct;
   // @method
   o.meshGuid    = FE3sModelRenderable_meshGuid;
   o.mesh        = FE3sModelRenderable_mesh;
   o.setMesh     = FE3sModelRenderable_setMesh;
   // @method
   o.unserialize = FE3sModelRenderable_unserialize;
   o.saveConfig  = FE3sModelRenderable_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sModelRenderable_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}

//==========================================================
// <T>获得网格唯一编号。</T>
//
// @method
// @return String 网格唯一编号
//==========================================================
function FE3sModelRenderable_meshGuid(){
   return this._meshGuid;
}

//==========================================================
// <T>获得网格。</T>
//
// @method
// @return FE3sModelMesh 网格
//==========================================================
function FE3sModelRenderable_mesh(){
   return this._mesh;
}

//==========================================================
// <T>设置网格。</T>
//
// @method
// @param mesh:FE3sModelMesh 网格唯一编号
//==========================================================
function FE3sModelRenderable_setMesh(mesh){
   this._mesh = mesh;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sModelRenderable_unserialize(input){
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
function FE3sModelRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sRenderable.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('mesh_guid', o._meshGuid);
}
