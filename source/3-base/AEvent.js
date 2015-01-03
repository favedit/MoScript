//============================================================
// <T>事件描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 141231
//============================================================
function AEvent(o, n, l){
   var o = this;
   o.annotation = EAnnotation.Event;
   // @attribute
   o.name       = n;
   o.linker     = null;
   // @method
   o.code     = AEvent_code;
   return o;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
function AEvent_code(){
   return this.name;
}
