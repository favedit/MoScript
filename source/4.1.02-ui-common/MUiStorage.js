//==========================================================
// <T>存储控件。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
MO.MUiStorage = function MUiStorage(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._storageCode      = null;
   o._storageObject    = null;
   //..........................................................
   // @method
   o.storageGet        = MO.MUiStorage_storageGet;
   o.storageGetBoolean = MO.MUiStorage_storageGetBoolean;
   o.storageSet        = MO.MUiStorage_storageSet;
   o.storageUpdate     = MO.MUiStorage_storageUpdate;
   // @method
   o.dispose           = MO.MUiStorage_dispose;
   return o;
}

//==========================================================
// <T>根据名称获得存储内容。</T>
//
// @method
// @param name:String 名称
// @param defaultValue:Object 缺省内容
//==========================================================
MO.MUiStorage_storageGet = function MUiStorage_storageGet(name, defaultValue){
   var o = this;
   if(name == null){
      throw new MO.TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      var storge = MO.Window.storage(MO.EScope.Local);
      var value = storge.get(o._storageCode);
      object = o._storageObject = MO.Json.parse(value, Object);
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
// <T>根据名称获得存储内容。</T>
//
// @method
// @param name:String 名称
// @param defaultValue:Object 缺省内容
//==========================================================
MO.MUiStorage_storageGetBoolean = function MUiStorage_storageGetBoolean(name, defaultValue){
   var o = this;
   var value = o.storageGet(name, defaultValue);
   return MO.Lang.Boolean.parse(value);
}

//==========================================================
// <T>根据名称设置存储内容。</T>
//
// @method
// @param name:String 名称
// @param value:Object 内容
//==========================================================
MO.MUiStorage_storageSet = function MUiStorage_storageSet(name, value){
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
MO.MUiStorage_storageUpdate = function MUiStorage_storageUpdate(){
   var o = this;
   var object = o._storageObject;
   if(object){
      var storge = MO.Window.storage(MO.EScope.Local);
      var value = MO.Json.toString(object);
      storge.set(o._storageCode, value);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiStorage_dispose = function MUiStorage_dispose(){
   var o = this;
   o._storageCode = null;
   o._storageObject = null;
}
