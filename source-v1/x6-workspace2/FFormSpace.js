//==========================================================
// <T>操作数据集的管理类。</T>
//
// @class FControl
// @history 091029 MAOCY 创建
//==========================================================
function FFormSpace(o){
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @style
   o.stButton      = RClass.register(o, new TStyle('Button'));
   o.stLabel       = RClass.register(o, new TStyle('Label'));
   o.stHover       = RClass.register(o, new TStyle('Hover'));
   o.stSelect      = RClass.register(o, new TStyle('Select'));
   //..........................................................
   // @attribute
   o._manager      = null;
   o._sheet        = null;
   o._selected     = false;
   o.formName      = null;
   o.form          = null;
   //..........................................................
   // @html
   o.hButton       = null;
   o.hButtonLine   = null;
   o.hButtonPanel  = null;
   o.hIcon         = null;
   o.hText         = null;
   //..........................................................
   // @event
   o.onEnter       = FFormSpace_onEnter;
   o.onLeave       = FFormSpace_onLeave;
   o.onMouseDown   = FFormSpace_onMouseDown;
   o.onMouseUp     = FFormSpace_onMouseUp;
   o.onButtonClick = RClass.register(o, new HClick('onButtonClick'), FFormSpace_onButtonClick);
   o.onUpdateEnd   = FFormSpace_onUpdateEnd;
   o.onBuildPanel  = FFormSpace_onBuildPanel;
   //..........................................................
   // @process
   o.oeBuild       = FFormSpace_oeBuild;
   //..........................................................
   // @method
   o.setIcon       = FFormSpace_setIcon;
   o.setText       = FFormSpace_setText;
   o.setHint       = FFormSpace_setHint;
   o.setCaption    = FFormSpace_setCaption;
   o.findForm      = FFormSpace_findForm;
   o.innerSelect   = FFormSpace_innerSelect;
   o.select        = FFormSpace_select;
   o.setVisible    = FFormSpace_setVisible;
   o.setFormIcon   = FFormSpace_setFormIcon;
   o.doFetch       = FFormSpace_doFetch;
   o.doSearch      = FFormSpace_doSearch;
   o.doLov         = FFormSpace_doLov;
   o.doCopy        = FFormSpace_doCopy;
   o.doZoom        = FFormSpace_doZoom;
   o.doDelete      = FFormSpace_doDelete;
   o.doMovePage    = FFormSpace_doMovePage;
   o.doDetail      = FFormSpace_doDetail;
   o.doPrintPdf    = FFormSpace_doPrintPdf;
   o.refresh       = FFormSpace_refresh;
   o.dispose       = FFormSpace_dispose;
   return o;
}

//==========================================================
// <T>鼠标进入控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSpace_onEnter(e){
   var o = this;
   if(!o._selected){
      o.hPanel.className = o.style('Hover');
   }
}

//==========================================================
// <T>鼠标离开控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSpace_onLeave(e){
   var o = this;
   if(!o._selected){
      o.hPanel.className = o.style('Button');
   }
}


//==========================================================
// <T>鼠标按下的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSpace_onMouseDown(e){
   if(!this.disabled){
      //this.hPanel.className = this.style('Press');
   }
}

//==========================================================
// <T>鼠标弹起的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSpace_onMouseUp(e){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Hover');
   }
}

//==========================================================
// <T>鼠标点击的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSpace_onButtonClick(e){
   this._sheet.clickSpace(this);
}


//==========================================================
// <T>处理更新后事件。</T>
//
// @method
// @param g:argument:Object 参数
//==========================================================
function FFormSpace_onUpdateEnd(g){
   var o = this;
   var f = g.form;
   /*var hb = o._spaces;
   var m = o._manager;
   var b = m.historyBar.popup();
   if(b){
      var s = b.store.space;
      if(s){
         s.refresh();
         s.form.focus();
      }
   }else{
     if(RClass.isClass(o.form, FTable)){
         o.refresh();
     }
      f.focus();
   }
   m.onUpdateEnd(g);*/
}

//==========================================================
// <T>构造底层面板。</T>
//
// @method
//==========================================================
function FFormSpace_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Button'));
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 构建事件的状态
//==========================================================
function FFormSpace_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var b = e.builder;
   var h = o.hPanel;
   // 建立按键表格
   var hb = o.hButton = b.appendTable(o.hPanel, o.style('Panel'));
   var hl = o.hButtonLine = o.hButton.insertRow();
   var hc = o.hButtonPanel = hl.insertCell();
   o.attachEvent('onButtonClick', hc);
   // 建立图标
   o.hIcon = b.appendIcon(hc, 'ctl.form-table');
   // 建立文本
   o.hText = b.append(hc, 'SPAN');
   o.hText.style.whiteSpace = 'nowrap';
   return EEventStatus.Stop;
}


//==========================================================
// <T>设置按键的图标内容。</T>
//
// @method
// @param c:icon:String 图标名称
//==========================================================
function FFormSpace_setIcon(c){
   this.hIcon.src = RResource.iconPath(c);
}

//==========================================================
// <T>设置按键的文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FFormSpace_setText(t){
   this.hText.innerText = t;
}

//==========================================================
function FFormSpace_setHint(s){
   this.hText.title = s;
}

//==========================================================
// <T>设置表单标题。</T>
//
// @method
// @param f:form:MForm 表单对象
// @param l:label:String 附加显示内容
//==========================================================
function FFormSpace_setCaption(t){
   var o = this;
   var f = o.form;
   var r = f.label;
   if(t){
      r += ' (' + t + ')';
   }
   o.hText.innerText = ' ' + r;
   //
   //var s = new TString();
   //s.append('Name: ' + f.name + ' ');
   //s.append('Note: ' + f.note);
   //window.status = s.toString();
   //o.historyButton.setHint(s.toString());
}

