with(MO){
   //==========================================================
   // <T>下拉选择框。</T>
   //
   //  hValuePanel<TD>
   //  hValueForm<TABLE>
   // ┌-----------------┬----------------------┬-----------------┐
   // │hChangePanel<TD> │ hInputPanel<TD>      │ hDropPanel<TD>  │hValueLine<TR>
   // │hChangeIcon<IMG> │┌------------------┐│┌-------------┐│
   // │                 ││hInput<INPUT>     │││hDrop<IMG>   ││
   // │                 │└------------------┘│└-------------┘│
   // └-----------------┴----------------------┴-----------------┘
   //
   // @class
   // @author maocy
   // @version 150224
   //==========================================================
   MO.FDuiSelect = function FDuiSelect(o){
      //o = RClass.inherits(this, o, FDuiEditControl, MUiContainer, MPropertySelect, MUiDropable, MListenerDataChanged);
      o = RClass.inherits(this, o, FDuiEditControl, MUiContainer, MPropertySelect, MListenerDataChanged);
      //..........................................................
      // @style
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      //..........................................................
      // @html
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      //..........................................................
      // @event
      o.onBuildEditValue = FDuiSelect_onBuildEditValue;
      o.onDoubleClick    = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FDuiSelect_onDropClick);
      o.onDropClick      = FDuiSelect_onDropClick;
      o.onKeyDown        = RClass.register(o, new AEventKeyDown('onKeyDown'), FDuiSelect_onKeyDown);
      //..........................................................
      // @method
      o.construct        = FDuiSelect_construct;
      // @method
      o.findItemByLabel  = FDuiSelect_findItemByLabel;
      o.findItemByData   = FDuiSelect_findItemByData;
      o.formatValue      = FDuiSelect_formatValue;
      o.formatDisplay    = FDuiSelect_formatDisplay;
      o.get              = FDuiSelect_get;
      o.set              = FDuiSelect_set;
      o.selectItem       = FDuiSelect_selectItem;
      o.refreshValue     = FDuiSelect_refreshValue;
      // @method
      o.drop             = FDuiSelect_drop;
      // @method
      o.dispose          = FDuiSelect_dispose;

      //..........................................................
      // @event
      //o.onEditEnd     = FDuiSelect_onEditEnd;
      //o.loadConfig    = FDuiSelect_loadConfig;
      //o.refreshStyle  = FDuiSelect_refreshStyle;
      //o.doBlur        = FDuiSelect_doBlur;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiSelect_onBuildEditValue = function FDuiSelect_onBuildEditValue(p){
      var o = this;
      var hp = o._hValuePanel;
      hp.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      var hl = o._hValueLine = RBuilder.appendTableRow(hf);
      //..........................................................
      // 建立改变栏
      o._hChangePanel = RBuilder.appendTableCell(hl);
      o.onBuildEditChange(p);
      //..........................................................
      // 建立输入栏
      var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
      var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
      o.attachEvent('onDoubleClick', he);
      o.attachEvent('onKeyDown', he);
      //o.attachEvent('onInputEdit', he, o.onInputEdit);
      // 设置大小
      //RHtml.setSize(hep, o._inputSize);
      // 设置可以输入的最大长度
      if(o._editLength){
         he.maxLength = o._editLength;
      }
      //..........................................................
      // 建立下拉栏
      var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
      hdp.style.borderLeft = '1px solid #666666';
      o.onBuildEditDrop(p);
      //..........................................................
      // 创建空行
      var c = o._emptyItem = RClass.create(FDuiSelectItem);
      c.build(p);
      o.push(c);
   }

   //==========================================================
   // <T>鼠标点击修改标志。</T>
   //
   // @method
   // @param p:event:TEvent 事件对象
   //==========================================================
   MO.FDuiSelect_onDropClick = function FDuiSelect_onDropClick(p){
      this.drop();
   }

   //==========================================================
   // <T>响应编辑按键事件。</T>
   //
   // @method
   // @param e:editor:FEditor 编辑器
   //==========================================================
   MO.FDuiSelect_onKeyDown = function FDuiSelect_onKeyDown(p){
      var o = this;
      // 获得编辑中
      var e = o._editor;
      if(e && e._statusEditing && (e._source == o)){
         e.onEditKeyDown(p);
         return;
      }
      // 下拉展开
      if(p.keyCode == EKeyCode.Down){
         o.drop();
      }
   }

   //==========================================================
   // <T>构建对象。</T>
   //
   // @method
   //==========================================================
   MO.FDuiSelect_construct = function FDuiSelect_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
   }

   //==========================================================
   // <T>根据项目名称查找项目。</T>
   //
   // @method
   // @param p:label:String 项目名称
   // @return FDuiSelectItem 项目
   //==========================================================
   MO.FDuiSelect_findItemByLabel = function FDuiSelect_findItemByLabel(p){
      var o = this;
      var s = o._components;
      if(s){
         for(var i = s.count() - 1; i >= 0; i--){
            var c = s.valueAt(i);
            if(RString.equals(c._label, p, true)){
               return c;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>根据项目数据查找项目。</T>
   //
   // @method
   // @param p:dataValue:String 项目数据
   // @return FDuiSelectItem 项目
   //==========================================================
   MO.FDuiSelect_findItemByData = function FDuiSelect_findItemByData(p){
      var o = this;
      var s = o._components;
      if(s){
         for(var i = s.count() - 1; i >= 0; i--){
            var c = s.valueAt(i);
            if(RString.equals(c._dataValue, p, true)){
               return c;
            }
         }
      }
      return null;
   }

   //==========================================================
   // <T>格式化内容为数据。</T>
   //
   // @method
   // @param p:label:String 标签
   // @return String 数据
   //==========================================================
   MO.FDuiSelect_formatValue = function FDuiSelect_formatValue(p){
      var o = this;
      var c = o.findItemByLabel(p);
      if(c){
         return RString.nvl(c._dataValue);
      }
      return p;
   }

   //==========================================================
   // <T>格式化数据为内容。</T>
   //
   // @method
   // @param p:value:String 数据
   // @return String 标签
   //==========================================================
   MO.FDuiSelect_formatDisplay = function FDuiSelect_formatDisplay(p){
      var o = this;
      var c = o.findItemByData(p);
      if(c){
         return RString.nvl(c._label);
      }
      return p;
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return String 数据
   //==========================================================
   MO.FDuiSelect_get = function FDuiSelect_get(){
      var o = this;
      // 获得文本
      var s = o._hInput.value;
      // 获得内容
      var v = o.formatValue(s);
      return v;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param p:value:String 数据
   //==========================================================
   MO.FDuiSelect_set = function FDuiSelect_set(p){
      var o = this;
      // 获得显示
      var t = o.formatDisplay(p);
      // 设置显示
      o._hInput.value = RString.nvl(t);
      //o.finded = v;
      //if(o.hChangeIcon){
      //   o.hChangeIcon.style.display = 'none';
      //}
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param p:value:String 数据
   //==========================================================
   MO.FDuiSelect_selectItem = function FDuiSelect_selectItem(p){
      var o = this;
      // 设置显示
      o._hInput.value = RString.nvl(p.label());
      // 刷新数据
      o.refreshValue();
   }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   MO.FDuiSelect_refreshValue = function FDuiSelect_refreshValue(){
      var o = this;
      // 内容改变通知
      o.processDataChangedListener(o);
   }

   //==========================================================
   // <T>下拉操作。</T>
   //
   // @method
   //==========================================================
   MO.FDuiSelect_drop = function FDuiSelect_drop(){
      var o = this;
      //if(o.canDrop() && o.canEdit && o.items.count() > 0 && o._editable){
      if(o.hasComponent()){
         //if(!o._editRefer){
         //   return RMessage.fatal(o, null, 'Edit refer is null.');
         //}
         var e = o._editor = RConsole.find(FDuiEditorConsole).focus(o, FDuiSelectEditor, o._name);
         e.buildItems(o);
         e.set(o.get());
         e.show();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiSelect_dispose = function FDuiSelect_dispose(){
      var o = this;
      o.__base.FDuiEditControl.dispose.call(o);
   }










   //==========================================================
   // <T>响应编辑完成事件。</T>
   //
   // @method
   // @param e:editor:FEditor 编辑器
   //==========================================================
   MO.FDuiSelect_onEditEnd = function FDuiSelect_onEditEnd(e){
      var o = this;
      if(e){
         o.set(e.get());
         // 重新校验数据
         o._invalidText = o.validText(o.text());
         o.refreshStyle();
      }
      o.onDataEditEnd(o);
   }

   //==========================================================
   // <T>加载设置。</T>
   //
   // @method
   //==========================================================
   MO.FDuiSelect_loadConfig = function FDuiSelect_loadConfig(c){
      var o = this;
      o.__base.FDuiEditControl.loadConfig.call(o, c);
      if(o.dataEmpty){
         o.items.create();
      }
      // 如果不允许输入，则创建一个空白行作为清空
      if(!o.editCheck){
         o.items.create('', '');
      }
      o.items.loadConfig(c);
      var ns = c.nodes;
      if(ns){
      var nc = ns.count;
         for(var n = 0; n < nc; n++){
           var p = ns.get(n);
            if(p.isName('Event')){
               var e = RClass.create(FEvent);
                e.loadConfig(p);
                o.push(e);
            }
         }
      }
      return EStatus.Stop;
   }

   //==========================================================
   // <T>设置编辑样式。</T>
   //
   // @method
   //==========================================================
   MO.FDuiSelect_refreshStyle = function FDuiSelect_refreshStyle(){
      var o = this;
      o.__base.FDuiEditControl.refreshStyle.call(o);
      //o.hDrop.src = o.styleIconPath(o.isEditHover(t) ? 'DropSelect' : 'Drop');
      if(!o.editCheck){
        //o.hEdit.style.cursor = 'hand';
         o.hEdit.readOnly = 'true';
      }
      //o.hDrop.style.display = o._editable? "block" : "none";
   }

   //==========================================================
   // <T>失去焦点。</T>
   //
   // @method
   //==========================================================
   MO.FDuiSelect_doBlur = function FDuiSelect_doBlur(){
      var o = this;
      o.__base.FDuiEditControl.doBlur.call(o);
      if(o._editor){
         o._editor.hide();
      }
   }
}
