//==========================================================
// <T>地球接触信息。</T>
//
// @struct
// @author maocy
// @version 151010
//==========================================================
MO.SEaiEarthTouch = function SEaiEarthTouch(){
   var o = this;
   //..........................................................
   // @attribute
   o.points        = new MO.TObjects();
   o.direction     = new MO.SVector3();
   //..........................................................
   // @method
   o.setInfo       = MO.SEaiEarthTouch_setInfo;
   o.calculate     = MO.SEaiEarthTouch_calculate;
   o.calculateFlat = MO.SEaiEarthTouch_calculateFlat;
   // @method
   o.toString      = MO.SEaiEarthTouch_toString;
   return o;
}

//============================================================
// <T>设置信息。</T>
//
// @method
// @return info 信息
//============================================================
MO.SEaiEarthTouch_setInfo = function SEaiEarthTouch_setInfo(info){
   var o = this;
   var infoPoints = info.points();
   // 清空集合
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      MO.Memory.free(point);
   }
   points.clear();
   // 设置信息
   var count = infoPoints.count();
   for(var i = 0; i < count; i++){
      var infoPoint = infoPoints.at(i);
      var point = MO.Memory.alloc(MO.SEaiEarthTouchPoint);
      point.setInfo(infoPoint);
      points.push(point);
   }
   // 设置方向
   var point = points.first();
   o.direction.assign(point.direction);
}

//============================================================
// <T>计算处理。</T>
//
// @method
// @return matrix 矩阵
//============================================================
MO.SEaiEarthTouch_calculate = function SEaiEarthTouch_calculate(matrix){
   var o = this;
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      point.calculate(matrix);
   }
}

//============================================================
// <T>计算处理。</T>
//
// @method
// @return matrix 矩阵
//============================================================
MO.SEaiEarthTouch_calculateFlat = function SEaiEarthTouch_calculateFlat(matrix){
   var o = this;
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      var position = point.position;
      point.calculateFlat(matrix, position.x, position.y);
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.SEaiEarthTouch_toString = function SEaiEarthTouch_toString(){
   var o = this;
   var result = new MO.TString();
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      result.append(point.toString());
   }
   return result.toString();
}
