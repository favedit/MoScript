//==========================================================
// <T>界面工具栏。</T>
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
MO.FDuiToolBar = function FDuiToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   //..........................................................
   // @property EUiAlign 对齐枚举
   o._alignCd          = MO.Class.register(o, new MO.APtyEnum('_alignCd', null, MO.EUiAlign, MO.EUiAlign.Left));
   // @property EUiDirection 方向枚举
   o._directionCd      = MO.Class.register(o, new MO.APtyEnum('_directionCd', null, MO.EUiDirection, MO.EUiDirection.Horizontal));
   // @property EUiMerge 合并枚举
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   //..........................................................
   // @style
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   //..........................................................
   // @html
   o._hLine            = null;
   //..........................................................
   // @event
   o.onBuildPanel      = MO.FDuiToolBar_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   //..........................................................
   // @method
   o.appendChild       = MO.FDuiToolBar_appendChild;
   o.removeChild       = MO.FDuiToolBar_removeChild;
   // @method
   o.dispose           = MO.FDuiToolBar_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiToolBar_onBuildPanel = function FDuiToolBar_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @param control:FDuiControl 子控件
//==========================================================
MO.FDuiToolBar_appendChild = function FDuiToolBar_appendChild(control){
   var o = this;
   // 父处理
   o.__base.FDuiContainer.appendChild.call(o, control);
   // 按键处理
   if(MO.Class.isClass(control, MO.MUiToolButton)){
      var h = o._hPanel;
      var hl = o._hLine;
      // 横向排布
      if(o._directionCd == MO.EUiDirection.Horizontal){
         if(!hl){
            hl = o._hLine = MO.Window.Builder.appendTableRow(h);
         }
      }
      // 纵向排布
      if(o._directionCd == MO.EUiDirection.Vertical){
         hl = o._hLine = MO.Window.Builder.appendTableRow(h);
      }
      // 建立按键
      var hc = MO.Window.Builder.appendTableCell(hl, o.styleName('ButtonPanel'));
      //hc._hParentLine = hl;
      control._hPanelCell = hc;
      control.setPanel(hc);
   }
}

//==========================================================
// <T>移除一个子控件。</T>
//
// @method
// @param p:control:FDuiControl 子控件
//==========================================================
MO.FDuiToolBar_removeChild = function FDuiToolBar_removeChild(p){
   var o = this;
   // 按键处理
   if(MO.Class.isClass(p, MO.MUiToolButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParent = null;
      p._hParentLine = null;
   }
   // 父处理
   o.__base.FDuiContainer.removeChild.call(o, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiToolBar_dispose = function FDuiToolBar_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
