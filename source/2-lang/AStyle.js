//==========================================================
// <T>样式描述类。</T>
//
// @property
// @param n:name:String 名称
// @author maocy
// @version 141231
//==========================================================
function AStyle(o, n, l){
   if(!o){o = this;}
   //..........................................................
   // @declare
   o.inherit    = false;
   o.annotation = EAnnotation.Style;
   //..........................................................
   // @attribute
   o.name       = n;
   o.style      = l;
   //..........................................................
   // @method
   o.code       = AStyle_code;
   o.build      = AStyle_build;
   o.toString   = AStyle_toString;
   return o;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
function AStyle_code(){
   return this.style;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
function AStyle_build(v){
   var o = this;
   v[o.name] = null;
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function AStyle_toString(){
   var o = this;
   return '<Style:style=' + o.style +  '>';
}
