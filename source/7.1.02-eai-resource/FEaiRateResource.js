//==========================================================
// <T>比率资源。</T>
//
// @class
// @author maocy
// @history 150625
//==========================================================
MO.FEaiRateResource = function FEaiRateResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._count      = MO.Class.register(o, new MO.AGetter('_count'));
   o._colors     = MO.Class.register(o, new MO.AGetter('_colors'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiRateResource_construct;
   // @method
   o.find        = MO.FEaiRateResource_find;
   o.findRate    = MO.FEaiRateResource_findRate;
   o.unserialize = MO.FEaiRateResource_unserialize;
   // @method
   o.dispose     = MO.FEaiRateResource_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiRateResource_construct = function FEaiRateResource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>根据索引获得颜色。</T>
//
// @method
// @param value:Integer 索引
// @return Integer 颜色
//==========================================================
MO.FEaiRateResource_find = function FEaiRateResource_find(value){
   var o = this;
   var index = parseInt(value);
   if(index < 0){
      index = 0;
   }
   if(index >= o._count){
      index = o._count - 1;
   }
   return o._colors[index];
}

//==========================================================
// <T>根据比率获得颜色。</T>
//
// @method
// @param rate:Float 比率
// @return Integer 颜色
//==========================================================
MO.FEaiRateResource_findRate = function FEaiRateResource_findRate(rate){
   var o = this;
   var index = rate * o._count;
   var color = o.find(index);
   return color;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiRateResource_unserialize = function FEaiRateResource_unserialize(input){
   var o = this;
   var count = o._count = input.readInt32();
   var colors = o._colors = new Uint32Array(count);
   for(var i = 0; i < count; i++){
      colors[i] = input.readUint32();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiRateResource_dispose = function FEaiRateResource_dispose(){
   var o = this;
   // 清空属性
   o._colors = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
