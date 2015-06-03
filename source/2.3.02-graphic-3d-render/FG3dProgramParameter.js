with(MO){
   //==========================================================
   // <T>渲染程序参数。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dProgramParameter = function FG3dProgramParameter(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute 名称
      o._name       = null;
      // @attribute 关联名称
      o._linker     = null;
      // @attribute 格式
      o._formatCd   = EG3dParameterFormat.Unknown;
      // @attribute 关联名称
      o._define     = null;
      // @attribute 使用标志
      o._statusUsed = false;
      // @attribute 插槽
      o._slot       = null;
      // @attribute 大小
      o._size       = 0;
      // @attribute 缓冲
      o._buffer     = null;
      // @attribute 内存
      o._memory     = null;
      //..........................................................
      // @method
      o.name        = FG3dProgramParameter_name;
      o.linker      = FG3dProgramParameter_linker;
      o.define      = FG3dProgramParameter_define;
      o.attachData  = FG3dProgramParameter_attachData;
      o.loadConfig  = FG3dProgramParameter_loadConfig;
      o.dispose     = FG3dProgramParameter_dispose;
      return o;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return String 名称
   //==========================================================
   MO.FG3dProgramParameter_name = function FG3dProgramParameter_name(){
      return this._name;
   }

   //==========================================================
   // <T>获得关联名称。</T>
   //
   // @method
   // @return String 关联名称
   //==========================================================
   MO.FG3dProgramParameter_linker = function FG3dProgramParameter_linker(){
      return this._linker;
   }

   //==========================================================
   // <T>获得定义。</T>
   //
   // @method
   // @return String 定义
   //==========================================================
   MO.FG3dProgramParameter_define = function FG3dProgramParameter_define(){
      return this._define;
   }

   //==========================================================
   // <T>接收数据，返回是否发生变更。</T>
   //
   // @method
   // @param p:value:Object 数据
   // @return Boolean 是否变更
   //==========================================================
   MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(p){
      var o = this;
      var r = false;
      // 检查参数类型
      var c = p.constructor;
      if(c == SMatrix3d){
         // 矩阵数据
         var m = o._memory;
         if(!m){
            m = o._memory = new Float32Array(16);
         }
         r = RFloat.attach(m, p._data, 16);
      }else if(c == Float32Array){
         // 浮点数据
         var l = p.length;
         var m = o._memory;
         if(!m){
            m = o._memory = new Float32Array(l);
         }
         r = RFloat.attach(m, p, l);
      }else{
         throw new TError(o, 'Unknown data type.');
      }
      return r;
   }

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param p:config:TNode 配置节点
   //==========================================================
   MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(p){
      var o = this;
      o._name = p.get('name');
      o._linker = p.get('linker');
      o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
      o._define = p.get('define');
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
      var o = this;
      o._slot = null;
      o._memory = null;
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
