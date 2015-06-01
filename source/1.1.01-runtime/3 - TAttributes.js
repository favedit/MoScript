with(MO){
   //==========================================================
   // <T>名称和内容都是字符串的关联保存表的工具类。</T>
   //
   // @reference
   // @author maocy
   // @version 141229
   //==========================================================
   MO.TAttributes = function TAttributes(){
      var o = this;
      TDictionary.call(o);
      //..........................................................
      // @method
      o.join   = TAttributes_join;
      o.split  = TAttributes_split;
      o.pack   = TAttributes_pack;
      o.unpack = TAttributes_unpack;
      // @method
      o.dump   = TAttributes_dump;
      return o;
   }

   //==========================================================
   // <T>将内部所有项目关联成一个字符串。</T>
   //
   // @method
   // @param name:String 分隔名称的字符
   // @param value:String 分隔内容的字符
   // @return String 字符串
   //==========================================================
   MO.TAttributes_join = function TAttributes_join(name, value){
      var source = new TString();
      if(!name){
         name = '=';
      }
      if(!value){
         value = ',';
      }
      var count = this._count;
      for(var i = 0; i < count; i++){
         if(i > 0){
            source.append(value);
         }
         source.append(this.names[i]);
         source.append(name);
         source.append(this.values[i]);
      }
      return source.flush();
   }

   //==========================================================
   // <T>将字符串分割为子项。</T>
   //
   // @method
   // @param source:String 字符串
   // @param name:String 分隔名称的字符
   // @param value:String 分隔内容的字符
   //==========================================================
   MO.TAttributes_split = function TAttributes_split(source, name, value){
      var items = source.split(value);
      var count = items.length;
      for(var i = 0; i < count; i++){
         var item = items[i];
         if(item.length){
            var codes = item.split(name);
            if(codes.length == 2){
               this.set(RString.trim(codes[0]), RString.trim(codes[1]));
            }else{
               this.set(RString.trim(item), '');
            }
         }
      }
   }

   //==========================================================
   // <T>将表中所有数据连接成一个字符串。</T>
   // <P>打包方式：项目1(名称长度的长度+名称长度+名称+内容长度的长度+内容长度+内容)+...。</P>
   //
   // @method
   // @return String 打包字符串
   //==========================================================
   MO.TAttributes_pack = function TAttributes_pack(){
      var source = new TString();
      var count = this._count;
      for(var i = 0; i < count; i++){
         var name = this.names[i];
         var value = this.values[i];
         var nameLength = name.length;
         source.append(nameLength.toString().length, nameLength, name);
         if(value != null){
            var value = value + '';
            var valueLength = value.length;
            source.append(valueLength.toString().length, valueLength, value);
         }else{
            source.append('0');
         }
      }
      return source.flush();
   }

   //==========================================================
   // <T>将一个打包字符串分解为所有子项。</T>
   //
   // @method
   // @param source:String 打包字符串
   //==========================================================
   MO.TAttributes_unpack = function TAttributes_unpack(source){
      this.count = 0;
      var position = 0;
      var sourceLength = source.length;
      while(position < sourceLength){
         // 解析名称
         var lengthLength = parseInt(source.substr(position++, 1));
         var length = parseInt(source.substr(position, lengthLength));
         var name = source.substr(position + lengthLength, length);
         position += lengthLength + length;
         // 解析内容
         lengthLength = parseInt(source.substr(position++, 1));
         var value = null;
         if(lengthLength > 0){
            length = parseInt(source.substr(position, lengthLength));
            value = source.substr(position + lengthLength, length);
            position += lengthLength + length;
         }
         // 设置分解后的内容
         this.set(name, value);
      }
   }

   //==========================================================
   // <T>获得数组的内部信息。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   MO.TAttributes_dump = function TAttributes_dump(){
      var info = new TString();
      var count = this._count;
      info.append(RRuntime.className(o), ' : ', count);
      if(count > 0){
         info.append(' (');
         for(var i = 0; i < count; i++){
            if(i > 0){
               info.append(', ');
            }
            info.append(this._names[i], '=', this._values[i]);
         }
         info.append(')');
      }
      return info.flush();
   }
}
