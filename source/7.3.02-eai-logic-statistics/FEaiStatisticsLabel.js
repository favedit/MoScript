//==========================================================
// <T>界面标签控件。</T>
//
// @class
// @author maocy
// @version 150623
//==========================================================
MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   //..........................................................
   // @attribute
   o._value        = MO.Class.register(o, new MO.AGetSet('_value'), '0');
   o._currentValue = '0';
   // @attribute
   o._ticker       = null;
   //..........................................................
   // @method
   o.onPaintLabel  = MO.FEaiStatisticsLabel_onPaintLabel;
   //..........................................................
   // @process
   o.oeUpdate      = MO.FEaiStatisticsLabel_oeUpdate;
   //..........................................................
   // @method
   o.construct     = MO.FEaiStatisticsLabel_construct;
   // @method
   o.updateValue   = MO.FEaiStatisticsLabel_updateValue;
   // @method
   o.dispose       = MO.FEaiStatisticsLabel_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   // 设置字体
   var textFont = 'bold 38px Microsoft YaHei';
   var unitFont = 'bold 28px Microsoft YaHei';
   graphic.setFont(textFont);
   //graphic._handle.textBaseline = 'bottom';
   // 计算位置
   var text = '';
   var label = o._label;
   var labelLength = label.length;
   var labelNumberH = null;
   var labelH = null;
   var widthH = 0;
   if(labelLength > 8){
      labelNumberH = label.substring(0, labelLength - 8);
      labelH = labelNumberH + '亿';
      widthH = graphic.textWidth(labelH);
      text += labelH;
   }
   var labelNumberM = null;
   var labelM = null;
   var widthM = 0;
   if(labelLength > 4){
      labelNumberM = label.substring(labelLength - 8, labelLength - 4);
      labelM = labelNumberM + '万';
      widthM = graphic.textWidth(labelM);
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
   var x = rectangle.left;
   var y = rectangle.top + rectangle.height;
   // 绘制文字
   var unitBaseX = x + 4;
   var unitBaseY = y - 5;
   if(labelH != null){
      graphic.setFont(textFont);
      var textWidth = graphic.textWidth(labelNumberH);
      graphic.drawText(labelNumberH, x, y, '#FFD926');
      graphic.setFont(unitFont);
      graphic.drawText('亿', unitBaseX + textWidth, unitBaseY, '#00B5F6');
   }
   if(labelM != null){
      graphic.setFont(textFont);
      var textWidth = graphic.textWidth(labelNumberM);
      graphic.drawText(labelNumberM, x + widthH, y, '#FF7200');
      graphic.setFont(unitFont);
      graphic.drawText('万', unitBaseX + widthH + textWidth, unitBaseY, '#00B5F6');
   }
   if(labelL != null){
      graphic.setFont(textFont);
      var textWidth = graphic.textWidth(labelNumberL);
      graphic.drawText(labelNumberL, x + widthH + widthM, y, '#FD0000');
      graphic.setFont(unitFont);
      graphic.drawText('元', unitBaseX + widthH + widthM + textWidth, unitBaseY, '#00B5F6');
   }
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiStatisticsLabel_oeUpdate = function FEaiStatisticsLabel_oeUpdate(event){
   var o = this;
   o.__base.FGuiLabel.oeUpdate.call(o, event);
   // 更新内容
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

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   // 计时器
   o._ticker = new MO.TTicker(200);
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
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

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_dispose = function FEaiStatisticsLabel_dispose(){
   var o = this;
   // 计时器
   o._ticker = MO.RObject.dispose(o._ticker);
   // 父处理
   o.__base.FGuiLabel.dispose.call(o);
}
