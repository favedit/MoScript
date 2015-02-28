//==========================================================
// <T>资源主题对象。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3Theme(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._materials  = null;
   //..........................................................
   // @method
   o.materials   = FRs3Theme_materials;
   o.find        = FRs3Theme_find;
   o.unserialize = FRs3Theme_unserialize;
   return o;
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TDictionary 材质集合
//==========================================================
function FRs3Theme_materials(){
   return this._materials;
}

//==========================================================
// <T>获得指定名称的材质。</T>
//
// @method
// @param p:name:String 名称
// @return FRsMaterial 资源材质
//==========================================================
function FRs3Theme_find(p){
   var ms = this._materials;
   return ms ? ms.get(p) : null;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Theme_unserialize(p){
   var o = this;
   var c = p.readInt32();
   if(c > 0){
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FRs3Material);
         m.unserialize(p);
         s.set(m.code(), m);
      }
   }
}
