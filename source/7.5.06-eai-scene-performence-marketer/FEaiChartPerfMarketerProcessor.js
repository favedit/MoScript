//==========================================================
// <T>统计投资。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiChartPerfMarketerProcessor = function FEaiChartPerfMarketerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   o._dateSetup               = false;
   // @attribute
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._24HBeginDate            = MO.Class.register(o, new MO.AGetter('_24HBeginDate'));
   o._24HEndDate              = MO.Class.register(o, new MO.AGetter('_24HEndDate'));
   // @attribute
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._redemptionDayCurrent    = MO.Class.register(o, new MO.AGetter('_redemptionDayCurrent'), 0);
   o._netinvestmentDayCurrent = MO.Class.register(o, new MO.AGetter('_netinvestmentDayCurrent'), 0);
   o._interestDayCurrent      = MO.Class.register(o, new MO.AGetter('_interestDayCurrent'), 0);
   o._performanceDayCurrent   = MO.Class.register(o, new MO.AGetter('_performanceDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);

   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   
   // o._redemptionTotal         = MO.Class.register(o, new MO.AGetter('_redemptionTotal'));
   // o._netinvestmentTotal       = MO.Class.register(o, new MO.AGetter('_netinvestmentTotal'));
   
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._performanceDate         = MO.Class.register(o, new MO.AGetter('_performanceDate'));

   o._intervalMinute          = 1;
   // @attribute
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   // @attribute
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   // @attribute
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   // @attribute
   o._unitPool                = null;
   // @attribute
   o._autios                  = null;
   // @event
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));

   o._event24HDataChanged     = null;
   o._listeners24HDataChanged = MO.Class.register(o, new MO.AListener('_listeners24HDataChanged', '24H' + MO.EEvent.DataChanged));
   //..........................................................
   
   //event
   o._eventPerformanceDateChanged = null;
   o._listenersPerformanceDateChanged = MO.Class.register(o, new MO.AListener('_listenersPerformanceDateChanged','PerformanceDataChanged'));
   // @method
   o.onDynamicData            = MO.FEaiChartPerfMarketerProcessor_onDynamicData;
   o.on24HDataFetch           = MO.FEaiChartPerfMarketerProcessor_on24HDataFetch;
   //@method 业绩数据回调
   o.onPerformanceDate        = MO.FEaiChartPerfMarketerProcessor_onPerformanceDate;

   //..........................................................
   // @method
   o.construct                = MO.FEaiChartPerfMarketerProcessor_construct;
   // @method
   o.allocUnit                = MO.FEaiChartPerfMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartPerfMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartPerfMarketerProcessor_setup;
   // @method
   o.calculateCurrent         = MO.FEaiChartPerfMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartPerfMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartPerfMarketerProcessor_process;
   // @method
   o.dispose                  = MO.FEaiChartPerfMarketerProcessor_dispose;
   // @event
   o._eventDayDataChanged     = null;
   o._monthStartTime          = MO.Class.register(o, new MO.AGetter('_monthStartTime'));
   o._monthEndTime            = MO.Class.register(o, new MO.AGetter('_monthEndTime'));

   o._yearStartTime          = MO.Class.register(o, new MO.AGetter('_yearStartTime'));
   o._yearEndTime            = MO.Class.register(o, new MO.AGetter('_yearEndTime'));
   return o;
}
//==========================================================
// <T>业绩数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_onPerformanceDate = function FEaiChartPerfMarketerProcessor_onPerformanceDate(event){
   var o = this;
   var performanceDate = o._performanceDate;
   var dayData =  o._eventDayDataChanged;
   performanceDate.beginDate = o._24HBeginDate;
   performanceDate.endDate = o._24HEndDate;
   performanceDate.unserializeSignBuffer(event.sign, event.content, true);
   performanceDate.monthStarDate = o._monthStartTime;
   performanceDate.monthEndDate = o._monthEndTime;
   performanceDate.yearStarDate = o._yearStartTime;
   performanceDate.yearEndDate = o._yearEndTime;

   o.processPerformanceDataChangedListener(performanceDate);
}

