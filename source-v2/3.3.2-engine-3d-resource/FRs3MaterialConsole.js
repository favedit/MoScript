//==========================================================
// <T>资源材质管理器。</T>
//
// @console
// @author maocy
// @history 150130
//==========================================================
function FRs3MaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._materialGroups  = null;
   o._materials       = null;
   //..........................................................
   // @method
   o.construct        = FRs3MaterialConsole_construct;
   // @method
   o.findGroup        = FRs3MaterialConsole_findGroup;
   o.find             = FRs3MaterialConsole_find;
   // @method
   o.unserializeGroup = FRs3MaterialConsole_unserializeGroup;
   o.unserialize      = FRs3MaterialConsole_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3MaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
   o._materials = new TDictionary();
}

//==========================================================
// <T>根据名称查找材质组。</T>
//
// @param p:name:String 名称
// @return FRs3MaterialGroup 材质组
//==========================================================
function FRs3MaterialConsole_findGroup(p){
   return this._materialGroups.get(p);
}

//==========================================================
// <T>根据名称查找材质。</T>
//
// @param p:name:String 名称
// @return FRs3Material 材质
//==========================================================
function FRs3MaterialConsole_find(p){
   return this._materials.get(p);
}

//==========================================================
// <T>反序列化一个材质组。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FRs3MaterialGroup 材质组
//==========================================================
function FRs3MaterialConsole_unserializeGroup(p){
   var o = this;
   // 创建材质组
   var r = RClass.create(FRs3MaterialGroup);
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
// @return FRs3Material 材质
//==========================================================
function FRs3MaterialConsole_unserialize(p){
   var o = this;
   // 创建材质组
   var r = RClass.create(FRs3Material);
   r.unserialize(p);
   // 存储材质组
   o._materials.set(r.guid(), r);
   return r;
}
