//==========================================================
// <T>编辑器控件的基类。</T>
//
// @class FControl, MFocus
// @history 091029 MAOCY 创建
//==========================================================
function FEditor(o){
   o = RClass.inherits(this, o, FControl, MFocus);
   //..........................................................
   // @style
   o.styleEdit      = RClass.register(o, new TStyle('Edit'));
   //..........................................................
   // @attribute
   o.inEdit         = false;
   o.source         = null;
   // @html
   o.hEdit          = null;
   // @listener
   o.lsnEditBegin   = null;
   o.lsnEditCancel  = null;
   o.lsnEditEnd     = null;
   //..........................................................
   // @event
   o.onEditKeyDown  = RClass.register(o, new HKeyDown('onEditKeyDown'));
   o.onEditKeyPress = RClass.register(o, new HKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = RClass.register(o, new HKeyUp('onEditKeyUp'));
   o.onEditChange   = RClass.register(o, new HChange('onEditChange'));
   o.onEditBegin    = FEditor_onEditBegin;
   o.onEditChanged  = FEditor_onEditChanged;
   o.onEditEnd      = FEditor_onEditEnd;
   o.onBuildPanel   = FEditor_onBuildPanel;
   //..........................................................
   // @process
   o.oeBuild        = FEditor_oeBuild;
   //..........................................................
   // @method
   o.get            = RMethod.virtual(o, 'get');
   o.set            = RMethod.virtual(o, 'set');
   o.doBlur         = FEditor_doBlur;
   o.panel          = FEditor_panel;
   o.linkControl    = FEditor_linkControl;
   o.editBegin      = FEditor_editBegin;
   o.editCancel     = FEditor_editCancel;
   o.editEnd        = FEditor_editEnd;
   o.reset          = FEditor_reset;
   o.show           = FEditor_show;
   o.dispose        = FEditor_dispose;
   return o;
}

//==========================================================
// <T>处理开始编辑事件。</T>
//
// @method
//==========================================================
function FEditor_onEditBegin(){
   this.editBegin();
}

//==========================================================
// <T>处理数据变更事件。</T>
//
// @method
//==========================================================
function FEditor_onEditChanged(){
   var o = this;
   RLogger.debug(o, 'Edit changed');
   var g = o.storage = RObject.nvlObj(o.storage);
   if(g.value == o.value()){
      if(o.changed){
         //o.source.onEditChanged(o, false);
         o.changed = false;
      }
   }else{
      if(!o.changed){
         //o.source.onEditChanged(o, true);
         o.changed = true;
      }
   }
}

//==========================================================
// <T>处理结束编辑事件。</T>
//
// @method
//==========================================================
function FEditor_onEditEnd(){
   this.editEnd();
}

//==========================================================
// <T>建立底板。</T>
//
// @method
//==========================================================
function FEditor_onBuildPanel(){
   this.hPanel = RBuilder.append(null, 'SPAN');
}

//==========================================================
// <T>建立控件。</T>
//
// @method
//==========================================================
function FEditor_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   o.hPanel.style.zIndex = ELayer.Editor;
   o.setVisible(false);
   return EEventStatus.Stop;
}

//==========================================================
// <T>设置属性。</T>
//
// @method
//==========================================================
function FEditor_get(name){
}

//==========================================================
// <T>获取属性。</T>
//
// @method
//==========================================================
function FEditor_set(name, value){
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
function FEditor_doBlur(){
   var o = this;
   var s = o.source;
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
function FEditor_panel(type){
   var o = this;
   if(EPanel.Edit == type){
      return o.hEdit;
   }else if(EPanel.Focus == type){
      return o.hEdit;
   }
   return o.base.FControl.panel.call(o, type);
}

//==========================================================
// <T>关联控件。</T>
//
// @method
//==========================================================
function FEditor_linkControl(c){
   var o = this;
   o.source = c;
}

//==========================================================
// <T>开始编辑。</T>
//
// @method
//==========================================================
function FEditor_editBegin(){
   var o = this;
   var s = o.source;
   // 编辑开始
   RLogger.debug(o, 'Editor begin. (control={0})', RClass.dump(s));
   // 处理开始事件
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   // 设置数据
   s.editor = o;
   o.inEdit = true;
}

//==========================================================
// <T>取消编辑。</T>
//
// @method
//==========================================================
function FEditor_editCancel(){
   var o = this;
   var s = o.source;
   // 编辑完成
   RLogger.debug(o, 'Editor cancel. (control={0})', RClass.dump(s));
   o.hide();
   // 处理取消事件
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   // 清空数据
   s.editor = null;
   o.source = null;
   o.inEdit = false;
}

//==========================================================
// <T>结束编辑。</T>
//
// @method
//==========================================================
function FEditor_editEnd(){
   var o = this;
   var s = o.source;
   // 编辑完成
   RLogger.debug(o, 'Editor end. (control={0})', RClass.dump(s));
   o.hide();
   // 处理完成事件
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   // 清空数据
   s.editor = null;
   o.source = null;
   o.inEdit = false;
}

//==========================================================
// <T>重置操作。</T>
//
// @method
//==========================================================
function FEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}

//==========================================================
// <T>显示操作。</T>
//
// @method
// @param c:control:FControl 控件
//==========================================================
function FEditor_show(){
   var o = this;
   o.base.FControl.show.call(o);
   o.editBegin();
   o.focus();
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FEditor_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hEdit = null;
}
