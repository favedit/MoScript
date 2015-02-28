//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   //..........................................................
   // @attribute
   o.owner          = null;
   o.url            = null;
   o.action         = null;
   o.parameter      = null;
   o.inputDocument  = null;
   o.outputDocument = null;
   o.callback       = null;
   //..........................................................
   // @method
   o.process        = SXmlEvent_process;
   // @method
   o.dispose        = SXmlEvent_dispose;
   return o;

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   function SXmlEvent_process(p){
      var o = this;
      o.outputDocument = p.document;
      o.outputNode = p.root;
      if(o.owner){
         o.callback.call(o.owner, o);
      }else{
         o.callback(o);
      }
   }


   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   function SXmlEvent_dispose(){
      var o = this;
      o.owner = null;
      o.url = null;
      o.action = null;
      o.parameter = null;
      o.inputDocument = null;
      o.outputDocument = null;
      o.callback = null;
   }
}
