//==========================================================
// <T>资源存储分块。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
function FResourceBlockStorageData(o){
   o = RClass.inherits(this, o, FObject, MResourceData);
   //..........................................................
   // @method
   o.dispose = FResourceBlockStorageData_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FResourceBlockStorageData_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
