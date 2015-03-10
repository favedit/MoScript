//==========================================================
// <T>数据控件的基类。</T>
// <P>当对象实现MDrapable接口时候，才会创建下拉元素。</P>
//
//  hPanel<TABLE>
// ┌-----------------------------------┬-------------------------------------┐
// │ hLabelPanel<TD>                   │ hEditPanel<TD>                      │
// │ hLabelForm<TABLE>                 │ hEditForm<TABLE>                    │
// │                                   │ hEditLine<TR>                       │
// │┌--------------┬---------------┐│┌-----------------┬--------------┐│
// ││hIconPanel<TD>│hTextPanel<TD> │││hValuePanel<TD>  │hHintPanel<TD>││
// ││hIcon<IMG>    │hText<SPAN>    │││(Border)         │hHint<IMG>    ││
// │└--------------┴---------------┘│└-----------------┴--------------┘│
// └-----------------------------------┴-------------------------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
function FUiDataEditControl(o){
   //o = RClass.inherits(this, o, FUiEditControl, MEditDescriptor, , MDesign, MUiFocus, MDisplay, MProgress);
   o = RClass.inherits(this, o, FUiEditControl, MDataField, MEditValue, MEditChange, MEditDrop);
   //..........................................................
   // @property
   o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), ELabelMode.All);
   o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), ELabelPosition.Left);
   o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EAlign.Left);
   o._editSize         = RClass.register(o, new APtySize2('_editSize'));
   o._dataTypeCd       = RClass.register(o, new APtyString('_dataTypeCd'));
   //o.typeAble        = RClass.register(o, new APtyString('typeAble'), EBool.False);
   //..........................................................
   // @style
   o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
   //..........................................................
   // @attribute
   //o._textColor      = null;
   //o._foreColor      = null;
   //o._backColor      = null;
   //o._progress       = false;
   //..........................................................
   // @html <TD> 标签面板
   o._hLabelPanel      = null;
   // @html <TABLE> 标签容器
   o._hLabelForm       = null;
   // @html <TD> 标签图标面板
   o._hIconPanel       = null;
   // @html <IMG> 标签图标
   o._hIcon            = null;
   // @html <TD> 标签文字面板
   o._hTextPanel       = null;
   // @html <SPAN> 标签文字
   o._hText            = null;
   // @html <TD> 编辑面板
   o._hEditPanel       = null;
   // @html <TABLE> 编辑容器
   o._hEditForm        = null;
   // @html <TD> 编辑内容面板
   o._hValuePanel      = null;
   //o.hHintPanel      = null;
   //o.hHintIcon       = null;
   //..........................................................
   // @event
   //o.onDataDoubleClick = FUiDataEditControl_onDataDoubleClick;
   //o.onDataKeyDown   = FUiDataEditControl_onDataKeyDown;
   // @event
   //o.onDesignBegin   = FUiDataEditControl_onDesignBegin;
   //o.onDesignEnd     = FUiDataEditControl_onDesignEnd;
   // @event
   o.onBuildLabelIcon  = FUiDataEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FUiDataEditControl_onBuildLabelText;
   o.onBuildLabel      = FUiDataEditControl_onBuildLabel;
   o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
   o.onBuildEdit       = FUiDataEditControl_onBuildEdit;
   o.onBuildPanel      = FUiDataEditControl_onBuildPanel;
   o.onBuild           = FUiDataEditControl_onBuild;
   //..........................................................
   // @process
   o.oeDataLoad        = FUiDataEditControl_oeDataLoad;
   o.oeDataSave        = FUiDataEditControl_oeDataSave;
   // @process
   o.oeDesign          = FUiDataEditControl_oeDesign;
   o.oeMode            = FUiDataEditControl_oeMode;
   //o.oeProgress      = FUiDataEditControl_oeProgress;
   //o.oeLoadValue     = FUiDataEditControl_oeLoadValue;
   //o.scalar          = FUiDataEditControl_scalar;
   //o.onScalar        = FUiDataEditControl_onScalar;
   //..........................................................
   // @method
   //o.doFocus         = FUiDataEditControl_doFocus;
   //o.doBlur          = FUiDataEditControl_doBlur;
   //..........................................................
   // @method
   o.construct         = FUiDataEditControl_construct;
   // @method
   o.panel             = FUiDataEditControl_panel;
   o.label             = FUiDataEditControl_label;
   o.setLabel          = FUiDataEditControl_setLabel;
   o.getEditRange    = FUiDataEditControl_getEditRange;
   //o.text            = FUiDataEditControl_text;
   //o.setText         = FUiDataEditControl_setText;
   //o.testFocus       = FUiDataEditControl_testFocus;
   //o.setEditable     = FUiDataEditControl_setEditable;
   //o.setVisible      = FUiDataEditControl_setVisible;
   //o.focus           = FUiDataEditControl_focus;
   //o.refreshStyle    = FUiDataEditControl_refreshStyle;
   o.dispose           = FUiDataEditControl_dispose;
   return o;
}

