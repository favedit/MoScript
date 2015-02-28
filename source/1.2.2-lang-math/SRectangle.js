//==========================================================
// <T>矩形结构。</T>
//
// @struct
// @author maocy
// @version 150130
//==========================================================
MO.SRectangle = function SRectangle(){
   var o = this;
   //..........................................................
   // @attribute
   o.position    = new MO.SPoint2();
   o.size        = new MO.SSize2();
   //..........................................................
   // @method
   o.left        = SRectangle_left;
   o.top         = SRectangle_top;
   o.right       = SRectangle_right;
   o.bottom      = SRectangle_bottom;
   o.width       = SRectangle_width;
   o.height      = SRectangle_height;
   // @method
   o.assign      = SRectangle_assign;
   o.setPosition = SRectangle_setPosition;
   o.setSize     = SRectangle_setSize;
   o.set         = SRectangle_set;
   o.toString    = SRectangle_toString;
   // @method
   o.dispose     = SRectangle_dispose;
   // @method
   o.dump        = SRectangle_dump;
   return o;

   //============================================================
   // <T>获得左位置。</T>
   //
   // @method
   // @return Number 左位置
   //============================================================
   function SRectangle_left(){
      return this.position.x;
   }

   //============================================================
   // <T>获得上位置。</T>
   //
   // @method
   // @return Number 上位置
   //============================================================
   function SRectangle_top(){
      return this.position.y;
   }

   //============================================================
   // <T>获得右位置。</T>
   //
   // @method
   // @return Number 右位置
   //============================================================
   function SRectangle_right(){
      return this.position.x + this.size.width;
   }

   //============================================================
   // <T>获得下位置。</T>
   //
   // @method
   // @return Number 下位置
   //============================================================
   function SRectangle_bottom(){
      return this.position.y + this.size.height;
   }

   //============================================================
   // <T>获得宽度。</T>
   //
   // @method
   // @return Number 宽度
   //============================================================
   function SRectangle_width(){
      return this.size.width;
   }

   //============================================================
   // <T>获得高度。</T>
   //
   // @method
   // @return Number 高度
   //============================================================
   function SRectangle_height(){
      return this.size.height;
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
   // <T>设置位置。</T>
   //
   // @method
   // @param l:left:Number 左位置
   // @param t:top:Number 上位置
   //============================================================
   function SRectangle_setPosition(l, t, w, h){
      this.position.set(l, t);
   }

   //============================================================
   // <T>设置大小。</T>
   //
   // @method
   // @param w:width:Number 宽度
   // @param h:height:Number 高度
   //============================================================
   function SRectangle_setSize(w, h){
      this.size.set(w, h);
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

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   function SRectangle_toString(){
      var o = this;
      return o.position.x + ',' + o.position.y + ',' + o.size.width + ',' + o.size.height;
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   function SRectangle_dispose(){
      var o = this;
      o.position = o.position.dispose();
      o.size = o.size.dispose();
   }

   //============================================================
   // <T>获得运行信息。</T>
   //
   // @method
   // @return String 运行信息
   //============================================================
   function SRectangle_dump(){
      var o = this;
      return RClass.dump(o) + ' [' + o.position.x + ',' + o.position.y + '-' + o.size.width + ',' + o.size.height + ']';
   }
}
