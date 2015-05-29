with(MO){
   //==========================================================
   // <T>资源纹理位图打包。</T>
   //
   // @class
   // @author maocy
   // @history 150416
   //==========================================================
   MO.FE3sMaterialBitmapPack = function FE3sMaterialBitmapPack(o){
      o = RClass.inherits(this, o, FE3sObject);
      //..........................................................
      // @attribute
      o._typeName       = null;
      o._formatName     = null;
      o._size           = null;
      //..........................................................
      // @method
      o.construct       = FE3sMaterialBitmapPack_construct;
      // @method
      o.typeName        = FE3sMaterialBitmapPack_typeName;
      o.formatName      = FE3sMaterialBitmapPack_formatName;
      o.size            = FE3sMaterialBitmapPack_size;
      o.unserialize     = FE3sMaterialBitmapPack_unserialize;
      // @method
      o.dispose         = FE3sMaterialBitmapPack_dispose;
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sMaterialBitmapPack_construct = function FE3sMaterialBitmapPack_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._size = new SSize2();
   }

   //==========================================================
   // <T>获得类型名称。</T>
   //
   // @method
   // @return String 类型名称
   //==========================================================
   MO.FE3sMaterialBitmapPack_typeName = function FE3sMaterialBitmapPack_typeName(){
      return this._typeName;
   }

   //==========================================================
   // <T>获得格式名称。</T>
   //
   // @method
   // @return String 格式名称
   //==========================================================
   MO.FE3sMaterialBitmapPack_formatName = function FE3sMaterialBitmapPack_formatName(){
      return this._formatName;
   }

   //==========================================================
   // <T>获得大小。</T>
   //
   // @method
   // @return SSize2 大小
   //==========================================================
   MO.FE3sMaterialBitmapPack_size = function FE3sMaterialBitmapPack_size(){
      return this._size;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @method
   // @param input:FByteStream 数据流
   //==========================================================
   MO.FE3sMaterialBitmapPack_unserialize = function FE3sMaterialBitmapPack_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      // 读取属性
      o._typeName = input.readString();
      o._formatName = input.readString();
      o._size.unserialize(input, EDataType.Uint16);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sMaterialBitmapPack_dispose = function FE3sMaterialBitmapPack_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      // 父处理
      o.__base.FE3sObject.dispose.call(o);
   }
}