//==========================================================
// <T>建立标签图标。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
function FUiDataEditControl_onBuildLabelIcon(p){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o._labelIcon);
   }
}

//==========================================================
// <T>建立标签文本。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
function FUiDataEditControl_onBuildLabelText(p){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
}

//==========================================================
// <T>建立标签。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
function FUiDataEditControl_onBuildLabel(p){
   var o = this;
   var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hr = RBuilder.appendTableRow(h);
   // 建立标签图标
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   o.onBuildLabelIcon(p);
   // 建立标签文字
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(p);
   // 设置标签尺寸
   RHtml.setSize(h, o._labelSize);
   // 设置标签对齐
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
      htp.style.paddingRight = 4;
   }
   // 设置标签颜色
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}

//==========================================================
// <T>建立编辑器。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
function FUiDataEditControl_onBuildEdit(p){
   var o = this;
   /// 建立控件表格
   var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hr = o._hEditLine = RBuilder.appendTableRow(h);
   // 建立编辑面板
   o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditValue(p);
   // 设置大小
   RHtml.setSize(h, o._editSize);
   //if(o.editWidth){
      //hc.width = o.editWidth;
   //}
   //if(o.validRequire){
   //var hccc = o.hControlRow.insertCell();
   //hccc.width = 30;
   //hccc.style.border = '1px solid red';
   //hccc.align = 'center';
   //var hCk1 = o.hRight = document.createElement('IMG');
   //var hCk2 = o.hError = document.createElement('IMG');
   //hCk1.src = o.styleIconPath('Right', FUiDataEditControl);
   //hCk2.src = o.styleIconPath('Error', FUiDataEditControl);
   //hccc.appendChild(hCk1);
   //hccc.appendChild(hCk2);
   //hCk2.style.padding = 10;
   //hCk1.style.display = 'none'; 
   //hCk2.style.display = 'none'; 
   //}
   /*
   // 设置编辑框的信息
   var he = o.hEdit;
   if(he){
      if(o.editAlign){
         he.style.textAlign = o.editAlign;
      }
      // 关联编辑事件
      o.linkEvent(o, 'onFocus', he);
      o.linkEvent(o, 'onBlur', he);
      o.linkEvent(o, 'onDataClick', he);
      o.linkEvent(o, 'onDataDoubleClick', he);
      o.linkEvent(o, 'onDataKeyDown', he);
      o.linkEvent(o, 'onDataChange', he);
      
   }
   // 建立提示区
   if(o.hint){
      var hp = o.hHintPanel = hcr.insertCell();
      hp.width = 13;
      hp.align = 'right';
      hp.vAlign = 'top';
      var hi = o.hHintIcon = RBuilder.appendIcon(hp, 'ctl.hint');
      hi._pname = 'hHintIcon';
      hi.title = o.hint;
   }
   // 建立编辑单位信息
   if(o.editUnit){
      var h = o.hUnit = o.hControlRow.insertCell();
      h.className = o.styleName('EditUnit');
      h._pname = 'hUnit';
      h.innerHTML = '&nbsp;'+o.editUnit;
   }*/
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
function FUiDataEditControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiDataEditControl_onBuild(p){
   var o = this;
   // 处理宽度小于标签宽度和编辑框宽度的情况，将宽度值设置为空
   //if(o.labelWidth && o.editWidth && o.width){
   //   if(RInteger.parse(o.width) < RInteger.parse(o.labelWidth) + RInteger.parse(o.editWidth)){
   //      o.width = null;
   //   }
   //}
   // 建立控件
   o.__base.FUiEditControl.onBuild.call(o, p);
   var hc = o._hPanel;
   //..........................................................
   // 建立标签和控件区域
   var hlp = null;
   var hep = null;
   var lmc = o._labelModeCd;
   if(lmc == ELabelMode.Label){
      // 只建立标签的情况
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == ELabelMode.Hidden){
      // 只建立编辑框的情况
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      // 全部建立的情况
      var lpc = o._labelPositionCd;
      if(lpc == ELabelPosition.Top){
         hlp = RBuilder.appendTableRowCell(hc);
         hep = RBuilder.appendTableRowCell(hc);
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableRowCell(hc);
         hlp = RBuilder.appendTableRowCell(hc);
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   //..........................................................
   // 建立标签对象
   if(hlp){
      o.onBuildLabel(p);
      hlp.appendChild(o._hLabelForm);
      // 设置名称
      o.setLabel(o._label);
      // 标签操作
      //var hl = o.hLabel;
      //if(hl){
      //   // 设置必须检查
      //   if(o.validRequire){
      //      hl.style.color = EColor.Require;
      //   }
      //   // 如果当前控件支持列表接口
      //   if(RClass.isClass(o, MListView)){
      //      o.setLabelStyle(hl);
      //   }
      //}
   }
   //..........................................................
   // 建立控件对象
   if(hep){
      o.onBuildEdit(p);
   }
}



//==========================================================
// <T>获得编辑区大小。</T>
//
// @method
// @return TRange 范围对象
//==========================================================
function FUiDataEditControl_getEditRange(){
   var o = this;
   var hc = o.hEditCell;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}












//==========================================================
//<T>设置数据。</T>
//
//@method
//@param v:value:String 数据
//==========================================================
function FUiDataEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}

//==========================================================
//<T>响应焦点失去的操作。</T>
//
//@param s:sender:FUiEditControl 源控件
//@param e:event:HBlur 事件对象
//==========================================================
function FUiDataEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}

//==========================================================
// <T>数据区域鼠标双击事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiDataEditControl_onDataDoubleClick(){
   var o = this;
   // 展开下拉菜单
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   // 显示选取列表
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}

