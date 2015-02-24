//==========================================================
// <T>编辑器控件的基类。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
function FUiEditor(o){
   o = RClass.inherits(this, o, FUiControl, MFocus);
   //..........................................................
   // @style
   o._styleEdit     = RClass.register(o, new AStyle('_styleEdit'));
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
   o.onEditKeyDown  = RClass.register(o, new AEventKeyDown('onEditKeyDown'));
   o.onEditKeyPress = RClass.register(o, new AEventKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = RClass.register(o, new AEventKeyUp('onEditKeyUp'));
   o.onEditChange   = RClass.register(o, new AEventChange('onEditChange'));
   o.onEditBegin    = FUiEditor_onEditBegin;
   o.onEditChanged  = FUiEditor_onEditChanged;
   o.onEditEnd      = FUiEditor_onEditEnd;
   o.onBuildPanel   = FUiEditor_onBuildPanel;
   //..........................................................
   // @process
   o.onBuild        = FUiEditor_onBuild;
   //..........................................................
   // @method
   o.get            = RMethod.virtual(o, 'get');
   o.set            = RMethod.virtual(o, 'set');
   o.doBlur         = FUiEditor_doBlur;
   o.panel          = FUiEditor_panel;
   o.linkControl    = FUiEditor_linkControl;
   o.editBegin      = FUiEditor_editBegin;
   o.editCancel     = FUiEditor_editCancel;
   o.editEnd        = FUiEditor_editEnd;
   o.reset          = FUiEditor_reset;
   o.show           = FUiEditor_show;
   o.dispose        = FUiEditor_dispose;
   return o;
}

//==========================================================
// <T>处理开始编辑事件。</T>
//
// @method
//==========================================================
function FUiEditor_onEditBegin(){
   this.editBegin();
}

//==========================================================
// <T>处理数据变更事件。</T>
//
// @method
//==========================================================
function FUiEditor_onEditChanged(){
   var o = this;
   RLogger.debug(o, 'Edit changed');
   var g = o.storage = RObject.nvlObj(o.storage);
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
function FUiEditor_onEditEnd(){
   this.editEnd();
}

//==========================================================
// <T>建立底板。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FUiEditor_onBuildPanel(p){
   this._hPanel = RBuilder.createSpan(p);
}

//==========================================================
// <T>建立控件。</T>
//
// @method
//==========================================================
function FUiEditor_onBuild(e){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, e);
   o._hPanel.style.zIndex = EUiLayer.Editor;
   o.setVisible(false);
}

//==========================================================
// <T>设置属性。</T>
//
// @method
//==========================================================
function FUiEditor_get(name){
}

//==========================================================
// <T>获取属性。</T>
//
// @method
//==========================================================
function FUiEditor_set(name, value){
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
function FUiEditor_doBlur(){
   var o = this;
   var s = o._source;
   if(s){
      o.editCancel();
      if(RClass.isClass(s, MFocus)){
         s.doBlur();
      }
   }
}

//==========================================================
// <T>获得底板。</T>
//
// @method
//==========================================================
function FUiEditor_panel(type){
   var o = this;
   if(EPanel.Edit == type){
      return o._hEdit;
   }else if(EPanel.Focus == type){
      return o._hEdit;
   }
   return o.__base.FUiControl.panel.call(o, type);
}

//==========================================================
// <T>关联控件。</T>
//
// @method
//==========================================================
function FUiEditor_linkControl(c){
   var o = this;
   o._source = c;
}

//==========================================================
// <T>开始编辑。</T>
//
// @method
//==========================================================
function FUiEditor_editBegin(){
   var o = this;
   var s = o._source;
   // 编辑开始
   RLogger.debug(o, 'Editor begin. (control={0})', RClass.dump(s));
   // 处理开始事件
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   // 设置数据
   s.editor = o;
   o._statusEditing = true;
}

//==========================================================
// <T>取消编辑。</T>
//
// @method
//==========================================================
function FUiEditor_editCancel(){
   var o = this;
   var s = o._source;
   // 编辑完成
   RLogger.debug(o, 'Editor cancel. (control={0})', RClass.dump(s));
   o.hide();
   // 处理取消事件
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   // 清空数据
   s.editor = null;
   o._source = null;
   o._statusEditing = false;
}

//==========================================================
// <T>结束编辑。</T>
//
// @method
//==========================================================
function FUiEditor_editEnd(){
   var o = this;
   var s = o._source;
   // 编辑完成
   RLogger.debug(o, 'Editor end. (control={0})', RClass.dump(s));
   o.hide();
   // 处理完成事件
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   // 清空数据
   s.editor = null;
   o._source = null;
   o._statusEditing = false;
}

//==========================================================
// <T>重置操作。</T>
//
// @method
//==========================================================
function FUiEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}

//==========================================================
// <T>显示操作。</T>
//
// @method
// @param c:control:FUiControl 控件
//==========================================================
function FUiEditor_show(){
   var o = this;
   o.__base.FUiControl.show.call(o);
   o.editBegin();
   o.focus();
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FUiEditor_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
   o._hEdit = null;
}
