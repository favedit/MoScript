//==========================================================
// <T>资源存储分块。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
MO.FResourceBlockStorageData = function FResourceBlockStorageData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MResourceData);
   //..........................................................
   // @method
   o.dispose = MO.FResourceBlockStorageData_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FResourceBlockStorageData_dispose = function FResourceBlockStorageData_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
