//==========================================================
// <T>内存管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RMemory = new function RMemory(){
   var o = this;
   //..........................................................
   // @attribute
   o.objects       = new Array();
   o.instances     = new Object();
   //..........................................................
   // @method
   o.isObject      = RMemory_isObject;
   o.create        = RMemory_create;
   o.register      = RMemory_register;
   o.disposeObject = RMemory_disposeObject;
   o.dispose       = RMemory_dispose;
   o.unlink        = RMemory_unlink;
   o.free          = RMemory_free;
   o.freeHtml      = RMemory_freeHtml;
   o.release       = RMemory_release;
   o.refresh       = RMemory_refresh;
   return o;
}

//==========================================================
// <T>测试一个对象是否可回收对象。</T>
//
// @method
// @param o:object:Object 要释放的对象
// @return
//    <L value='true'>是</L>
//    <L value='false'>否</L>
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_isObject(o){
   var t = typeof(o);
   return ('boolean' != t) && ('number' != t) && ('string' != t) && ('date' != t) && ('function' != t) && (o instanceof Object);
}

//==========================================================
// <T>从内存中创建一个类对象的实例。</T>
//
// @method
// @param c:class:Function 类的构造函数
// @return Object 类对象的实例
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_create(c){
   var o = new c();
   this.objects.push(o);
   return o;
}

//==========================================================
// <T>注册为由内存管理器管理的对象。</T>
//
// @method
// @param n:name:String 对象名称
// @param o:object:Object 注册对象
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_register(n, o){
   if(this.isObject(o)){
      // 加入对象集合
      this.objects.push(o);
      // 按照类的名称实例集合
      this.instances[n] = o;
   }
}

//==========================================================
// <T>从该对象为起点，递归处理对象内的所有子对象，如果子对象拥有析构函数，则调用析构函数进行处理。</T>
// <P>从最内层向外开始，逐布调用析构函数，调用过程中忽略HTML对象的处理。</P>
//
// @method
// @param o:object:Object 要释放的对象
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_disposeObject(o){
   // 释放所有内部对象
   //for(var n in o){
   //   var v = o[n];
   //   // 测试是否可回收对象
   //   if(null != v && this.isObject(v)){
   //      // 递归处理子对象
   //      if(!v._disposed){
   //      // 修改执行过析构处理的标志
   //         v._disposed = true;
   //         // 如果当前对象支持自析构处理，则通过自析构函数释放内容对象
   //         if(v.dispose instanceof Function){
   //            v.dispose();
   //         }
   //         // 执行所有子对象的递归析构处理
   //         this.disposeObject(v);
   //      }
   //   }
   //}
}

//==========================================================
// <T>首先对该对象执行析构处理，然后递归执行所有子对象的析构处理。</T>
//
// @method
// @param o:object:Object 要释放的对象
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_dispose(o){
   // 测试是否可回收对象
   if(null != o && this.isObject(o)){
      // 递归处理子对象
      if(!o._disposed){
         // 修改执行过析构处理的标志
         o._disposed = true;
            // 如果当前对象支持自析构处理，则通过自析构函数释放内容对象
         if(o.dispose instanceof Function){
            o.dispose();
         }
         // 执行所有子对象的递归析构处理
         this.disposeObject(o);
      }
   }
}

//==========================================================
// <T>从该对象为起点，递归断开内部的所有对象关联。</T>
// <P>从最内部向外开始逐渐切断对象关联，忽略HTML对象的处理。</P>
//
// @method
// @param o:object:Object 要释放的对象
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_unlink(o){
   // 断开所有内部对象
   for(var n in o){
      var v = o[n];
      // 删除对象关联
      //delete o[n];
      o[n] = null;
      // 测试是否可回收对象
      if(null != v && this.isObject(v)){
         // 递归处理子对象，进入内层对象，循环断开链接
         this.unlink(o);
      }
   }
}

//==========================================================
// <T>释放一个对象。</T>
// <P>先执行内部所有对象的析构函数，再断开所有对象的关联关系。</P>
//
// @method
// @param o:object:Object 要释放的对象
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_free(o){
   this.dispose(o);
   this.unlink(o);
}

//==========================================================
// <T>释放一个页面对象。</T>
//
// @method
// @param o:object:<HTML> 要释放的页面对象
// @history 090608 MAOCY 创建
//==========================================================
function RMemory_freeHtml(h){
   if(h){
      h.removeNode(true);
   }
}

//==========================================================
// <T>释放当前内存中所有对象实例。</T>
//
// @method
// @history 090607 MAOCY 创建
//==========================================================
function RMemory_release(){
   var o = this;
   o.free(o.objects);
   o.free(o.instances);
   o.refresh();
}

//==========================================================
// <T>强制释放当前内存中所有对象实例。</T>
//
// @method
// @history 090627 MAOCY 创建
//==========================================================
function RMemory_refresh(){
   if(RContext.optionGarbage){
      CollectGarbage();
   }
}
