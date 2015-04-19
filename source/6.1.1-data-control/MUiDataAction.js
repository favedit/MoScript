//==========================================================
// <T>数据命令接口。</T>
//
// @face
// @author maocy
// @version 150319
//==========================================================
function MUiDataAction(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.doAction = MUiDataAction_doAction
   return o;
}

//==========================================================
// <T>执行指定的命令。</T>
//
// @method
// @param n:name:String 命令名称
//==========================================================
function MUiDataAction_doAction(n){
   var o = this;
   // 检查数据有效性
   //var dataset = o.topComponent(MUiDataset);
   //if(dataset){
   //   if(!o.psValid()){
   //      return;
   //   }
   //}
   // 执行数据处理
   var c = o.findComponent(n);
   if(RClass.isClass(c, MInvoke)){
      c.invoke(this);
   }else{
      throw new TError(o, 'Component is invalid.');
   }
}
