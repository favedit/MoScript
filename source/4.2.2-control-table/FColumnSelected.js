//==========================================================
// <T>表格选择列。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function FColumnSelected(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   //..........................................................
   // @attribute
   o._optionFixed          = true;
   // @attribute
   o._cellClass            = FCellSelected;
   //..........................................................
   // @event
   o.onCellClick      = FColumnSelected_onCellClick;
   o.onSelectedClick  = FColumnSelected_onSelectedClick;
   //..........................................................
   // @process
   o.oeBuild          = FColumnSelected_oeBuild;
   //..........................................................
   /// @property
   o._dispList            = true;
   o.dataName            = '_select';
   o.styleAlign          = 'left';
   o._hSelected           = null;
   o.width               = 20;
   o.dispSize            = false;
   o.dispDrag            = false;
   o._styleEdit          = RClass.register(o, new AStyle('_styleEdit'));
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
   var v = o._table.dispSelected ? 'block' : 'none';
   o._hPanel.style.display = v
   o._hSelected.style.display = v;
   o._hSearchPanel.style.display = v;
   o._hTotalPanel.style.display = v;
   o._hFixPanel.style.display = v;
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
   var r = o.__base.FColumnEditControl.oeBuild.call(o, e);
   var h = o._hPanel;
   h.align = 'center';
   RBuilder.appendEmpty(o._hPanel, 12, 12);
   return r;
}

//------------------------------------------------------------
function FColumnSelected_onBuildSearchForm(){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   var hfl = o._hSearchFormLine = hf.insertRow();
   var hc = hfl.insertCell();
   hc.align = 'center';
   o._hSelected = RBuilder.appendCheck(hc, o.styleName('Edit'));
   o._hSelected.column = o;
   o._hSelected.onclick = o.onSelectedClick;
}
//------------------------------------------------------------
function FColumnSelected_createCell(row){
   var o = this;
   var c = o.__base.FColumnEditControl.createCell.call(o, row);
   if(row){
      row.cellSelect = c;
   }
   c._hPanel.className = c.style('Panel');
   return c;
}
// ------------------------------------------------------------
function FColumnSelected_dispose(){
   var o = this;
   o.__base.FColumnEditControl.dispose.call(o);
   o._hSelect = null;
}
// ------------------------------------------------------------
