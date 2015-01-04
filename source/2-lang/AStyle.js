//==========================================================
// <T>样式描述类。</T>
//
// @property
// @param n:name:String 名称
// @param s:style:String 样式
// @author maocy
// @version 141231
//==========================================================
function AStyle(n, s){
   var o = this;
   AAnnotation(o, n);
   //..........................................................
   // @declare
   o._annotationCd = EAnnotation.Style;
   //..........................................................
   // @attribute
   o._style        = s;
   //..........................................................
   // @method
   o.code          = AStyle_code;
   o.style         = AStyle_style;
   o.build         = AStyle_build;
   o.toString      = AStyle_toString;
   return o;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
function AStyle_code(){
   return this._style;
}

//============================================================
// <T>获得样式。</T>
//
// @method
// @return String 样式
//============================================================
function AStyle_style(){
   return this._style;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
function AStyle_build(v){
   var o = this;
   v[o._name] = null;
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function AStyle_toString(){
   var o = this;
   return 'style=' + o._style;
}
