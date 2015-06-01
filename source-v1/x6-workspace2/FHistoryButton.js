//==========================================================
// <T>历史栏的按键。</T>
//
// @tool
// @param o:object:Object 拥有者对象
// @author maocy
// @version 1.0.1
//==========================================================
function FHistoryButton(o){
   o = RClass.inherits(this, o, FControl, MLsnClick);
   ///@event
   o.onButtonClick   = RClass.register(o, new HClick('onButtonClick'), FHistoryButton_onButtonClick);
   /// @style
   o.stButton        = RClass.register(o, new TStyle('Button'));
   o.stLabel         = RClass.register(o, new TStyle('Label'));
   o.stHover         = RClass.register(o, new TStyle('Hover'));
   o.stSelect        = RClass.register(o, new TStyle('Select'));
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
   o.oeBuild         = FHistoryButton_oeBuild;
   // Event
   o.onBuildPanel    = FHistoryButton_onBuildPanel;
   o.onEnter         = FHistoryButton_onEnter;
   o.onLeave         = FHistoryButton_onLeave;
   o.onMouseDown     = FHistoryButton_onMouseDown;
   o.onMouseUp       = FHistoryButton_onMouseUp;
   // Method
   o.setIcon         = FHistoryButton_setIcon;
   o.setText         = FHistoryButton_setText;
   o.setHint         = FHistoryButton_setHint;
   o.select          = FHistoryButton_select;
   o.setVisible      = FHistoryButton_setVisible;
   o.dispose         = FHistoryButton_dispose;
   return o;
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 构建事件的状态
//==========================================================
function FHistoryButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var b = e.builder;
   var h = o.hPanel;
   // 建立按键表格
   var hb = o.hButton = b.appendTable(o.hPanel, o.style('Panel'));
   var hl = o.hButtonLine = o.hButton.insertRow();
   var hc = o.hButtonPanel = hl.insertCell();
   o.attachEvent('onButtonClick', hc);
   // 建立图标
   o.hIcon = b.appendIcon(hc, o.icon);
   // 建立文本
   o.hText = b.append(hc, 'SPAN');
   o.hText.style.whiteSpace = 'nowrap';
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造底层面板。</T>
//
// @method
//==========================================================
function FHistoryButton_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Button'));
}

//==========================================================
// <T>鼠标进入控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FHistoryButton_onEnter(e){
   var o = this;
   if(!o.isSelected){
      o.hPanel.className = o.style('Hover');
   }
}

//==========================================================
// <T>鼠标离开控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FHistoryButton_onLeave(e){
   var o = this;
   if(!o.isSelected){
      o.hPanel.className = o.style('Button');
   }
}

//==========================================================
// <T>鼠标按下的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FHistoryButton_onMouseDown(e){
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
function FHistoryButton_onMouseUp(e){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Hover');
   }
}

//==========================================================
// <T>鼠标点击的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FHistoryButton_onButtonClick(e){
   this.bar.clickButton(this);
}

//==========================================================
// <T>点击按键。</T>
//
// @method
//==========================================================
function FHistoryButton_click(){
   this.onClick();
}

//==========================================================
// <T>设置按键的图标内容。</T>
//
// @method
// @param c:icon:String 图标名称
//==========================================================
function FHistoryButton_setIcon(c){
   this.hIcon.src = RRes.iconPath(c);
}

//==========================================================
// <T>设置按键的文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FHistoryButton_setText(t){
   this.hText.innerText = t;
}

function FHistoryButton_setHint(s){
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
function FHistoryButton_select(v){
   var o = this;
   o.isSelected = v;
   o.hPanel.className = v ? o.style('Select') : o.style('Button');
}

//==========================================================
// <T>点击控件的可见性。</T>
//
// @method
// @param v:visible:Boolean
//    <L value='true'>可见</L>
//    <L value='false'>不可见</L>
//==========================================================
function FHistoryButton_setVisible(v){
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
function FHistoryButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hSplit);
   o.hLine = null;
   o.hIcon = null;
   o.hText = null;
}
