with(MO){
   //==========================================================
   // <T>可以编辑的单元格控件。</T>
   //
   //  hPanel<TD>
   // ┌--------------------------------------------------------┐
   // │ hForm<TABLE>                                           │
   // │ hFormLine<TR>                                          │
   // │┌--------------┬--------------------┬--------------┐│
   // ││hIconPanel<TD>│hEditPanel<TD>      │hDropPanel<TD>││
   // ││hIcon<IMG>    │hEdit<INPUT>        │hDrop<IMG>    ││
   // │└--------------┴--------------------┴--------------┘│
   // └--------------------------------------------------------┘
   //
   // @class
   // @author maocy
   // @version 150125
   //==========================================================
   MO.FUiCellEditControl = function FUiCellEditControl(o){
      o = RClass.inherits(this, o, FCell);
      //..........................................................
      // @html
      //o._hEditPanel  = null;
      //o._hEdit       = null;
      //..........................................................
      // @event
      o.onBuildIcon  = FUiCellEditControl_onBuildIcon;
      o.onBuildEdit  = FUiCellEditControl_onBuildEdit;
      o.onBuildDrop  = RMethod.empty;
      o.onBuildForm  = FUiCellEditControl_onBuildForm;
      o.onBuild      = FUiCellEditControl_onBuild;
      //..........................................................
      /// @style
      //o.stEditable   = RClass.register(o, new TStyle('Readonly'));
      //o.stPanel      = RClass.register(o, new TStyle('PanelSelect'));
      //o.stEditable   = RClass.register(o, new TStyle('ReadonlySelect'));
      //o.stEditSelect = RClass.register(o, new TStyle('EditSelect'));
      //o.stEdit       = RClass.register(o, new TStyle('EditReadonly'));
      //o.stEditSelect = RClass.register(o, new TStyle('EditReadonlySelect'));
      //..........................................................
      // @method
      //o.getEditRange = FUiCellEditControl_getEditRange;
      //o.select       = FUiCellEditControl_select;
      //o.setVisible   = FUiCellEditControl_setVisible;
      //o.refreshStyle = FUiCellEditControl_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>在单元格内图标区创建图标。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiCellEditControl_onBuildIcon = function FUiCellEditControl_onBuildIcon(p){
      var o = this;
      o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
   }

   //==========================================================
   // <T>在单元格内编辑区创建编辑控件。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiCellEditControl_onBuildEdit = function FUiCellEditControl_onBuildEdit(p){
      var o = this;
      var c = o._column;
      // 建立文本输入框
      //o._hEdit = RBuilder.appendEdit(o._hEditPanel, o.styleName('Edit'));
      // 关联事件
      //c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
      //c.linkEvent(o, 'onCellKeyDown', he, c.onCellKeyDown);
      //c.linkEvent(o, 'onCellClick', he, c.onCellClick);
      //c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
      // 关联事件
      //var he = o.hEdit;
      //he.style.color = EColor.TextEdit;
      //c.linkEvent(o, 'onDataChange', he);
      // 选取处理
      //if(o._table.isLov){
      //   o._hEdit.style.cursor = 'hand';
      //}
      // 设置文字对齐方式
      //if(!RString.isEmpty(c.editAlign)){
      //   he.style.textAlign = c.editAlign;
      //}
   }

   //==========================================================
   // <T>在单元格内创建表单底板。</T>
   // <P>只有有图标区或下拉区，则创建底板，否则直接创建编辑控件。</P>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiCellEditControl_onBuildForm = function FUiCellEditControl_onBuildForm(p){
      var o = this;
      var c = o._column;
      // 拥有图标区或下拉区的控件，才允许建立表格底板
      if(c._hasIconArea || c._hasDropArea){
         // 建立表格底板
         var hf = o.hForm = RBuilder.appendTable(o._hPanel);
         hf.width = '100%';
         var hr = o.hFormLine = hf.insertRow();
         // 建立图标区
         if(c.hasIconArea){
            o.hIconPanel = hr.insertCell();
            o.hIconPanel.width = 18;
            o.onBuildIcon(p);
         }
         // 建立编辑区
         o._hEditPanel = hr.insertCell();
         o.onBuildEdit(p);
         // 建立下拉区
         if(c.hasDropArea){
            o.hDropPanel = hr.insertCell();
            o.hDropPanel.width = 8;
            o.onBuildDrop(p);
         }
      }else{
         var hep = o._hEditPanel = o._hPanel;
         //hep.align = c._editAlignCd;
         o.onBuildEdit(p);
      }
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiCellEditControl_onBuild = function FUiCellEditControl_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      // 创建布局
      o.onBuildForm(p);
   }











   // ------------------------------------------------------------
   MO.FUiCellEditControl_getEditRange = function FUiCellEditControl_getEditRange(){
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
   MO.FUiCellEditControl_select = function FUiCellEditControl_select(v){
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
   MO.FUiCellEditControl_setVisible = function FUiCellEditControl_setVisible(v){
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
   MO.FUiCellEditControl_refreshStyle = function FUiCellEditControl_refreshStyle(){
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
}
