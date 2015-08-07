with(MO){
   //==========================================================
   // <T>列表项控件。</T>
   //
   //  hLine<TR>
   // ┌--------------┬-----------------------┐
   // │┌----------┐│┌-------------------┐│
   // ││hIcon<IMG>│││hLabel<SPAN>       ││
   // │└----------┘│└-------------------┘│
   // └--------------┴-----------------------┘
   //
   // @class
   // @author maocy
   // @history 150224
   //==========================================================
   MO.FDuiListItem = function FDuiListItem(o){
      o = RClass.inherits(this, o, FDuiControl);
      //..........................................................
      // @style
      o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
      o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
      o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
      o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
      //..........................................................
      // @attribute
      o._checked        = false;
      //..........................................................
      // @html
      o._hPanel         = null;
      o._hIconPanel     = null;
      o._hIcon          = null;
      o._hLabel         = null;
      //..........................................................
      // @event
      o.onBuildPanel    = FDuiListItem_onBuildPanel;
      o.onBuild         = FDuiListItem_onBuild;
      o.onEnter         = FDuiListItem_onEnter;
      o.onLeave         = FDuiListItem_onLeave;
      o.onClick         = RClass.register(o, new AEventClick('onClick'), FDuiListItem_onClick);
      //..........................................................
      // @method
      o.label           = FDuiListItem_label;
      o.setLabel        = FDuiListItem_setLabel;
      o.setChecked      = FDuiListItem_setChecked;
      // @method
      o.dispose         = FDuiListItem_dispose;
      return o;
   }

   //==========================================================
   // <T>建立控件面板。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiListItem_onBuildPanel = function FDuiListItem_onBuildPanel(p){
      var o = this;
      // 建立编辑控件
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Normal'));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiListItem_onBuild = function FDuiListItem_onBuild(p){
      var o = this;
      // 建立控件
      o.__base.FDuiControl.onBuild.call(o, p);
      var h = o._hPanel;
      //..........................................................
      // 建立图标区域
      o._hIconPanel = RBuilder.appendTableCell(h, o.styleName('IconPanel'))
      if(o._icon){
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
      }
      // 建立文本区域
      o._hLabel = RBuilder.appendTableCell(h, o.styleName('Label'));
      if(o._label){
         o.setLabel(o._label);
      }
      // 关联事件
      o.attachEvent('onClick', h);
   }

   //==========================================================
   // <T>响应鼠标进入事件</T>
   //
   // @method
   //==========================================================
   MO.FDuiListItem_onEnter = function FDuiListItem_onEnter(){
      var o = this;
      o.__base.FDuiControl.onEnter.call(o);
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }

   //==========================================================
   // <T>响应鼠标离开事件</T>
   //
   // @method
   //==========================================================
   MO.FDuiListItem_onLeave = function FDuiListItem_onLeave(){
      var o = this;
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
      o.__base.FDuiControl.onLeave.call(o);
   }

   //==========================================================
   // <T>点击事件处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件信息
   //==========================================================
   MO.FDuiListItem_onClick = function FDuiListItem_onClick(p){
      var o = this;
      o._parent.clickItem(o);
   }

   //==========================================================
   // <T>获得标签。</T>
   //
   // @method
   // @return String 标签内容
   //==========================================================
   MO.FDuiListItem_label = function FDuiListItem_label(p){
      return this._label;
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:value:String 标签内容
   //==========================================================
   MO.FDuiListItem_setLabel = function FDuiListItem_setLabel(p){
      var o = this;
      o._label = p;
      o._hLabel.innerHTML = RString.nvl(p);
   }

   //==========================================================
   // <T>设置选中状态。</T>
   //
   // @method
   //==========================================================
   MO.FDuiListItem_setChecked = function FDuiListItem_setChecked(p){
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
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiListItem_dispose = function FDuiListItem_dispose(){
      var o = this;
      o._hPanel = RHtml.free(o._hPanel);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hLabel = RHtml.free(o._hLabel);
      o.__base.FDuiControl.dispose.call(o);
   }
}
