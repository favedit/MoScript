//==========================================================
// <T>界面工具栏按键。</T>
//
//  hParent<TD>
//  hPanel<DIV>
// ┌-------------------------------------------------------------┐
// │ hForm<TABLE>                                                │
// │┌--------------┬---------------┬---------------┐         │
// ││hIconPanel<TD>│hSpacePanel<TD>│hLabelPanel<TD>│hLine<TR>│
// ││hIcon<IMG>    │               │               │         │
// │└--------------┴---------------┴---------------┘         │
// └-------------------------------------------------------------┘
//
// @class
// @author maocy
// @history 150121
//==========================================================
MO.FDuiToolButton = function FDuiToolButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiToolButton);
   //..........................................................
   // @property
   o._icon            = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetter('_icon')]);
   o._iconDisable     = MO.Class.register(o, [new MO.APtyString('_iconDisable'), new MO.AGetter('_iconDisable')]);
   o._hotkey          = MO.Class.register(o, [new MO.APtyString('_hotkey'), new MO.AGetter('_hotkey')]);
   o._action          = MO.Class.register(o, [new MO.APtyString('_action'), new MO.AGetter('_action')]);
   //..........................................................
   // @style
   o._stylePanel      = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleNormal     = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover      = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._stylePress      = MO.Class.register(o, new MO.AStyle('_stylePress'));
   o._styleDisable    = MO.Class.register(o, new MO.AStyle('_styleDisable'));
   o._styleIconPanel  = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   //..........................................................
   // @attribute
   o._disabled        = false;
   // @attribute
   o._listenersClick  = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   //..........................................................
   // @html
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   //..........................................................
   // @event
   o.onBuildPanel     = MO.FDuiToolButton_onBuildPanel;
   o.onBuildButton    = MO.FDuiToolButton_onBuildButton;
   o.onBuild          = MO.FDuiToolButton_onBuild;
   // @event
   o.onEnter          = MO.FDuiToolButton_onEnter;
   o.onLeave          = MO.FDuiToolButton_onLeave;
   o.onMouseDown      = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiToolButton_onMouseDown);
   o.onMouseUp        = MO.Class.register(o, new MO.AEventMouseDown('onMouseUp'), MO.FDuiToolButton_onMouseUp);
   //..........................................................
   // @method
   o.icon             = MO.FDuiToolButton_icon;
   o.setIcon          = MO.FDuiToolButton_setIcon;
   o.setLabel         = MO.FDuiToolButton_setLabel;
   o.setHint          = MO.FDuiToolButton_setHint;
   o.setEnable        = MO.FDuiToolButton_setEnable;
   // @method
   o.doClick          = MO.FDuiToolButton_doClick;
   // @method
   o.dispose          = MO.FDuiToolButton_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiToolButton_onBuildPanel = function FDuiToolButton_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
}

//==========================================================
// <T>建立按键布局。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiToolButton_onBuildButton = function FDuiToolButton_onBuildButton(event){
   var o = this;
   // 设置面板
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   // 建立表单
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel, o.styleName('Normal'));
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   // 建立图标
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   // 建立分割
   if(o._icon && o._label){
      o.hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   // 建立标签
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      // 设置标签
      o.setLabel(o._label);
   }
   // 建立热键
   if(o._hotkey){
      //MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   // 建立提示
   if(o._hint){
      o.setHint(o._hint);
   }
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiToolButton_onBuild = function FDuiToolButton_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   // 建立面板
   o.onBuildButton(event);
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiToolButton_onEnter = function FDuiToolButton_onEnter(e){
   var o = this;
   //if(o._hotkey || o.hint){
   //   if(!o.hintBox){
   //      o.hintBox = RConsole.find(FHintConsole).find();
   //   }
   //   o.hintBox.linkControl(o);
   //   o.active = new TActive(o, o.onShowHint);
   //   o.active.count = 300;
   //   RConsole.find(FActiveConsole).push(o.active);
   //   //o.hintBox.show();
   //}
   if(!o._disabled){
      // 消息提示
      o._hForm.className = o.styleName('Hover');
      //o._hButton.background = o.styleIconPath('ButtonHover', FDuiToolButton);
   }
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiToolButton_onLeave = function FDuiToolButton_onLeave(e){
   var o = this;
   //if(o.hintBox){
   //   o.hintBox.hide();
   //   o.hintBox = null;
   //}
   if(!o._disabled){
      o._hForm.className = o.styleName('Normal');
      //o._hButton.background = o.styleIconPath('Button', FDuiToolButton);
   }
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiToolButton_onMouseDown = function FDuiToolButton_onMouseDown(){
   var o = this;
   //if(o.hintBox){
   //   o.hintBox.hide();
   //}
   if(!o._disabled){
      o._hForm.className = this.styleName('Press');
      o.doClick();
   }
}

//==========================================================
// <T>鼠标抬起处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiToolButton_onMouseUp = function FDuiToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hForm.className = o.styleName('Hover');
   }
}

//==========================================================
// <T>获得图标。</T>
//
// @method
// @return String 图标
//==========================================================
MO.FDuiToolButton_icon = function FDuiToolButton_icon(){
   return this._icon;
}

//==========================================================
// <T>设置图标。</T>
//
// @method
// @param icon:String 图标
//==========================================================
MO.FDuiToolButton_setIcon = function FDuiToolButton_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
MO.FDuiToolButton_setLabel = function FDuiToolButton_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   // 设置属性
   o._label = text;
   // 设置显示
   var hLabelPanel = o._hLabelPanel;
   if(hLabelPanel){
      MO.Window.Html.textSet(hLabelPanel, text);
   }
}

//==========================================================
// <T>设置提示。</T>
//
// @method
// @param hint:String 提示
//==========================================================
MO.FDuiToolButton_setHint = function FDuiToolButton_setHint(hint){
   var o = this;
   o._hint = hint;
   var text = MO.Lang.String.nvl(hint);
   if(o._hint){
      if(o._hotkey){
         text += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = o._hint;
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param value:Boolean 是否可操作
//==========================================================
MO.FDuiToolButton_setEnable = function FDuiToolButton_setEnable(value){
   var o = this;
   o.__base.FDuiControl.oeEnable.call(o, value);
   o._disabled = !e.enable;
   // 设置图标
   if(e.enable && o._icon){
      var is = MO.Window.Resource.iconPath(o._icon);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }else if(!e.enable && o._iconDisable){
      var is = MO.Window.Resource.iconPath(o._iconDisable);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }
   // 设置图标样式
   var css = o.styleName(e.enable ? 'Icon' : 'IconDisable');
   if(o._hIcon.className != css){
      o._hIcon.className = css;
   }
   // 设置按键样式
   var css = o.styleName(e.enable ? 'Button' : 'Disable');
   if(o._hPanel.className != css){
      o._hPanel.className = css;
   }
   // 设置按键样式
   var ci = o.styleIconPath(e.enable ? 'Button' : 'ButtonDisable');
   if(o._hButton.background != ci){
      o._hButton.background = ci;
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>点击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiToolButton_doClick = function FDuiToolButton_doClick(){
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
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiToolButton_dispose = function FDuiToolButton_dispose(){
   var o = this;
   // 释放属性
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine = MO.Window.Html.free(o._hLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hSpacePanel = MO.Window.Html.free(o._hSpacePanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}
