//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FGui2DMap = function FGui2DMap(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._bgImage       = null;
   // @attribute
   o._countryRes    = MO.Class.register(o, new MO.AGetSet('_countryRes'));
   //..........................................................
   // @method
   o.construct      = MO.FGui2DMap_construct;
   // @method
   o.onPaintBegin   = MO.FGui2DMap_onPaintBegin;
   o.onPaintCity    = MO.FGui2DMap_onPaintCity;
   // @method
   o.dispose        = MO.FGui2DMap_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGui2DMap_construct = function FGui2DMap_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}


//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGui2DMap_onPaintBegin = function FGui2DMap_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if (!o._countryRes) {
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var countryRes = o._countryRes;
   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, '#FF0000', 2);

   var ctx = graphic._handle;
       ctx.lineCap = 'round';
       ctx.beginPath();
   var provinces = countryRes.data().provinces(),
      count = provinces.count(),
      province,boundaries,boundary,positions,items,panX,panY,x,y,scale;

   for(var n = 0 ;  n < count ; n++){
      province = provinces.at(n);
      boundaries = province.boundaries();

     for(var i = 0 ; i < boundaries._count ; i++){
        items         = boundaries.items()[i];
        positionCount = items._positionCount;
        position      = items._positions;
        panX          = -1000;
        panY          = -400;
        scale         = 14;

        ctx.moveTo(position[0] * scale + panX,(90-position[1])*scale + panY);
        for(var j=0; j < positionCount; j++){
              x = position [0+j*2] * scale + panX;
              y = (90-position[1+j*2]) * scale + panY;
              ctx.lineTo( x , y );
        }

     }

   }
   ctx.fillStyle = "rgba(8, 13, 25, 0.63)";
   ctx.strokeStyle = "#00B5F6";
   ctx.lineWidth = 1;
   ctx.stroke();
   ctx.fill();

   o.onPaintCity(event);
}
//==========================================================
// <T>根据代码查找城市信息</T>
// card : int
// @method
//==========================================================

MO.FGui2DMap_onPaintCity = function FGui2DMap_onPaintCity(event,card){
   var o = this;
   var graphic     = event.graphic;
   var rectangle   = event.rectangle;
   var panX        = -1000;
   var panY        = -400;
   var scale       = 14;
   var ctx = graphic._handle;
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityModule();
   var cityData =  cityConsole.findByCard("1410"),
       x = cityData._location.x * scale + panX,
       y = (90 - cityData._location.y) * scale + panY;

  var cityEntity = MO.Class.create(MO.FEaiCityEntity),
      centerColor = "rgba(" + cityEntity._color.red + "," + cityEntity._color.green + "," + cityEntity._color.blue + "," +cityEntity._color.alpha + ")",
      outerColor = "rgba(" + cityEntity._rangeColor.red + ", " + cityEntity._rangeColor.green + "," + cityEntity._rangeColor.blue + ", " + cityEntity._rangeColor.alpha + ")",
      gradient = ctx.createRadialGradient(x, y, 1, x, y, 20);
      gradient.addColorStop(0, "red");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); 
      graphic.drawCircle(x, y,20,1,"rgba(255, 255, 255, 0)",gradient);
      graphic.drawCircle(x, y,2,1,"rgba(255, 255, 255, 0)","#f96");
} 

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGui2DMap_dispose = function FGui2DMap_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);

}
