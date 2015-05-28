with(MO){
   //==========================================================
   // <T>内存缓冲节点。</T>
   //
   // @struct
   // @author maocy
   // @version 150523
   //==========================================================
   MO.SMemoryPoolEntry = function SMemoryPoolEntry(){
      var o = this;
      //..........................................................
      // @attribute
      o.next    = null;
      // @attribute
      o.value   = null;
      //..........................................................
      // @method
      o.dispose = SMemoryPoolEntry_dispose;
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.SMemoryPoolEntry_dispose = function SMemoryPoolEntry_dispose(){
      // 释放内容
      var value = this.value;
      if(value){
         value.__pool = null;
         value.dispose();
      }
      // 释放属性
      this.next = null;
      this.value = null;
   }
}
