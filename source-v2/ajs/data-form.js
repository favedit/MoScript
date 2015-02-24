function FUiDataNumber(o){
   o = RClass.inherits(this, o, FEditControl);
   return o;
}
function FUiDataNumber_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FUiDataNumber_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FUiDataNumber_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell());
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   o.buildAdjustForm(b.hDrop);
}
function FUiDataNumber_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}
function FUiDataNumber_onDataKeyDown(s, e){
   var o = this;
   if(o.canEdit){
      if(EKey.Up == e.keyCode){
         o.adjustValue(true);
      }else if(EKey.Down == e.keyCode){
         o.adjustValue(false);
      }
   }
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
}
function FUiDataNumber_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FUiDataNumber_onEditKeyDown(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode) {
         e.source.hUpIcon.src = o.styleIconPath('up');
         o.changeValue(e, 'Y');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('down');
         o.changeValue(e, 'N');
      }
   }
}
function FUiDataNumber_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
function FUiDataNumber_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
function FUiDataNumber_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
function FUiDataNumber_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
function FUiDataNumber_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   var j = RString.findChars(s,"-");
   var b = RString.findChars(s,"%");
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
         if(i != 0 && n != 0 && n % 3 == 0){
            sc = "'" + s.charAt(i) + sc;
         }else{
            sc = s.charAt(i) + sc;
         }
         n++;
      }
      if(-1 != j){
          sc = "-" + sc ;
       }
      if(-1 != b){
         sc = sc +"%";
      }
      return sc;
   }
   return s;
}
function FUiDataNumber_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
function FUiDataNumber_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RString.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RString.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
   }else{
      if(l1){
         if(l1 <= v.length){
            v = v.substring(0, v.length - l1 + 1);
            for(var n = 0; n < l1 - 1;n++){
               v = v.concat('0');
            }
         }
         else if(l1 > v.length){
            v = 0;
         }
      }
      if(l2){
         v = v + '.';
         for(var n = 0; n < l2;n++){
            v = v.concat('0');
         }
      }
   }
   return v;
}
function FUiDataNumber_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}
