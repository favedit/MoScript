//==========================================================
// <T>窗口存储类。</T>
//
// @class
// @author maocy
// @version 140409
//==========================================================
MO.FWindowStorage = function FWindowStorage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.Class.register(o, new MO.AGetter('_scopeCd'));
   // @attribute
   o._storage  = null;
   //..........................................................
   // @method
   o.link      = MO.FWindowStorage_link;
   // @method
   o.get       = MO.FWindowStorage_get;
   o.set       = MO.FWindowStorage_set;
   o.remove    = MO.FWindowStorage_remove;
   o.clear     = MO.FWindowStorage_clear;
   o.dispose   = MO.FWindowStorage_dispose;
   // @method
   o.innerDump = MO.FWindowStorage_innerDump;
   return o;
}

//==========================================================
// <T>关联存储对象。</T>
//
// @method
// @param storage:Object 存储对象
//==========================================================
MO.FWindowStorage_link = function FWindowStorage_link(storage){
   this._storage = storage;
}

//==========================================================
// <T>根据名称获得存储内容。</T>
//
// @method
// @param name:String 存储名称
// @return Object 存储内容
//==========================================================
MO.FWindowStorage_get = function FWindowStorage_get(name){
   return this._storage.getItem(name);
}

//==========================================================
// <T>根据名称设置存储内容。</T>
//
// @method
// @param name:String 存储名称
// @param value:Object 存储内容
//==========================================================
MO.FWindowStorage_set = function FWindowStorage_set(name, value){
   this._storage.setItem(name, value);
}

//==========================================================
// <T>移除存储内容。</T>
//
// @method
// @param name:String 存储名称
//==========================================================
MO.FWindowStorage_remove = function FWindowStorage_remove(name){
   this._storage.removeItem(name);
}

//==========================================================
// <T>清除存储内容。</T>
//
// @method
//==========================================================
MO.FWindowStorage_clear = function FWindowStorage_clear(){
   this._storage.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FWindowStorage_dispose = function FWindowStorage_dispose(){
   var o = this;
   o._storage  = null;
   o.__base.FObject.dispose.call(o);
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param dump:TString 字符串
// @param level:Integer 递归层次
//==========================================================
MO.FWindowStorage_innerDump = function FWindowStorage_innerDump(dump, level){
   var o = this;
   var storage = o._storage;
   var count = storage.length;
   for(var i = 0; i < count; i++){
      var name = storage.key(i);
      var value = storage.getItem(name);
      if(i > 0){
         dump.append(';');
      }
      dump.append(name + '=' + value);
   }
}
