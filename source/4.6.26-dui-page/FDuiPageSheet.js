//==========================================================
// <T>多页控件的页控件。</T>
//
//  hPanel<TD>
// ┌--------------------------------------------------------┐
// │                                        hTitlePanel<TD> │
// │┌------------┬------------------------┬------------┐│
// ││hTopL<TD>   │hTop<TD>                │hTopR<TD>   ││
// │├------------┼------------------------┼------------┤│
// ││            │┌--------------------┐│            ││
// ││hLeft<TD>   ││hButton<DIV>        ││hRight<TD>  ││
// ││            │└--------------------┘│            ││
// │├------------┼------------------------┼------------┤│
// ││hBottomL<TD>│hBottom<TD>             │hBottomR<TD>││
// │└------------┴------------------------┴------------┘│
// └--------------------------------------------------------┘
//  hDataPanel<TR>
// ┌--------------------------------------------------------┐
// │hContainer<DIV>                                         │
// └--------------------------------------------------------┘
//
// @class
// @author maocy
// @history 150202
//==========================================================
MO.FDuiPageSheet = function FDuiPageSheet(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout);
   //..........................................................
   // @property
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._formName          = MO.Class.register(o, new MO.APtyString('_formName'));
   o._formLink          = MO.Class.register(o, new MO.APtyString('_formLink'));
   o._formWhere         = MO.Class.register(o, new MO.APtyString('_formWhere'));
   o._formOrder         = MO.Class.register(o, new MO.APtyString('_formOrder'));
   //..........................................................
   // @style
   o._stylePanel        = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTop          = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleTopSelect    = MO.Class.register(o, new MO.AStyle('_styleTopSelect'));
   o._styleLeft         = MO.Class.register(o, new MO.AStyle('_styleLeft'));
   o._styleLeftSelect   = MO.Class.register(o, new MO.AStyle('_styleLeftSelect'));
   o._styleRight        = MO.Class.register(o, new MO.AStyle('_styleRight'));
   o._styleRightSelect  = MO.Class.register(o, new MO.AStyle('_styleRightSelect'));
   o._styleRightPrior   = MO.Class.register(o, new MO.AStyle('_styleRightPrior'));
   o._styleButtom       = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleBottomSelect = MO.Class.register(o, new MO.AStyle('_styleBottomSelect'));
   o._styleButtonText   = MO.Class.register(o, new MO.AStyle('_styleButtonText'));
   o._styleButton       = MO.Class.register(o, new MO.AStyle('_styleButton'));
   o._styleButtonHover  = MO.Class.register(o, new MO.AStyle('_styleButtonHover'));
   o._styleButtonSelect = MO.Class.register(o, new MO.AStyle('_styleButtonSelect'));
   o._styleDataPanel    = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   //..........................................................
   // @attribtue
   o._top               = 0;
   o._pages             = null;
   o._index             = null;
   o._selected          = false;
   o._hasBuilded        = false;
   //..........................................................
   // @listener
   o.lsnsSelect         = null;
   //..........................................................
   // Html
   o._hTopL             = null;
   o._hTop              = null;
   o._hTopR             = null;
   o._hLeft             = null;
   o._hButton           = null;
   o._hIcon             = null;
   o._hText             = null;
   o._hBottomL          = null;
   o._hBottom           = null;
   o._hBottomR          = null;
   o._hRight            = null;
   //..........................................................
   // @event
   o.onBuildPanel       = MO.FDuiPageSheet_onBuildPanel;
   // @event
   o.onButtonEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiPageSheet_onButtonEnter);
   o.onButtonLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiPageSheet_onButtonLeave);
   o.onHeadMouseDown    = MO.Class.register(o, new MO.AEventMouseDown('onHeadMouseDown'), MO.FDuiPageSheet_onHeadMouseDown);
   //..........................................................
   // @method
   o.construct          = MO.FDuiPageSheet_construct;
   // @method
   o.innerSelect        = MO.FDuiPageSheet_innerSelect;
   o.select             = MO.FDuiPageSheet_select;
   o.setVisible         = MO.FDuiPageSheet_setVisible;
   // @method
   o.dispose            = MO.FDuiPageSheet_dispose
   // @method
   o.innerDump          = MO.FDuiPageSheet_innerDump;
   return o;
}

