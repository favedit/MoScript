with(MO){
   //==========================================================
   // <T>实时投资表。</T>
   //
   // @class
   // @author sunpeng
   // @history 150702
   //==========================================================
   MO.FGuiLiveTable = function FGuiLiveTable(o) {
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._data = RClass.register(o, new AGetSet('_data'));
      //..........................................................
      // @method
      o.construct = FGuiLiveTable_construct;
      o.onPaintBegin = FGuiLiveTable_onPaintBegin;
      // @method
      o.dispose = FGuiLiveTable_dispose;
      o.onImageLoad = FGuiLiveTable_onImageLoad;
      // @event
      o._dataChangedListeners = RClass.register(o, new AListener('_dataChangedListeners', EEvent.DataChanged));
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLiveTable_construct = function FGuiLiveTable_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
   }

   //==========================================================
   // <T>图片加载完成处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLiveTable_onImageLoad = function FGuiLiveTable_onImageLoad() {
      var o = this;
      o.dirty();
      o.__base.FGuiControl.construct.call(o);
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLiveTable_onPaintBegin = function FGuiLiveTable_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      
      var left = rectangle.left;
      var top = rectangle.top;
      var width = rectangle.width;
      var height = rectangle.height;
      var right = left + width;
      var bottom = top + height;
      //背景
      var bg = MO.Class.create(MO.FImage);
      bg.addLoadListener(o, o.onImageLoad);
      bg.loadUrl('../ars/eai/grid.png');
      graphic.drawImage(bg, left, top, width, height);
      // 边框
      graphic.fillRectangle(left, top, width, height, 'rgba(29, 172, 229, 0.1)');
      graphic.drawRectangle(left, top, width, height, '#1DACE5', 2);
      // 标题
      var titleText = '钰诚控股集团';
      graphic.setFont('bold 30px Microsoft YaHei');
      var titleWidth = graphic.textWidth(titleText);
      graphic.drawText(titleText, left + (right - left) / 2 - titleWidth / 2, top + 40, '#1DACE5');
      // 表头
      graphic.setFont('22px Microsoft YaHei');
      var headText = '';
      var headTextWidth = 0;
      var headLeft = left + 5;
      var headTop = top + 64;
      var headTextTop = top + 92;
      var colWidth = new Array(110, 110, 165, 202);
      var headHeight = 40;
      graphic.fillRectangle(headLeft, headTop, colWidth[0], headHeight, '#1DACE5');
      headText = '时间';
      headTextWidth = graphic.textWidth(headText);
      graphic.drawText(headText, headLeft + colWidth[0] / 2 - headTextWidth / 2, headTextTop, '#FFFFFF');

      headLeft += colWidth[0] + 1;
      graphic.fillRectangle(headLeft, headTop, colWidth[1], headHeight, '#1DACE5');
      headText = '城市';
      headTextWidth = graphic.textWidth(headText);
      graphic.drawText(headText, headLeft + colWidth[1] / 2 - headTextWidth / 2, headTextTop, '#FFFFFF');

      headLeft += colWidth[1] + 1;
      graphic.fillRectangle(headLeft, headTop, colWidth[2], headHeight, '#1DACE5');
      headText = '顾客-手机尾号';
      headTextWidth = graphic.textWidth(headText);
      graphic.drawText(headText, headLeft + colWidth[2] / 2 - headTextWidth / 2, headTextTop, '#FFFFFF');

      headLeft += colWidth[2] + 1;
      graphic.fillRectangle(headLeft, headTop, colWidth[3], headHeight, '#1DACE5');
      headText = '投资额(元)';
      headTextWidth = graphic.textWidth(headText);
      graphic.drawText(headText, headLeft + colWidth[3] - 5 - headTextWidth, headTextTop, '#FFFFFF');
      // 表内容
      if (o._data == null || o._data.count() < 1) {
         return;
      }

      graphic.setFont('22px Microsoft YaHei');
      var tableTop = top + 124;
      var tableLeft = left + 5;
      var tableLineHeight = 24;
      var tableText = '';
      var tableTextWidth = 0;
      var date = MO.Memory.alloc(TDate);
      for (var i = 0; i < o._data.count() ; i++) {
         tableLeft = left + 5;
         var entity = o._data.at(i);
         date.parse(entity.date());
         tableText = date.format('HH24:MI:SS');
         tableTextWidth = graphic.textWidth(tableText);
         graphic.drawText(tableText, tableLeft + colWidth[0] / 2 - tableTextWidth / 2, tableTop + tableLineHeight * i, '#FFFFFF');

         tableLeft += colWidth[0] + 1;
         var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
         var cityEntity = cityConsole.findCityByCard(entity.card());
         tableText = '';
         if (cityEntity) {
            tableText = cityEntity.label();
         }
         tableTextWidth = graphic.textWidth(tableText);
         graphic.drawText(tableText, tableLeft + colWidth[1] / 2 - tableTextWidth / 2, tableTop + tableLineHeight * i, '#FFFFFF');

         tableLeft += colWidth[1] + 1;
         tableText = entity.customer() + ' - ' + entity.phone();
         tableTextWidth = graphic.textWidth(tableText);
         graphic.drawText(tableText, tableLeft + colWidth[2] / 2 - tableTextWidth / 2, tableTop + tableLineHeight * i, '#FFFFFF');

         tableLeft += colWidth[2] + 1;
         var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
         if (investment.length > 7) {
            var high = investment.substring(0, investment.length - 7);
            var low = investment.substring(investment.length - 7, investment.length);
            var highWidth = graphic.textWidth(high);
            var lowWidth = graphic.textWidth(low);
            graphic.drawText(high, tableLeft + colWidth[3] - 5 - lowWidth - highWidth, tableTop + tableLineHeight * i, '#FF4482');
            graphic.drawText(low, tableLeft + colWidth[3] - 5 - lowWidth, tableTop + tableLineHeight * i, '#FFFFFF');
         } else {
            tableText = investment;
            tableTextWidth = graphic.textWidth(tableText);
            graphic.drawText(tableText, tableLeft + colWidth[3] - 5 - tableTextWidth, tableTop + tableLineHeight * i, '#FFFFFF');
         }
      }
      //表框
      graphic.drawRectangle(left + 3, top + 62, width - 6, tableTop + tableLineHeight * 22, '#1DACE5', 1);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLiveTable_dispose = function FGuiLiveTable_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
