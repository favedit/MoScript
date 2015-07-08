MO.FEaiStatisticsDate = function FEaiStatisticsDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   o._value       = MO.Class.register(o, new MO.AGetter('_value'));
   o.onPaintLabel = MO.FEaiStatisticsDate_onPaintLabel;
   o.construct    = MO.FEaiStatisticsDate_construct;
   o.setValue     = MO.FEaiStatisticsDate_setValue;
   o.dispose      = MO.FEaiStatisticsDate_dispose;
   return o;
}
MO.FEaiStatisticsDate_onPaintLabel = function FEaiStatisticsDate_onPaintLabel(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   if(o._foreFont){
      graphic.setFont(o._foreFont);
   }
   var year = o._value.format('YYYY');
   var month = o._value.format('MM');
   var day = o._value.format('DD');
   var label = o._label;
   var labelLength = label.length;
   var yearValue = year + '年';
   var monthValue = month + '月';
   var dayValue = day + '日';
   var text = yearValue + monthValue + dayValue;
   var width = graphic.textWidth(text);
   var widthYear = graphic.textWidth(yearValue);
   var widthMonth = graphic.textWidth(monthValue);
   var x = rectangle.left;
   var y = rectangle.top + rectangle.height;
   var textWidth = graphic.textWidth(year);
   graphic.drawText(year, x, y, '#FFD926');
   graphic.drawText('年', x + textWidth, y - 1, '#00B5F6');
   var textWidth = graphic.textWidth(month);
   graphic.drawText(month, x + widthYear, y, '#FFD926');
   graphic.drawText('月', x + widthYear + textWidth, y - 1, '#00B5F6');
   var textWidth = graphic.textWidth(day);
   graphic.drawText(day, x + widthYear + widthMonth, y, '#FFD926');
   graphic.drawText('日', x + widthYear + widthMonth + textWidth, y - 1, '#00B5F6');
}
MO.FEaiStatisticsDate_construct = function FEaiStatisticsDate_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   o._value = new MO.TDate();
}
MO.FEaiStatisticsDate_setValue = function FEaiStatisticsDate_setValue(value){
   var o = this;
   o._value.parse(value, 'YYYYMMDD');
   o.dirty()
}
MO.FEaiStatisticsDate_dispose = function FEaiStatisticsDate_dispose(){
   var o = this;
   o._value = MO.Lang.Object.dispose(o._value);
   o.__base.FGuiLabel.dispose.call(o);
}
MO.FEaiStatisticsInvestment = function FEaiStatisticsInvestment(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._intervalMinute          = 2;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankEntities            = MO.Class.register(o, new MO.AGetter('_rankEntities'));
   o._entities                = MO.Class.register(o, new MO.AGetter('_entities'));
   o._tableEntities           = MO.Class.register(o, new MO.AGetter('_tableEntities'));
   o._showShapes              = MO.Class.register(o, new MO.AGetter('_showShapes'));
   o._tableCount              = 21;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._entityPool              = null;
   o._shapePool               = null;
   o._autios                  = null;
   o._listenersDataChanged  = MO.RClass.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onInvestment             = MO.FEaiStatisticsInvestment_onInvestment;
   o.construct                = MO.FEaiStatisticsInvestment_construct;
   o.allocEntity              = MO.FEaiStatisticsInvestment_allocEntity;
   o.allocShape               = MO.FEaiStatisticsInvestment_allocShape;
   o.setup                    = MO.FEaiStatisticsInvestment_setup;
   o.calculateInvestmentLevel = MO.FEaiStatisticsInvestment_calculateInvestmentLevel;
   o.calculateCurrent         = MO.FEaiStatisticsInvestment_calculateCurrent;
   o.focusEntity              = MO.FEaiStatisticsInvestment_focusEntity;
   o.process                  = MO.FEaiStatisticsInvestment_process;
   o.dispose                  = MO.FEaiStatisticsInvestment_dispose;
   return o;
}
MO.FEaiStatisticsInvestment_onInvestment = function FEaiStatisticsInvestment_onInvestment(event){
   var o = this;
   var content = event.content;
   o._invementDay = content.investment_day;
   o._invementTotal = content.investment_total;
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
   o.calculateCurrent();
   var dsEvent = MO.Memory.alloc(MO.SEvent);
   dsEvent.sender = o;
   dsEvent.entity = null;
   dsEvent.rank = o._rankEntities;
   dsEvent.data = o._tableEntities;
   o.processDataChangedListener(dsEvent);
   MO.Memory.free(dsEvent);
   var entityCount = o._entities.count();
   o._tableInterval = 1000 * 60 * o._intervalMinute / entityCount;
   o._tableTick = 0;
}
MO.FEaiStatisticsInvestment_construct = function FEaiStatisticsInvestment_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._entities = new MO.TObjects();
   o._showShapes = new MO.TObjects();
   o._tableEntities = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   var table = o._dataTable = MO.Class.create(MO.FEaiStatisticsTable);
   table._hTable = document.getElementById('id_investment');
   table._headLineCount = 1;
   o._rankEntities = new MO.TObjects();
   o._entityPool = MO.Class.create(MO.FObjectPool);
   o._shapePool = MO.Class.create(MO.FObjectPool);
}
MO.FEaiStatisticsInvestment_allocEntity = function FEaiStatisticsInvestment_allocEntity(){
   var o = this;
   var entity = o._entityPool.alloc();
   if(!entity){
      entity = MO.Class.create(MO.FEaiStatisticsInvestmentEntity);
   }
   return entity;
}
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
MO.FEaiStatisticsInvestment_setup = function FEaiStatisticsInvestment_setup(){
   var o = this;
   if(MO.Runtime.isPlatformMobile()){
      o._tableCount = 12;
   }else{
      o._tableCount = 21;
   }
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
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
}
MO.FEaiStatisticsInvestment_focusEntity = function FEaiStatisticsInvestment_focusEntity(entity){
   var o = this;
   var card = entity.card();
   var investment = entity.investment();
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntity = o._mapEntity.findCityByCard(card);
   if(cityEntity){
      var level = o.calculateInvestmentLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
      var province = provinceConsole.findByCode(provinceCode);
      var provinceEntity = o._mapEntity.findProvinceByCard(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
      o._mapEntity.upload();
      var autio = o._autios[level];
      if(autio){
         autio.play(0);
      }
   }
   var dsEvent = MO.Memory.alloc(MO.SEvent);
   dsEvent.sender = o;
   dsEvent.entity = entity;
   dsEvent.rank = o._rankEntities;
   dsEvent.data = o._tableEntities;
   o.processDataChangedListener(dsEvent);
   MO.Memory.free(dsEvent);
}
MO.FEaiStatisticsInvestment_process = function FEaiStatisticsInvestment_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
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
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.doInvestmentDynamic(o, o.onInvestment, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.RTimer.current();
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
      }
      o.calculateCurrent();
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
   o._entities = MO.RObject.dispose(o._entities);
   o._showShapes = MO.RObject.dispose(o._showShapes);
   o._dataTicker = MO.RObject.dispose(o._dataTicker);
   o.__base.FObject.dispose.call(o);
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
MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   o._value        = MO.Class.register(o, new MO.AGetSet('_value'), '0');
   o._currentValue = '0';
   o._ticker       = null;
   o.onPaintLabel  = MO.FEaiStatisticsLabel_onPaintLabel;
   o.oeUpdate      = MO.FEaiStatisticsLabel_oeUpdate;
   o.construct     = MO.FEaiStatisticsLabel_construct;
   o.updateValue   = MO.FEaiStatisticsLabel_updateValue;
   o.dispose       = MO.FEaiStatisticsLabel_dispose;
   return o;
}
MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   if(o._foreFont){
      graphic.setFont(o._foreFont);
   }
   var text = '';
   var label = o._label;
   var labelLength = label.length;
   var labelNumberH = null;
   var labelH = null;
   if(labelLength > 8){
      labelNumberH = label.substring(0, labelLength - 8);
      labelH = labelNumberH + '亿';
      text += labelH;
   }
   var labelNumberM = null;
   var labelM = null;
   if(labelLength > 4){
      labelNumberM = label.substring(labelLength - 8, labelLength - 4);
      labelM = labelNumberM + '万';
      text += labelM;
   }
   var labelNumberL = null;
   var labelL = null;
   if(labelLength > 0){
      labelNumberL = label.substring(labelLength - 4, labelLength);
      labelL = labelNumberL + '元';
      text += labelL;
   }
   var width = graphic.textWidth(text);
   var widthH = graphic.textWidth(labelH);
   var widthM = graphic.textWidth(labelM);
   var x = rectangle.left;
   var y = rectangle.top + rectangle.height;
   if(labelH != null){
      var textWidth = graphic.textWidth(labelNumberH);
      graphic.drawText(labelNumberH, x, y, '#FFD926');
      graphic.drawText('亿', x + textWidth, y - 1, '#00B5F6');
   }
   if(labelM != null){
      var textWidth = graphic.textWidth(labelNumberM);
      graphic.drawText(labelNumberM, x + widthH, y, '#FF7200');
      graphic.drawText('万', x + widthH + textWidth, y - 1, '#00B5F6');
   }
   if(labelL != null){
      var textWidth = graphic.textWidth(labelNumberL);
      graphic.drawText(labelNumberL, x + widthH + widthM, y, '#FD0000');
      graphic.drawText('元', x + widthH + widthM + textWidth, y - 1, '#00B5F6');
   }
}
MO.FEaiStatisticsLabel_oeUpdate = function FEaiStatisticsLabel_oeUpdate(event){
   var o = this;
   o.__base.FGuiLabel.oeUpdate.call(o, event);
   var value = o._value;
   var currentValue = o._currentValue;
   if(value != currentValue){
      if(o._ticker.process()){
         o.updateValue();
         o.dirty();
      }
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   o._ticker = new MO.TTicker(200);
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
MO.FEaiStatisticsLabel_dispose = function FEaiStatisticsLabel_dispose(){
   var o = this;
   o._ticker = MO.RObject.dispose(o._ticker);
   o.__base.FGuiLabel.dispose.call(o);
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
