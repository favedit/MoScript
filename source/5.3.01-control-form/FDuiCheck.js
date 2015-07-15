with(MO){
   //==========================================================
   // <T>复选框。</T>
   //
   // @class
   // @author maocy
   // @version 150216
   //==========================================================
   MO.FUiCheck = function FUiCheck(o){
      o = RClass.inherits(this, o, FUiEditControl, MPropertyCheck, MListenerDataChanged);
      //..........................................................
      // @style
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      //..........................................................
      // @html
      o._hInput          = null;
      //..........................................................
      // @event
      o.onBuildEditValue = FUiCheck_onBuildEditValue;
      o.onInputClick     = RClass.register(o, new AEventClick('onInputClick'), FUiCheck_onInputClick);
      //..........................................................
      // @process
      o.oeSaveValue      = FUiCheck_oeSaveValue;
      //..........................................................
      // @method
      o.construct        = FUiCheck_construct;
      // @method
      o.formatLoad       = FUiCheck_formatLoad;
      o.formatSave       = FUiCheck_formatSave;
      // @method
      o.get              = FUiCheck_get;
      o.set              = FUiCheck_set;
      // @method
      o.refreshValue     = FUiCheck_refreshValue;
      o.refreshStyle     = FUiCheck_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiCheck_onBuildEditValue = function FUiCheck_onBuildEditValue(p){
      var o = this;
      // 建立编辑控件
      var h = o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
      o.attachEvent('onInputClick', h);
   }

   //==========================================================
   // <T>鼠标单击事件。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiCheck_onInputClick = function FUiCheck_onInputClick(p){
      this.refreshValue();
   }

   //==========================================================
   // <T>存储内容。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiCheck_oeSaveValue = function FUiCheck_oeSaveValue(e){
      var o = this;
      // 数据准备模式
      if(EStore.Prepare == e.store){
         if(RBoolean.isTrue(o.reget())){
            e.values.set(o.dataName, EBoolean.True);
         }
         return EEventStatus.Stop;
      }
      return o.base.FUiEditControl.oeSaveValue.call(o, e);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiCheck_construct = function FUiCheck_construct(){
      var o = this;
      // 父处理
      o.__base.FUiEditControl.construct.call(o);
      // 设置属性
      o._editSize.set(60, 20);
   }

   //==========================================================
   // <T>格式化控件数据到存储内容。</T>
   //
   // @method
   // @param value:String 控件数据
   // @return Object 存储内容
   //==========================================================
   MO.FUiCheck_formatLoad = function FUiCheck_formatLoad(value){
      var o = this;
      return (value == o._valueTrue);
   }

   //==========================================================
   // <T>格式化存储内容到控件数据。</T>
   //
   // @method
   // @param value:Object 控件数据
   // @return String 存储内容
   //==========================================================
   MO.FUiCheck_formatSave = function FUiCheck_formatSave(value){
      var o = this;
      return RBoolean.toString(value, o._valueTrue, o._valueFalse);
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return String 数据
   //==========================================================
   MO.FUiCheck_get = function FUiCheck_get(){
      return this._hInput.checked;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param value:String 数据
   //==========================================================
   MO.FUiCheck_set = function FUiCheck_set(value){
      this._hInput.checked = value;
   }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   MO.FUiCheck_refreshValue = function FUiCheck_refreshValue(){
      var o = this;
      // 内容改变通知
      o.processDataChangedListener(o);
   }

   //==========================================================
   // <T>根据设置信息，刷新样式。</T>
   //
   // @method
   //==========================================================
   MO.FUiCheck_refreshStyle = function FUiCheck_refreshStyle(){
      var o = this;
      var h = o.panel(EPanel.Edit);
      h.disabled = !o._editable;
      if(!o._editable){
         o.hEdit.style.cursor = 'normal';
      }
   }
}
