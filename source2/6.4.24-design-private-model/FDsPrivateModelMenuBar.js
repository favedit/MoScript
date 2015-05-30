with(MO){
   //==========================================================
   // <T>私有模型菜单。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsPrivateModelMenuBar = function FDsPrivateModelMenuBar(o){
      o = RClass.inherits(this, o, FDsModelMenuBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.model.MenuBar';
      //..........................................................
      // @event
      o.onBuilded  = FDsPrivateModelMenuBar_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsPrivateModelMenuBar_onBuilded = function FDsPrivateModelMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsModelMenuBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlSaveButton.addClickListener(o, o.onSaveClick);
      o._controlCaptureButton.addClickListener(o, o.onCaptureClick);
   }
}
