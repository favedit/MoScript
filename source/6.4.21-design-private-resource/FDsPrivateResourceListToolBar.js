with(MO){
   //==========================================================
   // <T>私有资源列表工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsPrivateResourceListToolBar = function FDsPrivateResourceListToolBar(o){
      o = MO.Class.inherits(this, o, FDsResourceListToolBar);
      //..........................................................
      // @property
      o._frameName   = 'resource.private.resource.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
