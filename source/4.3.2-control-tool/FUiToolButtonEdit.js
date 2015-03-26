//==========================================================
// <T>工具栏复选按键。</T>
//
// @class
// @author maocy
// @history 150326
//==========================================================
function FUiToolButtonEdit(o){
   o = RClass.inherits(this, o, FUiToolButton);
   //..........................................................
   // @property
   o._editSize       = RClass.register(o, new APtySize2('_editSize'));
   o._optionChecked  = RClass.register(o, new APtyBoolean('_optionChecked', 'check'));
   o._groupName      = RClass.register(o, new APtyString('_groupName'));
   o._groupDefault   = RClass.register(o, new APtyString('_groupDefault'));
   //..........................................................
   // @attribute
   o._statusChecked  = false;
   //..........................................................
   // @event
   o.onBuildButton   = FUiToolButtonEdit_onBuildButton;
   o.onEnter         = FUiToolButtonEdit_onEnter;
   o.onLeave         = FUiToolButtonEdit_onLeave;
   //o.onMouseDown     = FUiToolButtonEdit_onMouseDown;
   //o.onMouseUp       = FUiToolButtonEdit_onMouseUp;
   //..........................................................
   // @method
   o.construct       = FUiToolButtonEdit_construct;
   // @method
   o.groupName       = FUiToolButtonEdit_groupName;
   o.setGroupName    = FUiToolButtonEdit_setGroupName;
   o.groupDefault    = FUiToolButtonEdit_groupDefault;
   o.setGroupDefault = FUiToolButtonEdit_setGroupDefault;
   o.innerCheck      = FUiToolButtonEdit_innerCheck;
   o.check           = FUiToolButtonEdit_check;
   o.dispose         = FUiToolButtonEdit_dispose;
   return o;
}

//==========================================================
// <T>建立按键布局。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiToolButtonEdit_onBuildButton(p){
   var o = this;
   // 设置面板
   var h = o._hPanel;
   //o.attachEvent('onMouseDown', h);
   //o.attachEvent('onMouseUp', h);
   // 建立表单
   var hf = o._hForm = RBuilder.appendTable(h);
   var hl = o._hLine = RBuilder.appendTableRow(hf);
   // 建立输入框
   var hEditPanel = o._hEditPanel = RBuilder.appendTableCell(hl);
   var hEdit = o._hEdit = RBuilder.appendEdit(hEditPanel);
   hEdit.style.width = o._editSize.width +  'px';
   o._hEditSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
   // 建立图标
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hl, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   // 建立分割
   if(o._icon && o._label){
      o._hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
   }
   // 建立标签
   if(o._label){
      var hlp = o._hLabelPanel = RBuilder.appendTableCell(hl, o.styleName('LabelPanel'));
      hlp.noWrap = true;
      o.setLabel(o._label);
   }
   // 建立热键
   if(o._hotkey){
      RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   // 建立提示
   if(o._hint){
      o.setHint(o._hint);
   }
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onEnter(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Hover');
   }
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onLeave(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Normal');
   }
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onMouseDown(p){
   var o = this;
   o.check(!o._statusChecked);
   o.processClickListener(o, o._statusChecked);
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onMouseUp(){
   var o = this;
   //o._hPanel.className = o.styleName('Hover');
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
function FUiToolButtonEdit_construct(){
   var o = this;
   o.__base.FUiToolButton.construct.call(o);
   o._editSize = new SSize2();
}

//==========================================================
// <T>获得分组名称。</T>
//
// @method
// @return String 分组名称
//==========================================================
function FUiToolButtonEdit_groupName(){
   return this._groupName;
}

//==========================================================
// <T>设置分组名称。</T>
//
// @method
// @param p:groupName:String 分组名称
//==========================================================
function FUiToolButtonEdit_setGroupName(p){
   this._groupName = p;
}

//==========================================================
// <T>获得分组默认。</T>
//
// @method
// @return String 分组默认
//==========================================================
function FUiToolButtonEdit_groupDefault(){
   return this._groupDefault;
}

//==========================================================
// <T>设置分组默认。</T>
//
// @method
// @param p:groupDefault:String 分组默认
//==========================================================
function FUiToolButtonEdit_setGroupDefault(p){
   this._groupDefault = p;
}

//==========================================================
// <T>内部选中处理。</T>
//
// @method
// @param p:check:Boolean 选中
//==========================================================
function FUiToolButtonEdit_innerCheck(p){
   var o = this;
   // 设置状态
   if(o._statusChecked != p){
      o._statusChecked = p;
      if(p){
         o._hPanel.className = o.styleName('Press');
      }else{
         o._hPanel.className = o.styleName('Normal');
      }
   }
}

//==========================================================
// <T>选中处理。</T>
//
// @method
// @param p:check:Boolean 选中
//==========================================================
function FUiToolButtonEdit_check(p){
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
               if(RClass.isClass(c, FUiToolButtonEdit)){
                  c.innerCheck(false);
               }
            }
         }
      }
   }else{
      // 选中默认按键
      if(!RString.isEmpty(o._groupDefault)){
         var cs = o._parent.components();
         var c = cs.get(o._groupDefault);
         c.innerCheck(true);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiToolButtonEdit_dispose(){
   var o = this;
   o._statusChecked = null;
   o._groupName = null;
   o.__base.FUiToolButton.dispose.call(o);
}
