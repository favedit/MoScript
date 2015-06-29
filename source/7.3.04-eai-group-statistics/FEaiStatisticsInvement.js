with(MO){
   //==========================================================
   // <T>统计投资。</T>
   //
   // @class
   // @author maocy
   // @history 150619
   //==========================================================
   MO.FEaiStatisticsInvement = function FEaiStatisticsInvement(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._beginDate    = RClass.register(o, new AGetter('_beginDate'));
      o._endDate      = RClass.register(o, new AGetter('_endDate'));
      // @attribute
      o._entities     = RClass.register(o, new AGetter('_entities'));
      o._showEntities = RClass.register(o, new AGetter('_showEntities'));
      // @attribute
      o._dataTicker   = null;
      //..........................................................
      // @method
      o.onInvestment  = FEaiStatisticsInvement_onInvestment;
      //..........................................................
      // @method
      o.construct     = FEaiStatisticsInvement_construct;
      // @method
      o.process       = FEaiStatisticsInvement_process;
      // @method
      o.dispose       = FEaiStatisticsInvement_dispose;
      return o;
   }

   //==========================================================
   // <T>统计投资数据获取处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvement_onInvestment = function FEaiStatisticsInvement_onInvestment(event){
      var o = this;
      var content = event.content;
      var dataset = content.collection;
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = RClass.create(FEaiStatisticsInvementEntity);
         entity.loadData(row);
         o._entities.push(entity);
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvement_construct = function FEaiStatisticsInvement_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置变量
      o._beginDate = new TDate();
      o._endDate = new TDate();
      o._entities = new TObjects();
      // 5分钟定时
      o._dataTicker = new TTicker(1000 * 60 * 1);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiStatisticsInvement_process = function FEaiStatisticsInvement_process(){
      var o = this;
      if(o._dataTicker.process()){
         debugger
         var statistics = RConsole.find(FEaiLogicConsole).statistics();
         // 设置结束时间
         var beginDate = o._beginDate;
         var endDate = o._endDate;
         endDate.assign(beginDate);
         endDate.addMinute();
         statistics.doInvestment(o, o.onInvestment, beginDate.format(), endDate.format());
         // 设置开始时间
         beginDate.assign(o._endDate);
      }
      o._lastDataTick = 0;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvement_dispose = function FEaiStatisticsInvement_dispose(){
      var o = this;
      o._entities = RObject.dispose(o._entities);
      o._dataTicker = RObject.dispose(o._dataTicker);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
