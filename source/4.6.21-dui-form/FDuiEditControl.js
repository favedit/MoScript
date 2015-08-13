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
MO.FDuiEditControl = function FDuiEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDataValue, MO.MUiDataField, MO.MUiEditValue, MO.MDuiEditChange, MO.MDuiEditDrop);
   //..........................................................
   // @property
   o._labelModeCd            = MO.Class.register(o, new MO.APtyString('_labelModeCd'), MO.EUiLabelMode.All);
   o._labelPositionCd        = MO.Class.register(o, new MO.APtyString('_labelPositionCd'), MO.EUiLabelPosition.Left);
   o._labelSize              = MO.Class.register(o, new MO.APtySize2('_labelSize'));
   o._labelAlignCd           = MO.Class.register(o, new MO.APtyString('_labelAlignCd'), MO.EUiAlign.Left);
   o._labelColor             = MO.Class.register(o, new MO.APtyString('_labelColor'));
   // @property
   o._editSize               = MO.Class.register(o, new MO.APtySize2('_editSize'));
   o._editColor              = MO.Class.register(o, new MO.APtyString('_editColor'));
   //..........................................................
   // @style
   o._styleLabelPanel        = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._styleEditPanel         = MO.Class.register(o, new MO.AStyle('_styleEditPanel'));
   //..........................................................
   // @attribute
   o._progressing            = false;
   //..........................................................
   // @html <TD> 标签面板
   o._hLabelPanel            = null;
   // @html <TABLE> 标签容器
   o._hLabelForm             = null;
   // @html <TD> 标签图标面板
   o._hIconPanel             = null;
   // @html <IMG> 标签图标
   o._hIcon                  = null;
   // @html <TD> 标签文字面板
   o._hTextPanel             = null;
   // @html <SPAN> 标签文字
   o._hText                  = null;
   // @html <TD> 编辑面板
   o._hEditPanel             = null;
   // @html <TABLE> 编辑容器
   o._hEditForm              = null;
   // @html <TD> 编辑内容面板
   o._hValuePanel            = null;
   //o.hHintPanel            = null;
   //o.hHintIcon             = null;
   //..........................................................
   // @event
   o.onBuildLabelIcon        = MO.FDuiEditControl_onBuildLabelIcon;
   o.onBuildLabelText        = MO.FDuiEditControl_onBuildLabelText;
   o.onBuildLabel            = MO.FDuiEditControl_onBuildLabel;
   o.onBuildEditValue        = MO.Method.virtual(o, 'onBuildEditValue');
   o.onBuildEdit             = MO.FDuiEditControl_onBuildEdit;
   o.onBuildPanel            = MO.FDuiEditControl_onBuildPanel;
   o.onBuild                 = MO.FDuiEditControl_onBuild;
   //..........................................................
   // @process
   o.oeMode                  = MO.FDuiEditControl_oeMode;
   o.oeProgress              = MO.FDuiEditControl_oeProgress;
   // @process
   o.oeLoadUnit              = MO.FDuiEditControl_oeLoadUnit;
   o.oeSaveUnit              = MO.FDuiEditControl_oeSaveUnit;
   //..........................................................
   // @method
   o.construct               = MO.FDuiEditControl_construct;
   // @method
   o.panel                   = MO.FDuiEditControl_panel;
   o.setLabel                = MO.FDuiEditControl_setLabel;
   o.calculateValueRectangle = MO.FDuiEditControl_calculateValueRectangle;
   // @method
   o.dispose                 = MO.FDuiEditControl_dispose;
   return o;
}

//==========================================================
// <T>建立标签图标。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiEditControl_onBuildLabelIcon = function FDuiEditControl_onBuildLabelIcon(event){
   var o = this;
   if(o._labelIcon){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, null, o._labelIcon);
   }else{
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
   }
}

//==========================================================
// <T>建立标签文本。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiEditControl_onBuildLabelText = function FDuiEditControl_onBuildLabelText(event){
   var o = this;
   o._hText = MO.Window.Builder.appendSpan(o._hTextPanel, null, o._label);
}

