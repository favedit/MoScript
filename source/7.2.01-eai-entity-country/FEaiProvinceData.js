//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiProvinceData = function FEaiProvinceData(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @attribute
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._boundaries = MO.Class.register(o, new MO.AGetter('_boundaries'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiProvinceData_construct;
   // @method
   o.unserialize = MO.FEaiProvinceData_unserialize;
   // @method
   o.dispose     = MO.FEaiProvinceData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceData_construct = function FEaiProvinceData_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   // 创建属性
   o._boundaries = new MO.TObjects();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvinceData_unserialize = function FEaiProvinceData_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var boundary = MO.Class.create(MO.FEaiBoundaryData);
      boundary.unserialize(input);
      o._boundaries.push(boundary);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceData_dispose = function FEaiProvinceData_dispose(){
   var o = this;
   o._boundaries = MO.Lang.Object.dispose(o._boundaries);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
