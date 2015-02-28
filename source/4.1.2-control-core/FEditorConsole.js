//==========================================================
// <T>编辑器控制台。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
function FEditorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd     = EScope.Local;
   // @attribute
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   //..........................................................
   // @method
   o.construct    = FEditorConsole_construct;
   // @method
   o.makeName     = FEditorConsole_makeName;
   o.enter        = FEditorConsole_enter;
   o.leave        = FEditorConsole_leave;
   o.focus        = FEditorConsole_focus;
   o.blur         = FEditorConsole_blur;
   o.lost         = FEditorConsole_lost;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 初始化属性
   o._editors = new TDictionary();
}

//==========================================================
// <T>生成名称。</T>
//
// @method
//==========================================================
function FEditorConsole_makeName(cls, name){
   return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
}

//==========================================================
// <T>进入编辑器。</T>
//
// @method
//==========================================================
function FEditorConsole_enter(editable, cls){
   var name = RClass.name(cls);
   var editor = this._hoverEditors.get(name);
   if(!editor){
      editor = RClass.create(cls);
      editor.psBuild();
      this._hoverEditors.set(name, editor);
   }
   this._hoverEditor = editor;
   editor.editable = editable;
   editor.show();
   return editor;
}

//==========================================================
// <T>离开编辑器。</T>
//
// @method
//==========================================================
function FEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = RObject.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {0}', RClass.dump(editor));
   }
}

//==========================================================
// <T>编辑器获得焦点。</T>
//
// @method
//==========================================================
function FEditorConsole_focus(c, n, l){
   var o = this;
   // Focus Editor
   var name = o.makeName(n, l);
   var e = o._editors.get(l);
   if(!e){
      e = RClass.create(n);
      e.build(c._hPanel);
      o._editors.set(l, e);
   }
   RLogger.debug(o, 'Focus editor {1} (editable={2}, name={3})', RClass.dump(e), RClass.dump(c), l);
   e.reset();
   if(RClass.isClass(e, FUiDropEditor)){
      e.linkControl(c);
      o._focusEditor = e;
   }
   return e;
}

//==========================================================
// <T>编辑器失去焦点。</T>
//
// @method
//==========================================================
function FEditorConsole_blur(editor){
   var o = this;
   if(o._focusEditor){
      RLogger.debug(o, 'Blur editor {1}', RClass.dump(editor));
      editor = RObject.nvl(editor, o._focusEditor);
      if(editor){
         editor.onEditEnd();
      }
      o._focusEditor = null;
   }
}

//==========================================================
// <T>强制编辑器失去焦点。</T>
//
// @method
//==========================================================
function FEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
