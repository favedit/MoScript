with(MO){
   //==========================================================
   // <T>服务信息管理类。</T>
   //
   // @tool
   // @author maocy
   // @version 150119
   //===========================================================
   MO.RUiDataEvent = function RUiDataEvent(){
      var o = this;
      //..........................................................
      // @attribute
      o.clearEvent  = null;
      o.resetEvent  = null;
      o.loadEvent   = null;
      o.saveEvent   = null;
      o.recordEvent = null;
      o.codeEvent   = null;
      //..........................................................
      // @method
      o.construct   = RUiDataEvent_construct;
      //..........................................................
      // @method
      o.construct();
      return o;
   }

   //==========================================================
   // <T>生成服务地址。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return String 服务地址
   //===========================================================
   MO.RUiDataEvent_construct = function RUiDataEvent_construct(p){
      var o = this;
      o.clearEvent = new TEventProcess(o, 'oeClearValue', MUiDataValue);
      o.resetEvent = new TEventProcess(o, 'oeResetValue', MUiDataValue);
      o.loadEvent = new TEventProcess(o, 'oeLoadValue', MUiDataValue);
      o.saveEvent = new TEventProcess(o, 'oeSaveValue', MUiDataValue);
      o.recordEvent = new TEventProcess(o, 'oeRecordValue', MUiDataValue);
      o.codeEvent = new TEventProcess(o, 'oeSaveCode', MUiDataValue);
   }
   //..........................................................
   // 实例化内容
   MO.RUiDataEvent = new RUiDataEvent();
}