//==========================================================
// <T>24小时数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_on24HDataFetch = function FEaiChartPerfMarketerProcessor_on24HDataFetch(event) {
   var o = this;
   event.beginDate = o._24HBeginDate;
   event.endDate = o._24HEndDate;
   o.process24HDataChangedListener(event);
}

//==========================================================
// <T>统计投资数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_onDynamicData = function FEaiChartPerfMarketerProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   // 计算刷新间隔
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankUnits());
   var units = o._units;
   units.append(dynamicInfo.units());
   var unitCount = units.count();
   if(unitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   o._tableTick = 0;
   // 触发数据事件
   var changeEvent = o._eventDataChanged;
   changeEvent.rankUnits = rankUnits;
   changeEvent.unit = null;
   o.processDataChangedListener(changeEvent);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_construct = function FEaiChartPerfMarketerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置变量
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._24HBeginDate = new MO.TDate();
   o._24HEndDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   // 定时获取数据
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   // 创建缓冲
   o._performanceDate = MO.Class.create(MO.FEaiChartPerfMarketerInfo);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMktCustomerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
   o._listenersPerformanceDateChanged =  new MO.SEvent(o);
   o._monthStartTime = new MO.TDate();
   o._monthEndTime = new MO.TDate();
   o._yearStartTime = new MO.TDate();     
   o._yearEndTime  = new MO.TDate();

}

//==========================================================
// <T>收集实体。</T>
//
// @method
// @return FEaiChartPerfMarketerProcessorEntity 实体
//==========================================================
MO.FEaiChartPerfMarketerProcessor_allocUnit = function FEaiChartPerfMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktCustomerDynamicUnit);
   }
   return unit;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_setup = function FEaiChartPerfMarketerProcessor_setup(){
   var o = this;
   // 创建声音
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   // 设置变量
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}

