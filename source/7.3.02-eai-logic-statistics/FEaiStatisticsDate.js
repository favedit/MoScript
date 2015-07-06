//==========================================================
// <T>界面时间控件。</T>
//
// @class
// @author maocy
// @version 150706
//==========================================================
MO.FEaiStatisticsDate = function FEaiStatisticsDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   //..........................................................
   // @attribute
   o._value       = MO.Class.register(o, new MO.AGetter('_value'));
   //..........................................................
   // @method
   o.onPaintLabel = MO.FEaiStatisticsDate_onPaintLabel;
   //..........................................................
   // @method
   o.construct    = MO.FEaiStatisticsDate_construct;
   // @method
   o.setValue     = MO.FEaiStatisticsDate_setValue;
   // @method
   o.dispose      = MO.FEaiStatisticsDate_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsDate_onPaintLabel = function FEaiStatisticsDate_onPaintLabel(event){
   var o = this;
   return;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   // 设置字体
   if(o._foreFont){
      graphic.setFont(o._foreFont);
   }
   // 计算位置
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
   // 绘制文字
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

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsDate_construct = function FEaiStatisticsDate_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   // 计时器
   o._value = new MO.TDate();
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param value:TDate 
//==========================================================
MO.FEaiStatisticsDate_setValue = function FEaiStatisticsDate_setValue(value){
   var o = this;
   o._value.parse(value, 'YYYYMMDD');
   o.dirty()
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsDate_dispose = function FEaiStatisticsDate_dispose(){
   var o = this;
   // 计时器
   o._value = MO.Lang.Object.dispose(o._value);
   // 父处理
   o.__base.FGuiLabel.dispose.call(o);
}
