with(MO){
   //==========================================================
   // <T>私有资源菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemDesignFrameMenuBar = function FDsSystemDesignFrameMenuBar(o){
      o = RClass.inherits(this, o, FDsResourceMenuBar);
      //..........................................................
      // @property
      o._frameName      = 'system.design.frame.MenuBar';
      //..........................................................
      // @attribute
      o._controlRefresh = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsSystemDesignFrameMenuBar_onBuilded;
      // @event
      o.onRefreshClick  = FDsSystemDesignFrameMenuBar_onRefreshClick;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemDesignFrameMenuBar_onBuilded = function FDsSystemDesignFrameMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsResourceMenuBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlImportPicture.addClickListener(o, o.onImportPictureClick);
      o._controlImportModel.addClickListener(o, o.onImportModelClick);
      o._controlCreateMaterial.addClickListener(o, o.onCreateMaterialClick);
      o._controlCreateTemplate.addClickListener(o, o.onCreateTemplateClick);
      o._controlCreateScene.addClickListener(o, o.onCreateSceneClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlShareOpen.addClickListener(o, o.onShareClick);
      o._controlShareClose.addClickListener(o, o.onShareClick);
   }

   //==========================================================
   // <T>导入模型按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemDesignFrameMenuBar_onRefreshClick = function FDsSystemDesignFrameMenuBar_onRefreshClick(event){
   }
}
