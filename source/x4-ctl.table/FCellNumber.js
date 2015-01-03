//==========================================================
// <T>数字输入单元格。</T>
//
// @class FCellEditControl, MFocus
// @history 091106 MAOCY 创建
//==========================================================
function FCellNumber(o){
   o = RClass.inherits(this, o, FCellEditControl, MDescNumber, MFocus);
   //..........................................................
   // @property
   o.editAlign   = EAlign.Right;
   //..........................................................
   // @method
   o.buildDrop   = FCellNumber_buildDrop;
   o.buildEdit   = FCellNumber_buildEdit;
   o.formatValue = MDescNumber_formatValue;
   o.formatText  = MDescNumber_formatText;
   o.setInfo     = FCellNumber_setInfo;
   o.dispose     = FCellNumber_dispose;
   return o;
}

//==========================================================
// <T>建立下拉区。</T>
//
// @method
//==========================================================
function FCellNumber_buildDrop(){
   this.buildAdjustForm(this.hDropPanel);
}

//==========================================================
function FCellNumber_buildEdit(){
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

//==========================================================
//<T>设置控件信息。</T>
//
//@method
//@param f:info:TControlInfo 控件信息
//==========================================================
function FCellNumber_setInfo(f){
   var o = this;
   o.base.FCellEditControl.setInfo.call(o, f);
   var d = o.column;
   var m = d.iconMap;
   var hi = o.hIcon;
   if(m && m.get(f.icon)){
      hi.style.display = 'block';
      hi.title = f.iconHint;
      hi.src = RResource.iconPath(m.get(f.icon));
   }else{
      if(hi){
         hi.style.display = 'none';
      }
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FCellNumber_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o.hArrowForm = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
}
