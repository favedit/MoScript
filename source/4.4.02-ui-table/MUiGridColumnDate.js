//==========================================================
// <T>表格时间列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridColumnDate = function MUiGridColumnDate(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._dateFormat = MO.Class.register(o, new MO.AGetSet('_dateFormat'), 'YYYY/MM/DD HH24:MI:SS');
   // @attribute
   o._dateValue  = null;
   //..........................................................
   // @method
   o.construct   = MO.MUiGridColumnDate_construct;
   // @method
   o.formatText  = MO.MUiGridColumnDate_formatText;
   // @method
   o.dispose     = MO.MUiGridColumnDate_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnDate_construct = function MUiGridColumnDate_construct(){
   var o = this;
   o._dateValue = new MO.TDate();
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return 文本
//==========================================================
MO.MUiGridColumnDate_formatText = function MUiGridColumnDate_formatText(value){
   var o = this;
   var date = o._dateValue;
   date.parse(value);
   return date.format(o._dateFormat);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnDate_dispose = function MUiGridColumnDate_dispose(){
   var o = this;
   o._dateValue = MO.Lang.Object.dispose(o._dateValue);
}
