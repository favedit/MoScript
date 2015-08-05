//==========================================================
// <T>统计投资。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiChartMarketerProcessor = function FEaiChartMarketerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._intervalMinute          = 1;
   // @attribute
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   // @attribute
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableUnits              = MO.Class.register(o, new MO.AGetter('_tableUnits'));
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
   //..........................................................
   // @method
   o.onDynamicData             = MO.FEaiChartMarketerProcessor_onDynamicData;
   //..........................................................
   // @method
   o.construct                = MO.FEaiChartMarketerProcessor_construct;
   // @method
   o.allocUnit                = MO.FEaiChartMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartMarketerProcessor_setup;
   // @method
   o.calculateInvestmentLevel = MO.FEaiChartMarketerProcessor_calculateInvestmentLevel;
   o.calculateCurrent         = MO.FEaiChartMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartMarketerProcessor_process;
   // @method
   o.dispose                  = MO.FEaiChartMarketerProcessor_dispose;
   return o;
}

//==========================================================
// <T>统计投资数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerProcessor_onDynamicData = function FEaiChartMarketerProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(event.content);
   // 读取数据
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserialize(view);
   // 读取数据
   var units = o._units;
   var count = view.readInt32();
   for(var i = 0; i < count; i++){
      var unit = o.allocUnit();
      unit.unserialize(view);
      units.push(unit);
   }
   // 释放数据
   view.dispose();
   //..........................................................
   // 计算刷新间隔
   var unitCount = units.count();
   o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   o._tableTick = 0;
   //..........................................................
   // 触发数据事件
   var changeEvent = o._eventDataChanged;
   changeEvent.unit = null;
   changeEvent.rank = o._rankUnits;
   changeEvent.data = o._tableUnits;
   o.processDataChangedListener(changeEvent);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerProcessor_construct = function FEaiChartMarketerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置变量
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableUnits = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   // 定时获取数据
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   // 创建缓冲
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMarketerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}

//==========================================================
// <T>收集实体。</T>
//
// @method
// @return FEaiChartMarketerProcessorEntity 实体
//==========================================================
MO.FEaiChartMarketerProcessor_allocUnit = function FEaiChartMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMarketerDynamicUnit);
   }
   return unit;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerProcessor_setup = function FEaiChartMarketerProcessor_setup(){
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
// <T>计算投资级别。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerProcessor_calculateInvestmentLevel = function FEaiChartMarketerProcessor_calculateInvestmentLevel(investment){
   var o = this;
   if(investment >= 5000000){
      return 5;
   }else if(investment >= 1000000){
      return 4;
   }else if(investment >= 100000){
      return 3;
   }else if(investment >= 10000){
      return 2;
   }else if(investment >= 1000){
      return 1;
   }
   return 0;
}

//==========================================================
// <T>计算当前数值。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerProcessor_calculateCurrent = function FEaiChartMarketerProcessor_calculateCurrent(){
   var o = this;
   //var invementDay = o._invementDay;
   //var invementTotal = o._invementTotal;
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var amount = unit.customerActionAmount();
      //invementDay -= amount;
      //invementTotal -= amount;
   }
   //o._invementDayCurrent = Math.max(invementDay, 0);
   //o._invementTotalCurrent = Math.max(invementTotal, 0);
   //if(invementDay > o._invementDayCurrent){
   //   o._invementDayCurrent = invementDay;
   //}
   //if(invementTotal > o._invementTotalCurrent){
   //   o._invementTotalCurrent = invementTotal;
   //}
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerProcessor_focusEntity = function FEaiChartMarketerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   // 显示实体
   var card = unit.customerCard();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      // 计算级别
      //var investment = unit.investment();
      //var level = o.calculateInvestmentLevel(investment);
      // 更新省份数据
      //var provinceCode = cityEntity.data().provinceCode();
      //var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      //if(provinceEntity){
      //   provinceEntity.doInvestment(level, investment);
      //}
      // 更新城市数据
      //cityEntity.addInvestmentTotal(level, investment);
      //o._mapEntity.upload();
      // 播放声音
      //var autio = o._autios[level];
      //if(autio){
      //   autio.play(0);
      //}
   }
   //..........................................................
   // 触发事件
   var changedEvent = o._eventDataChanged;
   changedEvent.unit = unit;
   changedEvent.rank = o._rankUnits;
   changedEvent.data = o._tableUnits;
   o.processDataChangedListener(changedEvent);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiChartMarketerProcessor_process = function FEaiChartMarketerProcessor_process(){
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
      statistics.doMarketerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      // 设置开始时间
      beginDate.assign(endDate);
   }
   //..........................................................
   // 设置表格刷新
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      // 大于个数从尾部弹出
      if(o._tableUnits.count() >= o._tableCount){
         var unit = o._tableUnits.pop();
         o._unitPool.free(unit);
      }
      // 从开始位置压入
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o._tableUnits.unshift(unit);
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
   dynamicInfo._investmentTableEntityCount = o._tableUnits.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerProcessor_dispose = function FEaiChartMarketerProcessor_dispose(){
   var o = this;
   // 释放属性
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   // 父处理
   o.__base.FObject.dispose.call(o);
}