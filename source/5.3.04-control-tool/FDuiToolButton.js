with(MO){
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
      o = RClass.inherits(this, o, FDuiControl, MDuiToolButton, MListenerClick);
      //..........................................................
      // @property
      o._icon            = RClass.register(o, new APtyString('_icon'));
      o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
      o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
      o._action          = RClass.register(o, new APtyString('_action'));
      //..........................................................
      // @style
      o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
      o._styleNormal     = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover      = RClass.register(o, new AStyle('_styleHover'));
      o._stylePress      = RClass.register(o, new AStyle('_stylePress'));
      o._styleDisable    = RClass.register(o, new AStyle('_styleDisable'));
      o._styleIconPanel  = RClass.register(o, new AStyle('_styleIconPanel'));
      o._styleSpacePanel = RClass.register(o, new AStyle('_styleSpacePanel'));
      o._styleLabelPanel = RClass.register(o, new AStyle('_styleLabelPanel'));
      //..........................................................
      // @attribute
      o._disabled        = false;
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
      o.onBuildPanel     = FDuiToolButton_onBuildPanel;
      o.onBuildButton    = FDuiToolButton_onBuildButton;
      o.onBuild          = FDuiToolButton_onBuild;
      // @event
      o.onEnter          = FDuiToolButton_onEnter;
      o.onLeave          = FDuiToolButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FDuiToolButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FDuiToolButton_onMouseUp);
      //..........................................................
      // @method
      o.icon             = FDuiToolButton_icon;
      o.setIcon          = FDuiToolButton_setIcon;
      o.setLabel         = FDuiToolButton_setLabel;
      o.setHint          = FDuiToolButton_setHint;
      o.setEnable        = FDuiToolButton_setEnable;
      // @method
      o.doClick          = FDuiToolButton_doClick;
      // @method
      o.dispose          = FDuiToolButton_dispose;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiToolButton_onBuildPanel = function FDuiToolButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>建立按键布局。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiToolButton_onBuildButton = function FDuiToolButton_onBuildButton(p){
      var o = this;
      // 设置面板
      var hPanel = o._hPanel;
      o.attachEvent('onMouseDown', hPanel);
      o.attachEvent('onMouseUp', hPanel);
      // 建立表单
      var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Normal'));
      var hLine = o._hLine = RBuilder.appendTableRow(hForm);
      // 建立图标
      if(o._icon){
         var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
         o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
      }
      // 建立分割
      if(o._icon && o._label){
         o.hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
      }
      // 建立标签
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
         hLabelPanel.noWrap = true;
         // 设置标签
         o.setLabel(o._label);
      }
      // 建立热键
      if(o._hotkey){
         RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
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
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiToolButton_onBuild = function FDuiToolButton_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      // 建立面板
      o.onBuildButton(p);
   }

   //==========================================================
   // <T>鼠标进入处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
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
   // @param p:event:SEvent 事件
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
   // @param p:event:SEvent 事件
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
   // @param p:event:SEvent 事件
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
   // @param p:icon:String 图标
   //==========================================================
   MO.FDuiToolButton_setIcon = function FDuiToolButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:label:String 标签
   //==========================================================
   MO.FDuiToolButton_setLabel = function FDuiToolButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      // 设置属性
      o._label = s;
      // 设置显示
      var h = o._hLabelPanel;
      if(h){
         RHtml.textSet(h, s);
      }
   }

   //==========================================================
   // <T>设置提示。</T>
   //
   // @method
   // @param p:hint:String 提示
   //==========================================================
   MO.FDuiToolButton_setHint = function FDuiToolButton_setHint(p){
      var o = this;
      o._hint = p;
      var s = RString.nvl(p);
      if(o._hint){
         if(o._hotkey){
            s += ' [' + o._hotkey + ']';
         }
      }
      o._hPanel.title = o._hint;
   }

   //==========================================================
   // <T>设置控件的可操作和禁止。</T>
   //
   // @method
   // @param p:enable:Boolean 是否可操作
   //==========================================================
   MO.FDuiToolButton_setEnable = function FDuiToolButton_setEnable(p){
      var o = this;
      o.__base.FDuiControl.oeEnable.call(o, e);
      o._disabled = !e.enable;
      // 设置图标
      if(e.enable && o._icon){
         var is = RResource.iconPath(o._icon);
         if(o._hIcon.src != is){
            o._hIcon.src = is;
         }
      }else if(!e.enable && o._iconDisable){
         var is = RResource.iconPath(o._iconDisable);
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
         RConsole.find(FDuiFocusConsole).blur();
         MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
         // 执行监听信息
         var event = new SClickEvent(o);
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
      o._hForm = RHtml.free(o._hForm);
      o._hLine = RHtml.free(o._hLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hSpacePanel = RHtml.free(o._hSpacePanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      // 父处理
      o.__base.FDuiControl.dispose.call(o);
   }
}
