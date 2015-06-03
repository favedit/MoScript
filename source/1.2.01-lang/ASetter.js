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
   MO.ASetter = function ASetter(name, linker){
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
      o.code          = ASetter_code;
      o.build         = ASetter_build;
      o.load          = ASetter_load;
      o.save          = ASetter_save;
      o.toString      = ASetter_toString;
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
   MO.ASetter_code = function ASetter_code(){
      return this._linker;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param v:value:Object 对象
   //============================================================
   MO.ASetter_build = function ASetter_build(){
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.ASetter_load = function ASetter_load(v, x){
      v[this._name] = x.get(this._linker);
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.ASetter_save = function ASetter_save(v, x){
      x.set(this._linker, v[this._name]);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.ASetter_toString = function ASetter_toString(){
      return '<' + this._annotationCd + ',linker=' + this._linker + '>';
   }
}
