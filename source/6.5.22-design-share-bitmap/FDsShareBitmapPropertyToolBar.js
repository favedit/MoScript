with(MO){
   //==========================================================
   // <T>共享位图属性工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsShareBitmapPropertyToolBar = function FDsShareBitmapPropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapPropertyToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.bitmap.PropertyToolBar';
      return o;
   }
}
