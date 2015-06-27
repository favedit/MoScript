//==========================================================
// <T>可克隆对象的接口。</T>
//
// @face
// @author maocy
// @version 141231
//==========================================================
MO.MClone = function MClone(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.clone  = MO.MClone_clone;
   return o;
}

//==========================================================
// <T>克隆当前对象。</T>
//
// @method
// @return MClone 克隆对象
//==========================================================
MO.MClone_clone = function MClone_clone(){
   var o = this;
   var result = MO.Class.create(o.constructor);
   for(var name in o){
      var value = o[name];
      if(value != null){
         if(!MO.Class.isBaseDataType(value.constructor)){
            result[name] = value.clone();
         }
      }
      result[name] = value;
   }
   return result;
}
