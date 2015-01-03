//==========================================================
// <T>加载和保存属性的接口。</T>
//
// @face
// @author maocy
// @version 141231
//==========================================================
function MProperty(o){
   o = RClass.inherits(this, o);
   // @method
   o.propertyAssign = MProperty_propertyAssign;
   o.propertyLoad   = MProperty_propertyLoad;
   o.propertySave   = MProperty_propertySave;
   return o;
}

//==========================================================
// <T>接收另外一个对象的所有属性内容。</T>
//
// @method
// @param v:value:Object 对象
//==========================================================
function MProperty_propertyAssign(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var ps = c.annotations(EAnnotation.Property);
   for(var n in ps){
      var p = ps[n];
      o[p.name] = c[p.name];
   }
}

//==========================================================
// <T>从配置信息中加载属性到对象中。</T>
//
// @method
// @param v:config:TNode 配置节点
//==========================================================
function MProperty_propertyLoad(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var ps = c.annotations(EAnnotation.Property);
   for(var n in ps){
      var p = ps[n];
      if(p.force){
         p.load(o, v);
      }else{
         if(v.contains(p.config)){
            p.load(o, v);
         }else if(o[p.name] == null){
            o[p.name] = p.value;
         }
      }
   }
}

//==========================================================
// <T>存储对象中的属性到配置信息中。</T>
//
// @method
// @param v:config:TNode 配置节点
//==========================================================
function MProperty_propertySave(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var ps = c.annotations(EAnnotation.Property);
   for(var n in ps){
      ps[n].save(o, v);
   }
}
