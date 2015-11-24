//==========================================================
// <T>业绩视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitAchievementModulView1 = function FEaiCockpitAchievementModulView1(o) {
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
   o.onImageLoad           = MO.FEaiCockpitAchievementModulView1_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitAchievementModulView1_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementModulView1_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementModulView1_setup;
   o.processLogic          = MO.FEaiCockpitAchievementModulView1_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementModulView1_dispose;
   o._logoBar              = null;
   o._invementCurrent      = 0;
   o._nowDate              = null;
   o._nowTicker            = null;  
   o.onFetchDayData        = MO.FEaiCockpitAchievementModulView1_onFetchDayData;
   o._DayData              = null;
   o._dayLine              = null;
   o.onFetchTitleData      = MO.FEaiCockpitAchievementModulView1_onFetchTitleData;
   o._titleData            = null;
   o.onFetchRankData       = MO.FEaiCockpitAchievementModulView1_onFetchRankData;
   o._rankData             = null;
   o._rankTable            = MO.Class.register(o, new MO.AGetSet('_rankTable'));
   o._optionCilck1         = null;
   o._optionCilck2         = null;
   o._optionCilck3         = null;
   o._optionCilck4         = null;
   o._optionCilck5         = null;
   o._optionCilck6         = null;
   o._rateData          = MO.Class.register(o, new MO.AGetSet('_rateData'));//产品投资比例数据结构
   o.onFetchRateData       = MO.FEaiCockpitAchievementModulView1_onFetchRateData;
   o._fiveForceModule      = MO.Class.register(o, new MO.AGetSet('_fiveForceModule'));
   return o;
}
//==========================================================
// <T>获取排行数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_onFetchRateData = function FEaiCockpitAchievementModulView1_onFetchRateData(event){
   var o = this;
   var productRate  = o._rateData ;
   productRate.unserializeSignBuffer(event.sign, event.content, true);
   //o._dayLine.setData(titleData);
   var SS =productRate;

}
//==========================================================
// <T>获取排行数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_onFetchRankData = function FEaiCockpitAchievementModulView1_onFetchRankData(event){
   var o = this;
   var RankeData  = o._rankData ;
   RankeData.unserializeSignBuffer(event.sign, event.content, true);
   //o._dayLine.setData(titleData);
   var SS =RankeData;

}
//==========================================================
// <T>获取头部标题数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_onFetchTitleData = function FEaiCockpitAchievementModulView1_onFetchTitleData(event){
   var o = this;
   var titleData  = o._titleData ;
   titleData.unserializeSignBuffer(event.sign, event.content, true);
   // o._dayLine.setData(titleData);
   var SS =titleData;
}
//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_onFetchDayData = function FEaiCockpitAchievementModulView1_onFetchDayData(event){
   var o = this;
   var dayData  = o._DayData ;
   dayData.unserializeSignBuffer(event.sign, event.content, true);
   o._dayLine.setData(dayData);
      var logoBar = o._logoBar;
      if(o._titleData.investmentAmount()){
         //投资总额
         var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
         investmentTotalCount.setValue(parseInt(o._titleData.investmentAmount()).toString());
         // 赎回总金额
         var redemptionTotalCount = logoBar.findComponent('redemptionTotalCount');
         redemptionTotalCount.setValue(parseInt(o._titleData.redemptionAmount()).toString());
         // 净投总金额 
         var netinvestmentTotalCount = logoBar.findComponent('netinvestmentTotalCount');
         netinvestmentTotalCount.setValue(parseInt(o._titleData.netinvestmentAmount()).toString());
        
         // 当月投资总金额
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(o._titleData.investmentMonth()).toString());
         // 当月赎回总金额
         var redemptionTotal = logoBar.findComponent('redemptionTotal');
         redemptionTotal.setValue(parseInt(o._titleData.redemptionMonth()).toString());
         // 当月净投总金额     
         var netinvestmentTotal = logoBar.findComponent('netinvestmentTotal');
         netinvestmentTotal.setValue(parseInt(o._titleData.netinvestmentMonth()).toString());
   }

}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_onImageLoad = function FEaiCockpitAchievementModulView1_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_onPaintBegin = function FEaiCockpitAchievementModulView1_onPaintBegin(event) {
   var o = this;
   var mark = o.visible();
   if(!mark){
      return;
   }
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawRectangle(left,top,width,height,'#ffffff',3);
   graphic.drawImage(o._logo,0,0,360,120);
   graphic.drawImage(o._optionCilck1,520+126*0,40,123,56);
   graphic.drawImage(o._optionCilck2,520+126*1,40,123,56);
   graphic.drawImage(o._optionCilck3,520+126*2,40,123,56);
   graphic.drawImage(o._optionCilck4,520+126*3,40,123,56);
   graphic.drawImage(o._optionCilck5,520+126*4,40,123,56);
   graphic.drawImage(o._optionCilck6,520+126*5,40,123,56);

   var ctx = graphic._handle;
   ctx.fillStyle = '#ffffff';
   ctx.strokeStyle ='#ffffff';
   ctx.lineWidth = 3;
   ctx.save();
   ctx.rotate(0.8);
   ctx.beginPath();
   ctx.arc(200,200,100,Math.PI,2*Math.PI,false);
   ctx.fill();
   ctx.stroke();
   ctx.closePath();
   ctx.restore();
   //..........................................................
   // 绘制背景
   // graphic.drawRectangleImage(o._backgroundImage, rectangle);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_construct = function FEaiCockpitAchievementModulView1_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
   o._nowDate = new MO.TDate();
   o._nowTicker = new MO.TTicker(1000*10);
   o._DayData = MO.Class.create(MO.FEaiCockpitMessageAchievementNextDays);
   o._titleData = MO.Class.create(MO.FEaiCockpitMessageAchievementNextTitle);
   o._rankData =  MO.Class.create(MO.FEaiCockpitMessageAchievementNextRanks);
   o._rateData = MO.Class.create(MO.FEaiCockpitMessageAchievementNextRates);

}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_setup = function FEaiCockpitAchievementModulView1_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   //上部图表
   var image = o._logo = imageConsole.load('{eai.resource}/cockpit/achievement/NextLogo.png');
   image.addLoadListener(o, o.onImageLoad);
      image = o._optionCilck1 = imageConsole.load('{eai.resource}/cockpit/achievement/optionNormal1.png');
   image.addLoadListener(o, o.onImageLoad);
      image = o._optionCilck2 = imageConsole.load('{eai.resource}/cockpit/achievement/optionNormal2.png');
   image.addLoadListener(o, o.onImageLoad);
      image = o._optionCilck3 = imageConsole.load('{eai.resource}/cockpit/achievement/optionNormal3.png');
   image.addLoadListener(o, o.onImageLoad);
      image = o._optionCilck4 = imageConsole.load('{eai.resource}/cockpit/achievement/optionNormal4.png');
   image.addLoadListener(o, o.onImageLoad);
      image = o._optionCilck5 = imageConsole.load('{eai.resource}/cockpit/achievement/optionNormal5.png');
   image.addLoadListener(o, o.onImageLoad);
      image = o._optionCilck6 = imageConsole.load('{eai.resource}/cockpit/achievement/optionNormal6.png');
      var imageConsole = MO.Console.find(MO.FImageConsole);
   //上部图表
   image = o._fiveforce = imageConsole.load('{eai.resource}/cockpit/achievement/fiveForce.png');
   image.addLoadListener(o, o.onImageLoad);
   //创建 logobar模块
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.cockpit.LogoBarAchievement');
   o.push(frame);
   //创建日曲线控件
   // var dayLine = o._dayLine = MO.Class.create(MO.FGuiSixLineChart);
   // dayLine.setLocation(10, 300);
   // dayLine.setSize(700, 300);
   // o.push(dayLine);
   // 创建五力图控件
   var fiveForceModule = o._fiveForceModule = MO.Class.create(MO.FEaiCockpitAchievementModulFiveForceChart);
   fiveForceModule.setLocation(720,300);
   fiveForceModule.setSize(700, 300);
   o.push(fiveForceModule);
   //fiveForceModule._fiveforce =o._fiveforce;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_processLogic = function FEaiCockpitAchievementModulView1_processLogic(){
   var o = this;
   var mark = o.visible();
   if(!mark){
      return;
   }
   if(o._nowTicker.process()){
         var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
         achievement.doFetchDay(o, o.onFetchDayData);
         achievement.doFetchTitle(o, o.onFetchTitleData);
         achievement.doFetchRank(o, o.onFetchRankData);
         achievement.doFetchRate(o, o.onFetchRateData);
   }
   //o._dayLine.dirty();
  
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulView1_dispose = function FEaiCockpitAchievementModulView1_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
   o._rankTable = MO.Lang.Object.dispose(o._rankTable);
}
