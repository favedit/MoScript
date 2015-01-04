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
   // @attribute
   o._name         = n;
   //..........................................................
   // @method
   o.annotationCd  = AProperty_annotationCd;
   o.name          = AProperty_name;
   o.code          = AProperty_code;
   return o;
}

//============================================================
// <T>获得描述类型。</T>
//
// @method
// @return EAnnotation 描述类型
//============================================================
function AProperty_annotationCd(){
   return this._annotationCd;
}

//============================================================
// <T>获得名称。</T>
//
// @method
// @return String 代码
//============================================================
function AProperty_name(){
   return this._name;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
function AProperty_code(){
   return this._name;
}
