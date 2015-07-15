with(MO){
   //==========================================================
   // <T>表格内的单元格控件。</T>
   //
   // hPanel<TD>
   // ┌--------------------------------------------------------┐
   // │                                                        │
   // └--------------------------------------------------------┘
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FUiCell = function FUiCell(o){
      o = RClass.inherits(this, o, FControl, MEditValue, MDataValue);
      //..........................................................
      // @style
      o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
      //..........................................................
      // @attribute
      o._table       = null;
      o._column      = null;
      o._row         = null;
      //..........................................................
      // @html
      //o._hEditPanel  = null;
      //..........................................................
      // @event
      o.onBuildPanel = FUiCell_onBuildPanel;
      o.onBuild      = FUiCell_onBuild;
      //..........................................................
      // @process
      o.oeDataLoad   = FUiCell_oeDataLoad;
      o.oeDataSave   = FUiCell_oeDataSave;



      // Html
      //o.hForm        = null;
      //o.hFormLine    = null;
      //o.hIconPanel   = null;
      //o.hIcon        = null;
      //o.hDropPanel   = null;
      //o.hDrop        = null;
      //..........................................................
      // @method
      //o.doFocus      = FUiCell_doFocus;
      //o.doBlur       = FUiCell_doBlur;
      //..........................................................
      // @method
      //o.descriptor   = FUiCell_descriptor;
      //o.text         = FUiCell_text;
      //o.setText      = FUiCell_setText;
      //o.focus        = FUiCell_focus;
      //o.setVisible   = FUiCell_setVisible;
      //o.setEditStyle = RMethod.empty;
      //o.refreshStyle = FUiCell_refreshStyle;
      //o.dispose      = FUiCell_dispose;
      //o.dump         = FUiCell_dump;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiCell_onBuildPanel = function FUiCell_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Panel'));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiCell_onBuild = function FUiCell_onBuild(p){
      var o = this;
      o.__base.FControl.onBuild.call(o, p)
      // 创建底板
      var c = o._column;
      var h = o._hPanel;
      RHtml.linkSet(h, 'control', o);
      // 创建布局
      //c.linkEvent(o, 'onCellMouseEnter', h, c.onCellMouseEnter);
      //c.linkEvent(o, 'onCellMouseLeave', h, c.onCellMouseLeave);
      // 设置编辑颜色
      //if(c.editColor){
      //   h.style.color = c.editColor;
      //}
      // 设置背景颜色
      //if(c.editBgcolor){
      //   h.style.backgroundColor = c.editBgcolor;
      //}
      // 判断显示方式
      //if(EEditFormat.Html != c.editFormat){
      //}
      // 设置建立完成状态
      //o._hEditPanel.style.paddingLeft = 2;
      //o._hEditPanel.style.overflow = 'hidden';
      //o._hEditPanel.style.textOverflow = 'ellipsis';
   }

   //==========================================================
   // <T>数据源从加载数据处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FUiCell_oeDataLoad = function FUiCell_oeDataLoad(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = r.get(c._dataName);
      o.set(v);
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>存储数据到数据源处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FUiCell_oeDataSave = function FUiCell_oeDataSave(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = o.get();
      r.set(c._dataName, v);
      return EEventStatus.Stop;
   }

















   //==========================================================
   // <T>获得焦点。</T>
   //
   // @method
   //==========================================================
   MO.FUiCell_doFocus = function FUiCell_doFocus(){
      var o = this;
      o._table.__focusCell = o;
      if(o._column.isEditAble(o)){
         var hs = o._hPanel.style;
         hs.borderLeft = '1px solid #666666';
         hs.borderTop = '1px solid #666666';
         hs.borderRight = '1px solid #CCCCCC';
         hs.borderBottom = '1px solid #CCCCCC';
         o.__focus = true;
         o.refreshStyle();
      }
   }

   //==========================================================
   // <T>失去焦点。</T>
   //
   // @method
   //==========================================================
   MO.FUiCell_doBlur = function FUiCell_doBlur(){
      var o = this;
      if(o._column.isEditAble(o)){
         var hs = o._hPanel.style;
         hs.borderLeft = '0px solid #666666';
         hs.borderTop = '0px solid #666666';
         hs.borderRight = '1px solid #F0F0F0';
         hs.borderBottom = '1px dotted #CCCCCC';
         o.__focus = false;
         o.refreshStyle();
      }
   }

   //==========================================================
   // <T>获得单元格对象的描述器。</T>
   //
   // @method
   //==========================================================
   MO.FUiCell_descriptor = function FUiCell_descriptor(){
      return this._column;
   }

   //==========================================================
   // <T>获取单元格数据内容。</T>
   //
   // @method
   // @return 数据内容
   //==========================================================
   MO.FUiCell_text = function FUiCell_text(){
      var o = this;
      var c = o._column;
      if(EEditFormat.Html == c.editFormat){
         return o._hPanel.innerHTML;
      }else if(c._absEdit && o._hEdit){
         return o._hEdit.value;
      }else if(o._hEditPanel){
         return o._hEditPanel.innerText;
      }
      return '';
   }

   //==========================================================
   // <T>设置单元格数据内容。</T>
   //
   // @method
   // @param t:text:String 数据内容
   //==========================================================
   MO.FUiCell_setText = function FUiCell_setText(t){
      // 判断显示方式
      var o = this;
      var c = o._column;
      if(EEditFormat.Html == c.editFormat){
         o._hPanel.innerHTML = t;
      }else if(c._absEdit && o._hEdit){
         o._hEdit.value = t;
      }else if(o._hEditPanel){
         o._hEditPanel.innerText = t;
      }
   }

   //==========================================================
   // <T>设置单元格的焦点。</T>
   //
   // @method
   // @param s:select:Boolean 是否选中数据内容
   //==========================================================
   MO.FUiCell_focus = function FUiCell_focus(s){
      var o = this;
      var h = o._hEdit;
      if(h){
         o._column._table.selectRow(o._row, true, true);
         h.focus();
         if(s){
            h.select();
         }
      }
   }

   //==========================================================
   // <T>设置单元格的可见性。</T>
   //
   // @method
   // @param v:visible:Boolean 可见性
   //==========================================================
   MO.FUiCell_setVisible = function FUiCell_setVisible(v){
      this._hPanel.style.display = v ? 'block' : 'none';
   }

   //==========================================================
   // <T>根据设置信息，刷新单元格的样式。</T>
   //
   // @method
   //==========================================================
   MO.FUiCell_refreshStyle = function FUiCell_refreshStyle(){
      var o = this;
      var t = o._table;
      var r = o._row;
      var s = r.isSelect;
      // 设置编辑颜色
      var he = o._hEdit;
      if(he){
         he.readOnly = true;
         he.style.color = EColor.TextReadonly;
         he.style.backgroundColor = bc;
      }
      // 设置背景颜色
      var bc = null;
      if(s){
         bc = EColor._rowSelect;
      }else{
         var ih = (t.__hoverRow == r);
         if(ih){
            bc = EColor._rowHover;
         }else{
            bc = EColor._rows[r.index % EColor._rows.length];
         }
      }
      if(o.__focus){
         bc = EColor._rowEditHover;
      }
      o._hPanel.style.backgroundColor = bc;
   }

   //==========================================================
   // <T>释放单元格内的所有对象。</T>
   //
   // @method
   //==========================================================
   MO.FUiCell_dispose = function FUiCell_dispose(){
      var o = this;
      o.base.FControl.dispose.call(o);
      RMemory.freeHtml(o._hPanel);
      o._hPanel = null;
      o.hForm = null;
      o.hFormLine = null;
      o.hIconPanel = null;
      o.hIcon = null;
      o._hEditPanel = null;
      o._hEdit = null;
      o.hDropPanel = null;
      o.hDrop = null;
   }

   //==========================================================
   // <T>获取单元格内的调试信息。</T>
   //
   // @method
   // @return TString 调试信息
   //==========================================================
   MO.FUiCell_dump = function FUiCell_dump(s){
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append(o.value);
      s.append(']');
      return s;
   }
}
