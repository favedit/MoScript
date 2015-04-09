//==========================================================
// <T>窗口存储类。</T>
//
// @class
// @author maocy
// @version 140409
//==========================================================
function FWindowStorage(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._scopeCd  = null;
   // @attribute
   o._storage  = null;
   //..........................................................
   // @method
   o.scopeCd   = FWindowStorage_scopeCd;
   // @method
   o.link      = FWindowStorage_link;
   // @method
   o.get       = FWindowStorage_get;
   o.set       = FWindowStorage_set;
   o.remove    = FWindowStorage_remove;
   o.clear     = FWindowStorage_clear;
   // @method
   o.innerDump = FWindowStorage_innerDump;
   return o;
}

//==========================================================
// <T>获得范围类型。</T>
//
// @method
// @return 范围类型
//==========================================================
function FWindowStorage_scopeCd(){
   return this._scopeCd;
}

//==========================================================
// <T>关联存储对象。</T>
//
// @method
// @param storage:Object 存储对象
//==========================================================
function FWindowStorage_link(storage){
   this._storage = storage;
}

//==========================================================
// <T>根据名称获得存储内容。</T>
//
// @method
// @param name:String 存储名称
// @return Object 存储内容
//==========================================================
function FWindowStorage_get(name){
   return this._storage.getItem(name);
}

//==========================================================
// <T>根据名称设置存储内容。</T>
//
// @method
// @param name:String 存储名称
// @param value:Object 存储内容
//==========================================================
function FWindowStorage_set(name, value){
   this._storage.setItem(name, value);
}

//==========================================================
// <T>移除存储内容。</T>
//
// @method
// @param name:String 存储名称
//==========================================================
function FWindowStorage_remove(name){
   this._storage.removeItem(name);
}

//==========================================================
// <T>清除存储内容。</T>
//
// @method
//==========================================================
function FWindowStorage_clear(){
   this._storage.clear();
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param dump:TString 字符串
// @param level:Integer 递归层次
//==========================================================
function FWindowStorage_innerDump(dump, level){
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
