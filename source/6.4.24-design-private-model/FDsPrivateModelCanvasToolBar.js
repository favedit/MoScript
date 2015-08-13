with(MO){
   //==========================================================
   // <T>私有模型画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsPrivateModelCanvasToolBar = function FDsPrivateModelCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.model.CanvasToolBar';
      return o;
   }
}
