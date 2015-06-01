with(MO){
   //==========================================================
   // <T>资源模板。</T>
   //
   // @author maocy
   // @history 150129
   //==========================================================
   MO.FE3sTemplateTheme = function FE3sTemplateTheme(o){
      o = RClass.inherits(this, o, FE3sObject);
      //..........................................................
      // @attribute
      o._materials   = null;
      //..........................................................
      // @method
      o.findMaterial = FE3sTemplateTheme_findMaterial;
      o.materials    = FE3sTemplateTheme_materials;
      // @method
      o.unserialize  = FE3sTemplateTheme_unserialize;
      return o;
   }

   //==========================================================
   // <T>根据唯一编号获得材质。</T>
   //
   // @method
   // @return FE3sTemplateMaterial 材质
   //==========================================================
   MO.FE3sTemplateTheme_findMaterial = function FE3sTemplateTheme_findMaterial(p){
      return this._materials.get(p);
   }

   //==========================================================
   // <T>获得材质集合。</T>
   //
   // @method
   // @return TDictionary 材质集合
   //==========================================================
   MO.FE3sTemplateTheme_materials = function FE3sTemplateTheme_materials(){
      return this._materials;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param p:input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   MO.FE3sTemplateTheme_unserialize = function FE3sTemplateTheme_unserialize(p){
      // 读取父信息
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      // 读取材质集合
      var c = p.readUint16();
      if(c > 0){
         var mc = RConsole.find(FE3sMaterialConsole);
         var s = o._materials = new TDictionary();
         for(var n = 0; n < c; n++){
            var m = mc.unserialize(p);
            s.set(m.groupGuid(), m);
         }
      }
   }
}
