with(MO){
   //==========================================================
   // <T>样式描述类。</T>
   //
   // @property
   // @param n:name:String 名称
   // @param s:style:String 样式
   // @author maocy
   // @version 141231
   //==========================================================
   MO.AStyleIcon = function AStyleIcon(n, s){
      var o = this;
      AAnnotation.call(o, n);
      //..........................................................
      // @declare
      o._annotationCd = EAnnotation.Style;
      //..........................................................
      // @attribute
      o._style        = s;
      //..........................................................
      // @method
      o.code          = AStyleIcon_code;
      o.style         = AStyleIcon_style;
      o.build         = AStyleIcon_build;
      o.toString      = AStyleIcon_toString;
      //..........................................................
      // @construct
      if(s == null){
         var v = null;
         if(RString.startsWith(n, '_style')){
            v = n.substring(6);
         }else if(RString.startsWith(n, 'style')){
            v = n.substring(5);
         }
         if(v == null){
            throw new TError('Style name is empty.');
         }
         o._style = v;
      }
      return o;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //============================================================
   MO.AStyleIcon_code = function AStyleIcon_code(){
      return this._style;
   }

   //============================================================
   // <T>获得样式。</T>
   //
   // @method
   // @return String 样式
   //============================================================
   MO.AStyleIcon_style = function AStyleIcon_style(){
      return this._style;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param v:value:Object 对象
   //============================================================
   MO.AStyleIcon_build = function AStyleIcon_build(v){
      var o = this;
      v[o._name] = null;
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.AStyleIcon_toString = function AStyleIcon_toString(){
      var o = this;
      return 'style=' + o._style;
   }
}
