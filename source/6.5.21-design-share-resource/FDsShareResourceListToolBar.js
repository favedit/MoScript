with(MO){
   //==========================================================
   // <T>共享资源列表工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150428
   //==========================================================
   MO.FDsShareResourceListToolBar = function FDsShareResourceListToolBar(o){
      o = MO.Class.inherits(this, o, FDsResourceListToolBar);
      //..........................................................
      // @property
      o._frameName   = 'resource.share.resource.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}

