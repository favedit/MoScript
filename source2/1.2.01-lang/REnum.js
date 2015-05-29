with(MO){
   //============================================================
   // <T>枚举管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 141230
   //============================================================
   MO.REnum = function REnum(){
      var o = this;
      //..........................................................
      // @method
      o.contains  = REnum_contains;
      // @method
      o.tryEncode = REnum_tryEncode;
      o.encode    = REnum_encode;
      o.tryDecode = REnum_tryDecode;
      o.decode    = REnum_decode;
      // @method
      o.parse     = REnum_encode;
      o.format    = REnum_decode;
      return o;
   }

   //============================================================
   // <T>是否含有当前内容。</T>
   //
   // @method
   //============================================================
   MO.REnum_contains = function REnum_contains(){
   }

   //============================================================
   // <T>尝试获得枚举内容。</T>
   //
   // @method
   // @param e:enum:Object 枚举对象
   // @param v:value:Object 内容
   // @param d:default:Object 缺省内容
   //============================================================
   MO.REnum_tryEncode = function REnum_tryEncode(e, v, d){
      if(e != null){
         for(var n in e){
            if(n.toLowerCase() == v.toLowerCase()){
               return e[n];
            }
         }
      }
      return d;
   }

   //============================================================
   // <T>获得枚举内容。</T>
   //
   // @method
   // @param e:enum:Object 枚举对象
   // @param v:value:Object 内容
   // @param d:default:Object 缺省内容
   //============================================================
   MO.REnum_encode = function REnum_encode(e, v){
      var o = this;
      var r = o.tryEncode(e, v);
      if(r == null){
         throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v); 
      }
      return r;
   }

   //============================================================
   // <T>尝试获得枚举描述。</T>
   //
   // @method
   // @param e:enum:Object 枚举对象
   // @param v:value:Object 描述
   // @param d:default:Object 缺省描述
   //============================================================
   MO.REnum_tryDecode = function REnum_tryDecode(e, v, d){
      if(e != null){
         for(var n in e){
            if(e[n] == v){
               return n;
            }
         }
      }
      return d;
   }

   //============================================================
   // <T>获得枚举描述。</T>
   //
   // @method
   // @param e:enum:Object 枚举对象
   // @param v:value:Object 描述
   // @param d:default:Object 缺省描述
   //============================================================
   MO.REnum_decode = function REnum_decode(e, v){
      var o = this;
      var r = o.tryDecode(e, v);
      if(r == null){
         throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v); 
      }
      return r;
   }
   //..........................................................
   // 实例化内容
   MO.REnum = new REnum();
}
