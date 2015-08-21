with(MO){
   //==========================================================
   // <T>工具栏菜单按键。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDuiToolButtonMenu = function FDuiToolButtonMenu(o){
      o = RClass.inherits(this, o, FDuiToolButton, MDuiContainer, MDuiDropable, MDuiFocus);
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
      o.onBuild         = FDuiToolButtonMenu_onBuild;
      // @event
      o.onEnter         = FDuiToolButtonMenu_onEnter;
      o.onLeave         = FDuiToolButtonMenu_onLeave;
      o.onMouseDown     = FDuiToolButtonMenu_onMouseDown;
      o.onBlur          = FDuiToolButtonMenu_onBlur;
      o.onMouseUp       = RMethod.empty;
      //..........................................................
      // @method
      o.construct       = FDuiToolButtonMenu_construct;
      // @method
      o.push            = FDuiToolButtonMenu_push;
      o.drop            = FDuiToolButtonMenu_drop;
      o.doClick         = FDuiToolButtonMenu_doClick;
      o.dispose         = FDuiToolButtonMenu_dispose;
      return o;
   }

   //==========================================================
   // <T>构建页面对象。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FDuiToolButtonMenu_onBuild = function FDuiToolButtonMenu_onBuild(event){
      var o = this;
      o.__base.FDuiToolButton.onBuild.call(o, event);
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
   MO.FDuiToolButtonMenu_onEnter = function FDuiToolButtonMenu_onEnter(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FDuiToolButton.onEnter.call(o, event);
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
   MO.FDuiToolButtonMenu_onLeave = function FDuiToolButtonMenu_onLeave(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FDuiToolButton.onLeave.call(o, event);
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
   MO.FDuiToolButtonMenu_onMouseDown = function FDuiToolButtonMenu_onMouseDown(){
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
   MO.FDuiToolButtonMenu_onBlur = function FDuiToolButtonMenu_onBlur(e){
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
   MO.FDuiToolButtonMenu_construct = function FDuiToolButtonMenu_construct(){
      var o = this;
      o.__base.FDuiToolButton.construct.call(o);
      // 创建弹出窗口
      var menu = o._menu = RClass.create(FDuiPopupMenu);
      menu._opener = o;
   }

   //==========================================================
   // <T>添加一个菜单选项到这个菜单里。</T>
   //
   // @method
   // @param p:component:FComponent 组件
   //==========================================================
   MO.FDuiToolButtonMenu_push = function FDuiToolButtonMenu_push(c){
      var o = this;
      if(RClass.isClass(c, MUiMenuButton)){
         return o._menu.push(c);
      }
      o.__base.FDuiToolButton.push.call(o, c);
   }

   //==========================================================
   // <T>弹出下拉框。</T>
   //
   // @method
   //==========================================================
   MO.FDuiToolButtonMenu_drop = function FDuiToolButtonMenu_drop(flag){
      var o = this;
      if(!o._disabled){
         o._statusDrop = !o._statusDrop;
         if(o._statusDrop){
            o._hForm.className = o.styleName('Press');
            o._menu.show(this._hDropPanel, EUiAlign.BottomRight);
            RConsole.find(FDuiPopupConsole).show(o._menu);
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
   MO.FDuiToolButtonMenu_doClick = function FDuiToolButtonMenu_doClick(){
      var o = this;
      o.__base.FDuiToolButton.doClick.call(o);
      o.drop(!o._statusDrop);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiToolButtonMenu_dispose = function FDuiToolButtonMenu_dispose(){
      var o = this;
      o._hDropIcon = RHtml.free(o._hDropIcon);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.FControl.dispose.call(o);
   }
}
