//==========================================================
// <T>浮点数管理类。</T>
//
// @reference
// @author maocy
// @version 150131
//==========================================================
var RByte = new function RByte(){
   var o = this;
   //..........................................................
   // @method
   o.copyArray = RByte_copyArray;
   return o;
}

//===========================================================
// <T>复制字节数组。</T>
//
// @method
// @param po:outputData:Array 输出数据
// @param poi:outputIndex:Integer 输出位置
// @param pi:inputData:Array 输入数据
// @param pii:inputIndex:Integer 输入位置
// @param pc:count:Integer 总数
//===========================================================
function RByte_copyArray(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
