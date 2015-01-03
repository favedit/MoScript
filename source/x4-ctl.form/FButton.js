//==========================================================
// <T>按钮控件。</T>
//
// @class FControl, MDisplay, MDesign
// @history 091120 MAOCY 创建
//==========================================================
function FButton(o){
   o = RClass.inherits(this, o, FControl, MDisplay, MDesign);
   //..........................................................
   // @attribute
   o.labelPosition      = RClass.register(o, new TPtyStr('labelPosition', EPosition.Left));
   o.icon               = RClass.register(o, new TPtyStr('icon'));
   o.type               = RClass.register(o, new TPtyStr('type'));
   o.action             = RClass.register(o, new TPtyStr('action'));
   o.dataAction         = RClass.register(o, new TPtyStr('dataAction'));
   o.service            = RClass.register(o, new TPtyStr('service'));
   o.target             = RClass.register(o, new TPtyStr('target'));
   o.page               = RClass.register(o, new TPtyStr('page'));
   o.method             = RClass.register(o, new TPtyStr('method'));
   o.iconDisable        = RClass.register(o, new TPtyStr('iconDisable'));
   o.attributes         = RClass.register(o, new TPtyStr('attributes'));
   o.editUrl            = RClass.register(o, new TPtyStr('editUrl'));
   o.editForm           = RClass.register(o, new TPtyStr('editForm'));
   //..........................................................
   // @css
   o.stIcon             = RClass.register(o, new TStyle('Icon'));
   o.stLabel            = RClass.register(o, new TStyle('Label'));
   o.stForm             = RClass.register(o, new TStyle('Form'));
   o.stIconPanel        = RClass.register(o, new TStyleIcon('Panel'));
   //..........................................................
   // @attribute
   o.__process          = false;
   //..........................................................
   // @listener
   o.lsnsClick          = new TListeners();
   //..........................................................
   // @html
   o.hForm              = null;
   o.hLeftButton        = null;
   o.hMiddleButton      = null;
   o.hRightButton       = null;
   o.hLabelPanel        = null;
   o.hLabel             = null;
   //..........................................................
   // @event
   o.onButtonEnter      = RClass.register(o, new HMouseEnter('onButtonEnter'), FButton_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new HMouseLeave('onButtonLeave'), FButton_onButtonLeave);
   o.onButtonDown       = RClass.register(o, new HMouseDown('onButtonDown'), FButton_onButtonDown);
   o.onButtonUp         = RClass.register(o, new HMouseUp('onButtonUp'), FButton_onButtonUp);
   o.onButtonClickDelay = FButton_onButtonClickDelay;
   o.onClick            = FButton_onClick;
   o.onButtonClick      = RClass.register(o, new HClick('onButtonClick'), FButton_onButtonClick);
   //..........................................................
   // @process
   o.oeBuild            = FButton_oeBuild;
   o.oeMode             = FButton_oeMode;
   //..........................................................
   // @method
   o.setLabel           = FButton_setLabel;
   o.setLabelColor      = FButton_setLabelColor;
   o.setLabelStyle      = FButton_setLabelStyle;
   o.doClick            = FButton_doClick;
   o.dispose            = FButton_dispose;
   return o;
}

//==========================================================
// <T>鼠标进入按键事件。</T>
//
// @method
// @param event:event:TEvent
// @return EEventStatus.Stop
//==========================================================
function FButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('HoverLeft');
	  o.hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o.hRightButton.background = o.styleIconPath('HoverRight');
   }
}

//==========================================================
// <T>鼠标离开按键事件。</T>
//
// @method
// @param event:event:TEvent
// @return EEventStatus.Stop
//==========================================================
function FButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}


//==========================================================
//<T>鼠标进入按键事件。</T>
//
//@method
//@param event:event:TEvent
//@return EEventStatus.Stop
//==========================================================
function FButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('PressLeft');
	  o.hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o.hRightButton.background = o.styleIconPath('PressRight');
   }
}

//==========================================================
//<T>鼠标离开按键事件。</T>
//
//@method
//@param event:event:TEvent
//@return EEventStatus.Stop
//==========================================================
function FButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}

//==========================================================
// <T>点击按键的延时处理，防止按键被连续点中。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FButton_onButtonClickDelay(e){
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
function FButton_onClick(e){
   this.doClick();
}

//==========================================================
// <T>鼠标点击按键事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FButton_onButtonClick(e){
   this.doClick();
}

