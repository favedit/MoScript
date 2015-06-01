//==========================================================
// <T>日历选取编辑管理接口。</T>
//
// @class MValidator
// @history 091105 MAOCY 创建
//==========================================================
function MDescCalendar(o){
   o = RClass.inherits(this, o, MValidator);
   //..........................................................
   // @process
   o.oeValid     = MDescCalendar_oeValid;
   //..........................................................
   // @method
   o.formatValue = MDescCalendar_formatValue;
   o.formatText  = MDescCalendar_formatText;
   return o;
}

//==========================================================
// <T>校验处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MDescCalendar_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   // 判断是否需要检查
   if(o._visible && o._validable){
      var t = o.text();
      // 必须性检查
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      // 格式检查
      if(!RValidator.validDate(o, t)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}

//==========================================================
// <T>格式化文本内容到数据内容。</T>
//
// @method
// @param t:text:String 文本内容
// @return String 文本内容
//==========================================================
function MDescCalendar_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o.date.now();
         return RDate.formatDate(o.date);
      }else{
         RDate.autoParse(o.date, t);      
         return RDate.formatDate(o.date);
      }
   }
   return RString.nvl(t);
}

//==========================================================
// <T>格式化数据内容到文本内容。</T>
//
// @method
// @param v:value:String 数据内容
// @return String 文本内容
//==========================================================
function MDescCalendar_formatText(v){
   if(v){
      var o = this;
      RDate.autoParse(o.date, v);
      return RDate.formatDate(o.date, o.editFormat);
   }
   return RString.nvl(v);
}
