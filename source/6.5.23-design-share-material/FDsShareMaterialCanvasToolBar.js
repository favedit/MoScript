with(MO){
   //==========================================================
   // <T>共享材质画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsShareMaterialCanvasToolBar = function FDsShareMaterialCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsMaterialCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.materail.CanvasToolBar';
      return o;
   }
}