//==========================================================
// <T>建立标签。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiEditControl_onBuildLabel = function FDuiEditControl_onBuildLabel(event){
   var o = this;
   var hLabelForm = o._hLabelForm = MO.Window.Builder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hLabelLine = MO.Window.Builder.appendTableRow(hLabelForm);
   // 建立标签图标
   var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hLabelLine);
   hIconPanel.width = '20px';
   o.onBuildLabelIcon(event);
   // 建立标签文字
   var hTextPanel = o._hTextPanel = MO.Window.Builder.appendTableCell(hLabelLine);
   hTextPanel.noWrap = true;
   o.onBuildLabelText(event);
   // 设置标签尺寸
   MO.Window.Html.setSize(hLabelForm, o._labelSize);
   // 设置标签对齐
   if(o._labelAlignCd){
      hTextPanel.align = o._labelAlignCd;
      hTextPanel.style.paddingRight = 4;
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
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiEditControl_onBuildEdit = function FDuiEditControl_onBuildEdit(event){
   var o = this;
   /// 建立控件表格
   var hEditForm = o._hEditForm = MO.Window.Builder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hEditLine = o._hEditLine = MO.Window.Builder.appendTableRow(hEditForm);
   // 建立编辑面板
   o._hValuePanel = MO.Window.Builder.appendTableCell(hEditLine);
   o.onBuildEditValue(event);
   // 设置大小
   MO.Window.Html.setSize(hEditForm, o._editSize);
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
   //hCk1.src = o.styleIconPath('Right', FDuiEditControl);
   //hCk2.src = o.styleIconPath('Error', FDuiEditControl);
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
      var hi = o.hHintIcon = MO.Window.Builder.appendIcon(hp, 'ctl.hint');
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
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiEditControl_onBuildPanel = function FDuiEditControl_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiEditControl_onBuild = function FDuiEditControl_onBuild(event){
   var o = this;
   // 处理宽度小于标签宽度和编辑框宽度的情况，将宽度值设置为空
   //if(o.labelWidth && o.editWidth && o.width){
   //   if(MO.Lang.Integer.parse(o.width) < MO.Lang.Integer.parse(o.labelWidth) + MO.Lang.Integer.parse(o.editWidth)){
   //      o.width = null;
   //   }
   //}
   // 建立控件
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   //..........................................................
   // 建立标签和控件区域
   var labelModeCd = o._labelModeCd;
   var hLabelPanel = null;
   var hEditPanel = null;
   if(labelModeCd == MO.EUiLabelMode.Label){
      // 只建立标签的情况
      hLabelPanel = MO.Window.Builder.appendTableCell(MO.Window.Builder.appendTableRow(hPanel));
   }else if(labelModeCd == MO.EUiLabelMode.Hidden){
      // 只建立编辑框的情况
      hEditPanel = MO.Window.Builder.appendTableCell(MO.Window.Builder.appendTableRow(hPanel));
   }else{
      // 全部建立的情况
      var labelPositionCd = o._labelPositionCd;
      if(labelPositionCd == MO.EUiLabelPosition.Top){
         hLabelPanel = MO.Window.Builder.appendTableRowCell(hPanel);
         hEditPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      }else if(labelPositionCd == MO.EUiLabelPosition.Right){
         var hRow = MO.Window.Builder.appendTableRow(hPanel);
         hEditPanel = MO.Window.Builder.appendTableCell(hRow);
         hLabelPanel = MO.Window.Builder.appendTableCell(hRow);
      }else if(labelPositionCd == MO.EUiLabelPosition.Bottom){
         hEditPanel = MO.Window.Builder.appendTableRowCell(hPanel);
         hLabelPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      }else{
         var hRow = MO.Window.Builder.appendTableRow(hPanel);
         hLabelPanel = MO.Window.Builder.appendTableCell(hRow);
         hEditPanel = MO.Window.Builder.appendTableCell(hRow);
      }
   }
   o._hLabelPanel = hLabelPanel;
   o._hEditPanel = hEditPanel;
   //..........................................................
   // 建立标签对象
   if(hLabelPanel){
      o.onBuildLabel(event);
      hLabelPanel.appendChild(o._hLabelForm);
      // 设置名称
      o.setLabel(o._label);
      // 标签操作
      //var hl = o.hLabel;
      //if(hl){
      //   // 设置必须检查
      //   if(o.validRequire){
      //      hl.style.color = EUiColor.Require;
      //   }
      //   // 如果当前控件支持列表接口
      //   if(MO.Class.isClass(o, MListView)){
      //      o.setLabelStyle(hl);
      //   }
      //}
   }
   //..........................................................
   // 建立控件对象
   if(hEditPanel){
      o.onBuildEdit(event);
   }
}

//==========================================================
// <T>处理工作模式转换。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiEditControl_oeMode = function FDuiEditControl_oeMode(event){
   var o = this;
   o.__base.FDuiControl.oeMode.call(o, event);
   o.__base.MDisplay.oeMode.call(o, event);
   // 根据工作模式获得设置信息
   o._editable = o.canEdit(event.mode);
   o._validable = o.canValid(event.mode);
   // 如果在加载中不设置工作模式，由加载处理设置信息
   if(!o._progressing){
      o.setEditable(o._editable);
   }
   // 返回处理结果
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>处理数据加载中和加载完成处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiEditControl_oeProgress = function FDuiEditControl_oeProgress(event){
   var o = this;
   // 加载中不做处理
   if(o._progressing && event.enable){
      return MO.EEventStatus.Stop;
   }
   // 根据状态设置信息
   o._progressing = event.enable;
   if(event.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>加载数据单元处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiEditControl_oeLoadUnit = function FDuiEditControl_oeLoadUnit(event){
   var o = this;
   var unit = event.unit;
   var dataName = o._dataName;
   if(!MO.Lang.String.isEmpty(dataName)){
      var value = unit.get(o._dataName);
      o.set(value);
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>存储数据单元处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiEditControl_oeSaveUnit = function FDuiEditControl_oeSaveUnit(event){
   var o = this;
   var unit = event.unit;
   var dataName = o._dataName;
   if(!MO.Lang.String.isEmpty(dataName)){
      var value = o.get();
      unit.set(o._dataName, value)
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiEditControl_construct = function FDuiEditControl_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiControl.construct.call(o);
   o.__base.MDuiEditChange.construct.call(o);
   o.__base.MDuiEditDrop.construct.call(o);
   // 设置属性
   o._labelSize = new MO.SSize2(100, 20);
   o._editSize = new MO.SSize2(200, 20);
}

//==========================================================
// <T>获得底板。</T>
//
// @method
// @param panelCd:EPanel 类型
// @return HtmlTag 页面元素
//==========================================================
MO.FDuiEditControl_panel = function FDuiEditControl_panel(panelCd){
   var o = this;
   if(MO.EPanel.Edit == panelCd){
      return o._hEdit;
   }else if(MO.EPanel.Focus == panelCd){
      return o._hEdit;
   }
   return o.__base.FDuiControl.panel.call(o, panelCd);
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param value:String 标签内容
//==========================================================
MO.FDuiEditControl_setLabel = function FDuiEditControl_setLabel(value){
   var o = this;
   o._label = value;
   if(o._hText){
      o._hText.innerHTML = MO.Lang.String.nvl(value);
   }
}

//==========================================================
// <T>获得编辑区大小。</T>
//
// @method
// @param rectangle:SRectangle 矩形
// @return SRectangle 矩形
//==========================================================
MO.FDuiEditControl_calculateValueRectangle = function FDuiEditControl_calculateValueRectangle(rectangle){
   var o = this;
   if(!rectangle){
      rectangle = new MO.SRectangle();
   }
   var hPanel = o._hValuePanel;
   var position = MO.Window.Html.clientPosition(hPanel);
   rectangle.left = position.x;
   rectangle.top = position.y;
   rectangle.width = hPanel.offsetWidth;
   rectangle.height = hPanel.offsetHeight;
   return rectangle;
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
MO.FDuiEditControl_dispose = function FDuiEditControl_dispose(){
   var o = this;
   // 释放属性
   o._labelSize = MO.Lang.Object.dispose(o._labelSize);
   o._editSize = MO.Lang.Object.dispose(o._editSize);
   // 释放页面元素
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o._hLabelForm = MO.Window.Html.free(o._hLabelForm);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hTextPanel = MO.Window.Html.free(o._hTextPanel);
   o._hText = MO.Window.Html.free(o._hText);
   o._hEditPanel = MO.Window.Html.free(o._hEditPanel);
   o._hEditForm = MO.Window.Html.free(o._hEditForm);
   o._hValuePanel = MO.Window.Html.free(o._hValuePanel);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   // 父处理
   o.__base.MDuiEditDrop.dispose.call(o);
   o.__base.MDuiEditChange.dispose.call(o);
   o.__base.FDuiControl.dispose.call(o);
}
