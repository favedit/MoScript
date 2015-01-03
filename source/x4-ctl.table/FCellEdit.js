//==========================================================
// <T>文本编辑单元格控件。</T>
//
// @class FCellEditControl, MFocus
// @history 091125 MAOCY 创建
//==========================================================
function FCellEdit(o){
   o = RClass.inherits(this, o, FCellEditControl, MFocus);
   //..........................................................
   // @method
   o.buildDrop = FCellEdit_buildDrop;
   o.buildEdit = FCellEdit_buildEdit;
   o.setInfo   = FCellEdit_setInfo;
   o.text      = FCellEdit_text;
   o.setText   = FCellEdit_setText;
   return o;
}

//==========================================================
function FCellEdit_buildDrop(){
   var o = this;
   var c = o.column;
   if(!RString.isEmpty(c.lovRefer)){
      var hdp = o.hDropPanel;
      hdp.align = 'right';
      hdp.style.paddingRight = 2;
      var hli = o.hLovImage = RBuilder.appendIcon(hdp, 'ctl.FCellEdit_Lov', null, 16, 16);
      hli.style.borderLeft='1 solid #CCCCCC';
      hli.style.cursor = 'hand';
      c.linkEvent(o, 'onListClick', hli);
   }
}

//==========================================================
function FCellEdit_buildEdit(){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      // 设置文本底板
      var hep = o.hEditPanel;
      c.linkEvent(o, 'onCellDoubleClick', hep, c.onCellDoubleClick);
      // 建立显示文本
      var he = o.hEdit = RBuilder.append(hep, 'SPAN');
      he.style.color = 'blue';
      he.style.textDecoration = 'underline';
      he.style.cursor = 'hand';
      he.style.paddingBottom = 1;
      //he.style.borderBottom = '1px dotted #000000';
      c.linkEvent(o, 'onZoomClick', he, c.onZoomClick);
      c.linkEvent(o, 'onZoomHover', he, c.onZoomHover);
      c.linkEvent(o, 'onZoomLeave', he, c.onZoomLeave);
      // 设置文字对齐方式
      if(!RString.isEmpty(c.editAlign)){
         he.style.textAlign = c.editAlign;
      }
   }else{
      if(c._absEdit){
         o.base.FCellEditControl.buildEdit.call(o);
      }else{
         var he = o.hEditPanel;
         c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
         c.linkEvent(o, 'onCellClick', he, c.onCellClick);
         c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
      }
   }
}

//==========================================================
// <T>设置控件信息。</T>
//
// @method
// @param f:info:TControlInfo 控件信息
//==========================================================
function FCellEdit_setInfo(f){
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
// <T>获得文本内容。</T>
//
// @method
// @return String 文本内容
//==========================================================
function FCellEdit_text(){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      return o.hEdit.innerText;
   }
   //
   if(c._absEdit){
      return o.hEdit.value;
   }
   return o.hEditPanel.innerText;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FCellEdit_setText(t){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      o.hEdit.innerText = t;
   }else{
      if(c._absEdit){
         o.hEdit.value = t;
      }else{
         o.hEditPanel.innerText = t;
      }
   }
}