//==========================================================
// <T>计算当前数值。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_calculateCurrent = function FEaiChartPerfMarketerProcessor_calculateCurrent(){
   var o = this;
   var info = o._performanceDate;
   var year = info._year;
   var month = info._month;
   var day = info._day;
  
   // 当天
      if( year && month && day ){
         var dayInvestment = day.investment();
         var dayNetinvestment = day.netinvestment();
         var dayRedemption = day.redemption();
         var dayCustomerRegister = day.customerRegister(); 
         var dayMemberRegister = day.memberRegister();
         // var ticks = day._ticks;
         // 当月
         var monthInvestment = month.investment();
         var monthNetinvestment = month.netinvestment();
         var monthRedemption = month.redemption();
         var monthCustomerRegister = month.customerRegister(); 
         var monthMemberRegister = month.memberRegister();
         // 累计
         var yearInvestment = year.investment();
         var yearNetinvestment = year.netinvestment();
         var yearRedemption = year.redemption();
         var yearCustomerRegister = year.customerRegister(); 
         var yearhMemberRegister = year.memberRegister();

         // var investmentCurrent = info.investmentCount();
         // var investmentTotalCurrent = info.investmentTotal();
         var units = o._units;
         var count = units.count();
         console.log(count+"...............................");
         for(var i = 0; i < count; i++){
            var unit = units.at(i);
            var actionCd = unit.customerActionCd();
            var amount = unit.customerActionAmount();
            var interest = unit.customerActionInterest();
            // if(actionCd == 1){
            //    investmentCurrent -= amount;
            //    performanceCurrent -= amount;
            //    investmentTotal -= amount;
            // }else if(actionCd == 2){
            //    redemptionCurrent -= amount;
            //    interestCount -= interest;
            //    redemptionTotal -= amount;
            // }
            // dayInvestment -= unit.investment();
            // dayNetinvestment -= unit.dayNetinvestment();
         }
         // 当日
         o._dayInvestment = dayInvestment;
         o._dayNetinvestment = dayNetinvestment;
         o._dayRedemption = dayRedemption;
         o._dayCustomerRegister = dayCustomerRegister;
         o._dayMemberRegister = dayMemberRegister;
         // 当月
         o._monthInvestment = monthInvestment;
         o._monthNetinvestment = monthNetinvestment;
         o._monthRedemption = monthRedemption;
         o._monthCustomerRegister = monthCustomerRegister; 
         o._monthMemberRegister = monthMemberRegister;
         // 累计
         o._yearInvestment = yearInvestment;
         o._yearNetinvestment = yearNetinvestment;
         o._yearRedemption = yearRedemption;
         o._yearCustomerRegister = yearCustomerRegister; 
         o._yearhMemberRegister = yearhMemberRegister;
      }
   // 当日总额
   // o._invementDayCurrent = investmentCurrent;
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_focusEntity = function FEaiChartPerfMarketerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   // 显示实体
   var card = unit.card();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      // 计算级别
      var investment = unit.investment();
      var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(investment);
      // 更新省份数据
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      // 更新城市数据
      cityEntity.addInvestmentTotal(level, investment);
      o._mapEntity.upload();
      // 播放声音
      var autio = o._autios[level];
      if(autio){
         autio.play(0);
      }
   }
   //..........................................................
   // 触发事件
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiChartPerfMarketerProcessor_process = function FEaiChartPerfMarketerProcessor_process(){
   var o = this;
   //..........................................................
   // 获得系统时间
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   //..........................................................
   // 设置首次时间
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   //..........................................................
   // 设置处理时间
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      // 设置结束时间
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      
      // statistics.marketer().doCustomerDynamic(o,o.onPerformanceDate,  beginDate.format(), endDate.format());
      //statistics.marketer().doCustomerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      // 设置开始时间
      beginDate.assign(endDate);
      // 取24小时统计数据
      // 设置开始时间
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncMinute(15);
      // beginDate24H.addDay(-1);
      beginDate24H.addHour(-systemDate.hour);
      // 设置结束时间
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      endDate24H.truncMinute(15);

      var beginDate30D = o._monthStartTime;
      beginDate30D.assign(systemDate);
      // beginDate30H.truncMinute(15);
      // beginDate30D.addMonth(-1);
      beginDate30D.addDay(-systemDate.day);
      var  endDate30D = o._monthEndTime;
      endDate30D.assign(systemDate);
      // endDate30D.truncMinute(15);
      
      var beginDate12Y = o._yearStartTime;
      beginDate12Y.assign(systemDate);
      // beginDate30H.truncMinute(15);
      // beginDate12Y.addYear(-1);
      beginDate12Y.addMonth(-systemDate.month);
      var  endDate12Y = o._yearEndTime;
      endDate12Y.assign(systemDate);

      // 取数据
      statistics.achievement().doDynamic(o, o.onPerformanceDate, beginDate24H.format(), endDate.format(), beginDate30D.format(), endDate30D.format(), beginDate12Y.format(), endDate12Y.format());
      //statistics.marketer().doCustomerTrend(o, o.on24HDataFetch, beginDate24H.format(), endDate24H.format());
   }

   //..........................................................
   // 设置表格刷新
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      // 从开始位置压入
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         // 设置实体焦点
         o.focusEntity(unit);
      }
      // 总值减去队列中内容，计算现在的当日和总值
      o.calculateCurrent();
      // 设置时间
      o._tableTick = currentTick;
   }
   //..........................................................
   // 地图处理
   o._mapEntity.process();
   //..........................................................
   // 设置信息
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerProcessor_dispose = function FEaiChartPerfMarketerProcessor_dispose(){
   var o = this;
   // 释放属性
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o._eventDayDataChanged = MO.Lang.Object.dispose(o._eventDayDataChanged);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
