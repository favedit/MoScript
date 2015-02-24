//==========================================================
// <T>下拉菜单选择框。</T>
//
// @class FEditControl, MEditBorder, MDescSelect, MDropable
// @history 091028 MAOCY 创建
//==========================================================
function FUiSelect(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescSelect, MDropable);
   //..........................................................
   // @attribute
   o.borderStyle   = EBorder.RoundDrop;
   o.items         = null;
   o.lsnEditEnd    = null;
   //..........................................................
   // @event
   o.onDataKeyDown = FUiSelect_onDataKeyDown;
   o.onDataClick   = FUiSelect_onDataClick;
   o.onEditEnd     = FUiSelect_onEditEnd;
   o.onBuildEdit   = FUiSelect_onBuildEdit;

   //..........................................................
   // @method
   o.construct     = FUiSelect_construct;
   o.loadConfig    = FUiSelect_loadConfig;
   o.formatValue   = FUiSelect_formatValue;
   o.formatText    = FUiSelect_formatText;
   o.refreshStyle  = FUiSelect_refreshStyle;
   o.drop          = FUiSelect_drop;
   o.doBlur        = FUiSelect_doBlur;
   o.dispose       = FUiSelect_dispose;
   return o;
}

//==========================================================
//<T>数据区域鼠标双击事件。</T>
//
//@method
//@param e:event:TEvent 事件对象
//==========================================================
function FUiSelect_onDataClick(){
   var o = this;
   // 展开下拉菜单
   if(!o.editCheck){
      o.drop();
   }
}
//==========================================================
// <T>响应编辑按键事件。</T>
//
// @method
// @param e:editor:FEditor 编辑器
//==========================================================
function FUiSelect_onDataKeyDown(s, e){
   var o = this;
   // 获得编辑中
   var ed = o.editor;
   var ef = ed && ed.inEdit;
   // 父类处理
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   // 处理按键按下时，自动提示数据的处理
   if(ef && ed.source == o){
      ed.onEditKeyDown(s, e);
   }
}

//==========================================================
// <T>响应编辑完成事件。</T>
//
// @method
// @param e:editor:FEditor 编辑器
//==========================================================
function FUiSelect_onEditEnd(e){
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
// <T>建立编辑框。</T>
//
// @method
// @param b:border:TBorder 边框
//==========================================================
function FUiSelect_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var hf = RBuilder.appendTable(b.hPanel);
   hf.style.tableLayout = 'fixed';
   var hr = hf.insertRow(-1);
   // 建立修改标志
   o.onBuildChange(hr.insertCell(-1))
   // 建立编辑控件
   var hc = hr.insertCell(-1);
   var se = o.style('Edit')
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   // 设置可以输入的最大长度
   if(o.editLength){
      he.maxLength = o.editLength;
   }
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
function FUiSelect_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.items = new TItems();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}

//==========================================================
// <T>加载设置。</T>
//
// @method
//==========================================================
function FUiSelect_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
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
// <T>格式化内容为数据。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
function FUiSelect_formatValue(t){
   var o = this;
   if(RBoolean.isTrue(o.editCheck)){
      var v = o.items.value(t);
      if(v){
         return v;
      }else{
         return RString.nvl(t);
      }
   }
   return o.items.value(t);
}

//==========================================================
// <T>格式化数据为内容。</T>
//
// @method
// @param v:value:String 数据
//==========================================================
function FUiSelect_formatText(v){
   var o = this;
   if(RBoolean.isTrue(o.editCheck) && RString.isEmpty(o.items.label(v))){
      return v;
   }
   return o.items.label(v);
}

//==========================================================
// <T>设置编辑样式。</T>
//
// @method
//==========================================================
function FUiSelect_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   //o.hDrop.src = o.styleIconPath(o.isEditHover(t) ? 'DropSelect' : 'Drop');
   if(!o.editCheck){
     //o.hEdit.style.cursor = 'hand';
      o.hEdit.readOnly = 'true';
   }
   //o.hDrop.style.display = o._editable? "block" : "none";
}

//==========================================================
// <T>下拉操作。</T>
//
// @method
//==========================================================
function FUiSelect_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0 && o._editable){
      if(!o.editRefer){
         return RMessage.fatal(o, null, 'Edit refer is null.');
      }
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FUiSelectEditor, o.editRefer);
      if(o.editDynamic){
         // 动态建立
         return RMessage.fatal(o, null, 'Unsupport.');
         //ed.fetch();
         //ed.setItems(o.items);
         //ed.set(o.reget());
      }else{
         // 直接建立
         // 事件的修改
        e.__source = o;
         e.setItems(o.items);
         e.set(o.reget());
      }
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
function FUiSelect_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FUiSelect_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
}
