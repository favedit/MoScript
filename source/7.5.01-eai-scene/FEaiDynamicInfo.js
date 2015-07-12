//==========================================================
// <T>引擎信息控件。</T>
//
// @class
// @author maocy
// @version 150622
//==========================================================
MO.FEaiDynamicInfo = function FEaiDynamicInfo(o){
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
   o.onPaintBegin = MO.FEaiDynamicInfo_onPaintBegin;
   // @event
   o.oeUpdate     = MO.FEaiDynamicInfo_oeUpdate;
   //..........................................................
   // @method
   o.construct    = MO.FEaiDynamicInfo_construct;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiDynamicInfo_onPaintBegin = function FEaiDynamicInfo_onPaintBegin(event){
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
   // 图形数据
   graphic.drawText('Frame         : ' + MO.Timer.rate() + ' Span [' + stageStatistics._frame.toString() + ']', locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Process : ' + stageStatistics._frameProcess.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Draw    : ' + stageStatistics._frameDraw.toString() + ' | ' + stageStatistics._frameDrawSort.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw          : Count=' + statistics.frameDrawCount() + ' Triangle=' + statistics.frameTriangleCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Const    : Count=' + statistics.frameConstCount() + ' Length=' + statistics.frameConstLength(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Alloc    : Buffer=' + statistics.frameBufferCount() + ' Texture=' + statistics.frameTextureCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Total    : Program=' + statistics.programTotal() + ' Layout=' + statistics.layoutTotal() + ' Vertex=' + statistics.vertexBufferTotal() + ' Index=' + statistics.indexBufferTotal(), locationX, locationY, '#FFFFFF');
   // 实体数据
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var mapEntity = entityConsole.mapEntity();
   var provinceEntities = mapEntity.provinceEntities();
   var cityEntities = mapEntity.cityEntities();
   locationY += line;
   graphic.drawText('Entity        : Province=' + provinceEntities.count() + ' City=' + cityEntities.count(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Investment    : Entity=' + o._investmentEntityCount + ' Table=' + o._investmentTableEntityCount + ' PoolItem=' + o._investmentPoolItemCount + ' PoolFree=' + o._investmentPoolFreeCount, locationX, locationY, '#FFFFFF');
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FEaiDynamicInfo_oeUpdate = function FEaiDynamicInfo_oeUpdate(event){
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
MO.FEaiDynamicInfo_construct = function FEaiDynamicInfo_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._size.set(512, 256);
   o._ticker = new MO.TTicker(1000);
}
