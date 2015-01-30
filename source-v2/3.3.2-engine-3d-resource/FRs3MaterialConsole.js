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
   o._materials  = null;
   //..........................................................
   // @method
   o.construct   = FRs3MaterialConsole_construct;
   o.unserialize = FRs3MaterialConsole_unserialize;
   o.find        = FRs3MaterialConsole_find;
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
   o._materials = new TDictionary();
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

//==========================================================
// <T>根据名称查找材质。</T>
//
// @param p:name:String 名称
// @return FRs3Material 材质
//==========================================================
function FRs3MaterialConsole_find(p){
   return this._materials.get(p);
}
