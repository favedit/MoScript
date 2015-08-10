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
   o.equals       = MO.TDate_equals;
   // @method
   o.isBefore     = MO.TDate_isBefore;
   o.isAfter      = MO.TDate_isAfter;
   // @method
   o.monthDays    = MO.TDate_monthDays;
   o.monthWeekDay = MO.TDate_monthWeekDay;
   o.weekDay      = MO.TDate_weekDay;
   o.totalSecond  = MO.TDate_totalSecond;
   o.daySecond    = MO.TDate_daySecond;
   // @method
   o.assign       = MO.TDate_assign;
   o.refresh      = MO.TDate_refresh;
   o.setYear      = MO.TDate_setYear;
   o.setMonth     = MO.TDate_setMonth;
   o.setDay       = MO.TDate_setDay;
   o.setHour      = MO.TDate_setHour;
   o.setMinute    = MO.TDate_setMinute;
   o.setSecond    = MO.TDate_setSecond;
   o.setDate      = MO.TDate_setDate;
   o.setNow       = MO.TDate_setNow;
   // @method
   o.addYear      = MO.TDate_addYear;
   o.addMonth     = MO.TDate_addMonth;
   o.addDay       = MO.TDate_addDay;
   o.addHour      = MO.TDate_addHour;
   o.addMinute    = MO.TDate_addMinute;
   o.addSecond    = MO.TDate_addSecond;
   o.add          = MO.TDate_add;
   // @method
   o.truncDay     = MO.TDate_truncDay;
   o.truncHour    = MO.TDate_truncHour;
   o.truncMinute  = MO.TDate_truncMinute;
   o.truncSecond  = MO.TDate_truncSecond;
   o.trunc        = MO.TDate_trunc;
   // @method
   o.get          = MO.TDate_get;
   o.set          = MO.TDate_set;
   o.parse        = MO.TDate_parse;
   o.parseAuto    = MO.TDate_parseAuto;
   o.format       = MO.TDate_format;
   // @method
   o.clone        = MO.TDate_clone;
   o.dump         = MO.TDate_dump;
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
// <T>接收数据。<T>
//
// @method
//===========================================================
MO.TDate_assign = function TDate_assign(value){
   var o = this;
   o.date.setTime(value.date.getTime());
   o.refresh();
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
// <T>取得总秒数。</T>
//
// @method
// @return Integer 总秒数
//===========================================================
MO.TDate_totalSecond = function TDate_totalSecond(){
   return parseInt(this.date.getTime() / 1000);
}

//===========================================================
// <T>取得当日秒数。</T>
//
// @method
// @return Integer 秒数
//===========================================================
MO.TDate_daySecond = function TDate_daySecond(){
   var o = this;
   return o.hour * 3600 + o.minute * 60 + o.second;
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
// <T>设定为当前时间。<T>
//
// @method
//===========================================================
MO.TDate_setNow = function TDate_setNow(){
   var o = this;
   o.date = new Date();
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
   var year = o.date.getFullYear();
   o.date.setFullYear(year + MO.Lang.Integer.nvl(value, 1));
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
   var month = o.date.getMonth();
   o.date.setMonth(month + MO.Lang.Integer.nvl(value, 1));
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
   var time = o.date.getTime();
   var tick = time + (1000 * 60 * 60 * 24 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>增加指定的小时。<T>
//
// @method
// @param value:Integer 小时
//===========================================================
MO.TDate_addHour = function TDate_addHour(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + (1000 * 60 * 60 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>增加指定的分钟。<T>
//
// @method
// @param value:Integer 分钟
//===========================================================
MO.TDate_addMinute = function TDate_addMinute(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + (1000 * 60 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>增加指定的秒数。<T>
//
// @method
// @param value:Integer 秒数
//===========================================================
MO.TDate_addSecond = function TDate_addSecond(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + (1000 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>增加指定的毫秒。<T>
//
// @method
// @param value:Integer 毫秒数
//===========================================================
MO.TDate_add = function TDate_add(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + MO.Lang.Integer.nvl(value, 1);
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>截取掉天时间。<T>
//
// @method
// @param value:Integer 天数
//===========================================================
MO.TDate_truncDay = function TDate_truncDay(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * 60 * 60 * 24 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>截取掉小时时间。<T>
//
// @method
// @param value:Integer 小时数
//===========================================================
MO.TDate_truncHour = function TDate_truncHour(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * 60 * 60 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>截取掉分钟时间。<T>
//
// @method
// @param value:Integer 分钟数
//===========================================================
MO.TDate_truncMinute = function TDate_truncMinute(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * 60 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>截取掉秒时间。<T>
//
// @method
// @param value:Integer 秒数
//===========================================================
MO.TDate_truncSecond = function TDate_truncSecond(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>截取掉毫秒时间。<T>
//
// @method
// @param value:Integer 毫秒数
//===========================================================
MO.TDate_trunc = function TDate_trunc(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}

//===========================================================
// <T>获得数据。<T>
//
// @method
// @return Integer 数据
//===========================================================
MO.TDate_get = function TDate_get(value){
   return this.date.getTime();
}

//===========================================================
// <T>设置数据。<T>
//
// @method
// @param value:Integer 数据
//===========================================================
MO.TDate_set = function TDate_set(value){
   var o = this;
   o.date.setTime(value);
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
   return MO.Lang.Date.parse(this, value, format);
}

//===========================================================
// <T>根据格式解析时间字符串。</T>
//
// @method
// @param value:String 字符串
//===========================================================
MO.TDate_parseAuto = function TDate_parseAuto(value){
   return MO.Lang.Date.autoParse(this, value);
}

//===========================================================
// <T>根据指定格式格式化时间。</T>
//
// @method
// @param format 格式
// @return String 字符串
//===========================================================
MO.TDate_format = function TDate_format(format){
   return MO.Lang.Date.formatDate(this, format);
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
   return new MO.TDate(value);
}

//===========================================================
// <T>获得运行时字符串。</T>
//
// @method
// @return String 字符串
//===========================================================
MO.TDate_dump = function TDate_dump(){
   return MO.Class.dump(this) + ' ' + MO.Lang.Date.formatDate(this);
}
