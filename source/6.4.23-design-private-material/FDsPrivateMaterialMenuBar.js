with(MO){
   //==========================================================
   // <T>私有材质菜单。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsPrivateMaterialMenuBar = function FDsPrivateMaterialMenuBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialMenuBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.material.MenuBar';
      return o;
   }
}