//==========================================================
// <T>查找一个表单，如果不存在则创建。</T>
//
// @method
// @param n:formName:String 表单名称
//==========================================================
function FFormSpace_findForm(n){
   var o = this;
   var m = o._manager;
   // 释放表单
   var f = o.form;
   if(f){
      if(f.name == n){
         return f;
      }
      f.setVisible(false);
      RConsole.find(FFormConsole).free(f);
   }
   // 创建表单
   o.formName = n;
   f = o.form = RConsole.find(FFormConsole).createFromName(n, RFormSpace.hFormPanel, RWindow.builder());
   f.lsnsUpdateEnd.register(o, o.onUpdateEnd);
   f.setSize('100%', '100%');
   f.setVisible(true);
   f.dsShow();
   f.psResize();
   o.setCaption();
   return f;
}

//==========================================================
function FFormSpace_innerSelect(v){
   var o = this;
   // 选中历史按键
   o._selected = v;
   o.hPanel.className = v ? o.style('Select') : o.style('Button');
   // 如果表单已经创建，则控制表单是否显示
   var m = o._manager;
   var f = o.form;
   if(f){
      // 设置工具栏信息
      m.hToolbarPanel.height = f.dispToolbar ? 24 : 1;
      if(v){
         // 显示表单
         m.selectForm(f);
         f.setVisible(true);
         m.lsnsFormShowBefore.process(o, f);
         f.psRefreshFirst();
         f.psResize();
         m.lsnsFormShow.process(o, f);
         // 刷新表单
         f.dsShow();
         f.focus();
      }else{
         // 隐藏表单
         f.setVisible(false);
      }
   }
}

//==========================================================
function FFormSpace_select(){
   this._sheet.select(this);
}

//==========================================================
// <T>点击控件的可见性。</T>
//
// @method
// @param v:visible:Boolean
//    <L value='true'>可见</L>
//    <L value='false'>不可见</L>
//==========================================================
function FFormSpace_setVisible(v){
   var o = this;
   if(o.hSplit){
      o.hSplit.style.display = v ? 'block' : 'none';
   }
   o.hPanel.style.display = v ? 'block' : 'none';
   // 关联表单可时性
   var f = o.form;
   if(f){
      f.setVisible(v);
   }
}

//----------------------------------------------------------
function FFormSpace_setFormIcon(c){
   var o = this;
   var f = o.form;
   if(RString.isEmpty(c)){
      if(RClass.isClass(f, FForm)){
         switch(f._emode){
            case EMode.Insert:
               c = '#tbr.formInsert';
               break;
            case EMode.Update:
               c = '#tbr.formUpdate';
               break;
            case EMode.Delete:
               c = '#tbr.formDelete';
               break;
         }
      }else{
         c = '#tbr.table';
      }
   }
   o.setIcon(c);
}

//----------------------------------------------------------
function FFormSpace_doFetch(){
   // 查询按钮用
   var f = RConsole.find(FFocusConsole).findClass(MDataset);
   f.dsSearchs.clear();
   f.dsOrders.clear();
   f.dsFetch(true, true);
}

//----------------------------------------------------------
function FFormSpace_doSearch(){
   RConsole.find(FFocusConsole).findClass(MDataset).doSearch();
}

//----------------------------------------------------------
function FFormSpace_doCopy(){
   var f= RConsole.find(FFocusConsole).findClass(MDataset);
   if(f){
      f.dsCopy();
   }
}

//----------------------------------------------------------
function FFormSpace_doLov(){
   var fc = RConsole.find(FFocusConsole).findClass(MListView);
   if(fc){
      fc.doListView();
   }
}

//----------------------------------------------------------
function FFormSpace_doZoom(){
   var fc = RConsole.find(FFocusConsole).findClass(MZoom);
   if(fc){
      fc.doZoom();
   }
}

//----------------------------------------------------------
function FFormSpace_doDelete(){
}

//----------------------------------------------------------
function FFormSpace_doMovePage(a){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, FTable)){
      dc.dsMovePage(a);
   }
}

//----------------------------------------------------------
function FFormSpace_doDetail(){
   var ouid = null;
   var over = null;
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, FForm)){
      ouid = dc.dsGet('ouid');
      over = dc.dsGet('over');
   }else if(RClass.isClass(dc, FTable)){
      var rs = dc.findSelectRows();
      if(!rs.isEmpty()){
         var r = rs.get(0);
         ouid = r.ouid();
         over = r.over();
      }
   }
   if(ouid && over){
      var uri = top.RContext.context('/apl/logic/resource/WebResource.wa?form_name={0}&ouid={1}&over={2}');
      uri = RString.format(uri, dc.name, ouid, over);
      RHtml.popup(uri, 900, 600);
   }
}

//----------------------------------------------------------
function FFormSpace_doPrintPdf(){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, MForm)){
      var formName = dc.getFormLink(EFormLink.Form);
      var uri = top.RContext.context('/public.pdf.wv?do=build&form_name=' + formName);
      RHtml.popup(uri, 800, 600);
   }
}

//==========================================================
// <T>刷新空间。</T>
//
// @method
//==========================================================
function FFormSpace_refresh(){
   var o = this;
   var f = o.from;
   if(f){
      f.psResize();
      f.psRefresh();
   }
}

//==========================================================
// <T>点击控件的可见性。</T>
//
// @method
// @param v:visible:Boolean
//    <L value='true'>可见</L>
//    <L value='false'>不可见</L>
//==========================================================
function FFormSpace_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hLine = null;
   o.hIcon = null;
   o.hText = null;
}