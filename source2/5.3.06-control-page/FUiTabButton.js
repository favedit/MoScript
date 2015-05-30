with(MO){
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
   MO.FUiTabButton = function FUiTabButton(o){
      o = RClass.inherits(this, o, FUiControl, MListenerClick);
      //..........................................................
      // @property
      o._icon              = RClass.register(o, new APtyString('_icon'));
      o._formName          = RClass.register(o, new APtyString('_formName'));
      o._formLink          = RClass.register(o, new APtyString('_formLink'));
      o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
      o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
      //..........................................................
      // @style
      o._styleTop          = RClass.register(o, new AStyle('_styleTop'));
      o._styleTopSelect    = RClass.register(o, new AStyle('_styleTopSelect'));
      o._styleLeft         = RClass.register(o, new AStyle('_styleLeft'));
      o._styleLeftSelect   = RClass.register(o, new AStyle('_styleLeftSelect'));
      o._styleRight        = RClass.register(o, new AStyle('_styleRight'));
      o._styleRightSelect  = RClass.register(o, new AStyle('_styleRightSelect'));
      o._styleRightPrior   = RClass.register(o, new AStyle('_styleRightPrior'));
      o._styleButtom       = RClass.register(o, new AStyle('_styleBottom'));
      o._styleBottomSelect = RClass.register(o, new AStyle('_styleBottomSelect'));
      o._styleButtonText   = RClass.register(o, new AStyle('_styleButtonText'));
      o._styleButton       = RClass.register(o, new AStyle('_styleButton'));
      o._styleButtonHover  = RClass.register(o, new AStyle('_styleButtonHover'));
      o._styleButtonSelect = RClass.register(o, new AStyle('_styleButtonSelect'));
      o._styleDataPanel    = RClass.register(o, new AStyle('_styleDataPanel'));
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
      o.onBuildPanel       = FUiTabButton_onBuildPanel;
      // @event
      o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiTabButton_onButtonEnter);
      o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiTabButton_onButtonLeave);
      o.onButtonClick      = RClass.register(o, new AEventClick('onButtonClick'), FUiTabButton_onButtonClick);
      //..........................................................
      // @method
      o.construct          = FUiTabButton_construct;
      // @method
      o.innerSelect        = FUiTabButton_innerSelect;
      o.select             = FUiTabButton_select;
      o.setVisible         = FUiTabButton_setVisible;
      // @method
      o.doClick            = FUiTabButton_doClick;
      // @method
      o.dispose            = FUiTabButton_dispose
      // @method
      o.innerDump          = FUiTabButton_innerDump;
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示底板。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiTabButton_onBuildPanel = function FUiTabButton_onBuildPanel(p){
      var o = this;
      var hp = o._hContainer = o._hPanel = RBuilder.createDiv(p);
      hp.width = '100%';
      hp.height = '100%';
   }

   //==========================================================
   // <T>按键获得热点处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiTabButton_onButtonEnter = function FUiTabButton_onButtonEnter(p){
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
   MO.FUiTabButton_onButtonLeave = function FUiTabButton_onButtonLeave(p){
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
   MO.FUiTabButton_onButtonClick = function FUiTabButton_onButtonClick(p){
      this.doClick();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiTabButton_construct = function FUiTabButton_construct(){
      var o = this;
      // 父处理
      o.__base.FUiControl.construct.call(o);
      // 设置属性
      o.lsnsSelect = new TListeners();
   }

   //==========================================================
   // <T>内部选中处理。</T>
   //
   // @method
   // @param p:flag:Boolean 选中标志
   //==========================================================
   MO.FUiTabButton_innerSelect = function FUiTabButton_innerSelect(p){
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
   MO.FUiTabButton_select = function FUiTabButton_select(p){
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
   MO.FUiTabButton_setVisible = function FUiTabButton_setVisible(p){
      var o = this;
      RHtml.displaySet(o._hPanel, p);
   }

   //==========================================================
   // <T>点击处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiTabButton_doClick = function FUiTabButton_doClick(){
      var o = this;
      // 选中当前按键
      o._parent.select(o);
      // 发送事件
      var e = new SClickEvent(o);
      o.processClickListener(e);
      e.dispose();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiTabButton_dispose = function FUiTabButton_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
      // 父处理
      o.__base.FUiControl.dispose.call(o);
   }

   //==========================================================
   // <T>获得运行信息处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiTabButton_innerDump = function FUiTabButton_innerDump(s, l){
      var o = this;
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
