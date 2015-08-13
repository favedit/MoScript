with(MO){
   //==========================================================
   // <T>私有位图菜单。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsPrivateBitmapMenuBar = function FDsPrivateBitmapMenuBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapMenuBar);
      //..........................................................
      // @property
      o._frameName  = 'resource.private.bitmap.MenuBar';
      //..........................................................
      // @event
      o.onBuilded   = FDsPrivateBitmapMenuBar_onBuilded;
      o.onBackClick = FDsPrivateBitmapMenuBar_onBackClick;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsPrivateBitmapMenuBar_onBuilded = function FDsPrivateBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
      //..........................................................
      // 注册事件
      o._controlBack.addClickListener(o, o.onBackClick);
      o._controlSave.addClickListener(o, o.onSaveClick);
      o._controlImport.addClickListener(o, o.onImportClick);
   }

   //==========================================================
   // <T>后退按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsPrivateBitmapMenuBar_onBackClick = function FDsPrivateBitmapMenuBar_onBackClick(event){
      var o = this;
      var workspace = o._frameSet._workspace;
      workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
   }
}
