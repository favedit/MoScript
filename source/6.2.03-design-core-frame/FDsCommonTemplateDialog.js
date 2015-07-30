with(MO){
   //==========================================================
   // <T>设计通用模板对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150505
   //==========================================================
   MO.FDsCommonTemplateDialog = function FDsCommonTemplateDialog(o){
      o = RClass.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.TemplateDialog';
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
      o.onBuilded             = FDsCommonTemplateDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsCommonTemplateDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonTemplateDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonTemplateDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonTemplateDialog_construct;
      // @method
      o.setSpace              = FDsCommonTemplateDialog_setSpace;
      o.setDisplayLabel       = FDsCommonTemplateDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonTemplateDialog_setContentCode;
      o.setContentLabel       = FDsCommonTemplateDialog_setContentLabel;
      // @method
      o.dispose               = FDsCommonTemplateDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonTemplateDialog_onBuilded = function FDsCommonTemplateDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      //..........................................................
      // 设置属性
      //o._controlSpaceGuid.setEditAble(false);
      //o._controlSpaceLabel.setEditAble(false);
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
   MO.FDsCommonTemplateDialog_onConfirmLoad = function FDsCommonTemplateDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FDuiDesktopConsole).hide();
      // 隐藏窗口
      o.hide();
      // 刷新目录
      //var catalog = o._frameSet._catalogContent;
      //if(o._displayModeCd == EUiDataMode.Insert){
      //   if(o._parentGuid){
      //      var node = catalog.findByGuid(o._parentGuid);
      //      catalog.loadNode(node);
      //   }else{
      //      catalog.loadService();
      //   }
      //}else{
      //   var label = o._controlLabel.get();
      //   var node = catalog.focusNode();
      //   node.setLabel(label);
      //}
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonTemplateDialog_onConfirmClick = function FDsCommonTemplateDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FDuiDesktopConsole).showUploading();
      // 获得属性
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Display');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      xsprite.set('model_guid', o._controlModelGuid.get());
      xsprite.set('model_code', o._controlModelCode.get());
      // 执行数据处理
      var connection = RConsole.find(FDrTemplateConsole).createDisplay(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonTemplateDialog_onCancelClick = function FDsCommonTemplateDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonTemplateDialog_construct = function FDsCommonTemplateDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置层标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonTemplateDialog_setSpace = function FDsCommonTemplateDialog_setSpace(space){
      var o = this;
      var resource = space.resource();
      o._controlSpaceGuid.set(resource.guid());
      o._controlSpaceLabel.set(resource.makeLabel());
   }

   //==========================================================
   // <T>设置显示标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonTemplateDialog_setDisplayLabel = function FDsCommonTemplateDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonTemplateDialog_setContentCode = function FDsCommonTemplateDialog_setContentCode(label){
      this._controlCode.set(label);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonTemplateDialog_setContentLabel = function FDsCommonTemplateDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonTemplateDialog_dispose = function FDsCommonTemplateDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
