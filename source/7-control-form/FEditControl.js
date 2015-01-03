//==========================================================
// <T>数据控件的基类。</T>
// <P>当对象实现MDrapable接口时候，才会创建下拉元素。</P>
//
//  hContainer<TABLE>
// ┌-----------------------------------┬-----------------------------------┐
// │ hLabelPanel<TD>                   │ hEditorPanel<TD>                  │
// │ hLabelContainer<TABLE>            │ hEditorContainer<TABLE>           │
// │┌--------------┬---------------┐│┌---------------┬--------------┐│
// ││hIconPanel<TD>│hTextPanel<TD> │││hValuePanel<TD>│hDropPanel<TD>││
// ││hIcon<IMG>    │hText<SPAN>    │││hValue<INPUT>  │hDrop<IMG>    ││
// │└--------------┴---------------┘│└---------------┴--------------┘│
// └-----------------------------------┴-----------------------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
function FEditControl(o){
   //o = RClass.inherits(this, o, FControl, MEditDescriptor, MEditValue, MDesign, MFocus, MDisplay, MProgress);
   o = RClass.inherits(this, o, FControl, MEditDescriptor, MEditValue, MDisplay);
   //..........................................................
   // @property
   o._labelModeCd          = RClass.register(o, new APtyString(null, '_labelModeCd', null, ELabelMode.All));
   o._labelPositionCd      = RClass.register(o, new APtyString(null, '_labelPositionCd', null, ELabelPosition.Left));
   o._labelSize            = RClass.register(o, new APtySize2(null, '_labelSize'));
   o._labelAlignCd         = RClass.register(o, new APtyString(null, '_labelAlignCd', null, EAlign.Left));
   o._editSize             = RClass.register(o, new APtySize2(null, '_editSize'));
   //o.dataType            = RClass.register(o, new APtyString('dataType'));
   //o.typeAble            = RClass.register(o, new APtyString('typeAble'), EBool.False);
   //..........................................................
   // @style
   o._styleLabelContainer  = RClass.register(o, new AStyle(null, '_styleLabelContainer', 'LabelContainer'));
   o._styleEditorContainer = RClass.register(o, new AStyle(null, '_styleEditorContainer', 'EditorContainer'));
   //..........................................................
   // @attribute
   //o._textColor        = null;
   //o._foreColor        = null;
   //o._backColor        = null;
   //o._progress         = false;
   //o.border            = null;
   //o.borderStyle       = EBorder.None;
   //..........................................................
   // @html <TD> 标签面板
   o._hLabelPanel        = null;
   // @html <TABLE> 标签容器
   o,_hLabelContainer    = null;
   // @html <TD> 图标面板
   o,_hIconPanel         = null;
   // @html <IMG> 图标
   o,_hIcon              = null;
   // @html <TD> 文字面板
   o,_hTextPanel         = null;
   // @html <SPAN> 文字
   o,_hText              = null;
   // @html <TD> 编辑面板
   o._hEditorPanel         = null;
   // @html <TABLE> 编辑容器
   o._hEditorContainer     = null;
   // @html <IMG> 变更图标
   //o.hChangeIcon       = null;
   //o.hHintPanel        = null;
   //o.hHintIcon         = null;
   //..........................................................
   // @event
   //o.onChangeEnter     = RClass.register(o, new HMouseEnter('onChangeEnter'), FEditControl_onChangeEnter);
   //o.onChangeClick     = RClass.register(o, new HClick('onChangeClick'), FEditControl_onChangeClick);
   //o.onDataDoubleClick = FEditControl_onDataDoubleClick;
   //o.onDataKeyDown     = FEditControl_onDataKeyDown;
   // @event
   //o.onDesignBegin     = FEditControl_onDesignBegin;
   //o.onDesignEnd       = FEditControl_onDesignEnd;
   // @event
   //o.onBuildChange     = FEditControl_onBuildChange;
   o.onBuildLabelIcon  = FEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FEditControl_onBuildLabelText;
   o.onBuildLabel      = FEditControl_onBuildLabel;
   //o.onBuildEdit       = RMethod.virtual(o, 'onBuildEdit');
   o.onBuildEditorValue = FEditControl_onBuildEditorValue;
   o.onBuildEditorDrop  = FEditControl_onBuildEditorDrop;
   o.onBuildEditor      = FEditControl_onBuildEditor;
   o.onBuildContainer   = FEditControl_onBuildContainer;
   //..........................................................
   // @process
   o.oeBuild           = FEditControl_oeBuild;
   //o.oeDesign          = FEditControl_oeDesign;
   //o.oeMode            = FEditControl_oeMode;
   //o.oeProgress        = FEditControl_oeProgress;
   //o.oeLoadValue       = FEditControl_oeLoadValue;
   //o.scalar            = FEditControl_scalar;
   //o.onScalar          = FEditControl_onScalar;
   //..........................................................
   // @method
   //o.doFocus           = FEditControl_doFocus;
   //o.doBlur            = FEditControl_doBlur;
   //..........................................................
   // @method
   o.construct         = FEditControl_construct;
   // @method
   //o.testFocus         = FEditControl_testFocus;
   //o.getEditRange      = FEditControl_getEditRange;
   //o.text              = FEditControl_text;
   //o.setText           = FEditControl_setText;
   o.panel             = FEditControl_panel;
   o.label             = FEditControl_label;
   o.setLabel          = FEditControl_setLabel;
   //o.setEditable       = FEditControl_setEditable;
   //o.setVisible        = FEditControl_setVisible;
   //o.focus             = FEditControl_focus;
   //o.refreshStyle      = FEditControl_refreshStyle;
   o.dispose           = FEditControl_dispose;
   return o;
}

