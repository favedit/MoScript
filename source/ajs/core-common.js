MO.APersistence = function APersistence(name, dataCd, dataClass){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Persistence;
   o._inherit      = true;
   o._ordered      = true;
   o._dataCd       = dataCd;
   o._dataClass    = dataClass;
   o.dataCd        = MO.APersistence_dataCd;
   o.dataClass     = MO.APersistence_dataClass;
   o.newStruct     = MO.APersistence_newStruct;
   o.newInstance   = MO.APersistence_newInstance;
   o.toString      = MO.APersistence_toString;
   return o;
}
MO.APersistence_dataCd = function APersistence_dataCd(){
   return this._dataCd;
}
MO.APersistence_dataClass = function APersistence_dataClass(){
   return this._dataClass;
}
MO.APersistence_newStruct = function APersistence_newStruct(){
   return new this._dataClass();
}
MO.APersistence_newInstance = function APersistence_newInstance(){
   return MO.Class.create(this._dataClass);
}
MO.APersistence_toString = function APersistence_toString(){
   return '<' + this._annotationCd + ',name=' + this._name + '>';
}
MO.AStyle = function AStyle(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Style;
   o._duplicate    = true;
   o._style        = style;
   o.code          = MO.AStyle_code;
   o.style         = MO.AStyle_style;
   o.build         = MO.AStyle_build;
   o.toString      = MO.AStyle_toString;
   if(style == null){
      var value = null;
      if(MO.Lang.String.startsWith(name, '_style')){
         value = name.substring(6);
      }else if(MO.Lang.String.startsWith(name, 'style')){
         value = name.substring(5);
      }
      if(value == null){
         throw new MO.TError('Style name is empty.');
      }
      o._style = value;
   }
   return o;
}
MO.AStyle_code = function AStyle_code(){
   return this._style;
}
MO.AStyle_style = function AStyle_style(){
   return this._style;
}
MO.AStyle_build = function AStyle_build(value){
   var o = this;
   value[o._name] = null;
}
MO.AStyle_toString = function AStyle_toString(){
   var o = this;
   return 'style=' + o._style;
}
MO.AStyleIcon = function AStyleIcon(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Style;
   o._style        = style;
   o.code          = MO.AStyleIcon_code;
   o.style         = MO.AStyleIcon_style;
   o.build         = MO.AStyleIcon_build;
   o.toString      = MO.AStyleIcon_toString;
   if(style == null){
      var value = null;
      if(MO.Lang.String.startsWith(name, '_style')){
         value = name.substring(6);
      }else if(MO.Lang.String.startsWith(name, 'style')){
         value = name.substring(5);
      }
      if(value == null){
         throw new MO.TError('Style name is empty.');
      }
      o._style = value;
   }
   return o;
}
MO.AStyleIcon_code = function AStyleIcon_code(){
   return this._style;
}
MO.AStyleIcon_style = function AStyleIcon_style(){
   return this._style;
}
MO.AStyleIcon_build = function AStyleIcon_build(value){
   var o = this;
   value[o._name] = null;
}
MO.AStyleIcon_toString = function AStyleIcon_toString(){
   var o = this;
   return 'style=' + o._style;
}
MO.EEventInvoke = new function EEventInvoke(){
   var o = this;
   o.Unknown = 0;
   o.Before  = 1;
   o.After   = 2;
   return o;
}
MO.EEventStatus = new function EEventStatus(){
   var o = this;
   o.Unknown  = 0;
   o.Continue = 1;
   o.Stop     = 2;
   o.Cancel   = 3;
   o.Failure  = 4;
   return o;
}
MO.EKeyCode = new function EKeyCode(){
   var o = this;
   o.None      = 0;
   o.Esc       = 27;
   o.Tab       = 9;
   o.Enter     = 13;
   o.Shift     = 16;
   o.Alt       = 18;
   o.Ctrl      = 17;
   o.BackSpace = 8;
   o.Space     = 32;
   o.Left      = 37;
   o.Up        = 38;
   o.Right     = 39;
   o.Down      = 40;
   o.Insert    = 45;
   o.Delete    = 46;
   o.Home      = 36;
   o.End       = 35;
   o.PageUp    = 33;
   o.PageDown  = 34;
   o.F1        = 112;
   o.F2        = 113;
   o.F3        = 114;
   o.F4        = 115;
   o.F5        = 116;
   o.F6        = 117;
   o.F7        = 118;
   o.F8        = 119;
   o.F9        = 120;
   o.F10       = 121;
   o.F11       = 122;
   o.F12       = 123;
   o.N0        = 48;
   o.N1        = 49;
   o.N2        = 50;
   o.N3        = 51;
   o.N4        = 52;
   o.N5        = 53;
   o.N6        = 54;
   o.N7        = 55;
   o.N8        = 56;
   o.N9        = 57;
   o.A         = 65;
   o.B         = 66;
   o.C         = 67;
   o.D         = 68;
   o.E         = 69;
   o.F         = 70;
   o.G         = 71;
   o.H         = 72;
   o.I         = 73;
   o.J         = 74;
   o.K         = 75;
   o.L         = 76;
   o.M         = 77;
   o.N         = 78;
   o.O         = 79;
   o.P         = 80;
   o.Q         = 81;
   o.R         = 82;
   o.S         = 83;
   o.T         = 84;
   o.U         = 85;
   o.V         = 86;
   o.W         = 87;
   o.X         = 88;
   o.Y         = 89;
   o.Z         = 90;
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   var f = o.integerCodes  = new Object();
   f[45] = true;
   f[190] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   var f = o.floatCodes  = new Object();
   f[45] = true;
   f[190] = true;
   f[46] = true;
   f[189] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   return o;
}
MO.EKeyStatus = new function EKeyStatus(){
   var o = this;
   o.Normal = 0;
   o.Press  = 1;
   return o;
}
MO.EMouseButton = new function EMouseButton(){
   var o = this;
   o.Left   = 0;
   o.Right  = 2;
   o.Middle = 3;
   return o;
}
MO.EMouseCursor = new function EMouseCursor(){
   var o = this;
   o.HSize = 'E-resize';
   o.VSize = 'N-resize';
   return o;
}
MO.MClone = function MClone(o){
   o = MO.Class.inherits(this, o);
   o.clone  = MO.MClone_clone;
   return o;
}
MO.MClone_clone = function MClone_clone(){
   var o = this;
   var result = MO.Class.create(o.constructor);
   for(var name in o){
      var value = o[name];
      if(value != null){
         if(!MO.Class.isBaseDataType(value.constructor)){
            result[name] = value.clone();
         }
      }
      result[name] = value;
   }
   return result;
}
MO.MDataStream = function MDataStream(o){
   o = MO.Class.inherits(this, o);
   o._viewer      = null;
   o._endianCd    = false;
   o._position    = 0;
   o.testString   = MO.MDataStream_testString;
   o.readBoolean  = MO.MDataStream_readBoolean;
   o.readInt8     = MO.MDataStream_readInt8;
   o.readInt16    = MO.MDataStream_readInt16;
   o.readInt32    = MO.MDataStream_readInt32;
   o.readInt64    = MO.MDataStream_readInt64;
   o.readUint8    = MO.MDataStream_readUint8;
   o.readUint16   = MO.MDataStream_readUint16;
   o.readUint32   = MO.MDataStream_readUint32;
   o.readUint64   = MO.MDataStream_readUint64;
   o.readFloat    = MO.MDataStream_readFloat;
   o.readDouble   = MO.MDataStream_readDouble;
   o.readString   = MO.MDataStream_readString;
   o.readBytes    = MO.MDataStream_readBytes;
   o.readData     = MO.MDataStream_readData;
   o.writeBoolean = MO.MDataStream_writeBoolean;
   o.writeInt8    = MO.MDataStream_writeInt8;
   o.writeInt16   = MO.MDataStream_writeInt16;
   o.writeInt32   = MO.MDataStream_writeInt32;
   o.writeInt64   = MO.MDataStream_writeInt64;
   o.writeUint8   = MO.MDataStream_writeUint8;
   o.writeUint16  = MO.MDataStream_writeUint16;
   o.writeUint32  = MO.MDataStream_writeUint32;
   o.writeUint64  = MO.MDataStream_writeUint64;
   o.writeFloat   = MO.MDataStream_writeFloat;
   o.writeDouble  = MO.MDataStream_writeDouble;
   o.writeString  = MO.MDataStream_writeString;
   o.writeBytes   = MO.MDataStream_writeBytes;
   o.writeData    = MO.MDataStream_writeData;
   return o;
}
MO.MDataStream_testString = function MDataStream_testString(){
   var o = this;
   var position = o._position;
   var length = o._viewer.getUint16(position, o._endianCd);
   position += 2;
   var result = new MO.TString();
   for(var i = 0; i < length; i++){
      var value = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      result.push(String.fromCharCode(value));
   }
   return result.flush();
}
MO.MDataStream_readBoolean = function MDataStream_readBoolean(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value > 0;
}
MO.MDataStream_readInt8 = function MDataStream_readInt8(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value;
}
MO.MDataStream_readInt16 = function MDataStream_readInt16(){
   var o = this;
   var value = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return value;
}
MO.MDataStream_readInt32 = function MDataStream_readInt32(){
   var o = this;
   var value = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
MO.MDataStream_readInt64 = function MDataStream_readInt64(){
   var o = this;
   var value = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
MO.MDataStream_readUint8 = function MDataStream_readUint8(){
   var o = this;
   var value = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return value;
}
MO.MDataStream_readUint16 = function MDataStream_readUint16(){
   var o = this;
   var value = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return value;
}
MO.MDataStream_readUint32 = function MDataStream_readUint32(){
   var o = this;
   var value = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
MO.MDataStream_readUint64 = function MDataStream_readUint64(){
   var o = this;
   var value = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
MO.MDataStream_readFloat = function MDataStream_readFloat(){
   var o = this;
   var value = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
MO.MDataStream_readDouble = function MDataStream_readDouble(){
   var o = this;
   var value = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
MO.MDataStream_readString = function MDataStream_readString(){
   var o = this;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var position = o._position;
   var length = viewer.getUint16(position, endianCd);
   position += 2;
   var value = new MO.TString();
   for(var i = 0; i < length; i++){
      var character = viewer.getUint16(position, endianCd);
      value.push(String.fromCharCode(character));
      position += 2;
   }
   o._position = position;
   return value.flush();
}
MO.MDataStream_readBytes = function MDataStream_readBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError(o, 'Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getFloat64(position, endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint32(position, endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint16(position, endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      array[i] = viewer.getUint8(position++, endianCd);
   }
   o._position = position;
}
MO.MDataStream_readData = function MDataStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.readInt8();
      case MO.EDataType.Int16:
         return o.readInt16();
      case MO.EDataType.Int32:
         return o.readInt32();
      case MO.EDataType.Int64:
         return o.readInt64();
      case MO.EDataType.Uint8:
         return o.readUint8();
      case MO.EDataType.Uint16:
         return o.readUint16();
      case MO.EDataType.Uint32:
         return o.readUint32();
      case MO.EDataType.Uint64:
         return o.readUint64();
      case MO.EDataType.Float32:
         return o.readFloat();
      case MO.EDataType.Float64:
         return o.readDouble();
      case MO.EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MDataStream_writeBoolean = function MDataStream_writeBoolean(value){
   var o = this;
   o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
   o._position++;
}
MO.MDataStream_writeInt8 = function MDataStream_writeInt8(value){
   var o = this;
   o._viewer.setInt8(o._position, value, o._endianCd);
   o._position++;
}
MO.MDataStream_writeInt16 = function MDataStream_writeInt16(value){
   var o = this;
   o._viewer.setInt16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MDataStream_writeInt32 = function MDataStream_writeInt32(value){
   var o = this;
   o._viewer.setInt32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MDataStream_writeInt64 = function MDataStream_writeInt64(value){
   var o = this;
   o._viewer.setInt64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MDataStream_writeUint8 = function MDataStream_writeUint8(value){
   var o = this;
   o._viewer.setUint8(o._position, value, o._endianCd);
   o._position += 1;
}
MO.MDataStream_writeUint16 = function MDataStream_writeUint16(value){
   var o = this;
   o._viewer.setUint16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MDataStream_writeUint32 = function MDataStream_writeUint32(value){
   var o = this;
   o._viewer.setUint32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MDataStream_writeUint64 = function MDataStream_writeUint64(value){
   var o = this;
   o._viewer.setUint64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MDataStream_writeFloat = function MDataStream_writeFloat(value){
   var o = this;
   o._viewer.setFloat32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MDataStream_writeDouble = function MDataStream_writeDouble(value){
   var o = this;
   o._viewer.setDouble(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MDataStream_writeString = function MDataStream_writeString(value){
   var o = this;
   var viewer = o._viewer;
   var length = v.length;
   var endianCd = o._endianCd;
   var position = o._position;
   viewer.setUint16(position, length, endianCd);
   position += 2;
   for(var i = 0; i < length; i++){
      viewer.setUint16(position, value.charCodeAt(i), endianCd);
      position += 2;
   }
   o._position = position;
}
MO.MDataStream_writeBytes = function MDataStream_writeBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError('Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         viewer.setFloat64(position, array[i], endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         viewer.setUint32(position, array[i], endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         viewer.setUint16(position, array[i], endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      viewer.setUint8(position++, array[i], endianCd);
   }
   o._position = position;
}
MO.MDataStream_writeData = function MDataStream_writeData(dataCd, value){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.writeInt8(value);
      case MO.EDataType.Int16:
         return o.writeInt16(value);
      case MO.EDataType.Int32:
         return o.writeInt32(value);
      case MO.EDataType.Int64:
         return o.writeInt64(value);
      case MO.EDataType.Uint8:
         return o.writeUint8(value);
      case MO.EDataType.Uint16:
         return o.writeUint16(value);
      case MO.EDataType.Uint32:
         return o.writeUint32(value);
      case MO.EDataType.Uint64:
         return o.writeUint64(value);
      case MO.EDataType.Float32:
         return o.writeFloat(value);
      case MO.EDataType.Float64:
         return o.writeDouble(value);
      case MO.EDataType.String:
         return o.writeString(value);
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MDataView = function MDataView(o){
   o = MO.Class.inherits(this, o);
   o._viewer     = null;
   o._endianCd   = MO.Class.register(o, new MO.AGetSet('_endianCd'), false);
   o.getInt8     = MO.MDataView_getInt8;
   o.getInt16    = MO.MDataView_getInt16;
   o.getInt32    = MO.MDataView_getInt32;
   o.getInt64    = MO.MDataView_getInt64;
   o.getUint8    = MO.MDataView_getUint8;
   o.getUint16   = MO.MDataView_getUint16;
   o.getUint32   = MO.MDataView_getUint32;
   o.getUint64   = MO.MDataView_getUint64;
   o.getFloat    = MO.MDataView_getFloat;
   o.getDouble   = MO.MDataView_getDouble;
   o.setInt8     = MO.MDataView_setInt8;
   o.setInt16    = MO.MDataView_setInt16;
   o.setInt32    = MO.MDataView_setInt32;
   o.setInt64    = MO.MDataView_setInt64;
   o.setUint8    = MO.MDataView_setUint8;
   o.setUint16   = MO.MDataView_setUint16;
   o.setUint32   = MO.MDataView_setUint32;
   o.setUint64   = MO.MDataView_setUint64;
   o.setFloat    = MO.MDataView_setFloat;
   o.setDouble   = MO.MDataView_setDouble;
   return o;
}
MO.MDataView_getInt8 = function MDataView_getInt8(p){
   var o = this;
   return o._viewer.getInt8(p, o._endianCd);
}
MO.MDataView_getInt16 = function MDataView_getInt16(p){
   var o = this;
   return o._viewer.getInt16(p, o._endianCd);
}
MO.MDataView_getInt32 = function MDataView_getInt32(p){
   var o = this;
   return o._viewer.getInt32(p, o._endianCd);
}
MO.MDataView_getInt64 = function MDataView_getInt64(p){
   var o = this;
   return o._viewer.getInt64(p, o._endianCd);
}
MO.MDataView_getUint8 = function MDataView_getUint8(p){
   var o = this;
   return o._viewer.getUint8(p, o._endianCd);
}
MO.MDataView_getUint16 = function MDataView_getUint16(p){
   var o = this;
   return o._viewer.getUint16(p, o._endianCd);
}
MO.MDataView_getUint32 = function MDataView_getUint32(p){
   var o = this;
   return o._viewer.getUint32(p, o._endianCd);
}
MO.MDataView_getUint64 = function MDataView_getUint64(p){
   var o = this;
   return o._viewer.getUint64(p, o._endianCd);
}
MO.MDataView_getFloat = function MDataView_getFloat(p){
   var o = this;
   return o._viewer.getFloat32(p, o._endianCd);
}
MO.MDataView_getDouble = function MDataView_getDouble(p){
   var o = this;
   return o._viewer.getFloat64(p, o._endianCd);
}
MO.MDataView_setInt8 = function MDataView_setInt8(p, v){
   var o = this;
   o._viewer.setInt8(p, v, o._endianCd);
}
MO.MDataView_setInt16 = function MDataView_setInt16(p, v){
   var o = this;
   o._viewer.setInt16(p, v, o._endianCd);
}
MO.MDataView_setInt32 = function MDataView_setInt32(p, v){
   var o = this;
   o._viewer.setInt32(p, v, o._endianCd);
}
MO.MDataView_setInt64 = function MDataView_setInt64(p, v){
   var o = this;
   o._viewer.setInt64(p, v, o._endianCd);
}
MO.MDataView_setUint8 = function MDataView_setUint8(p, v){
   var o = this;
   o._viewer.setUint8(p, v, o._endianCd);
}
MO.MDataView_setUint16 = function MDataView_setUint16(p, v){
   var o = this;
   o._viewer.setUint16(p, v, o._endianCd);
}
MO.MDataView_setUint32 = function MDataView_setUint32(p, v){
   var o = this;
   o._viewer.setUint32(p, v, o._endianCd);
}
MO.MDataView_setUint64 = function MDataView_setUint64(p, v){
   var o = this;
   o._viewer.setUint64(p, v, o._endianCd);
}
MO.MDataView_setFloat = function MDataView_setFloat(p, v){
   var o = this;
   o._viewer.setFloat32(p, v, o._endianCd);
}
MO.MDataView_setDouble = function MDataView_setDouble(p, v){
   var o = this;
   o._viewer.setDouble(p, v, o._endianCd);
}
MO.MListenerLoad = function MListenerLoad(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addLoadListener     = MO.MListenerLoad_addLoadListener;
   o.removeLoadListener  = MO.MListenerLoad_removeLoadListener;
   o.clearLoadListeners  = MO.MListenerLoad_clearLoadListeners;
   o.processLoadListener = MO.MListenerLoad_processLoadListener;
   return o;
}
MO.MListenerLoad_addLoadListener = function MListenerLoad_addLoadListener(w, m){
   return this.addListener(MO.EEvent.Load, w, m);
}
MO.MListenerLoad_removeLoadListener = function MListenerLoad_removeLoadListener(w, m){
   this.removeListener(MO.EEvent.Load, w, m);
}
MO.MListenerLoad_clearLoadListeners = function MListenerLoad_clearLoadListeners(){
   this.clearListeners(MO.EEvent.Load);
}
MO.MListenerLoad_processLoadListener = function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Load, p1, p2, p3, p4, p5);
}
MO.MListenerProcess = function MListenerProcess(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addProcessListener     = MO.MListenerProcess_addProcessListener;
   o.removeProcessListener  = MO.MListenerProcess_removeProcessListener;
   o.clearProcessListeners  = MO.MListenerProcess_clearProcessListeners;
   o.processProcessListener = MO.MListenerProcess_processProcessListener;
   return o;
}
MO.MListenerProcess_addProcessListener = function MListenerProcess_addProcessListener(owner, process){
   return this.addListener(MO.EEvent.Process, owner, process);
}
MO.MListenerProcess_removeProcessListener = function MListenerProcess_removeProcessListener(owner, process){
   this.removeListener(MO.EEvent.Process, owner, process);
}
MO.MListenerProcess_clearProcessListeners = function MListenerProcess_clearProcessListeners(){
   this.clearListeners(MO.EEvent.Process);
}
MO.MListenerProcess_processProcessListener = function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Process, p1, p2, p3, p4, p5);
}
MO.MListenerTouchZoom = function MListenerTouchZoom(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addTouchZoomListener     = MO.MListenerTouchZoom_addTouchZoomListener;
   o.removeTouchZoomListener  = MO.MListenerTouchZoom_removeTouchZoomListener;
   o.clearTouchZoomListeners  = MO.MListenerTouchZoom_clearTouchZoomListeners;
   o.processTouchZoomListener = MO.MListenerTouchZoom_processTouchZoomListener;
   return o;
}
MO.MListenerTouchZoom_addTouchZoomListener = function MListenerTouchZoom_addTouchZoomListener(w, m){
   return this.addListener(MO.EEvent.TouchZoom, w, m);
}
MO.MListenerTouchZoom_removeTouchZoomListener = function MListenerTouchZoom_removeTouchZoomListener(w, m){
   this.removeListener(MO.EEvent.TouchZoom, w, m);
}
MO.MListenerTouchZoom_clearTouchZoomListeners = function MListenerTouchZoom_clearTouchZoomListeners(){
   this.clearListeners(MO.EEvent.TouchZoom);
}
MO.MListenerTouchZoom_processTouchZoomListener = function MListenerTouchZoom_processTouchZoomListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.TouchZoom, p1, p2, p3, p4, p5);
}
MO.MMouseCapture = function MMouseCapture(o){
   o = MO.Class.inherits(this, o);
   o.onMouseCaptureStart = MO.Method.virtual(o, 'onMouseCaptureStart');
   o.onMouseCapture      = MO.Method.virtual(o, 'onMouseCapture');
   o.onMouseCaptureStop  = MO.Method.virtual(o, 'onMouseCaptureStop');
   o.testMouseCapture    = MO.Method.emptyTrue;
   return o;
}
MO.MMouseWheel = function MMouseWheel(o){
   o = MO.Class.inherits(this, o);
   o.onMouseWheel = MO.Class.register(o, new MO.AEventMouseWheel('onMouseWheel'), MO.Method.empty);
   return o;
}
MO.MParent = function MParent(o){
   o = MO.Class.inherits(this, o);
   o._parent    = MO.Class.register(o, new MO.AGetSet('_parent'));
   o.isParent   = MO.MParent_isParent;
   o.findParent = MO.MParent_findParent;
   o.dispose    = MO.MParent_dispose;
   return o;
}
MO.MParent_isParent = function MParent_isParent(value){
   while(value){
      if(value == this){
         return true;
      }
      value = value.parent();
   }
}
MO.MParent_findParent = function MParent_findParent(clazz){
   var find = this;
   if(clazz){
      while(MO.Class.isClass(find._parent, clazz)){
         find = find.parent();
      }
   }else{
      while(find._parent){
         find = find.parent();
      }
   }
   return find;
}
MO.MParent_dispose = function MParent_dispose(){
   var o = this;
   o._parent = null;
}
MO.MPersistence = function MPersistence(o){
   o = MO.Class.inherits(this, o);
   o.unserialize       = MO.MPersistence_unserialize;
   o.unserializeBuffer = MO.MPersistence_unserializeBuffer;
   o.serialize         = MO.MPersistence_serialize;
   o.serializeBuffer   = MO.MPersistence_serializeBuffer;
   return o;
}
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
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newStruct();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Object){
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newInstance();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
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
         o[name] = input.readData(dateCd);
      }
   }
}
MO.MPersistence_unserializeBuffer = function MPersistence_unserializeBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.unserialize(view);
   view.dispose();
}
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
         value.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         var items = o[name];
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else{
         input.writeData(dateCd, value);
      }
   }
}
MO.MPersistence_serializeBuffer = function MPersistence_serializeBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.serialize(view);
   view.dispose();
}
MO.MProperty = function MProperty(o){
   o = MO.Class.inherits(this, o);
   o.propertyAssign = MO.MProperty_propertyAssign;
   o.propertyLoad   = MO.MProperty_propertyLoad;
   o.propertySave   = MO.MProperty_propertySave;
   return o;
}
MO.MProperty_propertyAssign = function MProperty_propertyAssign(value){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         o[annotation._name] = value[annotation._name];
      }
   }
}
MO.MProperty_propertyLoad = function MProperty_propertyLoad(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         if(annotation._force){
            annotation.load(o, xconfig);
         }else{
            if(xconfig.contains(annotation._linker)){
               annotation.load(o, xconfig);
            }else if(o[annotation._name] == null){
               o[annotation._name] = annotation._value;
            }
         }
      }
   }
}
MO.MProperty_propertySave = function MProperty_propertySave(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         annotation.save(o, xconfig);
      }
   }
}
MO.SClickEvent = function SClickEvent(sender){
   var o = this;
   MO.SEvent.call(o, sender);
   return o;
}
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.connection = null;
   o.document   = null;
   o.root       = null;
   return o;
}
MO.THtmlItem = function THtmlItem(){
   var o = this;
   o._link  = null;
   o._links = new Object();
   o.get    = MO.THtmlItem_get;
   o.set    = MO.THtmlItem_set;
   return o;
}
MO.THtmlItem_get = function THtmlItem_get(name){
   return this._links[name];
}
MO.THtmlItem_set = function THtmlItem_set(name, value){
   this._links[name] = value;
}
MO.TXmlDocument = function TXmlDocument(){
   var o = this;
   o._root   = null;
   o.create  = MO.TXmlDocument_create;
   o.root    = MO.TXmlDocument_root;
   o.setRoot = MO.TXmlDocument_setRoot;
   o.xml     = MO.TXmlDocument_xml;
   o.dump    = MO.TXmlDocument_dump;
   return o;
}
MO.TXmlDocument_create = function TXmlDocument_create(n, a, v){
   var r = new MO.TXmlNode();
   r._name = n;
   r._attributes = a;
   r._value = v;
   return r;
}
MO.TXmlDocument_root = function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new MO.TXmlNode();
      r._name = 'Configuration';
   }
   return r;
}
MO.TXmlDocument_setRoot = function TXmlDocument_setRoot(p){
   var o = this;
   if(!o._root){
      o._root = p;
   }else{
      throw new MO.TError(o, 'Root node is already exists.');
   }
}
MO.TXmlDocument_xml = function TXmlDocument_xml(){
   var xml = new MO.TString();
   xml.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().innerXml(xml, 0);
   return xml.flush();
}
MO.TXmlDocument_dump = function TXmlDocument_dump(){
   var o = this;
   var r = new MO.TString();
   r.appendLine(MO.RClass.name(o));
   o.root().dump(r);
   return r.flush();
}
MO.TXmlNode = function TXmlNode(name){
   var o = this;
   MO.TNode.call(o, name);
   o.create   = MO.TXmlNode_create;
   o.innerXml = MO.TXmlNode_innerXml;
   o.xml      = MO.TXmlNode_xml;
   o.toString = MO.TXmlNode_toString;
   return o;
}
MO.TXmlNode_create = function TXmlNode_create(name, attribtues){
   var o = this;
   var xnode = new MO.TXmlNode();
   xnode._name = name;
   xnode._attributes = attribtues;
   if(!MO.Class.isClass(attribtues, MO.TAttributes)){
      var a = arguments;
      var len = a.length;
      for(var n = 1; n < len; n += 2){
         if(n + 1 < len){
            xnode.set(a[n], a[n+1]);
         }else{
            xnode.setValue(a[n]);
         }
      }
   }
   o.push(xnode);
   return xnode;
}
MO.TXmlNode_innerXml = function TXmlNode_innerXml(s, l){
   var o = this;
   s.appendRepeat('   ', l);
   s.append('<', o._name);
   var as = o._attributes;
   if(as){
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         s.append(' ', as.name(n), '="');
         MO.RXml.buildText(s, as.value(n));
         s.append('"');
      }
   }
   if(!o._nodes && (o._value == null)){
      s.append('/');
   }
   s.append('>\n');
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var n = 0; n < c; n++){
         ns.get(n).innerXml(s, l + 1);
      }
   }
   MO.RXml.buildText(s, o._value)
   if(o._nodes || o._value != null){
      s.appendRepeat('   ', l);
      s.append('</', o._name, '>');
      s.append('\n');
   }
   return s;
}
MO.TXmlNode_xml = function TXmlNode_xml(){
   var xml = new MO.TString();
   this.innerXml(xml, 0);
   return xml.flush();
}
MO.TXmlNode_toString = function TXmlNode_toString(){
   return this.xml().toString();
}
MO.FBufferedSocket = function FBufferedSocket(o){
   o = MO.Class.inherits(this, o, MO.FSocket);
   o._bufferSends    = MO.Class.register(o, new MO.AGetter('_bufferSends'));
   o._bufferReceives = MO.Class.register(o, new MO.AGetter('_bufferReceives'));
   o.onOpen          = MO.FBufferedSocket_onOpen;
   o.construct       = MO.FBufferedSocket_construct;
   o.push            = MO.FBufferedSocket_push;
   o.process         = MO.FBufferedSocket_process;
   o.dispose         = MO.FBufferedSocket_dispose;
   return o;
}
MO.FBufferedSocket_onOpen = function FBufferedSocket_onOpen(event){
   var o = this;
   o.__base.FSocket.onOpen.call(o, event);
   o.process();
}
MO.FBufferedSocket_ohError = function FBufferedSocket_ohError(event){
   var o = this._linker;
}
MO.FBufferedSocket_ohMessage = function FBufferedSocket_ohMessage(event){
   var o = this._linker;
}
MO.FBufferedSocket_ohClose = function FBufferedSocket_ohClose(event){
   var o = this._linker;
   o._connected = false;
}
MO.FBufferedSocket_construct = function FBufferedSocket_construct(){
   var o = this;
   o.__base.FSocket.construct.call(o);
   o._bufferSends = new MO.TObjects();
   o._bufferReceives = new MO.TObjects();
}
MO.FBufferedSocket_push = function FBufferedSocket_push(message){
   this._bufferSends.push(message);
}
MO.FBufferedSocket_process = function FBufferedSocket_process(){
   var o = this;
   if(!o._connected){
      return false;
   }
   var sends = o._bufferSends;
   if(!sends.isEmpty()){
      var count = sends.count();
      for(var i = 0; i < count; i++){
         var message = sends.at(i);
         o.send(message);
      }
      sends.clear();
   }
   return true;
}
MO.FBufferedSocket_dispose = function FBufferedSocket_dispose(){
   var o = this;
   o._bufferSends = MO.Lang.Object.dispose(o._bufferSends);
   o._bufferReceives = MO.Lang.Object.dispose(o._bufferReceives);
   o.__base.FSocket.dispose.call(o);
}
MO.FBytes = function FBytes(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView);
   o._memory   = MO.Class.register(o, new MO.AGetter('_memory'));
   o.construct = MO.FBytes_construct;
   o.dispose   = MO.FBytes_dispose;
   return o;
}
MO.FBytes_construct = function FBytes_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}
MO.FBytes_dispose = function FBytes_dispose(){
   var o = this;
   o._memory = null;
   o._viewer = null;
   o.__base.FObject.dispose.call(o);
}
MO.FClassFactory = function FClassFactory(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._classes   = null;
   o.construct  = MO.FClassFactory_construct;
   o.register   = MO.FClassFactory_register;
   o.unregister = MO.FClassFactory_unregister;
   o.create     = MO.FClassFactory_create;
   o.dispose    = MO.FClassFactory_dispose;
   return o;
}
MO.FClassFactory_construct = function FClassFactory_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._classes = new MO.TDictionary();
}
MO.FClassFactory_register = function FClassFactory_register(n, c){
   this._classes.set(n, c);
}
MO.FClassFactory_unregister = function FClassFactory_unregister(n){
   this._classes.set(n, null);
}
MO.FClassFactory_create = function FClassFactory_create(n){
   var o = this;
   var c = o._classes.get(n);
   if(!c){
      throw new MO.TError('Create unregister class. (name={1})', n);
   }
   return MO.Class.create(c);
}
MO.FClassFactory_dispose = function FClassFactory_dispose(){
   var o = this;
   o._classes = MO.Lang.Object.dispose(o._classes);
   o.__base.FObject.dispose.call(o);
}
MO.FComponent = function FComponent(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MParent);
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o.dispose = MO.FComponent_dispose;
   return o;
}
MO.FComponent_dispose = function FComponent_dispose(){
   var o = this;
   o.__base.MParent.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FDataStream = function FDataStream(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   o._length   = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory   = MO.Class.register(o, new MO.AGetter('_memory'));
   o._viewer   = null;
   o.construct = MO.FDataStream_construct;
   o.setLength = MO.FDataStream_setLength;
   o.flip      = MO.FDataStream_flip;
   o.dispose   = MO.FDataStream_dispose;
   return o;
}
MO.FDataStream_construct = function FDataStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FDataStream_setLength = function FDataStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new ArrayBuffer(length);
   o._viewer = new DataView(o._memory);
}
MO.FDataStream_flip = function FDataStream_flip(){
   var o = this;
   o._length = o._position;
   o._position = 0;
}
MO.FDataStream_dispose = function FDataStream_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FDataView = function FDataView(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   o.link    = MO.FDataView_link;
   o.dispose = MO.FDataView_dispose;
   return o;
}
MO.FDataView_link = function FDataView_link(data){
   var o = this;
   o._memory = data;
   o._viewer = new DataView(data);
}
MO.FDataView_dispose = function FDataView_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FFileReader = function FFileReader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   o._reader        = null;
   o._fileName      = MO.Class.register(o, new MO.AGetter('_fileName'));
   o._length        = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._data          = MO.Class.register(o, new MO.AGetter('_data'));
   o._statusLoading = false;
   o.ohloadStart    = MO.FFileReader_ohLoadStart;
   o.ohLoad         = MO.FFileReader_ohLoad;
   o.ohLoadEnd      = MO.FFileReader_ohLoadEnd;
   o.ohProgress     = MO.FFileReader_ohProgress;
   o.construct      = MO.FFileReader_construct;
   o.loadFile       = MO.FFileReader_loadFile;
   o.dispose        = MO.FFileReader_dispose;
   return o;
}
MO.FFileReader_ohLoadStart = function FFileReader_ohLoadStart(){
   var o = this.__linker;
}
MO.FFileReader_ohLoad = function FFileReader_ohLoad(){
   var o = this.__linker;
}
MO.FFileReader_ohLoadEnd = function FFileReader_ohLoadEnd(){
   var o = this.__linker;
   var reader = o._reader;
   o._statusFree = true;
   if(reader.error){
      MO.Logger.error(o, 'Load file failure. (error={1])', reader.error);
   }else{
      o._length = reader.result.byteLength;
      o._data = reader.result;
      var event = new MO.SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
}
MO.FFileReader_ohProgress = function FFileReader_ohProgress(){
   var o = this.__linker;
}
MO.FFileReader_construct = function FFileReader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   var reader = o._reader = new FileReader();
   reader.__linker = o;
   reader.onloadstart = o.ohLoadStart;
   reader.onload = o.ohLoad;
   reader.onloadend = o.ohLoadEnd;
   reader.onprogress = o.ohProgress;
}
MO.FFileReader_loadFile = function FFileReader_loadFile(file){
   var o = this;
   o._fileName = file.name;
   o._length = file.size;
   var reader = o._reader;
   reader.readAsArrayBuffer(file);
}
MO.FFileReader_dispose = function FFileReader_dispose(){
   var o = this;
   var reader = o._reader;
   reader.__linker = null;
   reader.onloadstart = null;
   reader.onload = null;
   reader.onloadend = null;
   reader.onprogress = null;
   o._reader = null;
   o._fileName = null;
   o._data = null;
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FJsonConnection = function FJsonConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   o._contentCd           = MO.EHttpContent.Text;
   o._content             = null;
   o.onConnectionComplete = MO.FJsonConnection_onConnectionComplete;
   o.content              = MO.FJsonConnection_content;
   return o;
}
MO.FJsonConnection_onConnectionComplete = function FJsonConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   var content = null;
   var data = o._outputData;
   if(data){
      content = o._content = JSON.parse(data);
   }
   var event = o._event;
   event.connection = o;
   event.data = data;
   event.content = content;
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FJsonConnection_content = function FJsonConnection_content(){
   return this._content;
}
MO.FSocket = function FSocket(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._connected = MO.Class.register(o, new MO.AGetter('_connected'), false);
   o._handle    = MO.Class.register(o, new MO.AGetter('_handle'));
   o.onOpen     = MO.FSocket_onOpen;
   o.ohOpen     = MO.FSocket_ohOpen;
   o.ohError    = MO.FSocket_ohError;
   o.ohMessage  = MO.FSocket_ohMessage;
   o.ohClose    = MO.FSocket_ohClose;
   o.construct  = MO.FSocket_construct;
   o.connect    = MO.FSocket_connect;
   o.send       = MO.FSocket_send;
   o.disconnect = MO.FSocket_disconnect;
   o.dispose    = MO.FSocket_dispose;
   return o;
}
MO.FSocket_onOpen = function FSocket_onOpen(event){
   var o = this;
   o._connected = true;
}
MO.FSocket_ohOpen = function FSocket_ohOpen(event){
   this._linker.onOpen(event);
}
MO.FSocket_ohError = function FSocket_ohError(event){
   var o = this._linker;
}
MO.FSocket_ohMessage = function FSocket_ohMessage(event){
   var o = this._linker;
}
MO.FSocket_ohClose = function FSocket_ohClose(event){
   var o = this._linker;
   o._connected = false;
}
MO.FSocket_construct = function FSocket_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FSocket_connect = function FSocket_connect(url){
   var o = this;
   var handle = o._handle = new WebSocket(url);
   handle._linker = o;
   handle.onopen = o.ohOpen;
   handle.onerror = o.ohError
   handle.onmessage = o.ohMessage;
   handle.onclose = o.ohClose;
}
MO.FSocket_send = function FSocket_send(message){
   var o = this;
   o._handle.send(message);
}
MO.FSocket_disconnect = function FSocket_disconnect(){
   var o = this;
   o._handle.close();
}
MO.FSocket_dispose = function FSocket_dispose(){
   var o = this;
   o._handle = null;
   o.__base.FObject.dispose.call(o);
}
MO.FXmlConnection = function FXmlConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   o._contentCd           = MO.EHttpContent.Text;
   o._inputNode           = null;
   o._outputNode          = null;
   o.onConnectionSend     = MO.FXmlConnection_onConnectionSend;
   o.onConnectionComplete = MO.FXmlConnection_onConnectionComplete;
   o.content              = MO.FXmlConnection_content;
   return o;
}
MO.FXmlConnection_onConnectionSend = function FXmlConnection_onConnectionSend(){
   var o = this;
   var data = o._input;
   if(data){
      var xml = null;
      if(data.constructor == String){
         xml = data;
         o._inputNode = null;
      }else if(data.constructor == MO.TXmlNode){
         var document = new MO.TXmlDocument();
         document.setRoot(data);
         xml = document.xml();
         o._inputNode = data;
      }else if(data.constructor == MO.TXmlDocument){
         xml = data.xml();
         o._inputNode = data.root();
      }else{
         throw new MO.TError('Unknown send data type.');
      }
      o._inputData = xml;
      o._contentLength = xml.length;
   }
}
MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
   var o = this;
   var handle = o._handle;
   var element = null;
   if(handle.responseXML){
      element = handle.responseXML.documentElement;
   }else if(handle.responseXml){
      element = handle.responseXml.documentElement;
   }else{
      throw new MO.TError(o, "Fetch xml data failure.");
   }
   if(!element){
      return MO.Logger.fatal(o, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
   }
   var document = new MO.TXmlDocument();
   MO.Lang.Xml.buildNode(document, null, element);
   var root = o._outputNode = document.root();
   o._statusFree = true;
   var event = o._event;
   event.connection = o;
   event.document = document;
   event.root = root;
   event.content = root;
   event.parameters = o._parameters;
   o.processLoadListener(event);
   event.dispose();
   if(o._asynchronous){
      o._input = null;
      o._inputNode = null;
      o._output = null;
      o._outputNode = null;
      o._parameters = null;
   }
}
MO.FXmlConnection_content = function FXmlConnection_content(){
   return this._outputNode;
}
MO.FXmlData = function FXmlData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._ready    = null;
   o._config   = null;
   o.testReady = MO.FXmlData_testReady;
   return o;
}
MO.FXmlData_testReady = function FXmlData_testReady(){
   return this._ready;
}
MO.REngine = function REngine(){
   var o = this;
   o._spaces    = new Object();
   o.Global     = new Object();
   o.Top        = new Object();
   o.Local      = new Object();
   o.onRelease  = MO.REngine_onRelease;
   o.register   = MO.REngine_register;
   o.initialize = MO.REngine_initialize;
   o.connect    = MO.REngine_connect;
   o.buildSpace = MO.REngine_buildSpace;
   o.find       = MO.REngine_find;
   o.findGlobal = MO.REngine_findGlobal;
   o.findTop    = MO.REngine_findTop;
   o.findLocal  = MO.REngine_findLocal;
   return o;
}
MO.REngine_onRelease = function REngine_onRelease(){
   MO.RConsole.release();
   MO.REvent.release();
   CollectGarbage();
}
MO.REngine_register = function REngine_register(s){
   var o = this;
   var p = o._spaces[s.space];
   if(!p){
      p = o._spaces[s.space] = new Object();
   }
   p[s.name] = s;
}
MO.REngine_initialize = function REngine_initialize(){
   var o = this;
   MO.RConsole.initialize();
}
MO.REngine_connect = function REngine_connect(){
   var o = this;
   MO.RConsole.initialize();
}
MO.REngine_buildSpace = function REngine_buildSpace(t, p){
   var o = this;
   for(var n in p){
      if(MO.Lang.String.startsWith(n, 'R')){
         t[n.substring(1)] = p[n].instance;
      }
   }
}
MO.REngine_find = function REngine_find(s, n){
   var r = null;
   var s = this._spaces[s];
   if(s){
      r = s[n];
      if(r){
         return r.instance;
      }
   }
   return null;
}
MO.REngine_findGlobal = function REngine_findGlobal(n){
   return this.find(MO.ESpace.Global, n);
}
MO.REngine_findTop = function REngine_findTop(n){
   return top.MO.REngine.find(MO.ESpace.Top, n);
}
MO.REngine_findLocal = function REngine_findLocal(n){
   return this.find(MO.ESpace.Local, n);
}
MO.REngine = new MO.REngine();
MO.RLoader = function RLoader(){
   var o = this;
   o._loading      = new MO.TArray();
   o._loaded       = new MO.TArray()
   o._waits        = new MO.TArray()
   o._intervalId   = null;
   o.hWindow       = null;
   o.onInterval    = MO.RLoader_onInterval;
   o.intervalStart = MO.RLoader_intervalStart;
   o.intervalStop  = MO.RLoader_intervalStop;
   o.loadJsFile    = MO.RLoader_loadJsFile;
   o.loadJs        = MO.RLoader_loadJs;
   o.loaded        = MO.RLoader_loaded;
   o.wait          = MO.RLoader_wait;
   o.waitJs        = MO.RLoader_waitJs;
   o.dispose       = MO.RLoader_dispose;
   return o;
}
MO.RLoader_dispose = function RLoader_dispose(){
   var o = this;
   o.intervalStop();
   o.hWindow = null;
}
MO.RLoader_onInterval = function RLoader_onInterval(){
   var o = this;
   var ws = o._waits;
   var c = ws.length;
   for(var n=0; n<c; n++){
      var l = ws.get(n);
      if(l){
         if(l.check(o._loaded)){
            l.invoke.invoke();
            ws.set(n, null);
         }
      }
   }
   ws.compress();
   if(ws.isEmpty()){
      o.intervalStop();
   }
}
MO.RLoader_intervalStart = function RLoader_intervalStart(){
   var o = this;
   if(!o._intervalId){
      o.hWindow = window;
      o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
   }
}
MO.RLoader_intervalStop = function RLoader_intervalStop(){
   var o = this;
   var w = o.hWindow;
   if(w && o._intervalId){
      w.clearInterval(o._intervalId);
      o.hWindow = null;
      o._intervalId = null;
   }
}
MO.RLoader_loadJsFile = function RLoader_loadJsFile(id, src){
   var o = this;
   var d = MO.RWindow.hDocument;
   var h = d.getElementsByTagName("head")[0];
   if(document.getElementById(id) == null){
      var url = top.MO.RContext.location(src);
      var hs = MO.RWindow.createElement('SCRIPT');
      hs.id = id;
      hs.type = 'text/javascript';
      hs.src = url;
      if(d.attachEvent){
         hs.onreadystatechange = function(){
            var s = hs.readyState;
            if('loaded' == s || 'complete' == s){
               hs.onreadystatechange = null;
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }else{
         hs.onload = function(){
            if(d.readyState == 'complete'){
               hs.onload = null;
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }
      h.appendChild(hs);
   }
}
MO.RLoader_loadJs = function RLoader_loadJs(ps){
   var as = arguments;
   var c = as.length;
   for(var n = 0; n < c; n++){
      var p = as[n];
      this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
   }
}
MO.RLoader_loaded = function RLoader_loaded(id){
   var o = this;
   o._loading.extract(id);
   o._loaded.push(id);
}
MO.RLoader_wait = function RLoader_wait(invoke, ids){
   var o = this;
   var l = new MO.TLoaderListener();
   l.invoke = invoke;
   var c = arguments.length;
   for(var n = 1; n < c; n++){
      l.ids.push(arguments[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
MO.RLoader_waitJs = function RLoader_waitJs(invoke, ids){
   var o = this;
   var l = new MO.TLoaderListener();
   l.invoke = invoke;
   var as = arguments;
   var c = as.length;
   for(var n = 1; n < c; n++){
      l.ids.push('js:' + as[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
MO.RLoader = new MO.RLoader();
MO.RMessage = function RMessage(){
   var o = this;
   o._hasError     = false;
   o._messages     = null;
   o.push          = MO.RMessage_push;
   o.fatal         = MO.RMessage_fatal;
   o.confirmResult = false;
   o.error         = MO.RMessage_error;
   o.warn          = MO.RMessage_warn;
   o.onWindowClose = MO.RMessage_onWindowClose;
   o.confirm       = MO.RMessage_confirm;
   o.info          = MO.RMessage_info;
   return o;
}
MO.RMessage_push = function RMessage_push(msg){
   if(!this._messages){
      this._messages = new FLoopList();
   }
   this._messages.push(msg);
}
MO.RMessage_fatal = function RMessage_fatal(sf, er, ms, pm){
   var o = this;
   if(o._hasError){
      return;
   }
   o._hasError = true;
   var s = new MO.TString();
   var t = new Array();
   var f = MO.RMessage_fatal.caller;
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   var m = new MO.TString();
   m.appendLine(MO.RContext.get('RMessage:fatal'));
   m.appendLine(MO.Lang.String.repeat('-', 60));
   m.append(MO.Class.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = MO.Method.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   m.appendLine(ms);
   m.appendLine(MO.String.repeat('-', 60));
   m.appendLine('Stack:');
   m.append(s);
   alert(m);
}
MO.RMessage_error = function RMessage_error(self, method, msg, params){
   if(this._hasError){
      return;
   }
   this._hasError = true;
   throw new Error(msg);
}
MO.RMessage_warn = function RMessage_warn(self, message, params){
   var s = new MO.TString();
   var n = 0;
   var aw = top.MO.RControl.create(MO.FAlertWindow);
   aw.setText(message);
   aw.show();
}
MO.RMessage_info = function RMessage_info(self, message, params){
   var s = new MO.TString();
   var n = 0;
   var aw = top.MO.RControl.create(MO.FInfoWindow);
   aw.setText(message);
   aw.show();
}
MO.RMessage_confirm = function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.MO.RControl.create(MO.FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}
MO.RMessage_onWindowClose = function RMessage_onWindowClose(v){
   this.confirmResult = v;
}
MO.RMessage = new MO.RMessage();
MO.RResource = function RResource(){
   var o = this;
   o.uriIcon  = '/ars/icon/';
   o.uriImage = '/ars/img/';
   return o;
}
MO.RResource.prototype.iconPath = function RResource_iconPath(path, type){
   var o = this;
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.RBrowser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.iconUrlPath = function RResource_iconUrlPath(path, type){
   var o = this;
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.RBrowser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.imagePath = function RResource_imagePath(path, type){
   var o = this;
}
MO.RResource = new MO.RResource();
MO.RStyle = function RStyle(){
   var o = this;
   o._connected = false;
   o._rules     = new MO.TMap();
   o.connect    = MO.RStyle_connect;
   o.has        = MO.RStyle_has;
   o.nvl        = MO.RStyle_nvl;
   o.style      = MO.RStyle_style;
   return o;
}
MO.RStyle_connect = function RStyle_connect(){
   var o = this;
   if(o._connected){
      return;
   }
   var s = o._rules;
   var ds = document.styleSheets;
   var dc = ds.length;
   for(var n = 0; n < dc; n++){
      var rs = ds[n].cssRules;
      if(rs){
         var rc = rs.length;
         for(var i = 0; i < rc; i++){
            var r = rs[i];
            s.set(r.selectorText, r);
         }
      }
   }
   o._connected = true;
}
MO.RStyle_has = function RStyle_has(s){
   var o = this;
   if(!o._connected){
      o.connect();
   }
   if(s){
      return this._rules.contains('.' + s.toLowerCase());
   }
   return false;
}
MO.RStyle_nvl = function RStyle_nvl(s, n){
   var o = this;
   o.connect();
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      var s = a[n];
      if(s){
         if(o._rules.contains('.' + s.toLowerCase())){
            return s;
         }
      }
   }
   return null;
}
MO.RStyle_style = function RStyle_style(c, n){
   return MO.Class.name(c) + '_' + n;
}
MO.RStyle = new MO.RStyle();
MO.RTypeArray = function RTypeArray(){
   var o = this;
   o._float3 = null;
   o._float4 = null;
   o._data   = new Object();
   return o;
}
MO.RTypeArray.prototype.float3 = function RTypeArray_float3(){
   var o = this;
   var value = o._float3;
   if(value == null){
      value = o._float3 = new Float32Array(3);
   }
   return value;
}
MO.RTypeArray.prototype.float4 = function RTypeArray_float4(){
   var o = this;
   var value = o._float4;
   if(value == null){
      value = o._float4 = new Float32Array(4);
   }
   return value;
}
MO.RTypeArray.prototype.createArray = function RTypeArray_createArray(typeCd, length){
   switch(typeCd){
      case MO.EDataType.Boolean:
      case MO.EDataType.Int8:
         return new Int8Array(length);
      case MO.EDataType.Int16:
         return new Int16Array(length);
      case MO.EDataType.Int32:
         return new Int32Array(length);
      case MO.EDataType.Int64:
         return new Int64Array(length);
      case MO.EDataType.Uint8:
         return new Uint8Array(length);
      case MO.EDataType.Uint16:
         return new Uint16Array(length);
      case MO.EDataType.Uint32:
         return new Uint32Array(length);
      case MO.EDataType.Float32:
         return new Float32Array(length);
      case MO.EDataType.Float64:
         return new Float64Array(length);
   }
   throw new TError('Create unknown type array. (type={1}, length={2})', typeCd, length);
}
MO.RTypeArray.prototype.findTemp = function RTypeArray_findTemp(typeCd, length){
   var o = this;
   var data = o._data;
   var collection = data[typeCd];
   if(collection == null){
      collection = data[typeCd] = new Object();
   }
   var result = collection[length];
   if(result == null){
      result = collection[length] = o.createArray(typeCd, length);
   }
   return result;
}
MO.Lang.TypeArray = new MO.RTypeArray();
MO.RXml = function RXml(){
   return this;
}
MO.RXml.prototype.isNode = function RXml_isNode(n){
   return MO.Class.isName(n, 'TNode');
}
MO.RXml.prototype.formatText = function RXml_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}
MO.RXml.prototype.buildText = function RXml_buildText(s, v){
   if(v != null){
      v = v.toString();
      var c = v.length;
      for(var i = 0; i < c; i++){
         var ch = v.charAt(i);
         switch(ch){
            case '<':
               s.append('&lt;');
               break;
            case '>':
               s.append('&gt;');
               break;
            case '&':
               s.append('&amp;');
               break;
            case '\'':
               s.append('&apos;');
               break;
            case '"':
               s.append('&quot;');
               break;
            case '\r':
               continue;
            case '\n':
               s.append('\\n');
               break;
            default:
               s.append(ch);
         }
      }
   }
   return s;
}
MO.RXml.prototype.buildNode = function RXml_buildNode(pd, pn, pe){
   var xas = null;
   var eas = pe.attributes;
   if(eas){
      var eac = eas.length;
      if(eac > 0){
         xas = new MO.TAttributes();
         for(var n = 0; n < eac; n++){
            var ea = eas[n];
            if(ea.nodeName){
               xas.set(ea.nodeName, this.formatText(ea.value));
            }
         }
      }
   }
   var xt = new MO.TString();
   xt.append(pe.value);
   var ecs = pe.childNodes
   if(ecs){
      var ecc = ecs.length;
      for(var n = 0; n < ecc; n++){
         var en = ecs[n];
         var ect = en.nodeType;
         if(ect == MO.ENodeType.Text){
            xt.append(en.nodeValue);
         }else if(ect == MO.ENodeType.Data){
            xt.append(en.data);
         }
      }
   }
   var xc = pd.create(pe.nodeName, xas, MO.Lang.String.trim(xt.toString()));
   if(pn){
      pn.push(xc);
   }else{
      pd._root = xc;
   }
   if(ecs){
      var cc = ecs.length;
      for(var n = 0; n < cc; n++){
         if(ecs[n].nodeType == MO.ENodeType.Node){
            this.buildNode(pd, xc, ecs[n]);
         }
      }
   }
}
MO.RXml.prototype.makeNode = function RXml_makeNode(p){
   var o = this;
   if(p.documentElement){
      var d = new MO.TXmlDocument();
      o.buildNode(d, null, p.documentElement);
      return d.root();
   }else if(p.tagName == 'SCRIPT'){
      var s = p.textContent;
      if(!s){
         s = p.text;
      }
      if(s){
         var d = new MO.TXmlDocument();
         var xd = o.makeString(s)
         o.buildNode(d, null, xd.documentElement);
         return d.root();
      }
   }
   return null;
}
MO.RXml.prototype.makeDocument = function RXml_makeDocument(p){
   var d = new MO.TXmlDocument();
   if(p.documentElement){
      this.buildNode(d, null, p.documentElement);
   }
   return d;
}
MO.RXml.prototype.unpack = function RXml_unpack(s, n){
   var o = this;
   if(MO.Lang.String.isEmpty(s)){
      return null;
   }
   if(!n){
      n = new MO.TNode();
   }
   var np = new MO.TAttributes();
   np.unpack(s);
   n.name = np.get('name');
   n.value = np.get('value');
   if(np.contains('attributes')){
      n.attributes().unpack(np.get('attributes'));
   }
   if(np.contains('nodes')){
      var ns = new MO.TStrings();
      ns.unpack(np.get('nodes'));
      for(var i = 0; i < ns.count; i++){
         o.unpack(ns.get(i), n.create());
      }
   }
   return n;
}
MO.RXml.prototype.saveObject = function RXml_saveObject(xconfig, tag, item){
   var o = this;
   for(var name in item){
      var value = item[name];
      if(value != null){
         var xtag = xconfig.create(tag);
         xtag.set('name', name);
         var typeName = typeof(value);
         switch(typeName){
            case 'boolean':
            case 'number':
            case 'date':
            case 'string':
               xtag.setValue(value);
               break;
            case 'function':
               xtag.setValue(MO.Method.name(value));
               break;
            case 'object':
               o.saveObject(xtag, 'Property', value);
               break;
            default:
               throw new MO.TError('Invalid object.');
         }
      }
   }
}
MO.Lang.Xml = new MO.RXml();
