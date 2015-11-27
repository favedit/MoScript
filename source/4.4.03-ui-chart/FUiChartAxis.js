//==========================================================
// <T>图表轴。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FUiChartAxis = function FUiChartAxis(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._degrees                 = MO.Class.register(o, new MO.AGetter('_degrees'));
   // @attribute
   o._optionShowAxis          = MO.Class.register(o, new MO.AGetSet('_optionShowAxis'), true);
   o._optionShowLabel         = MO.Class.register(o, new MO.AGetSet('_optionShowLabel'), true);
   o._font                    = MO.Class.register(o, new MO.AGetter('_font'));
   o._lineWidth               = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);;
   o._lineColor               = MO.Class.register(o, new MO.AGetSet('_lineColor'), '#FFFFFF');
   o._divisor                 = MO.Class.register(o, new MO.AGetSet('_divisor'), 1);
   //..........................................................
   // @method
   o.construct                = MO.FUiChartAxis_construct;
   // @method
   o.pushDegree               = MO.FUiChartAxis_pushDegree;
   o.createDegrees            = MO.FUiChartAxis_createDegrees;
   o.createDegreesStandard    = MO.FUiChartAxis_createDegreesStandard;
   o.findDegreeByValue        = MO.FUiChartAxis_findDegreeByValue;
   o.formatLabels             = MO.FUiChartAxis_formatLabels;
   // @method
   o.dispose                  = MO.FUiChartAxis_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_construct = function FUiChartAxis_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 配置属性
   o._degrees = new MO.TObjects();
   o._font = new MO.SUiFont();
}

//==========================================================
// <T>插入degree。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_pushDegree = function FUiChartAxis_pushDegree(degree) {
   var o = this;
   degree.setAxis
   o._degrees.push(degree);
}

//==========================================================
// <T>批量插入degree。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_createDegrees = function FUiChartAxis_createDegrees(count) { 
   var o = this;
   for(var i = 0; i < count; ++i) {
      var degree = MO.Class.create(MO.FUiChartAxisDegree);
      degree.setValue(i + 1);
      o._degrees.push(degree);
   }
}

//==========================================================
// <T>批量插入标准化degree。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_createDegreesStandard = function FUiChartAxis_createDegreesStandard(data) {
   var o = this;
   var max = data[0];
   var min = data[1];
   var cor = data[2];
   o._degrees.clear();
   var step = (max - min) / cor;
   for( var i = 0; i <= cor; ++i) {
      var degree = MO.Class.create(MO.FUiChartAxisDegree);
      var value = min + step * i;
      degree.setValue(value);
      o._degrees.push(degree);
   }
}

//==========================================================
// <T>查询degree。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_findDegreeByValue = function FUiChartAxis_findDegreeByValue(value) {
   var o = this;
   var result;
   var degrees = o._degrees;
   var count = degrees.count();
   while(--count > -1) {
      var degree = degrees.get(count);
      if(degree.value() == value) {
         result = degree;
         break;
      }
   }
   return result;
}

//==========================================================
// <T>由_divisor及value格式化label。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_formatLabels = function FUiChartAxis_formatLabels() {
   var o = this;
   var degrees = o._degrees;
   var count = degrees.count();
   for(var i = 0; i < count; ++i) {
      var degree = degrees.get(i);
      var value = degree.value();
      degree.setLabel((value / o._divisor).toFixed().toString());
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_dispose = function FUiChartAxis_dispose(){
   var o = this;
   // 释放属性
   o._degrees = MO.Lang.Object.dispose(o._degrees);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
