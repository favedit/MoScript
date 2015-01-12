//===========================================================
// 日期时间的工具类
//
// @tool
// @author maochunyang
// @version 1.0.1
//===========================================================
function TDate(date){
   var o = this;
   // Attribute
   o.date         = date ? date : new Date();
   o.year         = null;
   o.month        = null;
   o.day          = null;
   o.hour         = null;
   o.minute       = null;
   o.second       = null;
   o.ms           = null;
   // Method
   o.equals       = TDate_equals;
   o.isBefore     = TDate_isBefore;
   o.isAfter      = TDate_isAfter;
   o.monthDays    = TDate_monthDays;
   o.monthWeekDay = TDate_monthWeekDay;
   o.weekDay      = TDate_weekDay;
   o.setYear      = TDate_setYear;
   o.setMonth     = TDate_setMonth;
   o.setDay       = TDate_setDay;
   o.setHour      = TDate_setHour;
   o.setMinute    = TDate_setMinute;
   o.setSecond    = TDate_setSecond;
   o.addYear      = TDate_addYear;
   o.addMonth     = TDate_addMonth;
   o.addDay       = TDate_addDay;
   o.addMseconds  = TDate_addMseconds;
   o.refresh      = TDate_refresh;
   o.setDate      = TDate_setDate;
   o.now          = TDate_now;
   o.clone        = TDate_clone;
   o.dump         = TDate_dump;
   // Construct
   o.refresh();
   return o;
}

function TDate_clone(){
   var d = new Date();
   d.setTime(this.date.getTime());
   return new TDate(d);
}
function TDate_equals(d){
   return this.date.getTime() == d.date.getTime();
}
function TDate_isBefore(d){
   return this.date.getTime() < d.date.getTime();
}
function TDate_isAfter(d){
   return this.date.getTime() > d.date.getTime();
}

//===========================================================
// 取得指定年月的天数
//
// @method
// @see RDate.monthDays
// @return Object 返回创建的img对象
//===========================================================
function TDate_monthDays(){
   return RDate.monthDays(this.year, this.month);
}

//===========================================================
// 取得指定指定年月的天数
//
// @method
// @param parent:parent:HTML html容器
// @param path:path:String 图片的存放路径
// @param css:css:String 显示的样式表
// @param width:width:Integer 图片的显示宽度
// @param height:height:Integer 图片的显示宽度
// @see RBuilder_newImage
// @return Object 返回创建的img对象
//===========================================================
function TDate_monthWeekDay(){
   return (8-(this.day-this.weekDay())%7)%7;
}

//===========================================================
// 取得指定指定年月的天数
//
// @method
// @param parent:parent:HTML html容器
// @param path:path:String 图片的存放路径
// @param css:css:String 显示的样式表
// @param width:width:Integer 图片的显示宽度
// @param height:height:Integer 图片的显示宽度
// @see RBuilder_newImage
// @return Object 返回创建的img对象
//===========================================================
function TDate_weekDay(){
   return this.date.getDay();
}

//===========================================================
// 取得指定指定年月的天数
//
// @method
// @param parent:parent:HTML html容器
// @param path:path:String 图片的存放路径
// @param css:css:String 显示的样式表
// @param width:width:Integer 图片的显示宽度
// @param height:height:Integer 图片的显示宽度
// @see RBuilder_newImage
// @return Object 返回创建的img对象
//===========================================================
function TDate_setYear(n){
   this.date.setFullYear(n);
   this.refresh();
}

//===========================================================
// 取得指定指定年月的天数
//
// @method
// @param parent:parent:HTML html容器
// @param path:path:String 图片的存放路径
// @param css:css:String 显示的样式表
// @param width:width:Integer 图片的显示宽度
// @param height:height:Integer 图片的显示宽度
// @see RBuilder_newImage
// @return Object 返回创建的img对象
//===========================================================
function TDate_setMonth(n){
   this.date.setMonth(parseInt(n, 10)-1);
   this.refresh();
}

//===========================================================
// 取得指定指定年月的天数
//
// @method
// @param parent:parent:HTML html容器
// @param path:path:String 图片的存放路径
// @param css:css:String 显示的样式表
// @param width:width:Integer 图片的显示宽度
// @param height:height:Integer 图片的显示宽度
// @see RBuilder_newImage
// @return Object 返回创建的img对象
//===========================================================
function TDate_setDay(n){
   this.date.setDate(n);
   this.refresh();
}

function TDate_setHour(n){
   this.date.setHours(n);
   this.refresh();
}
function TDate_setMinute(n){
   this.date.setMinutes(n);
   this.refresh();
}
function TDate_setSecond(n){
   this.date.setSeconds(n);
   this.refresh();
}


//===========================================================
// 取得指定指定年月的天数
//
// @method
// @param parent:parent:HTML html容器
// @param path:path:String 图片的存放路径
// @param css:css:String 显示的样式表
// @param width:width:Integer 图片的显示宽度
// @param height:height:Integer 图片的显示宽度
// @see RBuilder_newImage
// @return Object 返回创建的img对象
//===========================================================
function TDate_addYear(n){
   this.date.setFullYear(this.date.getFullYear()+parseInt(n));
   this.refresh();
}

//===========================================================
// 取得指定指定年月的天数
//
// @method
// @param parent:parent:HTML html容器
// @param path:path:String 图片的存放路径
// @param css:css:String 显示的样式表
// @param width:width:Integer 图片的显示宽度
// @param height:height:Integer 图片的显示宽度
// @see RBuilder_newImage
// @return Object 返回创建的img对象
//===========================================================
function TDate_addMonth(n){
   this.date.setMonth(this.date.getMonth()+parseInt(n));
   this.refresh();
}
// ------------------------------------------------------------
function TDate_addDay(n){
   this.date.setTime(this.date.getTime()+parseInt(n)*1000*60*60*24);
   this.refresh();
}
//------------------------------------------------------------
function TDate_addMseconds(n){
   this.date.setTime(this.date.getTime()+parseInt(n));
   this.refresh();
}
//===========================================================
// 取得当前时间，并改变相应的时间变量
//
// @method
//===========================================================
function TDate_refresh(){
   var o = this;
   var d = o.date;
   if(d){
      o.year = d.getFullYear();
      o.month = d.getMonth() + 1;
      o.day = d.getDate();
      o.hour = d.getHours();
      o.minute = d.getMinutes();
      o.second = d.getSeconds();
      o.ms = d.getMilliseconds();
   }
}
//===========================================================
// 设置时间，并改变相应的时间变量
//
// @method
// @param d:date:Date 日期对象
// @see TDate.refresh
//===========================================================
function TDate_setDate(d){
   var o = this;
   o.date = d;
   o.refresh();
}

//===========================================================
// 取得当前时间，并改变相应的时间变量
//
// @method
// @see TDate.refresh
//===========================================================
function TDate_now(){
   var o = this;
   o.date = new Date();
   o.refresh();
}

//===========================================================
// 打印对象内部的信息???
//
// @method
// @param d:date:Date 日期对象
// @see TDate.refresh
//===========================================================
function TDate_dump(){
   return RClass.dump(this) + ' ' + RDate.formatDate(this);
}

