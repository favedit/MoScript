/***********************************************************
 * <T>表转页面的定义。</T>
 *
 * @enum
 * @author maocy
 * @version 1.0.1
 **********************************************************/
var EResultPage = new function(){
   var o = this;
   /// @member 单独页面成功
   o.MasterSuccess = '/apl/page/Master.wa?do=success';
   o.InnerSuccess = '/apl/page/Inner.wa?do=success';
   return o;
}
