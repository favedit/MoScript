with(MO){
   //==========================================================
   // <T>精灵对话框。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsCommonSpriteDialog = function FDsCommonSpriteDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.SpriteDialog';
      //..........................................................
      // @attribute
      o._displayModeCd        = null;
      // @attribute
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsCommonSpriteDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsCommonSpriteDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonSpriteDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonSpriteDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonSpriteDialog_construct;
      // @method
      o.setLayerLabel         = FDsCommonSpriteDialog_setLayerLabel;
      o.setDisplayLabel       = FDsCommonSpriteDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonSpriteDialog_setContentCode;
      o.setContentLabel       = FDsCommonSpriteDialog_setContentLabel;
      // @method
      o.dispose               = FDsCommonSpriteDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonSpriteDialog_onBuilded = function FDsCommonSpriteDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      //..........................................................
      // 设置属性
      o._controlLayerLabel.setEditAble(false);
      o._controlDisplayLabel.setEditAble(false);
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
   MO.FDsCommonSpriteDialog_onConfirmLoad = function FDsCommonSpriteDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FUiDesktopConsole).hide();
      // 隐藏窗口
      o.hide();
      // 刷新目录
      var catalog = o._frameSet._catalogContent;
      if(o._displayModeCd == EUiDataMode.Insert){
         if(o._parentGuid){
            var node = catalog.findByGuid(o._parentGuid);
            catalog.loadNode(node);
         }else{
            catalog.loadService();
         }
      }else{
         var label = o._controlLabel.get();
         var node = catalog.focusNode();
         node.setLabel(label);
      }
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonSpriteDialog_onConfirmClick = function FDsCommonSpriteDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 获得属性
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Sprite');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('layer_guid', o._layerGuid);
      xsprite.set('display_guid', o._displayGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      xsprite.set('template_guid', o._controlTemplateGuid.get());
      xsprite.set('template_code', o._controlTemplateCode.get());
      // 执行数据处理
      var console = RConsole.find(FDrSceneConsole);
      var connection = null;
      connection = console.createSprite(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonSpriteDialog_onCancelClick = function FDsCommonSpriteDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonSpriteDialog_construct = function FDsCommonSpriteDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FUiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置层标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonSpriteDialog_setLayerLabel = function FDsCommonSpriteDialog_setLayerLabel(label){
      this._controlLayerLabel.set(label);
   }

   //==========================================================
   // <T>设置显示标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonSpriteDialog_setDisplayLabel = function FDsCommonSpriteDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonSpriteDialog_setContentCode = function FDsCommonSpriteDialog_setContentCode(label){
      this._controlCode.set(label);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonSpriteDialog_setContentLabel = function FDsCommonSpriteDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonSpriteDialog_dispose = function FDsCommonSpriteDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiDialog.dispose.call(o);
   }
}
