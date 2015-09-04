//==========================================================
// <T>表格选择列。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiColumnSelected = function FDuiColumnSelected(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumnEditControl);
   //..........................................................
   // @property
   o._name             = '_select';
   o._label            = '选中';
   o._dataName         = '_select';
   //..........................................................
   // @style
   o._styleEdit        = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   //..........................................................
   // @attribute
   o._optionFixed      = true;
   o._cellClass        = MO.FDuiCellSelected;
   //..........................................................
   // @event
   o.onBuildSearchForm = MO.FDuiColumnSelected_onBuildSearchForm;
   o.onBuild           = MO.FDuiColumnSelected_onBuild;
   //..........................................................
   // @method
   o.createCell        = MO.FDuiColumnSelected_createCell;
   // @methos
   o.dispose           = MO.FDuiColumnSelected_dispose;







   //..........................................................
   // @event
   //o.onCellClick      = FDuiColumnSelected_onCellClick;
   //o.onSelectedClick  = FDuiColumnSelected_onSelectedClick;
   //..........................................................
   /// @property
   //o._dispList            = true;
   //o.styleAlign          = 'left';
   //o._hSelected           = null;
   //o.width               = 20;
   //o.dispSize            = false;
   //o.dispDrag            = false;
   //o.setVisible          = FDuiColumnSelected_setVisible;
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
MO.FDuiColumnSelected_onBuildSearchForm = function FDuiColumnSelected_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   var hfl = o._hSearchFormLine = MO.Window.Builder.appendTableRow(hf);
   var hc = MO.Window.Builder.appendTableCell(hfl);
   hc.align = 'center';
   o._hSelected = MO.Window.Builder.appendCheck(hc, o.styleName('Edit'));
   o._hSelected.column = o;
   o._hSelected.onclick = o.onSelectedClick;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiColumnSelected_onBuild = function FDuiColumnSelected_onBuild(e){
   var o = this;
   o.__base.FDuiColumnEditControl.onBuild.call(o, e);
   var hPanel = o._hPanel;
   hPanel.align = 'center';
   //hPanel.style.width = '30px';
   //hPanel.style.height = '22px';
   //MO.Window.Builder.appendEmpty(hPanel, 12, 12);
}

//==========================================================
// <T>创建单元格。</T>
//
// @method
// @param p:row:FRow 表格行
// @return FCell 单元格
//==========================================================
MO.FDuiColumnSelected_createCell = function FDuiColumnSelected_createCell(p){
   var o = this;
   var c = o.__base.FDuiColumnEditControl.createCell.call(o, p);
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
MO.FDuiColumnSelected_dispose = function FDuiColumnSelected_dispose(){
   var o = this;
   o._hSelect = null;
   // 父处理
   o.__base.FDuiColumnEditControl.dispose.call(o);
}









//==========================================================
// <T>��굥���¼���</T>
//
// @method
// @param s:sender:FControl �ؼ�����
// @param e:event:TEvent �¼�����
//==========================================================
MO.FDuiColumnSelected_setVisible = function FDuiColumnSelected_setVisible(){
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
MO.FDuiColumnSelected_onCellClick = function FDuiColumnSelected_onCellClick(s, e){
   return;   
}

//==========================================================
//<T>全选或反选</T>
//==========================================================
MO.FDuiColumnSelected_onSelectedClick = function FDuiColumnSelected_onSelectedClick(s, e){
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
