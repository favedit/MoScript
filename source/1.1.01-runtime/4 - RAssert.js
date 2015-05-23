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
   o.isTrue        = RAssert_isTrue;
   o.isFalse       = RAssert_isFalse;
   // @method
   o.debugBegin    = RAssert_empty;
   o.debug         = RAssert_empty;
   o.debugEnd      = RAssert_empty;
   o.debugTrue     = RAssert_debugTrue;
   o.debugFalse    = RAssert_debugFalse;
   o.debugNull     = RAssert_debugNull;
   o.debugNotNull  = RAssert_debugNotNull;
   o.debugEmpty    = RAssert_debugEmpty;
   o.debugNotEmpty = RAssert_debugNotEmpty;
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
// @param value:Object 内容
//==========================================================
function RAssert_isTrue(value){
   if(!value){
      throw new TError(this, 'Assert ture failure.');
   }
}

//==========================================================
// <T>判断内容是否为假。</T>
// <P>Release版本，本行只保留内容，去掉函数外壳。</P>
//
// @method
// @param value:Object 内容
//==========================================================
function RAssert_isFalse(value){
   if(value){
      throw new TError(this, 'Assert false failure.');
   }
}

//==========================================================
// <T>判断内容是否为真。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
function RAssert_debugTrue(value){
   if(!value){
      throw new TError(this, 'Assert true failure.');
   }
}

//==========================================================
// <T>判断内容是否为假。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
function RAssert_debugFalse(value){
   if(value){
      throw new TError(this, 'Assert false failure.');
   }
}

//==========================================================
// <T>判断内容是否为空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
function RAssert_debugNull(value){
   if(value != null){
      throw new TError(this, 'Assert null failure.');
   }
}

//==========================================================
// <T>判断内容是否为非空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
function RAssert_debugNotNull(value){
   if(value == null){
      throw new TError(this, 'Assert not null failure.');
   }
}

//==========================================================
// <T>判断内容是否为空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
function RAssert_debugEmpty(value){
   if(value != null){
      throw new TError(this, 'Assert empty failure.');
   }
}

//==========================================================
// <T>判断内容是否为非空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
function RAssert_debugNotEmpty(value){
   if(value == null){
      throw new TError(this, 'Assert not empty failure.');
   }
}
