//==========================================================
// FTimeEditor
//==========================================================
function FTimeEditor(o){
   o = RClass.inherits(this, o, FDropEditor);
   //..........................................................
   o.date              = null;
   o.hours             = null;
   o.minutes           = null;
   o.seconds           = null;
   o.hPanelHour        = null;
   o.hPanelMinute      = null;
   o.hPanelSecond      = null;
   o.hTitleHour        = null;
   o.hTitleMinute      = null;
   o.hTitleSecond      = null;
   //..........................................................
   // @event
   o.onButtonEnter     = RClass.register(o, new HMouseEnter('onButtonEnter'), FTimeEditor_onButtonEnter);
   o.onButtonLeave     = RClass.register(o, new HMouseLeave('onButtonLeave'), FTimeEditor_onButtonLeave);
   o.onHourClick       = RClass.register(o, new HMouseDown('onHourClick'), FTimeEditor_onHourClick);
   o.onMinuteClick     = RClass.register(o, new HMouseDown('onMinuteClick'), FTimeEditor_onMinuteClick);
   o.onSecondClick     = RClass.register(o, new HMouseDown('onSecondClick'), FTimeEditor_onSecondClick);
   o.onTimeDoubleClick = RClass.register(o, new HDoubleClick('onTimeDoubleClick'), FTimeEditor_onTimeDoubleClick);
   o.onNowClick        = RClass.register(o, new HMouseDown('onNowClick'), FTimeEditor_onNowClick);
   o.onConfirmClick    = RClass.register(o, new HMouseDown('onConfirmClick'), FTimeEditor_onConfirmClick);
   o.onBuildDrop       = FTimeEditor_onBuildDrop;
   o.onBuildButton     = FTimeEditor_onBuildButton;
   //..........................................................
   // @method
   o.construct         = FTimeEditor_construct;
   o.buildTitle        = FTimeEditor_buildTitle;
   o.get               = FTimeEditor_get;
   o.set               = FTimeEditor_set;
   o.setHourVisible    = FDateEditor_setHourVisible;
   o.setMinuteVisible    = FDateEditor_setMinuteVisible;
   o.setSecondVisible    = FDateEditor_setSecondVisible;
   o.selectCell        = FTimeEditor_selectCell;
   o.restore           = FTimeEditor_restore;
   o.show              = FTimeEditor_show;
   o.dispose           = FTimeEditor_dispose;
   return o;
}
//==========================================================
function FTimeEditor_onButtonEnter(e){
   if(!e.hSource.isSelect){
      e.hSource.style.backgroundColor = '#CCCCFF';
   }
}

//==========================================================
function FTimeEditor_onButtonLeave(e){
   if(!e.hSource.isSelect){
      e.hSource.style.backgroundColor = '#FFFFFF';
   }
}

//==========================================================
function FTimeEditor_onHourClick(e){
   var o = this;
   o.date.setHour(e.hSource.innerText);
   o.restore();
}

//==========================================================
function FTimeEditor_onMinuteClick(e){
   var o = this;
   o.date.setMinute(e.hSource.innerText);
   o.restore();
}

//==========================================================
function FTimeEditor_onSecondClick(e){
   var o = this;
   o.date.setSecond(e.hSource.innerText);
   o.restore();
}

//==========================================================
function FTimeEditor_onTimeDoubleClick(){
   this.onConfirmClick();
}

//==========================================================
function FTimeEditor_onNowClick(){
   var o = this;
   o.date = new TDate();
   o.editEnd();
}

//==========================================================
function FTimeEditor_onConfirmClick(){
   var o = this;
   o.date.setHour(o.hHour.value);
   o.date.setMinute(o.hMinute.value);
   o.date.setSecond(o.hSecond.value);
   o.editEnd();
}

//==========================================================
function FTimeEditor_onBuildDrop(){
   var o = this;
   var hdp = o.hDropPanel;
   hdp.width = 220;
   o.attachEvent('onTimeDoubleClick', hdp);
   // 建立小时标题
   o.hTitleHour = o.buildTitle('Hour', 4);
   // 建立小时信息
   var hp = o.hPanelHour = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   // AM
   var hr = hp.insertRow();
   var hc = hr.insertCell();
   hc.innerText = 'AM';
   hc.style.padding = '0 14';
   hc.style.borderRight = '1 solid #EEEEEE';
   hc.style.borderBottom = '1 solid #EEEEEE';
   hc.rowSpan = 2;
   for(var m=0; m<2; m++){
      if(m){
         hr = hp.insertRow();
      }
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(6*m+n, 2);
         hc.align = 'center';
         hc.style.padding = '1 6';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onHourClick', hc);
         o.hours.push(hc);
      }
   }
   // PM
   var hr = hp.insertRow();
   var hc = hr.insertCell();
   hc.innerText = 'PM';
   hc.style.padding = '0 14';
   hc.style.borderRight = '1 solid #EEEEEE';
   hc.style.borderBottom = '1 solid #EEEEEE';
   hc.rowSpan = 2;
   for(var m=0; m<2; m++){
      if(m){
         hr = hp.insertRow();
      }
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = 6*m + n + 12;
         hc.align = 'center';
         hc.style.padding = '1 6';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onHourClick', hc);
         o.hours.push(hc);
      }
   }
   // 建立分钟标题
   o.hTitleMinute = o.buildTitle('Minute', 2);
   // 建立分钟信息
   var hp = o.hPanelMinute = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   var hr = hp.insertRow();
   for(var m=0; m<2; m++){
      if(m){
         hr = hp.insertRow();
      }
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(30*m+5*n, 2);
         hc.align = 'center';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onMinuteClick', hc);
         o.minutes.push(hc);
      }
   }
   // 建立秒标题
   o.hTitleSecond = o.buildTitle('Second', 2);
   // 建立秒信息
   var hp = o.hPanelSecond = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   var hr = hp.insertRow();
   for(var m=0; m<2; m++){
      if(m){
         hr = hp.insertRow();
      }
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(30*m+5*n, 2);
         hc.align = 'center';
         hc.style.borderBottom = '1 solid #EEEEEE';
         hc.style.cursor = 'hand';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onSecondClick', hc);
         o.seconds.push(hc);
      }
   }
}

