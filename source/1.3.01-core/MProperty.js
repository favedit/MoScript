//==========================================================
// <T>加载和保存属性的接口。</T>
//
// @face
// @author maocy
// @version 141231
//==========================================================
MO.MProperty = function MProperty(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.propertyAssign = MO.MProperty_propertyAssign;
   o.propertyLoad   = MO.MProperty_propertyLoad;
   o.propertySave   = MO.MProperty_propertySave;
   return o;
}

//==========================================================
// <T>接收另外一个对象的所有属性内容。</T>
//
// @method
// @param value:Object 对象
//==========================================================
MO.MProperty_propertyAssign = function MProperty_propertyAssign(value){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         o[annotation._name] = value[annotation._name];
      }
   }
}

//==========================================================
// <T>从配置信息中加载属性到对象中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.MProperty_propertyLoad = function MProperty_propertyLoad(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         if(annotation._force){
            annotation.load(o, xconfig);
         }else{
            if(xconfig.contains(annotation._linker)){
               annotation.load(o, xconfig);
            }else if(o[annotation._name] == null){
               o[annotation._name] = annotation._value;
            }
         }
      }
   }
}

//==========================================================
// <T>存储对象中的属性到配置信息中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.MProperty_propertySave = function MProperty_propertySave(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         annotation.save(o, xconfig);
      }
   }
}
