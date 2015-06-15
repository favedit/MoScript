with(MO){
   //==========================================================
   // <T>私有资源列表工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsSystemFrameSpaceToolBar = function FDsSystemFrameSpaceToolBar(o){
      o = RClass.inherits(this, o, FDsResourceListToolBar);
      //..........................................................
      // @property
      o._frameName   = 'system.design.frame.SpaceToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
