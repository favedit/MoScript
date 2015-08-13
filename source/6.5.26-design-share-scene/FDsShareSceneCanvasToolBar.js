with(MO){
   //==========================================================
   // <T>共享场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsShareSceneCanvasToolBar = function FDsShareSceneCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsSceneCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.scene.CanvasToolBar';
      return o;
   }
}
