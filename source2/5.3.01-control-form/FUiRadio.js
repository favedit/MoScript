with(MO){
   //==========================================================
   // <T>单选框控件。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FUiRadio = function FUiRadio(o){
      o = RClass.inherits(this, o, FEditControl);
      //..........................................................
      // @property
      o._groupName       = RClass.register(o, new APtyString('_groupName'));
      //..........................................................
      // @style
      o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
      //..........................................................
      // @html
      o._hInput          = null;
      //..........................................................
      // @event
      o.onBuildEditValue = FUiRadio_onBuildEditValue;
      //..........................................................
      // @attribute
      //o._editChecked = RClass.register(o, new APtyBoolean('_editChecked'), false);
      //..........................................................
      // @event
      //o.onClick      = RMethod.emptyCall;
      //o.onDataClick  = RMethod.emptyCall;
      //..........................................................
      // @method
      //o.clearValue   = FUiRadio_clearValue;
      //o.resetValue   = FUiRadio_resetValue;
      //o.saveValue    = FUiRadio_saveValue;
      //o.text         = FUiRadio_text;
      //o.setText      = FUiRadio_setText;
      //o.refreshStyle = FUiRadio_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiRadio_onBuildEditValue = function FUiRadio_onBuildEditValue(p){
      var o = this;
      // 建立编辑控件
      o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
   }









   //==========================================================
   // <T>清除数据内容。</T>
   //
   // @method
   //==========================================================
   MO.FUiRadio_clearValue = function FUiRadio_clearValue(){
      this.hEdit.checked = false;
   }

   //==========================================================
   // <T>重置数据内容。</T>
   //
   // @method
   //==========================================================
   MO.FUiRadio_resetValue = function FUiRadio_resetValue(){
      this.hEdit.checked = this._editChecked;
   }

   //==========================================================
   // <T>获得文本内容。</T>
   //
   // @method
   // @param vs:values:TAttributes 数据集合
   //==========================================================
   MO.FUiRadio_saveValue = function FUiRadio_saveValue(vs){
      var o = this;
      if(o.hEdit.checked){
         vs.set(o.dataName, o.dataDefault);
      }
   }

   //==========================================================
   // <T>获得文本内容。</T>
   //
   // @method
   // @return 文本内容
   //==========================================================
   MO.FUiRadio_text = function FUiRadio_text(){
      return this.hEdit.checked ? this.dataDefault : '';
   }

   //==========================================================
   // <T>设置文本内容。</T>
   //
   // @method
   // @param t:text:String 文本内容
   //==========================================================
   MO.FUiRadio_setText = function FUiRadio_setText(t){
      this.hEdit.checked = (this.dataDefault == t);
   }

   //==========================================================
   // <T>刷新样式。</T>
   //
   // @method
   //==========================================================
   MO.FUiRadio_refreshStyle = function FUiRadio_refreshStyle(){
      var o = this;
      var h = o.panel(EPanel.Edit);
      h.disabled = !o._editable;
      h.style.cursor = o._editable? 'hand':'normal';
   }
}
