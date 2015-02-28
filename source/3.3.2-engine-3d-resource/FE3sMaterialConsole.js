//==========================================================
// <T>资源材质管理器。</T>
//
// @console
// @author maocy
// @history 150130
//==========================================================
function FE3sMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._materialGroups  = null;
   o._materials       = null;
   //..........................................................
   // @method
   o.construct        = FE3sMaterialConsole_construct;
   // @method
   o.findGroup        = FE3sMaterialConsole_findGroup;
   o.find             = FE3sMaterialConsole_find;
   // @method
   o.unserializeGroup = FE3sMaterialConsole_unserializeGroup;
   o.unserialize      = FE3sMaterialConsole_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
   o._materials = new TDictionary();
}

//==========================================================
// <T>根据名称查找材质组。</T>
//
// @param p:name:String 名称
// @return FE3sMaterialGroup 材质组
//==========================================================
function FE3sMaterialConsole_findGroup(p){
   return this._materialGroups.get(p);
}

//==========================================================
// <T>根据名称查找材质。</T>
//
// @param p:name:String 名称
// @return FE3sMaterial 材质
//==========================================================
function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}

//==========================================================
// <T>反序列化一个材质组。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FE3sMaterialGroup 材质组
//==========================================================
function FE3sMaterialConsole_unserializeGroup(p){
   var o = this;
   // 创建材质组
   var r = RClass.create(FE3sMaterialGroup);
   r.unserialize(p);
   // 存储材质组
   o._materialGroups.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>反序列化一个材质。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FE3sMaterial 材质
//==========================================================
function FE3sMaterialConsole_unserialize(p){
   var o = this;
   // 创建材质组
   var r = RClass.create(FE3sMaterial);
   r.unserialize(p);
   // 存储材质组
   o._materials.set(r.guid(), r);
   return r;
}
