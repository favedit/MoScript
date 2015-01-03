var go = false;
var searchBox = null;
//----------------------------------------------------------
function doInsertSave(){
   var da = new FDataAction();
   da.service = 'insert@logic.dataset';
   da.invoke(form); 
}
function doUpdateSave(){
   var da = new FDataAction();
   da.service = 'update@logic.dataset';
   da.invoke(form); 
}
function doDeleteSave(){
   var da = new FDataAction();
   da.service = 'delete@logic.dataset';
   da.invoke(form); 
}
//----------------------------------------------------------
function _resize(){
   if(form){
      RConsole.find(FEventConsole).add(form, form.psRefresh);
   }
}
//----------------------------------------------------------
function initializeForm(){
   var start = new Date().getTime();
   window.isLoaded = false;
   //debugger
   var emode = REnum.encode(EMode, fmMain.page_action.value);
   // 建立工具栏
   var xform = RXml.makeNode(xForm);
   var xdstoolbar = RXml.makeNode(xToolBar);
   var xtoolbar = RToolBar.mergeNode(xdstoolbar, xform);
   toolbar = RControl.fromNode(xtoolbar, _id_toolbar);
   toolbar.psMode(emode);
   // Build form
   var dc = RConsole.find(FDatasetConsole);
   form = RControl.fromXml(xForm, _id_form);
   if(RClass.isClass(form, MForm)){
      if(RClass.isClass(form, FTable)){
         var formParent = fmMain.form_parent.value;
         var parentPack = new TAttrs();
         parentPack.unpack(formParent);
      }
      if(RClass.isClass(form, FForm)){
         form.psMode(emode);
      }
      form.loadDatasets(RXml.makeNode(xValue));
   }
   // Display
   top.document.title = form.label;
   _id_title.innerText = form.label;
   form.focus();
   // Listen events
   var lsnConsole = RConsole.find(FListenerConsole);
   lsnConsole.register(MDataset, EDataAction.EndUpdate, form, doBack);
   lsnConsole.register(FTable, ETableAction.RowClick, form, doSelectRow);
   lsnConsole.register(FTable, ETableAction.GoInsert, form, doInsert);
   window.document.body.onresize = _resize;
   RConsole.find(FEventEngineConsole).loadConfig(RXml.makeNode(xEvent));
   // show
   var end = new Date().getTime();
   top.document.title = form.label + ' ( Show page in ' + (end - pageStart) + 'ms. ' + 'Build form: ' + (end - start) + 'ms )';
   window.isLoaded = true;
}
