with(MO){
   //==========================================================
   // <T>设计显示层对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150430
   //==========================================================
   MO.FDsCommonLayerDialog = function FDsCommonLayerDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.LayerDialog';
      //..........................................................
      // @attribute
      o._displayModeCd        = null;
      // @attribute
      o._controlSpaceGuid     = null;
      o._controlSpaceLabel    = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsCommonLayerDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsCommonLayerDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonLayerDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonLayerDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonLayerDialog_construct;
      // @method
      o.setSpace              = FDsCommonLayerDialog_setSpace;
      o.setDisplayLabel       = FDsCommonLayerDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonLayerDialog_setContentCode;
      o.setContentLabel       = FDsCommonLayerDialog_setContentLabel;
      // @method
      o.dispose               = FDsCommonLayerDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonLayerDialog_onBuilded = function FDsCommonLayerDialog_onBuilded(p){
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
   MO.FDsCommonLayerDialog_onConfirmLoad = function FDsCommonLayerDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      MO.Console.find(FDuiDesktopConsole).hide();
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
   MO.FDsCommonLayerDialog_onConfirmClick = function FDsCommonLayerDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showUploading();
      // 获得属性
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Layer');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      // 执行数据处理
      var connection = MO.Console.find(FDrSceneConsole).createLayer(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonLayerDialog_onCancelClick = function FDsCommonLayerDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonLayerDialog_construct = function FDsCommonLayerDialog_construct(){
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
   MO.FDsCommonLayerDialog_setSpace = function FDsCommonLayerDialog_setSpace(space){
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
   MO.FDsCommonLayerDialog_setDisplayLabel = function FDsCommonLayerDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonLayerDialog_setContentCode = function FDsCommonLayerDialog_setContentCode(label){
      this._controlCode.set(label);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonLayerDialog_setContentLabel = function FDsCommonLayerDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonLayerDialog_dispose = function FDsCommonLayerDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
