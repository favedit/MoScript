//==========================================================
// <T>统计投资。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiStatisticsInvestment = function FEaiStatisticsInvestment(o){
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
   o._intervalMinute          = 2;
   // @attribute
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   // @attribute
   o._rankEntities            = MO.Class.register(o, new MO.AGetter('_rankEntities'));
   o._entities                = MO.Class.register(o, new MO.AGetter('_entities'));
   o._tableEntities           = MO.Class.register(o, new MO.AGetter('_tableEntities'));
   o._showShapes              = MO.Class.register(o, new MO.AGetter('_showShapes'));
   // @attribute
   o._tableCount              = 21;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   // @attribute
   o._entityPool              = null;
   o._shapePool               = null;
   // @attribute
   o._autios                  = null;
   // @event
   o._listenersDataChanged  = MO.RClass.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @method
   o.onInvestment             = MO.FEaiStatisticsInvestment_onInvestment;
   //..........................................................
   // @method
   o.construct                = MO.FEaiStatisticsInvestment_construct;
   o.allocEntity              = MO.FEaiStatisticsInvestment_allocEntity;
   o.allocShape               = MO.FEaiStatisticsInvestment_allocShape;
   o.setup                    = MO.FEaiStatisticsInvestment_setup;
   // @method
   o.calculateInvestmentLevel = MO.FEaiStatisticsInvestment_calculateInvestmentLevel;
   o.calculateCurrent         = MO.FEaiStatisticsInvestment_calculateCurrent;
   o.focusEntity              = MO.FEaiStatisticsInvestment_focusEntity;
   o.process                  = MO.FEaiStatisticsInvestment_process;
   // @method
   o.dispose                  = MO.FEaiStatisticsInvestment_dispose;
   return o;
}

//==========================================================
// <T>统计投资数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsInvestment_onInvestment = function FEaiStatisticsInvestment_onInvestment(event){
   var o = this;
   var content = event.content;
   // 设置总量
   o._invementDay = content.investment_day;
   o._invementTotal = content.investment_total;
   //..........................................................
   // 设置排行实体集合
   var rankEntities = o._rankEntities;
   var count = rankEntities.count();
   for(var i = 0; i < count; i++){
      var entity = rankEntities.at(i);
      o._entityPool.free(entity);
   }
   rankEntities.clear();
   var dataset = content.rank;
   if(dataset){
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         rankEntities.push(entity);
      }
   }
   //..........................................................
   // 设置实体集合
   var dataset = content.collection;
   if(dataset){
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         o._entities.push(entity);
      }
   }
   // 计算当前内容
   o.calculateCurrent();
   //..........................................................
   // 触发数据事件
   var dsEvent = MO.Memory.alloc(MO.SEvent);
   dsEvent.sender = o;
   dsEvent.entity = null;
   dsEvent.rank = o._rankEntities;
   dsEvent.data = o._tableEntities;
   o.processDataChangedListener(dsEvent);
   MO.Memory.free(dsEvent);
   //..........................................................
   // 计算间隔
   var entityCount = o._entities.count();
   o._tableInterval = 1000 * 60 * o._intervalMinute / entityCount;
   o._tableTick = 0;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsInvestment_construct = function FEaiStatisticsInvestment_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置变量
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._entities = new MO.TObjects();
   o._showShapes = new MO.TObjects();
   o._tableEntities = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   // 5分钟定时
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   // 创建表格
   var table = o._dataTable = MO.Class.create(MO.FEaiStatisticsTable);
   table._hTable = document.getElementById('id_investment');
   table._headLineCount = 1;
   // 创建缓冲
   o._rankEntities = new MO.TObjects();
   o._entityPool = MO.Class.create(MO.FObjectPool);
   o._shapePool = MO.Class.create(MO.FObjectPool);
}

//==========================================================
// <T>收集实体。</T>
//
// @method
// @return FEaiStatisticsInvestmentEntity 实体
//==========================================================
MO.FEaiStatisticsInvestment_allocEntity = function FEaiStatisticsInvestment_allocEntity(){
   var o = this;
   var entity = o._entityPool.alloc();
   if(!entity){
      entity = MO.Class.create(MO.FEaiStatisticsInvestmentEntity);
   }
   return entity;
}

