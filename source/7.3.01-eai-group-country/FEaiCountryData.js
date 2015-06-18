with(MO){
   //==========================================================
   // <T>全国地图实体类</T>
   //
   // @class
   // @author sunpeng
   // @history 150606
   //==========================================================
   MO.FEaiCountryData = function FEaiCountryData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      //..........................................................
      // @attribute
      o._provinces  = RClass.register(o, new AGetter('_provinces'));
      //..........................................................
      // @event
      o.onLoaded    = FEaiCountryData_onLoaded;
      //..........................................................
      // @method
      o.construct   = FEaiCountryData_construct;
      // @method
      o.unserialize = FEaiCountryData_unserialize;
      o.load        = FEaiCountryData_load;
      // @method
      o.dispose     = FEaiCountryData_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryData_construct = function FEaiCountryData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      // 创建属性
      o._provinces = new TDictionary();
   }

   //==========================================================
   // <T>初始化处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
      var o = this;
      var data = event.outputData();
      // 创建读取流
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      view.link(data);
      // 反序列化数据
      o.unserialize(view);
      // 释放资源
      view.dispose();
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
      var o = this;
      var stage = MO.Eai.Canvas.activeStage();
      var mapLayer = stage.mapLayer();
      var spriteLayer = stage.spriteLayer();
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiProvinceData);
         province.unserialize(input);
         province.build(MO.Eai.Canvas);
         mapLayer.pushRenderable(province.faceRenderable());
         spriteLayer.pushRenderable(province.borderRenderable());
         o._provinces.set(province.name(), province);
      }
      // 放入城市
      var context = MO.Eai.Canvas.graphicContext();
      var cityConsole = RConsole.find(FEaiResourceConsole).cityConsole();
      var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
      var dateData = historyConsole.dates().get('20150616');
      var cityDatas = dateData.citys();
      var citys = cityConsole.citys();
      var count = citys.count();
      for(var i = 0; i < count; i++){
         var city = citys.at(i);
         var data = cityDatas.get(city.code());
         var bitmapData = context.createObject(MO.FE3dBitmapData);
         bitmapData.loadUrl('../ars/eai/dot.png');
         var bitmap = context.createObject(MO.FE3dBitmap);
         bitmap.setData(bitmapData);
         var material = bitmap.material();
         material.info().optionAlpha = true;
         var range = 1;
         if(data){
            var total = data.investmentTotal() / 10000000;
            range = total / 2;
            if(total > 1){
               total = 1;
            }
            material.info().ambientColor.set(total + 0.1, 0, total + 0.1, 1);
            console.log(i);
         }else{
            material.info().ambientColor.set(0, 0, 0, 1);
         }
         if(range < 1){
            range = 1;
         }
         if(range > 2){
            range = 2;
         }
         var matrix = bitmap.matrix();
         matrix.tx = city.location().x * 0.2 - 20.3 + (0.2 * range / 2);
         matrix.ty = city.location().y * 0.25 - 8 + (0.2 * range / 2);
         matrix.tz = -0.0001;
         matrix.sx = 0.2 * range;
         matrix.sy = 0.2 * range;
         matrix.sz = 0.2 * range;
         matrix.update();
         spriteLayer.pushRenderable(bitmap);
      }
   }

   //==========================================================
   // <T>初始化处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryData_load = function FEaiCountryData_load(){
      var o = this;
      var url = '/script/ars/eai/country.dat';
      var connection = RConsole.find(FHttpConsole).send(url);
      connection.addLoadListener(o, o.onLoaded);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
      var o = this;
      o._provinces = RObject.dispose(o._provinces);
      // 父处理
      o.__base.FEaiEntity.dispose.call(o);
   }
}
