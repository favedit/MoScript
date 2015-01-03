// ============================================================
// FColumnCalendar
// ============================================================
function FColumnCalendar(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescCalendar);
   // @property
   o.editFormat        = RDate.DisplayFormat;
   // @attribute
   o.__cellClass       = FCellCalendar;
   o.__searchValue     = null;
   o.hasDropArea       = true;
   o.date              = null;
   // @event
   o.onBuildSearchEdit = FColumnCalendar_onBuildSearchEdit;
   o.onBuildSearchDrop = FColumnCalendar_onBuildSearchDrop;
   o.onSearchEnter     = FColumnCalendar_onSearchEnter;
   o.onSearchLeave     = FColumnCalendar_onSearcLeave;
   o.onSearchDblClick  = RClass.register(o, new HDoubleClick('onSearchDblClick'), FColumnCalendar_onSearchDblClick);
   o.onSearchDropClick = RClass.register(o, new HMouseDown('onSearchDropClick'), FColumnCalendar_onSearchDropClick);
   o.onCellDropClick   = RClass.register(o, new HMouseDown('onCellDropClick'), FColumnCalendar_onCellDropClick);
   o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
   o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
   o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
   o.onCellEditEnd     = FColumnCalendar_onCellEditEnd;
   // @method
   o.construct         = FColumnCalendar_construct;
   o.buildSearchEdit   = FColumnCalendar_buildSearchEdit;
   o.formatValue       = MDescCalendar_formatValue;
   o.formatText        = MDescCalendar_formatText;
   o.searchValue       = FColumnCalendar_searchValue;
   o.searchDrop        = FColumnCalendar_searchDrop;
   o.focus             = FColumnCalendar_focus;
   o.dispose           = FColumnCalendar_dispose;
   return o;
}
//==========================================================
function FColumnCalendar_onCellEditEnd(e){
   var o = this;
   var c = e.source;
   c.set(e.get());
   c.onDataEditEnd(c);
   c.focus();
}

//------------------------------------------------------------
function FColumnCalendar_construct(){
   var o = this;
   o.base.FColumnEditControl.construct.call(o);
   o.lsnCellEditEnd = new TListener(o, o.onCellEditEnd);
   o.__searchValue = new Object();
   o.date = new TDate();
}
//------------------------------------------------------------
function FColumnCalendar_buildSearchEdit(p, hr){
   var o = this;
   // 建立单元格
   var hc = hr.insertCell();
   hc.style.padding = '0 2';
   // 建立编辑框
   var he = o['h' + p[0]] = RBuilder.append(hc, 'INPUT');
   he.size = p[1] - 1;
   he.maxLength = p[1];
   he.style.textAlign = 'right';
   he.style.backgroundColor = '#FFFFFF';
   he.style.borderLeft = '1 solid #CCCCCC';
   he.style.borderTop = '1 solid #CCCCCC';
   he.style.borderRight = '1 solid #EEEEEE';
   he.style.borderBottom = '1 solid #EEEEEE';
   o.table.linkEvent(o, 'onColumnSearchKeyDown', he);
}
//------------------------------------------------------------
function FColumnCalendar_onBuildSearchEdit(){
   var o = this;
   var t = o.table;
   var hp = o.hSearchEditPanel = o.hSearchFormLine.insertCell();
   // 建立布局底板
   var hf = RBuilder.appendTable(hp)
   var hr = hf.insertRow();
   var ps = o.__parts = RString.splitPattern(o.editFormat, RDate.Parts);
   for(var n=0; n<ps.length; n++){
      var p = ps[n];
      if(RString.inRange(p, RDate.Parts)){
         o.buildSearchEdit(RDate.PartsDefine[p], hr);
      }else{
         var hc = hr.insertCell();
         hc.innerText = p;
      }
   }
}

// =========================================================
function FColumnCalendar_onBuildSearchDrop(){
   var o = this;
   //var hdp = o.hSearchDropPanel = o.hSearchFormLine.insertCell();
   //hdp.width = 1;
   //var hi = o.hSearchDrop = RBuilder.appendIcon(hdp, o.styleIcon('SearchDrop', FColumn));
   //o.attachEvent('onSearchDropClick', hi);
}

// =========================================================
function FColumnCalendar_onSearchEnter(){
   var o = this;
   //o.hSearchDrop.src = o.styleIconPath('SearchDropHover', FColumn);
}

// =========================================================
function FColumnCalendar_onSearcLeave(){
   var o = this;
   //o.hSearchDrop.src = o.styleIconPath('SearchDrop', FColumn);
}
// =========================================================
function FColumnCalendar_onSearchDblClick(){
   this.searchDrop();
}

// =========================================================
function FColumnCalendar_onSearchDropClick(e){
   this.searchDrop();
}

// =========================================================
function FColumnCalendar_onCellDropClick(s, e){
   var o = this;
   o.onCellMouseDown(s, e);
   s.drop();
}

// =========================================================
function FColumnCalendar_searchValue(){
   var o = this;
   var ps = o.__parts;
   var v = '';
   var f = '';
   for(var n=0; n<ps.length; n++){
      var p = ps[n];
      if(RString.inRange(p, RDate.Parts)){
         var pd = RDate.PartsDefine[p];
         var s = o['h' + pd[0]].value;
         if(!RString.isEmpty(s)){
            var pd = RDate.PartsDefine[p];
            v += RInteger.format(s, pd[1]);
            f += p;
         }
      }
   }
   // 设置返回值
   var sv = o.__searchValue;
   sv.value = v;
   sv.format = f;
   return RString.isEmpty(v) ? null : sv;
}

// =========================================================
function FColumnCalendar_searchDrop(){
   var o = this;
   var ed = o.editor;
   if(!ed){
      ed = o.editor = RClass.create(FCalendarEditor);
      ed.psBuild();
   }
   ed.source = o;
   ed.editable = o;
   RHtml.toRect(ed.rect, o.hSearchPanel);
   RHtml.setPixelRect(ed.hPanel, ed.rect);
   ed.hPanel.style.pixelTop = ed.rect.bottom + 3;
   var hbf = ed.border.hForm;
   hbf.style.pixelWidth = o.hSearchPanel.width;
   ed.hPanel.style.width = 273;
   ed.setValue(o.hSearchEdit.value);
   ed.show();
}

// =========================================================
function FColumnCalendar_focus(){
   this.hSearchEdit.focus();
}

// =========================================================
function FColumnCalendar_dispose(){
   var o = this;
   o.base.FColumnEditControl.dispose.call(o);
   o.hSearchPanel = null;
   var ps = o.__parts;
   if(ps){
      for(var n=0; n<ps.length; n++){
         var p = ps[n];
         if(RString.inRange(p, RDate.Parts)){
            o['h' + RDate.PartsDefine[p][0]] = null;
         }
      }
   }
}
