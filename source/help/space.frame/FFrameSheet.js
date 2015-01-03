//==========================================================
// <T>历史栏的按键。</T>
//
// @tool
// @param o:object:Object 拥有者对象
// @author maocy
// @version 1.0.1
//==========================================================
function FFrameSheet(o){
   o = RClass.inherits(this, o, FControl, MLsnClick);
   ///@event
   o.onButtonClick   = RClass.register(o, new HClick('onButtonClick'), FFrameSheet_onButtonClick);
   /// @style
   //o.stButton        = RClass.register(o, new TStyle('Button'));
   //o.stLabel         = RClass.register(o, new TStyle('Label'));
   //o.stHover         = RClass.register(o, new TStyle('Hover'));
   //o.stSelect        = RClass.register(o, new TStyle('Select'));
   // Attribute
   o.icon            = 'ctl.form-table';
   o.store           = new Object();
   o.isSelected      = false;
   // Html
   o.hButton         = null;
   o.hButtonLine     = null;
   o.hButtonPanel    = null;
   o.hIcon           = null;
   o.hText           = null;
   // Process Event
   o.oeBuild         = FFrameSheet_oeBuild;
   // Event
   o.onBuildPanel    = FFrameSheet_onBuildPanel;
   o.onEnter         = FFrameSheet_onEnter;
   o.onLeave         = FFrameSheet_onLeave;
   o.onMouseDown     = FFrameSheet_onMouseDown;
   o.onMouseUp       = FFrameSheet_onMouseUp;
   // Method
   o.setIcon         = FFrameSheet_setIcon;
   o.setText         = FFrameSheet_setText;
   o.setHint         = FFrameSheet_setHint;
   o.select          = FFrameSheet_select;
   o.setVisible      = FFrameSheet_setVisible;
   o.dispose         = FFrameSheet_dispose;
   return o;
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 构建事件的状态
//==========================================================
function FFrameSheet_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var b = e.builder;
   var hpr = o.hPanel.insertRow();

   // 建立按键表格
   var hbp = o.hButtonPanel = hpr.insertCell();
   var hb = o.hButton = b.appendTable(hbp);
   hb.style.cursor = 'hand';
   o.attachEvent('onButtonClick', hb);

   var hl = o.hButtonLine = o.hButton.insertRow();
   var hc = hl.insertCell();
   hc.style.paddingTop = 4;
   hc.style.paddingLeft = 8;
   hc.style.paddingRight = 4;
   hc.style.paddingBottom = 2;
   // 建立图标
   o.hIcon = b.appendIcon(hc, o.icon);
   // 建立文本
   o.hText = b.append(hc, 'SPAN');
   o.hText.style.whiteSpace = 'nowrap';
   o.hText.style.color = '#CCCCCC';
   o.hText.innerText = ' ' + o.label + ' ';
   var hc = hl.insertCell();
   hc.width = 10;
   o.hCloseIcon = b.appendIcon(hc);
   o.hCloseIcon.style.display = 'none';
   //
   var hc = o.hRight = hpr.insertCell();
   hc.width = 5;
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造底层面板。</T>
//
// @method
//==========================================================
function FFrameSheet_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}

//==========================================================
// <T>鼠标进入控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFrameSheet_onEnter(e){
   var o = this;
   if(!o.isSelected){
      o.hButtonPanel.style.background = 'url(back_hover.png)';
      o.hRight.style.background = 'url(back_right_hover.png)';
      o.hCloseIcon.src = 'close_hover.png'
      o.hCloseIcon.style.display = 'block';
   }
}

//==========================================================
// <T>鼠标离开控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFrameSheet_onLeave(e){
   var o = this;
   if(!o.isSelected){
      o.hButtonPanel.style.background = '';
      o.hRight.style.background = '';
      o.hCloseIcon.style.display = 'none';
   }
}

//==========================================================
// <T>鼠标按下的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFrameSheet_onMouseDown(e){
   if(!this.disabled){
      //this.hPanel.className = this.style('Press');
   }
}

//==========================================================
// <T>鼠标弹起的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFrameSheet_onMouseUp(e){
   var o = this;
   if(!o.disabled){
      //o.hPanel.className = o.style('Hover');
   }
}

//==========================================================
// <T>鼠标点击的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFrameSheet_onButtonClick(e){
   this.bar.select(this);
}

//==========================================================
// <T>点击按键。</T>
//
// @method
//==========================================================
function FFrameSheet_click(){
   this.onClick();
}

//==========================================================
// <T>设置按键的图标内容。</T>
//
// @method
// @param c:icon:String 图标名称
//==========================================================
function FFrameSheet_setIcon(c){
   this.hIcon.src = RRes.iconPath(c);
}

//==========================================================
// <T>设置按键的文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FFrameSheet_setText(t){
   this.hText.innerText = t;
}

function FFrameSheet_setHint(s){
   this.hText.title = s;
}

//==========================================================
// <T>点击控件的选中状态。</T>
//
// @method
// @param v:select:Boolean
//    <L value='true'>选中</L>
//    <L value='false'>未选中</L>
//==========================================================
function FFrameSheet_select(v){
   var o = this;
   o.isSelected = v;
   if(v){
      o.hText.style.color = '#333333';
      //o.hText.style.fontWeight = 'bold';
      o.hButtonPanel.style.background = 'url(back.png)';
      o.hRight.style.background = 'url(back_right.png)';
      o.hCloseIcon.style.display = 'block';
      o.hCloseIcon.src = 'close.png'
   }else{
      //o.hText.style.fontWeight = 'normal';
      o.hText.style.color = '#CCCCCC';
      o.hButtonPanel.style.background = '';
      o.hRight.style.background = '';
      o.hCloseIcon.style.display = 'none';
   }
}

//==========================================================
// <T>点击控件的可见性。</T>
//
// @method
// @param v:visible:Boolean
//    <L value='true'>可见</L>
//    <L value='false'>不可见</L>
//==========================================================
function FFrameSheet_setVisible(v){
   var o = this;
   if(o.hSplit){
      o.hSplit.style.display = v ? 'block' : 'none';
   }
   o.hParent.style.display = v ? 'block' : 'none';
}

//==========================================================
// <T>点击控件的可见性。</T>
//
// @method
// @param v:visible:Boolean
//    <L value='true'>可见</L>
//    <L value='false'>不可见</L>
//==========================================================
function FFrameSheet_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hSplit);
   o.hLine = null;
   o.hIcon = null;
   o.hText = null;
}
