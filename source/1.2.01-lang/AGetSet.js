with(MO){
   //============================================================
   // <T>属性描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联名称
   // @author maocy
   // @version 141231
   //============================================================
   MO.AGetSet = function AGetSet(name, linker){
      var o = this;
      AAnnotation.call(o, name);
      //..........................................................
      // @declare
      o._inherit      = true;
      o._annotationCd = EAnnotation.Source;
      //..........................................................
      // @attribute
      o._linker       = null;
      o._force        = false;
      //..........................................................
      // @method
      o.code          = AGetSet_code;
      o.build         = AGetSet_build;
      o.load          = AGetSet_load;
      o.save          = AGetSet_save;
      o.toString      = AGetSet_toString;
      //..........................................................
      // @construct
      var code = null;
      if(linker == null){
         if(RString.startsWith(name, '_')){
            code = name.substring(1);
         }else{
            code = name;
         }
         code = RString.toUnderline(code);
      }else{
         code = linker;
      }
      o._linker = code;
      return o;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //============================================================
   MO.AGetSet_code = function AGetSet_code(){
      return this._linker;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param v:value:Object 对象
   //============================================================
   MO.AGetSet_build = function AGetSet_build(){
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.AGetSet_load = function AGetSet_load(v, x){
      v[this._name] = x.get(this._linker);
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.AGetSet_save = function AGetSet_save(v, x){
      x.set(this._linker, v[this._name]);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.AGetSet_toString = function AGetSet_toString(){
      return '<' + this._annotationCd + ',linker=' + this._linker + '>';
   }
}
