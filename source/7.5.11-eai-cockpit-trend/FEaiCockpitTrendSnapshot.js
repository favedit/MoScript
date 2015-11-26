//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 151101
//==========================================================
MO.FEaiCockpitTrendSnapshot = function FEaiCockpitTrendSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/trend/ground.png';
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   o._dataset              = null;
   // @attribute
   o._backgroundImage      = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitTrendSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitTrendSnapshot_onPaintBegin;
   o.onFetch               = MO.FEaiCockpitTrendSnapshot_onFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitTrendSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitTrendSnapshot_setup;
   o.setData               = MO.FEaiCockpitTrendSnapshot_setData;
   o.processLogic          = MO.FEaiCockpitTrendSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitTrendSnapshot_dispose;
   o._dateTextFont         = MO.Class.register(o, new MO.AGetSet('_dateTextFont'));
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_onImageLoad = function FEaiCockpitTrendSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_onPaintBegin = function FEaiCockpitTrendSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   return;
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
   //graphic.drawRectangleImage(o._backgroundImage, rectangle);
   var left = rectangle.left + 130;
   var top = rectangle.top + 50;
   var width = rectangle.width - 180;
   var height = rectangle.height - 150;
   var handle = graphic._handle;
   var label = 0;
   var textwidth = 0;
   var lineCount = 0;
   var valueinterval = 50000000;
   // 绘制数据线
   var data = o._data;
   if(data){
      var days = data.days();
      if(days){
         // 计算最大值
         var count = days.count();
         var minValueInvest = 0;
         var maxValueInvest = 0;
         var maxValue = 0 ;
         var minValue = 0 ;
         var label = '';
         lineCount = parseInt(count/3);
         var dataheigt = 90;
         for(var n = 0; n < count; n++){
            var day = days.at(n);
            maxValueInvest = Math.max(day.priorInvestmentAmount(), maxValueInvest);
            maxValueInvest = Math.max(day.priorRedemptionAmount(), maxValueInvest);
            minValueInvest = Math.min(day.priorNetinvestmentAmount(), minValueInvest);
            maxValueInvest = Math.max(day.investmentAmount(), maxValueInvest);
            maxValueInvest = Math.max(day.redemptionAmount(), maxValueInvest);
            minValueInvest = Math.min(day.netinvestmentAmount(), minValueInvest);
         }
         maxValue = maxValueInvest;
         minValue = minValueInvest;

          //标题日期
         
         var date = days.at(0).recordDate();
         graphic.setFont('15px Microsoft YaHei');
         var label = date.substr(0,4)+'年'+date.substr(4,2)+'月';
         graphic.drawText(label, left+width*2/5, rectangle.top+25, '#edfc2d');
         //下面日期
         graphic.setFont('6px Microsoft YaHei');
         var handle = graphic._handle;
         label = '(日期：天)';
         
         //graphic.drawText(label,left-60,top+169,'#ffffff');
         graphic.drawText(label,left-60,top+190-23,'#ffffff');
         graphic.setFont('12px Microsoft YaHei');
         graphic.drawText('(单位：万)', left-55, top-27, '#ffffff'); 
         //graphic.drawText(label,left-60,top+lineCount*15,'#ffffff');
         var linelabel = Math.ceil((maxValueInvest/100000000));
         linelabel = 9;
         var valueinterval = Math.floor((maxValue/100000000));
         var span =parseInt(maxValueInvest/maxValue*(count/3));
         linelabel *=10000; 
         var waterlevel = linelabel;
         valueinterval = valueinterval/lineCount;
         valueinterval *= 10000;
         valueinterval = 15000;
         var translinelabel = 0;
         for(var i=0;i<12;i++){
            handle.beginPath();
            var x = left;
            var y = top + i*15-15;
            handle.moveTo(x, y);
            x = left+width;
            handle.lineTo(x, y);
            handle.lineWidth = 2;
            handle.strokeStyle = '#697293';
            if(waterlevel - valueinterval*i==0)handle.strokeStyle = '#edfc2d';
            handle.stroke();
            textwidth = graphic.textWidth(linelabel);
            translinelabel = Math.ceil(linelabel);
            graphic.drawText(linelabel, left-textwidth-10, y+5, '#ffffff');      
            linelabel -= valueinterval;
         }
         for (var i = 0 ; i<count; i=i+5){
            var day = days.at(i);
            date = day.priorRecordDate();
            label = date.substr(6,1);
            if(label==0){
               label =  date.substr(7,1);
            }else{
               label =  date.substr(6,2);
            }
            graphic.drawText(label,left+i*13+10,top+190-23,'#ffffff');
         }
      }
    }
}

//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_onFetch = function FEaiCockpitTrendSnapshot_onFetch(event){
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
MO.FEaiCockpitTrendSnapshot_construct = function FEaiCockpitTrendSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 配置属性
   o._cellLocation.set(11, 2, 0);
   o._cellSize.set(5, 2);
   // 配置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitTrendMessage);
   o._dateTextFont = new MO.SUiFont();
   o._dateTextFont.size = 4;
   o._dateTextFont.bold = false;
   o._dateTextFont.color = '#ffffff'
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_setup = function FEaiCockpitTrendSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 创建图表
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartLinePainter);
   chart.setLocation(60, 11);
   chart.setSize(520, 218);
   chart.paintRectangle().set(68, 24, 424, 166);
   o.push(chart);

   var lineColors = ['#4b5e6f', '#80a861', '#947b91', '#51c0db', '#68f34e', '#9b1933'];
   var dataset = o._dataset = MO.Class.create(MO.FUiChartDataset);
   dataset.setXDivide(31);
   dataset.setXLabels(["1", "6", "11", "16", "21", "26", "31"]);
   for ( var i = 0; i < 6; ++i) {
      var series = MO.Class.create(MO.FUiChartDataSeries);
      series.setLineWidth(3);
      series.setLineColor(lineColors[i]);
      dataset.push(series);
   }
   chart.setDataset(dataset);
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCockpitTrendSnapshot_setData = function FEaiCockpitTrendSnapshot_setData(data) {
   var o = this;
   var data = o._data;
   var days = data.days();
   var dataset = o._dataset;
   var serieses = dataset.serieses();
   var dayCount = days.count();
   // 清空老数据
   for(var i = 0; i < 6; ++i) {
      var series = serieses.get(i);
      series.values().clear();
   }
   for(var i = 0; i < dayCount; ++i) {
      var day = days.get(i);
      if(day.priorInvestmentAmount() != 0) serieses.get(0).values().push(day.priorInvestmentAmount());
      if(day.priorRedemptionAmount() != 0) serieses.get(1).values().push(day.priorRedemptionAmount());
      if(day.priorNetinvestmentAmount() != 0) serieses.get(2).values().push(day.priorNetinvestmentAmount());
      if(day.investmentAmount() != 0) serieses.get(3).values().push(day.investmentAmount());
      if(day.redemptionAmount() != 0) serieses.get(4).values().push(day.redemptionAmount());
      if(day.netinvestmentAmount() != 0) serieses.get(5).values().push(day.netinvestmentAmount());
   }
   dataset.update();
   o.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_processLogic = function FEaiCockpitTrendSnapshot_processLogic(){
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
MO.FEaiCockpitTrendSnapshot_dispose = function FEaiCockpitTrendSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
