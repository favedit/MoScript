MO.EUiDataService = new function EUiDataService(){
   var o = this;
   o.Dataset    = 'database.dataset';
   o.List       = 'design.list';
   o.WebForm    = 'design.webform';
   o.Translate  = 'design.translate';
   o.WebDataset = 'logic.dataset';
   return o;
}
MO.EUiDataStore = new function EUiDataStore(){
   var o = this;
   o.Full     = 0;
   o.Sort     = 1;
   o.Config   = 2;
   o.Value    = 3;
   o.Name     = 4;
   o.DataName = 5;
   o.DataNvl  = 6;
   o.Reset    = 7;
   o.Prepare  = 8;
   return o;
}
with(MO){
   MO.MUiDataAction = function MUiDataAction(o){
      o = MO.Class.inherits(this, o);
      o.doAction = MUiDataAction_doAction
      return o;
   }
   MO.MUiDataAction_doAction = function MUiDataAction_doAction(n){
      var o = this;
      var c = o.findComponent(n);
      if(MO.Class.isClass(c, MInvoke)){
         c.invoke(this);
      }else{
         throw new TError(o, 'Component is invalid.');
      }
   }
}
with(MO){
   MO.RUiDataEvent = function RUiDataEvent(){
      var o = this;
      o.clearEvent  = null;
      o.resetEvent  = null;
      o.loadEvent   = null;
      o.saveEvent   = null;
      o.recordEvent = null;
      o.codeEvent   = null;
      o.construct   = RUiDataEvent_construct;
      o.construct();
      return o;
   }
   MO.RUiDataEvent_construct = function RUiDataEvent_construct(p){
      var o = this;
      o.clearEvent = new TEventProcess(o, 'oeClearValue', MUiDataValue);
      o.resetEvent = new TEventProcess(o, 'oeResetValue', MUiDataValue);
      o.loadEvent = new TEventProcess(o, 'oeLoadValue', MUiDataValue);
      o.saveEvent = new TEventProcess(o, 'oeSaveValue', MUiDataValue);
      o.recordEvent = new TEventProcess(o, 'oeRecordValue', MUiDataValue);
      o.codeEvent = new TEventProcess(o, 'oeSaveCode', MUiDataValue);
   }
   MO.RUiDataEvent = new RUiDataEvent();
}
