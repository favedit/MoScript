//==========================================================
// <T>存储控件。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
function MUiStorage(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._storageCode   = null;
   o._storageObject = null;
   //..........................................................
   // @method
   o.storageGet     = MUiHorizontal_storageGet;
   o.storageSet     = MUiHorizontal_storageSet;
   o.storageUpdate  = MUiHorizontal_storageUpdate;
   // @method
   o.dispose        = MUiHorizontal_dispose;
   return o;
}

//==========================================================
// <T>根据名称获得存储内容。</T>
//
// @method
// @param name:String 名称
// @param defaultValue:Object 缺省内容
//==========================================================
function MUiHorizontal_storageGet(name, defaultValue){
   var o = this;
   if(name == null){
      throw new TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      var storge = RWindow.storage(EScope.Local);
      var value = storge.get(o._storageCode);
      object = o._storageObject = RJson.parse(value, Object);
   }
   if(object){
      var value = object[name];
      if(value != null){
         return value;
      }
   }
   return defaultValue;
}

//==========================================================
// <T>根据名称设置存储内容。</T>
//
// @method
// @param name:String 名称
// @param value:Object 内容
//==========================================================
function MUiHorizontal_storageSet(name, value){
   var o = this;
   if(name == null){
      throw new TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      object = o._storageObject = new Object();
   }
   object[name] = value;
}

//==========================================================
// <T>更新存储内容。</T>
//
// @method
//==========================================================
function MUiHorizontal_storageUpdate(){
   var o = this;
   var object = o._storageObject;
   if(object){
      var storge = RWindow.storage(EScope.Local);
      var value = RJson.toString(object);
      storge.set(o._storageCode, value);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MUiHorizontal_dispose(){
   var o = this;
   o._storageCode = null;
   o._storageObject = null;
}
