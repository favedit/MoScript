//==========================================================
// <T>按钮控件。</T>
//
// @class
// @author maocy
// @history 150329
//==========================================================
MO.FDuiButton = function FDuiButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MListenerClick);
   //..........................................................
   // @attribute
   o._labelPositionCd   = MO.Class.register(o, new MO.APtyString('_labelPositionCd'), MO.EUiPosition.Left);
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._action            = MO.Class.register(o, new MO.APtyString('_action'));
   //o._type              = MO.Class.register(o, new MO.APtyString('_type'));
   //o._dataAction        = MO.Class.register(o, new MO.APtyString('_dataAction'));
   //o._service           = MO.Class.register(o, new MO.APtyString('_service'));
   //o._target            = MO.Class.register(o, new MO.APtyString('_target'));
   //o._page              = MO.Class.register(o, new MO.APtyString('_page'));
   //o._method            = MO.Class.register(o, new MO.APtyString('_method'));
   //o._iconDisable       = MO.Class.register(o, new MO.APtyString('_iconDisable'));
   //o._attributes        = MO.Class.register(o, new MO.APtyString('_attributes'));
   //o._editUrl           = MO.Class.register(o, new MO.APtyString('_editUrl'));
   //o._editForm          = MO.Class.register(o, new MO.APtyString('_editForm'));
   // @attribute
   o._listenersClick    = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   //..........................................................
   // @css
   o._stylePanel        = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleForm         = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleIcon         = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel        = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleIconPanel    = MO.Class.register(o, new MO.AStyleIcon('_styleIconPanel'));
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
   o.onBuild            = MO.FDuiButton_onBuild;
   // @event
   o.onClick            = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiButton_onClick);
   //o.onButtonEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), FDuiButton_onButtonEnter);
   //o.onButtonLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), FDuiButton_onButtonLeave);
   //o.onButtonDown       = MO.Class.register(o, new MO.AEventMouseDown('onButtonDown'), FDuiButton_onButtonDown);
   //o.onButtonUp         = MO.Class.register(o, new MO.AEventMouseUp('onButtonUp'), FDuiButton_onButtonUp);
   //o.onButtonClickDelay = FDuiButton_onButtonClickDelay;
   //o.onButtonClick      = MO.Class.register(o, new MO.AEventClick('onButtonClick'), FDuiButton_onButtonClick);
   //..........................................................
   // @process
   //o.oeMode             = FDuiButton_oeMode;
   //..........................................................
   // @method
   //o.setLabel           = FDuiButton_setLabel;
   //o.setLabelColor      = FDuiButton_setLabelColor;
   //o.setLabelStyle      = FDuiButton_setLabelStyle;
   o.doClick            = MO.FDuiButton_doClick;
   //o.dispose            = FDuiButton_dispose;
   return o;
}

//==========================================================
// <T>构建按钮，链接相应事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiButton_onBuild = function FDuiButton_onBuild(e){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, e);
   // 设置底板
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   //o.attachEvent('onButtonEnter', hPanel, o.onButtonEnter);
   //o.attachEvent('onButtonLeave', hPanel, o.onButtonLeave);
   //o.attachEvent('onButtonDown', hPanel, o.onButtonDown);
   //o.attachEvent('onButtonUp', hPanel, o.onButtonUp);
   //o.attachEvent('onButtonClick', hPanel);
   // 建立布局
   var hForm = MO.Window.Builder.appendTable(hPanel, o.styleName('Form'));
   var hLine  = MO.Window.Builder.appendTableRow(hForm);
   // 建立图标
   if(o._icon){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      hCell.width = 16;
      o._hIcon = MO.Window.Builder.appendIcon(hCell, o.styleName('Icon'), o._icon);
   }
   // 建立标签
   if(o.label){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      hCell.align = 'center';
      hCell.noWrap = true;
      o._hLabel = MO.Window.Builder.appendText(hCell, o.styleName('Label'), o._label);
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
MO.FDuiButton_onButtonEnter = function FDuiButton_onButtonEnter(e){
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
MO.FDuiButton_onButtonLeave = function FDuiButton_onButtonLeave(e){
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
MO.FDuiButton_onButtonDown = function FDuiButton_onButtonDown(e){
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
MO.FDuiButton_onButtonUp = function FDuiButton_onButtonUp(e){
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
MO.FDuiButton_onButtonClickDelay = function FDuiButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = MO.EActive.Sleep;
}

//==========================================================
// <T>鼠标点击控件事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiButton_onClick = function FDuiButton_onClick(e){
   this.doClick();
}

//==========================================================
// <T>鼠标点击按键事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiButton_onButtonClick = function FDuiButton_onButtonClick(e){
   this.doClick();
}

//==========================================================
// <T>转换模式事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiButton_oeMode = function FDuiButton_oeMode(e){
   var o = this;
   o.__base.FDuiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>设置按钮文字</T>
//
// @method
// @param label:label:label
//==========================================================
MO.FDuiButton_setLabel = function FDuiButton_setLabel(v){
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
MO.FDuiButton_setLabelColor = function FDuiButton_setLabelColor(c){
   var o = this;
   o._hLabel.style.color = '#FF0000';
}

//==========================================================
//<T>设置按钮文字</T>
//
//@method
//@param label:label:label
//==========================================================
MO.FDuiButton_setLabelStyle = function FDuiButton_setLabelStyle(c, w, s){
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
MO.FDuiButton_doClick = function FDuiButton_doClick(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
      // 执行监听信息
      var event = new MO.SClickEvent(o);
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
      //return alert(RContext.get('FDuiButton:process'));
   //}
   // 开始执行
   //o.__process = true;
   //o.clickActive.status = EActive.Active;
   //o.lsnsClick.process(this);
   // 执行跳转页面
   //if(o._page){
   //   // 获得关联表单
   //   var form = MO.Window.Html.form(o.hButton);
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
   //   p.post(form, MO.Lang.String.nvl(o._target, '_self'));
   //}
   // 执行编辑地址
   //if(o._editUrl){
   //   var w = RConsole.find(FDuiButtonConsole).find();
   //   w.linkUrl(o._editUrl);
   //   w.show();
   //}
   // 弹出指定表单
   //if(o._editForm){
   //   var w = RConsole.find(FDuiButtonFormConsole).find();
   //   w.linkForm(o);
   //   w.show();
   //}
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
MO.FDuiButton_dispose = function FDuiButton_dispose(){
   var o = this;
   o._hForm = null;
   o._hFormEnd = null;
   o._hLabel = null;
   o.__base.FDuiControl.dispose.call(o);
}
