//==========================================================
// <T>编辑器控件的基类。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.FDuiEditor = function FDuiEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MDuiFocus);
   //..........................................................
   // @property
   o._visible       = false;
   o._statusVisible = false;
   //..........................................................
   // @style
   o._styleEdit     = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   //..........................................................
   // @attribute
   o._statusEditing = false;
   o._source        = null;
   // @html
   o._hEdit         = null;
   // @listener
   o.lsnEditBegin   = null;
   o.lsnEditCancel  = null;
   o.lsnEditEnd     = null;
   //..........................................................
   // @event
   o.onEditKeyDown  = MO.Class.register(o, new MO.AEventKeyDown('onEditKeyDown'));
   o.onEditKeyPress = MO.Class.register(o, new MO.AEventKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = MO.Class.register(o, new MO.AEventKeyUp('onEditKeyUp'));
   o.onEditChange   = MO.Class.register(o, new MO.AEventChange('onEditChange'));
   o.onEditBegin    = MO.FDuiEditor_onEditBegin;
   o.onEditChanged  = MO.FDuiEditor_onEditChanged;
   o.onEditEnd      = MO.FDuiEditor_onEditEnd;
   o.onBuildPanel   = MO.FDuiEditor_onBuildPanel;
   //..........................................................
   // @process
   o.onBuild        = MO.FDuiEditor_onBuild;
   //..........................................................
   // @method
   o.get            = MO.Method.virtual(o, 'get');
   o.set            = MO.Method.virtual(o, 'set');
   o.doBlur         = MO.FDuiEditor_doBlur;
   o.panel          = MO.FDuiEditor_panel;
   o.linkControl    = MO.FDuiEditor_linkControl;
   o.editBegin      = MO.FDuiEditor_editBegin;
   o.editCancel     = MO.FDuiEditor_editCancel;
   o.editEnd        = MO.FDuiEditor_editEnd;
   o.reset          = MO.FDuiEditor_reset;
   o.setVisible     = MO.FDuiEditor_setVisible;
   o.dispose        = MO.FDuiEditor_dispose;
   return o;
}

//==========================================================
// <T>处理开始编辑事件。</T>
//
// @method
//==========================================================
MO.FDuiEditor_onEditBegin = function FDuiEditor_onEditBegin(){
   this.editBegin();
}

//==========================================================
// <T>处理数据变更事件。</T>
//
// @method
//==========================================================
MO.FDuiEditor_onEditChanged = function FDuiEditor_onEditChanged(){
   var o = this;
   MO.Logger.debug(o, 'Edit changed');
   var g = o.storage = MO.Lang.Object.nvlObj(o.storage);
   if(g.value == o.value()){
      if(o.changed){
         //o._source.onEditChanged(o, false);
         o.changed = false;
      }
   }else{
      if(!o.changed){
         //o._source.onEditChanged(o, true);
         o.changed = true;
      }
   }
}

//==========================================================
// <T>处理结束编辑事件。</T>
//
// @method
//==========================================================
MO.FDuiEditor_onEditEnd = function FDuiEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   // 编辑完成
   MO.Logger.debug(o, 'Editor end. (control={1})', MO.Class.dump(s));
   o.hide();
   // 处理完成事件
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   // 清空数据
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}

//==========================================================
// <T>建立底板。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
MO.FDuiEditor_onBuildPanel = function FDuiEditor_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createSpan(p);
   h.__linker = o;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiEditor_onBuild = function FDuiEditor_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   o._hPanel.style.zIndex = MO.EUiLayer.Editor;
}

//==========================================================
// <T>设置属性。</T>
//
// @method
//==========================================================
MO.FDuiEditor_get = function FDuiEditor_get(name){
}

//==========================================================
// <T>获取属性。</T>
//
// @method
//==========================================================
MO.FDuiEditor_set = function FDuiEditor_set(name, value){
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
MO.FDuiEditor_doBlur = function FDuiEditor_doBlur(){
   var o = this;
   var s = o._source;
   if(s){
      o.editCancel();
      if(MO.Class.isClass(s, MO.MDuiFocus)){
         s.doBlur();
      }
   }
}

//==========================================================
// <T>获得底板。</T>
//
// @method
// @param panelCd:EPanel 底板类型
//==========================================================
MO.FDuiEditor_panel = function FDuiEditor_panel(panelCd){
   var o = this;
   if(panelCd == MO.EPanel.Edit){
      return o._hEdit;
   }else if(panelCd == MO.EPanel.Focus){
      return o._hEdit;
   }
   return o.__base.FDuiControl.panel.call(o, panelCd);
}

//==========================================================
// <T>关联控件。</T>
//
// @method
//==========================================================
MO.FDuiEditor_linkControl = function FDuiEditor_linkControl(c){
   var o = this;
   o._source = c;
}

//==========================================================
// <T>开始编辑。</T>
//
// @method
//==========================================================
MO.FDuiEditor_editBegin = function FDuiEditor_editBegin(){
   var o = this;
   var s = o._source;
   // 编辑开始
   MO.Logger.debug(o, 'Editor begin. (control={1})', MO.Class.dump(s));
   // 处理开始事件
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   // 设置数据
   s._editor = o;
   o._statusEditing = true;
}

//==========================================================
// <T>取消编辑。</T>
//
// @method
//==========================================================
MO.FDuiEditor_editCancel = function FDuiEditor_editCancel(){
   var o = this;
   var s = o._source;
   // 编辑完成
   MO.Logger.debug(o, 'Editor cancel. (control={1})', MO.Class.dump(s));
   o.hide();
   // 处理取消事件
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   // 清空数据
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}

//==========================================================
// <T>结束编辑。</T>
//
// @method
//==========================================================
MO.FDuiEditor_editEnd = function FDuiEditor_editEnd(){
   this.onEditEnd();
}

//==========================================================
// <T>重置操作。</T>
//
// @method
//==========================================================
MO.FDuiEditor_reset = function FDuiEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param p:visible:Boolean 是否显示
//==========================================================
MO.FDuiEditor_setVisible = function FDuiEditor_setVisible(p){
   var o = this;
   o.__base.FDuiControl.setVisible.call(o, p);
   if(p){
      o.editBegin();
      o.focus();
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
MO.FDuiEditor_dispose = function FDuiEditor_dispose(){
   var o = this;
   o.__base.FDuiControl.dispose.call(o);
   o._hEdit = null;
}
