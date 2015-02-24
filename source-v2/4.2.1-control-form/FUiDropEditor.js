//==========================================================
// <T>下拉编辑器。</T>
//
//  hPanel<DIV>
// ┌--------------------------------------------------------┐
// │ border<TBorder>                                        │
// │┌----------------------------------------------------┐│
// ││ hDropForm<TABLE>                                   ││
// ││┌------------------------------------------------┐││
// │││hDropPanel<TD>                                  │││
// ││├------------------------------------------------┤││
// │││hButtonPanel<TD>                                │││
// ││└------------------------------------------------┘││
// │└----------------------------------------------------┘│
// └--------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
function FUiDropEditor(o){
   o = RClass.inherits(this, o, FUiEditor, MUiShadow);
   //..........................................................
   // @style
   o._styleDropForm    = RClass.register(o, new AStyle('_styleDropForm'));
   o._styleDropPanel   = RClass.register(o, new AStyle('_styleDropPanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   //..........................................................
   // @attribute
   o.__minHeight       = 300;
   o.__minWidth        = null;
   o._border           = null;
   //..........................................................
   // @html
   o._hDropForm        = null;
   o._hDropPanel       = null;
   o._hButtonPanel     = null;
   //..........................................................
   // @event
   o.onBuildDrop       = RMethod.virtual(o, 'onBuildDrop');
   o.onBuildButton     = RMethod.empty;
   o.onBuild           = FUiDropEditor_onBuild;
   o.onDropMouseDown   = RClass.register(o, new AEventMouseDown('onDropMouseDown'));
   o.onDropMouseUp     = RClass.register(o, new AEventMouseUp('onDropMouseUp'));
   //..........................................................
   // @method
   o.panel             = FUiDropEditor_panel;
   o.hide              = FUiDropEditor_hide;
   o.dispose           = FUiDropEditor_dispose;
   return o;
}

//==========================================================
// <T>建立底板。</T>
//
// @method
//==========================================================
function FUiDropEditor_onBuild(e){
   var o = this;
   o.__base.FUiEditor.onBuild.call(o, e)
   // 建立表单
   var hf = o._hDropForm = RBuilder.appendTable(o._hPanel);
   hf.className = o.styleName('DropForm');
   var hdp = o._hDropPanel = hf.insertRow().insertCell();
   hdp.className = o.styleName('DropPanel');
   var hbp = o._hButtonPanel = hf.insertRow().insertCell();
   hbp.className = o.styleName('ButtonPanel');
   // 建立下拉内容
   o.onBuildDrop();
   // 建立按键
   o.onBuildButton();
   return EEventStatus.Stop;
}

//==========================================================
// <T>获得底板。</T>
//
// @method
//==========================================================
function FUiDropEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hPanel;
   }
   return o.__base.FUiEditor.panel.call(o, type);
}

//==========================================================
// <T>隐藏对象。</T>
//
// @method
//==========================================================
function FUiDropEditor_hide(){
   var o = this;
   o.__base.FUiEditor.hide.call(o);
   o.__base.MUiShadow.hide.call(o);
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FUiDropEditor_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   o._hDropForm = null;
   o._hDropPanel = null;
   o._hButtonPanel = null;
}
