//==========================================================
// <T>菜单按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
function FMenuButton(o){
   o = RClass.inherits(this, o, FControl, MMenuButton);
   //..........................................................
   // @property
   o._icon         = RClass.register(o, new APtyString('icon'));
   o._iconDisable  = RClass.register(o, new APtyString('iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('hotkey'));
   o._action       = RClass.register(o, new APtyString('action'));
   //..........................................................
   // @style
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleLabel', 'Icon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   //..........................................................
   // @attribute
   o._disabled     = false;
   //..........................................................
   // @html
   o._hIcon        = null;
   o._hText        = null;
   //..........................................................
   // @event
   o.onBuildPanel  = FMenuButton_onBuildPanel
   o.onEnter       = FMenuButton_onEnter;
   o.onLeave       = FMenuButton_onLeave;
   o.onMouseDown   = FMenuButton_onMouseDown;
   o.onMouseUp     = FMenuButton_onMouseUp;
   //..........................................................
   // @process
   o.oeBuild       = FMenuButton_oeBuild;
   //..........................................................
   // @method
   o.icon          = FMenuButton_icon;
   o.setIcon       = FMenuButton_setIcon;
   o.setEnable     = FMenuButton_setEnable;
   o.click         = FMenuButton_click;
   o.dispose       = FMenuButton_dispose;
   //..........................................................
   // @property
   //o._target     = RClass.register(o, new APtyString('target'));
   //o._page       = RClass.register(o, new APtyString('page'));
   //o._method     = RClass.register(o, new APtyString('method'));
   //o._attributes = RClass.register(o, new APtyString('attributes'));
   //..........................................................
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FMenuButton_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Normal'));
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FMenuButton_onEnter(p){
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
function FMenuButton_onLeave(){
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
function FMenuButton_onMouseDown(){
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
function FMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FMenuButton_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e);
   // 构建对象
   //var hb = o._hButton = RBuilder.appendTable(o._hPanel, o.style('Button'));
   //o.attachEvent('onButtonMouseDown', o._hButton);
   //var hLine = o._hButtonLine = o._hButton.insertRow();
   //var hCel = hLine.insertCell();
   //hCel.noWrap = 'true';
   var hc = o._hPanel;
   // 建立图标
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(hc, o.styleName('Icon'), o._icon);
   }
   // 建立标签
   if(o._label){
      var s = o._label;
      if(o._hIcon){
         //s = '&nbsp;' + o._label;
      }
      o.hLabel = RBuilder.appendText(hc, o.styleName('Label'), s);
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>获得图标。</T>
//
// @method
// @return String 图标
//==========================================================
function FMenuButton_icon(){
   return this._icon;
}

//==========================================================
// <T>设置图标。</T>
//
// @method
// @param p:icon:String 图标
//==========================================================
function FMenuButton_setIcon(p){
   this._icon = p;
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param p:enable:Boolean 是否可操作
//==========================================================
function FMenuButton_setEnable(p){
   var o = this;
   o.__base.FControl.setEnable.call(o, p);
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
function FMenuButton_click(){
   var o = this;
   if(!o._disabled){
      //RConsole.find(FFocusConsole).blur();
      // 执行脚本
      if(o._action){
         eval(o._action);
      }
      // 按键处理
      if(o._page || o._method){
         //var form = RHtml.form(o._hButton);
         //var p = RPage.parse(o._page);
         //if(o._method){
         //   p._action = o._method;
         //}
         //p.split(o._attributes);
         //p.post(form, o._target);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FMenuButton_dispose(){
   var o = this;
   // 释放属性
   o._hIcon = null;
   o._hText = null;
   // 父处理
   o.__base.FControl.dispose.call(o);
}
