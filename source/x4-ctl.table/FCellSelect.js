//==========================================================
// 单元格内Edit控件类
//
// @class FCellSelect
// @author maochunyang
// @version 1.0.1
//==========================================================
function FCellSelect(o){
   o = RClass.inherits(this, o, FCellEditControl, MFocus, MCellDropable);
   // Css
   o.stForm          = RClass.register(o, new TStyle('Form'));
   o.stEditForm      = RClass.register(o, new TStyle('EditForm'));
   o.stDropForm      = RClass.register(o, new TStyle('DropForm'));
   o.stDrop          = RClass.register(o, new TStyle('Drop'));
   o.stIconDrop      = RClass.register(o, new TStyleIcon('Drop'));
   // Html
   o.onDataEditBegin = RMethod.emptyCall;
   // Method
   o.buildDrop       = FCellSelect_buildDrop;
   o.buildEdit       = FCellSelect_buildEdit;
   o.set             = FCellSelect_set;
   o.drop            = FCellSelect_drop;
   return o;
}

//==========================================================
// 创建单元格和内部的input 并添加页面相应函数
//
// @method
// @return HTML td标签
//==========================================================
function FCellSelect_buildDrop(){
   var o = this;
   var c = o.column;
   var hd = o.hDropPanel;
   hd.width = 1;
   var hi = o.hDrop = RBuilder.appendIcon(hd, o.styleIcon('Drop'), o.style('Drop'));
   c.linkEvent(o, 'onCellDropClick', hi);
// c.linkEvent(o, 'onCellDropEnter', hi);
// c.linkEvent(o, 'onCellDropLeave', hi);
}

//==========================================================
function FCellSelect_buildEdit(){
   var o = this;
   var c = o.column;
   if(c._absEdit){
      o.base.FCellEditControl.buildEdit.call(o);
   }else{
      var he = o.hEditPanel;
      c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
      c.linkEvent(o, 'onCellClick', he, c.onCellClick);
      c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
   }
}

// ------------------------------------------------------------
function FCellSelect_set(v){
   var o = this;
   var d = o.descriptor();
   if(d.viewIcons && d.iconMap){
      o.hIcon.src = RRes.iconPath(d.iconMap.get(v));
   }
   o.dataValue = RString.nvl(v);
   var t = d.formatText(v);
   o.setText(t);
}
// ------------------------------------------------------------
function FCellSelect_drop(){
   var o = this;
   var d = o.descriptor();
   // 检查是否可以编辑和是否可以下拉
   if(!d.isEditAble(o.row) || !d.editRefer){
      return;
   }
   // 展开下拉菜单
   var e = RConsole.find(FEditConsole).focus(o, FSelectEditor, d.editRefer);
   if(d.editDynamic){
      // 动态建立
      return RMessage.fatal(o, null, 'Unsupport.');
      //ed.fetch();
      //ed.setItems(o.__items);
      //ed.set(o.reget());
   }else{
      // 直接建立
	  e.__source = o;
      e.setItems(d.items);
      e.set(d.formatValue(o.text()));
   }
   e.lsnEditEnd = d.lsnCellEditEnd;
   e.show();
}
