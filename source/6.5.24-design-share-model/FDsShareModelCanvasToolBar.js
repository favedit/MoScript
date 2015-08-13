with(MO){
   //==========================================================
   // <T>共享模型画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsShareModelCanvasToolBar = function FDsShareModelCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCanvasToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.model.CanvasToolBar';
      return o;
   }
}