//==========================================================
function FTimeEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var hf = RBuilder.appendTable(o.hButtonPanel);
   hf.width = '100%';
   hf.height = 20;
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EEEEEE', endColorStr='#FFFFFF', gradientType='0')";
   var hr = hf.insertRow();
   // 建立当前时间按键
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   var h = o.hNow = RBuilder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onNowClick', h);
   h.innerText = RContext.get('FTime:Now');
   // 建立确定按键
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   hc.align = 'right';
   var h = o.hNow = RBuilder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onConfirmClick', h);
   h.innerText = RContext.get('FTime:Confirm');
}

//==========================================================
function FTimeEditor_construct(){
   var o = this;
   o.base.FDropEditor.construct.call(o);
   o.date = new TDate();
   o.hours = new TList();
   o.minutes = new TList();
   o.seconds = new TList();
}

//==========================================================
function FTimeEditor_buildTitle(n, ml){
   var o = this;
   // 建立底板
   var hf = RBuilder.appendTable(o.hDropPanel);
   hf.width = '100%';
   hf.style.borderBottom = '1 solid #999999';
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hf.style.backgroundColor = '#F8F8F8';
   hf.style.padding = '2 6';
   var hr = hf.insertRow();
   // 建立输入框
   var hc = hr.insertCell();
   hc.width = 60;
   var he = o['h' + n] = RBuilder.appendEdit(hc);
   he.style.width = '100%';
   he.style.textAlign = 'right';
   he.style.border = '1 solid #CCCCCC';
   he.maxLength = ml;
   // 建立标签
   var hc = hr.insertCell();
   hc.innerText = RContext.get('FTime:' + n);
   return hf;
}

//==========================================================
function FTimeEditor_get(){
   return RDate.formatDate(this.date);
}

//==========================================================
function FTimeEditor_set(v){
   var o = this;
   RDate.autoParse(o.date, v);
   o.restore();
}

//==========================================================
function FDateEditor_setHourVisible(v){
   var o = this;
   o.hPanelHour.style.display = v? 'block':'none';
   o.hTitleHour.style.display = v? 'block':'none';
}

//==========================================================
function FDateEditor_setMinuteVisible(v){
   var o = this;
   o.hPanelMinute.style.display = v? 'block':'none';
   o.hTitleMinute.style.display = v? 'block':'none';
}

//==========================================================
function FDateEditor_setSecondVisible(v){
   var o = this;
   o.hPanelSecond.style.display = v? 'block':'none';
   o.hTitleSecond.style.display = v? 'block':'none';
}

//==========================================================
function FTimeEditor_show(v){
   var o = this;
   // 父处理
   o.base.FDropEditor.show.call(o, v);
   // 获取底板
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   // 计算显示位置
   var s = o.source;
   var r = s.getEditRange();
   // 设置坐标
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 220;
   // 显示阴影
   o.base.MShadow.show.call(o);
}

//==========================================================
function FTimeEditor_selectCell(ls, v){
   var c = ls.count;
   for(var n=0; n<c; n++){
      var h = ls.get(n);
      if(h.innerText == v){
         h.style.color = '#FFFFFF';
         h.style.backgroundColor = '#9999EE';
         h.isSelect = true;
      }else{
         h.style.color = '#000000';
         h.style.backgroundColor = '#FFFFFF';
         h.isSelect = false;
      }
   }
}

//==========================================================
function FTimeEditor_restore(){
   var o = this;
   // 设置时间显示
   o.hHour.value = o.date.hour;
   o.hMinute.value = o.date.minute;
   o.hSecond.value = o.date.second;
   // 获得选中时间
   o.selectCell(o.hours, o.date.hour);
   o.selectCell(o.minutes, o.date.minute);
   o.selectCell(o.seconds, o.date.second);
}

//==========================================================
function FTimeEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   o.hPanel = null;
} 
