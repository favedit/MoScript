//==========================================================
// <T>命令管理接口。</T>
//
// @manager
// @param o:object:Object 拥有者对象
// @history 091126 MAOCY 创建
//==========================================================
function MAction(o){
   o = RClass.inherits(this, o);
   // Method
   o.doAction = MAction_doAction
   return o;
}

//==========================================================
// <T>执行指定的命令。</T>
//
// @method
// @param n:name:String 命令名称
//==========================================================
function MAction_doAction(n){
   var o = this;
   // 检查数据有效性
   var dc = o.topComponent(MDataset);
   if(dc){
      if(!o.psValid()){
         return;
      }
   }
   // 检查数据有效性
   var a = o.components.get(n);
   if(RClass.isClass(a, MInvoke)){
      a.invoke(this);
   }
}
