//==========================================================
// <T>表格列表类。</T>
// 模板:
//  hPanel<TABLE>
// ┌--------------------------------------------------------┐
// │ hTitleForm<TABLE>                                      │
// │┌-------------------------------┬-------------------┐│
// ││hCaption<TD>                   │(Buttons)          ││
// │└-------------------------------┴-------------------┘│
// ├--------------------------------------------------------┤
// │ hBorderPanel<TD:TBorder.hPanel>                        │
// │┌----------------------------------------------------┐│
// ││ hDataPanel<DIV>                                    ││
// │└----------------------------------------------------┘│
// ├--------------------------------------------------------┤
// │ hHintForm<TABLE>                                       │
// │┌------------┬--------------------------------------┐│
// ││hHint<TD>   │(Buttons)                             ││
// │└------------┴--------------------------------------┘│
// └--------------------------------------------------------┘
//
// @class FGridControl
// @history 091022 MAOCY 创建
//==========================================================
function FBrowserControl(o) {
   o = RClass.inherits(this, o, FGridControl);
   //..........................................................
   // @property
   o.fieldName         = RClass.register(o, new TPtyStr('field_name', 'name'));
   o.fieldLabel        = RClass.register(o, new TPtyStr('field_label', 'label'));
   o.fieldIcon         = RClass.register(o, new TPtyStr('field_icon', 'icon'));
   o.fieldGroup        = RClass.register(o, new TPtyStr('field_group', 'group'));
   o.fieldGroup        = 'list_label';
   //..........................................................
   // @attribute
   o.dsPageSize        = 100;
   //..........................................................
   // @attribute
   o.groupList         = new TList();
   o.groups            = new TMap();
   o.nodes             = new TList();
   // @listener
   o.lsnsRowClick      = new TListeners();
   o.lsnsRowDblClick   = new TListeners();
   //..........................................................
   // @event
   o.onResizeAfter     = RMethod.empty;
   o.onBuildData       = RMethod.empty;
   o.onNodeClick       = RClass.register(o, new HClick('onNodeClick'), FBrowserControl_onNodeClick);
   o.onNodeDoubleClick = RClass.register(o, new HClick('onNodeDoubleClick'), FBrowserControl_onNodeDoubleClick);
   o.onLoadDataset     = FBrowserControl_onLoadDataset;
   //..........................................................
   // @process
   o.oeBuild           = FBrowserControl_oeBuild;
   //..........................................................
   // @method
   o.groupClear        = FBrowserControl_groupClear;
   o.groupSync         = FBrowserControl_groupSync;
   o.nodeSync          = FBrowserControl_nodeSync;
   o.pushColumn        = FBrowserControl_pushColumn;
   return o;
}
//==========================================================
function FBrowserControl_onNodeClick(s, e){
}

//==========================================================
function FBrowserControl_onNodeDoubleClick(s, e){
   var o = this;
   //
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s, s);
   //
   var e = o._eventRowClick;
   if(!e){
      e = o._eventRowClick = new TEvent();
      e.source = o;
   }
   e.caller = s;
   e.handle = 'onTableRowClick';
   RConsole.find(FFormConsole).processEvent(e);
}

//==========================================================
function FBrowserControl_onLoadDataset(ds, da){
   var o = this;
   var c = ds.count;
   o.groupClear();
   if(o.fieldGroup){
      for(var n=0; n<c; n++){
         var r = ds.rows.get(n);
         var gn = r.get(o.fieldGroup);
         var g = o.groupSync(gn);
         g.setLabel(gn);
         g.nodeNext().loadValue(r);
      }
   }else{
      for(var n=0; n<c; n++){
         var r = ds.rows.get(n);
         var bn = o.nodeSync(n);
         bn.loadValue(r);
      }
   }
   return;
}

//==========================================================
function FBrowserControl_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      // 修正表格高度
      if(!o.height || o.height < 160){
         o.height = '100%';
      }
   }
   // 开始建立表格
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hp = o.hPanel;
      var hpl = o.hPanel.insertRow();
      // 建立外边框
      var b = o.border = new TBorder(EBorder.Round);
      b.hParent = hpl.insertCell();
      RBorder.build(b);
      var hbf = b.hForm;
      hbf.width = '100%';
      hbf.height = '100%';
      // 建立一像素宽的地纵向支撑列
      var hc = hpl.insertCell();
      hc.width = 1;
      var hd = o.hFixHeight = RBuilder.appendDiv(hc);
      hd.style.width = 1;
      hd.style.height = o._minHeight;
      // 建立内部表格
      var hbp = o.hBorderPanel = b.hPanel;
      hbp.className = o.style('BorderPanel');
      hbp.vAlign = 'top';
      hbp.style.overflow = 'auto';
      // 建立内部数据区
      var hdp = o.hDataPanel = RBuilder.appendDiv(o.hBorderPanel);
      hdp.style.width = '100%';
      hdp.style.height = '100%';
      hdp.style.overflow = 'auto';
      hdp.style.backgroundColor = '#FFFFFF';
      // 建立提示区
      var hnp = o.hNavigator = o.hPanel.insertRow().insertCell();
      hnp.height = 1;
      o.hHintForm = RBuilder.appendTable(hnp, o.style('HintForm'));
      o.onBuildHint(e);
   }
   return r;
}
//==========================================================
function FBrowserControl_groupClear(){
   var o = this;
   var gs = o.groups;
   for(var n=gs.count-1; n>=0; n--){
      var g = gs.value(n);
      g.nodeClear();
      g.hide();
   }
   gs.clear();
}
//==========================================================
// name
function FBrowserControl_groupSync(n){
   var o = this;
   var gs = o.groups;
   var g = gs.get(n);
   if(!g){
      g = o.groupList.get(gs.count);
      if(!g){
         g = RControl.create(FBrowserGroup, o.hDataPanel);
         g.browser = o;
         o.groupList.push(g)
      }
      g.name = n;
      gs.set(n, g);
   }
   g.setVisible(true);
   return g;
}
//==========================================================
// index
function FBrowserControl_nodeSync(n){
   var o = this;
   var ps = o.nodes;
   var p = ps.get(n);
   if(!p){
      for(var i=ps.count; i<=n; i++){
         p = RControl.create(FBrowserNode, o.hDataPanel);
         p.browser = o;
         ps.push(p);
      }
   }
   p.setVisible(true);
   return p;
}
// ------------------------------------------------------------
function FBrowserControl_pushColumn(c){
   var o = this;
   // 为固定列的情况
   if(c.dispFixed){
      // 追加标题列
      o.hFixHead.appendChild(c.hPanel);
      // 追加搜索列
      o.hFixSearch.appendChild(c.hSearchPanel);
      // 追加统计列
      o.hFixTotal.appendChild(c.hTotalPanel);
      // 在数据区追加修正行
      o.hFixRowLine.appendChild(c.hFixPanel);
   }else{
      // 追加标题列
      o.hHead.appendChild(c.hPanel);
      // 追加搜索列
      o.hSearch.appendChild(c.hSearchPanel);
      // 追加统计列
      o.hTotal.appendChild(c.hTotalPanel);
      // 在数据区追加修正行
      o.hRowLine.appendChild(c.hFixPanel);
   }
   // 追加控件
   o.push(c);
}
