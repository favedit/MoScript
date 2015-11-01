//==========================================================
// <T>加载和保存属性的接口。</T>
//
// @face
// @author maocy
// @version 150806
//==========================================================
MO.MPersistence = function MPersistence(o){
   o = MO.Class.inherits(this, o, MO.MPersistenceAble);
   //..........................................................
   // @method
   o.unserialize = MO.MPersistence_unserialize;
   o.serialize   = MO.MPersistence_serialize;
   return o;
}

//==========================================================
// <T>从输入流中反序列化数据内容。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.MPersistence_unserialize = function MPersistence_unserialize(input){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var n = 0; n < count; n++){
      var annotation = annotations.at(n);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      if(dateCd == MO.EDataType.Struct){
         // 读取结构
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newStruct();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Object){
         // 读取对象
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newInstance();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         // 读取对象集合
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TObjects();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.push(item);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         // 读取对象字典
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TDictionary();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.set(item.code(), item);
         }
      }else{
         // 读取基本数据
         o[name] = input.readData(dateCd);
      }
   }
}

//==========================================================
// <T>将数据内容序列化到输出流中。</T>
//
// @method
// @param output:MStream 输出流
//==========================================================
MO.MPersistence_serialize = function MPersistence_serialize(output){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var i = 0; i < count; i++){
      var annotation = annotations.at(i);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      var value = o[name];
      if(dateCd == MO.EDataType.Object){
         // 写入对象
         value.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         // 写入对象集合
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         // 写入对象字典
         var items = o[name];
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else{
         // 写入基本数据
         input.writeData(dateCd, value);
      }
   }
}
