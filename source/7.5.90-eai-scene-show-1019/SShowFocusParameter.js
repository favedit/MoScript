//==========================================================
// <T>预设聚焦参数。</T>
//
// @struct
//==========================================================
MO.SShowFocusParameter = function SShowFocusParameter(r, t, s){
   var o                   = this;
   //..........................................................
   // @attribute
   o.name       = '';
   o.rotateY    = MO.Runtime.nvl(r, 0);
   o.translateY = MO.Runtime.nvl(t, 0);
   o.scale      = MO.Runtime.nvl(s, 0);
   //..........................................................
   // @method
   o.assign     = MO.SShowFocusParameter_assign;
   return o;
}

//===========================================================
// <T>拷贝值。<T>
//
// @method
//===========================================================
MO.SShowFocusParameter_assign = function SShowFocusParameter_assign(s) {
   var o = this;
   o.name = s.name;
   o.rotateY = s.rotateY;
   o.translateY = s.translateY;
   o.scale = s.scale;
}
