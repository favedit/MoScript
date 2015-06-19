//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code      = MO.EEaiScene.ChartHistory;
   //..........................................................
   // @event
   o.onLoadData = MO.FEaiChartHistoryScene_onLoadData;
   //..........................................................
   // @method
   o.setup      = MO.FEaiChartHistoryScene_setup;
   // @method
   o.active     = MO.FEaiChartHistoryScene_active;
   o.deactive   = MO.FEaiChartHistoryScene_deactive;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   // 构建画面
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   // 放入城市
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get('20150616');
   var cityDatas = dateData.citys();
   var citys = cityConsole.citys();
   var count = citys.count();
   for(var i = 0; i < count; i++){
      var city = citys.at(i);
      var data = cityDatas.get(city.code());
      var bitmapData = context.createObject(MO.FE3dBitmapData);
      bitmapData.loadUrl('../ars/eai/dot.png');
      var bitmap = context.createObject(MO.FE3dBitmap);
      bitmap.setData(bitmapData);
      var material = bitmap.material();
      material.info().optionAlpha = true;
      var range = 1;
      if(data){
         var total = data.investmentTotal() / 10000000;
         range = total / 2;
         if(total > 1){
            total = 1;
         }
         material.info().ambientColor.set(total + 0.1, 0, total + 0.1, 1);
         //console.log(i);
      }else{
         material.info().ambientColor.set(0, 0, 0, 1);
      }
      if(range < 1){
         range = 1;
      }
      if(range > 2){
         range = 2;
      }
      var matrix = bitmap.matrix();
      matrix.tx = city.location().x * 0.2 - 20.3 + (0.2 * range / 2);
      matrix.ty = city.location().y * 0.25 - 8 + (0.2 * range / 2);
      matrix.tz = -0.0001;
      matrix.sx = 0.2 * range;
      matrix.sy = 0.2 * range;
      matrix.sz = 0.2 * range;
      matrix.update();
      dataLayer.pushRenderable(bitmap);
   }
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup(){
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
