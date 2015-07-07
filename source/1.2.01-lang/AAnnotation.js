//============================================================
// <T>描述类。</T>
//
// @property
// @param name:String 名称
// @author maocy
// @version 150104
//============================================================
MO.AAnnotation = function AAnnotation(name){
   var o = this;
   //..........................................................
   // @attribute
   o._annotationCd = null;
   o._inherit      = false;
   o._duplicate    = false;
   // @attribute
   o._name         = name;
   //..........................................................
   // @method
   o.annotationCd  = MO.AAnnotation_annotationCd;
   o.name          = MO.AAnnotation_name;
   o.code          = MO.AAnnotation_code;
   o.value         = MO.AAnnotation_value;
   return o;
}

//============================================================
// <T>获得描述类型。</T>
//
// @method
// @return EAnnotation 描述类型
//============================================================
MO.AAnnotation_annotationCd = function AAnnotation_annotationCd(){
   return this._annotationCd;
}

//============================================================
// <T>获得名称。</T>
//
// @method
// @return String 代码
//============================================================
MO.AAnnotation_name = function AAnnotation_name(){
   return this._name;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
MO.AAnnotation_code = function AAnnotation_code(){
   return this._name;
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return Object 内容
//==========================================================
MO.AAnnotation_value = function AAnnotation_value(){
   return null;
}
