//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementBusinessCardSnapshot = function FEaiCockpitAchievementBusinessCardSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/achievement/businessCard.png';
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
   o._dataTicker           = null;
   // @attribute
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
   o._font1stRow           = null;
   o._font2ndRow           = null;
   //公司名称
   o._businessName         = ""; 
   //公司负责人
   o._departmentLeader     = ""; 
   //分公司数
   o._departmentCount      = ""; 
   //理财师人数
   o._marketerCount        = "";
   //当日投资
   o._investmentCount      = 0;
   //当日赎回
   o._redemptionCount      = 0;
   //当日净投
   o._netinvestmentCount   = 0; 
   //赎回率
   o._redemptionRate       = "";
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitAchievementBusinessCardSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementBusinessCardSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementBusinessCardSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementBusinessCardSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementBusinessCardSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementBusinessCardSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementBusinessCardSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementBusinessCardSnapshot_dispose;
   o.getRMBString          = MO.FEaiCockpitAchievementBusinessCardSnapshot_getRMBString
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
 MO.FEaiCockpitAchievementBusinessCardSnapshot_onDataFetch = function FEaiCockpitAchievementBusinessCardSnapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
      //公司名称
      o._businessName = data.businessName();
      //公司负责人
      o._departmentLeader = data.departmentLeader();
      //分公司数
      o._departmentCount = data.departmentCount();
      //理财师人数
      o._marketerCount = data.marketerCount();
      //当日投资
      o._investmentCount = data.investmentCount();
      //当日赎回
      o._redemptionCount = data.redemptionCount();
      //当日净投
      o._netinvestmentCount = data.netinvestmentCount();
      //赎回率
      o._redemptionRate = data.redemptionRate();
      // 读取数据
      o.dirty();
   }
}
 MO.FEaiCockpitAchievementBusinessCardSnapshot_getRMBString = function FEaiCockpitAchievementBusinessCardSnapshot_getRMBString(rmbCount) {
    rmbCount = Math.round(rmbCount);
    var drawText = "";
    if (rmbCount > 100000000) {
       drawText += Math.floor(rmbCount / 100000000) + "亿";
    }
    if (rmbCount > 10000) {
       drawText += Math.floor(rmbCount / 10000 % 10000) + "万";
    }
    drawText += rmbCount % 10000 + "元";
    return drawText;
 }
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================

MO.FEaiCockpitAchievementBusinessCardSnapshot_onPaintBegin = function FEaiCockpitAchievementBusinessCardSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................

   var font1stRow = o._font1stRow;
   var font2ndRow = o._font2ndRow;
   // 绘制第一行
   var drawText = "公司名片";
   graphic.setFont(font1stRow.toString());
   graphic.drawText(drawText, 120, 40, font1stRow.color);

   var drawX = 40;
   var drawY = 80;
   // 绘制第二行 
   var drawText = "名称:             " + o._businessName;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "主管:             " + o._departmentLeader;
   drawY += 35;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "分公司数:      " + o._departmentCount;
   drawY += 35;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "理财师数:      " + o._marketerCount;
   drawY += 35;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "当日投资:      " + o.getRMBString(o._investmentCount);
   drawY += 35;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "当日赎回:      " + o.getRMBString(o._redemptionCount);
   drawY += 35;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "当日净投:      " + o.getRMBString(o._netinvestmentCount);
   drawY += 35;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);

   var drawText = "赎回率:          " + o._redemptionRate + "%";
   drawY += 35;
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCardSnapshot_onPaintEnd = function FEaiCockpitAchievementBusinessCardSnapshot_onPaintEnd(event) {
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
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCardSnapshot_construct = function FEaiCockpitAchievementBusinessCardSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(13, 3, 0);
   o._cellSize.set(3, 3);
   o._font1stRow = new MO.SUiFont();
   o._font2ndRow = new MO.SUiFont();
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitMessageAchievementNextBusinessCard);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCardSnapshot_setup = function FEaiCockpitAchievementBusinessCardSnapshot_setup() {
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 加载图片
   o._font1stRow.parse('#E1DC1E 25px Microsoft YaHei');
   o._font2ndRow.parse('#FFFFFF 20px Microsoft YaHei');
   //..........................................................
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCardSnapshot_processLogic = function FEaiCockpitAchievementBusinessCardSnapshot_processLogic(){
   var o = this;
   if (o._dataTicker.process()) {
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetchBusinessCard(o, o.onDataFetch);
   }
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCardSnapshot_dispose = function FEaiCockpitAchievementBusinessCardSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
   o._font1stRow = MO.Lang.Object.dispose(o._font1stRow);
   o._font2ndRow = MO.Lang.Object.dispose(o._font2ndRow);
}