//==========================================================
// <T>构建按钮，链接相应事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   // 设置底板
   var hp = o.hPanel;
   hp.style.paddingTop = o.padTop ? o.padTop : 10;
   hp.style.pixelHeight = 26;
   // Set icon/label
   // 左圆角
   var hf = o.hForm = RBuilder.appendTable(hp);
   var hr = hf.insertRow();
   hr.height = 22;
   var hl = o.hLeftButton = hr.insertCell();
   hl.width = 3;
   hl.background = o.styleIconPath('ButtonLeft');
   // 中间部分
   var hm = o.hMiddleButton = hr.insertCell();
   hm.background = o.styleIconPath('Button');
   // 右圆角
   //hf.background = o.styleIconPath('Button');
   var hrb = o.hRightButton = hr.insertCell();
   hrb.width = 3;
   hrb.background = o.styleIconPath('ButtonRight');
   hf.style.cursor = 'hand';
   hf.style.border = 0;
   o.attachEvent('onButtonEnter', hf, o.onButtonEnter);
   o.attachEvent('onButtonLeave', hf, o.onButtonLeave);
   o.attachEvent('onButtonDown', hf, o.onButtonDown);
   o.attachEvent('onButtonUp', hf, o.onButtonUp);
   o.attachEvent('onButtonClick', hf);
   // 左边底板
   var hTb = RBuilder.appendTable(hm);
   var hr  = hTb.insertRow();
   var hc = hr.insertCell();
   hc.width = 10;
   // 建立图标
   if(o.icon){
      var hc = hr.insertCell();
      hc.width = 16;
      o.hIcon = RBuilder.appendIcon(hc, o.icon);
      hcc = hr.insertCell();
      hcc.width = 4;
   }
   // 建立标签
   if(o.label){
      var hc = hr.insertCell();
      hc.align = 'center';
      hc.noWrap = true;
      o.hLabel = RBuilder.appendText(hc, o.label);
      o.hLabel.style.font = 'icon';
   }
   // 右边底板
   var hc = o.hFormEnd = hr.insertCell();
   hc.width = 10;
   // 创建延时器
   o.__process = false;
   var ca = o.clickActive = new TActive(o, o.onButtonClickDelay);
   ca.interval = 500;
   ca.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(ca);
   // 返回状态
   return EEventStatus.Stop;
}

//==========================================================
// <T>转换模式事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FButton_oeMode(e){
   var o = this;
   o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}

//==========================================================
// <T>设置按钮文字</T>
//
// @method
// @param label:label:label
//==========================================================
function FButton_setLabel(v){
   var o = this;
   o.label = v;
   o.hLabel.innerText = v;
   o.hLabel.noWrap = true;
}

//==========================================================
//<T>设置按钮文字</T>
//
//@method
//@param label:label:label
//==========================================================
function FButton_setLabelColor(c){
   var o = this;
   o.hLabel.style.color = '#FF0000';
}

//==========================================================
//<T>设置按钮文字</T>
//
//@method
//@param label:label:label
//==========================================================
function FButton_setLabelStyle(c, w, s){
   var o = this;
   o.hLabel.style.color = '#FF0000';
   o.hLabel.style.fontWeight = 'bold';
   o.hLabel.style.fontSize = '12';
}

//==========================================================
// <T>点击处理。</T>
//
// @method
//==========================================================
function FButton_doClick(){
   var o = this;
   // 检查执行状态
   if(o.__process){
      return;
      //return alert(RContext.get('FButton:process'));
   }
   // 开始执行
   o.__process = true;
   o.clickActive.status = EActive.Active;
   o.lsnsClick.process(this);
   // 执行命令
   if(o.action){
      eval(o.action);
   }
   // 执行跳转页面
   if(o.page){
      // 获得关联表单
      var form = RHtml.form(o.hButton);
      // 获得跳转页面信息
      var p = RPage.parse(o.page);
      if(o.method){
         p.action = o.method;
      }
      p.split(o.attributes);
      // 设置传输内容
      var f = o.topControl(MDataset);
      if(f){
         var as = new TAttributes();
         f.saveValue(as);
         if(form && form.form_pack){
            form.form_pack.value = as.pack();
         }
      }
      // 提交表单
      p.post(form, RString.nvl(o.target, '_self'));
   }
   // 执行编辑地址
   if(o.editUrl){
      var w = RConsole.find(FButtonConsole).find();
      w.linkUrl(o.editUrl);
      w.show();
   }
   // 弹出指定表单
   if(o.editForm){
      var w = RConsole.find(FButtonFormConsole).find();
      w.linkForm(o);
      w.show();
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hFormEnd = null;
   o.hLabel = null;
}
