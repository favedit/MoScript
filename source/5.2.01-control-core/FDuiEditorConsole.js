//==========================================================
// <T>编辑器控制台。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.FUiEditorConsole = function FUiEditorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd     = MO.EScope.Local;
   // @attribute
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   //..........................................................
   // @method
   o.construct    = MO.FUiEditorConsole_construct;
   // @method
   o.makeName     = MO.FUiEditorConsole_makeName;
   o.enter        = MO.FUiEditorConsole_enter;
   o.leave        = MO.FUiEditorConsole_leave;
   o.focus        = MO.FUiEditorConsole_focus;
   o.blur         = MO.FUiEditorConsole_blur;
   o.lost         = MO.FUiEditorConsole_lost;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiEditorConsole_construct = function FUiEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 初始化属性
   o._editors = new MO.TDictionary();
}

//==========================================================
// <T>生成名称。</T>
//
// @method
//==========================================================
MO.FUiEditorConsole_makeName = function FUiEditorConsole_makeName(cls, name){
   return name ? name + '@' + MO.Class.name(cls) : MO.Class.name(cls);
}

//==========================================================
// <T>进入编辑器。</T>
//
// @method
//==========================================================
MO.FUiEditorConsole_enter = function FUiEditorConsole_enter(editable, cls){
   var name = MO.Class.name(cls);
   var editor = this._hoverEditors.get(name);
   if(!editor){
      editor = MO.Class.create(cls);
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
MO.FUiEditorConsole_leave = function FUiEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = MO.Lang.Object.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {1}', MO.Class.dump(editor));
   }
}

//==========================================================
// <T>编辑器获得焦点。</T>
//
// @method
//==========================================================
MO.FUiEditorConsole_focus = function FUiEditorConsole_focus(c, n, l){
   var o = this;
   // Focus Editor
   var name = o.makeName(n, l);
   var e = o._editors.get(l);
   if(!e){
      e = MO.Class.create(n);
      e.build(c._hPanel);
      o._editors.set(l, e);
   }
   MO.Logger.debug(o, 'Focus editor {1} (editable={2}, name={3})', MO.Class.dump(e), MO.Class.dump(c), l);
   e.reset();
   if(MO.Class.isClass(e, MO.FUiDropEditor)){
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
MO.FUiEditorConsole_blur = function FUiEditorConsole_blur(editor){
   var o = this;
   if(o._focusEditor){
      MO.Logger.debug(o, 'Blur editor {1}', MO.Class.dump(editor));
      editor = MO.Lang.Object.nvl(editor, o._focusEditor);
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
MO.FUiEditorConsole_lost = function FUiEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
