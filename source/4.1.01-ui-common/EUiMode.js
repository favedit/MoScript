//==========================================================
// <T>界面模式。</T>
//
// @enum
// @author maocy
// @version 150822
//==========================================================
MO.EUiMode = new function EUiMode(){
   var o = this;
   MO.TEnum.call(o);
   o.Insert = 'Insert';
   o.Update = 'Update';
   o.Delete = 'Delete';
   //o.Fetch     = 'fetch';
   //o.Search    = 'search';
   //o.Lov       = 'lov';
   //o.Zoom      = 'zoom';
   //o.First     = 'first';
   //o.Prior     = 'prior';
   //o.Next      = 'next';
   //o.Last      = 'last';
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
