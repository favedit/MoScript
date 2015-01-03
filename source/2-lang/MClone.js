//==========================================================
// <T>可克隆对象的接口。</T>
//
// @face
// @author maocy
// @version 141231
//==========================================================
function MClone(o){
   o = RClass.inherits(this, o);
   // Method
   o.clone  = MClone_clone;
   return o;
}

//==========================================================
// <T>克隆当前对象。</T>
//
// @method
// @return MClone 克隆对象
//==========================================================
function MClone_clone(){
   var o = this;
   var r = RClass.create(o.constructor);
   for(var n in o){
      v = o[n];
      if(v != null){
         if(RClass.isBaseDataType(v.constructor)){
            r[n] = v;
         }
      }
   }
   return r;
}
