//==========================================================
// <T>支持选取数据窗口的接口。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
MO.MDuiEditReference = function MDuiEditReference(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._lovService    = MO.Class.register(o, new MO.APtyString('_lovService'));
   o._lovReference  = MO.Class.register(o, new MO.APtyString('_lovReference'));
   o._lovFields     = MO.Class.register(o, new MO.APtyString('_lovFields'));
   o._lovWhere      = MO.Class.register(o, new MO.APtyString('_lovWhere'));
   o._lovOrder      = MO.Class.register(o, new MO.APtyString('_lovOrder'));
   //..........................................................
   // @attribute
   o._listView      = null;
   //..........................................................
   // @event
   //o.onListClick    = MO.Class.register(o, new HClick('onListClick'), MDuiEditReference_onListClick);
   o.onListSelected = MO.Method.empty;
   //..........................................................
   // @method
   o.canListView    = MO.MDuiEditReference_canListView;
   o.setLabelStyle  = MO.MDuiEditReference_setLabelStyle;
   o.doListView     = MO.MDuiEditReference_doListView;
   return o;
}

//==========================================================
// <T>响应显示选取窗口的事件。</T>
//
// @method
//==========================================================
MO.MDuiEditReference_onListClick = function MDuiEditReference_onListClick(e){
   var o = this;
   if(o.canListView()){
      o.doListView();
   }
}

//==========================================================
// <T>判断当前对象是否允许显示选取窗口。</T>
//
// @return Boolean
//    <L value='true'>允许</L>
//    <L value='false'>不允许</L>
//==========================================================
MO.MDuiEditReference_canListView = function MDuiEditReference_canListView(){
   return !MO.Lang.String.isEmpty(this._lovReference) && this._editable;
}

//==========================================================
// <T>设置控件的标签样式。</T>
//
// @method
//==========================================================
MO.MDuiEditReference_setLabelStyle = function MDuiEditReference_setLabelStyle(){
   var o = this;
   if(!MO.Lang.String.isEmpty(o.lovRefer)){
      o.hLabel.style.cursor = 'hand';
      o.attachEvent('onListClick', o.hLabel);
      o.hLabel.className = 'RLine_Underline';
   }
}

//==========================================================
// <T>弹出关联的数据选取窗口。</T>
//
// @method
//==========================================================
MO.MDuiEditReference_doListView = function MDuiEditReference_doListView(cvs){
   var o = this;
   // 获取关联的选取窗口
   var v = o._listView;
   if(!v){
      v = o._listView = top.MO.RControl.create(top.MO.FListWindow);
   }
   // 显示选取窗口
   v.linkConsole = MO.RConsole;
   v.linkLovControl(o);
   v.show();
   v.fetch(cvs);
}
