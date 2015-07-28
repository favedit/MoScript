//==========================================================
// <T>进度逻辑。</T>
//
// @class
// @author maocy
// @version 150606
//==========================================================
MO.FEaiLogicSchedule = function FEaiLogicSchedule(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._code   = 'schedule';
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicSchedule_doFetch;
   return o;
}

//==========================================================
// <T>获取进度列表处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @return FHttpConnection 处理链接
//==========================================================
MO.FEaiLogicSchedule_doFetch = function FEaiLogicSchedule_doFetch(owner, callback){
   return this.send('fetch', null, owner, callback);
}
