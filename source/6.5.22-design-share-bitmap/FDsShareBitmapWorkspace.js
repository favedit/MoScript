with(MO){
   //==========================================================
   // <T>共享位图工作区。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsShareBitmapWorkspace = function FDsShareBitmapWorkspace(o){
      o = RClass.inherits(this, o, FDsBitmapWorkspace);
      //..........................................................
      // @property
      o._frameName = 'resource.share.bitmap.Workspace';
      return o;
   }
}
