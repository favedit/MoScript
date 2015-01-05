//==========================================================
// <T>数据观察。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FDataView(o){
   o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
   //..........................................................
   // @method
   o.link    = FDataView_link;
   o.dispose = FDataView_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @param p:data:Array 数组
//==========================================================
function FDataView_link(p){
   var o = this;
   o._memory = p;
   o._viewer = new DataView(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
function FDataView_dispose(){
   var o = this;
   o._memory = null;
   o._viewer = null;
   o.__base.FObject.dispose.call(o);
}
