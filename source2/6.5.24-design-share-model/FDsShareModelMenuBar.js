with(MO){
   //==========================================================
   // <T>共享模型菜单。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsShareModelMenuBar = function FDsShareModelMenuBar(o){
      o = RClass.inherits(this, o, FDsModelMenuBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.model.MenuBar';
      //..........................................................
      // @event
      o.onBuilded  = FDsShareModelMenuBar_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareModelMenuBar_onBuilded = function FDsShareModelMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsModelMenuBar.onBuilded.call(o, p);
   }
}
