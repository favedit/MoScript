//==========================================================
// <T>按钮控件。</T>
//
// @class
// @author maocy
// @history 150329
//==========================================================
function FUiButton(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   //..........................................................
   // @attribute
   o._labelPositionCd   = RClass.register(o, new APtyString('_labelPositionCd'), EUiPosition.Left);
   o._icon              = RClass.register(o, new APtyString('_icon'));
   o._action            = RClass.register(o, new APtyString('_action'));
   //o._type              = RClass.register(o, new APtyString('_type'));
   //o._dataAction        = RClass.register(o, new APtyString('_dataAction'));
   //o._service           = RClass.register(o, new APtyString('_service'));
   //o._target            = RClass.register(o, new APtyString('_target'));
   //o._page              = RClass.register(o, new APtyString('_page'));
   //o._method            = RClass.register(o, new APtyString('_method'));
   //o._iconDisable       = RClass.register(o, new APtyString('_iconDisable'));
   //o._attributes        = RClass.register(o, new APtyString('_attributes'));
   //o._editUrl           = RClass.register(o, new APtyString('_editUrl'));
   //o._editForm          = RClass.register(o, new APtyString('_editForm'));
   //..........................................................
   // @css
   o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
   o._styleForm         = RClass.register(o, new AStyle('_styleForm'));
   o._styleIcon         = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
   o._styleIconPanel    = RClass.register(o, new AStyleIcon('_styleIconPanel'));
   //..........................................................
   // @attribute
   //o.__process          = false;
   //..........................................................
   // @listener
   //o.lsnsClick          = new TListeners();
   //..........................................................
   // @html
   o._hForm             = null;
   o._hLeftButton       = null;
   o._hMiddleButton     = null;
   o._hRightButton      = null;
   o._hLabelPanel       = null;
   o._hLabel            = null;
   //..........................................................
   // @event
   o.onBuild            = FUiButton_onBuild;
   // @event
   o.onClick            = RClass.register(o, new AEventClick('onClick'), FUiButton_onClick);
   //o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiButton_onButtonEnter);
   //o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiButton_onButtonLeave);
   //o.onButtonDown       = RClass.register(o, new AEventMouseDown('onButtonDown'), FUiButton_onButtonDown);
   //o.onButtonUp         = RClass.register(o, new AEventMouseUp('onButtonUp'), FUiButton_onButtonUp);
   //o.onButtonClickDelay = FUiButton_onButtonClickDelay;
   //o.onButtonClick      = RClass.register(o, new AEventClick('onButtonClick'), FUiButton_onButtonClick);
   //..........................................................
   // @process
   //o.oeMode             = FUiButton_oeMode;
   //..........................................................
   // @method
   //o.setLabel           = FUiButton_setLabel;
   //o.setLabelColor      = FUiButton_setLabelColor;
   //o.setLabelStyle      = FUiButton_setLabelStyle;
   o.doClick            = FUiButton_doClick;
   //o.dispose            = FUiButton_dispose;
   return o;
}

//==========================================================
// <T>构建按钮，链接相应事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FUiButton_onBuild(e){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, e);
   // 设置底板
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   //o.attachEvent('onButtonEnter', hPanel, o.onButtonEnter);
   //o.attachEvent('onButtonLeave', hPanel, o.onButtonLeave);
   //o.attachEvent('onButtonDown', hPanel, o.onButtonDown);
   //o.attachEvent('onButtonUp', hPanel, o.onButtonUp);
   //o.attachEvent('onButtonClick', hPanel);
   // 建立布局
   var hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
   var hLine  = RBuilder.appendTableRow(hForm);
   // 建立图标
   if(o._icon){
      var hCell = RBuilder.appendTableCell(hLine);
      hCell.width = 16;
      o._hIcon = RBuilder.appendIcon(hCell, o.styleName('Icon'), o._icon);
   }
   // 建立标签
   if(o.label){
      var hCell = RBuilder.appendTableCell(hLine);
      hCell.align = 'center';
      hCell.noWrap = true;
      o._hLabel = RBuilder.appendText(hCell, o.styleName('Label'), o._label);
   }
   // 创建延时器
   //o.__process = false;
   //var ca = o.clickActive = new TActive(o, o.onButtonClickDelay);
   //ca.interval = 500;
   //ca.status = EActive.Sleep;
   //RConsole.find(FActiveConsole).push(ca);
}

