//==========================================================
// <T>加载和保存属性的接口。</T>
//
// @face
// @author maocy
// @version 141231
//==========================================================
MO.MProperty = function MProperty(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.propertyAssign = MProperty_propertyAssign;
   o.propertyLoad   = MProperty_propertyLoad;
   o.propertySave   = MProperty_propertySave;
   return o;

   //==========================================================
   // <T>接收另外一个对象的所有属性内容。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   function MProperty_propertyAssign(p){
      var o = this;
      var c = RClass.find(o.constructor);
      var as = c.annotations(EAnnotation.Property);
      for(var n in as){
         var a = as[n];
         if(a.constructor != Function){
            o[a._name] = p[a._name];
         }
      }
   }

   //==========================================================
   // <T>从配置信息中加载属性到对象中。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   function MProperty_propertyLoad(p){
      var o = this;
      var c = RClass.find(o.constructor);
      var as = c.annotations(EAnnotation.Property);
      for(var n in as){
         var a = as[n];
         if(a.constructor != Function){
            if(a._force){
               a.load(o, p);
            }else{
               if(p.contains(a._linker)){
                  a.load(o, p);
               }else if(o[a._name] == null){
                  o[a._name] = a._value;
               }
            }
         }
      }
   }

   //==========================================================
   // <T>存储对象中的属性到配置信息中。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   function MProperty_propertySave(p){
      var o = this;
      var c = RClass.find(o.constructor);
      var as = c.annotations(EAnnotation.Property);
      for(var n in as){
         var a = as[n];
         if(a.constructor != Function){
            a.save(o, p);
         }
      }
   }
}
