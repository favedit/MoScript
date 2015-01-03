/**************************************************************
 * 用来添加一个活动服务组件的工具类
 *
 * @tool
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function TActive(owner, run){
   var o = this;
   // Attribute
   o.count    = 0;
   o.owner    = owner;
   // Property
   o.status   = EActive.Active;
   o.active   = true;
   o.interval = 100;
   // Method
   o.run      = run;
   o.process  = TActive_process;
   return o;
}

/**************************************************************
 * 调用这个活动对象的函数执行
 *
 * @method
 **************************************************************/
function TActive_process(n){
   var o = this;
   o.count -= n;
   if(o.count < 0){
      if(o.run){
         if(o.owner){
            o.run.call(o.owner, o);
         }else{
            o.run(o);
         }
      }
      o.count = o.interval;
   }
}
