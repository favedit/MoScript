with(MO){
   //==========================================================
   // <T>私有资源列表工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsSystemDesignFrameListToolBar = function FDsSystemDesignFrameListToolBar(o){
      o = RClass.inherits(this, o, FDsResourceListToolBar);
      //..........................................................
      // @property
      o._frameName   = 'system.design.frame.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
