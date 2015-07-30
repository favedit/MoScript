with(MO){
   //==========================================================
   // FDuiCalendarEditor
   //==========================================================
   MO.FDuiCalendarEditor = function FDuiCalendarEditor(o){
      o = RClass.inherits(this, o, FDropEditor, MDuiFocusLooper);
      //..........................................................
      // @attribute
      o.editFormat       = null;
      o.dataValue        = null;
      o.date             = new TDate();
      //..........................................................
      // @html
      o.hTitlePanel      = null;
      o.hYearPrior       = null;
      o.hYear            = null;
      o.hYearNext        = null;
      o.hMonthPrior      = null;
      o.hMonth           = null;
      o.hMonthNext       = null;
      o.hDaysPanel       = null;
      o.hTimePanel       = null;
      o.hTime            = null;
      o.hNow             = null;
      o.hOk              = null;
      o.hCancel          = null;
      o.hHour            = null;
      o.hMinute          = null;
      o.hSecond          = null;
      o.hSelect          = null;
      o.editFormat       = RDate.DisplayFormat;
      o.dateOrg          = new TDate();
      o.dateOrgValue     = null;
      o.dayCells         = new TList();
      o.focusObject      = null;
      o.skipBlur         = false;
      /// @style
      o.styleYearMonth   = RClass.register(o, new TStyle('YearMonth'));
      o.styleButton      = RClass.register(o, new TStyle('Button'));
      o.styleButtonHover = RClass.register(o, new TStyle('ButtonHover'));
      o.styleDay         = RClass.register(o, new TStyle('Day'));
      o.styleDaySel      = RClass.register(o, new TStyle('DaySel'));
      o.styleDayHover    = RClass.register(o, new TStyle('DayHover'));
      o.styleDayFree     = RClass.register(o, new TStyle('DayFree'));
      o.styleDayNone     = RClass.register(o, new TStyle('DayNone'));
      o.styleTitlePanel  = RClass.register(o, new TStyle('TitlePanel'));
      o.styleDaysPanel   = RClass.register(o, new TStyle('DaysPanel'));
      o.styleTimePanel   = RClass.register(o, new TStyle('TimePanel'));
      o.styleMonth       = RClass.register(o, new TStyle('Year'));
      o.styleMonth       = RClass.register(o, new TStyle('Month'));
      o.styleWeek        = RClass.register(o, new TStyle('Week'));
      o.styleTime        = RClass.register(o, new TStyle('Time'));
      o.styleHour        = RClass.register(o, new TStyle('Hour'));
      o.styleSplit       = RClass.register(o, new TStyle('Split'));
      o.styleMinute      = RClass.register(o, new TStyle('Minute'));
      o.styleSecond      = RClass.register(o, new TStyle('Second'));
      o.styleNow         = RClass.register(o, new TStyle('Now'));
      o.styleOk          = RClass.register(o, new TStyle('Ok'));
      //..........................................................
      // @event
      o.onDaySelect      = RClass.register(o, new HMouseDown('onDaySelect'), FDuiCalendarEditor_onDaySelect);
      o.onButtonNow      = RClass.register(o, new HMouseDown('onButtonNow'), FDuiCalendarEditor_onButtonNow);
      o.onDateKeyDown    = RClass.register(o, new HKeyDown('onDateKeyDown'), FDuiCalendarEditor_onDateKeyDown);
      o.onDateBlur       = RClass.register(o, new HBlur('onDateBlur'), FDuiCalendarEditor_onDateBlur);
      o.onTimeBlur       = RClass.register(o, new HBlur('onTimeBlur'), FDuiCalendarEditor_onTimeBlur);
      o.onTimeClick      = RClass.register(o, new HClick('onTimeClick'), FDuiCalendarEditor_onTimeClick);
      o.onDayDbClick     = RClass.register(o, new HDoubleClick('onDayDbClick'), FDuiCalendarEditor_onDayDbClick);
      o.onDayEnter       = RClass.register(o, new HMouseEnter('onDayEnter'),    FDuiCalendarEditor_onDayEnter);
      o.onDayOut         = RClass.register(o, new HMouseOut('onDayOut'),        FDuiCalendarEditor_onDayOut);
      o.onButtonOk       = RClass.register(o, new HMouseDown('onButtonOk'),     FDuiCalendarEditor_onButtonOk);
      o.onButtonCancel   = RClass.register(o, new HMouseDown('onButtonCancel'), FDuiCalendarEditor_onButtonCancel);
      o.onButtonOver     = RClass.register(o, new HMouseEnter('onButtonOver'),  FDuiCalendarEditor_onButtonOver);
      o.onButtonOut      = RClass.register(o, new HMouseOut('onButtonOut'),     FDuiCalendarEditor_onButtonOut);
      o.onMdown          = RClass.register(o, new HMouseDown('onMdown'),        FDuiCalendarEditor_onMdown);
      o.onMup            = RClass.register(o, new HMouseUp('onMup'),            FDuiCalendarEditor_onMup);
      o.onBuildDrop      = FDuiCalendarEditor_onBuildDrop;
      //..........................................................
      // @method
      o.show             = FDuiCalendarEditor_show;
      o.setMinuteEditable = FDuiCalendarEditor_setMinuteEditable;
      o.setHourEditable   = FDuiCalendarEditor_setHourEditable;
      o.setSecondEditable = FDuiCalendarEditor_setSecondEditable;
      o.buildTitle       = FDuiCalendarEditor_buildTitle;
      o.buildDays        = FDuiCalendarEditor_buildDays;
      o.buildTime        = FDuiCalendarEditor_buildTime;
      o.testBlur         = FDuiCalendarEditor_testBlur;
      o.get              = FDuiCalendarEditor_get;
      o.set              = FDuiCalendarEditor_set;
      o.setDate          = FDuiCalendarEditor_setDate;
      o.storeChange      = FDuiCalendarEditor_storeChange;
      o.daySelectLsns    = new TListeners();
      o.onBuildButton    = FDuiCalendarEditor_onBuildButton;
      o.ohKdown          = FDuiCalendarEditor_ohKdown;
      o.ohDaysChange     = FDuiCalendarEditor_ohDaysChange;
      o.ohKeyCheck       = FDuiCalendarEditor_ohKeyCheck;
      // Event
      o.onDateAction     = FDuiCalendarEditor_onDateAction;
      // Method
      o.panel            = FDuiCalendarEditor_panel;
      o.dispose          = FDuiCalendarEditor_dispose;
      return o;
   }

   //------------------------------------------------------------
   //响应时间按键事件
   MO.FDuiCalendarEditor_onTimeClick = function FDuiCalendarEditor_onTimeClick(e){
      var o = this;
      var h = e.hSource;
      if(h.editAble){
         h.select();
      }
   }

   //------------------------------------------------------------
   //响应时间按键事件
   MO.FDuiCalendarEditor_onTimeBlur = function FDuiCalendarEditor_onTimeBlur(e){
      var o = this;
       var h = e.hSource;
       if(h == o.hHour){
          h.value = Math.min(RInteger.parse(h.value), 23);
       }else if(h == o.hMinute){
          h.value = Math.min(RInteger.parse(h.value), 59);
       }else if(h == o.hSecond){
          h.value = Math.min(RInteger.parse(h.value), 59);
       }
       o.storeChange();
       o.setDate(o.date);
   }

   //------------------------------------------------------------
   //响应时间按键事件
   MO.FDuiCalendarEditor_onDayDbClick = function FDuiCalendarEditor_onDayDbClick(e){
      var o = e.source
      if(RClass.isClass(o, FDuiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
         o.date.setDay(e.hSource.innerText);
         o.dataValue = RDate.formatDate(o.date);
         o.editEnd();
      }
   }

   //==========================================================
   MO.FDuiCalendarEditor_onDaySelect = function FDuiCalendarEditor_onDaySelect(e){
      var o = this;
      if(RClass.isClass(o, FDuiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
        var h = e.hSource;
        if(o.hSelect){
           o.hSelect.style.border = '1 solid #FFFFFF';
        };
        o.hSelect = h;
        h.style.border = '1 solid #2BD6F0';
         o.date.setDay(h.innerText);
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_onButtonNow = function FDuiCalendarEditor_onButtonNow(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         o.dataValue = RDate.format();
         o.editEnd();
      }
   }

   //==========================================================
   MO.FDuiCalendarEditor_onDateKeyDown = function FDuiCalendarEditor_onDateKeyDown(e, he){
      var o = this;
      var h = e.hSource;
      var v = h.value;
      if(EKey.Enter == e.keyCode){
         o.storeChange();
         o.setDate(o.date);
      }else if(EKey.Up == e.keyCode){
         if(h == o.hYear){
            o.hYear.value = RInteger.parse(o.hYear.value) + 1;
         }else if(h == o.hMonth){
            o.hMonth.value = RInteger.parse(o.hMonth.value) + 1;
         }else if(h == o.hHour){
            if(o.hHour.editAble){
              if(v < 23){
                h.value = RInteger.parse(h.value) + 1;
             }
            }
        }else if(h == o.hMinute){
          if(o.hMinute.editAble){
             if(v < 59){
               h.value = RInteger.parse(h.value) + 1;
            }
           }
        }else{
           if(o.hSecond.editAble){
              if(v < 59){
                h.value = RInteger.parse(h.value) + 1;
              }
            }
        }
         o.storeChange();
         o.setDate(o.date);
      }else if(EKey.Down == e.keyCode){
         if(h == o.hYear){
            o.hYear.value = RInteger.parse(o.hYear.value) - 1;
         }else if(h == o.hMonth){
            o.hMonth.value = RInteger.parse(o.hMonth.value) - 1;
         }else if(h == o.hHour){
           if(o.hHour.editAble){
               if(v > 0){
                 h.value = RInteger.parse(h.value) - 1;
              }
           }
        }else if(h == o.hMinute){
           if(o.hMinute.editAble){
              if(v > 0){
                  h.value = RInteger.parse(h.value) - 1;
               }
           }
        }else{
           if(o.hSecond.editAble){
              if(v > 0){
                 h.value = RInteger.parse(h.value) - 1;
              }
           }
        }
         o.storeChange();
         o.setDate(o.date);
         h.select();
      }else{
        if(h == o.hHour || h == o.hMinute || h == o.hSecond){
           if(h.editAble){
              RKey.fixChars(he, RDate.Chars);
           }else{
              he.keyCode = 0;
              he.returnValue = false;
           }
        }else{
           RKey.fixChars(he, RDate.Chars);
        }
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_onDateBlur = function FDuiCalendarEditor_onDateBlur(){
      var o = this;
      o.storeChange();
      o.setDate(o.date);
   }
   //==========================================================
   MO.FDuiCalendarEditor_onBuildDrop = function FDuiCalendarEditor_onBuildDrop(){
      var o = this;
      o.hDatePanel = RBuilder.appendTable(o.hDropPanel);
      //o.hDropPanel.style.border = '2px solid red';
      o.hDropPanel.align = 'center';
      //o.hDropPanel.style.topPadding = '10';
      o.hDatePanel.width = '100%';
      var hRow = o.hDatePanel.insertRow();
      var hCell = o.hTitlePanel = hRow.insertCell();
      //hCell.style.border = '2px solid red';
      hCell.colSpan = 2;
      hCell.className = o.style('TitlePanel');
      o.buildTitle();
      // Build days panel
      var hRow = o.hDatePanel.insertRow();
      var hCell = o.hDaysPanel = hRow.insertCell();
      hCell.colSpan = 2;  
      hCell.className = o.style('DaysPanel');
      o.buildDays();
      // Build time panel
   // var hRow = o.hDatePanel.insertRow();
   // var hCell = o.hTimePanel = hRow.insertCell();
   // hCell.colSpan = 2;
   // hCell.className = o.style('TimePanel');
      var hRow = o.hDatePanel.insertRow();
      var hCell = o.hTimePanel = hRow.insertCell();
      o.buildTime();
      //o.pushFocus(o.hEdit);
      o.pushFocus(o.hYear);
      o.pushFocus(o.hMonth);
      //o.pushFocus(o.hTime);
   }
   //==========================================================
   MO.FDuiCalendarEditor_show = function FDuiCalendarEditor_show(v){
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
      hp.style.pixelWidth = 273;
      // 显示阴影
      o.base.MShadow.show.call(o);
   }
   //==========================================================
   MO.FDuiCalendarEditor_buildTitle = function FDuiCalendarEditor_buildTitle(){
      var o = this;
      // Panel
      var hTab = RBuilder.appendTable(o.hTitlePanel, null, 0, 5, 1);
      hTab.align = 'center';
      hTab.width = '100%';
      hTab.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
      var hRow = hTab.insertRow();
      // Year Prior
      var hCel = hRow.insertCell();
      var h = o.hYearPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
      h.link = o;
      h.linkAction = o.onDateAction;
      h.innerText = '3';
      o.attachEvent("onButtonOver",h);
      o.attachEvent("onButtonOut",h);
   //   h.onmouseover = o.ohButtonOver;
   //   h.onmouseout = o.ohButtonOut;
   //   h.onmousedown = o.ohMdown;
   //   h.onmouseup = o.ohMup;
      o.attachEvent("onMdown",h);
      o.attachEvent("onMup",h);
      // Year
      var hCel = hRow.insertCell();
      var h = o.hYear = RBuilder.append(hCel, 'INPUT', o.style('Year'));
      h.maxLength = '4';
      o.attachEvent('onDateBlur', h, o.onDateBlur);
      o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
      // Year Text
      var hCel = hRow.insertCell();
      hCel.innerText = RContext.get('FDuiCalendarEditor:year');
      hCel.className = o.style('YearMonth');
      // Year Next
      var hCel = hRow.insertCell();
      var h = o.hYearNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
      h.link = o;
      h.linkAction = o.onDateAction;
      h.innerText = '4';
      o.attachEvent("onButtonOver",h);
      o.attachEvent("onButtonOut",h);
   //   h.onmouseover = o.ohButtonOver;
   //   h.onmouseout = o.ohButtonOut;
   //   h.onmousedown = o.ohMdown;
   //   h.onmouseup = o.ohMup;
      o.attachEvent("onMdown",h);
      o.attachEvent("onMup",h);
      // Split
      var hCell = hRow.insertCell();
      hCell.width='10';
      // Month Prior
      var hCel = hRow.insertCell();
      var h = o.hMonthPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
      h.link = o;
      h.linkAction = o.onDateAction;
      h.innerText = '3';
      o.attachEvent("onButtonOver",h);
      o.attachEvent("onButtonOut",h);
   //   h.onmouseover = o.ohButtonOver;
   //   h.onmouseout = o.ohButtonOut;
   //   h.onmousedown = o.ohMdown;
   //   h.onmouseup = o.ohMup;
      o.attachEvent("onMdown",h);
      o.attachEvent("onMup",h);
      // Month
      var hCel = hRow.insertCell();
      var h = o.hMonth = RBuilder.append(hCel, 'INPUT', o.style('Month'));
      h.maxLength = '2';
      o.attachEvent('onDateBlur', h, o.onDateBlur);
      o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
      // Month Text
      var hCel = hRow.insertCell();
      hCel.innerText = RContext.get('FDuiCalendarEditor:month');
      hCel.className = o.style('YearMonth');
      // Month Next
      var hCel = hRow.insertCell();
      var h = o.hMonthNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
      h.link = o;
      h.linkAction = o.onDateAction;
      h.innerText = '4';
      o.attachEvent("onButtonOver",h);
      o.attachEvent("onButtonOut",h);
   //   h.onmouseover = o.ohButtonOver;
   //   h.onmouseout = o.ohButtonOut;
   //   h.onmousedown = o.ohMdown;
   //   h.onmouseup = o.ohMup;
      o.attachEvent("onMdown", h);
      o.attachEvent("onMup", h);
   }
   //==========================================================
   MO.FDuiCalendarEditor_buildDays = function FDuiCalendarEditor_buildDays(){
      var o = this;
      var hTab = RBuilder.appendTable(o.hDaysPanel, null, 0, 0, 1);
      hTab.width = '100%';
      // Week
      var weekDays = RContext.get('FDuiCalendarEditor:weekdays').split(',');
      var count = weekDays.length;
      var hWeekRow = hTab.insertRow();
      for(var n=0; n<count; n++){
         var h = hWeekRow.insertCell();
         h.className = o.style('Week');
         h.align = 'center';
         h.innerText = weekDays[n];
      }
      // Days
      for(var n=0; n<6; n++){
         var hRow = hTab.insertRow();
         for(var i=0; i<count; i++){
            var h = hRow.insertCell();
            h.link = o;
            h.className = o.style('DayNone');
            o.attachEvent("onDayEnter", h);
            o.attachEvent("onDayOut", h);
            o.attachEvent("onDaySelect", h);
            o.attachEvent("onDayDbClick", h);
            //h.onmouseover = o.ohDayOver;
            //h.onmouseout = o.ohDayOut;
            //h.onmousedown = o.ohDayClick;
            h.innerText = '.';
            o.dayCells.push(h);
         }
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_buildTime = function FDuiCalendarEditor_buildTime(){
      var o = this;
      var hTab = RBuilder.appendTable(o.hTimePanel, null, 0, 1, 1);
      var ht = o.hTimePanel;
      ht.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
      var hRow = hTab.insertRow();
      // 建立空白分隔
      var hb1 = hRow.insertCell();
      hb1.width = 5;
      // 建立标签
      var hl = hRow.insertCell();
      hl.width = 50;
      hl.style.color = '#1F8FB7';
      hl.style.fontWeight = 'BOLD';
      hl.innerText='时间:';
      // 建立时间框
      var hc = hRow.insertCell();
      var hb = RBuilder.appendTable(hc, null, 0, 0, 0);
      hc.style.border = '1 solid #2BD6F0';
      hc.style.backgroundColor = '#FFFFFF';
      var hr = hb.insertRow();
      // 建立小时框
      var hh =hr.insertCell();
      var hHour = o.hHour = RBuilder.appendEdit(hh, o.style('Hour'));
      hHour.maxLength = 2;
      o.attachEvent("onTimeClick", hHour);
      o.attachEvent("onDateKeyDown", hHour, o.onDateKeyDown);
      o.attachEvent("onTimeBlur", hHour, o.onTimeBlur);
      // 建立分隔符
      var hs1 = hr.insertCell();
      hs1.innerText = ':';
      // 建立分钟框
      var hm = hr.insertCell();
      var hMinute = o.hMinute = RBuilder.appendEdit(hm, o.style('Minute'));
      hMinute.maxLength = 2;
      o.attachEvent("onTimeClick", hMinute);
      o.attachEvent("onDateKeyDown", hMinute, o.onDateKeyDown);
      o.attachEvent("onTimeBlur", hMinute, o.onTimeBlur);
      // 建立分隔符
      var hs2 = hr.insertCell();
      hs2.innerText = ':';
      // 建立秒数框
      var hs = hr.insertCell();
      var hSecond = o.hSecond = RBuilder.appendEdit(hs, o.style('Second'));
      hSecond.maxLength = 2;
      o.attachEvent("onTimeClick", hSecond);
      o.attachEvent("onDateKeyDown", hSecond, o.onDateKeyDown);
      o.attachEvent("onTimeBlur", hSecond, o.onTimeBlur);
      // 建立空白分隔
      var hb2 = hRow.insertCell();
      hb2.width = 50;
      // 建立当前时间按钮
      var hn = hRow.insertCell();
      hn.style.display = 'none';
      var hNow = o.hNow = RBuilder.append(hn, 'SPAN', o.style('Now'));
      hNow.style.width = 50;
      hn.style.border='1 solid #2BD6F0';
      hNow.innerText = RContext.get('FDuiCalendarEditor:now');
      hNow.style.display = 'none';
      hNow.link = o;
      o.attachEvent("onButtonNow", hNow);
      //建立cancel按键
      var hc = hRow.insertCell();
      var hCl = o.hCancel = RBuilder.append(hc, 'SPAN', o.style('Ok'));
      hCl.style.width = 50;
      hc.style.border='1 solid #2BD6F0';
      hCl.link = o;
      o.attachEvent("onButtonCancel", hCl);
      hCl.innerText = RContext.get('FDuiCalendarEditor:cancel');
      // 建立OK按键
      var ho = hRow.insertCell();
      var hOk = o.hOk = RBuilder.append(ho, 'SPAN', o.style('Ok'));
      hOk.style.width = 50;
      ho.style.border='1 solid #2BD6F0';
      hOk.link = o;
      o.attachEvent("onButtonOk", hOk);
      hOk.innerText = RContext.get('FDuiCalendarEditor:ok');
   }
   //==========================================================
   MO.FDuiCalendarEditor_testBlur = function FDuiCalendarEditor_testBlur(c){
      return this.source != c;
   }
   //==========================================================
   MO.FDuiCalendarEditor_get = function FDuiCalendarEditor_get(){
      return this.dataValue;
   }
   //==========================================================
   MO.FDuiCalendarEditor_set = function FDuiCalendarEditor_set(value, format){
      var o = this;
      o.changed = false;
      o.skipBlur = 0;
      o.dataValue = value;
      o.dateOrgValue = value;
      o.editFormat = format;
      RDate.parse(o.date, value);
      RDate.parse(o.dateOrg, value);
      if(!value){
         o.date.now();
         RDate.parse(o.date, value);
         RDate.parse(o.dateOrg, value);
      }
      //o.hEdit.value = RDate.formatDate(o.date, o.editFormat);
      o.setDate(o.date);
   }
   //==========================================================
   MO.FDuiCalendarEditor_setDate = function FDuiCalendarEditor_setDate(date){
      var o = this;
      // Set year
      o.hYear.value = date.year;
      // Set month
      o.hMonth.value = date.month;
      o.hHour.value = RString.lpad(date.hour, 2, '0');
      o.hMinute.value = RString.lpad(date.minute, 2, '0');
      o.hSecond.value = RString.lpad(date.second, 2,'0');
      // Set day
      var selDay = date.day;
      if(!(o.dateOrg.year == date.year && o.dateOrg.month == date.month)){
         selDay = -1;
      }
      if(o.hSelect){
         o.hSelect.style.border='1 solid #FFFFFF';
      }
      var monthWeekDay = this.date.monthWeekDay();
      var monthDays = this.date.monthDays();
      var weekDay = monthWeekDay;
      for(var n=0; n<o.dayCells.count; n++){
         var h = o.dayCells.get(n);
         if(n<monthWeekDay){
            h.className = o.style('DayNone');
            h.innerText = '.'
         }else if(n < monthDays+monthWeekDay){
            if(weekDay == 7){
               weekDay = 0;
            }
            var day = n-monthWeekDay+1;
            if(day == selDay){
               h.className = o.style('DaySel');
               h.isCurrent = true;
               o.hSelect = h;
               h.style.border = '1 solid #2BD6F0';
            }else{
               h.isFree = (weekDay==0 || weekDay==6);
               h.className = h.isFree ? o.style('DayFree') : o.style('Day');
               h.isCurrent = false;
            }
            h.innerText = day;
            weekDay++;
         }else{
            h.className = o.style('DayNone');
            h.innerText = '.'
         }
      }
   }

   //==========================================================
   MO.FDuiCalendarEditor_setHourEditable = function FDuiCalendarEditor_setHourEditable(v){
      var o = this;
      if(!v){
         o.hHour.value = '00';
         o.hHour.style.cursor='default';
         o.hHour.style.color='gray';
         o.hHour.editAble = false;
      }else{
         o.hHour.editAble = true;
      }
   }

   //==========================================================
   MO.FDuiCalendarEditor_setMinuteEditable = function FDuiCalendarEditor_setMinuteEditable(v){
      var o = this;
      if(!v){
         o.hMinute.value = '00';
         o.hMinute.style.cursor='default';
         o.hMinute.style.color='gray';
         o.hMinute.editAble = false;
      }else{
         o.hMinute.editAble = true;
      }
   }

   //==========================================================
   MO.FDuiCalendarEditor_setSecondEditable = function FDuiCalendarEditor_setSecondEditable(v){
      var o = this;
      if(!v){
         o.hSecond.value = '00';
         o.hSecond.style.cursor='default';
         o.hSecond.style.color='gray';
         o.hSecond.editAble = false;
      }else{
         o.hSecond.editAble = true;
      }
   }

   //==========================================================
   MO.FDuiCalendarEditor_storeChange = function FDuiCalendarEditor_storeChange(){
      var o = this;
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.date.setHour(Math.min(RInteger.parse(o.hHour.value), 23));
      o.date.setMinute(Math.min(RInteger.parse(o.hMinute.value), 59));
      o.date.setSecond(Math.min(RInteger.parse(o.hSecond.value), 59));
   }

   MO.FDuiCalendarEditor_onBuildButton = function FDuiCalendarEditor_onBuildButton(){
      var o = this;
      //o.base.FDropEditor.onBuildButton.call(o);
      //var h = o.hNow = RBuilder.append(o.hButtonPanel, 'SPAN', o.style('Now'));
      //var hp = o.hButtonPanel;
      //hp.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
      //hp.height = 20;
      //o.hButtonPanel.style.border = '1px solid blue';
      //h.innerText = RContext.get('FDuiCalendarEditor:now');
      //o.attachEvent("onButtonNow",h);
   }
   //==========================================================
   MO.FDuiCalendarEditor_onMdown = function FDuiCalendarEditor_onMdown(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         o.isSkipBlur = true;
         if(e.hSource.linkAction){
            e.hSource.linkAction.call(o, e.hSource);
         }
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_onMup = function FDuiCalendarEditor_onMup(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         var f = o.focusObject;
         if(f && f.focus && f.select){
            f.focus();
            f.select();
         }
      }
   }
   ////==========================================================
   //function FDuiCalendarEditor_ohMdown(){
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor)){
   //      o.isSkipBlur = true;
   //      if(this.linkAction){
   //         this.linkAction.call(o, this);
   //      }
   //   }
   //}
   ////==========================================================
   //function FDuiCalendarEditor_ohMup(){
   //   alert(FDuiCalendarEditor_ohMup);
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor)){
   //      var f = o.focusObject;
   //      if(f && f.focus && f.select){
   //         f.focus();
   //         f.select();
   //      }
   //   }
   //}
   //==========================================================
   MO.FDuiCalendarEditor_ohKdown = function FDuiCalendarEditor_ohKdown(){
      var o = this.link;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         var e = RWindow.event(this);
         if(EKey.Esc == e.keyCode){
            o.dataValue = o.dateOrgValue;
            o.editStatus = EEditStatus.Cancel;
            o.endEdit();
         }else if(event.ctrlKey && EKey.Enter == e.keyCode){
            o.storeChange();
            o.editStatus = EEditStatus.Ok;
            o.endEdit();
         }else if(EKey.Enter == e.keyCode){
            o.storeChange();
            o.setDate(o.date);
         }else if(EKey.Tab == e.keyCode){
            o.isSkipBlur = true;
            if(e.shiftKey){
               o.focusPrior();
            }else{
               o.focusNext();
            }
            e.returnValue = 0;
         }
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_onButtonOver = function FDuiCalendarEditor_onButtonOver(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         e.hSource.className = o.style('ButtonHover');
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_onButtonOut = function FDuiCalendarEditor_onButtonOut(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         e.hSource.className = o.style('Button');
      }
   }


   ////==========================================================
   //function FDuiCalendarEditor_ohButtonOver(){
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor)){
   //      this.className = o.style('ButtonHover');
   //   }
   //}
   ////==========================================================
   //function FDuiCalendarEditor_ohButtonOut(){
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor)){
   //      this.className = o.style('Button');
   //   }
   //}
   //==========================================================
   MO.FDuiCalendarEditor_onButtonOk = function FDuiCalendarEditor_onButtonOk(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         o.editStatus = EEditStatus.Ok;
         o.dataValue = RDate.formatDate(o.date);
         o.editEnd();
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_onButtonCancel = function FDuiCalendarEditor_onButtonCancel(e) {
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor)){
       o.editStatus = EEditStatus.Cancel;
        o.dataValue = '';
        o.editEnd();
      }
   }
   ////==========================================================
   //function FDuiCalendarEditor_ohButtonNow(){
   //   alert(FDuiCalendarEditor_ohButtonNow);
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor)){
   //      o.editStatus = EEditStatus.Ok;
   //      o.dataValue = RDate.format();
   //      o.endEdit();
   //   }
   //}
   //==========================================================
   MO.FDuiCalendarEditor_ohDaysChange = function FDuiCalendarEditor_ohDaysChange(){
      var o = this.link;
      if(RClass.isClass(o, FDuiCalendarEditor)){
         o.date.setYear(o.hYear.value);
         o.date.setMonth(o.hMonth.value);
         o.setDate(o.date);
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_ohKeyCheck = function FDuiCalendarEditor_ohKeyCheck(){
      var e = RWindow.event(this)
      if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
         e.keyCode = 0;
      }
   }

   //==========================================================
   MO.FDuiCalendarEditor_onDayEnter = function FDuiCalendarEditor_onDayEnter(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
         if(!e.hSource.isCurrent){
            e.hSource.className = o.style('DayHover');
         }
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_onDayOut = function FDuiCalendarEditor_onDayOut(e){
      var o = e.source;
      if(RClass.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
         if(!e.hSource.isCurrent){
            e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
         }
      }
   }
   //
   ////==========================================================
   //function FDuiCalendarEditor_ohDayOver(){
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor) && this.innerText != '.'){
   //      if(!this.isCurrent){
   //         this.className = o.style('DayHover');
   //      }
   //   }
   //}
   //
   ////==========================================================
   //function FDuiCalendarEditor_ohDayOut(){
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor) && this.innerText != '.'){
   //      if(!this.isCurrent){
   //         this.className = this.isFree ? o.style('DayFree') : o.style('Day');
   //      }
   //   }
   //}
   ////==========================================================
   //function FDuiCalendarEditor_ohDayClick(){
   //   var o = this.link;
   //   if(RClass.isClass(o, FDuiCalendarEditor)){
   //      o.date.setDay(this.innerText);
   //      o.dataValue = RDate.formatDate(o.date);
   //      o.editStatus = EEditStatus.Ok;
   //      o.endEdit();
   //   }
   //}
   //==========================================================
   MO.FDuiCalendarEditor_onDateAction = function FDuiCalendarEditor_onDateAction(h){
      var o = this;
      if(o.hYearPrior == h){
         o.date.addYear(-1);
         o.setDate(o.date);
         if(o.focusObject != this.hYear){
            o.focusObject = this.hYear;
            o.hYear.focus();
            o.hYear.select();
         }
      }else if(o.hYearNext == h){
         o.date.addYear(1);
         o.setDate(o.date);
         if(o.focusObject != this.hYear){
            o.focusObject = this.hYear;
            o.hYear.focus();
            o.hYear.select();
         }
      }else if(o.hMonthPrior == h){
         this.date.addMonth(-1);
         o.setDate(o.date);
         if(o.focusObject != this.hMonth){
            o.focusObject = this.hMonth;
            o.hMonth.focus();
         }
      }else if(o.hMonthNext == h){
         this.date.addMonth(1);
         o.setDate(o.date);
         if(o.focusObject != this.hMonth){
            o.focusObject = this.hMonth;
            o.hMonth.focus();
         }
      }
   }
   //==========================================================
   MO.FDuiCalendarEditor_panel = function FDuiCalendarEditor_panel(type){
      var o = this;
      if(EPanel.Shadow == type){
         return o.hPanel;
      }
      return o.base.FDropEditor.panel.call(o, type);
   }
   //==========================================================
   MO.FDuiCalendarEditor_dispose = function FDuiCalendarEditor_dispose(){
      var o = this;
      o.base.FDropEditor.dispose.call(o);
      o.hDatePanel = null;
      o.hDropPanel = null;
      o.hTitlePanel = null;
      o.hOk = null;
      o.hNow = null;
      o.hButtonPanel = null;
      o.hMonthNext = null;
      o.hYear = null;
      o.hMonth = null;
      o.hTime = null;
      o.hTimePanel = null;
   }
}