//==========================================================
// <T>收集形状。</T>
//
// @method
// @return FEaiStatisticsInvestmentShape 形状
//==========================================================
MO.FEaiStatisticsInvestment_allocShape = function FEaiStatisticsInvestment_allocShape(){
   var o = this;
   var shape = o._shapePool.alloc();
   if(!shape){
      shape = MO.Class.create(MO.FEaiStatisticsInvestmentShape);
      shape.linkGraphicContext(o);
      shape.setup();
   }
   return shape;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsInvestment_setup = function FEaiStatisticsInvestment_setup(){
   var o = this;
   if(MO.Runtime.isPlatformMobile()){
      o._tableCount = 12;
   }else{
      o._tableCount = 20;
   }
   //..........................................................
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
MO.FEaiStatisticsInvestment_calculateInvestmentLevel = function FEaiStatisticsInvestment_calculateInvestmentLevel(investment){
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
MO.FEaiStatisticsInvestment_calculateCurrent = function FEaiStatisticsInvestment_calculateCurrent(){
   var o = this;
   var invementDay = o._invementDay;
   var invementTotal = o._invementTotal;
   var entities = o._entities;
   var count = entities.count();
   for(var i = 0; i < count; i++){
      var entity = entities.at(i);
      var investment = entity.investment();
      invementDay -= investment;
      invementTotal -= investment;
   }
   o._invementDayCurrent = Math.max(invementDay, 0);
   o._invementTotalCurrent = Math.max(invementTotal, 0);
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
MO.FEaiStatisticsInvestment_focusEntity = function FEaiStatisticsInvestment_focusEntity(entity){
   var o = this;
   var card = entity.card();
   var investment = entity.investment();
   // 获得城市
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntity = o._mapEntity.findCityByCard(card);
   // 显示实体
   if(cityEntity){
      // 计算级别
      var level = o.calculateInvestmentLevel(investment);
      // 更新省份数据
      var provinceCode = cityEntity.data().provinceCode();
      var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
      var province = provinceConsole.findByCode(provinceCode);
      var provinceEntity = o._mapEntity.findProvinceByCard(provinceCode);
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
      // 创建渲染对象
      //var shape = o.allocShape();
      //shape.setCityEntity(cityEntity)
      //shape.setEntity(entity)
      //shape.dirty()
      //o._display.push(shape);
      //o._showShapes.push(shape);
   }
   //..........................................................
   // 触发事件
   var dsEvent = MO.Memory.alloc(MO.SEvent);
   dsEvent.sender = o;
   dsEvent.entity = entity;
   dsEvent.rank = o._rankEntities;
   dsEvent.data = o._tableEntities;
   o.processDataChangedListener(dsEvent);
   MO.Memory.free(dsEvent);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiStatisticsInvestment_process = function FEaiStatisticsInvestment_process(){
   var o = this;
   //..........................................................
   // 获得系统时间
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
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
      statistics.doInvestmentDynamic(o, o.onInvestment, beginDate.format(), endDate.format());
      // 设置开始时间
      beginDate.assign(endDate);
   }
   //..........................................................
   // 设置表格刷新
   var currentTick = MO.RTimer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      // 大于个数从尾部弹出
      if(o._tableEntities.count() > o._tableCount){
         var entity = o._tableEntities.pop();
         o._entityPool.free(entity);
      }
      // 从开始位置压入
      var entities = o._entities;
      if(!entities.isEmpty()){
         var entity = entities.shift();
         o._tableEntities.unshift(entity);
         // 设置实体焦点
         o.focusEntity(entity);
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
   // 测试释放实体
   var shapes = o._showShapes;
   var count = shapes.count();
   for(var i = count - 1; i >= 0; i--){
      var shape = shapes.at(i);
      if(shape._finish){
         shapes.erase(i)
         o._display.removeRenderable(shape);
         o._shapePool.free(shape);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsInvestment_dispose = function FEaiStatisticsInvestment_dispose(){
   var o = this;
   o._entities = MO.RObject.dispose(o._entities);
   o._showShapes = MO.RObject.dispose(o._showShapes);
   o._dataTicker = MO.RObject.dispose(o._dataTicker);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
