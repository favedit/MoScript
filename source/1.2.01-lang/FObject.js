//==========================================================
// <T>所有可继承对象的基类。</T>
// <P>支持类的判断、获取内部运行信息的功能。</P>
//
// @class
// @author maocy
// @version 141230
//==========================================================
MO.FObject = function FObject(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.__class   = null;
   o.__dispose = false;
   o.__hash    = 0;
   //..........................................................
   // @method
   o.construct = MO.FObject_construct;
   // @method
   o.hashCode  = MO.FObject_hashCode;
   o.toString  = MO.FObject_toString;
   // @method
   o.dispose   = MO.FObject_dispose;
   // @method
   o.innerDump = MO.FObject_innerDump;
   o.dump      = MO.FObject_dump;
   return o;
}

//==========================================================
// <T>构建当前对象的实例。</T>
//
// @method
//==========================================================
MO.FObject_construct = function FObject_construct(){
   this.__dispose = false;
}

//==========================================================
// <T>获取哈希值。</T>
//
// @method
// @return Integer 哈希值
//==========================================================
MO.FObject_hashCode = function FObject_hashCode(){
   var o = this;
   var hash = o.__hash;
   if(!hash){
      hash = o.__hash = MO.RObject.nextId();
   }
   return hash;
}

//==========================================================
// <T>获取当前实例的信息。</T>
//
// @method
// @return String 信息字符串
//==========================================================
MO.FObject_toString = function FObject_toString(){
   return MO.Class.dump(this);
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.FObject_dispose = function FObject_dispose(){
   var o = this;
   MO.RObject.free(o);
   o.__dispose = true;
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param dump:TString 字符串
// @param level:Integer 递归层次
//==========================================================
MO.FObject_innerDump = function FObject_innerDump(dump, level){
   dump.append(MO.Class.dump(this));
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.FObject_dump = function FObject_dump(){
   var result = new MO.TString();
   this.innerDump(result, 0);
   return result.flush();
}
