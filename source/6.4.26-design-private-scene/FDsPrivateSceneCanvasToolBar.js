with(MO){
   //==========================================================
   // <T>私人场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsPrivateSceneCanvasToolBar = function FDsPrivateSceneCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsSceneCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.scene.CanvasToolBar';
      return o;
   }
}
