//==========================================================
// <T>资源主题对象。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sTheme = function FE3sTheme(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   //..........................................................
   // @attribute
   o._materials  = MO.Class.register(o, new MO.AGetter('_materials'));
   //..........................................................
   // @method
   o.find        = MO.FE3sTheme_find;
   o.unserialize = MO.FE3sTheme_unserialize;
   return o;
}

//==========================================================
// <T>获得指定名称的材质。</T>
//
// @method
// @param name:String 名称
// @return FRsMaterial 资源材质
//==========================================================
MO.FE3sTheme_find = function FE3sTheme_find(name){
   var materials = this._materials;
   return materials ? materials.get(name) : null;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sTheme_unserialize = function FE3sTheme_unserialize(input){
   var o = this;
   var count = input.readInt32();
   if(count > 0){
      var materials = o._materials = new MO.TDictionary();
      for(var n = 0; n < c; n++){
         var material = MO.Class.create(FE3sMaterial);
         material.unserialize(input);
         materials.set(material.code(), material);
      }
   }
}
