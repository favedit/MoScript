with(MO){
   //==========================================================
   // <T>工具栏菜单按键。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FUiToolButtonMenu = function FUiToolButtonMenu(o){
      o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MUiDropable, MUiFocus);
      //..........................................................
      // @attribute
      o._menu           = null;
      o._statusDrop     = false;
      //..........................................................
      // @html
      o._hDropPanel     = null;
      //..........................................................
      // @style
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
      //..........................................................
      // @event
      o.onBuild         = FUiToolButtonMenu_onBuild;
      // @event
      o.onEnter         = FUiToolButtonMenu_onEnter;
      o.onLeave         = FUiToolButtonMenu_onLeave;
      o.onMouseDown     = FUiToolButtonMenu_onMouseDown;
      o.onBlur          = FUiToolButtonMenu_onBlur;
      o.onMouseUp       = RMethod.empty;
      //..........................................................
      // @method
      o.construct       = FUiToolButtonMenu_construct;
      // @method
      o.push            = FUiToolButtonMenu_push;
      o.drop            = FUiToolButtonMenu_drop;
      o.doClick         = FUiToolButtonMenu_doClick;
      o.dispose         = FUiToolButtonMenu_dispose;
      return o;
   }

   //==========================================================
   // <T>构建页面对象。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiToolButtonMenu_onBuild = function FUiToolButtonMenu_onBuild(event){
      var o = this;
      o.__base.FUiToolButton.onBuild.call(o, event);
      // 建立下拉按键
      var hDropPanel = o._hDropPanel = RBuilder.appendTableCell(o._hLine);
      o.onBuildDrop(hDropPanel);
      //o._hDropIcon = RBuilder.appendIcon(h, o.styleIcon('Drop'));
      //o.attachEvent('onDropClick', hDropPanel);
      // 建立弹出菜单
      o._menu.onBuild(event);
   }

   //==========================================================
   // <T>鼠标进入按钮时处理。</T>
   //
   // @method
   // @param event:SEvent 事件对象
   //==========================================================
   MO.FUiToolButtonMenu_onEnter = function FUiToolButtonMenu_onEnter(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FUiToolButton.onEnter.call(o, event);
         //if(!o._disabled){
         //   o._hDropIcon.src = o.styleIconPath('DropHover');
         //}
      }
   }

   //==========================================================
   // <T>鼠标离开按钮时处理。</T>
   //
   // @method
   // @param event:SEvent 事件对象
   //==========================================================
   MO.FUiToolButtonMenu_onLeave = function FUiToolButtonMenu_onLeave(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FUiToolButton.onLeave.call(o, event);
         //if(!o._disabled){
            //o._hDropIcon.src = o.styleIconPath('Drop');
         //}
      }
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiToolButtonMenu_onMouseDown = function FUiToolButtonMenu_onMouseDown(){
      var o = this;
      //if(o.hintBox){
      //   o.hintBox.hide();
      //}
      if(!o._statusDrop){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
      //if(!o._disabled){
      //}
   }

   //==========================================================
   // <T>菜单失去焦点时处理。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiToolButtonMenu_onBlur = function FUiToolButtonMenu_onBlur(e){
      var o = this;
      //if(e){
      //   if(o._menu.testInRange(e)){
      //      return false;
      //   }
      //}
      //o.hPanel.className = o.style('Button');
      //o._menu.hide();
   }

   //==========================================================
   // <T>构建对象。</T>
   //
   // @method
   //==========================================================
   MO.FUiToolButtonMenu_construct = function FUiToolButtonMenu_construct(){
      var o = this;
      o.__base.FUiToolButton.construct.call(o);
      // 创建弹出窗口
      var menu = o._menu = RClass.create(FUiPopupMenu);
      menu._opener = o;
   }

   //==========================================================
   // <T>添加一个菜单选项到这个菜单里。</T>
   //
   // @method
   // @param p:component:FComponent 组件
   //==========================================================
   MO.FUiToolButtonMenu_push = function FUiToolButtonMenu_push(c){
      var o = this;
      if(RClass.isClass(c, MUiMenuButton)){
         return o._menu.push(c);
      }
      o.__base.FUiToolButton.push.call(o, c);
   }

   //==========================================================
   // <T>弹出下拉框。</T>
   //
   // @method
   //==========================================================
   MO.FUiToolButtonMenu_drop = function FUiToolButtonMenu_drop(flag){
      var o = this;
      if(!o._disabled){
         o._statusDrop = !o._statusDrop;
         if(o._statusDrop){
            o._hForm.className = o.styleName('Press');
            o._menu.show(this._hDropPanel, EUiAlign.BottomRight);
            RConsole.find(FUiPopupConsole).show(o._menu);
         }else{
            o._hForm.className = o.styleName('Normal');
            o._menu.hide();
         }
      }
   }

   //==========================================================
   // <T>点击处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiToolButtonMenu_doClick = function FUiToolButtonMenu_doClick(){
      var o = this;
      o.__base.FUiToolButton.doClick.call(o);
      o.drop(!o._statusDrop);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiToolButtonMenu_dispose = function FUiToolButtonMenu_dispose(){
      var o = this;
      o._hDropIcon = RHtml.free(o._hDropIcon);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.FControl.dispose.call(o);
   }
}
