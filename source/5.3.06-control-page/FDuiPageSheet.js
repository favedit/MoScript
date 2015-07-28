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
      o = RClass.inherits(this, o, FDuiLayout);
      //..........................................................
      // @property
      o._icon              = RClass.register(o, new APtyString('_icon'));
      o._formName          = RClass.register(o, new APtyString('_formName'));
      o._formLink          = RClass.register(o, new APtyString('_formLink'));
      o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
      o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
      //..........................................................
      // @style
      o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
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
      o.onBuildPanel       = FDuiPageSheet_onBuildPanel;
      // @event
      o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FDuiPageSheet_onButtonEnter);
      o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FDuiPageSheet_onButtonLeave);
      o.onHeadMouseDown    = RClass.register(o, new AEventMouseDown('onHeadMouseDown'), FDuiPageSheet_onHeadMouseDown);
      //..........................................................
      // @method
      o.construct          = FDuiPageSheet_construct;
      // @method
      o.innerSelect        = FDuiPageSheet_innerSelect;
      o.select             = FDuiPageSheet_select;
      o.setVisible         = FDuiPageSheet_setVisible;
      // @method
      o.dispose            = FDuiPageSheet_dispose
      // @method
      o.innerDump          = FDuiPageSheet_innerDump;
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
      var hPanel = o._hPanel = o._hContainer = RBuilder.createDiv(event, o.styleName('Panel'));
      hPanel.style.width = '100%';
      hPanel.style.height = '100%';
      var hForm = o._hPanelForm = RBuilder.appendTable(hPanel);
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
      o.lsnsSelect = new TListeners();
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
      RHtml.visibleSet(o._hForm, flag);
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
      RHtml.displaySet(o._hPanel, flag);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiPageSheet_dispose = function FDuiPageSheet_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
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
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
