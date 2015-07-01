with(MO){
   //==========================================================
   // <T>统计投资。</T>
   //
   // @class
   // @author maocy
   // @history 150619
   //==========================================================
   MO.FEaiStatisticsInvestment = function FEaiStatisticsInvestment(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      //..........................................................
      // @attribute
      o._dateSetup       = false;
      o._beginDate       = MO.Class.register(o, new AGetter('_beginDate'));
      o._endDate         = MO.Class.register(o, new AGetter('_endDate'));
      o._invementCurrent = MO.Class.register(o, new AGetter('_invementCurrent'), 0);
      o._invementTotal   = MO.Class.register(o, new AGetter('_invementTotal'));
      o._intervalMinute  = 1;
      // @attribute
      o._mapEntity       = MO.Class.register(o, new AGetSet('_mapEntity'));
      o._display         = MO.Class.register(o, new AGetter('_display'));
      // @attribute
      o._entities        = MO.Class.register(o, new AGetter('_entities'));
      o._tableEntities   = MO.Class.register(o, new AGetter('_tableEntities'));
      o._showShapes      = MO.Class.register(o, new AGetter('_showShapes'));
      // @attribute
      o._tableCount      = 22;
      o._tableInterval   = 1000;
      o._tableTick       = 1;
      o._dataTicker      = null;
      // @attribute
      o._entityPool      = null;
      o._shapePool       = null;
      // @attribute
      o._autio1          = null;
      o._autio2          = null;
      o._autio3          = null;
      o._autio4          = null;
      //..........................................................
      // @method
      o.onInvestment     = FEaiStatisticsInvestment_onInvestment;
      //..........................................................
      // @method
      o.construct        = FEaiStatisticsInvestment_construct;
      o.allocEntity      = FEaiStatisticsInvestment_allocEntity;
      o.allocShape       = FEaiStatisticsInvestment_allocShape;
      o.setup            = FEaiStatisticsInvestment_setup;
      // @method
      o.focusEntity      = FEaiStatisticsInvestment_focusEntity;
      o.process          = FEaiStatisticsInvestment_process;
      // @method
      o.dispose          = FEaiStatisticsInvestment_dispose;
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
      o._invementTotal = content.investment_total;
      // 设置实体集合
      var dataset = content.collection;
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         o._entities.push(entity);
      }
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
      o._beginDate = new TDate();
      o._endDate = new TDate();
      o._entities = new TObjects();
      o._showShapes = new TObjects();
      o._tableEntities = new TObjects();
      o._tableTicker = new TTicker(1000 * o._tableInterval);
      // 5分钟定时
      o._dataTicker = new TTicker(1000 * 60 * o._intervalMinute);
      // 创建表格
      var table = o._dataTable = MO.Class.create(MO.FEaiStatisticsTable);
      table._hTable = document.getElementById('id_investment');
      table._headLineCount = 1;
      // 创建缓冲
      o._entityPool = RClass.create(FObjectPool);
      o._shapePool = RClass.create(FObjectPool);
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
         entity = RClass.create(FEaiStatisticsInvestmentEntity);
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
         shape = RClass.create(FEaiStatisticsInvestmentShape);
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
      //..........................................................
      // 创建声音
      var audio = o._autio1 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/1.mp3');
      var audio = o._autio2 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/2.mp3');
      var audio = o._autio3 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/3.mp3');
      var audio = o._autio4 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/4.mp3');
      // 设置变量
      var display = o._display = RClass.create(FE3dDisplay);
      display.linkGraphicContext(o);
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
      var cityConsole = RConsole.find(FEaiResourceConsole).cityConsole();
      var cityEntity = o._mapEntity.findCityByCard(card);
      // 显示实体
      if(cityEntity){
         // 更新数据
         cityEntity.addInvestmentTotal(investment);
         o._mapEntity.upload();
         // 播放声音
         if(investment >= 1000000){
            o._autio4.play(0);
         }else if(investment >= 100000){
            o._autio3.play(0);
         }else if(investment >= 10000){
            o._autio2.play(0);
         }else if(investment >= 1000){
            o._autio1.play(0);
         }
         // 创建渲染对象
         //var shape = o.allocShape();
         //shape.setCityEntity(cityEntity)
         //shape.setEntity(entity)
         //shape.dirty()
         //o._display.push(shape);
         //o._showShapes.push(shape);
      }
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
      var system = RConsole.find(FEaiLogicConsole).system();
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
         var statistics = RConsole.find(FEaiLogicConsole).statistics();
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
      var currentTick = RTimer.current();
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
            //..........................................................
            // 刷新表格
            var table = o._dataTable;
            var count = o._tableEntities.count();
            table.setDataCount(count);
            var date = new MO.TDate();
            for(var i = 0; i < count; i++){
               var entity = o._tableEntities.at(i);
               var row = table.dataRow(i);
               date.parse(entity.date());
               row.cells[0].innerHTML = date.format('HH24:MI:SS');
               var cityEntity = o._mapEntity.findCityByCard(entity.card());
               if(cityEntity){
                  row.cells[1].innerHTML = cityEntity.data().label();
               }else{
                  row.cells[1].innerHTML = '';
               }
               row.cells[2].innerHTML = entity.customer() + ' - ' + entity.phone();
               var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
               if(investment.length > 7){
                  var high = investment.substring(0, investment.length - 7);
                  var low = investment.substring(investment.length - 7, investment.length);
                  row.cells[3].innerHTML = '<FONT color="#FF4482">' + high + '</FONT>' + low;
               }else{
                  row.cells[3].innerHTML = investment;
               }
            }
         }
         // 计算总数
         var count = entities.count();
         o._invementCurrent = o._invementTotal;
         for(var i = 0; i < count; i++){
            var entity = entities.at(i);
            o._invementCurrent -= entity.investment()
         }
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
      o._entities = RObject.dispose(o._entities);
      o._showShapes = RObject.dispose(o._showShapes);
      o._dataTicker = RObject.dispose(o._dataTicker);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
