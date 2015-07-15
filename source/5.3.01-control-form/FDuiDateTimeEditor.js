with(MO){
   //==========================================================
   // FUiDateTimeEditor
   //==========================================================
   MO.FUiDateTimeEditor = function FUiDateTimeEditor(o){
      o = RClass.inherits(this, o, FUiDropEditor);
      //..........................................................
      o.date              = null;
      o.years             = null;
      o.months            = null;
      o.days              = null;
      o.hPanelDay         = null;
      o.hPanelMonth       = null;
      o.hPanelYear        = null;
      o.hTitleDay         = null;
      o.hTitleMonth       = null;
      o.hTitleYear        = null;
      //..........................................................
      // @event
      o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiDateTimeEditor_onButtonEnter);
      o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiDateTimeEditor_onButtonLeave);
      o.onYearClick       = RClass.register(o, new AEventMouseDown('onYearClick'), FUiDateTimeEditor_onYearClick);
      o.onMonthClick      = RClass.register(o, new AEventMouseDown('onMonthClick'), FUiDateTimeEditor_onMonthClick);
      o.onDayClick        = RClass.register(o, new AEventMouseDown('onDayClick'), FUiDateTimeEditor_onDayClick);
      o.onDateDoubleClick = RClass.register(o, new AEventDoubleClick('onDateDoubleClick'), FUiDateTimeEditor_onDateDoubleClick);
      o.onNowClick        = RClass.register(o, new AEventMouseDown('onNowClick'), FUiDateTimeEditor_onNowClick);
      o.onConfirmClick    = RClass.register(o, new AEventMouseDown('onConfirmClick'), FUiDateTimeEditor_onConfirmClick);
      o.onBuildDrop       = FUiDateTimeEditor_onBuildDrop;
      o.onBuildButton     = FUiDateTimeEditor_onBuildButton;
      //..........................................................
      // @method
      o.construct         = FUiDateTimeEditor_construct;
      o.buildTitle        = FUiDateTimeEditor_buildTitle;
      o.get               = FUiDateTimeEditor_get;
      o.set               = FUiDateTimeEditor_set;
      o.resetDay          = FUiDateTimeEditor_resetDay;
      o.setYearVisible    = FUiDateTimeEditor_setYearVisible;
      o.setMonthVisible   = FUiDateTimeEditor_setMonthVisible;
      o.setDayVisible     = FUiDateTimeEditor_setDayVisible;
      o.selectCell        = FUiDateTimeEditor_selectCell;
      o.restore           = FUiDateTimeEditor_restore;
      o.show              = FUiDateTimeEditor_show;
      o.dispose           = FUiDateTimeEditor_dispose;
      return o;
   }
   //==========================================================
   MO.FUiDateTimeEditor_onButtonEnter = function FUiDateTimeEditor_onButtonEnter(e){
      if(!e.hSource.isSelect){
        if(RString.isEmpty(e.hSource.innerText)){
            e.hSource.style.backgroundColor = '#CCCCFF';
        }
      }
   }

   //==========================================================
   MO.FUiDateTimeEditor_onButtonLeave = function FUiDateTimeEditor_onButtonLeave(e){
      if(!e.hSource.isSelect){
         e.hSource.style.backgroundColor = '#FFFFFF';
      }
   }

   //==========================================================
   MO.FUiDateTimeEditor_onYearClick = function FUiDateTimeEditor_onYearClick(e){
      var o = this;
      o.date.setYear(e.hSource.innerText);
      o.restore();
      o.resetDay();
   }

   //==========================================================
   MO.FUiDateTimeEditor_onMonthClick = function FUiDateTimeEditor_onMonthClick(e){
      var o = this;
      o.date.setMonth(e.hSource.innerText);
      o.restore();
      o.resetDay();
   }

   //==========================================================
   MO.FUiDateTimeEditor_onDayClick = function FUiDateTimeEditor_onDayClick(e){
      var o = this;
      if(!RString.equals(e.hSource.innerText, '.')){
         o.date.setDay(e.hSource.innerText);
         o.restore();
      }
   }

   //==========================================================
   MO.FUiDateTimeEditor_onDateDoubleClick = function FUiDateTimeEditor_onDateDoubleClick(){
      this.onConfirmClick();
   }

   //==========================================================
   MO.FUiDateTimeEditor_onNowClick = function FUiDateTimeEditor_onNowClick(){
      var o = this;
      o.date = new TDate();
      o.editEnd();
   }

   //==========================================================
   MO.FUiDateTimeEditor_onConfirmClick = function FUiDateTimeEditor_onConfirmClick(){
      var o = this;
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.date.setDay(o.hDay.value);
      o.editEnd();
   }

   //==========================================================
   MO.FUiDateTimeEditor_onBuildDrop = function FUiDateTimeEditor_onBuildDrop(){
      var o = this;
      var hdp = o.hDropPanel;
      hdp.width = 220;
      o.attachEvent('onDateDoubleClick', hdp);
      // 建立年标题
      o.hTitleYear = o.buildTitle('Year', 4);
      // 建立年信息
      var hp = o.hPanelYear = o.hSelectPanel = RBuilder.appendTable(hdp);
      hp.width = '100%';
      for(var m=0; m<4; m++){
         var hr = hp.insertRow();
         for(var n=0; n<4; n++){
            var hc = hr.insertCell();
            hc.innerText = RInteger.format(2000 + 4*m+n, 2);
            hc.align = 'center';
            hc.style.padding = '1 6';
            hc.style.cursor = 'hand';
            hc.style.borderBottom = '1 solid #EEEEEE';
            if(n < 5){
               hc.style.borderRight = '1 solid #EEEEEE';
            }
            o.attachEvent('onButtonEnter', hc);
            o.attachEvent('onButtonLeave', hc);
            o.attachEvent('onYearClick', hc);
            o.years.push(hc);
         }
      }
      // 建立月标题
      o.hTitleMonth = o.buildTitle('Month', 2);
      // 建立月信息
      var hp = o.hPanelMonth = o.hSelectPanel = RBuilder.appendTable(hdp);
      hp.width = '100%';
      for(var m=0; m<2; m++){
         hr = hp.insertRow();
         for(var n=0; n<6; n++){
            var hc = hr.insertCell();
            hc.innerText = RInteger.format(6*m+n+1, 2);
            hc.align = 'center';
            hc.style.cursor = 'hand';
            hc.style.borderBottom = '1 solid #EEEEEE';
            if(n < 5){
               hc.style.borderRight = '1 solid #EEEEEE';
            }
            o.attachEvent('onButtonEnter', hc);
            o.attachEvent('onButtonLeave', hc);
            o.attachEvent('onMonthClick', hc);
            o.months.push(hc);
         }
      }
      // 建立日标题
      //debugger;
      o.hTitleDay = o.buildTitle('Day', 2);
      // 建立日信息
      var hp = o.hPanelDay = o.hSelectPanel = RBuilder.appendTable(hdp);
      hp.width = '100%';
      for(var m=0; m<5; m++){
         hr = hp.insertRow();
         for(var n=0; n<7; n++){
            var day = 7*m+n+1;
            if(day > 31){
               continue;
            }
            var hc = hr.insertCell();
            hc.innerText = RInteger.format(day, 2);
            hc.align = 'center';
            hc.style.borderBottom = '1 solid #EEEEEE';
            hc.style.cursor = 'hand';
            if(n < 5){
               hc.style.borderRight = '1 solid #EEEEEE';
            }
            o.attachEvent('onButtonEnter', hc);
            o.attachEvent('onButtonLeave', hc);
            o.attachEvent('onDayClick', hc);
            o.days.push(hc);
         }
      }
   }

   //==========================================================
   MO.FUiDateTimeEditor_onBuildButton = function FUiDateTimeEditor_onBuildButton(){
      var o = this;
      o.base.FUiDropEditor.onBuildButton.call(o);
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
      h.innerText = RContext.get('FDate:Now');
      // 建立确定按键
      var hc = hr.insertCell();
      hc.style.padding = '0 6';
      hc.align = 'right';
      var h = o.hNow = RBuilder.append(hc, 'SPAN');
      h.style.cursor = 'hand';
      o.attachEvent('onConfirmClick', h);
      h.innerText = RContext.get('FDate:Confirm');
   }

   //==========================================================
   MO.FUiDateTimeEditor_construct = function FUiDateTimeEditor_construct(){
      var o = this;
      o.base.FUiDropEditor.construct.call(o);
      o.date = new TDate();
      o.years = new TList();
      o.months = new TList();
      o.days = new TList();
   }

   //==========================================================
   MO.FUiDateTimeEditor_buildTitle = function FUiDateTimeEditor_buildTitle(n, ml){
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
      hc.innerText = RContext.get('FDate:' + n);
      return hf;
   }

   //==========================================================
   MO.FUiDateTimeEditor_get = function FUiDateTimeEditor_get(){
      return RDate.formatDate(this.date);
   }

   //==========================================================
   MO.FUiDateTimeEditor_set = function FUiDateTimeEditor_set(v){
      var o = this;
      RDate.autoParse(o.date, v);
      o.restore();
   }

   //==========================================================
   MO.FUiDateTimeEditor_setYearVisible = function FUiDateTimeEditor_setYearVisible(v){
      var o = this;
      o.hPanelYear.style.display = v? 'block':'none';
      o.hTitleYear.style.display = v? 'block':'none';
   }

   //==========================================================
   MO.FUiDateTimeEditor_setMonthVisible = function FUiDateTimeEditor_setMonthVisible(v){
      var o = this;
      o.hPanelMonth.style.display = v? 'block':'none';
      o.hTitleMonth.style.display = v? 'block':'none';
   }

   //==========================================================
   MO.FUiDateTimeEditor_setDayVisible = function FUiDateTimeEditor_setDayVisible(v){
      var o = this;
      o.hPanelDay.style.display = v? 'block':'none';
      o.hTitleDay.style.display = v? 'block':'none';
   }

   //==========================================================
   MO.FUiDateTimeEditor_show = function FUiDateTimeEditor_show(v){
      var o = this;
      // 父处理
      o.base.FUiDropEditor.show.call(o, v);
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
   MO.FUiDateTimeEditor_resetDay = function FUiDateTimeEditor_resetDay(){
      var o = this;
      var monthDays = this.date.monthDays();
      for(var n=0; n<o.days.count; n++){
         var hd = o.days.get(n);
         if(n >= monthDays){
            hd.innerText = '.';
            //hd.style.cursor = 'auto';
         }else{
           hd.innerText = RInteger.format(n+1, 2);
           //hd.style.cursor = 'hand';
         }
      }
   }

   //==========================================================
   MO.FUiDateTimeEditor_selectCell = function FUiDateTimeEditor_selectCell(ls, v){
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
   MO.FUiDateTimeEditor_restore = function FUiDateTimeEditor_restore(){
      var o = this;
      // 设置时间显示
      o.hYear.value = o.date.year;
      o.hMonth.value = o.date.month;
      o.hDay.value = o.date.day;
      // 获得选中时间
      o.selectCell(o.years, o.date.year);
      o.selectCell(o.months, o.date.month);
      o.selectCell(o.days, o.date.day);
   }

   //==========================================================
   MO.FUiDateTimeEditor_dispose = function FUiDateTimeEditor_dispose(){
      var o = this;
      o.base.FUiDropEditor.dispose.call(o);
      o.hPanel = null;
   } 
}
