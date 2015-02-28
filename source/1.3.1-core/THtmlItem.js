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
   o.get    = THtmlItem_get;
   o.set    = THtmlItem_set;
   return o;

   //===========================================================
   // <T>根据名称获得内容。</T>
   //
   // @param n:name:String 名称
   // @return Object 内容
   //===========================================================
   function THtmlItem_get(n){
      return this._links[n];
   }

   //===========================================================
   // <T>根据名称设置内容。</T>
   //
   // @param n:name:String 名称
   // @param v:value:Object 内容
   //===========================================================
   function THtmlItem_set(n, v){
      this._links[n] = v;
   }
}
