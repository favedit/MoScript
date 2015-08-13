with(MO){
   //==========================================================
   // <T>私有材质画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsPrivateMaterialCanvasToolBar = function FDsPrivateMaterialCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.material.CanvasToolBar';
      return o;
   }
}
