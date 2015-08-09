//==========================================================
// <T>页面项目。</T>
//
// @tool
// @author maocy
// @version 150101
//==========================================================
MO.THtmlItem = function THtmlItem(){
   var o = this;
   //..........................................................
   // @property
   o._link  = null;
   o._links = new Object();
   //..........................................................
   // @method
   o.get    = MO.THtmlItem_get;
   o.set    = MO.THtmlItem_set;
   return o;
}

//===========================================================
// <T>根据名称获得内容。</T>
//
// @param name:String 名称
// @return Object 内容
//===========================================================
MO.THtmlItem_get = function THtmlItem_get(name){
   return this._links[name];
}

//===========================================================
// <T>根据名称设置内容。</T>
//
// @param name:String 名称
// @param value:Object 内容
//===========================================================
MO.THtmlItem_set = function THtmlItem_set(name, value){
   this._links[name] = value;
}
