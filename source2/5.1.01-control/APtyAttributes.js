with(MO){
   //==========================================================
   // <T>填充的属性描述类。</T>
   //
   // @property
   // @param n:name:String 名称
   // @param l:linker:String 关联名称
   // @param vl:left:Integer 左边距
   // @param vt:top:Integer 上边距
   // @param vr:right:Integer 右边距
   // @param vb:bottom:Integer 下边距
   // @author maocy
   // @version 150101
   //==========================================================
   MO.APtyAttributes = function APtyAttributes(n, l, vl, vt, vr, vb){
      var o = this;
      AProperty.call(o, n, l);
      //..........................................................
      // @attribute
      o._left    = RInteger.nvl(vl);
      o._top     = RInteger.nvl(vt);
      o._right   = RInteger.nvl(vr);
      o._bottom  = RInteger.nvl(vb);
      //..........................................................
      // @method
      o.load     = APtyAttributes_load;
      o.save     = APtyAttributes_save;
      o.toString = APtyAttributes_toString;
      return o;
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.APtyAttributes_load = function APtyAttributes_load(v, x){
      var o = this;
      var s = v[o._name];
      if(!s){
         s = v[o._name] = new TAttributes();
      }
      s.split(x.get(o._linker), '=', '\n');
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.APtyAttributes_save = function APtyAttributes_save(v, x){
      var o = this;
      var s = v[o._name];
      if(s){
         if(!s.isEmpty()){
            x.set(o._linker, s.join('=', '\n'));
         }
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.APtyAttributes_toString = function APtyAttributes_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
   }
}