//==========================================================
// <T>数据区域键盘按下事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiDataEditControl_onDataKeyDown(s, e){
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   // 设置修改图标
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = o.isDataChanged() ? 'block' : 'none';
   }
   if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
      // 展开下拉菜单
      o.drop();
   }else if(e.ctrlKey && (EKey.Enter==e.keyCode) && o.editSearch){
      // 表单内快速查询
      var dc = o.dsControl;
      if(dc){
         if(!o.isValid){
            var sn = new TNode('Search');
            var n = sn.create('Item');
            n.set('name', o.name);
            n.set('data_name', o.dataName);
            n.set('data_value', o.dataValue);
            n.set('search_type', ESearch.Equals);
            n.set('search_order', EOrder.None);
            RConsole.find(FDatasetConsole).fetch(dc, sn);
         }
      }
   }
}

//==========================================================
// <T>开始设计事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiDataEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}

//==========================================================
// <T>结束设计事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiDataEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}

//==========================================================
// <T>从数据源加载数据处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function FUiDataEditControl_oeDataLoad(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = r.get(o._dataName);
   o.set(v);
   return EEventStatus.Stop;
}

//==========================================================
// <T>存储数据到数据源处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function FUiDataEditControl_oeDataSave(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = o.get();
   r.set(o._dataName, v);
   return EEventStatus.Stop;
}

