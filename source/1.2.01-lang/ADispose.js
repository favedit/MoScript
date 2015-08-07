//============================================================
// <T>释放描述类。</T>
//
// @property
// @param name:String 名称
// @param disposeCd:EDispose 释放类型
// @author maocy
// @version 150606
//============================================================
MO.ADispose = function ADispose(name, disposeCd){
   var o = this;
   MO.AAnnotation.call(o, name);
   //..........................................................
   // @attribute
   o._annotationCd = MO.EAnnotation.Dispose;
   o._inherit      = true;
   o._ordered      = true;
   // @attribute
   o._disposeCd    = disposeCd;
   //..........................................................
   // @method
   o.disposeCd     = MO.ADispose_disposeCd;
   return o;
}

//============================================================
// <T>获得释放类型。</T>
//
// @method
// @return EDispose 数据类型
//============================================================
MO.ADispose_disposeCd = function ADispose_disposeCd(){
   return this._disposeCd;
}
