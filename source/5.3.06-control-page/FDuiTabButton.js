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
//
// @class
// @author maocy
// @history 150202
//==========================================================
MO.FDuiTabButton = function FDuiTabButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MListenerClick);
   //..........................................................
   // @property
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._formName          = MO.Class.register(o, new MO.APtyString('_formName'));
   o._formLink          = MO.Class.register(o, new MO.APtyString('_formLink'));
   o._formWhere         = MO.Class.register(o, new MO.APtyString('_formWhere'));
   o._formOrder         = MO.Class.register(o, new MO.APtyString('_formOrder'));
   //..........................................................
   // @style
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
   o.onBuildPanel       = MO.FDuiTabButton_onBuildPanel;
   // @event
   o.onButtonEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiTabButton_onButtonEnter);
   o.onButtonLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiTabButton_onButtonLeave);
   o.onButtonClick      = MO.Class.register(o, new MO.AEventClick('onButtonClick'), MO.FDuiTabButton_onButtonClick);
   //..........................................................
   // @method
   o.construct          = MO.FDuiTabButton_construct;
   // @method
   o.innerSelect        = MO.FDuiTabButton_innerSelect;
   o.select             = MO.FDuiTabButton_select;
   o.setVisible         = MO.FDuiTabButton_setVisible;
   // @method
   o.doClick            = MO.FDuiTabButton_doClick;
   // @method
   o.dispose            = MO.FDuiTabButton_dispose
   // @method
   o.innerDump          = MO.FDuiTabButton_innerDump;
   return o;
}

//==========================================================
// <T>建立当前控件的显示底板。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiTabButton_onBuildPanel = function FDuiTabButton_onBuildPanel(p){
   var o = this;
   var hp = o._hContainer = o._hPanel = MO.Window.Builder.createDiv(p);
   hp.width = '100%';
   hp.height = '100%';
}

//==========================================================
// <T>按键获得热点处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiTabButton_onButtonEnter = function FDuiTabButton_onButtonEnter(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}

//==========================================================
// <T>按键失去热点处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiTabButton_onButtonLeave = function FDuiTabButton_onButtonLeave(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}

//==========================================================
// <T>头部区域鼠标落下处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiTabButton_onButtonClick = function FDuiTabButton_onButtonClick(p){
   this.doClick();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiTabButton_construct = function FDuiTabButton_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiControl.construct.call(o);
   // 设置属性
   o.lsnsSelect = new MO.TListeners();
}

//==========================================================
// <T>内部选中处理。</T>
//
// @method
// @param p:flag:Boolean 选中标志
//==========================================================
MO.FDuiTabButton_innerSelect = function FDuiTabButton_innerSelect(p){
   var o = this;
   var b = o._parent;
   if(p && !o._hasBuilded){
      //o.buildChildren();
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeButton._index - 1 == o._index);
   // Select
   if(o._selected != p){
      if(p){
         o.lsnsSelect.process();
      }
      o._selected = p;
   }
   // Style
   o._hButton.className = p ? o.styleName('ButtonSelect') : o.styleName('Button');
   o._hTop.className = p ? o.styleName('TopSelect') : o.styleName('Top');
   o._hLeft.className = p ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
   o._hBottomL.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottom.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottomR.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hRight.className = p ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
}

//==========================================================
// <T>选中处理。</T>
//
// @method
// @param p:flag:Boolean 选中标志
//==========================================================
MO.FDuiTabButton_select = function FDuiTabButton_select(p){
   var o = this;
   o.innerSelect(p);
   if(p){
      o.psRefresh();
      o.psResize();
   }
}

//==========================================================
// <T>设置可见处理。</T>
//
// @method
// @param p:flag:Boolean 可见标志
//==========================================================
MO.FDuiTabButton_setVisible = function FDuiTabButton_setVisible(p){
   var o = this;
   MO.Window.Html.displaySet(o._hPanel, p);
}

//==========================================================
// <T>点击处理。</T>
//
// @method
//==========================================================
MO.FDuiTabButton_doClick = function FDuiTabButton_doClick(){
   var o = this;
   // 选中当前按键
   o._parent.select(o);
   // 发送事件
   var e = new MO.SClickEvent(o);
   o.processClickListener(e);
   e.dispose();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiTabButton_dispose = function FDuiTabButton_dispose(){
   var o = this;
   o._hButton = MO.Window.Html.free(o._hButton);
   o._hTop = MO.Window.Html.free(o._hTop);
   o._hLeft = MO.Window.Html.free(o._hLeft);
   o._hBottomL = MO.Window.Html.free(o._hBottomL);
   o._hBottom = MO.Window.Html.free(o._hBottom);
   o._hBottomR = MO.Window.Html.free(o._hBottomR);
   o._hRight = MO.Window.Html.free(o._hRight);
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}

//==========================================================
// <T>获得运行信息处理。</T>
//
// @method
//==========================================================
MO.FDuiTabButton_innerDump = function FDuiTabButton_innerDump(s, l){
   var o = this;
   s.append(l, MO.Class.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
