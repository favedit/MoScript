//==========================================================
// <T>检查结果。</T>
// <P>所有以debug开头的函数，必须在每行的开头使用。<BR>
//    生成Debug版本时候起作用，Release版本将删除这一行。<BR>
//    debugBegin到debugEnd之间的行，在Release版本的时候也会被删除。</P>
//
// @reference
// @author maocy
// @version 150319
//==========================================================
var RAssert = new function RAssert(){
   var o = this;
   //..........................................................
   // @method
   o.isTrue     = RAssert_isTrue;
   o.isFalse    = RAssert_isFalse;
   // @method
   o.debugBegin = RAssert_empty;
   o.debug      = RAssert_empty;
   o.debugEnd   = RAssert_empty;
   o.debugTrue  = RAssert_isTrue;
   o.debugFalse = RAssert_isFalse;
   return o;
}

//==========================================================
// <T>空函数调用。</T>
//
// @method
//==========================================================
function RAssert_empty(){
}

//==========================================================
// <T>判断内容是否为真。</T>
// <P>Release版本，本行只保留内容，去掉函数外壳。</P>
//
// @method
// @param p:value:Object 内容
//==========================================================
function RAssert_isTrue(p){
   if(!p){
      throw new TError(p, 'Assert failure.');
   }
}

//==========================================================
// <T>判断内容是否为假。</T>
// <P>Release版本，本行只保留内容，去掉函数外壳。</P>
//
// @method
// @param p:value:Object 内容
//==========================================================
function RAssert_isFalse(a){
   if(p){
      throw new TError(p, 'Assert failure.');
   }
}