//==========================================================
// <T>设计模式转换。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
// @return EEventStatus 处理状态
//==========================================================
function FUiDataEditControl_oeDesign(p){
   var o = this;
   o.__base.MDesign.oeDesign.call(o, e);
   var hlf = o.hLabelForm;
   var hef = o.hEditForm;
   switch(e.mode){
      case EDesign.Move:
         if(e.flag){
            o.hForm.border = 1;
            //o.hForm.style.border = '1 solid #00FF88';
            if(hlf){
               //hlf.border = 1;
               //hlf.style.border = '1 solid #8800FF';
               hlf.cellPadding = 1;
            }
            if(hef){
               //hef.border = 1;
               //hef.style.border = '1 solid #FF8800';
            }
            if(o.hEdit){
               o.hEdit.disabled = true;
            }
         }else{
            o.hForm.border = 0;
            if(hlf){
               hlf.border = 0;
               hlf.cellPadding = 0;
            }
            if(hef){
               //hef.border = 0;
            }
            if(o.hEdit){
               o.hEdit.disabled = false;
            }
         }
         break;
      case EDesign.Border:
         if(e.flag){
            o.hForm.border = 1;
            if(hef){
               hef.border = 1;
            }
         }else{
            o.hForm.border = 0;
            if(hef){
               hef.border = 0;
            }
         }
         break;
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>处理工作模式转换。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
// @return EEventStatus 处理状态
//==========================================================
function FUiDataEditControl_oeMode(e){
   var o = this;
   o.__base.FUiEditControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   // 根据工作模式获得设置信息
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   // 如果在加载中不设置工作模式，由加载处理设置信息
   if(!o._progress){
      o.setEditable(o._editable);
   }
   // 返回处理结果
   return EEventStatus.Stop;
}

//==========================================================
// <T>处理数据加载中和加载完成处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
// @return EEventStatus 处理状态
//==========================================================
function FUiDataEditControl_oeProgress(e){
   var o = this;
   // 加载中不做处理
   if(o._progress && e.enable){
      return EEventStatus.Stop;
   }
   // 根据状态设置信息
   o._progress = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>加载数据事件。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
// @return EEventStatus 处理状态
//==========================================================
function FUiDataEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MEditValue.oeLoadValue.call(o, e);
   // 设置修改标志为不显示
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}

//==========================================================
// <T>获得焦点处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiDataEditControl_doFocus(e){
   var o = this;
   o.__base.MUiFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}

//==========================================================
// <T>失去焦点处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiDataEditControl_doBlur(e){
   var o = this;
   o.__base.MUiFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiDataEditControl_construct(){
   var o = this;
   // 父处理
   o.__base.FUiEditControl.construct.call(o);
   o.__base.MEditChange.construct.call(o);
   o.__base.MEditDrop.construct.call(o);
   // 设置属性
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}

//==========================================================
// <T>获得底板。</T>
//
// @method
// @param t:type:EPanel 类型
// @return HtmlTag 页面元素
//==========================================================
function FUiDataEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FUiEditControl.panel.call(o, t);
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签内容
//==========================================================
function FUiDataEditControl_label(p){
   return this._label;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:value:String 标签内容
//==========================================================
function FUiDataEditControl_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hText){
      o._hText.innerHTML = RString.nvl(p);
   }
}

//==========================================================
// <T>测试对象是否可以获得焦点。</T>
//
// @method
// @return Boolean 是否可以获得焦点
//==========================================================
function FUiDataEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}

//==========================================================
// <T>获得显示内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
function FUiDataEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}

