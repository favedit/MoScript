//==========================================================
// <T>数字输入框。</T>
//
// @class FEditControl, MDescNumber, MEditBorder, MListView, MZoom, MMouseWheel
// @history 091106 MAOCY 创建
//==========================================================
function FNumberTpl(o){
   //o = RClass.inherits(this, o, FEditControl, MDescNumber, MEditBorder, MListView, MZoom, MMouseWheel);
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @property
   //o.editAlign         = EAlign.Right;
   //..........................................................
   // @attribute
   //o.borderStyle       = EBorder.RoundDrop;
   //..........................................................
   // @event
   //o.onEditFocus       = RClass.register(o, new HFocus('onEditFocus'), FNumberTpl_onEditFocus);
   //o.onEditBlur        = RClass.register(o, new HBlur('onEditBlur'), FNumberTpl_onEditBlur);
   //o.onBuildEdit       = FNumberTpl_onBuildEdit;
   //..........................................................
   // @method
   //o.formatValue       = MDescNumber_formatValue;
   //o.formatText        = MDescNumber_formatText;
   //o.onMouseWheel      = MDescNumber_onMouseWheel;
   //o.onDataKeyDown     = FNumberTpl_onDataKeyDown;
   //o.ohEditKeyUp       = FNumberTpl_ohEditKeyUp;
   // 创建HTML标签的函数
   // 相应按键弹起事件
   //o.onEditKeyUp       = FNumberTpl_onEditKeyUp;
   // 相应双击事件 用来做lov用
   //o.onEditDoubleClick = FNumberTpl_onEditDoubleClick;
   // 相应鼠标滑动事件
   //..........................................................
   // @method
   // 检查是否符合要求
   // 模式是否符合
   //o.validPattern      = FNumberTpl_validPattern;
   // 设置显示格式
   //o.refreshStyle      = FNumberTpl_refreshStyle;
   // 用分割符分割数据
   //o.splitValue        = FNumberTpl_splitValue;
   // 去掉分隔符
   //o.removeSplit       = FNumberTpl_removeSplit;
   //o.precisionValue    = FNumberTpl_precisionValue;
   //o.dispose           = FNumberTpl_dispose;
   //o.setUnitIcon       = FNumberTpl_setUnitIcon;
   return o;
}

//==========================================================
// <T>编辑控件获得焦点。 </T>
//
// @param e:event:TEvent 事件对象
//==========================================================
function FNumberTpl_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}

//==========================================================
// <T>编辑控件失去焦点。 </T>
//
// @param e:event:TEvent 事件对象
//==========================================================
function FNumberTpl_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}

//==========================================================
// <T>创建编辑控件。 </T>
//
// @param b:border:TBorder 边框对象
//==========================================================
function FNumberTpl_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell());
   // 建立放大标志
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   // 建立输入框
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp); 
   // 设置可以输入的最大长度
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   // 建立调节表单
   o.buildAdjustForm(b.hDrop);
}

//==========================================================
//<T>创建编辑控件。 </T>
//
//@param b:border:TBorder 边框对象
//==========================================================
function FNumberTpl_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}

//==========================================================
// 响应按键按下事件，当按下的是上下箭头时，数值按单位变化，否则
// 按普通数字键处理。 
//
// @param s:sender 消息发送者
// @param e:event 事件
//==========================================================
function FNumberTpl_onDataKeyDown(s, e){
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

//==========================================================
// 响应按键弹起事件，当按下的是上下箭头时，编辑框后的上下箭头的
// 样式改变。 
//
// @param s:sender 消息发送者
// @param e:event 事件
//==========================================================
function FNumberTpl_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}


//------------------------------------------------------------
function FNumberTpl_onEditKeyDown(e) {
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
//------------------------------------------------------------
function FNumberTpl_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
//------------------------------------------------------------
function FNumberTpl_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
// ------------------------------------------------------------
// s 为没有分隔符的字符串
function FNumberTpl_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   // 首先检测是否是数字 如果不是数字格式 返回 false
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;  
   }
   var r = null;
   // 是否符合数字类型
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            // 找到第一个就可以了 因此在枚举样式里，只取第一个数据
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   // 最大值
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   // 最小值
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
//------------------------------------------------------------
function FNumberTpl_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
// ------------------------------------------------------------
// 格式化数字用'号隔开数字
// 保证是有效数字的前提下
function FNumberTpl_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   // 负号位置
   var j = RString.findChars(s,"-");
   // 百分号位置
   var b = RString.findChars(s,"%");
   // 去掉字符串里的无用符号
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
//         if(n % 3 == 0 && (i + 1) != s.length){
//            sc = sc.concat("'");
//         }else{
//            sc = sc.concat(s.charAt(i));
//         }
//         if("." != s.charAt(i)){
//            n++;
//         }else{
//            n = 0;
//         }
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
//------------------------------------------------------------
// 去掉分隔符
function FNumberTpl_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
//------------------------------------------------------------
function FNumberTpl_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   // 精度的格式一定要正确 0.1,1,10,100...
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length; 
   }
   // 值为浮点数
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
//      v = vs[0] + '.' + RString.nvl(vs[1]);
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
   // 值为整数
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
//------------------------------------------------------------
function FNumberTpl_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}