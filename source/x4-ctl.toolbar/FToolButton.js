//==========================================================
// <T>工具按钮。</T>
//
// @class FControl, MLsnClick
// @history 091116 MAOCY 创建
//==========================================================
function FToolButton(o){
   o = RClass.inherits(this, o, FControl, MLsnClick);
   //..........................................................
   // @property
   o.type            = RClass.register(o, new TPtyStr('type'));
   o.action          = RClass.register(o, new TPtyStr('action'));
   o.dataAction      = RClass.register(o, new TPtyStr('dataAction'));
   o.service         = RClass.register(o, new TPtyStr('service'));
   o.target          = RClass.register(o, new TPtyStr('target'));
   o.page            = RClass.register(o, new TPtyStr('page'));
   o.hotkey          = RClass.register(o, new TPtyStr('hotkey'));
   o.method          = RClass.register(o, new TPtyStr('method'));
   o.icon            = RClass.register(o, new TPtyStr('icon'));
   o.iconDisable     = RClass.register(o, new TPtyStr('iconDisable'));
   o.attributes      = RClass.register(o, new TPtyStr('attributes'));
   //..........................................................
   // @event
   o.onButtonClick   = RClass.register(o, new HClick('onButtonClick'), FToolButton_onButtonClick);
   //..........................................................
   // @style
   o.stButton        = RClass.register(o, new TStyle('Button'));
   o.stDisable       = RClass.register(o, new TStyle('Disable'));
   o.stIcon          = RClass.register(o, new TStyle('Icon'));
   o.stIconDisable   = RClass.register(o, new TStyle('IconDisable'));
   o.stLabel         = RClass.register(o, new TStyle('Label'));
   o.stHover         = RClass.register(o, new TStyle('Hover'));
   o.stPress         = RClass.register(o, new TStyle('Press'));
   o.stButton        = RClass.register(o, new TStyleIcon('Button'));
   o.stButtonDisable = RClass.register(o, new TStyleIcon('ButtonDisable'));
   o.stButtonHover   = RClass.register(o, new TStyleIcon('ButtonHover'));
   //..........................................................
   // @listener
   o.lsnsClick       = new TListeners();
   //..........................................................
   // @attribute
   o.disabled        = false;
   //..........................................................
   // @html
   o.hButton         = null;
   o.hButtonLine     = null;
   o.hButtonPanel    = null;
   o.hIcon           = null;
   o.hText           = null;
   //..........................................................
   // @event
   o.onBuildPanel    = FToolButton_onBuildPanel;
   o.onEnter         = FToolButton_onEnter;
   o.onLeave         = FToolButton_onLeave;
   o.onMouseDown     = FToolButton_onMouseDown;
   o.onMouseUp       = FToolButton_onMouseUp;
   o.onShowHint      = FToolButton_onShowHint;
   //..........................................................
   // @process
   o.oeBuild         = FToolButton_oeBuild;
   o.oeEnable        = FToolButton_oeEnable;
   //..........................................................
   // @method
   o.setLabel        = FToolButton_setLabel;
   o.dispose         = FToolButton_dispose;
   return o;
}

/**************************************************************
 * 构建一个工具条中的工具按钮
 *
 * @method
 * @param event:Event:EEvent 构建事件
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FToolButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var t = o.parent;
   var h = o.hPanel;
   var hb = o.hButton = RBuilder.appendTable(o.hPanel, o.style('Panel'));
   hb.background = o.styleIconPath('Button', FToolButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = o.hButtonPanel = hLine.insertCell();
   o.attachEvent('onButtonClick', o.hButtonPanel);
   hCel.className = t.style('Button');
   if(o.icon){
      o.hIcon = RBuilder.appendIcon(hCel, o.icon);
   }
   if(o.label){
      o.hText = RBuilder.append(hCel, 'SPAN');
      o.hText.innerHTML = '&nbsp;' + o.label;
   }
   if(o.hotkey){
      //o.hText.innerHTML = '&nbsp;' + o.label+"("+o.hotkey+")";
      RConsole.find(FKeyConsole).register(o.hotkey, new TListener(o, o.onButtonClick));
   }
   return EEventStatus.Stop;
}

/**************************************************************
 * 相应Enable事件
 *
 * @method
 * @param e:event:TEvent 构建事件
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FToolButton_oeEnable(e){
   var o = this;
   o.base.FControl.oeEnable.call(o, e);
   o.disabled = !e.enable;
   // 设置图标
   if(e.enable && o.icon){
      var is = RRes.iconPath(o.icon);
      if(o.hIcon.src != is){
         o.hIcon.src = is;
      }
   }else if(!e.enable && o.iconDisable){
      var is = RRes.iconPath(o.iconDisable);
      if(o.hIcon.src != is){
         o.hIcon.src = is;
      }
   }
   // 设置图标样式
   var css = o.style(e.enable ? 'Icon' : 'IconDisable');
   if(o.hIcon.className != css){
      o.hIcon.className = css;
   }
   // 设置按键样式
   var css = o.style(e.enable ? 'Button' : 'Disable');
   if(o.hPanel.className != css){
      o.hPanel.className = css;
   }
   // 设置按键样式
   var ci = o.styleIconPath(e.enable ? 'Button' : 'ButtonDisable');
   if(o.hButton.background != ci){
      o.hButton.background = ci;
   }
   return EEventStatus.Stop;
}

/**************************************************************
 * 构建面板
 *
 * @method
 * @param event:Event:TEvent 构建事件
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FToolButton_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Button'));
}

/**************************************************************
 * 相应鼠标进入事件
 *
 * @method
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FToolButton_onEnter(e){
   var o = this;
   if(o.hotkey || o.hint){
      if(!o.hintBox){
         o.hintBox = RConsole.find(FHintConsole).find();
      }
      o.hintBox.linkControl(o);
      o.active = new TActive(o, o.onShowHint);
      o.active.count = 300;
      RConsole.find(FActiveConsole).push(o.active);
      //o.hintBox.show();
   }
   if(!o.disabled){
      // 消息提示
      o.hPanel.className = o.style('Hover');
      o.hButton.background = o.styleIconPath('ButtonHover', FToolButton);
   }
}

/**************************************************************
 * 相应鼠标离开事件
 *
 * @method
 **************************************************************/
