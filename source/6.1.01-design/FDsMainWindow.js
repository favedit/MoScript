with(MO){
   //==========================================================
   // <T>显示对象。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsMainWindow = function FDsMainWindow(o){
      o = MO.Class.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._name             = null;
      o._matrix           = null;
      o._location         = null;
      o._rotation         = null;
      o._scale            = null;
      // @attribute
      o._visible          = true;
      // @attribute
      o._renderables      = null;
      //..........................................................
      // @method
      o.construct         = FDsMainWindow_construct;
      // @method
      o.isName            = FDsMainWindow_isName;
      o.name              = FDsMainWindow_name;
      o.matrix            = FDsMainWindow_matrix;
      o.location          = FDsMainWindow_location;
      o.rotation          = FDsMainWindow_rotation;
      o.scale             = FDsMainWindow_scale;
      // @method
      o.hasRenderable     = FDsMainWindow_hasRenderable;
      o.filterRenderables = FDsMainWindow_filterRenderables;
      o.renderables       = FDsMainWindow_renderables;
      o.pushRenderable    = FDsMainWindow_pushRenderable;
      // @method
      o.process           = FDsMainWindow_process;
      o.update            = FDsMainWindow_update;
      // @method
      o.dispose           = FDsMainWindow_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainWindow_construct = function FDsMainWindow_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new MO.SMatrix3d();
      o._location = new MO.SPoint3();
      o._rotation = new MO.SVector3();
      o._scale = new MO.SVector3();
      o._scale.set(1, 1, 1);
   }

   //==========================================================
   // <T>判断是否指定名称。</T>
   //
   // @method
   // @param p:name:String 名称
   //==========================================================
   MO.FDsMainWindow_isName = function FDsMainWindow_isName(p){
      return this._name == p;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FDsMainWindow_name = function FDsMainWindow_name(){
      return this._name;
   }

   //==========================================================
   // <T>获得矩阵。</T>
   //
   // @method
   // @return 矩阵
   //==========================================================
   MO.FDsMainWindow_matrix = function FDsMainWindow_matrix(){
      return this._matrix;
   }

   //==========================================================
   // <T>获得位置。</T>
   //
   // @method
   // @return 位置
   //==========================================================
   MO.FDsMainWindow_location = function FDsMainWindow_location(){
      return this._location;
   }

   //==========================================================
   // <T>获得方向。</T>
   //
   // @method
   // @return 方向
   //==========================================================
   MO.FDsMainWindow_rotation = function FDsMainWindow_rotation(){
      return this._rotation;
   }

   //==========================================================
   // <T>获得缩放。</T>
   //
   // @method
   // @return 缩放
   //==========================================================
   MO.FDsMainWindow_scale = function FDsMainWindow_scale(){
      return this._scale;
   }

   //==========================================================
   // <T>判断是否含有渲染对象。</T>
   //
   // @method
   // @return Boolean 是否含有
   //==========================================================
   MO.FDsMainWindow_hasRenderable = function FDsMainWindow_hasRenderable(){
      var r = this._renderables;
      if(r != null){
         return !r.isEmpty();
      }
      return false;
   }

   //==========================================================
   // <T>过滤渲染集合。</T>
   //
   // @method
   // @param p:region:FRegion 渲染区域
   //==========================================================
   MO.FDsMainWindow_filterRenderables = function FDsMainWindow_filterRenderables(p){
      var o = this;
      // 检查可见性
      if(!o._visible){
         return false;
      }
      // 处理渲染集合
      var rs = o._renderables;
      if(rs != null){
         var c = rs.count();
         for(var n = 0; n < c; n++){
            var r = rs.get(n);
            if(r.testVisible()){
               p.pushRenderable(r);
            }
         }
      }
      return true;
   }

   //==========================================================
   // <T>获得渲染集合。</T>
   //
   // @method
   // @return TObjects 渲染集合
   //==========================================================
   MO.FDsMainWindow_renderables = function FDsMainWindow_renderables(){
      var o = this;
      var r = o._renderables;
      if(r == null){
         r = o._renderables = new MO.TObjects();
      }
      return r;
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @param p:renderable:FRenderable 渲染对象
   //==========================================================
   MO.FDsMainWindow_pushRenderable = function FDsMainWindow_pushRenderable(p){
      this.renderables().push(p);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainWindow_update = function FDsMainWindow_update(){
      var o = this;
      // 更新矩阵
      var m = o._matrix;
      m.set(o._location, o._rotation, o._scale);
      m.update();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainWindow_process = function FDsMainWindow_process(){
      var o = this;
      // 处理渲染集合
      var rs = o._renderables;
      if(rs != null){
         var c = rs.count();
         for(var i = 0; i < c; i++){
            rs.get(i).process();
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainWindow_dispose = function FDsMainWindow_dispose(){
      var o = this;
      // 释放属性
      o._matrix = null;
      o._position = null;
      o._direction = null;
      o._scale = null;
      // 释放渲染集合（不释放渲染对象）
      var rs = o._renderables;
      if(rs != null){
         rs.dispose();
         o._renderables = null
      }
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
