with(MO){
   //==========================================================
   // <T>设计材质对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150429
   //==========================================================
   MO.FDsCommonMaterialDialog = function FDsCommonMaterialDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.MaterialDialog';
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
      o.onBuilded             = FDsCommonMaterialDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsCommonMaterialDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonMaterialDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonMaterialDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonMaterialDialog_construct;
      // @method
      o.setSpace              = FDsCommonMaterialDialog_setSpace;
      o.setDisplayLabel       = FDsCommonMaterialDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonMaterialDialog_setContentCode;
      o.setContentLabel       = FDsCommonMaterialDialog_setContentLabel;
      // @method
      o.dispose               = FDsCommonMaterialDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonMaterialDialog_onBuilded = function FDsCommonMaterialDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
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
   MO.FDsCommonMaterialDialog_onConfirmLoad = function FDsCommonMaterialDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FUiDesktopConsole).hide();
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
   MO.FDsCommonMaterialDialog_onConfirmClick = function FDsCommonMaterialDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 获得属性
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Material');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      xsprite.set('material_guid', o._controlMaterialGuid.get());
      xsprite.set('material_code', o._controlMaterialCode.get());
      // 执行数据处理
      var connection = RConsole.find(FDrTemplateConsole).selectMaterial(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonMaterialDialog_onCancelClick = function FDsCommonMaterialDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterialDialog_construct = function FDsCommonMaterialDialog_construct(){
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
   MO.FDsCommonMaterialDialog_setSpace = function FDsCommonMaterialDialog_setSpace(space){
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
   MO.FDsCommonMaterialDialog_setDisplayLabel = function FDsCommonMaterialDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonMaterialDialog_setContentCode = function FDsCommonMaterialDialog_setContentCode(label){
      this._controlCode.set(label);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonMaterialDialog_setContentLabel = function FDsCommonMaterialDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterialDialog_dispose = function FDsCommonMaterialDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiDialog.dispose.call(o);
   }
}
