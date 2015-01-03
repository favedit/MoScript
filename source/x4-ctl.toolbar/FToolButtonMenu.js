//==========================================================
// 工具栏类中的菜单按钮
//
// @class
// @history 091116 MAOCY 创建
//==========================================================
function FToolButtonMenu(o){
   o = RClass.inherits(this, o, FToolButton, MContainer, MDropable, MFocus);
   //..........................................................
   // @attribute
   o.popup         = null;
   //..........................................................
   // @html
   o.hDropPanel    = null;
   //..........................................................
   // @style
   o.siDropHover   = RClass.register(o, new TStyleIcon('DropHover'));
   //..........................................................
   // @event
   o.onEnter       = FToolButtonMenu_onEnter;
   o.onLeave       = FToolButtonMenu_onLeave;
   o.onBlur        = FToolButtonMenu_onBlur;
   o.onButtonClick = FToolButtonMenu_onButtonClick;
   o.onDropClick   = FToolButtonMenu_onDropClick;
   //..........................................................
   // @process
   o.oeBuild       = FToolButtonMenu_oeBuild;
   //..........................................................
   // @method
   o.construct     = FToolButtonMenu_construct;
   o.push          = FToolButtonMenu_push;
   o.drop          = FToolButtonMenu_drop;
   o.dispose       = FToolButtonMenu_dispose;
   return o;
}

//==========================================================
// <T>鼠标进入按钮时处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FToolButtonMenu_onEnter(e){
   var o = this;
   o.base.FToolButton.onEnter.call(o, e);
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
function FToolButtonMenu_onLeave(e){
   var o = this;
   if(!o.popup.isVisible()){
      o.base.FToolButton.onLeave.call(o, e);
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
function FToolButtonMenu_onBlur(e){
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
function FToolButtonMenu_onButtonClick(){
   var o = this;
   if(!o.disabled){
      o.base.FToolButton.onButtonClick.call(o);
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
function FToolButtonMenu_onDropClick(e){
   this.drop();
}

//==========================================================
// <T>构建页面对象。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FToolButtonMenu_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      o.base.FToolButton.oeBuild.call(o, e);
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
function FToolButtonMenu_construct(){
   var o = this;
   o.popup = RClass.create(FPopupMenu);
   o.popup.opener = o;
}

//==========================================================
// <T>添加一个菜单选项到这个菜单里。</T>
//
// @method
// @param p:component:FComponent 组件
//==========================================================
function FToolButtonMenu_push(c){
   var o = this;
   if(RClass.isClass(c, MMenuButton)){
      return o.popup.push(c);
   }
   o.base.FToolButton.push.call(o, c);
}

//==========================================================
// <T>弹出下拉框。</T>
//
// @method
//==========================================================
function FToolButtonMenu_drop(){
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
function FToolButtonMenu_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDropIcon = null;
   o.hDropPanel = null;
}