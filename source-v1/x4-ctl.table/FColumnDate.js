// ============================================================
// FColumnDate
// ============================================================
function FColumnDate(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescCalendar);
   // @property
   o.editFormat        = RDate.DisplayFormat;
   // @attribute
   o.__cellClass       = FCellCalendar;
   o.__searchValue     = null;
   o.hasDropArea       = true;
   o.date              = null;
   // @event
   o.onBuildSearchEdit = FColumnDate_onBuildSearchEdit;
   o.onBuildSearchDrop = FColumnDate_onBuildSearchDrop;
   o.onSearchEnter     = FColumnDate_onSearchEnter;
   o.onSearchLeave     = FColumnDate_onSearcLeave;
   o.onSearchDblClick  = RClass.register(o, new HDoubleClick('onSearchDblClick'), FColumnDate_onSearchDblClick);
   o.onSearchDropClick = RClass.register(o, new HMouseDown('onSearchDropClick'), FColumnDate_onSearchDropClick);
   o.onCellDropClick   = RClass.register(o, new HMouseDown('onCellDropClick'), FColumnDate_onCellDropClick);
   // @method
   o.construct         = FColumnDate_construct;
   o.buildSearchEdit   = FColumnDate_buildSearchEdit;
   o.validText         = MDescCalendar_validText;
   o.formatValue       = MDescCalendar_formatValue;
   o.formatText        = MDescCalendar_formatText;
   o.searchValue       = FColumnDate_searchValue;
   o.searchDrop        = FColumnDate_searchDrop;
   o.focus             = FColumnDate_focus;
   o.dispose           = FColumnDate_dispose;
   return o;
}
//------------------------------------------------------------
function FColumnDate_construct(){
   var o = this;
   o.base.FColumnEditControl.construct.call(o);
   o.__searchValue = new Object();
   o.date = new TDate();
}
//------------------------------------------------------------
function FColumnDate_buildSearchEdit(p, hr){
   var o = this;
   // 建立单元格
   var hc = hr.insertCell();
   hc.style.padding = '0 2';
   // 建立编辑框
   var he = o['h' + p[0]] = RBuilder.append(hc, 'INPUT');
   he.size = p[1] - 1;
   he.maxLength = p[1];
   he.style.textAlign = 'right';
   he.style.backgroundColor = '#eff6ff';
   he.style.borderLeft = '1 solid #CCCCCC';
   he.style.borderTop = '1 solid #CCCCCC';
   he.style.borderRight = '1 solid #EEEEEE';
   he.style.borderBottom = '1 solid #EEEEEE';
   o.table.linkEvent(o, 'onColumnSearchKeyDown', he);
}
//------------------------------------------------------------
function FColumnDate_onBuildSearchEdit(){
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
function FColumnDate_onBuildSearchDrop(){
   var o = this;
   //var hdp = o.hSearchDropPanel = o.hSearchFormLine.insertCell();
   //hdp.width = 1;
   //var hi = o.hSearchDrop = RBuilder.appendIcon(hdp, o.styleIcon('SearchDrop', FColumn));
   //o.attachEvent('onSearchDropClick', hi);
}

// =========================================================
function FColumnDate_onSearchEnter(){
   var o = this;
   //o.hSearchDrop.src = o.styleIconPath('SearchDropHover', FColumn);
}

// =========================================================
function FColumnDate_onSearcLeave(){
   var o = this;
   //o.hSearchDrop.src = o.styleIconPath('SearchDrop', FColumn);
}
// =========================================================
function FColumnDate_onSearchDblClick(){
   this.searchDrop();
}

// =========================================================
function FColumnDate_onSearchDropClick(e){
   this.searchDrop();
}

// =========================================================
function FColumnDate_onCellDropClick(s, e){
   if(!this.disabled){
      s.drop();
   }
}

// =========================================================
function FColumnDate_searchValue(){
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
function FColumnDate_searchDrop(){
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
   //ed.daySelectLsns.push(o, o.onColumnSearchKeyPress);
   ed.show();
}

// =========================================================
function FColumnDate_focus(){
   this.hSearchEdit.focus();
}

// =========================================================
function FColumnDate_dispose(){
   var o = this;
   o.base.FColumnEditControl.dispose.call(o);
   o.hSearchPanel = null;
   var ps = o.__parts;
   for(var n=0; n<ps.length; n++){
      var p = ps[n];
      if(RString.inRange(p, RDate.Parts)){
         o['h' + RDate.PartsDefine[p][0]] = null;
      }
   }
}
