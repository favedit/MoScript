// ============================================================
// FColumnSelected
// ============================================================
function FColumnSelected(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   //..........................................................
   // @event
   o.onCellClick      = FColumnSelected_onCellClick;
   o.onSelectedClick  = FColumnSelected_onSelectedClick;
   //..........................................................
   // @process
   o.oeBuild          = FColumnSelected_oeBuild;
   //..........................................................
   /// @property
   o.dispList            = true;
   o.dispFixed           = true;
   o.dataName            = '_select';
   o.styleAlign          = 'left';
   o.hSelected           = null;
   o.__cellClass         = FCellSelected;
   o.width               = 20;
   o.dispSize            = false;
   o.dispDrag            = false;
   o.stEdit              = RClass.register(o, new TStyle('Edit'));
   o.setVisible          = FColumnSelected_setVisible;
   // Listener
   o.lsnsHeadClick       = new TListeners();
   o.lsnsRowDblClick     = new TListeners();
   // @event
   o.onBuildSearchForm   = FColumnSelected_onBuildSearchForm;
   // @methos
   o.createCell          = FColumnSelected_createCell;
   o.dispose             = FColumnSelected_dispose;
   return o;
}

//==========================================================
// <T>��굥���¼���</T>
//
// @method
// @param s:sender:FControl �ؼ�����
// @param e:event:TEvent �¼�����
//==========================================================
function FColumnSelected_setVisible(){
	var o = this;
	var v = o.table.dispSelected ? 'block' : 'none';
	o.hPanel.style.display = v
	o.hSelected.style.display = v;
	o.hSearchPanel.style.display = v;
	o.hTotalPanel.style.display = v;
	o.hFixPanel.style.display = v;
}

//==========================================================
//<T>��굥���¼���</T>
//
//@method
//@param s:sender:FControl �ؼ�����
//@param e:event:TEvent �¼�����
//==========================================================
function FColumnSelected_onCellClick(s, e){
	return;   
}

//==========================================================
//<T>全选或反选</T>
//==========================================================
function FColumnSelected_onSelectedClick(s, e){
	var o = this;
	var c = o.column;
	var rs = c.table.rows;
    var rc = rs.count;
    for(var n = 0; n<rc; n++){
       var r = rs.get(n);
       if(r.selectAble){
	       if(o.checked){
	          c.table.selectRow(r, false, true);
	       }else{
	    	   c.table.clearSelectRow(r);
	       }
       }
    }
}

//==========================================================
// 创建
//==========================================================
function FColumnSelected_oeBuild(e){
   var o = this;
   var r = o.base.FColumnEditControl.oeBuild.call(o, e);
   var h = o.hPanel;
   h.align = 'center';
   RBuilder.appendEmpty(o.hPanel, 12, 12);
   return r;
}

//------------------------------------------------------------
function FColumnSelected_onBuildSearchForm(){
   var o = this;
   var hf = o.hSearchForm = RBuilder.appendTable(o.hSearchPanel);
   hf.width = '100%';
   var hfl = o.hSearchFormLine = hf.insertRow();
   var hc = hfl.insertCell();
   hc.align = 'center';
   o.hSelected = RBuilder.appendCheck(hc, o.style('Edit'));
   o.hSelected.column = o;
   o.hSelected.onclick = o.onSelectedClick;
}
//------------------------------------------------------------
function FColumnSelected_createCell(row){
   var o = this;
   var c = o.base.FColumnEditControl.createCell.call(o, row);
   if(row){
      row.cellSelect = c;
   }
   c.hPanel.className = c.style('Panel');
   return c;
}
// ------------------------------------------------------------
function FColumnSelected_dispose(){
   var o = this;
   o.base.FColumnEditControl.dispose.call(o);
   o.hSelect = null;
}
// ------------------------------------------------------------
