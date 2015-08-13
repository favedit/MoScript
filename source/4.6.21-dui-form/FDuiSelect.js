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
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MDuiContainer, MO.MUiPropertySelect);
   //..........................................................
   // @style
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //..........................................................
   // @attribtue
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @html
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   //..........................................................
   // @event
   o.onBuildEditValue      = MO.FDuiSelect_onBuildEditValue;
   o.onDoubleClick         = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiSelect_onDropClick);
   o.onDropClick           = MO.FDuiSelect_onDropClick;
   o.onKeyDown             = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'), MO.FDuiSelect_onKeyDown);
   //..........................................................
   // @method
   o.construct             = MO.FDuiSelect_construct;
   // @method
   o.findItemByLabel       = MO.FDuiSelect_findItemByLabel;
   o.findItemByData        = MO.FDuiSelect_findItemByData;
   o.formatValue           = MO.FDuiSelect_formatValue;
   o.formatDisplay         = MO.FDuiSelect_formatDisplay;
   o.get                   = MO.FDuiSelect_get;
   o.set                   = MO.FDuiSelect_set;
   o.selectItem            = MO.FDuiSelect_selectItem;
   o.refreshValue          = MO.FDuiSelect_refreshValue;
   // @method
   o.drop                  = MO.FDuiSelect_drop;
   // @method
   o.dispose               = MO.FDuiSelect_dispose;

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
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入栏
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onDoubleClick', he);
   o.attachEvent('onKeyDown', he);
   //o.attachEvent('onInputEdit', he, o.onInputEdit);
   // 设置大小
   //MO.Window.Html.setSize(hep, o._inputSize);
   // 设置可以输入的最大长度
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   //..........................................................
   // 建立下拉栏
   var hdp = o._hDropPanel = MO.Window.Builder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
   //..........................................................
   // 创建空行
   var c = o._emptyItem = MO.Class.create(MO.FDuiSelectItem);
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
   if(p.keyCode == MO.EKeyCode.Down){
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
         if(MO.Lang.String.equals(c._label, p, true)){
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
         if(MO.Lang.String.equals(c._dataValue, p, true)){
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
// @param label:String 标签
// @return String 数据
//==========================================================
MO.FDuiSelect_formatValue = function FDuiSelect_formatValue(label){
   var o = this;
   var item = o.findItemByLabel(label);
   if(item){
      return MO.Lang.String.nvl(item.dataValue());
   }
   return item;
}

//==========================================================
// <T>格式化数据为内容。</T>
//
// @method
// @param value:String 数据
// @return String 标签
//==========================================================
MO.FDuiSelect_formatDisplay = function FDuiSelect_formatDisplay(value){
   var o = this;
   var item = o.findItemByData(value);
   if(item){
      return MO.Lang.String.nvl(item.label());
   }
   return item;
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
   var value = o._hInput.value;
   // 获得内容
   var result = o.formatValue(value);
   return result;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:String 数据
//==========================================================
MO.FDuiSelect_set = function FDuiSelect_set(value){
   var o = this;
   // 获得显示
   var text = o.formatDisplay(value);
   // 设置显示
   o._hInput.value = MO.Lang.String.nvl(text);
   //o.finded = v;
   //if(o.hChangeIcon){
   //   o.hChangeIcon.style.display = 'none';
   //}
}

//==========================================================
// <T>设置项目。</T>
//
// @method
// @param item:FDuiSelectItem 项目
//==========================================================
MO.FDuiSelect_selectItem = function FDuiSelect_selectItem(item){
   var o = this;
   // 设置显示
   o._hInput.value = MO.Lang.String.nvl(item.label());
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
      var e = o._editor = MO.Console.find(MO.FDuiEditorConsole).focus(o, MO.FDuiSelectEditor, o._name);
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
            var e = MO.Class.create(FEvent);
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
