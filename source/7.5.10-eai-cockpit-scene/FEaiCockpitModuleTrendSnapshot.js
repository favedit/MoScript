//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 151101
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot = function FEaiCockpitModuleTrendSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitModuleTrendSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleTrendSnapshot_onPaintBegin;
   o.onFetch               = MO.FEaiCockpitModuleTrendSnapshot_onFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleTrendSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleTrendSnapshot_setup;
   o.setData               = MO.FEaiCockpitModuleTrendSnapshot_setData;
   o.drawLine              = MO.FEaiCockpitModuleTrendSnapshot_drawLine;
   o.processLogic          = MO.FEaiCockpitModuleTrendSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitModuleTrendSnapshot_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_onImageLoad = function FEaiCockpitModuleTrendSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_onPaintBegin = function FEaiCockpitModuleTrendSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
   graphic.drawRectangleImage(o._backgroundImage, rectangle);
   // 绘制数据线
   var data = o._data;
   if(data){
      var days = data.days();
      if(days){
         // 计算最大值
         var count = days.count();
         var minValue = 0;
         var maxValue = 0;
         for(var n = 0; n < count; n++){
            var day = days.at(n);
            maxValue = Math.max(day.priorInvestmentAmount(), maxValue);
            maxValue = Math.max(day.priorRedemptionAmount(), maxValue);
            minValue = Math.min(day.priorNetinvestmentAmount(), minValue);
            maxValue = Math.max(day.investmentAmount(), maxValue);
            maxValue = Math.max(day.redemptionAmount(), maxValue);
            minValue = Math.max(day.netinvestmentAmount(), minValue);
         }
         o.drawLine(graphic, rectangle, minValue, maxValue, '_priorInvestmentAmount', '#800000', 2);
         o.drawLine(graphic, rectangle, minValue, maxValue, '_priorRedemptionAmount', '#000080', 2);
         o.drawLine(graphic, rectangle, minValue, maxValue, '_priorNetinvestmentAmount', '#008000', 2);
         o.drawLine(graphic, rectangle, minValue, maxValue, '_investmentAmount', '#FF0000', 4);
         o.drawLine(graphic, rectangle, minValue, maxValue, '_redemptionAmount', '#0000FF', 4);
         o.drawLine(graphic, rectangle, minValue, maxValue, '_netinvestmentAmount', '#00FF00', 4);
      }
   }
}

//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_onFetch = function FEaiCockpitModuleTrendSnapshot_onFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   o.setData(data);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_construct = function FEaiCockpitModuleTrendSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 配置属性
   o._cellLocation.set(11, 2, 0);
   o._cellSize.set(5, 2);
   // 配置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitMessageTrend);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_setup = function FEaiCockpitModuleTrendSnapshot_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/trend/ground.png');
   image.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_setData = function FEaiCockpitModuleTrendSnapshot_setData(data) {
   var o = this;
   o.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_drawLine = function FEaiCockpitModuleTrendSnapshot_drawLine(graphic, rectangle, minValue, maxValue, code, color, lineWidth){
   var o = this;
   var handle = graphic._handle;
   handle.beginPath();
   var days = o._data.days();
   var count = days.count();
   // 计算步宽
   var left = rectangle.left + 80;
   var top = rectangle.top + 50;
   var width = rectangle.width - 100;
   var height = rectangle.height - 100;
   var stepWidth = width / count;
   var stepHeight = height / maxValue;
   for(var n = 0; n < count; n++){
      var day = days.at(n);
      var x = left + stepWidth * n;
      var y = top + height - stepHeight * day[code];
      if(n == 0){
         handle.moveTo(x, y);
      }else{
         handle.lineTo(x, y);
      }
   }
   handle.lineWidth = lineWidth;
   handle.strokeStyle = color;
   handle.stroke();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_processLogic = function FEaiCockpitModuleTrendSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var trend = MO.Console.find(MO.FEaiLogicConsole).cockpit().trend();
      trend.doFetch(o, o.onFetch);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendSnapshot_dispose = function FEaiCockpitModuleTrendSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
