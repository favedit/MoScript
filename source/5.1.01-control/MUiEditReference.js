with(MO){
   //==========================================================
   // <T>支持选取数据窗口的接口。</T>
   //
   // @face
   // @author maocy
   // @version 150102
   //==========================================================
   MO.MUiEditReference = function MUiEditReference(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @property
      o._lovService    = RClass.register(o, new APtyString('_lovService'));
      o._lovReference  = RClass.register(o, new APtyString('_lovReference'));
      o._lovFields     = RClass.register(o, new APtyString('_lovFields'));
      o._lovWhere      = RClass.register(o, new APtyString('_lovWhere'));
      o._lovOrder      = RClass.register(o, new APtyString('_lovOrder'));
      //..........................................................
      // @attribute
      o._listView     = null;
      //..........................................................
      // @event
      //o.onListClick    = RClass.register(o, new HClick('onListClick'), MUiEditReference_onListClick);
      o.onListSelected = RMethod.empty;
      //..........................................................
      // @method
      o.canListView    = MUiEditReference_canListView;
      o.setLabelStyle  = MUiEditReference_setLabelStyle;
      o.doListView     = MUiEditReference_doListView;
      return o;
   }

   //==========================================================
   // <T>响应显示选取窗口的事件。</T>
   //
   // @method
   //==========================================================
   MO.MUiEditReference_onListClick = function MUiEditReference_onListClick(e){
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
   MO.MUiEditReference_canListView = function MUiEditReference_canListView(){
      return !RString.isEmpty(this._lovReference) && this._editable;
   }

   //==========================================================
   // <T>设置控件的标签样式。</T>
   //
   // @method
   //==========================================================
   MO.MUiEditReference_setLabelStyle = function MUiEditReference_setLabelStyle(){
      var o = this;
      if(!RString.isEmpty(o.lovRefer)){
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
   MO.MUiEditReference_doListView = function MUiEditReference_doListView(cvs){
      var o = this;
      // 获取关联的选取窗口
      var v = o._listView;
      if(!v){
         v = o._listView = top.RControl.create(top.FListWindow);
      }
      // 显示选取窗口
      v.linkConsole = RConsole;
      v.linkLovControl(o);
      v.show();
      v.fetch(cvs);
   }
}
