// ============================================================
// FTitleButton
// ============================================================
function FTitleButton(o){
   o = RClass.inherits(this, o, FControl, MLsnClick);
   // Property
   o.icon            = RClass.register(o, new TPtyStr('icon'));
   o.action          = RClass.register(o, new TPtyStr('action'));
   o.page            = RClass.register(o, new TPtyStr('page'));
   o.method          = RClass.register(o, new TPtyStr('method'));
   /// @style
   o.stButton        = RClass.register(o, new TStyle('Button'));
   o.stIcon          = RClass.register(o, new TStyle('Icon'));
   o.stLabel         = RClass.register(o, new TStyle('Label'));
   o.stHover         = RClass.register(o, new TStyle('Hover'));
   o.stPress         = RClass.register(o, new TStyle('Press'));
   // Listener
   o.lsnsClick       = new TListeners();
   // Attribute
   o.disabled        = false;
   // Html
   o.hButton         = null;
   o.hButtonLine     = null;
   o.hButtonPanel    = null;
   o.hIcon           = null;
   o.hText           = null;
   // Process Event
   o.oeBuild         = FTitleButton_oeBuild;
   ///@event
   o.onButtonClick   = RClass.register(o, new HClick('onButtonClick'), FTitleButton_onButtonClick);
   // Event
   o.onBuildPanel    = FTitleButton_onBuildPanel;
   o.onEnter         = FTitleButton_onEnter;
   o.onLeave         = FTitleButton_onLeave;
   o.onMouseDown     = FTitleButton_onMouseDown;
   o.onMouseUp       = FTitleButton_onMouseUp;
   o.onShowHint      = FTitleButton_onShowHint;
   // Method
   o.setLabel        = FTitleButton_setLabel;
   o.dispose         = FTitleButton_dispose;
   return o;
}

/**************************************************************
 * 构建一个工具条中的工具按钮
 *
 * @method
 * @param event:Event:EEvent 构建事件
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FTitleButton_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   var t = o.parent;
   var hp = o.hPanel;
   o.attachEvent('onButtonClick', hp);
   var hl = o.hButtonLine = hp.insertRow();
   if(o.icon){
      var hc = hl.insertCell();
      hc.width = 20;
      o.hIcon = RBuilder.appendIcon(hc, o.icon);
   }
   if(o.label){
      var hc = o.hText = hl.insertCell();
      hc.className = o.style('Label');
      if(o.page){
         hc.style.color = '#0000FF';
      }
      hc.style.fontWeight = 'bold';
      hc.innerHTML = o.label;
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
function FTitleButton_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.newTable(null, o.style('Button'));
}

/**************************************************************
 * 相应鼠标进入事件
 *
 * @method
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FTitleButton_onEnter(e){
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
   }
}

/**************************************************************
 * 相应鼠标离开事件
 *
 * @method
 **************************************************************/
function FTitleButton_onLeave(e){
   var o = this;
   if(o.hintBox){
      o.hintBox.hide();
      o.hintBox = null;
   }
   if(!o.disabled){
      o.hPanel.className = o.style('Button');
   }
}

/**************************************************************
 * 相应鼠标按下事件
 *
 * @method
 **************************************************************/
function FTitleButton_onMouseDown(){
   var o = this;
   if(o.hintBox){
      o.hintBox.hide();
   }
   if(!this.disabled){
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
function FTitleButton_onMouseUp(h){
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
function FTitleButton_onButtonClick(h){
   var o = this;
   if(o.isVisible() && !o.disabled && (EAction.Design != o.inAction)){
      // 存储当前焦点对象，强制失去焦点
      var fc = RConsole.find(FFocusConsole);
      fc.storeFocus();
      fc.blur();
      // 执行监听信息
      o.lsnsClick.process(o);
      // 执行按键操作
      if(o.action){
         eval(o.action);
      }
      if(o.page || o.method){
         var form = RHtml.form(o.hButton);
         form.target = '';
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
            if(form && form.form_pack){
               form.form_pack.value = as.pack();
            }
         }
         p.post(form, o.target);
      }
      o.processClick();
   }
}

/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FTitleButton_onClick
 **************************************************************/
function FTitleButton_click(){
   this.onClick();
}
/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FTitleButton_onClick
 **************************************************************/
function FTitleButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}

function FTitleButton_setLabel(s){
   this.hText.innerText = s;
}

/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FTitleButton_onClick
 **************************************************************/
function FTitleButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hButton = null;
   o.hButtonLine = null;
   o.hText = null;
   o.hIcon = null;
   o.hButtonPanel = null;
}

