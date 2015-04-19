//==========================================================
// <T>界面菜单栏。</T>
//
//  hPanel<TABLE>
// ┌-----------------┬-----------------┬-----------------┬-----------------┐
// │hButtonPanel<TD> │hButtonPanel<TD> │hButtonPanel<TD> │...              │hLine<TR>
// │(Button1)        │(Button2)        │(Button3)        │                 │
// └-----------------┴-----------------┴-----------------┴-----------------┘
//
// @author maocy
// @history 150121
//==========================================================
function FUiMenuBar(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   //..........................................................
   // @property EUiMerge 合并枚举
   o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
   //..........................................................
   // @style
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   //..........................................................
   // @html
   o._hLine            = null;
   //..........................................................
   // @event
   o.onBuildPanel      = FUiMenuBar_onBuildPanel;
   o.onEnter           = RMethod.empty;
   o.onLeave           = RMethod.empty;
   //..........................................................
   // @method
   o.appendChild       = FUiMenuBar_appendChild;
   o.removeChild       = FUiMenuBar_removeChild;
   // @method
   o.dispose           = FUiMenuBar_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiMenuBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(h);
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @param p:control:FUiControl 子控件
//==========================================================
function FUiMenuBar_appendChild(p){
   var o = this;
   // 父处理
   o.__base.FUiContainer.appendChild.call(o, p);
   // 按键处理
   if(RClass.isClass(p, FUiMenuButton)){
      var hl = o._hLine;
      // 建立按键
      var hc = RBuilder.appendTableCell(hl, o.styleName('ButtonPanel'));
      hc._hParentLine = hl;
      p.setPanel(hc);
   }
}

//==========================================================
// <T>移除一个子控件。</T>
//
// @method
// @param p:control:FUiControl 子控件
//==========================================================
function FUiMenuBar_removeChild(p){
   var o = this;
   // 按键处理
   if(RClass.isClass(p, FUiMenuButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParentLine = null;
      p._hParent = null;
   }
   // 父处理
   o.__base.FUiContainer.removeChild.call(o, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiMenuBar_dispose(){
   var o = this;
   o._hLine = RHtml.free(o._hLine);
   o.__base.FUiContainer.dispose.call(o);
}
