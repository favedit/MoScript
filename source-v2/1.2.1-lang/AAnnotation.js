//============================================================
// <T>描述类。</T>
//
// @property
// @param n:name:String 名称
// @author maocy
// @version 150104
//============================================================
function AAnnotation(o, n){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o._annotationCd = null;
   o._inherit      = false;
   o._duplicate    = false;
   // @attribute
   o._name         = n;
   //..........................................................
   // @method
   o.annotationCd  = AAnnotation_annotationCd;
   o.name          = AAnnotation_name;
   o.code          = AAnnotation_code;
   o.value         = AAnnotation_value;
   return o;
}

//============================================================
// <T>获得描述类型。</T>
//
// @method
// @return EAnnotation 描述类型
//============================================================
function AAnnotation_annotationCd(){
   return this._annotationCd;
}

//============================================================
// <T>获得名称。</T>
//
// @method
// @return String 代码
//============================================================
function AAnnotation_name(){
   return this._name;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
function AAnnotation_code(){
   return this._name;
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return Object 内容
//==========================================================
function AAnnotation_value(){
   return null;
}
