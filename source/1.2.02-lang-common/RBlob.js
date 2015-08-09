//===========================================================
// <T>数据块工具类。</T>
//
// @reference
// @author maochunyang
// @version 150617
//===========================================================
MO.RBlob = function RBlob(){
   return this;
}

//===========================================================
// <T>从字符串转换成数据块。</T>
//
// @method
// @param value:String 字符串
// @return Blob 数据块
//===========================================================
MO.RBlob.prototype.fromText = function RBlob_fromText(value){
   var length = value.length;
   var data = new Uint8Array(length);
   for (var i = 0; i < length; i++) {
      data[i] = value.charCodeAt(i);
   }
   var blob = new Blob([data]);
   return blob;
}
//..........................................................
// 实例化内容
MO.Lang.Blob = new MO.RBlob();
