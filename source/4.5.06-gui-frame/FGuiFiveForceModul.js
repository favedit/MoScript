//==========================================================
// <T>线图显示类。</T>
//
// @class
// @author adu
// @history 150715
//==========================================================
MO.FGuiFiveForceModul = function FGuiFiveForceModul(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._data                    = null;
   o._pointCount              = MO.Class.register(o, new MO.AGetSet('_pointCount'),5);
   o._ratationDegree          = MO.Class.register(o, new MO.AGetSet('_ratationDegree'));
   o._angleLineColor          = MO.Class.register(o, new MO.AGetSet('_angleLineColor'),'#ffffff');
   o._angleLineWidth          = MO.Class.register(o, new MO.AGetSet('_angleLineWidth'),3);
   o._radius                  = MO.Class.register(o, new MO.AGetSet('_radius'),30);
   o._pointZero               = MO.Class.register(o, new MO.AGetSet('_pointZero'));
   //..........................................................
   // @method
   o.construct                = MO.FGuiFiveForceModul_construct;
   o.setup                    = MO.FGuiFiveForceModul_setup;
   o.onImageLoad              = MO.FGuiFiveForceModul_onImageLoad;
   o.onPaintBegin             = MO.FGuiFiveForceModul_onPaintBegin;
   o.dispose                  = MO.FGuiFiveForceModul_dispose;

   o.setData                  = MO.FGuiFiveForceModul_setData;
   o._fiveforce               = null;

   //o.drawLine                 = MO.FGuiFiveForceModul_drawLine;

   //..........................................................
   return o;
}
// MO.FGuiFiveForceModul_drawLine = function FGuiFiveForceModul_drawLine(graphic, rectangle, dataheigt, minValue,maxValue, code, color, lineWidth){
//    var o = this;
//    var handle = graphic._handle;
//    handle.beginPath();
//    var units = o._data.days();
//    var count = units.count();
//    // 计算步宽
//    var left = rectangle.left + 140;
//    var top = rectangle.top;
//    var width = rectangle.width - 180;
//    var height = dataheigt ;
//    var stepWidth = width / count;
//    var stepHeight = dataheigt / maxValue;
//    for(var n = 0; n < count; n++){
//       var unit = units.at(n);
//       var x = left + stepWidth * n;
//       var y = top + height - stepHeight * unit[code]+35;
//       if(n == 0){
//          handle.moveTo(x, y);
//       }else{
//          // if(unit[code]!=0)
//          handle.lineTo(x, y);
//       }
//    }
//    handle.lineWidth = lineWidth;
//    handle.strokeStyle = color;
//    handle.stroke();

// }
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiFiveForceModul_construct = function FGuiFiveForceModul_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._ratationDegree = (2*Math.PI)/o._pointCount;
   o._pointZero = new MO.SPoint2(0,0);
   //o._data = MO.Class.create(MO.FGuiFiveForceModulData);
}

MO.FGuiFiveForceModul_setup = function FGuiFiveForceModul_setup() {
   var o = this;
   // var imageConsole = MO.Console.find(MO.FImageConsole);
   // //上部图表
   // var image = o._fiveforce = imageConsole.load('{eai.resource}/cockpit/achievement/optionCilck1.png');
   o._fiveforce = o.loadResourceImage('{eai.resource}/cockpit/achievement/optionCilck1.png');

   o._fiveforce.addLoadListener(o,o.onImageLoad);
}

MO.FGuiFiveForceModul_onImageLoad = function FGuiFiveForceModul_onImageLoad() {
   this.dirty();
}

MO.FGuiFiveForceModul_onPaintBegin = function FGuiFiveForceModul_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);

   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var data = o._data ;
   var dataheigt = height/2;
   graphic.drawRectangle(left, top, width, height, '#ffffff', 3);
   var ctx = graphic._handle;
   var pointCount = o._pointCount;
   var graphHeight = height/pointCount;
   var ratationDegree = o._ratationDegree;
   var graphicLeft = left;
   var graphicTop = top;
   var radius = o._radius;
   var ss= o._fiveforce;

   graphic.drawImage(o._fiveforce, 0, 0, width, height);
   var sinr = radius*Math.sin(ratationDegree);
   var cosr = radius*Math.cos(ratationDegree);

   var point1x = 0;
   var point1y = radius;

   // ctx.save()
   // ctx.strokeStyle = o._angleLineColor;
   // ctx.lineWidth = o._angleLineWidth;
   // ctx.beginPath();
   // ctx.moveTo(left/2,top/2);
   // for(var i=0;i<pointCount;i++){
   //    ctx.rotate(ratationDegree);
   //    ctx.translate(width/2,height/2);
   //    ctx.lineTo(left/2,top/2);
   //    ctx.stroke();
   // }
   // ctx.closePath();
   // ctx.restore();
   // ctx.beginPath();

   // ctx.closePath();

   // // if(!data){
   //    return;
   // }
   // var units = data.days();
   // var count = units._count;
   // var maxValue =0;
   // var minValue =0;
   // var maxValueInvest =0;
   // var minValueInvest =0;
   // for(var i=0;i<count;i++){
   //    var day = units.at(i);
   //    maxValueInvest = Math.max(day.priorInvestmentAmount(), maxValueInvest);
   //    maxValueInvest = Math.max(day.priorRedemptionAmount(), maxValueInvest);
   //    minValueInvest = Math.min(day.priorNetinvestmentAmount(), minValueInvest);
   //    maxValueInvest = Math.max(day.investmentAmount(), maxValueInvest);
   //    maxValueInvest = Math.max(day.redemptionAmount(), maxValueInvest);
   //    minValueInvest = Math.min(day.netinvestmentAmount(), minValueInvest);
   // }
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorInvestmentAmount', '#4b5e6f', 2);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorRedemptionAmount', '#80a861', 2);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorNetinvestmentAmount', '#947b91', 2);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_investmentAmount', '#51c0db', 3);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_redemptionAmount', '#68f34e', 3);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_netinvestmentAmount', '#9b1933', 3);
}

MO.FGuiFiveForceModul_setData = function FGuiFiveForceModul_setData(data) {
   var o = this;
   var data = o._data = data;
}

MO.FGuiFiveForceModul_dispose = function FGuiFiveForceModul_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}