//==========================================================
// <T>渲染立方体。</T>
//
// BeginPoint           Text Unit            EndPoint
//  o──────────────────────o
//  │Interval│        │        │        │   │ 
//  │                                           │Direction
//
//
// @class
// @author maocy
// @history 150509
//==========================================================
function FE3dRuler(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   //..........................................................
   // @attribute
   o._style                = null;
   // @attribute
   o._beginPoint           = null;
   o._endPoint             = null;
   o._direction            = null;
   // @attribute
   o._directionLine        = null;
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   // @attribute
   o._vertexPositionData   = null;
   o._vertexColorData      = null;
   o._indexData            = null;
   //..........................................................
   // @method
   o.construct             = FE3dRuler_construct;
   // @method
   o.style                 = FE3dRuler_style;
   o.beginPoint            = FE3dRuler_beginPoint;
   o.endPoint              = FE3dRuler_endPoint;
   o.direction             = FE3dRuler_direction;
   // @method
   o.setup                 = FE3dRuler_setup;
   o.upload                = FE3dRuler_upload;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dRuler_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._material = RClass.create(FE3dMaterial);
   o._style = new SE3dRulerStyle();
   o._beginPoint = new SPoint3(0, 0, 0);
   o._endPoint = new SPoint3(0, 10, 0);
   o._direction = new SVector3(1, 0, 0);
   o._directionLine = new SVector3();
   // 设置属性
   o._vertexPositionData = new TArray();
   o._vertexColorData = new TArray();
   o._indexData = new TArray();
}

//==========================================================
// <T>获得样式。</T>
//
// @method
// @return SE3dRulerStyle 样式
//==========================================================
function FE3dRuler_style(){
   return this._style;
}

//==========================================================
// <T>获得开始点。</T>
//
// @method
// @return SPoint3 开始点
//==========================================================
function FE3dRuler_beginPoint(){
   return this._beginPoint;
}

//==========================================================
// <T>获得结束点。</T>
//
// @method
// @return SPoint3 结束点
//==========================================================
function FE3dRuler_endPoint(){
   return this._endPoint;
}

//==========================================================
// <T>获得方向。</T>
//
// @method
// @return SVector3 方向
//==========================================================
function FE3dRuler_direction(){
   return this._direction;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FE3dRuler_setup(){
   var o = this;
   var context = o._graphicContext;
   // 创建顶点缓冲
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   // 创建颜色缓冲
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   // 创建索引缓冲
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.setFillModeCd(EG3dFillMode.Line);
   buffer.setLineWidth(1);
   //..........................................................
   // 更新数据
   o.upload();
   // 更新处理
   o.update();
   //..........................................................
   // 设置材质
   var info = o.material().info();
   info.effectCode = 'control';
   info.ambientColor.set(1, 1, 1, 1);
}

//==========================================================
// <T>上传处理。</T>
//
// @method
//==========================================================
function FE3dRuler_upload(){
   var o = this;
   var vertexCount = 0;
   var style = o._style;
   // 获得数据
   var positions = o._vertexPositionData;
   positions.clear();
   var colors = o._vertexColorData;
   colors.clear();
   var indexs = o._indexData;
   indexs.clear();
   //..........................................................
   // 绘制基础线
   var beginPoint = o._beginPoint;
   var endPoint = o._endPoint;
   positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
   colors.push(255, 255, 255, 255);
   vertexCount++;
   positions.push(endPoint.x, endPoint.y, endPoint.z);
   colors.push(255, 255, 255, 255);
   vertexCount++;
   indexs.push(0, 1);
   //..........................................................
   // 绘制两个端线
   var bothLength = style.bothLength;
   var bothColor = style.bothColor;
   var direction = o._direction;
   var tickBeginPoint = new SPoint3();
   var tickEndPoint = new SPoint3();
   // 计算开始点端线
   positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   tickEndPoint.x = direction.x * bothLength + beginPoint.x;
   tickEndPoint.y = direction.y * bothLength + beginPoint.y;
   tickEndPoint.z = direction.z * bothLength + beginPoint.z;
   positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   // 计算索引
   indexs.push(vertexCount, vertexCount + 1);
   vertexCount += 2;
   // 计算结束点端线
   positions.push(endPoint.x, endPoint.y, endPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   tickEndPoint.x = direction.x * bothLength + endPoint.x;
   tickEndPoint.y = direction.y * bothLength + endPoint.y;
   tickEndPoint.z = direction.z * bothLength + endPoint.z;
   positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   // 计算索引
   indexs.push(vertexCount, vertexCount + 1);
   vertexCount += 2;
   //..........................................................
   // 绘制分隔线
   var lineDirection = o._directionLine.direction(beginPoint, o._endPoint);
   var length = lineDirection.length();
   lineDirection.normalize();
   var precisions = style.precisions;
   var count = precisions.count();
   for(var n = 0; n < count; n++){
      var precision = precisions.at(n);
      // 绘制精度刻度
      var tickInterval = precision.interval;
      var tickLength = precision.length;
      var tickColor = precision.color;
      for(var i = tickInterval; i < length; i += tickInterval){
         // 计算开始点
         tickBeginPoint.x = lineDirection.x * i + beginPoint.x;
         tickBeginPoint.y = lineDirection.y * i + beginPoint.y;
         tickBeginPoint.z = lineDirection.z * i + beginPoint.z;
         positions.push(tickBeginPoint.x, tickBeginPoint.y, tickBeginPoint.z);
         colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
         // 计算结束点
         tickEndPoint.x = direction.x * tickLength + tickBeginPoint.x;
         tickEndPoint.y = direction.y * tickLength + tickBeginPoint.y;
         tickEndPoint.z = direction.z * tickLength + tickBeginPoint.z;
         positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
         colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
         // 计算索引
         indexs.push(vertexCount, vertexCount + 1);
         vertexCount += 2;
      }
   }
   // 更新数据
   o._vertexPositionBuffer.upload(positions.memory(), 4 * 3, vertexCount);
   o._vertexColorBuffer.upload(colors.memory(), 1 * 4, vertexCount);
   o._indexBuffer.upload(indexs.memory(), indexs.length());
}
