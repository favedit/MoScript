//==========================================================
// <T>准备接口。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.MReady = function MReady(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.testReady = MO.Method.virtual(o, 'testReady');
   return o;
}
