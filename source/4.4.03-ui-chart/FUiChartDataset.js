//==========================================================
// <T>图表数据集。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FUiChartDataset = function FUiChartDataset(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._serieses                = MO.Class.register(o, new MO.AGetter('_serieses'));
   //..........................................................
   // @method
   o.construct                = MO.FUiChartDataset_construct;
   // @method
   o.push                     = MO.FUiChartDataset_push;
   // @method
   o.maxValue                 = MO.FUiChartDataset_maxValue;
   o.minValue                 = MO.FUiChartDataset_minValue;
   o.standardCor              = MO.FUiChartDataset_standardCor;
   // @method
   o.dispose                  = MO.FUiChartDataset_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_construct = function FUiChartDataset_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 配置属性
   o._serieses = new MO.TObjects();
}

//==========================================================
// <T>插入数据。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_push = function FUiChartDataset_push(data) {
   var o = this;
   data.setDataset(o);
   o._serieses.push(data);
}

//==========================================================
// <T>获取数据最大值。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_maxValue = function FUiChartDataset_maxValue() { 
   var o = this;
   var serieses = o._serieses;
   var count = serieses.count();
   var result = Number.NEGATIVE_INFINITY;
   for(var i = 0; i < count; ++i) {
      var series = serieses.get(i);
      var values = series.values();
      var valueCount = values.count();
      for (var v = 0; v < valueCount; ++v) { 
         var value = values.get(v);
         result = result < value ? value : result;
      }
   }
   return result;
}

//==========================================================
// <T>获取数据最小值。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_minValue = function FUiChartDataset_minValue() { 
   var o = this;
   var serieses = o._serieses;
   var count = serieses.count();
   var result = Number.POSITIVE_INFINITY;
   for(var i = 0; i < count; ++i) {
      var series = serieses.get(i);
      var values = series.values();
      var valueCount = values.count();
      for (var v = 0; v < valueCount; ++v) { 
         var value = values.get(v);
         result = result > value ? value : result;
      }
   }
   return result;
}

//==========================================================
// <T>标准化刻度。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_standardCor = function FUiChartDataset_standardCor(corCount) {
   var o = this;
   var result = new MO.TArray();
   var corMax = o.maxValue();
   var corMin = o.minValue();
   var corNumber = corCount;
   var corStep = (corMax - corMin) / corNumber;
   var temp, tmpStep, tmpNumber, extraNumber;
   if(Math.pow(10, parseInt(Math.log(corStep) / Math.log(10))) == corStep) {
      temp = Math.pow(10, parseInt(Math.log(corStep) / Math.log(10)));
   }else {
      temp = Math.pow(10, (parseInt(Math.log(corStep) / Math.log(10)) + 1));
   }
   tmpStep = (corStep / temp).toFixed(6);
   //选取规范步长
   if(tmpStep >= 0 && tmpStep <= 0.1) {
      tmpStep = 0.1;
   }else if ( tmpStep >= 0.100001 && tmpStep <= 0.2) {
      tmpStep = 0.2;
   }else if ( tmpStep >= 0.200001 && tmpStep <= 0.25) {
      tmpStep = 0.25;
   }else if ( tmpStep >= 0.250001 && tmpStep <= 0.5) {
      tmpStep = 0.5;
   }else {
      tmpStep = 1;
   }
   tmpStep = tmpStep * temp;
   if(parseInt(corMin / tmpStep) != (corMin / tmpStep)) {
      if(corMin < 0) {
         corMin = (-1) * Math.ceil(Math.abs(corMin / tmpStep)) * tmpStep;
      }else {
         corMin = parseInt(Math.abs(corMin / tmpStep)) * tmpStep;
      }
   }
   if(parseInt(corMax / tmpStep) != (corMax / tmpStep)) {
      corMax = parseInt(corMax / tmpStep + 1) * tmpStep;
   }
   tmpNumber = (corMax - corMin) / tmpStep;
   if(tmpNumber < corNumber) {
      extraNumber = corNumber - tmpNumber;
      tmpNumber = corNumber;
      if(extraNumber % 2 == 0) {
         corMax = corMax + tmpStep * parseInt(extraNumber / 2);
      }else {
         corMax = corMax + tmpStep * parseInt(extraNumber / 2 + 1);
      }
      corMin = corMin - tmpStep * parseInt(extraNumber / 2);
   }
   corNumber = tmpNumber;
   return [corMax, corMin, corNumber];
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_dispose = function FUiChartDataset_dispose(){
   var o = this;
   // 释放属性
   o._serieses = MO.Lang.Object.dispose(o._serieses);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
