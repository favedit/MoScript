with(MO){
   //==========================================================
   // <T>设计显示对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150429
   //==========================================================
   MO.FDsCommonDisplayDialog = function FDsCommonDisplayDialog(o){
      o = RClass.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.DisplayDialog';
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
      o.onBuilded             = FDsCommonDisplayDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsCommonDisplayDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonDisplayDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonDisplayDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonDisplayDialog_construct;
      // @method
      o.setSpace              = FDsCommonDisplayDialog_setSpace;
      o.setDisplayLabel       = FDsCommonDisplayDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonDisplayDialog_setContentCode;
      o.setContentLabel       = FDsCommonDisplayDialog_setContentLabel;
      // @method
      o.dispose               = FDsCommonDisplayDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonDisplayDialog_onBuilded = function FDsCommonDisplayDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      //..........................................................
      // 设置属性
      o._controlSpaceGuid.setEditAble(false);
      o._controlSpaceLabel.setEditAble(false);
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
   MO.FDsCommonDisplayDialog_onConfirmLoad = function FDsCommonDisplayDialog_onConfirmLoad(event){
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
   MO.FDsCommonDisplayDialog_onConfirmClick = function FDsCommonDisplayDialog_onConfirmClick(event){
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
   MO.FDsCommonDisplayDialog_onCancelClick = function FDsCommonDisplayDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonDisplayDialog_construct = function FDsCommonDisplayDialog_construct(){
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
   MO.FDsCommonDisplayDialog_setSpace = function FDsCommonDisplayDialog_setSpace(space){
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
   MO.FDsCommonDisplayDialog_setDisplayLabel = function FDsCommonDisplayDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonDisplayDialog_setContentCode = function FDsCommonDisplayDialog_setContentCode(label){
      this._controlCode.set(label);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonDisplayDialog_setContentLabel = function FDsCommonDisplayDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonDisplayDialog_dispose = function FDsCommonDisplayDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
