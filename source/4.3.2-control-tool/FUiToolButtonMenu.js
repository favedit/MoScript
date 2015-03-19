//==========================================================
// <T>工具栏菜单按键。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FUiToolButtonMenu(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MDropable, MUiFocus);
   //..........................................................
   // @attribute
   o.popup         = null;
   //..........................................................
   // @html
   o.hDropPanel    = null;
   //..........................................................
   // @style
   o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
   //..........................................................
   // @event
   o.onBuild       = FUiToolButtonMenu_onBuild;
   // @event
   o.onEnter       = FUiToolButtonMenu_onEnter;
   o.onLeave       = FUiToolButtonMenu_onLeave;
   o.onBlur        = FUiToolButtonMenu_onBlur;
   o.onButtonClick = FUiToolButtonMenu_onButtonClick;
   o.onDropClick   = FUiToolButtonMenu_onDropClick;
   //..........................................................
   // @method
   o.construct     = FUiToolButtonMenu_construct;
   o.push          = FUiToolButtonMenu_push;
   o.drop          = FUiToolButtonMenu_drop;
   o.dispose       = FUiToolButtonMenu_dispose;
   return o;
}

//==========================================================
// <T>鼠标进入按钮时处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiToolButtonMenu_onEnter(e){
   var o = this;
   o.__base.FUiToolButton.onEnter.call(o, e);
   if(!o.disabled){
      o.hDropIcon.src = o.styleIconPath('DropHover');
   }
}

//==========================================================
// <T>鼠标离开按钮时处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiToolButtonMenu_onLeave(e){
   var o = this;
   if(!o.popup.isVisible()){
      o.__base.FUiToolButton.onLeave.call(o, e);
      if(!o.disabled){
         o.hDropIcon.src = o.styleIconPath('Drop');
      }
   }
}

//==========================================================
// <T>菜单失去焦点时处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiToolButtonMenu_onBlur(e){
   var o = this;
   if(e){
      if(o.popup.testInRange(e)){
         return false;
      }
   }
   o.hPanel.className = o.style('Button');
   o.popup.hide();
}

//==========================================================
// <T>鼠标点击按钮时处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiToolButtonMenu_onButtonClick(){
   var o = this;
   if(!o.disabled){
      o.__base.FUiToolButton.onButtonClick.call(o);
      if(!(o.action || o.page)){
         o.drop();
      }else if(o.action){
         eval(o.action);
      }
   }
}

//==========================================================
// <T>下拉处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiToolButtonMenu_onDropClick(e){
   this.drop();
}

//==========================================================
// <T>构建页面对象。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiToolButtonMenu_onBuild(e){
   var o = this;
   return o.__base.FUiToolButton.onBuild.call(o, e);
   if(e.isBefore()){
      var h = o.hDropPanel = o.hButtonLine.insertCell();
      h.className = o.style('Drop')
      o.hDropIcon = RBuilder.appendIcon(h, o.styleIcon('Drop'));
      o.attachEvent('onDropClick', h);
   }
   if(e.isAfter()){
      o.popup.psBuild();
   }
   return EEventStatus.Continue;
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
function FUiToolButtonMenu_construct(){
   var o = this;
   o.__base.FUiToolButton.construct.call(o);
   //o.popup = RClass.create(FPopupMenu);
   //o.popup.opener = o;
}

//==========================================================
// <T>添加一个菜单选项到这个菜单里。</T>
//
// @method
// @param p:component:FComponent 组件
//==========================================================
function FUiToolButtonMenu_push(c){
   var o = this;
   //if(RClass.isClass(c, MMenuButton)){
   //   return o.popup.push(c);
   //}
   //o.__base.FUiToolButton.push.call(o, c);
}

//==========================================================
// <T>弹出下拉框。</T>
//
// @method
//==========================================================
function FUiToolButtonMenu_drop(){
   var o = this;
   if(!o.disabled){
      o.popup.show(this.hDropPanel, EAlign.BottomRight);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiToolButtonMenu_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   o.hDropIcon = null;
   o.hDropPanel = null;
}