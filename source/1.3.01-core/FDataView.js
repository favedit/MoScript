//==========================================================
// <T>数据观察。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FDataView = function FDataView(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   //..........................................................
   // @method
   o.link    = MO.FDataView_link;
   o.dispose = MO.FDataView_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @param data:Array 数组
//==========================================================
MO.FDataView_link = function FDataView_link(data){
   var o = this;
   o._memory = data;
   o._viewer = new DataView(data);
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
MO.FDataView_dispose = function FDataView_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
