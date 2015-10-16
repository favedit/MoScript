//==========================================================
// <T>矩形结构。</T>
//
// @struct
// @author maocy
// @version 150130
//==========================================================
MO.SRectangle = function SRectangle(left, top, width, height){
   var o = this;
   //..........................................................
   // @attribute
   o.left            = MO.Lang.Float.nvl(left);
   o.top             = MO.Lang.Float.nvl(top);
   o.width           = MO.Lang.Float.nvl(width);
   o.height          = MO.Lang.Float.nvl(height);
   //..........................................................
   // @method
   o.right           = MO.SRectangle_right;
   o.bottom          = MO.SRectangle_bottom;
   // @method
   o.isEmpty         = MO.SRectangle_isEmpty;
   o.testRange       = MO.SRectangle_testRange;
   o.testRectangle   = MO.SRectangle_testRectangle;
   // @method
   o.reset           = MO.SRectangle_reset;
   o.assign          = MO.SRectangle_assign;
   o.setLocation     = MO.SRectangle_setLocation;
   o.setSize         = MO.SRectangle_setSize;
   o.setLocationSize = MO.SRectangle_setLocationSize;
   o.set             = MO.SRectangle_set;
   o.toString        = MO.SRectangle_toString;
   // @method
   o.dispose         = MO.SRectangle_dispose;
   return o;
}

//============================================================
// <T>获得右位置。</T>
//
// @method
// @return Number 右位置
//============================================================
MO.SRectangle_right = function SRectangle_right(){
   return this.left + this.width;
}

//============================================================
// <T>获得下位置。</T>
//
// @method
// @return Number 下位置
//============================================================
MO.SRectangle_bottom = function SRectangle_bottom(){
   return this.top + this.height;
}

//============================================================
// <T>测试是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
MO.SRectangle_isEmpty = function SRectangle_isEmpty(){
   var o = this;
   if((o.width > 0) && (o.height > 0)){
      return false;
   }
   return true;
}

//============================================================
// <T>测试是否在范围内。</T>
//
// @method
// @param x:Number 横坐标
// @param y:Number 纵坐标
// @return Boolean 是否在范围内
//============================================================
MO.SRectangle_testRange = function SRectangle_testRange(x, y){
   var o = this;
   if(x < o.left){
      return false;
   }
   if(y < o.top){
      return false;
   }
   if(x - o.left > o.width){
      return false;
   }
   if(y - o.top > o.height){
      return false;
   }
   return true;
}

//============================================================
// <T>测试是否在范围内。</T>
//
// @method
// @param value:SRectangle 矩形
// @return Boolean 是否在范围内
//============================================================
MO.SRectangle_testRectangle = function SRectangle_testRectangle(value) {
   var o = this;
   return (o.left < value.left + value.width && o.left + o.width > value.left && o.top < value.top + value.height && o.top + o.height > value.top);
}

//============================================================
// <T>重置数据。</T>
//
// @method
//============================================================
MO.SRectangle_reset = function SRectangle_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.width = 0;
   o.height = 0;
}

//============================================================
// <T>接收一个矩形数据。</T>
//
// @method
// @param value:SRectangle 矩形
//============================================================
MO.SRectangle_assign = function SRectangle_assign(value){
   var o = this;
   o.left = value.left;
   o.top = value.top;
   o.width = value.width;
   o.height = value.height;
}

//============================================================
// <T>设置位置。</T>
//
// @method
// @param left:Number 左位置
// @param top:Number 上位置
//============================================================
MO.SRectangle_setLocation = function SRectangle_setLocation(left, top){
   var o = this;
   o.left = left;
   o.top = top;
}

//============================================================
// <T>设置大小。</T>
//
// @method
// @param width:Number 宽度
// @param height:Number 高度
//============================================================
MO.SRectangle_setSize = function SRectangle_setSize(width, height){
   var o = this;
   o.width = width;
   o.height = height;
}

//============================================================
// <T>设置位置和大小。</T>
//
// @method
// @param location:SPoint2 位置
// @param size:SSize2 位置
//============================================================
MO.SRectangle_setLocationSize = function SRectangle_setLocationSize(location, size){
   var o = this;
   o.left = location.x;
   o.top = location.y;
   o.width = size.width;
   o.height = size.height;
}

//============================================================
// <T>设置位置和大小。</T>
//
// @method
// @param left:Number 左位置
// @param top:Number 上位置
// @param width:Number 宽度
// @param height:Number 高度
//============================================================
MO.SRectangle_set = function SRectangle_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height = height;
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SRectangle_toString = function SRectangle_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.width + ',' + o.height;
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.SRectangle_dispose = function SRectangle_dispose(){
   var o = this;
   o.left = null;
   o.top = null;
   o.width = null;
   o.height = null;
}
