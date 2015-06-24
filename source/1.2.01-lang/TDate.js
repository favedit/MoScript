﻿with(MO){
   //===========================================================
   // 日期时间的工具类
   //
   // @tool
   // @author maochunyang
   // @version 1.0.1
   //===========================================================
   MO.TDate = function TDate(date){
      var o = this;
      //..........................................................
      // @attribute
      o.date         = date ? date : new Date();
      o.year         = null;
      o.month        = null;
      o.day          = null;
      o.hour         = null;
      o.minute       = null;
      o.second       = null;
      o.ms           = null;
      //..........................................................
      // @method
      o.equals       = TDate_equals;
      // @method
      o.isBefore     = TDate_isBefore;
      o.isAfter      = TDate_isAfter;
      // @method
      o.monthDays    = TDate_monthDays;
      o.monthWeekDay = TDate_monthWeekDay;
      o.weekDay      = TDate_weekDay;
      // @method
      o.refresh      = TDate_refresh;
      o.setYear      = TDate_setYear;
      o.setMonth     = TDate_setMonth;
      o.setDay       = TDate_setDay;
      o.setHour      = TDate_setHour;
      o.setMinute    = TDate_setMinute;
      o.setSecond    = TDate_setSecond;
      o.setDate      = TDate_setDate;
      // @method
      o.addYear      = TDate_addYear;
      o.addMonth     = TDate_addMonth;
      o.addDay       = TDate_addDay;
      o.addMseconds  = TDate_addMseconds;
      // @method
      o.now          = TDate_now;
      o.parse        = TDate_parse;
      o.parseAuto    = TDate_parseAuto;
      o.format       = TDate_format;
      // @method
      o.clone        = TDate_clone;
      o.dump         = TDate_dump;
      //..........................................................
      // @construct
      o.refresh();
      return o;
   }

   //===========================================================
   // <T>判断数据是否相等。</T>
   //
   // @method
   // @param date:Date 日期对象
   // @return Boolean 是否相等
   //===========================================================
   MO.TDate_equals = function TDate_equals(date){
      return this.date.getTime() == date.date.getTime();
   }

   //===========================================================
   // <T>判断当前时间是否在指定时间之前。</T>
   //
   // @method
   // @param date:Date 日期对象
   // @return Boolean 是否之前
   //===========================================================
   MO.TDate_isBefore = function TDate_isBefore(date){
      return this.date.getTime() < date.date.getTime();
   }

   //===========================================================
   // <T>判断当前时间是否在指定时间之后。</T>
   //
   // @method
   // @param date:Date 日期对象
   // @return Boolean 是否之后
   //===========================================================
   MO.TDate_isAfter = function TDate_isAfter(date){
      return this.date.getTime() > date.date.getTime();
   }

   //===========================================================
   // <T>取得当前的月的天数。</T>
   //
   // @method
   // @return Integer 天数
   //===========================================================
   MO.TDate_monthDays = function TDate_monthDays(){
      return RDate.monthDays(this.year, this.month);
   }

   //===========================================================
   // <T>取得当前的周的天数。</T>
   //
   // @method
   // @return Integer 天数
   //===========================================================
   MO.TDate_monthWeekDay = function TDate_monthWeekDay(){
      return (8 - (this.day - this.weekDay()) % 7) % 7;
   }

   //===========================================================
   // <T>根据当前时间，数显时间变量。<T>
   //
   // @method
   //===========================================================
   MO.TDate_refresh = function TDate_refresh(){
      var o = this;
      var date = o.date;
      if(date){
         o.year = date.getFullYear();
         o.month = date.getMonth() + 1;
         o.day = date.getDate();
         o.hour = date.getHours();
         o.minute = date.getMinutes();
         o.second = date.getSeconds();
         o.ms = date.getMilliseconds();
      }
   }

   //===========================================================
   // <T>取得当前周的天数。</T>
   //
   // @method
   // @return Integer 天数
   //===========================================================
   MO.TDate_weekDay = function TDate_weekDay(){
      return this.date.getDay();
   }

   //===========================================================
   // <T>设置年。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   MO.TDate_setYear = function TDate_setYear(value){
      var o = this;
      o.date.setFullYear(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置月。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   MO.TDate_setMonth = function TDate_setMonth(value){
      var o = this;
      o.date.setMonth(parseInt(value, 10) - 1);
      o.refresh();
   }

   //===========================================================
   // <T>设置天。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   MO.TDate_setDay = function TDate_setDay(value){
      var o = this;
      o.date.setDate(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置小时。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   MO.TDate_setHour = function TDate_setHour(value){
      var o = this;
      o.date.setHours(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置分钟。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   MO.TDate_setMinute = function TDate_setMinute(value){
      var o = this;
      o.date.setMinutes(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置秒。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   MO.TDate_setSecond = function TDate_setSecond(value){
      var o = this;
      o.date.setSeconds(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置时间，并改变相应的时间变量。<T>
   //
   // @method
   // @param value:Date 日期对象
   //===========================================================
   MO.TDate_setDate = function TDate_setDate(value){
      var o = this;
      o.date = value;
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的年数。</T>
   //
   // @method
   // @param value:Integer 年数
   //===========================================================
   MO.TDate_addYear = function TDate_addYear(value){
      var o = this;
      o.date.setFullYear(o.date.getFullYear() + parseInt(value));
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的月数。<T>
   //
   // @method
   // @param value:Integer 月数
   //===========================================================
   MO.TDate_addMonth = function TDate_addMonth(value){
      var o = this;
      o.date.setMonth(o.date.getMonth() + parseInt(value));
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的天数。<T>
   //
   // @method
   // @param value:Integer 天数
   //===========================================================
   MO.TDate_addDay = function TDate_addDay(value){
      var o = this;
      o.date.setTime(o.date.getTime() + parseInt(value) * 1000 * 60 * 60 * 24);
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的秒数。<T>
   //
   // @method
   // @param value:Integer 秒数
   //===========================================================
   MO.TDate_addMseconds = function TDate_addMseconds(value){
      var o = this;
      o.date.setTime(o.date.getTime() + parseInt(value));
      o.refresh();
   }

   //===========================================================
   // <T>设定为当前时间。<T>
   //
   // @method
   //===========================================================
   MO.TDate_now = function TDate_now(){
      var o = this;
      o.date = new Date();
      o.refresh();
   }

   //===========================================================
   // <T>根据格式解析时间字符串。</T>
   //
   // @method
   // @param value:String 字符串
   // @param format:String 格式
   //===========================================================
   MO.TDate_parse = function TDate_parse(value, format){
      return RDate.parse(this, value, format);
   }

   //===========================================================
   // <T>根据格式解析时间字符串。</T>
   //
   // @method
   // @param value:String 字符串
   //===========================================================
   MO.TDate_parseAuto = function TDate_parseAuto(value){
      return RDate.autoParse(this, value);
   }

   //===========================================================
   // <T>根据指定格式格式化时间。</T>
   //
   // @method
   // @param format 格式
   // @return String 字符串
   //===========================================================
   MO.TDate_format = function TDate_format(format){
      return RDate.formatDate(this, format);
   }

   //===========================================================
   // <T>复制当前对象为新对象。</T>
   //
   // @method
   // @return TDate 时间
   //===========================================================
   MO.TDate_clone = function TDate_clone(){
      var value = new Date();
      value.setTime(this.date.getTime());
      return new TDate(value);
   }

   //===========================================================
   // <T>获得运行时字符串。</T>
   //
   // @method
   // @return String 字符串
   //===========================================================
   MO.TDate_dump = function TDate_dump(){
      return RClass.dump(this) + ' ' + RDate.formatDate(this);
   }
}
