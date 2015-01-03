//==========================================================
// <T>下拉编辑器。</T>
// 模板:
//  hPanel<DIV>
// ┌--------------------------------------------------------┐
// │ border<TBorder>                                        │
// │┌----------------------------------------------------┐│
// ││ hDropForm<TABLE>                                   ││
// ││┌------------------------------------------------┐││
// │││hDropPanel<TD>                                  │││
// ││├------------------------------------------------┤││
// │││hButtonPanel<TD>                                │││
// ││└------------------------------------------------┘││
// │└----------------------------------------------------┘│
// └--------------------------------------------------------┘
//
// @class FEditor, MShadow
// @history 091103 MAOCY 创建
//==========================================================
function FDropEditor(o){
   o = RClass.inherits(this, o, FEditor, MShadow);
   //..........................................................
   // @style
   o.stDropForm      = RClass.register(o, new TStyle('DropForm'));
   o.stDropPanel     = RClass.register(o, new TStyle('DropPanel'));
   o.stButtonPanel   = RClass.register(o, new TStyle('ButtonPanel'));
   //..........................................................
   // @attribute
   o.__minHeight     = 300;
   o.__minWidth      = null;
   o.border          = null;
   //..........................................................
   // @html
   o.hDropForm       = null;
   o.hDropPanel      = null;
   o.hButtonPanel    = null;
   //..........................................................
   // @event
   o.onDropMouseDown = RClass.register(o, new HMouseDown('onDropMouseDown'));
   o.onDropMouseUp   = RClass.register(o, new HMouseUp('onDropMouseUp'));
   o.onBuildDrop     = RMethod.virtual(o, 'onBuildDrop');
   o.onBuildButton   = RMethod.empty;
   //..........................................................
   // @process
   o.oeBuild         = FDropEditor_oeBuild;
   //..........................................................
   // @method
   o.panel           = FDropEditor_panel;
   o.hide            = FDropEditor_hide;
   o.dispose         = FDropEditor_dispose;
   return o;
}

//==========================================================
// <T>建立底板。</T>
//
// @method
//==========================================================
function FDropEditor_oeBuild(e){
   var o = this;
   o.base.FEditor.oeBuild.call(o, e)
   /// 建立底层对象(1列x2行)，上面一行为标题容器，下面一行为下拉数据容器
   var db = o.border = new TBorder(EBorder.Round);
   db.hParent = o.hPanel;
   RBorder.build(db);
   var hbf = o.hBorderForm = db.hForm;
   // 建立表单
   var hf = o.hDropForm = RBuilder.appendTable(db.hPanel);
   hf.className = o.style('DropForm');
   var hdp = o.hDropPanel = hf.insertRow().insertCell();
   hdp.className = o.style('DropPanel');
   var hbp = o.hButtonPanel = hf.insertRow().insertCell();
   hbp.className = o.style('ButtonPanel');
   // 建立下拉内容
   o.onBuildDrop();
   // 建立按键
   o.onBuildButton();
   return EEventStatus.Stop;
}

//==========================================================
// <T>获得底板。</T>
//
// @method
//==========================================================
function FDropEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hPanel;
   }
   return o.base.FEditor.panel.call(o, type);
}

//==========================================================
// <T>隐藏对象。</T>
//
// @method
//==========================================================
function FDropEditor_hide(){
   var o = this;
   o.base.FEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FDropEditor_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDropForm = null;
   o.hDropPanel = null;
   o.hButtonPanel = null;
}
