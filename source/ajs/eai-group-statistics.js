with(MO){
   MO.FEaiStatisticsInvestment = function FEaiStatisticsInvestment(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._dateSetup       = false;
      o._beginDate       = MO.Class.register(o, new AGetter('_beginDate'));
      o._endDate         = MO.Class.register(o, new AGetter('_endDate'));
      o._invementCurrent = MO.Class.register(o, new AGetter('_invementCurrent'), 0);
      o._invementTotal   = MO.Class.register(o, new AGetter('_invementTotal'));
      o._intervalMinute  = 1;
      o._mapEntity       = MO.Class.register(o, new AGetSet('_mapEntity'));
      o._display         = MO.Class.register(o, new AGetter('_display'));
      o._entities        = MO.Class.register(o, new AGetter('_entities'));
      o._tableEntities   = MO.Class.register(o, new AGetter('_tableEntities'));
      o._showShapes      = MO.Class.register(o, new AGetter('_showShapes'));
      o._tableCount      = 22;
      o._tableInterval   = 1000;
      o._tableTick       = 1;
      o._dataTicker      = null;
      o._entityPool      = null;
      o._shapePool       = null;
      o._autio1          = null;
      o._autio2          = null;
      o._autio3          = null;
      o._autio4          = null;
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
      o._showShapes = new TObjects();
      o._tableEntities = new TObjects();
      o._tableTicker = new TTicker(1000 * o._tableInterval);
      o._dataTicker = new TTicker(1000 * 60 * o._intervalMinute);
      var table = o._dataTable = MO.Class.create(MO.FEaiStatisticsTable);
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
      var audio = o._autio1 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/1.mp3');
      var audio = o._autio2 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/2.mp3');
      var audio = o._autio3 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/3.mp3');
      var audio = o._autio4 = MO.Class.create(MO.FAudio);
      audio.loadUrl('/script/ars/eai/currency/4.mp3');
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
         if(investment >= 1000000){
            o._autio4.play(0);
         }else if(investment >= 100000){
            o._autio3.play(0);
         }else if(investment >= 10000){
            o._autio2.play(0);
         }else if(investment >= 1000){
            o._autio1.play(0);
         }
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
            var entity = o._tableEntities.pop();
            o._entityPool.free(entity);
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
   MO.FEaiStatisticsInvestment_dispose = function FEaiStatisticsInvestment_dispose(){
      var o = this;
      o._entities = RObject.dispose(o._entities);
      o._showShapes = RObject.dispose(o._showShapes);
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
      o._ready         = false;
      o._playing       = false;
      o._finish        = false;
      o._image         = null;
      o._statusPaint   = false;
      o._cityEntity    = RClass.register(o, new AGetSet('_cityEntity'));
      o._entity        = RClass.register(o, new AGetter('_entity'));
      o._customerLabel = null;
      o._cityLabel     = null;
      o._investment    = null;
      o._interval      = 10;
      o._moveRate      = 0;
      o._lastTick      = 0;
      o.onImageLoad    = FEaiStatisticsInvestmentShape_onImageLoad;
      o.construct      = FEaiStatisticsInvestmentShape_construct;
      o.setup          = FEaiStatisticsInvestmentShape_setup;
      o.setEntity      = FEaiStatisticsInvestmentShape_setEntity;
      o.paint          = FEaiStatisticsInvestmentShape_paint;
      o.process        = FEaiStatisticsInvestmentShape_process;
      o.dispose        = FEaiStatisticsInvestmentShape_dispose;
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
      renderable.setOptionCenter(true);
      renderable.size().set(128, 64);
      renderable.setup();
      var image = o._image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl('/script/ars/eai/investment.png');
      o._ready = false;
   }
   MO.FEaiStatisticsInvestmentShape_setEntity = function FEaiStatisticsInvestmentShape_setEntity(entity){
      var o = this;
      o._customerLabel = entity.customer();
      o._cityLabel = o._cityEntity.data().label();
      o._investment = entity.investment();
      o._finish = false;
   }
   MO.FEaiStatisticsInvestmentShape_paint = function FEaiStatisticsInvestmentShape_paint(){
      var o = this;
      var cityEntity = o._cityEntity;
      var location = cityEntity.location();
      var material = o.material();
      material.info().optionAlpha = true;
      material.info().ambientColor.set(1, 1, 1, 1);
      var matrix = o._matrix;
      matrix.tx = location.x;
      matrix.ty = location.y;
      matrix.tz = 0;
      matrix.setScale(10, 5, 1);
      matrix.update();
      var renderable = o._renderable;
      var graphic = renderable.beginDraw();
      graphic.drawImage(o._image, 0, 0, 128, 64);
      graphic.setFont('bold 18px Microsoft YaHei');
      graphic.drawText(o._cityLabel, 15, 25, '#FF00FF');
      graphic.setFont('bold 20px Microsoft YaHei');
      graphic.drawText(o._customerLabel, 30, 50, '#FFFF00');
      graphic.setFont('bold 20px Microsoft YaHei');
      graphic.drawText(o._investment, 55, 50, '#FF0000');
      renderable.endDraw();
      o._statusPaint = true;
      o._playing = true;
      o._lastTick = 0;
      o._moveRate = 0;
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
      if(o._statusPaint && !o._finish){
         var tick = RTimer.current();
         var matrix = o._matrix;
         if(tick - o._lastTick > o._interval){
            matrix.ty += o._moveRate + 0.01;
            o._moveRate += 0.01;
            matrix.updateForce();
            o._lastTick = tick;
         }
         if(matrix.ty > 100){
            o._finish = true;
         }
      }
   }
   MO.FEaiStatisticsInvestmentShape_dispose = function FEaiStatisticsInvestmentShape_dispose(){
      var o = this;
      o.__base.FE3dShape.dispose.call(o);
   }
}
with(MO){
   MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o){
      o = RClass.inherits(this, o, FGuiLabel);
      o._value        = RClass.register(o, new AGetSet('_value'), '0');
      o._currentValue = '0';
      o._ticker       = null;
      o.onPaintLabel = FEaiStatisticsLabel_onPaintLabel;
      o.construct    = FEaiStatisticsLabel_construct;
      o.updateValue  = FEaiStatisticsLabel_updateValue;
      o.process      = FEaiStatisticsLabel_process;
      return o;
   }
   MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event){
      var o = this;
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      if(o._foreFont){
         graphic.setFont(o._foreFont);
      }
      var label = o._label;
      var labelLength = label.length;
      var labelH = null;
      if(labelLength > 8){
         labelH = label.substring(0, labelLength - 8);
      }
      var labelM = null;
      if(labelLength > 4){
         labelM = label.substring(labelLength - 8, labelLength - 4);
      }
      var labelL = null;
      if(labelLength > 0){
         labelL = label.substring(labelLength - 4, labelLength);
      }
      var width = graphic.textWidth(label);
      var widthH = graphic.textWidth(labelH);
      var widthM = graphic.textWidth(labelM);
      var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
      var y = rectangle.top + rectangle.height * 0.5 + 3;
      if(labelH != null){
         graphic.drawText(labelH, x, y, '#FD0000');
      }
      if(labelM != null){
         graphic.drawText(labelM, x + widthH, y, '#FF7200');
      }
      if(labelL != null){
         graphic.drawText(labelL, x + widthH + widthM, y, '#FFD926');
      }
   }
   MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct(){
      var o = this;
      o.__base.FGuiLabel.construct.call(o);
      o._ticker = new TTicker(200);
   }
   MO.FEaiStatisticsLabel_updateValue = function FEaiStatisticsLabel_updateValue(){
      var o = this;
      var value = o._value;
      var currentValue = o._currentValue;
      var length = value.length;
      var result = '';
      var changed = false;
      for(var i = length - 1; i >= 0; i--){
         var vchar = value.charAt(i);
         vchar = parseInt(vchar);
         var cchar = currentValue.charAt(i);
         if(cchar == ''){
            cchar = 0;
         }else{
            cchar = parseInt(cchar);
         }
         if(!changed && vchar != cchar){
            cchar++;
            if(cchar > 9){
               cchar = 0;
            }
            changed = true;
         }
         result = cchar + result;
      }
      o._label = result;
      o._currentValue = result;
   }
   MO.FEaiStatisticsLabel_process = function FEaiStatisticsLabel_process(event){
      var o = this;
      var value = o._value;
      var currentValue = o._currentValue;
      if(value != currentValue){
         if(o._ticker.process()){
            o.updateValue();
            return true;
         }
      }
      return false;
   }
}
with(MO){
   MO.FEaiStatisticsTable = function FEaiStatisticsTable(o){
      o = RClass.inherits(this, o, FEaiTable);
      o.createRow      = FEaiCityEntity_createRow;
      return o;
   }
   MO.FEaiCityEntity_createRow = function FEaiCityEntity_createRow(){
      var o = this;
      var hRow = RBuilder.appendTableRow(o._hTable);
      hRow.className = 'Investment_DataGrid_Row';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'center';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'center';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'center';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'right';
   }
}
