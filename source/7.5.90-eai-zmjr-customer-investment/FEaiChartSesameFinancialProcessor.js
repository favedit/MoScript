//==========================================================
// <T>统计投资。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiChartSesameFinancialProcessor = function FEaiChartSesameFinancialProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   o._dateSetup               = false;
   // @attribute
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._24HBeginDate            = MO.Class.register(o, new MO.AGetter('_24HBeginDate'));
   o._24HEndDate              = MO.Class.register(o, new MO.AGetter('_24HEndDate'));
   o._dateTimeLag             = MO.Class.register(o, new MO.ASetter('_dateTimeLag'));
   o._firstFetch              = true;
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
   o.onDynamicData            = MO.FEaiChartSesameFinancialProcessor_onDynamicData;
   o.on24HDataFetch           = MO.FEaiChartSesameFinancialProcessor_on24HDataFetch;
   //..........................................................
   // @method
   o.construct                = MO.FEaiChartSesameFinancialProcessor_construct;
   // @method
   o.allocUnit                = MO.FEaiChartSesameFinancialProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartSesameFinancialProcessor_allocShape;
   o.setup                    = MO.FEaiChartSesameFinancialProcessor_setup;
   // @method
   o.calculateCurrent         = MO.FEaiChartSesameFinancialProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartSesameFinancialProcessor_focusEntity;
   o.process                  = MO.FEaiChartSesameFinancialProcessor_process;
   // @method
   o.dispose                  = MO.FEaiChartSesameFinancialProcessor_dispose;

   return o;
}

//==========================================================
// <T>24小时数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiChartSesameFinancialProcessor_on24HDataFetch = function FEaiChartSesameFinancialProcessor_on24HDataFetch(event) {
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
MO.FEaiChartSesameFinancialProcessor_onDynamicData = function FEaiChartSesameFinancialProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo._rankUnits = content.rank;         //table实时数据  suiming
   dynamicInfo._units     = content.collection;  //前三名排行信息 
   var investment_day   = dynamicInfo._investmentCount  = content.investment_day ;   //投资人数   
   var investment_total = dynamicInfo._investmentTotal  = content.investment_total;  // 总投资额度

   // 计算刷新间隔
   var rankUnits = o._rankUnits;
   var items =  rankUnits._items;
   var rankUnitsLength = content.rank.length;
   for (var i= 0;i<rankUnitsLength;i++){
   items[i] = content.rank[i];
   }

   var units = o._units;
   var unitsitems =  units._items;
   var UnitsLength = content.collection.length;
   for (var i= 0;i<UnitsLength;i++){
   unitsitems[i] = content.collection[i];
   }
   var unitCount = units._items.length;
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
// <T>构造处理。</T>nj
//
// @method
//==========================================================
MO.FEaiChartSesameFinancialProcessor_construct = function FEaiChartSesameFinancialProcessor_construct(){
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
// @return FEaiChartSesameFinancialProcessorEntity 实体
//==========================================================
MO.FEaiChartSesameFinancialProcessor_allocUnit = function FEaiChartSesameFinancialProcessor_allocUnit(){
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
MO.FEaiChartSesameFinancialProcessor_setup = function FEaiChartSesameFinancialProcessor_setup(){
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
MO.FEaiChartSesameFinancialProcessor_calculateCurrent = function FEaiChartSesameFinancialProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var investmentTotalCurrent = info.investmentTotal();
   var units = o._units.items();
   var count = units.length;
   for(var i = 0; i < count; i++){
      var unit = units[i];
      investmentCurrent -= unit.investment;
      investmentTotalCurrent -= unit.investment;
   }
   o._invementTotalCurrent = investmentTotalCurrent ;
   o._invementDayCurrent = investmentCurrent ;
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartSesameFinancialProcessor_focusEntity = function FEaiChartSesameFinancialProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   // 显示实体
   var card = unit.card;
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      // 计算级别
      var investment = unit.investment;
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
MO.FEaiChartSesameFinancialProcessor_process = function FEaiChartSesameFinancialProcessor_process() {
   var o = this;

   if (o._dataTicker.process()) {
      var datetimeLag = o._dateTimeLag;

      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.set(MO.Timer.current() + datetimeLag);
      beginDate.truncMinute();
      endDate.assign(beginDate);
      beginDate.addMinute(-o._intervalMinute);

      var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.live}');
      var start = beginDate.format();
      var end = endDate.format();
      var tick = MO.Timer.current();
      var key = "7733b6978b3f19ed";
      var paramStr = start + end + tick + key;
      var token = hex_md5(paramStr);
      url += 'first=' + o._firstFetch + '&begin=' + start + '&end=' + end + '&tick=' + tick + '&token=' + token;
      var connection = MO.Console.find(MO.FJsonConsole).send(url);
      connection.addLoadListener(o, o.onDynamicData);
      o._firstFetch = false;

      // 取24小时统计数据
      // 设置开始时间
      var beginDate24H = o._24HBeginDate;
      beginDate24H.set(MO.Timer.current() + datetimeLag);
      beginDate24H.truncMinute(15);
      beginDate24H.addDay(-1);
      // 设置结束时间
      var endDate24H = o._24HEndDate;
      endDate24H.set(MO.Timer.current() + datetimeLag);
      endDate24H.truncMinute(15);

      var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.24h}');
      var start = beginDate24H.format();
      var end = endDate24H.format();
      var tick = MO.Timer.current();
      var key = "7733b6978b3f19ed";
      var paramStr = start + end + tick + key;
      var token = hex_md5(paramStr);
      url += 'begin=' + start + '&end=' + end + '&tick=' + tick + '&token=' + token;
      var connection = MO.Console.find(MO.FJsonConsole).send(url);
      connection.addLoadListener(o, o.on24HDataFetch);
   }
   //..........................................................
   //设置表格刷新
   var currentTick = MO.Timer.current();
   if (currentTick - o._tableTick > o._tableInterval) {
      // 从开始位置压入
      var units = o._units._items;
      if (!units.length == 0) {
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
MO.FEaiChartSesameFinancialProcessor_dispose = function FEaiChartSesameFinancialProcessor_dispose(){
   var o = this;
   // 释放属性
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
