//==========================================================
// <T>引擎信息控件。</T>
//
// @class
// @author maocy
// @version 150622
//==========================================================
MO.FGuiEngineInfo = function FGuiEngineInfo(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._lastTick    = 0;
   o._name        = 'EngineInfo';
   o._stage       = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._context     = MO.Class.register(o, new MO.AGetSet('_context'));
   o._ticker      = null;
   //..........................................................
   // @method
   o.onPaintBegin = MO.FGuiEngineInfo_onPaintBegin;
   // @event
   o.oeUpdate     = MO.FGuiEngineInfo_oeUpdate;
   //..........................................................
   // @method
   o.construct    = MO.FGuiEngineInfo_construct;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiEngineInfo_onPaintBegin = function FGuiEngineInfo_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 绘制信息
   if(o._stage == null){
      return;
   }
   if(o._context == null){
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var timer = o._stage.timer();
   var stageStatistics = o._stage.statistics();
   var statistics = o._context.statistics();
   var line = 20;
   var locationX = 10;
   var locationY = rectangle.top + line;
   graphic.setFont('16px sans-serif');
   graphic.drawText('Frame         : ' + MO.Timer.rate(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Span    : ' + stageStatistics._frame.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Process : ' + stageStatistics._frameProcess.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Draw    : ' + stageStatistics._frameDraw.toString() + ' | ' + stageStatistics._frameDrawSort.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw          : ' + statistics.frameDrawCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Const    : ' + statistics.frameConstCount() + ' Length=' + statistics.frameConstLength(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Buffer   : ' + statistics.frameBufferCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Texture  : ' + statistics.frameTextureCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Triangle : ' + statistics.frameTriangleCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Total Program : ' + statistics.programTotal(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Total Layout  : ' + statistics.layoutTotal(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Total Buffer  : Vertex=' + statistics.vertexBufferTotal() + ' Index=' + statistics.indexBufferTotal(), locationX, locationY, '#FFFFFF');
   locationY += line;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FGuiEngineInfo_oeUpdate = function FGuiEngineInfo_oeUpdate(event){
   var o = this;
   if(o._ticker.process()){
      o.dirty();
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiEngineInfo_construct = function FGuiEngineInfo_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._size.set(512, 256);
   o._ticker = new MO.TTicker(1000);
}
