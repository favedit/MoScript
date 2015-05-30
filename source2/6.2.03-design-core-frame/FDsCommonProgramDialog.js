with(MO){
   //==========================================================
   // <T>设计材质对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150508
   //==========================================================
   MO.FDsCommonProgramDialog = function FDsCommonProgramDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.ProgramDialog';
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
      o.onBuilded             = FDsCommonProgramDialog_onBuilded;
      // @event
      o.onConfirmClick        = FDsCommonProgramDialog_onConfirmClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonProgramDialog_construct;
      // @method
      o.setProgramCode        = FDsCommonProgramDialog_setProgramCode;
      o.setVertexSource       = FDsCommonProgramDialog_setVertexSource;
      o.setFragmentSource     = FDsCommonProgramDialog_setFragmentSource;
      // @method
      o.dispose               = FDsCommonProgramDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonProgramDialog_onBuilded = function FDsCommonProgramDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
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
   MO.FDsCommonProgramDialog_onConfirmClick = function FDsCommonProgramDialog_onConfirmClick(event){
      var o = this;
      // 隐藏窗口
      o.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonProgramDialog_construct = function FDsCommonProgramDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FUiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置程序代码。</T>
   //
   // @method
   // @param value:String 内容
   //==========================================================
   MO.FDsCommonProgramDialog_setProgramCode = function FDsCommonProgramDialog_setProgramCode(value){
      this._controlCode.set(value);
   }

   //==========================================================
   // <T>设置顶点代码。</T>
   //
   // @method
   // @param source:String 代码
   // @param targetSource:String 目标代码
   //==========================================================
   MO.FDsCommonProgramDialog_setVertexSource = function FDsCommonProgramDialog_setVertexSource(source, targetSource){
      var o = this;
      o._controlVertexSource.set(source);
      o._controlVertexTargetSource.set(targetSource);
   }

   //==========================================================
   // <T>设置像素代码。</T>
   //
   // @method
   // @param source:String 代码
   // @param targetSource:String 目标代码
   //==========================================================
   MO.FDsCommonProgramDialog_setFragmentSource = function FDsCommonProgramDialog_setFragmentSource(source, targetSource){
      var o = this;
      o._controlFragmentSource.set(source);
      o._controlFragmentTargetSource.set(targetSource);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonProgramDialog_dispose = function FDsCommonProgramDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiDialog.dispose.call(o);
   }
}
