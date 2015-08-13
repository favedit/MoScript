with(MO){
   //==========================================================
   // <T>设计通用材质引用对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150429
   //==========================================================
   MO.FDsCommonMaterialReferDialog = function FDsCommonMaterialReferDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName      = 'resource.common.dialog.MaterialReferDialog';
      //..........................................................
      // @attribute
      o._displayModeCd  = null;
      // @attribute
      o._controlGuid    = null;
      o._controlCode    = null;
      o._controlLabel   = null;
      o._controlConfirm = null;
      o._controlCancel  = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsCommonMaterialReferDialog_onBuilded;
      // @event
      o.onConfirmLoad   = FDsCommonMaterialReferDialog_onConfirmLoad;
      o.onConfirmClick  = FDsCommonMaterialReferDialog_onConfirmClick;
      o.onCancelClick   = FDsCommonMaterialReferDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct       = FDsCommonMaterialReferDialog_construct;
      // @method
      o.setContentGuid  = FDsCommonMaterialReferDialog_setContentGuid;
      o.setContentCode  = FDsCommonMaterialReferDialog_setContentCode;
      o.setContentLabel = FDsCommonMaterialReferDialog_setContentLabel;
      // @method
      o.dispose         = FDsCommonMaterialReferDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonMaterialReferDialog_onBuilded = function FDsCommonMaterialReferDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
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
   MO.FDsCommonMaterialReferDialog_onConfirmLoad = function FDsCommonMaterialReferDialog_onConfirmLoad(event){
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
   MO.FDsCommonMaterialReferDialog_onConfirmClick = function FDsCommonMaterialReferDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      //MO.Console.find(FDuiDesktopConsole).showUploading();
      // 获得属性
      o._materialRefer._guid = o._controlGuid.get();
      o.hide();
      // 执行数据处理
      //var connection = MO.Console.find(FDrTemplateConsole).createDisplay(xaction);
      //connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonMaterialReferDialog_onCancelClick = function FDsCommonMaterialReferDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterialReferDialog_construct = function FDsCommonMaterialReferDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置内容唯一码。</T>
   //
   // @method
   // @param guid:String 唯一码
   //==========================================================
   MO.FDsCommonMaterialReferDialog_setContentGuid = function FDsCommonMaterialReferDialog_setContentGuid(guid){
      this._controlGuid.set(guid);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonMaterialReferDialog_setContentCode = function FDsCommonMaterialReferDialog_setContentCode(code){
      this._controlCode.set(code);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonMaterialReferDialog_setContentLabel = function FDsCommonMaterialReferDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterialReferDialog_dispose = function FDsCommonMaterialReferDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
