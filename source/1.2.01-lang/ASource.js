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
   MO.ASource = function ASource(name, typeCd){
      var o = this;
      AAnnotation.call(o, name);
      //..........................................................
      // @declare
      o._inherit      = false;
      o._annotationCd = EAnnotation.Source;
      //..........................................................
      // @attribute
      o._linker       = null;
      o._typeCd       = typeCd;
      //..........................................................
      // @method
      o.code          = ASource_code;
      o.build         = ASource_build;
      o.load          = ASource_load;
      o.save          = ASource_save;
      o.toString      = ASource_toString;
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
   MO.ASource_code = function ASource_code(){
      return this._linker;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param v:value:Object 对象
   //============================================================
   MO.ASource_build = function ASource_build(){
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.ASource_load = function ASource_load(v, x){
      v[this._name] = x.get(this._linker);
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.ASource_save = function ASource_save(v, x){
      x.set(this._linker, v[this._name]);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.ASource_toString = function ASource_toString(){
      return '<' + this._annotationCd + ',linker=' + this._linker + '>';
   }
}
