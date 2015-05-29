with(MO){
   //==========================================================
   // <T>渲染视角。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FG3dViewport = function FG3dViewport(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o.left   = 0;
      o.top    = 0;
      o.width  = 0;
      o.height = 0;
      //..........................................................
      // @method
      o.set    = FG3dViewport_set;
      return o;
   }

   //==========================================================
   // <T>设置信息。</T>
   //
   // @param l:left:Number 左边
   // @param t:top:Number 上边
   // @param w:width:Number 宽度
   // @param h:height:Number 高度
   //==========================================================
   MO.FG3dViewport_set = function FG3dViewport_set(l, t, w, h){
      var o = this;
      o.left = l;
      o.top = t;
      o.width = w;
      o.height= h;
   }
}
