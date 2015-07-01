with(MO){
   MO.AListener = function AListener(name, linker){
      var o = this;
      ASource.call(o, name, ESource.Listener, linker);
      o.build = AListener_build;
      return o;
   }
   MO.AListener_build = function AListener_build(clazz, instance){
      var o = this;
      var addListener = 'add' + o._linker + 'Listener';
      instance[addListener] = RListener.makeAddListener(addListener, o._linker);
      var setListener = 'set' + o._linker + 'Listener';
      instance[setListener] = RListener.makeSetListener(setListener, o._linker);
      var removeListener = 'remove' + o._linker + 'Listener';
      instance[removeListener] = RListener.makeRemoveListener(removeListener, o._linker);
      var clearListeners = 'clear' + o._linker + 'Listeners';
      instance[clearListeners] = RListener.makeClearListener(clearListeners, o._linker);
      var processListener = 'process' + o._linker + 'Listener';
      instance[processListener] = RListener.makeProcessListener(processListener, o._linker);
   }
}
with(MO){
   MO.AStyle = function AStyle(n, s){
      var o = this;
      AAnnotation.call(o, n);
      o._annotationCd = EAnnotation.Style;
      o._duplicate    = true;
      o._style        = s;
      o.code          = AStyle_code;
      o.style         = AStyle_style;
      o.build         = AStyle_build;
      o.toString      = AStyle_toString;
      if(s == null){
         var v = null;
         if(RString.startsWith(n, '_style')){
            v = n.substring(6);
         }else if(RString.startsWith(n, 'style')){
            v = n.substring(5);
         }
         if(v == null){
            throw new TError('Style name is empty.');
         }
         o._style = v;
      }
      return o;
   }
   MO.AStyle_code = function AStyle_code(){
      return this._style;
   }
   MO.AStyle_style = function AStyle_style(){
      return this._style;
   }
   MO.AStyle_build = function AStyle_build(v){
      var o = this;
      v[o._name] = null;
   }
   MO.AStyle_toString = function AStyle_toString(){
      var o = this;
      return 'style=' + o._style;
   }
}
with(MO){
   MO.AStyleIcon = function AStyleIcon(n, s){
      var o = this;
      AAnnotation.call(o, n);
      o._annotationCd = EAnnotation.Style;
      o._style        = s;
      o.code          = AStyleIcon_code;
      o.style         = AStyleIcon_style;
      o.build         = AStyleIcon_build;
      o.toString      = AStyleIcon_toString;
      if(s == null){
         var v = null;
         if(RString.startsWith(n, '_style')){
            v = n.substring(6);
         }else if(RString.startsWith(n, 'style')){
            v = n.substring(5);
         }
         if(v == null){
            throw new TError('Style name is empty.');
         }
         o._style = v;
      }
      return o;
   }
   MO.AStyleIcon_code = function AStyleIcon_code(){
      return this._style;
   }
   MO.AStyleIcon_style = function AStyleIcon_style(){
      return this._style;
   }
   MO.AStyleIcon_build = function AStyleIcon_build(v){
      var o = this;
      v[o._name] = null;
   }
   MO.AStyleIcon_toString = function AStyleIcon_toString(){
      var o = this;
      return 'style=' + o._style;
   }
}
MO.EEvent = new function EEvent(){
   var o = this;
   o.Unknown       = 'Unknown';
   o.Load          = 'Load';
   o.Process       = 'Process';
   o.EnterFrame    = 'EnterFrame';
   o.LeaveFrame    = 'LeaveFrame';
   o.Enter         = 'Enter';
   o.Leave         = 'Leave';
   o.Focus         = 'Focus';
   o.Blur          = 'Blur';
   o.OperationDown = 'OperationDown';
   o.OperationMove = 'OperationMove';
   o.OperationUp   = 'OperationUp';
   o.MouseDown     = 'MouseDown';
   o.MouseMove     = 'MouseMove';
   o.MouseUp       = 'MouseUp';
   o.MouseWheel    = 'MouseWheel';
   o.Click         = 'Click';
   o.DoubleClick   = 'DoubleClick';
   o.NodeClick     = 'NodeClick';
   o.ItemClick     = 'ItemClick';
   o.Selected      = 'Selected';
   o.DataChanged   = 'DataChanged';
   o.Result        = 'Result';
   o.TouchZoom     = 'TouchZoom';
   return o;
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
MO.EHttpContent = new function EHttpContent(){
   var o = this;
   o.Binary = 1;
   o.Text  = 2;
   return o;
}
MO.EHttpMethod = new function EHttpMethod(){
   var o = this;
   o.Get  = 'GET';
   o.Post = 'POST';
   return o;
}
MO.EHttpStatus = new function EHttpStatus(){
   var o = this;
   o.Uninitialized = 0;
   o.Open          = 1;
   o.Send          = 2;
   o.Receiving     = 3;
   o.Loaded        = 4;
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
MO.EOrientation = new function EOrientation(){
   var o = this;
   o.Unknown = 0;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
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
   o.readData     = MO.MDataStream_readData;
   o.readBytes    = MO.MDataStream_readBytes;
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
MO.MDataStream_readData = function MDataStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case EDataType.Int8:
         return o.readInt8();
      case EDataType.Int16:
         return o.readInt16();
      case EDataType.Int32:
         return o.readInt32();
      case EDataType.Int64:
         return o.readInt64();
      case EDataType.Uint8:
         return o.readUint8();
      case EDataType.Uint16:
         return o.readUint16();
      case EDataType.Uint32:
         return o.readUint32();
      case EDataType.Uint64:
         return o.readUint64();
      case EDataType.Float32:
         return o.readFloat();
      case EDataType.Float64:
         return o.readDouble();
      case EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
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
MO.MDataView = function MDataView(o){
   o = MO.Class.inherits(this, o);
   o._viewer     = null;
   o._endianCd   = 0;
   o.endianCd    = MO.MDataView_endianCd;
   o.setEndianCd = MO.MDataView_setEndianCd;
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
MO.MDataView_endianCd = function MDataView_endianCd(p){
   return this._endianCd;
}
MO.MDataView_setEndianCd = function MDataView_setEndianCd(p){
   this._endianCd = p;
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
MO.MListener = function MListener(o){
   o = MO.Class.inherits(this, o);
   o._listenerss       = null;
   o.addListener       = MO.MListener_addListener;
   o.setListener       = MO.MListener_setListener;
   o.removeListener    = MO.MListener_removeListener;
   o.clearListeners    = MO.MListener_clearListeners;
   o.clearAllListeners = MO.MListener_clearAllListeners;
   o.processListener   = MO.MListener_processListener;
   o.dispose           = MO.MListener_dispose;
   return o;
}
MO.MListener_addListener = function MListener_addListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   if(!listenerss){
      listenerss = o._listenerss = new MO.TDictionary();
   }
   var listeners = listenerss.get(name);
   if(!listeners){
      listeners = new MO.TListeners();
      listenerss.set(name, listeners);
   }
   return listeners.register(owner, method);
}
MO.MListener_setListener = function MListener_setListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.clear();
      }
   }
   return o.addListener(name, owner, method)
}
MO.MListener_removeListener = function MListener_removeListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   var listeners = listenerss.get(name);
   return listeners.unregister(owner, method);
}
MO.MListener_clearListeners = function MListener_clearListeners(name){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.clear();
      }
   }
}
MO.MListener_clearAllListeners = function MListener_clearAllListeners(){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var count = listenerss.count();
      for(var i = 0; i < count; i++){
         var listeners = listenerss.at(i);
         if(listeners){
            listeners.clear();
         }
      }
   }
}
MO.MListener_processListener = function MListener_processListener(name, p1, p2, p3, p4, p5){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.process(p1, p2, p3, p4, p5);
      }
   }
}
MO.MListener_dispose = function MListener_dispose(){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      for(var i = listenerss.count() - 1; i >= 0; i--){
         var listeners = listenerss.at(i);
         listeners.dispose();
      }
      o._listenerss = MO.RObject.dispose(listenerss);
   }
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
      while(RClass.isClass(find._parent, clazz)){
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
with(MO){
   MO.SClickEvent = function SClickEvent(sender){
      var o = this;
      SEvent.call(o, sender);
      return o;
   }
}
with(MO){
   MO.SEvent = function SEvent(sender){
      var o = this;
      o.code       = null;
      o.annotation = null;
      o.listener   = null;
      o.sender     = sender;
      o.source     = null;
      o.hEvent     = null;
      o.hSender    = null;
      o.hSource    = null;
      o.ohProcess  = null;
      o.onProcess  = null;
      o.process    = null;
      o.dispose    = SEvent_dispose;
      return o;
   }
   MO.SEvent_dispose = function SEvent_dispose(){
      var o = this;
      for(var name in o){
         o[name] = null;
      }
   }
}
with(MO){
   MO.SKeyboardEvent = function SKeyboardEvent(){
      var o = this;
      SEvent.call(o);
      o.altKey      = false;
      o.shiftKey    = false;
      o.ctrlKey     = false;
      o.keyCode     = 0;
      o.attachEvent = SKeyboardEvent_attachEvent;
      o.cancel      = SKeyboardEvent_cancel;
      return o;
   }
   MO.SKeyboardEvent_attachEvent = function SKeyboardEvent_attachEvent(p){
      var o = this;
      o.altKey = p.altKey;
      o.shiftKey = p.shiftKey;
      o.ctrlKey = p.ctrlKey;
      o.keyCode = p.keyCode;
   }
   MO.SKeyboardEvent_cancel = function SKeyboardEvent_cancel(){
      var o = this;
      o.hEvent.returnValue = false;
   }
}
with(MO){
   MO.SMouseEvent = function SMouseEvent(){
      var o = this;
      SEvent.call(o);
      o.button      = null;
      o.mouseLeft   = false;
      o.mouseMiddle = false;
      o.mouseRight  = false;
      o.altKey      = false;
      o.ctrlKey     = false;
      o.x           = 0;
      o.y           = 0;
      o.offsetX     = 0;
      o.offsetY     = 0;
      o.clientX     = 0;
      o.clientY     = 0;
      o.deltaX      = 0;
      o.deltaY      = 0;
      o.deltaZ      = 0;
      o.attachEvent = SMouseEvent_attachEvent;
      return o;
   }
   MO.SMouseEvent_attachEvent = function SMouseEvent_attachEvent(event){
      var o = this;
      var hs = o.hSource = RHtml.eventSource(event);
      if(hs){
         o.source = hs.__linker;
      }
      o.button = event.button;
      o.mouseLeft = (event.button == EMouseButton.Left);
      o.mouseMiddle = (event.button == EMouseButton.Middle);
      o.mouseRight = (event.button == EMouseButton.Right);
      o.altKey = event.altKey;
      o.ctrlKey = event.ctrlKey;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         o.x = event.pageX;
         o.y = event.pageY;
         o.offsetX = event.layerX;
         o.offsetY = event.layerY;
      }else{
         o.x = event.x;
         o.y = event.y;
         o.offsetX = event.offsetX;
         o.offsetY = event.offsetY;
      }
      o.clientX = event.clientX;
      o.clientY = event.clientY;
      o.deltaX = event.deltaX;
      o.deltaY = event.deltaY;
      o.deltaZ = event.deltaZ;
   }
}
with(MO){
   MO.SResizeEvent = function SResizeEvent(){
      var o = this;
      SEvent.call(o);
      o.width       = null;
      o.height      = null;
      o.attachEvent = SResizeEvent_attachEvent;
      return o;
   }
   MO.SResizeEvent_attachEvent = function SResizeEvent_attachEvent(p){
      var o = this;
      var hs = o.hSource = RHtml.eventSource(p);
      if(hs){
         o.source = hs.__linker;
      }
   }
}
with(MO){
   MO.SXmlEvent = function SXmlEvent(){
      var o = this;
      SEvent.call(o);
      o.connection = null;
      o.document   = null;
      o.root       = null;
      return o;
   }
}
with(MO){
   MO.THtmlItem = function THtmlItem(){
      var o = this;
      o._link  = null;
      o._links = new Object();
      o.get    = THtmlItem_get;
      o.set    = THtmlItem_set;
      return o;
   }
   MO.THtmlItem_get = function THtmlItem_get(n){
      return this._links[n];
   }
   MO.THtmlItem_set = function THtmlItem_set(n, v){
      this._links[n] = v;
   }
}
with(MO){
   MO.TXmlDocument = function TXmlDocument(){
      var o = this;
      o._root   = null;
      o.create  = TXmlDocument_create;
      o.root    = TXmlDocument_root;
      o.setRoot = TXmlDocument_setRoot;
      o.xml     = TXmlDocument_xml;
      o.dump    = TXmlDocument_dump;
      return o;
   }
   MO.TXmlDocument_create = function TXmlDocument_create(n, a, v){
      var r = new TXmlNode();
      r._name = n;
      r._attributes = a;
      r._value = v;
      return r;
   }
   MO.TXmlDocument_root = function TXmlDocument_root(){
      var o = this;
      var r = o._root;
      if(!r){
         r = o._root = new TXmlNode();
         r._name = 'Configuration';
      }
      return r;
   }
   MO.TXmlDocument_setRoot = function TXmlDocument_setRoot(p){
      var o = this;
      if(!o._root){
         o._root = p;
      }else{
         throw new TError(o, 'Root node is already exists.');
      }
   }
   MO.TXmlDocument_xml = function TXmlDocument_xml(){
      var s = new TString();
      s.append("<?xml version='1.0' encoding='UTF-8'?>");
      this.root().innerXml(s, 0);
      return s.flush();
   }
   MO.TXmlDocument_dump = function TXmlDocument_dump(){
      var o = this;
      var r = new TString();
      r.appendLine(RClass.name(o));
      o.root().dump(r);
      return r.flush();
   }
}
with(MO){
   MO.TXmlNode = function TXmlNode(name){
      var o = this;
      TNode.call(o, name);
      o.create   = TXmlNode_create;
      o.innerXml = TXmlNode_innerXml;
      o.xml      = TXmlNode_xml;
      o.toString = TXmlNode_toString;
      return o;
   }
   MO.TXmlNode_create = function TXmlNode_create(n, a){
      var o = this;
      var r = new TXmlNode();
      r._name = n;
      r._attributes = a;
      if(!RClass.isClass(a, TAttributes)){
         var a = arguments;
         var len = a.length;
         for(var n = 1; n < len; n += 2){
            if(n + 1 < len){
               r.set(a[n], a[n+1]);
            }else{
               r._value = a[n];
            }
         }
      }
      o.push(r);
      return r;
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
            RXml.buildText(s, as.value(n));
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
      RXml.buildText(s, o._value)
      if(o._nodes || o._value != null){
         s.appendRepeat('   ', l);
         s.append('</', o._name, '>');
         s.append('\n');
      }
      return s;
   }
   MO.TXmlNode_xml = function TXmlNode_xml(){
      var s = new TString();
      this.innerXml(s, 0);
      return s.flush();
   }
   MO.TXmlNode_toString = function TXmlNode_toString(){
      return this.xml().toString();
   }
}
with(MO){
   MO.FBytes = function FBytes(o){
      o = RClass.inherits(this, o, FObject, MDataView);
      o._memory   = RClass.register(o, new AGetter('_memory'));
      o.construct = FBytes_construct;
      o.dispose   = FBytes_dispose;
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
}
with(MO){
   MO.FClassFactory = function FClassFactory(o){
      o = RClass.inherits(this, o, FObject);
      o._classes   = null;
      o.construct  = FClassFactory_construct;
      o.register   = FClassFactory_register;
      o.unregister = FClassFactory_unregister;
      o.create     = FClassFactory_create;
      o.dispose    = FClassFactory_dispose;
      return o;
   }
   MO.FClassFactory_construct = function FClassFactory_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._classes = new TDictionary();
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
         throw new TError('Create unregister class. (name={1})', n);
      }
      return RClass.create(c);
   }
   MO.FClassFactory_dispose = function FClassFactory_dispose(){
      var o = this;
      o._classes = RObject.dispose(o._classes);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FComponent = function FComponent(o){
      o = RClass.inherits(this, o, FObject, MParent);
      o._code   = RClass.register(o, new AGetSet('_code'));
      o.dispose = FComponent_dispose;
      return o;
   }
   MO.FComponent_dispose = function FComponent_dispose(){
      var o = this;
      o.__base.MParent.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FDataStream = function FDataStream(o){
      o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
      o._length   = RClass.register(o, new AGetter('_length'), 0);
      o._memory   = RClass.register(o, new AGetter('_memory'));
      o._viewer   = null;
      o.construct = FDataStream_construct;
      o.setLength = FDataStream_setLength;
      o.flip      = FDataStream_flip;
      o.dispose   = FDataStream_dispose;
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
}
with(MO){
   MO.FDataView = function FDataView(o){
      o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
      o.link    = FDataView_link;
      o.dispose = FDataView_dispose;
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
}
with(MO){
   MO.FFileReader = function FFileReader(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad);
      o._reader        = null;
      o._fileName      = RClass.register(o, new AGetter('_fileName'));
      o._length        = RClass.register(o, new AGetter('_length'), 0);
      o._data          = RClass.register(o, new AGetter('_data'));
      o._statusLoading = false;
      o.ohloadStart    = FFileReader_ohLoadStart;
      o.ohLoad         = FFileReader_ohLoad;
      o.ohLoadEnd      = FFileReader_ohLoadEnd;
      o.ohProgress     = FFileReader_ohProgress;
      o.construct      = FFileReader_construct;
      o.loadFile       = FFileReader_loadFile;
      o.dispose        = FFileReader_dispose;
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
         var event = new SEvent(o);
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
      var reader = o._reader = new FileReader();
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
}
with(MO){
   MO.FHttpConnection = function FHttpConnection(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad, MListenerProcess);
      o._asynchronous        = false;
      o._methodCd            = EHttpMethod.Get;
      o._contentCd           = EHttpContent.Binary;
      o._url                 = null;
      o._input               = null;
      o._inputData           = RClass.register(o, new AGetSet('_inputData'));
      o._output              = null;
      o._outputData          = RClass.register(o, new AGetter('_outputData'));
      o._connection          = null;
      o._contentLength       = 0;
      o._statusFree          = true;
      o.onConnectionSend     = FHttpConnection_onConnectionSend;
      o.onConnectionReady    = FHttpConnection_onConnectionReady;
      o.onConnectionComplete = FHttpConnection_onConnectionComplete;
      o.construct            = FHttpConnection_construct;
      o.setHeaders           = FHttpConnection_setHeaders;
      o.setOutputData        = FHttpConnection_setOutputData;
      o.content              = FHttpConnection_content;
      o.sendSync             = FHttpConnection_sendSync;
      o.sendAsync            = FHttpConnection_sendAsync;
      o.send                 = FHttpConnection_send;
      o.dispose              = FHttpConnection_dispose;
      return o;
   }
   MO.FHttpConnection_onConnectionSend = function FHttpConnection_onConnectionSend(){
      var o = this;
      var input = o._input;
      if(input){
         if(input.constructor == String){
            o._inputData = input;
            o._contentLength = input.length;
         }else if(input.constructor == ArrayBuffer){
            o._inputData = input;
            o._contentLength = input.byteLength;
         }else{
            throw new TError('Unknown send data type.');
         }
      }
   }
   MO.FHttpConnection_onConnectionReady = function FHttpConnection_onConnectionReady(){
      var o = this._linker;
      if(o._asynchronous){
         var connection = o._connection;
         if(connection.readyState == EHttpStatus.Loaded){
            if(connection.status == 200){
               o.setOutputData();
               o.onConnectionComplete();
            }else{
               MO.Logger.fatal(o, 'Connection failure. (url={1})', o._url);
            }
         }
      }
   }
   MO.FHttpConnection_onConnectionComplete = function FHttpConnection_onConnectionComplete(){
      var o = this;
      o._statusFree = true;
      o.processLoadListener(o);
   }
   MO.FHttpConnection_construct = function FHttpConnection_construct(){
      var o = this;
      var c = o._connection = RXml.createConnection();
      c._linker = o;
      c.onreadystatechange = o.onConnectionReady;
   }
   MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
      var o = this;
      var connection = o._connection;
      if(o._contentCd == EHttpContent.Binary){
         if(RBrowser.isBrowser(EBrowser.Explorer)){
            connection.setRequestHeader('Accept-Charset', 'x-user-defined');
            connection.responseType = 'arraybuffer';
         }else{
            connection.overrideMimeType('text/plain; charset=x-user-defined');
            if(o._asynchronous){
               connection.responseType = 'arraybuffer';
            }
         }
      }else{
         connection.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      }
      if(!RBrowser.isBrowser(EBrowser.Chrome)){
         if(o._contentLength > 0){
            connection.setRequestHeader('content-length', o._contentLength);
         }
      }
   }
   MO.FHttpConnection_setOutputData = function FHttpConnection_setOutputData(){
      var o = this;
      var connection = o._connection;
      if(o._contentCd == EHttpContent.Binary){
         o._outputData = connection.response;
      }else{
         o._outputData = connection.responseText;
      }
   }
   MO.FHttpConnection_content = function FHttpConnection_content(){
      return this._outputData;
   }
   MO.FHttpConnection_sendSync = function FHttpConnection_sendSync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, false);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      o.setOutputData();
      o.onConnectionComplete();
      MO.Logger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
   }
   MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, true);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      MO.Logger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
   }
   MO.FHttpConnection_send = function FHttpConnection_send(url, data){
      var o = this;
      o._url = url;
      o._input = data;
      o._methodCd = (data != null) ? EHttpMethod.Post : EHttpMethod.Get;
      o._statusFree = false;
      o.onConnectionSend();
      if(o._asynchronous){
         o.sendAsync();
      }else{
         o.sendSync();
      }
      return o.content();
   }
   MO.FHttpConnection_dispose = function FHttpConnection_dispose(){
      var o = this;
      o._input = null;
      o._inputData = null;
      o._output = null;
      o._outputData = null;
      var connection = o._connection;
      if(connection){
         connection.onreadystatechange = null;
         o._connection = null;
      }
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FXmlConnection = function FXmlConnection(o){
      o = RClass.inherits(this, o, FHttpConnection);
      o._contentCd           = EHttpContent.Text;
      o._inputNode           = null;
      o._outputNode          = null;
      o.onConnectionSend     = FXmlConnection_onConnectionSend;
      o.onConnectionComplete = FXmlConnection_onConnectionComplete;
      o.content              = FXmlConnection_content;
      return o;
   }
   MO.FXmlConnection_onConnectionSend = function FXmlConnection_onConnectionSend(){
      var o = this;
      var d = o._input;
      if(d){
         var s = null;
         if(d.constructor == String){
            s = d;
            o._inputNode = null;
         }else if(d.constructor == TXmlNode){
            var x = new TXmlDocument();
            x.setRoot(d);
            s = x.xml();
            o._inputNode = d;
         }else if(d.constructor == TXmlDocument){
            s = d.xml();
            o._inputNode = d.root();
         }else{
            throw new TError('Unknown send data type.');
         }
         o._inputData = s;
         o._contentLength = s.length;
      }
   }
   MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
      var o = this;
      var c = o._connection;
      var e = null;
      if(c.responseXML){
         e = c.responseXML.documentElement;
      }else if(c.responseXml){
         e = c.responseXml.documentElement;
      }else{
         throw new TError(o, "Fetch xml data failure.");
      }
      if(!e){
         return RMessage.fatal(o, null, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
      }
      var d = new TXmlDocument();
      RXml.buildNode(d, null, e);
      var r = o._outputNode = d.root();
      o._statusFree = true;
      var e = new SXmlEvent();
      e.connection = o;
      e.document = d;
      e.root = r;
      e.parameters = o._parameters;
      o.processLoadListener(e);
      e.dispose();
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
}
with(MO){
   MO.FXmlData = function FXmlData(o){
      o = RClass.inherits(this, o, FObject);
      o._ready    = null;
      o._config   = null;
      o.testReady = FXmlData_testReady;
      return o;
   }
   MO.FXmlData_testReady = function FXmlData_testReady(){
      return this._ready;
   }
}
with(MO){
   MO.REngine = function REngine(){
      var o = this;
      o._spaces    = new Object();
      o.Global     = new Object();
      o.Top        = new Object();
      o.Local      = new Object();
      o.onRelease  = REngine_onRelease;
      o.register   = REngine_register;
      o.initialize = REngine_initialize;
      o.connect    = REngine_connect;
      o.buildSpace = REngine_buildSpace;
      o.find       = REngine_find;
      o.findGlobal = REngine_findGlobal;
      o.findTop    = REngine_findTop;
      o.findLocal  = REngine_findLocal;
      return o;
   }
   MO.REngine_onRelease = function REngine_onRelease(){
      RConsole.release();
      REvent.release();
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
      RConsole.initialize();
   }
   MO.REngine_connect = function REngine_connect(){
      var o = this;
      RConsole.initialize();
   }
   MO.REngine_buildSpace = function REngine_buildSpace(t, p){
      var o = this;
      for(var n in p){
         if(RString.startsWith(n, 'R')){
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
      return this.find(ESpace.Global, n);
   }
   MO.REngine_findTop = function REngine_findTop(n){
      return top.REngine.find(ESpace.Top, n);
   }
   MO.REngine_findLocal = function REngine_findLocal(n){
      return this.find(ESpace.Local, n);
   }
   MO.REngine = new REngine();
}
with(MO){
   MO.RKeyboard = function RKeyboard(){
      var o = this;
      o._status      = new Array();
      o.onKeyDown    = RKeyboard_onKeyDown;
      o.onKeyUp      = RKeyboard_onKeyUp;
      o.construct    = RKeyboard_construct;
      o.isControlKey = RKeyboard_isControlKey;
      o.isIntegerKey = RKeyboard_isIntegerKey;
      o.isFloatKey   = RKeyboard_isFloatKey;
      o.isNumKey     = RKeyboard_isNumKey;
      o.isPress      = RKeyboard_isPress;
      o.fixCase      = RKeyboard_fixCase;
      o.fixPattern   = RKeyboard_fixPattern;
      o.fixChars     = RKeyboard_fixChars;
      return o;
   }
   MO.RKeyboard_onKeyDown = function RKeyboard_onKeyDown(p){
      var o = this;
      var c = p.keyCode;
      o._status[c] = EKeyStatus.Press;
   }
   MO.RKeyboard_onKeyUp = function RKeyboard_onKeyUp(p){
      var o = this;
      var c = p.keyCode;
      o._status[c] = EKeyStatus.Normal;
   }
   MO.RKeyboard_construct = function RKeyboard_construct(){
      var o = this;
      var s = o._status;
      for(var i = 0; i < 256; i++){
         s[i] = EKeyStatus.Normal;
      }
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
      RWindow.lsnsKeyUp.register(o, o.onKeyUp);
   }
   MO.RKeyboard_isControlKey = function RKeyboard_isControlKey(p){
      var s = EKeyCode.ControlKeys;
      for(var i = s.length - 1; i >= 0; i--){
         if(s[i] == p){
            return true;
         }
      }
      return false;
   }
   MO.RKeyboard_isIntegerKey = function RKeyboard_isIntegerKey(c){
      return EKeyCode.integerCodes[c];
   }
   MO.RKeyboard_isFloatKey = function RKeyboard_isFloatKey(c){
      return EKeyCode.floatCodes[c];
   }
   MO.RKeyboard_isNumKey = function RKeyboard_isNumKey(c){
      if(p >= 96 && p <= 105){
         return true;
      }
      return false;
   }
   MO.RKeyboard_isPress = function RKeyboard_isPress(p){
      var o = this;
      var v = o._status[p];
      return v == EKeyStatus.Press;
   }
   MO.RKeyboard_fixCase = function RKeyboard_fixCase(e, c){
      if(e && c){
         var k = e.keyCode;
         if(ECase.Upper == c){
            k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
         }else if(ECase.Lower == c){
            k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
         }
         e.keyCode = k;
      }
   }
   MO.RKeyboard_fixPattern = function RKeyboard_fixPattern(e, p){
      if(p){
         var k = e.keyCode;
         if(!this.isControlKeyPress(k)){
            if(!RString.isPattern(String.fromCharCode(k), p)){
               e.keyCode = 0;
               return false;
            }
         }
      }
      return true;
   }
   MO.RKeyboard_fixChars = function RKeyboard_fixChars(e, p){
      if(p){
         var k = e.keyCode;
         if(this.isNumKey(k)){
       	  k = e.keyCode = e.keyCode - 48;
         }
         if(!this.isControlKeyPress(k)){
            if(!RString.inChars(String.fromCharCode(k), p)){
               e.keyCode = 0;
               e.returnValue = false;
               return false;
            }
         }
      }
      return true;
   }
   MO.RKeyboard = new RKeyboard();
}
with(MO){
   MO.RLoader = function RLoader(){
      var o = this;
      o._loading      = new TArray();
      o._loaded       = new TArray()
      o._waits        = new TArray()
      o._intervalId   = null;
      o.hWindow       = null;
      o.onInterval    = RLoader_onInterval;
      o.intervalStart = RLoader_intervalStart;
      o.intervalStop  = RLoader_intervalStop;
      o.loadJsFile    = RLoader_loadJsFile;
      o.loadJs        = RLoader_loadJs;
      o.loaded        = RLoader_loaded;
      o.wait          = RLoader_wait;
      o.waitJs        = RLoader_waitJs;
      o.dispose       = RLoader_dispose;
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
      var d = RWindow.hDocument;
      var h = d.getElementsByTagName("head")[0];
      if(document.getElementById(id) == null){
         var url = top.RContext.location(src);
         var hs = RWindow.createElement('SCRIPT');
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
      var l = new TLoaderListener();
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
      var l = new TLoaderListener();
      l.invoke = invoke;
      var as = arguments;
      var c = as.length;
      for(var n = 1; n < c; n++){
         l.ids.push('js:' + as[n]);
      }
      o._waits.push(l);
      o.intervalStart();
   }
   MO.RLoader = new RLoader();
}
with(MO){
   MO.RMessage = function RMessage(){
      var o = this;
      o._hasError     = false;
      o._messages     = null;
      o.push          = RMessage_push;
      o.fatal         = RMessage_fatal;
      o.confirmResult = false;
      o.error         = RMessage_error;
      o.warn          = RMessage_warn;
      o.onWindowClose = RMessage_onWindowClose;
      o.confirm       = RMessage_confirm;
      o.info          = RMessage_info;
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
      var s = new TString();
      var t = new Array();
      var f = RMessage_fatal.caller;
      while(f){
         if(RArray.contains(t, f)){
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
         s.append('   ' + (c - n) + ': ' + RMethod.name(f));
      }
      var m = new TString();
      m.appendLine(RContext.get('RMessage:fatal'));
      m.appendLine(RString.repeat('-', 60));
      m.append(RClass.dump(sf), ': ');
      if(ms){
         var ag = arguments;
         c = ag.length;
         for(var n = 3; n < c; n++){
            var p = ag[n];
            if('function' == typeof(p)){
               p = RMethod.name(p);
            }
            var pi = n - 2;
            ms = ms.replace('{' + pi + '}', p);
         }
      }
      m.appendLine(ms);
      m.appendLine(RString.repeat('-', 60));
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
      var s = new TString();
      var n = 0;
      var aw = top.RControl.create(FAlertWindow);
      aw.setText(message);
      aw.show();
   }
   MO.RMessage_info = function RMessage_info(self, message, params){
      var s = new TString();
      var n = 0;
      var aw = top.RControl.create(FInfoWindow);
      aw.setText(message);
      aw.show();
   }
   MO.RMessage_confirm = function RMessage_confirm(message,callback){
      var o = this;
      var ls = top.RControl.create(FConfirmWindow);
      ls.setText(message);
      ls.lsns.register(o, callback);
      ls.show();
   }
   MO.RMessage_onWindowClose = function RMessage_onWindowClose(v){
      this.confirmResult = v;
   }
   MO.RMessage = new RMessage();
}
with(MO){
   MO.RListener = function RListener(){
      var o = this;
      o._listeners = new Object();
      return o;
   }
   MO.RListener.prototype.makeAddListener = function RListener_makeAddListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.addListener(\''+ code +'\',owner,callback);';
         method = new Function('owner', 'callback', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeSetListener = function RListener_makeSetListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.setListener(\''+ code +'\',owner,callback);';
         method = new Function('owner', 'callback', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeRemoveListener = function RListener_makeRemoveListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.removeListener(\''+ code +'\',owner,callback);';
         method = new Function('owner', 'callback', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeClearListener = function RListener_makeClearListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.clearListeners(\''+ code +'\');';
         method = new Function(source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeProcessListener = function RListener_makeProcessListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.processListener(\''+ code +'\', p1, p2, p3, p4, p5, p6);';
         method = new Function('p1', 'p2', 'p3', 'p4', 'p5', 'p6', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener = new RListener();
}
with(MO){
   MO.RResource = function RResource(){
      var o = this;
      o.uriIcon     = '/ars/icon/';
      o.uriImage    = '/ars/img/';
      o.iconPath    = RResource_iconPath;
      o.iconUrlPath = RResource_iconUrlPath;
      o.imagePath   = RResource_imagePath;
      return o;
   }
   MO.RResource_iconPath = function RResource_iconPath(path, type){
      var o = this;
      path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
      return RBrowser.contentPath('/ars/icon/' + path);
   }
   MO.RResource_iconUrlPath = function RResource_iconUrlPath(path, type){
      var o = this;
      path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
      return RBrowser.contentPath('/ars/icon/' + path);
   }
   MO.RResource_imagePath = function RResource_imagePath(path, type){
      var o = this;
   }
   MO.RResource = new RResource();
}
with(MO){
   MO.RStyle = function RStyle(){
      var o = this;
      o._connected = false;
      o._rules     = new TMap();
      o.connect    = RStyle_connect;
      o.has        = RStyle_has;
      o.nvl        = RStyle_nvl;
      o.style      = RStyle_style;
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
      return RClass.name(c) + '_' + n;
   }
   MO.RStyle = new RStyle();
}
with(MO){
   MO.RTypeArray = function RTypeArray(){
      var o = this;
      o._float3  = null;
      o._float4  = null;
      o._data    = new Object();
      o.float3      = RTypeArray_float3;
      o.float4      = RTypeArray_float4;
      o.createArray = RTypeArray_createArray;
      o.findTemp    = RTypeArray_findTemp;
      return o;
   }
   MO.RTypeArray_float3 = function RTypeArray_float3(){
      var o = this;
      var v = o._float3;
      if(v == null){
         v = o._float3 = new Float32Array(3);
      }
      return v;
   }
   MO.RTypeArray_float4 = function RTypeArray_float4(){
      var o = this;
      var v = o._float4;
      if(v == null){
         v = o._float4 = new Float32Array(4);
      }
      return v;
   }
   MO.RTypeArray_createArray = function RTypeArray_createArray(t, l){
      switch(t){
         case EDataType.Boolean:
         case EDataType.Int8:
            return new Int8Array(l);
         case EDataType.Int16:
            return new Int16Array(l);
         case EDataType.Int32:
            return new Int32Array(l);
         case EDataType.Int64:
            return new Int64Array(l);
         case EDataType.Uint8:
            return new Uint8Array(l);
         case EDataType.Uint16:
            return new Uint16Array(l);
         case EDataType.Uint32:
            return new Uint32Array(l);
         case EDataType.Float32:
            return new Float32Array(l);
         case EDataType.Float64:
            return new Float64Array(l);
      }
      throw new TError('Create unknown type array. (type={1}, length={2})', t, l);
   }
   MO.RTypeArray_findTemp = function RTypeArray_findTemp(t, l){
      var o = this;
      var d = o._data;
      var s = d[t];
      if(s == null){
         s = d[t] = new Object();
      }
      var r = s[l];
      if(r == null){
         r = s[l] = o.createArray(t, l);
      }
      return r;
   }
   MO.RTypeArray = new RTypeArray();
}
MO.FTag = function FTag(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name      = 'Tag';
   o._children  = null;
   o._trimLeft  = false;
   o._trimRight = false;
   o.onBegin    = MO.FTag_onBegin;
   o.onEnd      = MO.FTag_onEnd;
   o.name       = MO.FTag_name;
   o.set        = MO.FTag_set;
   o.push       = MO.FTag_push;
   o.parse      = MO.FTag_parse;
   o.toString   = MO.FTag_toString;
   o.innerDump  = MO.FTag_innerDump;
   o.dump       = MO.FTag_dump;
   return o;
}
MO.FTag_onBegin = function FTag_onBegin(p){
   return MO.EResult.Continue;
}
MO.FTag_onEnd = function FTag_onEnd(p){
   return MO.EResult.Continue;
}
MO.FTag_name = function FTag_name(){
   return this._name;
}
MO.FTag_set = function FTag_set(n, v){
   throw new MO.TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
}
MO.FTag_push = function FTag_push(p){
   var o = this;
   var ts = o._children;
   if(ts == null){
      ts = o._children = new MO.TObjects();
   }
   ts.push(p);
}
MO.FTag_parse = function FTag_parse(p){
   var o = this;
   var r = o.onBegin(p);
   if(r == MO.EResult.Continue){
      var ts = o._children;
      if(ts){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            r = t.parse(p);
            if(r == MO.EResult.Cancel){
               return r;
            }
            p._trimLeft = t._trimLeft;
            p._trimRight = t._trimRight;
         }
      }
      return o.onEnd(p);
   }
   return r;
}
MO.FTag_toString = function FTag_toString(){
   return null;
}
MO.FTag_innerDump = function FTag_innerDump(ps, pt, pl){
   var o = this;
   ps.appendRepeat('   ', pl);
   ps.append(MO.Class.dump(pt));
   var s = pt.toString();
   if(!MO.RString.isEmpty(s)){
      ps.append(' [', s, ']');
   }
   var ts = pt._children;
   if(ts){
      ps.append('\n');
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         o.innerDump(ps, t, pl + 1);
         if(i < c - 1){
            ps.append('\n');
         }
      }
   }
}
MO.FTag_dump = function FTag_dump(){
   var result = new MO.TString();
   this.innerDump(result, this, 0);
   return result.toString();
}
MO.FTagContext = function FTagContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MInstance);
   o._trimLeft       = false;
   o._trimRight      = false;
   o._attributes     = MO.Class.register(o, new MO.AGetter('_attributes'));
   o._source         = null;
   o.construct       = MO.FTagContext_construct;
   o.instanceAlloc   = MO.FTagContext_instanceAlloc;
   o.get             = MO.FTagContext_get;
   o.set             = MO.FTagContext_set;
   o.setBoolean      = MO.FTagContext_setBoolean;
   o.source          = MO.FTagContext_source;
   o.write           = MO.FTagContext_write;
   o.resetSource     = MO.FTagContext_resetSource;
   o.dispose         = MO.FTagContext_dispose;
   return o;
}
MO.FTagContext_construct = function FTagContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._attributes = new MO.TAttributes();
   o._source = new MO.TString();
}
MO.FTagContext_instanceAlloc = function FTagContext_instanceAlloc(){
   this._attributes.clear();
}
MO.FTagContext_get = function FTagContext_get(name, value){
   return this._attributes.get(name, value);
}
MO.FTagContext_set = function FTagContext_set(name, value){
   this._attributes.set(name, value);
}
MO.FTagContext_setBoolean = function FTagContext_setBoolean(name, value){
   this._attributes.set(name, MO.RBoolean.toString(value));
}
MO.FTagContext_source = function FTagContext_source(){
   return this._source.toString();
}
MO.FTagContext_write = function FTagContext_write(p){
   if(!MO.Lang.String.isEmpty(p)){
      this._source.append(p);
   }
}
MO.FTagContext_resetSource = function FTagContext_resetSource(p){
   this._source.clear();
}
MO.FTagContext_dispose = function FTagContext_dispose(){
   var o = this;
   o._attributes = RObject.dispose(o._attributes);
   o._source = RObject.dispose(o._source);
   o.__base.FObject.dispose.call(o);
}
MO.FTagDocument = function FTagDocument(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._space  = MO.Class.register(o, MO.AGetSet('_space'));
   o._root   = MO.Class.register(o, MO.AGetter('_root'));
   o.create   = MO.FTagDocument_create;
   o.loadNode = MO.FTagDocument_loadNode;
   o.load     = MO.FTagDocument_load;
   o.parse    = MO.FTagDocument_parse;
   o.dump     = MO.FTagDocument_dump;
   return o;
}
MO.FTagDocument_create = function FTagDocument_create(p){
   var o = this;
   var sn = o._space + '_';
   var n = null;
   if(MO.RString.startsWith(p, sn)){
      n = p.substring(sn.length);
   }else{
      n = p;
   }
   var t = null;
   switch(n){
      case 'source':
         t = MO.Class.create(MO.FTag);
         break;
      case 'write':
         t = MO.Class.create(MO.FTagWrite);
         break;
      case 'true':
         t = MO.Class.create(MO.FTagTrue);
         break;
      case 'false':
         t = MO.Class.create(MO.FTagFalse);
         break;
      case 'equals':
         t = MO.Class.create(MO.FTagEquals);
         break;
      case 'notEquals':
         t = MO.Class.create(MO.FTagNotEquals);
         break;
      default:
         throw new MO.TError(o, 'Unknown tag type. (name={1})', n);
   }
   return t;
}
MO.FTagDocument_loadNode = function FTagDocument_loadNode(pn, pe){
   var o = this;
   var x = o.create(pe.nodeName);
   if(pn){
      pn.push(x);
   }else{
      o._root = x;
   }
   var eas = pe.attributes;
   if(eas){
      var c = eas.length;
      for(var i = 0; i < c; i++){
         var ea = eas[i];
         if(ea.nodeName){
            x.set(ea.nodeName, MO.RXml.formatText(ea.value));
         }
      }
   }
   var ens = pe.childNodes
   if(ens){
      var c = ens.length;
      for(var i = 0; i < c; i++){
         var en = ens[i];
         switch(en.nodeType){
            case MO.ENodeType.Text:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.nodeValue);
               x.push(xt);
               break;
            case MO.ENodeType.Data:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.data);
               x.push(xt);
               break;
            case MO.ENodeType.Node:
               o.loadNode(x, en);
               break;
         }
      }
   }
}
MO.FTagDocument_load = function FTagDocument_load(p){
   var o = this;
   var s = '<source>' + p + '</source>'
   s = s.replace(new RegExp('<' + o._space + ':', 'g'), '<' + o._space + '_');
   s = s.replace(new RegExp('</' + o._space + ':', 'g'), '</' + o._space + '_');
   s = s.replace(new RegExp(' & ', 'g'), ' &amp; ');
   s = s.replace(new RegExp(' < ', 'g'), ' &lt; ');
   s = s.replace(new RegExp(' > ', 'g'), ' &gt; ');
   var xr = MO.RXml.makeString(s);
   o.loadNode(null, xr.firstChild);
}
MO.FTagDocument_parse = function FTagDocument_parse(p){
   var o = this;
   p.resetSource();
   o._root.parse(p);
   return p.source();
}
MO.FTagDocument_dump = function FTagDocument_dump(){
   var o = this;
   var r = new MO.TString();
   r.appendLine(MO.Class.dump(o));
   r.appendLine(o.root().dump(r));
   return r.toString();
}
MO.FTagEquals = function FTagEquals(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = MO.FTagEquals_onBegin;
   o.set       = MO.FTagEquals_set;
   o.toString  = MO.FTagEquals_toString;
   return o;
}
MO.FTagEquals_onBegin = function FTagEquals_onBegin(p){
   var o = this;
   var r = false;
   var s = p.get(o._source);
   var vs = o._value.split('|');
   var c = vs.length;
   for(var i = 0; i < c; i++){
      var v = vs[i]
      if(s == v){
         r = true;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
}
MO.FTagEquals_set = function FTagEquals_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
      case 'value':
         o._value = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagEquals_toString = function FTagEquals_toString(){
   var o = this;
   return 'source=' + o._source + ', value=' + o._value;
}
MO.FTagFalse = function FTagFalse(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = MO.FTagFalse_onBegin;
   o.set       = MO.FTagFalse_set;
   o.toString  = MO.FTagFalse_toString;
   return o;
}
MO.FTagFalse_onBegin = function FTagFalse_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   return MO.RBoolean.parse(v) ? MO.EResult.Skip : MO.EResult.Continue;
}
MO.FTagFalse_set = function FTagFalse_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagFalse_toString = function FTagFalse_toString(){
   var o = this;
   return 'source=' + o._source;
}
MO.FTagNotEquals = function FTagNotEquals(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = MO.FTagNotEquals_onBegin;
   o.set       = MO.FTagNotEquals_set;
   o.toString  = MO.FTagNotEquals_toString;
   return o;
}
MO.FTagNotEquals_onBegin = function FTagNotEquals_onBegin(p){
   var o = this;
   var r = true;
   var s = p.get(o._source);
   var vs = o._value.split('|');
   var c = vs.length;
   for(var i = 0; i < c; i++){
      var v = vs[i]
      if(s == v){
         r = false;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
}
MO.FTagNotEquals_set = function FTagNotEquals_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
      case 'value':
         o._value = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagNotEquals_toString = function FTagNotEquals_toString(){
   var o = this;
   return 'source=' + o._source + ', value=' + o._value;
}
MO.FTagText = function FTagText(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._text    = MO.Class.register(o, new MO.AGetSet('_text'));
   o.onBegin  = MO.FTagText_onBegin;
   o.toString = MO.FTagText_toString;
   return o;
}
MO.FTagText_onBegin = function FTagText_onBegin(p){
   var t = this._text;
   if(p._trimLeft){
      if(MO.RString.startsWith(t, '\r')){
         t = t.substring(1);
      }
      if(MO.RString.startsWith(t, '\n')){
         t = t.substring(1);
      }
   }
   if(p._trimRight){
      if(MO.RString.endsWith(t, '\r')){
         t = t.substring(0, t.length - 1);
      }
      if(MO.RString.endsWith(t, '\n')){
         t = t.substring(0, t.length - 1);
      }
   }
   p.write(t);
   return MO.EResult.Skip;
}
MO.FTagText_toString = function FTagText_toString(){
   var o = this;
   return '{' + o._text + '}';
}
MO.FTagTrue = function FTagTrue(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = MO.FTagTrue_onBegin;
   o.set       = MO.FTagTrue_set;
   o.toString  = MO.FTagTrue_toString;
   return o;
}
MO.FTagTrue_onBegin = function FTagTrue_onBegin(p){
   var o = this;
   var r = false;
   var ns = o._source.split('|');
   var c = ns.length;
   for(var i = 0; i < c; i++){
      var n = ns[i]
      var v = p.get(n);
      if(MO.Lang.Boolean.parse(v)){
         r = true;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
}
MO.FTagTrue_set = function FTagTrue_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagTrue_toString = function FTagTrue_toString(){
   var o = this;
   return 'source=' + o._source;
}
MO.FTagWrite = function FTagWrite(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._source  = null;
   o.onBegin  = MO.FTagWrite_onBegin;
   o.set      = MO.FTagWrite_set;
   o.toString = MO.FTagWrite_toString;
   return o;
}
MO.FTagWrite_onBegin = function FTagWrite_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   p.write(v);
   return MO.EResult.Skip;
}
MO.FTagWrite_set = function FTagWrite_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagWrite_toString = function FTagWrite_toString(){
   var o = this;
   return 'source=' + o._source;
}
MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
MO.SProcessEvent = function SProcessEvent(){
   var o = this;
   o.index = null;
   o.code  = null;
   o.data  = null;
   return o;
}
with(MO){
   MO.SXmlEvent = function SXmlEvent(){
      var o = this;
      o.owner          = null;
      o.url            = null;
      o.action         = null;
      o.parameter      = null;
      o.inputDocument  = null;
      o.outputDocument = null;
      o.callback       = null;
      o.process        = SXmlEvent_process;
      o.dispose        = SXmlEvent_dispose;
      return o;
   }
   MO.SXmlEvent_process = function SXmlEvent_process(p){
      var o = this;
      o.outputDocument = p.document;
      o.outputNode = p.root;
      if(o.owner){
         o.callback.call(o.owner, o);
      }else{
         o.callback(o);
      }
   }
   MO.SXmlEvent_dispose = function SXmlEvent_dispose(){
      var o = this;
      o.owner = null;
      o.url = null;
      o.action = null;
      o.parameter = null;
      o.inputDocument = null;
      o.outputDocument = null;
      o.callback = null;
   }
}
MO.FContent = function FContent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
with(MO){
   MO.FContentConsole = function FContentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._connections = null;
      o.onLoad       = FContentConsole_onLoad;
      o.construct    = FContentConsole_construct;
      o.alloc        = FContentConsole_alloc;
      o.process      = FContentConsole_process;
      o.send         = FContentConsole_send;
      return o;
   }
   MO.FContentConsole_construct = function FContentConsole_construct(){
      var o = this;
      o._connections = new TObjects();
   }
   MO.FContentConsole_onLoad = function FContentConsole_onLoad(){
      var o = this;
      var e = o.event;
      e.document = o.document;
      e.process();
      o.event = null;
      o.document = null;
      o._statusFree = true;
   }
   MO.FContentConsole_alloc = function FContentConsole_alloc(){
      var o = this;
      var a = null;
      var cs = o._connections;
      for(var n = cs.count - 1; n >= 0; n--){
         var c = cs.get(n);
         if(c._statusFree){
            a = c;
            break;
         }
      }
      if(!a){
         a = RClass.create(FXmlConnection);
         cs.push(a);
         a.onLoad = o.onLoad;
      }
      a._statusFree = false;
      return a;
   }
   MO.FContentConsole_process = function FContentConsole_process(e){
      var o = this;
      var c = o.alloc();
      c.event = e;
      switch(e.code){
         case EXmlEvent.Send:
            c.send(e.url, e.document);
            break;
         case EXmlEvent.Receive:
            c.receive(e.url, e.document);
            break;
         case EXmlEvent.SyncSend:
            return c.syncSend(e.url, e.document);
         case EXmlEvent.SyncReceive:
            return c.syncReceive(e.url, e.document);
      }
   }
   MO.FContentConsole_send = function FContentConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
MO.FContentPipeline = function FContentPipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   o._scopeCd = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   return o;
}
with(MO){
   MO.FDragConsole = function FDragConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd        = EScope.Local;
      o._activeDragable = null;
      o._dragables      = null;
      o.onMouseDown     = FDragConsole_onMouseDown;
      o.onMouseMove     = FDragConsole_onMouseMove;
      o.onMouseUp       = FDragConsole_onMouseUp;
      o.construct       = FDragConsole_construct;
      o.register        = FDragConsole_register;
      o.unregister      = FDragConsole_unregister;
      o.clear           = FDragConsole_clear;
      return o;
   }
   MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
      var o = this;
      var es = p.source;
      if(!es){
         return;
      }
      if(!RClass.isClass(es, MUiDragable)){
         return;
      }
      RWindow.setOptionSelect(false);
      o._activeDragable = es;
      es.onDragStart(p);
   }
   MO.FDragConsole_onMouseMove = function FDragConsole_onMouseMove(p){
      var o = this;
      if(!o._activeDragable){
         return;
      }
      o._activeDragable.onDragMove(p);
   }
   MO.FDragConsole_onMouseUp = function FDragConsole_onMouseUp(p){
      var o = this;
      if(!o._activeDragable){
         return;
      }
      RWindow.setOptionSelect(true);
      o._activeDragable.onDragStop(p);
      o._activeDragable = null;
   }
   MO.FDragConsole_construct = function FDragConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._dragables = new TObjects();
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }
   MO.FDragConsole_register = function FDragConsole_register(p){
      this._dragables.push(p);
   }
   MO.FDragConsole_unregister = function FDragConsole_unregister(po, pc){
      this._dragables.remove(p);
   }
   MO.FDragConsole_clear = function FDragConsole_clear(){
      this._dragables.clear();
   }
}
with(MO){
   MO.FEnvironment = function FEnvironment(o){
      o = RClass.inherits(this, o, FObject);
      o._name  = RClass.register(o, new AGetSet('_name'));
      o._value = RClass.register(o, new AGetSet('_value'));
      o.set    = FEnvironment_set;
      return o;
   }
   MO.FEnvironment_set = function FEnvironment_set(name, value){
      var o = this;
      o._name = name;
      o._value = value;
   }
}
with(MO){
   MO.FEnvironmentConsole = function FEnvironmentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._environments = MO.Class.register(o, new MO.AGetSet('_environments'));
      o.construct     = FEnvironmentConsole_construct;
      o.register      = FEnvironmentConsole_register;
      o.registerValue = FEnvironmentConsole_registerValue;
      o.find          = FEnvironmentConsole_find;
      o.findValue     = FEnvironmentConsole_findValue;
      return o;
   }
   MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._environments = new TDictionary();
   }
   MO.FEnvironmentConsole_register = function FEnvironmentConsole_register(environment){
      var o = this;
      var name = environment.name();
      o._environments.set(name, environment);
   }
   MO.FEnvironmentConsole_registerValue = function FEnvironmentConsole_registerValue(name, value){
      var o = this;
      var environment = MO.RClass.create(MO.FEnvironment);
      environment.set(name, value);
      o._environments.set(name, environment);
      return environment;
   }
   MO.FEnvironmentConsole_find = function FEnvironmentConsole_find(name){
      return this._environments.get(name);
   }
   MO.FEnvironmentConsole_findValue = function FEnvironmentConsole_findValue(name){
      var o = this;
      var value = null;
      var environment = o._environments.get(name);
      if(environment){
         value = environment.value();
      }
      return value;
   }
}
MO.FEvent = function FEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._owner      = MO.Class.register(o, new MO.AGetSet('_owner'));
   o._callback   = MO.Class.register(o, new MO.AGetSet('_callback'));
   o._valid      = MO.Class.register(o, new MO.AGetSet('_valid'), true);
   o.process     = MO.FEvent_process;
   return o;
}
MO.FEvent_process = function FEvent_process(){
   var o = this;
   if(o._valid){
      var owner = o._owner;
      if(owner){
         o._callback.call(owner, o);
      }else{
         o._callback(o);
      }
   }
}
with(MO){
   MO.FEventConsole = function FEventConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._thread        = null;
      o._interval      = 100;
      o._processEvents = null;
      o._events        = null;
      o.onProcess      = FEventConsole_onProcess;
      o.construct      = FEventConsole_construct;
      o.register       = FEventConsole_register;
      o.push           = FEventConsole_push;
      o.clear          = FEventConsole_clear;
      return o;
   }
   MO.FEventConsole_onProcess = function FEventConsole_onProcess(){
      var o = this;
      var es = o._events;
      if(es.isEmpty()){
         return;
      }
      var ps = o._processEvents;
      ps.assign(es);
      es.clear();
      var c = ps.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            ps.get(i).process();
         }
         ps.clear();
      }
   }
   MO.FEventConsole_construct = function FEventConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._processEvents = new TObjects();
      o._events = new TObjects();
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.lsnsProcess.register(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
      MO.Logger.debug(o, 'Add event thread. (thread={1})', RClass.dump(thread));
   }
   MO.FEventConsole_register = function FEventConsole_register(po, pc){
      var o = this;
      var e = RClass.create(FEvent);
      e.owner = po;
      e.callback = pc;
      o._events.push(e);
   }
   MO.FEventConsole_push = function FEventConsole_push(p){
      var o = this;
      var es = o._events;
      if(!es.contains(p)){
         es.push(p);
      }
   }
   MO.FEventConsole_clear = function FEventConsole_clear(){
      this._events.clear();
   }
}
with(MO){
   MO.FHttpConsole = function FHttpConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._pool     = null;
      o.onLoad    = FHttpConsole_onLoad;
      o.construct = FHttpConsole_construct;
      o.alloc     = FHttpConsole_alloc;
      o.free      = FHttpConsole_free;
      o.send      = FHttpConsole_send;
      o.sendAsync = FHttpConsole_sendAsync;
      o.fetch     = FHttpConsole_fetch;
      o.dispose   = FHttpConsole_dispose;
      return o;
   }
   MO.FHttpConsole_onLoad = function FHttpConsole_onLoad(connection){
      var o = this;
      o._pool.free(connection);
   }
   MO.FHttpConsole_construct = function FHttpConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._pool = RClass.create(FObjectPool);
   }
   MO.FHttpConsole_alloc = function FHttpConsole_alloc(){
      var o = this;
      var pool = o._pool;
      if(!pool.hasFree()){
         var connection = RClass.create(FHttpConnection);
         connection._asynchronous = true;
         o._pool.push(connection);
      }
      var connection = pool.alloc();
      connection.clearLoadListeners();
      connection.clearProcessListeners();
      connection.addLoadListener(o, o.onLoad);
      return connection;
   }
   MO.FHttpConsole_free = function FHttpConsole_free(connection){
      this._pool.free(connection);
   }
   MO.FHttpConsole_send = function FHttpConsole_send(url, data){
      var o = this;
      var connection = o.alloc();
      connection.send(url, data);
      return connection;
   }
   MO.FHttpConsole_sendAsync = function FHttpConsole_sendAsync(url, data){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection.send(url, data);
      return connection;
   }
   MO.FHttpConsole_fetch = function FHttpConsole_fetch(url, data){
      var o = this;
      var connection = o.alloc();
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection;
   }
   MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
      var o = this;
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FIdleConsole = function FIdleConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope            = EScope.Page;
      o.register         = FIdleConsole_register;
      return o;
   }
   MO.FIdleConsole_register = function FIdleConsole_register(c, cFun){
      var o = this;
      o.active = new TActive(c, cFun);
      o.active.interval = 100;
      RConsole.find(FActiveConsole).push(o.active);
   }
   MO.FIdleConsole_construct = function FIdleConsole_construct(){
      var o = this;
   }
}
with(MO){
   MO.FJsonConsole = function FJsonConsole(o){
      o = RClass.inherits(this, o, FHttpConsole);
      o._scopeCd  = EScope.Local;
      o.onLoad    = FJsonConsole_onLoad;
      o.send      = FJsonConsole_send;
      o.sendAsync = FJsonConsole_sendAsync;
      return o;
   }
   MO.FJsonConsole_onLoad = function FJsonConsole_onLoad(connection){
      var o = this;
      o.__base.FHttpConsole.onLoad.call(o, connection)
      var source = connection.outputData();
      var content = JSON.parse(source);
      var event = MO.Memory.alloc(SEvent);
      event.connection = connection;
      event.content = content;
      connection.processProcessListener(event);
      MO.Memory.free(event);
   }
   MO.FJsonConsole_send = function FJsonConsole_send(u, d){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = false;
      connection._contentCd = EHttpContent.Text;
      var result = connection.send(url, data);
      console.free(connection);
      return result;
   }
   MO.FJsonConsole_sendAsync = function FJsonConsole_sendAsync(url, data){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection;
   }
}
with(MO){
   MO.FLoggerConsole = function FLoggerConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Page;
      o.iLogger    = null;
      o.onKeyDown  = FLoggerConsole_onKeyDown;
      o.construct  = FLoggerConsole_construct;
      o.connect    = FLoggerConsole_connect;
      o.disconnect = FLoggerConsole_disconnect;
      o.output     = FLoggerConsole_output;
      return o;
   }
   MO.FLoggerConsole_onKeyDown = function FLoggerConsole_onKeyDown(e){
      if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
         this.connect();
      }
   }
   MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
      var o = this;
      o.base.FConsole.construct.call(o);
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
   MO.FLoggerConsole_connect = function FLoggerConsole_connect(){
   }
   MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
      this.iLogger = null;
   }
   MO.FLoggerConsole_output = function FLoggerConsole_output(level, obj, method, ms, msg, stack){
      var o = this;
      if(o.iLogger){
         var m = RClass.dump(obj);
         if(ms){
            m += ' (' + ms + 'ms)';
         }
         var s = level + ' [' + RString.rpad(m, 36) + '] ';
         if(stack){
            s += RString.rpad(msg, 120) + ' [' + stack + ']';
         }else{
            s += msg;
         }
         o.iLogger.Output(s);
      }
   }
   MO.FLoggerConsole_xml = function FLoggerConsole_xml(){
      if(!this.environment){
         this.connect()
      }
      if(this.environment){
         return this.environment.xml();
      }
      return null;
   }
}
with(MO){
   MO.FMonitorConsole = function FMonitorConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope      = EScope.Global;
      o.working    = false;
      o.interval   = 10;
      o.intervalId = null;
      o.monitors   = new TList();
      o.hWindow    = null;
      o.doInterval = FMonitorConsole_doInterval;
      o.push       = FMonitorConsole_push;
      o.process    = FMonitorConsole_process;
      o.processAll = FMonitorConsole_processAll;
      o.startup    = FMonitorConsole_startup;
      o.wait       = FMonitorConsole_wait;
      o.release    = FMonitorConsole_release;
      return o;
   }
   MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
      this.startup();
      monitor.id = this.monitors.sync(monitor);
      monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
      monitor.status = EMonitor.Active;
   }
   MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
      if(monitor){
         switch(monitor.status){
            case EMonitor.Sleep:
               break;
            case EMonitor.Active:
               monitor.process(this.interval);
               break;
            case EMonitor.Cancel:
               this.monitors.removeItem(monitor);
               break;
         }
      }
   }
   MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
      this.working = true;
      var monitors = this.monitors;
      for(var n=0; n<monitors.count; n++){
         this.process(monitors.get(n));
      }
      this.working = false;
   }
   MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
      var con = RGlobal.get(FMonitorConsole);
      if(con && !con.working){
         con.processAll();
      }
   }
   MO.FMonitorConsole_startup = function FMonitorConsole_startup(){
      if(!this.hWindow){
         this.hWindow = window;
         debugger;
         this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
      }
   }
   MO.FMonitorConsole_wait = function FMonitorConsole_wait(request){
   }
   MO.FMonitorConsole_release = function FMonitorConsole_release(){
      if(this.hWindow && this.intervalId){
         this.hWindow.clearInterval(this.intervalId);
      }
   }
}
with(MO){
   MO.FMouseConsole = function FMouseConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._activeCapture = null;
      o.onMouseDown    = FMouseConsole_onMouseDown;
      o.onMouseMove    = FMouseConsole_onMouseMove;
      o.onMouseUp      = FMouseConsole_onMouseUp;
      o.construct      = FMouseConsole_construct;
      o.captureStart   = FMouseConsole_captureStart;
      o.capture        = FMouseConsole_capture;
      o.captureStop    = FMouseConsole_captureStop;
      o.register       = FMouseConsole_register;
      o.unregister     = FMouseConsole_unregister;
      o.clear          = FMouseConsole_clear;
      return o;
   }
   MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
      var o = this;
      var s = RHtml.searchLinker(p.hSource, MMouseCapture);
      if(!s){
         return;
      }
      if(!s.testMouseCapture()){
         return;
      }
      o._activeCapture = s;
      o.captureStart(p);
   }
   MO.FMouseConsole_onMouseMove = function FMouseConsole_onMouseMove(p){
      var o = this;
      if(!o._activeCapture){
         return;
      }
      o.capture(p);
   }
   MO.FMouseConsole_onMouseUp = function FMouseConsole_onMouseUp(p){
      var o = this;
      if(!o._activeCapture){
         return;
      }
      o.captureStop(p);
   }
   MO.FMouseConsole_construct = function FMouseConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }
   MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         RWindow.setOptionSelect(false);
         c.onMouseCaptureStart(p);
      }
   }
   MO.FMouseConsole_capture = function FMouseConsole_capture(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         if(c.testMouseCapture()){
            c.onMouseCapture(p);
         }else{
            o.captureStop(p)
         }
      }
   }
   MO.FMouseConsole_captureStop = function FMouseConsole_captureStop(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         c.onMouseCaptureStop(p);
         o._activeCapture = null;
      }
      RWindow.setOptionSelect(true);
   }
   MO.FMouseConsole_register = function FMouseConsole_register(p){
   }
   MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
   }
   MO.FMouseConsole_clear = function FMouseConsole_clear(){
   }
}
MO.FPipeline = function FPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
with(MO){
   MO.FProcess = function FProcess(o){
      o = RClass.inherits(this, o, FObject);
      o._name     = MO.Class.register(o, new MO.AGetter('_name'));
      o._source   = null;
      o._worker   = null;
      o._events   = null;
      o.ohMessage = FProcess_ohMessage;
      o.onMessage = FProcess_onMessage;
      o.construct = FProcess_construct;
      o.name      = FProcess_name;
      o.start     = FProcess_start;
      o.process   = FProcess_process;
      return o;
   }
   MO.FProcess_ohMessage = function FProcess_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcess_onMessage = function FProcess_onMessage(p){
   }
   MO.FProcess_construct = function FProcess_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcess_start = function FProcess_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
      }
      o._source = p;
      var w = o._worker = new Worker(p);
      w.__linker = o;
      w.onmessage = o.ohMessage;
   }
   MO.FProcess_process = function FProcess_process(p){
      var o = this;
      var es = o._events;
      var c = es.count();
      es.push(p);
      var e = new SProcessEvent();
      e.index = c;
      e.code = p.code();
      e.data = p.data();
      o._worker.postMessage(e);
   }
}
with(MO){
   MO.FProcessConsole = function FProcessConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._connections = null;
      o.onLoad       = FProcessConsole_onLoad;
      o.construct    = FProcessConsole_construct;
      o.alloc        = FProcessConsole_alloc;
      o.process      = FProcessConsole_process;
      o.send         = FProcessConsole_send;
      return o;
   }
   MO.FProcessConsole_construct = function FProcessConsole_construct(){
      var o = this;
      o._connections = new TObjects();
   }
   MO.FProcessConsole_onLoad = function FProcessConsole_onLoad(){
      var o = this;
      var e = o.event;
      e.document = o.document;
      e.process();
      o.event = null;
      o.document = null;
      o._statusFree = true;
   }
   MO.FProcessConsole_alloc = function FProcessConsole_alloc(){
      var o = this;
      var a = null;
      var cs = o._connections;
      for(var n = cs.count - 1; n >= 0; n--){
         var c = cs.get(n);
         if(c._statusFree){
            a = c;
            break;
         }
      }
      if(!a){
         a = RClass.create(FXmlConnection);
         cs.push(a);
         a.onLoad = o.onLoad;
      }
      a._statusFree = false;
      return a;
   }
   MO.FProcessConsole_process = function FProcessConsole_process(e){
      var o = this;
      var c = o.alloc();
      c.event = e;
      switch(e.code){
         case EXmlEvent.Send:
            c.send(e.url, e.document);
            break;
         case EXmlEvent.Receive:
            c.receive(e.url, e.document);
            break;
         case EXmlEvent.SyncSend:
            return c.syncSend(e.url, e.document);
         case EXmlEvent.SyncReceive:
            return c.syncReceive(e.url, e.document);
      }
   }
   MO.FProcessConsole_send = function FProcessConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
with(MO){
   MO.FProcessEvent = function FProcessEvent(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = MO.Class.register(o, new MO.AGetSet('_code'));
      o._data      = MO.Class.register(o, new MO.AGetSet('_data'));
      o._listeners = null;
      o.register   = FProcessEvent_register;
      return o;
   }
   MO.FProcessEvent_register = function FProcessEvent_register(owner, callback){
      var o = this;
      if(!o._listeners){
         o._listeners = new TListeners();
      }
      o._listeners.register(owner, callback);
   }
}
with(MO){
   MO.FProcessor = function FProcessor(o){
      o = RClass.inherits(this, o, FObject);
      o._name     = MO.Class.register(o, new MO.AGetter('_name'));
      o._source   = null;
      o._worker   = null;
      o._events   = null;
      o.ohMessage = FProcessor_ohMessage;
      o.onMessage = FProcessor_onMessage;
      o.construct = FProcessor_construct;
      o.start     = FProcessor_start;
      o.process   = FProcessor_process;
      return o;
   }
   MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcessor_onMessage = function FProcessor_onMessage(p){
   }
   MO.FProcessor_construct = function FProcessor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcessor_start = function FProcessor_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
      }
      o._source = p;
      var w = o._worker = new Worker(p);
      w.__linker = o;
      w.onmessage = o.ohMessage;
   }
   MO.FProcessor_process = function FProcessor_process(p){
      var o = this;
      var es = o._events;
      var c = es.count();
      es.push(p);
      var event = new SProcessEvent();
      event.index = c;
      event.code = p.code();
      event.data = p.data();
      o._worker.postMessage(event);
   }
}
with(MO){
   MO.FProcessServer = function FProcessServer(o){
      o = RClass.inherits(this, o, FObject);
      o._name               = MO.Class.register(o, new MO.AGetSet('_name'));
      o._handle             = null;
      o._processors         = null;
      o.ohInterval          = FProcessServer_ohInterval;
      o.onInterval          = FProcessServer_onInterval;
      o.ohMessage           = FProcessServer_ohMessage;
      o.onMessage           = FProcessServer_onMessage;
      o.construct           = FProcessServer_construct;
      o.registerProcessor   = FProcessServer_registerProcessor;
      o.unregisterProcessor = FProcessServer_unregisterProcessor;
      o.send                = FProcessServer_send;
      o.process             = FProcessServer_process;
      return o;
   }
   MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
      FProcessServer.__linker.onInterval();
   }
   MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
      var o = this;
   }
   MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
      FProcessServer.__linker.onMessage(p.data);
   }
   MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
      var o = this;
      console.log('messgae', this, p);
   }
   MO.FProcessServer_construct = function FProcessServer_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._processors = new TDictionary();
   }
   MO.FProcessServer_registerProcessor = function FProcessServer_registerProcessor(c, p){
      this._processors.set(c, p);
   }
   MO.FProcessServer_unregisterProcessor = function FProcessServer_unregisterProcessor(c){
      this._processors.set(c, null);
   }
   MO.FProcessServer_send = function FProcessServer_send(p){
      var o = this;
      postMessage(p);
   }
   MO.FProcessServer_process = function FProcessServer_process(){
      var o = this;
      onmessage = o.ohMessage;
      FProcessServer.__linker = o;
   }
}
with(MO){
   MO.FStatistics = function FStatistics(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = null;
      o.reset      = FStatistics_reset;
      o.resetFrame = FStatistics_resetFrame;
      return o;
   }
   MO.FStatistics_reset = function FStatistics_reset(){
   }
   MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
   }
}
with(MO){
   MO.FStatisticsConsole = function FStatisticsConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._statisticses = MO.Class.register(o, new MO.AGetter('_statisticses'));
      o.construct     = FStatisticsConsole_construct;
      o.register      = FStatisticsConsole_register;
      o.unregister    = FStatisticsConsole_unregister;
      o.find          = FStatisticsConsole_find;
      o.reset         = FStatisticsConsole_reset;
      o.resetFrame    = FStatisticsConsole_resetFrame;
      return o;
   }
   MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
      var o = this;
      o._statisticses = new TDictionary();
   }
   MO.FStatisticsConsole_register = function FStatisticsConsole_register(n, s){
      this._statisticses.set(n, s);
   }
   MO.FStatisticsConsole_unregister = function FStatisticsConsole_unregister(n){
      return this._statisticses.remove(n);
   }
   MO.FStatisticsConsole_find = function FStatisticsConsole_find(n){
      return this._statisticses.get(n);
   }
   MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
      var statisticses = this._statisticses;
      for(var i = statisticses.count() - 1; i >= 0; i--){
         statisticses.at(i).reset();
      }
   }
   MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
      var statisticses = this._statisticses;
      for(var i = statisticses.count() - 1; i >= 0; i--){
         statisticses.at(i).resetFrame();
      }
   }
}
with(MO){
   MO.FThread = function FThread(o){
      o = RClass.inherits(this, o, FObject, MListenerProcess);
      o._name       = MO.Class.register(o, new MO.AGetter('_name'));
      o._statusCd   = MO.Class.register(o, new MO.AGetter('_statusCd'), EThreadStatus.Sleep);
      o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
      o._delay      = 0;
      o.construct   = FThread_construct;
      o.start       = FThread_start;
      o.stop        = FThread_stop;
      o.process     = FThread_process;
      return o;
   }
   MO.FThread_construct = function FThread_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FThread_start = function FThread_start(){
      this._statusCd = EThreadStatus.Active;
   }
   MO.FThread_stop = function FThread_stop(){
      this._statusCd = EThreadStatus.Finish;
   }
   MO.FThread_process = function FThread_process(interval){
      var o = this;
      if(o._delay <= 0){
         o.processProcessListener(o);
         o._delay = o._interval;
      }else{
         o._delay -= interval;
      }
   }
}
with(MO){
   MO.FThreadConsole = function FThreadConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._active      = true;
      o._interval    = 10;
      o._threads     = null;
      o._hWindow     = null;
      o._hIntervalId = null;
      o.ohInterval   = FThreadConsole_ohInterval;
      o.construct    = FThreadConsole_construct;
      o.push         = FThreadConsole_push;
      o.start        = FThreadConsole_start;
      o.process      = FThreadConsole_process;
      o.processAll   = FThreadConsole_processAll;
      o.dispose      = FThreadConsole_dispose;
      return o;
   }
   MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
      var threadConsole = RConsole.get(FThreadConsole);
      threadConsole.processAll();
   }
   MO.FThreadConsole_push = function FThreadConsole_push(thread){
      this._threads.push(thread);
   }
   MO.FThreadConsole_start = function FThreadConsole_start(thread){
      thread.start();
      this._threads.push(thread);
   }
   MO.FThreadConsole_construct = function FThreadConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._threads = new TObjects();
      o._hWindow = window;
      o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
   }
   MO.FThreadConsole_process = function FThreadConsole_process(thread){
      var o = this;
      if(thread){
         switch(thread.statusCd()){
            case EThreadStatus.Sleep:
               break;
            case EThreadStatus.Active:
               thread.process(o._interval);
               break;
            case EThreadStatus.Finish:
               thread.dispose();
               o._threads.remove(thread);
               break;
         }
      }
   }
   MO.FThreadConsole_processAll = function FThreadConsole_processAll(){
      var o = this;
      if(o._active){
         var threads = o._threads;
         var count = threads.count();
         for(var n = 0; n < count; n++){
            var thread = threads.at(n);
            o.process(thread);
         }
      }
   }
   MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
      var o = this;
      var hWindow = o._hWindow;
      if(hWindow){
         var hIntervalId = o._hIntervalId;
         if(hIntervalId){
            hWindow.clearInterval(hIntervalId);
            o._hIntervalId = null;
         }
         o._hWindow = null;
      }
   }
}
MO.FTimeConsole = function FTimeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._date     = null;
   o.construct = MO.FTimeConsole_construct;
   o.dispose   = MO.FTimeConsole_dispose;
   return o;
}
MO.FTimeConsole_construct = function FTimeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FTimeConsole_dispose = function FTimeConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
with(MO){
   MO.FXmlConsole = function FXmlConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._connections = null;
      o._caches      = null;
      o.onLoad       = FXmlConsole_onLoad;
      o.construct    = FXmlConsole_construct;
      o.alloc        = FXmlConsole_alloc;
      o.send         = FXmlConsole_send;
      o.sendAsync    = FXmlConsole_sendAsync;
      o.load         = FXmlConsole_load;
      o.process      = FXmlConsole_process;
      return o;
   }
   MO.FXmlConsole_construct = function FXmlConsole_construct(){
      var o = this;
      o._connections = new TObjects();
      o._caches = new TDictionary();
   }
   MO.FXmlConsole_onLoad = function FXmlConsole_onLoad(p){
      var o = this;
      debugger
   }
   MO.FXmlConsole_alloc = function FXmlConsole_alloc(){
      var o = this;
      var alloc = null;
      var connections = o._connections;
      for(var n = connections.count - 1; n >= 0; n--){
         var connection = connections.get(n);
         if(connection._statusFree){
            alloc = connection;
            break;
         }
      }
      if(!alloc){
         alloc = RClass.create(FXmlConnection);
         connections.push(alloc);
         alloc.onLoad = o.onLoad;
      }
      alloc._statusFree = false;
      alloc.clearLoadListeners();
      return alloc;
   }
   MO.FXmlConsole_send = function FXmlConsole_send(u, d){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = false;
      var r = connection.send(u, d);
      connection._statusFree = true;
      return r;
   }
   MO.FXmlConsole_sendAsync = function FXmlConsole_sendAsync(u, d, p){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection._parameters = p;
      connection.send(u, d);
      return connection;
   }
   MO.FXmlConsole_load = function FXmlConsole_load(u, d, p){
      var o = this;
      var v = o._caches.get(u);
      if(v){
         return v;
      }
      var connection = o.alloc();
      connection._asynchronous = true;
      connection._parameters = p;
      v = connection._cache = RClass.create(FXmlData);
      connection.send(u, d);
      o._caches.set(u, v);
      return v;
   }
   MO.FXmlConsole_process = function FXmlConsole_process(p){
      var o = this;
      if(p.constructor != SXmlEvent){
         throw new TError('Parameter type is invalid.');
      }
      var connection = o.alloc();
      connection._asynchronous = true;
      connection.send(p.url, p.inputDocument);
      connection.addLoadListener(p, p.process);
      return connection;
   }
}
MO.MCanvasObject = function MCanvasObject(o){
   o = MO.Class.inherits(this, o);
   o.htmlCanvas = MO.Method.virtual(o, 'htmlCanvas');
   return o;
}
MO.MGraphicObject = function MGraphicObject(o){
   o = MO.Class.inherits(this, o);
   o._graphicContext    = MO.Class.register(o, new MO.AGetter('_graphicContext'));
   o.linkGraphicContext = MO.MGraphicObject_linkGraphicContext;
   o.dispose            = MO.MGraphicObject_dispose;
   return o;
}
MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
   var o = this;
   if(MO.Class.isClass(context, MO.FGraphicContext)){
      o._graphicContext = context;
   }else if(MO.Class.isClass(context, MO.MGraphicObject)){
      o._graphicContext = context._graphicContext;
   }else{
      throw new TError(o, 'Link graphic context failure. (context={1})', context);
   }
   MO.Assert.debugNotNull(o._graphicContext);
}
MO.MGraphicObject_dispose = function MGraphicObject_dispose(){
   var o = this;
   o._graphicContext = null;
}
MO.MGraphicRenderable = function MGraphicRenderable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.process = MO.Method.empty;
   return o;
}
MO.FFloatStream = function FFloatStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._length     = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory     = MO.Class.register(o, new MO.AGetter('_memory'), null);
   o._position   = 0;
   o.construct   = MO.FFloatStream_construct;
   o.setLength   = MO.FFloatStream_setLength;
   o.writeFloat4 = MO.FFloatStream_writeFloat4;
   o.writeColor4 = MO.FFloatStream_writeColor4;
   o.reset       = MO.FFloatStream_reset;
   o.clear       = MO.FFloatStream_clear;
   o.dispose     = MO.FFloatStream_dispose;
   return o;
}
MO.FFloatStream_construct = function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FFloatStream_setLength = function FFloatStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new Float32Array(length);
}
MO.FFloatStream_writeFloat4 = function FFloatStream_writeFloat4(value1, value2, value3, value4){
   var o = this;
   o._memory[o._position++] = value1;
   o._memory[o._position++] = value2;
   o._memory[o._position++] = value3;
   o._memory[o._position++] = value4;
}
MO.FFloatStream_writeColor4 = function FFloatStream_writeColor4(value){
   this.writeFloat4(value.red, value.green, value.blue, value.alpha);
}
MO.FFloatStream_reset = function FFloatStream_reset(){
   this._position = 0;
}
MO.FFloatStream_clear = function FFloatStream_clear(){
   this._position = 0;
}
MO.FFloatStream_dispose = function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FGraphicContext = function FGraphicContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._hCanvas   = null;
   o.linkCanvas = MO.RMethod.virtual(o, 'linkCanvas');
   o.dispose    = MO.FGraphicContext_dispose;
   return o;
}
MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
MO.SBorder = function SBorder(){
   var o = this;
   o.valid    = false;
   o.left     = new MO.SBorderLine();
   o.top      = new MO.SBorderLine();
   o.right    = new MO.SBorderLine();
   o.bottom   = new MO.SBorderLine();
   o.parse    = MO.SBorder_parse;
   o.toString = MO.SBorder_toString;
   o.dispose  = MO.SBorder_dispose;
   return o;
}
MO.SBorder_parse = function SBorder_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 4){
      o.left.parse(items[0]);
      o.top.parse(items[1]);
      o.right.parse(items[2]);
      o.bottom.parse(items[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorder_toString = function SBorder_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
MO.SBorder_dispose = function SBorder_dispose(){
   var o = this;
   o.left = MO.RObject.dispose(o.left)
   o.top = MO.RObject.dispose(o.top)
   o.right = MO.RObject.dispose(o.right)
   o.bottom = MO.RObject.dispose(o.bottom)
}
MO.SBorderLine = function SBorderLine(width, style, color){
   var o = this;
   o.width    = MO.Runtime.nvl(width, 1);
   o.style    = MO.Runtime.nvl(style, 'solid');
   o.color    = MO.Runtime.nvl(color, '#FFFFFF');
   o.parse    = MO.SBorderLine_parse;
   o.toString = MO.SBorderLine_toString;
   o.dispose  = MO.SBorderLine_dispose;
   return o;
}
MO.SBorderLine_parse = function SBorderLine_parse(source){
   var o = this;
   var items = source.split(' ')
   if(items.length == 3){
      o.width = parseInt(items[0]);
      o.style = items[1];
      o.color = items[2];
   }else{
      throw new TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorderLine_toString = function SBorderLine_toString(){
   var o = this;
   return o.width + ' ' + o.style + ' ' + o.color;
}
MO.SBorderLine_dispose = function SBorderLine_dispose(){
   var o = this;
   o.width = null;
   o.style = null;
   o.color = null;
}
MO.FG2dObject = function FG2dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG2dObject_setup;
   o.dispose = MO.FG2dObject_dispose;
   return o;
}
MO.FG2dObject_setup = function FG2dObject_setup(){
}
MO.FG2dObject_dispose = function FG2dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FG2dContext = function FG2dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      o._size      = null;
      o.construct  = FG2dContext_construct;
      o.linkCanvas = FG2dContext_linkCanvas;
      o.size       = FG2dContext_size;
      o.dispose    = FG2dContext_dispose;
      return o;
   }
   MO.FG2dContext_construct = function FG2dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }
   MO.FG2dContext_size = function FG2dContext_size(){
      return this._size;
   }
   MO.FG2dContext_dispose = function FG2dContext_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o.__base.FGraphicContext.dispose.call(o);
   }
}
with (MO) {
   MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
      o = RClass.inherits(this, o, FG2dContext);
      o._handle        = null;
      o.construct      = FG2dCanvasContext_construct;
      o.linkCanvas     = FG2dCanvasContext_linkCanvas;
      o.setFont        = FG2dCanvasContext_setFont;
      o.clear          = FG2dCanvasContext_clear;
      o.textWidth      = FG2dCanvasContext_textWidth;
      o.drawLine       = FG2dCanvasContext_drawLine;
      o.drawRectangle  = FG2dCanvasContext_drawRectangle;
      o.drawTriangle   = FG2dCanvasContext_drawTriangle;
      o.drawCircle     = FG2dCanvasContext_drawCircle;
      o.drawText       = FG2dCanvasContext_drawText;
      o.drawImage      = FG2dCanvasContext_drawImage;
      o.drawBorderLine = FG2dCanvasContext_drawBorderLine;
      o.drawBorder     = FG2dCanvasContext_drawBorder;
      o.drawGridImage  = FG2dCanvasContext_drawGridImage;
      o.fillRectangle  = FG2dCanvasContext_fillRectangle;
      o.toBytes        = FG2dCanvasContext_toBytes;
      return o;
   }
   MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct() {
      var o = this;
      o.__base.FG2dContext.construct.call(o);
   }
   MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
      var o = this;
      o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
      if (hCanvas.getContext) {
         var handle = hCanvas.getContext('2d');
         if (!handle) {
            throw new TError(o, "Current browser can't support Context2D technique.");
         }
         o._handle = handle;
      }
      o._hCanvas = hCanvas;
   }
   MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
      this._handle.font = font;
   }
   MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(){
      var o = this;
      var size = o._size;
      o._handle.clearRect(0, 0, size.width, size.height);
   }
   MO.FG2dCanvasContext_textWidth = function FG2dCanvasContext_textWidth(text){
      var info = this._handle.measureText(text);
      return info.width;
   }
   MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth) {
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.moveTo(x1, y1);
      handle.lineTo(x2, y2);
      handle.stroke();
   }
   MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth) {
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.strokeRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color) {
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillText(text, x, y);
   }
   MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y, width, height){
      var o = this;
      var handle = o._handle;
      var size = o._size;
      var data = null
      if (content.tagName == 'IMG') {
         data = content;
      } else if (RClass.isClass(content, FImage)) {
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }
      handle.drawImage(data, x, y, width, height);
   }
   MO.FG2dCanvasContext_drawImageRectangle = function FG2dCanvasContext_drawImageRectangle(content, rectangle){
      return this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   }
   MO.FG2dCanvasContext_drawBorderLine = function FG2dCanvasContext_drawBorderLine(x1, y1, x2, y2, borderLine){
      var o = this;
      var handle = o._handle;
      handle.beginPath();
      handle.strokeStyle = borderLine.color;
      handle.lineWidth = borderLine.width;
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
      handle.closePath();
      handle.stroke();
   }
   MO.FG2dCanvasContext_drawBorder = function FG2dCanvasContext_drawBorder(rectangle, border) {
      var o = this;
      var left = rectangle.left;
      var top = rectangle.top;
      var right = rectangle.left + rectangle.width - 1;
      var bottom = rectangle.top + rectangle.height - 1;
      o.drawBorderLine(left, bottom, left, top, border.left);
      o.drawBorderLine(left - 0.5, top, right + 0.5, top, border.top);
      o.drawBorderLine(right, top, right, bottom, border.right);
      o.drawBorderLine(left - 0.5, bottom, right + 0.5, bottom, border.bottom);
   }
   MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
      var o = this;
      var handle = o._handle;
      var data = null
      if (RClass.isClass(content, FImage)) {
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }
      var ssize = content.size();
      var sx = new Array();
      sx[0] = 0;
      sx[1] = padding.left;
      sx[2] = ssize.width - padding.right;
      var sy = new Array();
      sy[0] = 0;
      sy[1] = padding.top;
      sy[2] = ssize.height - padding.bottom;
      var dx = new Array();
      dx[0] = x;
      dx[1] = x + padding.left;
      dx[2] = x + width - padding.right;
      var dy = new Array();
      dy[0] = y;
      dy[1] = y + padding.top;
      dy[2] = y + height - padding.bottom;
      var sw = new Array();
      sw[0] = padding.left;
      sw[1] = ssize.width - padding.left - padding.right;
      sw[2] = padding.right;
      var sh = new Array();
      sh[0] = padding.top;
      sh[1] = ssize.height - padding.top - padding.bottom;
      sh[2] = padding.bottom;
      var dw = new Array();
      dw[0] = padding.left;
      dw[1] = width - padding.left - padding.right;
      dw[2] = padding.right;
      var dh = new Array();
      dh[0] = padding.top;
      dh[1] = height - padding.top - padding.bottom;
      dh[2] = padding.bottom;
      for (var i = 0; i < 9; i++) {
         var row = parseInt(i / 3);
         var column = i % 3;
         if (dh[row] > 0 && dw[column] > 0) {
            handle.drawImage(data, sx[column], sy[row], sw[column], sh[row], dx[column], dy[row], dw[column], dh[row]);
         }
      }
   }
   MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color) {
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_drawTriangle = function FG2dCanvasContext_drawTriangle(x1, y1, x2, y2, x3, y3, lineWidth, strokeColor, fillColor) {
      var o = this;
      var handle = o._handle;
      handle.lineWidth = lineWidth;
      handle.strokeStyle = strokeColor;
      handle.fillStyle = fillColor;
      handle.beginPath();
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
      handle.lineTo(x3 + 0.5, y3 + 0.5);
      handle.closePath();
      handle.fill();
   }
   MO.FG2dCanvasContext_drawCircle = function FG2dCanvasContext_drawCircle(x, y, radius, lineWidth, strokeColor, fillColor) {
      var o = this;
      var handle = o._handle;
      handle.beginPath();
      handle.lineWidth = lineWidth;
      handle.strokeStyle = strokeColor;
      handle.fillStyle = fillColor;
      handle.arc(x, y, radius, 0, 2 * Math.PI, false);
      handle.fill();
      handle.stroke();
   }
   MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
      var o = this;
      var size = o._size;
      return o._handle.getImageData(0, 0, size.width, size.height);
   }
}
MO.EG3dMaterialMap = new function EG3dMaterialMap(){
   var o = this;
   o.AmbientColor = 0;
   o.DiffuseColor = 1;
   o.SpecularColor = 2;
   o.ReflectColor = 3;
   o.EmissiveColor = 4;
   o.Count = 8;
   return o;
}
MO.EG3dRegionParameter = new function EG3dRegionParameter(){
   var o = this;
   o.Unknown                    = 0;
   o.CameraPosition             = 1;
   o.CameraDirection            = 2;
   o.CameraViewMatrix           = 3;
   o.CameraProjectionMatrix     = 4;
   o.CameraViewProjectionMatrix = 5;
   o.LightPosition              = 6;
   o.LightDirection             = 7;
   o.LightViewMatrix            = 8;
   o.LightProjectionMatrix      = 9;
   o.LightViewProjectionMatrix  = 10;
   o.LightInfo                  = 11;
   return o;
}
MO.EG3dTechniqueMode = new function EG3dTechniqueMode(){
   var o = this;
   o.Color         = 'color';
   o.Ambient       = 'ambient';
   o.DiffuseLevel  = 'diffuse.level';
   o.DiffuseColor  = 'diffuse.color';
   o.SpecularLevel = 'specular.level';
   o.SpecularColor = 'specular.color';
   o.Reflect       = 'reflect';
   o.Emissive      = 'emissive';
   o.Result        = 'result';
   return o;
}
with(MO){
   MO.MG3dRegion = function MG3dRegion(o){
      o = RClass.inherits(this, o);
      o._changed                    = false;
      o._spaceName                  = RClass.register(o, new AGetter('_spaceName'));
      o._technique                  = RClass.register(o, new AGetSet('_technique'));
      o._techniquePass              = RClass.register(o, new AGetter('_techniquePass'));
      o._camera                     = RClass.register(o, new AGetter('_camera'));
      o._projection                 = null;
      o._directionalLight           = RClass.register(o, new AGetter('_directionalLight'));
      o._lights                     = RClass.register(o, new AGetter('_lights'));
      o._allRenderables             = RClass.register(o, new AGetter('_allRenderables'));
      o._renderables                = RClass.register(o, new AGetter('_renderables'));
      o._cameraPosition             = null;
      o._cameraDirection            = null;
      o._cameraViewMatrix           = null;
      o._cameraProjectionMatrix     = null;
      o._cameraViewProjectionMatrix = null;
      o._lightPosition              = null;
      o._lightDirection             = null;
      o._lightViewMatrix            = null;
      o._lightProjectionMatrix      = null;
      o._lightViewProjectionMatrix  = null;
      o._lightInfo                  = null;
      o.construct                   = MG3dRegion_construct;
      o.isChanged                   = MG3dRegion_isChanged;
      o.setTechniquePass            = MG3dRegion_setTechniquePass;
      o.pushRenderable              = MG3dRegion_pushRenderable;
      o.setup                       = MG3dRegion_setup;
      o.change                      = MG3dRegion_change;
      o.prepare                     = MG3dRegion_prepare;
      o.reset                       = MG3dRegion_reset;
      o.calculate                   = MG3dRegion_calculate;
      o.update                      = MG3dRegion_update;
      o.dispose                     = MG3dRegion_dispose;
      return o;
   }
   MO.MG3dRegion_construct = function MG3dRegion_construct(){
      var o = this;
      o._lights = new TObjects();
      o._renderables = new TObjects();
      o._allRenderables = new TObjects();
      o._cameraPosition = new SPoint3();
      o._cameraDirection = new SVector3();
      o._cameraViewMatrix = new SMatrix3d();
      o._cameraProjectionMatrix = new SMatrix3d();
      o._cameraViewProjectionMatrix = new SMatrix3d();
      o._lightPosition = new SPoint3();
      o._lightDirection = new SVector3();
      o._lightViewMatrix = new SMatrix3d();
      o._lightProjectionMatrix = new SMatrix3d();
      o._lightViewProjectionMatrix = new SMatrix3d();
      o._lightInfo = new SVector4();
   }
   MO.MG3dRegion_isChanged = function MG3dRegion_isChanged(){
      return this._changed;
   }
   MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
      var o = this;
      o._techniquePass = p;
      o._spaceName = p.fullCode();
      o._finish = f;
   }
   MO.MG3dRegion_pushRenderable = function MG3dRegion_pushRenderable(p){
      var o = this;
      o._renderables.push(p);
      o._allRenderables.push(p);
   }
   MO.MG3dRegion_setup = function MG3dRegion_setup(){
      var o = this;
   }
   MO.MG3dRegion_change = function MG3dRegion_change(){
      this._changed = true;
   }
   MO.MG3dRegion_prepare = function MG3dRegion_prepare(){
      var o = this;
      o._changed = false;
      var c = o._camera;
      var cp = c.projection();
      c.updateFrustum();
      o._cameraPosition.assign(c.position());
      o._cameraDirection.assign(c.direction());
      o._cameraViewMatrix.assign(c.matrix());
      o._cameraProjectionMatrix.assign(cp.matrix());
      o._cameraViewProjectionMatrix.assign(c.matrix());
      o._cameraViewProjectionMatrix.append(cp.matrix());
      var l = o._directionalLight;
      var lc = l.camera();
      var lcp = lc.position();
      var lp = lc.projection();
      o._lightPosition.assign(lc.position());
      o._lightDirection.assign(lc.direction());
      o._lightViewMatrix.assign(lc.matrix());
      o._lightProjectionMatrix.assign(lp.matrix());
      o._lightViewProjectionMatrix.assign(lc.matrix());
      o._lightViewProjectionMatrix.append(lp.matrix());
      o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
      o._allRenderables.clear();
   }
   MO.MG3dRegion_reset = function MG3dRegion_reset(){
      var o = this;
      o._renderables.clear();
   }
   MO.MG3dRegion_calculate = function MG3dRegion_calculate(p){
      var o = this;
      switch(p){
         case EG3dRegionParameter.CameraPosition:
            return o._cameraPosition;
         case EG3dRegionParameter.CameraDirection:
            return o._cameraDirection;
         case EG3dRegionParameter.CameraViewMatrix:
            return o._cameraViewMatrix;
         case EG3dRegionParameter.CameraProjectionMatrix:
            return o._cameraProjectionMatrix;
         case EG3dRegionParameter.CameraViewProjectionMatrix:
            return o._cameraViewProjectionMatrix;
         case EG3dRegionParameter.LightPosition:
            return o._lightPosition;
         case EG3dRegionParameter.LightDirection:
            return o._lightDirection;
         case EG3dRegionParameter.LightViewMatrix:
            return o._lightViewMatrix;
         case EG3dRegionParameter.LightProjectionMatrix:
            return o._lightProjectionMatrix;
         case EG3dRegionParameter.LightViewProjectionMatrix:
            return o._lightViewProjectionMatrix;
         case EG3dRegionParameter.LightInfo:
            return o._lightInfo;
      }
      throw new TError(o, 'Unknown parameter type. (type_cd={1})', p);
   }
   MO.MG3dRegion_update = function MG3dRegion_update(){
      var o = this;
      var renderables = o._renderables;
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.update(o);
      }
   }
   MO.MG3dRegion_dispose = function MG3dRegion_dispose(){
      var o = this;
      o._renderables = RObject.free(o._renderables);
      o._allRenderables = RObject.free(o._allRenderables);
   }
}
with(MO){
   MO.MG3dRenderable = function MG3dRenderable(o){
      o = RClass.inherits(this, o, MGraphicRenderable);
      o._optionMerge   = false;
      o._currentMatrix = RClass.register(o, new AGetter('_currentMatrix'));
      o._matrix        = RClass.register(o, new AGetter('_matrix'));
      o._material      = RClass.register(o, new AGetSet('_material'));
      o._activeInfo    = RClass.register(o, new AGetter('_activeInfo'));
      o._infos         = null;
      o.construct      = MG3dRenderable_construct;
      o.activeEffect   = MG3dRenderable_activeEffect;
      o.effectFind     = MG3dRenderable_effectFind;
      o.effectSet      = MG3dRenderable_effectSet;
      o.infos          = MG3dRenderable_infos;
      o.selectInfo     = MG3dRenderable_selectInfo;
      o.resetInfos     = MG3dRenderable_resetInfos;
      o.testVisible    = RMethod.emptyTrue;
      o.update         = RMethod.empty;
      o.dispose        = MG3dRenderable_dispose;
      return o;
   }
   MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
      var o = this;
      o._currentMatrix = new SMatrix3d();
      o._matrix = new SMatrix3d();
   }
   MO.MG3dRenderable_activeEffect = function MG3dRenderable_activeEffect(){
      var info = this._activeInfo;
      return info ? info.effect : null;
   }
   MO.MG3dRenderable_effectFind = function MG3dRenderable_effectFind(code){
      var o = this;
      var infos = o._infos;
      if(infos){
         var info = infos.get(code);
         if(info){
            return info.effect;
         }
      }
      return null;
   }
   MO.MG3dRenderable_effectSet = function MG3dRenderable_effectSet(code, effect){
      var o = this;
      var infos = o.infos();
      var info = infos.get(code);
      if(!info){
         info = new SG3dRenderableInfo();
         infos.set(code, info)
      }
      info.effect = effect;
   }
   MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
      var o = this;
      var infos = o._infos;
      if(!infos){
         infos = o._infos = new TDictionary();
      }
      return infos;
   }
   MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(code){
      var o = this;
      var infos = o.infos();
      var info = infos.get(code);
      if(!info){
         info = new SG3dRenderableInfo();
         infos.set(code, info)
      }
      o._activeInfo = info;
      return info;
   }
   MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
      var o = this;
      var infos = o._infos;
      if(infos){
         var count = infos.count();
         for(var i = 0; i < count; i++){
            var info = infos.at(i);
            info.reset();
         }
      }
   }
   MO.MG3dRenderable_dispose = function MG3dRenderable_dispose(){
      var o = this;
      o._currentMatrix = RObject.dispose(o._currentMatrix);
      o._matrix = RObject.dispose(o._matrix);
      o._material = RObject.dispose(o._material);
      o._activeInfo = null;
      o._infos = RObject.dispose(o._infos);
   }
}
with(MO){
   MO.SG3dEffectInfo = function SG3dEffectInfo(){
      var o = this;
      o.code                  = null;
      o.techniqueCode         = null;
      o.techniqueModeCode     = null;
      o.optionMerge           = null;
      o.mergeCount            = null;
      o.fillModeCd            = null;
      o.optionCullMode        = null;
      o.cullModeCd            = null;
      o.optionDepthTest       = null;
      o.depthModeCd           = null;
      o.optionDepthWrite      = null;
      o.optionBlendMode       = null;
      o.blendSourceMode       = null;
      o.blendTargetMode       = null;
      o.optionAlphaTest       = null;
      o.optionNormalInvert    = null;
      o.optionNormalCompress  = null;
      o.supportInstance       = null;
      o.vertexCount           = 0;
      o.vertexColor           = null;
      o.vertexCoord           = null;
      o.vertexNormal          = null;
      o.vertexNormalFull      = null;
      o.vertexSkeleton        = null;
      o.vertexBoneCount       = 0;
      o.fragmentAlpha         = null;
      o.fragmentBump          = null;
      o.fragmentAmbient       = null;
      o.fragmentDiffuse       = null;
      o.fragmentDiffuseView   = null;
      o.fragmentSpecularColor = null;
      o.fragmentSpecularLevel = null;
      o.fragmentSpecularView  = null;
      o.fragmentEnvironment   = null;
      o.fragmentLight         = null;
      o.fragmentReflect       = null;
      o.fragmentRefract       = null;
      o.fragmentEmissive      = null;
      o.fragmentHeight        = null;
      o.attributes            = new TArray();
      o.samplers              = new TArray();
      o.attributeContains     = SG3dEffectInfo_attributeContains;
      o.samplerContains       = SG3dEffectInfo_samplerContains;
      o.reset                 = SG3dEffectInfo_reset;
      o.reset();
      return o;
   }
   MO.SG3dEffectInfo_attributeContains = function SG3dEffectInfo_attributeContains(p){
      return this.attributes.contains(p);
   }
   MO.SG3dEffectInfo_samplerContains = function SG3dEffectInfo_samplerContains(p){
      return this.samplers.contains(p);
   }
   MO.SG3dEffectInfo_reset = function SG3dEffectInfo_reset(){
      var o = this;
      o.code = null;
      o.optionMerge = false;
      o.mergeCount = 0;
      o.fillModeCd = EG3dFillMode.Fill;
      o.optionCullMode = true;
      o.cullModeCd = EG3dCullMode.Front;
      o.optionDepthTest = true;
      o.depthModeCd = EG3dDepthMode.Less;
      o.optionDepthWrite = true;
      o.optionBlendMode = false;
      o.blendSourceMode = EG3dBlendMode.SourceAlpha;
      o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
      o.optionAlphaTest = false;
      o.optionNormalInvert = false;
      o.optionNormalCompress = true;
      o.supportInstance = false;
      o.vertexCount = 0;
      o.vertexColor = false;
      o.vertexCoord = false;
      o.vertexNormal = false;
      o.vertexNormalFull = false;
      o.vertexSkeleton = false;
      o.vertexBoneCount = 0;
      o.fragmentAlpha = false;
      o.fragmentBump = false;
      o.fragmentAmbient = false;
      o.fragmentDiffuse = false;
      o.fragmentDiffuseView = false;
      o.fragmentSpecularColor = false;
      o.fragmentSpecularLevel = false;
      o.fragmentSpecularView = false;
      o.fragmentEnvironment = false;
      o.fragmentLight = false;
      o.fragmentReflect = false;
      o.fragmentRefract = false;
      o.fragmentEmissive = false;
      o.fragmentHeight = false;
      o.attributes.clear();
      o.samplers.clear();
   }
}
with(MO){
   MO.SG3dMaterialInfo = function SG3dMaterialInfo(o){
      if(!o){o = this;}
      o.effectCode           = 'automatic';
      o.optionDepth          = null;
      o.optionDouble         = null;
      o.optionNormalInvert   = null;
      o.optionShadow         = null;
      o.optionShadowSelf     = null;
      o.optionAlpha          = null;
      o.alphaBase            = 1.0;
      o.alphaRate            = 1.0;
      o.alphaLevel           = 1.0;
      o.alphaMerge           = 1.0;
      o.optionColor          = null;
      o.colorMin             = 0.0;
      o.colorMax             = 1.0;
      o.colorBalance         = 0.5;
      o.colorRate            = 1.0;
      o.optionVertex         = null;
      o.vertexColor          = new SColor4();
      o.optionAmbient        = null;
      o.ambientColor         = new SColor4();
      o.ambientShadow        = 1.0;
      o.optionDiffuse        = null;
      o.diffuseColor         = new SColor4();
      o.diffuseShadow        = 1.0;
      o.optionDiffuseView    = null;
      o.diffuseViewColor     = new SColor4();
      o.diffuseViewShadow    = 1.0;
      o.optionSpecular       = null;
      o.specularColor        = new SColor4();
      o.specularBase         = 1.0;
      o.specularLevel        = 1.0;
      o.specularAverage      = 1.0;
      o.specularShadow       = 1.0;
      o.specularInfo         = null;
      o.optionSpecularView   = null;
      o.specularViewColor    = new SColor4();
      o.specularViewBase     = 1.0;
      o.specularViewRate     = 1.0;
      o.specularViewAverage  = 1.0;
      o.specularViewShadow   = 1.0;
      o.specularViewShadow   = null;
      o.optionReflect        = null;
      o.reflectColor         = new SColor4();
      o.reflectMerge         = 1.0;
      o.reflectShadow        = 1.0;
      o.optionRefract        = null;
      o.refractFrontColor    = new SColor4();
      o.refractBackColor     = new SColor4();
      o.optionOpacity        = null;
      o.opacityColor         = new SColor4();
      o.opacityRate          = 1.0;
      o.opacityAlpha         = 1.0;
      o.opacityDepth         = 1.0;
      o.opacityTransmittance = 1.0;
      o.optionEmissive       = null;
      o.emissiveColor        = new SColor4();
      o.assign               = SG3dMaterialInfo_assign;
      o.calculate            = SG3dMaterialInfo_calculate;
      o.reset                = SG3dMaterialInfo_reset;
      o.reset();
      return o;
   }
   MO.SG3dMaterialInfo_assign = function SG3dMaterialInfo_assign(info){
      var o = this;
      o.effectCode = info.effectCode;
      o.transformName = info.transformName;
      o.optionDepth = info.optionDepth;
      o.optionDouble = info.optionDouble;
      o.optionNormalInvert = info.optionNormalInvert;
      o.optionShadow = info.optionShadow;
      o.optionShadowSelf = info.optionShadowSelf;
      o.optionAlpha = info.optionAlpha;
      o.alphaBase = info.alphaBase;
      o.alphaRate = info.alphaRate;
      o.alphaLevel = info.alphaLevel;
      o.alphaMerge = info.alphaMerge;
      o.optionColor = info.optionColor;
      o.colorMin = info.colorMin;
      o.colorMax = info.colorMax;
      o.colorBalance = info.colorBalance;
      o.colorRate = info.colorRate;
      o.optionVertex = info.optionVertex;
      o.vertexColor.assign(info.vertexColor);
      o.optionAmbient = info.optionAmbient;
      o.ambientColor.assign(info.ambientColor);
      o.ambientShadow = info.ambientShadow;
      o.optionDiffuse = info.optionDiffuse;
      o.diffuseColor.assign(info.diffuseColor);
      o.diffuseShadow = info.diffuseShadow;
      o.optionDiffuseView = info.optionDiffuseView;
      o.diffuseViewColor.assign(info.diffuseViewColor);
      o.diffuseViewShadow = info.diffuseViewShadow;
      o.optionSpecular = info.optionSpecular;
      o.specularColor.assign(info.specularColor);
      o.specularBase = info.specularBase;
      o.specularLevel = info.specularLevel;
      o.specularAverage = info.specularAverage;
      o.specularShadow = info.specularShadow;
      o.optionSpecularView = info.optionSpecularView;
      o.specularViewColor.assign(info.specularViewColor);
      o.specularViewBase = info.specularViewBase;
      o.specularViewRate = info.specularViewRate;
      o.specularViewAverage = info.specularViewAverage;
      o.specularViewShadow = info.specularViewShadow;
      o.optionReflect = info.optionReflect;
      o.reflectColor.assign(info.reflectColor);
      o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
      o.reflectShadow = info.reflectShadow;
      o.optionRefract = info.optionRefract;
      o.refractFrontColor.assign(info.refractFrontColor);
      o.refractFrontMerge = info.refractFrontMerge;
      o.refractFrontShadow = info.refractFrontShadow;
      o.refractBackColor.assign(info.refractBackColor);
      o.refractBackMerge = info.refractBackMerge;
      o.refractBackShadow = info.refractBackShadow;
      o.optionOpacity = info.optionOpacity;
      o.opacityColor.assign(info.opacityColor);
      o.opacityRate = info.opacityRate;
      o.opacityAlpha = info.optionAlpha;
      o.opacityDepth = info.optionDepth;
      o.opacityTransmittance = info.optionTransmittance;
      o.optionEmissive = info.optionEmissive;
      o.emissiveColor.assign(info.emissiveColor);
   }
   MO.SG3dMaterialInfo_calculate = function SG3dMaterialInfo_calculate(info){
      var o = this;
      o.effectCode = info.effectCode;
      o.transformName = info.transformName;
      o.optionDepth = info.optionDepth;
      o.optionDouble = info.optionDouble;
      o.optionNormalInvert = info.optionNormalInvert;
      o.optionShadow = info.optionShadow;
      o.optionShadowSelf = info.optionShadowSelf;
      o.optionAlpha = info.optionAlpha;
      o.alphaBase = info.alphaBase;
      o.alphaRate = info.alphaRate;
      o.alphaLevel = info.alphaLevel;
      o.alphaMerge = info.alphaMerge;
      o.optionColor = info.optionColor;
      o.colorMin = info.colorMin;
      o.colorMax = info.colorMax;
      o.colorBalance = info.colorBalance;
      o.colorRate = info.colorRate;
      o.optionVertex = info.optionVertex;
      o.vertexColor.assignPower(info.vertexColor);
      o.optionAmbient = info.optionAmbient;
      o.ambientColor.assignPower(info.ambientColor);
      o.ambientShadow = info.ambientShadow;
      o.optionDiffuse = info.optionDiffuse;
      o.diffuseColor.assignPower(info.diffuseColor);
      o.diffuseShadow = info.diffuseShadow;
      o.optionDiffuseView = info.optionDiffuseView;
      o.diffuseViewColor.assignPower(info.diffuseViewColor);
      o.diffuseViewShadow = info.diffuseViewShadow;
      o.optionSpecular = info.optionSpecular;
      o.specularColor.assignPower(info.specularColor);
      o.specularBase = info.specularBase;
      o.specularLevel = info.specularLevel;
      o.specularAverage = info.specularAverage;
      o.specularShadow = info.specularShadow;
      o.optionSpecularView = info.optionSpecularView;
      o.specularViewColor.assignPower(info.specularViewColor);
      o.specularViewBase = info.specularViewBase;
      o.specularViewRate = info.specularViewRate;
      o.specularViewAverage = info.specularViewAverage;
      o.specularViewShadow = info.specularViewShadow;
      o.optionReflect = info.optionReflect;
      o.reflectColor.assignPower(info.reflectColor);
      o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
      o.reflectShadow = info.reflectShadow;
      o.optionRefract = info.optionRefract;
      o.refractFrontColor.assignPower(info.refractFrontColor);
      o.refractFrontMerge = info.refractFrontMerge;
      o.refractFrontShadow = info.refractFrontShadow;
      o.refractBackColor.assignPower(info.refractBackColor);
      o.refractBackMerge = info.refractBackMerge;
      o.refractBackShadow = info.refractBackShadow;
      o.optionOpacity = info.optionOpacity;
      o.opacityColor.assignPower(info.opacityColor);
      o.opacityRate = info.opacityRate;
      o.opacityAlpha = info.optionAlpha;
      o.opacityDepth = info.optionDepth;
      o.opacityTransmittance = info.optionTransmittance;
      o.optionEmissive = info.optionEmissive;
      o.emissiveColor.assignPower(info.emissiveColor);
   }
   MO.SG3dMaterialInfo_reset = function SG3dMaterialInfo_reset(){
      var o = this;
      o.optionDepth = true;
      o.optionDouble = false;
      o.optionNormalInvert = false;
      o.optionShadow = true;
      o.optionShadowSelf = true;
      o.optionAlpha = false;
      o.alphaBase = 0.2;
      o.alphaRate = 1;
      o.alphaLevel = 1;
      o.alphaMerge = 1;
      o.optionColor = true;
      o.colorMin = 0;
      o.colorMax = 1;
      o.colorBalance = 0.5;
      o.colorRate = 1;
      o.optionVertex = true;
      o.vertexColor.set(1, 1, 1, 1);
      o.optionAmbient = true;
      o.ambientColor.set(0.5, 0.5, 0.5, 1);
      o.ambientShadow = 1;
      o.optionDiffuse = true;
      o.diffuseColor.set(0.5, 0.5, 0.5, 1);
      o.diffuseShadow = 1;
      o.optionDiffuseView = true;
      o.diffuseViewColor.set(1, 1, 1, 1);
      o.diffuseViewShadow = 1;
      o.optionSpecular = true;
      o.specularColor.set(0.5, 0.5, 0.5, 1);
      o.specularBase = 0;
      o.specularLevel = 16;
      o.specularAverage = 1;
      o.specularShadow = 1;
      o.optionSpecularView = true;
      o.specularViewColor.set(1, 1, 1, 1);
      o.specularViewBase = 0;
      o.specularViewRate = 16;
      o.specularViewAverage = 1;
      o.specularViewShadow = 1;
      o.optionReflect = true;
      o.reflectColor.set(1, 1, 1, 1);
      o.reflectMerge = 1;
      o.reflectShadow = 1;
      o.optionRefract = true;
      o.refractFrontColor.set(1, 1, 1, 1);
      o.refractFrontMerge = 1;
      o.refractFrontShadow = 1;
      o.refractBackColor.set(1, 1, 1, 1);
      o.refractBackMerge = 1;
      o.refractBackShadow = 1;
      o.optionOpacity = true;
      o.opacityColor.set(1, 1, 1, 1);
      o.opacityRate = 1;
      o.opacityAlpha = 1;
      o.opacityDepth = 1;
      o.opacityTransmittance = 1;
      o.optionEmissive = true;
      o.emissiveColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
      var o = this;
      o.effect   = null;
      o.layout   = null;
      o.material = null;
      o.reset    = SG3dRenderableInfo_reset;
      return o;
   }
   MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
      var o = this;
      o.effect = null;
      o.layout = RObject.dispose(o.layout);
   }
}
with(MO){
   MO.FG3dAnimation = function FG3dAnimation(o){
      o = RClass.inherits(this, o, FObject);
      o._baseTick    = 0;
      o._currentTick = 0;
      o._lastTick    = 0
      o._bones       = null;
      o.construct    = FG3dAnimation_construct;
      o.findBone     = FG3dAnimation_findBone;
      o.process      = FG3dAnimation_process;
      o.dispose      = FG3dAnimation_dispose;
      return o;
   }
   MO.FG3dAnimation_construct = function FG3dAnimation_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._bones = new TObjects();
   }
   MO.FG3dAnimation_findBone = function FG3dAnimation_findBone(p){
      var o = this;
      var bs = o._bones;
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         if(b.boneId() == p){
            return b;
         }
      }
      return null;
   }
   MO.FG3dAnimation_process = function FG3dAnimation_process(){
      var o = this;
      var t = RTimer.current();
      if(o._lastTick == 0){
         o._lastTick = t;
      }
      o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
      var bs = o._bones;
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         b.update(o._currentTick);
      }
      return true;
   }
   MO.FG3dAnimation_dispose = function FG3dAnimation_dispose(){
      var o = this;
      o._bones.dispose();
      o._bones = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = null;
      o._info       = RClass.register(o, new AGetter('_info'));
      o.construct   = FG3dBaseMaterial_construct;
      o.assignInfo  = FG3dBaseMaterial_assignInfo;
      o.assign      = FG3dBaseMaterial_assign;
      o.calculate   = FG3dBaseMaterial_calculate;
      return o;
   }
   MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._info = new SG3dMaterialInfo();
   }
   MO.FG3dBaseMaterial_assignInfo = function FG3dBaseMaterial_assignInfo(info){
      this._info.assign(info);
   }
   MO.FG3dBaseMaterial_assign = function FG3dBaseMaterial_assign(material){
      this._info.assign(material.info());
   }
   MO.FG3dBaseMaterial_calculate = function FG3dBaseMaterial_calculate(material){
      this._info.calculate(material.info());
   }
}
with(MO){
   MO.FG3dBone = function FG3dBone(o){
      o = RClass.inherits(this, o, FObject);
      o._boneId   = 0;
      o._modeId   = null;
      o.update    = FG3dBone_update;
      return o;
   }
   MO.FG3dBone_update = function FG3dBone_update(p){
   }
}
with(MO){
   MO.FG3dCamera = function FG3dCamera(o){
      o = RClass.inherits(this, o, FObject);
      o._matrix          = RClass.register(o, new AGetter('_matrix'));
      o._position        = RClass.register(o, new AGetter('_position'));
      o._target          = null;
      o._direction       = RClass.register(o, new AGetter('_direction'));
      o._directionTarget = null;
      o._centerFront     = 0.6;
      o._centerBack      = 1.0;
      o._focalNear       = 0.1;
      o._focalFar        = 200.0;
      o._frustum         = RClass.register(o, new AGetter('_frustum'));
      o._planes          = RClass.register(o, new AGetter('_planes'));
      o._viewport        = null;
      o.__axisUp         = null;
      o.__axisX          = null;
      o.__axisY          = null;
      o.__axisZ          = null;
      o.construct        = FG3dCamera_construct;
      o.setPosition      = FG3dCamera_setPosition;
      o.setDirection     = FG3dCamera_setDirection;
      o.doWalk           = FG3dCamera_doWalk;
      o.doStrafe         = FG3dCamera_doStrafe;
      o.doFly            = FG3dCamera_doFly;
      o.doPitch          = FG3dCamera_doPitch;
      o.doYaw            = FG3dCamera_doYaw;
      o.doRoll           = FG3dCamera_doRoll;
      o.lookAt           = FG3dCamera_lookAt;
      o.update           = FG3dCamera_update;
      o.updateFrustum    = FG3dCamera_updateFrustum;
      return o;
   }
   MO.FG3dCamera_construct = function FG3dCamera_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._position = new SPoint3();
      o._target = new SPoint3();
      o._direction = new SVector3();
      o._directionTarget = new SVector3();
      o._frustum = new SFrustum();
      o._planes = new SFrustumPlanes();
      o._viewport = RClass.create(FG3dViewport);
      o.__axisUp = new SVector3();
      o.__axisUp.set(0, 1, 0);
      o.__axisX = new SVector3();
      o.__axisY = new SVector3();
      o.__axisZ = new SVector3();
   }
   MO.FG3dCamera_setPosition = function FG3dCamera_setPosition(x, y, z){
      this._position.set(x, y, z);
   }
   MO.FG3dCamera_setDirection = function FG3dCamera_setDirection(x, y, z){
      var o = this;
      o._direction.set(x, y, z);
      o._directionTarget.set(x, y, z);
   }
   MO.FG3dCamera_doWalk = function FG3dCamera_doWalk(p){
      var o = this;
      o._position.x += o._direction.x * p;
      o._position.z += o._direction.z * p;
   }
   MO.FG3dCamera_doStrafe = function FG3dCamera_doStrafe(p){
      var o = this;
      o._position.x += o.__axisY.x * p;
      o._position.z += o.__axisY.z * p;
   }
   MO.FG3dCamera_doFly = function FG3dCamera_doFly(p){
      var o = this;
      o._position.y += p;
   }
   MO.FG3dCamera_doPitch = function FG3dCamera_doPitch(p){
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_doYaw = function FG3dCamera_doYaw(p){
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_doRoll = function FG3dCamera_doRoll(p){
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_lookAt = function FG3dCamera_lookAt(x, y, z){
      var o = this;
      var p = o._position;
      var d = o._direction;
      o._target.set(x, y, z);
      d.set(x - p.x, y - p.y, z - p.z);
      d.normalize();
      o._directionTarget.assign(d);
   }
   MO.FG3dCamera_update = function FG3dCamera_update(){
      var o = this;
      var ax = o.__axisX;
      var ay = o.__axisY;
      var az = o.__axisZ;
      az.assign(o._direction);
      az.normalize();
      o.__axisUp.cross2(ax, az);
      ax.normalize();
      az.cross2(ay, ax);
      ay.normalize();
      var d = o._matrix.data();
      d[ 0] = ax.x;
      d[ 1] = ay.x;
      d[ 2] = az.x;
      d[ 3] = 0.0;
      d[ 4] = ax.y;
      d[ 5] = ay.y;
      d[ 6] = az.y;
      d[ 7] = 0.0;
      d[ 8] = ax.z;
      d[ 9] = ay.z;
      d[10] = az.z;
      d[11] = 0.0;
      d[12] = -ax.dotPoint3(o._position);
      d[13] = -ay.dotPoint3(o._position);
      d[14] = -az.dotPoint3(o._position);
      d[15] = 1.0;
   }
   MO.FG3dCamera_updateFrustum = function FG3dCamera_updateFrustum(){
      var o = this;
      var m = RMath.matrix;
      m.assign(o._matrix);
      m.append(o._projection.matrix());
      o._planes.updateVision(m.data());
   }
}
with(MO){
   MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
      o = RClass.inherits(this, o, FG3dLight);
      o._camera    = RClass.register(o, new AGetter('_camera'));
      o._viewport  = RClass.register(o, new AGetter('_viewport'));
      o._direction = RClass.register(o, new AGetter('_direction'));
      o.construct  = FG3dDirectionalLight_construct;
      o.dispose    = FG3dDirectionalLight_dispose;
      return o;
   }
   MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dLight.construct.call(o);
      o._camera = RClass.create(FG3dPerspectiveCamera);
      o._direction = new SVector3();
   }
   MO.FG3dDirectionalLight_dispose = function FG3dDirectionalLight_dispose(){
      var o = this;
      o._camera = RObject.dispose(o._camera);
      o.__base.FG3dLight.dispose.call(o);
   }
}
with(MO){
   MO.FG3dEffect = function FG3dEffect(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._ready              = null;
      o._code               = RClass.register(o, new AGetter('_code'));
      o._stateFillCd        = EG3dFillMode.Face;
      o._stateCullCd        = EG3dCullMode.Front;
      o._stateDepth         = true;
      o._stateDepthCd       = EG3dDepthMode.LessEqual;
      o._stateDepthWrite    = true;
      o._stateBlend         = true;
      o._stateBlendSourceCd = EG3dBlendMode.SourceAlpha;
      o._stateBlendTargetCd = EG3dBlendMode.OneMinusSourceAlpha;
      o._stateAlphaTest     = false;
      o._optionShadow       = false;
      o._optionLightMap     = false;
      o._optionFog          = false;
      o._program            = RClass.register(o, new AGetter('_program'));
      o._vertexTemplate     = null;
      o._fragmentTemplate   = null;
      o.setup               = RMethod.empty;
      o.testReady           = FG3dEffect_testReady;
      o.setParameter        = FG3dEffect_setParameter;
      o.setSampler          = FG3dEffect_setSampler;
      o.drawRenderable      = FG3dEffect_drawRenderable;
      o.drawRenderables     = FG3dEffect_drawRenderables;
      o.drawGroup           = FG3dEffect_drawGroup;
      o.drawRegion          = FG3dEffect_drawRegion;
      o.buildInfo           = FG3dEffect_buildInfo;
      o.loadConfig          = FG3dEffect_loadConfig;
      o.load                = FG3dEffect_load;
      o.build               = FG3dEffect_build;
      return o;
   }
   MO.FG3dEffect_testReady = function FG3dEffect_testReady(){
      return this._ready;
   }
   MO.FG3dEffect_setParameter = function FG3dEffect_setParameter(name, value, count){
      this._program.setParameter(name, value, count);
   }
   MO.FG3dEffect_setSampler = function FG3dEffect_setSampler(name, texture){
      this._program.setSampler(name, texture);
   }
   MO.FG3dEffect_buildInfo = function FG3dEffect_buildInfo(tagContext, effectInfo){
   }
   MO.FG3dEffect_drawRenderable = function FG3dEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      if(program.hasAttribute()){
         var attributes = program.attributes();
         var attributeCount = attributes.count();
         for(var i = 0; i < attributeCount; i++){
            var attribute = attributes.value(i);
            if(attribute._statusUsed){
               var linker = attribute._linker;
               var vertexBuffer = renderable.findVertexBuffer(linker);
               if(!vertexBuffer){
                  throw new TError("Can't find renderable vertex buffer. (linker={1})", linker);
               }
               program.setAttribute(attribute._name, vertexBuffer, vertexBuffer._formatCd);
            }
         }
      }
      var indexBuffer = renderable.indexBuffer();
      context.drawTriangles(indexBuffer, 0, indexBuffer.count());
   }
   MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(region, renderables, offset, count){
      var o = this;
      o._graphicContext.setProgram(o._program);
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(offset + i);
         o.drawRenderable(region, renderable);
      }
   }
   MO.FG3dEffect_drawGroup = function FG3dEffect_drawGroup(region, renderables, offset, count){
      this.drawRenderables(region, renderables, offset, count);
   }
   MO.FG3dEffect_drawRegion = function FG3dEffect_drawRegion(region, offset, count){
      var o = this;
      var renderabels = region.renderables();
      for(var n = 0; n < count; ){
         var groupBegin = n;
         var groupEnd = count;
         var groupRenderable = renderabels.at(offset + groupBegin);
         var groupMaterial = groupRenderable.materialReference();
         for(var i = n; i < count; i++){
            var renderable = renderabels.at(offset + i);
            var material = renderable.materialReference();
            if(groupMaterial != material){
               groupEnd = i;
               break;
            }
            n++;
         }
         o.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
      }
   }
   MO.FG3dEffect_loadConfig = function FG3dEffect_loadConfig(xconfig){
      var o = this;
      var context = o._graphicContext;
      var program = o._program = context.createProgram();
      var xnodes = xconfig.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.get(i);
         if(xnode.isName('State')){
            var name = xnode.get('name');
            var value = xnode.get('value');
            if(name == 'fill_mode'){
               o._stateFillCd = REnum.parse(EG3dFillMode, value);
            }else if(name == 'cull_mode'){
               o._stateCullCd = REnum.parse(EG3dCullMode, value);
            }else if(name == 'depth_mode'){
               o._stateDepth = true;
               o._stateDepthCd = REnum.parse(EG3dDepthMode, value);
            }else if(name == 'depth_write'){
               o._stateDepthWrite = RBoolean.parse(value);
            }else if(name == 'blend_mode'){
               o._stateBlend = RBoolean.parse(value);
               if(o._stateBlend){
                  o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, xnode.get('source'));
                  o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, xnode.get('target'));
               }
            }else if(name == 'alpha_test'){
               o._stateAlphaTest = RBoolean.parse(value);
            }
         }else if(xnode.isName('Option')){
            var name = xnode.get('name');
            var value = xnode.get('value');
            if(name == 'shadow'){
               o._optionShadow = RBoolean.parse(value);
            }else if(name == 'lightmap'){
               o._optionLightMap = RBoolean.parse(value);
            }else if(name == 'fog'){
               o._optionFog = RBoolean.parse(value);
            }
         }else if(xnode.isName('Parameter')){
            var parameter = RClass.create(FG3dProgramParameter);
            parameter.loadConfig(xnode);
            program.parameters().set(parameter.name(), parameter);
         }else if(xnode.isName('Attribute')){
            var attribute = RClass.create(FG3dProgramAttribute);
            attribute.loadConfig(xnode);
            program.attributes().set(attribute.name(), attribute);
         }else if(xnode.isName('Sampler')){
            var sampler = RClass.create(FG3dProgramSampler);
            sampler.loadConfig(xnode);
            program.samplers().set(sampler.name(), sampler);
         }else if(xnode.isName('Source')){
            var name = xnode.get('name');
            if(name == 'vertex'){
               o._vertexSource = xnode.value();
            }else if(name == 'fragment'){
               o._fragmentSource = xnode.value();
            }else{
               throw new TError(o, 'Unknown source type. (name={1})', name);
            }
         }else{
            throw new TError(o, 'Unknown config type. (name={1})', xnode.name());
         }
      }
      var vertexTemplate = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
      vertexTemplate.load(o._vertexSource);
      var fragmentTemplate = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
      fragmentTemplate.load(o._fragmentSource);
   }
   MO.FG3dEffect_build = function FG3dEffect_build(p){
      var o = this;
      var program = o._program;
      var parameters = program.parameters();
      var parameterCount = parameters.count();
      var tagContext = RInstance.get(FTagContext);
      o.buildInfo(tagContext, p);
      var source = o._vertexTemplate.parse(tagContext);
      var formatSource = RString.formatLines(source);
      program.upload(EG3dShader.Vertex, formatSource);
      var source = o._fragmentTemplate.parse(tagContext);
      for(var i = 0; i < parameterCount; i++){
         var parameter = parameters.at(i);
         var parameterName = parameter.name();
         var parameterDefine = parameter.define();
         if(parameterDefine){
            source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
         }
      }
      var formatSource = RString.formatLines(source);
      program.upload(EG3dShader.Fragment, formatSource);
      program.build();
      program.link();
   }
   MO.FG3dEffect_load = function FG3dEffect_load(){
      var o = this;
      var xconfig = RConsole.find(FG3dEffectConsole).loadConfig(o._code);
      o.loadConfig(xconfig);
   }
}
with(MO){
   MO.FG3dEffectConsole = function FG3dEffectConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd         = EScope.Local;
      o._configs         = null;
      o._loadEffects     = null;
      o._registerEffects = null;
      o._templateEffects = null;
      o._effects         = null;
      o._path            = RClass.register(o, AGetter('_path'), "/ars/shader/");
      o._effectInfo      = null;
      o._tagContext      = null;
      o._thread          = null;
      o._interval        = 300;
      o.onProcess        = FG3dEffectConsole_onProcess;
      o.construct        = FG3dEffectConsole_construct;
      o.register         = FG3dEffectConsole_register;
      o.unregister       = FG3dEffectConsole_unregister;
      o.create           = FG3dEffectConsole_create;
      o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
      o.findTemplate     = FG3dEffectConsole_findTemplate;
      o.find             = FG3dEffectConsole_find;
      o.loadConfig       = FG3dEffectConsole_loadConfig;
      return o;
   }
   MO.FG3dEffectConsole_onProcess = function FG3dEffectConsole_onProcess(){
      var o = this;
      var effects = o._loadEffects;
      effects.record();
      while(effects.next()){
         var effect = effects.current();
         if(effect.processLoad()){
            effects.removeCurrent();
         }
      }
   }
   MO.FG3dEffectConsole_construct = function FG3dEffectConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._configs = new TDictionary();
      o._loadEffects = new TLooper();
      o._registerEffects = new TDictionary();
      o._templateEffects = new TDictionary();
      o._effects = new TDictionary();
      o._effectInfo = new SG3dEffectInfo();
      o._tagContext = RClass.create(FTagContext);
   }
   MO.FG3dEffectConsole_register = function FG3dEffectConsole_register(n, e){
      this._registerEffects.set(n, e);
   }
   MO.FG3dEffectConsole_unregister = function FG3dEffectConsole_unregister(n){
      this._registerEffects.set(n, null);
   }
   MO.FG3dEffectConsole_create = function FG3dEffectConsole_create(c, p){
      var o = this;
      var t = o._registerEffects.get(p);
      if(!t){
         throw new TError(this, 'Unknown effect type name. (type={1})', t);
      }
      var e = RClass.create(t);
      e.linkGraphicContext(c);
      e.setup();
      return e;
   }
   MO.FG3dEffectConsole_buildEffectInfo = function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
      var o = this;
      var capability = context.capability();
      var technique = region.technique();
      effectInfo.techniqueModeCode = technique.activeMode().code();
      effectInfo.optionMerge = renderable._optionMerge;
      if(effectInfo.optionMerge){
         effectInfo.mergeCount = renderable.mergeMaxCount();
      }
      var mi = renderable.material().info();
      effectInfo.optionNormalInvert = mi.optionNormalInvert;
      effectInfo.optionColor = mi.optionColor;
      effectInfo.optionAmbient = mi.optionAmbient;
      effectInfo.optionDiffuse = mi.optionDiffuse;
      effectInfo.optionSpecular = mi.optionSpecular;
      effectInfo.optionReflect = mi.optionReflect;
      effectInfo.optionRefract = mi.optionRefract;
      effectInfo.vertexCount = renderable.vertexCount();
      var vertexBuffers = renderable.vertexBuffers();
      var count = vertexBuffers.count();
      for(var i = 0; i < count; i++){
         var vertexBuffer = vertexBuffers.at(i);
         var vertexCode = vertexBuffer.code();
         if(vertexCode == 'normal'){
            var stride = vertexBuffer.stride();
            if(stride == 4){
               effectInfo.optionNormalCompress = true;
            }else{
               effectInfo.optionNormalCompress = false;
            }
         }
         if(RString.isEmpty(vertexCode)){
            throw new TError(o, 'Vertex buffer code is empty.');
         }
         effectInfo.attributes.push(vertexCode);
      }
      var textures = renderable.textures();
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var textureCode = textures.name(i);
            if(RString.isEmpty(textureCode)){
               throw new TError(o, 'Texture code is empty.');
            }
            effectInfo.samplers.push(textureCode);
         }
      }
      var bones = renderable.bones();
      if(bones){
         var boneCount = bones.count();
         effectInfo.vertexBoneCount = boneCount;
         var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
         if(boneCount > boneLimit){
            boneCount = boneLimit;
         }
         renderable._boneLimit = boneCount;
         effectInfo.vertexBoneLimit = boneCount;
      }
   }
   MO.FG3dEffectConsole_findTemplate = function FG3dEffectConsole_findTemplate(context, code){
      var o = this;
      var effects = o._templateEffects;
      var effect = effects.get(code);
      if(effect == null){
         var effect = o.create(context, code);
         effect.load();
         MO.Logger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
         effects.set(code, effect);
      }
      return effect;
   }
   MO.FG3dEffectConsole_find = function FG3dEffectConsole_find(context, region, renderable){
      var o = this;
      if(!RClass.isClass(context, FGraphicContext)){
         context = context.graphicContext();
      }
      if(!RClass.isClass(context, FGraphicContext)){
         throw new TError(o, 'Unknown context.');
      }
      var effectCode = renderable.material().info().effectCode;
      if(RString.isEmpty(effectCode)){
         effectCode = 'automatic'
      }
      if(effectCode == 'skeleton' || effectCode == 'skeleton.4'){
         if(renderable.bones() == null){
            effectCode = 'automatic'
         }
      }
      var effectFlag = region.spaceName() + '.' + effectCode;
      var effectTemplate = o.findTemplate(context, effectFlag);
      if(effectTemplate){
         var effectInfo = o._effectInfo;
         effectInfo.reset();
         o.buildEffectInfo(context, effectInfo, region, renderable);
         effectTemplate.buildInfo(o._tagContext, effectInfo);
         var flag = effectFlag + o._tagContext.code;
         var effects = o._effects;
         var effect = effects.get(flag);
         if(!effect){
            effect = o.create(context, effectFlag);
            effect._flag = flag;
            effect.load();
            effect.build(o._effectInfo);
            MO.Logger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
         }
         effects.set(flag, effect);
      }
      return effect;
   }
   MO.FG3dEffectConsole_loadConfig = function FG3dEffectConsole_loadConfig(p){
      var o = this;
      var x = o._configs.get(p);
      if(x){
         return x;
      }
      var u = RBrowser.contentPath(o._path + p + ".xml");
      if(MO.Runtime.isDebug()){
         u += '?' + RDate.format();
      }
      x = RClass.create(FXmlConnection).send(u);
      o._configs.set(p, x);
      return x;
   }
}
MO.FG3dLight = function FG3dLight(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
MO.FG3dLightMaterial = function FG3dLightMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   return o;
}
MO.FG3dMaterial = function FG3dMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   o._dirty    = true;
   o._textures = MO.Class.register(o, new MO.AGetter('_textures'))
   o.update    = MO.FG3dMaterial_update;
   return o;
}
MO.FG3dMaterial_update = function FG3dMaterial_update(){
   this._dirty = true;
}
with(MO){
   MO.FG3dMaterialMap = function FG3dMaterialMap(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._size      = RClass.register(o, new AGetter('_size'));
      o._data      = RClass.register(o, new AGetter('_data'));
      o._texture   = RClass.register(o, new AGetter('_texture'));
      o._stride    = null;
      o._dirty     = false;
      o.construct  = FG3dMaterialMap_construct;
      o.setup      = FG3dMaterialMap_setup;
      o.resize     = FG3dMaterialMap_resize;
      o.setUint8   = FG3dMaterialMap_setUint8;
      o.setUint16  = FG3dMaterialMap_setUint16;
      o.setUint32  = FG3dMaterialMap_setUint32;
      o.setFloat16 = FG3dMaterialMap_setFloat16;
      o.setFloat32 = FG3dMaterialMap_setFloat32;
      o.update     = FG3dMaterialMap_update;
      return o;
   }
   MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(width, height){
      var o = this;
      var c = o._graphicContext;
      var texture = o._texture = c.createFlatTexture();
      o.resize(width, height);
      texture.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
      texture.uploadData(o._data, width, height);
   }
   MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(width, height){
      var o = this;
      var s = o._size;
      if(height > 2048){
         height = 4096;
      }else if(height > 1024){
         height = 2048;
      }else if(height > 512){
         height = 1024;
      }else if(height > 256){
         height = 512;
      }else if(height > 128){
         height = 256;
      }else if(height > 64){
         height = 128;
      }else if(height > 32){
         height = 64;
      }else if(height > 16){
        height = 32;
      }
      if(height < s.height){
         height = s.height;
      }
      if((s.width == width) && (s.height == height)){
         return;
      }
      s.set(width, height);
      o._stride = 4 * width;
      var total = 4 * width * height;
      o._data = new Uint8Array(total);
   }
   MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      if(v1.constructor == SColor4){
         var v = v1.red * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
         var v = v1.green * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
         var v = v1.blue * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
         var v = v1.alpha * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
      }else{
         d[p++] = v1;
         d[p++] = v2;
         d[p++] = v3;
         d[p++] = v4;
      }
   }
   MO.FG3dMaterialMap_setUint16 = function FG3dMaterialMap_setUint16(n, i, v1, v2){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      d[p++] = (v1 >> 8) & 0xFF;
      d[p++] = v1 & 0xFF;
      d[p++] = (v2 >> 8) & 0xFF;
      d[p++] = v2 & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_setUint32 = function FG3dMaterialMap_setUint32(n, i, v){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      d[p++] = (v >> 24) & 0xFF;
      d[p++] = (v >> 16) & 0xFF;
      d[p++] = (v >> 8) & 0xFF;
      d[p++] = v & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_setFloat16 = function FG3dMaterialMap_setFloat16(n, i, v1, v2){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      var v = parseInt(v1 * 256);
      d[p++] = parseInt(v1) & 0xFF;
      d[p++] = parseInt(v1 * 256) & 0xFF;
      d[p++] = parseInt(v2) & 0xFF;
      d[p++] = parseInt(v2 * 256) & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_setFloat32 = function FG3dMaterialMap_setFloat32(n, i, v){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      d[p++] = parseInt(v * 0.00390625) & 0xFF;
      d[p++] = parseInt(v) & 0xFF;
      d[p++] = parseInt(v * 256) & 0xFF;
      d[p++] = parseInt(v * 65536) & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_update = function FG3dMaterialMap_update(){
      var o = this;
      if(o._dirty){
         var s = o._size;
         o._texture.uploadData(o._data, s.width, s.height);
         o._dirty = false;
      }
   }
}
MO.FG3dMaterialTexture = function FG3dMaterialTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dMaterial);
   o._texture = null;
   return o;
}
MO.FG3dObject = function FG3dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG3dObject_setup;
   o.dispose = MO.FG3dObject_dispose;
   return o;
}
MO.FG3dObject_setup = function FG3dObject_setup(){
}
MO.FG3dObject_dispose = function FG3dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FG3dOrthoCamera = function FG3dOrthoCamera(o){
      o = RClass.inherits(this, o, FG3dCamera);
      o._projection      = RClass.register(o, new AGetter('_projection'));
      o.construct        = FG3dOrthoCamera_construct;
      o.updateFrustum    = FG3dOrthoCamera_updateFrustum;
      o.updateFromCamera = FG3dOrthoCamera_updateFromCamera;
      o.updateFlatCamera = FG3dOrthoCamera_updateFlatCamera;
      return o;
   }
   MO.FG3dOrthoCamera_construct = function FG3dOrthoCamera_construct(){
      var o = this;
      o.__base.FG3dCamera.construct.call(o);
      o._projection = RClass.create(FG3dOrthoProjection);
   }
   MO.FG3dOrthoCamera_updateFrustum = function FG3dOrthoCamera_updateFrustum(){
      var o = this;
      o.__base.FG3dCamera.updateFrustum.call(o);
      var p = o._projection;
      var s = p._size;
      var f = o._frustum;
      f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
      return f;
   }
   MO.FG3dOrthoCamera_updateFromCamera = function FG3dOrthoCamera_updateFromCamera(p){
      var o = this;
      var pf = p.updateFrustum();
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * pf.radius;
      var vy = pf.center.y - d.y * pf.radius;
      var vz = pf.center.z - d.z * pf.radius;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      var f = o._frustum;
      o._matrix.transform(f.coners, pf.coners, 8);
      f.updateCenter();
      o._projection.updateFrustum(f);
   }
   MO.FG3dOrthoCamera_updateFlatCamera = function FG3dOrthoCamera_updateFlatCamera(p){
      var o = this;
      var f = o._frustum
      var pf = p.updateFlatFrustum();
      var angle = RConst.DEGREE_RATE * o._projection.angle();
      var distance = pf.radius / Math.sin(angle * 0.5);
      distance = Math.max(distance, p._projection._zfar);
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * distance;
      var vy = pf.center.y - d.y * distance;
      var vz = pf.center.z - d.z * distance;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      o._projection._znear = 0.3;
      o._projection._zfar = distance * 1.5;
      o._projection.update();
   }
}
with(MO){
   MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
      o = RClass.inherits(this, o, FG3dProjection);
      o._matrix       = RClass.register(o, new AGetter('_matrix'));
      o.construct     = FG3dOrthoProjection_construct;
      o.update        = FG3dOrthoProjection_update;
      o.updateFrustum = FG3dOrthoProjection_updateFrustum;
      return o;
   }
   MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
      var o = this;
      o.__base.FG3dProjection.construct.call(o);
      o._matrix = new SOrthoMatrix3d();
   }
   MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
      var o = this;
      var s = o._size;
      o._matrix.identity();
      var d = o._matrix.data();
      d[ 0] = 2.0 / s.width * 8.0;
      d[ 4] = d[ 8] = d[12] = 0.0;
      d[ 5] = 2.0 / s.height * 8.0;
      d[ 1] = d[ 9] = d[13] = 0.0;
      d[10] = 1.0 / (o._znear - o._zfar);
      d[ 2] = d[ 6] = d[14] = 0.0;
      d[ 3] = d[ 7] = 0.0;
      d[11] = o._znear / (o._znear - o._zfar);
      d[15] = 1.0;
   }
   MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(p){
      var o = this;
      o._znear = p.minZ;
      o._zfar = p.maxZ;
      o.update();
   }
}
with(MO){
   MO.FG3dPerspectiveCamera = function FG3dPerspectiveCamera(o){
      o = RClass.inherits(this, o, FG3dCamera);
      o._projection       = RClass.register(o, new AGetter('_projection'));
      o._centerFront      = 0.4;
      o.construct         = FG3dPerspectiveCamera_construct;
      o.updateFrustum     = FG3dPerspectiveCamera_updateFrustum;
      o.updateFlatFrustum = FG3dPerspectiveCamera_updateFlatFrustum;
      o.updateFromCamera  = FG3dPerspectiveCamera_updateFromCamera;
      o.updateFlatCamera  = FG3dPerspectiveCamera_updateFlatCamera;
      return o;
   }
   MO.FG3dPerspectiveCamera_construct = function FG3dPerspectiveCamera_construct(){
      var o = this;
      o.__base.FG3dCamera.construct.call(o);
      o._projection = RClass.create(FG3dPerspectiveProjection);
   }
   MO.FG3dPerspectiveCamera_updateFrustum = function FG3dPerspectiveCamera_updateFrustum(){
      var o = this;
      o.__base.FG3dCamera.updateFrustum.call(o);
      var p = o._projection;
      var s = p._size;
      var f = o._frustum;
      f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
      return f;
   }
   MO.FG3dPerspectiveCamera_updateFlatFrustum = function FG3dPerspectiveCamera_updateFlatFrustum(){
      var o = this;
      var p = o._projection;
      var s = p._size;
      var f = o._frustum;
      f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
      return f;
   }
   MO.FG3dPerspectiveCamera_updateFromCamera = function FG3dPerspectiveCamera_updateFromCamera(p){
      var o = this;
      var f = o._frustum;
      var pf = p.updateFrustum();
      var angle = RConst.DEGREE_RATE * o._projection.angle();
      var distance = pf.radius / Math.sin(angle * 0.5);
      distance = Math.max(distance, p._projection._zfar);
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * distance;
      var vy = pf.center.y - d.y * distance;
      var vz = pf.center.z - d.z * distance;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      o._matrix.transform(f.coners, 0, pf.coners, 0, 8);
      f.updateCenter();
      o._projection.updateFrustum(f);
   }
   MO.FG3dPerspectiveCamera_updateFlatCamera = function FG3dPerspectiveCamera_updateFlatCamera(p){
      var o = this;
      var f = o._frustum;
      var pf = p.updateFlatFrustum();
      var angle = RConst.DEGREE_RATE * o._projection.angle();
      var distance = pf.radius / Math.sin(angle * 0.5);
      distance = Math.max(distance, p._projection._zfar);
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * distance * o._centerFront;
      var vy = pf.center.y - d.y * distance * o._centerFront;
      var vz = pf.center.z - d.z * distance * o._centerFront;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      o._projection._znear = 0.1;
      o._projection._zfar = distance;
      o._projection.update();
   }
}
with(MO){
   MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
      o = RClass.inherits(this, o, FG3dProjection);
      o._matrix       = RClass.register(o, new AGetter('_matrix'));
      o.construct     = FG3dPerspectiveProjection_construct;
      o.update        = FG3dPerspectiveProjection_update;
      o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
      return o;
   }
   MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
      var o = this;
      o.__base.FG3dProjection.construct.call(o);
      o._matrix = new SPerspectiveMatrix3d();
   }
   MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
      var o = this;
      var s = o._size;
      o._fieldOfView = RConst.DEGREE_RATE * o._angle;
      o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
   }
   MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
      var o = this;
      o._znear = p.minZ;
      o._zfar = p.maxZ;
      o.update();
   }
}
MO.FG3dPointLight = function FG3dPointLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
with(MO){
   MO.FG3dProjection = function FG3dProjection(o){
      o = RClass.inherits(this, o, FObject);
      o._size        = RClass.register(o, new AGetter('_size'));
      o._angle       = RClass.register(o, new AGetSet('_angle'), 60.0);
      o._fieldOfView = RClass.register(o, new AGetSet('_fieldOfView'), 0);
      o._znear       = RClass.register(o, new AGetSet('_znear'), 0.1);
      o._zfar        = RClass.register(o, new AGetSet('_zfar'), 200.0);
      o._scale       = RClass.register(o, new AGetSet('_scale'), 0);
      o.construct   = FG3dProjection_construct;
      o.distance    = FG3dProjection_distance;
      return o;
   }
   MO.FG3dProjection_construct = function FG3dProjection_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG3dProjection_distance = function FG3dProjection_distance(){
      return this._zfar - this._znear;
   }
}
MO.FG3dShaderTemplate = function FG3dShaderTemplate(o){
   o = MO.Class.inherits(this, o, MO.FTagDocument);
   o._space  = 'shader';
   return o;
}
MO.FG3dSpotLight = function FG3dSpotLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
with(MO){
   MO.FG3dTechnique = function FG3dTechnique(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._code           = RClass.register(o, new AGetter('_code'));
      o._activeMode     = RClass.register(o, new AGetter('_activeMode'));
      o._modes          = RClass.register(o, new AGetter('_modes'));
      o._passes         = RClass.register(o, new AGetter('_passes'));
      o.construct       = FG3dTechnique_construct;
      o.registerMode    = FG3dTechnique_registerMode;
      o.selectMode      = FG3dTechnique_selectMode;
      o.updateRegion    = RMethod.empty;
      o.clear           = FG3dTechnique_clear;
      o.clearDepth      = FG3dTechnique_clearDepth;
      o.sortRenderables = FG3dTechnique_sortRenderables;
      o.drawRegion      = FG3dTechnique_drawRegion;
      o.present         = FG3dTechnique_present;
      return o;
   }
   MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
      o._modes = new TObjects();
      o._passes = new TObjects();
   }
   MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
      var o = this;
      var m = RClass.create(FG3dTechniqueMode);
      m.setCode(p);
      o._modes.push(m);
      o._activeMode = m;
      return m;
   }
   MO.FG3dTechnique_selectMode = function FG3dTechnique_selectMode(p){
      var o = this;
   }
   MO.FG3dTechnique_clear = function FG3dTechnique_clear(color){
      var o = this;
      var context = o._graphicContext;
      context.setRenderTarget(null);
      context.clear(color.red, color.green, color.blue, color.alpha, 1);
   }
   MO.FG3dTechnique_clearDepth = function FG3dTechnique_clearDepth(depth){
      var o = this;
      if(depth == null){
         depth = 1;
      }
      var context = o._graphicContext;
      context.clearDepth(depth);
   }
   MO.FG3dTechnique_sortRenderables = function FG3dTechnique_sortRenderables(a, b){
   }
   MO.FG3dTechnique_drawRegion = function FG3dTechnique_drawRegion(region){
      var o = this;
      region.setTechnique(o);
      var passes = o._passes;
      var count = passes.count();
      for(var i = 0; i < count; i++){
         var pass = passes.at(i);
         region.setTechniquePass(pass, (i == count - 1));
         pass.drawRegion(region);
      }
   }
   MO.FG3dTechnique_present = function FG3dTechnique_present(p){
      this._graphicContext.present();
   }
}
with(MO){
   MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._techniques = RClass.register(o, new AGetter('_techniques'));
      o.construct   = FG3dTechniqueConsole_construct;
      o.find        = FG3dTechniqueConsole_find;
      return o;
   }
   MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._techniques = new TDictionary();
   }
   MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
      var o = this;
      if(!RClass.isClass(context, FGraphicContext)){
         context = context.graphicContext();
      }
      if(!RClass.isClass(context, FGraphicContext)){
         throw new TError(o, 'Unknown context.');
      }
      var code = context.hashCode() + '|' + RClass.name(clazz);
      var techniques = o._techniques;
      var technique = techniques.get(code);
      if(!technique){
         technique = RClass.create(clazz);
         technique.linkGraphicContext(context);
         technique.setup();
         var techniqueCode = technique.code();
         var passes = technique.passes();
         var passCount = passes.count();
         for(var i = 0; i < passCount; i++){
            var pass = passes.at(i);
            var passCode = pass.code();
            pass.setFullCode(techniqueCode + '.' + passCode);
         }
         techniques.set(code, technique);
      }
      return technique;
   }
}
MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
with(MO){
   MO.FG3dTechniquePass = function FG3dTechniquePass(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._fullCode       = RClass.register(o, new AGetSet('_fullCode'));
      o._code           = RClass.register(o, new AGetter('_code'));
      o._index          = null;
      o._finish         = false;
      o._materialMap    = null;
      o.setup           = FG3dTechniquePass_setup;
      o.activeEffects   = FG3dTechniquePass_activeEffects;
      o.sortRenderables = FG3dTechniquePass_sortRenderables;
      o.drawRegion      = FG3dTechniquePass_drawRegion;
      return o;
   }
   MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
      var o = this;
      var map = o._materialMap = RClass.create(FG3dMaterialMap);
      map.linkGraphicContext(o);
      map.setup(EG3dMaterialMap.Count, 32);
   }
   MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(source, target){
      var sourceMaterial = source.material().info();
      var targetMaterial = target.material().info();
      if(sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
         var sourceEffect = source.activeEffect();
         var targetEffect = target.activeEffect();
         if(sourceEffect == targetEffect){
            var sourceReference = source.materialReference();
            var targetReference = target.materialReference();
            if(sourceReference && targetReference){
               return sourceReference.hashCode() - targetReference.hashCode();
            }
         }
         return sourceEffect.hashCode() - targetEffect.hashCode();
      }else if(sourceMaterial.optionAlpha && !targetMaterial.optionAlpha){
         return 1;
      }else if(!sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
         return -1;
      }else{
         var sourceEffect = source.activeEffect();
         var targetEffect = target.activeEffect();
         if(sourceEffect == targetEffect){
            var sourceReference = source.materialReference();
            var targetReference = target.materialReference();
            if(sourceReference && targetReference){
               return sourceReference.hashCode() - targetReference.hashCode();
            }
         }
         return sourceEffect.hashCode() - targetEffect.hashCode();
      }
   }
   MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(region, renderables){
      var o = this;
      var spaceName = region.spaceName();
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         var info = renderable.selectInfo(spaceName);
         if(!info.effect){
            info.effect = RConsole.find(FG3dEffectConsole).find(o._graphicContext, region, renderable);
         }
      }
   }
   MO.FG3dTechniquePass_drawRegion = function FG3dTechniquePass_drawRegion(region){
      var o = this;
      var renderables = region.renderables();
      var count = renderables.count();
      if(count == 0){
         return;
      }
      var statistics = region._statistics;
      statistics._frameDrawSort.begin();
      o.activeEffects(region, renderables);
      renderables.sort(o.sortRenderables);
      statistics._frameDrawSort.end();
      var capability = o._graphicContext.capability();
      if(capability.optionMaterialMap){
         var mm = o._materialMap;
         mm.resize(EG3dMaterialMap.Count, count);
         for(var i = 0; i < count; i++){
            var r = renderables.get(i);
            r._materialId = i;
            var m = r.material();
            var mi = m.info();
            mm.setUint8(i, EG3dMaterialMap.AmbientColor, mi.ambientColor);
            mm.setUint8(i, EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
            mm.setUint8(i, EG3dMaterialMap.SpecularColor, mi.specularColor);
            mm.setUint8(i, EG3dMaterialMap.ReflectColor, mi.reflectColor);
            mm.setUint8(i, EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
         }
         mm.update();
         region._materialMap = mm;
      }
      for(var n = 0; n < count; ){
         var groupBegin = n;
         var groupEnd = count;
         var effect = renderables.at(groupBegin).activeEffect();
         for(var i = n; i < count; i++){
            var activeEffect = renderables.at(i).activeEffect();
            if(effect != activeEffect){
               groupEnd = i;
               break;
            }
            n++;
         }
         effect.drawRegion(region, groupBegin, groupEnd - groupBegin);
      }
   }
}
with(MO){
   MO.FG3dTrack = function FG3dTrack(o){
      o = RClass.inherits(this, o, FObject);
      o._frames = null;
      o.construct = FG3dTrack_construct;
      o.calculate = FG3dTrack_calculate;
      return o;
   }
   MO.FG3dTrack_construct = function FG3dTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FG3dTrack_update = function FG3dTrack_update(p){
      var o = this;
      var info = new SG3dFrameInfo();
      o._trackResource.calculateFrameInfo(info, tick);
      info.update();
      o._matrix.assign(o._trackResource.matrixInvert());
      o._matrix.append(info.matrix);
      return true;
   }
   MO.FG3dTrack_calculate = function FG3dTrack_calculate(tick){
      var o = this;
      var frameCount = o._frames.count();
      if(frameCount == 0){
         return false;
      }
      if(tick < 0){
         tick = -tick;
      }
      var pCurrentFrame = o._frames.Get(index);
      var pNextFrame = null;
      if(index < frameCount -1){
         pNextFrame = o._frames.Get(index + 1);
      }else{
         pNextFrame = o._frames.Get(0);
      }
      info.tick = tick;
      info.currentFrame = pCurrentFrame;
      info.nextFrame = pNextFrame;
      return true;
   }
}
MO.FG3dViewport = function FG3dViewport(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = MO.FG3dViewport_set;
   return o;
}
MO.FG3dViewport_set = function FG3dViewport_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height= height;
}
with(MO){
   MO.REngine3d = function REngine3d(){
      var o = this;
      o._setuped  = false;
      o._contexts = null;
      return o;
   }
   MO.REngine3d.prototype.onUnload = function REngine3d_onUnload(event){
      this.dispose();
   }
   MO.REngine3d.prototype.setup = function REngine3d_setup(){
      var o = this;
      if(!o._setuped){
         o._contexts = new TObjects();
         RWindow.lsnsUnload.register(o, o.onUnload);
         o._setuped = true;
      }
   }
   MO.REngine3d.prototype.contexts = function REngine3d_contexts(){
      return this._contexts;
   }
   MO.REngine3d.prototype.createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
      var o = this;
      o.setup();
      var context = RClass.create(clazz);
      if(attributes){
         context._optionAlpha = attributes.alpha;
         context._optionAntialias = attributes.antialias;
      }
      context.linkCanvas(hCanvas);
      o._contexts.push(context);
      return context;
   }
   MO.REngine3d.prototype.dispose = function REngine3d_dispose(){
      var o = this;
      var contexts = o._contexts;
      if(contexts){
         var count = contexts.count();
         for(var i = 0; i < count; i++){
            var context = contexts.at(i);
            context.dispose();
         }
         o._contexts = RObject.dispose(contexts);
      }
   }
   MO.REngine3d = new REngine3d();
   MO.Engine3d = MO.REngine3d;
}
MO.EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
MO.EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
MO.EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.Zero             = 0;
   o.One              = 1;
   o.SrcColor         = 2;
   o.OneMinusSrcColor = 3;
   o.DstColor         = 4;
   o.OneMinusDstColor = 5;
   o.SrcAlpha         = 6;
   o.OneMinusSrcAlpha = 7;
   o.DstAlpha         = 8;
   o.OneMinusDstAlpha = 9;
   o.SrcAlphaSaturate = 10;
   return o;
}
MO.EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
MO.EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
MO.EG3dDrawMode = new function EG3dDrawMode(){
   var o = this;
   o.Unknown = 0;
   o.Points = 1;
   o.Lines = 2;
   o.LineStrip = 3;
   o.LineLoop = 4;
   o.Triangles = 5;
   o.TriangleStrip = 6;
   o.TriangleFan = 7;
   o.Quads = 8;
   o.QuadStrip = 9;
   return o;
}
MO.EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
MO.EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
MO.EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
MO.EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'diffuse';
   o.Alpha         = 'alpha';
   o.Normal        = 'normal';
   o.SpecularColor = 'specular.color';
   o.SpecularLevel = 'specular.level';
   o.Light         = 'light';
   o.Reflect       = 'reflect';
   o.Refract       = 'refract';
   o.Emissive      = 'emissive';
   o.Height        = 'height';
   o.Environment   = 'environment';
   return o;
}
MO.EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
MO.EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
MO.EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
MO.SG3dContextCapability = function SG3dContextCapability(){
   var o = this;
   o.vendor              = null;
   o.version             = null;
   o.shaderVersion       = null;
   o.optionDebug         = false;
   o.optionInstance      = false;
   o.optionLayout        = false;
   o.optionMaterialMap   = false;
   o.optionIndex32       = false;
   o.optionShaderSource  = false;
   o.mergeCount          = 0;
   o.attributeCount      = null;
   o.vertexCount         = 65536;
   o.vertexConst         = null;
   o.fragmentConst       = null;
   o.varyingCount        = null;
   o.samplerCount        = null;
   o.samplerSize         = null;
   o.samplerCompressRgb  = null;
   o.samplerCompressRgba = null;
   o.shader              = null;
   return o;
}
MO.SG3dContextCapability.prototype.calculateBoneCount = function SG3dContextCapability_calculateBoneCount(boneCount, vertexCount){
   var o = this;
   var rb = 0;
   var bi = boneCount % 4;
   if(bi != 0){
      rb = boneCount + 4 - bi;
   }else{
      rb = boneCount;
   }
   var r = 0;
   var ib = (o.vertexConst - 16) / 4;
   if(rb > ib){
      r = ib;
   }else{
      r = rb;
   }
   return r;
}
MO.SG3dContextCapability.prototype.calculateInstanceCount = function SG3dContextCapability_calculateInstanceCount(boneCount, vertexCount){
   var o = this;
   var cr = (4 * boneCount) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vertexCount > 0){
      var iv = o.vertexCount / vertexCount;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
MO.SG3dContextCapability.prototype.dispose = function SG3dContextCapability_dispose(){
   var o = this;
   o.shader = null;
   MO.RObject.free(o);
}
MO.SG3dLayoutBuffer = function SG3dLayoutBuffer(){
   var o = this;
   o.slot     = null;
   o.buffer   = null;
   o.index    = null;
   o.formatCd = null;
   o.dispose  = MO.SG3dLayoutBuffer_dispose;
   return o;
}
MO.SG3dLayoutBuffer_dispose = function SG3dLayoutBuffer_dispose(){
   var o = this;
   o.slot = null;
   o.buffer = null;
   o.index = null;
   o.formatCd = null;
}
MO.SG3dLayoutSampler = function SG3dLayoutSampler(){
   var o = this;
   o.slot    = null;
   o.index   = -1;
   o.texture = null;
   o.dispose = MO.SG3dLayoutSampler_dispose;
   return o;
}
MO.SG3dLayoutSampler_dispose = function SG3dLayoutSampler_dispose(){
   var o = this;
   o.slot = null;
   o.index = -1;
   o.texture = null;
}
MO.FG3dBuffer = function FG3dBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o.isValid = MO.Method.virtual(o, 'isValid');
   return o;
}
with(MO){
   MO.FG3dContext = function FG3dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      o._optionAlpha        = true;
      o._optionAntialias    = false;
      o._size               = RClass.register(o, new AGetter('_size'));
      o._logicSize          = RClass.register(o, new AGetter('_logicSize'));
      o._ratio              = RClass.register(o, new AGetSet('_ratio'));
      o._sizeRatio          = RClass.register(o, new AGetter('_sizeRatio'));
      o._capability         = RClass.register(o, new AGetter('_capability'));
      o._statistics         = RClass.register(o, new AGetter('_statistics'));
      o._fillModeCd         = EG3dFillMode.Face;
      o._optionDepth        = false;
      o._optionCull         = false;
      o._depthModeCd        = 0;
      o._cullModeCd         = 0;
      o._statusBlend        = false;
      o._blendSourceCd      = 0;
      o._blendTargetCd      = 0;
      o._program            = null;
      o._storePrograms      = null;
      o._storeLayouts       = null;
      o._storeBuffers       = null;
      o._storeTextures      = null;
      o._storeTargets       = null;
      o.construct           = FG3dContext_construct;
      o.linkCanvas          = FG3dContext_linkCanvas;
      o.createObject        = FG3dContext_createObject;
      o.createProgram       = RMethod.virtual(o, 'createProgram');
      o.createLayout        = RMethod.virtual(o, 'createLayout');
      o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
      o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
      o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
      o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
      o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
      o.setViewport         = RMethod.virtual(o, 'setViewport');
      o.setFillMode         = RMethod.virtual(o, 'setFillMode');
      o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
      o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
      o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
      o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
      o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
      o.setProgram          = RMethod.virtual(o, 'setProgram');
      o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
      o.bindTexture         = RMethod.virtual(o, 'bindTexture');
      o.prepare             = FG3dContext_prepare;
      o.clear               = RMethod.virtual(o, 'clear');
      o.clearColor          = RMethod.virtual(o, 'clearColor');
      o.clearDepth          = RMethod.virtual(o, 'clearDepth');
      o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
      o.present             = RMethod.virtual(o, 'present');
      o.dispose             = FG3dContext_dispose;
      return o;
   }
   MO.FG3dContext_construct = function FG3dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      o._size = new SSize2(1280, 720);
      o._logicSize = new SSize2(1280, 720);
      o._sizeRatio = new SSize2(1, 1);
      o._statistics = RClass.create(FG3dStatistics);
      RConsole.find(FStatisticsConsole).register('graphic3d.context', o._statistics);
      o._storePrograms = new TObjects();
      o._storeLayouts = new TObjects();
      o._storeBuffers = new TObjects();
      o._storeTextures = new TObjects();
      o._storeTargets = new TObjects();
   }
   MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }
   MO.FG3dContext_createObject = function FG3dContext_createObject(clazz){
      var o = this;
      var instance = RClass.create(clazz);
      instance.linkGraphicContext(o);
      instance.setup();
      return instance;
   }
   MO.FG3dContext_prepare = function FG3dContext_prepare(){
      this._statistics.resetFrame();
   }
   MO.FG3dContext_dispose = function FG3dContext_dispose(){
      var o = this;
      var programs = o._storePrograms;
      if(programs){
         var count = programs.count();
         for(var i = 0; i < count; i++){
            var program = programs.at(i);
            program.dispose();
         }
         o._storePrograms = RObject.dispose(programs);
      }
      var layouts = o._storeLayouts;
      if(layouts){
         var count = layouts.count();
         for(var i = 0; i < count; i++){
            var layout = layouts.at(i);
            layout.dispose();
         }
         o._storeLayouts = RObject.dispose(layouts);
      }
      var buffers = o._storeBuffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            buffer.dispose();
         }
         o._storeBuffers = RObject.dispose(buffers);
      }
      var textures = o._storeTextures;
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var texture = textures.at(i);
            texture.dispose();
         }
         o._storeTextures = RObject.dispose(textures);
      }
      var targets = o._storeTargets;
      if(targets){
         var count = targets.count();
         for(var i = 0; i < count; i++){
            var target = targets.at(i);
            target.dispose();
         }
         o._storeTargets = RObject.dispose(targets);
      }
      o._program = null;
      o._size = RObject.dispose(o._size);
      o._logicSize = RObject.dispose(o._logicSize);
      o._sizeRatio = RObject.dispose(o._sizeRatio);
      o._capability = RObject.dispose(o._capability);
      o._statistics = RObject.dispose(o._statistics);
      o._handleInstance = null;
      o._handleLayout = null;
      o._handle = null;
      o.__base.FGraphicContext.dispose.call(o);
   }
}
MO.FG3dCubeTexture = function FG3dCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o.size = 0;
   o.construct = MO.FG3dTexture_construct;
   o.upload    = MO.Method.virtual(o, 'upload');
   o.update    = MO.Method.empty;
   return o;
}
MO.FG3dTexture_construct = function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Cube;
}
MO.FG3dFlatTexture = function FG3dFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o._optionFlipY = MO.Class.register(o, new MO.AGetSet('_optionFlipY'), false);
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o.construct    = MO.FG3dFlatTexture_construct;
   o.uploadData   = MO.Method.virtual(o, 'uploadData');
   o.upload       = MO.Method.virtual(o, 'upload');
   o.update       = MO.Method.empty;
   return o;
}
MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Flat2d;
}
MO.FG3dFragmentShader = function FG3dFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._strideCd   = MO.Class.register(o, new MO.AGetSet('_strideCd'), MO.EG3dIndexStride.Uint16);
   o._count      = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o._drawModeCd = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._lineWidth  = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   o.upload      = MO.Method.virtual(o, 'upload');
   return o;
}
with(MO){
   MO.FG3dLayout = function FG3dLayout(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._buffers       = MO.Class.register(o, new MO.AGetter('_buffers'));
      o._samplers      = MO.Class.register(o, new MO.AGetter('_samplers'));
      o.linkBuffers    = FG3dLayout_linkBuffers;
      o.bindBuffers    = FG3dLayout_bindBuffers;
      o.linkSamplers   = FG3dLayout_linkSamplers;
      o.bindSamplers   = FG3dLayout_bindSamplers;
      o.unbindSamplers = FG3dLayout_unbindSamplers;
      o.dispose        = FG3dLayout_dispose;
      return o;
   }
   MO.FG3dLayout_construct = function FG3dLayout_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
   }
   MO.FG3dLayout_linkBuffers = function FG3dLayout_linkBuffers(buffers){
      var o = this;
      if(!buffers.isEmpty()){
         var items = o._buffers;
         if(!items){
            items = o._buffers = new TObjects();
         }
         items.assign(buffers);
      }
   }
   MO.FG3dLayout_bindBuffers = function FG3dLayout_bindBuffers(){
      var o = this;
      var context = o._graphicContext;
      var buffers = o._buffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            context.bindVertexBuffer(buffer.slot, buffer.buffer, buffer.index, buffer.formatCd);
         }
      }
   }
   MO.FG3dLayout_linkSamplers = function FG3dLayout_linkSamplers(samplers){
      var o = this;
      if(!samplers.isEmpty()){
         var items = o._samplers;
         if(!items){
            items = o._samplers = new TObjects();
         }
         items.assign(samplers);
      }
   }
   MO.FG3dLayout_bindSamplers = function FG3dLayout_bindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, sampler.texture);
         }
      }
   }
   MO.FG3dLayout_unbindSamplers = function FG3dLayout_unbindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, null);
         }
      }
   }
   MO.FG3dLayout_dispose = function FG3dLayout_dispose(){
      var o = this;
      o._buffers = RObject.dispose(o._buffers);
      o._samplers = RObject.dispose(o._samplers);
      o.__base.FG3dObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dProgram = function FG3dProgram(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._attributes       = null;
      o._parameters       = null;
      o._samplers         = null;
      o._vertexShader     = null;
      o._fragmentShader   = null;
      o.hasAttribute      = FG3dProgram_hasAttribute;
      o.registerAttribute = FG3dProgram_registerAttribute;
      o.findAttribute     = FG3dProgram_findAttribute;
      o.attributes        = FG3dProgram_attributes;
      o.hasParameter      = FG3dProgram_hasParameter;
      o.registerParameter = FG3dProgram_registerParameter;
      o.findParameter     = FG3dProgram_findParameter;
      o.parameters        = FG3dProgram_parameters;
      o.hasSampler        = FG3dProgram_hasSampler;
      o.registerSampler   = FG3dProgram_registerSampler;
      o.findSampler       = FG3dProgram_findSampler;
      o.samplers          = FG3dProgram_samplers;
      o.vertexShader      = RMethod.virtual(o, 'vertexShader');
      o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
      o.setAttribute      = FG3dProgram_setAttribute;
      o.setParameter      = FG3dProgram_setParameter;
      o.setParameter4     = FG3dProgram_setParameter4;
      o.setSampler        = FG3dProgram_setSampler;
      o.upload            = RMethod.virtual(o, 'upload');
      o.dispose           = FG3dProgram_dispose;
      return o;
   }
   MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
      var o = this;
      var r = o._attributes;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
      var o = this;
      var r = RClass.create(FG3dProgramAttribute);
      r._name = n;
      o.attributes().set(n, r);
      return r;
   }
   MO.FG3dProgram_findAttribute = function FG3dProgram_findAttribute(n){
      return this._attributes ? this._attributes.get(n) : null;
   }
   MO.FG3dProgram_attributes = function FG3dProgram_attributes(){
      var o = this;
      var r = o._attributes;
      if(r == null){
         r = o._attributes = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_hasParameter = function FG3dProgram_hasParameter(){
      var o = this;
      var r = o._parameters;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerParameter = function FG3dProgram_registerParameter(pn, pf){
      var o = this;
      var r = RClass.create(FG3dProgramParameter);
      r._name = pn;
      r.formatCd = pf;
      o.parameters().set(pn, r);
      return r;
   }
   MO.FG3dProgram_findParameter = function FG3dProgram_findParameter(n){
      return this._parameters ? this._parameters.get(n) : null;
   }
   MO.FG3dProgram_parameters = function FG3dProgram_parameters(){
      var o = this;
      var r = o._parameters;
      if(r == null){
         r = o._parameters = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_hasSampler = function FG3dProgram_hasSampler(){
      var o = this;
      var r = o._samplers;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerSampler = function FG3dProgram_registerSampler(pn){
      var o = this;
      var r = RClass.create(FG3dProgramSampler);
      r._name = pn;
      o.samplers().set(pn, r);
      return r;
   }
   MO.FG3dProgram_findSampler = function FG3dProgram_findSampler(n){
      return this._samplers ? this._samplers.get(n) : null;
   }
   MO.FG3dProgram_samplers = function FG3dProgram_samplers(){
      var o = this;
      var r = o._samplers;
      if(r == null){
         r = o._samplers = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
      var o = this;
      var p = o.findAttribute(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
      }
      o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
   }
   MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
      var o = this;
      var p = o.findParameter(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
      }
      var d = null;
      var t = pv.constructor;
      if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
         d = pv;
      }else if(t == SColor4){
         d = RTypeArray.float4();
         d[0] = pv.red;
         d[1] = pv.green;
         d[2] = pv.blue;
         d[3] = pv.alpha;
      }else if((t == SPoint3) || (t == SVector3)){
         d = RTypeArray.float3();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
      }else if((t == SPoint4) || (t == SVector4)){
         d = RTypeArray.float4();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
         d[3] = pv.w;
      }else{
         throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
      }
      if(p.attachData(d)){
         o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
      }
   }
   MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
      var v = RTypeArray.float4();
      v[0] = px;
      v[1] = py;
      v[2] = pz;
      v[3] = pw;
      this.setParameter(pn, v, 1);
   }
   MO.FG3dProgram_setSampler = function FG3dProgram_setSampler(pn, pt){
      var o = this;
      var p = o.findSampler(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
      }
      o._graphicContext.bindTexture(p._slot, p._index, pt);
   }
   MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
      var o = this;
      o._attributes = RObject.dispose(o._attributes, true);
      o._parameters = RObject.dispose(o._parameters, true);
      o._samplers = RObject.dispose(o._samplers, true);
      o._vertexShader = RObject.dispose(o._vertexShader);
      o._fragmentShader = RObject.dispose(o._fragmentShader);
      o.__base.FG3dObject.dispose.call(o);
   }
}
MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = false;
   o._slot       = null;
   o._index      = -1;
   o._formatCd   = MO.EG3dAttributeFormat.Unknown;
   o.loadConfig  = MO.FG3dProgramAttribute_loadConfig;
   o.dispose     = MO.FG3dProgramAttribute_dispose;
   return o;
}
MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.REnum.encode(MO.EG3dAttributeFormat, xconfig.get('format'));
}
MO.FG3dProgramAttribute_dispose = function FG3dProgramAttribute_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FG3dProgramParameter = function FG3dProgramParameter(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = RClass.register(o, new AGetter('_name'));
      o._linker     = RClass.register(o, new AGetter('_linker'));
      o._formatCd   = EG3dParameterFormat.Unknown;
      o._define     = RClass.register(o, new AGetter('_define'));
      o._statusUsed = false;
      o._slot       = null;
      o._size       = 0;
      o._buffer     = null;
      o._memory     = null;
      o.attachData  = FG3dProgramParameter_attachData;
      o.loadConfig  = FG3dProgramParameter_loadConfig;
      o.dispose     = FG3dProgramParameter_dispose;
      return o;
   }
   MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(value){
      var o = this;
      var result = false;
      var clazz = value.constructor;
      if(clazz == SMatrix3d){
         var memory = o._memory;
         if(!memory){
            memory = o._memory = new Float32Array(16);
         }
         result = RFloat.attach(memory, value._data, 16);
      }else if(clazz == Float32Array){
         var length = value.length;
         var memory = o._memory;
         if(!memory){
            memory = o._memory = new Float32Array(length);
         }
         result = RFloat.attach(memory, value, length);
      }else{
         throw new TError(o, 'Unknown data type.');
      }
      return result;
   }
   MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(xconfig){
      var o = this;
      o._name = xconfig.get('name');
      o._linker = xconfig.get('linker');
      o._formatCd = REnum.encode(EG3dParameterFormat, xconfig.get('format'));
      o._define = xconfig.get('define');
   }
   MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
      var o = this;
      o._slot = null;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
MO.FG3dProgramSampler = function FG3dProgramSampler(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = false;
   o._formatCd   = MO.Class.register(o, new MO.AGetter('_formatCd'), MO.EG3dTexture.Flat2d);
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.loadConfig  = MO.FG3dProgramSampler_loadConfig;
   o.dispose     = MO.FG3dProgramSampler_dispose;
   return o;
}
MO.FG3dProgramSampler_loadConfig = function FG3dProgramSampler_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._bind = MO.RBoolean.parse(xconfig.get('bind', 'Y'));
   o._formatCd = MO.REnum.encode(MO.EG3dTexture, xconfig.get('format', 'Flat2d'));
}
MO.FG3dProgramSampler_dispose = function FG3dProgramSampler_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dRenderTarget = function FG3dRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._size     = MO.Class.register(o, new MO.AGetter('_size'));
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   o._textures = null;
   o.construct = MO.FG3dRenderTarget_construct;
   o.textures  = MO.FG3dRenderTarget_textures;
   o.dispose   = MO.FG3dRenderTarget_dispose;
   return o;
}
MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new SSize2();
   o._color = new SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
   var o = this;
   var textures = o._textures;
   if(textures == null){
      textures = o._textures = new TObjects();
   }
   return textures;
}
MO.FG3dRenderTarget_dispose = function FG3dRenderTarget_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._color = RObject.dispose(o._color);
   o.__base.dispose.construct();
}
MO.FG3dShader = function FG3dShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._source = MO.Class.register(o, new MO.AGetter('_source'));
   o.upload  = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dStatistics = function FG3dStatistics(o){
   o = MO.Class.inherits(this, o, MO.FStatistics);
   o._frameClearCount     = MO.Class.register(o, new MO.AGetter('_frameClearCount'), 0);
   o._frameFillModeCount  = MO.Class.register(o, new MO.AGetter('_frameFillModeCount'), 0);
   o._frameDepthModeCount = MO.Class.register(o, new MO.AGetter('_frameDepthModeCount'), 0);
   o._frameCullModeCount  = MO.Class.register(o, new MO.AGetter('_frameCullModeCount'), 0);
   o._frameBlendModeCount = MO.Class.register(o, new MO.AGetter('_frameBlendModeCount'), 0);
   o._frameProgramCount   = MO.Class.register(o, new MO.AGetter('_frameProgramCount'), 0);
   o._frameConstCount     = MO.Class.register(o, new MO.AGetter('_frameConstCount'), 0);
   o._frameConstLength    = MO.Class.register(o, new MO.AGetter('_frameConstLength'), 0);
   o._frameBufferCount    = MO.Class.register(o, new MO.AGetter('_frameBufferCount'), 0);
   o._frameTextureCount   = MO.Class.register(o, new MO.AGetter('_frameTextureCount'), 0);
   o._frameTargetCount    = MO.Class.register(o, new MO.AGetter('_frameTargetCount'), 0);
   o._frameDrawCount      = MO.Class.register(o, new MO.AGetter('_frameDrawCount'), 0);
   o._frameTriangleCount  = MO.Class.register(o, new MO.AGetter('_frameTriangleCount'), 0);
   o._programTotal        = MO.Class.register(o, new MO.AGetter('_programTotal'), 0);
   o._layoutTotal         = MO.Class.register(o, new MO.AGetter('_layoutTotal'), 0);
   o._vertexBufferTotal   = MO.Class.register(o, new MO.AGetter('_vertexBufferTotal'), 0);
   o._indexBufferTotal    = MO.Class.register(o, new MO.AGetter('_indexBufferTotal'), 0);
   o._flatTextureTotal    = MO.Class.register(o, new MO.AGetter('_flatTextureTotal'), 0);
   o._cubeTextureTotal    = MO.Class.register(o, new MO.AGetter('_cubeTextureTotal'), 0);
   o._targetTotal         = MO.Class.register(o, new MO.AGetter('_targetTotal'), 0);
   o.reset                = MO.FG3dStatistics_reset;
   o.resetFrame           = MO.FG3dStatistics_resetFrame;
   return o;
}
MO.FG3dStatistics_reset = function FG3dStatistics_reset(){
   o._programTotal = 0;
   o._layoutTotal = 0;
   o._vertexBufferTotal = 0;
   o._indexBufferTotal = 0;
   o._flatTextureTotal = 0;
   o._cubeTextureTotal = 0;
   o._targetTotal = 0;
}
MO.FG3dStatistics_resetFrame = function FG3dStatistics_resetFrame(){
   var o = this;
   o._frameClearCount = 0;
   o._frameFillModeCount = 0;
   o._frameDepthModeCount = 0;
   o._frameCullModeCount = 0;
   o._frameBlendModeCount = 0;
   o._frameProgramCount = 0;
   o._frameConstCount = 0;
   o._frameConstLength = 0;
   o._frameBufferCount = 0;
   o._frameTextureCount = 0;
   o._frameTargetCount = 0;
   o._frameTriangleCount = 0;
   o._frameDrawCount = 0;
}
MO.FG3dTexture = function FG3dTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._textureCd   = MO.Class.register(o, new MO.AGetter('_textureCd'), MO.EG3dTexture.Unknown);
   o._filterMinCd = MO.Class.register(o, new MO.AGetSet('_filterMinCd'), MO.EG3dSamplerFilter.Linear);
   o._filterMagCd = MO.Class.register(o, new MO.AGetSet('_filterMagCd'), MO.EG3dSamplerFilter.Linear);
   o._wrapS       = MO.Class.register(o, new MO.AGetSet('_wrapS'), MO.EG3dSamplerFilter.Unknown);
   o._wrapT       = MO.Class.register(o, new MO.AGetSet('_wrapT'), MO.EG3dSamplerFilter.Unknown);
   o._statusLoad  = false;
   o.isValid      = MO.Method.virtual(o, 'isValid');
   o.setFilterCd  = MO.FG3dTexture_setFilterCd;
   o.setWrapCd    = MO.FG3dTexture_setWrapCd;
   return o;
}
MO.FG3dTexture_setFilterCd = function FG3dTexture_setFilterCd(minCd, magCd){
   var o = this;
   o._filterMinCd = minCd;
   o._filterMagCd = magCd;
}
MO.FG3dTexture_setWrapCd = function FG3dTexture_setWrapCd(wrapS, wrapT){
   var o = this;
   o._wrapS = wrapS;
   o._wrapT = wrapT;
}
MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._formatCd = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o._stride   = MO.Class.register(o, new MO.AGetSet('_stride'), 0);
   o._count    = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o.upload    = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dVertexShader = function FG3dVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
with(MO){
   MO.FG3dAutomaticEffect = function FG3dAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dEffect);
      o._optionMerge                 = false;
      o._optionBlendMode             = true;
      o._supportInstance             = false;
      o._supportLayout               = false;
      o._supportMaterialMap          = false;
      o._supportVertexColor          = true;
      o._supportVertexCoord          = true;
      o._supportVertexNormal         = true;
      o._supportVertexNormalFull     = true;
      o._supportVertexNormalCompress = false;
      o._supportSkeleton             = false;
      o._supportAlpha                = true;
      o._supportAmbient              = true;
      o._supportDiffuse              = true;
      o._supportDiffuseView          = true;
      o._supportSpecularColor        = true;
      o._supportSpecularLevel        = true;
      o._supportSpecularView         = true;
      o._supportLight                = true;
      o._supportReflect              = true;
      o._supportRefract              = true;
      o._supportEmissive             = true;
      o._supportHeight               = true;
      o._supportEnvironment          = true;
      o._dynamicSkeleton             = true;
      o.setup                        = FG3dAutomaticEffect_setup;
      o.buildInfo                    = FG3dAutomaticEffect_buildInfo;
      o.bindAttributes               = FG3dAutomaticEffect_bindAttributes;
      o.bindSamplers                 = FG3dAutomaticEffect_bindSamplers;
      o.bindMaterialSamplers         = FG3dAutomaticEffect_bindMaterialSamplers;
      o.bindMaterial                 = FG3dAutomaticEffect_bindMaterial;
      o.drawRenderable               = FG3dAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FG3dAutomaticEffect_setup = function FG3dAutomaticEffect_setup(){
      var o = this;
      var c = o._graphicContext;
      var cp = c.capability();
      o._supportLayout = cp.optionLayout;
   }
   MO.FG3dAutomaticEffect_buildInfo = function FG3dAutomaticEffect_buildInfo(tagContext, pc){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var flag = new TString();
      flag.append(pc.techniqueModeCode)
      tagContext.set("technique.mode", pc.techniqueModeCode);
      var om = o._optionMerge = pc.optionMerge;
      if(om){
         var mc = pc.mergeCount;
         flag.append("|OI" + mc);
         tagContext.setBoolean("option.instance", true);
         tagContext.set("instance.count", mc);
      }
      if(capability.optionMaterialMap){
         flag.append("|OM");
         tagContext.setBoolean("option.material.map", true);
         o._supportMaterialMap = true;
      }
      if(pc.optionNormalInvert){
         flag.append("|ON");
         tagContext.setBoolean("option.normal.invert", true);
         o._supportNormalInvert = true;
      }
      if(pc.optionColor){
         flag.append("|OC");
         tagContext.setBoolean("option.color", true);
         o.optionAmbient = true;
      }
      if(pc.optionAmbient){
         flag.append("|OA");
         tagContext.setBoolean("option.ambient", true);
         o.optionAmbient = true;
      }
      if(pc.optionDiffuse){
         flag.append("|OD");
         tagContext.setBoolean("option.diffuse", true);
         o.optionDiffuse = true;
      }
      if(pc.optionSpecular){
         flag.append("|OS");
         tagContext.setBoolean("option.specular", true);
         o.optionSpecular = true;
      }
      if(pc.optionReflect){
         flag.append("|ORL");
         tagContext.setBoolean("option.reflect", true);
         o.optionReflect = true;
      }
      if(pc.optionRefract){
         flag.append("|ORF");
         tagContext.setBoolean("option.refract", true);
         o.optionRefract = true;
      }
      var ac = pc.attributeContains(EG3dAttribute.Color);
      o._dynamicVertexColor = (o._supportVertexColor && ac);
      if(o._dynamicVertexColor){
         flag.append("|AC");
         tagContext.setBoolean("vertex.attribute.color", true);
      }
      var ad = pc.attributeContains(EG3dAttribute.Coord);
      o._dynamicVertexCoord = (o._supportVertexCoord && ad);
      if(o._dynamicVertexCoord){
         flag.append("|AD");
         tagContext.setBoolean("vertex.attribute.coord", true);
      }
      var an = pc.attributeContains(EG3dAttribute.Normal);
      o._dynamicVertexNormal = (o._supportVertexNormal && an);
      if(o._dynamicVertexNormal){
         flag.append("|AN");
         tagContext.setBoolean("vertex.attribute.normal", true);
      }
      var ab = pc.attributeContains(EG3dAttribute.Binormal);
      var at = pc.attributeContains(EG3dAttribute.Tangent);
      var af = (an && ab && at);
      o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
      if(o._dynamicVertexNormalFull){
         flag.append("|ANF");
         tagContext.setBoolean("vertex.attribute.normal.full", true);
      }
      o._dynamicVertexNormalCompress = pc.optionNormalCompress;
      if(o._dynamicVertexNormalCompress){
         flag.append("|ANC");
         tagContext.setBoolean("vertex.attribute.normal.compress", true);
      }
      o._dynamicInstance = (o._supportInstance && capability.optionInstance);
      if(o._dynamicInstance){
         flag.append("|SI");
         if(pc){
            tagContext.setBoolean("support.instance", true);
         }
      }
      o._dynamicSkeleton = o._supportSkeleton;
      if(o._dynamicSkeleton){
         flag.append("|SS");
         if(pc){
            tagContext.setBoolean("support.skeleton", true);
         }
      }
      var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
      o._dynamicAlpha = o._supportAlpha;
      if(o._dynamicAlpha){
         flag.append("|RA");
         if(pc){
            tagContext.setBoolean("support.alpha", true);
         }
         o._optionBlendMode = true;
      }else{
         o._optionBlendMode = false;
      }
      o._dynamicAmbient = o._supportAmbient;
      if(o._dynamicAmbient){
         flag.append("|TA");
         if(pc){
            tagContext.setBoolean("support.ambient", true);
         }
         if(sdf){
            flag.append("|TAS");
            if(pc){
               tagContext.setBoolean("support.ambient.sampler", true);
            }
         }
      }
      if(pc.samplerContains(EG3dSampler.Alpha)){
         tagContext.setBoolean("support.alpha.sampler", true);
      }
      var snr = pc.samplerContains(EG3dSampler.Normal);
      o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
      if(o._supportDiffuse){
         if(pc){
            tagContext.setBoolean("support.diffuse", true);
         }
         if(snr){
            flag.append("|TDD");
            if(pc){
               tagContext.setBoolean("support.dump", true);
               tagContext.setBoolean("support.diffuse.dump", true);
            }
         }else if(o._dynamicVertexNormal){
            flag.append("|TDN");
            if(pc){
               tagContext.setBoolean("support.diffuse.normal", true);
            }
         }
      }
      o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
      if(o._supportDiffuseView){
         if(pc){
            tagContext.setBoolean("support.diffuse.view", true);
         }
         if(snr){
            flag.append("|TDVD");
            if(pc){
               tagContext.setBoolean("support.dump", true);
               tagContext.setBoolean("support.diffuse.view.dump", true);
            }
         }else if(o._dynamicVertexNormal){
            flag.append("|TDVN");
            if(pc){
               tagContext.setBoolean("support.diffuse.view.normal", true);
            }
         }
      }
      var spc = pc.samplerContains(EG3dSampler.SpecularColor);
      var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
      o._dynamicSpecularColor = (o._supportSpecularColor && spc);
      o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
      if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
         flag.append("|TS");
         if(pc){
            tagContext.setBoolean("support.specular", true);
         }
         if(o._dynamicSpecularColor){
            flag.append("|TSC");
            if(pc){
               tagContext.setBoolean("support.specular.color", true);
            }
         }
         if(o._dynamicSpecularLevel){
            flag.append("|TSL");
            if(pc){
               tagContext.setBoolean("support.specular.level", true);
            }
         }else{
            flag.append("|NSL");
            if(pc){
               tagContext.setBoolean("support.specular.normal", true);
            }
         }
      }
      o._dynamicSpecularView = o._supportSpecularView;
      if(o._dynamicSpecularView && o._dynamicVertexNormal){
         flag.append("|TSV");
         if(pc){
            tagContext.setBoolean("support.specular.view", true);
         }
         if(o._dynamicSpecularColor){
            flag.append("|TSVC");
            if(pc){
               tagContext.setBoolean("support.specular.view.color", true);
            }
         }
         if(o._dynamicSpecularLevel){
            flag.append("|TSVL");
            if(pc){
               tagContext.setBoolean("support.specular.view.level", true);
            }
         }else{
            flag.append("|NSVL");
            if(pc){
               tagContext.setBoolean("support.specular.view.normal", true);
            }
         }
      }
      var slg = pc.samplerContains(EG3dSampler.Light);
      o._dynamicLight = (o._supportLight && slg);
      if(o._dynamicLight){
         flag.append("|TL");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.light", true);
         }
      }
      var slr = pc.samplerContains(EG3dSampler.Reflect);
      o._dynamicReflect = (o._supportReflect && slr);
      if(o._dynamicReflect){
         flag.append("|TRL");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.reflect", true);
         }
      }
      var slf = pc.samplerContains(EG3dSampler.Refract);
      o._dynamicRefract = (o._supportRefract && slf);
      if(o._dynamicRefract){
         flag.append("|TRF");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.refract", true);
         }
      }
      var sle = pc.samplerContains(EG3dSampler.Emissive);
      o._dynamicEmissive = (o._supportEmissive && sle);
      if(o._dynamicEmissive){
         flag.append("|TLE");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.emissive", true);
         }
      }
      var shg = pc.samplerContains(EG3dSampler.Height);
      o._dynamicHeight = (o._supportHeight && shg);
      if(o._dynamicHeight){
         flag.append("|TH");
         if(pc){
            tagContext.setBoolean("support.height", true);
         }
      }
      var sen = pc.samplerContains(EG3dSampler.Environment);
      o._dynamicEnvironment = (o._supportEnvironment && sen);
      if(o._dynamicEnvironment){
         flag.append("|TE");
         if(pc){
            tagContext.setBoolean("support.environment", true);
         }
      }
      if(o._dynamicSkeleton){
         var boneCount = capability.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
         flag.append("|B" + boneCount);
         tagContext.set("bone.count", boneCount);
         tagContext.set("bone.array.count", boneCount * 3);
         tagContext.setBoolean("support.bone.weight.1", true);
         tagContext.setBoolean("support.bone.weight.2", true);
         tagContext.setBoolean("support.bone.weight.3", true);
         tagContext.setBoolean("support.bone.weight.4", true);
      }
      tagContext.code = flag.flush();
   }
   MO.FG3dAutomaticEffect_bindAttributes = function FG3dAutomaticEffect_bindAttributes(renderable){
      var o = this;
      var program = o._program;
      if(program.hasAttribute()){
         var attributes = program.attributes();
         var count = attributes.count();
         for(var n = 0; n < count; n++){
            var attribute = attributes.at(n);
            if(attribute._statusUsed){
               var buffer = renderable.findVertexBuffer(attribute._linker);
               program.setAttribute(attribute._name, buffer, buffer._formatCd);
            }
         }
      }
   }
   MO.FG3dAutomaticEffect_bindSamplers = function FG3dAutomaticEffect_bindSamplers(renderable){
      var o = this;
      var program = o._program;
      if(o._supportMaterialMap){
         program.setSampler('fs_material', region.materialMap().texture());
      }
      if(program.hasSampler()){
         var samplers = program.samplers();
         var count = samplers.count();
         for(var n = 0; n < count; n++){
            var sampler = samplers.at(n);
            if(sampler._bind && sampler._statusUsed){
               var linker = sampler.linker();
               var texture = renderable.findTexture(linker);
               program.setSampler(sampler.name(), texture.texture());
            }
         }
      }
   }
   MO.FG3dAutomaticEffect_bindMaterialSamplers = function FG3dAutomaticEffect_bindMaterialSamplers(renderable, material){
      var o = this;
      var program = o._program;
      if(program.hasSampler()){
         var samplers = program.samplers();
         var count = samplers.count();
         for(var n = 0; n < count; n++){
            var sampler = samplers.at(n);
            if(sampler._bind && sampler._statusUsed){
               var linker = sampler.linker();
               var texture = material.findBitmap(linker);
               program.setSampler(sampler.name(), texture.texture());
            }
         }
      }
   }
   MO.FG3dAutomaticEffect_bindMaterial = function FG3dAutomaticEffect_bindMaterial(material){
      var o = this;
      var context = o._graphicContext;
      var info = material.info();
      if(info.optionDepth){
         context.setDepthMode(o._stateDepth, o._stateDepthCd);
      }else{
         context.setDepthMode(false);
      }
      if(info.optionAlpha){
         context.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
      }else{
         context.setBlendFactors(false);
      }
      if(info.optionDouble){
         context.setCullingMode(false);
      }else{
         context.setCullingMode(o._stateDepth, o._stateCullCd);
      }
   }
   MO.FG3dAutomaticEffect_drawRenderable = function FG3dAutomaticEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var info = renderable.activeInfo();
      var layout = info.layout;
      if(!layout){
         layout = info.layout = context.createLayout();
         if(o._supportLayout){
            layout.bind();
            o.bindAttributes(renderable);
            layout.unbind();
            layout.active();
         }else{
            context.recordBegin();
            o.bindAttributes(renderable);
            context.recordEnd();
            layout.linkBuffers(context.recordBuffers());
         }
         context.recordBegin();
         o.bindSamplers(renderable);
         context.recordEnd();
         layout.linkSamplers(context.recordSamplers());
      }else{
         if(o._supportLayout){
            layout.active();
         }else{
            layout.bindBuffers();
         }
         layout.bindSamplers();
      }
      var indexCount = 0;
      var indexBuffers = renderable.indexBuffers();
      if(indexBuffers){
         indexCount = indexBuffers.count();
      }
      if(indexCount > 1){
         var materials = renderable.materials();
         for(var i = 0; i < indexCount; i++){
            var indexBuffer = indexBuffers.at(i);
            if(materials){
               var material = materials.at(i);
               if(material){
                  o.bindMaterialSamplers(renderable, material);
               }
            }
            context.drawTriangles(indexBuffer);
         }
      }else if(indexCount == 1){
         var indexBuffer = indexBuffers.first();
         context.drawTriangles(indexBuffer);
      }else{
         throw new TError(o, 'Index buffer is not found.');
      }
      if(o._supportLayout){
         layout.deactive();
      }
   }
}
with(MO){
   MO.FG3dSelectAutomaticEffect = function FG3dSelectAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'select.automatic';
      o.drawRenderable = FG3dSelectAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FG3dSelectAutomaticEffect_drawRenderable = function FG3dSelectAutomaticEffect_drawRenderable(region, renderable, index){
      var o = this;
      var context = o._graphicContext;
      var size = context.size();
      var program = o._program;
      var selectX = region._selectX;
      var selectY = region._selectY;
      var material = renderable.material();
      var materialInfo = material.info();
      o.bindMaterial(material);
      program.setParameter('vc_model_matrix', renderable.currentMatrix());
      program.setParameter('vc_vp_matrix', region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      program.setParameter4('vc_offset', size.width, size.height, 1 - (selectX / size.width) * 2, (selectY / size.height) * 2 - 1);
      var i = index + 1;
      var i1 = i  & 0xFF;
      var i2 = (i >> 8) & 0xFF;
      var i3 = (i >> 16) & 0xFF;
      program.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, materialInfo.alphaBase);
      o.bindAttributes(renderable);
      o.bindSamplers(renderable);
      var indexBuffers = renderable.indexBuffers();
      var count = indexBuffers.count();
      for(var i = 0; i < count; i++){
         var indexBuffer = indexBuffers.at(i);
         context.drawTriangles(indexBuffer);
      }
   }
}
with(MO){
   MO.FG3dSelectPass = function FG3dSelectPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code         = 'select';
      o._texture      = MO.Class.register(o, new MO.AGetter('_texture'));
      o._renderTarget = null;
      o._position     = null;
      o._data         = null;
      o.construct     = FG3dSelectPass_construct;
      o.setup         = FG3dSelectPass_setup;
      o.drawRegion    = FG3dSelectPass_drawRegion;
      return o;
   }
   MO.FG3dSelectPass_construct = function FG3dSelectPass_construct(){
      var o = this;
      o.__base.FG3dTechniquePass.construct.call(o);
      o._data = new Uint8Array(4);
      o._position = new SPoint2();
   }
   MO.FG3dSelectPass_setup = function FG3dSelectPass_setup(){
      var o = this;
      o.__base.FG3dTechniquePass.setup.call(o);
      var c = o._graphicContext;
      var T = o._texture = c.createFlatTexture();
      T.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
      T.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      var t = o._renderTarget = c.createRenderTarget();
      t.size().set(1, 1);
      t.textures().push(T);
      t.build();
   }
   MO.FG3dSelectPass_drawRegion = function FG3dSelectPass_drawRegion(p){
      var o = this;
      var context = o._graphicContext;
      var handle = context.handle();
      context.setRenderTarget(o._renderTarget);
      context.clear(0, 0, 0, 0, 1, 1);
      var rs = p.allRenderables();
      o.activeEffects(p, rs);
      var rc = rs.count();
      for(var i = 0; i < rc; i++){
         var r = rs.get(i);
         var e = r.activeEffect();
         context.setProgram(e.program());
         var d = r.display();
         if(!d){
            e.drawRenderable(p, r, i);
         }else if(!d._optionFace){
            e.drawRenderable(p, r, i);
         }
      }
      context.clearDepth(1);
      for(var i = 0; i < rc; i++){
         var r = rs.get(i);
         var e = r.activeEffect();
         context.setProgram(e.program());
         var d = r.display();
         if(d && d._optionFace){
            e.drawRenderable(p, r, i);
         }
      }
      handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, o._data);
      var v = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
      o._selectRenderable = null;
      if(v != 0){
         o._selectRenderable = rs.get(v - 1);
      }
   }
}
with(MO){
   MO.FG3dSelectSkeletonEffect = function FG3dSelectSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'select.automatic';
      o.drawRenderable = FG3dSelectSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FG3dSelectSkeletonEffect_drawRenderable = function FG3dSelectSkeletonEffect_drawRenderable(pg, pr, pi){
      var o = this;
      var c = o._graphicContext;
      var s = c.size();
      var p = o._program;
      var sx = pg._selectX;
      var sy = pg._selectY;
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
      var i = pi + 1;
      var i1 = i  & 0xFF;
      var i2 = (i >> 8) & 0xFF;
      var i3 = (i >> 16) & 0xFF;
      p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FG3dSelectTechnique = function FG3dSelectTechnique(o){
      o = RClass.inherits(this, o, FG3dTechnique);
      o._code       = 'select';
      o._passSelect = MO.Class.register(o, new MO.AGetter('_passSelect'));
      o.setup       = FG3dSelectTechnique_setup;
      o.test        = FG3dSelectTechnique_test;
      return o;
   }
   MO.FG3dSelectTechnique_setup = function FG3dSelectTechnique_setup(){
      var o = this;
      o.__base.FG3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Result);
      var pd = o._passSelect = RClass.create(FG3dSelectPass);
      pd.linkGraphicContext(o);
      pd.setup();
      o._passes.push(pd);
   }
   MO.FG3dSelectTechnique_test = function FG3dSelectTechnique_test(region, x, y){
      var o = this;
      region._selectX = x;
      region._selectY = y;
      region.setTechnique(o);
      o.drawRegion(region);
      return o._passSelect._selectRenderable;
   }
}
with(MO){
   MO.FWglContext = function FWglContext(o){
      o = RClass.inherits(this, o, FG3dContext);
      o._handle             = RClass.register(o, new AGetter('_handle'));
      o._handleInstance     = null;
      o._handleLayout       = null;
      o._handleSamplerS3tc  = null;
      o._handleDebugShader  = null;
      o._activeRenderTarget = null;
      o._activeTextureSlot  = null;
      o._parameters         = null;
      o._extensions         = null;
      o._statusRecord       = false;
      o._recordBuffers      = MO.Class.register(o, new MO.AGetter('_recordBuffers'));
      o._recordSamplers     = MO.Class.register(o, new MO.AGetter('_recordSamplers'));
      o._statusScissor      = false;
      o._data9              = null;
      o._data16             = null;
      o.construct           = FWglContext_construct;
      o.linkCanvas          = FWglContext_linkCanvas;
      o.parameters          = FWglContext_parameters;
      o.extensions          = FWglContext_extensions;
      o.recordBegin         = FWglContext_recordBegin;
      o.recordEnd           = FWglContext_recordEnd;
      o.createProgram       = FWglContext_createProgram;
      o.createLayout        = FWglContext_createLayout;
      o.createVertexBuffer  = FWglContext_createVertexBuffer;
      o.createIndexBuffer   = FWglContext_createIndexBuffer;
      o.createFlatTexture   = FWglContext_createFlatTexture;
      o.createCubeTexture   = FWglContext_createCubeTexture;
      o.createRenderTarget  = FWglContext_createRenderTarget;
      o.setViewport         = FWglContext_setViewport;
      o.setFillMode         = FWglContext_setFillMode;
      o.setDepthMode        = FWglContext_setDepthMode;
      o.setCullingMode      = FWglContext_setCullingMode;
      o.setBlendFactors     = FWglContext_setBlendFactors;
      o.setScissorRectangle = FWglContext_setScissorRectangle;
      o.setRenderTarget     = FWglContext_setRenderTarget;
      o.setProgram          = FWglContext_setProgram;
      o.bindConst           = FWglContext_bindConst;
      o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
      o.bindTexture         = FWglContext_bindTexture;
      o.clear               = FWglContext_clear;
      o.clearColor          = FWglContext_clearColor;
      o.clearDepth          = FWglContext_clearDepth;
      o.readPixels          = FWglContext_readPixels;
      o.drawTriangles       = FWglContext_drawTriangles;
      o.present             = FWglContext_present;
      o.checkError          = FWglContext_checkError;
      o.dispose             = FWglContext_dispose;
      return o;
   }
   MO.FWglContext_construct = function FWglContext_construct(){
      var o = this;
      o.__base.FG3dContext.construct.call(o);
      o._capability = new SG3dContextCapability();
      o._data9 = new Float32Array(9);
      o._data16 = new Float32Array(16);
      o._recordBuffers = new TObjects();
      o._recordSamplers = new TObjects();
   }
   MO.FWglContext_linkCanvas = function FWglContext_linkCanvas(hCanvas){
      var o = this;
      o.__base.FG3dContext.linkCanvas.call(o, hCanvas)
      o._hCanvas = hCanvas;
      if(hCanvas.getContext){
         var parameters = new Object();
         parameters.alpha = false;
         parameters.antialias = false;
         var handle = hCanvas.getContext('experimental-webgl2', parameters);
         if(!handle){
            handle = hCanvas.getContext('experimental-webgl', parameters);
         }
         if(!handle){
            handle = hCanvas.getContext('webgl', parameters);
         }
         if(!handle){
            throw new TError("Current browser can't support WebGL technique.");
         }
         o._handle = handle;
         o._contextAttributes = handle.getContextAttributes();
      }else{
         throw new TError("Canvas can't support WebGL technique.");
      }
      var handle = o._handle;
      o.setViewport(0, 0, hCanvas.width, hCanvas.height);
      o.setDepthMode(true, EG3dDepthMode.LessEqual);
      o.setCullingMode(true, EG3dCullMode.Front);
      var capability = o._capability;
      capability.vendor = handle.getParameter(handle.VENDOR);
      capability.version = handle.getParameter(handle.VERSION);
      capability.shaderVersion = handle.getParameter(handle.SHADING_LANGUAGE_VERSION);
      capability.attributeCount = handle.getParameter(handle.MAX_VERTEX_ATTRIBS);
      capability.vertexConst = handle.getParameter(handle.MAX_VERTEX_UNIFORM_VECTORS);
      capability.varyingCount = handle.getParameter(handle.MAX_VARYING_VECTORS);
      capability.fragmentConst = handle.getParameter(handle.MAX_FRAGMENT_UNIFORM_VECTORS);
      capability.samplerCount = handle.getParameter(handle.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
      capability.samplerSize = handle.getParameter(handle.MAX_TEXTURE_SIZE);
      var extension = o._handleInstance = handle.getExtension('ANGLE_instanced_arrays');
      if(extension){
         capability.optionInstance = true;
      }
      capability.mergeCount = parseInt((capability.vertexConst - 32) / 4);
      var extension = o._handleLayout = handle.getExtension('OES_vertex_array_object');
      if(extension){
         capability.optionLayout = true;
      }
      var extension = handle.getExtension('OES_element_index_uint');
      if(extension){
         capability.optionIndex32 = true;
      }
      var extension = o._handleSamplerS3tc = handle.getExtension('WEBGL_compressed_texture_s3tc');
      if(extension){
         capability.samplerCompressRgb = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
         capability.samplerCompressRgba = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      var s = capability.shader = new Object();
      var vertexPrecision = s.vertexPrecision = new Object();
      if(handle.getShaderPrecisionFormat){
         vertexPrecision.floatLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_FLOAT);
         vertexPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_FLOAT);
         vertexPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_FLOAT);
         vertexPrecision.intLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_INT);
         vertexPrecision.intMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_INT);
         vertexPrecision.intHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_INT);
      }
      var fragmentPrecision = s.fragmentPrecision = new Object();
      if(handle.getShaderPrecisionFormat){
         fragmentPrecision.floatLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_FLOAT);
         fragmentPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_FLOAT);
         fragmentPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_FLOAT);
         fragmentPrecision.intLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_INT);
         fragmentPrecision.intMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_INT);
         fragmentPrecision.intHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_INT);
      }
      var extension = o._handleDebugShader = handle.getExtension('WEBGL_debug_shaders');
      if(extension){
         capability.optionShaderSource = true;
      }
   }
   MO.FWglContext_parameters = function FWglContext_parameters(){
      var o = this;
      var parameters = o._parameters;
      if(parameters){
         return parameters;
      }
      var names =['ACTIVE_TEXTURE',
         'ALIASED_LINE_WIDTH_RANGE',
         'ALIASED_POINT_SIZE_RANGE',
         'ALPHA_BITS',
         'ARRAY_BUFFER_BINDING',
         'BLEND',
         'BLEND_COLOR',
         'BLEND_DST_ALPHA',
         'BLEND_DST_RGB',
         'BLEND_EQUATION_ALPHA',
         'BLEND_EQUATION_RGB',
         'BLEND_SRC_ALPHA',
         'BLEND_SRC_RGB',
         'BLUE_BITS',
         'COLOR_CLEAR_VALUE',
         'COLOR_WRITEMASK',
         'COMPRESSED_TEXTURE_FORMATS',
         'CULL_FACE',
         'CULL_FACE_MODE',
         'CURRENT_PROGRAM',
         'DEPTH_BITS',
         'DEPTH_CLEAR_VALUE',
         'DEPTH_FUNC',
         'DEPTH_RANGE',
         'DEPTH_TEST',
         'DEPTH_WRITEMASK',
         'DITHER',
         'ELEMENT_ARRAY_BUFFER_BINDING',
         'FRAMEBUFFER_BINDING',
         'FRONT_FACE',
         'GENERATE_MIPMAP_HINT',
         'GREEN_BITS',
         'IMPLEMENTATION_COLOR_READ_FORMAT',
         'IMPLEMENTATION_COLOR_READ_TYPE',
         'LINE_WIDTH',
         'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
         'MAX_CUBE_MAP_TEXTURE_SIZE',
         'MAX_FRAGMENT_UNIFORM_VECTORS',
         'MAX_RENDERBUFFER_SIZE',
         'MAX_TEXTURE_IMAGE_UNITS',
         'MAX_TEXTURE_SIZE',
         'MAX_VARYING_VECTORS',
         'MAX_VERTEX_ATTRIBS',
         'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
         'MAX_VERTEX_UNIFORM_VECTORS',
         'MAX_VIEWPORT_DIMS',
         'PACK_ALIGNMENT',
         'POLYGON_OFFSET_FACTOR',
         'POLYGON_OFFSET_FILL',
         'POLYGON_OFFSET_UNITS',
         'RED_BITS',
         'RENDERBUFFER_BINDING',
         'RENDERER',
         'SAMPLE_BUFFERS',
         'SAMPLE_COVERAGE_INVERT',
         'SAMPLE_COVERAGE_VALUE',
         'SAMPLES',
         'SCISSOR_BOX',
         'SCISSOR_TEST',
         'SHADING_LANGUAGE_VERSION',
         'STENCIL_BACK_FAIL',
         'STENCIL_BACK_FUNC',
         'STENCIL_BACK_PASS_DEPTH_FAIL',
         'STENCIL_BACK_PASS_DEPTH_PASS',
         'STENCIL_BACK_REF',
         'STENCIL_BACK_VALUE_MASK',
         'STENCIL_BACK_WRITEMASK',
         'STENCIL_BITS',
         'STENCIL_CLEAR_VALUE',
         'STENCIL_FAIL',
         'STENCIL_FUNC',
         'STENCIL_PASS_DEPTH_FAIL',
         'STENCIL_PASS_DEPTH_PASS',
         'STENCIL_REF',
         'STENCIL_TEST',
         'STENCIL_VALUE_MASK',
         'STENCIL_WRITEMASK',
         'SUBPIXEL_BITS',
         'TEXTURE_BINDING_2D',
         'TEXTURE_BINDING_CUBE_MAP',
         'UNPACK_ALIGNMENT',
         'UNPACK_COLORSPACE_CONVERSION_WEBGL',
         'UNPACK_FLIP_Y_WEBGL',
         'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
         'VENDOR',
         'VERSION',
         'VIEWPORT'];
      var handle = o._handle;
      var count = names.length;
      parameters = new Object();
      for(var i = 0; i < count; i++){
         var name = names[i];
         parameters[name] = handle.getParameter(handle[name]);
      }
      var extension = handle.getExtension('WEBGL_debug_renderer_info');
      if(extension){
         parameters['UNMASKED_RENDERER_WEBGL'] = handle.getParameter(extension.UNMASKED_RENDERER_WEBGL);
         parameters['UNMASKED_VENDOR_WEBGL'] = handle.getParameter(extension.UNMASKED_VENDOR_WEBGL);
      }
      o._parameters = parameters;
      return parameters;
   }
   MO.FWglContext_extensions = function FWglContext_extensions(){
      var o = this;
      var extensions = o._extensions;
      if(!extensions){
         extensions = o._extensions = new Object();
         var handle = o._handle;
         var extensionNames = handle.getSupportedExtensions();
         var count = extensionNames.length;
         for(var i = 0; i < count; i++){
            var extensionName = extensionNames[i];
            extensions[name] = handle.getExtension(extensionName);
         }
      }
      return extensions;
   }
   MO.FWglContext_recordBegin = function FWglContext_recordBegin(){
      var o = this;
      o._recordBuffers.clear();
      o._recordSamplers.clear();
      o._statusRecord = true;
   }
   MO.FWglContext_recordEnd = function FWglContext_recordEnd(){
      this._statusRecord = false;
   }
   MO.FWglContext_createProgram = function FWglContext_createProgram(){
      var o = this;
      var program = RClass.create(FWglProgram);
      program.linkGraphicContext(o);
      program.setup();
      o._storePrograms.push(program);
      o._statistics._programTotal++;
      return program;
   }
   MO.FWglContext_createLayout = function FWglContext_createLayout(){
      var o = this;
      var layout = RClass.create(FWglLayout);
      layout.linkGraphicContext(o);
      if(o._capability.optionLayout){
         layout.setup();
      }
      o._storeLayouts.push(layout);
      o._statistics._layoutTotal++;
      return layout;
   }
   MO.FWglContext_createVertexBuffer = function FWglContext_createVertexBuffer(clazz){
      var o = this;
      var buffer = RClass.create(clazz ? clazz : FWglVertexBuffer);
      buffer.linkGraphicContext(o);
      buffer.setup();
      o._storeBuffers.push(buffer);
      o._statistics._vertexBufferTotal++;
      return buffer;
   }
   MO.FWglContext_createIndexBuffer = function FWglContext_createIndexBuffer(clazz){
      var o = this;
      var buffer = RClass.create(clazz ? clazz : FWglIndexBuffer);
      buffer.linkGraphicContext(o);
      buffer.setup();
      o._storeBuffers.push(buffer);
      o._statistics._indexBufferTotal++;
      return buffer;
   }
   MO.FWglContext_createFlatTexture = function FWglContext_createFlatTexture(){
      var o = this;
      var texture = RClass.create(FWglFlatTexture);
      texture.linkGraphicContext(o);
      texture.setup();
      o._storeTextures.push(texture);
      o._statistics._flatTextureTotal++;
      return texture;
   }
   MO.FWglContext_createCubeTexture = function FWglContext_createCubeTexture(){
      var o = this;
      var texture = RClass.create(FWglCubeTexture);
      texture.linkGraphicContext(o);
      texture.setup();
      o._storeTextures.push(texture);
      o._statistics._cubeTextureTotal++;
      return texture;
   }
   MO.FWglContext_createRenderTarget = function FWglContext_createRenderTarget(){
      var o = this;
      var target = RClass.create(FWglRenderTarget);
      target.linkGraphicContext(o);
      target.setup();
      o._storeTargets.push(target);
      o._statistics._targetTotal++;
      return target;
   }
   MO.FWglContext_setViewport = function FWglContext_setViewport(left, top, width, height){
      var o = this;
      o._size.set(width, height);
      o._handle.viewport(left, top, width, height);
   }
   MO.FWglContext_setFillMode = function FWglContext_setFillMode(fillModeCd){
      var o = this;
      var graphic = o._handle;
      if(o._fillModeCd == fillModeCd){
         return false;
      }
      o._statistics._frameFillModeCount++;
      switch(fillModeCd){
         case EG3dFillMode.Point:
            graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.POINT);
            break;
         case EG3dFillMode.Line:
            graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.LINE);
            break;
         case EG3dFillMode.Face:
            graphic.polygonMode(graphic.FRONT, graphic.FILL);
            break;
         default:
            throw new TError('Invalid parameter. (fill_mode={1})', fillModeCd);
      }
      o._fillModeCd = fillModeCd;
      return true;
   }
   MO.FWglContext_setDepthMode = function FWglContext_setDepthMode(depthFlag, depthCd){
      var o = this;
      var graphic = o._handle;
      if((o._optionDepth == depthFlag) && (o._depthModeCd == depthCd)){
         return false;
      }
      o._statistics._frameDepthModeCount++;
      if(o._optionDepth != depthFlag){
         if(depthFlag){
            graphic.enable(graphic.DEPTH_TEST);
         }else{
            graphic.disable(graphic.DEPTH_TEST);
         }
         o._optionDepth = depthFlag;
      }
      if(depthFlag && (o._depthModeCd != depthCd)){
         var depthCode = RWglUtility.convertDepthMode(graphic, depthCd);
         graphic.depthFunc(depthCode);
         o._depthModeCd = depthCd;
      }
      return true;
   }
   MO.FWglContext_setCullingMode = function FWglContext_setCullingMode(cullFlag, cullCd){
      var o = this;
      var graphic = o._handle;
      if((o._optionCull == cullFlag) && (o._cullModeCd == cullCd)){
         return false;
      }
      o._statistics._frameCullModeCount++;
      if(o._optionCull != cullFlag){
         if(cullFlag){
            graphic.enable(graphic.CULL_FACE);
         }else{
            graphic.disable(graphic.CULL_FACE);
         }
         o._optionCull = cullFlag;
      }
      if(cullFlag && (o._cullModeCd != cullCd)){
         var cullValue = RWglUtility.convertCullMode(graphic, cullCd);
         graphic.cullFace(cullValue);
         o._cullModeCd = cullCd;
      }
      return true;
   }
   MO.FWglContext_setBlendFactors = function FWglContext_setBlendFactors(blendFlag, sourceCd, tagetCd){
      var o = this;
      var graphic = o._handle;
      if((o._statusBlend == blendFlag) && (o._blendSourceCd == sourceCd) && (o._blendTargetCd == tagetCd)){
         return false;
      }
      o._statistics._frameBlendModeCount++;
      if(o._statusBlend != blendFlag){
         if(blendFlag){
            graphic.enable(graphic.BLEND);
         }else{
            graphic.disable(graphic.BLEND);
            o._blendSourceCd = 0;
            o._blendTargetCd = 0;
         }
         o._statusBlend = blendFlag;
      }
      if(blendFlag && ((o._blendSourceCd != sourceCd) || (o._blendTargetCd != tagetCd))){
         var sourceValue = RWglUtility.convertBlendFactors(graphic, sourceCd);
         var tagetValue = RWglUtility.convertBlendFactors(graphic, tagetCd);
         graphic.blendFunc(sourceValue, tagetValue);
         o._blendSourceCd = sourceCd;
         o._blendTargetCd = tagetCd;
      }
      return true;
   }
   MO.FWglContext_setScissorRectangle = function FWglContext_setScissorRectangle(left, top, width, height){
      var o = this;
      var handle = o._handle;
      var scissorFlag = (width > 0) && (height > 0);
      if(o._statusScissor != scissorFlag){
         if(scissorFlag){
            handle.enable(handle.SCISSOR_TEST);
         }else{
            handle.disable(handle.SCISSOR_TEST);
         }
         o._statusScissor = scissorFlag;
      }
      if(scissorFlag){
         handle.scissor(left, top, width, height);
      }
   }
   MO.FWglContext_setRenderTarget = function FWglContext_setRenderTarget(renderTarget){
      var o = this;
      var graphic = o._handle;
      if(o._activeRenderTarget == renderTarget){
         return;
      }
      o._statistics._frameTargetCount++;
      var result = true;
      if(renderTarget == null){
         graphic.bindFramebuffer(graphic.FRAMEBUFFER, null);
         result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
         if(!result){
            return result;
         }
         graphic.viewport(0, 0, o._size.width, o._size.height);
      }else{
         graphic.bindFramebuffer(graphic.FRAMEBUFFER, renderTarget._handle);
         result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", renderTarget._handle);
         if(!result){
            return result;
         }
         var size = renderTarget.size();
         graphic.viewport(0, 0, size.width, size.height);
      }
      o._activeRenderTarget = renderTarget;
      return result;
   }
   MO.FWglContext_setProgram = function FWglContext_setProgram(program){
      var o = this;
      var graphic = o._handle;
      if(o._program == program){
         return;
      }
      o._statistics._frameProgramCount++;
      if(program){
         graphic.useProgram(program._handle);
      }else{
         graphic.useProgram(null);
      }
      o._program = program;
      return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", program, program._handle);
   }
   MO.FWglContext_bindConst = function FWglContext_bindConst(shaderCd, slot, formatCd, data, count){
      var o = this;
      var graphic = o._handle;
      var result = true;
      o._statistics._frameConstCount++;
      switch(formatCd){
         case EG3dParameterFormat.Float1:{
            graphic.uniform1fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float2:{
            graphic.uniform2fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float3:{
            graphic.uniform3fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float4:{
            graphic.uniform4fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float3x3:{
            var bytes = o._data9;
            bytes[ 0] = data[ 0];
            bytes[ 1] = data[ 4];
            bytes[ 2] = data[ 8];
            bytes[ 3] = data[ 1];
            bytes[ 4] = data[ 5];
            bytes[ 5] = data[ 9];
            bytes[ 6] = data[ 2];
            bytes[ 7] = data[ 6];
            bytes[ 8] = data[10];
            graphic.uniformMatrix3fv(slot, graphic.FALSE, bytes);
            o._statistics._frameConstLength += bytes.byteLength;
            result = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float4x4:{
            var bytes = null;
            if(data.constructor == Float32Array){
               bytes = data;
            }else if(data.writeData){
               bytes = o._data16;
               data.writeData(bytes, 0);
            }else{
               throw new TError('Unknown data type.');
            }
            graphic.uniformMatrix4fv(slot, graphic.FALSE, bytes);
            o._statistics._frameConstLength += bytes.byteLength;
            result = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         default:{
            throw new TError(o, 'Unknown format type. (format_cd={1})', formatCd);
         }
      }
      return result;
   }
   MO.FWglContext_bindVertexBuffer = function FWglContext_bindVertexBuffer(slot, vertexBuffer, offset, formatCd){
      var o = this;
      var graphic = o._handle;
      var result = true;
      o._statistics._frameBufferCount++;
      if(o._statusRecord){
         var layout = new SG3dLayoutBuffer();
         layout.slot = slot;
         layout.buffer = vertexBuffer;
         layout.index = offset;
         layout.formatCd = formatCd;
         o._recordBuffers.push(layout);
      }
      var handle = null;
      if(vertexBuffer != null){
         handle = vertexBuffer._handle;
      }
      graphic.bindBuffer(graphic.ARRAY_BUFFER, handle);
      result = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", handle);
      if(!result){
         return result;
      }
      if(vertexBuffer){
         graphic.enableVertexAttribArray(slot);
         result = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", slot);
         if(!result){
            return result;
         }
      }else{
         graphic.disableVertexAttribArray(slot);
         result = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", slot);
         return result;
      }
      var stride = vertexBuffer._stride;
      switch(formatCd){
         case EG3dAttributeFormat.Float1:
            graphic.vertexAttribPointer(slot, 1, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float2:
            graphic.vertexAttribPointer(slot, 2, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float3:
            graphic.vertexAttribPointer(slot, 3, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float4:
            graphic.vertexAttribPointer(slot, 4, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Byte4:
            graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, false, stride, offset);
            break;
         case EG3dAttributeFormat.Byte4Normal:
            graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, true, stride, offset);
            break;
         default:
            throw new TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
            break;
      }
      result = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", slot, formatCd);
      return result;
   }
   MO.FWglContext_bindTexture = function FWglContext_bindTexture(slot, index, texture){
      var o = this;
      var graphic = o._handle;
      var result = true;
      o._statistics._frameTextureCount++;
      if(o._statusRecord){
         var layout = new SG3dLayoutSampler();
         layout.slot = slot;
         layout.index = index;
         layout.texture = texture;
         o._recordSamplers.push(layout);
      }
      if(o._activeTextureSlot != slot){
         graphic.uniform1i(slot, index);
         graphic.activeTexture(graphic.TEXTURE0 + index);
         result = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", slot, index);
         if(!result){
            return result;
         }
         o._activeTextureSlot = slot;
      }
      if(texture == null){
         graphic.bindTexture(graphic.TEXTURE_2D, null);
         result = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", slot);
         return result;
      }
      var handle = texture._handle;
      switch(texture.textureCd()){
         case EG3dTexture.Flat2d:{
            graphic.bindTexture(graphic.TEXTURE_2D, handle);
            result = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", handle);
            if(!result){
               return result;
            }
            break;
         }
         case EG3dTexture.Cube:{
            graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, handle);
            result = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", handle);
            if(!result){
               return result;
            }
            break;
         }
         default:{
            throw new TError(o, 'Unknown texture type.');
            break;
         }
      }
      return result;
   }
   MO.FWglContext_clear = function FWglContext_clear(red, green, blue, alpha, depth){
      var o = this;
      var graphic = o._handle;
      graphic.clearColor(red, green, blue, alpha);
      graphic.clearDepth(depth);
      graphic.clear(graphic.COLOR_BUFFER_BIT | graphic.DEPTH_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }
   MO.FWglContext_clearColor = function FWglContext_clearColor(red, green, blue, alpha){
      var o = this;
      var graphic = o._handle;
      graphic.clearColor(red, green, blue, alpha);
      graphic.clear(graphic.COLOR_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }
   MO.FWglContext_clearDepth = function FWglContext_clearDepth(depth){
      var o = this;
      var graphic = o._handle;
      graphic.clearDepth(depth);
      graphic.clear(graphic.DEPTH_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }
   MO.FWglContext_readPixels = function FWglContext_readPixels(left, top, width, height){
      var o = this;
      var graphic = o._handle;
      var length = 4 * width * height;
      var data = new Uint8Array(length);
      graphic.readPixels(left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
      return data;
   }
   MO.FWglContext_drawTriangles = function FWglContext_drawTriangles(indexBuffer, offset, count){
      var o = this;
      var graphic = o._handle;
      var result = true;
      if(offset == null){
         offset = 0;
      }
      if(count == null){
         count = indexBuffer.count();
      }
      graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, indexBuffer._handle);
      result = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", indexBuffer, offset, count, indexBuffer._handle);
      if(!result){
          return result;
      }
      var strideCd = indexBuffer.strideCd();
      var strideValue = RWglUtility.convertIndexStride(graphic, strideCd);
      var offsetValue = 0;
      switch(strideCd){
         case EG3dIndexStride.Uint16:
            offsetValue = offset << 1;
            break;
         case EG3dIndexStride.Uint32:
            offsetValue = offset << 2;
            break;
      }
      var drawModeCd = indexBuffer.drawModeCd();
      var drawModeValue = RWglUtility.convertDrawMode(graphic, drawModeCd);
      switch(drawModeCd){
         case EG3dDrawMode.Line:
            break;
      }
      graphic.drawElements(drawModeValue, count, strideValue, offsetValue);
      o._statistics._frameTriangleCount += count;
      o._statistics._frameDrawCount++;
      result = o.checkError("drawElements", "Draw triangles failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
      if(!result){
          return result;
      }
      graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, null);
      result = o.checkError("bindBuffer", "Bind element array buffer failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
      if(!result){
          return result;
      }
      return result;
   }
   MO.FWglContext_present = function FWglContext_present(){
   }
   MO.FWglContext_checkError = function FWglContext_checkError(code, message, parameter1){
      var o = this;
      if(!o._capability.optionDebug){
         return true;
      }
      if(!MO.Runtime.isDebug()){
         return true;
      }
      var graphic = o._handle;
      var result = false;
      var error = null;
      var errorInfo = null;
      while(true){
         error = graphic.getError();
         if(error == graphic.NO_ERROR){
            result = true;
            break;
         }
         switch(error){
            case graphic.INVALID_OPERATION:
               errorInfo = "Invalid operation.";
               break;
            case graphic.INVALID_ENUM:
               errorInfo = "Invalid enum.";
               break;
            case graphic.INVALID_VALUE:
               errorInfo = "Invalid value.";
               break;
            case graphic.INVALID_FRAMEBUFFER_OPERATION:
               errorInfo = "Invalid paramebuffer opeartion.";
               break;
            case graphic.OUT_OF_MEMORY:
               errorInfo = "Out of memory.";
               break;
            default:
               errorInfo = "Unknown";
               break;
         }
      }
      if(!result){
         MO.Logger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', error, errorInfo);
      }
      return result;
   }
   MO.FWglContext_dispose = function FWglContext_dispose(){
      var o = this;
      o._data9 = null;
      o._data16 = null;
      o._recordBuffers = RObject.dispose(o._recordBuffers);
      o._recordSamplers = RObject.dispose(o._recordSamplers);
      o._contextAttributes = null;
      o._activeTextureSlot = null;
      o._handleSamplerS3tc = null;
      o._handleDebugShader = null;
      o.__base.FG3dContext.dispose.call(o);
   }
}
with(MO){
   MO.FWglCubeTexture = function FWglCubeTexture(o){
      o = RClass.inherits(this, o, FG3dCubeTexture);
      o._handle    = null;
      o.setup      = FWglCubeTexture_setup;
      o.isValid    = FWglCubeTexture_isValid;
      o.makeMipmap = FWglCubeTexture_makeMipmap;
      o.upload     = FWglCubeTexture_upload;
      o.update     = FWglCubeTexture_update;
      o.dispose    = FWglCubeTexture_dispose;
      return o;
   }
   MO.FWglCubeTexture_setup = function FWglCubeTexture_setup(){
      var o = this;
      var g = o._graphicContext._handle;
      o.__base.FG3dCubeTexture.setup.call(o);
      o._handle = g.createTexture();
   }
   MO.FWglCubeTexture_isValid = function FWglCubeTexture_isValid(){
      var o = this;
      var g = o._graphicContext._handle;
      return g.isTexture(o._handle);
   }
   MO.FWglCubeTexture_makeMipmap = function FWglCubeTexture_makeMipmap(){
      var o = this;
      var g = o._graphicContext._handle;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
      g.generateMipmap(g.TEXTURE_CUBE_MAP);
   }
   MO.FWglCubeTexture_upload = function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
      var o = this;
      var c = o._graphicContext;
      var g = c._handle;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
      o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
      o.update();
   }
   MO.FWglCubeTexture_update = function FWglCubeTexture_update(){
      var o = this;
      o.__base.FG3dCubeTexture.update.call(o);
      var g = o._graphicContext._handle;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
      var c = RWglUtility.convertSamplerFilter(g, o._filterMinCd);
      if(c){
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
      }
      var c = RWglUtility.convertSamplerFilter(g, o._filterMagCd);
      if(c){
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, c);
      }
   }
   MO.FWglCubeTexture_dispose = function FWglCubeTexture_dispose(){
      var o = this;
      var c = o._graphicContext;
      var n = o._handle;
      if(n){
         c._handle.deleteTexture(n);
         o._handle = null;
      }
      o.__base.FG3dCubeTexture.dispose.call(o);
   }
}
with(MO){
   MO.FWglFlatTexture = function FWglFlatTexture(o){
      o = RClass.inherits(this, o, FG3dFlatTexture);
      o._handle    = null;
      o.setup      = FWglFlatTexture_setup;
      o.isValid    = FWglFlatTexture_isValid;
      o.texture    = FWglFlatTexture_texture;
      o.makeMipmap = FWglFlatTexture_makeMipmap;
      o.uploadData = FWglFlatTexture_uploadData;
      o.upload     = FWglFlatTexture_upload;
      o.update     = FWglFlatTexture_update;
      o.dispose    = FWglFlatTexture_dispose;
      return o;
   }
   MO.FWglFlatTexture_setup = function FWglFlatTexture_setup(){
      var o = this;
      var g = o._graphicContext._handle;
      o.__base.FG3dFlatTexture.setup.call(o);
      o._handle = g.createTexture();
   }
   MO.FWglFlatTexture_isValid = function FWglFlatTexture_isValid(){
      var o = this;
      var g = o._graphicContext._handle;
      return g.isTexture(o._handle);
   }
   MO.FWglFlatTexture_texture = function FWglFlatTexture_texture(){
      return this;
   }
   MO.FWglFlatTexture_makeMipmap = function FWglFlatTexture_makeMipmap(){
      var o = this;
      var g = o._graphicContext._handle;
      g.bindTexture(g.TEXTURE_2D, o._handle);
      g.generateMipmap(g.TEXTURE_2D);
   }
   MO.FWglFlatTexture_uploadData = function FWglFlatTexture_uploadData(content, width, height){
      var o = this;
      var context = o._graphicContext;
      var handle = context._handle;
      var data = null;
      if(content.constructor == ArrayBuffer){
         data = new Uint8Array(content);
      }else if(content.constructor == Uint8Array){
         data = content;
      }else{
         throw new TError('Invalid content format.');
      }
      o.width = width;
      o.height = height;
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, width, height, 0, handle.RGBA, handle.UNSIGNED_BYTE, data);
      o._statusLoad = context.checkError("texImage2D", "Upload content failure.");
      o.update();
   }
   MO.FWglFlatTexture_upload = function FWglFlatTexture_upload(content){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var handle = context._handle;
      var data = null;
      var tagName = content.tagName;
      if((tagName == 'IMG') || (tagName == 'VIDEO') || (tagName == 'CANVAS')){
         data = content;
      }else if(RClass.isClass(content, FImage)){
         data = content.image();
      }else if(RClass.isClass(content, MCanvasObject)){
         data = content.htmlCanvas();
      }else{
         throw new TError('Invalid image format.');
      }
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      if(o._optionFlipY){
         handle.pixelStorei(handle.UNPACK_FLIP_Y_WEBGL, true);
      }
      handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, data);
      o.update();
      o._statusLoad = context.checkError("texImage2D", "Upload image failure.");
   }
   MO.FWglFlatTexture_update = function FWglFlatTexture_update(){
      var o = this;
      o.__base.FG3dFlatTexture.update.call(o);
      var handle = o._graphicContext._handle;
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      var code = RWglUtility.convertSamplerFilter(handle, o._filterMinCd);
      if(code){
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, code);
      }
      var code = RWglUtility.convertSamplerFilter(handle, o._filterMagCd);
      if(code){
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, code);
      }
      var code = RWglUtility.convertSamplerFilter(handle, o._wrapS);
      if(code){
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_S, code);
      }
      var code = RWglUtility.convertSamplerFilter(handle, o._wrapT);
      if(code){
         handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_T, code);
      }
   }
   MO.FWglFlatTexture_dispose = function FWglFlatTexture_dispose(){
      var o = this;
      var context = o._graphicContext;
      var handle = o._handle;
      if(handle){
         context._handle.deleteTexture(handle);
         o._handle = null;
      }
      o.__base.FG3dFlatTexture.dispose.call(o);
   }
}
with(MO){
   MO.FWglFragmentShader = function FWglFragmentShader(o){
      o = RClass.inherits(this, o, FG3dFragmentShader);
      o._handle      = null;
      o.setup        = FWglFragmentShader_setup;
      o.targetSource = FWglFragmentShader_targetSource;
      o.upload       = FWglFragmentShader_upload;
      o.dispose      = FWglFragmentShader_dispose;
      return o;
   }
   MO.FWglFragmentShader_setup = function FWglFragmentShader_setup(){
      var o = this;
      o.__base.FG3dFragmentShader.setup.call(o);
      var graphic = o._graphicContext._handle;
      o._handle = graphic.createShader(graphic.FRAGMENT_SHADER);
   }
   MO.FWglFragmentShader_targetSource = function FWglFragmentShader_targetSource(){
      var o = this;
      var source = null;
      var context = o._graphicContext;
      var capability = context.capability();
      if(capability.optionShaderSource){
         source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
      }else{
         source = o._source;
      }
      return source;
   }
   MO.FWglFragmentShader_upload = function FWglFragmentShader_upload(source){
      var o = this;
      var graphic = o._graphicContext._handle;
      var shader = o._handle;
      graphic.shaderSource(shader, source);
      graphic.compileShader(shader);
      var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
      if(!result){
         var info = graphic.getShaderInfoLog(shader);
         graphic.deleteShader(shader);
         o._handle = null;
         throw new TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
      }
      o._source = source;
      return true;
   }
   MO.FWglFragmentShader_dispose = function FWglFragmentShader_dispose(){
      var o = this;
      var context = o._graphicContext;
      var shader = o._handle;
      if(shader){
         context._handle.deleteShader(shader);
         o._handle = null;
      }
      o.__base.FG3dFragmentShader.dispose.call(o);
   }
}
with(MO){
   MO.FWglIndexBuffer = function FWglIndexBuffer(o){
      o = RClass.inherits(this, o, FG3dIndexBuffer);
      o._handle = null;
      o.setup   = FWglIndexBuffer_setup;
      o.isValid = FWglIndexBuffer_isValid;
      o.upload  = FWglIndexBuffer_upload;
      o.dispose = FWglIndexBuffer_dispose;
      return o;
   }
   MO.FWglIndexBuffer_setup = function FWglIndexBuffer_setup(){
      var o = this;
      o.__base.FG3dIndexBuffer.setup.call(o);
      o._handle = o._graphicContext._handle.createBuffer();
   }
   MO.FWglIndexBuffer_isValid = function FWglIndexBuffer_isValid(){
      var o = this;
      var g = o._graphicContext._handle;
      return g.isBuffer(o._handle);
   }
   MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(pd, pc){
      var o = this;
      var c = o._graphicContext;
      var g = c._handle;
      o._count = pc;
      var d = null;
      if((pd.constructor == Array) || (pd.constructor == ArrayBuffer)){
         if(o._strideCd == EG3dIndexStride.Uint16){
            d = new Uint16Array(pd);
         }else if(o._strideCd == EG3dIndexStride.Uint32){
            d = new Uint32Array(pd);
         }else{
            throw new TError(o, 'Index stride is invalid.');
         }
      }else if(pd.constructor == Uint16Array){
         if(o._strideCd != EG3dIndexStride.Uint16){
            throw new TError(o, 'Index stride16 is invalid.');
         }
         d = pd;
      }else if(pd.constructor == Uint32Array){
         if(o._strideCd != EG3dIndexStride.Uint32){
            throw new TError(o, 'Index stride16 is invalid.');
         }
         d = pd;
      }else{
         throw new TError(o, 'Upload index data type is invalid. (value={1})', pd);
      }
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._handle);
      c.checkError('bindBuffer', 'Bind buffer failure.');
      g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
      c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
   }
   MO.FWglIndexBuffer_dispose = function FWglIndexBuffer_dispose(){
      var o = this;
      var context = o._graphicContext;
      o._resource = null;
      var handle = o._handle;
      if(handle){
         context._handle.deleteBuffer(handle);
         o._handle = null;
      }
      o.__base.FG3dIndexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FWglLayout = function FWglLayout(o){
      o = RClass.inherits(this, o, FG3dLayout);
      o._handle  = null;
      o.setup    = FWglLayout_setup;
      o.bind     = FWglLayout_bind;
      o.unbind   = FWglLayout_unbind;
      o.active   = FWglLayout_active;
      o.deactive = FWglLayout_deactive;
      o.dispose  = FWglLayout_dispose;
      return o;
   }
   MO.FWglLayout_setup = function FWglLayout_setup(){
      var o = this;
      o.__base.FG3dLayout.setup.call(o);
      var c = o._graphicContext;
      o._handle = c._handleLayout.createVertexArrayOES();
   }
   MO.FWglLayout_bind = function FWglLayout_bind(){
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(o._handle);
   }
   MO.FWglLayout_unbind = function FWglLayout_unbind(){
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(null);
   }
   MO.FWglLayout_active = function FWglLayout_active(){
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(o._handle);
   }
   MO.FWglLayout_deactive = function FWglLayout_deactive(){
      var o = this;
      var c = o._graphicContext;
      c._handleLayout.bindVertexArrayOES(null);
   }
   MO.FWglLayout_dispose = function FWglLayout_dispose(){
      var o = this;
      var c = o._graphicContext;
      var layout = o._handle;
      if(layout){
         c._handleLayout.deleteVertexArrayOES(layout);
         o._handle = null;
      }
      o.__base.FG3dLayout.dispose.call(o);
   }
}
with(MO){
   MO.FWglProgram = function FWglProgram(o){
      o = RClass.inherits(this, o, FG3dProgram);
      o._handle        = null;
      o.setup          = FWglProgram_setup;
      o.vertexShader   = FWglProgram_vertexShader;
      o.fragmentShader = FWglProgram_fragmentShader;
      o.upload         = FWglProgram_upload;
      o.build          = FWglProgram_build;
      o.link           = FWglProgram_link;
      o.dispose        = FWglProgram_dispose;
      return o;
   }
   MO.FWglProgram_setup = function FWglProgram_setup(){
      var o = this;
      var c = g = o._graphicContext;
      o._handle = c._handle.createProgram();
   }
   MO.FWglProgram_vertexShader = function FWglProgram_vertexShader(){
      var o = this;
      var shader = o._vertexShader;
      if(!shader){
         shader = o._vertexShader = RClass.create(FWglVertexShader);
         shader.linkGraphicContext(o);
         shader.setup();
      }
      return shader;
   }
   MO.FWglProgram_fragmentShader = function FWglProgram_fragmentShader(){
      var o = this;
      var shader = o._fragmentShader;
      if(!shader){
         shader = o._fragmentShader = RClass.create(FWglFragmentShader);
         shader.linkGraphicContext(o);
         shader.setup();
      }
      return shader;
   }
   MO.FWglProgram_upload = function FWglProgram_upload(shaderCd, source){
      var o = this;
      if(shaderCd == EG3dShader.Vertex){
         o.vertexShader().upload(source);
      }else if(shaderCd == EG3dShader.Fragment){
         o.fragmentShader().upload(source);
      }else{
         throw new Error('Unknown type');
      }
   }
   MO.FWglProgram_build = function FWglProgram_build(){
      var o = this;
      var context = o._graphicContext;
      var g = context._handle;
      var pn = o._handle;
      var vertexShader = o.vertexShader();
      g.attachShader(pn, vertexShader._handle);
      var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vertexShader._handle);
      if(!result){
         return result;
      }
      var fragmentShader = o.fragmentShader();
      g.attachShader(pn, fragmentShader._handle);
      var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fragmentShader._handle);
      if(!result){
         return result;
      }
      if(o.hasAttribute()){
         var attributes = o.attributes();
         var ac = attributes.count();
         for(var n = 0; n < ac; n++){
            var attribute = attributes.at(n);
            var attributeName = attribute.name();
            g.bindAttribLocation(pn, n, attributeName);
            result = context.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, attributeName);
            if(!result){
               return result;
            }
         }
      }
   }
   MO.FWglProgram_link = function FWglProgram_link(){
      var o = this;
      var context = o._graphicContext;
      var g = context._handle;
      var result = false;
      var pn = o._handle;
      g.linkProgram(pn);
      var pr = g.getProgramParameter(pn, g.LINK_STATUS);
      if(!pr){
         var pi = g.getProgramInfoLog(pn);
         MO.Logger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
         g.deleteProgram(o._handle);
         o._handle = null;
         return false;
      }
      g.validateProgram(pn);
      var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
      if(!pr){
         var pi = g.getProgramInfoLog(pn);
      }
      g.finish();
      result = context.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
      if(!result){
         return result;
      }
      if(o.hasParameter()){
         var count = o._parameters.count();
         for(var n = 0; n < count; n++){
            var parameter = o._parameters.at(n);
            var handle = g.getUniformLocation(pn, parameter.name());
            result = context.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, parameter.name(), handle);
            if(!result){
               return result;
            }
            parameter._slot = handle;
            if(handle != null){
               parameter._statusUsed = true;
            }
         }
      }
      if(o.hasAttribute()){
         var count = o._attributes.count();
         for(var n = 0; n < count; n++){
            var attribute = o._attributes.at(n);
            var handle = g.getAttribLocation(pn, attribute.name());
            result = context.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, attribute.name(), handle);
            if(!result){
               return result;
            }
            attribute._slot = handle;
            if(handle != -1){
               attribute._statusUsed = true;
            }
         }
      }
      if(o.hasSampler()){
         var count = o._samplers.count();
         for(var n = 0; n < count; n++){
            var sampler = o._samplers.at(n);
            var handle = g.getUniformLocation(pn, sampler.name());
            result = context.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, sampler.name(), handle);
            if(!result){
               return result;
            }
            sampler._slot = handle;
            if(handle != null){
               sampler._statusUsed = true;
            }
         }
         var si = 0;
         for(var n = 0; n < count; n++){
            var sampler = o._samplers.value(n);
            if(sampler._statusUsed){
               sampler._index = si++;
            }
         }
      }
      return result;
   }
   MO.FWglProgram_dispose = function FWglProgram_dispose(){
      var o = this;
      var context = o._graphicContext;
      var handle = o._handle;
      if(handle){
         context._handle.deleteProgram(handle);
         o._handle = null;
      }
      o.__base.FG3dProgram.dispose.call(o);
   }
}
with(MO){
   MO.FWglRenderTarget = function FWglRenderTarget(o){
      o = RClass.inherits(this, o, FG3dRenderTarget);
      o._optionDepth = true;
      o._handle      = null;
      o._handleDepth = null;
      o.setup        = FWglRenderTarget_setup;
      o.build        = FWglRenderTarget_build;
      o.dispose      = FWglRenderTarget_dispose;
      return o;
   }
   MO.FWglRenderTarget_setup = function FWglRenderTarget_setup(){
      var o = this;
      o.__base.FG3dRenderTarget.setup.call(o);
      var c = o._graphicContext;
      var g = c._handle;
      o._handle = g.createFramebuffer();
      return c.checkError('createFramebuffer', 'Create frame buffer failure.');
   }
   MO.FWglRenderTarget_build = function FWglRenderTarget_build(){
      var o = this;
      var s = o._size;
      var c = o._graphicContext;
      var g = c._handle;
      g.bindFramebuffer(g.FRAMEBUFFER, o._handle);
      var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
      if(!r){
         return r;
      }
      if(o._optionDepth){
         var nd = o._handleDepth = g.createRenderbuffer();
         var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
         if(!r){
            return r;
         }
         g.bindRenderbuffer(g.RENDERBUFFER, nd);
         var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
         if(!r){
            return r;
         }
         g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, s.width, s.height);
         var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
         if(!r){
            return r;
         }
         g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
         var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._handle, nd);
         if(!r){
            return r;
         }
      }
      var ts = o._textures;
      var tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         g.bindTexture(g.TEXTURE_2D, t._handle);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
         g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, s.width, s.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
         var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._handle, o._size.width, o._size.height);
         if(!r){
            return r;
         }
         g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0 + i, g.TEXTURE_2D, t._handle, 0);
         var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._handle, t._handle);
         if(!r){
            return r;
         }
      }
   }
   MO.FWglRenderTarget_dispose = function FWglRenderTarget_dispose(){
      var o = this;
      var c = o._graphicContext;
      var n = o._handleDepth;
      if(n){
         c._handle.deleteRenderbuffer(n);
         o._handleDepth = null;
      }
      var n = o._handle;
      if(n){
         c._handle.deleteFramebuffer(n);
         o._handle = null;
      }
      o.__base.FG3dRenderTarget.dispose.call(o);
   }
}
with(MO){
   MO.FWglVertexBuffer = function FWglVertexBuffer(o){
      o = RClass.inherits(this, o, FG3dVertexBuffer);
      o._handle = null;
      o.setup   = FWglVertexBuffer_setup;
      o.isValid = FWglVertexBuffer_isValid;
      o.upload  = FWglVertexBuffer_upload;
      o.dispose = FWglVertexBuffer_dispose;
      return o;
   }
   MO.FWglVertexBuffer_setup = function FWglVertexBuffer_setup(){
      var o = this;
      o.__base.FG3dVertexBuffer.setup.call(o);
      var graphic = o._graphicContext._handle;
      o._handle = graphic.createBuffer();
   }
   MO.FWglVertexBuffer_isValid = function FWglVertexBuffer_isValid(){
      var o = this;
      var graphic = o._graphicContext._handle;
      return graphic.isBuffer(o._handle);
   }
   MO.FWglVertexBuffer_upload = function FWglVertexBuffer_upload(data, stride, count){
      var o = this;
      var context = o._graphicContext;
      var graphics = context._handle;
      o._stride = stride;
      o._count = count;
      var arrays = null;
      if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
         switch(o._formatCd){
            case EG3dAttributeFormat.Float1:
            case EG3dAttributeFormat.Float2:
            case EG3dAttributeFormat.Float3:
            case EG3dAttributeFormat.Float4:
               arrays = new Float32Array(data);
               break;
            case EG3dAttributeFormat.Byte4:
            case EG3dAttributeFormat.Byte4Normal:
               arrays = new Uint8Array(data);
               break;
            default:
               throw new TError(o, 'Unknown data type.');
         }
      }else if(data.constructor == Uint8Array){
         arrays = data;
      }else if(data.constructor == Float32Array){
         arrays = data;
      }else{
         throw new TError(o, 'Upload vertex data type is invalid. (data={1})', data);
      }
      graphics.bindBuffer(graphics.ARRAY_BUFFER, o._handle);
      context.checkError('bindBuffer', 'Bindbuffer');
      graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
      context.checkError('bufferData', 'bufferData');
   }
   MO.FWglVertexBuffer_dispose = function FWglVertexBuffer_dispose(){
      var o = this;
      var context = o._graphicContext;
      o._resource = null;
      var buffer = o._handle;
      if(buffer){
         context._handle.deleteBuffer(buffer);
         o._handle = null;
      }
      o.__base.FG3dVertexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FWglVertexShader = function FWglVertexShader(o){
      o = RClass.inherits(this, o, FG3dVertexShader);
      o._handle      = null;
      o.setup        = FWglVertexShader_setup;
      o.targetSource = FWglVertexShader_targetSource;
      o.upload       = FWglVertexShader_upload;
      o.dispose      = FWglVertexShader_dispose;
      return o;
   }
   MO.FWglVertexShader_setup = function FWglVertexShader_setup(){
      var o = this;
      o.__base.FG3dVertexShader.setup.call(o);
      var graphic = o._graphicContext._handle;
      o._handle = graphic.createShader(graphic.VERTEX_SHADER);
   }
   MO.FWglVertexShader_targetSource = function FWglVertexShader_targetSource(){
      var o = this;
      var source = null;
      var context = o._graphicContext;
      var capability = context.capability();
      if(capability.optionShaderSource){
         source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
      }else{
         source = o._source;
      }
      return source;
   }
   MO.FWglVertexShader_upload = function FWglVertexShader_upload(source){
      var o = this;
      var graphic = o._graphicContext._handle;
      var shader = o._handle;
      graphic.shaderSource(shader, source);
      graphic.compileShader(shader);
      var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
      if(!result){
         var info = graphic.getShaderInfoLog(shader);
         graphic.deleteShader(shader);
         o._handle = null;
         throw new TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
      }
      o._source = source;
      return true;
   }
   MO.FWglVertexShader_dispose = function FWglVertexShader_dispose(){
      var o = this;
      var context = o._graphicContext;
      var shader = o._handle;
      if(shader){
         context._handle.deleteShader(shader);
         o._handle = null;
      }
      o.__base.FG3dVertexShader.dispose.call(o);
   }
}
MO.RWglUtility = function RWglUtility(){
   return this;
}
MO.RWglUtility.prototype.convertFillMode = function RWglUtility_convertFillMode(graphic, fillCd){
   switch(fillCd){
      case MO.EG3dFillMode.Point:
         return graphic.POINT;
      case MO.EG3dFillMode.Line:
         return graphic.LINE;
      case MO.EG3dFillMode.Face:
         return graphic.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", fillCd);
}
MO.RWglUtility.prototype.convertDrawMode = function RWglUtility_convertDrawMode(graphic, drawCd){
   switch(drawCd){
      case MO.EG3dDrawMode.Point:
         return graphic.POINTS;
      case MO.EG3dDrawMode.Lines:
         return graphic.LINES;
      case MO.EG3dDrawMode.LineStrip:
         return graphic.LINE_STRIP;
      case MO.EG3dDrawMode.LineLoop:
         return graphic.LINE_LOOP;
      case MO.EG3dDrawMode.Triangles:
         return graphic.TRIANGLES;
      case MO.EG3dDrawMode.TriangleStrip:
         return graphic.TRIANGLE_STRIP;
      case MO.EG3dDrawMode.TriangleFan:
         return graphic.TRIANGLE_FAN;
      case MO.EG3dDrawMode.Quads:
         return graphic.QUADS;
      case MO.EG3dDrawMode.QuadStrip:
         return graphic.QUAD_STRIP;
   }
   throw new TError(this, "Convert draw mode failure. (draw_cd={1})", drawCd);
}
MO.RWglUtility.prototype.convertCullMode = function RWglUtility_convertCullMode(graphic, cullCd){
   switch(cullCd){
      case MO.EG3dCullMode.Front:
         return graphic.FRONT;
      case MO.EG3dCullMode.Back:
         return graphic.BACK;
      case MO.EG3dCullMode.Both:
         return graphic.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", cullCd);
}
MO.RWglUtility.prototype.convertDepthMode = function RWglUtility_convertDepthMode(graphic, depthCd){
   switch(depthCd){
      case MO.EG3dDepthMode.Equal:
         return graphic.EQUAL;
      case MO.EG3dDepthMode.NotEqual:
         return graphic.NOTEQUAL;
      case MO.EG3dDepthMode.Less:
         return graphic.LESS;
      case MO.EG3dDepthMode.LessEqual:
         return graphic.LEQUAL;
      case MO.EG3dDepthMode.Greater:
         return graphic.GREATER;
      case MO.EG3dDepthMode.GreaterEqual:
         return graphic.GEQUAL;
      case MO.EG3dDepthMode.Always:
         return graphic.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", depthCd);
}
MO.RWglUtility.prototype.convertBlendFactors = function RWglUtility_convertBlendFactors(graphic, blendCd){
   switch(blendCd){
      case MO.EG3dBlendMode.Zero:
         return graphic.ZERO;
      case MO.EG3dBlendMode.One:
         return graphic.ONE;
      case MO.EG3dBlendMode.SrcColor:
         return graphic.SRC_COLOR;
      case MO.EG3dBlendMode.OneMinusSrcColor:
         return graphic.ONE_MINUS_SRC_COLOR;
      case MO.EG3dBlendMode.DstColor:
         return graphic.DST_COLOR;
      case MO.EG3dBlendMode.OneMinusDstColor:
         return graphic.ONE_MINUS_DST_COLOR;
      case MO.EG3dBlendMode.SrcAlpha:
         return graphic.SRC_ALPHA;
      case MO.EG3dBlendMode.OneMinusSrcAlpha:
         return graphic.ONE_MINUS_SRC_ALPHA;
      case MO.EG3dBlendMode.DstAlpha:
         return graphic.DST_ALPHA;
      case MO.EG3dBlendMode.OneMinusDstAlpha:
         return graphic.ONE_MINUS_DST_ALPHA;
      case MO.EG3dBlendMode.SrcAlphaSaturate:
         return graphic.SRC_ALPHA_SATURATE;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", blendCd);
}
MO.RWglUtility.prototype.convertIndexStride = function RWglUtility_convertIndexStride(graphic, strideCd){
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         return graphic.UNSIGNED_SHORT;
      case MO.EG3dIndexStride.Uint32:
         return graphic.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", strideCd);
}
MO.RWglUtility.prototype.convertSamplerFilter = function RWglUtility_convertSamplerFilter(graphic, filterCd){
   switch(filterCd){
      case MO.EG3dSamplerFilter.Unknown:
         return 0;
      case MO.EG3dSamplerFilter.Nearest:
         return graphic.NEAREST;
      case MO.EG3dSamplerFilter.Linear:
         return graphic.LINEAR;
      case MO.EG3dSamplerFilter.Repeat:
         return graphic.REPEAT;
      case MO.EG3dSamplerFilter.ClampToEdge:
         return graphic.CLAMP_TO_EDGE;
      case MO.EG3dSamplerFilter.ClampToBorder:
         return graphic.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", filterCd);
}
MO.RWglUtility = new MO.RWglUtility();
MO.EDisplayTransform = new function EDisplayTransform(){
   var o = this;
   o.CameraPosition     = 'camera.position';
   o.CameraDirection    = 'camera.direction';
   o.BilboardedSphere   = 'bilboarded.sphere';
   o.BilboardedCylinder = 'bilboarded.cylinder';
   return o;
}
MO.EResourceCompress = new function EResourceCompress(){
   var o = this;
   o.None    = 'none';
   o.Deflate = 'deflate';
   o.Lzma    = 'lzma';
   return o;
}
MO.EStageKey = new function EStageKey(){
   var o = this;
   o.Forward       = MO.EKeyCode.W;
   o.Back          = MO.EKeyCode.S;
   o.Up            = MO.EKeyCode.Q;
   o.Down          = MO.EKeyCode.E;
   o.RotationLeft  = MO.EKeyCode.A;
   o.RotationRight = MO.EKeyCode.D;
   o.RotationUp    = MO.EKeyCode.Z;
   o.RotationDown  = MO.EKeyCode.X;
   o.FocusForward  = MO.EKeyCode.I;
   o.FocusBack     = MO.EKeyCode.K;
   o.FocusLeft     = MO.EKeyCode.J;
   o.FocusRight    = MO.EKeyCode.L;
   return o;
}
with(MO){
   MO.MRenderableLinker = function MRenderableLinker(o){
      o = RClass.inherits(this, o);
      o._renderable = MO.RClass.register(o, new AGetter('_renderable'));
      o.dispose     = MRenderableLinker_dispose;
      return o;
   }
   MO.MRenderableLinker_dispose = function MRenderableLinker_dispose(){
      var o = this;
      o._renderable = null;
   }
}
with(MO){
   MO.MResourceData = function MResourceData(o){
      o = RClass.inherits(this, o);
      o._ready          = false;
      o._guid           = null;
      o._index          = -1;
      o._compressData   = null;
      o._data           = null;
      o.compressData    = MResourceData_compressData;
      o.setCompressData = MResourceData_setCompressData;
      o.testReady       = MResourceData_testReady;
      o.completeData    = MResourceData_completeData;
      o.dispose         = MResourceData_dispose;
      return o;
   }
   MO.MResourceData_compressData = function MResourceData_compressData(){
      return this._compressData;
   }
   MO.MResourceData_setCompressData = function MResourceData_setCompressData(data){
      this._compressData = data;
   }
   MO.MResourceData_testReady = function MResourceData_testReady(){
      return this._ready;
   }
   MO.MResourceData_completeData = function MResourceData_completeData(data){
      var o = this;
      o._data = data;
      o._ready = true;
   }
   MO.MResourceData_dispose = function MResourceData_dispose(){
      var o = this;
      o._compressData = null;
      o._data = null;
   }
}
with(MO){
   MO.FDisplay = function FDisplay(o){
      o = RClass.inherits(this, o, FComponent, MGraphicObject);
      o._currentMatrix    = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
      o._matrix           = MO.Class.register(o, new MO.AGetter('_matrix'));
      o._location         = MO.Class.register(o, new MO.AGetter('_location'));
      o._rotation         = MO.Class.register(o, new MO.AGetter('_rotation'));
      o._scale            = MO.Class.register(o, new MO.AGetter('_scale'));
      o._visible          = true;
      o._renderables      = null;
      o.construct         = FDisplay_construct;
      o.hasRenderable     = FDisplay_hasRenderable;
      o.renderables       = FDisplay_renderables;
      o.pushRenderable    = FDisplay_pushRenderable;
      o.removeRenderable  = FDisplay_removeRenderable;
      o.clearRenderables  = FDisplay_clearRenderables;
      o.push              = FDisplay_push;
      o.remove            = FDisplay_remove;
      o.filterDisplays    = FDisplay_filterDisplays;
      o.filterRenderables = FDisplay_filterRenderables;
      o.show              = FDisplay_show;
      o.hide              = FDisplay_hide;
      o.setVisible        = FDisplay_setVisible;
      o.update            = FDisplay_update;
      o.updateMatrix      = FDisplay_updateMatrix;
      o.process           = FDisplay_process;
      o.dispose           = FDisplay_dispose;
      return o;
   }
   MO.FDisplay_construct = function FDisplay_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      o._currentMatrix = new SMatrix3d();
      o._matrix = new SMatrix3d();
      o._location = new SPoint3();
      o._rotation = new SVector3();
      o._scale = new SVector3();
      o._scale.set(1, 1, 1);
   }
   MO.FDisplay_hasRenderable = function FDisplay_hasRenderable(){
      var renderables = this._renderables;
      return renderables ? !renderables.isEmpty() : false;
   }
   MO.FDisplay_renderables = function FDisplay_renderables(){
      var o = this;
      var renderables = o._renderables;
      if(!renderables){
         renderables = o._renderables = new TObjects();
      }
      return renderables;
   }
   MO.FDisplay_pushRenderable = function FDisplay_pushRenderable(renderable){
      var o = this;
      renderable._display = o;
      o.renderables().push(renderable);
   }
   MO.FDisplay_removeRenderable = function FDisplay_removeRenderable(renderable){
      var renderables = this._renderables;
      if(renderables){
         renderables.remove(renderable);
      }
   }
   MO.FDisplay_clearRenderables = function FDisplay_clearRenderables(){
      var renderables = this._renderables;
      if(renderables){
         renderables.clear();
      }
   }
   MO.FDisplay_push = function FDisplay_push(item){
      var o = this;
      if(RClass.isClass(item, FRenderable)){
         o.pushRenderable(item);
      }else if(RClass.isClass(item, MRenderableLinker)){
         o.pushRenderable(item.renderable());
      }else if(RClass.isClass(item, FDisplay)){
         o.pushDisplay(item);
      }else{
         throw new TError(o, 'Unknown item type.');
      }
   }
   MO.FDisplay_remove = function FDisplay_remove(){
      var o = this;
      var c = o._parent;
      if(c){
         c.removeDisplay(o);
         o._parent = null;
      }
   }
   MO.FDisplay_filterDisplays = function FDisplay_filterDisplays(p){
      var o = this;
      if(o._visible){
         p.push(o);
      }
   }
   MO.FDisplay_filterRenderables = function FDisplay_filterRenderables(p){
      var o = this;
      if(!o._visible){
         return false;
      }
      var s = o._renderables;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.getAt(i).filterDrawables(p);
         }
      }
      return true;
   }
   MO.FDisplay_show = function FDisplay_show(){
      this.setVisible(true);
   }
   MO.FDisplay_hide = function FDisplay_hide(){
      this.setVisible(false);
   }
   MO.FDisplay_setVisible = function FDisplay_setVisible(p){
      this._visible = p;
   }
   MO.FDisplay_update = function FDisplay_update(){
      var o = this;
      var m = o._matrix;
      m.set(o._location, o._rotation, o._scale);
      m.update();
   }
   MO.FDisplay_updateMatrix = function FDisplay_updateMatrix(region){
      var o = this;
      o._currentMatrix.assign(o._matrix);
      var parent = o._parent;
      if(parent){
         o._currentMatrix.append(parent._currentMatrix);
      }
   }
   MO.FDisplay_process = function FDisplay_process(region){
      var o = this;
      o.updateMatrix(region);
      var renderables = o._renderables;
      if(renderables){
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            renderable.process(region);
         }
      }
   }
   MO.FDisplay_dispose = function FDisplay_dispose(){
      var o = this;
      RObject.dispose(o._currentMatrix);
      RObject.dispose(o._matrix);
      RObject.dispose(o._position);
      RObject.dispose(o._direction);
      RObject.dispose(o._scale);
      RObject.dispose(o._renderables)
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.FDisplayContainer = function FDisplayContainer(o){
      o = RClass.inherits(this, o, FDisplay);
      o._displays         = null;
      o.hasDisplay        = FDisplayContainer_hasDisplay;
      o.findDisplay       = FDisplayContainer_findDisplay;
      o.searchDisplay     = FDisplayContainer_searchDisplay;
      o.displays          = FDisplayContainer_displays;
      o.pushDisplay       = FDisplayContainer_pushDisplay;
      o.removeDisplay     = FDisplayContainer_removeDisplay;
      o.filterDisplays    = FDisplayContainer_filterDisplays;
      o.filterRenderables = FDisplayContainer_filterRenderables;
      o.process           = FDisplayContainer_process;
      o.dispose           = FDisplayContainer_dispose;
      return o;
   }
   MO.FDisplayContainer_hasDisplay = function FDisplayContainer_hasDisplay(){
      var displays = this._displays;
      if(displays){
         return !displays.isEmpty();
      }
      return false;
   }
   MO.FDisplayContainer_findDisplay = function FDisplayContainer_findDisplay(code){
      var o = this;
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            if(display.code() == code){
               return display;
            }
         }
      }
      return null
   }
   MO.FDisplayContainer_searchDisplay = function FDisplayContainer_searchDisplay(p){
      var o = this;
      var displays = o._displays;
      if(displays){
         var c = displays.count();
         for(var i = 0; i < c; i++){
            var f = displays.at(i);
            if(f.isName(p)){
               return f;
            }
            var r = f.searchDisplay(p);
            if(r){
               return r;
            }
         }
      }
      return null
   }
   MO.FDisplayContainer_displays = function FDisplayContainer_displays(){
      var o = this;
      var displays = o._displays;
      if(!displays){
         displays = o._displays = new TObjects();
      }
      return displays;
   }
   MO.FDisplayContainer_pushDisplay = function FDisplayContainer_pushDisplay(display){
      var o = this;
      display.setParent(o);
      o.displays().push(display);
   }
   MO.FDisplayContainer_removeDisplay = function FDisplayContainer_removeDisplay(display){
      var o = this;
      o.displays().remove(display);
      display.setParent(null);
   }
   MO.FDisplayContainer_filterDisplays = function FDisplayContainer_filterDisplays(region){
      var o = this;
      o.__base.FDisplay.filterDisplays.call(o, region);
      if(!o._visible){
         return false;
      }
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.filterDisplays(region);
         }
      }
   }
   MO.FDisplayContainer_filterRenderables = function FDisplayContainer_filterRenderables(region){
      var o = this;
      o.__base.FDisplay.filterRenderables.call(o, region);
      if(!o._visible){
         return false;
      }
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.filterRenderables(region);
         }
      }
      return true;
   }
   MO.FDisplayContainer_process = function FDisplayContainer_process(region){
      var o = this;
      o.__base.FDisplay.process.call(o, region);
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.process(region);
         }
      }
   }
   MO.FDisplayContainer_dispose = function FDisplayContainer_dispose(){
      var o = this;
      var displays = o._displays;
      if(displays){
         for(var i = v.count() - 1; i >= 0; i--){
            displays.at(i).dispose();
         }
         o._displays = RObject.dispose(displays);
      }
      o.__base.FDisplay.dispose.call(o);
   }
}
MO.FDisplayLayer = function FDisplayLayer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayContainer);
   o._optionClearDepth   = MO.Class.register(o, new MO.AGetSet('_optionClearDepth'), false);
   o._statusActive       = false;
   o._technique          = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._visibleRenderables = MO.Class.register(o, new MO.AGetter('_visibleRenderables'));
   o.construct           = MO.FDisplayLayer_construct;
   o.selectTechnique     = MO.FDisplayLayer_selectTechnique;
   o.filterRenderables   = MO.FDisplayLayer_filterRenderables;
   o.active              = MO.FDisplayLayer_active;
   o.deactive            = MO.FDisplayLayer_deactive;
   return o;
}
MO.FDisplayLayer_construct = function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._visibleRenderables = new MO.TObjects();
}
MO.FDisplayLayer_selectTechnique = function FDisplayLayer_selectTechnique(context, name){
   var technique = MO.Console.find(MO.FG3dTechniqueConsole).find(context, name);
   this.selectTechnique(technique);
}
MO.FDisplayLayer_filterRenderables = function FDisplayLayer_filterRenderables(p){
   var o = this;
   o.__base.FDisplayContainer.filterRenderables.call(o, p);
   o._visibleRenderables.assign(p.renderables());
}
MO.FDisplayLayer_active = function FDisplayLayer_active(){
   this._statusActive = true;
}
MO.FDisplayLayer_deactive = function FDisplayLayer_deactive(){
   this._statusActive = false;
}
MO.FDisplayUiLayer = function FDisplayUiLayer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayLayer);
   return o;
}
MO.FDrawable = function FDrawable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._visible    = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o.testVisible = MO.FDrawable_testVisible;
   o.process     = MO.Method.empty;
   return o;
}
MO.FDrawable_testVisible = function FDrawable_testVisible(){
   return this._visible;
}
MO.FRegion = function FRegion(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
with(MO){
   MO.FRenderable = function FRenderable(o){
      o = RClass.inherits(this, o, FDrawable);
      o._drawables      = null;
      o.hasDrawable     = FRenderable_hasDrawable;
      o.drawables       = FRenderable_drawables;
      o.pushDrawable    = FRenderable_pushDrawable;
      o.removeDrawable  = FRenderable_removeDrawable;
      o.filterDrawables = FRenderable_filterDrawables;
      o.process         = FRenderable_process;
      return o;
   }
   MO.FRenderable_hasDrawable = function FRenderable_hasDrawable(){
      var drawables = this._drawables;
      return drawables ? !drawables.isEmpty() : false;
   }
   MO.FRenderable_drawables = function FRenderable_drawables(){
      var o = this;
      var drawables = o._drawables;
      if(!drawables){
         drawables = o._drawables = new TObjects();
      }
      return drawables;
   }
   MO.FRenderable_pushDrawable = function FRenderable_pushDrawable(drawable){
      var o = this;
      drawable._drawable = o;
      drawable._parent = o;
      o.drawables().push(drawable);
   }
   MO.FRenderable_removeDrawable = function FRenderable_removeDrawable(drawable){
      this._drawables.remove(drawable);
   }
   MO.FRenderable_filterDrawables = function FRenderable_filterDrawables(region){
      var o = this;
      if(!o.testVisible()){
         return false;
      }
      region.pushRenderable(o);
      var drawables = o._drawables;
      if(drawables){
         var count = drawables.count();
         for(var i = 0; i < count; i++){
            var drawable = drawables.getAt(i);
            if(drawable.testVisible()){
               region.pushRenderable(drawable);
            }
         }
      }
      return true;
   }
   MO.FRenderable_process = function FRenderable_process(region){
      var o = this;
      o.__base.FDrawable.process.call(o, region);
      var drawables = o._drawables;
      if(drawables){
         var count = drawables.count();
         for(var i = 0; i < count; i++){
            var drawable = drawables.getAt(i);
            drawable.process(region);
         }
      }
   }
}
with(MO){
   MO.FStage = function FStage(o){
      o = RClass.inherits(this, o, FComponent, MListener);
      o._code                = 'stage';
      o._statusActive        = false;
      o._size                = RClass.register(o, new AGetter('_size'));
      o._timer               = RClass.register(o, new AGetter('_timer'));
      o._layers              = RClass.register(o, new AGetter('_layers'));
      o._enterFrameListeners = RClass.register(o, new AListener('_enterFrameListeners', EEvent.EnterFrame));
      o._leaveFrameListeners = RClass.register(o, new AListener('_leaveFrameListeners', EEvent.LeaveFrame));
      o.onProcess            = FStage_onProcess;
      o.construct            = FStage_construct;
      o.registerLayer        = FStage_registerLayer;
      o.unregisterLayer      = FStage_unregisterLayer;
      o.active               = FStage_active;
      o.deactive             = FStage_deactive;
      o.process              = FStage_process;
      o.dispose              = FStage_dispose;
      return o;
   }
   MO.FStage_onProcess = function FStage_onProcess(){
      var o = this;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.process();
      }
   }
   MO.FStage_construct = function FStage_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      o._size = new SSize2(1920, 1080);
      o._timer = RClass.create(FTimer);
      o._layers = new TDictionary();
   }
   MO.FStage_registerLayer = function FStage_registerLayer(code, layer){
      layer.setCode(code);
      this._layers.set(code, layer);
   }
   MO.FStage_unregisterLayer = function FStage_unregisterLayer(code){
      this._layers.set(code, null);
   }
   MO.FStage_active = function FStage_active(){
      var o = this;
      o._statusActive = true;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.active();
      }
   }
   MO.FStage_deactive = function FStage_deactive(){
      var o = this;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.deactive();
      }
      o._statusActive = false;
   }
   MO.FStage_process = function FStage_process(){
      var o = this;
      var timer = o._timer;
      if(!timer){
         timer = RClass.create(FTimer);
         timer.setup();
      }
      o.processEnterFrameListener(o);
      o.onProcess();
      o.processLeaveFrameListener(o);
      timer.update();
   }
   MO.FStage_dispose = function FStage_dispose(){
      var o = this;
      o._timer = RObject.dispose(o._timer);
      o._layers = RObject.dispose(o._layers);
      o.__base.MListener.dispose.call(o);
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.RStage = function RStage(){
      var o = this;
      o._started       = false;
      o._thread        = null;
      o._active        = true;
      o._interval      = 10;
      o._stages        = null;
      o.lsnsEnterFrame = null;
      o.lsnsLeaveFrame = null;
      o.construct();
      return o;
   }
   MO.RStage.prototype.onProcess = function RStage_onProcess(event){
      var o = this;
      if(!o._active){
         return;
      }
      try{
         o.lsnsEnterFrame.process(o);
         var stages = o._stages;
         if(stages){
            var count = stages.count();
            for(var i = 0; i < count; i++){
               var stage = stages.at(i);
               stage.process();
            }
         }
         o.lsnsLeaveFrame.process(o);
         RTimer.update();
      }catch(e){
         alert(e);
      }
   }
   MO.RStage.prototype.construct = function RStage_construct(){
      var o = this;
      o.lsnsEnterFrame = new TListeners();
      o.lsnsLeaveFrame = new TListeners();
   }
   MO.RStage.prototype.register = function RStage_register(name, stage){
      var o = this;
      var stages = o._stages;
      if(!stages){
         stages = o._stages = new TDictionary();
      }
      stages.set(name , stage);
   }
   MO.RStage.prototype.unregister = function RStage_unregister(stage){
      this._stages.removeValue(stage);
   }
   MO.RStage.prototype.active = function RStage_active(){
      var o = this;
      var stages = o._stages;
      if(stages){
         var count = stages.count();
         for(var i = 0; i < count; i++){
            var stage = stages.at(i);
            stage.active();
         }
      }
   }
   MO.RStage.prototype.process = function RStage_process(){
      this.onProcess();
   }
   MO.RStage.prototype.deactive = function RStage_deactive(){
      var o = this;
      var stages = o._stages;
      if(stages){
         var count = stages.count();
         for(var i = 0; i < count; i++){
            var stage = stages.at(i);
            stage.deactive();
         }
      }
   }
   MO.RStage.prototype.start = function RStage_start(interval){
      var o = this;
      if(o._started){
         return;
      }
      RE3dEngine.setup();
      o.active();
      RTimer.setup();
      if(interval == null){
         interval = o._interval;
      }
      o._interval = parseInt(interval);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
      o._started = true;
   }
   MO.RStage = new RStage();
}
MO.MLinkerResource = function MLinkerResource(o){
   o = MO.Class.inherits(this, o);
   o._resource      = MO.Class.register(o, new MO.AGetSet('_resource'));
   o.loadResource   = MO.MLinkerResource_loadResource;
   o.reloadResource = MO.MLinkerResource_reloadResource;
   o.dispose        = MO.MLinkerResource_dispose;
   return o;
}
MO.MLinkerResource_loadResource = function MLinkerResource_loadResource(resource){
   this._resource = resource;
}
MO.MLinkerResource_reloadResource = function MLinkerResource_reloadResource(){
   var o = this;
   o.loadResource(o._resource);
}
MO.MLinkerResource_dispose = function MLinkerResource_dispose(){
   var o = this;
   o._resource = null;
}
with(MO){
   MO.FResource = function FResource(o){
      o = RClass.inherits(this, o, FObject);
      o._typeCode     = RClass.register(o, new AGetter('_typeCode'));
      o._type         = RClass.register(o, new AGetter('_type'));
      o._guid         = RClass.register(o, new AGetSet('_guid'));
      o._code         = RClass.register(o, new AGetSet('_code'));
      o._label        = RClass.register(o, new AGetSet('_label'));
      o._sourceUrl    = RClass.register(o, new AGetSet('_sourceUrl'));
      o._dataCompress = false;
      o._dataBlock    = false;
      return o;
   }
}
with(MO){
   MO.FResourceBlockStorage = function FResourceBlockStorage(o){
      o = RClass.inherits(this, o, FResourceStorage);
      o._ready      = false;
      o._dataLength = 0;
      o._blockSize  = 0;
      o._blockCount = 0;
      o._blocks     = MO.Class.register(o, new MO.AGetter('_blocks'));
      o._resource   = null;
      o.construct   = FResourceBlockStorage_construct;
      o.testReady   = FResourceBlockStorage_testReady;
      o.load        = FResourceBlockStorage_load;
      o.complete    = FResourceBlockStorage_complete;
      o.dispose     = FResourceBlockStorage_dispose;
      return o;
   }
   MO.FResourceBlockStorage_construct = function FResourceBlockStorage_construct(){
      var o = this;
      o.__base.FResourceStorage.construct.call(o);
      o._blocks = new TObjects();
   }
   MO.FResourceBlockStorage_testReady = function FResourceBlockStorage_testReady(){
      var o = this;
      if(!o._ready){
         var blocks = o._blocks;
         var count = blocks.count();
         for(var i = 0; i < count; i++){
            var block = blocks.at(i);
            if(!block.testReady()){
               return false;
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FResourceBlockStorage_load = function FResourceBlockStorage_load(buffer){
      var o = this;
      var resource = o._resource;
      o._compressLength = buffer.byteLength;
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      view.link(buffer);
      var compressCode = view.readString();
      var length = o._dataLength = view.readInt32();
      var blockSize = o._blockSize = view.readInt32();
      var blockCount = o._blockCount = view.readInt32();
      var blocks = o._blocks;
      for(var i = 0; i < blockCount; i++){
         var size = view.readInt32();
         var blockData = new ArrayBuffer(size);
         view.readBytes(blockData, 0, size);
         var block = RClass.create(FResourceBlockStorageData);
         block._guid = resource.guid();
         block._index = i;
         block.setCompressData(blockData);
         blocks.push(block)
      }
      view.dispose();
   }
   MO.FResourceBlockStorage_complete = function FResourceBlockStorage_complete(){
      var o = this;
      var resource = o._resource;
      var stream = RClass.create(FDataStream);
      stream.setEndianCd(true);
      stream.setLength(o._dataLength);
      var blocks = o._blocks;
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         var data = block._data;
         stream.writeBytes(data.buffer, 0, data.byteLength);
      }
      stream.flip();
      var span = RTimer.current() - resource._compressStartTick;
      MO.Logger.info(o, 'Process resource storage. (guid={1}, block_count={2}, length={3}, total={4}, tick={5})', resource.guid(), count, o._compressLength, o._dataLength, span);
      resource.onComplete(stream);
      stream.dispose();
   }
   MO.FResourceBlockStorage_dispose = function FResourceBlockStorage_dispose(){
      var o = this;
      o._resource = null;
      var blocks = o._blocks;
      if(blocks){
         var count = blocks.count();
         for(var i = 0; i < count; i++){
            var block = blocks.at(i);
            block.dispose();
         }
         o._blocks = RObject.dispose(blocks);
      }
      o.__base.FResourceStorage.dispose.call(o);
   }
}
MO.FResourceBlockStorageData = function FResourceBlockStorageData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MResourceData);
   o.dispose = MO.FResourceBlockStorageData_dispose;
   return o;
}
MO.FResourceBlockStorageData_dispose = function FResourceBlockStorageData_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FResourceConsole = function FResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd          = EScope.Global;
      o._factory          = null;
      o._types            = null;
      o._resources        = null;
      o._loadResources    = null;
      o._loadingResources = null;
      o._processStorages  = null;
      o._thread           = null;
      o._loadLimit        = 8;
      o._interval         = 150;
      o.onComplete        = FResourceConsole_onComplete;
      o.onLoad            = FResourceConsole_onLoad;
      o.onBlockLoad       = FResourceConsole_onBlockLoad;
      o.onProcess         = FResourceConsole_onProcess;
      o.construct         = FResourceConsole_construct;
      o.registerType      = FResourceConsole_registerType;
      o.factory           = FResourceConsole_factory;
      o.load              = FResourceConsole_load;
      return o;
   }
   MO.FResourceConsole_onComplete = function FResourceConsole_onComplete(resource, data){
      var o = this;
      resource._data = null;
      o._loadingResources.remove(resource);
      resource.onComplete(data);
   }
   MO.FResourceConsole_onLoad = function FResourceConsole_onLoad(connection){
      var o = this;
      var data = connection.outputData();
      var resource = connection._resource;
      var storage = RClass.create(FResourceSingleStorage);
      storage.setResource(resource);
      storage.load(data);
      RConsole.find(FResourceDataConsole).load(storage);
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }
   MO.FResourceConsole_onBlockLoad = function FResourceConsole_onBlockLoad(connection){
      var o = this;
      var data = connection.outputData();
      var resource = connection._resource;
      resource._compressLength = data.byteLength;
      resource._compressStartTick = RTimer.current();
      var storage = RClass.create(FResourceBlockStorage);
      storage.setResource(resource);
      storage.load(data);
      var dataConsole = RConsole.find(FResourceDataConsole);
      var blocks = storage.blocks();
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         dataConsole.load(block);
      }
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }
   MO.FResourceConsole_onProcess = function FResourceConsole_onProcess(){
      var o = this;
      var httpConsole = RConsole.find(FHttpConsole);
      var loadResources = o._loadResources;
      var loadingResources = o._loadingResources;
      var pc = loadingResources.count();
      if(!loadResources.isEmpty()){
         for(var i = o._loadLimit - pc; i > 0; i--){
            var resource = loadResources.shift();
            var sourceUrl = resource.sourceUrl();
            var connection = httpConsole.send(sourceUrl);
            connection._resource = resource;
            if(resource._dataCompress){
               if(resource._dataBlock){
                  connection.addLoadListener(o, o.onBlockLoad);
               }else{
                  connection.addLoadListener(o, o.onLoad);
               }
            }else{
               connection.addLoadListener(o, o.onComplete);
            }
            resource._dataLoad = true;
            loadingResources.push(resource);
            if(loadResources.isEmpty()){
               break;
            }
         }
      }
      var storages = o._processStorages;
      storages.record();
      while(storages.next()){
         var storage = storages.current();
         if(storage.testReady()){
            storages.removeCurrent();
            storage.complete();
            storage.dispose();
         }
      }
   }
   MO.FResourceConsole_construct = function FResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._factory = RClass.create(FClassFactory);
      o._types = new TDictionary();
      o._resources = new TDictionary();
      o._loadResources  = new TObjects();
      o._loadingResources = new TObjects();
      o._processStorages = new TLooper();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FResourceConsole_registerType = function FResourceConsole_registerType(type){
      var o = this;
      var code = type.code();
      return o._types.set(code, type);
   }
   MO.FResourceConsole_factory = function FResourceConsole_factory(){
      return this._factory;
   }
   MO.FResourceConsole_load = function FResourceConsole_load(resource){
      var o = this;
      var guid = resource.guid();
      var resources = o._resources;
      if(resources.contains(guid)){
         throw new TError(o, 'Resource is already loaded. (guid={1})', guid);
      }
      resources.set(guid, resource);
      o._loadResources.push(resource);
      resource._dataLoad = true;
   }
}
with(MO){
   MO.FResourceDataConsole = function FResourceDataConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd           = EScope.Global;
      o._loadDatas         = null;
      o._processDatas      = null;
      o._pipeline          = null;
      o._pipelinePool      = null;
      o._thread            = null;
      o._processLimit      = 4;
      o._interval          = 200;
      o.onPipelineComplete = FResourceDataConsole_onPipelineComplete;
      o.onProcess          = FResourceDataConsole_onProcess;
      o.construct          = FResourceDataConsole_construct;
      o.allocPipeline      = FResourceDataConsole_allocPipeline;
      o.freePipeline       = FResourceDataConsole_freePipeline;
      o.load               = FResourceDataConsole_load;
      return o;
   }
   MO.FResourceDataConsole_onPipelineComplete = function FResourceDataConsole_onPipelineComplete(pipeline, data){
      var o = this;
      if(pipeline){
         o.freePipeline(pipeline);
      }
      o._processDatas.remove(data);
   }
   MO.FResourceDataConsole_onProcess = function FResourceDataConsole_onProcess(){
      var o = this;
      var loadDatas = o._loadDatas;
      var loadCount = loadDatas.count();
      if(loadCount == 0){
         return;
      }
      var pipeline = o._pipeline;
      if(pipeline){
         if(!pipeline.testBusy()){
            var data = loadDatas.shift();
            pipeline.decompress(data);
         }
      }else{
         var processDatas = o._processDatas;
         var processCount = processDatas.count();
         var idleCount = o._processLimit - processCount;
         if(idleCount <= 0){
            return;
         }
         var freeCount = Math.min(loadCount, idleCount);
         for(var i = 0; i < freeCount; i++){
            var data = loadDatas.shift();
            var pipeline = o.allocPipeline();
            pipeline.decompress(data);
            processDatas.push(data);
         }
      }
   }
   MO.FResourceDataConsole_construct = function FResourceDataConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._loadDatas  = new TObjects();
      o._processDatas = new TObjects();
      o._pipelinePool  = RClass.create(FObjectPool);
      var capability = RBrowser.capability();
      if(!capability.optionProcess){
         var pipeline = o._pipeline = RClass.create(FResourceSinglePipeline);
         pipeline.setConsole(o);
      }
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FResourceDataConsole_allocPipeline = function FResourceDataConsole_allocPipeline(){
      var o = this;
      var pool = o._pipelinePool;
      if(!pool.hasFree()){
         var pipeline = RClass.create(FResourceThreadPipeline);
         pipeline.setConsole(o);
         pool.push(pipeline);
      }
      return pool.alloc();
   }
   MO.FResourceDataConsole_freePipeline = function FResourceDataConsole_freePipeline(pipeline){
      this._pipelinePool.free(pipeline);
   }
   MO.FResourceDataConsole_load = function FResourceDataConsole_load(data){
      this._loadDatas.push(data);
   }
}
MO.FResourceGroup = function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = MO.Class.register(o, new MO.AGetter('_code'));
   o._resources = null;
   return o;
}
with(MO){
   MO.FResourcePipeline = function FResourcePipeline(o){
      o = RClass.inherits(this, o, FPipeline);
      o._console    = MO.Class.register(o, new MO.AGetSet('_console'));
      o._compressCd = MO.Class.register(o, new MO.AGetter('_compressCd'));
      o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
      o.dispose     = FResourcePipeline_dispose;
      return o;
   }
   MO.FResourcePipeline_dispose = function FResourcePipeline_dispose(){
      var o = this;
      o._console = null;
      o._resource = null;
      o.__base.FPipeline.dispose.call(o);
   }
}
with(MO){
   MO.FResourceSinglePipeline = function FResourceSinglePipeline(o){
      o = RClass.inherits(this, o, FResourcePipeline);
      o._startTime  = 0;
      o._statusBusy = false;
      o._data       = 0;
      o._dataLength = 0;
      o._worker     = null;
      o.onComplete  = FResourceSinglePipeline_onComplete;
      o.construct   = FResourceSinglePipeline_construct;
      o.testBusy    = FResourceSinglePipeline_testBusy;
      o.decompress  = FResourceSinglePipeline_decompress;
      o.dispose     = FResourceSinglePipeline_dispose;
      return o;
   }
   MO.FResourceSinglePipeline_onComplete = function FResourceSinglePipeline_onComplete(buffer){
      var o = this;
      var data = o._data;
      var bufferData = null;
      if(buffer.constructor == Array){
         bufferData = new Uint8Array(buffer);
      }else if(buffer.constructor == ArrayBuffer){
         bufferData = buffer;
      }else{
         throw new TError(o, 'Unknown buffer type.');
      }
      data.completeData(bufferData);
      var span = RTimer.now() - o._startTime;
      MO.Logger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, bufferData.byteLength, span);
      o._console.onPipelineComplete(null, data);
      o._data = null;
      o._statusBusy = false;
   }
   MO.FResourceSinglePipeline_construct = function FResourceSinglePipeline_construct(){
      var o = this;
      o.__base.FResourcePipeline.construct.call(o);
   }
   MO.FResourceSinglePipeline_testBusy = function FResourceSinglePipeline_testBusy(){
      return this._statusBusy;
   }
   MO.FResourceSinglePipeline_decompress = function FResourceSinglePipeline_decompress(data){
      var o = this;
      o._statusBusy = true;
      o._startTime = RTimer.current();
      var compressData = data.compressData();
      o._data = data;
      o._dataLength = compressData.byteLength;
      var processData = null;
      if(compressData.constructor == ArrayBuffer){
         processData = new Uint8Array(compressData);
      }else if(compressData.constructor == Uint8Array){
         processData = compressData;
      }else{
         throw new TError(o, 'Unknown data type.');
      }
      LZMAD.decompress(processData, function(buffer){o.onComplete(buffer);}, null);
   }
   MO.FResourceSinglePipeline_dispose = function FResourceSinglePipeline_dispose(){
      var o = this;
      o._data = null;
      o._worker = null;
      o.__base.FPipeline.dispose.call(o);
   }
}
MO.FResourceSingleStorage = function FResourceSingleStorage(o){
   o = MO.Class.inherits(this, o, MO.FResourceStorage, MO.MResourceData);
   o.construct   = MO.FResourceSingleStorage_construct;
   o.load        = MO.FResourceSingleStorage_load;
   o.complete    = MO.FResourceSingleStorage_complete;
   o.dispose     = MO.FResourceSingleStorage_dispose;
   return o;
}
MO.FResourceSingleStorage_construct = function FResourceSingleStorage_construct(){
   var o = this;
   o.__base.FResourceStorage.construct.call(o);
}
MO.FResourceSingleStorage_load = function FResourceSingleStorage_load(buffer){
   var o = this;
   var resource = o._resource;
   o._compressLength = buffer.byteLength;
   o._compressData = new Uint8Array(buffer);
}
MO.FResourceSingleStorage_complete = function FResourceSingleStorage_complete(){
   var o = this;
   var resource = o._resource;
   resource.onComplete(o._data);
}
MO.FResourceSingleStorage_dispose = function FResourceSingleStorage_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FResourceStorage.dispose.call(o);
}
with(MO){
   MO.FResourceStorage = function FResourceStorage(o){
      o = RClass.inherits(this, o, FObject);
      o._ready      = false;
      o._dataLength = 0;
      o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
      o.construct   = FResourceStorage_construct;
      o.testReady   = FResourceStorage_testReady;
      o.load        = FResourceStorage_load;
      o.complete    = FResourceStorage_complete;
      o.dispose     = FResourceStorage_dispose;
      return o;
   }
   MO.FResourceStorage_construct = function FResourceStorage_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FResourceStorage_testReady = function FResourceStorage_testReady(){
      return this._ready;
   }
   MO.FResourceStorage_load = function FResourceStorage_load(buffer){
   }
   MO.FResourceStorage_complete = function FResourceStorage_complete(){
   }
   MO.FResourceStorage_dispose = function FResourceStorage_dispose(){
      var o = this;
      o._resource = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FResourceThreadPipeline = function FResourceThreadPipeline(o){
      o = RClass.inherits(this, o, FResourcePipeline);
      o._startTime  = 0;
      o._data       = 0;
      o._dataLength = 0;
      o._worker     = null;
      o.onComplete  = FResourceThreadPipeline_onComplete;
      o.construct   = FResourceThreadPipeline_construct;
      o.worker      = FResourceThreadPipeline_worker;
      o.decompress  = FResourceThreadPipeline_decompress;
      o.dispose     = FResourceThreadPipeline_dispose;
      return o;
   }
   MO.FResourceThreadPipeline_onComplete = function FResourceThreadPipeline_onComplete(buffer){
      var o = this;
      var bufferData = null;
      if(buffer.constructor == Array){
         bufferData = new Uint8Array(buffer);
      }else if(buffer.constructor == Uint8Array){
         bufferData = buffer;
      }else{
         throw new TError(o, 'Unknown buffer type.');
      }
      var data = o._data;
      data.completeData(bufferData);
      var span = RTimer.now() - o._startTime;
      MO.Logger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, buffer.byteLength, span);
      o._console.onPipelineComplete(o, data);
      o._data = null;
   }
   MO.FResourceThreadPipeline_construct = function FResourceThreadPipeline_construct(){
      var o = this;
      o.__base.FResourcePipeline.construct.call(o);
   }
   MO.FResourceThreadPipeline_worker = function FResourceThreadPipeline_worker(){
      var o = this;
      var worker = o._worker;
      if(!worker){
         var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
         worker = o._worker = new LZMA_WORKER(uri);
      }
      return worker;
   }
   MO.FResourceThreadPipeline_decompress = function FResourceThreadPipeline_decompress(data){
      var o = this;
      o._startTime = RTimer.current();
      var compressData = data.compressData();
      o._data = data;
      o._dataLength = compressData.byteLength;
      var worker = o.worker();
      worker.decompress(compressData, function(buffer){o.onComplete(buffer);}, null);
   }
   MO.FResourceThreadPipeline_dispose = function FResourceThreadPipeline_dispose(){
      var o = this;
      o._data = null;
      o._worker = null;
      o.__base.FPipeline.dispose.call(o);
   }
}
with(MO){
   MO.FResourceType = function FResourceType(o){
      o = RClass.inherits(this, o, FObject);
      o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
      o._pipeline    = MO.Class.register(o, new MO.AGetSet('_pipeline'));
      o._resources   = null;
      o.construct    = FResourceType_construct;
      o.findResource = FResourceType_findResource;
      o.resources    = FResourceType_resources;
      return o;
   }
   MO.FResourceType_construct = function FResourceType_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._resources = new TDictionary();
   }
   MO.FResourceType_findResource = function FResourceType_findResource(p){
      return this._resources.get(p);
   }
   MO.FResourceType_resources = function FResourceType_resources(){
      return this._resources;
   }
}
with(MO){
   MO.FE2dCanvas = function FE2dCanvas(o){
      o = RClass.inherits(this, o, FObject, MCanvasObject);
      o._size      = RClass.register(o, new AGetter('_size'));
      o._context   = RClass.register(o, new AGetter('_context'));
      o._hCanvas   = null;
      o.onResize   = FE2dCanvas_onResize;
      o.construct  = FE2dCanvas_construct;
      o.htmlCanvas = FE2dCanvas_htmlCanvas;
      o.build      = FE2dCanvas_build;
      o.setPanel   = FE2dCanvas_setPanel;
      o.reset      = FE2dCanvas_reset;
      o.dispose    = FE2dCanvas_dispose;
      return o;
   }
   MO.FE2dCanvas_onResize = function FE2dCanvas_onResize(p){
      var o = this;
   }
   MO.FE2dCanvas_construct = function FE2dCanvas_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE2dCanvas_htmlCanvas = function FE2dCanvas_htmlCanvas(){
      return this._hCanvas;
   }
   MO.FE2dCanvas_build = function FE2dCanvas_build(hDocument){
      var o = this;
      var size = o._size;
      var width = size.width;
      var height = size.height;
      var hCanvas = o._hCanvas = RBuilder.create(hDocument, 'CANVAS');
      hCanvas.__linker = o;
      hCanvas.width = width;
      hCanvas.height = height;
      var style = hCanvas.style;
      style.width = width + 'px';
      style.height = height + 'px';
      var context = o._context = RClass.create(FG2dCanvasContext);
      context.linkCanvas(hCanvas);
   }
   MO.FE2dCanvas_setPanel = function FE2dCanvas_setPanel(hPanel){
      var o = this;
      var context = o._context;
      var hCanvas = o._hCanvas;
      o._hPanel = hPanel;
      hPanel.appendChild(hCanvas);
      o.onResize();
   }
   MO.FE2dCanvas_reset = function FE2dCanvas_reset(){
      var o = this;
      var context = o._context;
      context.clear();
   }
   MO.FE2dCanvas_dispose = function FE2dCanvas_dispose(){
      var o = this;
      o._context = RObject.dispose(o._context);
      o._hPanel = RHtml.free(o._hPanel);
      o._hCanvas = RHtml.free(o._hCanvas);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE2dCanvasConsole = function FE2dCanvasConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._pools      = null;
      o.construct   = FE2dCanvasConsole_construct;
      o.allocBySize = FE2dCanvasConsole_allocBySize;
      o.free        = FE2dCanvasConsole_free;
      return o;
   }
   MO.FE2dCanvasConsole_construct = function FE2dCanvasConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._pools = RClass.create(FObjectPools);
   }
   MO.FE2dCanvasConsole_allocBySize = function FE2dCanvasConsole_allocBySize(width, height){
      var o = this;
      var pools = o._pools;
      var code = width + 'x' + height;
      var canvas = pools.alloc(code);
      if(!canvas){
         canvas = RClass.create(FE2dCanvas);
         canvas.size().set(width, height);
         canvas.build(RWindow._hDocument);
      }
      canvas.reset();
      return canvas;
   }
   MO.FE2dCanvasConsole_free = function FE2dCanvasConsole_free(canvas){
      var o = this;
      var pools = o._pools;
      var size = canvas.size();
      var code = size.width + 'x' + size.height;
      pools.free(code, canvas);
   }
}
with(MO){
   MO.FE2dDrawable = function FE2dDrawable(o){
      o = RClass.inherits(this, o, FDrawable);
      return o;
   }
}
MO.ME3dObject = function ME3dObject(o){
   o = MO.Class.inherits(this, o, MO.MGraphicObject, MO.MAttributeCode);
   o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   return o;
}
with(MO){
   MO.FE3dCanvas = function FE3dCanvas(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerLoad, MMouseCapture);
      o._optionAlpha        = true;
      o._optionAntialias    = true;
      o._scaleRate          = 1;
      o._logicSize          = RClass.register(o, new AGetter('_logicSize'));
      o._screenSize         = RClass.register(o, new AGetter('_screenSize'));
      o._interval           = 10;
      o._hPanel             = null;
      o._hCanvas            = null;
      o.onEnterFrame        = RMethod.empty;
      o.ohTouchStart        = FE3dCanvas_ohTouchStart;
      o.ohTouchMove         = FE3dCanvas_ohTouchMove;
      o.ohTouchStop         = FE3dCanvas_ohTouchStop;
      o.onMouseCaptureStart = RMethod.empty;
      o.onMouseCapture      = RMethod.empty;
      o.onMouseCaptureStop  = RMethod.empty;
      o.onTouchStart        = RMethod.empty;
      o.onTouchMove         = RMethod.empty;
      o.onTouchStop         = RMethod.empty;
      o.onResize            = FE3dCanvas_onResize;
      o.construct           = FE3dCanvas_construct;
      o.build               = FE3dCanvas_build;
      o.resize              = FE3dCanvas_resize;
      o.setPanel            = FE3dCanvas_setPanel;
      o.dispose             = FE3dCanvas_dispose;
      return o;
   }
   MO.FE3dCanvas_ohTouchStart = function FE3dCanvas_ohTouchStart(event){
      this.__linker.onTouchStart(event);
   }
   MO.FE3dCanvas_ohTouchMove = function FE3dCanvas_ohTouchMove(event){
      this.__linker.onTouchMove(event);
   }
   MO.FE3dCanvas_ohTouchStop = function FE3dCanvas_ohTouchStop(event){
      this.__linker.onTouchStop(event);
   }
   MO.FE3dCanvas_onResize = function FE3dCanvas_onResize(event){
      var o = this;
      var hPanel = o._hPanel;
      var width = hPanel.offsetWidth;
      var height = hPanel.offsetHeight;
      if(o._screenSize.equalsData(width, height)){
         return;
      }
      o._screenSize.set(width, height);
      var hCanvas = o._hCanvas;
      var scaleWidth = hCanvas.width = width * o._scaleRate;
      var scaleHeight = hCanvas.height = height * o._scaleRate;
      var context = o._graphicContext;
      var ratioX = o._logicSize.width / scaleWidth;
      var ratioY = o._logicSize.height / scaleHeight;
      var ratio = Math.max(ratioX, ratioY);
      context.logicSize().assign(o._logicSize);
      context.setRatio(ratio);
      context.sizeRatio().set(ratioX, ratioY);
      context.setViewport(0, 0, scaleWidth, scaleHeight);
   }
   MO.FE3dCanvas_construct = function FE3dCanvas_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._logicSize = new SSize2(1280, 720);
      o._screenSize = new SSize2(0, 0);
   }
   MO.FE3dCanvas_build = function FE3dCanvas_build(hPanel){
      var o = this;
      var hCanvas = o._hCanvas = RBuilder.create(hPanel, 'CANVAS');
      hCanvas.__linker = o;
      hCanvas.style.width = '100%';
      hCanvas.style.height = '100%';
      if(!RMethod.isEmpty(o.onTouchStart)){
         hCanvas.addEventListener('touchstart', o.ohTouchStart, false);
      }
      if(!RMethod.isEmpty(o.onTouchMove)){
         hCanvas.addEventListener('touchmove', o.ohTouchMove, false);
      }
      if(!RMethod.isEmpty(o.onTouchStop)){
         hCanvas.addEventListener('touchend', o.ohTouchStop, false);
      }
      var parameters = new Object();
      parameters.alpha = o._optionAlpha;
      parameters.antialias = o._optionAntialias;
      o._graphicContext = REngine3d.createContext(FWglContext, hCanvas, parameters);
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start(o._interval);
      RWindow.lsnsResize.register(o, o.onResize);
      RWindow.lsnsOrientation.register(o, o.onResize);
      RConsole.find(FMouseConsole).register(o);
   }
   MO.FE3dCanvas_resize = function FE3dCanvas_resize(){
      this.onResize();
   }
   MO.FE3dCanvas_setPanel = function FE3dCanvas_setPanel(hPanel){
      var o = this;
      hPanel.appendChild(o._hCanvas);
      o._hPanel = hPanel;
      o.onResize();
   }
   MO.FE3dCanvas_dispose = function FE3dCanvas_dispose(){
      var o = this;
      var h = o._hCanvas;
      if(h){
         h.__linker = null;
         h.removeEventListener('touchstart', o.ohTouchStart);
         h.removeEventListener('touchmove', o.ohTouchMove);
         h.removeEventListener('touchend', o.ohTouchStop);
      }
      o._graphicContext = RObject.dispose(o._graphicContext);
      o._screenSize = RObject.dispose(o._screenSize);
      o._logicSize = RObject.dispose(o._logicSize);
      o._hPanel = RHtml.free(o._hPanel);
      o._hCanvas = RHtml.free(o._hCanvas);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3dDisplay = function FE3dDisplay(o){
      o = RClass.inherits(this, o, FDisplay);
      o._outline         = null;
      o._materials       = RClass.register(o, new AGetter('_materials'));
      o.construct        = FE3dDisplay_construct;
      o.calculateOutline = FE3dDisplay_calculateOutline;
      o.dispose          = FE3dDisplay_dispose;
      return o;
   }
   MO.FE3dDisplay_construct = function FE3dDisplay_construct(){
      var o = this;
      o.__base.FDisplay.construct.call(o);
      o._outline = new SOutline3();
   }
   MO.FE3dDisplay_calculateOutline = function FE3dDisplay_calculateOutline(){
      return this._outline;
   }
   MO.FE3dDisplay_dispose = function FE3dDisplay_dispose(){
      var o = this;
      o._materials = RObject.free(o._materials);
      o.__base.FDisplay.dispose.call(o);
   }
}
MO.FE3dDisplayContainer = function FE3dDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayContainer);
   o._outline         = null;
   o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));
   o.construct        = MO.FE3dDisplayContainer_construct;
   o.calculateOutline = MO.FE3dDisplayContainer_calculateOutline;
   o.dispose          = MO.FE3dDisplayContainer_dispose;
   return o;
}
MO.FE3dDisplayContainer_construct = function FE3dDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._outline = new MO.SOutline3d();
}
MO.FE3dDisplayContainer_calculateOutline = function FE3dDisplayContainer_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var renderables = o._renderables;
      if(renderables){
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            var renderableOutline = renderable.calculateOutline()
            outline.mergeMax(renderableOutline);
         }
      }
   }
   return outline;
}
MO.FE3dDisplayContainer_dispose = function FE3dDisplayContainer_dispose(){
   var o = this;
   o._materials = RObject.dispose(o._materials);
   o.__base.FDisplayContainer.dispose.call(o);
}
with(MO){
   MO.FE3dRenderable = function FE3dRenderable(o){
      o = RClass.inherits(this, o, FRenderable, MG3dRenderable, MGraphicObject, MLinkerResource);
      o._display           = RClass.register(o, new AGetSet('_display'));
      o._outline           = null;
      o._outlineVisible    = true;
      o._calculateMatrix   = null;
      o._vertexCount       = RClass.register(o, new AGetter('_vertexCount'));
      o._vertexBuffers     = RClass.register(o, new AGetter('_vertexBuffers'));
      o._indexBuffers      = RClass.register(o, new AGetter('_indexBuffers'));
      o._materialReference = RClass.register(o, new AGetter('_materialReference'));
      o._materials         = RClass.register(o, new AGetter('_materials'));
      o._bones             = RClass.register(o, new AGetter('_bones'));
      o._textures          = RClass.register(o, new AGetter('_textures'));
      o.construct          = FE3dRenderable_construct;
      o.setup              = RMethod.empty;
      o.testReady          = RMethod.emptyTrue;
      o.testVisible        = FE3dRenderable_testVisible;
      o.findVertexBuffer   = FE3dRenderable_findVertexBuffer;
      o.pushVertexBuffer   = FE3dRenderable_pushVertexBuffer;
      o.pushIndexBuffer    = FE3dRenderable_pushIndexBuffer;
      o.pushMaterial       = FE3dRenderable_pushMaterial;
      o.findTexture        = FE3dRenderable_findTexture;
      o.pushTexture        = FE3dRenderable_pushTexture;
      o.processDelay       = RMethod.empty;
      o.update             = FE3dRenderable_update;
      o.remove             = FE3dRenderable_remove;
      return o;
   }
   MO.FE3dRenderable_construct = function FE3dRenderable_construct(){
      var o = this;
      o.__base.FRenderable.construct.call(o);
      o.__base.MG3dRenderable.construct.call(o);
      o._outline = new SOutline3d();
      o._calculateMatrix = new SMatrix3d();
      o._vertexBuffers = new TDictionary();
      o._materialReference = o;
   }
   MO.FE3dRenderable_testVisible = function FE3dRenderable_testVisible(){
      var o = this;
      var ready = o.testReady();
      if(!ready){
         return false;
      }
      var visible = o.__base.FRenderable.testVisible.call(o);
      if(!visible){
         return false;
      }
      if(!o._outlineVisible){
         return false;
      }
      var material = o._material;
      if(material){
         if(!material.testVisible()){
            return false;
         }
      }
      return true;
   }
   MO.FE3dRenderable_findVertexBuffer = function FE3dRenderable_findVertexBuffer(code){
      return this._vertexBuffers.get(code);
   }
   MO.FE3dRenderable_pushVertexBuffer = function FE3dRenderable_pushVertexBuffer(buffer){
      var o = this;
      var code = buffer.code();
      if(RString.isEmpty(code)){
         throw new TError('Buffer code is empty.');
      }
      var buffers = o._vertexBuffers;
      if(!buffers){
         buffers =  o._vertexBuffers = new TDictionary();
      }
      buffers.set(code, buffer);
   }
   MO.FE3dRenderable_pushIndexBuffer = function FE3dRenderable_pushIndexBuffer(buffer){
      var o = this;
      var buffers = o._indexBuffers;
      if(!buffers){
         buffers =  o._indexBuffers = new TObjects();
      }
      buffers.push(buffer);
   }
   MO.FE3dRenderable_pushMaterial = function FE3dRenderable_pushMaterial(material){
      var o = this;
      var materials = o._materials;
      if(!materials){
         materials = o._materials = new TObjects();
      }
      materials.push(material);
   }
   MO.FE3dRenderable_findTexture = function FE3dRenderable_findTexture(name){
      return this._textures.get(name);
   }
   MO.FE3dRenderable_pushTexture = function FE3dRenderable_pushTexture(texture, code){
      var o = this;
      var textures = o._textures;
      if(!textures){
         textures = o._textures = new TDictionary();
      }
      if(code != null){
         textures.set(code, texture);
      }else if(texture._name){
         textures.set(texture._name, texture);
      }else{
         textures.set(texture.code(), texture);
      }
   }
   MO.FE3dRenderable_update = function FE3dRenderable_update(region){
      var o = this;
      var calculateMatrix = o._calculateMatrix;
      calculateMatrix.assign(o._matrix);
      var drawable = o._drawable;
      if(drawable){
         calculateMatrix.append(drawable.currentMatrix());
      }
      var display = o._display;
      if(display){
         calculateMatrix.append(display.currentMatrix());
      }
      var changed = o._currentMatrix.attachData(calculateMatrix.data());
      if(changed && region){
         region.change();
      }
   }
   MO.FE3dRenderable_remove = function FE3dRenderable_remove(){
      var o = this;
      var display = o._display;
      if(display){
         display.removeRenderable(o);
         o._display = null;
      }
   }
}
with(MO){
   MO.FE3dStage = function FE3dStage(o){
      o = RClass.inherits(this, o, FStage, MGraphicObject);
      o._statistics        = RClass.register(o, new AGetter('_statistics'));
      o._technique         = RClass.register(o, new AGetter('_technique'));
      o._region            = RClass.register(o, new AGetter('_region'));
      o._allDisplays       = null;
      o.onProcess          = FE3dStage_onProcess;
      o.construct          = FE3dStage_construct;
      o.createRegion       = FE3dStage_createRegion;
      o.linkGraphicContext = FE3dStage_linkGraphicContext;
      o.setup              = FE3dStage_setup;
      o.camera             = FE3dStage_camera;
      o.projection         = FE3dStage_projection;
      o.directionalLight   = FE3dStage_directionalLight;
      o.selectTechnique    = FE3dStage_selectTechnique;
      o.filterDisplays     = FE3dStage_filterDisplays;
      o.allDisplays        = FE3dStage_allDisplays;
      return o;
   }
   MO.FE3dStage_onProcess = function FE3dStage_onProcess(){
      var o = this;
      var region = o._region;
      if(!region){
         return;
      }
      var technique = o._technique;
      if(!technique){
         return;
      }
      var context = technique._graphicContext;
      var statistics = region._statistics = o._statistics;
      statistics.resetFrame();
      statistics._frame.begin();
      statistics._frameProcess.begin();
      context.prepare();
      technique.updateRegion(region);
      region.prepare();
      region.change();
      var layers = o._layers;
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         region.reset();
         layer.process(region);
         layer.filterRenderables(region);
         region.update();
      }
      RConsole.find(FE3dStageConsole).process(region);
      statistics._frameProcess.end();
      statistics._frameDraw.begin();
      if(region.isChanged()){
         technique.clear(region.backgroundColor());
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            var layerTechnique = layer.technique();
            if(!layerTechnique){
               layerTechnique = technique;
            }
            region.reset();
            region.renderables().assign(layer.visibleRenderables());
            if(layer.optionClearDepth()){
               layerTechnique.clearDepth();
            }
            layerTechnique.drawRegion(region);
         }
         technique.present(region);
      }
      statistics._frameDraw.end();
      statistics._frame.end();
   }
   MO.FE3dStage_construct = function FE3dStage_construct(){
      var o = this;
      o.__base.FStage.construct.call(o);
      o._statistics = RClass.create(FE3dStageStatistics);
      RConsole.find(FStatisticsConsole).register('engine.stage', o._statistics);
      o._allDisplays = new TObjects();
      var region = o._region = o.createRegion();
      region._timer = o._timer;
   }
   MO.FE3dStage_createRegion = function FE3dStage_createRegion(){
      return RClass.create(FE3dRegion);
   }
   MO.FE3dStage_linkGraphicContext = function FE3dStage_linkGraphicContext(context){
      var o = this;
      o.__base.MGraphicObject.linkGraphicContext.call(o, context);
      var region = o._region;
      if(region){
         region.linkGraphicContext(context);
      }
   }
   MO.FE3dStage_setup = function FE3dStage_setup(){
      var o = this;
      o.__base.FStage.construct.call(o);
      o._region.linkGraphicContext(o);
      o._region.setup();
   }
   MO.FE3dStage_camera = function FE3dStage_camera(){
      return this._region.camera();
   }
   MO.FE3dStage_projection = function FE3dStage_projection(){
      return this._region.camera().projection();
   }
   MO.FE3dStage_directionalLight = function FE3dStage_directionalLight(){
      return this._region.directionalLight();
   }
   MO.FE3dStage_selectTechnique = function FE3dStage_selectTechnique(context, clazz){
      var o = this;
      var techniqueConsole = RConsole.find(FG3dTechniqueConsole);
      var technique = o._technique = techniqueConsole.find(context, clazz);
      return technique;
   }
   MO.FE3dStage_filterDisplays = function FE3dStage_filterDisplays(displays){
      var o = this;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.filterDisplays(displays);
      }
   }
   MO.FE3dStage_allDisplays = function FE3dStage_allDisplays(){
      var o = this;
      var displays = o._allDisplays;
      displays.clear();
      o.filterDisplays(displays);
      return displays;
   }
}
with(MO){
   MO.FE3dStageConsole = function FE3dStageConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._looper   = null;
      o._thread   = null;
      o._interval = 25;
      o._limit    = 8;
      o.onProcess = FE3dStageConsole_onProcess;
      o.construct = FE3dStageConsole_construct;
      o.process   = FE3dStageConsole_process;
      return o;
   }
   MO.FE3dStageConsole_onProcess = function FE3dStageConsole_onProcess(){
      var o = this;
      var looper = o._looper;
      looper.record();
      for(var i = o._limit - 1; i >= 0; i--){
         var renderable = looper.next();
         if(renderable){
            renderable.processDelay(renderable._linkRegion);
         }else{
            break;
         }
      }
   }
   MO.FE3dStageConsole_construct = function FE3dStageConsole_construct(){
      var o = this;
      o._looper = new TLooper();
      o._renderables = new TDictionary();
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3dStageConsole_process = function FE3dStageConsole_process(region){
      var o = this;
      var renderables = region.allRenderables();
      for(var i = renderables.count() - 1; i >= 0; i--){
         var renderable = renderables.at(i);
         if(!renderable._linkStageLooper){
            renderable._linkRegion = region;
            renderable._linkStageLooper = o._looper;
            o._looper.push(renderable);
         }
      }
   }
}
MO.FE3dStageStatistics = function FE3dStageStatistics(o){
   o = MO.Class.inherits(this, o, MO.FStatistics);
   o._frame               = null;
   o._frameProcess        = null;
   o._frameDraw           = null;
   o._frameDrawSort       = null;
   o._frameDrawRenderable = null;
   o.construct            = MO.FE3dStageStatistics_construct;
   o.reset                = MO.FE3dStageStatistics_reset;
   o.resetFrame           = MO.FE3dStageStatistics_resetFrame;
   return o;
}
MO.FE3dStageStatistics_construct = function FE3dStageStatistics_construct(){
   var o = this;
   o.__base.FStatistics.construct.call(o);
   o._frame = new MO.TSpeed();
   o._frameProcess = new MO.TSpeed();
   o._frameDraw = new MO.TSpeed();
   o._frameDrawSort = new MO.TSpeed();
   o._frameDrawRenderable = new MO.TSpeed();
}
MO.FE3dStageStatistics_reset = function FE3dStageStatistics_reset(){
}
MO.FE3dStageStatistics_resetFrame = function FE3dStageStatistics_resetFrame(){
   var o = this;
   o._frame.reset();
   o._frameProcess.reset();
   o._frameDraw.reset();
   o._frameDrawSort.reset();
   o._frameDrawRenderable.reset();
}
MO.FE3dTechnique = function FE3dTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechnique, MO.MLinkerResource);
   return o;
}
with(MO){
   MO.RE3dEngine = function RE3dEngine(){
      var o = this;
      o._setuped = false;
      return o;
   }
   MO.RE3dEngine.prototype.onSetup = function RE3dEngine_onSetup(){
      var effectConsole = RConsole.find(FG3dEffectConsole);
      effectConsole.register('select.select.flat', FG3dSelectAutomaticEffect);
      effectConsole.register('select.select.control', FG3dSelectAutomaticEffect);
      effectConsole.register('select.select.automatic', FG3dSelectAutomaticEffect);
      effectConsole.register('select.select.skeleton', FG3dSelectSkeletonEffect);
      effectConsole.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
      effectConsole.register('control.control.automatic', FE3dControlAutomaticEffect);
      effectConsole.register('control.control.control', FE3dControlAutomaticEffect);
      effectConsole.register('general.color.control', FE3dControlAutomaticEffect);
      effectConsole.register('general.color.flat', FE3dGeneralColorFlatEffect);
      effectConsole.register('general.color.automatic', FE3dGeneralColorAutomaticEffect);
      effectConsole.register('general.color.skin', FE3dGeneralColorAutomaticEffect);
      effectConsole.register('general.color.parallax', FE3dGeneralColorAutomaticEffect);
      effectConsole.register('general.color.skeleton', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('general.color.skeleton.4', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('general.color.fur.skeleton', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('general.color.fur.skeleton.4', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('shadow.depth.automatic', FE3dShadowDepthAutomaticEffect);
      effectConsole.register('shadow.depth.skeleton', FE3dShadowDepthSkeletonEffect);
      effectConsole.register('shadow.color.automatic', FE3dShadowColorAutomaticEffect);
      effectConsole.register('shadow.color.skeleton', FE3dShadowColorSkeletonEffect);
   }
   MO.RE3dEngine.prototype.setup = function RE3dEngine_setup(){
      var o = this;
      if(!o._setuped){
         o.onSetup();
         o._setuped = true;
      }
   }
   MO.RE3dEngine = new RE3dEngine();
}
MO.EE3sResource = new function EE3sResource(){
   var o = this;
   o.Unknown  = 'Unknown';
   o.Bitmap   = 'Bitmap';
   o.Material = 'Material';
   o.Mesh     = 'Mesh';
   o.Model    = 'Model';
   o.Template = 'Template';
   o.Scene    = 'Scene';
   o.Project  = 'Project';
   o.All      = 'All';
   return o;
}
with(MO){
   MO.ME3sGeometry = function ME3sGeometry(o){
      o = RClass.inherits(this, o);
      o._outline         = null;
      o._streams         = null;
      o.construct        = ME3sGeometry_construct;
      o.outline          = ME3sGeometry_outline;
      o.findStream       = ME3sGeometry_findStream;
      o.streams          = ME3sGeometry_streams;
      o.calculateOutline = ME3sGeometry_calculateOutline;
      o.dispose          = ME3sGeometry_dispose;
      return o;
   }
   MO.ME3sGeometry_construct = function ME3sGeometry_construct(){
      var o = this;
      o._outline = new SOutline3d();
   }
   MO.ME3sGeometry_outline = function ME3sGeometry_outline(){
      return this._outline;
   }
   MO.ME3sGeometry_findStream = function ME3sGeometry_findStream(code){
      var o = this;
      var streams = o._streams;
      var count = streams.count();
      for(n = 0; n < count; n++){
         var stream = streams.getAt(n);
         if(stream.code() == code){
            return stream;
         }
      }
      return null;
   }
   MO.ME3sGeometry_streams = function ME3sGeometry_streams(){
      return this._streams;
   }
   MO.ME3sGeometry_calculateOutline = function ME3sGeometry_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         outline.setMin();
         var stream = o.findStream('position');
         var dataCount = stream.dataCount();
         var data = new Float32Array(stream.data())
         var index = 0;
         for(var i = 0; i < dataCount; i++){
            var x = data[index++];
            var y = data[index++];
            var z = data[index++];
            outline.mergePoint(x, y, z);
         }
         outline.update();
      }
      return outline;
   }
   MO.ME3sGeometry_dispose = function ME3sGeometry_dispose(){
      var o = this;
      o._outline = RObject.dispose(o._outline);
      o.__base.FE3sSpace.dispose.call(o);
   }
}
with(MO){
   MO.SE3sCompressEvent = function SE3sCompressEvent(w, f, d){
      var o = this;
      o.owner   = w;
      o.process = f;
      o.data    = d;
      return o;
   }
}
with(MO){
   MO.SE3sMaterialInfo = function SE3sMaterialInfo(){
      var o = this;
      SG3dMaterialInfo.call(o);
      o.unserialize = SE3sMaterialInfo_unserialize;
      o.saveConfig  = SE3sMaterialInfo_saveConfig;
      return o;
   }
   MO.SE3sMaterialInfo_unserialize = function SE3sMaterialInfo_unserialize(input){
      var o = this;
      o.effectCode = input.readString();
      o.optionDepth = input.readBoolean();
      o.optionDouble = input.readBoolean();
      o.optionNormalInvert = input.readBoolean();
      o.optionShadow = input.readBoolean();
      o.optionShadowSelf = input.readBoolean();
      o.optionAlpha = input.readBoolean();
      o.alphaBase = input.readFloat();
      o.alphaRate = input.readFloat();
      o.optionColor = input.readBoolean();
      o.colorMin = input.readFloat();
      o.colorMax = input.readFloat();
      o.colorBalance = input.readFloat();
      o.colorRate = input.readFloat();
      o.optionVertex = input.readBoolean();
      o.vertexColor.unserialize(input);
      o.optionAmbient = input.readBoolean();
      o.ambientColor.unserialize(input);
      o.optionDiffuse = input.readBoolean();
      o.diffuseColor.unserialize(input);
      o.optionDiffuseView = input.readBoolean();
      o.diffuseViewColor.unserialize(input);
      o.optionSpecular = input.readBoolean();
      o.specularColor.unserialize(input);
      o.specularBase = input.readFloat();
      o.specularLevel = input.readFloat();
      o.optionSpecularView = input.readBoolean();
      o.specularViewColor.unserialize(input);
      o.specularViewBase = input.readFloat();
      o.specularViewLevel = input.readFloat();
      o.optionReflect = input.readBoolean();
      o.reflectColor.unserialize(input);
      o.reflectMerge = input.readFloat();
      o.optionRefract = input.readBoolean();
      o.refractFrontColor.unserialize(input);
      o.refractBackColor.unserialize(input);
      o.optionOpacity = input.readBoolean();
      o.opacityColor.unserialize(input);
      o.opacityRate = input.readFloat();
      o.opacityAlpha = input.readFloat();
      o.opacityDepth = input.readFloat();
      o.opacityTransmittance = input.readFloat();
      o.optionEmissive = input.readBoolean();
      o.emissiveColor.unserialize(input);
   }
   MO.SE3sMaterialInfo_saveConfig = function SE3sMaterialInfo_saveConfig(xconfig){
      var o = this;
      xconfig.set('effect_code', o.effectCode);
      xconfig.setBoolean('option_double', o.optionDouble);
      xconfig.setBoolean('option_alpha', o.optionAlpha);
      xconfig.setBoolean('option_normal_invert', o.optionNormalInvert);
      xconfig.setBoolean('option_shadow', o.optionShadow);
      xconfig.setBoolean('option_shadow_self', o.optionShadowSelf);
      var x = xconfig.create('Alpha');
      x.setBoolean('valid', o.optionAlpha);
      x.setFloat('base', o.alphaBase);
      x.setFloat('rate', o.alphaRate);
      var x = xconfig.create('Color');
      x.setBoolean('valid', o.optionColor);
      x.setFloat('min', o.colorMin);
      x.setFloat('max', o.colorMax);
      x.setFloat('balance', o.colorBalance);
      x.setFloat('rate', o.colorRate);
      var x = xconfig.create('Vertex')
      x.setBoolean('valid', o.optionVertex);
      o.vertexColor.savePower(x);
      var x = xconfig.create('Ambient')
      x.setBoolean('valid', o.optionAmbient);
      o.ambientColor.savePower(x);
      var x = xconfig.create('Diffuse');
      x.setBoolean('valid', o.optionDiffuse);
      o.diffuseColor.savePower(x);
      var x = xconfig.create('DiffuseView');
      x.setBoolean('valid', o.optionDiffuseView);
      o.diffuseViewColor.savePower(x);
      var x = xconfig.create('Specular');
      x.setBoolean('valid', o.optionSpecular);
      o.specularColor.savePower(x);
      x.setFloat('base', o.specularBase);
      x.setFloat('level', o.specularLevel);
      var x = xconfig.create('SpecularView');
      x.setBoolean('valid', o.optionSpecularView);
      o.specularViewColor.savePower(x);
      x.setFloat('base', o.specularViewBase);
      x.setFloat('level', o.specularViewLevel);
      var x = xconfig.create('Reflect');
      x.setBoolean('valid', o.optionReflect);
      o.reflectColor.savePower(x);
      x.setFloat('merge', o.reflectMerge);
      var x = xconfig.create('Refract')
      x.setBoolean('valid', o.optionRefract);
      o.refractFrontColor.savePower(x.create('Front'));
      o.refractBackColor.savePower(x.create('Back'));
      var x = xconfig.create('Opacity')
      x.setBoolean('valid', o.optionOpacity);
      o.opacityColor.savePower(x);
      x.setFloat('rate', o.opacityRate);
      x.setFloat('alpha', o.opacityAlpha);
      x.setFloat('depth', o.opacityDepth);
      x.setFloat('transmittance', o.opacityTransmittance);
      var x = xconfig.create('Emissive')
      x.setBoolean('valid', o.optionEmissive);
      o.emissiveColor.savePower(x);
   }
}
with(MO){
   MO.SE3sSceneShadow = function SE3sSceneShadow(){
      var o = this;
      o.base        = null;
      o.rate        = null;
      o.level       = null;
      o.range       = null;
      o.unserialize = SE3sSceneShadow_unserialize;
      return o;
   }
   MO.SE3sSceneShadow_unserialize = function SE3sSceneShadow_unserialize(p){
      var o = this;
      o.base = p.readFloat();
      o.rate = p.readFloat();
      o.level = p.readFloat();
      o.range = p.readFloat();
   }
}
with(MO){
   MO.FE3sAnimation = function FE3sAnimation(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._model           = null;
      o._skeletonGuid    = null;
      o._skeleton        = null;
      o._frameCount      = 0;
      o._frameTick       = 0;
      o._frameSpan       = 0;
      o._frameTranslates = null;
      o._frameRotations  = null;
      o._frameScales     = null;
      o._tracks          = null;
      o.skeletonGuid     = FE3sAnimation_skeletonGuid;
      o.skeleton         = FE3sAnimation_skeleton;
      o.frameCount       = FE3sAnimation_frameCount;
      o.frameTick        = FE3sAnimation_frameTick;
      o.frameSpan        = FE3sAnimation_frameSpan;
      o.tracks           = FE3sAnimation_tracks;
      o.unserialize      = FE3sAnimation_unserialize;
      return o;
   }
   MO.FE3sAnimation_skeletonGuid = function FE3sAnimation_skeletonGuid(){
      return this._skeletonGuid;
   }
   MO.FE3sAnimation_skeleton = function FE3sAnimation_skeleton(){
      var o = this;
      var skeleton = o._skeleton;
      if(!skeleton){
         var guid = o._skeletonGuid;
         if(guid){
            skeleton = o._skeleton = RConsole.find(FE3sModelConsole).findSkeleton(guid);
         }
      }
      return skeleton;
   }
   MO.FE3sAnimation_frameCount = function FE3sAnimation_frameCount(){
      return this._frameCount;
   }
   MO.FE3sAnimation_frameTick = function FE3sAnimation_frameTick(){
      return this._frameTick;
   }
   MO.FE3sAnimation_frameSpan = function FE3sAnimation_frameSpan(){
      return this._frameSpan;
   }
   MO.FE3sAnimation_tracks = function FE3sAnimation_tracks(){
      return this._tracks;
   }
   MO.FE3sAnimation_unserialize = function FE3sAnimation_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input)
      o._skeletonGuid = input.readString();
      o._frameCount = input.readUint16();
      o._frameTick = input.readUint16();
      o._frameSpan = input.readUint32();
      var translateCount = input.readUint32();
      var translateBytes = RInteger.strideByte(translateCount);
      if(translateCount > 0){
         var translates = o._frameTranslates = new TObjects();
         for(var i = 0; i < translateCount; i++){
            var translate = new SPoint3();
            translate.unserialize(input);
            translates.push(translate);
         }
      }
      var rotationCount = input.readUint32();
      var rotationBytes = RInteger.strideByte(rotationCount);
      if(rotationCount > 0){
         var rotations = o._frameRotations = new TObjects();
         for(var i = 0; i < rotationCount; i++){
            var rotation = new SQuaternion();
            rotation.unserialize(input);
            rotations.push(rotation);
         }
      }
      var scaleCount = input.readUint32();
      var scaleBytes = RInteger.strideByte(scaleCount);
      if(scaleCount > 0){
         var scales = o._frameScales = new TObjects();
         for(var i = 0; i < scaleCount; i++){
            var scale = new SVector3();
            scale.unserialize(input);
            scales.push(scale);
         }
      }
      var tracks = null;
      var trackCount = input.readUint16();
      if(trackCount > 0){
         tracks = o._tracks = new TObjects();
         for(var n = 0; n < trackCount; n++){
            var track = RClass.create(FE3sTrack);
            track.unserialize(input);
            tracks.push(track);
            var frameCount = track._frameCount;
            var frames = track._frames;
            for(var i = 0; i < frameCount; i++){
               var frame = RClass.create(FE3sFrame);
               var translateIndex = 0;
               if(translateBytes == 4){
                  translateIndex = input.readUint32();
               }else if(translateBytes == 2){
                  translateIndex = input.readUint16();
               }else{
                  translateIndex = input.readUint8();
               }
               frame._translation = translates.at(translateIndex);
               var rotationIndex = 0;
               if(rotationBytes == 4){
                  rotationIndex = input.readUint32();
               }else if(rotationBytes == 2){
                  rotationIndex = input.readUint16();
               }else{
                  rotationIndex = input.readUint8();
               }
               frame._quaternion = rotations.at(rotationIndex);
               var scaleIndex = 0;
               if(scaleBytes == 4){
                  scaleIndex = input.readUint32();
               }else if(scaleBytes == 2){
                  scaleIndex = input.readUint16();
               }else{
                  scaleIndex = input.readUint8();
               }
               frame._scale = scales.at(scaleIndex);
               frames.push(frame);
            }
         }
      }
      if(tracks && o._skeletonGuid){
         var skeleton = o.skeleton();
         for(var i = 0; i < trackCount; i++){
            var track = tracks.at(i);
            var boneIndex = track.boneIndex();
            var bone = skeleton.findBone(boneIndex);
            bone.setTrack(track);
         }
         skeleton.pushAnimation(o);
      }
   }
}
with(MO){
   MO.FE3sBone = function FE3sBone(o){
      o = RClass.inherits(this, o, FObject);
      o._index      = null;
      o._track      = null;
      o._bones      = null;
      o.index       = FE3sBone_index;
      o.track       = FE3sBone_track;
      o.setTrack    = FE3sBone_setTrack;
      o.bones       = FE3sBone_bones;
      o.unserialize = FE3sBone_unserialize;
      return o;
   }
   MO.FE3sBone_index = function FE3sBone_index(){
      return this._index;
   }
   MO.FE3sBone_track = function FE3sBone_track(){
      return this._track;
   }
   MO.FE3sBone_setTrack = function FE3sBone_setTrack(p){
      this._track = p;
   }
   MO.FE3sBone_bones = function FE3sBone_bones(){
      return this._bones;
   }
   MO.FE3sBone_unserialize = function FE3sBone_unserialize(p){
      var o = this;
      o._index = p.readUint8();
      var c = p.readUint8();
      if(c > 0){
         var s = o._bones = new TObjects();
         for(var i = 0; i < c; i++){
            var b = RClass.create(FE3sBone);
            b.unserialize(p);
            s.push(b);
         }
      }
   }
}
with(MO){
   MO.FE3sBoneRefer = function FE3sBoneRefer(o){
      o = RClass.inherits(this, o, FObject);
      o._index      = null;
      o._bone       = null;
      o._track      = null;
      o.index       = FE3sBoneRefer_index;
      o.bone        = FE3sBoneRefer_bone;
      o.setBone     = FE3sBoneRefer_setBone;
      o.track       = FE3sBoneRefer_track;
      o.setTrack    = FE3sBoneRefer_setTrack;
      o.unserialize = FE3sBoneRefer_unserialize;
      return o;
   }
   MO.FE3sBoneRefer_index = function FE3sBoneRefer_index(){
      return this._index;
   }
   MO.FE3sBoneRefer_bone = function FE3sBoneRefer_bone(){
      return this._bone;
   }
   MO.FE3sBoneRefer_setBone = function FE3sBoneRefer_setBone(p){
      this._bone = p;
   }
   MO.FE3sBoneRefer_track = function FE3sBoneRefer_track(){
      return this._track;
   }
   MO.FE3sBoneRefer_setTrack = function FE3sBoneRefer_setTrack(p){
      this._track = p;
   }
   MO.FE3sBoneRefer_unserialize = function FE3sBoneRefer_unserialize(p){
      var o = this;
      o._index = p.readUint8();
   }
}
with(MO){
   MO.FE3sCamera = function FE3sCamera(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._typeCd     = null;
      o._position   = null;
      o._direction  = null;
      o._projection = null;
      o.construct   = FE3sCamera_construct;
      o.typeCd      = FE3sCamera_typeCd;
      o.position    = FE3sCamera_position;
      o.direction   = FE3sCamera_direction;
      o.projection  = FE3sCamera_projection;
      o.unserialize = FE3sCamera_unserialize;
      o.saveConfig  = FE3sCamera_saveConfig;
      return o;
   }
   MO.FE3sCamera_construct = function FE3sCamera_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._position = new SPoint3();
      o._direction = new SVector3();
      o._projection = RClass.create(FE3sProjection);
   }
   MO.FE3sCamera_typeCd = function FE3sCamera_typeCd(){
      return this._typeCd;
   }
   MO.FE3sCamera_position = function FE3sCamera_position(){
      return this._position;
   }
   MO.FE3sCamera_direction = function FE3sCamera_direction(){
      return this._direction;
   }
   MO.FE3sCamera_projection = function FE3sCamera_projection(){
      return this._projection;
   }
   MO.FE3sCamera_unserialize = function FE3sCamera_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._typeCd = p.readString();
      o._position.unserialize(p);
      o._direction.unserialize(p);
      o._projection.unserialize(p);
   }
   MO.FE3sCamera_saveConfig = function FE3sCamera_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('position', o._position.toString());
      xconfig.set('direction', o._direction.toString());
      o._projection.saveConfig(xconfig.create('Projection'));
   }
}
with(MO){
   MO.FE3sComponent = function FE3sComponent(o){
      o = RClass.inherits(this, o, FE3sObject);
      return o;
   }
}
with(MO){
   MO.FE3sDisplay = function FE3sDisplay(o){
      o = RClass.inherits(this, o, FE3sDrawable);
      o._outline         = null;
      o._renderables     = null;
      o.construct        = FE3sDisplay_construct;
      o.renderables      = FE3sDisplay_renderables;
      o.calculateOutline = FE3sDisplay_calculateOutline;
      o.unserialize      = FE3sDisplay_unserialize;
      o.saveConfig       = FE3sDisplay_saveConfig;
      o.clone            = FE3sDisplay_clone;
      return o;
   }
   MO.FE3sDisplay_construct = function FE3sDisplay_construct(){
      var o = this;
      o.__base.FE3sDrawable.construct.call(o);
      o._outline = new SOutline3d();
   }
   MO.FE3sDisplay_renderables = function FE3sDisplay_renderables(){
      return this._renderables;
   }
   MO.FE3sDisplay_calculateOutline = function FE3sDisplay_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         var renderabels = o._renderables;
         if(renderabels){
            outline.setMin();
            var count = renderabels.count();
            for(var i = 0; i < count; i++){
               var renderable = renderabels.getAt(i);
               var renderableOutline = renderable.calculateOutline();
               outline.mergeMax(renderableOutline);
            }
            outline.update();
         }
      }
      return outline;
   }
   MO.FE3sDisplay_unserialize = function FE3sDisplay_unserialize(input){
      var o = this;
      o.__base.FE3sDrawable.unserialize.call(o, input);
      var resourceConsole = RConsole.find(FE3sResourceConsole);
      var renderableCount = input.readUint16();
      if(renderableCount > 0){
         var renderables = o._renderables = new TObjects();
         for(var i = 0; i < renderableCount; i++){
            var renderable = resourceConsole.unserialize(input);
            renderables.push(renderable);
         }
      }
   }
   MO.FE3sDisplay_saveConfig = function FE3sDisplay_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
      var renderables = o._renderables;
      if(renderables){
         var xrenderables = xconfig.create('RenderableCollection');
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            renderable.saveConfig(xrenderables.create('Renderable'));
         }
      }
   }
   MO.FE3sDisplay_clone = function FE3sDisplay_clone(instance){
      var o = this;
      var result = o.__base.FE3sDrawable.clone.call(o, instance);
      result._outline.assign(o._outline)
      return result;
   }
}
with(MO){
   MO.FE3sDisplayContainer = function FE3sDisplayContainer(o){
      o = RClass.inherits(this, o, FE3sDisplay);
      o._displays        = null;
      o.construct        = FE3sDisplayContainer_construct;
      o.displays         = FE3sDisplayContainer_displays;
      o.pushDisplay      = FE3sDisplayContainer_pushDisplay;
      o.calculateOutline = FE3sDisplayContainer_calculateOutline;
      o.unserialize      = FE3sDisplayContainer_unserialize;
      o.saveConfig       = FE3sDisplayContainer_saveConfig;
      o.clone            = FE3sDisplayContainer_clone;
      return o;
   }
   MO.FE3sDisplayContainer_construct = function FE3sDisplayContainer_construct(){
      var o = this;
      o.__base.FE3sDisplay.construct.call(o);
   }
   MO.FE3sDisplayContainer_displays = function FE3sDisplayContainer_displays(){
      return this._displays;
   }
   MO.FE3sDisplayContainer_pushDisplay = function FE3sDisplayContainer_pushDisplay(display){
      var o = this;
      var displays = o._displays;
      if(!displays){
         displays = o._displays = new TObjects();
      }
      display.setParent(o);
      displays.push(display);
   }
   MO.FE3sDisplayContainer_calculateOutline = function FE3sDisplayContainer_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         var renderabels = o._renderables;
         if(renderabels){
            outline.setMin();
            var count = renderabels.count();
            for(var i = 0; i < count; i++){
               var renderable = renderabels.getAt(i);
               var renderableOutline = renderable.calculateOutline();
               outline.mergeMax(renderableOutline);
            }
            outline.update();
         }
      }
      return outline;
   }
   MO.FE3sDisplayContainer_unserialize = function FE3sDisplayContainer_unserialize(input){
      var o = this;
      o.__base.FE3sDisplay.unserialize.call(o, input);
      var displayCount = input.readUint16();
      if(displayCount > 0){
         var displays = o._displays = new TObjects();
         for(var i = 0; i < displayCount; i++){
            var display = RClass.create(FE3sSceneDisplay);
            display.unserialize(input);
            o.pushDisplay(display);
         }
      }
   }
   MO.FE3sDisplayContainer_saveConfig = function FE3sDisplayContainer_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDisplay.saveConfig.call(o, xconfig);
      var displays = o._displays;
      if(displays){
         var xdisplays = xconfig.create('DisplayCollection');
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.saveConfig(xdisplays.create('Display'));
         }
      }
   }
   MO.FE3sDisplayContainer_clone = function FE3sDisplayContainer_clone(instance){
      var o = this;
      var result = o.__base.FE3sDisplay.clone.call(o, instance);
      return result;
   }
}
with(MO){
   MO.FE3sDisplayLayer = function FE3sDisplayLayer(o){
      o = RClass.inherits(this, o, FE3sDisplayContainer);
      o._typeCd        = null;
      o._transformCd   = null;
      o.typeCd         = FE3sDisplayLayer_typeCd;
      o.setTypeCd      = FE3sDisplayLayer_setTypeCd;
      o.transformCd    = FE3sDisplayLayer_transformCd;
      o.setTransformCd = FE3sDisplayLayer_setTransformCd;
      o.unserialize    = FE3sDisplayLayer_unserialize;
      o.saveConfig     = FE3sDisplayLayer_saveConfig;
      return o;
   }
   MO.FE3sDisplayLayer_typeCd = function FE3sDisplayLayer_typeCd(){
      return this._typeCd;
   }
   MO.FE3sDisplayLayer_setTypeCd = function FE3sDisplayLayer_setTypeCd(p){
      this._typeCd = p;
   }
   MO.FE3sDisplayLayer_transformCd = function FE3sDisplayLayer_transformCd(){
      return this._transformCd;
   }
   MO.FE3sDisplayLayer_setTransformCd = function FE3sDisplayLayer_setTransformCd(p){
      this._transformCd = p;
   }
   MO.FE3sDisplayLayer_unserialize = function FE3sDisplayLayer_unserialize(input){
      var o = this;
      o.__base.FE3sDisplayContainer.unserialize.call(o, input);
      o._typeCd = input.readString();
      o._transformCd = input.readString();
   }
   MO.FE3sDisplayLayer_saveConfig = function FE3sDisplayLayer_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
      xconfig.set('type_cd', o._typeCd);
      xconfig.set('transform_cd', o._transformCd);
   }
}
with(MO){
   MO.FE3sDisplayMaterial = function FE3sDisplayMaterial(o){
      o = RClass.inherits(this, o, FObject);
      o._groupGuid  = null;
      o._material   = null;
      o.groupGuid   = FE3sDisplayMaterial_groupGuid;
      o.material    = FE3sDisplayMaterial_material;
      o.unserialize = FE3sDisplayMaterial_unserialize;
      return o;
   }
   MO.FE3sDisplayMaterial_groupGuid = function FE3sDisplayMaterial_groupGuid(){
      return this._groupGuid;
   }
   MO.FE3sDisplayMaterial_material = function FE3sDisplayMaterial_material(){
      return this._material;
   }
   MO.FE3sDisplayMaterial_unserialize = function FE3sDisplayMaterial_unserialize(p){
      var o = this;
      o._groupGuid = p.readString();
      o._material = o._template._activeTheme.findMaterial(o._groupGuid);
   }
}
with(MO){
   MO.FE3sDrawable = function FE3sDrawable(o){
      o = RClass.inherits(this, o, FE3sComponent);
      o._matrix     = null;
      o.construct   = FE3sDrawable_construct;
      o.matrix      = FE3sDrawable_matrix;
      o.unserialize = FE3sDrawable_unserialize;
      o.saveConfig  = FE3sDrawable_saveConfig;
      o.clone       = FE3sDrawable_clone;
      return o;
   }
   MO.FE3sDrawable_construct = function FE3sDrawable_construct(){
      var o = this;
      o.__base.FE3sComponent.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3sDrawable_matrix = function FE3sDrawable_matrix(){
      return this._matrix;
   }
   MO.FE3sDrawable_unserialize = function FE3sDrawable_unserialize(input){
      var o = this;
      o.__base.FE3sComponent.unserialize.call(o, input);
      o._matrix.unserialize(input);
   }
   MO.FE3sDrawable_saveConfig = function FE3sDrawable_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sComponent.saveConfig.call(o, xconfig);
      o._matrix.saveConfig(xconfig.create('Matrix'));
   }
   MO.FE3sDrawable_clone = function FE3sDrawable_clone(instance){
      var o = this;
      var result = o.__base.FE3sComponent.clone.call(o, instance);
      result._matrix.assign(o._matrix);
      return result;
   }
}
with(MO){
   MO.FE3sFrame = function FE3sFrame(o){
      o = RClass.inherits(this, o, FObject);
      o._translation = null;
      o._quaternion  = null;
      o._scale       = null;
      o.translation  = FE3sFrame_translation;
      o.quaternion   = FE3sFrame_quaternion;
      o.scale        = FE3sFrame_scale;
      return o;
   }
   MO.FE3sFrame_tick = function FE3sFrame_tick(){
      return this._tick;
   }
   MO.FE3sFrame_translation = function FE3sFrame_translation(){
      return this._translation;
   }
   MO.FE3sFrame_quaternion = function FE3sFrame_quaternion(){
      return this._quaternion;
   }
   MO.FE3sFrame_scale = function FE3sFrame_scale(){
      return this._scale;
   }
}
with(MO){
   MO.FE3sGeometry = function FE3sGeometry(o){
      o = RClass.inherits(this, o, FE3sRenderable, ME3sGeometry);
      o.construct     = FE3sGeometry_construct;
      o.unserialize   = FE3sGeometry_unserialize;
      o.dispose       = FE3sGeometry_dispose;
      return o;
   }
   MO.FE3sGeometry_construct = function FE3sGeometry_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
      o.__base.ME3sGeometry.construct.call(o);
   }
   MO.FE3sGeometry_unserialize = function FE3sGeometry_unserialize(input){
      var o = this;
      o.__base.FE3sRenderable.unserialize.call(o, input);
      var outline = o._outline;
      outline.unserialize(input);
      var streamCount = input.readInt8();
      if(streamCount > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input)
            streams.push(stream);
         }
      }
      if(outline.isEmpty()){
         o.calculateOutline();
      }
      outline.update();
   }
   MO.FE3sGeometry_dispose = function FE3sGeometry_dispose(){
      var o = this;
      o.__base.ME3sGeometry.dispose.call(o);
      o.__base.FE3sRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3sLight = function FE3sLight(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._typeName   = null;
      o._material   = null;
      o._camera     = null;
      o.construct   = FE3sLight_construct;
      o.typeName    = FE3sLight_typeName;
      o.material    = FE3sLight_material;
      o.camera      = FE3sLight_camera;
      o.unserialize = FE3sLight_unserialize;
      return o;
   }
   MO.FE3sLight_construct = function FE3sLight_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._material = RClass.create(FE3sMaterial);
      o._camera = RClass.create(FE3sCamera);
   }
   MO.FE3sLight_typeName = function FE3sLight_typeName(){
      return this._typeName;
   }
   MO.FE3sLight_material = function FE3sLight_material(){
      return this._material;
   }
   MO.FE3sLight_camera = function FE3sLight_camera(){
      return this._camera;
   }
   MO.FE3sLight_unserialize = function FE3sLight_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._typeName = p.readString();
      o._material.unserialize(p);
      o._camera.unserialize(p);
   }
}
with(MO){
   MO.FE3sMaterial = function FE3sMaterial(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._parentGuid  = null;
      o._info        = null;
      o._bitmaps     = null;
      o._bitmapPacks = null;
      o.construct    = FE3sMaterial_construct;
      o.parentGuid   = FE3sMaterial_parentGuid;
      o.effectCode   = FE3sMaterial_effectCode;
      o.info         = FE3sMaterial_info;
      o.bitmaps      = FE3sMaterial_bitmaps;
      o.bitmapPacks  = FE3sMaterial_bitmapPacks;
      o.unserialize  = FE3sMaterial_unserialize;
      o.saveConfig   = FE3sMaterial_saveConfig;
      o.clone        = FE3sMaterial_clone;
      return o;
   }
   MO.FE3sMaterial_construct = function FE3sMaterial_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._info = new SE3sMaterialInfo();
   }
   MO.FE3sMaterial_parentGuid = function FE3sMaterial_parentGuid(){
      return this._parentGuid;
   }
   MO.FE3sMaterial_effectCode = function FE3sMaterial_effectCode(){
      return this._info.effectCode;
   }
   MO.FE3sMaterial_info = function FE3sMaterial_info(){
      return this._info;
   }
   MO.FE3sMaterial_bitmaps = function FE3sMaterial_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3sMaterial_bitmapPacks = function FE3sMaterial_bitmapPacks(){
      return this._bitmapPacks;
   }
   MO.FE3sMaterial_unserialize = function FE3sMaterial_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._parentGuid = input.readString();
      o._info.unserialize(input);
      var packCount = input.readInt16();
      if(packCount > 0){
         var bitmapPacks = o._bitmapPacks = new TDictionary();
         for(var i = 0; i < packCount; i++){
            var bitmapPack = RClass.create(FE3sMaterialBitmapPack);
            bitmapPack.unserialize(input);
            bitmapPacks.set(bitmapPack.guid(), bitmapPack);
         }
      }
      var bitmapCount = input.readInt16();
      if(bitmapCount > 0){
         var bitmaps = o._bitmaps = new TObjects();
         for(var i = 0; i < bitmapCount; i++){
            var bitmap = RClass.create(FE3sMaterialBitmap);
            bitmap.unserialize(input);
            bitmaps.push(bitmap);
            var pack = bitmapPacks.get(bitmap.bitmapPackGuid());
            bitmap.setBitmapPack(pack);
         }
      }
   }
   MO.FE3sMaterial_saveConfig = function FE3sMaterial_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('parent_guid', o._parentGuid);
      o._info.saveConfig(xconfig);
   }
   MO.FE3sMaterial_clone = function FE3sMaterial_clone(instance){
      var o = this;
      var result = o.__base.FE3sObject.clone.call(o, instance);
      result._parentGuid = o._parentGuid;
      result._info.assign(o._info);
      return result;
   }
}
with(MO){
   MO.FE3sMaterialBitmap = function FE3sMaterialBitmap(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._bitmapPackGuid = null;
      o._bitmapPack     = null;
      o._bitmapGuid     = null;
      o._index          = 0;
      o.bitmapPackGuid  = FE3sMaterialBitmap_bitmapPackGuid;
      o.bitmapPack      = FE3sMaterialBitmap_bitmapPack;
      o.setBitmapPack   = FE3sMaterialBitmap_setBitmapPack;
      o.bitmapGuid      = FE3sMaterialBitmap_bitmapGuid;
      o.unserialize     = FE3sMaterialBitmap_unserialize;
      return o;
   }
   MO.FE3sMaterialBitmap_bitmapPackGuid = function FE3sMaterialBitmap_bitmapPackGuid(){
      return this._bitmapPackGuid;
   }
   MO.FE3sMaterialBitmap_bitmapPack = function FE3sMaterialBitmap_bitmapPack(){
      return this._bitmapPack;
   }
   MO.FE3sMaterialBitmap_setBitmapPack = function FE3sMaterialBitmap_setBitmapPack(bitmapPack){
      this._bitmapPack = bitmapPack;
   }
   MO.FE3sMaterialBitmap_bitmapGuid = function FE3sMaterialBitmap_bitmapGuid(){
      return this._bitmapGuid;
   }
   MO.FE3sMaterialBitmap_unserialize = function FE3sMaterialBitmap_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._bitmapPackGuid = input.readString();
      o._bitmapGuid = input.readString();
      o._index = input.readUint16();
   }
}
with(MO){
   MO.FE3sMaterialBitmapPack = function FE3sMaterialBitmapPack(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._typeName       = null;
      o._formatName     = null;
      o._size           = null;
      o.construct       = FE3sMaterialBitmapPack_construct;
      o.typeName        = FE3sMaterialBitmapPack_typeName;
      o.formatName      = FE3sMaterialBitmapPack_formatName;
      o.size            = FE3sMaterialBitmapPack_size;
      o.unserialize     = FE3sMaterialBitmapPack_unserialize;
      o.dispose         = FE3sMaterialBitmapPack_dispose;
      return o;
   }
   MO.FE3sMaterialBitmapPack_construct = function FE3sMaterialBitmapPack_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3sMaterialBitmapPack_typeName = function FE3sMaterialBitmapPack_typeName(){
      return this._typeName;
   }
   MO.FE3sMaterialBitmapPack_formatName = function FE3sMaterialBitmapPack_formatName(){
      return this._formatName;
   }
   MO.FE3sMaterialBitmapPack_size = function FE3sMaterialBitmapPack_size(){
      return this._size;
   }
   MO.FE3sMaterialBitmapPack_unserialize = function FE3sMaterialBitmapPack_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._typeName = input.readString();
      o._formatName = input.readString();
      o._size.unserialize(input, EDataType.Uint16);
   }
   MO.FE3sMaterialBitmapPack_dispose = function FE3sMaterialBitmapPack_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o.__base.FE3sObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMaterialConsole = function FE3sMaterialConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._resources  = null;
      o._materials  = null;
      o.construct   = FE3sMaterialConsole_construct;
      o.find        = FE3sMaterialConsole_find;
      o.unserialize = FE3sMaterialConsole_unserialize;
      o.loadByGuid  = FE3sMaterialConsole_loadByGuid;
      o.dispose     = FE3sMaterialConsole_dispose;
      return o;
   }
   MO.FE3sMaterialConsole_construct = function FE3sMaterialConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._resources = new TDictionary();
      o._materials = new TDictionary();
   }
   MO.FE3sMaterialConsole_find = function FE3sMaterialConsole_find(p){
      return this._materials.get(p);
   }
   MO.FE3sMaterialConsole_unserialize = function FE3sMaterialConsole_unserialize(input){
      var o = this;
      var material = RClass.create(FE3sMaterial);
      material.unserialize(input);
      var materialGuid = material.guid();
      if(o._materials.contains(materialGuid)){
         throw new TError(o, 'Material is already exists.');
      }
      o._materials.set(materialGuid, material);
      return material;
   }
   MO.FE3sMaterialConsole_loadByGuid = function FE3sMaterialConsole_loadByGuid(guid){
      var o = this;
      var resources = o._resources;
      var resource = resources.get(guid);
      if(resource){
         return resource;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('material');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      resource = RClass.create(FE3sMaterialResource);
      resource.setGuid(guid);
      resource.setVendor(vendor);
      resource.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(resource);
      resources.set(guid, resource);
      return resource;
   }
   MO.FE3sMaterialConsole_dispose = function FE3sMaterialConsole_dispose(){
      var o = this;
      o._resources = RObject.free(o._resources);
      o._materials = RObject.free(o._materials);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMaterialRefer = function FE3sMaterialRefer(o){
      o = RClass.inherits(this, o, FE3sObject);
      return o;
   }
}
with(MO){
   MO.FE3sMaterialResource = function FE3sMaterialResource(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._typeName     = 'Material';
      o._dataCompress = true;
      o._material     = null;
      o.material      = FE3sMaterialResource_material;
      o.unserialize   = FE3sMaterialResource_unserialize;
      return o;
   }
   MO.FE3sMaterialResource_material = function FE3sMaterialResource_material(){
      return this._material;
   }
   MO.FE3sMaterialResource_unserialize = function FE3sMaterialResource_unserialize(input){
      var o = this;
      o.__base.FE3sResource.unserialize.call(o, input);
      o._material = RConsole.find(FE3sMaterialConsole).unserialize(input);
      MO.Logger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
   }
}
with(MO){
   MO.FE3sMesh = function FE3sMesh(o){
      o = RClass.inherits(this, o, FE3sSpace, ME3sGeometry);
      o._dataCompress = true;
      o._typeName     = 'Mesh';
      o._display      = null;
      o._renderable   = null;
      o.construct     = FE3sMesh_construct;
      o.unserialize   = FE3sMesh_unserialize;
      o.saveConfig    = FE3sMesh_saveConfig;
      o.dispose       = FE3sMesh_dispose;
      return o;
   }
   MO.FE3sMesh_construct = function FE3sMesh_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
      o.__base.ME3sGeometry.construct.call(o);
      o._display = RClass.create(FE3sMeshDisplay);
   }
   MO.FE3sMesh_unserialize = function FE3sMesh_unserialize(input){
      var o = this;
      o.__base.FE3sSpace.unserialize.call(o, input);
      o._outline.unserialize(input);
      o._outline.update();
      var streamCount = input.readInt8();
      if(streamCount > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input)
            streams.push(stream);
         }
      }
      o._display.unserialize(input);
      o._renderable = o._display._renderable;
   }
   MO.FE3sMesh_saveConfig = function FE3sMesh_saveConfig(config){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, config);
      o._display.saveConfig(config.create('Display'));
   }
   MO.FE3sMesh_dispose = function FE3sMesh_dispose(){
      var o = this;
      o._outline = RObject.dispose(o._outline);
      o._display = RObject.dispose(o._display);
      o.__base.ME3sGeometry.dispose.call(o);
      o.__base.FE3sSpace.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMeshConsole = function FE3sMeshConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._venderCode = 'mesh';
      o._serviceUrl = '/cloud.content.mesh.ws'
      o._dataUrl    = '/cloud.content.mesh.wv'
      o._meshs      = null;
      o.construct   = FE3sMeshConsole_construct;
      o.find        = FE3sMeshConsole_find;
      o.meshs       = FE3sMeshConsole_meshs;
      o.loadByGuid  = FE3sMeshConsole_loadByGuid;
      o.loadByCode  = FE3sMeshConsole_loadByCode;
      o.dispose     = FE3sMeshConsole_dispose;
      return o;
   }
   MO.FE3sMeshConsole_construct = function FE3sMeshConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._meshs = new TDictionary();
   }
   MO.FE3sMeshConsole_find = function FE3sMeshConsole_find(p){
      return this._meshs.get(p);
   }
   MO.FE3sMeshConsole_meshs = function FE3sMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3sMeshConsole_loadByGuid = function FE3sMeshConsole_loadByGuid(p){
      var o = this;
      var s = o._meshs;
      var r = s.get(p);
      if(r){
         return r;
      }
      var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
      v.set('guid', p);
      var u = v.makeUrl();
      r = RClass.create(FE3sMesh);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
      return r;
   }
   MO.FE3sMeshConsole_loadByCode = function FE3sMeshConsole_loadByCode(p){
      var o = this;
      var s = o._meshs;
      var r = s.get(p);
      if(r){
         return r;
      }
      var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
      v.set('code', p);
      var u = v.makeUrl();
      r = RClass.create(FE3sMesh);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
      return r;
   }
   MO.FE3sMeshConsole_dispose = function FE3sMeshConsole_dispose(){
      var o = this;
      o._meshs = RObject.free(o._meshs);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMeshDisplay = function FE3sMeshDisplay(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._matrix     = null;
      o._material   = null;
      o._renderable = null;
      o.construct   = FE3sMeshDisplay_construct;
      o.matrix      = FE3sMeshDisplay_matrix;
      o.material    = FE3sMeshDisplay_material;
      o.renderable  = FE3sMeshDisplay_renderable;
      o.unserialize = FE3sMeshDisplay_unserialize;
      o.saveConfig  = FE3sMeshDisplay_saveConfig;
      return o;
   }
   MO.FE3sMeshDisplay_construct = function FE3sMeshDisplay_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._material = RClass.create(FE3sMaterial);
      o._renderable = RClass.create(FE3sRenderable);
   }
   MO.FE3sMeshDisplay_matrix = function FE3sMeshDisplay_matrix(){
      return this._matrix;
   }
   MO.FE3sMeshDisplay_material = function FE3sMeshDisplay_material(){
      return this._material;
   }
   MO.FE3sMeshDisplay_renderable = function FE3sMeshDisplay_renderable(){
      return this._renderable;
   }
   MO.FE3sMeshDisplay_unserialize = function FE3sMeshDisplay_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._matrix.unserialize(p);
      o._material.unserialize(p);
      o._renderable.unserialize(p);
   }
   MO.FE3sMeshDisplay_saveConfig = function FE3sMeshDisplay_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      o._matrix.saveConfig(p.create('Matrix'));
      o._material.saveConfig(p.create('Material'));
      o._renderable.saveConfig(p.create('Renderable'));
   }
}
with(MO){
   MO.FE3sModel = function FE3sModel(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName      = 'Model';
      o._dataCompress  = true;
      o._dataBlock     = true;
      o._meshes        = null;
      o._skeletons     = null;
      o._animations    = null;
      o._display       = null;
      o.construct      = FE3sModel_construct;
      o.findMeshByCode = FE3sModel_findMeshByCode;
      o.meshes         = FE3sModel_meshes;
      o.skeletons      = FE3sModel_skeletons;
      o.animations     = FE3sModel_animations;
      o.display        = FE3sModel_display;
      o.unserialize    = FE3sModel_unserialize;
      o.saveConfig     = FE3sModel_saveConfig;
      return o;
   }
   MO.FE3sModel_construct = function FE3sModel_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
      var display = o._display = RClass.create(FE3sModelDisplay);
      display._model = o;
   }
   MO.FE3sModel_findMeshByCode = function FE3sModel_findMeshByCode(p){
      var s = this._meshes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3sModel_meshes = function FE3sModel_meshes(){
      return this._meshes;
   }
   MO.FE3sModel_skeletons = function FE3sModel_skeletons(){
      return this._skeletons;
   }
   MO.FE3sModel_animations = function FE3sModel_animations(){
      return this._animations;
   }
   MO.FE3sModel_display = function FE3sModel_display(){
      return this._display;
   }
   MO.FE3sModel_unserialize = function FE3sModel_unserialize(input){
      var o = this;
      o.__base.FE3sSpace.unserialize.call(o, input);
      var modelConsole = RConsole.find(FE3sModelConsole);
      modelConsole.models().set(o.guid(), o);
      var meshCount = input.readInt16();
      if(meshCount > 0){
         var meshes = o._meshes = new TDictionary();
         for(var i = 0; i < meshCount; i++){
            var mesh = modelConsole.unserialMesh(input)
            var meshGuid = mesh.guid();
            meshes.set(meshGuid, mesh);
         }
      }
      var skeletonCount = input.readInt16();
      if(skeletonCount > 0){
         var s = o._skeletons = new TObjects();
         for(var i = 0; i < skeletonCount; i++){
            var skeleton = modelConsole.unserialSkeleton(input)
            s.push(skeleton);
         }
      }
      var animationCount = input.readInt16();
      if(animationCount > 0){
         var animations = o._animations = new TObjects();
         for(var i = 0; i < animationCount; i++){
            var animation = modelConsole.unserialAnimation(o, input)
            animations.push(animation);
         }
      }
      var display = o._display;
      display.unserialize(input);
      var renderables = display.renderables();
      if(renderables){
         var renderableCount = renderables.count();
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.get(i);
            var meshGuid = renderable.meshGuid();
            var mesh = meshes.get(meshGuid);
            renderable.setMesh(mesh);
         }
      }
      MO.Logger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
   }
   MO.FE3sModel_saveConfig = function FE3sModel_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, xconfig);
      o._display.saveConfig(xconfig.create('Display'));
   }
}
with(MO){
   MO.FE3sModelConsole = function FE3sModelConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._models           = null;
      o._meshs            = null;
      o._skeletons        = null;
      o._animations       = null;
      o.construct         = FE3sModelConsole_construct;
      o.findModel         = FE3sModelConsole_findModel;
      o.models            = FE3sModelConsole_models;
      o.findMesh          = FE3sModelConsole_findMesh;
      o.meshs             = FE3sModelConsole_meshs;
      o.findSkeleton      = FE3sModelConsole_findSkeleton;
      o.skeletons         = FE3sModelConsole_skeletons;
      o.findAnimation     = FE3sModelConsole_findAnimation;
      o.animations        = FE3sModelConsole_animations;
      o.unserialMesh      = FE3sModelConsole_unserialMesh;
      o.unserialSkeleton  = FE3sModelConsole_unserialSkeleton;
      o.unserialAnimation = FE3sModelConsole_unserialAnimation;
      o.load              = FE3sModelConsole_load;
      o.dispose           = FE3sModelConsole_dispose;
      return o;
   }
   MO.FE3sModelConsole_construct = function FE3sModelConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._models = new TDictionary();
      o._meshs = new TDictionary();
      o._skeletons = new TDictionary();
      o._animations = new TDictionary();
      var rc = RConsole.find(FResourceConsole);
      var rp = RClass.create(FResourcePipeline);
      var rt = RClass.create(FResourceType);
      rt.setCode('resource3d.model');
      rt._pipeline = rp;
      rc.registerType(rt);
   }
   MO.FE3sModelConsole_findModel = function FE3sModelConsole_findModel(p){
      return this._models.get(p);
   }
   MO.FE3sModelConsole_models = function FE3sModelConsole_models(){
      return this._models;
   }
   MO.FE3sModelConsole_findMesh = function FE3sModelConsole_findMesh(p){
      return this._meshs.get(p);
   }
   MO.FE3sModelConsole_meshs = function FE3sModelConsole_meshs(){
      return this._meshs;
   }
   MO.FE3sModelConsole_findSkeleton = function FE3sModelConsole_findSkeleton(p){
      return this._skeletons.get(p);
   }
   MO.FE3sModelConsole_skeletons = function FE3sModelConsole_skeletons(){
      return this._skeletons;
   }
   MO.FE3sModelConsole_findAnimation = function FE3sModelConsole_findAnimation(p){
      return this._animations.get(p);
   }
   MO.FE3sModelConsole_animations = function FE3sModelConsole_animations(){
      return this._animations;
   }
   MO.FE3sModelConsole_unserialMesh = function FE3sModelConsole_unserialMesh(p){
      var o = this;
      var r = RClass.create(FE3sModelMesh);
      r.unserialize(p);
      o._meshs.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_unserialSkeleton = function FE3sModelConsole_unserialSkeleton(p){
      var o = this;
      var r = RClass.create(FE3sSkeleton);
      r.unserialize(p);
      o._skeletons.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_unserialAnimation = function FE3sModelConsole_unserialAnimation(m, p){
      var o = this;
      var r = RClass.create(FE3sAnimation);
      r._model = m;
      r.unserialize(p);
      o._animations.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_load = function FE3sModelConsole_load(guid){
      var o = this;
      var models = o._models;
      var model = models.get(guid);
      if(model){
         return model;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('model');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      model = RClass.create(FE3sModel);
      model.setGuid(guid);
      model.setVendor(vendor);
      model.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(model);
      models.set(guid, model);
      return model;
   }
   MO.FE3sModelConsole_dispose = function FE3sModelConsole_dispose(){
      var o = this;
      o._materials = RObject.free(o._materials);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sModelDisplay = function FE3sModelDisplay(o){
      o = RClass.inherits(this, o, FE3sDisplay);
      o._model           = null;
      o._material        = null;
      o.construct        = FE3sModelDisplay_construct;
      o.material         = FE3sModelDisplay_material;
      o.calculateOutline = FE3sModelDisplay_calculateOutline;
      o.unserialize      = FE3sModelDisplay_unserialize;
      o.saveConfig       = FE3sModelDisplay_saveConfig;
      return o;
   }
   MO.FE3sModelDisplay_construct = function FE3sModelDisplay_construct(){
      var o = this;
      o.__base.FE3sDisplay.construct.call(o);
      o._material = RClass.create(FE3sMaterial);
   }
   MO.FE3sModelDisplay_material = function FE3sModelDisplay_material(){
      return this._material;
   }
   MO.FE3sModelDisplay_calculateOutline = function FE3sModelDisplay_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         var meshes = o._model.meshes();
         if(meshes){
            outline.setMin();
            var count = meshes.count();
            for(var i = 0; i < count; i++){
               var mesh = meshes.at(i);
               var meshOutline = mesh.calculateOutline();
               outline.mergeMax(meshOutline);
            }
            outline.update();
         }
      }
      return outline;
   }
   MO.FE3sModelDisplay_unserialize = function FE3sModelDisplay_unserialize(p){
      var o = this;
      o.__base.FE3sDisplay.unserialize.call(o, p);
      o._material.unserialize(p);
   }
   MO.FE3sModelDisplay_saveConfig = function FE3sModelDisplay_saveConfig(p){
      var o = this;
      o.__base.FE3sDisplay.saveConfig.call(o, p);
      o._material.saveConfig(p.create('Material'));
   }
}
with(MO){
   MO.FE3sModelMesh = function FE3sModelMesh(o){
      o = RClass.inherits(this, o, FE3sGeometry);
      return o;
   }
}
with(MO){
   MO.FE3sModelRenderable = function FE3sModelRenderable(o){
      o = RClass.inherits(this, o, FE3sRenderable);
      o._meshGuid   = null;
      o._mesh       = null;
      o.construct   = FE3sModelRenderable_construct;
      o.meshGuid    = FE3sModelRenderable_meshGuid;
      o.mesh        = FE3sModelRenderable_mesh;
      o.setMesh     = FE3sModelRenderable_setMesh;
      o.unserialize = FE3sModelRenderable_unserialize;
      o.saveConfig  = FE3sModelRenderable_saveConfig;
      return o;
   }
   MO.FE3sModelRenderable_construct = function FE3sModelRenderable_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
   }
   MO.FE3sModelRenderable_meshGuid = function FE3sModelRenderable_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sModelRenderable_mesh = function FE3sModelRenderable_mesh(){
      return this._mesh;
   }
   MO.FE3sModelRenderable_setMesh = function FE3sModelRenderable_setMesh(mesh){
      this._mesh = mesh;
   }
   MO.FE3sModelRenderable_unserialize = function FE3sModelRenderable_unserialize(input){
      var o = this;
      o.__base.FE3sRenderable.unserialize.call(o, input);
      o._meshGuid = input.readString();
   }
   MO.FE3sModelRenderable_saveConfig = function FE3sModelRenderable_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sRenderable.saveConfig.call(o, xconfig);
      xconfig.set('mesh_guid', o._meshGuid);
   }
}
with(MO){
   MO.FE3sMovie = function FE3sMovie(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._interval   = null;
      o._rotation   = null;
      o.construct   = FE3sMovie_construct;
      o.interval    = FE3sMovie_interval;
      o.setInterval = FE3sMovie_setInterval;
      o.rotation    = FE3sMovie_rotation;
      o.unserialize = FE3sMovie_unserialize;
      o.saveConfig  = FE3sMovie_saveConfig;
      o.dispose     = FE3sMovie_dispose;
      return o;
   }
   MO.FE3sMovie_construct = function FE3sMovie_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._rotation = new SVector3();
   }
   MO.FE3sMovie_interval = function FE3sMovie_interval(){
      return this._interval;
   }
   MO.FE3sMovie_setInterval = function FE3sMovie_setInterval(interval){
      this._interval = interval;
   }
   MO.FE3sMovie_rotation = function FE3sMovie_rotation(){
      return this._rotation;
   }
   MO.FE3sMovie_unserialize = function FE3sMovie_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._interval = input.readInt32();
      o._rotation.unserialize(input);
   }
   MO.FE3sMovie_saveConfig = function FE3sMovie_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('interval', o._interval);
      xconfig.set('rotation', o._rotation);
   }
   MO.FE3sMovie_dispose = function FE3sMovie_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FE3sObject.disposet.call(o);
   }
}
with(MO){
   MO.FE3sObject = function FE3sObject(o){
      o = RClass.inherits(this, o, FObject, MParent);
      o._typeName   = null;
      o._guid       = RClass.register(o, new AGetSet('_guid'));
      o._code       = RClass.register(o, new AGetSet('_code'));
      o._label      = RClass.register(o, new AGetSet('_label'));
      o._isClone    = false;
      o.makeLabel   = FE3sObject_makeLabel;
      o.unserialize = FE3sObject_unserialize;
      o.saveConfig  = FE3sObject_saveConfig;
      o.clone       = FE3sObject_clone;
      o.dispose     = FE3sObject_dispose;
      return o;
   }
   MO.FE3sObject_makeLabel = function FE3sObject_makeLabel(){
      var o = this;
      var result = '';
      if(!RString.isEmpty(o._code)){
         result += o._code;
      }
      if(!RString.isEmpty(o._label)){
         result += ' [' + o._label + ']';
      }
      return result;
   }
   MO.FE3sObject_unserialize = function FE3sObject_unserialize(input){
      var o = this;
      o._typeName = input.readString();
      o._guid = input.readString();
      o._code = input.readString();
      o._label = input.readString();
   }
   MO.FE3sObject_saveConfig = function FE3sObject_saveConfig(xconfig){
      var o = this;
      if(!RString.isEmpty(o._typeName)){
         xconfig.setName(o._typeName);
      }
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
      if(o._isClone){
         xconfig.set('is_clone', 'Y');
      }
   }
   MO.FE3sObject_clone = function FE3sObject_clone(instance){
      var o = this;
      var result = null;
      if(instance){
         result = instance;
      }else{
         result = RClass.create(o.constructor);
      }
      result._isClone = true;
      result._typeName = o._typeName;
      result._guid = o._guid;
      result._code = o._code;
      result._label = o._label;
      return result;
   }
   MO.FE3sObject_dispose = function FE3sObject_dispose(){
      var o = this;
      o.__base.MAttributeParent.dispose.call(o);
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.FE3sProjection = function FE3sProjection(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._angle      = null;
      o._znear      = null;
      o._zfar       = null;
      o.angle       = FE3sProjection_angle;
      o.znear       = FE3sProjection_znear;
      o.zfar        = FE3sProjection_zfar;
      o.unserialize = FE3sProjection_unserialize;
      o.saveConfig  = FE3sProjection_saveConfig;
      return o;
   }
   MO.FE3sProjection_angle = function FE3sProjection_angle(){
      return this._angle;
   }
   MO.FE3sProjection_znear = function FE3sProjection_znear(){
      return this._znear;
   }
   MO.FE3sProjection_zfar = function FE3sProjection_zfar(){
      return this._zfar;
   }
   MO.FE3sProjection_unserialize = function FE3sProjection_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._angle = p.readFloat();
      o._znear = p.readFloat();
      o._zfar = p.readFloat();
   }
   MO.FE3sProjection_saveConfig = function FE3sProjection_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.setFloat('angle', o._angle);
      xconfig.setFloat('znear', o._znear);
      xconfig.setFloat('zfar', o._zfar);
   }
}
with(MO){
   MO.FE3sRegion = function FE3sRegion(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._optionBackground     = true;
      o._backgroundColor      = null;
      o._moveSpeed            = 0.1;
      o._rotationKeySpeed     = 0.005;
      o._rotationMouseSpeed   = 0.003;
      o._material             = null;
      o._camera               = null;
      o._light                = null;
      o.construct             = FE3sRegion_construct;
      o.optionBackground      = FE3sRegion_optionBackground;
      o.setOptionBackground   = FE3sRegion_setOptionBackground;
      o.backgroundColor       = FE3sRegion_backgroundColor;
      o.moveSpeed             = FE3sRegion_moveSpeed;
      o.setMoveSpeed          = FE3sRegion_setMoveSpeed;
      o.rotationKeySpeed      = FE3sRegion_rotationKeySpeed;
      o.setRotationKeySpeed   = FE3sRegion_setRotationKeySpeed;
      o.rotationMouseSpeed    = FE3sRegion_rotationMouseSpeed;
      o.setRotationMouseSpeed = FE3sRegion_setRotationMouseSpeed;
      o.camera                = FE3sRegion_camera;
      o.light                 = FE3sRegion_light;
      o.unserialize           = FE3sRegion_unserialize;
      o.saveConfig            = FE3sRegion_saveConfig;
      return o;
   }
   MO.FE3sRegion_construct = function FE3sRegion_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._backgroundColor = new SColor4();
      o._material = RClass.create(FE3sMaterial);
      o._camera = RClass.create(FE3sCamera);
      o._light = RClass.create(FE3sLight);
   }
   MO.FE3sRegion_optionBackground = function FE3sRegion_optionBackground(){
      return this._optionBackground;
   }
   MO.FE3sRegion_setOptionBackground = function FE3sRegion_setOptionBackground(p){
      this._optionBackground = p;
   }
   MO.FE3sRegion_backgroundColor = function FE3sRegion_backgroundColor(){
      return this._backgroundColor;
   }
   MO.FE3sRegion_moveSpeed = function FE3sRegion_moveSpeed(){
      return this._moveSpeed;
   }
   MO.FE3sRegion_setMoveSpeed = function FE3sRegion_setMoveSpeed(p){
      this._moveSpeed = p;
   }
   MO.FE3sRegion_rotationKeySpeed = function FE3sRegion_rotationKeySpeed(){
      return this._rotationKeySpeed;
   }
   MO.FE3sRegion_setRotationKeySpeed = function FE3sRegion_setRotationKeySpeed(p){
      this._rotationKeySpeed = p;
   }
   MO.FE3sRegion_rotationMouseSpeed = function FE3sRegion_rotationMouseSpeed(){
      return this._rotationMouseSpeed;
   }
   MO.FE3sRegion_setRotationMouseSpeed = function FE3sRegion_setRotationMouseSpeed(p){
      this._rotationMouseSpeed = p;
   }
   MO.FE3sRegion_camera = function FE3sRegion_camera(){
      return this._camera;
   }
   MO.FE3sRegion_light = function FE3sRegion_light(){
      return this._light;
   }
   MO.FE3sRegion_unserialize = function FE3sRegion_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._backgroundColor.unserialize(input);
      o._moveSpeed = input.readFloat();
      o._rotationKeySpeed = input.readFloat();
      o._rotationMouseSpeed = input.readFloat();
      o._material.unserialize(input);
      o._camera.unserialize(input);
      o._light.unserialize(input);
   }
   MO.FE3sRegion_saveConfig = function FE3sRegion_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('color', o._backgroundColor.toString());
      xconfig.setFloat('move_speed', o._moveSpeed);
      xconfig.setFloat('rotation_key_speed', o._rotationKeySpeed);
      xconfig.setFloat('rotation_mouse_speed', o._rotationMouseSpeed);
      o._camera.saveConfig(xconfig.create('Camera'));
   }
}
with(MO){
   MO.FE3sRenderable = function FE3sRenderable(o){
      o = RClass.inherits(this, o, FE3sDrawable);
      o._materialRefers   = null;
      o.construct         = FE3sRenderable_construct;
      o.materialRefers    = FE3sRenderable_materialRefers;
      o.syncMaterialRefer = FE3sRenderable_syncMaterialRefer;
      o.pushMaterialRefer = FE3sRenderable_pushMaterialRefer;
      o.unserialize       = FE3sRenderable_unserialize;
      o.saveConfig        = FE3sRenderable_saveConfig;
      o.clone             = FE3sRenderable_clone;
      return o;
   }
   MO.FE3sRenderable_construct = function FE3sRenderable_construct(){
      var o = this;
      o.__base.FE3sDrawable.construct.call(o);
   }
   MO.FE3sRenderable_materialRefers = function FE3sRenderable_materialRefers(){
      return this._materialRefers;
   }
   MO.FE3sRenderable_syncMaterialRefer = function FE3sRenderable_syncMaterialRefer(index){
      var o = this;
      var materialRefers = o._materialRefers;
      if(!materialRefers){
         materialRefers = o._materialRefers = new TObjects();
      }
      for(var i = materialRefers.count(); i <= index; i++){
         materialRefers.push(RClass.create(FE3sMaterialRefer));
      }
      return materialRefers.at(index);
   }
   MO.FE3sRenderable_pushMaterialRefer = function FE3sRenderable_pushMaterialRefer(materialRefer){
      var o = this;
      var materialRefers = o._materialRefers;
      if(!materialRefers){
         materialRefers = o._materialRefers = new TObjects();
      }
      materialRefers.push(materialRefer);
   }
   MO.FE3sRenderable_unserialize = function FE3sRenderable_unserialize(input){
      var o = this;
      o.__base.FE3sDrawable.unserialize.call(o, input);
      var count = input.readUint16();
      if(count > 0){
         for(var i = 0; i < count; i++){
            var materialRefer = RClass.create(FE3sMaterialRefer);
            materialRefer.unserialize(input);
            o.pushMaterialRefer(materialRefer);
         }
      }
   }
   MO.FE3sRenderable_saveConfig = function FE3sRenderable_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
      var materialRefers = o._materialRefers;
      if(materialRefers){
         var count = materialRefers.count();
         var xmaterialRefers = xconfig.create('MaterialReferCollection');
         for(var i = 0; i < count; i++){
            materialRefers.at(i).saveConfig(xmaterialRefers.create('MaterialRefer'));
         }
      }
   }
   MO.FE3sRenderable_clone = function FE3sRenderable_clone(instance){
      var o = this;
      var result = o.__base.FE3sDrawable.clone.call(o, instance);
      var materialRefers = o._materialRefers;
      if(materialRefers){
         var count = materialRefers.count();
         for(var i = 0; i < count; i++){
            var materialRefer = materialRefers.at(i);
            result.pushMaterialRefer(materialRefer.clone());
         }
      }
      return result;
   }
}
with(MO){
   MO.FE3sResource = function FE3sResource(o){
      o = RClass.inherits(this, o, FResource, MListener);
      o._dataLoad      = false;
      o._dataReady     = false;
      o._dataSize      = 0;
      o._blockSize     = 0;
      o._blockCount    = 0;
      o._vendor        = RClass.register(o, new AGetSet('_vendor'));
      o._loadListeners = RClass.register(o, new AListener('_loadListeners', EEvent.Load));
      o.onComplete     = FE3sResource_onComplete;
      o.makeLabel      = FE3sResource_makeLabel;
      o.testReady      = FE3sResource_testReady;
      o.unserialize    = FE3sResource_unserialize;
      o.saveConfig     = FE3sResource_saveConfig;
      o.dispose        = FE3sResource_dispose;
      return o;
   }
   MO.FE3sResource_onComplete = function FE3sResource_onComplete(input){
      var o = this;
      if(RClass.isClass(input, MDataStream)){
         o.unserialize(input);
      }else{
         var view = RClass.create(FDataView);
         view.setEndianCd(true);
         if(input.constructor == Array){
            var inputData = new Uint8Array(input);
            view.link(inputData.buffer);
         }else if(input.constructor == Uint8Array){
            view.link(input.buffer);
         }else{
            view.link(input.outputData());
         }
         o.unserialize(view);
         view.dispose();
      }
      o._dataReady = true;
      o.processLoadListener();
   }
   MO.FE3sResource_makeLabel = function FE3sResource_makeLabel(){
      var o = this;
      var result = '';
      if(!RString.isEmpty(o._code)){
         result += o._code;
      }
      if(!RString.isEmpty(o._label)){
         result += ' [' + o._label + ']';
      }
      return result;
   }
   MO.FE3sResource_testReady = function FE3sResource_testReady(){
      return this._dataReady;
   }
   MO.FE3sResource_unserialize = function FE3sResource_unserialize(input){
      var o = this;
      o._typeName = input.readString();
      o._guid = input.readString();
      o._code = input.readString();
      o._label = input.readString();
   }
   MO.FE3sResource_saveConfig = function FE3sResource_saveConfig(xconfig){
      var o = this;
      if(!RString.isEmpty(o._typeName)){
         xconfig.setName(o._typeName);
      }
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
   }
   MO.FE3sResource_dispose = function FE3sResource_dispose(){
      var o = this;
      o._vendor = null;
      o.__base.MListener.dispose.call(o);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sResourceConsole = function FE3sResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._factory            = null;
      o.construct           = FE3sResourceConsole_construct;
      o.factory             = FE3sResourceConsole_factory;
      o.create              = FE3sResourceConsole_create;
      o.unserializeResource = FE3sResourceConsole_unserializeResource;
      o.unserialize         = FE3sResourceConsole_unserialize;
      return o;
   }
   MO.FE3sResourceConsole_construct = function FE3sResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      var factory = o._factory = RClass.create(FClassFactory);
      factory.register('Shape', FE3sShape);
      factory.register('Sprite', FE3sSprite);
      factory.register('ModelMesh', FE3sModelMesh);
      factory.register('ModelRenderable', FE3sModelRenderable);
   }
   MO.FE3sResourceConsole_factory = function FE3sResourceConsole_factory(){
      return this._factory;
   }
   MO.FE3sResourceConsole_create = function FE3sResourceConsole_create(typeName){
      return this._factory.create(typeName);
   }
   MO.FE3sResourceConsole_unserializeResource = function FE3sResourceConsole_unserializeResource(resource, input){
      var o = this;
      resource.unserialize(input);
   }
   MO.FE3sResourceConsole_unserialize = function FE3sResourceConsole_unserialize(input){
      var o = this;
      var typeName = input.testString();
      var resource = o._factory.create(typeName);
      resource.unserialize(input);
      return resource;
   }
}
with(MO){
   MO.FE3sScene = function FE3sScene(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName     = 'Scene';
      o._dataCompress = true;
      o._templates    = null;
      o.construct     = FE3sScene_construct;
      o.unserialize   = FE3sScene_unserialize;
      o.saveConfig    = FE3sScene_saveConfig;
      return o;
   }
   MO.FE3sScene_construct = function FE3sScene_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
   }
   MO.FE3sScene_unserialize = function FE3sScene_unserialize(input){
      var o = this;
      o.__base.FE3sSpace.unserialize.call(o, input);
      var templateCount = input.readInt16();
      if(templateCount > 0){
         var templateConsole = RConsole.find(FE3sTemplateConsole);
         var templates = o._templates = new TDictionary();
         for(var i = 0; i < templateCount; i++){
            var template = templateConsole.unserialize(p);
            templates.set(ttemplate.guid(), template);
         }
      }
   }
   MO.FE3sScene_saveConfig = function FE3sScene_saveConfig(p){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, p);
   }
}
with(MO){
   MO.FE3sSceneAnimation = function FE3sSceneAnimation(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._playRate   = 1;
      o.construct   = FE3sSceneAnimation_construct;
      o.playRate    = FE3sSceneAnimation_playRate;
      o.setPlayRate = FE3sSceneAnimation_setPlayRate;
      o.unserialize = FE3sSceneAnimation_unserialize;
      o.saveConfig  = FE3sSceneAnimation_saveConfig;
      return o;
   }
   MO.FE3sSceneAnimation_construct = function FE3sSceneAnimation_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
   }
   MO.FE3sSceneAnimation_playRate = function FE3sSceneAnimation_playRate(){
      return this._playRate;
   }
   MO.FE3sSceneAnimation_setPlayRate = function FE3sSceneAnimation_setPlayRate(playRate){
      this._playRate = playRate;
   }
   MO.FE3sSceneAnimation_unserialize = function FE3sSceneAnimation_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._playRate = p.readFloat();
   }
   MO.FE3sSceneAnimation_saveConfig = function FE3sSceneAnimation_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      p.set('play_rate', o._playRate);
   }
}
with(MO){
   MO.FE3sSceneConsole = function FE3sSceneConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._vendorCode = 'scene';
      o._dataUrl    = '/cloud.content.scene.wv'
      o._scenes     = null;
      o.construct   = FE3sSceneConsole_construct;
      o.loadByGuid  = FE3sSceneConsole_loadByGuid;
      o.loadByCode  = FE3sSceneConsole_loadByCode;
      return o;
   }
   MO.FE3sSceneConsole_construct = function FE3sSceneConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._scenes = new TDictionary();
   }
   MO.FE3sSceneConsole_loadByGuid = function FE3sSceneConsole_loadByGuid(guid){
      var o = this;
      var scenes = o._scenes;
      var scene = scenes.get(guid);
      if(scene){
         return scene;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      scene = RClass.create(FE3sScene);
      scene.setGuid(guid);
      scene.setVendor(vendor);
      scene.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(scene);
      scenes.set(guid, scene);
      return scene;
   }
   MO.FE3sSceneConsole_loadByCode = function FE3sSceneConsole_loadByCode(code){
      var o = this;
      var scenes = o._scenes;
      var scene = scenes.get(code);
      if(scene){
         return scene;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
      vendor.set('code', code);
      var url = vendor.makeUrl();
      scene = RClass.create(FE3sScene);
      scene.setCode(code);
      scene.setVendor(vendor);
      scene.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(scene);
      scenes.set(code, scene);
      return scene;
   }
}
with(MO){
   MO.FE3sSceneDisplay = function FE3sSceneDisplay(o){
      o = RClass.inherits(this, o, FE3sSprite);
      o._templateGuid        = null;
      o._animations          = null;
      o._movies              = null;
      o._renderables         = null;
      o.construct            = FE3sSceneDisplay_construct;
      o.templateGuid         = FE3sSceneDisplay_templateGuid;
      o.findAnimation        = FE3sSceneDisplay_findAnimation;
      o.syncAnimation        = FE3sSceneDisplay_syncAnimation;
      o.animations           = FE3sSceneDisplay_animations;
      o.movies               = FE3sSceneDisplay_movies;
      o.renderables          = FE3sSceneDisplay_renderables;
      o.unserialize          = FE3sSceneDisplay_unserialize;
      o.saveConfig           = FE3sSceneDisplay_saveConfig;
      o.clone                = FE3sSceneDisplay_clone;
      return o;
   }
   MO.FE3sSceneDisplay_construct = function FE3sSceneDisplay_construct(){
      var o = this;
      o.__base.FE3sSprite.construct.call(o);
   }
   MO.FE3sSceneDisplay_templateGuid = function FE3sSceneDisplay_templateGuid(){
      return this._templateGuid;
   }
   MO.FE3sSceneDisplay_findAnimation = function FE3sSceneDisplay_findAnimation(guid){
      var o = this;
      var animations = o._animations;
      if(animations){
         return animations.get(guid);
      }
      return null;
   }
   MO.FE3sSceneDisplay_syncAnimation = function FE3sSceneDisplay_syncAnimation(guid){
      var o = this;
      var animations = o._animations;
      if(!animations){
         animations = o._animations = new TDictionary();
      }
      var animation = animations.get(guid);
      if(!animation){
         animation = RClass.create(FE3sSceneAnimation);
         animation._guid = guid;
         animations.set(guid, animation);
      }
      return animation;
   }
   MO.FE3sSceneDisplay_animations = function FE3sSceneDisplay_animations(){
      return this._animations;
   }
   MO.FE3sSceneDisplay_movies = function FE3sSceneDisplay_movies(){
      return this._movies;
   }
   MO.FE3sSceneDisplay_renderables = function FE3sSceneDisplay_renderables(){
      return this._renderables;
   }
   MO.FE3sSceneDisplay_unserialize = function FE3sSceneDisplay_unserialize(input){
      var o = this;
      o.__base.FE3sSprite.unserialize.call(o, input);
      o._templateGuid = input.readString();
      var animationCount = input.readUint16();
      if(animationCount > 0){
         var animations = o._animations = new TDictionary();
         for(var i = 0; i < animationCount; i++){
            var animation = RClass.create(FE3sSceneAnimation);
            animation.unserialize(input);
            animations.set(animation.guid(), animation);
         }
      }
      var movieCount = input.readUint16();
      if(movieCount > 0){
         var movies = o._movies = new TObjects();
         for(var i = 0; i < movieCount; i++){
            var movie = RClass.create(FE3sMovie);
            movie.unserialize(input);
            movies.push(movie);
         }
      }
   }
   MO.FE3sSceneDisplay_saveConfig = function FE3sSceneDisplay_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sSprite.saveConfig.call(o, xconfig);
      xconfig.set('template_guid', o._templateGuid);
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         var xanimations = xconfig.create('AnimationCollection');
         for(var i = 0; i < count; i++){
            animations.at(i).saveConfig(xanimations.create('Animation'));
         }
      }
   }
   MO.FE3sSceneDisplay_clone = function FE3sSceneDisplay_clone(instance){
      var o = this;
      var result = o.__base.FE3sSprite.clone.call(o, instance);
      result._templateGuid = o._templateGuid;
      return result;
   }
}
with(MO){
   MO.FE3sSceneLayer = function FE3sSceneLayer(o){
      o = RClass.inherits(this, o, FE3sDisplayLayer);
      return o;
   }
}
with(MO){
   MO.FE3sSceneRenderable = function FE3sSceneRenderable(o){
      o = RClass.inherits(this, o, FE3sObject);
      o.unserialize = FE3sSceneRenderable_unserialize;
      return o;
   }
   MO.FE3sSceneRenderable_unserialize = function FE3sSceneRenderable_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
   }
}
with(MO){
   MO.FE3sShape = function FE3sShape(o){
      o = RClass.inherits(this, o, FE3sRenderable);
      o._modelGuid    = null;
      o._model        = null;
      o._meshGuid     = null;
      o._mesh         = null;
      o._materialGuid = null;
      o._material     = null;
      o.construct     = FE3sShape_construct;
      o.modelGuid     = FE3sShape_modelGuid;
      o.model         = FE3sShape_model;
      o.meshGuid      = FE3sShape_meshGuid;
      o.mesh          = FE3sShape_mesh;
      o.materialGuid  = FE3sShape_materialGuid;
      o.material      = FE3sShape_material;
      o.unserialize   = FE3sShape_unserialize;
      return o;
   }
   MO.FE3sShape_construct = function FE3sShape_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
   }
   MO.FE3sShape_modelGuid = function FE3sShape_modelGuid(){
      return this._modelGuid;
   }
   MO.FE3sShape_model = function FE3sShape_model(){
      var o = this;
      var model = o._model;
      if(!model){
         model = o._model = RConsole.find(FE3sModelConsole).findModel(o._modelGuid);
      }
      return model;
   }
   MO.FE3sShape_meshGuid = function FE3sShape_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sShape_mesh = function FE3sShape_mesh(){
      var o = this;
      var mesh = o._mesh;
      if(!mesh){
         mesh = o._mesh = RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
      }
      return mesh;
   }
   MO.FE3sShape_materialGuid = function FE3sShape_materialGuid(){
      return this._materialGuid;
   }
   MO.FE3sShape_material = function FE3sShape_material(){
      var o = this;
      var material = o._material;
      if(!material){
         material = o._material = RConsole.find(FE3sMaterialConsole).find(this._materialGuid);
      }
      return material;
   }
   MO.FE3sShape_unserialize = function FE3sShape_unserialize(input){
      var o = this;
      o.__base.FE3sRenderable.unserialize.call(o, input);
      o._modelGuid = input.readString();
      o._meshGuid = input.readString();
      o._materialGuid = input.readString();
   }
}
with(MO){
   MO.FE3sSkeleton = function FE3sSkeleton(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._bones        = null
      o._roots        = null
      o._skins        = null
      o._animations   = null
      o.findBone      = FE3sSkeleton_findBone;
      o.bones         = FE3sSkeleton_bones;
      o.roots         = FE3sSkeleton_roots;
      o.skins         = FE3sSkeleton_skins;
      o.animations    = FE3sSkeleton_animations;
      o.pushAnimation = FE3sSkeleton_pushAnimation;
      o.innerFilter   = FE3sSkeleton_innerFilter;
      o.unserialize   = FE3sSkeleton_unserialize;
      return o;
   }
   MO.FE3sSkeleton_findBone = function FE3sSkeleton_findBone(p){
      return this._bones.get(p);
   }
   MO.FE3sSkeleton_bones = function FE3sSkeleton_bones(){
      return this._bones;
   }
   MO.FE3sSkeleton_roots = function FE3sSkeleton_roots(){
      return this._roots;
   }
   MO.FE3sSkeleton_skins = function FE3sSkeleton_skins(){
      return this._skins;
   }
   MO.FE3sSkeleton_animations = function FE3sSkeleton_animations(){
      return this._animations;
   }
   MO.FE3sSkeleton_pushAnimation = function FE3sSkeleton_pushAnimation(p){
      var o = this;
      var r = o._animations;
      if(!r){
         r = o._animations = new TObjects();
      }
      r.push(p);
   }
   MO.FE3sSkeleton_innerFilter = function FE3sSkeleton_innerFilter(p){
      var o = this;
      o._bones.set(p.index(), p);
      var bs = p.bones();
      if(bs){
         var c = bs.count();
         for(var i = 0; i < c; i++){
            var b = bs.get(i);
            o.innerFilter(b)
         }
      }
   }
   MO.FE3sSkeleton_unserialize = function FE3sSkeleton_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      var c = p.readUint8();
      if(c > 0){
         o._bones = new TDictionary();
         var s = o._roots = new TObjects();
         for(var i = 0; i < c; i++){
            var b = RClass.create(FE3sBone);
            b.unserialize(p);
            o.innerFilter(b);
            s.push(b);
         }
      }
      var c = p.readUint8();
      if(c > 0){
         var s = o._skins = new TObjects();
         for(var i = 0; i < c; i++){
            var k = RClass.create(FE3sSkeletonSkin);
            k.unserialize(p);
            s.push(k);
         }
      }
   }
}
with(MO){
   MO.FE3sSkeletonSkin = function FE3sSkeletonSkin(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._meshGuid    = null;
      o._streams     = null
      o._boneRefers  = null
      o.meshGuid    = FE3sSkeletonSkin_meshGuid;
      o.find        = FE3sSkeletonSkin_find;
      o.streams     = FE3sSkeletonSkin_streams;
      o.boneRefers  = FE3sSkeletonSkin_boneRefers;
      o.unserialize = FE3sSkeletonSkin_unserialize;
      return o;
   }
   MO.FE3sSkeletonSkin_meshGuid = function FE3sSkeletonSkin_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sSkeletonSkin_find = function FE3sSkeletonSkin_find(p){
      return this._streams.get(p);
   }
   MO.FE3sSkeletonSkin_streams = function FE3sSkeletonSkin_streams(){
      return this._streams;
   }
   MO.FE3sSkeletonSkin_boneRefers = function FE3sSkeletonSkin_boneRefers(){
      return this._boneRefers;
   }
   MO.FE3sSkeletonSkin_unserialize = function FE3sSkeletonSkin_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input)
      o._meshGuid = input.readString();
      var streamCount = input.readUint8();
      if(streamCount > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input);
            streams.push(stream);
         }
      }
      var boneReferCount = input.readUint8();
      if(boneReferCount > 0){
         var boneRefers = o._boneRefers = new TObjects();
         for(var i = 0; i < boneReferCount; i++){
            var boneRefer = RClass.create(FE3sBoneRefer);
            boneRefer.unserialize(input);
            boneRefers.push(boneRefer);
         }
      }
   }
}
with(MO){
   MO.FE3sSpace = function FE3sSpace(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._typeName   = null;
      o._technique  = null;
      o._region     = null;
      o._materials  = null;
      o._displays   = null;
      o._layers     = null;
      o.construct   = FE3sSpace_construct;
      o.technique   = FE3sSpace_technique;
      o.region      = FE3sSpace_region;
      o.materials   = FE3sSpace_materials;
      o.displays    = FE3sSpace_displays;
      o.layers      = FE3sSpace_layers;
      o.unserialize = FE3sSpace_unserialize;
      o.saveConfig  = FE3sSpace_saveConfig;
      return o;
   }
   MO.FE3sSpace_construct = function FE3sSpace_construct(){
      var o = this;
      o.__base.FE3sResource.construct.call(o);
      o._technique = RClass.create(FE3sTechnique);
      o._region = RClass.create(FE3sRegion);
   }
   MO.FE3sSpace_technique = function FE3sSpace_technique(){
      return this._technique;
   }
   MO.FE3sSpace_region = function FE3sSpace_region(){
      return this._region;
   }
   MO.FE3sSpace_materials = function FE3sSpace_materials(){
      return this._materials;
   }
   MO.FE3sSpace_displays = function FE3sSpace_displays(){
      return this._displays;
   }
   MO.FE3sSpace_layers = function FE3sSpace_layers(){
      return this._layers;
   }
   MO.FE3sSpace_unserialize = function FE3sSpace_unserialize(input){
      var o = this;
      o.__base.FE3sResource.unserialize.call(o, input);
      var resourceConsole = RConsole.find(FE3sResourceConsole);
      var materialConsole = RConsole.find(FE3sMaterialConsole);
      o._technique.unserialize(input);
      o._region.unserialize(input);
      var materialCount = input.readInt16();
      if(materialCount > 0){
         var materials = o._materials = new TDictionary();
         for(var i = 0; i < materialCount; i++){
            var material = materialConsole.unserialize(input)
            materials.set(material.guid(), material);
         }
      }
      var displayCount = input.readInt16();
      if(displayCount > 0){
         var displays = o._displays = new TObjects();
         for(var i = 0; i < displayCount; i++){
            var display = resourceConsole.unserialize(input);
            displays.push(display);
         }
      }
      var layerCount = input.readInt16();
      if(layerCount > 0){
         var layers = o._layers = new TDictionary();
         for(var i = 0; i < layerCount; i++){
            var layer = RClass.create(FE3sDisplayLayer);
            layer.unserialize(input);
            layers.set(layer.code(), layer);
         }
      }
   }
   MO.FE3sSpace_saveConfig = function FE3sSpace_saveConfig(p){
      var o = this;
      o.__base.FE3sResource.saveConfig.call(o, p);
      o._technique.saveConfig(p.create('Technique'));
      o._region.saveConfig(p.create('Region'));
      var materials = o._materials;
      if(materials){
         var xmaterials = p.create('MaterialCollection');
         var materialCount = materials.count();
         for(var i = 0; i < materialCount; i++){
            var material = materials.at(i);
            material.saveConfig(xmaterials.create('Material'));
         }
      }
      var displays = o._displays;
      if(displays){
         var xdisplays = p.create('DisplayCollection');
         var displayCount = displays.count();
         for(var i = 0; i < displayCount; i++){
            var display = displays.at(i);
            display.saveConfig(xdisplays.create('Display'));
         }
      }
      var layers = o._layers;
      if(layers){
         var xlayers = p.create('LayerCollection');
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.valueAt(i);
            layer.saveConfig(xlayers.create('Layer'));
         }
      }
   }
}
with(MO){
   MO.FE3sSprite = function FE3sSprite(o){
      o = RClass.inherits(this, o, FE3sDisplayContainer);
      o._materials   = null;
      o.construct    = FE3sSprite_construct;
      o.materials    = FE3sSprite_materials;
      o.pushMaterial = FE3sSprite_pushMaterial;
      o.unserialize  = FE3sSprite_unserialize;
      o.saveConfig   = FE3sSprite_saveConfig;
      o.clone        = FE3sSprite_clone;
      return o;
   }
   MO.FE3sSprite_construct = function FE3sSprite_construct(){
      var o = this;
      o.__base.FE3sDisplayContainer.construct.call(o);
   }
   MO.FE3sSprite_materials = function FE3sSprite_materials(){
      return this._materials;
   }
   MO.FE3sSprite_pushMaterial = function FE3sSprite_pushMaterial(material){
      var o = this;
      var materials = o._materials;
      if(!materials){
         materials = o._materials = new TDictionary();
      }
      materials.set(material.guid(), material);
   }
   MO.FE3sSprite_unserialize = function FE3sSprite_unserialize(input){
      var o = this;
      o.__base.FE3sDisplayContainer.unserialize.call(o, input);
      var materialCount = input.readUint16();
      if(materialCount > 0){
         var materialConsole = RConsole.find(FE3sMaterialConsole);
         for(var i = 0; i < materialCount; i++){
            var material = materialConsole.unserialize(input)
            o.pushMaterial(material);
         }
      }
   }
   MO.FE3sSprite_saveConfig = function FE3sSprite_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
      var materials = o._materials;
      if(materials){
         var count = materials.count();
         var xmaterials = xconfig.create('MaterialCollection');
         for(var i = 0; i < count; i++){
            var material = materials.at(i);
            material.saveConfig(xmaterials.create('Material'));
         }
      }
      var movies = o._movies;
      if(movies){
         var count = movies.count();
         var xmovies = xconfig.create('MovieCollection');
         for(var i = 0; i < count; i++){
            var movie = movies.at(i);
            movie.saveConfig(xmovies.create('Movie'));
         }
      }
   }
   MO.FE3sSprite_clone = function FE3sSprite_clone(instance){
      var o = this;
      var result = o.__base.FE3sDisplayContainer.clone.call(o, instance);
      var materials = o._materials;
      if(materials){
         var count = materials.count();
         for(var i = 0; i < count; i++){
            var material = materials.at(i);
            result.pushMaterial(material.clone());
         }
      }
      return result;
   }
}
with(MO){
   MO.FE3sStream = function FE3sStream(o){
      o = RClass.inherits(this, o, FObject);
      o._code             = RClass.register(o, new AGetSet('_code'));
      o._elementDataCd    = RClass.register(o, new AGetSet('_elementDataCd'), 0);
      o._elementCount     = RClass.register(o, new AGetSet('_elementCount'), 0);
      o._elementNormalize = RClass.register(o, new AGetSet('_elementNormalize'), false);
      o._dataStride       = RClass.register(o, new AGetSet('_dataStride'), 0);
      o._dataCount        = RClass.register(o, new AGetSet('_dataCount'), 0);
      o._dataLength       = RClass.register(o, new AGetSet('_dataLength'), 0);
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._formatCd         = RClass.register(o, new AGetSet('_formatCd'), EG3dAttributeFormat.Unknown);
      o.unserialize       = FE3sStream_unserialize;
      o.dispose           = FE3sStream_dispose;
      return o;
   }
   MO.FE3sStream_unserialize = function FE3sStream_unserialize(input){
      var o = this;
      o._code = input.readString();
      o._elementDataCd = input.readUint8();
      o._elementCount = input.readUint8();
      o._elementNormalize = input.readBoolean();
      var dataStride = o._dataStride = input.readUint8();
      var dataCount = o._dataCount = input.readInt32();
      var dataLength = o._dataLength = dataStride * dataCount;
      var data = o._data = new ArrayBuffer(dataLength);
      input.readBytes(data, 0, dataLength);
   }
   MO.FE3sStream_dispose = function FE3sStream_dispose(){
      var o = this;
      o.data = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTechnique = function FE3sTechnique(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._techniqueCode = null;
      o._passes        = null;
      o.passes         = FE3sTechnique_passes;
      o.unserialize    = FE3sTechnique_unserialize;
      o.saveConfig     = FE3sTechnique_saveConfig;
      return o;
   }
   MO.FE3sTechnique_passes = function FE3sTechnique_passes(){
      return this._passes;
   }
   MO.FE3sTechnique_unserialize = function FE3sTechnique_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      var passCount = input.readInt16();
      if(passCount > 0){
         var passes = o._passes = new TObjects();
         for(var i = 0; i < passCount; i++){
            var pass = RClass.create(FE3sTechniquePass);
            pass.unserialize(input);
            passes.push(pass);
         }
      }
   }
   MO.FE3sTechnique_saveConfig = function FE3sTechnique_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      p.set('technique_code', o._techniqueCode);
   }
}
with(MO){
   MO.FE3sTechniquePass = function FE3sTechniquePass(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._targetWidth  = null;
      o._targetHeight = null;
      o.targetWidth   = FE3sTechniquePass_targetWidth;
      o.targetHeight  = FE3sTechniquePass_targetHeight;
      o.unserialize   = FE3sTechniquePass_unserialize;
      return o;
   }
   MO.FE3sTechniquePass_targetWidth = function FE3sTechniquePass_targetWidth(){
      return this._targetWidth;
   }
   MO.FE3sTechniquePass_targetHeight = function FE3sTechniquePass_targetHeight(){
      return this._targetHeight;
   }
   MO.FE3sTechniquePass_unserialize = function FE3sTechniquePass_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._targetWidth = input.readUint16();
      o._targetHeight = input.readUint16();
   }
}
with(MO){
   MO.FE3sTemplate = function FE3sTemplate(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName     = 'Template';
      o._dataCompress = true;
      return o;
   }
}
with(MO){
   MO.FE3sTemplateConsole = function FE3sTemplateConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._templates  = null;
      o._serviceUrl = '/cloud.content.template.ws'
      o.construct   = FE3sTemplateConsole_construct;
      o.unserialize = FE3sTemplateConsole_unserialize;
      o.loadByGuid  = FE3sTemplateConsole_loadByGuid;
      o.loadByCode  = FE3sTemplateConsole_loadByCode;
      o.update      = FE3sTemplateConsole_update;
      return o;
   }
   MO.FE3sTemplateConsole_construct = function FE3sTemplateConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._templates = new TDictionary();
   }
   MO.FE3sTemplateConsole_unserialize = function FE3sTemplateConsole_unserialize(p){
      var o = this;
      var r = RClass.create(FE3sTemplate);
      r._dataReady = true;
      r.unserialize(p);
      o._templates.set(r.guid(), r);
      return r;
   }
   MO.FE3sTemplateConsole_loadByGuid = function FE3sTemplateConsole_loadByGuid(guid){
      var o = this;
      var templates = o._templates;
      var template = templates.get(guid);
      if(template){
         return template;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('template');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      template = RClass.create(FE3sTemplate);
      template.setGuid(guid);
      template.setVendor(vendor);
      template.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(template);
      templates.set(guid, template);
      return template;
   }
   MO.FE3sTemplateConsole_loadByCode = function FE3sTemplateConsole_loadByCode(code){
      var o = this;
      var templates = o._templates;
      var template = templates.get(code);
      if(template){
         return template;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('template');
      vendor.set('code', code);
      var url = vendor.makeUrl();
      template = RClass.create(FE3sTemplate);
      template.setCode(code);
      template.setVendor(vendor);
      template.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(template);
      templates.set(code, template);
      return template;
   }
   MO.FE3sTemplateConsole_update = function FE3sTemplateConsole_update(p){
      var o = this;
      var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
      RConsole.find(FXmlConsole).send(u, p);
   }
}
with(MO){
   MO.FE3sTemplateTheme = function FE3sTemplateTheme(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._materials   = null;
      o.findMaterial = FE3sTemplateTheme_findMaterial;
      o.materials    = FE3sTemplateTheme_materials;
      o.unserialize  = FE3sTemplateTheme_unserialize;
      return o;
   }
   MO.FE3sTemplateTheme_findMaterial = function FE3sTemplateTheme_findMaterial(p){
      return this._materials.get(p);
   }
   MO.FE3sTemplateTheme_materials = function FE3sTemplateTheme_materials(){
      return this._materials;
   }
   MO.FE3sTemplateTheme_unserialize = function FE3sTemplateTheme_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      var c = p.readUint16();
      if(c > 0){
         var mc = RConsole.find(FE3sMaterialConsole);
         var s = o._materials = new TDictionary();
         for(var n = 0; n < c; n++){
            var m = mc.unserialize(p);
            s.set(m.groupGuid(), m);
         }
      }
   }
}
with(MO){
   MO.FE3sTexture = function FE3sTexture(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._dataCompress = true;
      o._bitmaps      = null;
      o._bitmapPacks  = null;
      o.construct     = FE3sTexture_construct;
      o.bitmaps       = FE3sTexture_bitmaps;
      o.bitmapPacks   = FE3sTexture_bitmapPacks;
      o.unserialize   = FE3sTexture_unserialize;
      o.dispose       = FE3sTexture_dispose;
      return o;
   }
   MO.FE3sTexture_construct = function FE3sTexture_construct(){
      var o = this;
      o.__base.FE3sResource.construct.call(o);
   }
   MO.FE3sTexture_bitmaps = function FE3sTexture_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3sTexture_bitmapPacks = function FE3sTexture_bitmapPacks(){
      return this._bitmapPacks;
   }
   MO.FE3sTexture_unserialize = function FE3sTexture_unserialize(p){
      var o = this;
      o.__base.FE3sResource.unserialize.call(o, p);
      var c = p.readInt16();
      if(c > 0){
         var s = o._bitmaps = new TDictionary();
         for(var i = 0; i < c; i++){
            var b = RClass.create(FE3sTextureBitmap);
            b.unserialize(p);
            s.set(b.code(), b);
         }
      }
      var c = p.readInt16();
      if(c > 0){
         var s = o._bitmapPacks = new TDictionary();
         for(var i = 0; i < c; i++){
            var b = RClass.create(FE3sTextureBitmapPack);
            b._texture = o;
            b.unserialize(p);
            s.set(b.code(), b);
         }
      }
   }
   MO.FE3sTexture_dispose = function FE3sTexture_dispose(){
      var o = this;
      o._bitmaps = RObject.free(o._bitmaps);
      o._bitmapPacks = RObject.free(o._bitmapPacks);
      o.__base.FE3sResource.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTextureBitmap = function FE3sTextureBitmap(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._packCode   = null;
      o.packCode    = FE3sTextureBitmap_packCode;
      o.unserialize = FE3sTextureBitmap_unserialize;
      return o;
   }
   MO.FE3sTextureBitmap_packCode = function FE3sTextureBitmap_packCode(){
      return this._packCode;
   }
   MO.FE3sTextureBitmap_unserialize = function FE3sTextureBitmap_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._packCode = p.readString();
   }
}
with(MO){
   MO.FE3sTextureBitmapPack = function FE3sTextureBitmapPack(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._optionCompress = null;
      o._size           = null;
      o._data           = null;
      o._typeName       = null;
      o._formatName     = null;
      o.construct       = FE3sTextureBitmapPack_construct;
      o.optionCompress  = FE3sTextureBitmapPack_optionCompress;
      o.size            = FE3sTextureBitmapPack_size;
      o.data            = FE3sTextureBitmapPack_data;
      o.unserialize     = FE3sTextureBitmapPack_unserialize;
      o.dispose         = FE3sTextureBitmapPack_dispose;
      return o;
   }
   MO.FE3sTextureBitmapPack_construct = function FE3sTextureBitmapPack_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3sTextureBitmapPack_optionCompress = function FE3sTextureBitmapPack_optionCompress(){
      return this._optionCompress;
   }
   MO.FE3sTextureBitmapPack_size = function FE3sTextureBitmapPack_size(){
      return this._size;
   }
   MO.FE3sTextureBitmapPack_data = function FE3sTextureBitmapPack_data(){
      return this._data;
   }
   MO.FE3sTextureBitmapPack_unserialize = function FE3sTextureBitmapPack_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._typeName = p.readString();
      o._formatName = p.readString();
      o._size.width = p.readUint16();
      o._size.height = p.readUint16();
      if(o._typeName == 'flat'){
         var c = p.readInt32();
      }else if(o._typeName == 'cube'){
         o._data = new Array();
         for(var i = 0; i < 6; i++){
            var c = p.readInt32();
            var d = o._data[i] = new ArrayBuffer(c);
            p.readBytes(d, 0, c);
         }
      }else{
         throw new TError(o, 'Unserial texture failure ');
      }
   }
   MO.FE3sTextureBitmapPack_dispose = function FE3sTextureBitmapPack_dispose(){
      var o = this;
      o._data = null;
      o.__base.FE3sObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTextureConsole = function FE3sTextureConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._textures   = null;
      o.construct   = FE3sTextureConsole_construct;
      o.unserialize = FE3sTextureConsole_unserialize;
      o.load        = FE3sTextureConsole_load;
      o.loadBitmap  = FE3sTextureConsole_loadBitmap;
      o.dispose     = FE3sModelConsole_dispose;
      return o;
   }
   MO.FE3sTextureConsole_construct = function FE3sTextureConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._textures = new TDictionary();
   }
   MO.FE3sTextureConsole_unserialize = function FE3sTextureConsole_unserialize(p){
      var o = this;
      var r = RClass.create(FE3sTexture);
      r._dataReady = true;
      r.unserialize(p);
      o._textures.set(r.guid(), r);
      return r;
   }
   MO.FE3sTextureConsole_load = function FE3sTextureConsole_load(p){
      var o = this;
      var s = o._textures;
      var r = s.get(p);
      if(r){
         return r;
      }
      var v = RConsole.find(FE3sVendorConsole).find('texture');
      var u = v.makeUrl(p);
      r = RClass.create(FE3sTexture);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
      return r;
   }
   MO.FE3sTextureConsole_loadBitmap = function FE3sTextureConsole_loadBitmap(pg, pc, pf){
      var o = this;
      var v = RConsole.find(FE3sVendorConsole).find('texture.bitmap');
      v.set('guid', pg);
      v.set('code', pc);
      v.set('format', pf);
      var u = v.makeUrl();
      var g = o._image = RClass.create(FImage);
      g.loadUrl(u);
      return g;
   }
   MO.FE3sTextureConsole_dispose = function FE3sTextureConsole_dispose(){
      var o = this;
      o._textures = RObject.free(o._textures);
      o.__base.FConsole.dispose.call(o);
   }
}
MO.FE3sTheme = function FE3sTheme(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._materials  = MO.Class.register(o, new MO.AGetter('_materials'));
   o.find        = MO.FE3sTheme_find;
   o.unserialize = MO.FE3sTheme_unserialize;
   return o;
}
MO.FE3sTheme_find = function FE3sTheme_find(name){
   var materials = this._materials;
   return materials ? materials.get(name) : null;
}
MO.FE3sTheme_unserialize = function FE3sTheme_unserialize(input){
   var o = this;
   var count = input.readInt32();
   if(count > 0){
      var materials = o._materials = new MO.TDictionary();
      for(var n = 0; n < c; n++){
         var material = RClass.create(FE3sMaterial);
         material.unserialize(input);
         materials.set(material.code(), material);
      }
   }
}
with(MO){
   MO.FE3sThemeConsole = function FE3sThemeConsole(o){
      o = MO.Class.inherits(this, o, MO.FConsole);
      o._path        = '/assets/theme/'
      o._activeTheme = RClass.register(o, new AGetter('_activeTheme'));
      o._themes      = null;
      o.construct    = FE3sThemeConsole_construct;
      o.find         = FE3sThemeConsole_find;
      o.select       = FE3sThemeConsole_select;
      return o;
   }
   MO.FE3sThemeConsole_construct = function FE3sThemeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._themes = new TDictionary();
   }
   MO.FE3sThemeConsole_find = function FE3sThemeConsole_find(name){
      var theme = this._activeTheme;
      if(theme == null){
         throw new TError('Active theme is empty.');
      }
      return theme.find(name);
   }
   MO.FE3sThemeConsole_select = function FE3sThemeConsole_select(name){
      var o = this;
      var theme = o._themes.get(name);
      if(theme == null){
         var url = RBrowser.contentPath(o._path + name + '.ser');
         theme = RClass.create(FE3sTheme);
         theme.load(url);
         o._themes.set(name, theme);
      }
      o._activeTheme = theme;
      return theme;
   }
}
with(MO){
   MO.FE3sTrack = function FE3sTrack(o){
      o = RClass.inherits(this, o, FObject);
      o._meshCode     = null;
      o._boneIndex    = 0;
      o._frameTick    = 0;
      o._matrix       = null;
      o._matrixInvert = null;
      o._frameCount   = null;
      o._frames       = null;
      o.construct     = FE3sTrack_construct;
      o.boneIndex     = FE3sTrack_boneIndex;
      o.frameTick     = FE3sTrack_frameTick;
      o.matrix        = FE3sTrack_matrix;
      o.matrixInvert  = FE3sTrack_matrixInvert;
      o.frames        = FE3sTrack_frames;
      o.calculate     = FE3sTrack_calculate;
      o.unserialize   = FE3sTrack_unserialize;
      return o;
   }
   MO.FE3sTrack_construct = function FE3sTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._matrixInvert = new SMatrix3d();
   }
   MO.FE3sTrack_boneIndex = function FE3sTrack_boneIndex(){
      return this._boneIndex;
   }
   MO.FE3sTrack_frameTick = function FE3sTrack_frameTick(){
      return this._frameTick;
   }
   MO.FE3sTrack_matrix = function FE3sTrack_matrix(){
      return this._matrix;
   }
   MO.FE3sTrack_matrixInvert = function FE3sTrack_matrixInvert(){
      return this._matrixInvert;
   }
   MO.FE3sTrack_frames = function FE3sTrack_frames(){
      return this._frames;
   }
   MO.FE3sTrack_calculate = function FE3sTrack_calculate(info, tick){
      var o = this;
      var frameCount = info.frameCount;
      if(frameCount == 0){
         throw new TError('Frame count is invalid.');
      }
      var beginIndex = info.beginIndex;
      var frameTick = o._frameTick;
      var index = parseInt(tick / frameTick) % frameCount;
      var frames = o._frames;
      var currentFrame = frames.get(beginIndex + index);
      var nextFrame = null;
      if(index < frameCount - 1){
         nextFrame = frames.get(beginIndex + index + 1);
      }else{
         nextFrame = frames.get(beginIndex);
      }
      info.tick = tick;
      info.rate = (tick % frameTick) / frameTick;
      info.currentFrame = currentFrame;
      info.nextFrame = nextFrame;
      return true;
   }
   MO.FE3sTrack_unserialize = function FE3sTrack_unserialize(input){
      var o = this;
      o._meshCode = input.readString();
      o._boneIndex = input.readUint16();
      o._frameTick = input.readUint16();
      o._matrix.unserialize(input);
      o._matrixInvert.assign(o._matrix);
      o._matrixInvert.invert();
      o._frameCount = input.readInt16();
      o._frames = new TObjects();
   }
}
with(MO){
   MO.FE3sVendor = function FE3sVendor(o){
      o = RClass.inherits(this, o, FObject);
      o._contentUrl   = null;
      o._parameters   = null;
      o.construct     = FE3sVendor_construct;
      o.contentUrl    = FE3sVendor_contentUrl;
      o.setContentUrl = FE3sVendor_setContentUrl;
      o.get           = FE3sVendor_get;
      o.set           = FE3sVendor_set;
      o.makeSource    = RMethod.virtual(o, 'makeSource');
      o.makeUrl       = FE3sVendor_makeUrl;
      o.reset         = FE3sVendor_reset;
      o.dispose       = FE3sVendor_dispose;
      return o;
   }
   MO.FE3sVendor_construct = function FE3sVendor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._parameters = new TAttributes();
   }
   MO.FE3sVendor_contentUrl = function FE3sVendor_contentUrl(p){
      return this._contentUrl;
   }
   MO.FE3sVendor_setContentUrl = function FE3sVendor_setContentUrl(p){
      this._contentUrl = p;
   }
   MO.FE3sVendor_get = function FE3sVendor_get(n){
      return this._parameters.get(n);
   }
   MO.FE3sVendor_set = function FE3sVendor_set(n, v){
      this._parameters.set(n, v);
   }
   MO.FE3sVendor_makeUrl = function FE3sVendor_makeUrl(){
      var o = this;
      var r = o.makeSource();
      if(MO.Runtime.isDebug()){
         if(r.indexOf('?') == -1){
            r += '?';
         }else{
            r += '&';
         }
         r += 'date=' + RDate.format();
      }
      return r;
   }
   MO.FE3sVendor_reset = function FE3sVendor_reset(){
      this._parameters.clear();
   }
   MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
      var o = this;
      o._parameters = RObject.dispose(o._parameters);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sVendorConsole = function FE3sVendorConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._setuped     = false;
      o._vendors     = null;
      o.construct    = FE3sVendorConsole_construct;
      o.createVendor = FE3sVendorConsole_createVendor;
      o.register     = FE3sVendorConsole_register;
      o.find         = FE3sVendorConsole_find;
      o.setup        = FE3sVendorConsole_setup;
      return o;
   }
   MO.FE3sVendorConsole_construct = function FE3sVendorConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._vendors = new TDictionary();
   }
   MO.FE3sVendorConsole_createVendor = function FE3sVendorConsole_createVendor(c, u){
      var v = RClass.create(c);
      v.setContentUrl(u);
      return v;
   }
   MO.FE3sVendorConsole_register = function FE3sVendorConsole_register(n, p){
      this._vendors.set(n, p);
   }
   MO.FE3sVendorConsole_find = function FE3sVendorConsole_find(p){
      var o = this;
      if(!o._setuped){
         o.setup('net');
      }
      var v = o._vendors.get(p);
      v.reset();
      return v;
   }
   MO.FE3sVendorConsole_setup = function FE3sVendorConsole_setup(p){
      var o = this;
      if(p == 'net'){
         o._vendors.set('bitmap', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
         o._vendors.set('material', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
         o._vendors.set('mesh', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
         o._vendors.set('model', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
         o._vendors.set('template', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
         o._vendors.set('scene', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
      }else if(p == 'local'){
         o._vendors.set('bitmap', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
         o._vendors.set('material', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/material/{guid}.bin')));
         o._vendors.set('mesh', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
         o._vendors.set('model', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/model/{guid}.bin')));
         o._vendors.set('template', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/template/{guid}.bin')));
         o._vendors.set('scene', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/scene/{guid}.bin')));
      }else{
         throw new TError(o, 'Unknown setup code. (code={1})', p);
      }
      o._setuped = true;
   }
}
with(MO){
   MO.FE3sVendorLocal = function FE3sVendorLocal(o){
      o = RClass.inherits(this, o, FE3sVendor);
      o.makeSource = FE3sVendorLocal_makeSource;
      return o;
   }
   MO.FE3sVendorLocal_makeSource = function FE3sVendorLocal_makeSource(){
      var o = this;
      var u = o._contentUrl;
      var s = o._parameters;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var n = s.name(i);
         var v = s.value(i);
         u = RString.replace(u, '{' + n + '}', v);
      }
      return u;
   }
}
with(MO){
   MO.FE3sVendorNet = function FE3sVendorNet(o){
      o = RClass.inherits(this, o, FE3sVendor);
      o.makeSource = FE3sVendorNet_makeSource;
      return o;
   }
   MO.FE3sVendorNet_makeSource = function FE3sVendorNet_makeSource(){
      var o = this;
      var url = o._contentUrl;
      if(url.indexOf('?') == -1){
         url += '?';
      }else{
         url += '&';
      }
      var parameters = o._parameters;
      var count = parameters.count();
      var first = false;
      for(var i = 0; i < count; i++){
         var name = parameters.name(i);
         var value = parameters.value(i);
         if(!RString.isEmpty(value)){
            if(first){
               url += '&';
            }else{
               first = true;
            }
            url += name + '=' + value;
         }
      }
      return url;
   }
}
with(MO){
   MO.SE3rPlayInfo = function SE3rPlayInfo(){
      var o = this;
      o.tick         = 0;
      o.playRate     = 1.0;
      o.beginIndex   = 0;
      o.endIndex     = 0;
      o.frameCount   = 0;
      o.currentFrame = null;
      o.nextFrame    = null;
      o.rate         = 1.0;
      o.alpha        = 1.0;
      o.translation  = new SPoint3();
      o.quaternion   = new SQuaternion();
      o.scale        = new SVector3();
      o.matrix       = new SMatrix3d();
      o.update       = SE3rPlayInfo_update;
      return o;
   }
   MO.SE3rPlayInfo_update = function SE3rPlayInfo_update(){
      var o = this;
      var currentFrame = o.currentFrame;
      if(!currentFrame){
         return false;
      }
      var nextFrame = o.nextFrame;
      if(!nextFrame){
         return false;
      }
      var matrix = o.matrix;
      var currentTranslation = currentFrame.translation();
      var currentQuaternion = currentFrame.quaternion();
      var currentScale = currentFrame.scale();
      var rate = o.rate;
      if((rate > 0) && (rate < 1)){
         o.translation.slerp(currentTranslation, nextFrame.translation(), rate);
         o.quaternion.slerp(currentQuaternion, nextFrame.quaternion(), rate);
         o.scale.slerp(currentScale, nextFrame.scale(), rate);
         matrix.build(o.translation, o.quaternion, o.scale);
      }else{
         matrix.build(currentTranslation, currentQuaternion, currentScale);
      }
      return true;
   }
}
with(MO){
   MO.FE3rAnimation = function FE3rAnimation(o){
      o = RClass.inherits(this, o, FObject);
      o._valid       = false;
      o._baseTick    = 0;
      o._currentTick = 0;
      o._lastTick    = 0;
      o._playRate    = 1.0;
      o._tracks      = null;
      o._resource    = null;
      o._playInfo    = null;
      o.construct    = FE3rAnimation_construct;
      o.findTrack    = FE3rAnimation_findTrack;
      o.tracks       = FE3rAnimation_tracks;
      o.resource     = FE3rAnimation_resource;
      o.loadResource = FE3rAnimation_loadResource;
      o.record       = FE3rAnimation_record;
      o.process      = RMethod.virtual(o, 'process');
      o.dispose      = FE3rAnimation_dispose;
      return o;
   }
   MO.FE3rAnimation_construct = function FE3rAnimation_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._playInfo = new SE3rPlayInfo();
   }
   MO.FE3rAnimation_findTrack = function FE3rAnimation_findTrack(p){
      var o = this;
      var ts = o._tracks;
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         if(t.boneIndex() == p){
            return t;
         }
      }
      return null;
   }
   MO.FE3rAnimation_tracks = function FE3rAnimation_tracks(){
      return this._tracks;
   }
   MO.FE3rAnimation_resource = function FE3rAnimation_resource(){
      return this._resource;
   }
   MO.FE3rAnimation_loadResource = function FE3rAnimation_loadResource(resource){
      var o = this;
      var frameCount = resource.frameCount();
      o._resource = resource;
      var trackResources = resource.tracks();
      if(trackResources){
         var tracks = o._tracks = new TObjects();
         var count = trackResources.count();
         for(var i = 0; i < count; i++){
            var trackResource = trackResources.at(i);
            var track = RClass.create(FE3rTrack);
            track._animation = o;
            track.loadResource(trackResource);
            tracks.push(track);
         }
      }
      if(frameCount > 0){
         var info = o._playInfo;
         info.beginIndex = 0;
         info.endIndex = (frameCount > 0) ? frameCount - 1 : 0;
         info.frameCount = frameCount;
         o._valid = true;
      }
   }
   MO.FE3rAnimation_record = function FE3rAnimation_record(){
      var o = this;
      var t = RTimer.current();
      if(o._lastTick == 0){
         o._lastTick = t;
      }
      o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate;
   }
   MO.FE3rAnimation_dispose = function FE3rAnimation_dispose(){
      var o = this;
      o._tracks = null;
      o._resource = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmap = function FE3rBitmap(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._pack        = null;
      o.construct    = FE3rBitmap_construct;
      o.testReady    = FE3rBitmap_testReady;
      o.texture      = FE3rBitmap_texture;
      o.loadResource = FE3rBitmap_loadResource;
      o.dispose      = FE3rBitmap_dispose;
      return o;
   }
   MO.FE3rBitmap_construct = function FE3rBitmap_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
   }
   MO.FE3rBitmap_testReady = function FE3rBitmap_testReady(){
      return this._pack.testReady();
   }
   MO.FE3rBitmap_texture = function FE3rBitmap_texture(){
      return this._pack.texture();
   }
   MO.FE3rBitmap_loadResource = function FE3rBitmap_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._guid = resource.guid();
      o._code = resource.code();
   }
   MO.FE3rBitmap_dispose = function FE3rBitmap_dispose(){
      var o = this;
      o.__base.FE3rObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmapConsole = function FE3rBitmapConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._bitmaps  = null;
      o._dataUrl  = '/cloud.resource.material.wv'
      o.construct = FE3rBitmapConsole_construct;
      o.bitmaps   = FE3rBitmapConsole_bitmaps;
      o.load      = FE3rBitmapConsole_load;
      o.loadUrl   = FE3rBitmapConsole_loadUrl;
      return o;
   }
   MO.FE3rBitmapConsole_construct = function FE3rBitmapConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._bitmaps = new TDictionary();
   }
   MO.FE3rBitmapConsole_bitmaps = function FE3rBitmapConsole_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3rBitmapConsole_load = function FE3rBitmapConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var bitmap = o._bitmaps.get(flag);
      if(bitmap){
         return bitmap;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._bitmaps.set(flag, bitmap);
      return bitmap;
   }
   MO.FE3rBitmapConsole_loadUrl = function FE3rBitmapConsole_loadUrl(context, url){
      var o = this;
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3rBitmap);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
}
with(MO){
   MO.FE3rBitmapCubePack = function FE3rBitmapCubePack(o){
      o = RClass.inherits(this, o, FE3rBitmapPack);
      o._resource    = null;
      o._images      = null;
      o.onLoad       = FE3rBitmapCubePack_onLoad;
      o.construct    = FE3rBitmapCubePack_construct;
      o.loadUrl      = FE3rBitmapCubePack_loadUrl;
      o.dispose      = FE3rBitmapCubePack_dispose;
      return o;
   }
   MO.FE3rBitmapCubePack_onLoad = function FE3rBitmapCubePack_onLoad(p){
      var o = this;
      var context = o._graphicContext;
      var images = o._images;
      var capability = RBrowser.capability();
      for(var i = 0; i < 6; i++){
         if(!images.at(i).testReady()){
            return;
         }
      }
      var texture = o._texture = context.createCubeTexture();
      texture.upload(images.at(0), images.at(1), images.at(2), images.at(3), images.at(4), images.at(5));
      for(var i = 0; i < 6; i++){
         var image = images.at(i);
         image.dispose();
      }
      o._images = RObject.dispose(o._images);
      o._dataReady = true;
      o._ready = true;
   }
   MO.FE3rBitmapCubePack_construct = function FE3rBitmapCubePack_construct(){
      var o = this;
      o.__base.FE3rBitmapPack.construct.call(o);
   }
   MO.FE3rBitmapCubePack_loadUrl = function FE3rBitmapCubePack_loadUrl(url){
      var o = this;
      o._images = new TObjects();
      for(var i = 0; i < 6; i++){
         var image = RClass.create(FImage);
         image._index = i;
         image.setOptionAlpha(false);
         image.loadUrl(url + "&index=" + i);
         image.addLoadListener(o, o.onLoad);
         o._images.push(image);
      }
   }
   MO.FE3rBitmapCubePack_dispose = function FE3rBitmapCubePack_dispose(){
      var o = this;
      o._images = RObject.dispose(o._images);
      o.__base.FE3rBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmapFlatPack = function FE3rBitmapFlatPack(o){
      o = RClass.inherits(this, o, FE3rBitmapPack);
      o._resource    = null;
      o._image       = null;
      o.onLoad       = FE3rBitmapFlatPack_onLoad;
      o.construct    = FE3rBitmapFlatPack_construct;
      o.loadUrl      = FE3rBitmapFlatPack_loadUrl;
      o.dispose      = FE3rBitmapFlatPack_dispose;
      return o;
   }
   MO.FE3rBitmapFlatPack_onLoad = function FE3rBitmapFlatPack_onLoad(event){
      var o = this;
      var context = o._graphicContext;
      var texture = o._texture = context.createFlatTexture();
      texture.upload(o._image);
      texture.makeMipmap();
      o._image = RObject.dispose(o._image);
      o._dataReady = true;
   }
   MO.FE3rBitmapFlatPack_construct = function FE3rBitmapFlatPack_construct(){
      var o = this;
      o.__base.FE3rBitmapPack.construct.call(o);
   }
   MO.FE3rBitmapFlatPack_loadUrl = function FE3rBitmapFlatPack_loadUrl(url){
      var o = this;
      var image = o._image = RClass.create(FImage);
      image.addLoadListener(o, o.onLoad);
      image.loadUrl(url);
   }
   MO.FE3rBitmapFlatPack_dispose = function FE3rBitmapFlatPack_dispose(){
      var o = this;
      o._image = RObject.dispose(o._image);
      o.__base.FE3rBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmapPack = function FE3rBitmapPack(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._resource    = null;
      o._image       = null;
      o._texture     = null;
      o._ready       = false;
      o._dataReady   = false;
      o.onLoad       = RMethod.virtual(o, 'onLoad');
      o.construct    = FE3rBitmapPack_construct;
      o.texture      = FE3rBitmapPack_texture;
      o.testReady    = FE3rBitmapPack_testReady;
      o.loadUrl      = RMethod.virtual(o, 'loadUrl');
      o.dispose      = FE3rBitmapPack_dispose;
      return o;
   }
   MO.FE3rBitmapPack_construct = function FE3rBitmapPack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FE3rBitmapPack_texture = function FE3rBitmapPack_texture(){
      return this._texture;
   }
   MO.FE3rBitmapPack_testReady = function FE3rBitmapPack_testReady(){
      var o = this;
      if(o._dataReady){
         o._ready = o._texture.isValid();
      }
      return o._ready;
   }
   MO.FE3rBitmapPack_dispose = function FE3rBitmapPack_dispose(){
      var o = this;
      o._ready = false;
      o._dataReady = false;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBone = function FE3rBone(o){
      o = RClass.inherits(this, o, FObject);
      o._matrix        = null
      o._boneResource  = null
      o._trackResource = null;
      o.construct      = FE3rBone_construct;
      o.matrix         = FE3rBone_matrix;
      o.trackResource  = FE3rBone_trackResource;
      o.loadResource   = FE3rBone_loadResource;
      o.update         = FE3rBone_update;
      o.dispose        = FE3rBone_dispose;
      return o;
   }
   MO.FE3rBone_construct = function FE3rBone_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3rBone_matrix = function FE3rBone_matrix(){
      return this._matrix;
   }
   MO.FE3rBone_trackResource = function FE3rBone_trackResource(){
      return this._trackResource;
   }
   MO.FE3rBone_loadResource = function FE3rBone_loadResource(p){
      var o = this;
      o._boneResource = p;
      o._trackResource = p.track();
   }
   MO.FE3rBone_update = function FE3rBone_update(info, tick){
      var o = this;
      var resource = o._trackResource;
      resource.calculate(info, tick);
      info.update();
      var matrix = o._matrix;
      matrix.assign(resource.matrixInvert());
      matrix.append(info.matrix);
   }
   MO.FE3rBone_dispose = function FE3rBone_dispose(){
      var o = this;
      o._boneResource = null;
      o._trackResource = null;
      o.__base.FG3dBone.dispose.call(o);
   }
}
with(MO){
   MO.FE3rDynamicMesh = function FE3rDynamicMesh(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._model            = null;
      o._optionMerge      = true;
      o._vertexPosition   = 0;
      o._vertexTotal      = 0;
      o._indexPosition    = 0;
      o._indexTotal       = 0;
      o._mergeRenderables = null;
      o.construct         = FE3rDynamicMesh_construct;
      o.mergeCount        = FE3rDynamicMesh_mergeCount;
      o.mergeMaxCount     = FE3rDynamicMesh_mergeMaxCount;
      o.mergeRenderables  = FE3rDynamicMesh_mergeRenderables;
      o.syncVertexBuffer  = FE3rDynamicMesh_syncVertexBuffer;
      o.mergeRenderable   = FE3rDynamicMesh_mergeRenderable;
      o.mergeVertexBuffer = FE3rDynamicMesh_mergeVertexBuffer;
      o.mergeIndexBuffer  = FE3rDynamicMesh_mergeIndexBuffer;
      o.build             = FE3rDynamicMesh_build;
      return o;
   }
   MO.FE3rDynamicMesh_construct = function FE3rDynamicMesh_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._mergeRenderables = new TObjects();
   }
   MO.FE3rDynamicMesh_mergeCount = function FE3rDynamicMesh_mergeCount(){
      return this._mergeRenderables.count();
   }
   MO.FE3rDynamicMesh_mergeMaxCount = function FE3rDynamicMesh_mergeMaxCount(){
      return this._model._mergeMaxCount;
   }
   MO.FE3rDynamicMesh_mergeRenderables = function FE3rDynamicMesh_mergeRenderables(){
      return this._mergeRenderables;
   }
   MO.FE3rDynamicMesh_syncVertexBuffer = function FE3rDynamicMesh_syncVertexBuffer(renderableBuffer){
      var o = this;
      var resource = renderableBuffer._resource;
      var code = resource.code();
      var buffer = o._vertexBuffers.get(code);
      if(!buffer){
         var formatCd = renderableBuffer.formatCd();
         var vertexTotal = o._vertexTotal;
         buffer = o._graphicContext.createVertexBuffer();
         buffer.setCode(code);
         buffer.setFormatCd(formatCd);
         buffer.setStride(renderableBuffer.stride());
         switch(formatCd){
            case EG3dAttributeFormat.Float1:
               buffer._data = new Float32Array(1 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float2:
               buffer._data = new Float32Array(2 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float3:
               buffer._data = new Float32Array(3 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float4:
               buffer._data = new Float32Array(4 * vertexTotal);
               break;
            case EG3dAttributeFormat.Byte4:
            case EG3dAttributeFormat.Byte4Normal:
               buffer._data = new Uint8Array(4 * vertexTotal);
               break;
            default:
               throw new TError("Unknown code");
         }
         o._vertexBuffers.set(code, buffer);
      }
      return buffer;
   }
   MO.FE3rDynamicMesh_mergeRenderable = function FE3rDynamicMesh_mergeRenderable(renderable){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var vertexCount = renderable.vertexCount();
      var indexBuffer = renderable.indexBuffers().first();
      var indexCount = indexBuffer.count();
      var mc = capability.mergeCount;
      if(o._mergeRenderables.count() >= mc){
         return false;
      }
      var vt = o._vertexTotal + vertexCount;
      if(capability.optionIndex32){
         if(vt > RInteger.MAX_UINT32){
            return false;
         }
      }else{
         if(vt > RInteger.MAX_UINT16){
            return false;
         }
      }
      o._vertexTotal += vertexCount;
      o._indexTotal += indexCount;
      o._mergeRenderables.push(renderable);
      return true;
   }
   MO.FE3rDynamicMesh_mergeVertexBuffer = function FE3rDynamicMesh_mergeVertexBuffer(renderable, code, vertexBuffer, resource){
      var o = this;
      var position = o._vertexPosition;
      var data = vertexBuffer._data;
      var dataCount = resource._dataCount;
      switch(code){
         case 'position':
            var d = new Float32Array(resource._data);
            RFloat.copy(data, 3 * position, d, 0, 3 * dataCount);
            break;
         case 'coord':
            var d = new Float32Array(resource._data);
            RFloat.copy(data, 2 * position, d, 0, 2 * dataCount);
            break;
         case 'color':
         case "normal":
         case "binormal":
         case "tangent":
         case "bone_index":
         case "bone_weight":
            var d = new Uint8Array(resource._data);
            RByte.copy(data, 4 * position, d, 0, 4 * dataCount);
            break;
         default:
            throw new TError("Unknown code");
      }
   }
   MO.FE3rDynamicMesh_mergeIndexBuffer = function FE3rDynamicMesh_mergeIndexBuffer(resource){
      var o = this;
      var vp = o._vertexPosition;
      var ip = o._indexPosition;
      var id = o._indexBuffer._data;
      var rd = new Uint16Array(resource._data);
      var rc = 3 * resource._dataCount;
      for(var i = 0; i < rc; i++){
         id[ip++] = vp + rd[i]
      }
   }
   MO.FE3rDynamicMesh_build = function FE3rDynamicMesh_build(){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var vertexTotal = o._vertexTotal;
      var indexTotal = o._indexTotal;
      var rs = o._mergeRenderables;
      var rc = rs.count();
      var rf = rs.first();
      o._material = rf.material();
      o._textures = rf.textures();
      var instanceVertexBuffer = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
      instanceVertexBuffer.setCode('instance');
      instanceVertexBuffer.setStride(4);
      instanceVertexBuffer.setFormatCd(EG3dAttributeFormat.Float1);
      var vdi = instanceVertexBuffer._data = new Float32Array(vertexTotal);
      o._vertexBuffers.set(instanceVertexBuffer.code(), instanceVertexBuffer);
      var indexBuffer = o._indexBuffer = context.createIndexBuffer(FE3rIndexBuffer);
      if(capability.optionIndex32){
         indexBuffer.setStrideCd(EG3dIndexStride.Uint32);
         indexBuffer._data = new Uint32Array(indexTotal);
      }else{
         indexBuffer.setSstrideCd(EG3dIndexStride.Uint16);
         indexBuffer._data = new Uint16Array(indexTotal);
      }
      indexBuffer._count = indexTotal;
      o.pushIndexBuffer(indexBuffer);
      for(var i = 0; i < rc; i++){
         var renderable = rs.getAt(i);
         var vc = renderable.vertexCount();
         var vertexBuffers = renderable.vertexBuffers();
         var vertexBufferCount = vertexBuffers.count();
         for(var vbi = 0; vbi < vertexBufferCount; vbi++){
            var vb = vertexBuffers.at(vbi);
            var vertexBufferResource = vb._resource;
            var vbrc = vertexBufferResource.code();
            var vertexBuffer = o.syncVertexBuffer(vb);
            o.mergeVertexBuffer(renderable, vbrc, vertexBuffer, vertexBufferResource);
         }
         RFloat.fill(vdi, o._vertexPosition, vc, i);
         var indexBuffer = renderable.indexBuffers().first();
         var ic = indexBuffer.count();
         var indexBufferResource = indexBuffer._resource;
         o.mergeIndexBuffer(indexBufferResource);
         o._vertexPosition += vc;
         o._indexPosition += ic;
      }
      var vertexBuffers = o._vertexBuffers;
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         vertexBuffer.upload(vertexBuffer._data, vertexBuffer.stride(), vertexTotal);
         vertexBuffer._data = null;
      }
      o._indexBuffer.upload(o._indexBuffer._data, indexTotal);
      o._indexBuffer._data = null;
   }
}
with(MO){
   MO.FE3rDynamicModel = function FE3rDynamicModel(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._renderables      = null;
      o._mergeMaxCount    = 0;
      o._meshes           = null;
      o._updateDate       = 0;
      o.construct         = FE3rDynamicModel_construct;
      o.createMesh        = FE3rDynamicModel_createMesh;
      o.renderables       = FE3rDynamicModel_renderables;
      o.meshes            = FE3rDynamicModel_meshes;
      o.pushRenderable    = FE3rDynamicModel_pushRenderable;
      o.build             = FE3rDynamicModel_build;
      o.update            = FE3rDynamicModel_update;
      return o;
   }
   MO.FE3rDynamicModel_construct = function FE3rDynamicModel_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
      o._renderables = new TObjects();
      o._meshes = new TObjects();
   }
   MO.FE3rDynamicModel_createMesh = function FE3rDynamicModel_createMesh(){
      var o = this;
      var m = RClass.create(FE3rDynamicMesh);
      m._model = o;
      m.linkGraphicContext(o);
      o._meshes.push(m);
      return m;
   }
   MO.FE3rDynamicModel_renderables = function FE3rDynamicModel_renderables(){
      return this._renderables;
   }
   MO.FE3rDynamicModel_meshes = function FE3rDynamicModel_meshes(){
      return this._meshes;
   }
   MO.FE3rDynamicModel_pushRenderable = function FE3rDynamicModel_pushRenderable(p){
      this._renderables.push(p);
   }
   MO.FE3rDynamicModel_build = function FE3rDynamicModel_build(){
      var o = this;
      var renderables = o._renderables;
      var meshes = o._meshes;
      var count = renderables.count();
      if(count > 0){
         var mesh = o.createMesh();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            if(!mesh.mergeRenderable(renderable)){
               mesh = o.createMesh();
               if(!mesh.mergeRenderable(renderable)){
                  throw new TError(o, 'Merge renderable failure.');
               }
            }
         }
      }
      var mergeMax = 0;
      var count = meshes.count();
      for(var i = 0; i < count; i++){
         var mesh = meshes.at(i);
         mesh.build();
         mergeMax = Math.max(mergeMax, mesh.mergeCount());
      }
      o._mergeMaxCount = mergeMax;
   }
   MO.FE3rDynamicModel_update = function FE3rDynamicModel_update(p){
      var o = this;
      o._updateDate = RTimer.current();
   }
}
with(MO){
   MO.FE3rGeometry = function FE3rGeometry(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._ready            = false;
      o._resource         = null;
      o._vertexCount      = 0;
      o._vertexBuffers    = null;
      o._indexBuffer      = null;
      o._indexBuffers     = null;
      o._resourceMaterial = null;
      o._material         = null;
      o._textures         = null;
      o.construct         = FE3rGeometry_construct;
      o.testReady         = FE3rGeometry_testReady;
      o.resource          = FE3rGeometry_resource;
      o.setResource       = FE3rGeometry_setResource;
      o.vertexCount       = FE3rGeometry_vertexCount;
      o.findVertexBuffer  = FE3rGeometry_findVertexBuffer;
      o.vertexBuffers     = FE3rGeometry_vertexBuffers;
      o.indexBuffer       = FE3rGeometry_indexBuffer;
      o.indexBuffers      = FE3rGeometry_indexBuffers;
      o.material          = FE3rGeometry_material;
      o.findTexture       = FE3rGeometry_findTexture;
      o.textures          = FE3rGeometry_textures;
      o.resource          = FE3rGeometry_resource;
      o.loadResource      = FE3rGeometry_loadResource;
      o.processLoad       = FE3rGeometry_processLoad;
      return o;
   }
   MO.FE3rGeometry_construct = function FE3rGeometry_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
      o._vertexBuffers = new TDictionary();
      o._indexBuffers = new TObjects();
   }
   MO.FE3rGeometry_testReady = function FE3rGeometry_testReady(){
      var o = this;
      if(!o._ready){
         if(!o._resource.testReady()){
            return false;
         }
         var ts = o._textures;
         if(ts != null){
            var c = ts.count();
            for(var i = 0; i < c; i++){
               var t = ts.value(i);
               if(!t.testReady()){
                  return false;
               }
            }
         }
      }
      return o._ready;
   }
   MO.FE3rGeometry_guid = function FE3rGeometry_guid(){
      return this._resource.guid();
   }
   MO.FE3rGeometry_resource = function FE3rGeometry_resource(){
      return this._resource;
   }
   MO.FE3rGeometry_setResource = function FE3rGeometry_setResource(p){
      this._resource = p;
   }
   MO.FE3rGeometry_vertexCount = function FE3rGeometry_vertexCount(){
      return this._vertexCount;
   }
   MO.FE3rGeometry_findVertexBuffer = function FE3rGeometry_findVertexBuffer(code){
      return this._vertexBuffers.get(code);
   }
   MO.FE3rGeometry_vertexBuffers = function FE3rGeometry_vertexBuffers(){
      return this._vertexBuffers;
   }
   MO.FE3rGeometry_indexBuffer = function FE3rGeometry_indexBuffer(){
      return this._indexBuffer;
   }
   MO.FE3rGeometry_indexBuffers = function FE3rGeometry_indexBuffers(){
      return this._indexBuffers;
   }
   MO.FE3rGeometry_material = function FE3rGeometry_material(){
      return this._material;
   }
   MO.FE3rGeometry_findTexture = function FE3rGeometry_findTexture(p){
      return this._textures.get(p);
   }
   MO.FE3rGeometry_textures = function FE3rGeometry_textures(){
      return this._textures;
   }
   MO.FE3rGeometry_resource = function FE3rGeometry_resource(){
      return this._resource;
   }
   MO.FE3rGeometry_loadResource = function FE3rGeometry_loadResource(resource){
      var o = this;
      var context = o._graphicContext;
      o._resource = resource;
      var streamResources = resource.streams();
      var streamCount = streamResources.count();
      for(var i = 0; i < streamCount; i++){
         var streamResource = streamResources.at(i);
         var code = streamResource.code();
         var dataCount = streamResource.dataCount();
         var data = streamResource.data();
         if((code == 'index16') || (code == 'index32')){
            var buffer = o._indexBuffer = context.createIndexBuffer(FE3rIndexBuffer);
            buffer._resource = streamResource;
            var dataCd = streamResource.elementDataCd();
            if(dataCd == EDataType.Uint16){
               buffer.setStrideCd(EG3dIndexStride.Uint16);
            }else if(dataCd == EDataType.Uint32){
               buffer.setStrideCd(EG3dIndexStride.Uint32);
            }else{
               throw new TError(o, "Unknown data type.");
            }
            buffer.upload(data, 3 * dataCount);
            o._indexBuffers.push(buffer);
         }else{
            var buffer = context.createVertexBuffer(FE3rVertexBuffer);
            buffer.setCode(code);
            buffer._resource = streamResource;
            buffer._vertexCount = dataCount;
            var pixels = null;
            switch(code){
               case "position":
                  pixels = new Float32Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Float3);
                  o._vertexCount = dataCount;
                  break;
               case "coord":
                  pixels = new Float32Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Float2);
                  break;
               case "color":
                  pixels = new Uint8Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
                  break;
               case "normal":
               case "binormal":
               case "tangent":
                  pixels = new Uint8Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
                  break;
               default:
                  throw new TError(o, "Unknown code");
            }
            buffer.upload(pixels, streamResource._dataStride, dataCount);
            o._vertexBuffers.set(code, buffer);
         }
      }
      o._ready = true;
   }
   MO.FE3rGeometry_processLoad = function FE3rGeometry_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      return true;
   }
}
with(MO){
   MO.FE3rIndexBuffer = function FE3rIndexBuffer(o){
      o = RClass.inherits(this, o, FWglIndexBuffer, MLinkerResource);
      o.dispose = FE3rIndexBuffer_dispose;
      return o;
   }
   MO.FE3rIndexBuffer_dispose = function FE3rIndexBuffer_dispose(){
      var o = this;
      o.__base.MLinkerResource.dispose.call(o);
      o.__base.FWglIndexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FE3rInstanceMesh = function FE3rInstanceMesh(o){
      o = RClass.inherits(this, o, FE3rMesh);
      o._merges         = null;
      o.construct       = FE3rInstanceMesh_construct;
      o.mergeRenderable = FE3rInstanceMesh_mergeRenderable;
      o.build           = FE3rInstanceMesh_build;
      return o;
   }
   MO.FE3rInstanceMesh_construct = function FE3rInstanceMesh_construct(){
      var o = this;
      o.__base.FE3rMesh.construct.call(o);
      o._merges = new TObjects();
   }
   MO.FE3rInstanceMesh_mergeRenderable = function FE3rInstanceMesh_mergeRenderable(p){
      this._merges.push(p);
   }
   MO.FE3rInstanceMesh_build = function FE3rInstanceMesh_build(){
   }
}
with(MO){
   MO.FE3rMaterial = function FE3rMaterial(o){
      o = RClass.inherits(this, o, FG3dMaterial, MGraphicObject, MLinkerResource);
      o._ready         = false;
      o._visible       = RClass.register(o, new AGetSet('_visible'), true);
      o._guid          = RClass.register(o, new AGetSet('_guid'));
      o._bitmaps       = RClass.register(o, new AGetter('_bitmaps'));
      o._reference     = RClass.register(o, new AGetter('_reference'));
      o.findBitmap     = FE3rMaterial_findBitmap;
      o.testReady      = FE3rMaterial_testReady;
      o.testVisible    = FE3rMaterial_testVisible;
      o.loadResource   = FE3rMaterial_loadResource;
      o.reloadResource = FE3rMaterial_reloadResource;
      o.load           = FE3rMaterial_load;
      return o;
   }
   MO.FE3rMaterial_findBitmap = function FE3rMaterial_findBitmap(code){
      return this._bitmaps.get(code);
   }
   MO.FE3rMaterial_testReady = function FE3rMaterial_testReady(){
      var o = this;
      if(!o._ready){
         var bitmaps = o._bitmaps;
         if(bitmaps){
            var count = bitmaps.count();
            for(var i = 0; i < count; i++){
               var bitmap = bitmaps.at(i);
               if(!bitmap.testReady()){
                  return false;
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FE3rMaterial_testVisible = function FE3rMaterial_testVisible(){
      var o = this;
      var visible = o._visible;
      if(visible && o._reference){
         visible = o._reference.testVisible();
      }
      return visible;
   }
   MO.FE3rMaterial_loadResource = function FE3rMaterial_loadResource(resource){
      var o = this;
      o._guid = resource.guid();
      o._resource = resource;
      o._info.calculate(resource.info());
      o._dirty = true;
   }
   MO.FE3rMaterial_reloadResource = function FE3rMaterial_reloadResource(){
      var o = this;
      o._info.calculate(o._resource.info());
      o._dirty = true;
   }
   MO.FE3rMaterial_load= function FE3rMaterial_load(){
      var o = this;
      var resource = o._resource;
      var bitmapResources = resource.bitmaps();
      if(bitmapResources){
         var bitmapConsole = RConsole.find(FE3rBitmapConsole)
         var bitmaps = o._bitmaps = new TDictionary();
         var count = bitmapResources.count();
         for(var i = 0; i < count; i++){
            var bitmapResource = bitmapResources.at(i);
            var bitmapCode = bitmapResource.code();
            var bitmapPackResource = bitmapResource.bitmapPack();
            var packCode = bitmapPackResource.code();
            var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
            var bitmap = RClass.create(FE3rBitmap);
            bitmap._pack  = bitmapPack;
            bitmap.loadResource(bitmapResource);
            bitmaps.set(bitmapCode, bitmap);
         }
      }
   }
}
with(MO){
   MO.FE3rMaterialConsole = function FE3rMaterialConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._materials = null;
      o.construct  = FE3rMaterialConsole_construct;
      o.load       = FE3rMaterialConsole_load;
      return o;
   }
   MO.FE3rMaterialConsole_construct = function FE3rMaterialConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._materials = new TDictionary();
   }
   MO.FE3rMaterialConsole_load = function FE3rMaterialConsole_load(context, guid){
      var o = this;
      if(!context){
         throw new TError('Graphics context is empty');
      }
      if(!guid){
         throw new TError('Material guid is empty');
      }
      var material = o._materials.get(guid);
      if(material){
         return material;
      }
      var resource = RConsole.find(FE3sMaterialConsole).find(guid);
      material = RClass.create(FE3rMaterial);
      material.linkGraphicContext(context);
      material.loadResource(resource);
      material.load();
      o._materials.set(guid, material);
      return material;
   }
}
with(MO){
   MO.FE3rMesh = function FE3rMesh(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._ready            = false;
      o._resource         = null;
      o._vertexCount      = 0;
      o._vertexBuffers    = null;
      o._indexBuffer      = null;
      o._resourceMaterial = null;
      o._material         = null;
      o._textures         = null;
      o.construct         = FE3rMesh_construct;
      o.testReady         = FE3rMesh_testReady;
      o.resource          = FE3rMesh_resource;
      o.setResource       = FE3rMesh_setResource;
      o.vertexCount       = FE3rMesh_vertexCount;
      o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
      o.vertexBuffers     = FE3rMesh_vertexBuffers;
      o.indexBuffer       = FE3rMesh_indexBuffer;
      o.material          = FE3rMesh_material;
      o.findTexture       = FE3rMesh_findTexture;
      o.textures          = FE3rMesh_textures;
      o.resource          = FE3rMesh_resource;
      o.loadResource      = FE3rMesh_loadResource;
      o.processLoad       = FE3rMesh_processLoad;
      return o;
   }
   MO.FE3rMesh_construct = function FE3rMesh_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
      o._vertexBuffers = new TObjects();
   }
   MO.FE3rMesh_testReady = function FE3rMesh_testReady(){
      var o = this;
      if(!o._ready){
         if(!o._resource.testReady()){
            return false;
         }
         var ts = o._textures;
         if(ts != null){
            var c = ts.count();
            for(var i = 0; i < c; i++){
               var t = ts.value(i);
               if(!t.testReady()){
                  return false;
               }
            }
         }
      }
      return o._ready;
   }
   MO.FE3rMesh_guid = function FE3rMesh_guid(){
      return this._resource.guid();
   }
   MO.FE3rMesh_resource = function FE3rMesh_resource(){
      return this._resource;
   }
   MO.FE3rMesh_setResource = function FE3rMesh_setResource(p){
      this._resource = p;
   }
   MO.FE3rMesh_vertexCount = function FE3rMesh_vertexCount(){
      return this._vertexCount;
   }
   MO.FE3rMesh_findVertexBuffer = function FE3rMesh_findVertexBuffer(p){
      var o = this;
      var vs = o._vertexBuffers;
      var c = vs.count();
      for(var n = 0; n < c; n++){
         var v = vs.get(n);
         if(v.name() == p){
            return v;
         }
      }
      return null;
   }
   MO.FE3rMesh_vertexBuffers = function FE3rMesh_vertexBuffers(){
      return this._vertexBuffers;
   }
   MO.FE3rMesh_indexBuffer = function FE3rMesh_indexBuffer(){
      return this._indexBuffer;
   }
   MO.FE3rMesh_material = function FE3rMesh_material(){
      return this._material;
   }
   MO.FE3rMesh_findTexture = function FE3rMesh_findTexture(p){
      return this._textures.get(p);
   }
   MO.FE3rMesh_textures = function FE3rMesh_textures(){
      return this._textures;
   }
   MO.FE3rMesh_resource = function FE3rMesh_resource(){
      return this._resource;
   }
   MO.FE3rMesh_loadResource = function FE3rMesh_loadResource(resource){
      var o = this;
      var context = o._graphicContext;
      o._resource = resource;
      var streamResources = resource.streams();
      var streamCount = streamResources.count();
      for(var i = 0; i < streamCount; i++){
         var streamResource = streamResources.get(i);
         var code = streamResource._code;
         var dataCount = streamResource._dataCount;
         var data = streamResource._data;
         if((code == 'index16') || (code == 'index32')){
            var buffer = o._indexBuffer = context.createIndexBuffer();
            buffer._resource = streamResource;
            var dataCd = streamResource.elementDataCd();
            if(dataCd == EDataType.Uint16){
               buffer._strideCd = EG3dIndexStride.Uint16;
            }else if(dataCd == EDataType.Uint32){
               buffer._strideCd = EG3dIndexStride.Uint32;
            }else{
               throw new TError(o, "Unknown data type.");
            }
            buffer.upload(data, 3 * dataCount);
         }else{
            var buffer = context.createVertexBuffer();
            buffer._name = code;
            buffer._resource = streamResource;
            buffer._vertexCount = dataCount;
            var pixels = null;
            switch(code){
               case "position":
                  pixels = new Float32Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Float3;
                  break;
               case "coord":
                  pixels = new Float32Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Float2;
                  break;
               case "color":
                  pixels = new Uint8Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
                  break;
               case "normal":
               case "binormal":
               case "tangent":
                  pixels = new Uint8Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
                  break;
               default:
                  throw new TError(o, "Unknown code");
            }
            buffer.upload(pixels, streamResource._dataStride, dataCount);
            o._vertexBuffers.push(buffer);
         }
      }
      o._ready = true;
   }
   MO.FE3rMesh_processLoad = function FE3rMesh_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      return true;
   }
}
with(MO){
   MO.FE3rMeshAnimation = function FE3rMeshAnimation(o){
      o = RClass.inherits(this, o, FE3rAnimation);
      o.process = FE3rMeshAnimation_process;
      return o;
   }
   MO.FE3rMeshAnimation_process = function FE3rMeshAnimation_process(track){
      var o = this;
      if(!o._valid){
         return;
      }
      var tick = Math.abs(o._currentTick);
      var resource = track._resource;
      var playInfo = o._playInfo;
      resource.calculate(playInfo, tick);
      playInfo.update();
      var matrix = track._matrix;
      matrix.assign(resource.matrixInvert());
      matrix.append(playInfo.matrix);
   }
}
with(MO){
   MO.FE3rMeshConsole = function FE3rMeshConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._loadMeshs = null;
      o._meshs     = null;
      o._thread    = null;
      o._interval  = 200;
      o.onProcess  = FE3rMeshConsole_onProcess;
      o.construct  = FE3rMeshConsole_construct;
      o.findMesh   = FE3rMeshConsole_findMesh;
      o.meshs      = FE3rMeshConsole_meshs;
      o.loadByGuid = FE3rMeshConsole_loadByGuid;
      o.loadByCode = FE3rMeshConsole_loadByCode;
      return o;
   }
   MO.FE3rMeshConsole_onProcess = function FE3rMeshConsole_onProcess(){
      var o = this;
      var s = o._loadMeshs;
      s.record();
      while(s.next()){
         var m = s.current();
         if(m.processLoad()){
            s.removeCurrent();
         }
      }
   }
   MO.FE3rMeshConsole_construct = function FE3rMeshConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._loadMeshs = new TLooper();
      o._meshs = new TDictionary();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3rMeshConsole_findMesh = function FE3rMeshConsole_findMesh(p){
      return this._meshs.get(p);
   }
   MO.FE3rMeshConsole_meshs = function FE3rMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3rMeshConsole_loadByGuid = function FE3rMeshConsole_loadByGuid(pc, pg){
      var o = this;
      if(!RClass.isClass(pc, MGraphicObject)){
         throw new TError('Graphics context is empty');
      }
      if(RString.isEmpty(pg)){
         throw new TError('Mesh guid is empty');
      }
      var m = o._meshs.get(pg);
      if(m){
         return m;
      }
      var rmc = RConsole.find(FE3sMeshConsole);
      var rm = rmc.loadByGuid(pg);
      m = RClass.create(FE3rMesh);
      m.linkGraphicContext(pc);
      m.setCode(pg);
      m.setResource(rm);
      o._meshs.set(pg, m);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadMeshs.push(m);
      }
      return m;
   }
   MO.FE3rMeshConsole_loadByCode = function FE3rMeshConsole_loadByCode(pc, pg){
      var o = this;
      if(!RClass.isClass(pc, MGraphicObject)){
         throw new TError('Graphics context is empty');
      }
      if(RString.isEmpty(pg)){
         throw new TError('Mesh code is empty');
      }
      var m = o._meshs.get(pg);
      if(m){
         return m;
      }
      var rmc = RConsole.find(FE3sMeshConsole);
      var rm = rmc.loadByCode(pg);
      m = RClass.create(FE3rMesh);
      m.linkGraphicContext(pc);
      m.setCode(pg);
      m.setResource(rm);
      o._meshs.set(pg, m);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadMeshs.push(m);
      }
      return m;
   }
}
with(MO){
   MO.FE3rModel = function FE3rModel(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._resource            = null;
      o._meshes              = null;
      o._skeletons           = null;
      o._dataReady           = false;
      o.findMeshByGuid       = FE3rModel_findMeshByGuid;
      o.geometrys            = FE3rModel_geometrys;
      o.resource             = FE3rModel_resource;
      o.setResource          = FE3rModel_setResource;
      o.testReady            = FE3rModel_testReady;
      o.loadResource         = FE3rModel_loadResource;
      o.loadSkeletonResource = FE3rModel_loadSkeletonResource;
      o.processLoad          = FE3rModel_processLoad;
      o.dispose              = FE3rModel_dispose;
      return o;
   }
   MO.FE3rModel_findMeshByGuid = function FE3rModel_findMeshByGuid(p){
      var o = this;
      var s = o._meshes;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.get(i);
         if(m._guid == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3rModel_geometrys = function FE3rModel_geometrys(){
      return this._meshes;
   }
   MO.FE3rModel_resource = function FE3rModel_resource(){
      return this._resource;
   }
   MO.FE3rModel_setResource = function FE3rModel_setResource(p){
      this._resource = p;
   }
   MO.FE3rModel_testReady = function FE3rModel_testReady(){
      return this._dataReady;
   }
   MO.FE3rModel_loadSkeletonResource = function FE3rModel_loadSkeletonResource(resource){
      var o = this;
      var modelConsole = RConsole.find(FE3rModelConsole);
      var skinResources = resource.skins();
      if(skinResources){
         var skinCount = skinResources.count();
         for(var i = 0; i < skinCount; i++){
            var skinResource = skinResources.at(i);
            var skin = RClass.create(FE3rSkin);
            skin.linkGraphicContext(o);
            skin.loadResource(skinResource)
            var meshGuid = skinResource.meshGuid();
            var mesh = modelConsole.findMesh(meshGuid);
            mesh.pushSkin(skin);
         }
      }
   }
   MO.FE3rModel_loadResource = function FE3rModel_loadResource(resource){
      var o = this;
      var modelConsole = RConsole.find(FE3rModelConsole);
      var meshResources = resource.meshes();
      if(meshResources){
         var meshes = o._meshes = new TObjects();
         var meshCount = meshResources.count();
         for(var i = 0; i < meshCount; i++){
            var meshResource = meshResources.valueAt(i);
            var mesh = RClass.create(FE3rModelMesh);
            mesh.linkGraphicContext(o);
            mesh.loadResource(meshResource);
            meshes.push(mesh);
            modelConsole.meshs().set(mesh.guid(), mesh);
         }
      }
      var skeletonResources = resource.skeletons();
      if(skeletonResources){
         var skeletonCount = skeletonResources.count();
         for(var i = 0; i < skeletonCount; i++){
            var skeletonResource = skeletonResources.get(i);
            o.loadSkeletonResource(skeletonResource);
         }
      }
      o._dataReady = true;
   }
   MO.FE3rModel_processLoad = function FE3rModel_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      return true;
   }
   MO.FE3rModel_dispose = function FE3rModel_dispose(){
      var o = this;
      o._ready = false;
      o._resource = null;
      o._meshes = RObject.dispose(o._meshes);
      o._skeletons = RObject.dispose(o._skeletons);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rModelConsole = function FE3rModelConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._loadModels    = null;
      o._models        = RClass.register(o, new AGetter('_models'));
      o._meshs         = RClass.register(o, new AGetter('_meshs'));
      o._dynamicMeshs  = null;
      o._thread        = null;
      o._interval      = 200;
      o.onProcess      = FE3rModelConsole_onProcess;
      o.construct      = FE3rModelConsole_construct;
      o.findModel      = FE3rModelConsole_findModel;
      o.findMesh       = FE3rModelConsole_findMesh;
      o.load           = FE3rModelConsole_load;
      o.loadMeshByGuid = FE3rModelConsole_loadMeshByGuid;
      o.loadMeshByCode = FE3rModelConsole_loadMeshByCode;
      o.merge          = FE3rModelConsole_merge;
      return o;
   }
   MO.FE3rModelConsole_onProcess = function FE3rModelConsole_onProcess(){
      var o = this;
      var s = o._loadModels;
      s.record();
      while(s.next()){
         var m = s.current();
         if(m.processLoad()){
            s.removeCurrent();
         }
      }
   }
   MO.FE3rModelConsole_construct = function FE3rModelConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._loadModels = new TLooper();
      o._models = new TDictionary();
      o._meshs = new TDictionary();
      o._dynamicMeshs = new TDictionary();
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3rModelConsole_findModel = function FE3rModelConsole_findModel(guid){
      return this._models.get(guid);
   }
   MO.FE3rModelConsole_findMesh = function FE3rModelConsole_findMesh(guid){
      return this._meshs.get(guid);
   }
   MO.FE3rModelConsole_load = function FE3rModelConsole_load(context, guid){
      var o = this;
      if(!context){
         throw new TError('Graphics context is empty');
      }
      if(!guid){
         throw new TError('Model guid is empty');
      }
      var model = o._models.get(guid);
      if(model){
         return model;
      }
      var resource = RConsole.find(FE3sModelConsole).load(guid);
      model = RClass.create(FE3rModel);
      model.linkGraphicContext(context);
      model.setCode(guid);
      model.setResource(resource);
      o._models.set(guid, model);
      o._loadModels.push(model);
      return model;
   }
   MO.FE3rModelConsole_loadMeshByGuid = function FE3rModelConsole_loadMeshByGuid(context, pg){
      var o = this;
      if(!context){
         throw new TError('Graphics context is empty');
      }
      if(!guid){
         throw new TError('Model guid is empty');
      }
      var m = o._models.get(pg);
      if(m){
         return m;
      }
      var resource = RConsole.find(FE3sModelConsole).load(guid);
      m = RClass.create(FE3rModel);
      m.linkGraphicContext(pc);
      m.setCode(pg);
      m.setResource(rm);
      o._models.set(pg, m);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadModels.push(m);
      }
      return m;
   }
   MO.FE3rModelConsole_loadMeshByCode = function FE3rModelConsole_loadMeshByCode(context, pg){
      var o = this;
      if(!RClass.isClass(context, MGraphicObject)){
         throw new TError('Graphics context is empty');
      }
      if(RString.isEmpty(pg)){
         throw new TError('Model guid is empty');
      }
      var model = o._models.get(pg);
      if(model){
         return model;
      }
      var resource = RConsole.find(FE3sModelConsole).load(guid);
      model = RClass.create(FE3rModel);
      model.linkGraphicContext(pc);
      model.setCode(pg);
      model.setResource(resource);
      o._models.set(pg, model);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadModels.push(m);
      }
      return m;
   }
   MO.FE3rModelConsole_merge = function FE3rModelConsole_merge(effect, region, offset, count){
      var o = this;
      var flag = 'merge';
      var renderables = region.renderables();
      for(var i = 0; i < count; i++){
         var renderable = renderables.getAt(offset + i);
         flag += '|' + renderable.hashCode();
      }
      var model = o._dynamicMeshs.get(flag);
      if(!model){
         model = RClass.create(FE3rDynamicModel);
         model.linkGraphicContext(region);
         for(var i = 0; i < count; i++){
            var renderable = renderables.getAt(offset + i);
            model.pushRenderable(renderable);
         }
         model.build();
         o._dynamicMeshs.set(flag, model);
         MO.Logger.info(o, 'Create merge model. (mesh={1}, renderables={2})', model.meshes().count(), model.renderables().count());
      }
      model.update();
      return model;
   }
}
with(MO){
   MO.FE3rModelMesh = function FE3rModelMesh(o){
      o = RClass.inherits(this, o, FE3rGeometry);
      o._ready            = false;
      o._resourceMaterial = null;
      o._skins            = null;
      o._boneIds          = null;
      o.construct         = FE3rModelMesh_construct;
      o.testReady         = FE3rModelMesh_testReady;
      o.guid              = FE3rModelMesh_guid;
      o.skins             = FE3rModelMesh_skins;
      o.pushSkin          = FE3rModelMesh_pushSkin;
      o.boneIds           = FE3rModelMesh_boneIds;
      return o;
   }
   MO.FE3rModelMesh_construct = function FE3rModelMesh_construct(){
      var o = this;
      o.__base.FE3rGeometry.construct.call(o);
   }
   MO.FE3rModelMesh_testReady = function FE3rModelMesh_testReady(){
      var o = this;
      if(!o._ready){
         var textures = o._textures;
         if(textures){
            var count = textures.count();
            for(var i = 0; i < count; i++){
               var texture = textures.at(i);
               if(!texture.testReady()){
                  return false;
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FE3rModelMesh_guid = function FE3rModelMesh_guid(){
      return this._resource.guid();
   }
   MO.FE3rModelMesh_skins = function FE3rModelMesh_skins(){
      return this._skins;
   }
   MO.FE3rModelMesh_pushSkin = function FE3rModelMesh_pushSkin(skin){
      var o = this;
      var skins = o._skins;
      if(!skins){
         skins = o._skins = new TObjects();
      }
      skins.push(skin);
   }
   MO.FE3rModelMesh_boneIds = function FE3rModelMesh_boneIds(){
      return this._boneIds;
   }
}
with(MO){
   MO.FE3rObject = function FE3rObject(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._guid = RClass.register(o, new AGetSet('_guid'));
      o._code = RClass.register(o, new AGetSet('_code'));
      return o;
   }
}
with(MO){
   MO.FE3rPipeline = function FE3rPipeline(o){
      o = RClass.inherits(this, o, FObject);
      o._vertexBuffers = null;
      o._indexBuffer   = null;
      o.construct        = FE3rPipeline_construct;
      o.findVertexBuffer = FE3rPipeline_findVertexBuffer;
      o.loadResource     = FE3rPipeline_loadResource;
      return o;
   }
   MO.FE3rPipeline_construct = function FE3rPipeline_construct(){
      var o = this;
      o.__base.FRenderable.construct.call(o);
      o._vertexBuffers = new TObjects();
   }
   MO.FE3rPipeline_findVertexBuffer = function FE3rPipeline_findVertexBuffer(p){
      var o = this;
      var vs = o._vertexBuffers;
      var c = vs.count();
      for(var n = 0; n < c; n++){
         var v = vs.get(n);
         if(v.name() == p){
            return v;
         }
      }
      return null;
   }
   MO.FE3rPipeline_loadResource = function FE3rPipeline_loadResource(p){
      var o = this;
      var c = o._context;
      var rvs = p.vertexBuffers();
      var rvc = rvs.count();
      for(var n = 0; n < rvc; n++){
         var rv = rvs.get(n);
         var vb = context.createVertexBuffer();
         vb._name = rv.name();
         vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
         o._vertexBuffers.push(vb);
      }
      var rib = p.indexBuffer();
      var ib = o._indexBuffer = c.createIndexBuffer();
      ib.upload(rib.data(), rib.count());
   }
}
with(MO){
   MO.FE3rSkeleton = function FE3rSkeleton(o){
      o = RClass.inherits(this, o, FE3rObject, MLinkerResource);
      o._bones       = null;
      o._skins       = null;
      o.bones        = FE3rSkeleton_bones;
      o.skins        = FE3rSkeleton_skins;
      o.loadResource = FE3rSkeleton_loadResource;
      return o;
   }
   MO.FE3rSkeleton_bones = function FE3rSkeleton_bones(){
      return this._bones;
   }
   MO.FE3rSkeleton_skins = function FE3rSkeleton_skins(){
      return this._skins;
   }
   MO.FE3rSkeleton_loadResource = function FE3rSkeleton_loadResource(resource){
      var o = this;
      o._resource = resource;
      var boneResources = resource._bones;
      var count = boneResources.count();
      if(count > 0){
         var bones = o._bones = new TObjects();
         for(var i = 0; i < count; i++){
            var boneResource = boneResources.at(i);
            var bone = RClass.create(FE3rBone);
            bone.loadResource(boneResource);
            bones.push(bone);
         }
      }
   }
}
with(MO){
   MO.FE3rSkeletonAnimation = function FE3rSkeletonAnimation(o){
      o = RClass.inherits(this, o, FE3rAnimation);
      o.process = FE3rSkeletonAnimation_process;
      return o;
   }
   MO.FE3rSkeletonAnimation_process = function FE3rSkeletonAnimation_process(skeleton){
      var o = this;
      if(!o._valid){
         return;
      }
      var tick = Math.abs(o._currentTick);
      var bones = skeleton.bones();
      var count = bones.count();
      for(var i = 0; i < count; i++){
         var bone = bones.at(i);
         bone.update(o._playInfo, tick);
      }
   }
}
with(MO){
   MO.FE3rSkin = function FE3rSkin(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._resource    = null;
      o._streams     = null;
      o.resource     = FE3rSkin_resource;
      o.streams      = FE3rSkin_streams;
      o.loadResource = FE3rSkin_loadResource;
      return o;
   }
   MO.FE3rSkin_resource = function FE3rSkin_resource(){
      return this._resource;
   }
   MO.FE3rSkin_streams = function FE3rSkin_streams(){
      return this._streams;
   }
   MO.FE3rSkin_loadResource = function FE3rSkin_loadResource(resource){
      var o = this;
      o._resource = resource;
      var streamResources = resource.streams();
      if(streamResources){
         var count = streamResources.count();
         if(count > 0){
            var streams = o._streams = new TObjects();
            for(var i = 0; i < count; i++){
               var streamResource = streamResources.at(i);
               var stream = RClass.create(FE3rStream);
               stream.linkGraphicContext(o);
               stream.loadResource(streamResource);
               streams.push(stream);
            }
         }
      }
   }
}
with(MO){
   MO.FE3rStream = function FE3rStream(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._buffer      = null;
      o._resource    = null;
      o.resource     = FE3rStream_resource;
      o.buffer       = FE3rStream_buffer;
      o.loadResource = FE3rStream_loadResource;
      return o;
   }
   MO.FE3rStream_resource = function FE3rStream_resource(){
      return this._resource;
   }
   MO.FE3rStream_buffer = function FE3rStream_buffer(){
      return this._buffer;
   }
   MO.FE3rStream_loadResource = function FE3rStream_loadResource(resource){
      var o = this;
      var code = resource.code();
      var dataCount = resource._dataCount;
      o._resource = resource;
      o._vertexCount = dataCount;
      var buffer = o._buffer = o._graphicContext.createVertexBuffer(FE3rVertexBuffer);
      buffer.setCode(code);
      buffer.setResource(resource);
      switch(code){
         case "bone_index":
            buffer.setFormatCd(EG3dAttributeFormat.Byte4);
            break;
         case "bone_weight":
            buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
            break;
         default:
            throw new TError("Unknown code");
      }
      buffer.upload(resource._data, resource._dataStride, dataCount);
   }
}
with(MO){
   MO.FE3rTexture = function FE3rTexture(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._resource    = null;
      o._bitmaps     = null;
      o._bitmapPacks = null;
      o._ready       = false;
      o._dataReady   = false;
      o.construct    = FE3rTexture_construct;
      o.resource     = FE3rTexture_resource;
      o.setResource  = FE3rTexture_setResource;
      o.bitmaps      = FE3rTexture_bitmaps;
      o.testReady    = FE3rTexture_testReady;
      o.loadBitmap   = FE3rTexture_loadBitmap;
      o.loadResource = FE3rTexture_loadResource;
      o.load         = FE3rTexture_load;
      o.processLoad  = FE3rTexture_processLoad;
      o.dispose      = FE3rTexture_dispose;
      return o;
   }
   MO.FE3rTexture_construct = function FE3rTexture_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._bitmaps = new TDictionary();
   }
   MO.FE3rTexture_resource = function FE3rTexture_resource(){
      return this._resource;
   }
   MO.FE3rTexture_setResource = function FE3rTexture_setResource(p){
      this._resource = p;
   }
   MO.FE3rTexture_bitmaps = function FE3rTexture_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3rTexture_testReady = function FE3rTexture_testReady(){
      return this._ready;
   }
   MO.FE3rTexture_loadBitmap = function FE3rTexture_loadBitmap(p){
      var o = this;
      var s = o._bitmaps;
      var b = s.get(p);
      if(!b){
         b = RClass.create(FE3rTextureBitmap);
         s.set(p, b);
      }
      return b;
   }
   MO.FE3rTexture_loadResource = function FE3rTexture_loadResource(p){
      var o = this;
      var rbps = p.bitmapPacks();
      if(rbps){
         var bps = o._bitmapPacks = new TDictionary();
         var c = rbps.count();
         for(var i = 0; i < c; i++){
            var rbp = rbps.valueAt(i);
            var bp = null;
            if(rbp._typeName == 'flat'){
               bp = RClass.create(FE3rTextureBitmapFlatPack);
            }else if(rbp._typeName == 'cube'){
               bp = RClass.create(FE3rTextureBitmapCubePack);
            }else{
               throw new TError(o, 'Load resource failure.');
            }
            bp.linkGraphicContext(o);
            bp.loadResource(rbp);
            o._bitmapPacks.set(rbp.code(), bp);
         }
      }
      o._dataReady = true;
   }
   MO.FE3rTexture_load = function FE3rTexture_load(){
      var o = this;
      var r = o._resource;
      var rbs = r.bitmaps();
      for(var i = rbs.count() - 1; i >= 0; i--){
         var rb = rbs.valueAt(i);
         var b = o.loadBitmap(rb.guid());
         var bp = o._bitmapPacks.get(rb.packCode());
         if(!bp){
            throw new TError('Link pack is not eists.');
         }
         b.load(bp);
      }
      o._ready = true;
   }
   MO.FE3rTexture_processLoad = function FE3rTexture_processLoad(){
      var o = this;
      if(!o._dataReady){
         if(!o._resource.testReady()){
            return false;
         }
         o.loadResource(o._resource);
      }else{
         var s = o._bitmapPacks;
         for(var i = s.count() - 1; i >= 0; i--){
            var b = s.valueAt(i);
            if(!b.testReady()){
               return false;
            }
         }
         o.load();
      }
      return o._ready;
   }
   MO.FE3rTexture_dispose = function FE3rTexture_dispose(){
      var o = this;
      o._ready = false;
      o._resource = null;
      o._bitmaps = RObject.dispose(o._bitmaps);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmap = function FE3rTextureBitmap(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._ready      = false;
      o._bitmapPack = null;
      o.construct   = FE3rTextureBitmap_construct;
      o.texture     = FE3rTextureBitmap_texture;
      o.testReady   = FE3rTextureBitmap_testReady;
      o.load        = FE3rTextureBitmap_load;
      o.dispose     = FE3rTextureBitmap_dispose;
      return o;
   }
   MO.FE3rTextureBitmap_construct = function FE3rTextureBitmap_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FE3rTextureBitmap_texture = function FE3rTextureBitmap_texture(){
      return this._bitmapPack.texture();
   }
   MO.FE3rTextureBitmap_testReady = function FE3rTextureBitmap_testReady(){
      return this._ready;
   }
   MO.FE3rTextureBitmap_load = function FE3rTextureBitmap_load(p){
      var o = this;
      o._bitmapPack = p;
      o._ready = true;
   }
   MO.FE3rTextureBitmap_dispose = function FE3rTextureBitmap_dispose(){
      var o = this;
      o._context = null;
      o._ready = false;
      o._bitmapPack = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmapCubePack = function FE3rTextureBitmapCubePack(o){
      o = RClass.inherits(this, o, FE3rTextureBitmapPack);
      o._resource    = null;
      o._images      = null;
      o.onLoad       = FE3rTextureBitmapCubePack_onLoad;
      o.construct    = FE3rTextureBitmapCubePack_construct;
      o.loadResource = FE3rTextureBitmapCubePack_loadResource;
      o.dispose      = FE3rTextureBitmapCubePack_dispose;
      return o;
   }
   MO.FE3rTextureBitmapCubePack_onLoad = function FE3rTextureBitmapCubePack_onLoad(p){
      var o = this;
      var c = o._graphicContext;
      var is = o._images;
      var capability = RBrowser.capability();
      for(var i = 0; i < 6; i++){
         if(!is[i].testReady()){
            return;
         }
      }
      var t = o._texture = c.createCubeTexture();
      t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
      if(capability.blobCreate){
         for(var i = 0; i < 6; i++){
            var m = is[i];
            window.URL.revokeObjectURL(m.url());
            is[i] = RObject.dispose(m);
         }
      }
      o._images = RObject.dispose(o._images);
      o._dataReady = true;
   }
   MO.FE3rTextureBitmapCubePack_construct = function FE3rTextureBitmapCubePack_construct(){
      var o = this;
      o.__base.FE3rTextureBitmapPack.construct.call(o);
   }
   MO.FE3rTextureBitmapCubePack_loadResource = function FE3rTextureBitmapCubePack_loadResource(p){
      var o = this;
      o._resource = p;
      var texture = p._texture;
      var capability = RBrowser.capability();
      var d = p.data();
      var t = p._formatName;
      o._images = new TObjects();
      for(var i = 0; i < 6; i++){
         var g = o._images[i] = RClass.create(FImage);
         g._index = i;
         g.setOptionAlpha(false);
         if(capability.blobCreate){
            var blob = new Blob([d[i]], {'type' : 'image/' + t});
            var url = window.URL.createObjectURL(blob);
            g.loadUrl(url);
         }else{
            var url = RBrowser.hostPath('/cloud.content.texture.bitmap.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
            g.loadUrl(url);
         }
         g.addLoadListener(o, o.onLoad);
      }
   }
   MO.FE3rTextureBitmapCubePack_dispose = function FE3rTextureBitmapCubePack_dispose(){
      var o = this;
      o._images = RObject.dispose(o._images);
      o.__base.FE3rTextureBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmapFlatPack = function FE3rTextureBitmapFlatPack(o){
      o = RClass.inherits(this, o, FE3rTextureBitmapPack);
      o._resource    = null;
      o._image       = null;
      o.onLoad       = FE3rTextureBitmapFlatPack_onLoad;
      o.construct    = FE3rTextureBitmapFlatPack_construct;
      o.loadResource = FE3rTextureBitmapFlatPack_loadResource;
      o.dispose      = FE3rTextureBitmapFlatPack_dispose;
      return o;
   }
   MO.FE3rTextureBitmapFlatPack_onLoad = function FE3rTextureBitmapFlatPack_onLoad(p){
      var o = this;
      var c = o._graphicContext;
      var t = o._texture = c.createFlatTexture();
      t.upload(o._image);
      t.makeMipmap();
      o._image = RObject.dispose(o._image);
      o._dataReady = true;
   }
   MO.FE3rTextureBitmapFlatPack_construct = function FE3rTextureBitmapFlatPack_construct(){
      var o = this;
      o.__base.FE3rTextureBitmapPack.construct.call(o);
   }
   MO.FE3rTextureBitmapFlatPack_loadResource = function FE3rTextureBitmapFlatPack_loadResource(p){
      var o = this;
      o._resource = p;
      var rt = p._texture;
      var c = p.code();
      var g = o._image = RConsole.find(FE3sTextureConsole).loadBitmap(rt._guid, c, p._formatName);
      g.addLoadListener(o, o.onLoad);
   }
   MO.FE3rTextureBitmapFlatPack_dispose = function FE3rTextureBitmapFlatPack_dispose(){
      var o = this;
      o._image = RObject.dispose(o._image);
      o.__base.FE3rTextureBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmapPack = function FE3rTextureBitmapPack(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._resource    = null;
      o._image       = null;
      o._texture     = null;
      o._ready       = false;
      o._dataReady   = false;
      o.onLoad       = RMethod.virtual(o, 'onLoad');
      o.construct    = FE3rTextureBitmapPack_construct;
      o.texture      = FE3rTextureBitmapPack_texture;
      o.testReady    = FE3rTextureBitmapPack_testReady;
      o.loadResource = RMethod.virtual(o, 'loadResource');
      o.dispose      = FE3rTextureBitmapPack_dispose;
      return o;
   }
   MO.FE3rTextureBitmapPack_construct = function FE3rTextureBitmapPack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FE3rTextureBitmapPack_texture = function FE3rTextureBitmapPack_texture(){
      return this._texture;
   }
   MO.FE3rTextureBitmapPack_testReady = function FE3rTextureBitmapPack_testReady(){
      var o = this;
      if(o._dataReady){
         o._ready = o._texture.isValid();
      }
      return o._ready;
   }
   MO.FE3rTextureBitmapPack_dispose = function FE3rTextureBitmapPack_dispose(){
      var o = this;
      o._ready = false;
      o._dataReady = false;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureConsole = function FE3rTextureConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._loadTextures = null;
      o._bitmaps      = null;
      o._textures     = null;
      o._thread       = null;
      o._interval     = 200;
      o.onProcess     = FE3rTextureConsole_onProcess;
      o.construct     = FE3rTextureConsole_construct;
      o.bitmaps       = FE3rTextureConsole_bitmaps;
      o.textures      = FE3rTextureConsole_textures;
      o.load          = FE3rTextureConsole_load;
      o.loadBitmap    = FE3rTextureConsole_loadBitmap;
      return o;
   }
   MO.FE3rTextureConsole_onProcess = function FE3rTextureConsole_onProcess(){
      var o = this;
      var s = o._loadTextures;
      s.record();
      while(s.next()){
         var m = s.current();
         if(m.processLoad()){
            s.removeCurrent();
         }
      }
   }
   MO.FE3rTextureConsole_construct = function FE3rTextureConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._loadTextures = new TLooper();
      o._bitmaps = new TDictionary();
      o._textures = new TDictionary();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3rTextureConsole_bitmaps = function FE3rTextureConsole_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3rTextureConsole_textures = function FE3rTextureConsole_textures(){
      return this._textures;
   }
   MO.FE3rTextureConsole_load = function FE3rTextureConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var texture = o._textures.get(flag);
      if(texture){
         return texture;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rTextureCube);
      }else{
         bitmap = RClass.create(FE3rTexture);
      }
      t._name = pg;
      t.linkGraphicContext(pc);
      t.load(u);
      o._bitmaps.set(pg, t);
      return t;
   }
   MO.FE3rTextureConsole_load2 = function FE3rTextureConsole_load2(pc, pt){
      var o = this;
      var s = o._textures;
      var t = s.get(pt);
      if(t){
         return t;
      }
      var rc = RConsole.find(FE3sTextureConsole);
      var r = rc.load(pt);
      t = RClass.create(FE3rTexture);
      t.linkGraphicContext(pc);
      t.setResource(r);
      s.set(pt, t);
      o._loadTextures.push(t);
      return t;
   }
   MO.FE3rTextureConsole_loadBitmap = function FE3rTextureConsole_loadBitmap(pc, pt, pb){
      var o = this;
      var b = o._bitmaps.get(pb);
      if(b){
         return b;
      }
      var t = o.load(pc, pt);
      return t.loadBitmap(pb);
   }
}
with(MO){
   MO.FE3rTrack = function FE3rTrack(o){
      o = RClass.inherits(this, o, FObject);
      o._matrix      = null
      o._resource    = null;
      o.construct    = FE3rTrack_construct;
      o.matrix       = FE3rTrack_matrix;
      o.resource     = FE3rTrack_resource;
      o.loadResource = FE3rTrack_loadResource;
      o.dispose      = FE3rTrack_dispose;
      return o;
   }
   MO.FE3rTrack_construct = function FE3rTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3rTrack_matrix = function FE3rTrack_matrix(){
      return this._matrix;
   }
   MO.FE3rTrack_resource = function FE3rTrack_resource(){
      return this._resource;
   }
   MO.FE3rTrack_loadResource = function FE3rTrack_loadResource(p){
      var o = this;
      o._resource = p;
      var fs = p.frames();
      if(fs != null){
         o._frameCount = fs.count();
      }
      o._frameTick = p.frameTick();
   }
   MO.FE3rTrack_dispose = function FE3rTrack_dispose(){
      var o = this;
      o._resource = null;
      o.__base.FG3dTrack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rVertexBuffer = function FE3rVertexBuffer(o){
      o = RClass.inherits(this, o, FWglVertexBuffer, MLinkerResource);
      o.dispose = FE3rVertexBuffer_dispose;
      return o;
   }
   MO.FE3rVertexBuffer_dispose = function FE3rVertexBuffer_dispose(){
      var o = this;
      o.__base.MLinkerResource.dispose.call(o);
      o.__base.FWglVertexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FE3dAutomaticEffect = function FE3dAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o.drawGroup = FE3dAutomaticEffect_drawGroup;
      return o;
   }
   MO.FE3dAutomaticEffect_drawGroup = function FE3dAutomaticEffect_drawGroup(region, renderables, offset, count){
      var o = this;
      if(count > 1){
         var modelConsole = RConsole.find(FE3rModelConsole);
         var model = modelConsole.merge(o, region, offset, count);
         if(model){
            var context = o._graphicContext;
            var meshes = model.meshes();
            var meshCount = meshes.count();
            var spaceName = region.spaceName();
            var mesh = meshes.first();
            var info = mesh.selectInfo(spaceName);
            var effect = info.effect;
            if(!effect){
               effect = info.effect = RConsole.find(FG3dEffectConsole).find(context, region, mesh);
            }
            for(var i = 1; i < meshCount; i++){
               var mesh = meshes.getAt(i);
               var info = mesh.selectInfo(spaceName);
               info.effect = effect;
            }
            return effect.drawRenderables(region, meshes, 0, meshCount);
         }
      }
      o.drawRenderables(region, renderables, offset, count);
   }
}
with(MO){
   MO.FE3dControlAutomaticEffect = function FE3dControlAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'control.automatic';
      o.drawRenderable = FE3dControlAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dControlAutomaticEffect_drawRenderable = function FE3dControlAutomaticEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var material = renderable.material();
      var info = material.info();
      o.bindMaterial(material);
      program.setParameter('vc_model_matrix', matrix);
      program.setParameter('vc_vp_matrix', cameraVpMatrix);
      program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
      program.setParameter('fc_ambient_color', info.ambientColor);
      o.bindAttributes(renderable);
      o.bindSamplers(renderable);
      var indexBuffer = renderable.indexBuffers().first();
      context.drawTriangles(indexBuffer);
   }
}
with(MO){
   MO.FE3dControlFrameEffect = function FE3dControlFrameEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'control.frame';
      o.drawRenderable = FE3dControlFrameEffect_drawRenderable;
      return o;
   }
   MO.FE3dControlFrameEffect_drawRenderable = function FE3dControlFrameEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
      var vld = pg.calculate(EG3dRegionParameter.LightDirection);
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter('vc_camera_position', vcp);
      p.setParameter('vc_light_direction', vld);
      p.setParameter('fc_camera_position', vcp);
      p.setParameter('fc_light_direction', vld);
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      p.setParameter4('fc_reflect', 0, 0, 1.0 - mi.reflectMerge, mi.reflectMerge);
      p.setParameter('fc_emissive_color', mi.emissiveColor);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dControlPass = function FE3dControlPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code = 'control';
      return o;
   }
}
with(MO){
   MO.FE3dControlTechnique = function FE3dControlTechnique(o){
      o = RClass.inherits(this, o, FG3dTechnique);
      o._code        = 'control';
      o._passControl = null;
      o.setup       = FE3dControlTechnique_setup;
      o.passControl = FE3dControlTechnique_passControl;
      o.drawRegion  = FE3dControlTechnique_drawRegion;
      return o;
   }
   MO.FE3dControlTechnique_setup = function FE3dControlTechnique_setup(){
      var o = this;
      o.__base.FG3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Result);
      var pd = o._passControl = RClass.create(FE3dControlPass);
      pd.linkGraphicContext(o);
      pd.setup();
      o._passes.push(pd);
   }
   MO.FE3dControlTechnique_passControl = function FE3dControlTechnique_passControl(){
      return this._passControl;
   }
   MO.FE3dControlTechnique_drawRegion = function FE3dControlTechnique_drawRegion(p){
      var o = this;
      if(p.renderables().isEmpty()){
         return;
      }
      o._graphicContext.clearDepth(1);
      o.__base.FG3dTechnique.drawRegion.call(o, p);
   }
}
with(MO){
   MO.FE3dGeneralColorAutomaticEffect = function FE3dGeneralColorAutomaticEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code          = 'general.color.automatic';
      o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
      o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorAutomaticEffect_buildMaterial = function FE3dGeneralColorAutomaticEffect_buildMaterial(effectInfo, renderable){
      var o = this;
      var material = renderable.material();
      var data = effectInfo.material;
      if(!data){
         data = effectInfo.material = RClass.create(FFloatStream);
         data.setLength(40);
         material._dirty = true;
      }
      if(material._dirty){
         var info = material.info();
         data.reset();
         if(info.optionAlpha){
            data.writeFloat4(info.alphaBase, info.alphaRate, 0, 0);
         }else{
            data.writeFloat4(info.alphaBase, 1, 0, 0);
         }
         data.writeFloat4(info.colorMin, info.colorMax, info.colorBalance, info.colorRate);
         data.writeColor4(info.vertexColor);
         data.writeColor4(info.ambientColor);
         data.writeColor4(info.diffuseColor);
         data.writeColor4(info.specularColor);
         data.writeFloat4(info.specularBase, info.specularLevel, info.specularAverage, info.specularShadow);
         data.writeColor4(info.reflectColor);
         data.writeFloat4(0, 0, 1 - info.reflectMerge, info.reflectMerge);
         data.writeColor4(info.emissiveColor);
         material._dirty = false;
      }
   }
   MO.FE3dGeneralColorAutomaticEffect_drawRenderable = function FE3dGeneralColorAutomaticEffect_drawRenderable(region, renderable){
      var o = this;
      var program = o._program;
      var cameraPosition = region.calculate(EG3dRegionParameter.CameraPosition);
      var lightDirection = region.calculate(EG3dRegionParameter.LightDirection);
      var vpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix)
      var material = renderable.material();
      o.bindMaterial(material);
      if(renderable._optionMerge){
         var mergeRenderables = renderable.mergeRenderables();
         var mergeCount = mergeRenderables.count();
         var data = RTypeArray.findTemp(EDataType.Float32, 16 * mergeCount);
         for(var i = 0; i < mergeCount; i++){
            var mergeRenderable = mergeRenderables.at(i);
            var matrix = mergeRenderable.currentMatrix();
            matrix.writeData(data, 16 * i);
         }
         program.setParameter('vc_model_matrix', data);
      }else{
         var matrix = renderable.currentMatrix();
         program.setParameter('vc_model_matrix', matrix);
      }
      program.setParameter('vc_vp_matrix', vpMatrix);
      program.setParameter('vc_camera_position', cameraPosition);
      program.setParameter('vc_light_direction', lightDirection);
      program.setParameter('fc_camera_position', cameraPosition);
      program.setParameter('fc_light_direction', lightDirection);
      if(o._supportMaterialMap){
         var materialId = renderable._materialId;
         program.setParameter4('fc_material', 1 / 32, materialId / 512, 0, 0);
      }else{
         var info = renderable.activeInfo();
         o.buildMaterial(info, renderable);
         program.setParameter('fc_materials', info.material.memory());
      }
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }
}
with(MO){
   MO.FE3dGeneralColorFlatEffect = function FE3dGeneralColorFlatEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code          = 'general.color.flat';
      o.drawRenderable = FE3dGeneralColorFlatEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorFlatEffect_drawRenderable = function FE3dGeneralColorFlatEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var contextSize = context.size();
      var contextRatio = context.ratio();
      var contextSizeRatio = context.sizeRatio();
      var radioWidth = contextSize.width * contextRatio;
      var radioHeight = contextSize.height * contextRatio;
      var sizeWidth = contextSize.width * contextSizeRatio.width;
      var sizeHeight = contextSize.height * contextSizeRatio.height;
      var program = o._program;
      var material = renderable.material();
      o.bindMaterial(material);
      if(renderable._optionMerge){
         var meshs = renderable.mergeRenderables();
         var meshCount = meshs.count();
         var data = RTypeArray.findTemp(EDataType.Float32, 4 * meshCount);
         var index = 0;
         for(var i = 0; i < meshCount; i++){
            var mesh = meshs.at(i);
            var matrix = mesh.matrix();
            data[index++] = matrix.sx / contextWidth * 2;
            data[index++] = matrix.sy / contextHeight * 2;
            data[index++] = matrix.tx / contextWidth * 2 - 1;
            data[index++] = 1 - matrix.ty / contextHeight * 2;
            mesh.currentMatrix().writeData(data, 4 * i);
         }
         program.setParameter('vc_position', data);
         o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
      }else{
         var matrix = renderable.matrix();
         if(renderable._optionFull){
            var cx = matrix.sx / sizeWidth * 2;
            var cy = matrix.sy / sizeHeight * 2;
            var tx = matrix.tx / sizeWidth * 2 - 1;
            var ty = 1 - matrix.ty / sizeHeight * 2;
            program.setParameter4('vc_position', cx, cy, tx, ty);
         }else{
            var cx = matrix.sx / radioWidth * 2;
            var cy = matrix.sy / radioHeight * 2;
            var tx = matrix.tx / sizeWidth * 2 - 1;
            var ty = 1 - matrix.ty / sizeHeight * 2;
            program.setParameter4('vc_position', cx, cy, tx, ty);
         }
         o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
      }
   }
}
with(MO){
   MO.FE3dGeneralColorPass = function FE3dGeneralColorPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code = 'color';
      return o;
   }
}
with(MO){
   MO.FE3dGeneralColorSkeletonEffect = function FE3dGeneralColorSkeletonEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code            = 'general.color.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dGeneralColorSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorSkeletonEffect_drawRenderable = function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
      var o = this;
      var c = o._graphicContext;
      var program = o._program;
      var vcp = region.calculate(EG3dRegionParameter.CameraPosition);
      var vld = region.calculate(EG3dRegionParameter.LightDirection);
      var m = renderable.material();
      var mi = m.info();
      o.bindMaterial(m);
      program.setParameter('vc_model_matrix', renderable.currentMatrix());
      program.setParameter('vc_vp_matrix', region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      program.setParameter('vc_camera_position', vcp);
      program.setParameter('vc_light_direction', vld);
      program.setParameter('fc_camera_position', vcp);
      program.setParameter('fc_light_direction', vld);
      program.setParameter('fc_color', mi.ambientColor);
      program.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      program.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      program.setParameter('fc_ambient_color', mi.ambientColor);
      program.setParameter('fc_diffuse_color', mi.diffuseColor);
      program.setParameter('fc_specular_color', mi.specularColor);
      program.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      program.setParameter('fc_specular_view_color', mi.specularViewColor);
      program.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      program.setParameter('fc_reflect_color', mi.reflectColor);
      var bones = renderable.bones();
      if(bones){
         var boneCount = renderable._boneLimit;
         var data = RTypeArray.findTemp(EDataType.Float32, 12 * boneCount);
         for(var i = 0; i < boneCount; i++){
            var bone = bones.at(i);
            var boneMatrix = bone.matrix();
            boneMatrix.writeData4x3(data, 12 * i);
         }
         program.setParameter('vc_bone_matrix', data);
      }
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }
}
with(MO){
   MO.FE3dGeneralTechnique = function FE3dGeneralTechnique(o){
      o = RClass.inherits(this, o, FE3dTechnique);
      o._code      = 'general';
      o._passColor = null;
      o.setup      = FE3dGeneralTechnique_setup;
      o.passColor  = FE3dGeneralTechnique_passColor;
      return o;
   }
   MO.FE3dGeneralTechnique_setup = function FE3dGeneralTechnique_setup(){
      var o = this;
      o.__base.FE3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Ambient);
      o.registerMode(EG3dTechniqueMode.DiffuseLevel);
      o.registerMode(EG3dTechniqueMode.DiffuseColor);
      o.registerMode(EG3dTechniqueMode.SpecularLevel);
      o.registerMode(EG3dTechniqueMode.SpecularColor);
      o.registerMode(EG3dTechniqueMode.Result);
      var p = o._passColor = RClass.create(FE3dGeneralColorPass);
      p.linkGraphicContext(o);
      p.setup();
      o._passes.push(p);
   }
   MO.FE3dGeneralTechnique_passColor = function FE3dGeneralTechnique_passColor(){
      return this._passColor;
   }
}
with(MO){
   MO.FE3dShadowColorAutomaticEffect = function FE3dShadowColorAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'shadow.color.automatic';
      o.drawRenderable = FE3dShadowColorAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowColorAutomaticEffect_drawRenderable = function FE3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
      var vcvpm = pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var vld = pg.calculate(EG3dRegionParameter.LightDirection);
      var vlvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
      var vlvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
      var vlci = pg.calculate(EG3dRegionParameter.LightInfo);
      var tp = pg.techniquePass();
      var m = pr.material();
      o.bindMaterial(m);
      p.setParameter('vc_light_depth', vlci);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', vcvpm);
      p.setParameter('vc_camera_position', vcp);
      p.setParameter('vc_light_direction', vld);
      p.setParameter('vc_light_view_matrix', vlvm);
      p.setParameter('vc_light_vp_matrix', vlvpm);
      p.setParameter('fc_camera_position', vcp);
      p.setParameter('fc_light_direction', vld);
      p.setParameter4('fc_light_depth', 1.0 / 4096.0, 0.0, -1.0 / 4096.0, vlci.w);
      var mi = m.info();
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      o.bindAttributes(pr);
      p.setSampler('fs_light_depth', tp.textureDepth());
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dShadowColorPass = function FE3dShadowColorPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code           = 'color';
      o._textureDepth   = null;
      o.textureDepth    = FE3dShadowColorPass_textureDepth;
      o.setTextureDepth = FE3dShadowColorPass_setTextureDepth;
      o.drawRegion      = FE3dShadowColorPass_drawRegion;
      return o;
   }
   MO.FE3dShadowColorPass_textureDepth = function FE3dShadowColorPass_textureDepth(){
      return this._textureDepth;
   }
   MO.FE3dShadowColorPass_setTextureDepth = function FE3dShadowColorPass_setTextureDepth(p){
      this._textureDepth = p;
   }
   MO.FE3dShadowColorPass_drawRegion = function FE3dShadowColorPass_drawRegion(p){
      var o = this;
      var c = o._graphicContext;
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      c.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
      o.__base.FG3dTechniquePass.drawRegion.call(o, p)
   }
}
with(MO){
   MO.FE3dShadowColorSkeletonEffect = function FE3dShadowColorSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code            = 'shadow.color.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dShadowColorSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowColorSkeletonEffect_drawRenderable = function FE3dShadowColorSkeletonEffect_drawRenderable(pr, r){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var prvp = pr.matrixViewProjection();
      var prcp = pr.cameraPosition();
      var prld = pr.lightDirection();
      if(p.hasAttribute()){
         var as = p.attributes();
         var ac = as.count();
         for(var n = 0; n < ac; n++){
            var a = as.value(n);
            if(a._statusUsed){
               var vb = r.findVertexBuffer(a._linker);
               if(vb == null){
                  throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
               }
               p.setAttribute(a._name, vb, vb._formatCd);
            }
         }
      }
      if(p.hasSampler()){
         var ss = p.samplers();
         var sc = ss.count();
         for(var n = 0; n < sc; n++){
            var s = ss.value(n);
            if(s._statusUsed){
               var ln = s.linker();
               var sp = r.findTexture(ln);
               if(sp != null){
                  p.setSampler(s.name(), sp.texture());
               }else{
                  throw new TError("Can't find sampler. (linker={1})", ln);
               }
            }
         }
      }
      p.setParameter('vc_model_matrix', r.currentMatrix());
      p.setParameter('vc_vp_matrix', prvp);
      p.setParameter('vc_camera_position', prcp);
      p.setParameter('vc_light_direction', prld);
      p.setParameter('fc_camera_position', prcp);
      p.setParameter('fc_light_direction', prld);
      var m = r.material();
      var mi = m.info();
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      var bs = r.bones();
      if(bs){
         var bc = bs.count();
         if(bc > 32){
            bc = 32;
         }
         var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
         for(var i = 0; i < bc; i++){
            var b = bs.get(i);
            var m = b.matrix();
            m.writeData(d, 16 * i);
         }
         p.setParameter('vc_bone_matrix', d);
      }
      var ib = r.indexBuffer();
      c.drawTriangles(ib, 0, ib._count);
   }
}
with(MO){
   MO.FE3dShadowDepthAutomaticEffect = function FE3dShadowDepthAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'shadow.depth.automatic';
      o.drawRenderable = FE3dShadowDepthAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowDepthAutomaticEffect_drawRenderable = function FE3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var lvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
      var lvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
      var lci = pg.calculate(EG3dRegionParameter.LightInfo);
      c.setBlendFactors(false);
      p.setParameter('vc_camera', lci);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_view_matrix', lvm);
      p.setParameter('vc_vp_matrix', lvpm);
      p.setParameter('fc_camera', lci);
      p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dShadowDepthPass = function FE3dShadowDepthPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code         = 'depth';
      o._renderTarget = null;
      o._textureDepth = null;
      o._renderTarget = null;
      o.setup         = FE3dShadowDepthPass_setup;
      o.textureDepth  = FE3dShadowDepthPass_textureDepth;
      o.drawRegion    = FE3dShadowDepthPass_drawRegion;
      return o;
   }
   MO.FE3dShadowDepthPass_setup = function FE3dShadowDepthPass_setup(){
      var o = this;
      o.__base.FG3dTechniquePass.setup.call(o);
      var c = o._graphicContext;
      var d = o._textureDepth = c.createFlatTexture();
      d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
      d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      var t = o._renderTarget = c.createRenderTarget();
      t.size().set(2048, 2048);
      t.textures().push(d);
      t.build();
   }
   MO.FE3dShadowDepthPass_textureDepth = function FE3dShadowDepthPass_textureDepth(){
      return this._textureDepth;
   }
   MO.FE3dShadowDepthPass_drawRegion = function FE3dShadowDepthPass_drawRegion(p){
      var o = this;
      var c = o._graphicContext;
      if(o._finish){
         c.setRenderTarget(null);
         var bc = p._backgroundColor;
         o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
      }else{
         c.setRenderTarget(o._renderTarget);
         c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
      }
      p._textureDepth = o._textureDepth;
      o.__base.FG3dTechniquePass.drawRegion.call(o, p)
   }
}
with(MO){
   MO.FE3dShadowDepthSkeletonEffect = function FE3dShadowDepthSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code            = 'shadow.depth.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dShadowDepthSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowDepthSkeletonEffect_drawRenderable = function FE3dShadowDepthSkeletonEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      p.setParameter('vc_model_matrix', r.currentMatrix());
      p.setParameter('vc_vp_matrix', prvp);
      p.setParameter('vc_camera_position', prcp);
      p.setParameter('vc_light_direction', prld);
      p.setParameter('fc_camera_position', prcp);
      p.setParameter('fc_light_direction', prld);
      var m = r.material();
      var mi = m.info();
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      var bs = pr.bones();
      if(bs){
         var bc = bs.count();
         if(bc > 32){
            bc = 32;
         }
         var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
         for(var i = 0; i < bc; i++){
            var b = bs.get(i);
            var m = b.matrix();
            m.writeData(d, 16 * i);
         }
         p.setParameter('vc_bone_matrix', d);
      }
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dShadowTechnique = function FE3dShadowTechnique(o){
      o = RClass.inherits(this, o, FE3dTechnique);
      o._code        = 'shadow';
      o._passDepth   = null;
      o._passColor   = null;
      o.setup        = FE3dShadowTechnique_setup;
      o.passDepth    = FE3dShadowTechnique_passDepth;
      o.passColor    = FE3dShadowTechnique_passColor;
      o.updateRegion = FE3dShadowTechnique_updateRegion;
      return o;
   }
   MO.FE3dShadowTechnique_setup = function FE3dShadowTechnique_setup(){
      var o = this;
      o.__base.FE3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Ambient);
      o.registerMode(EG3dTechniqueMode.DiffuseLevel);
      o.registerMode(EG3dTechniqueMode.DiffuseColor);
      o.registerMode(EG3dTechniqueMode.SpecularLevel);
      o.registerMode(EG3dTechniqueMode.SpecularColor);
      o.registerMode(EG3dTechniqueMode.Result);
      var ps = o._passes;
      var pd = o._passDepth = RClass.create(FE3dShadowDepthPass);
      pd.linkGraphicContext(o);
      pd.setup();
      var pc = o._passColor = RClass.create(FE3dShadowColorPass);
      pc.linkGraphicContext(o);
      pc.setup();
      ps.push(pc);
      pc.setTextureDepth(pd.textureDepth());
   }
   MO.FE3dShadowTechnique_passDepth = function FE3dShadowTechnique_passDepth(){
      return this._passDepth;
   }
   MO.FE3dShadowTechnique_passColor = function FE3dShadowTechnique_passColor(){
      return this._passColor;
   }
   MO.FE3dShadowTechnique_updateRegion = function FE3dShadowTechnique_updateRegion(p){
      var o = this;
      o.__base.FE3dTechnique.updateRegion.call(o, p);
      var g = o._graphicContext;
      var gs = g.size();
      var c = p.camera();
      var l = p.directionalLight();
      var lc = l.camera();
   }
}
MO.EE3dInstance = new function EE3dInstance(){
   var o = this;
   o.ModelRenderable    = 'model.renderable';
   o.TemplateRenderable = 'template.renderable';
   o.Scene              = 'scene';
   o.SceneLayer         = 'scene.layer';
   o.SceneDisplay       = 'scene.display';
   o.SceneMaterial      = 'scene.material';
   o.SceneMovie         = 'scene.movie';
   o.SceneRenderable    = 'scene.renderable';
   return o;
}
with(MO){
   MO.FE3dAnimation = function FE3dAnimation(o){
      o = RClass.inherits(this, o, FObject, ME3dObject, MLinkerResource);
      return o;
   }
}
with(MO){
   MO.FE3dCamera = function FE3dCamera(o){
      o = RClass.inherits(this, o, FG3dPerspectiveCamera, MLinkerResource);
      o._rotation       = null;
      o._rotationMatrix = null;
      o._quaternion     = null;
      o._quaternionX    = null;
      o._quaternionY    = null;
      o._quaternionZ    = null;
      o.construct       = FE3dCamera_construct;
      o.rotation        = FE3dCamera_rotation;
      o.doMoveX         = FE3dCamera_doMoveX;
      o.doMoveY         = FE3dCamera_doMoveY;
      o.doMoveZ         = FE3dCamera_doMoveZ;
      o.doForward       = FE3dCamera_doForward;
      o.doPitch         = FE3dCamera_doPitch;
      o.doYaw           = FE3dCamera_doYaw;
      o.doRoll          = FE3dCamera_doRoll;
      o.loadResource    = FE3dCamera_loadResource;
      o.commitResource  = FE3dCamera_commitResource;
      o.update          = FE3dCamera_update;
      return o;
   }
   MO.FE3dCamera_construct = function FE3dCamera_construct(){
      var o = this;
      o.__base.FG3dPerspectiveCamera.construct.call(o);
      o._rotation = new SVector3();
      o._rotationMatrix = new SMatrix3x3();
      o._quaternion = new SQuaternion();
      o._quaternionX = new SQuaternion();
      o._quaternionY = new SQuaternion();
      o._quaternionZ = new SQuaternion();
   }
   MO.FE3dCamera_rotation = function FE3dCamera_rotation(){
      return this._rotation;
   }
   MO.FE3dCamera_doMoveX = function FE3dCamera_doMoveX(value){
      this._position.x += value;
   }
   MO.FE3dCamera_doMoveY = function FE3dCamera_doMoveY(value){
      this._position.y += value;
   }
   MO.FE3dCamera_doMoveZ = function FE3dCamera_doMoveZ(value){
      this._position.z += value;
   }
   MO.FE3dCamera_doForward = function FE3dCamera_doForward(value){
      var o = this;
      o._position.x += o._direction.x * value;
      o._position.y += o._direction.y * value;
      o._position.z += o._direction.z * value;
   }
   MO.FE3dCamera_doPitch = function FE3dCamera_doPitch(p){
      this._rotation.x += p;
   }
   MO.FE3dCamera_doYaw = function FE3dCamera_doYaw(p){
      this._rotation.y += p;
   }
   MO.FE3dCamera_doRoll = function FE3dCamera_doRoll(p){
      this._rotation.z += p;
   }
   MO.FE3dCamera_loadResource = function FE3dCamera_loadResource(resource){
      var o = this;
      var resourceProjection = resource.projection();
      o._resource = resource;
      o.position().assign(resource.position());
      o.setDirection(resource.direction().x, resource.direction().y, resource.direction().z);
      o.update();
      var projection = o.projection();
      projection._angle = resourceProjection.angle();
      projection._znear = resourceProjection.znear();
      projection._zfar = resourceProjection.zfar();
      projection.update();
   }
   MO.FE3dCamera_commitResource = function FE3dCamera_commitResource(){
      var o = this;
      var resource = o._resource;
      resource._position.assign(o._position);
      resource._direction.assign(o._direction);
   }
   MO.FE3dCamera_update = function FE3dCamera_update(){
      var o = this;
      var r = o._rotation;
      o._quaternionX.fromAxisAngle(RMath.vectorAxisX, r.x);
      o._quaternionY.fromAxisAngle(RMath.vectorAxisY, r.y);
      o._quaternionZ.fromAxisAngle(RMath.vectorAxisZ, r.z);
      var q = o._quaternion.identity();
      q.mul(o._quaternionX);
      q.mul(o._quaternionY);
      q.mul(o._quaternionZ);
      var m = o._rotationMatrix;
      m.build(q);
      var d = o._direction;
      m.transformPoint3(o._directionTarget, d);
      d.normalize();
      o.__base.FG3dPerspectiveCamera.update.call(o);
   }
}
with(MO){
   MO.FE3dDirectionalLight = function FE3dDirectionalLight(o){
      o = RClass.inherits(this, o, FG3dDirectionalLight, MLinkerResource);
      o._material    = null;
      o.construct    = FE3dDirectionalLight_construct;
      o.material     = FE3dDirectionalLight_material;
      o.loadResource = FE3dDirectionalLight_loadResource;
      o.dispose      = FE3dDirectionalLight_dispose;
      return o;
   }
   MO.FE3dDirectionalLight_construct = function FE3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dDirectionalLight.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dDirectionalLight_material = function FE3dDirectionalLight_material(){
      return this._material;
   }
   MO.FE3dDirectionalLight_loadResource = function FE3dDirectionalLight_loadResource(resource){
      var o = this;
      o.__base.MLinkerResource.loadResource.call(o, resource);
      o._material.loadResource(resource.material());
   }
   MO.FE3dDirectionalLight_dispose = function FE3dDirectionalLight_dispose(){
      var o = this;
      o._material = RObject.dispose(o._material);
      o.__base.FG3dDirectionalLight.dispose.call(o);
   }
}
with(MO){
   MO.FE3dFlatStage = function FE3dFlatStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._layer    = null;
      o.construct = FE3dFlatStage_construct;
      o.layer     = FE3dFlatStage_layer;
      return o;
   }
   MO.FE3dFlatStage_construct = function FE3dFlatStage_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', layer);
   }
   MO.FE3dFlatStage_layer = function FE3dFlatStage_layer(){
      return this._layer;
   }
}
with(MO){
   MO.FE3dInstanceConsole = function FE3dInstanceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._factory   = null;
      o.construct  = FE3dInstanceConsole_construct;
      o.factory    = FE3dInstanceConsole_factory;
      o.register   = FE3dInstanceConsole_register;
      o.unregister = FE3dInstanceConsole_unregister;
      o.create     = FE3dInstanceConsole_create;
      return o;
   }
   MO.FE3dInstanceConsole_construct = function FE3dInstanceConsole_construct(){
      var o = this;
      var factory = o._factory = RClass.create(FClassFactory);
      factory.register(EE3dInstance.ModelRenderable, FE3dModelRenderable);
      factory.register(EE3dInstance.TemplateRenderable, FE3dTemplateRenderable);
      factory.register(EE3dInstance.Scene, FE3dScene);
      factory.register(EE3dInstance.SceneLayer, FE3dSceneLayer);
      factory.register(EE3dInstance.SceneDisplay, FE3dSceneDisplay);
      factory.register(EE3dInstance.SceneMaterial, FE3dSceneMaterial);
      factory.register(EE3dInstance.SceneMovie, FE3dMovie);
      factory.register(EE3dInstance.SceneRenderable, FE3dSceneDisplayRenderable);
   }
   MO.FE3dInstanceConsole_factory = function FE3dInstanceConsole_factory(){
      return this._factory;
   }
   MO.FE3dInstanceConsole_register = function FE3dInstanceConsole_register(code, clazz){
      this._factory.register(code, clazz);
   }
   MO.FE3dInstanceConsole_unregister = function FE3dInstanceConsole_unregister(code){
      this._factory.unregister(code, clazz);
   }
   MO.FE3dInstanceConsole_create = function FE3dInstanceConsole_create(code){
      return this._factory.create(code);
   }
}
with(MO){
   MO.FE3dMaterial = function FE3dMaterial(o){
      o = RClass.inherits(this, o, FE3rMaterial);
      o._parent    = null;
      o.loadParent = FE3dRenderable_loadParent;
      return o;
   }
   MO.FE3dRenderable_loadParent = function FE3dRenderable_loadParent(material){
      var o = this;
      o._parent = material;
   }
}
with(MO){
   MO.FE3dMesh = function FE3dMesh(o){
      o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
      o._ready         = false;
      o._display       = null;
      o._renderable    = null;
      o._layer         = null;
      o.construct      = FE3dMesh_construct;
      o.testReady      = FE3dMesh_testReady;
      o.loadRenderable = FE3dMesh_loadRenderable;
      o.processLoad    = FE3dMesh_processLoad;
      o.process        = FE3dMesh_process;
      return o;
   }
   MO.FE3dMesh_construct = function FE3dMesh_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var l = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', l);
   }
   MO.FE3dMesh_testReady = function FE3dMesh_testReady(){
      return this._ready;
   }
   MO.FE3dMesh_loadRenderable = function FE3dMesh_loadRenderable(p){
      var o = this;
      var resource = p.resource();
      var technique = o.selectTechnique(o, FE3dGeneralTechnique);
      technique.setResource(resource.technique());
      o.loadResource(resource);
      var m = RClass.create(FE3dMeshRenderable);
      m.setResource(resource._renderable);
      m._material.loadResource(resource._display._material);
      m._renderable = p;
      var vbs = p._vertexBuffers;
      var vbc = vbs.count();
      for(var i = 0; i < vbc; i++){
         var vb = vbs.getAt(i);
         m._vertexBuffers.set(vb._name, vb);
      }
      m._indexBuffer = p._indexBuffer;
      m.matrix().assign(m.resource().matrix());
      var display = o._display = RClass.create(FE3dMeshDisplay);
      display._renderable = m;
      display.load(resource._display);
      display.pushRenderable(m);
      o._layer.pushDisplay(display);
      o._ready = true;
      o.processLoadListener(o);
   }
   MO.FE3dMesh_processLoad = function FE3dMesh_processLoad(){
      var o = this;
      if(!o._renderable.testReady()){
         return false;
      }
      o.loadRenderable(o._renderable);
      return true;
   }
   MO.FE3dMesh_process = function FE3dMesh_process(){
      var o = this;
      o.__base.FE3dSpace.process.call(o);
   }
}
with(MO){
   MO.FE3dMeshConsole = function FE3dMeshConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._loadMeshs  = null;
      o._meshs      = null;
      o._thread     = null;
      o._interval   = 100;
      o.onProcess   = FE3dMeshConsole_onProcess;
      o.construct   = FE3dMeshConsole_construct;
      o.meshs       = FE3dMeshConsole_meshs;
      o.allocByGuid = FE3dMeshConsole_allocByGuid;
      o.allocByCode = FE3dMeshConsole_allocByCode;
      o.free        = FE3dMeshConsole_free;
      return o;
   }
   MO.FE3dMeshConsole_onProcess = function FE3dMeshConsole_onProcess(){
      var o = this;
      var ms = o._loadMeshs;
      ms.record();
      while(ms.next()){
         var m = ms.current();
         if(m.processLoad()){
            ms.removeCurrent();
         }
      }
   }
   MO.FE3dMeshConsole_construct = function FE3dMeshConsole_construct(){
      var o = this;
      o._loadMeshs = new TLooper();
      o._meshs = new TDictionary();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3dMeshConsole_meshs = function FE3dMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3dMeshConsole_allocByGuid = function FE3dMeshConsole_allocByGuid(pc, pn){
      var o = this;
      var ms = o._meshs.get(pn);
      if(ms){
         if(!ms.isEmpty()){
            return ms.pop();
         }
      }
      var rmc = RConsole.find(FE3rMeshConsole);
      var rm = rmc.loadByGuid(pc, pn);
      var m = RClass.create(FE3dMesh);
      m.linkGraphicContext(pc);
      m._name = pn;
      m._renderable = rm;
      o._loadMeshs.push(m);
      return m;
   }
   MO.FE3dMeshConsole_allocByCode = function FE3dMeshConsole_allocByCode(pc, pn){
      var o = this;
      var ms = o._meshs.get(pn);
      if(ms){
         if(!ms.isEmpty()){
            return ms.pop();
         }
      }
      var rmc = RConsole.find(FE3rMeshConsole);
      var rm = rmc.loadByCode(pc, pn);
      var m = RClass.create(FE3dMesh);
      m.linkGraphicContext(pc);
      m._name = pn;
      m._renderable = rm;
      o._loadMeshs.push(m);
      return m;
   }
   MO.FE3dMeshConsole_free = function FE3dMeshConsole_free(p){
      var o = this;
      p._display.remove();
   }
}
with(MO){
   MO.FE3dMeshDisplay = function FE3dMeshDisplay(o){
      o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
      o._material      = null;
      o._renderable    = null;
      o.renderable     = FE3dMeshDisplay_renderable;
      o.load           = FE3dMeshDisplay_load;
      o.reloadResource = FE3dMeshDisplay_reloadResource;
      return o;
   }
   MO.FE3dMeshDisplay_renderable = function FE3dMeshDisplay_renderable(){
      return this._renderable;
   }
   MO.FE3dMeshDisplay_load = function FE3dMeshDisplay_load(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
   }
   MO.FE3dMeshDisplay_reloadResource = function FE3dMeshDisplay_reloadResource(){
      var o = this;
      o._matrix.assign(o._resource.matrix());
   }
}
with(MO){
   MO.FE3dMeshRenderable = function FE3dMeshRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._renderable      = RClass.register(o, AGetSet('_renderable'));
      o._activeTrack     = null;
      o.vertexCount      = FE3dMeshRenderable_vertexCount;
      o.findVertexBuffer = FE3dMeshRenderable_findVertexBuffer;
      o.vertexBuffers    = FE3dMeshRenderable_vertexBuffers;
      o.indexBuffers     = FE3dMeshRenderable_indexBuffers;
      o.findTexture      = FE3dMeshRenderable_findTexture;
      o.textures         = FE3dMeshRenderable_textures;
      o.reloadResource   = FE3dMeshRenderable_reloadResource;
      o.process          = FE3dMeshRenderable_process;
      o.processDelay     = FE3dMeshRenderable_processDelay;
      o.update           = FE3dMeshRenderable_update;
      o.dispose          = FE3dMeshRenderable_dispose;
      return o;
   }
   MO.FE3dMeshRenderable_vertexCount = function FE3dMeshRenderable_vertexCount(){
      return this._renderable.vertexCount();
   }
   MO.FE3dMeshRenderable_findVertexBuffer = function FE3dMeshRenderable_findVertexBuffer(code){
      var o = this;
      var buffer = o._vertexBuffers.get(code);
      if(buffer){
         return buffer;
      }
      return o._renderable.findVertexBuffer(code);
   }
   MO.FE3dMeshRenderable_vertexBuffers = function FE3dMeshRenderable_vertexBuffers(){
      return this._renderable.vertexBuffers();
   }
   MO.FE3dMeshRenderable_indexBuffers = function FE3dMeshRenderable_indexBuffers(){
      return this._renderable.indexBuffers();
   }
   MO.FE3dMeshRenderable_findTexture = function FE3dMeshRenderable_findTexture(code){
      var o = this;
      var textures = o._textures.get(code);
      if(textures){
         return textures;
      }
      return o._renderable.findTexture(p);
   }
   MO.FE3dMeshRenderable_textures = function FE3dMeshRenderable_textures(){
      var o = this;
      var textures = o._textures;
      if(textures){
         return textures;
      }
      return o._renderable.textures();
   }
   MO.FE3dMeshRenderable_reloadResource = function FE3dMeshRenderable_reloadResource(){
      var o = this;
      o._matrix.assign(o._resource.matrix());
   }
   MO.FE3dMeshRenderable_process = function FE3dMeshRenderable_process(region){
      var o = this;
      o.__base.FE3dRenderable.process.call(o, region);
      var track = o._activeTrack;
      if(track){
         if(o._display._optionPlay){
            var animation = track._animation;
            if(animation){
               animation.process(track);
            }
         }
      }
   }
   MO.FE3dMeshRenderable_processDelay = function FE3dMeshRenderable_processDelay(p){
      var o = this;
      o.__base.FE3dRenderable.processDelay.call(o, p);
   }
   MO.FE3dMeshRenderable_update = function FE3dMeshRenderable_update(region){
      var o = this;
      var display = o._display;
      var matrix = o._matrix;
      var track = o._activeTrack;
      var calculateMatrix = o._calculateMatrix;
      if(track){
         calculateMatrix.assign(track.matrix());
         calculateMatrix.append(matrix);
      }else{
         calculateMatrix.assign(matrix);
      }
      if(display){
         var displayMatrix = o._display.currentMatrix();
         calculateMatrix.append(displayMatrix);
      }
      var changed = o._currentMatrix.attachData(calculateMatrix.data());
      if(changed){
         region.change();
      }
   }
   MO.FE3dMeshRenderable_dispose = function FE3dMeshRenderable_dispose(){
      var o = this;
      o._modelMatrix = RObject.dispose(o._modelMatrix);
      o._vertexBuffers = RObject.dispose(o._vertexBuffers);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3dModel = function FE3dModel(o){
      o = RClass.inherits(this, o, FE3dSpace, MPoolAble, MLinkerResource, MListenerLoad);
      o._dataReady     = false;
      o._renderable    = null;
      o._display       = null;
      o.construct      = FE3dModel_construct;
      o.display        = FE3dModel_display;
      o.testReady      = FE3dModel_testReady;
      o.renderable     = FE3dModel_renderable;
      o.setRenderable  = FE3dModel_setRenderable;
      o.loadRenderable = FE3dModel_loadRenderable;
      o.processLoad    = FE3dModel_processLoad;
      return o;
   }
   MO.FE3dModel_construct = function FE3dModel_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('sprite', layer);
      var display = o._display = RClass.create(FE3dModelDisplay);
      layer.pushDisplay(display);
   }
   MO.FE3dModel_display = function FE3dModel_display(){
      return this._display;
   }
   MO.FE3dModel_testReady = function FE3dModel_testReady(){
      return this._dataReady;
   }
   MO.FE3dModel_renderable = function FE3dModel_renderable(){
      return this._renderable;
   }
   MO.FE3dModel_setRenderable = function FE3dModel_setRenderable(renderable){
      this._renderable = renderable;
   }
   MO.FE3dModel_loadRenderable = function FE3dModel_loadRenderable(renderable){
      var o = this;
      o._renderable = renderable;
      var resource = renderable.resource();
      o.selectTechnique(o, FE3dGeneralTechnique);
      o.loadResource(resource);
      o._display.load(renderable);
      o._dataReady = true;
   }
   MO.FE3dModel_processLoad = function FE3dModel_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      var renderable = o._renderable;
      if(!renderable.testReady()){
         return false;
      }
      o.loadRenderable(renderable);
      o.processLoadListener(o);
      return true;
   }
}
with(MO){
   MO.FE3dModelConsole = function FE3dModelConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._looper     = null;
      o._pools      = null;
      o._thread     = null;
      o._interval   = 100;
      o.onProcess   = FE3dModelConsole_onProcess;
      o.construct   = FE3dModelConsole_construct;
      o.pools       = FE3dModelConsole_pools;
      o.allocByGuid = FE3dModelConsole_allocByGuid;
      o.allocByCode = FE3dModelConsole_allocByCode;
      o.free        = FE3dModelConsole_free;
      return o;
   }
   MO.FE3dModelConsole_onProcess = function FE3dModelConsole_onProcess(){
      var o = this;
      var looper = o._looper;
      looper.record();
      while(looper.next()){
         var item = looper.current();
         if(item.processLoad()){
            looper.removeCurrent();
         }
      }
   }
   MO.FE3dModelConsole_construct = function FE3dModelConsole_construct(){
      var o = this;
      o._looper = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3dModelConsole_pools = function FE3dModelConsole_pools(){
      return this._pools;
   }
   MO.FE3dModelConsole_allocByGuid = function FE3dModelConsole_allocByGuid(context, guid){
      var o = this;
      var model = o._pools.alloc(guid);
      if(model){
         return model;
      }
      var renderable = RConsole.find(FE3rModelConsole).load(context, guid);
      var model = RClass.create(FE3dModel);
      model.linkGraphicContext(context);
      model.setPoolCode(guid);
      model.setRenderable(renderable);
      o._looper.push(model);
      return model;
   }
   MO.FE3dModelConsole_allocByCode = function FE3dModelConsole_allocByCode(context, code){
      var o = this;
      var model = o._pools.alloc(code);
      if(model){
         return model;
      }
      return model;
   }
   MO.FE3dModelConsole_free = function FE3dModelConsole_free(model){
      var o = this;
      var code = model.poolCode();
      o._pools.free(code, model);
   }
}
with(MO){
   MO.FE3dModelDisplay = function FE3dModelDisplay(o){
      o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
      o._material      = null;
      o._shapes        = null;
      o.construct      = FE3dModelDisplay_construct;
      o.material       = FE3dModelDisplay_material;
      o.shapes         = FE3dModelDisplay_shapes;
      o.load           = FE3dModelDisplay_load;
      o.reloadResource = FE3dModelDisplay_reloadResource;
      o.dispose        = FE3dModelDisplay_dispose;
      return o;
   }
   MO.FE3dModelDisplay_construct = function FE3dModelDisplay_construct(){
      var o = this;
      o.__base.FE3dDisplay.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dModelDisplay_material = function FE3dModelDisplay_material(){
      return this._material;
   }
   MO.FE3dModelDisplay_shapes = function FE3dModelDisplay_shapes(){
      return this._shapes;
   }
   MO.FE3dModelDisplay_load = function FE3dModelDisplay_load(renderable){
      var o = this;
      var material = o._material;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      var modelResource = renderable.resource();
      var resource = o._resource = modelResource.display();
      o._matrix.assign(resource.matrix());
      material.loadResource(resource.material());
      var geometryRenderables = renderable.geometrys();
      if(geometryRenderables){
         var geometryCount = geometryRenderables.count();
         var shapes = o._shapes = new TObjects();
         for(var i = 0; i < geometryCount; i++){
            var geometryRenderable = geometryRenderables.get(i);
            var shape = instanceConsole.create(EE3dInstance.ModelRenderable);
            shape.setDisplay(o);
            shape.setMaterial(material);
            shape.load(geometryRenderable);
            shapes.push(shape);
            o.pushRenderable(shape);
         }
      }
   }
   MO.FE3dModelDisplay_reloadResource = function FE3dModelDisplay_reloadResource(){
      var o = this;
      var resource = o._resource;
      o._matrix.assign(resource.matrix());
      o._material.loadResource(resource.material());
   }
   MO.FE3dModelDisplay_dispose = function FE3dModelDisplay_dispose(){
      var o = this;
      o._material = RObject.dispose(o._material);
      o.__base.FE3dDisplay.dispose.call(o);
   }
}
with(MO){
   MO.FE3dModelRenderable = function FE3dModelRenderable(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable);
      o._ready            = false;
      o._materialResource = null;
      o.testVisible       = FE3dModelRenderable_testVisible;
      o.load              = FE3dModelRenderable_load;
      return o;
   }
   MO.FE3dModelRenderable_testVisible = function FE3dModelRenderable_testVisible(p){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            o._ready = renderable.testReady();
         }
      }
      return o._ready;
   }
   MO.FE3dModelRenderable_load = function FE3dModelRenderable_load(renderable){
      var o = this;
      var material = o._material;
      var materialResource = o._materialResource = renderable.material();
      if(materialResource){
         material.assignInfo(materialResource.info());
      }
      o._effectCode = material.info().effectCode;
      o._renderable = renderable;
   }
}
with(MO){
   MO.FE3dMovie = function FE3dMovie(o){
      o = RClass.inherits(this, o, FObject, MLinkerResource);
      o._interval      = null;
      o._firstTick     = 0;
      o._lastTick      = 0;
      o._matrix        = null;
      o.construct      = FE3dMovie_construct;
      o.loadResource   = FE3dMovie_loadResource;
      o.reloadResource = FE3dMovie_reloadResource;
      o.process        = FE3dMovie_process;
      return o;
   }
   MO.FE3dMovie_construct = function FE3dMovie_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3dMovie_loadResource = function FE3dMovie_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._interval = resource._interval;
      o._matrix.setRotation(resource._rotation.x, resource._rotation.y * Math.PI / 180, resource._rotation.z);
      o._matrix.update();
   }
   MO.FE3dMovie_reloadResource = function FE3dMovie_reloadResource(){
      var o = this;
      var resource = o._resource;
      o.loadResource(resource);
   }
   MO.FE3dMovie_process = function FE3dMovie_process(matrix){
      var o = this;
      if(o._firstTick == 0){
         o._firstTick = RTimer.current();
      }
      if(o._lastTick == 0){
         o._lastTick = RTimer.current();
      }
      var tick = RTimer.current();
      var span = tick - o._lastTick;
      if(span > o._interval){
         var resource = o._resource;
         var speed = span / 1000;
         var code = o._resource.code();
         if(code == 'rotation'){
            matrix.ry += resource._rotation.y * speed;
            matrix.updateForce();
         }
         o._lastTick = tick;
      }
   }
}
with(MO){
   MO.FE3dRegion = function FE3dRegion(o){
      o = RClass.inherits(this, o, FRegion, MGraphicObject, MG3dRegion, MLinkerResource);
      o._backgroundColor = null;
      o.construct       = FE3dRegion_construct;
      o.backgroundColor = FE3dRegion_backgroundColor;
      o.loadResource    = FE3dRegion_loadResource;
      o.reloadResource  = FE3dRegion_reloadResource;
      o.prepare         = FE3dRegion_prepare;
      o.dispose         = FE3dRegion_dispose;
      return o;
   }
   MO.FE3dRegion_construct = function FE3dRegion_construct(){
      var o = this;
      o.__base.FRegion.construct.call(o);
      o.__base.MG3dRegion.construct.call(o);
      var camera = o._camera = RClass.create(FE3dCamera);
      camera.position().set(0, 0, -100);
      camera.lookAt(0, 0, 0);
      camera.update();
      camera.projection().update();
      var light = o._directionalLight = RClass.create(FE3dDirectionalLight);
      light.direction().set(0, -1, 0);
      var lightCamera = light.camera();
      lightCamera.position().set(10, 10, -10);
      lightCamera.lookAt(0, 0, 0);
      var backgroundColor = o._backgroundColor = new SColor4();
      backgroundColor.set(0, 0, 0, 1);
      o._calculateCameraMatrix = new SMatrix3d();
   }
   MO.FE3dRegion_backgroundColor = function FE3dRegion_backgroundColor(){
      return this._backgroundColor;
   }
   MO.FE3dRegion_loadResource = function FE3dRegion_loadResource(p){
      var o = this;
      o._resource = p;
      o._camera.loadResource(p.camera());
      o._directionalLight.loadResource(p.light());
      o.reloadResource();
   }
   MO.FE3dRegion_reloadResource = function FE3dRegion_reloadResource(){
      var o = this;
      var r = o._resource;
      var f = r.optionBackground();
      if(f){
         o._backgroundColor.assignPower(r.backgroundColor());
         o._backgroundColor.alpha = 1;
      }else{
         o._backgroundColor.set(0, 0, 0, 0);
      }
   }
   MO.FE3dRegion_prepare = function FE3dRegion_prepare(){
      var o = this;
      o.__base.MG3dRegion.prepare.call(o);
      var r = o._calculateCameraMatrix.attach(o._camera.matrix());
      if(r){
         o._changed = true;
      }
   }
   MO.FE3dRegion_dispose = function FE3dRegion_dispose(){
      var o = this;
      o.__base.FRegion.dispose.call(o);
      o.__base.MG3dRegion.dispose.call(o);
   }
}
with(MO){
   MO.FE3dScene = function FE3dScene(o){
      o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
      o._ready                = false;
      o._dataReady            = false;
      o._resource             = null;
      o._dirty                = false;
      o.onProcess             = FE3dScene_onProcess;
      o.construct             = FE3dScene_construct;
      o.createRegion          = FE3dScene_createRegion;
      o.resource              = FE3dScene_resource;
      o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
      o.loadRegionResource    = FE3dScene_loadRegionResource;
      o.loadDisplayResource   = FE3dScene_loadDisplayResource;
      o.loadLayerResource     = FE3dScene_loadLayerResource;
      o.loadResource          = FE3dScene_loadResource;
      o.testReady             = FE3dScene_testReady;
      o.dirty                 = FE3dScene_dirty;
      o.processLoad           = FE3dScene_processLoad;
      o.active                = FE3dScene_active;
      o.deactive              = FE3dScene_deactive;
      return o;
   }
   MO.FE3dScene_onProcess = function FE3dScene_onProcess(){
      var o = this;
      o.__base.FE3dSpace.onProcess.call(o);
      if(o._dirty){
         var s = o._region.allRenderables();
         for(var i = s.count() - 1; i >= 0; i--){
            var r = s.getAt(i);
            r.resetInfos();
         }
         o._dirty = false;
      }
   }
   MO.FE3dScene_construct = function FE3dScene_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
   }
   MO.FE3dScene_createRegion = function FE3dScene_createRegion(){
      return RClass.create(FE3dSceneRegion);
   }
   MO.FE3dScene_resource = function FE3dScene_resource(p){
      return this._resource;
   }
   MO.FE3dScene_loadTechniqueResource = function FE3dScene_loadTechniqueResource(p){
      var o = this;
      o._technique._resource = p;
   }
   MO.FE3dScene_loadRegionResource = function FE3dScene_loadRegionResource(p){
      var o = this;
      o._region.loadResource(p);
      var rc = p.camera();
      var rcv = rc.projection();
      var c = o.camera();
      c._resource = rc;
      var cp = c.projection();
      c.position().assign(rc.position());
      c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
      c.update();
      cp.size().assign(o._graphicContext.size());
      cp._angle = rcv.angle();
      cp._znear = rcv.znear();
      cp._zfar = rcv.zfar();
      cp.update();
      var rl = p.light();
      var rlc = rl.camera();
      var rlv = rlc.projection();
      var l = o.directionalLight();
      l._resource = rl;
      var lc = l._camera;
      var lp = lc._projection;
      lc.position().set(1, 1, -1);
      lc.lookAt(0, 0, 0);
      lc.position().assign(rlc.position());
      lc.update();
      lp.size().set(1024, 1024);
      lp._angle = 60;
      lp._znear = rlv.znear();
      lp._zfar = rlv.zfar();
      lp.update();
   }
   MO.FE3dScene_loadDisplayResource = function FE3dScene_loadDisplayResource(layer, resource){
      var o = this;
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(o);
      display.loadResource(resource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      layer.pushDisplay(display);
   }
   MO.FE3dScene_loadLayerResource = function FE3dScene_loadLayerResource(resource){
      var o = this;
      var layer = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneLayer);
      layer.loadResource(resource);
      var displays = resource.displays();
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            o.loadDisplayResource(layer, display);
         }
      }
      o.registerLayer(resource.code(), layer)
   }
   MO.FE3dScene_loadResource = function FE3dScene_loadResource(p){
      var o = this;
      o.selectTechnique(o, FE3dGeneralTechnique);
      o.loadTechniqueResource(p.technique());
      o.loadRegionResource(p.region());
      var layers = p.layers();
      if(layers){
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            o.loadLayerResource(layer);
         }
      }
   }
   MO.FE3dScene_testReady = function FE3dScene_testReady(){
      return this._ready;
   }
   MO.FE3dScene_dirty = function FE3dScene_dirty(){
      this._dirty = true;
   }
   MO.FE3dScene_processLoad = function FE3dScene_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._ready = true;
      o.processLoadListener(o);
      return true;
   }
   MO.FE3dScene_active = function FE3dScene_active(){
      var o = this;
      o.__base.FE3dSpace.active.call(o);
   }
   MO.FE3dScene_deactive = function FE3dScene_deactive(){
      var o = this;
      o.__base.FE3dSpace.deactive.call(o);
   }
}
with(MO){
   MO.FE3dSceneAnimation = function FE3dSceneAnimation(o){
      o = RClass.inherits(this, o, FE3dAnimation);
      o._animation        = null;
      o._activeClip       = null;
      o._clips            = null;
      o.clips             = FE3dSceneAnimation_clips;
      o.pushClip          = FE3dSceneAnimation_pushClip;
      o.record            = RMethod.empty;
      o.process           = RMethod.empty;
      o.selectClip        = FE3dSceneAnimation_selectClip;
      o.loadAnimation     = FE3dSceneAnimation_loadAnimation;
      o.loadSceneResource = FE3dSceneAnimation_loadSceneResource;
      o.reloadResource    = FE3dSceneAnimation_reloadResource;
      return o;
   }
   MO.FE3dSceneAnimation_clips = function FE3dSceneAnimation_clips(){
      return this._clips;
   }
   MO.FE3dSceneAnimation_pushClip = function FE3dSceneAnimation_pushClip(clip){
      var o = this;
      var clips = o._clips;
      if(!clips){
         clips = o._clips = new TDictionary();
      }
      clips.set(clip.code(), clip);
   }
   MO.FE3dSceneAnimation_selectClip = function FE3dSceneAnimation_selectClip(code){
      var o = this;
      var clip = o._clips.get(code);
      if(o._activeClip == clip){
         return;
      }
      var info = o._animation._playInfo;
      info.beginIndex = clip.beginIndex();
      info.endIndex = clip.endIndex();
      info.frameCount = info.endIndex - info.beginIndex + 1;
      o._animation._playRate = clip.playRate();
      o._activeClip = clip;
   }
   MO.FE3dSceneAnimation_loadAnimation = function FE3dSceneAnimation_loadAnimation(animation){
      var o = this;
      o._animation = animation;
   }
   MO.FE3dSceneAnimation_loadSceneResource = function FE3dSceneAnimation_loadSceneResource(resource){
      var o = this;
      o._resource = resource;
   }
   MO.FE3dSceneAnimation_reloadResource = function FE3dSceneAnimation_reloadResource(){
      var o = this;
      var resource = o._resource;
      var animation = o._animation;
      animation._playRate = resource._playRate;
   }
}
with(MO){
   MO.FE3dSceneAnimationClip = function FE3dSceneAnimationClip(o){
      o = RClass.inherits(this, o, FObject, MAttributeCode);
      o._animation  = null;
      o._beginIndex = 0;
      o._endIndex   = 0;
      o._playRate   = 1;
      o.beginIndex  = FE3dSceneAnimationClip_beginIndex;
      o.endIndex    = FE3dSceneAnimationClip_endIndex;
      o.setRange    = FE3dSceneAnimationClip_setRange;
      o.playRate    = FE3dSceneAnimationClip_playRate;
      o.setPlayRate = FE3dSceneAnimationClip_setPlayRate;
      return o;
   }
   MO.FE3dSceneAnimationClip_beginIndex = function FE3dSceneAnimationClip_beginIndex(){
      return this._beginIndex;
   }
   MO.FE3dSceneAnimationClip_endIndex = function FE3dSceneAnimationClip_endIndex(){
      return this._endIndex;
   }
   MO.FE3dSceneAnimationClip_setRange = function FE3dSceneAnimationClip_setRange(beginIndex, endIndex){
      var o = this;
      o._beginIndex = beginIndex;
      o._endIndex = endIndex;
   }
   MO.FE3dSceneAnimationClip_playRate = function FE3dSceneAnimationClip_playRate(){
      return this._playRate;
   }
   MO.FE3dSceneAnimationClip_setPlayRate = function FE3dSceneAnimationClip_setPlayRate(rate){
      this._playRate = rate;
   }
}
with(MO){
   MO.FE3dSceneCanvas = function FE3dSceneCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeSpace           = null;
      o._captureStatus         = false;
      o._capturePosition       = null;
      o._captureCameraPosition = null;
      o._captureCameraRotation = null;
      o._actionFullScreen      = false;
      o._actionPlay            = false;
      o._actionMovie           = false;
      o._actionUp              = false;
      o._actionDown            = false;
      o._actionForward         = false;
      o._actionBack            = false;
      o._cameraMoveRate        = 0.4;
      o._cameraKeyRotation     = 0.03;
      o._cameraMouseRotation   = 0.005;
      o._touchTracker          = null;
      o.onEnterFrame           = FE3dSceneCanvas_onEnterFrame;
      o.onMouseCaptureStart    = FE3dSceneCanvas_onMouseCaptureStart;
      o.onMouseCapture         = FE3dSceneCanvas_onMouseCapture;
      o.onMouseCaptureStop     = FE3dSceneCanvas_onMouseCaptureStop;
      o.onTouchStart           = FE3dSceneCanvas_onTouchStart;
      o.onTouchMove            = FE3dSceneCanvas_onTouchMove;
      o.onTouchStop            = FE3dSceneCanvas_onTouchStop;
      o.onTouchZoom            = FE3dSceneCanvas_onTouchZoom;
      o.onDataLoaded           = FE3dSceneCanvas_onDataLoaded;
      o.onResize               = FE3dSceneCanvas_onResize;
      o.construct              = FE3dSceneCanvas_construct;
      o.testPlay               = FE3dSceneCanvas_testPlay;
      o.switchPlay             = FE3dSceneCanvas_switchPlay;
      o.testMovie              = FE3dSceneCanvas_testMovie;
      o.switchMovie            = FE3dSceneCanvas_switchMovie;
      o.doAction               = FE3dSceneCanvas_doAction;
      o.loadByGuid             = FE3dSceneCanvas_loadByGuid;
      o.loadByCode             = FE3dSceneCanvas_loadByCode;
      o.dispose                = FE3dSceneCanvas_dispose;
      return o;
   }
   MO.FE3dSceneCanvas_onEnterFrame = function FE3dSceneCanvas_onEnterFrame(){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var timer = space.timer();
      var span = timer.spanSecond();
      var camera = space.camera();
      var distance = o._cameraMoveRate * span;
      var rotation = o._cameraKeyRotation * span;
      var keyForward = RKeyboard.isPress(EStageKey.Forward);
      var keyBack = RKeyboard.isPress(EStageKey.Back);
      if((keyForward && !keyBack) || o._actionForward){
         camera.doWalk(distance);
      }
      if((!keyForward && keyBack) || o._actionBack){
         camera.doWalk(-distance);
      }
      var keyUp = RKeyboard.isPress(EStageKey.Up);
      var keyDown = RKeyboard.isPress(EStageKey.Down);
      if((keyUp && !keyDown) || o._actionUp){
         camera.doFly(distance);
      }
      if((!keyUp && keyDown) || o._actionDown){
         camera.doFly(-distance);
      }
      var keyLeft = RKeyboard.isPress(EStageKey.RotationLeft);
      var keyRight = RKeyboard.isPress(EStageKey.RotationRight);
      if(keyLeft && !keyRight){
         camera.doYaw(rotation);
      }
      if(!keyLeft && keyRight){
         camera.doYaw(-rotation);
      }
      var keyRotationUp = RKeyboard.isPress(EStageKey.RotationUp);
      var keyRotationDown = RKeyboard.isPress(EStageKey.RotationDown);
      if(keyRotationUp && !keyRotationDown){
         camera.doPitch(rotation);
      }
      if(!keyRotationUp && keyRotationDown){
         camera.doPitch(-rotation);
      }
      camera.update();
      if(o._optionRotation){
         var rotation = o._rotation;
         var layers = space.layers();
         var count = layers.count();
         for(var i = 0; i < count; i++){
            var layer = layers.at(i);
            var matrix = layer.matrix();
            matrix.setRotation(0, rotation.y, 0);
            matrix.update();
         }
         rotation.y += 0.01;
      }
   }
   MO.FE3dSceneCanvas_onMouseCaptureStart = function FE3dSceneCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureCameraRotation.assign(s.camera()._rotation);
   }
   MO.FE3dSceneCanvas_onMouseCapture = function FE3dSceneCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeSpace.camera();
      var r = c.rotation();
      var cr = o._captureCameraRotation;
      r.x = cr.x + cy * o._cameraMouseRotation;
      r.y = cr.y + cx * o._cameraMouseRotation;
   }
   MO.FE3dSceneCanvas_onMouseCaptureStop = function FE3dSceneCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dSceneCanvas_onTouchStart = function FE3dSceneCanvas_onTouchStart(event){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var ts = event.touches;
      var c = ts.length;
      if(c == 1){
         event.preventDefault();
         var t = ts[0];
         o._captureStatus = true;
         o._capturePosition.set(t.clientX, t.clientY);
         o._captureCameraPosition.assign(s.camera().position());
         o._captureCameraRotation.assign(s.camera().rotation());
      }else{
         o._touchTracker.eventStart(event);
      }
   }
   MO.FE3dSceneCanvas_onTouchMove = function FE3dSceneCanvas_onTouchMove(event){
      var o = this;
      if(!o._captureStatus){
         return;
      }
      var touchs = event.touches;
      var touchCount = touchs.length;
      if(touchCount == 1){
         event.preventDefault();
         var t = touchs[0];
         var cm = o._activeSpace.camera();
         var cr = cm.rotation();
         var cx = t.clientX - o._capturePosition.x;
         var cy = t.clientY - o._capturePosition.y;
         cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
         cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
      }else if(touchCount > 1){
         o._touchTracker.eventMove(event);
      }
   }
   MO.FE3dSceneCanvas_onTouchStop = function FE3dSceneCanvas_onTouchStop(event){
      var o = this;
      o._touchTracker.eventStop(event);
      o._captureStatus = false;
   }
   MO.FE3dSceneCanvas_onTouchZoom = function FE3dSceneCanvas_onTouchZoom(event){
      var o = this;
      var delta = event.delta;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var camera = space.camera();
      camera.doForward(delta * 0.006);
   }
   MO.FE3dSceneCanvas_onDataLoaded = function FE3dSceneCanvas_onDataLoaded(event){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeSpace;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      var gr = s._region._resource;
      o._cameraMoveRate = gr.moveSpeed();
      o._cameraKeyRotation = gr.rotationKeySpeed();
      o._cameraMouseRotation = gr.rotationMouseSpeed();
      var event = new SEvent(o);
      event.space = s;
      o.processLoadListener(event);
      event.dispose();
   }
   MO.FE3dSceneCanvas_onResize = function FE3dSceneCanvas_onResize(event){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dSceneCanvas_construct = function FE3dSceneCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureCameraPosition = new SPoint3();
      o._captureCameraRotation = new SVector3();
      o._touchTracker = RClass.create(FTouchTracker);
      o._touchTracker.addTouchZoomListener(o, o.onTouchZoom);
   }
   MO.FE3dSceneCanvas_testPlay = function FE3dSceneCanvas_testPlay(){
      return this._actionPlay;
   }
   MO.FE3dSceneCanvas_switchPlay = function FE3dSceneCanvas_switchPlay(flag){
      var o = this;
      var space = o._activeSpace;
      var displays = space.allDisplays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(RClass.isClass(display, FE3dSceneDisplay)){
            var sprite = display._sprite;
            if(sprite){
               sprite._optionPlay = flag;
            }
            display._optionPlay = flag;
         }
      }
      o._actionPlay = flag;
   }
   MO.FE3dSceneCanvas_testMovie = function FE3dSceneCanvas_testMovie(){
      return this._actionMovie;
   }
   MO.FE3dSceneCanvas_switchMovie = function FE3dSceneCanvas_switchMovie(p){
      var o = this;
      var s = o._activeSpace;
      var ds = s.allDisplays();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         if(d._movies){
            d._optionMovie = p;
         }
      }
      o._actionMovie = p;
   }
   MO.FE3dSceneCanvas_doAction = function FE3dSceneCanvas_doAction(e, p, f){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      e.preventDefault();
      o._actionUp = false;
      o._actionDown = false;
      o._actionForward = false;
      o._actionBack = false;
      switch(p){
         case 'fullscreen':
            var v = o._actionFullScreen = !o._actionFullScreen;
            RHtml.fullscreen(o._hPanel, v);
            break;
         case 'play':
            o.switchMovie(!o._actionMovie);
            o.switchPlay(o._actionMovie);
            break;
         case 'up':
            o._actionUp = f;
            break;
         case 'down':
            o._actionDown = f;
            break;
         case 'forward':
            o._actionForward = f;
            break;
         case 'back':
            o._actionBack = f;
            break;
      }
   }
   MO.FE3dSceneCanvas_loadByGuid = function FE3dSceneCanvas_loadByGuid(guid){
      var o = this;
      var sceneConsole = RConsole.find(FE3dSceneConsole);
      if(o._activeSpace){
         sceneConsole.free(o._activeSpace);
      }
      var scene = o._activeSpace = sceneConsole.allocByGuid(o._graphicContext, guid);
      scene.addLoadListener(o, o.onDataLoaded);
      RStage.register('canvas.space', scene);
   }
   MO.FE3dSceneCanvas_loadByCode = function FE3dSceneCanvas_loadByCode(code){
      var o = this;
      var sceneConsole = RConsole.find(FE3dSceneConsole);
      if(o._activeSpace){
         sceneConsole.free(o._activeSpace);
      }
      var scene = o._activeSpace = sceneConsole.allocByCode(o._graphicContext, code);
      scene.addLoadListener(o, o.onDataLoaded);
      RStage.register('canvas.space', scene);
   }
   MO.FE3dSceneCanvas_dispose = function FE3dSceneCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSceneConsole = function FE3dSceneConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._loadDisplays = null;
      o._loadScenes   = null;
      o._pools        = null;
      o._thread       = null;
      o._interval     = 100;
      o.onProcess     = FE3dSceneConsole_onProcess;
      o.construct     = FE3dSceneConsole_construct;
      o.scenes        = FE3dSceneConsole_scenes;
      o.loadDisplay   = FE3dSceneConsole_loadDisplay;
      o.allocByGuid   = FE3dSceneConsole_allocByGuid;
      o.allocByCode   = FE3dSceneConsole_allocByCode;
      o.free          = FE3dSceneConsole_free;
      return o;
   }
   MO.FE3dSceneConsole_onProcess = function FE3dSceneConsole_onProcess(){
      var o = this;
      var displays = o._loadDisplays;
      displays.record();
      while(displays.next()){
         var display = displays.current();
         if(display.processLoad()){
            displays.removeCurrent();
         }
      }
      var scenes = o._loadScenes;
      scenes.record();
      while(scenes.next()){
         var scene = scenes.current();
         if(scene.processLoad()){
            scenes.removeCurrent();
         }
      }
   }
   MO.FE3dSceneConsole_construct = function FE3dSceneConsole_construct(){
      var o = this;
      o._loadDisplays = new TLooper();
      o._loadScenes = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3dSceneConsole_scenes = function FE3dSceneConsole_scenes(){
      return this._scenes;
   }
   MO.FE3dSceneConsole_loadDisplay = function FE3dSceneConsole_loadDisplay(display){
      this._loadDisplays.push(display);
   }
   MO.FE3dSceneConsole_allocByGuid = function FE3dSceneConsole_allocByGuid(context, guid){
      var o = this;
      var scene = o._pools.alloc(guid);
      if(scene){
         return scene;
      }
      var resource = RConsole.find(FE3sSceneConsole).loadByGuid(guid);
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = guid;
      scene.setup();
      o._loadScenes.push(scene);
      return scene;
   }
   MO.FE3dSceneConsole_allocByCode = function FE3dSceneConsole_allocByCode(context, code){
      var o = this;
      var scene = o._pools.alloc(code);
      if(scene){
         return scene;
      }
      var resource = RConsole.find(FE3sSceneConsole).loadByCode(code);
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = code;
      scene.setup();
      o._loadScenes.push(scene);
      return scene;
   }
   MO.FE3dSceneConsole_free = function FE3dSceneConsole_free(scene){
      var o = this;
      var code = scene._poolCode;
      o._pools.free(code, scene);
   }
}
with(MO){
   MO.FE3dSceneDisplay = function FE3dSceneDisplay(o){
      o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
      o._dataReady        = false;
      o._optionPlay       = false;
      o._optionMovie      = false;
      o._movieMatrix      = null;
      o._resource         = null;
      o._materials        = null;
      o._parentMaterials  = null;
      o._template         = null;
      o._sprite           = null;
      o.construct         = FE3dSceneDisplay_construct;
      o.calculateOutline  = FE3dSceneDisplay_calculateOutline;
      o.meshRenderables   = FE3dSceneDisplay_meshRenderables;
      o.loadResource      = FE3dSceneDisplay_loadResource;
      o.loadTemplate      = FE3dSceneDisplay_loadTemplate;
      o.processLoad       = FE3dSceneDisplay_processLoad;
      o.clone             = FE3dSceneDisplay_clone;
      return o;
   }
   MO.FE3dSceneDisplay_construct = function FE3dSceneDisplay_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._movieMatrix = new SMatrix3d();
   }
   MO.FE3dSceneDisplay_calculateOutline = function FE3dSceneDisplay_calculateOutline(){
      return this._sprite.calculateOutline();
   }
   MO.FE3dSceneDisplay_meshRenderables = function FE3dSceneDisplay_meshRenderables(){
      var o = this;
      var sprite = o._template.sprite();
      return sprite.meshRenderables();
   }
   MO.FE3dSceneDisplay_loadResource = function FE3dSceneDisplay_loadResource(resource){
      var o = this;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      o._resource = resource;
      o._code = resource.code();
      o._matrix.assign(resource.matrix());
      var movieResources = resource.movies();
      if(movieResources){
         var movieCount = movieResources.count();
         for(var i = 0; i < movieCount; i++){
            var movieResource = movieResources.at(i);
            var movie = instanceConsole.create(EE3dInstance.SceneMovie);
            movie.loadResource(movieResource);
            o.pushMovie(movie);
         }
      }
      var materialResources = resource.materials();
      if(materialResources){
         var materialCount = materialResources.count();
         var materials = o._materials = new TDictionary();
         var parentMaterials = o._parentMaterials = new TDictionary();
         for(var i = 0; i < materialCount; i++){
            var materialResource = materialResources.at(i);
            var material = instanceConsole.create(EE3dInstance.SceneMaterial);
            material._display = o;
            material.loadSceneResource(materialResource);
            materials.set(materialResource.guid(), material);
            parentMaterials.set(materialResource.parentGuid(), material);
         }
      }
      var templateGuid = resource.templateGuid();
      o._template = RConsole.find(FE3dTemplateConsole).allocByGuid(o, templateGuid);
   }
   MO.FE3dSceneDisplay_loadTemplate = function FE3dSceneDisplay_loadTemplate(template){
      var o = this;
      var resource = o._resource;
      var sprites = template._sprites;
      if(sprites){
         var optionPlay = o._optionPlay;
         var count = sprites.count();
         for(var i = 0; i < count; i++){
            var sprite = sprites.at(i);
            sprite._optionPlay = optionPlay;
            sprite.matrix().identity();
         }
      }
      var materials = o._materials;
      var parentMaterials = o._parentMaterials;
      var sprite = o._sprite = template.sprite();
      var renderables = sprite.renderables();
      var count = renderables.count();
      for(var n = 0; n < count; n++){
         var renderable = renderables.at(n);
         var material = renderable.material();
         var materialGuid = material.guid();
         if(parentMaterials){
            var displayMaterial = parentMaterials.get(materialGuid);
            if(displayMaterial){
               displayMaterial.loadParent(material);
               displayMaterial.reloadResource();
               renderable.setMaterial(displayMaterial);
            }
         }
      }
      o.pushDisplay(sprite);
      var animations = sprite.animations();
      if(animations){
         var animationCount = animations.count();
         for(var n = 0; n < animationCount; n++){
            var animation = animations.at(n);
            var animationResource = animation.resource();
            var animationGuid = animationResource.guid();
            var sceneAnimationResource = resource.findAnimation(animationGuid);
            if(!sceneAnimationResource){
               sceneAnimationResource = resource.syncAnimation(animationGuid);
               sceneAnimationResource._guid = animationResource._guid;
               sceneAnimationResource._code = animationResource._code;
               sceneAnimationResource._label = animationResource._label;
            }
            var sceneAnimation = RClass.create(FE3dSceneAnimation);
            sceneAnimation.loadAnimation(animation);
            sceneAnimation.loadSceneResource(sceneAnimationResource);
            sceneAnimation.reloadResource();
            o.pushAnimation(sceneAnimation);
         }
      }
   }
   MO.FE3dSceneDisplay_processLoad = function FE3dSceneDisplay_processLoad(){
      var o = this;
      if(o._ready){
         return true;
      }
      var template = o._template;
      if(!template.testReady()){
         return false;
      }
      o.loadTemplate(template);
      o._ready = true;
      o.processLoadListener(o);
      return true;
   }
   MO.FE3dSceneDisplay_clone = function FE3dSceneDisplay_clone(){
   }
}
with(MO){
   MO.FE3dSceneDisplayRenderable = function FE3dSceneDisplayRenderable(o){
      o = RClass.inherits(this, o, FE3dTemplateRenderable);
      o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
      o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
      return o;
   }
   MO.FE3dSceneDisplayRenderable_loadMaterial = function FE3dSceneDisplayRenderable_loadMaterial(material){
      var o = this;
      o._materialReference = material;
      o._material.calculate(material);
   }
   MO.FE3dSceneDisplayRenderable_reloadResource = function FE3dSceneDisplayRenderable_reloadResource(){
      var o = this;
      var material = o._material;
      material.calculate(o._materialReference);
      material.update();
   }
}
with(MO){
   MO.FE3dSceneLayer = function FE3dSceneLayer(o){
      o = RClass.inherits(this, o, FDisplayLayer, MLinkerResource);
      o.makeLabel    = FE3dSceneLayer_makeLabel;
      o.loadResource = FE3dSceneLayer_loadResource;
      o.process      = FE3dSceneLayer_process;
      return o;
   }
   MO.FE3dSceneLayer_makeLabel = function FE3dSceneLayer_makeLabel(){
      var o = this;
      var resource = o.resource();
      var code = resource.code();
      var label = resource.label();
      if(label){
         return code + '[' + label + ']';
      }
      return code;
   }
   MO.FE3dSceneLayer_loadResource = function FE3dSceneLayer_loadResource(p){
      var o = this;
      o._resource = p;
   }
   MO.FE3dSceneLayer_process = function FE3dSceneLayer_process(p){
      var o = this;
      o.__base.FDisplayLayer.process.call(o, p)
      var c = o._resource.transformCd();
      if(c){
         if(c == EDisplayTransform.CameraPosition){
            var cp = p.camera().position();
            o._matrix.setTranslate(cp.x, cp.y, cp.z);
            o._matrix.update();
         }
      }
   }
}
with(MO){
   MO.FE3dSceneMaterial = function FE3dSceneMaterial(o){
      o = RClass.inherits(this, o, FE3dMaterial);
      o._display          = null;
      o._parentMaterial   = null;
      o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
      o.reloadResource    = FE3dSceneMaterial_reloadResource;
      return o;
   }
   MO.FE3dSceneMaterial_loadSceneResource = function FE3dSceneMaterial_loadSceneResource(resource){
      var o = this;
      o._resource = resource;
      o.reloadResource();
   }
   MO.FE3dSceneMaterial_reloadResource = function FE3dSceneMaterial_reloadResource(){
      var o = this;
      o.calculate(o._resource);
      o.update();
   }
}
with(MO){
   MO.FE3dSceneRegion = function FE3dSceneRegion(o){
      o = RClass.inherits(this, o, FE3dRegion);
      o._resource      = null;
      o.construct      = FE3dSceneRegion_construct;
      o.resource       = FE3dSceneRegion_resource;
      o.loadResource   = FE3dSceneRegion_loadResource;
      o.reloadResource = FE3dSceneRegion_reloadResource;
      o.dispose        = FE3dSceneRegion_dispose;
      return o;
   }
   MO.FE3dSceneRegion_construct = function FE3dSceneRegion_construct(){
      var o = this;
      o.__base.FE3dRegion.construct.call(o);
   }
   MO.FE3dSceneRegion_resource = function FE3dSceneRegion_resource(){
      return this._resource;
   }
   MO.FE3dSceneRegion_loadResource = function FE3dSceneRegion_loadResource(p){
      var o = this;
      o._resource = p;
      o.reloadResource();
   }
   MO.FE3dSceneRegion_reloadResource = function FE3dSceneRegion_reloadResource(){
      var o = this;
      var r = o._resource;
      var f = r.optionBackground();
      if(f){
         o._backgroundColor.assignPower(r.backgroundColor());
         o._backgroundColor.alpha = 1;
      }else{
         o._backgroundColor.set(0, 0, 0, 0);
      }
   }
   MO.FE3dSceneRegion_dispose = function FE3dSceneRegion_dispose(){
      var o = this;
      o._resource = null;
      o.__base.FE3dRegion.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSimpleCanvas = function FE3dSimpleCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeSpace           = null;
      o._captureStatus         = false;
      o._capturePosition       = null;
      o._captureCameraPosition = null;
      o._captureCameraRotation = null;
      o._actionFullScreen      = false;
      o._actionPlay            = false;
      o._actionMovie           = false;
      o._actionUp              = false;
      o._actionDown            = false;
      o._actionForward         = false;
      o._actionBack            = false;
      o._cameraMoveRate        = 0.4;
      o._cameraKeyRotation     = 0.03;
      o._cameraMouseRotation   = 0.005;
      o._stage                 = RClass.register(o, new AGetter('_stage'));
      o.onEnterFrame           = FE3dSimpleCanvas_onEnterFrame;
      o.onMouseCaptureStart    = FE3dSimpleCanvas_onMouseCaptureStart;
      o.onMouseCapture         = FE3dSimpleCanvas_onMouseCapture;
      o.onMouseCaptureStop     = FE3dSimpleCanvas_onMouseCaptureStop;
      o.onTouchStart           = FE3dSimpleCanvas_onTouchStart;
      o.onTouchMove            = FE3dSimpleCanvas_onTouchMove;
      o.onTouchStop            = FE3dSimpleCanvas_onTouchStop;
      o.onSceneLoad            = FE3dSimpleCanvas_onSceneLoad;
      o.onResize               = FE3dSimpleCanvas_onResize;
      o.construct              = FE3dSimpleCanvas_construct;
      o.build                  = FE3dSimpleCanvas_build;
      o.setPanel               = FE3dSimpleCanvas_setPanel;
      o.switchPlay             = FE3dSimpleCanvas_switchPlay;
      o.switchMovie            = FE3dSimpleCanvas_switchMovie;
      o.doAction               = FE3dSimpleCanvas_doAction;
      o.dispose                = FE3dSimpleCanvas_dispose;
      return o;
   }
   MO.FE3dSimpleCanvas_onEnterFrame = function FE3dSimpleCanvas_onEnterFrame(){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var c = s.camera();
      var d = o._cameraMoveRate;
      var r = o._cameraKeyRotation;
      var kw = RKeyboard.isPress(EKeyCode.W);
      var ks = RKeyboard.isPress(EKeyCode.S);
      if((kw && !ks) || o._actionForward){
         c.doWalk(d);
      }
      if((!kw && ks) || o._actionBack){
         c.doWalk(-d);
      }
      var ka = RKeyboard.isPress(EKeyCode.A);
      var kd = RKeyboard.isPress(EKeyCode.D);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      var kq = RKeyboard.isPress(EKeyCode.Q);
      var ke = RKeyboard.isPress(EKeyCode.E);
      if((kq && !ke) || o._actionUp){
         c.doFly(d);
      }
      if((!kq && ke) || o._actionDown){
         c.doFly(-d);
      }
      var kz = RKeyboard.isPress(EKeyCode.Z);
      var kw = RKeyboard.isPress(EKeyCode.X);
      if(kz && !kw){
         c.doPitch(r);
      }
      if(!kz && kw){
         c.doPitch(-r);
      }
      c.update();
      if(o._optionRotation){
         var r = o._rotation;
         var ls = s.layers();
         var c = ls.count();
         for(var i = 0; i < c; i++){
            var l = ls.value(i);
            var m = l.matrix();
            m.setRotation(0, r.y, 0);
            m.update();
         }
         r.y += 0.01;
      }
   }
   MO.FE3dSimpleCanvas_onMouseCaptureStart = function FE3dSimpleCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureCameraRotation.assign(s.camera()._rotation);
   }
   MO.FE3dSimpleCanvas_onMouseCapture = function FE3dSimpleCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeSpace.camera();
      var r = c.rotation();
      var cr = o._captureCameraRotation;
      r.x = cr.x + cy * o._cameraMouseRotation;
      r.y = cr.y + cx * o._cameraMouseRotation;
   }
   MO.FE3dSimpleCanvas_onMouseCaptureStop = function FE3dSimpleCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dSimpleCanvas_onTouchStart = function FE3dSimpleCanvas_onTouchStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var ts = p.touches;
      var c = ts.length;
      if(c == 1){
         p.preventDefault();
         var t = ts[0];
         o._captureStatus = true;
         o._capturePosition.set(t.clientX, t.clientY);
         o._captureCameraPosition.assign(s.camera().position());
         o._captureCameraRotation.assign(s.camera().rotation());
      }
   }
   MO.FE3dSimpleCanvas_onTouchMove = function FE3dSimpleCanvas_onTouchMove(p){
      var o = this;
      if(!o._captureStatus){
         return;
      }
      var ts = p.touches;
      var c = ts.length;
      if(c == 1){
         p.preventDefault();
         var t = ts[0];
         var cm = o._activeSpace.camera();
         var cr = cm.rotation();
         var cx = t.clientX - o._capturePosition.x;
         var cy = t.clientY - o._capturePosition.y;
         cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
         cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
      }
   }
   MO.FE3dSimpleCanvas_onTouchStop = function FE3dSimpleCanvas_onTouchStop(p){
      var o = this;
      o._captureStatus = false;
   }
   MO.FE3dSimpleCanvas_onSceneLoad = function FE3dSimpleCanvas_onSceneLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeSpace;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      var gr = s._region._resource;
      o._cameraMoveRate = gr.moveSpeed();
      o._cameraKeyRotation = gr.rotationKeySpeed();
      o._cameraMouseRotation = gr.rotationMouseSpeed();
      o.processLoadListener(o, s);
   }
   MO.FE3dSimpleCanvas_onResize = function FE3dSimpleCanvas_onResize(p){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, p);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dSimpleCanvas_construct = function FE3dSimpleCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureCameraPosition = new SPoint3();
      o._captureCameraRotation = new SVector3();
   }
   MO.FE3dSimpleCanvas_build = function FE3dSimpleCanvas_build(hPanel){
      var o = this;
      o.__base.FE3dCanvas.build.call(o, hPanel);
      var stage = o._stage = o._activeSpace = MO.RClass.create(MO.FE3dSimpleStage);
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      RStage.register('simple.stage', stage);
   }
   MO.FE3dSimpleCanvas_setPanel = function FE3dSimpleCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FE3dCanvas.setPanel.call(o, hPanel);
      var stage = o._stage;
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   MO.FE3dSimpleCanvas_switchPlay = function FE3dSimpleCanvas_switchPlay(p){
      var o = this;
      var s = o._activeSpace;
      var ds = s.allDisplays();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         if(d._movies){
            d._optionPlay = p;
         }
      }
      o._actionPlay = p;
   }
   MO.FE3dSimpleCanvas_switchMovie = function FE3dSimpleCanvas_switchMovie(p){
      var o = this;
      var s = o._activeSpace;
      var ds = s.allDisplays();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         if(d._movies){
            d._optionMovie = p;
         }
      }
      o._actionMovie = p;
   }
   MO.FE3dSimpleCanvas_doAction = function FE3dSimpleCanvas_doAction(e, p, f){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      e.preventDefault();
      o._actionUp = false;
      o._actionDown = false;
      o._actionForward = false;
      o._actionBack = false;
      switch(p){
         case 'fullscreen':
            var v = o._actionFullScreen = !o._actionFullScreen;
            RHtml.fullscreen(o._hPanel, v);
            break;
         case 'play':
            o.switchMovie(!o._actionMovie);
            o.switchPlay(o._actionMovie);
            break;
         case 'up':
            o._actionUp = f;
            break;
         case 'down':
            o._actionDown = f;
            break;
         case 'forward':
            o._actionForward = f;
            break;
         case 'back':
            o._actionBack = f;
            break;
      }
   }
   MO.FE3dSimpleCanvas_dispose = function FE3dSimpleCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
MO.FE3dSimpleStage = function FE3dSimpleStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._optionKeyboard = true;
   o._skyLayer       = MO.RClass.register(o, new MO.AGetter('_skyLayer'));
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._spriteLayer    = MO.RClass.register(o, new MO.AGetter('_spriteLayer'));
   o._faceLayer      = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   o.construct       = MO.FE3dSimpleStage_construct;
   o.active          = MO.FE3dSimpleStage_active;
   o.deactive        = MO.FE3dSimpleStage_deactive;
   return o;
}
MO.FE3dSimpleStage_construct = function FE3dSimpleStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._skyLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('SkyLayer', layer);
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('MapLayer', layer);
   var layer = o._spriteLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('SpriteLayer', layer);
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('FaceLayer', layer);
}
MO.FE3dSimpleStage_active = function FE3dSimpleStage_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
MO.FE3dSimpleStage_deactive = function FE3dSimpleStage_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
with(MO){
   MO.FE3dSpace = function FE3dSpace(o){
      o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
      o._dataReady            = false;
      o._resource             = RClass.register(o, new AGetSet('_resource'));
      o._materials            = RClass.register(o, new AGetter('_materials'));
      o._dirty                = false;
      o.onProcess             = FE3dSpace_onProcess;
      o.construct             = FE3dSpace_construct;
      o.linkGraphicContext    = FE3dSpace_linkGraphicContext;
      o.createRegion          = FE3dSpace_createRegion;
      o.findMaterial          = FE3dSpace_findMaterial;
      o.loadTechniqueResource = FE3dSpace_loadTechniqueResource;
      o.loadRegionResource    = FE3dSpace_loadRegionResource;
      o.loadDisplayResource   = FE3dSpace_loadDisplayResource;
      o.loadLayerResource     = FE3dSpace_loadLayerResource;
      o.loadResource          = FE3dSpace_loadResource;
      o.commitResource        = FE3dSpace_commitResource;
      o.dirty                 = FE3dSpace_dirty;
      o.processLoad           = FE3dSpace_processLoad;
      o.active                = FE3dSpace_active;
      o.deactive              = FE3dSpace_deactive;
      return o;
   }
   MO.FE3dSpace_onProcess = function FE3dSpace_onProcess(){
      var o = this;
      o.__base.FE3dStage.onProcess.call(o);
      if(o._dirty){
         var renderables = o._region.allRenderables();
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            renderable.resetInfos();
         }
         o._dirty = false;
      }
   }
   MO.FE3dSpace_construct = function FE3dSpace_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      o._materials = new TDictionary();
   }
   MO.FE3dSpace_linkGraphicContext = function FE3dSpace_linkGraphicContext(context){
      var o = this;
      o.__base.FE3dStage.linkGraphicContext.call(o, context);
      o._region.linkGraphicContext(context);
   }
   MO.FE3dSpace_createRegion = function FE3dSpace_createRegion(){
      return RClass.create(FE3dRegion);
   }
   MO.FE3dSpace_findMaterial = function FE3dSpace_findMaterial(guid){
      return this._materials.get(guid);
   }
   MO.FE3dSpace_loadTechniqueResource = function FE3dSpace_loadTechniqueResource(resource){
      var o = this;
      o._technique._resource = resource;
   }
   MO.FE3dSpace_loadRegionResource = function FE3dSpace_loadRegionResource(p){
      var o = this;
      o._region.loadResource(p);
      var rc = p.camera();
      var rcv = rc.projection();
      var camera = o.camera();
      camera.projection().size().assign(o._graphicContext.size());
      camera.loadResource(rc);
      var rl = p.light();
      var rlc = rl.camera();
      var rlv = rlc.projection();
      var l = o.directionalLight();
      l._resource = rl;
      var lc = l._camera;
      var lp = lc._projection;
      lc.position().set(1, 1, -1);
      lc.lookAt(0, 0, 0);
      lc.position().assign(rlc.position());
      lc.update();
      lp.size().set(1024, 1024);
      lp._angle = 60;
      lp._znear = rlv.znear();
      lp._zfar = rlv.zfar();
      lp.update();
   }
   MO.FE3dSpace_loadDisplayResource = function FE3dSpace_loadDisplayResource(pl, pd){
      var o = this;
      var d3 = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Display);
      d3.linkGraphicContext(o);
      d3.loadSceneResource(pd);
      RConsole.find(FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
      pl.pushDisplay(d3);
   }
   MO.FE3dSpace_loadLayerResource = function FE3dSpace_loadLayerResource(p){
      var o = this;
      var l = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Layer);
      l.loadResource(p);
      var s = p.displays();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var d = s.get(i);
            o.loadDisplayResource(l, d);
         }
      }
      o.registerLayer(p.code(), l)
   }
   MO.FE3dSpace_loadResource = function FE3dSpace_loadResource(resource){
      var o = this;
      o._resource = resource;
      o.loadTechniqueResource(resource.technique());
      o.loadRegionResource(resource.region());
      var materialResources = resource.materials();
      if(materialResources){
         var materialCount = materialResources.count();
         var materialConsole = RConsole.find(FE3rMaterialConsole);
         for(var i = 0; i < materialCount; i++){
            var materialResource = materialResources.at(i);
            var materialGuid = materialResource.guid();
            var material = materialConsole.load(o, materialGuid);
            o._materials.set(materialGuid, material);
         }
      }
      var layers = resource.layers();
      if(layers){
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            o.loadLayerResource(layer);
         }
      }
   }
   MO.FE3dSpace_commitResource = function FE3dSpace_commitResource(){
      var o = this;
      var camera = o._region.camera();
      camera.commitResource();
   }
   MO.FE3dSpace_dirty = function FE3dSpace_dirty(){
      this._dirty = true;
   }
   MO.FE3dSpace_processLoad = function FE3dSpace_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o.processLoadListener(o);
      return true;
   }
   MO.FE3dSpace_active = function FE3dSpace_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FE3dSpace_deactive = function FE3dSpace_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
with(MO){
   MO.FE3dSprite = function FE3dSprite(o){
      o = RClass.inherits(this, o, FE3dDisplayContainer, MGraphicObject, MLinkerResource);
      o._dataReady       = false;
      o._ready           = false;
      o._shapes          = null;
      o._skeletons       = null;
      o._animations      = null;
      o._movies          = null;
      o._resource        = null;
      o.construct        = FE3dSprite_construct;
      o.testReady        = FE3dSprite_testReady;
      o.makeLabel        = FE3dSprite_makeLabel;
      o.findMeshByCode   = FE3dSprite_findMeshByCode;
      o.meshRenderables  = FE3dSprite_shapes;
      o.skeletons        = FE3dSprite_skeletons;
      o.pushSkeleton     = FE3dSprite_pushSkeleton;
      o.findAnimation    = FE3dSprite_findAnimation;
      o.animations       = FE3dSprite_animations;
      o.pushAnimation    = FE3dSprite_pushAnimation;
      o.movies           = FE3dSprite_movies;
      o.pushMovie        = FE3dSprite_pushMovie;
      o.loadSkeletons    = FE3dSprite_loadSkeletons;
      o.linkAnimation    = FE3dSprite_linkAnimation;
      o.loadAnimations   = FE3dSprite_loadAnimations;
      o.loadResource     = FE3dSprite_loadResource;
      o.reloadResource   = FE3dSprite_reloadResource;
      o.load             = FE3dSprite_load;
      o.updateMatrix     = FE3dSprite_updateMatrix;
      o.selectClip       = FE3dSprite_selectClip;
      o.process          = FE3dSprite_process;
      o.dispose          = FE3dSprite_dispose;
      return o;
   }
   MO.FE3dSprite_construct = function FE3dSprite_construct(){
      var o = this;
      o.__base.FE3dDisplayContainer.construct.call(o);
      o._shapes = new TObjects();
   }
   MO.FE3dSprite_testReady = function FE3dSprite_testReady(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            if(!shape.testReady()){
               return false;
            }
         }
      }
      return true;
   }
   MO.FE3dSprite_makeLabel = function FE3dSprite_makeLabel(){
      var o = this;
      var resource = o.resource();
      var code = resource.code();
      var label = resource.label();
      if(label){
         return code + '[' + label + ']';
      }
      return code;
   }
   MO.FE3dSprite_findMeshByCode = function FE3dSprite_findMeshByCode(p){
      var s = this._shapes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dSprite_shapes = function FE3dSprite_shapes(){
      return this._shapes;
   }
   MO.FE3dSprite_skeletons = function FE3dSprite_skeletons(){
      return this._skeletons;
   }
   MO.FE3dSprite_pushSkeleton = function FE3dSprite_pushSkeleton(p){
      var o = this;
      var r = o._skeletons;
      if(!r){
         r = o._skeletons = new TDictionary();
      }
      if(!o._activeSkeleton){
         o._activeSkeleton = p;
      }
      r.set(p._resource.guid(), p);
   }
   MO.FE3dSprite_findAnimation = function FE3dSprite_findAnimation(guid){
      var animations = this._animations;
      return animations ? animations.get(guid) : null;
   }
   MO.FE3dSprite_animations = function FE3dSprite_animations(){
      return this._animations;
   }
   MO.FE3dSprite_pushAnimation = function FE3dSprite_pushAnimation(animation){
      var o = this;
      var animations = o._animations;
      if(!animations){
         animations = o._animations = new TDictionary();
      }
      var animationResource = animation.resource();
      animations.set(animationResource.guid(), animation);
   }
   MO.FE3dSprite_movies = function FE3dSprite_movies(){
      return this._movies;
   }
   MO.FE3dSprite_pushMovie = function FE3dSprite_pushMovie(movie){
      var o = this;
      var movies = o._movies;
      if(!movies){
         movies = o._movies = new TObjects();
      }
      movies.push(movie);
   }
   MO.FE3dSprite_loadSkeletons = function FE3dSprite_loadSkeletons(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         var ks = o.skeletons();
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var s = RClass.create(FE3rSkeleton);
            s.loadResource(r);
            o.pushSkeleton(s);
         }
      }
   }
   MO.FE3dSprite_linkAnimation = function FE3dSprite_linkAnimation(p){
      var o = this;
      var ts = p.tracks();
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.getAt(i);
         var mc = t._resource._meshCode;
         if(mc){
            var m = o.findMeshByCode(mc);
            m._activeTrack = t;
         }
      }
   }
   MO.FE3dSprite_loadAnimations = function FE3dSprite_loadAnimations(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var a = o.findAnimation(r.guid());
            if(a){
               continue;
            }
            var a = null;
            if(r.skeleton()){
               a = RClass.create(FE3rSkeletonAnimation);
            }else{
               a = RClass.create(FE3rMeshAnimation);
            }
            a._display = o;
            a.loadResource(r);
            o.pushAnimation(a);
         }
      }
   }
   MO.FE3dSprite_loadResource = function FE3dSprite_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
      var renderableResources = resource.renderables();
      var renderableCount = renderableResources.count();
      if(renderableCount > 0){
         var shapes = o._shapes;
         for(var i = 0; i < renderableCount; i++){
            var renderableResource = renderableResources.at(i);
            var renderable = RClass.create(FE3dTemplateRenderable);
            renderable._display = o;
            renderable.linkGraphicContext(o);
            renderable.loadResource(renderableResource);
            shapes.push(renderable);
            o.pushRenderable(renderable);
         }
      }
   }
   MO.FE3dSprite_reloadResource = function FE3dSprite_reloadResource(){
      var o = this;
      var s = o._shapes;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.getAt(i).reloadResource();
         }
      }
   }
   MO.FE3dSprite_load = function FE3dSprite_load(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            shapes.at(i).load();
         }
      }
   }
   MO.FE3dSprite_updateMatrix = function FE3dSprite_updateMatrix(region){
      var o = this;
      var matrix = o._currentMatrix.identity();
      var movies = o._movies;
      if(movies){
         if(o._optionMovie){
            var c = movies.count();
            for(var i = 0; i < c; i++){
               var movie = movies.at(i);
               movie.process(o._movieMatrix);
            }
         }
         matrix.append(o._movieMatrix);
      }
      matrix.append(o._matrix);
      var parent = o._parent;
      if(parent){
         o._currentMatrix.append(parent._currentMatrix);
      }
   }
   MO.FE3dSprite_selectClip = function FE3dSprite_selectClip(code){
      var o = this;
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.selectClip(code);
         }
      }
   }
   MO.FE3dSprite_process = function FE3dSprite_process(region){
      var o = this;
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.record();
         }
      }
      o.__base.FE3dDisplayContainer.process.call(o, region);
      var skeleton = o._activeSkeleton;
      if(skeleton && animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.process(skeleton);
         }
      }
   }
   MO.FE3dSprite_dispose = function FE3dSprite_dispose(){
      var o = this;
      o._shapes = RObject.dispose(o._shapes);
      o.__base.FE3dDisplayContainer.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplate = function FE3dTemplate(o){
      o = RClass.inherits(this, o, FE3dSpace, MGraphicObject, MListenerLoad);
      o._dataReady       = false;
      o._ready           = false;
      o._sprites         = RClass.register(o, new AGetter('_sprites'));
      o._skeletons       = RClass.register(o, new AGetter('_skeletons'));
      o._animations      = RClass.register(o, new AGetter('_animations'));
      o.construct        = FE3dTemplate_construct;
      o.testReady        = FE3dTemplate_testReady;
      o.sprite           = FE3dTemplate_sprite;
      o.findMeshByCode   = FE3dTemplate_findMeshByCode;
      o.meshRenderables  = FE3dTemplate_sprites;
      o.pushSkeleton     = FE3dTemplate_pushSkeleton;
      o.findAnimation    = FE3dTemplate_findAnimation;
      o.pushAnimation    = FE3dTemplate_pushAnimation;
      o.visible          = FE3dTemplate_visible;
      o.setVisible       = FE3dTemplate_setVisible;
      o.loadSkeletons    = FE3dTemplate_loadSkeletons;
      o.linkAnimation    = FE3dTemplate_linkAnimation;
      o.loadAnimations   = FE3dTemplate_loadAnimations;
      o.loadResource     = FE3dTemplate_loadResource;
      o.reloadResource   = FE3dTemplate_reloadResource;
      o.processLoad      = FE3dTemplate_processLoad;
      o.process          = FE3dTemplate_process;
      o.dispose          = FE3dTemplate_dispose;
      return o;
   }
   MO.FE3dTemplate_construct = function FE3dTemplate_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', layer);
      o._sprites = new TObjects();
   }
   MO.FE3dTemplate_testReady = function FE3dTemplate_testReady(){
      return this._ready;
   }
   MO.FE3dTemplate_sprite = function FE3dTemplate_sprite(){
      return this._sprites.first();
   }
   MO.FE3dTemplate_findMeshByCode = function FE3dTemplate_findMeshByCode(p){
      var s = this._sprites;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dTemplate_pushSkeleton = function FE3dTemplate_pushSkeleton(p){
      var o = this;
      var r = o._skeletons;
      if(!r){
         r = o._skeletons = new TDictionary();
      }
      if(!o._activeSkeleton){
         o._activeSkeleton = p;
      }
      r.set(p._resource.guid(), p);
   }
   MO.FE3dTemplate_sprites = function FE3dTemplate_sprites(){
      return this._sprites;
   }
   MO.FE3dTemplate_findAnimation = function FE3dTemplate_findAnimation(p){
      var s = this._animations;
      return s ? s.get(p) : null;
   }
   MO.FE3dTemplate_pushAnimation = function FE3dTemplate_pushAnimation(p){
      var o = this;
      var r = o._animations;
      if(!r){
         r = o._animations = new TDictionary();
      }
      var pr = p.resource();
      r.set(pr.guid(), p);
   }
   MO.FE3dTemplate_visible = function FE3dTemplate_visible(){
      return this.sprite().visible();
   }
   MO.FE3dTemplate_setVisible = function FE3dTemplate_setVisible(visible){
      this.sprite().setVisible(visible);
   }
   MO.FE3dTemplate_loadSkeletons = function FE3dTemplate_loadSkeletons(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         var ks = o.skeletons();
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var s = RClass.create(FE3rSkeleton);
            s.loadResource(r);
            o.pushSkeleton(s);
         }
      }
   }
   MO.FE3dTemplate_linkAnimation = function FE3dTemplate_linkAnimation(p){
      var o = this;
      var ts = p.tracks();
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.getAt(i);
         var mc = t._resource._meshCode;
         if(mc){
            var m = o.findMeshByCode(mc);
            m._activeTrack = t;
         }
      }
   }
   MO.FE3dTemplate_loadAnimations = function FE3dTemplate_loadAnimations(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var a = o.findAnimation(r.guid());
            if(a){
               continue;
            }
            var a = null;
            if(r.skeleton()){
               a = RClass.create(FE3rSkeletonAnimation);
            }else{
               a = RClass.create(FE3rMeshAnimation);
            }
            a._display = o;
            a.loadResource(r);
            o.pushAnimation(a);
         }
      }
   }
   MO.FE3dTemplate_loadResource = function FE3dTemplate_loadResource(resource){
      var o = this;
      var technique = o.selectTechnique(o, FE3dGeneralTechnique);
      technique.setResource(resource.technique());
      o.__base.FE3dSpace.loadResource.call(o, resource);
      var displayResources = resource.displays();
      if(displayResources){
         var displayCount = displayResources.count();
         if(displayCount > 0){
            for(var i = 0; i < displayCount; i++){
               var displayResource = displayResources.at(i);
               var display = RClass.create(FE3dTemplateDisplay);
               display._parent = o;
               display.linkGraphicContext(o);
               display.loadResource(displayResource);
               o._sprites.push(display);
            }
         }
      }
   }
   MO.FE3dTemplate_reloadResource = function FE3dTemplate_reloadResource(){
      var o = this;
      var sprites = o._sprites;
      if(sprites){
         var count = sprites.count();
         for(var i = 0; i < count; i++){
            var sprite = sprites.at(i);
            sprite.reloadResource();
         }
      }
   }
   MO.FE3dTemplate_processLoad = function FE3dTemplate_processLoad(){
      var o = this;
      if(o._ready){
         return true;
      }
      if(!o._dataReady){
         var resource = o._resource;
         if(!resource.testReady()){
            return false;
         }
         o.loadResource(resource);
         o._dataReady = true;
      }
      var sprites = o._sprites;
      if(sprites){
         var spriteCount = sprites.count();
         for(var i = 0; i < spriteCount; i++){
            var sprite = sprites.at(i);
            if(!sprite.testReady()){
               return false;
            }
         }
         for(var i = 0; i < spriteCount; i++){
            var sprite = sprites.at(i);
            sprite.load();
            o._layer.pushDisplay(sprite);
         }
      }
      var animations = o._animations;
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            if(animation.resource().skeleton() == null){
               o.linkAnimation(animation);
            }
         }
      }
      o._ready = true;
      var event = MO.Memory.alloc(SEvent);
      event.sender = o;
      event.template = o;
      o.processLoadListener(event);
      MO.Memory.free(event);
      return o._ready;
   }
   MO.FE3dTemplate_process = function FE3dTemplate_process(event){
      var o = this;
      o.__base.FE3dSpace.process.call(o);
   }
   MO.FE3dTemplate_dispose = function FE3dTemplate_dispose(){
      var o = this;
      o._sprites = RObject.dispose(o._sprites);
      o.__base.FE3dSpace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateCanvas = function FE3dTemplateCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeTemplate     = null;
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FE3dTemplateCanvas_onEnterFrame;
      o.onMouseCaptureStart = FE3dTemplateCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FE3dTemplateCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FE3dTemplateCanvas_onMouseCaptureStop;
      o.onResize            = FE3dTemplateCanvas_onResize;
      o.onTemplateLoad      = FE3dTemplateCanvas_onTemplateLoad;
      o.construct           = FE3dTemplateCanvas_construct;
      o.loadByGuid          = FE3dTemplateCanvas_loadByGuid;
      o.loadByCode          = FE3dTemplateCanvas_loadByCode;
      o.dispose             = FE3dTemplateCanvas_dispose;
      return o;
   }
   MO.FE3dTemplateCanvas_onEnterFrame = function FE3dTemplateCanvas_onEnterFrame(){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var c = s.camera();
      var d = 0.5;
      var r = 0.05;
      var kw = RKeyboard.isPress(EKeyCode.W);
      var ks = RKeyboard.isPress(EKeyCode.S);
      if(kw && !ks){
         c.doWalk(d);
      }
      if(!kw && ks){
         c.doWalk(-d);
      }
      var ka = RKeyboard.isPress(EKeyCode.A);
      var kd = RKeyboard.isPress(EKeyCode.D);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      var kq = RKeyboard.isPress(EKeyCode.Q);
      var ke = RKeyboard.isPress(EKeyCode.E);
      if(kq && !ke){
         c.doFly(d);
      }
      if(!kq && ke){
         c.doFly(-d);
      }
      var kz = RKeyboard.isPress(EKeyCode.Z);
      var kw = RKeyboard.isPress(EKeyCode.X);
      if(kz && !kw){
         c.doPitch(r);
      }
      if(!kz && kw){
         c.doPitch(-r);
      }
      c.update();
      if(o._optionRotation){
         var r = o._rotation;
         var ls = s.layers();
         var c = ls.count();
         for(var i = 0; i < c; i++){
            var l = ls.value(i);
            var m = l.matrix();
            m.setRotation(0, r.y, 0);
            m.update();
         }
         r.y += 0.01;
      }
   }
   MO.FE3dTemplateCanvas_onMouseCaptureStart = function FE3dTemplateCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var r = o._activeTemplate.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
   }
   MO.FE3dTemplateCanvas_onMouseCapture = function FE3dTemplateCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeTemplate.camera();
      var r = c.rotation();
      var cr = o._captureRotation;
      r.x = cr.x + cy * 0.003;
      r.y = cr.y + cx * 0.003;
   }
   MO.FE3dTemplateCanvas_onMouseCaptureStop = function FE3dTemplateCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dTemplateCanvas_onResize = function FE3dTemplateCanvas_onResize(){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dTemplateCanvas_onTemplateLoad = function FE3dTemplateCanvas_onTemplateLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeTemplate;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      o.processLoadListener(o, s);
   }
   MO.FE3dTemplateCanvas_construct = function FE3dTemplateCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
   }
   MO.FE3dTemplateCanvas_loadByGuid = function FE3dTemplateCanvas_loadByGuid(p){
      var o = this;
      var c = o._graphicContext;
      var sc = RConsole.find(FE3dSceneConsole);
      if(o._activeTemplate != null){
         sc.free(o._activeTemplate);
      }
      var s = sc.alloc(o, p);
      s.addLoadListener(o, o.onTemplateLoad);
      s.selectTechnique(c, FG3dGeneralTechnique);
      o._stage = o._activeTemplate = s;
      RStage.register('stage3d', s);
   }
   MO.FE3dTemplateCanvas_loadByCode = function FE3dTemplateCanvas_loadByCode(code){
      var o = this;
      var context = o._graphicContext;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(o._activeTemplate != null){
         templateConsole.free(o._activeTemplate);
      }
      var template = templateConsole.allocByCode(context, code);
      template.addLoadListener(o, o.onTemplateLoad);
      template.selectTechnique(context, FE3dGeneralTechnique);
      o._stage = o._activeTemplate = template;
      RStage.register('stage.template', template);
   }
   MO.FE3dTemplateCanvas_dispose = function FE3dTemplateCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateConsole = function FE3dTemplateConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._loadQueue  = null;
      o._pools      = null;
      o._thread     = null;
      o._interval   = 200;
      o.onProcess   = FE3dTemplateConsole_onProcess;
      o.construct   = FE3dTemplateConsole_construct;
      o.allocByGuid = FE3dTemplateConsole_allocByGuid;
      o.allocByCode = FE3dTemplateConsole_allocByCode;
      o.free        = FE3dTemplateConsole_free;
      return o;
   }
   MO.FE3dTemplateConsole_onProcess = function FE3dTemplateConsole_onProcess(){
      var o = this;
      var looper = o._loadQueue;
      looper.record();
      while(looper.next()){
         var template = looper.current();
         if(template.processLoad()){
            looper.removeCurrent();
         }
      }
   }
   MO.FE3dTemplateConsole_construct = function FE3dTemplateConsole_construct(){
      var o = this;
      o._loadQueue = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3dTemplateConsole_allocByGuid = function FE3dTemplateConsole_allocByGuid(context, guid){
      var o = this;
      var template = o._pools.alloc(guid);
      if(template){
         return template;
      }
      var resource = RConsole.find(FE3sTemplateConsole).loadByGuid(guid);
      template = RClass.create(FE3dTemplate);
      template.linkGraphicContext(context);
      template.setResource(resource);
      template._poolCode = guid;
      o._loadQueue.push(template);
      return template;
   }
   MO.FE3dTemplateConsole_allocByCode = function FE3dTemplateConsole_allocByCode(context, code){
      var o = this;
      var template = o._pools.alloc(code);
      if(template){
         return template;
      }
      var resource = RConsole.find(FE3sTemplateConsole).loadByCode(code);
      template = RClass.create(FE3dTemplate);
      template.linkGraphicContext(context);
      template.setResource(resource);
      template._poolCode = code;
      o._loadQueue.push(template);
      return template;
   }
   MO.FE3dTemplateConsole_free = function FE3dTemplateConsole_free(template){
      var o = this;
      var code = template._poolCode;
      o._pools.free(code, template);
   }
}
with(MO){
   MO.FE3dTemplateDisplay = function FE3dTemplateDisplay(o){
      o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
      o._dataReady       = false;
      o._ready           = false;
      o._shapes          = null;
      o._skeletons       = null;
      o.construct        = FE3dTemplateDisplay_construct;
      o.testReady        = FE3dTemplateDisplay_testReady;
      o.findMeshByCode   = FE3dTemplateDisplay_findMeshByCode;
      o.meshRenderables  = FE3dTemplateDisplay_shapes;
      o.skeletons        = FE3dTemplateDisplay_skeletons;
      o.pushSkeleton     = FE3dTemplateDisplay_pushSkeleton;
      o.loadSkeletons    = FE3dTemplateDisplay_loadSkeletons;
      o.linkAnimation    = FE3dTemplateDisplay_linkAnimation;
      o.loadAnimations   = FE3dTemplateDisplay_loadAnimations;
      o.loadResource     = FE3dTemplateDisplay_loadResource;
      o.reloadResource   = FE3dTemplateDisplay_reloadResource;
      o.load             = FE3dTemplateDisplay_load;
      o.dispose          = FE3dTemplateDisplay_dispose;
      return o;
   }
   MO.FE3dTemplateDisplay_construct = function FE3dTemplateDisplay_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._shapes = new TObjects();
   }
   MO.FE3dTemplateDisplay_testReady = function FE3dTemplateDisplay_testReady(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            if(!shape.testReady()){
               return false;
            }
         }
      }
      return true;
   }
   MO.FE3dTemplateDisplay_findMeshByCode = function FE3dTemplateDisplay_findMeshByCode(p){
      var s = this._shapes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dTemplateDisplay_shapes = function FE3dTemplateDisplay_shapes(){
      return this._shapes;
   }
   MO.FE3dTemplateDisplay_skeletons = function FE3dTemplateDisplay_skeletons(){
      return this._skeletons;
   }
   MO.FE3dTemplateDisplay_pushSkeleton = function FE3dTemplateDisplay_pushSkeleton(skeleton){
      var o = this;
      var resource = skeleton.resource();
      var skeletonGuid = resource.guid();
      var skeletons = o._skeletons;
      if(!skeletons){
         skeletons = o._skeletons = new TDictionary();
      }
      if(!o._activeSkeleton){
         o._activeSkeleton = skeleton;
      }
      skeletons.set(skeletonGuid, skeleton);
   }
   MO.FE3dTemplateDisplay_loadSkeletons = function FE3dTemplateDisplay_loadSkeletons(skeletonResources){
      var o = this;
      var count = skeletonResources.count();
      if(count > 0){
         for(var i = 0; i < count; i++){
            var skeletonResource = skeletonResources.at(i);
            var skeleton = RClass.create(FE3rSkeleton);
            skeleton.loadResource(skeletonResource);
            o.pushSkeleton(skeleton);
         }
      }
   }
   MO.FE3dTemplateDisplay_linkAnimation = function FE3dTemplateDisplay_linkAnimation(animation){
      var o = this;
      var tracks = animation.tracks();
      var count = tracks.count();
      for(var i = 0; i < count; i++){
         var track = tracks.at(i);
         var meshCode = track._resource._meshCode;
         if(meshCode){
            var mesh = o.findMeshByCode(meshCode);
            mesh._activeTrack = track;
         }
      }
   }
   MO.FE3dTemplateDisplay_loadAnimations = function FE3dTemplateDisplay_loadAnimations(animationResources){
      var o = this;
      var animationCount = animationResources.count();
      for(var i = 0; i < animationCount; i++){
         var animationResource = animationResources.at(i);
         var guid = animationResource.guid();
         var animation = o.findAnimation(guid);
         if(animation){
            continue;
         }
         if(animationResource.skeleton()){
            animation = RClass.create(FE3rSkeletonAnimation);
         }else{
            animation = RClass.create(FE3rMeshAnimation);
         }
         animation._display = o;
         animation.loadResource(animationResource);
         o.pushAnimation(animation);
      }
   }
   MO.FE3dTemplateDisplay_loadResource = function FE3dTemplateDisplay_loadResource(resource){
      var o = this;
      o._resource = resource;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      o._matrix.assign(resource.matrix());
      var renderableResources = resource.renderables();
      if(renderableResources){
         var shapes = o._shapes;
         var renderableCount = renderableResources.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableResource = renderableResources.at(i);
            var renderable = instanceConsole.create(EE3dInstance.TemplateRenderable);
            renderable._display = o;
            renderable.linkGraphicContext(o);
            renderable.loadResource(renderableResource);
            shapes.push(renderable);
            o.pushRenderable(renderable);
         }
      }
   }
   MO.FE3dTemplateDisplay_reloadResource = function FE3dTemplateDisplay_reloadResource(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var count = shapes.count();
         for(var i = 0; i < count; i++){
            var shape = shapes.at(i);
            shape.reloadResource();
         }
      }
   }
   MO.FE3dTemplateDisplay_load = function FE3dTemplateDisplay_load(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            shape.load();
         }
      }
      var animations = o._animations;
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            if(animation.resource().skeleton() == null){
               o.linkAnimation(animation);
            }
         }
      }
   }
   MO.FE3dTemplateDisplay_dispose = function FE3dTemplateDisplay_dispose(){
      var o = this;
      o._shapes = RObject.dispose(o._shapes);
      o.__base.FE3dSprite.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateRenderable = function FE3dTemplateRenderable(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable, MLinkerResource);
      o._ready            = false;
      o._model            = null;
      o._materialCode     = null;
      o._materialResource = null;
      o.construct         = FE3dTemplateRenderable_construct;
      o.testReady         = FE3dTemplateRenderable_testReady;
      o.testVisible       = FE3dTemplateRenderable_testVisible;
      o.calculateOutline  = FE3dTemplateRenderable_calculateOutline;
      o.loadResource      = FE3dTemplateRenderable_loadResource;
      o.reloadResource    = FE3dTemplateRenderable_reloadResource;
      o.load              = FE3dTemplateRenderable_load;
      o.dispose           = FE3dTemplateRenderable_dispose;
      return o;
   }
   MO.FE3dTemplateRenderable_construct = function FE3dTemplateRenderable_construct(){
      var o = this;
      o.__base.FE3dMeshRenderable.construct.call(o);
   }
   MO.FE3dTemplateRenderable_testReady = function FE3dTemplateRenderable_testReady(){
      var o = this;
      if(!o._ready){
         if(!o._model.testReady()){
            return false;
         }
         var materials = o._materials;
         if(materials){
            var count = materials.count();
            for(var i = 0; i < count; i++){
               var material = materials.at(i);
               if(material){
                  if(!material.testReady()){
                     return false;
                  }
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FE3dTemplateRenderable_testVisible = function FE3dTemplateRenderable_testVisible(p){
      var o = this;
      var result = false;
      if(o._ready){
         result = o.__base.FE3dMeshRenderable.testVisible.call(o);
      }
      return result;
   }
   MO.FE3dTemplateRenderable_calculateOutline = function FE3dTemplateRenderable_calculateOutline(flag){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty() || flag){
         var resource = o._resource
         var meshResource = resource.mesh();
         var meshOutline = meshResource.outline();
         outline.calculateFrom(meshOutline, o._currentMatrix);
      }
      return outline;
   }
   MO.FE3dTemplateRenderable_loadResource = function FE3dTemplateRenderable_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
      var modelGuid = resource.modelGuid();
      o._model = RConsole.find(FE3rModelConsole).load(o, modelGuid);
      var materialGuid = resource.materialGuid();
      if(!RString.isEmpty(materialGuid)){
         var material = o._material = o._materialReference = RConsole.find(FE3rMaterialConsole).load(o, materialGuid);
         o._materialResource = material.resource();
         o.pushMaterial(material);
      }
      var template = o._display._parent;
      var materialRefers = resource.materialRefers();
      if(materialRefers){
         var count = materialRefers.count();
         for(var i = 0; i < count; i++){
            var materialRefer = materialRefers.at(i);
            var materialGuid = materialRefer.guid();
            var material = template.findMaterial(materialGuid);
            o.pushMaterial(material);
            o._material = material;
         }
      }
      if(!o._material){
         o._material = o._materialReference = RClass.create(FE3dMaterial);
      }
   }
   MO.FE3dTemplateRenderable_reloadResource = function FE3dTemplateRenderable_reloadResource(){
      var o = this;
      var material = o._material;
      material.calculate(o._materialResource);
      material.update();
   }
   MO.FE3dTemplateRenderable_load = function FE3dTemplateRenderable_load(){
      var o = this;
      var display = o._display;
      var resource = o._resource;
      var modelResource = resource.model();
      var bitmaps = o._material.bitmaps();
      if(bitmaps){
         var count = bitmaps.count();
         for(var i = 0; i < count; i++){
            var bitmap = bitmaps.at(i);
            o.pushTexture(bitmap);
         }
      }
      var skeletonResources = modelResource.skeletons();
      if(skeletonResources){
         display.loadSkeletons(skeletonResources);
      }
      var animationResources = modelResource.animations();
      if(animationResources){
         display.loadAnimations(animationResources);
      }
      var meshResource = resource.mesh();
      var meshGuid = resource.meshGuid();
      var renderable = o._renderable = RConsole.find(FE3rModelConsole).findMesh(meshGuid);
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         o._vertexBuffers.set(vertexBuffer.code(), vertexBuffer);
      }
      var skins = renderable.skins();
      if(skins){
         var displaySkeleton = display._activeSkeleton;
         var skin = o._activeSkin = skins.first();
         var streams = skin.streams();
         var streamCount = streams.count();
         for(var i = 0; i < streamCount; i++){
            var stream = streams.at(i);
            var buffer = stream.buffer();
            o._vertexBuffers.set(buffer.code(), buffer);
         }
         var skinResource = skin.resource();
         var boneReferResources = skinResource.boneRefers();
         var c = boneReferResources.count();
         if(c > 0){
            var bones = o._bones = new TObjects();
            for(var i = 0; i < c; i++){
               var boneReferResource = boneReferResources.at(i);
               var boneReferIndex = boneReferResource.index();
               var bone = displaySkeleton.bones().get(boneReferIndex);
               if(!bone){
                  throw new TError(o, 'Bone is not exist.');
               }
               bones.push(bone);
            }
         }
      }
      o._ready = true;
   }
   MO.FE3dTemplateRenderable_dispose = function FE3dTemplateRenderable_dispose(){
      var o = this;
      o.__base.FE3dMeshRenderable.dispose.call(o);
   }
}
with(MO){
   MO.SE3dRulerPrecision = function SE3dRulerPrecision(o){
      var o = this;
      o.interval = 1;
      o.length   = 0.5;
      o.color    = new SColor4(255, 255, 255, 255);
      return o;
   }
   MO.SE3dRulerPrecision_assign = function SE3dRulerPrecision_assign(info){
      var o = this;
      o.interval.assign(info.interval);
      o.color.assign(info.color);
   }
}
with(MO){
   MO.SE3dRulerStyle = function SE3dRulerStyle(o){
      var o = this;
      o.lineColor    = new SColor4(255, 255, 255, 255);
      o.bothLength   = 0.5;
      o.bothColor    = new SColor4(255, 255, 255, 255);
      o.tickInterval = 1;
      o.tickLength   = 0.3;
      o.tickColor    = new SColor4(255, 255, 255, 255);
      o.precisions   = new TObjects();
      o.assign       = SE3dRulerStyle_assign;
      return o;
   }
   MO.SE3dRulerStyle = function SE3dRulerStyle_assign(info){
      var o = this;
      o.lineColor.assign(info.lineColor);
      o.bothLength = info.bothLength;
      o.bothColor.assign(info.lineColor);
      o.tickInterval = info.tickInterval;
      o.tickLength = info.tickLength;
      o.tickColor.assign(info.lineColor);
      o.precisions.assign(info.precisions);
   }
}
with(MO){
   MO.FE3dBitmap = function FE3dBitmap(o){
      o = RClass.inherits(this, o, FE3dFace);
      o.construct = FE3dBitmap_construct;
      o.testReady = FE3dBitmap_testReady;
      o.loadUrl   = FE3dBitmap_loadUrl;
      o.dispose   = FE3dBitmap_dispose;
      return o;
   }
   MO.FE3dBitmap_construct = function FE3dBitmap_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }
   MO.FE3dBitmap_testReady = function FE3dBitmap_testReady(){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            o._ready = renderable.testReady();
            if(o._ready){
               var size = renderable.size();
               var adjustSize = renderable.adjustSize();
               var matrix = o.matrix();
               matrix.sz = adjustSize.height / size.height;
               matrix.updateForce();
               var event = new SEvent(o);
               o.processLoadListener(event);
               event.dispose();
            }
            o._materialReference = renderable;
         }
      }
      return o._ready;
   }
   MO.FE3dBitmap_loadUrl = function FE3dBitmap_loadUrl(url){
      var o = this;
      o._renderable = RConsole.find(FE3dBitmapConsole).loadDataByUrl(o, url);
      o._ready = false;
   }
   MO.FE3dBitmap_dispose = function FE3dBitmap_dispose(){
      var o = this;
      o.__base.FE3dFace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dBitmapConsole = function FE3dBitmapConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._bitmaps       = RClass.register(o, new AGetter('_bitmaps'));
      o._bitmapDatas   = RClass.register(o, new AGetter('_bitmapDatas'));
      o._dataUrl       = '/cloud.resource.bitmap.wv'
      o.construct      = FE3dBitmapConsole_construct;
      o.loadByUrl      = FE3dBitmapConsole_loadByUrl;
      o.loadByGuid     = FE3dBitmapConsole_loadByGuid;
      o.loadDataByUrl  = FE3dBitmapConsole_loadDataByUrl;
      o.loadDataByGuid = FE3dBitmapConsole_loadDataByGuid;
      o.dispose        = FE3dBitmapConsole_dispose;
      return o;
   }
   MO.FE3dBitmapConsole_construct = function FE3dBitmapConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._bitmaps = new TDictionary();
      o._bitmapDatas = new TDictionary();
   }
   MO.FE3dBitmapConsole_loadByUrl = function FE3dBitmapConsole_loadByUrl(context, url){
      var o = this;
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3dBitmap);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
   MO.FE3dBitmapConsole_loadByGuid = function FE3dBitmapConsole_loadByGuid(context, guid){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(guid);
      var url = RBrowser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
      return o.loadByUrl(context, url);
   }
   MO.FE3dBitmapConsole_loadDataByUrl = function FE3dBitmapConsole_loadDataByUrl(context, url){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(url);
      var dataUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap data from url. (url={1})', dataUrl);
      var data = o._bitmapDatas.get(url);
      if(!data){
         data = RClass.create(FE3dBitmapData);
         data.linkGraphicContext(context);
         data.setup();
         data.loadUrl(url);
         o._bitmapDatas.set(url, data);
      }
      return data;
   }
   MO.FE3dBitmapConsole_loadDataByGuid = function FE3dBitmapConsole_loadDataByGuid(context, guid){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(guid);
      var url = RBrowser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
      return o.loadDataByUrl(context, url);
   }
   MO.FE3dBitmapConsole_dispose = function FE3dBitmapConsole_dispose(){
      var o = this;
      o._bitmaps = RObject.dispose(o._bitmaps);
      o._bitmapDatas = RObject.dispose(o._bitmapDatas);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3dBitmapData = function FE3dBitmapData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._image      = null;
      o.onImageLoad = FE3dBitmapData_onImageLoad;
      o.construct   = FE3dBitmapData_construct;
      o.loadUrl     = FE3dBitmapData_loadUrl;
      o.dispose     = FE3dBitmapData_dispose;
      return o;
   }
   MO.FE3dBitmapData_onImageLoad = function FE3dBitmapData_onImageLoad(event){
      var o = this;
      var context = o._graphicContext;
      var image = event.sender;
      var size = image.size();
      var width = size.width;
      var height = size.height;
      o._size.set(width, height);
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0, width, height);
      o._texture.upload(canvas);
      canvasConsole.free(canvas);
      image.dispose();
      o._ready = true;
   }
   MO.FE3dBitmapData_construct = function FE3dBitmapData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FE3dBitmapData_loadUrl = function FE3dBitmapData_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FE3dBitmapData_dispose = function FE3dBitmapData_dispose(){
      var o = this;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
with(MO){
   MO.FE3dBoundBox = function FE3dBoundBox(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._outline              = RClass.create(o, new AGetter('_outline'));
      o._rate                 = 0.2;
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o.construct             = FE3dBoundBox_construct;
      o.setup                 = FE3dBoundBox_setup;
      o.upload                = FE3dBoundBox_upload;
      return o;
   }
   MO.FE3dBoundBox_construct = function FE3dBoundBox_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._outline = new SOutline3();
   }
   MO.FE3dBoundBox_setup = function FE3dBoundBox_setup(){
      var o = this;
      var c = o._graphicContext;
      var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var vertexData = new Uint8Array(4 * 32);
      for(var n = 4 * 32 - 1; n >= 0; n--){
         vertexData[n] = 0xFF;
      }
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(vertexData, 1 * 4, 32);
      o.pushVertexBuffer(buffer);
      o._vertexCount = 32;
      var indexData = [
          0,  1,  0,  4,  0, 12,
          3,  2,  3,  5,  3, 13,
          8,  6,  8,  9,  8, 14,
         11,  7, 11, 10, 11, 15,
         20, 16, 20, 21, 20, 24,
         23, 17, 23, 22, 23, 25,
         28, 18, 28, 26, 28, 29,
         31, 19, 31, 27, 31, 30 ];
      var buffer = o._indexBuffer = c.createIndexBuffer();
      buffer.setDrawModeCd(EG3dDrawMode.Lines);
      buffer.setLineWidth(1);
      buffer.upload(indexData, 48);
      o.pushIndexBuffer(buffer);
      o.update();
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }
   MO.FE3dBoundBox_upload = function FE3dBoundBox_upload(){
      var o = this;
      var l = o._outline;
      var a = l.max;
      var ax = a.x;
      var ay = a.y;
      var az = a.z;
      var i = l.min;
      var ix = i.x;
      var iy = i.y;
      var iz = i.z;
      var r = o._rate;
      var cx = (ax - ix) * r;
      var cy = (ay - iy) * r;
      var cz = (az - iz) * r;
      var data = [
         ix,       ay,      iz,
         ix + cx,  ay,      iz,
         ax - cx,  ay,      iz,
         ax,       ay,      iz,
         ix,       ay - cy, iz,
         ax,       ay - cy, iz,
         ix,       iy + cy, iz,
         ax,       iy + cy, iz,
         ix,       iy,      iz,
         ix + cx,  iy,      iz,
         ax - cx,  iy,      iz,
         ax,       iy,      iz,
         ix,       ay,      iz + cz,
         ax,       ay,      iz + cz,
         ix,       iy,      iz + cz,
         ax,       iy,      iz + cz,
         ix,       ay,      az - cz,
         ax,       ay,      az - cz,
         ix,       iy,      az - cz,
         ax,       iy,      az - cz,
         ix,       ay,      az,
         ix + cx,  ay,      az,
         ax - cx,  ay,      az,
         ax,       ay,      az,
         ix,       ay - cy, az,
         ax,       ay - cy, az,
         ix,       iy + cy, az,
         ax,       iy + cy, az,
         ix,       iy,      az,
         ix + cx,  iy,      az,
         ax - cx,  iy,      az,
         ax,       iy,      az];
      o._vertexPositionBuffer.upload(data, 4 * 3, 32);
   }
}
with(MO){
   MO.FE3dCube = function FE3dCube(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o.vertexPositionBuffer = null;
      o.vertexColorBuffer    = null;
      o.indexBuffer          = null;
      o.setup                = FE3dCube_setup;
      return o;
   }
   MO.FE3dCube_setup = function FE3dCube_setup(p){
      var o = this;
      var vp = [
         -1.0,  1.0, -1.0,
          1.0,  1.0, -1.0,
          1.0, -1.0, -1.0,
         -1.0, -1.0, -1.0,
         -1.0,  1.0,  1.0,
          1.0,  1.0,  1.0,
          1.0, -1.0,  1.0,
         -1.0, -1.0,  1.0 ];
      var buffer = o.vertexPositionBuffer = p.createVertexBuffer();
      buffer.upload(vp, 4 * 3, 8);
      o.pushVertexBuffer(buffer);
      var vc = [
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         0.0, 0.0, 0.0, 1.0,
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 1.0, 1.0,
         1.0, 0.0, 1.0, 1.0,
         0.0, 0.0, 1.0, 1.0 ];
      var buffer = o.vertexColorBuffer = p.createVertexBuffer();
      buffer.upload(vc, 4 * 4, 8);
      o.pushVertexBuffer(buffer);
      var id = [
         0, 1, 2, 0, 2, 3,
         1, 5, 6, 1, 6, 2,
         5, 4, 7, 5, 7, 6,
         4, 0, 3, 4, 3, 7,
         0, 4, 5, 0, 5, 1,
         3, 2, 6, 3, 6, 7  ];
      var buffer = context.createIndexBuffer();
      buffer.upload(id, 36);
      o.pushIndexBuffer(buffer);
      var mi = o.material().info();
      mi.effectCode = 'control';
      mi.ambientColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.FE3dDataBox = function FE3dDataBox(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._vertexPositionBuffer = RClass.register(o, new AGetter('_vertexPositionBuffer'));
      o._vertexColorBuffer    = RClass.register(o, new AGetter('_vertexColorBuffer'));
      o._indexBuffer          = RClass.register(o, new AGetter('_indexBuffer'));
      o.construct             = FE3dDataBox_construct;
      o.setup                 = FE3dDataBox_setup;
      return o;
   }
   MO.FE3dDataBox_construct = function FE3dDataBox_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dDataBox_setup = function FE3dDataBox_setup(vd, vc, id){
      var o = this;
      var c = o._graphicContext;
      var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
      var buffer = o._indexBuffer = c.createIndexBuffer();
      o.pushIndexBuffer(buffer);
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.FE3dDimensional = function FE3dDimensional(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._cellSize             = null;
      o._size                 = null;
      o._lineColor            = null;
      o._lineCenterColor      = null;
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o.construct             = FE3dDimensional_construct;
      o.setup                 = FE3dDimensional_setup;
      return o;
   }
   MO.FE3dDimensional_construct = function FE3dDimensional_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._cellSize = new SSize2();
      o._cellSize.set(1, 1);
      o._size = new SSize2();
      o._size.set(16, 16);
   }
   MO.FE3dDimensional_setup = function FE3dDimensional_setup(){
      var o = this;
      var context = o._graphicContext;
      var cw = o._cellSize.width;
      var ch = o._cellSize.height;
      var sw = o._size.width;
      var sw2 = sw / 2;
      var sh = o._size.height;
      var sh2 = sh / 2;
      var vc = 2 * ((sw + 2) + (sh + 2));
      var v = 0;
      var vi = 0;
      var vd = new Float32Array(3 * vc);
      var vci = 0;
      var vcd = new Uint8Array(4 * vc);
      var i = 0;
      var it = vc;
      var id = new Uint16Array(it);
      for(var y = 0; y <= sh; y++){
         var r = 1;
         if(y - sh2 == 0){
            r = 0
         }
         vd[v++] = cw * -sw2 * r;
         vd[v++] = 0;
         vd[v++] = ch * (y - sh2);
         vd[v++] = cw * sw2 * r;
         vd[v++] = 0;
         vd[v++] = ch * (y - sh2);
         for(var ci = 0; ci < 8; ci++){
            vcd[vci++] = 255;
         }
         id[i++] = vi++;
         id[i++] = vi++;
      }
      vd[v++] = cw * -sw2;
      vd[v++] = 0;
      vd[v++] = 0;
      vd[v++] = cw * sw2;
      vd[v++] = 0;
      vd[v++] = 0;
      for(var ci = 0; ci < 2; ci++){
         vcd[vci++] = 255;
         vcd[vci++] = 0;
         vcd[vci++] = 0;
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
      for(var x = 0; x <= sw; x++){
         var r = 1;
         if(x - sw2 == 0){
            r = 0
         }
         vd[v++] = cw * (x - sw2);
         vd[v++] = 0;
         vd[v++] = ch * - sh2 * r;
         vd[v++] = cw * (x - sw2);
         vd[v++] = 0;
         vd[v++] = ch * sh2 * r;
         for(var ci = 0; ci < 8; ci++){
            vcd[vci++] = 255;
         }
         id[i++] = vi++;
         id[i++] = vi++;
      }
      vd[v++] = 0;
      vd[v++] = 0;
      vd[v++] = ch * -sh2;
      vd[v++] = 0;
      vd[v++] = 0;
      vd[v++] = ch * sh2;
      for(var ci = 0; ci < 2; ci++){
         vcd[vci++] = 255;
         vcd[vci++] = 0;
         vcd[vci++] = 0;
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
      o._vertexCount = vc;
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(vd, 4 * 3, vc);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(vcd, 4, vc);
      o.pushVertexBuffer(buffer);
      var buffer = context.createIndexBuffer();
      buffer.setDrawModeCd(EG3dDrawMode.Lines);
      buffer.upload(id, it);
      o.pushIndexBuffer(buffer);
      var materialInfo = o.material().info();
      materialInfo.effectCode = 'control';
      materialInfo.ambientColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.FE3dFace = function FE3dFace(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable, MListener);
      o._ready           = false;
      o._size            = RClass.register(o, new AGetter('_size'));
      o._loadListeners   = RClass.register(o, new AListener('_loadListeners', EEvent.Load));
      o._statusDirty     = true;
      o.construct        = FE3dFace_construct;
      o.setSize          = FE3dFace_setSize;
      o.setData          = FE3dFace_setData;
      o.findVertexBuffer = FE3dFace_findVertexBuffer;
      o.vertexBuffers    = FE3dFace_vertexBuffers;
      o.findTexture      = FE3dFace_findTexture;
      o.textures         = FE3dFace_textures;
      o.material         = FE3dFace_material;
      o.dirty            = FE3dFace_dirty;
      o.processLoad      = FE3dFace_processLoad;
      o.process          = FE3dFace_process;
      o.dispose          = FE3dFace_dispose;
      return o;
   }
   MO.FE3dFace_construct = function FE3dFace_construct(){
      var o = this;
      o.__base.FE3dMeshRenderable.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3dFace_setSize = function FE3dFace_setSize(width, height){
      var o = this;
      o._size.set(width, height);
      o._matrix.setScale(width, height, 1);
   }
   MO.FE3dFace_setData = function FE3dFace_setData(data){
      var o = this;
      o._renderable = data;
   }
   MO.FE3dFace_findVertexBuffer = function FE3dFace_findVertexBuffer(p){
      return this._renderable.findVertexBuffer(p);
   }
   MO.FE3dFace_vertexBuffers = function FE3dFace_vertexBuffers(){
      return this._renderable.vertexBuffers();
   }
   MO.FE3dFace_findTexture = function FE3dFace_findTexture(p){
      return this._renderable.findTexture(p);
   }
   MO.FE3dFace_textures = function FE3dFace_textures(){
      return this._renderable.textures();
   }
   MO.FE3dFace_material = function FE3dFace_material(){
      return this._renderable.material();
   }
   MO.FE3dFace_dirty = function FE3dFace_dirty(){
      this._statusDirty = true;
   }
   MO.FE3dFace_processLoad = function FE3dFace_processLoad(){
      var o = this;
      return true;
   }
   MO.FE3dFace_process = function FE3dFace_process(){
      var o = this;
      o.__base.FE3dMeshRenderable.process.call(o);
   }
   MO.FE3dFace_dispose = function FE3dFace_dispose(){
      var o = this;
      o._material = RObject.dispoe(o._material);
      o.__base.FE3dMeshRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3dFaceData = function FE3dFaceData(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._optionCenter         = RClass.register(o, new AGetSet('_optionCenter'), false);
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._adjustSize           = RClass.register(o, new AGetter('_adjustSize'));
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      o.construct             = FE3dFaceData_construct;
      o.testReady             = FE3dFaceData_testReady;
      o.setup                 = FE3dFaceData_setup;
      o.dispose               = FE3dFaceData_dispose;
      return o;
   }
   MO.FE3dFaceData_construct = function FE3dFaceData_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dFaceData_testReady = function FE3dFaceData_testReady(){
      return this._ready;
   }
   MO.FE3dFaceData_setup = function FE3dFaceData_setup(){
      var o = this;
      var context = o._graphicContext;
      o._vertexCount = 4;
      var data = null;
      if(o._optionCenter){
         data = [-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0];
      }else{
         data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      }
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      var stream = RClass.create(FE3sStream);
      stream.setCode('position');
      stream.setDataCount(4);
      stream.setData(data);
      buffer._resource = stream;
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      var stream = RClass.create(FE3sStream);
      stream.setCode('coord');
      stream.setDataCount(4);
      stream.setData(data);
      buffer._resource = stream;
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      var stream = RClass.create(FE3sStream);
      stream.setCode('index16');
      stream.setDataCount(2);
      stream.setData(data);
      buffer._resource = stream;
      o.pushIndexBuffer(buffer);
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      o._material.info().optionDouble = true;
      o._material._textures = o._textures;
   }
   MO.FE3dFaceData_dispose = function FE3dFaceData_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3dPolygon = function FE3dPolygon(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      return o;
   }
}
with(MO){
   MO.FE3dRectangle = function FE3dRectangle(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o._indexBuffer          = null;
      o.setup                 = FE3dRectangle_setup;
      return o;
   }
   MO.FE3dRectangle_setup = function FE3dRectangle_setup(p){
      var o = this;
      var vp = [
         -1.0,  1.0, 0.0,
          1.0,  1.0, 0.0,
          1.0, -1.0, 0.0,
         -1.0, -1.0, 0.0 ];
      var buffer = o._vertexPositionBuffer = p.createVertexBuffer();
      buffer.upload(vp, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      var vc = [
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         0.0, 0.0, 0.0, 1.0 ];
      var buffer = o._vertexColorBuffer = p.createVertexBuffer();
      buffer.upload(vc, 4 * 4, 4);
      o.pushVertexBuffer(buffer);
      var id = [0, 1, 2, 0, 2, 3];
      var buffer = context.createIndexBuffer();
      buffer.upload(id, 6);
      o.pushIndexBuffer(buffer);
   }
}
with(MO){
   MO.FE3dRuler = function FE3dRuler(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._style                = null;
      o._beginPoint           = null;
      o._endPoint             = null;
      o._direction            = null;
      o._directionLine        = null;
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o._vertexPositionData   = null;
      o._vertexColorData      = null;
      o._indexData            = null;
      o.construct             = FE3dRuler_construct;
      o.style                 = FE3dRuler_style;
      o.beginPoint            = FE3dRuler_beginPoint;
      o.endPoint              = FE3dRuler_endPoint;
      o.direction             = FE3dRuler_direction;
      o.setup                 = FE3dRuler_setup;
      o.upload                = FE3dRuler_upload;
      return o;
   }
   MO.FE3dRuler_construct = function FE3dRuler_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._style = new SE3dRulerStyle();
      o._beginPoint = new SPoint3(0, 0, 0);
      o._endPoint = new SPoint3(0, 10, 0);
      o._direction = new SVector3(1, 0, 0);
      o._directionLine = new SVector3();
      o._vertexPositionData = new TArray();
      o._vertexColorData = new TArray();
      o._indexData = new TArray();
   }
   MO.FE3dRuler_style = function FE3dRuler_style(){
      return this._style;
   }
   MO.FE3dRuler_beginPoint = function FE3dRuler_beginPoint(){
      return this._beginPoint;
   }
   MO.FE3dRuler_endPoint = function FE3dRuler_endPoint(){
      return this._endPoint;
   }
   MO.FE3dRuler_direction = function FE3dRuler_direction(){
      return this._direction;
   }
   MO.FE3dRuler_setup = function FE3dRuler_setup(){
      var o = this;
      var context = o._graphicContext;
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
      var indexBuffer = o._indexBuffer = context.createIndexBuffer();
      indexBuffer.setFillModeCd(EG3dFillMode.Line);
      indexBuffer.setLineWidth(1);
      o.pushIndexBuffer(indexBuffer);
      o.upload();
      o.update();
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }
   MO.FE3dRuler_upload = function FE3dRuler_upload(){
      var o = this;
      var vertexCount = 0;
      var style = o._style;
      var positions = o._vertexPositionData;
      positions.clear();
      var colors = o._vertexColorData;
      colors.clear();
      var indexs = o._indexData;
      indexs.clear();
      var beginPoint = o._beginPoint;
      var endPoint = o._endPoint;
      positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
      colors.push(255, 255, 255, 255);
      vertexCount++;
      positions.push(endPoint.x, endPoint.y, endPoint.z);
      colors.push(255, 255, 255, 255);
      vertexCount++;
      indexs.push(0, 1);
      var bothLength = style.bothLength;
      var bothColor = style.bothColor;
      var direction = o._direction;
      var tickBeginPoint = new SPoint3();
      var tickEndPoint = new SPoint3();
      positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      tickEndPoint.x = direction.x * bothLength + beginPoint.x;
      tickEndPoint.y = direction.y * bothLength + beginPoint.y;
      tickEndPoint.z = direction.z * bothLength + beginPoint.z;
      positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      indexs.push(vertexCount, vertexCount + 1);
      vertexCount += 2;
      positions.push(endPoint.x, endPoint.y, endPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      tickEndPoint.x = direction.x * bothLength + endPoint.x;
      tickEndPoint.y = direction.y * bothLength + endPoint.y;
      tickEndPoint.z = direction.z * bothLength + endPoint.z;
      positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      indexs.push(vertexCount, vertexCount + 1);
      vertexCount += 2;
      var lineDirection = o._directionLine.direction(beginPoint, o._endPoint);
      var length = lineDirection.length();
      lineDirection.normalize();
      var precisions = style.precisions;
      var count = precisions.count();
      for(var n = 0; n < count; n++){
         var precision = precisions.at(n);
         var tickInterval = precision.interval;
         var tickLength = precision.length;
         var tickColor = precision.color;
         for(var i = tickInterval; i < length; i += tickInterval){
            tickBeginPoint.x = lineDirection.x * i + beginPoint.x;
            tickBeginPoint.y = lineDirection.y * i + beginPoint.y;
            tickBeginPoint.z = lineDirection.z * i + beginPoint.z;
            positions.push(tickBeginPoint.x, tickBeginPoint.y, tickBeginPoint.z);
            colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
            tickEndPoint.x = direction.x * tickLength + tickBeginPoint.x;
            tickEndPoint.y = direction.y * tickLength + tickBeginPoint.y;
            tickEndPoint.z = direction.z * tickLength + tickBeginPoint.z;
            positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
            colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
            indexs.push(vertexCount, vertexCount + 1);
            vertexCount += 2;
         }
      }
      o._vertexPositionBuffer.upload(positions.memory(), 4 * 3, vertexCount);
      o._vertexColorBuffer.upload(colors.memory(), 1 * 4, vertexCount);
      indexBuffer.upload(indexs.memory(), indexs.length());
   }
}
with(MO){
   MO.FE3dRulerBox = function FE3dRulerBox(o){
      o = RClass.inherits(this, o, FE3dSprite);
      o._outline  = null;
      o._style    = null;
      o._rulerX   = null;
      o._rulerY   = null;
      o._rulerZ   = null;
      o.construct = FE3dRulerBox_construct;
      o.style     = FE3dRulerBox_style;
      o.outline   = FE3dRulerBox_outline;
      o.setup     = FE3dRulerBox_setup;
      o.upload    = FE3dRulerBox_upload;
      return o;
   }
   MO.FE3dRulerBox_construct = function FE3dRulerBox_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._style = new SE3dRulerStyle();
      o._outline = new SOutline3();
      var ruler = o._rulerX = RClass.create(FE3dRuler);
      o.pushRenderable(ruler);
      var ruler = o._rulerY = RClass.create(FE3dRuler);
      o.pushRenderable(ruler);
      var ruler = o._rulerZ = RClass.create(FE3dRuler);
      o.pushRenderable(ruler);
   }
   MO.FE3dRulerBox_style = function FE3dRulerBox_style(){
      return this._style;
   }
   MO.FE3dRulerBox_outline = function FE3dRulerBox_outline(){
      return this._outline;
   }
   MO.FE3dRulerBox_setup = function FE3dRulerBox_setup(){
      var o = this;
      var context = o._graphicContext;
      var style = o._style;
      o.matrix().setScaleAll(0.1);
      o.matrix().update();
      var outline = o._outline;
      var min = outline.min;
      var max = outline.max;
      var ruler = o._rulerX;
      ruler.linkGraphicContext(context);
      ruler.style().assign(style);
      ruler.beginPoint().assign(min);
      ruler.endPoint().set(max.x, min.y, min.z);
      ruler.direction().set(0, 0, -1);
      ruler.setup();
      var ruler = o._rulerY;
      ruler.linkGraphicContext(context);
      ruler.style().assign(style);
      ruler.beginPoint().assign(min);
      ruler.endPoint().set(min.x, max.y, min.z);
      ruler.direction().set(-1, 0, 0);
      ruler.setup();
      var ruler = o._rulerZ;
      ruler.linkGraphicContext(context);
      ruler.style().assign(style);
      ruler.beginPoint().assign(min);
      ruler.endPoint().set(min.x, min.y, max.z);
      ruler.direction().set(-1, 0, 0);
      ruler.setup();
   }
   MO.FE3dRulerBox_upload = function FE3dRulerBox_upload(){
      var o = this;
      o._rulerX.upload();
      o._rulerY.upload();
      o._rulerZ.upload();
   }
}
with(MO){
   MO.FE3dShape = function FE3dShape(o){
      o = RClass.inherits(this, o, FE3dFace);
      o._ready    = true;
      o.construct = FE3dShape_construct;
      o.dispose   = FE3dShape_dispose;
      return o;
   }
   MO.FE3dShape_construct = function FE3dShape_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }
   MO.FE3dShape_dispose = function FE3dShape_dispose(){
      var o = this;
      o.__base.FE3dFace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dShapeConsole = function FE3dShapeConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._bitmaps  = null;
      o.construct = FE3dShapeConsole_construct;
      o.bitmaps   = FE3dShapeConsole_bitmaps;
      o.load      = FE3dShapeConsole_load;
      o.loadUrl   = FE3dShapeConsole_loadUrl;
      return o;
   }
   MO.FE3dShapeConsole_construct = function FE3dShapeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._bitmaps = new TDictionary();
   }
   MO.FE3dShapeConsole_bitmaps = function FE3dShapeConsole_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3dShapeConsole_load = function FE3dShapeConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var bitmap = o._bitmaps.get(flag);
      if(bitmap){
         return bitmap;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._bitmaps.set(flag, bitmap);
      return bitmap;
   }
   MO.FE3dShapeConsole_loadUrl = function FE3dShapeConsole_loadUrl(context, url){
      var o = this;
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3dBitmapData);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
}
with(MO){
   MO.FE3dShapeData = function FE3dShapeData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._graphic  = null;
      o._texture  = null;
      o.construct = FE3dShapeData_construct;
      o.beginDraw = FE3dShapeData_beginDraw;
      o.endDraw   = FE3dShapeData_endDraw;
      o.dispose   = FE3dShapeData_dispose;
      return o;
   }
   MO.FE3dShapeData_construct = function FE3dShapeData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FE3dShapeData_beginDraw = function FE3dShapeData_beginDraw(){
      var o = this;
      var size = o._size;
      var adjustWidth = MO.Lang.Integer.pow2(size.width);
      var adjustHeight = MO.Lang.Integer.pow2(size.height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = MO.Console.find(FE2dCanvasConsole);
      var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var graphic = o._graphic = canvas.context();
      return graphic;
   }
   MO.FE3dShapeData_endDraw = function FE3dShapeData_endDraw(){
      var o = this;
      var graphic = o._graphic;
      MO.Assert.debugNotNull(graphic);
      o._texture.upload(o._canvas);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      canvasConsole.free(o._canvas);
      o._canvas = null;
      o._graphic = null;
      o._ready = true;
   }
   MO.FE3dShapeData_dispose = function FE3dShapeData_dispose(){
      var o = this;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSphere = function FE3dSphere(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._outline              = null;
      o._splitCount           = 8;
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o.construct             = FE3dSphere_construct;
      o.splitCount            = FE3dSphere_splitCount;
      o.setSplitCount         = FE3dSphere_setSplitCount;
      o.setup                 = FE3dSphere_setup;
      return o;
   }
   MO.FE3dSphere_construct = function FE3dSphere_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._outline = new SOutline3();
   }
   MO.FE3dSphere_splitCount = function FE3dSphere_splitCount(){
      return this._splitCount;
   }
   MO.FE3dSphere_setSplitCount = function FE3dSphere_setSplitCount(count){
      this._splitCount = count;
   }
   MO.FE3dSphere_setup = function FE3dSphere_setup(){
      var o = this;
      var context = o._graphicContext;
      var positions = new TArray();
      var normals = new TArray();
      var cr = o._splitCount * 2;
      var cz = o._splitCount;
      var stepr = Math.PI * 2 / cr;
      var stepz = Math.PI / cz;
      var count = 0;
      for(var rz = 0; rz <= cz; rz++){
         for(var r = 0; r < cr; r++){
            var radius = stepr * r - Math.PI;
            var radiusZ = stepz * rz - RConst.PI_2;
            var x = Math.sin(radius) * Math.cos(radiusZ);
            var y = Math.sin(radiusZ);
            var z = -Math.cos(radius) * Math.cos(radiusZ);
            positions.push(x, y, z);
            normals.push(x, y, z);
            count++;
         }
      }
      o._vertexCount = count;
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(new Float32Array(positions.memory()), 4 * 3, count);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('normal');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(new Float32Array(normals.memory()), 4 * 3, count);
      o.pushVertexBuffer(buffer);
      var indexes = new TArray();
      for(var rz = 0; rz < cz; rz++){
         for(var r = 0; r < cr; r++){
            var i = cr * rz;
            var ci = i + r;
            var ni = i + r + cr;
            if(r == cr - 1){
               indexes.push(ci, ni, i);
               indexes.push(ni, i + cr, i);
            }else{
               indexes.push(ci, ni, ci + 1);
               indexes.push(ni, ni + 1, ci + 1);
            }
         }
      }
      var buffer = context.createIndexBuffer();
      buffer.upload(new Uint16Array(indexes.memory()), indexes.length());
      o.pushIndexBuffer(buffer);
      o.update();
      var info = o.material().info();
      info.ambientColor.set(0.2, 0.2, 0.2, 1);
      info.diffuseColor.set(0.8, 0.8, 0.8, 1);
      info.specularColor.set(0.8, 0.8, 0.8, 1);
      info.specularLevel = 64;
   }
}
with(MO){
   MO.FE3dVideo = function FE3dVideo(o){
      o = RClass.inherits(this, o, FE3dFace);
      o.construct = FE3dVideo_construct;
      o.testReady = FE3dVideo_testReady;
      o.loadUrl   = FE3dVideo_loadUrl;
      o.dispose   = FE3dVideo_dispose;
      return o;
   }
   MO.FE3dVideo_construct = function FE3dVideo_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }
   MO.FE3dVideo_testReady = function FE3dVideo_testReady(){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            o._ready = renderable.testReady();
            if(o._ready){
               var event = new SEvent(o);
               o.processLoadListener(event);
               event.dispose();
            }
            o._materialReference = renderable;
         }
      }
      return o._ready;
   }
   MO.FE3dVideo_loadUrl = function FE3dVideo_loadUrl(url){
      var o = this;
      var context = o._graphicContext;
      o._renderable = RConsole.find(FE3dVideoConsole).loadUrl(context, url);
      o._ready = false;
   }
   MO.FE3dVideo_dispose = function FE3dVideo_dispose(){
      var o = this;
      o.__base.FE3dFace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dVideoConsole = function FE3dVideoConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._videos   = null;
      o._dataUrl  = '/cloud.resource.bitmap.wv'
      o.construct = FE3dVideoConsole_construct;
      o.videos    = FE3dVideoConsole_videos;
      o.load      = FE3dVideoConsole_load;
      o.loadUrl   = FE3dVideoConsole_loadUrl;
      return o;
   }
   MO.FE3dVideoConsole_construct = function FE3dVideoConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._videos = new TDictionary();
   }
   MO.FE3dVideoConsole_videos = function FE3dVideoConsole_videos(){
      return this._videos;
   }
   MO.FE3dVideoConsole_load = function FE3dVideoConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var bitmap = o._videos.get(flag);
      if(bitmap){
         return bitmap;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._videos.set(flag, bitmap);
      return bitmap;
   }
   MO.FE3dVideoConsole_loadUrl = function FE3dVideoConsole_loadUrl(context, url){
      var o = this;
      var bitmap = o._videos.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3dVideoData);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._videos.set(url, bitmap);
      return bitmap;
   }
}
with(MO){
   MO.FE3dVideoData = function FE3dVideoData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._hVideo      = null;
      o.ohVideoLoad  = FE3dVideoData_ohVideoLoad;
      o.ohVideoEnded = FE3dVideoData_ohVideoEnded;
      o.construct    = FE3dVideoData_construct;
      o.loadUrl      = FE3dVideoData_loadUrl;
      o.process      = FE3dVideoData_process;
      o.dispose      = FE3dVideoData_dispose;
      return o;
   }
   MO.FE3dVideoData_ohVideoLoad = function FE3dVideoData_ohVideoLoad(event){
      var o = this.__linker;
      var hVideo = o._hVideo;
      o._ready = true;
   }
   MO.FE3dVideoData_ohVideoEnded = function FE3dVideoData_ohVideoEnded(){
      var o = this.__linker;
      var hVideo = o._hVideo;
   }
   MO.FE3dVideoData_construct = function FE3dVideoData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FE3dVideoData_loadUrl = function FE3dVideoData_loadUrl(url){
      var o = this;
      var video = o._hVideo = document.createElement('VIDEO');
      video.__linker = o;
      video.autoplay = true;
      video.loop = true;
      video.src = url;
      video.addEventListener('canplay', o.ohVideoLoad);
      video.load();
      o._ready = false;
   }
   MO.FE3dVideoData_process = function FE3dVideoData_process(){
      var o = this;
      if(o._ready){
         o._texture.upload(o._hVideo);
      }
   }
   MO.FE3dVideoData_dispose = function FE3dVideoData_dispose(){
      var o = this;
      o._hVideo = null;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
with(MO){
   MO.FE3dMeshMergeProcessor = function FE3dMeshMergeProcessor(o){
      o = RClass.inherits(this, o, FProcessor);
      o._typeName  = null;
      o._groupName = null;
      o._name      = null;
      o.name  = FE3dMeshMergeProcessor_name;
      return o;
   }
   MO.FE3dMeshMergeProcessor_name = function FE3dMeshMergeProcessor_name(){
      return this._name;
   }
}
with(MO){
   MO.FE3dProcessServer = function FE3dProcessServer(o){
      o = RClass.inherits(this, o, FProcessServer);
      o._typeName  = null;
      o._groupName = null;
      o._name      = null;
      o.name  = FE3dProcessServer_name;
      return o;
   }
   MO.FE3dProcessServer_name = function FE3dProcessServer_name(){
      return this._name;
   }
   var server = RClass.create(FE3dProcessServer);
   server.registerProcessor('engine3d.mesh.merge', RClass.create(FE3dMeshMergeProcessor));
   server.process();
}
