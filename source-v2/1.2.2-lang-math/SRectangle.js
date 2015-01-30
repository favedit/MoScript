//==========================================================
// <T>矩形结构。</T>
//
// @struct
// @author maocy
// @version 150130
//==========================================================
function SRectangle(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.position  = new SPoint2();
   o.size      = new SSize2();
   //..........................................................
   // @method
   o.set       = SRectangle_set;
   o.assign    = SRectangle_assign;
   return o;
}

//============================================================
// <T>接收一个矩形数据。</T>
//
// @method
// @param p:rectangle:SRectangle 矩形
//============================================================
function SRectangle_assign(p){
   var o = this;
   o.position.assign(p.position);
   o.size.assign(p.size);
}

//============================================================
// <T>设置位置和大小。</T>
//
// @method
// @param l:left:Number 左位置
// @param t:top:Number 上位置
// @param w:width:Number 宽度
// @param h:height:Number 高度
//============================================================
function SRectangle_set(l, t, w, h){
   var o = this;
   o.position.set(l, t);
   o.size.set(w, h);
}
