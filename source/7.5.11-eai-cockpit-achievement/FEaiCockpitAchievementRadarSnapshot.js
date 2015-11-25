//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementRadarSnapshot = function FEaiCockpitAchievementRadarSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._gridImage            = null;
   o._listBox              = null;
   o._index                = 0;
   o._page                 = 0;
   o._pageItemsTotal       = 0;
   o._pageMax              = 0;
   o._pageItemsMax         = 8;
   o._rollDuration         = 5000;
   o._rollTicker           = null;
   o._lineChart            = null;

   o._font1stRowR          = null;
   o._font1stRowL          = null;
   o._font2ndRow           = null;
   o._font3rdRow           = null;
   //总分数
   o._totalScore           = "";
   //业绩
   o._performance          = 0; 
   //人力
   o._manpower             = "";
   //人均
   o._perCapita            = "";
   //任务
   o._task                 = 0;
   //完成度
   o._completionRate       = "";
   // 趋势
   o._trendCd              = 0;
   //改进建议
   o._advice               = "";
   o._fiveForceImage       = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitAchievementRadarSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementRadarSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementRadarSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementRadarSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementRadarSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementRadarSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementRadarSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementRadarSnapshot_dispose;
   //..........................................................
   o._comingSoonImage      = null;
   //..........................................................
   return o;
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitAchievementRadarSnapshot_onDataFetch = function FEaiCockpitAchievementRadarSnapshot_onDataFetch(event){
   var o = this;
    // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
      //总分数
      o._totalScore = data.totalScore();
      //业绩
      o._performance = data.performance();
      //人力
      o._manpower = data.manpower();
      //人均
      o._perCapita = data.perCapita();
      //任务
      o._task = data.task();
      //完成度
      o._completionRate = data.completionRate();
      // 趋势
      o._trendCd = data.trendCd();
      //改进建议
      o._advice = data.advice();

   }
   // 读取数据
   o.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementRadarSnapshot_onPaintBegin = function FEaiCockpitAchievementRadarSnapshot_onPaintBegin(event) {
   var o = this;
   var data = o._data;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   // 绘制背景
   // graphic.drawRectangle(left,top,width,height,'#ffffff',3);\
   graphic.drawImage(o._backgroundImage, left, top, width, height);
   graphic.drawImage(o._fiveForceImage, 450, 40, 233, 191);
   
   //..........................................................
   // 绘制文字
   var drawX = left + 20;
   var drawY = top + 60;

   var font1stRowR = o._font1stRowR;
   var font1stRowL = o._font1stRowL;
   var font2ndRow = o._font2ndRow;
   var font3rdRow = o._font3rdRow;

   // 绘制第一行
   var drawText = "总体评分:";
   graphic.setFont(font1stRowR.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowR.color);

   var drawText = o._totalScore;
   graphic.setFont(font1stRowL.toString());
   graphic.drawText(drawText, drawX + 180, drawY, font1stRowL.color);
   // 绘制第二行 业绩
   var drawText = "业绩:      ";
   var performance = o._performance;
   if(performance > 100000000){
      drawText += Math.floor(performance / 100000000) + "亿";
   }
   if(performance > 10000){
      drawText += Math.floor(performance / 10000 % 10000) + "万";
   }
   drawText += performance % 10000 + "元";
   drawY += 40;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "人力:     " + o._manpower + "人";
   drawY += 40;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "人均:     " + o._perCapita + "元";
   drawY += 40;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "任务/完成度:     ";
   var task = o._task;
   if (task > 100000000) {
      drawText += Math.floor(task / 100000000) + "亿";
   }
   if (performance < 100000000) {
      drawText += Math.floor(task / 10000) + "万";
   }
   drawText +=  "/" + o._completionRate + "%";
   drawY += 40;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "趋势:     ";
   var trendCd = o._trendCd;
   if(trendCd == 0){
      drawText += "@"
   }else if(trendCd == 1){
      drawText += "↓"
   }else if(trendCd == 2){
      drawText += "→"
   }else if(trendCd == 3){
      drawText += "↑"
   }
   drawY += 50;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "改进建议:" + o._advice;
   drawY += 50;
   graphic.setFont(font3rdRow.toString());
   graphic.drawText(drawText, drawX, drawY, font3rdRow.color);

}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementRadarSnapshot_onPaintEnd = function FEaiCockpitAchievementRadarSnapshot_onPaintEnd(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementRadarSnapshot_construct = function FEaiCockpitAchievementRadarSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(7, 3, 0);
   o._cellSize.set(6, 3);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitMessageAchievementNextRadar);

   o._font1stRowR = new MO.SUiFont();
   o._font1stRowL = new MO.SUiFont();
   o._font2ndRow = new MO.SUiFont();
   o._font3rdRow = new MO.SUiFont();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementRadarSnapshot_setup = function FEaiCockpitAchievementRadarSnapshot_setup(){
   var o = this;
   // 加载图片
   o._backgroundImage = o.loadResourceImage('{eai.resource}/cockpit/achievement/radar.png');
   o._fiveForceImage = o.loadResourceImage('{eai.resource}/cockpit/achievement/fiveForce.png');
   o._font1stRowR.parse('bold #FFFFFF 30px Microsoft YaHei');
   o._font1stRowL.parse('#FF0B11 50px Microsoft YaHei');
   o._font2ndRow.parse('#FFFFFF 25px Microsoft YaHei');
   o._font3rdRow.parse('#FFFFFF 18px Microsoft YaHei');
   //..........................................................
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementRadarSnapshot_processLogic = function FEaiCockpitAchievementRadarSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetchRadar(o, o.onDataFetch);
   }
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementRadarSnapshot_dispose = function FEaiCockpitAchievementRadarSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   o._font1stRowR = MO.Lang.Object.dispose(o._font1stRowR);
   o._font1stRowL = MO.Lang.Object.dispose(o._font1stRowL);
   o._font2ndRow = MO.Lang.Object.dispose(o._font2ndRow);
   o._font3rdRow = MO.Lang.Object.dispose(o._font3rdRow);

   o._backgroundImage = MO.Lang.Object.dispose(o._backgroundImage);
   o._fiveForceImage = MO.Lang.Object.dispose(o._fiveForceImage);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
