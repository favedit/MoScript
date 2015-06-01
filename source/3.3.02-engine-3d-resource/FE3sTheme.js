with(MO){
   //==========================================================
   // <T>资源主题对象。</T>
   //
   // @author maocy
   // @history 150108
   //==========================================================
   MO.FE3sTheme = function FE3sTheme(o){
      o = RClass.inherits(this, o, FE3sResource);
      //..........................................................
      // @attribute
      o._materials  = null;
      //..........................................................
      // @method
      o.materials   = FE3sTheme_materials;
      o.find        = FE3sTheme_find;
      o.unserialize = FE3sTheme_unserialize;
      return o;
   }

   //==========================================================
   // <T>获得材质集合。</T>
   //
   // @method
   // @return TDictionary 材质集合
   //==========================================================
   MO.FE3sTheme_materials = function FE3sTheme_materials(){
      return this._materials;
   }

   //==========================================================
   // <T>获得指定名称的材质。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FRsMaterial 资源材质
   //==========================================================
   MO.FE3sTheme_find = function FE3sTheme_find(p){
      var ms = this._materials;
      return ms ? ms.get(p) : null;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param p:input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   MO.FE3sTheme_unserialize = function FE3sTheme_unserialize(p){
      var o = this;
      var c = p.readInt32();
      if(c > 0){
         var s = o._materials = new TDictionary();
         for(var n = 0; n < c; n++){
            var m = RClass.create(FE3sMaterial);
            m.unserialize(p);
            s.set(m.code(), m);
         }
      }
   }
}
