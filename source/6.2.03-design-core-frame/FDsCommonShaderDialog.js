with(MO){
   //==========================================================
   // <T>设计材质对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150508
   //==========================================================
   MO.FDsCommonShaderDialog = function FDsCommonShaderDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.ShaderDialog';
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
      o.onBuilded             = FDsCommonShaderDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsCommonShaderDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonShaderDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonShaderDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonShaderDialog_construct;
      // @method
      o.setSpace              = FDsCommonShaderDialog_setSpace;
      o.setDisplayLabel       = FDsCommonShaderDialog_setDisplayLabel;
      o.setVertexSource       = FDsCommonShaderDialog_setVertexSource;
      o.setFragmentSource     = FDsCommonShaderDialog_setFragmentSource;
      // @method
      o.dispose               = FDsCommonShaderDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonShaderDialog_onBuilded = function FDsCommonShaderDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      //..........................................................
      // 设置属性
      //o._controlSpaceGuid.setEditAble(false);
      //o._controlSpaceLabel.setEditAble(false);
      //..........................................................
      // 注册事件
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonShaderDialog_onConfirmClick = function FDsCommonShaderDialog_onConfirmClick(event){
      var o = this;
      // 隐藏窗口
      o.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonShaderDialog_construct = function FDsCommonShaderDialog_construct(){
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
   MO.FDsCommonShaderDialog_setSpace = function FDsCommonShaderDialog_setSpace(space){
      var o = this;
      //var resource = space.resource();
      //o._controlSpaceGuid.set(resource.guid());
      //o._controlSpaceLabel.set(resource.makeLabel());
   }

   //==========================================================
   // <T>设置显示标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonShaderDialog_setDisplayLabel = function FDsCommonShaderDialog_setDisplayLabel(label){
      //this._controlDisplayLabel.set(label);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonShaderDialog_setVertexSource = function FDsCommonShaderDialog_setVertexSource(label){
      //this._controlCode.set(label);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonShaderDialog_setFragmentSource = function FDsCommonShaderDialog_setFragmentSource(label){
      //this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonShaderDialog_dispose = function FDsCommonShaderDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
