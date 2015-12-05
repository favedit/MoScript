//==========================================================
// <T>统计投资。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiChartMktCustomerProcessor = function FEaiChartMktCustomerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   o._dateSetup               = false;
   o._lastDate                = MO.Class.register(o, new MO.AGetter('_lastDate'));
   o._lastRecordId            = 0;
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
   
   
   
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   
   o._intervalMinute          = 1;
   o._abnormalMillisecond     = 600000;
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
   // @method
   o.onDynamicData            = MO.FEaiChartMktCustomerProcessor_onDynamicData;
   o.on24HDataFetch           = MO.FEaiChartMktCustomerProcessor_on24HDataFetch;
   //..........................................................
   // @method
   o.construct                = MO.FEaiChartMktCustomerProcessor_construct;
   // @method
   o.allocUnit                = MO.FEaiChartMktCustomerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartMktCustomerProcessor_allocShape;
   o.setup                    = MO.FEaiChartMktCustomerProcessor_setup;
   // @method
   o.calculateCurrent         = MO.FEaiChartMktCustomerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartMktCustomerProcessor_focusEntity;
   o.process                  = MO.FEaiChartMktCustomerProcessor_process;
   // @method
   o.dispose                  = MO.FEaiChartMktCustomerProcessor_dispose;
   return o;
}

//==========================================================
// <T>24小时数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerProcessor_on24HDataFetch = function FEaiChartMktCustomerProcessor_on24HDataFetch(event) {
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
MO.FEaiChartMktCustomerProcessor_onDynamicData = function FEaiChartMktCustomerProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   var lastDate = o._lastDate;
   // 读取数据
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   // 计算刷新间隔
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankUnits());
   var units = o._units;
   var dynamicUnits = dynamicInfo.units();
   var unitCount = dynamicUnits.count();
   var dynamicUnitCount = 0;
   for (var i = 0; i < unitCount; i++) {
      var unit = dynamicUnits.get(i);
      var recordId = unit.recordId()
      if(recordId > o._lastRecordId){
         units.push(unit);
         dynamicUnitCount++;
      };
   };
   if(dynamicUnitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
      var lastUnit = units.last();
      lastDate.parseAuto(lastUnit.recordDate());
      o._lastRecordId = lastUnit.recordId();
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   // 最后，开始 差10分钟 处理
   var lastDateValue = lastDate.get();
   var endDateValue = o._endDate.get();
   if (lastDateValue - endDateValue > o._abnormalMillisecond){
      lastDate.assign(o._endDate);
      lastDate.add(-o._abnormalMillisecond);
   };
   o._tableTick = 0;
   MO.Logger.info(o, 'Load dynamic data. (unit_count={1}, dynamic_unit_count={2})', unitCount, dynamicUnitCount);
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
MO.FEaiChartMktCustomerProcessor_construct = function FEaiChartMktCustomerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置变量
   o._beginDate = new MO.TDate();
   o._lastDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._24HBeginDate = new MO.TDate();
   o._24HEndDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   // 定时获取数据
   o._dataTicker = new MO.TTicker(1000 * 40 * o._intervalMinute);
   // 创建缓冲
   o._dynamicInfo = MO.Class.create(MO.FEaiLogicInfoCustomerDynamic);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
}

//==========================================================
// <T>收集实体。</T>
//
// @method
// @return FEaiChartMktCustomerProcessorEntity 实体
//==========================================================
MO.FEaiChartMktCustomerProcessor_allocUnit = function FEaiChartMktCustomerProcessor_allocUnit(){
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
MO.FEaiChartMktCustomerProcessor_setup = function FEaiChartMktCustomerProcessor_setup(){
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
MO.FEaiChartMktCustomerProcessor_calculateCurrent = function FEaiChartMktCustomerProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var investmentTotalCurrent = info.investmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      investmentCurrent -= unit.investment();
      investmentTotalCurrent -= unit.investment();
   }
   o._invementTotalCurrent = investmentTotalCurrent;
   o._invementDayCurrent = investmentCurrent;
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerProcessor_focusEntity = function FEaiChartMktCustomerProcessor_focusEntity(unit){
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
      if (o._mapEntity != null) {
         o._mapEntity.upload();
      }
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
MO.FEaiChartMktCustomerProcessor_process = function FEaiChartMktCustomerProcessor_process(){
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
      o._lastDate.assign(o._endDate);
      o._lastDate.truncDay(1);
      o._dateSetup = true;

   }
   //..........................................................
   // 设置处理时间
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      // 设置结束时间
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      var lastDate = o._lastDate;
      beginDate.assign(lastDate);
      beginDate.truncMinute(1);
      endDate.assign(systemDate);
      statistics.marketer().doCustomerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      // 设置开始时间
      beginDate.assign(endDate);

      // 取24小时统计数据
      // 设置开始时间
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncMinute(15);
      beginDate24H.addDay(-1);
      // 设置结束时间
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      endDate24H.truncMinute(15);
      // 取数据
      statistics.marketer().doCustomerTrend(o, o.on24HDataFetch, beginDate24H.format(), endDate24H.format());
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
   if (o._mapEntity != null) {
      o._mapEntity.process();
   }
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
MO.FEaiChartMktCustomerProcessor_dispose = function FEaiChartMktCustomerProcessor_dispose(){
   var o = this;
   // 释放属性
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