function FToolButton_onLeave(e){
   var o = this;
   if(o.hintBox){
      o.hintBox.hide();
      o.hintBox = null;
   }
   if(!o.disabled){
      o.hPanel.className = o.style('Button');
      o.hButton.background = o.styleIconPath('Button', FToolButton);
   }
}

/**************************************************************
 * 相应鼠标按下事件
 *
 * @method
 **************************************************************/
function FToolButton_onMouseDown(){
   var o = this;
   if(o.hintBox){
      o.hintBox.hide();
   }
   if(!o.disabled){
      //this.hPanel.className = this.style('Press');
   }
}

/**************************************************************
 * 相应鼠标弹起事件
 *
 * @method
 * @param event:Event:TEvent 构建事件
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FToolButton_onMouseUp(h){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Hover');
   }
}

/**************************************************************
 * 相应点击事件
 *
 * @method
 **************************************************************/
function FToolButton_onButtonClick(h){
   var o = this;
   RLogger.debug(o, '[D] onButtonClick = ' + o.name);
   if(o.isVisible() && !o.disabled && (EAction.Design != o.inAction)){
      // 存储当前焦点对象，强制失去焦点
      //alert('o.disabled='+o.disabled);
      var fc = RConsole.find(FFocusConsole);
      fc.storeFocus();
      fc.blur();
      // 执行监听信息
      o.lsnsClick.process(o);
      // 执行按键操作
      if(o.action){
         eval(o.action);
      }
      if(o.service){
         // 分解service
         var servs = RString.splitTwo(o.service, '@');
         // 找到表单对象
         var f = RConsole.find(FFocusConsole).findClass(MDataset);
         // 构建处理事件对象
         var arg = new TDatasetServiceArg(f.name, o.dataAction);
         arg.callback = new TInvoke(f, f.onDsProcess);
         arg.rows = f.getCurrentRows();
         RConsole.find(FFormConsole).process(arg);
      }
      if(o.page || o.method){
         var form = RHtml.form(o.hButton);
         var p = RPage.parse(o.page);
         if(o.method){
            p.action = o.method;
         }
         p.split(o.attributes);
         //
         var f = RConsole.find(FFocusConsole).findClass(MDataset);
         if(f){
            var as = new TAttributes();
            f.saveValue(as);
            //p.attrs().set('form_pack', as.pack());
            if(form && form.form_pack){
               form.form_pack.value = as.pack();
            }
         }
         p.post(form, o.target);
         /*for(var n = 0;n < p.attributes.count; n++){
            if(RStr.contains(p.attributes.value(n),'$')){
               var v = RStr.removeChars(p.attributes.value(n),'$');
               v = RStr.removeChars(v,'{');
               v = RStr.removeChars(v,'}');
               var f = RConsole.find(FFocusConsole).findClass(MDataset);
               debugger
               var ctl = f.controls.get(v);
               if(RClass.checkClass(ctl,MEditValue)){
                  p.attribues.setValue(n,ctl.get());
               }
            }
         }*/
      }
      o.processClick();
   }
}

/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FToolButton_onClick
 **************************************************************/
function FToolButton_click(){
   this.onClick();
}

/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FToolButton_onClick
 **************************************************************/
function FToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}

function FToolButton_setLabel(s){
   this.hText.innerText = s;
}

/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FToolButton_onClick
 **************************************************************/
function FToolButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hButtonLine);
   RMemory.freeHtml(o.hButton);
   RMemory.freeHtml(o.hText);
   RMemory.freeHtml(o.hButtonPanel);
   RMemory.freeHtml(o.hIcon);
   o.hButton = null;
   o.hButtonLine = null;
   o.hText = null;
   o.hIcon = null;
   o.hButtonPanel = null;
}