//==========================================================
// <T>建立当前控件的显示底板。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDuiPageSheet_onBuildPanel = function FDuiPageSheet_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = o._hContainer = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
   hPanel.style.width = '100%';
   hPanel.style.height = '100%';
   var hForm = o._hPanelForm = MO.Window.Builder.appendTable(hPanel);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}

//==========================================================
// <T>按键获得热点处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDuiPageSheet_onButtonEnter = function FDuiPageSheet_onButtonEnter(event){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}

//==========================================================
// <T>按键失去热点处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDuiPageSheet_onButtonLeave = function FDuiPageSheet_onButtonLeave(event){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}

//==========================================================
// <T>头部区域鼠标落下处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDuiPageSheet_onHeadMouseDown = function FDuiPageSheet_onHeadMouseDown(event){
   var o = this;
   o._parent.select(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiPageSheet_construct = function FDuiPageSheet_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiLayout.construct.call(o);
   // 设置属性
   o.lsnsSelect = new MO.TListeners();
}

//==========================================================
// <T>内部选中处理。</T>
//
// @method
// @param flag:Boolean 选中标志
//==========================================================
MO.FDuiPageSheet_innerSelect = function FDuiPageSheet_innerSelect(flag){
   var o = this;
   var b = o._parent;
   if(flag && !o._hasBuilded){
      //o.buildChildren();
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeSheet._index - 1 == o._index);
   // Select
   if(o._selected != flag){
      if(flag){
         o.lsnsSelect.process();
      }
      o._selected = flag;
   }
   // 设置样式
   o._hButton.className = flag ? o.styleName('ButtonSelect') : o.styleName('Button');
   o._hTop.className = flag ? o.styleName('TopSelect') : o.styleName('Top');
   o._hLeft.className = flag ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
   o._hBottomL.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottom.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottomR.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hRight.className = flag ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
   // 设置表单可见性
   MO.Window.Html.visibleSet(o._hForm, flag);
}

//==========================================================
// <T>选中处理。</T>
//
// @method
// @param flag:Boolean 选中标志
//==========================================================
MO.FDuiPageSheet_select = function FDuiPageSheet_select(flag){
   var o = this;
   o.innerSelect(flag);
   if(flag){
      o.psRefresh();
      o.psResize();
   }
}

//==========================================================
// <T>设置可见处理。</T>
//
// @method
// @param flag:Boolean 可见标志
//==========================================================
MO.FDuiPageSheet_setVisible = function FDuiPageSheet_setVisible(flag){
   var o = this;
   MO.Window.Html.displaySet(o._hPanel, flag);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiPageSheet_dispose = function FDuiPageSheet_dispose(){
   var o = this;
   o._hButton = MO.Window.Html.free(o._hButton);
   o._hTop = MO.Window.Html.free(o._hTop);
   o._hLeft = MO.Window.Html.free(o._hLeft);
   o._hBottomL = MO.Window.Html.free(o._hBottomL);
   o._hBottom = MO.Window.Html.free(o._hBottom);
   o._hBottomR = MO.Window.Html.free(o._hBottomR);
   o._hRight = MO.Window.Html.free(o._hRight);
   // 父处理
   o.__base.FDuiLayout.dispose.call(o);
}

//==========================================================
// <T>获得运行信息处理。</T>
//
// @method
//==========================================================
MO.FDuiPageSheet_innerDump = function FDuiPageSheet_innerDump(s, l){
   var o = this;
   s.append(l, MO.Class.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
