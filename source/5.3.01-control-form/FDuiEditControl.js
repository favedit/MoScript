with(MO){
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
   MO.FUiEditControl = function FUiEditControl(o){
      o = RClass.inherits(this, o, FDuiControl, MUiEditValue, MUiEditChange, MUiEditDrop);
      //..........................................................
      // @property
      o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), EUiLabelMode.All);
      o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), EUiLabelPosition.Left);
      o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
      o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EUiAlign.Left);
      o._labelColor       = RClass.register(o, new APtyString('_labelColor'));
      // @property
      o._editSize         = RClass.register(o, new APtySize2('_editSize'));
      o._editColor        = RClass.register(o, new APtyString('_editColor'));
      //..........................................................
      // @style
      o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
      o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
      //..........................................................
      // @attribute
      o._progressing      = false;
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
      o.onBuildLabelIcon  = FUiEditControl_onBuildLabelIcon;
      o.onBuildLabelText  = FUiEditControl_onBuildLabelText;
      o.onBuildLabel      = FUiEditControl_onBuildLabel;
      o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
      o.onBuildEdit       = FUiEditControl_onBuildEdit;
      o.onBuildPanel      = FUiEditControl_onBuildPanel;
      o.onBuild           = FUiEditControl_onBuild;
      //..........................................................
      // @process
      o.oeMode            = FUiEditControl_oeMode;
      o.oeProgress        = FUiEditControl_oeProgress;
      //..........................................................
      // @method
      o.construct         = FUiEditControl_construct;
      // @method
      o.panel             = FUiEditControl_panel;
      o.label             = FUiEditControl_label;
      o.setLabel          = FUiEditControl_setLabel;
      o.getValueRectangle = FUiEditControl_getValueRectangle;
      // @method
      o.dispose           = FUiEditControl_dispose;
      return o;
   }

   //==========================================================
   // <T>建立标签图标。</T>
   //
   // @method
   // @param p:arguments:SArguments 参数集合
   //==========================================================
   MO.FUiEditControl_onBuildLabelIcon = function FUiEditControl_onBuildLabelIcon(p){
      var o = this;
      if(o._labelIcon){
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
      }else{
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
      }
   }

   //==========================================================
   // <T>建立标签文本。</T>
   //
   // @method
   // @param p:arguments:SArguments 参数集合
   //==========================================================
   MO.FUiEditControl_onBuildLabelText = function FUiEditControl_onBuildLabelText(p){
      var o = this;
      o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
   }

   //==========================================================
   // <T>建立标签。</T>
   //
   // @method
   // @param p:arguments:SArguments 参数集合
   //==========================================================
   MO.FUiEditControl_onBuildLabel = function FUiEditControl_onBuildLabel(p){
      var o = this;
      var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
      var hr = RBuilder.appendTableRow(h);
      // 建立标签图标
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      hip.width = '20px';
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
   MO.FUiEditControl_onBuildEdit = function FUiEditControl_onBuildEdit(p){
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
      //hCk1.src = o.styleIconPath('Right', FUiEditControl);
      //hCk2.src = o.styleIconPath('Error', FUiEditControl);
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
   MO.FUiEditControl_onBuildPanel = function FUiEditControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiEditControl_onBuild = function FUiEditControl_onBuild(p){
      var o = this;
      // 处理宽度小于标签宽度和编辑框宽度的情况，将宽度值设置为空
      //if(o.labelWidth && o.editWidth && o.width){
      //   if(RInteger.parse(o.width) < RInteger.parse(o.labelWidth) + RInteger.parse(o.editWidth)){
      //      o.width = null;
      //   }
      //}
      // 建立控件
      o.__base.FDuiControl.onBuild.call(o, p);
      var hc = o._hPanel;
      //..........................................................
      // 建立标签和控件区域
      var hlp = null;
      var hep = null;
      var lmc = o._labelModeCd;
      if(lmc == EUiLabelMode.Label){
         // 只建立标签的情况
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lmc == EUiLabelMode.Hidden){
         // 只建立编辑框的情况
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else{
         // 全部建立的情况
         var lpc = o._labelPositionCd;
         if(lpc == EUiLabelPosition.Top){
            hlp = RBuilder.appendTableRowCell(hc);
            hep = RBuilder.appendTableRowCell(hc);
         }else if(lpc == EUiLabelPosition.Right){
            var hr = RBuilder.appendTableRow(hc);
            hep = RBuilder.appendTableCell(hr);
            hlp = RBuilder.appendTableCell(hr);
         }else if(lpc == EUiLabelPosition.Bottom){
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
         //      hl.style.color = EUiColor.Require;
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
   // <T>处理工作模式转换。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   // @return EEventStatus 处理状态
   //==========================================================
   MO.FUiEditControl_oeMode = function FUiEditControl_oeMode(e){
      var o = this;
      o.__base.FDuiControl.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      // 根据工作模式获得设置信息
      o._editable = o.canEdit(e.mode);
      o._validable = o.canValid(e.mode);
      // 如果在加载中不设置工作模式，由加载处理设置信息
      if(!o._progressing){
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
   MO.FUiEditControl_oeProgress = function FUiEditControl_oeProgress(e){
      var o = this;
      // 加载中不做处理
      if(o._progressing && e.enable){
         return EEventStatus.Stop;
      }
      // 根据状态设置信息
      o._progressing = e.enable;
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
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditControl_construct = function FUiEditControl_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiControl.construct.call(o);
      o.__base.MUiEditChange.construct.call(o);
      o.__base.MUiEditDrop.construct.call(o);
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
   MO.FUiEditControl_panel = function FUiEditControl_panel(t){
      var o = this;
      if(EPanel.Edit == t){
         return o.hEdit;
      }else if(EPanel.Focus == t){
         return o.hEdit;
      }
      return o.__base.FDuiControl.panel.call(o, t);
   }

   //==========================================================
   // <T>获得标签。</T>
   //
   // @method
   // @return String 标签内容
   //==========================================================
   MO.FUiEditControl_label = function FUiEditControl_label(p){
      return this._label;
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:value:String 标签内容
   //==========================================================
   MO.FUiEditControl_setLabel = function FUiEditControl_setLabel(p){
      var o = this;
      o._label = p;
      if(o._hText){
         o._hText.innerHTML = RString.nvl(p);
      }
   }

   //==========================================================
   // <T>获得编辑区大小。</T>
   //
   // @method
   // @param r:rectangle:SRectangle 矩形
   // @return SRectangle 矩形
   //==========================================================
   MO.FUiEditControl_getValueRectangle = function FUiEditControl_getValueRectangle(r){
      var o = this;
      if(!r){
         r = new SRectangle();
      }
      var h = o._hValuePanel;
      var p = RHtml.clientPosition(h);
      r.position.assign(p);
      r.setSize(h.offsetWidth, h.offsetHeight);
      return r;
   }

   //==========================================================
   // <T>释放对象。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditControl_dispose = function FUiEditControl_dispose(){
      var o = this;
      // 释放属性
      o._labelModeCd = null;
      o._labelPositionCd = null;
      o._labelAlignCd = null;
      o._dataTypeCd = null;
      // 释放结构
      o._labelSize = RObject.dispose(o._labelSize);
      o._editSize = RObject.dispose(o._editSize);
      // 释放页面元素
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o._hLabelForm = RHtml.free(o._hLabelForm);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hTextPanel = RHtml.free(o._hTextPanel);
      o._hText = RHtml.free(o._hText);
      o._hEditPanel = RHtml.free(o._hEditPanel);
      o._hEditForm = RHtml.free(o._hEditForm);
      o._hValuePanel = RHtml.free(o._hValuePanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      // 父处理
      o.__base.MUiEditDrop.dispose.call(o);
      o.__base.MUiEditChange.dispose.call(o);
      o.__base.FDuiControl.dispose.call(o);
   }
}
