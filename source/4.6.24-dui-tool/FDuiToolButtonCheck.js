//==========================================================
// <T>工具栏复选按键。</T>
//
// @class
// @author maocy
// @history 150121
//==========================================================
MO.FDuiToolButtonCheck = function FDuiToolButtonCheck(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton);
   //..........................................................
   // @property
   o._optionChecked = MO.Class.register(o, [new MO.APtyBoolean('_optionChecked', 'check'), new MO.AGetSet('_optionChecked')]);
   o._groupName     = MO.Class.register(o, [new MO.APtyString('_groupName'), new MO.AGetSet('_groupName')]);
   o._groupDefault  = MO.Class.register(o, [new MO.APtyString('_groupDefault'), new MO.AGetSet('_groupDefault')]);
   //..........................................................
   // @attribute
   o._statusChecked = false;
   //..........................................................
   // @event
   o.onEnter        = MO.FDuiToolButtonCheck_onEnter;
   o.onLeave        = MO.FDuiToolButtonCheck_onLeave;
   o.onMouseDown    = MO.FDuiToolButtonCheck_onMouseDown;
   o.onMouseUp      = MO.FDuiToolButtonCheck_onMouseUp;
   //..........................................................
   // @method
   o.innerCheck     = MO.FDuiToolButtonCheck_innerCheck;
   o.isCheck        = MO.FDuiToolButtonCheck_isCheck;
   o.check          = MO.FDuiToolButtonCheck_check;
   // @method
   o.dispose        = MO.FDuiToolButtonCheck_dispose;
   return o;
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDuiToolButtonCheck_onEnter = function FDuiToolButtonCheck_onEnter(p){
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
MO.FDuiToolButtonCheck_onLeave = function FDuiToolButtonCheck_onLeave(p){
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
MO.FDuiToolButtonCheck_onMouseDown = function FDuiToolButtonCheck_onMouseDown(p){
   var o = this;
   o.check(!o._statusChecked);
   var event = new MO.SClickEvent(o);
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
MO.FDuiToolButtonCheck_onMouseUp = function FDuiToolButtonCheck_onMouseUp(){
   var o = this;
   //o._hForm.className = o.styleName('Hover');
   //o.check(!o._statusChecked)
   //if(o.action){
      //eval(o.action);
   //}
}

//==========================================================
// <T>内部选中处理。</T>
//
// @method
// @param p:check:Boolean 选中
//==========================================================
MO.FDuiToolButtonCheck_innerCheck = function FDuiToolButtonCheck_innerCheck(p){
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
MO.FDuiToolButtonCheck_isCheck = function FDuiToolButtonCheck_isCheck(){
   return this._statusChecked;
}

//==========================================================
// <T>选中处理。</T>
//
// @method
// @param p:check:Boolean 选中
//==========================================================
MO.FDuiToolButtonCheck_check = function FDuiToolButtonCheck_check(p){
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
      if(!MO.String.isEmpty(o._groupName)){
         var cs = o._parent.components();
         for(var i = cs.count() - 1; i >= 0; i--){
            var c = cs.value(i);
            if(c != o){
               if(MO.Class.isClass(c, FDuiToolButtonCheck)){
                  c.innerCheck(false);
               }
            }
         }
      }
   }else{
      // 选中默认按键
      if(!MO.String.isEmpty(o._groupDefault)){
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
MO.FDuiToolButtonCheck_dispose = function FDuiToolButtonCheck_dispose(){
   var o = this;
   o._statusChecked = null;
   o._groupName = null;
   o.__base.FDuiToolButton.dispose.call(o);
}
