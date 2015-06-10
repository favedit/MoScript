with(MO){
   //==========================================================
   // <T>界面菜单按键。</T>
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
   // @face
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FUiMenuButton = function FUiMenuButton(o){
      o = RClass.inherits(this, o, FUiControl, MUiMenuButton, MListenerClick);
      //..........................................................
      // @property
      o._icon            = RClass.register(o, new APtyString('_icon'));
      o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
      o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
      o._action          = RClass.register(o, new APtyString('_action'));
      //..........................................................
      // @style
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
      o.onBuildPanel     = FUiMenuButton_onBuildPanel
      o.onBuild          = FUiMenuButton_onBuild;
      // @event
      o.onEnter          = FUiMenuButton_onEnter;
      o.onLeave          = FUiMenuButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiMenuButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiMenuButton_onMouseUp);
      //..........................................................
      // @method
      o.icon             = FUiMenuButton_icon;
      o.setIcon          = FUiMenuButton_setIcon;
      o.setLabel         = FUiMenuButton_setLabel;
      o.setHint          = FUiMenuButton_setHint;
      o.setEnable        = FUiMenuButton_setEnable;
      o.click            = FUiMenuButton_click;
      o.dispose          = FUiMenuButton_dispose;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiMenuButton_onBuildPanel = function FUiMenuButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiMenuButton_onBuild = function FUiMenuButton_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      // 设置面板
      var h = o._hPanel;
      o.attachEvent('onMouseDown', h);
      o.attachEvent('onMouseUp', h);
      // 建立表单
      var hf = o._hForm = RBuilder.appendTable(h);
      var hl = o._hLine = RBuilder.appendTableRow(hf);
      // 建立图标
      if(o._icon){
         var hc = o._hIconPanel = RBuilder.appendTableCell(hl, o.styleName('IconPanel'));
         o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
      }
      // 建立分割
      if(o._icon && o._label){
         o._hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
      }
      // 建立标签
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hl, o.styleName('LabelPanel'));
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
   // <T>鼠标进入处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiMenuButton_onEnter = function FUiMenuButton_onEnter(p){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Hover');
      }
   }

   //==========================================================
   // <T>鼠标离开处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiMenuButton_onLeave = function FUiMenuButton_onLeave(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Normal');
      }
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiMenuButton_onMouseDown = function FUiMenuButton_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Press');
         o.click();
      }
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiMenuButton_onMouseUp = function FUiMenuButton_onMouseUp(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Hover');
      }
   }

   //==========================================================
   // <T>获得图标。</T>
   //
   // @method
   // @return String 图标
   //==========================================================
   MO.FUiMenuButton_icon = function FUiMenuButton_icon(){
      return this._icon;
   }

   //==========================================================
   // <T>设置图标。</T>
   //
   // @method
   // @param p:icon:String 图标
   //==========================================================
   MO.FUiMenuButton_setIcon = function FUiMenuButton_setIcon(p){
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
   MO.FUiMenuButton_setLabel = function FUiMenuButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      RHtml.textSet(o._hLabelPanel, s);
   }

   //==========================================================
   // <T>设置提示。</T>
   //
   // @method
   // @param p:hint:String 提示
   //==========================================================
   MO.FUiMenuButton_setHint = function FUiMenuButton_setHint(p){
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
   MO.FUiMenuButton_setEnable = function FUiMenuButton_setEnable(p){
      var o = this;
      o.__base.FUiControl.setEnable.call(o, p);
      // 允许处理
      if(p){
         o._hPanel.className = o.style('Button');
         if(o._iconDisable && o._icon){
            o._hIcon.src = RRes._iconPath(o._icon);
         }
      }else{
         o._hPanel.className = o.style('Disable');
         if(o._iconDisable){
            o._hIcon.src = RRes._iconPath(o._iconDisable);
         }
      }
   }

   //==========================================================
   // <T>点击处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiMenuButton_click = function FUiMenuButton_click(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FUiFocusConsole).blur();
         MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
         // 执行监听信息
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         // 执行脚本
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
   MO.FUiMenuButton_dispose = function FUiMenuButton_dispose(){
      var o = this;
      // 释放属性
      o._hForm = RHtml.free(o._hForm);
      o._hLine = RHtml.free(o._hLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hSpacePanel = RHtml.free(o._hSpacePanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      // 父处理
      o.__base.FUiControl.dispose.call(o);
   }
}
