with(MO){
   //==========================================================
   // <T>数字输入框。</T>
   //
   // @class FDuiNumber4, MDescNumber, MEditBorder, MListView, MZoom, MMouseWheel
   // @history 091106 MAOCY 创建
   //==========================================================
   MO.FUiDataNumber4 = function FUiDataNumber4(o){
      //o = MO.Class.inherits(this, o, FDuiNumber4, MDescNumber, MEditBorder, MListView, MZoom, MMouseWheel);
      o = MO.Class.inherits(this, o, FDuiNumber4);
      //..........................................................
      // @property
      //o.editAlign         = EAlign.Right;
      //..........................................................
      // @attribute
      //o.borderStyle       = EUiBorder.RoundDrop;
      //..........................................................
      // @event
      //o.onEditFocus       = MO.Class.register(o, new HFocus('onEditFocus'), FUiDataNumber4_onEditFocus);
      //o.onEditBlur        = MO.Class.register(o, new HBlur('onEditBlur'), FUiDataNumber4_onEditBlur);
      //o.onBuildEdit       = FUiDataNumber4_onBuildEdit;
      //..........................................................
      // @method
      //o.formatValue       = MDescNumber_formatValue;
      //o.formatText        = MDescNumber_formatText;
      //o.onMouseWheel      = MDescNumber_onMouseWheel;
      //o.onDataKeyDown     = FUiDataNumber4_onDataKeyDown;
      //o.ohEditKeyUp       = FUiDataNumber4_ohEditKeyUp;
      // 创建HTML标签的函数
      // 相应按键弹起事件
      //o.onEditKeyUp       = FUiDataNumber4_onEditKeyUp;
      // 相应双击事件 用来做lov用
      //o.onEditDoubleClick = FUiDataNumber4_onEditDoubleClick;
      // 相应鼠标滑动事件
      //..........................................................
      // @method
      // 检查是否符合要求
      // 模式是否符合
      //o.validPattern      = FUiDataNumber4_validPattern;
      // 设置显示格式
      //o.refreshStyle      = FUiDataNumber4_refreshStyle;
      // 用分割符分割数据
      //o.splitValue        = FUiDataNumber4_splitValue;
      // 去掉分隔符
      //o.removeSplit       = FUiDataNumber4_removeSplit;
      //o.precisionValue    = FUiDataNumber4_precisionValue;
      //o.dispose           = FUiDataNumber4_dispose;
      //o.setUnitIcon       = FUiDataNumber4_setUnitIcon;
      return o;
   }

   //==========================================================
   // <T>编辑控件获得焦点。 </T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiDataNumber4_onEditFocus = function FUiDataNumber4_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }

   //==========================================================
   // <T>编辑控件失去焦点。 </T>
   //
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiDataNumber4_onEditBlur = function FUiDataNumber4_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }

   //==========================================================
   // <T>创建编辑控件。 </T>
   //
   // @param b:border:TBorder 边框对象
   //==========================================================
   MO.FUiDataNumber4_onBuildEdit = function FUiDataNumber4_onBuildEdit(b){
      var o = this;
      // 建立编辑控件
      var htb = MO.Window.Builder.appendTable(b.hPanel);
      htb.style.tableLayout = 'fixed';
      var hr = o.hEdit = htb.insertRow();
      // 建立修改标志
      o.onBuildChange(hr.insertCell());
      // 建立放大标志
      if(o.canZoom()){
         var hc = hr.insertCell();
         o.hZoom = MO.Window.Builder.appendIcon(hc, 'ctl.zooms');
         hc.width = 16;
      }
      // 建立输入框
      var hc = hr.insertCell();
      hc.style.width = '100%';
      var he = o.hEdit = MO.Window.Builder.appendEdit(hc, o.style('Edit'));
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
   MO.FUiDataNumber4_setUnitIcon = function FUiDataNumber4_setUnitIcon(i){
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
   MO.FUiDataNumber4_onDataKeyDown = function FUiDataNumber4_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FDuiNumber4.onDataKeyDown.call(o, s, e);
   }

   //==========================================================
   // 响应按键弹起事件，当按下的是上下箭头时，编辑框后的上下箭头的
   // 样式改变。 
   //
   // @param s:sender 消息发送者
   // @param e:event 事件
   //==========================================================
   MO.FUiDataNumber4_ohEditKeyUp = function FUiDataNumber4_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }


   //------------------------------------------------------------
   MO.FUiDataNumber4_onEditKeyDown = function FUiDataNumber4_onEditKeyDown(e) {
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
   MO.FUiDataNumber4_onEditKeyUp = function FUiDataNumber4_onEditKeyUp(e) {
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
   MO.FUiDataNumber4_onEditDoubleClick = function FUiDataNumber4_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   // ------------------------------------------------------------
   // s 为没有分隔符的字符串
   MO.FUiDataNumber4_validPattern = function FUiDataNumber4_validPattern(s) {
      var o = this;
      var flag = true;
      var s = MO.Lang.String.nvl(s);
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
   MO.FUiDataNumber4_refreshStyle = function FUiDataNumber4_refreshStyle(){
      var o = this;
      o.base.FDuiNumber4.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   // ------------------------------------------------------------
   // 格式化数字用'号隔开数字
   // 保证是有效数字的前提下
   MO.FUiDataNumber4_splitValue = function FUiDataNumber4_splitValue(v){
      var o = this;
      var s = MO.Lang.String.nvl(v.toString());
      // 负号位置
      var j = RString.findChars(s,"-");
      // 百分号位置
      var b = RString.findChars(s,"%");
      // 去掉字符串里的无用符号
      s = RString.removeChars(s, "'");
      s = RString.removeChars(s, " ");
      s = RString.removeChars(s, "%");
      s = RString.removeChars(s, "-");
      if (!MO.Lang.String.isEmpty(s)) {
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
   MO.FUiDataNumber4_removeSplit = function FUiDataNumber4_removeSplit(s){
      var o = this;
      var s = MO.Lang.String.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   //------------------------------------------------------------
   MO.FUiDataNumber4_precisionValue = function FUiDataNumber4_precisionValue(v){
      var o = this;
      if(MO.Lang.String.isEmpty(v)){
         return v;
      }
      var l1,l2;
      // 精度的格式一定要正确 0.1,1,10,100...
      var p = MO.Lang.String.nvl(o.editPrecision);
      v = MO.Lang.String.nvl(v);
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
   MO.FUiDataNumber4_dispose = function FUiDataNumber4_dispose(){
      var o = this;
      o.base.FDuiNumber4.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
