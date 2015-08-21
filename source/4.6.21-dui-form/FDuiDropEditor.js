//==========================================================
// <T>下拉编辑器。</T>
//
//  hPanel<DIV>
// ┌----------------------------------------------------┐
// │ hDropForm<TABLE>                                   │
// │┌------------------------------------------------┐│
// ││hDropPanel<TD>                                  ││
// │├------------------------------------------------┤│
// ││hButtonPanel<TD>                                ││
// │└------------------------------------------------┘│
// └----------------------------------------------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.FDuiDropEditor = function FDuiDropEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditor, MO.MDuiShadow);
   //..........................................................
   // @style
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleDropForm    = MO.Class.register(o, new MO.AStyle('_styleDropForm'));
   o._styleDropPanel   = MO.Class.register(o, new MO.AStyle('_styleDropPanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   //..........................................................
   // @attribute
   o._minWidth         = 160;
   o._minHeight        = 300;
   //..........................................................
   // @html
   o._hDropForm        = null;
   o._hDropPanel       = null;
   o._hButtonPanel     = null;
   //..........................................................
   // @event
   o.onBuildDrop       = MO.Method.virtual(o, 'onBuildDrop');
   o.onBuildButton     = MO.Method.empty;
   o.onBuild           = MO.FDuiDropEditor_onBuild;
   o.onDropMouseDown   = MO.Class.register(o, new MO.AEventMouseDown('onDropMouseDown'));
   o.onDropMouseUp     = MO.Class.register(o, new MO.AEventMouseUp('onDropMouseUp'));
   //..........................................................
   // @method
   o.panel             = MO.FDuiDropEditor_panel;
   o.setVisible        = MO.FDuiDropEditor_setVisible;
   // @method
   o.dispose           = MO.FDuiDropEditor_dispose;
   return o;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiDropEditor_onBuild = function FDuiDropEditor_onBuild(p){
   var o = this;
   o.__base.FDuiEditor.onBuild.call(o, p);
   // 设置样式
   var h = o._hPanel;
   h.className = o.styleName('Panel');
   // 建立表单
   var hf = o._hDropForm = MO.Window.Builder.appendTable(h, o.styleName('DropForm'));
   o._hDropPanel = MO.Window.Builder.appendTableRowCell(hf, o.styleName('DropPanel'));
   o._hButtonPanel = MO.Window.Builder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
   // 建立下拉内容
   o.onBuildDrop();
   // 建立按键
   o.onBuildButton();
}

//==========================================================
// <T>获得底板。</T>
//
// @method
// @param panelCd:EPanel 底板类型
//==========================================================
MO.FDuiDropEditor_panel = function FDuiDropEditor_panel(panelCd){
   var o = this;
   if(panelCd == MO.EPanel.Shadow){
      return o.hPanel;
   }
   return o.__base.FDuiEditor.panel.call(o, panelCd);
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param p:visible:Boolean 是否显示
//==========================================================
MO.FDuiDropEditor_setVisible = function FDuiDropEditor_setVisible(p){
   var o = this;
   // 页面元素显示和隐藏
   var h = o._hPanel;
   var hd = o._hPanel.ownerDocument;
   if(p){
      hd.body.appendChild(h);
   }else{
      hd.body.removeChild(h);
   }
   o.__base.FDuiEditor.setVisible.call(o, p);
   //o.__base.MDuiShadow.setVisible.call(o, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiDropEditor_dispose = function FDuiDropEditor_dispose(){
   var o = this;
   o._hButtonPanel = MO.Window.Html.free(o._hButtonPanel);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   o._hDropForm = MO.Window.Html.free(o._hDropForm);
   o.__base.FControl.dispose.call(o);
}