//==========================================================
// <T>鼠标进入按键事件。</T>
//
// @method
// @param event:event:TEvent
// @return EEventStatus.Stop
//==========================================================
function FUiButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('HoverLeft');
	  o._hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o._hRightButton.background = o.styleIconPath('HoverRight');
   }
}

//==========================================================
// <T>鼠标离开按键事件。</T>
//
// @method
// @param event:event:TEvent
// @return EEventStatus.Stop
//==========================================================
function FUiButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o._hMiddleButton.background = o.styleIconPath('Button');
	  o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}


//==========================================================
//<T>鼠标进入按键事件。</T>
//
//@method
//@param event:event:TEvent
//@return EEventStatus.Stop
//==========================================================
function FUiButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('PressLeft');
	  o._hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o._hRightButton.background = o.styleIconPath('PressRight');
   }
}

//==========================================================
//<T>鼠标离开按键事件。</T>
//
//@method
//@param event:event:TEvent
//@return EEventStatus.Stop
//==========================================================
function FUiButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o._hMiddleButton.background = o.styleIconPath('Button');
	  o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}

//==========================================================
// <T>点击按键的延时处理，防止按键被连续点中。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = EActive.Sleep;
}

//==========================================================
// <T>鼠标点击控件事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiButton_onClick(e){
   this.doClick();
}

//==========================================================
// <T>鼠标点击按键事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiButton_onButtonClick(e){
   this.doClick();
}

//==========================================================
// <T>转换模式事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FUiButton_oeMode(e){
   var o = this;
   o.__base.FUiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}

//==========================================================
// <T>设置按钮文字</T>
//
// @method
// @param label:label:label
//==========================================================
function FUiButton_setLabel(v){
   var o = this;
   o.label = v;
   o._hLabel.innerText = v;
   o._hLabel.noWrap = true;
}

//==========================================================
//<T>设置按钮文字</T>
//
//@method
//@param label:label:label
//==========================================================
function FUiButton_setLabelColor(c){
   var o = this;
   o._hLabel.style.color = '#FF0000';
}

//==========================================================
//<T>设置按钮文字</T>
//
//@method
//@param label:label:label
//==========================================================
function FUiButton_setLabelStyle(c, w, s){
   var o = this;
   o._hLabel.style.color = '#FF0000';
   o._hLabel.style.fontWeight = 'bold';
   o._hLabel.style.fontSize = '12';
}

//==========================================================
// <T>点击处理。</T>
//
// @method
//==========================================================
function FUiButton_doClick(){
   var o = this;
   if(!o._disabled){
      RConsole.find(FFocusConsole).blur();
      RLogger.debug(o, 'Tool button click. (label={1})', o._label);
      // 执行监听信息
      var event = new SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      // 执行代码命令
      if(o._action){
         eval(o._action);
      }
   }
   // 检查执行状态
   //if(o.__process){
   //   return;
      //return alert(RContext.get('FUiButton:process'));
   //}
   // 开始执行
   //o.__process = true;
   //o.clickActive.status = EActive.Active;
   //o.lsnsClick.process(this);
   // 执行跳转页面
   //if(o._page){
   //   // 获得关联表单
   //   var form = RHtml.form(o.hButton);
   //   // 获得跳转页面信息
   //   var p = RPage.parse(o._page);
   //   if(o._method){
   //      p._action = o._method;
   //   }
   //   p.split(o._attributes);
   //   // 设置传输内容
   //   var f = o.topControl(MDataset);
   //   if(f){
   //      var as = new TAttributes();
   //      f.saveValue(as);
   //      if(form && form.form_pack){
   //         form.form_pack.value = as.pack();
   //      }
   //   }
   //   // 提交表单
   //   p.post(form, RString.nvl(o._target, '_self'));
   //}
   // 执行编辑地址
   //if(o._editUrl){
   //   var w = RConsole.find(FUiButtonConsole).find();
   //   w.linkUrl(o._editUrl);
   //   w.show();
   //}
   // 弹出指定表单
   //if(o._editForm){
   //   var w = RConsole.find(FUiButtonFormConsole).find();
   //   w.linkForm(o);
   //   w.show();
   //}
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FUiButton_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
   o._hForm = null;
   o._hFormEnd = null;
   o._hLabel = null;
}
