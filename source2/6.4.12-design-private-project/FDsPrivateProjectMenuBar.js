with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsPrivateProjectMenuBar = function FDsPrivateProjectMenuBar(o){
      o = RClass.inherits(this, o, FDsProjectMenuBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.project.MenuBar';
      //..........................................................
      // @event
      o.onBuilded  = FDsPrivateProjectMenuBar_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsPrivateProjectMenuBar_onBuilded = function FDsPrivateProjectMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsProjectMenuBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      //o._controlSaveButton.addClickListener(o, o.onSaveClick);
   }
}
