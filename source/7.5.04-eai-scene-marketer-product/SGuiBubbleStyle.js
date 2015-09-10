//==========================================================
// <T>界面格子样式。</T>
//
// @struct
//==========================================================
MO.SGuiBubbleStyle = function SGuiBubbleStyle(){
   var o                = this;
   //..........................................................
   // @attribute
   o.radius             = 50;
   o.lineWidth          = 3;
   o.foreFillColor      = '#f9a800';
   o.backFillColor      = '#007cb0';
   o.strokeColor        = '#1f3855';
   //..........................................................
   // @method
   o.assign             = MO.SGuiBubbleStyle_assign;
   o.dispose            = MO.SGuiBubbleStyle_dispose;
   return o;
}

//===========================================================
// <T>拷贝值。<T>
//
// @method
//===========================================================
MO.SGuiBubbleStyle_assign = function SGuiBubbleStyle_assign(s) {
   var o = this;
   o.radius = s.radius;
   o.lineWidth = s.lineWidth;
   o.foreFillColor = s.foreFillColor;
   o.backFillColor = s.backFillColor;
   o.strokeColor = s.strokeColor;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiBubbleStyle_dispose = function SGuiBubbleStyle_dispose(){
   var o = this;
   // 释放属性
}
