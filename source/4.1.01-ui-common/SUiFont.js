//==========================================================
// <T>界面字体。</T>
//
// @struct
// @author maocy
// @version 150804
//==========================================================
MO.SUiFont = function SUiFont(){
   var o = this;
   //..........................................................
   // @attribute
   o.font     = null;
   o.size     = 16;
   o.bold     = false;
   o.color    = '#FFFFFF';
   //..........................................................
   // @method
   o.assign   = MO.SUiFont_assign;
   o.parse    = MO.SUiFont_parse;
   o.toString = MO.SUiFont_toString;
   // @method
   o.dispose  = MO.SUiFont_dispose;
   return o;
}

//==========================================================
// <T>接收数据。</T>
//
// @param value:SUiFont 字体
//==========================================================
MO.SUiFont_assign = function SUiFont_assign(value){
   var o = this;
   o.font = value.font;
   o.size = value.size;
   o.bold = value.bold;
   o.color = value.color;
}

//==========================================================
// <T>分解字符串。</T>
//
// @param source 字符串
//==========================================================
MO.SUiFont_parse = function SUiFont_parse(source){
   var o = this;

   var boldIndex = source.toLowerCase().indexOf('bold');
   if (boldIndex != -1) {
      o.bold = true;
      source = source.replace(source.substring(boldIndex, boldIndex + 4), '');
   }

   var sharpIndex = source.indexOf('#');
   if (sharpIndex != -1) {
      o.color = source.substring(sharpIndex, sharpIndex + 7);
      source = source.replace(o.color, '');
   }

   var sizeIndex = source.toLowerCase().indexOf('px');
   if (sizeIndex != -1) {
      // 已测，前边是空格或者得-1都没问题
      var sizeString = source.substring(sizeIndex - 2, sizeIndex + 2);
      o.size = parseInt(sizeString);
      source = source.replace(sizeString, '');
   }

   o.font = MO.RString.trim(source);
}

//==========================================================
// <T>获得字符串。</T>
// 
// @return String 字符串
//==========================================================
MO.SUiFont_toString = function SUiFont_toString(){
   var o = this;
   var result = '';
   if(o.bold){
      result += 'bold';
   }
   if(o.size){
      if(result != ''){
         result += ' ';
      }
      result += o.size + 'px';
   }
   if(o.font){
      if(result != ''){
         result += ' ';
      }
      result += o.font;
   }
   return result;
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.SUiFont_dispose = function SUiFont_dispose(){
   var o = this;
   o.font = null;
   o.size = null;
   o.bold = null;
}
