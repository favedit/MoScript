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
   MO.ASource = function ASource(name, typeCd, linker){
      var o = this;
      AAnnotation.call(o, name);
      //..........................................................
      // @declare
      o._inherit      = false;
      o._annotationCd = EAnnotation.Source;
      //..........................................................
      // @attribute
      o._typeCd       = typeCd;
      o._code         = null;
      o._linker       = null;
      //..........................................................
      // @method
      o.build         = ASource_build;
      o.toString      = ASource_toString;
      //..........................................................
      // @construct
      var name = o._name;
      if(RString.startsWith(name, '_')){
         name = name.substring(1);
      }
      o._code = name;
      if(linker == null){
         o._linker = RString.firstUpper(name);
      }else{
         o._linker = linker;
      }
      return o;
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
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.ASource_toString = function ASource_toString(){
      return '<' + this._annotationCd + ',linker=' + this._linker + '>';
   }
}
