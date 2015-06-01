with(MO){
   //==========================================================
   // <T>共享材质菜单。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsShareMaterialMenuBar = function FDsShareMaterialMenuBar(o){
      o = RClass.inherits(this, o, FDsMaterialMenuBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.material.MenuBar';
      return o;
   }
}
