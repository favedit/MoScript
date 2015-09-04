//==========================================================
// <T>数据命令枚举。</T>
//
// @enum
// @author maocy
// @version 141231
//==========================================================
MO.EUiDataAction = new function EUiDataAction(){
   var o = this;
   MO.TEnum.call(o);
   // @member
   o.First     = 'first';
   o.Prior     = 'prior';
   o.Next      = 'next';
   o.Last      = 'last';
   // @member
   o.Prepare   = 'prepare';
   o.Insert    = 'insert';
   o.Update    = 'update';
   o.Delete    = 'delete';

   //o.Fetch     = 'fetch';
   //o.Search    = 'search';
   //o.Lov       = 'lov';
   //o.Zoom      = 'zoom';
   //o.Action    = 'action';
   //o.FetchLov  = 'fetchLov';
   //o.EndFetch  = 'endfetch';
   //o.EndUpdate = 'endupdate';
   //o.DsChanged = 'dschanged';
   //o.Scalar    = 'scalar';
   //o.Complete  = 'complete';
   //o.Process   = 'process';
   return o;
}
