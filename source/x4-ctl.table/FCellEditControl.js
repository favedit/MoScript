//==========================================================
// 可以编辑的单元格的基类
// 模板:
//  hPanel<TD>
// ┌--------------------------------------------------------┐
// │┌----------------------------------------------------┐│
// ││hEdit<INPUT>                                        ││
// │└----------------------------------------------------┘│
// └--------------------------------------------------------┘
// @class FCellEditControl
// @author maochunyang
// @version 1.0.1
//==========================================================
function FCellEditControl(o){
   o = RClass.inherits(this, o, FCell);
   //..........................................................
   /// @style
   o.stEditable   = RClass.register(o, new TStyle('Readonly'));
   o.stPanel      = RClass.register(o, new TStyle('PanelSelect'));
   o.stEditable   = RClass.register(o, new TStyle('ReadonlySelect'));
   o.stEditSelect = RClass.register(o, new TStyle('EditSelect'));
   o.stEdit       = RClass.register(o, new TStyle('EditReadonly'));
   o.stEditSelect = RClass.register(o, new TStyle('EditReadonlySelect'));
   //..........................................................
   // @method
   o.buildEdit    = FCellEditControl_buildEdit;
   o.getEditRange = FCellEditControl_getEditRange;
   o.select       = FCellEditControl_select;
   o.setVisible   = FCellEditControl_setVisible;
   o.refreshStyle = FCellEditControl_refreshStyle;
   return o;
}
// ------------------------------------------------------------
function FCellEditControl_buildEdit(){
   var o = this;
   o.base.FCell.buildEdit.call(o);
   var c = o.column;
   // 关联事件
   var he = o.hEdit;
   he.style.color = EColor.TextEdit;
   c.linkEvent(o, 'onDataChange', he);
   // 选取处理
   if(o.table.isLov){
      o.hEdit.style.cursor = 'hand';
   }
}
// ------------------------------------------------------------
function FCellEditControl_getEditRange(){
   var o = this;
   var hc = o.hPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}

//==========================================================
// 根据选择状态来设置单元格的显示方式
//
// @method
// @param v:value:Boolean 是否选中
// @see FColumnEditable.isEditable
//==========================================================
function FCellEditControl_select(v){
   var o = this;
   var a = o.descriptor().isEditAble(o.row);
   if(v){
      if(!RClass.isClass(o, FCellCalendar)){
         o.setEditStyle(a ? EStyle.Select : EStyle.ReadonlySelect);
      }else{
         o.setEditStyle(EStyle.ReadonlySelect);
         o.column.disable();
      }        
   }else{
      if(!RClass.isClass(o, FCellCalendar)){
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
      }else{
         o.setEditStyle(EStyle.Readonly);
         o.column.disable();
      }
   }
}

//==========================================================
// 
//
// @method
//==========================================================
function FCellEditControl_setVisible(v){
   var o = this;
   o.hPanel.style.display = v ? 'block' : 'none';
   if(v){
      if(!RClass.isClass(o, FCellCalendar)){
         var a = o.descriptor().isEditAble(o.row);
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
     }else{
       o.setEditStyle(EStyle.Readonly);
       o.column.disable();
     }
   }
}
// ------------------------------------------------------------
function FCellEditControl_refreshStyle(){
   var o = this;
   var t = o.table;
   var c = o.column;
   var r = o.row;
   var hep = o.hEditPanel;
   var he = o.hEdit;
   var hd = o.hDrop;
   // 获得设置参数
   var e = c.isEditAble(r);
   var s = r.isSelect;
   // 根据是否可以编辑设置样式
   var ce = e ? EColor.TextEdit : EColor.TextReadonly;
   if(he){
      he.readOnly = !e;
      if(!c.zoomRefer){
         he.style.color = ce;
      }
      if(hd){
         he.style.cursor = e? 'hand':'normal';
         hd.style.cursor = e? 'hand':'normal';
      }
   }
   if(hep){
      hep.style.color = ce;
   }
   // 根据是否被选中设置样式
   var bc = null;
   if(s){
      bc = EColor.RowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   if(o.__focus){
      bc = EColor.RowEditHover;
   }
   // 设置背景颜色
   if(he){
      he.style.backgroundColor = bc;
   }
   o.hPanel.style.backgroundColor = bc;
}
