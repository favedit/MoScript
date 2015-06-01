// ============================================================
// FColumnNumber
// ============================================================
function FColumnNumber(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescNumber, MListView);
   // Attribute
   o.__cellClass               = FCellNumber;
   o.hasDropArea               = true;
   o.editAlign                 = EAlign.Right;
   // @event
   o.onBuildSearch             = FColumnNumber_onBuildSearch;
   o.onUpIconMouseDown         = RClass.register(o, new HMouseDown('onUpIconMouseDown'), FColumnNumber_onUpIconMouseDown);
   o.onUpIconMouseUp           = RClass.register(o, new HMouseUp('onUpIconMouseUp'), FColumnNumber_onUpIconMouseUp);
   o.onSearchEditFocus         = RClass.register(o, new HFocus('onSearchEditFocus'), FColumnNumber_onSearchEditFocus);
   o.onSearchEditBlur          = RClass.register(o, new HBlur('onSearchEditBlur'), FColumnNumber_onSearchEditBlur);
   o.onSearchEditDown          = RClass.register(o, new HKeyDown('onSearchEditDown'), FColumnNumber_onSearchEditDown);
   o.onSearchEditUpIconDown    = RClass.register(o, new HMouseDown('onSearchEditUpIconDown'), FColumnNumber_onSearchEditUpIconDown);
   o.onSearchEditDownIconDown  = RClass.register(o, new HMouseDown('onSearchEditDownIconDown'), FColumnNumber_onSearchEditDownIconDown);
   o.onSearchEditUpIconUp      = RClass.register(o, new HMouseUp('onSearchEditUpIconUp'), FColumnNumber_onSearchEditUpIconUp);
   o.onSearchEditDownIconUp    = RClass.register(o, new HMouseUp('onSearchEditDownIconUp'), FColumnNumber_onSearchEditDownIconUp);
   // @event
   o.onCellDoubleClick         = FColumnNumber_onCellDoubleClick;
   o.ohEditKeyDown             = FColumnNumber_ohEditKeyDown;
   o.onListSelected            = FColumnNumber_onListSelected;
   // Method
   o.changeText                = FColumnNumber_changeText;
   o.dispose                   = FColumnNumber_dispose;
   return o;
}
// ------------------------------------------------------------
function FColumnNumber_onListSelected(v){
   this.table.__focusCell.row.refresh();
}
// ------------------------------------------------------------
function FColumnNumber_onCellDoubleClick(s, e){
   var o = this;
   var cvs = s.row.saveRow().toAttributes();
   if(o.lovRefer){
      return o.doListView(cvs);
   }
   return o.base.FColumnEditControl.onCellDoubleClick.call(o, s, e);
}
// ------------------------------------------------------------
function FColumnNumber_onBuildSearch(){
   var o = this;
   var h = o.hSearchPanel = RBuilder.create(null, 'TD', o.style('SearchPanel'));
   var hp = RBuilder.appendTable(h);
   hp.style.width = '100%';
   hp.align = 'right';
   hp.style.border = '0px solid blue';
   var hr = hp.insertRow();
   var hc1 = hr.insertCell();
   var he = o.hSearchEdit = RBuilder.append(hc1, 'INPUT');
   o.attachEvent('onSearchEditDown', he, o.ohEditKeyDown);
   o.attachEvent('onSearchEditBlur', he);
   o.attachEvent('onSearchEditFocus', he);
   he.align = 'right';
   he.style.width = '100%';
   he.style.textAlign = 'right';
   he.style.border = '0px solid blue';
   he.style.backgroundColor = '#FFFFFF';
   var hc2 = hr.insertCell();
   hc2.width = 1;
   // 上下箭头按键
   var htb = RBuilder.appendTable(hc2);
   var hr1 = htb.insertRow();
   var hr2 = htb.insertRow();
   var hrc1 = hr1.insertCell();
   var hrc2 = hr2.insertCell();
   var hImg1 = o.hImg1 = RBuilder.append(hrc1, 'IMG');
   var hImg2 = o.hImg2 = RBuilder.append(hrc2, 'IMG');
   o.attachEvent('onSearchEditUpIconUp', hImg1);
   o.attachEvent('onSearchEditDownIconUp', hImg2);
   o.attachEvent('onSearchEditUpIconDown', hImg1);
   o.attachEvent('onSearchEditDownIconDown', hImg2);
   hImg1.src = o.styleIconPath( 'Up', FCellNumber);
   hImg2.src = o.styleIconPath( 'Down', FCellNumber);
   if(o.table){
      o.table.linkEvent(o, 'onColumnSearchKeyDown', o.hSearchEdit);
   }
}
// ------------------------------------------------------------
function FColumnNumber_ohEditKeyDown(e, he){
   var o = this;
   var kc = he.keyCode;
   // 设置搜索数字
   if(o.hSearchEdit){
	   hs = o.hSearchEdit;
   }else{
      hs = he.srcElement;
   }
   if(EKey.Up == kc){
      hs.value = RInt.parse(RInt.nvl(hs.value)) + 1;
   }else if(EKey.Down == kc){
      hs.value = RInt.parse(RInt.nvl(hs.value)) - 1;
   }
   if(RKey.isNumKey(kc)){
	   kc = kc - 48;
   }
   // 检查输入字符是否为数字，否则给清除输入内容
   if(!EKey.floatCodes[kc]){
      RKey.eventClear(he);
   }
}
// ------------------------------------------------------------
function FColumnNumber_onSearchEditDown(e){
   var o = this;
}
// ------------------------------------------------------------
function FColumnNumber_onSearchEditUpIconDown(e){
   var he = this.hSearchEdit;
   he.value = RInt.parse(RInt.nvl(he.value)) + 1;
   e.hSource.src = this.styleIconPath('UpSelect', FCellNumber);
}
// ------------------------------------------------------------
function FColumnNumber_onSearchEditDownIconDown(e){
   var he = this.hSearchEdit;
   he.value = RInt.parse(RInt.nvl(he.value)) - 1;
   e.hSource.src = this.styleIconPath('DownSelect', FCellNumber);
}
// ------------------------------------------------------------
function FColumnNumber_onSearchEditUpIconUp(e){
   e.hSource.src = this.styleIconPath('Up', FCellNumber);
}
// ------------------------------------------------------------
function FColumnNumber_onSearchEditDownIconUp(e){
   e.hSource.src = this.styleIconPath('Down', FCellNumber);
}
// ------------------------------------------------------------
function FColumnNumber_onSearchEditBlur(s, e){
   var o = this;
   //o.hImg1.src = o.styleIconPath('Up', FCellNumber);
   //o.hImg2.src = o.styleIconPath('Down', FCellNumber);
}
// ------------------------------------------------------------
function FColumnNumber_onSearchEditFocus(s, e){
   var o = this;
   //o.hImg1.src = o.styleIconPath('UpSelect', FCellNumber);
   //o.hImg2.src = o.styleIconPath('DownSelect', FCellNumber);
   //o.hSearchEdit.select();
}
// ------------------------------------------------------------
function FColumnNumber_onUpIconMouseUp(s, e){
   var o = this;
   var t = e.sender;
   if(o.isEditAble()){
      e.hSource.src = e.sender.styleIconPath('Up');
   }
}
//------------------------------------------------------------
function FColumnNumber_onUpIconMouseDown(s, e){
   var o = this;
   var t = e.sender;
   if(o.isEditAble()){
      e.hSource.src = t.styleIconPath('UpSelect');
      o.changeText(t, true);
   }
}
// ------------------------------------------------------------
function FColumnNumber_onDownIconMouseDown(s, e){
   var o = this;
   var t = e.sender;
   if(o.isEditAble()){
      e.hSource.src = e.sender.styleIconPath('DownSelect');
      o.changeText(t, false);
   }
}
// ------------------------------------------------------------
function FColumnNumber_onDownIconMouseUp(s, e){
   var o = this;
   var t = e.sender;
   if(o.isEditAble()){
      e.hSource.src = e.sender.styleIconPath('Down');
   }
}
//------------------------------------------------------------
function FColumnNumber_changeText(c, f){
   var o = this;
   var v = RFloat.parse(o.formatValue(c.text()));
   if(f){
      v += RFloat.parse(o.editIncreate);
   }else{
      v -= RFloat.parse(o.editIncreate);
   }
   c.setText(o.formatText(v.toString()));
}
//------------------------------------------------------------
function FColumnNumber_dispose(){
   var o = this;
   o.base.FColumnEditControl.dispose.call(o);
   o.hSearchPanel = null;
   o.hImg1 = null;
   o.hImg2 = null;
}
//------------------------------------------------------------
