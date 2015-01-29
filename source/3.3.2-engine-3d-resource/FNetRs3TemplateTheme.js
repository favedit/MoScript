//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FNetRs3TemplateTheme(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._materials   = null;
   //..........................................................
   // @method
   o.findMaterial = FNetRs3TemplateTheme_findMaterial;
   o.materials    = FNetRs3TemplateTheme_materials;
   // @method
   o.unserialize  = FNetRs3TemplateTheme_unserialize;
   return o;
}

//==========================================================
// <T>根据唯一编号获得材质。</T>
//
// @method
// @return FNetRs3TemplateMaterial 材质
//==========================================================
function FNetRs3TemplateTheme_findMaterial(p){
   return this._materials.get(p);
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TDictionary 材质集合
//==========================================================
function FNetRs3TemplateTheme_materials(){
   return this._materials;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FNetRs3TemplateTheme_unserialize(p){
   var o = this;
   // 读取材质集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FNetRs3TemplateMaterial);
         m.unserialize(p);
         s.set(m.groupGuid(), m);
      }
   }
}