//==========================================================
// <T>鼠标进入修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onChangeEnter(e){
   var o = this;
   var t = null;
   if(RString.isEmpty(o.dataValue)){
      t = RContext.get('FEditControl:change.empty');
   }else{
      t = RContext.get('FEditControl:change.restore', o.dataValue);
   }
   o.hChangeIcon.title = t;
}

//==========================================================
// <T>鼠标点击修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onChangeClick(e){
   this.set(this.dataValue);
}

//==========================================================
//<T>设置数据。</T>
//
//@method
//@param v:value:String 数据
//==========================================================
function FEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}

//==========================================================
//<T>响应焦点失去的操作。</T>
//
//@param s:sender:FControl 源控件
//@param e:event:HBlur 事件对象
//==========================================================
function FEditControl_scalar(a){
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
function FEditControl_onDataDoubleClick(){
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
function FEditControl_onDataKeyDown(s, e){
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
function FEditControl_onDesignBegin(){
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
function FEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}

//==========================================================
// <T>建立修改标志。</T>
//
// @method
// @param hc:html:<TD> 底板
//==========================================================
function FEditControl_onBuildChange(hc){
   var o = this;
   // 设置底板
   hc.vAlign = 'top';
   hc.width = 5;
   // 建立图标
   var hi = o.hChangeIcon = RBuilder.appendIcon(hc, 'ctl.chgflag');
   hi._pname = 'hChangeIcon';
   hi.style.display = 'none';
   hi.style.cursor = 'hand';
   o.attachEvent('onChangeEnter', hi, o.onChangeEnter);
   o.attachEvent('onChangeClick', hi, o.onChangeClick);
}

//==========================================================
// <T>建立标签图标。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onBuildLabelIcon(e){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o._labelIcon);
   }
}

//==========================================================
// <T>建立标签文本。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onBuildLabelText(e){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel);
}

//==========================================================
// <T>建立标签。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onBuildLabel(e){
   var o = this;
   var h = o._hLabelContainer = RBuilder.createTable(e.hDocument, o.style('LabelContainer'));
   var hr = RBuilder.appendTableRow(h);
   // 建立标签图标
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   hip.width = 20;
   o.onBuildLabelIcon(e);
   // 建立标签文字
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(e);
   // 设置标签属性
   var ls = o._labelSize;
   if(ls.width){
      h.style.width = ls.width;
   }
   if(ls.height){
      h.style.height = ls.height;
   }
   // 设置标签对齐
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
   }
   // 设置标签颜色
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onBuildEditorValue(e){
}

//==========================================================
// <T>建立编辑器下拉。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onBuildEditorDrop(e){
}

//==========================================================
// <T>建立编辑器。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_onBuildEditor(e){
   var o = this;
   /// 建立控件表格
   var h = o._hEditorContainer = RBuilder.createTable(e.hDocument, o.style('EditorContainer'));
   var hr = RBuilder.appendTableRow(h);
   //h.width = '100%';
   //h.height = '100%';
   //h.style.border = '1px solid red';
   //o.hPanel.style.border = '1px solid red';
   //o.hPanel.style.width = 400;
   // 建立编辑面板
   var hvp = o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditorValue(e);
   // 建立下拉面板
   if(RClass.isClass(o, MDropable)){
      var hdp = o._hDropPanel = RBuilder.appendTableCell(hr);
      o.onBuildEditorDrop(e);
      //o.onBuildDrop();
      //o.editBorder.hDrop.appendChild(o.hDrop);
   }
   //if(o.editWidth){
      //hc.width = o.editWidth;
   //}
   //if(o.validRequire){
   //var hccc = o.hControlRow.insertCell();
   //hccc.width = 30;
