//==========================================================
// <T>样式描述类。</T>
//
// @property
// @param name:String 名称
// @param style:String 样式
// @author maocy
// @version 141231
//==========================================================
MO.AStyle = function AStyle(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   //..........................................................
   // @declare
   o._annotationCd = MO.EAnnotation.Style;
   o._duplicate    = true;
   //..........................................................
   // @attribute
   o._style        = style;
   //..........................................................
   // @method
   o.code          = MO.AStyle_code;
   o.style         = MO.AStyle_style;
   o.build         = MO.AStyle_build;
   o.toString      = MO.AStyle_toString;
   //..........................................................
   // @construct
   if(style == null){
      var value = null;
      if(MO.Lang.String.startsWith(name, '_style')){
         value = name.substring(6);
      }else if(MO.Lang.String.startsWith(name, 'style')){
         value = name.substring(5);
      }
      if(value == null){
         throw new MO.TError('Style name is empty.');
      }
      o._style = value;
   }
   return o;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
MO.AStyle_code = function AStyle_code(){
   return this._style;
}

//============================================================
// <T>获得样式。</T>
//
// @method
// @return String 样式
//============================================================
MO.AStyle_style = function AStyle_style(){
   return this._style;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param value:Object 对象
//============================================================
MO.AStyle_build = function AStyle_build(value){
   var o = this;
   value[o._name] = null;
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.AStyle_toString = function AStyle_toString(){
   var o = this;
   return 'style=' + o._style;
}
