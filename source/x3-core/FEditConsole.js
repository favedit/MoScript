// ============================================================
// FEditConsole
// ============================================================
function FEditConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope        = EScope.Page;
   o.focusEditor  = null;
   o.editors      = new TMap();
   // Method
   o.makeName     = FEditConsole_makeName;
   o.enter        = FEditConsole_enter;
   o.leave        = FEditConsole_leave;
   o.focus        = FEditConsole_focus;
   o.blur         = FEditConsole_blur;
   o.lost         = FEditConsole_lost;
   return o;
}
// ------------------------------------------------------------
function FEditConsole_makeName(cls, name){
   return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
}
// ------------------------------------------------------------
function FEditConsole_enter(editable, cls){
   var name = RClass.name(cls);
   var editor = this.hoverEditors.get(name);
   if(!editor){
      editor = RClass.create(cls);
      editor.psBuild();
      this.hoverEditors.set(name, editor);
   }
   this.hoverEditor = editor;
   editor.editable = editable;
   editor.show();
   return editor;
}
// ------------------------------------------------------------
function FEditConsole_leave(editor){
   var o = this;
   if(o.hoverEditor != o.focusEditor){
      editor = RObject.nvl(editor, o.hoverEditor);
      o.hoverEditor = null;
      RLog.debug(o, 'Leave {0}', RClass.dump(editor));
   }
}
// ------------------------------------------------------------
function FEditConsole_focus(c, n, l){
   var o = this;
   // Focus Editor
   var name = o.makeName(n, l);
   var e = o.editors.get(l);
   if(!e){
      e = RClass.create(n);
      //editor.psBuild(RWindow.hContainer);
      e.psBuild();
      o.editors.set(l, e);
   }
   RLogger.debug(o, 'Focus editor {0} (editable={1}, name={2})', RClass.dump(e), RClass.dump(c), l);
   e.reset();
   if(RClass.isClass(e, FDropEditor)){
      e.linkControl(c);
      o.focusEditor = e;
   }
   return e;
}
// ------------------------------------------------------------
function FEditConsole_blur(editor){
   var o = this;
   if(o.focusEditor){
      RLogger.debug(o, 'Blur {0}', RClass.dump(editor));
      editor = RObject.nvl(editor, o.focusEditor);
      if(editor){
         editor.onEditEnd();
      }
      o.focusEditor = null;
   }
}
// ------------------------------------------------------------
// editor
function FEditConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
// ------------------------------------------------------------
