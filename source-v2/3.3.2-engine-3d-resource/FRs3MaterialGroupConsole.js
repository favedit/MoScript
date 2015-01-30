//==========================================================
// <T>资源材质组管理器。</T>
//
// @console
// @author maocy
// @history 150130
//==========================================================
function FRs3MaterialGroupConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._materialGroups = null;
   //..........................................................
   // @method
   o.construct       = FRs3MaterialGroupConsole_construct;
   o.unserialize     = FRs3MaterialGroupConsole_unserialize;
   o.find            = FRs3MaterialGroupConsole_find;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3MaterialGroupConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
}

//==========================================================
// <T>反序列化一个材质组。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FRs3MaterialGroup 材质组
//==========================================================
function FRs3MaterialGroupConsole_unserialize(p){
   var o = this;
   // 创建材质组
   var r = RClass.create(FRs3MaterialGroup);
   r.unserialize(p);
   // 存储材质组
   o._materialGroups.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>根据名称查找材质组。</T>
//
// @param p:name:String 名称
// @return FRs3MaterialGroup 材质组
//==========================================================
function FRs3MaterialGroupConsole_find(p){
   return this._materialGroups.get(p);
}
