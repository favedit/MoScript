with(MO){
   //==========================================================
   // <T>私有模板画板工具栏。</T>
   //
   // @method
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsPrivateTemplateCanvasToolBar = function FDsPrivateTemplateCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateCanvasToolBar);
      //..........................................................
      // @property
      o._frameName      = 'resource.private.template.CanvasToolBar';
      return o;
   }
}
