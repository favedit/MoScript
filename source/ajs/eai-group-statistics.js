with(MO){
   MO.FEaiStatisticsInvestment = function FEaiStatisticsInvestment(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._dateSetup       = false;
      o._beginDate       = MO.Class.register(o, new AGetter('_beginDate'));
      o._endDate         = MO.Class.register(o, new AGetter('_endDate'));
      o._invementCurrent = MO.Class.register(o, new AGetter('_invementCurrent'));
      o._invementTotal   = MO.Class.register(o, new AGetter('_invementTotal'));
      o._intervalMinute  = 1;
      o._mapEntity       = MO.Class.register(o, new AGetSet('_mapEntity'));
      o._display         = MO.Class.register(o, new AGetter('_display'));
      o._entities        = MO.Class.register(o, new AGetter('_entities'));
      o._tableEntities   = MO.Class.register(o, new AGetter('_tableEntities'));
      o._showEntities    = MO.Class.register(o, new AGetter('_showEntities'));
      o._tableCount      = 24;
      o._tableInterval   = 1000;
      o._tableTick       = 1;
      o._dataTicker      = null;
      o._entityPool      = null;
      o._shapePool       = null;
      o.onInvestment     = FEaiStatisticsInvestment_onInvestment;
      o.construct        = FEaiStatisticsInvestment_construct;
      o.allocEntity      = FEaiStatisticsInvestment_allocEntity;
      o.allocShape       = FEaiStatisticsInvestment_allocShape;
      o.setup            = FEaiStatisticsInvestment_setup;
      o.focusEntity      = FEaiStatisticsInvestment_focusEntity;
      o.process          = FEaiStatisticsInvestment_process;
      o.dispose          = FEaiStatisticsInvestment_dispose;
      return o;
   }
   MO.FEaiStatisticsInvestment_onInvestment = function FEaiStatisticsInvestment_onInvestment(event){
      var o = this;
      var content = event.content;
      o._invementTotal = content.investment_total;
      var dataset = content.collection;
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         o._entities.push(entity);
      }
      var entityCount = o._entities.count();
      o._tableInterval = 1000 * 60 * o._intervalMinute / entityCount;
      o._tableTick = 0;
   }
   MO.FEaiStatisticsInvestment_construct = function FEaiStatisticsInvestment_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._beginDate = new TDate();
      o._endDate = new TDate();
      o._entities = new TObjects();
      o._showEntities = new TObjects();
      o._tableEntities = new TObjects();
      o._tableTicker = new TTicker(1000 * o._tableInterval);
      o._dataTicker = new TTicker(1000 * 60 * o._intervalMinute);
      var table = o._dataTable = MO.Class.create(MO.FEaiTable);
      table._hTable = document.getElementById('id_investment');
      table._headLineCount = 1;
      o._entityPool = RClass.create(FObjectPool);
      o._shapePool = RClass.create(FObjectPool);
   }
   MO.FEaiStatisticsInvestment_allocEntity = function FEaiStatisticsInvestment_allocEntity(){
      var o = this;
      var entity = o._entityPool.alloc();
      if(!entity){
         entity = RClass.create(FEaiStatisticsInvestmentEntity);
      }
      return entity;
   }
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
   MO.FEaiStatisticsInvestment_setup = function FEaiStatisticsInvestment_setup(){
      var o = this;
      var display = o._display = RClass.create(FE3dDisplay);
      display.linkGraphicContext(o);
   }
   MO.FEaiStatisticsInvestment_focusEntity = function FEaiStatisticsInvestment_focusEntity(entity){
      var o = this;
      var card = entity.card();
      var investment = entity.investment();
      var cityConsole = RConsole.find(FEaiResourceConsole).cityConsole();
      var cityEntity = o._mapEntity.findCityByCard(card);
      if(cityEntity){
         cityEntity.addInvestmentTotal(investment);
         o._mapEntity.upload();
      }
   }
   MO.FEaiStatisticsInvestment_process = function FEaiStatisticsInvestment_process(){
      var o = this;
      var system = RConsole.find(FEaiLogicConsole).system();
      if(!system.testReady()){
         return;
      }
      var systemDate = system.currentDate();
      if(!o._dateSetup){
         o._endDate.assign(systemDate);
         o._endDate.addMinute(-o._intervalMinute);
         o._dateSetup = true;
      }
      if(o._dataTicker.process()){
         var statistics = RConsole.find(FEaiLogicConsole).statistics();
         var beginDate = o._beginDate;
         var endDate = o._endDate;
         beginDate.assign(endDate);
         endDate.assign(systemDate);
         statistics.doInvestmentDynamic(o, o.onInvestment, beginDate.format(), endDate.format());
         beginDate.assign(endDate);
      }
      var currentTick = RTimer.current();
      if(currentTick - o._tableTick > o._tableInterval){
         if(o._tableEntities.count() > o._tableCount){
            o._tableEntities.pop();
         }
         var entities = o._entities;
         if(!entities.isEmpty()){
            var entity = entities.shift();
            o._tableEntities.unshift(entity);
            o.focusEntity(entity);
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
         var count = entities.count();
         o._invementCurrent = o._invementTotal;
         for(var i = 0; i < count; i++){
            var entity = entities.at(i);
            o._invementCurrent -= entity.investment()
         }
         o._tableTick = currentTick;
      }
      o._mapEntity.process();
   }
   MO.FEaiStatisticsInvestment_dispose = function FEaiStatisticsInvestment_dispose(){
      var o = this;
      o._entities = RObject.dispose(o._entities);
      o._dataTicker = RObject.dispose(o._dataTicker);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiStatisticsInvestmentEntity = function FEaiStatisticsInvestmentEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._date       = RClass.register(o, new AGetter('_date'));
      o._customer   = RClass.register(o, new AGetter('_customer'));
      o._phone      = RClass.register(o, new AGetter('_phone'));
      o._card       = RClass.register(o, new AGetter('_card'));
      o._investment = RClass.register(o, new AGetter('_investment'));
      o._shape      = RClass.register(o, new AGetSet('_shape'));
      o.construct   = FEaiStatisticsInvestmentEntity_construct;
      o.loadData    = FEaiStatisticsInvestmentEntity_loadData;
      o.update      = FEaiStatisticsInvestmentEntity_update;
      o.dispose     = FEaiStatisticsInvestmentEntity_dispose;
      return o;
   }
   MO.FEaiStatisticsInvestmentEntity_construct = function FEaiStatisticsInvestmentEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiStatisticsInvestmentEntity_loadData = function FEaiStatisticsInvestmentEntity_loadData(data){
      var o = this;
      o._date = data.date;
      o._customer = data.customer;
      o._phone = data.phone;
      o._card = data.card;
      o._investment = data.investment;
   }
   MO.FEaiStatisticsInvestmentEntity_build = function FEaiStatisticsInvestmentEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }
   MO.FEaiStatisticsInvestmentEntity_update = function FEaiStatisticsInvestmentEntity_update(data){
      var o = this;
      var location = o._data.location();
      var range = 1;
      if(data){
         var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
         var investmentCityTotal = historyConsole.investmentCityTotal();
         var rateInfo = RConsole.find(FEaiResourceConsole).rateConsole().find(EEaiRate.Map);
         var rate = Math.sqrt(data.investmentTotal() / investmentCityTotal) * 5;
         var color = rateInfo.findRate(rate);
         range = rate * 10;
         rate = RFloat.toRange(rate, 0, 1);
         o._color.set(((color >> 16) & 0xFF) / 255, ((color >> 8) & 0xFF) / 255, ((color >> 0) & 0xFF) / 255, rate * 4);
      }else{
         o._color.set(0, 0, 0, 0);
      }
      range = o._range = RFloat.toRange(Math.sqrt(range), 1, 4);
      o._size.set(range, range);
   }
   MO.FEaiStatisticsInvestmentEntity_dispose = function FEaiStatisticsInvestmentEntity_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiStatisticsInvestmentShape = function FEaiStatisticsInvestmentShape(o){
      o = RClass.inherits(this, o, FE3dShape);
      o._ready       = false;
      o._image       = null;
      o._statusPaint = false;
      o._cityEntity  = RClass.register(o, new AGetSet('_cityEntity'));
      o._entity      = RClass.register(o, new AGetSet('_entity'));
      o.onImageLoad  = FEaiStatisticsInvestmentShape_onImageLoad;
      o.construct    = FEaiStatisticsInvestmentShape_construct;
      o.setup        = FEaiStatisticsInvestmentShape_setup;
      o.paint        = FEaiStatisticsInvestmentShape_paint;
      o.process      = FEaiStatisticsInvestmentShape_process;
      o.dispose      = FEaiStatisticsInvestmentShape_dispose;
      return o;
   }
   MO.FEaiStatisticsInvestmentShape_onImageLoad = function FEaiStatisticsInvestmentShape_onImageLoad(event){
      var o = this;
      o._ready = true;
   }
   MO.FEaiStatisticsInvestmentShape_construct = function FEaiStatisticsInvestmentShape_construct(){
      var o = this;
      o.__base.FE3dShape.construct.call(o);
   }
   MO.FEaiStatisticsInvestmentShape_setup = function FEaiStatisticsInvestmentShape_setup(){
      var o = this;
      o.__base.FE3dShape.setup.call(o);
      var renderable = o._renderable = RClass.create(FE3dShapeData);
      renderable.linkGraphicContext(o);
      renderable.size().set(256, 256);
      renderable.setup();
      var image = o._image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl('/script/ars/eai/investment.png');
      o._ready = false;
   }
   MO.FEaiStatisticsInvestmentShape_paint = function FEaiStatisticsInvestmentShape_paint(){
      var o = this;
      var cityEntity = o._cityEntity;
      var location = cityEntity.location();
      var renderable = o._renderable;
      var investment = o._entity.investment();
      var matrix = o._matrix;
      matrix.tx = location.x;
      matrix.ty = location.y;
      matrix.tz = 0;
      matrix.setScaleAll(1);
      matrix.update();
      var graphic = renderable.beginDraw();
      graphic.fillRectangle(0, 0, 256, 256, '#FF00FF');
      graphic.drawImage(o._image, 0, 0, 256, 256);
      graphic.drawText(10, 10, investment);
      renderable.endDraw();
      o._statusPaint = true;
   }
   MO.FEaiStatisticsInvestmentShape_process = function FEaiStatisticsInvestmentShape_process(region){
      var o = this;
      o.__base.FE3dShape.process.call(o, region);
      if(o._statusDirty){
         if(o.testReady()){
            if(!o._statusPaint){
               o.paint();
               o._statusPaint = true;
            }
            o._statusDirty = false;
         }
      }
   }
   MO.FEaiStatisticsInvestmentShape_dispose = function FEaiStatisticsInvestmentShape_dispose(){
      var o = this;
      o.__base.FE3dShape.dispose.call(o);
   }
}
