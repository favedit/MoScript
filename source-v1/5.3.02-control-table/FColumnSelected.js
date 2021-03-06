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
   // @property
   o._dataName         = '_select';
   //..........................................................
   // @style
   o._styleEdit        = RClass.register(o, new AStyle('_styleEdit'));
   //..........................................................
   // @attribute
   o._optionFixed      = true;
   // @attribute
   o._cellClass        = FCellSelected;
   //..........................................................
   // @event
   o.onBuildSearchForm = FColumnSelected_onBuildSearchForm;
   o.onBuild           = FColumnSelected_onBuild;
   //..........................................................
   // @method
   o.createCell        = FColumnSelected_createCell;
   // @methos
   o.dispose           = FColumnSelected_dispose;







   //..........................................................
   // @event
   //o.onCellClick      = FColumnSelected_onCellClick;
   //o.onSelectedClick  = FColumnSelected_onSelectedClick;
   //..........................................................
   /// @property
   //o._dispList            = true;
   //o.styleAlign          = 'left';
   //o._hSelected           = null;
   //o.width               = 20;
   //o.dispSize            = false;
   //o.dispDrag            = false;
   //o.setVisible          = FColumnSelected_setVisible;
   // Listener
   //o.lsnsHeadClick       = new TListeners();
   //o.lsnsRowDblClick     = new TListeners();
   return o;
}

//==========================================================
// <T>建立搜索框。</T>
//
// @method
// @param p:param:TEventProcess 事件
//==========================================================
function FColumnSelected_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
   var hc = RBuilder.appendTableCell(hfl);
   hc.align = 'center';
   o._hSelected = RBuilder.appendCheck(hc, o.styleName('Edit'));
   o._hSelected.column = o;
   o._hSelected.onclick = o.onSelectedClick;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FColumnSelected_onBuild(e){
   var o = this;
   var r = o.__base.FColumnEditControl.onBuild.call(o, e);
   var h = o._hPanel;
   h.align = 'center';
   h.style.width = '30px';
   h.style.height = '22px';
   RBuilder.appendEmpty(o._hPanel, 12, 12);
   return r;
}

//==========================================================
// <T>创建单元格。</T>
//
// @method
// @param p:row:FRow 表格行
// @return FCell 单元格
//==========================================================
function FColumnSelected_createCell(p){
   var o = this;
   var c = o.__base.FColumnEditControl.createCell.call(o, p);
   if(p){
      p.cellSelect = c;
   }
   return c;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FColumnSelected_dispose(){
   var o = this;
   o._hSelect = null;
   // 父处理
   o.__base.FColumnEditControl.dispose.call(o);
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
   var v = o._table._displayColumnSelect ? 'block' : 'none';
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

// ------------------------------------------------------------
