with(MO){
   //==========================================================
   // <T>私有位图画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsPrivateBitmapCanvasToolBar = function FDsPrivateBitmapCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.bitmap.CanvasToolBar';
      return o;
   }
}