//   hccc.style.border = '1px solid red';
   //hccc.align = 'center';
   //var hCk1 = o.hRight = document.createElement('IMG');
   //var hCk2 = o.hError = document.createElement('IMG');
   //hCk1.src = o.styleIconPath('Right', FEditControl);
   //hCk2.src = o.styleIconPath('Error', FEditControl);
   //hccc.appendChild(hCk1);
   //hccc.appendChild(hCk2);
   //hCk2.style.padding = 10;
   //hCk1.style.display = 'none'; 
   //hCk2.style.display = 'none'; 
   //}
   // 如果有边框的话，则先建立边框
   /*if(o.__base.MEditBorder){
      o.onBuildEditBorder(o.hEditCell);
      // 建立编辑部分
      o.onBuildEdit(o.editBorder);
      // 建立下拉按钮(必须支持边框模式)
      if(o.__base.MDropable){
         o.onBuildDrop();
         o.editBorder.hDrop.appendChild(o.hDrop);
      }
   }else{
      // 建立编辑部分
      o.onBuildEdit(hc);
   }
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
      h.className = o.style('EditUnit');
      h._pname = 'hUnit';
      h.innerHTML = '&nbsp;'+o.editUnit;
   }*/
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FEditControl_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createTable(e.hDocument, o.style('Container'));
}

//==========================================================
// <T>构建对象处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FEditControl_oeBuild(e){
   var o = this;
   // 处理宽度小于标签宽度和编辑框宽度的情况，将宽度值设置为空
   //if(o.labelWidth && o.editWidth && o.width){
   //   if(RInteger.parse(o.width) < RInteger.parse(o.labelWidth) + RInteger.parse(o.editWidth)){
   //      o.width = null;
   //   }
   //}
   // 建立控件
   o.__base.FControl.oeBuild.call(o, e);
   var hc = o._hContainer;
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
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
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
      o.onBuildLabel(e);
      hlp.appendChild(o._hLabelContainer);
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
      o.onBuildEditor(e);
      hep.appendChild(o._hEditorContainer);
   }
   // 设置数据
   return EEventStatus.Stop;
}

//==========================================================
// <T>设计模式转换。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FEditControl_oeDesign(e){
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
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FEditControl_oeMode(e){
   var o = this;
   o.__base.FControl.oeMode.call(o, e);
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
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FEditControl_oeProgress(e){
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
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FEditControl_oeLoadValue(e){
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
function FEditControl_doFocus(e){
   var o = this;
   o.__base.MFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}

//==========================================================
// <T>失去焦点处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FEditControl_doBlur(e){
   var o = this;
   o.__base.MFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FEditControl_construct(){
   var o = this;
   o.__base.FControl.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}

//==========================================================
// <T>测试对象是否可以获得焦点。</T>
//
// @method
// @return Boolean 是否可以获得焦点
//==========================================================
function FEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}

//==========================================================
// <T>获得编辑区大小。</T>
//
// @method
// @return TRange 范围对象
//==========================================================
function FEditControl_getEditRange(){
   var o = this;
   var hc = o.hEditCell;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}

//==========================================================
// <T>获得显示内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
function FEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}

//==========================================================
// <T>设置显示内容。</T>
//
// @method
// @param t:text:String 显示内容
//==========================================================
function FEditControl_setText(t){
   this.hEdit.value = t;
}

//==========================================================
// <T>获得底板。</T>
//
// @method
// @param t:type:EPanel 类型
// @return HtmlTag 页面元素
//==========================================================
function FEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FControl.panel.call(o, t);
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签内容
//==========================================================
function FEditControl_label(p){
   return this._label;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:value:String 标签内容
//==========================================================
function FEditControl_setLabel(p){
   var o = this;
   o._hText.innerHTML = RString.nvl(p);
   o._label = p;
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param v:value:Boolean 可编辑性
//==========================================================
function FEditControl_setEditable(v){
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
function FEditControl_setVisible(v){
   var o = this;
   o.__base.FControl.setVisible.call(o, v);
   o.refreshStyle();
}

//==========================================================
// <T>设置焦点。</T>
//
// @method
//==========================================================
function FEditControl_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
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
function FEditControl_refreshStyle(){
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
      var bs = EBorderStyle.Readonly;
      if(o._editable){
         bs = EBorderStyle.Edit;
      }
      if(o._hover){
         bs = EBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FEditControl_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   // 释放属性
   o._labelSize = null;
   o._editSize = null;
   // 释放元素
   o.hForm = null;
   o.hFormRow = null;
   o.hLabelForm = null;
   o.hChangeIcon = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hControlForm = null;
   o.hControlRow = null;
   o.hControl = null;
   o.hEdit = null;
   o.hHintPanel = null;
   o.hHintIcon = null;
}
