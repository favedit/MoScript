// ============================================================
// FDsToolBar
// ============================================================
function FDsToolBar(o){
   o = RClass.inherits(this, o, FToolBar);
   // Attribute
   o.btnFetch    = null;
   o.btnSearch   = null;
   o.btnLov      = null;
   o.btnZoom     = null;
   o.btnInsert   = null;
   o.btnUpdate   = null;
   o.btnDelete   = null;
   o.btnFirst    = null;
   o.btnPrior    = null;
   o.btnNext     = null;
   o.btnLast     = null;
   o.btnAction   = null;
   o.dsControl   = null;
   // Process
   o.oeBuild     = FDsToolBar_oeBuild;
   // Event
   o.onDsChanged = FDsToolBar_onDsChanged;
   // Method
   o.register    = FDsToolBar_register;
   o.setStatus   = FDsToolBar_setStatus;
   o.dispose     = FDsToolBar_dispose;
   return o;
}
// ------------------------------------------------------------
function FDsToolBar_oeBuild(event){
   var o = this;
   o.base.FToolBar.oeBuild.call(o, event);
   if(event.isAfter()){
      // 根据类型名称注册按键功能
      var count = o.controls.count;
      for(var n=0; n<count; n++){
         var c = o.controls.value(n);
         if(RClass.isClass(c, FToolButton)){
            o.register(c.type, c);
         }
      }
      // 监听数据集焦点对象变更事件
      //RConsole.find(FListenerConsole).register(MDataset, EAction.Status, o, o.onDsChanged);
   }
}
// ------------------------------------------------------------
function FDsToolBar_onDsChanged(a, b, c, d){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(dc){
      var o = this;
      o.setStatus(dc, o.btnFetch, EDataAction.Fetch);
      o.setStatus(dc, o.btnSearch, EDataAction.Search);
      o.setStatus(dc, o.btnLov, EDataAction.Lov);
      o.setStatus(dc, o.btnZoom, EDataAction.Zoom);
      o.setStatus(dc, o.btnInsert, EDataAction.Insert);
      o.setStatus(dc, o.btnUpdate, EDataAction.Update);
      o.setStatus(dc, o.btnDelete, EDataAction.Delete);
      o.setStatus(dc, o.btnFirst, EDataAction.First);
      o.setStatus(dc, o.btnPrior, EDataAction.Prior);
      o.setStatus(dc, o.btnNext, EDataAction.Next);
      o.setStatus(dc, o.btnLast, EDataAction.Last);
      o.setStatus(dc, o.btnAction, EDataAction.Action);
   }
}
// ------------------------------------------------------------
// type, button
function FDsToolBar_register(t, b){
   var o = this;
   if(EDataAction.Fetch == t){
      o.btnFetch = b;
   }else if(EDataAction.Search == t){
      o.btnSearch = b;
   }else if(EDataAction.Lov == t){
      o.btnLov = b;
   }else if(EDataAction.Zoom == t){
      o.btnZoom = b;
   }else if(EDataAction.Insert == t){
      o.btnInsert = b;
   }else if(EDataAction.Update == t){
      o.btnUpdate = b;
   }else if(EDataAction.Delete == t){
      o.btnDelete = b;
   }else if(EDataAction.First == t){
      o.btnFirst = b;
   }else if(EDataAction.Prior == t){
      o.btnPrior = b;
   }else if(EDataAction.Next == t){
      o.btnNext = b;
   }else if(EDataAction.Last == t){
      o.btnLast = b;
   }else if(EDataAction.Action == t){
      o.btnAction = b;
   }
}
// ------------------------------------------------------------
// dataset, button, action
function FDsToolBar_setStatus(d, b, a){
   if(b && b.modeDisplay){
      var v = d.testStatus(a, ETest.Display);
      b.psVisible(v);
      if(v){
         b.psEnable(d.testStatus(a, ETest.Enable));
      }
   }
}
// ------------------------------------------------------------
// dataset, button, action
function FDsToolBar_dispose(){
   var o = this;
   o.base.FToolBar.dispose.call(o);
   
}
