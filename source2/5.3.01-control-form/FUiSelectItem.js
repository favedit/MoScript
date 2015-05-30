with(MO){
   //==========================================================
   // <T>Select下拉列表中每个选项的控件</T>
   // <P>支持控件多选</P>
   //
   //  hPanel(TR)
   // ┌--------------┬---------------------------------┬----------------┐
   // │hIconPanel<TD>│hLabelPanel<TD>                  │hNotePanel<TD>  │
   // │hIcon<IMG>    │                                 │                │
   // └--------------┴---------------------------------┴----------------┘
   //
   // @class
   // @author maocy
   // @version 150224
   //==========================================================
   MO.FUiSelectItem = function FUiSelectItem(o){
      o = RClass.inherits(this, o, FUiControl, MListenerClick);
      //..........................................................
      // @property
      o._icon             = RClass.register(o, new APtyString('_icon'));
      o._note             = RClass.register(o, new APtyString('_note'));
      o._dataValue        = RClass.register(o, new APtyString('_dataValue'));
      //..........................................................
      // @style
      o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
      o._styleIconChecked = RClass.register(o, new AStyle('_styleIcon'));
      o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
      o._styleNote        = RClass.register(o, new AStyle('_styleNote'));
      //..........................................................
      // @attribute
      o._checked          = false;
      //..........................................................
      // @html
      o._hIconPanel       = null;
      o._hIcon            = null;
      o._hLabelPanel      = null;
      o._hNotePanel       = null;
      //..........................................................
      // @event
      o.onBuildPanel      = FUiSelectItem_onBuildPanel;
      o.onBuild           = FUiSelectItem_onBuild;
      o.onEnter           = FUiSelectItem_onEnter;
      o.onLeave           = FUiSelectItem_onLeave;
      o.onMouseDown       = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiSelectItem_onMouseDown);
      //..........................................................
      // @method
      o.setChecked        = FUiSelectItem_setChecked;
      o.set               = FUiSelectItem_set;
      // @method
      o.dispose           = FUiSelectItem_dispose;
      return o;
   }

   //==========================================================
   // <T>建立控件面板。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiSelectItem_onBuildPanel = function FUiSelectItem_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName("Normal"));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiSelectItem_onBuild = function FUiSelectItem_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      // 设置面板
      var h = o._hPanel;
      o.attachEvent('onMouseDown', h);
      // 创建图标
      var hp = o._hIconPanel = RBuilder.appendTableCell(h, o.styleName("Icon"));
      hp.width = 18;
      hp.align = 'center';
      //if(o._icon){
      //}
      // 创建文本
      var hp = o._hLabelPanel = RBuilder.appendTableCell(h, o.styleName("Label"));
      if(o._label){
         hp.innerHTML = o._label;
      }else{
         hp.innerHTML = '&nbsp;';
      }
      // 创建备注
      o._hNotePanel = RBuilder.appendTableCell(h, o.styleName("Note"));
   }

   //==========================================================
   // <T>响应鼠标进入事件</T>
   //
   // @method
   //==========================================================
   MO.FUiSelectItem_onEnter = function FUiSelectItem_onEnter(){
      var o = this;
      o.__base.FUiControl.onEnter.call(o);
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }

   //==========================================================
   // <T>响应鼠标离开事件</T>
   //
   // @method
   //==========================================================
   MO.FUiSelectItem_onLeave = function FUiSelectItem_onLeave(){
      var o = this;
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
      o.__base.FUiControl.onLeave.call(o);
   }

   //==========================================================
   // <T>响应鼠标单击事件</T>
   //
   // @method
   //==========================================================
   MO.FUiSelectItem_onMouseDown = function FUiSelectItem_onMouseDown(){
      var o = this;
      o.processClickListener(o);
      /*var o = this;
      o._checked = RBool.isTrue(o._checked) ? EBool.False : EBool.True;
      RBool.isTrue(o._checked) ? o.setChecked(true) : o.setChecked(false); 
      var p = o.parent;
      p.hEdit._value = o._label;
      p.editStatus = EEditStatus.Ok;
      p.selectItem = o;
      p.inEdit = false;
      p.blur();*/
   }

   //==========================================================
   // <T>设置选中状态。</T>
   //
   // @method
   //==========================================================
   MO.FUiSelectItem_setChecked = function FUiSelectItem_setChecked(p){
      var o = this;
      o._checked = p;
      if(o._hIcon){
         o._hIcon.style.display = p ? 'block' : 'none';
      }else{
         o._hIconPanel.innerHTML = p ? 'O' : '';
      }
      o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
   }

   //==========================================================
   // <T>设置数据值</T>
   //
   // @method
   //==========================================================
   MO.FUiSelectItem_set = function FUiSelectItem_set(icon, label, value, note){
      var o = this;
      o._icon = RString.nvl(icon);
      if(!RString.isEmpty(o._icon)){
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
      }
      o._label = RString.nvl(label);
      o._value = RString.nvl(value);
      o._note = RString.nvl(note);
      o._hLabelPanel.innerText = o._label;
      o._hNotePanel.innerText = o._note;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiSelectItem_dispose = function FUiSelectItem_dispose(){
      var o = this;
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o._hNotePanel = RHtml.free(o._hNotePanel);
      o.__base.FUiControl.dispose.call(o);
   }
}