//==========================================================
// <T>设置显示内容。</T>
//
// @method
// @param t:text:String 显示内容
//==========================================================
function FUiDataEditControl_setText(t){
   this.hEdit.value = t;
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param v:value:Boolean 可编辑性
//==========================================================
function FUiDataEditControl_setEditable(v){
   var o = this;
   o.__base.MEditValue.setEditable.call(o, v);
   if(o.hEdit){
      o.hEdit.readOnly = !v;
   }
   // 标签操作
   var hl = o.hLabel;
   if(hl){
      // 设置必须检查
      if(o.validRequire){
         o.hLabel.style.color = v ? EColor.Require : EColor.Text;
      }
      // 如果当前控件支持列表接口
      if(RClass.isClass(o, MListView) && o.canListView()){
         hl.style.cursor = v ? 'hand' : 'normal';
         hl.className = v ? 'RLine_Underline' : '';
      }
   }
}

//==========================================================
// <T>设定是否显示。</T>
//
// @method
// @param v:visible:Boolean 是否显示
//==========================================================
function FUiDataEditControl_setVisible(v){
   var o = this;
   o.__base.FUiEditControl.setVisible.call(o, v);
   o.refreshStyle();
}

//==========================================================
// <T>设置焦点。</T>
//
// @method
//==========================================================
function FUiDataEditControl_focus(){
   var o = this;
   o.__base.MUiFocus.focus.call(o);
   if(o.hEdit){
      // 获得焦点，忽略错误
      try{
         o.hEdit.focus();
      }catch(e){
         //alert(o.label + ' focus error.');
      }
   }
}

//==========================================================
// <T>根据自身设置信息刷新样式。</T>
//
// @method
//==========================================================
function FUiDataEditControl_refreshStyle(){
   var o = this;
   // 检查可见性
   if(!o._visible){
      return;
   }
   // 获得前景颜色/背景颜色
   var tc = EColor.TextReadonly;
   var bc = EColor.Readonly;
   var cr = 'normal';
   // 检查可编辑性
   if(o._editable){
      tc = EColor.TextEdit;
      bc = EColor.Edit;
      cr = 'hand';
      if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
         tc = '#CCCCCC';
      }
   }
   // 检查有效性
   if(o._invalidText){
      if(!RString.isEmpty(o.text())){
         tc = EColor.TextInvalid;
         bc = EColor.Invalid;
      }
   }
   // 记录颜色
   o._textColor = tc;
   o._backColor = bc;
   // 设置编辑颜色
   var he = o.hEdit;
   var hd = o.hDrop;
   if(he){
      he.style.color = tc;
      he.style.backgroundColor = bc;
   }
   // 带有下拉的控件 
   if(hd){
      // 设置编辑部分鼠标的样式
      if(he){
         he.style.cursor = cr;
      }
      // 设置下拉鼠标的样式
      hd.style.cursor = cr;
   }
   // 设置边框显示方式
   if(o.editBorder){
      var bs = EUiBorderStyle.Readonly;
      if(o._editable){
         bs = EUiBorderStyle.Edit;
      }
      if(o._hover){
         bs = EUiBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FUiDataEditControl_dispose(){
   var o = this;
   // 释放属性
   o._labelModeCd = null;
   o._labelPositionCd = null;
   o._labelAlignCd = null;
   o._dataTypeCd = null;
   // 释放结构
   var v = o._labelSize;
   if(v){
      v.dispose();
      o._labelSize = null;
   }
   var v = o._editSize;
   if(v){
      v.dispose();
      o._editSize = null;
   }
   // 释放页面元素
   RHtml.free(o._hLabelPanel);
   o._hLabelPanel = null;
   RHtml.free(o._hLabelForm);
   o._hLabelForm = null;
   RHtml.free(o._hIconPanel);
   o._hIconPanel = null;
   RHtml.free(o._hIcon);
   o._hIcon = null;
   RHtml.free(o._hTextPanel);
   o._hTextPanel = null;
   RHtml.free(o._hText);
   o._hText = null;
   RHtml.free(o._hEditPanel);
   o._hEditPanel = null;
   RHtml.free(o._hEditForm);
   o._hEditForm = null;
   RHtml.free(o._hValuePanel);
   o._hValuePanel = null;
   RHtml.free(o._hDropPanel);
   o._hDropPanel = null;
   // 父处理
   o.__base.MEditDrop.dispose.call(o);
   o.__base.MEditChange.dispose.call(o);
   o.__base.FUiEditControl.dispose.call(o);
}
