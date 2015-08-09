//==========================================================
// <T>样式描述类。</T>
//
// @property
// @param name:String 名称
// @param style:String 样式
// @author maocy
// @version 141231
//==========================================================
MO.AStyleIcon = function AStyleIcon(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   //..........................................................
   // @declare
   o._annotationCd = MO.EAnnotation.Style;
   //..........................................................
   // @attribute
   o._style        = style;
   //..........................................................
   // @method
   o.code          = MO.AStyleIcon_code;
   o.style         = MO.AStyleIcon_style;
   o.build         = MO.AStyleIcon_build;
   o.toString      = MO.AStyleIcon_toString;
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
// @param value:Object 对象
//============================================================
MO.AStyleIcon_build = function AStyleIcon_build(value){
   var o = this;
   value[o._name] = null;
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
