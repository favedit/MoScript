//==========================================================
// <T>菜单按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
function FUiMenuButton(o){
   o = RClass.inherits(this, o, FUiControl, MMenuButton, MListenerClick);
   //..........................................................
   // @property
   o._icon         = RClass.register(o, new APtyString('_icon'));
   o._iconDisable  = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('_hotkey'));
   o._action       = RClass.register(o, new APtyString('_action'));
   //..........................................................
   // @style
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel'));
   //..........................................................
   // @attribute
   o._disabled     = false;
   //..........................................................
   // @html
   o._hIcon        = null;
   o._hLabel       = null;
   //..........................................................
   // @event
   o.onBuildPanel  = FUiMenuButton_onBuildPanel
   o.onBuild       = FUiMenuButton_onBuild;
   // @event
   o.onEnter       = FUiMenuButton_onEnter;
   o.onLeave       = FUiMenuButton_onLeave;
   o.onMouseDown   = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiMenuButton_onMouseDown);
   o.onMouseUp     = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiMenuButton_onMouseUp);
   //..........................................................
   // @method
   o.icon          = FUiMenuButton_icon;
   o.setIcon       = FUiMenuButton_setIcon;
   o.setLabel      = FUiMenuButton_setLabel;
   o.setEnable     = FUiMenuButton_setEnable;
   o.click         = FUiMenuButton_click;
   o.dispose       = FUiMenuButton_dispose;
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
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiMenuButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FUiMenuButton_onBuild(e){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, e);
   // 设置面板
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   // 建立图标
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(h, o.styleName('Icon'), o._icon);
   }
   // 建立标签
   if(o._label){
      o._hLabel = RBuilder.appendText(h, o.styleName('Label'));
      o.setLabel(o._label);
   }
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiMenuButton_onEnter(p){
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
function FUiMenuButton_onLeave(){
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
function FUiMenuButton_onMouseDown(){
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
function FUiMenuButton_onMouseUp(){
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
function FUiMenuButton_icon(){
   return this._icon;
}

//==========================================================
// <T>设置图标。</T>
//
// @method
// @param p:icon:String 图标
//==========================================================
function FUiMenuButton_setIcon(p){
   this._icon = p;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:label:String 标签
//==========================================================
function FUiMenuButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   if(o._hIcon){
      s = ' ' + o._label;
   }
   if(o._hLabel){
      o._hLabel.innerText = s;
   }
}

//==========================================================
// <T>设置控件的可操作和禁止。</T>
//
// @method
// @param p:enable:Boolean 是否可操作
//==========================================================
function FUiMenuButton_setEnable(p){
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
function FUiMenuButton_click(){
   var o = this;
   if(!o._disabled){
      // 执行监听信息
      o.processClickListener(o);
      //RConsole.find(FFocusConsole).blur();
      // 执行脚本
      //if(o._action){
         //eval(o._action);
      //}
      // 按键处理
      //if(o._page || o._method){
         //var form = RHtml.form(o._hButton);
         //var p = RPage.parse(o._page);
         //if(o._method){
         //   p._action = o._method;
         //}
         //p.split(o._attributes);
         //p.post(form, o._target);
      //}
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiMenuButton_dispose(){
   var o = this;
   // 释放属性
   o._hIcon = null;
   o._hLabel = null;
   // 父处理
   o.__base.FUiControl.dispose.call(o);
}
