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
MO.RAssert = function RAssert(){
   var o = MO.RSingleton.call(this);
   //..........................................................
   // @method
   o.debugBegin = MO.Runtime.empty;
   o.debug      = MO.Runtime.empty;
   o.debugEnd   = MO.Runtime.empty;
   return o;
}

//==========================================================
// <T>判断内容是否为真。</T>
// <P>Release版本，本行只保留内容，去掉函数外壳。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.isTrue = function RAssert_isTrue(value){
   if(!value){
      throw new Error('Assert ture failure.');
   }
}

//==========================================================
// <T>判断内容是否为假。</T>
// <P>Release版本，本行只保留内容，去掉函数外壳。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.isFalse = function RAssert_isFalse(value){
   if(value){
      throw new Error('Assert false failure.');
   }
}

//==========================================================
// <T>判断内容是否为真。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.debugTrue = function RAssert_debugTrue(value){
   if(!value){
      throw new Error('Assert true failure.');
   }
}

//==========================================================
// <T>判断内容是否为假。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.debugFalse = function RAssert_debugFalse(value){
   if(value){
      throw new Error('Assert false failure.');
   }
}

//==========================================================
// <T>判断内容是否为空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.debugNull = function RAssert_debugNull(value){
   if(value != null){
      throw new Error('Assert null failure.');
   }
}

//==========================================================
// <T>判断内容是否为非空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.debugNotNull = function RAssert_debugNotNull(value){
   if(value == null){
      throw new Error('Assert not null failure.');
   }
}

//==========================================================
// <T>判断内容是否为空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.debugEmpty = function RAssert_debugEmpty(value){
   if(value.length == 0){
      throw new Error('Assert empty failure.');
   }
}

//==========================================================
// <T>判断内容是否为非空。</T>
// <P>Release版本，本行不保留。</P>
//
// @method
// @param value:Object 内容
//==========================================================
MO.RAssert.prototype.debugNotEmpty = function RAssert_debugNotEmpty(value){
   if(value.length > 0){
      throw new Error('Assert not empty failure.');
   }
}
//..........................................................
// 实例化内容
MO.Assert = new MO.RAssert();
