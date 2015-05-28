//==========================================================
// <T>可加载和保存属性的接口。</T>
//
// @face
// @author maocy
// @version 141231
//==========================================================
function MConfig(o){
   o = RClass.inherits(this, o);
   // @method
   o.loadConfig = RMethod.virtual(o, 'loadConfig');
   o.saveConfig = RMethod.virtual(o, 'saveConfig');
   return o;
}

//==========================================================
// <T>将数据对象的属性，加载到当前对象中。</T>
//
// @method
// @param v:config:TNode 配置节点
//==========================================================
function MConfig_loadConfig(v){
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
// <T>将当前对象的属性，存储到数据对象中。</T>
//
// @method
// @param v:config:TNode 配置节点
//==========================================================
function MConfig_saveConfig(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var ps = c.annotations(EAnnotation.Property);
   for(var n in ps){
      ps[n].save(o, v);
   }
}
