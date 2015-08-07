//==========================================================
// <T>界面二维尺寸结构。</T>
//
// @struct
// @param width:Number 宽度
// @param height:Number 高度
// @author maocy
// @version 150506
//==========================================================
MO.SUiSize2 = function SUiSize2(width, height){
   var o = this;
   MO.SSize2.call(o, width, height);
   //..........................................................
   o.parse = MO.SUiSize2_parse;
   return o;
}

//============================================================
// <T>解析字符串。</T>
//
// @param source:String 字符串
//============================================================
MO.SUiSize2_parse = function SUiSize2_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 2){
      var width = items[0];
      if(MO.Lang.String.contains(width, '%')){
         o.width = width;
      }else{
         o.width = parseInt(width);
      }
      var height = items[1];
      if(MO.Lang.String.contains(height, '%')){
         o.height = height;
      }else{
         o.height = parseInt(height);
      }
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", items);
   }
}
