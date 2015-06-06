with(MO){
   //===========================================================
   // 日期时间的操作类
   //
   // @reference
   // @author maochunyang
   // @version 1.0.1
   //===========================================================
   MO.RDate = function RDate(){
      var o = this;
      //..........................................................
      // @constant
      o.MinYear       = 1800;
      o.MaxYear       = 2400;
      o.Pattern       = 'n-: /';
      o.Chars         = '0123456789-:/';
      o.DisplayFormat = 'yyyy-mm-dd hh24:mi:ss';
      o.DataFormat    = 'yyyymmddhh24miss';
      o.MonthDays     = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
      o.DaySeconds    = 1000// 60// 60// 24;
      o.Parts         = new Array('YYYY','MM','DD','HH24','MI','SS');
      o.PartsDefine   = {'YYYY':['Year',4],'MM':['Month',2],'DD':['Day',2],'HH24':['Hour',2],'MI':['Minute',2],'SS':['Second',2]};
      return o;
   }

   //===========================================================
   // 生成一个日期对象
   //
   // @method
   // @param o:object:Object 日期对象
   // @param r:right:Integer 第二个对象的索引值
   //===========================================================
   MO.RDate.prototype.nvl = function RDate_nvl(o){
      return o ? o : new TDate();
   }

   MO.RDate.prototype.make = function RDate_make(yyyy, mm, dd, hh, mi, ss){
      return new TDate(new Date(yyyy, mm, dd));
   }

   //===========================================================
   // 以某个格式格式化时间日期对象
   //
   // @method
   // @param fmt:format:String 格式化模板
   // @see TDate.formatDate
   //===========================================================
   MO.RDate.prototype.format = function RDate_format(fmt){
      return this.formatDate(new TDate(), fmt);
   }

   //===========================================================
   //以某个格式格式化时间日期对象
   //
   //@method
   //@param fmt:format:String 格式化模板
   //@see TDate.formatDate
   //===========================================================
   MO.RDate.prototype.formatText = function RDate_formatText(v, f){
      if(!v){
         return false;
      }
      f = f.toLowerCase();
      // 替换年份
      f = f.replace(/yyyy/g, v.substring(0, 4));
      v = v.substring(4);
      // 替换月份
      f = f.replace(/mm/g, v.substring(0, 2));
      v = v.substring(2);
      // 替换天
      f = f.replace(/dd/g, v.substring(0, 2));
      v = v.substring(2);
      // 替换小时
      f = f.replace(/hh24/g, v.substring(0, 4));
      v = v.substring(4);
      f = f.replace(/mi/g, v.substring(0, 2));
      v = v.substring(2);
      f = f.replace(/ss/g, v.substring(0, 2));
      v = v.substring(2);
      return f;
   }

   //===========================================================
   // 以某个格式格式化时间日期对象
   //
   // @method
   // @param fmt:format:String 格式化模板
   // 
   //===========================================================
   MO.RDate.prototype.formatDate = function RDate_formatDate(date, fmt){
      if(!date){return '';}
      fmt = fmt ? fmt.toLowerCase() : this.DataFormat;
      fmt = fmt.replace(/yyyy/g, RInteger.format(date.year, 4));
      fmt = fmt.replace(/yy/g, RInteger.format(date.year%100, 2));
      fmt = fmt.replace(/mm/g, RInteger.format(date.month, 2));
      fmt = fmt.replace(/dd/g, RInteger.format(date.day, 2));
      fmt = fmt.replace(/hh24/g, RInteger.format(date.hour, 2));
      fmt = fmt.replace(/mi/g, RInteger.format(date.minute, 2));
      fmt = fmt.replace(/ss/g, RInteger.format(date.second, 2));
      fmt = fmt.replace(/ms/g, RInteger.format(date.ms, 3));
      return fmt;
   }

   //===========================================================
   // 以某个格式格式化时间日期对象
   //
   // @method
   // @param fmt:format:String 格式化模板
   // 
   //===========================================================
   MO.RDate.prototype.monthDays = function RDate_monthDays(year, month){
      if(!year || !month){return 0;}
      year = parseInt(year);
      month = parseInt(month);
      this.MonthDays[2] = (((year%4 == 0) || (year%400 == 0)) && (year%100 != 0)) ? 29 : 28 ;
      return this.MonthDays[month];
   }

   //===========================================================
   // 以某个格式格式化时间日期对象
   //
   // @method
   // @param f:format:String 格式化模板
   // @param v:value:String 时间字符串
   // @return String 返回格式化后的字符串
   //===========================================================
   MO.RDate.prototype.splitFormat = function RDate_splitFormat(v, f){
      if(!v){
         return false;
      }
      f = f.toLowerCase();
      var a = new Array();
      while(f.length > 0){
         if(f.indexOf('yyyy') == 0){
            a['year'] = v.substring(0, 4);
            f = f.substring(4);
            v = v.substring(4);
         }else if(f.indexOf('mm') == 0){
            a['month'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('dd') == 0){
            a['day'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('hh24') == 0){
            a['hour'] = v.substring(0, 2);
            f = f.substring(4);
            v = v.substring(2);
         }else if(f.indexOf('mi') == 0){
            a['minute'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('ss') == 0){
            a['second'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('ms') == 0){
            a['ms'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(3);
         }else{
            f = f.substring(1);
            v = v.substring(1);
         }
      }
      return a;
   }

   //===========================================================
   // 检查时间数字是否正确
   //
   // @method
   // @param items:items:String 检查的项目
   // @return boolean 
   //===========================================================
   MO.RDate.prototype.checkItems = function RDate_checkItems(items){
      if(!items){
         return false;
      }
      var year = RInteger.parse(items["year"]);
      if(year < this.MinYear || year > this.MaxYear){
         return false;
      }
      var month = RInteger.parse(items["month"]);
      if(month < 1 || month > 12){
         return false;
      }
      var day = RInteger.parse(items["day"]);
      if(day < 1 || day > this.monthDays(year, month)){
         return false;
      }
      var hour = RInteger.parse(items["hour"]);
      if(hour < 0 || hour > 23){
         return false;
      }
      var second = RInteger.parse(items["second"]);
      if(second < 0 || second > 59){
         return false;
      }
      var ms = RInteger.parse(items["ms"]);
      if(ms < 0 || ms > 99){
         return false;
      }
      return true;
   }

   //===========================================================
   // 检查时间数字是否正确
   //
   // @method
   // @param items:items:String 格式化项目
   // @param format:format:String 格式化字符串
   // @return boolean 
   //===========================================================
   MO.RDate.prototype.check = function RDate_check(value, format){
      return this.checkItems(this.splitFormat(value, format));
   }

   //===========================================================
   // 构造一个日期类型
   //
   // @method
   // @param date:date:Date ???
   // @param da:date:Date ???
   // @return TDate 返回日期时间
   //===========================================================
   MO.RDate.prototype.makeDate = function RDate_makeDate(date, da){
      var d = new Date(RInteger.parse(da.year), RInteger.parse(da.month)-1, RInteger.parse(da.day), RInteger.parse(da.hour), RInteger.parse(da.minute), RInteger.parse(da.second), RInteger.parse(da.ms));
      if(date){
         date.setDate(d);
         return date;
      }
      return new TDate(d);
   }

   //===========================================================
   // 用时间模板从一个时间类型解析一个时间对象
   //
   // @method
   // @param date:date:Date ???
   // @param value:value:Date ???
   // @return TDate 返回日期时间
   //===========================================================
   MO.RDate.prototype.parse = function RDate_parse(date, value, format){
      if(!format){
         format = this.DataFormat;
      }
      var items = this.splitFormat(value, format);
      if(this.checkItems(items)){
         return this.makeDate(date, items);
      }
      return null;
   }

   //===========================================================
   // 构造一个日期类型
   //
   // @method
   // @param da:date:Date ???
   // @param value:value:Date ???
   //===========================================================
   MO.RDate.prototype.splitDate = function RDate_splitDate(da, value){
      if(!value){ return; }
      var arDate = null;
      if(value.indexOf('-') != -1 || value.indexOf('/') != -1){
         if(value.indexOf('-') != -1){
            arDate = value.split('-');
         }else if(value.indexOf('/') != -1){
            arDate = value.split('/');
         }
         if(arDate.length >= 1){
            da.year = RInteger.parse(arDate[0]);
         }
         if(arDate.length >= 2){
            da.month = RInteger.parse(arDate[1]);
         }
         if(arDate.length >= 3){
            da.day = RInteger.parse(arDate[2]);
         }
      }else if(value.indexOf(':') != -1){
         this.splitTime(da, value);
      }else if(value.length == 14){
         da.year = RInteger.parse(value.substr(0, 4));
         da.month = RInteger.parse(value.substr(4, 2));
         da.day = RInteger.parse(value.substr(6, 2));
         da.hour = RInteger.parse(value.substr(8, 2));
         da.minute = RInteger.parse(value.substr(10, 2));
         da.second = RInteger.parse(value.substr(12, 2));
      }else if(value.length == 8){
         da.year = RInteger.parse(value.substr(0, 4));
         da.month = RInteger.parse(value.substr(4, 2));
         da.day = RInteger.parse(value.substr(6, 2));
      }else if(value.length == 6){
         da.year = RInteger.parse(value.substr(0, 4));
         da.month = RInteger.parse(value.substr(4, 2));
      }else if(value.length == 4){
         da.year = RInteger.parse(value);
      }
   }

   //===========================================================
   // ？？？
   //
   // @method
   // @param items:items:String 格式化项目
   // @param format:format:String 格式化字符串
   // @return boolean 
   //===========================================================
   MO.RDate.prototype.splitTime = function RDate_splitTime(da, value){
      if(!value){ return; }
      if(value.indexOf(':') != -1){
         var ar = value.split(':');
         if(ar.length >= 1){
            da.hour = RInteger.parse(ar[0]);
         }
         if(ar.length >= 2){
            da.minute = RInteger.parse(ar[1]);
         }
         if(ar.length >= 3){
            da.second = RInteger.parse(ar[2]);
         }
      }else if(value.length == 6){
         da.hour = RInteger.parse(value.substr(0, 2));
         da.minute = RInteger.parse(value.substr(2, 2));
         da.second = RInteger.parse(value.substr(4, 2));
      }else if(value.length == 4){
         da.hour = RInteger.parse(value.substr(0, 2));
         da.minute = RInteger.parse(value.substr(2, 2));
      }else if(value.length == 2){
         da.hour = RInteger.parse(value.substr(0, 2));
      }
   }

   //===========================================================
   // ？？？
   //
   // @method
   // @param items:items:String 格式化项目
   // @param format:format:String 格式化字符串
   // @return boolean 
   //===========================================================
   MO.RDate.prototype.autoParse = function RDate_autoParse(d, v){
      //debugger;
      if(!v){
         return null;
      }
      var o = this;
      d = o.nvl(d);
      var items = new Array();
      items['year'] = 2000;
      items['month'] = 1;
      items['day'] = 1;
      items['hour'] = 0;
      items['minute'] = 0;
      items['second'] = 0;
      v = RString.trim(v);
      if(v.indexOf(' ') == -1){
         o.splitDate(items, v);
      }else{
         var ar = v.split(' ');
         if(ar.length == 2){
            o.splitDate(items, ar[0]);
            o.splitTime(items, ar[1]);
         }
      }
      return o.checkItems(items) ? o.makeDate(d, items) : null ;
   }

   //===========================================================
   // ？？？
   //
   // @method
   // @return string 
   //===========================================================
   MO.RDate.prototype.getFormat = function RDate_getFormat(value){
      var o = this;
      var da = new Object();
      var f = '';
      var v = '';
      if(!value){ return; }
      // 有时间
      if(value.indexOf(':') != -1){
         var as = RString.split(value, ' ');
         // 只有时间
         if(as.length == 1){
            var as1 = RString.split(as[0], ':');
            if(as1.length == 1){
               f += 'HH24';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else{
                  v += as1[0];
               }
            }else if(as1.length == 2){
               f += 'HH24MI';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
            }else if(as1.length == 3){
               f += 'HH24MISS';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
               if(as1[2].length == 1){
                  v += ('0'+as1[2]);
               }else if(as1[2].length == 2){
                  v += as1[2];
               }
            }
         // 有年月日和时间
         }else if(as.length == 2){
            // 年月日
            var as0 = RString.split(as[0], '-');
            if(as0.length == 3){
               f += 'YYYYMMDD';
               if(as0[0].length == 4){
                  v += as0[0];
               }
               if(as0[1].length == 1){
                  v += ('0'+as0[1]);
               }else if(as0[1].length == 2){
                  v += as0[1];
               }
               if(as0[2].length == 1){
                  v += ('0'+as0[2]);
               }else if(as0[2].length == 2){
                  v += as0[2];
               }
            }else if(as0.length == 2){
               f += 'YYYYMM';
               if(as0[0].length == 1){
                  v += as0[0];
               }
               if(as0[1].length == 1){
                  v += ('0'+as0[1]);
               }else if(as0[1].length == 2){
                  v += as0[1];
               }
            }else if(as0.length == 1){
               f += 'YYYY';
               if(as0[0].length == 4){
                  v += as0[0];
               }
            }
            // 时间
            var as1 = RString.split(as[1], ':');
            if(as1.length == 1){
               f += 'HH24';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else{
                  v += as1[0];
               }
            }else if(as1.length == 2){
               f += 'HH24MI';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
            }else if(as1.length == 3){
               f += ' HH24MISS';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
               if(as1[2].length == 1){
                  v += ('0'+as1[2]);
               }else if(as1[2].length == 2){
                  v += as1[2];
               }
            }
         }
      // 只有年月日
      }else{
         var as = RString.split(value, '-');
         if(as.length == 3){
            f += 'YYYYMMDD';
            if(as[0].length == 4){
               v += as[0];
            }
            if(as[1].length == 1){
               v += ('0'+as[1]);
            }else if(as[1].length == 2){
               v += as[1];
            }
            if(as[2].length == 1){
               v += ('0'+as[2]);
            }else if(as[2].length == 2){
               v += as[2];
            }
         }else if(as.length == 2){
            f = 'YYYYMM';
            if(as[0].length == 4){
               v += as[0];
            }
            if(as[1].length == 1){
               v += ('0'+as[1]);
            }else if(as[1].length == 2){
               v += as[1];
            }
         }else if(as.length == 1){
            f += 'YYYY';
            if(as[0].length == 4){
               v += as[0];
            }
         }
      }
      var ar = new Array(2);
      ar[0] = f;
      ar[1] = v;
      return ar;
   }
   //..........................................................
   // 实例化内容
   MO.RDate = new RDate();
}
