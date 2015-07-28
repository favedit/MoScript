with(MO){
   //==========================================================
   // <T>项目场景对话框。</T>
   //
   // @author maocy
   // @history 150411
   //==========================================================
   MO.FDsProjectSceneDialog = function FDsProjectSceneDialog(o){
      o = RClass.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'design3d.project.SceneDialog';
      //..........................................................
      // @attribute
      o._dataModeCd           = null;
      // @attribute
      o._controlParentLabel   = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsProjectSceneDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsProjectSceneDialog_onConfirmLoad;
      o.onConfirmClick        = FDsProjectSceneDialog_onConfirmClick;
      o.onCancelClick         = FDsProjectSceneDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsProjectSceneDialog_construct;
      // @method
      o.setDataCode           = FDsProjectSceneDialog_setDataCode;
      o.setDataLabel          = FDsProjectSceneDialog_setDataLabel;
      // @method
      o.switchDataMode        = FDsProjectSceneDialog_switchDataMode;
      // @method
      o.dispose               = FDsProjectSceneDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectSceneDialog_onBuilded = function FDsProjectSceneDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsProjectSceneDialog_onConfirmLoad = function FDsProjectSceneDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FUiDesktopConsole).hide();
      // 隐藏窗口
      o.hide();
      // 刷新目录
      var listContent = o._frameSet._sceneListContent;
      listContent.serviceRelist();
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsProjectSceneDialog_onConfirmClick = function FDsProjectSceneDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 获得属性
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      // 执行数据处理
      var sceneConsole = RConsole.find(FDrSceneConsole);
      var connection = null;
      if(o._dataModeCd == EUiDataMode.Insert){
         var scene = RClass.create(FDrScene);
         scene._projectGuid = o._projectGuid;
         scene._code = code;
         scene._label = label;
         connection = sceneConsole.doCreate(scene);
         scene.dispose();
      }else{
         throw new TError(o, 'Unknown mode.');
      }
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsProjectSceneDialog_onCancelClick = function FDsProjectSceneDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneDialog_construct = function FDsProjectSceneDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置父节点标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsProjectSceneDialog_setDataCode = function FDsProjectSceneDialog_setDataCode(code){
      this._controlCode.set(code);
   }

   //==========================================================
   // <T>设置节点标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsProjectSceneDialog_setDataLabel = function FDsProjectSceneDialog_setDataLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>切换数据模式。</T>
   //
   // @method
   // @param modeCd:EUiDataMode 数据模式
   //==========================================================
   MO.FDsProjectSceneDialog_switchDataMode = function FDsProjectSceneDialog_switchDataMode(modeCd){
      var o = this;
      o._dataModeCd = modeCd;
      if(modeCd == EUiDataMode.Insert){
         o.setLabel('新建场景');
      }else if(modeCd == EUiDataMode.Update){
         o.setLabel('场景属性');
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneDialog_dispose = function FDsProjectSceneDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
