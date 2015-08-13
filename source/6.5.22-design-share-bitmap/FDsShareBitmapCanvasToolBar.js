with(MO){
   //==========================================================
   // <T>共享位图画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsShareBitmapCanvasToolBar = function FDsShareBitmapCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.bitmap.CanvasToolBar';
      return o;
   }
}
