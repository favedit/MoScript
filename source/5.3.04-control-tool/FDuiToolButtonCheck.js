with(MO){
   //==========================================================
   // <T>工具栏复选按键。</T>
   //
   // @class
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FUiToolButtonCheck = function FUiToolButtonCheck(o){
      o = RClass.inherits(this, o, FUiToolButton);
      //..........................................................
      // @property
      o._optionChecked  = RClass.register(o, new APtyBoolean('_optionChecked', 'check'));
      o._groupName      = RClass.register(o, new APtyString('_groupName'));
      o._groupDefault   = RClass.register(o, new APtyString('_groupDefault'));
      //..........................................................
      // @attribute
      o._statusChecked  = false;
      //..........................................................
      // @event
      o.onEnter         = FUiToolButtonCheck_onEnter;
      o.onLeave         = FUiToolButtonCheck_onLeave;
      o.onMouseDown     = FUiToolButtonCheck_onMouseDown;
      o.onMouseUp       = FUiToolButtonCheck_onMouseUp;
      //..........................................................
      // @method
      o.groupName       = FUiToolButtonCheck_groupName;
      o.setGroupName    = FUiToolButtonCheck_setGroupName;
      o.groupDefault    = FUiToolButtonCheck_groupDefault;
      o.setGroupDefault = FUiToolButtonCheck_setGroupDefault;
      o.innerCheck      = FUiToolButtonCheck_innerCheck;
      o.isCheck         = FUiToolButtonCheck_isCheck;
      o.check           = FUiToolButtonCheck_check;
      o.dispose         = FUiToolButtonCheck_dispose;
      return o;
   }

   //==========================================================
   // <T>鼠标进入处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiToolButtonCheck_onEnter = function FUiToolButtonCheck_onEnter(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Hover');
      }
   }

   //==========================================================
   // <T>鼠标离开处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiToolButtonCheck_onLeave = function FUiToolButtonCheck_onLeave(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Normal');
      }
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiToolButtonCheck_onMouseDown = function FUiToolButtonCheck_onMouseDown(p){
      var o = this;
      o.check(!o._statusChecked);
      var event = new SClickEvent(o);
      event.checked = o._statusChecked;
      o.processClickListener(event, o._statusChecked);
      event.dispose();
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FUiToolButtonCheck_onMouseUp = function FUiToolButtonCheck_onMouseUp(){
      var o = this;
      //o._hForm.className = o.styleName('Hover');
      //o.check(!o._statusChecked)
      //if(o.action){
         //eval(o.action);
      //}
   }

   //==========================================================
   // <T>获得分组名称。</T>
   //
   // @method
   // @return String 分组名称
   //==========================================================
   MO.FUiToolButtonCheck_groupName = function FUiToolButtonCheck_groupName(){
      return this._groupName;
   }

   //==========================================================
   // <T>设置分组名称。</T>
   //
   // @method
   // @param p:groupName:String 分组名称
   //==========================================================
   MO.FUiToolButtonCheck_setGroupName = function FUiToolButtonCheck_setGroupName(p){
      this._groupName = p;
   }

   //==========================================================
   // <T>获得分组默认。</T>
   //
   // @method
   // @return String 分组默认
   //==========================================================
   MO.FUiToolButtonCheck_groupDefault = function FUiToolButtonCheck_groupDefault(){
      return this._groupDefault;
   }

   //==========================================================
   // <T>设置分组默认。</T>
   //
   // @method
   // @param p:groupDefault:String 分组默认
   //==========================================================
   MO.FUiToolButtonCheck_setGroupDefault = function FUiToolButtonCheck_setGroupDefault(p){
      this._groupDefault = p;
   }

   //==========================================================
   // <T>内部选中处理。</T>
   //
   // @method
   // @param p:check:Boolean 选中
   //==========================================================
   MO.FUiToolButtonCheck_innerCheck = function FUiToolButtonCheck_innerCheck(p){
      var o = this;
      // 设置状态
      if(o._statusChecked != p){
         o._statusChecked = p;
         if(p){
            o._hForm.className = o.styleName('Press');
         }else{
            o._hForm.className = o.styleName('Normal');
         }
      }
   }

   //==========================================================
   // <T>获得选中状态。</T>
   //
   // @method
   // @return Boolean 选中状态
   //==========================================================
   MO.FUiToolButtonCheck_isCheck = function FUiToolButtonCheck_isCheck(){
      return this._statusChecked;
   }

   //==========================================================
   // <T>选中处理。</T>
   //
   // @method
   // @param p:check:Boolean 选中
   //==========================================================
   MO.FUiToolButtonCheck_check = function FUiToolButtonCheck_check(p){
      var o = this;
      // 禁止取消默认按键
      if(!p){
         if(o._groupDefault == o){
            return;
         }
      }
      // 设置状态
      o.innerCheck(p);
      // 修改组内其他空间行为
      if(!o._parent){
         return;
      }
      if(p){
         // 其他按键改为非选中
         if(!RString.isEmpty(o._groupName)){
            var cs = o._parent.components();
            for(var i = cs.count() - 1; i >= 0; i--){
               var c = cs.value(i);
               if(c != o){
                  if(RClass.isClass(c, FUiToolButtonCheck)){
                     c.innerCheck(false);
                  }
               }
            }
         }
      }else{
         // 选中默认按键
         if(!RString.isEmpty(o._groupDefault)){
            var components = o._parent.components();
            var control = components.get(o._groupDefault);
            if(control){
               control.innerCheck(true);
            }else{
               MO.Logger.error("Can't find group default control. (name={1})", o._groupDefault);
            }
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiToolButtonCheck_dispose = function FUiToolButtonCheck_dispose(){
      var o = this;
      o._statusChecked = null;
      o._groupName = null;
      o.__base.FUiToolButton.dispose.call(o);
   }
}
