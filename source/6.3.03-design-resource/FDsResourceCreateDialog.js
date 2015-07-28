with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsResourceCreateDialog = function FDsResourceCreateDialog(o){
      o = RClass.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName        = 'resource.resource.CreateDialog';
      //..........................................................
      // @attribute
      o._nodeGuid         = null;
      // @attribute
      o._controlNodeLabel = null;
      o._controlCode      = null;
      o._controlLabel     = null;
      o._controlConfirm   = null;
      o._controlCancel    = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsResourceCreateDialog_onBuilded;
      // @event
      o.onConfirmLoad     = FDsResourceCreateDialog_onConfirmLoad;
      o.onConfirmClick    = FDsResourceCreateDialog_onConfirmClick;
      o.onCancelClick     = FDsResourceCreateDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct         = FDsResourceCreateDialog_construct;
      // @method
      o.setNodeLabel      = FDsResourceCreateDialog_setNodeLabel;
      o.switchMode        = FDsResourceCreateDialog_switchMode;
      // @method
      o.dispose           = FDsResourceCreateDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCreateDialog_onBuilded = function FDsResourceCreateDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      //..........................................................
      // 设置属性
      o._controlNodeLabel.setEditAble(false);
      //..........................................................
      // 注册事件
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsResourceCreateDialog_onConfirmLoad = function FDsResourceCreateDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      o.hide();
      // 隐藏窗口
      RConsole.find(FUiDesktopConsole).hide();
      // 检查结果
      if(RConsole.find(FUiResultConsole).checkEvent(event)){
         // 刷新搜索内容
         var frame = o._frameSet._listContent;
         frame.serviceResearch();
      }
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsResourceCreateDialog_onConfirmClick = function FDsResourceCreateDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 获得属性
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      // 创建处理
      var connection = null;
      switch(o._modeCd){
         case EE3sResource.Material:
            var material = RClass.create(FDrMaterial);
            material.setCode(code);
            material.setLabel(label);
            connection = RConsole.find(FDrMaterialConsole).doCreate(material);
            break;
         case EE3sResource.Template:
            var template = RClass.create(FDrTemplate);
            template.setCode(code);
            template.setLabel(label);
            connection = RConsole.find(FDrTemplateConsole).doCreate(template);
            break;
         case EE3sResource.Scene:
            var scene = RClass.create(FDrScene);
            scene.setCode(code);
            scene.setLabel(label);
            connection = RConsole.find(FDrSceneConsole).doCreate(scene);
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      // 创建材质
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsResourceCreateDialog_onCancelClick = function FDsResourceCreateDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceCreateDialog_construct = function FDsResourceCreateDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置节点标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsResourceCreateDialog_setNodeLabel = function FDsResourceCreateDialog_setNodeLabel(label){
      var o = this;
      o._controlNodeLabel.set(label);
   }

   //==========================================================
   // <T>切换数据模式。</T>
   //
   // @method
   // @param modeCd:String 数据模式
   //==========================================================
   MO.FDsResourceCreateDialog_switchMode = function FDsResourceCreateDialog_switchMode(modeCd){
      var o = this;
      o._modeCd = modeCd;
      switch(modeCd){
         case EE3sResource.Material:
            o.setLabel('创建材质');
            break;
         case EE3sResource.Template:
            o.setLabel('创建模板');
            break;
         case EE3sResource.Scene:
            o.setLabel('创建场景');
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      o._controlCode.set('');
      o._controlLabel.set('');
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceCreateDialog_dispose = function FDsResourceCreateDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
