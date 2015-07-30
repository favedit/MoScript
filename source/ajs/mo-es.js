MO.AListener = function AListener(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Listener, linker);
   o.build = MO.AListener_build;
   return o;
}
MO.AListener_build = function AListener_build(clazz, instance){
   var o = this;
   var addListener = 'add' + o._linker + 'Listener';
   instance[addListener] = MO.RListener.makeAddListener(addListener, o._linker);
   var setListener = 'set' + o._linker + 'Listener';
   instance[setListener] = MO.RListener.makeSetListener(setListener, o._linker);
   var removeListener = 'remove' + o._linker + 'Listener';
   instance[removeListener] = MO.RListener.makeRemoveListener(removeListener, o._linker);
   var clearListeners = 'clear' + o._linker + 'Listeners';
   instance[clearListeners] = MO.RListener.makeClearListener(clearListeners, o._linker);
   var processListener = 'process' + o._linker + 'Listener';
   instance[processListener] = MO.RListener.makeProcessListener(processListener, o._linker);
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
MO.EEvent = new function EEvent(){
   var o = this;
   o.Unknown          = 'Unknown';
   o.Load             = 'Load';
   o.Loaded           = 'Loaded';
   o.Process          = 'Process';
   o.Complete         = 'Complete';
   o.Change           = 'Change';
   o.EnterFrame       = 'EnterFrame';
   o.LeaveFrame       = 'LeaveFrame';
   o.Enter            = 'Enter';
   o.Leave            = 'Leave';
   o.Resize           = 'Reisze';
   o.Focus            = 'Focus';
   o.Blur             = 'Blur';
   o.MouseDown        = 'MouseDown';
   o.MouseMove        = 'MouseMove';
   o.MouseUp          = 'MouseUp';
   o.MouseWheel       = 'MouseWheel';
   o.KeyDown          = 'KeyDown';
   o.KeyPress         = 'KeyPress';
   o.KeyUp            = 'KeyUp';
   o.Click            = 'Click';
   o.DoubleClick      = 'DoubleClick';
   o.NodeClick        = 'NodeClick';
   o.ItemClick        = 'ItemClick';
   o.Selected         = 'Selected';
   o.DataChanged      = 'DataChanged';
   o.Result           = 'Result';
   o.TouchZoom        = 'TouchZoom';
   o.Visibility       = 'Visibility';
   o.Orientation      = 'Orientation';
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
      o._listenerss = MO.Lang.Object.dispose(listenerss);
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
   o.dispose    = MO.SEvent_dispose;
   return o;
}
MO.SEvent_dispose = function SEvent_dispose(){
   var o = this;
   for(var name in o){
      o[name] = null;
   }
}
MO.SKeyboardEvent = function SKeyboardEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.altKey      = false;
   o.shiftKey    = false;
   o.ctrlKey     = false;
   o.keyCode     = 0;
   o.attachEvent = MO.SKeyboardEvent_attachEvent;
   o.cancel      = MO.SKeyboardEvent_cancel;
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
MO.SMouseEvent = function SMouseEvent(){
   var o = this;
   MO.SEvent.call(o);
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
   o.attachEvent = MO.SMouseEvent_attachEvent;
   return o;
}
MO.SMouseEvent_attachEvent = function SMouseEvent_attachEvent(event){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(event);
   if(hs){
      o.source = hs.__linker;
   }
   o.button = event.button;
   o.mouseLeft = (event.button == MO.EMouseButton.Left);
   o.mouseMiddle = (event.button == MO.EMouseButton.Middle);
   o.mouseRight = (event.button == MO.EMouseButton.Right);
   o.altKey = event.altKey;
   o.ctrlKey = event.ctrlKey;
   if(MO.RBrowser.isBrowser(MO.EBrowser.FireFox)){
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
MO.SResizeEvent = function SResizeEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.width       = null;
   o.height      = null;
   o.attachEvent = MO.SResizeEvent_attachEvent;
   return o;
}
MO.SResizeEvent_attachEvent = function SResizeEvent_attachEvent(p){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(p);
   if(hs){
      o.source = hs.__linker;
   }
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
   o = RClass.inherits(this, o, MO.FObject, MO.MListenerLoad);
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
MO.FHttpConnection = function FHttpConnection(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._asynchronous        = false;
   o._methodCd            = MO.EHttpMethod.Get;
   o._contentCd           = MO.EHttpContent.Binary;
   o._url                 = null;
   o._input               = null;
   o._inputData           = MO.Class.register(o, new MO.AGetSet('_inputData'));
   o._output              = null;
   o._outputData          = MO.Class.register(o, new MO.AGetter('_outputData'));
   o._handle              = null;
   o._contentLength       = 0;
   o._statusFree          = true;
   o._event               = null;
   o._listenersLoad       = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o._listenersComplete   = MO.Class.register(o, new MO.AListener('_listenersComplete', MO.EEvent.Complete));
   o.onConnectionSend     = MO.FHttpConnection_onConnectionSend;
   o.onConnectionReady    = MO.FHttpConnection_onConnectionReady;
   o.onConnectionComplete = MO.FHttpConnection_onConnectionComplete;
   o.construct            = MO.FHttpConnection_construct;
   o.setHeaders           = MO.FHttpConnection_setHeaders;
   o.setOutputData        = MO.FHttpConnection_setOutputData;
   o.content              = MO.FHttpConnection_content;
   o.reset                = MO.FHttpConnection_reset;
   o.sendSync             = MO.FHttpConnection_sendSync;
   o.sendAsync            = MO.FHttpConnection_sendAsync;
   o.send                 = MO.FHttpConnection_send;
   o.dispose              = MO.FHttpConnection_dispose;
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
         throw new MO.TError('Unknown send data type.');
      }
   }
}
MO.FHttpConnection_onConnectionReady = function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var handle = o._handle;
      if(handle.readyState == MO.EHttpStatus.Loaded){
         if(handle.status == 200){
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
   var event = o._event;
   event.connection = o;
   event.content = o._outputData;
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FHttpConnection_construct = function FHttpConnection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._event = new MO.SEvent();
   var handle = o._handle = MO.Window.Xml.createConnection();
   handle._linker = o;
   handle.onreadystatechange = o.onConnectionReady;
}
MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
   var o = this;
   var handle = o._handle;
   if(o._contentCd == MO.EHttpContent.Binary){
      if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
         handle.setRequestHeader('Accept-Charset', 'x-user-defined');
         handle.responseType = 'arraybuffer';
      }else{
         handle.overrideMimeType('text/plain; charset=x-user-defined');
         if(o._asynchronous){
            handle.responseType = 'arraybuffer';
         }
      }
   }else{
      handle.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   if(!MO.Window.Browser.isBrowser(MO.EBrowser.Chrome)){
      if(o._contentLength > 0){
         handle.setRequestHeader('content-length', o._contentLength);
      }
   }
}
MO.FHttpConnection_setOutputData = function FHttpConnection_setOutputData(){
   var o = this;
   var handle = o._handle;
   if(o._contentCd == MO.EHttpContent.Binary){
      o._outputData = handle.response;
   }else{
      o._outputData = handle.responseText;
   }
}
MO.FHttpConnection_content = function FHttpConnection_content(){
   return this._outputData;
}
MO.FHttpConnection_reset = function FHttpConnection_reset(){
   var o = this;
   o._handle.abort()
   o.clearAllListeners();
}
MO.FHttpConnection_sendSync = function FHttpConnection_sendSync(){
   var o = this;
   var handle = o._handle;
   handle.open(o._methodCd, o._url, false);
   o.setHeaders(handle, 0);
   handle.send(o._inputData);
   o.setOutputData();
   o.onConnectionComplete();
   MO.Logger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
}
MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
   var o = this;
   var handle = o._handle;
   handle.open(o._methodCd, o._url, true);
   o.setHeaders(handle, 0);
   handle.send(o._inputData);
   MO.Logger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
}
MO.FHttpConnection_send = function FHttpConnection_send(url, data){
   var o = this;
   o._url = url;
   o._input = data;
   o._methodCd = (data != null) ? MO.EHttpMethod.Post : MO.EHttpMethod.Get;
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
   o._event = MO.Lang.Object.dispose(o._event);
   o._input = null;
   o._inputData = null;
   o._output = null;
   o._outputData = null;
   var handle = o._handle;
   if(handle){
      handle.onreadystatechange = null;
      o._handle = null;
   }
   o.__base.MListener.dispose.call(o);
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
MO.RListener = new MO.RListener();
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
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   o.owner          = null;
   o.url            = null;
   o.action         = null;
   o.parameter      = null;
   o.inputDocument  = null;
   o.outputDocument = null;
   o.callback       = null;
   o.process        = MO.SXmlEvent_process;
   o.dispose        = MO.SXmlEvent_dispose;
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
MO.FContent = function FContent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
MO.FContentConsole = function FContentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FContentConsole_onLoad;
   o.construct    = MO.FContentConsole_construct;
   o.alloc        = MO.FContentConsole_alloc;
   o.process      = MO.FContentConsole_process;
   o.send         = MO.FContentConsole_send;
   return o;
}
MO.FContentConsole_construct = function FContentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._connections = new MO.TObjects();
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
      a = MO.Class.create(MO.FXmlConnection);
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
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
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
MO.FContentPipeline = function FContentPipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   o._scopeCd = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   return o;
}
MO.FDragConsole = function FDragConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd        = MO.EScope.Local;
   o._activeDragable = null;
   o._dragables      = null;
   o.onMouseDown     = MO.FDragConsole_onMouseDown;
   o.onMouseMove     = MO.FDragConsole_onMouseMove;
   o.onMouseUp       = MO.FDragConsole_onMouseUp;
   o.construct       = MO.FDragConsole_construct;
   o.register        = MO.FDragConsole_register;
   o.unregister      = MO.FDragConsole_unregister;
   o.clear           = MO.FDragConsole_clear;
   return o;
}
MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
   var o = this;
   var es = p.source;
   if(!es){
      return;
   }
   if(!MO.Class.isClass(es, MO.MUiDragable)){
      return;
   }
   MO.RWindow.setOptionSelect(false);
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
   MO.RWindow.setOptionSelect(true);
   o._activeDragable.onDragStop(p);
   o._activeDragable = null;
}
MO.FDragConsole_construct = function FDragConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._dragables = new MO.TObjects();
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
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
MO.FEnvironment = function FEnvironment(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name  = MO.Class.register(o, new MO.AGetSet('_name'));
   o._value = MO.Class.register(o, new MO.AGetSet('_value'));
   o.set    = MO.FEnvironment_set;
   return o;
}
MO.FEnvironment_set = function FEnvironment_set(name, value){
   var o = this;
   o._name = name;
   o._value = value;
}
MO.FEnvironmentConsole = function FEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._environments = MO.Class.register(o, new MO.AGetSet('_environments'));
   o.construct     = MO.FEnvironmentConsole_construct;
   o.register      = MO.FEnvironmentConsole_register;
   o.registerValue = MO.FEnvironmentConsole_registerValue;
   o.find          = MO.FEnvironmentConsole_find;
   o.findValue     = MO.FEnvironmentConsole_findValue;
   o.parse         = MO.FEnvironmentConsole_parse;
   o.dispose       = MO.FEnvironmentConsole_dispose;
   return o;
}
MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._environments = new MO.TDictionary();
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
MO.FEnvironmentConsole_parse = function FEnvironmentConsole_parse(value){
   var o = this;
   var result = value;
   var environments = o._environments;
   var count = environments.count();
   for(var i = 0; i < count; i++){
      var environment = environments.at(i);
      result = MO.Lang.String.replace(result, '{' + environment.name() + '}', environment.value());
   }
   return result;
}
MO.FEnvironmentConsole_dispose = function FEnvironmentConsole_dispose(){
   var o = this;
   o._environments = new TDictionary();
   o.__base.FConsole.dispose.call(o);
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
MO.FEventConsole = function FEventConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._thread        = null;
   o._interval      = 100;
   o._processEvents = null;
   o._events        = null;
   o.onProcess      = MO.FEventConsole_onProcess;
   o.construct      = MO.FEventConsole_construct;
   o.register       = MO.FEventConsole_register;
   o.push           = MO.FEventConsole_push;
   o.clear          = MO.FEventConsole_clear;
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
   o._processEvents = new MO.TObjects();
   o._events = new MO.TObjects();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.lsnsProcess.register(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.Logger.debug(o, 'Add event thread. (thread={1})', MO.Class.dump(thread));
}
MO.FEventConsole_register = function FEventConsole_register(po, pc){
   var o = this;
   var e = MO.Class.create(FEvent);
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
MO.FHttpConsole = function FHttpConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._pool      = null;
   o.onComplete = MO.FHttpConsole_onComplete;
   o.construct  = MO.FHttpConsole_construct;
   o.create     = MO.FHttpConsole_create;
   o.alloc      = MO.FHttpConsole_alloc;
   o.free       = MO.FHttpConsole_free;
   o.send       = MO.FHttpConsole_sendAsync;
   o.sendSync   = MO.FHttpConsole_sendSync;
   o.sendAsync  = MO.FHttpConsole_sendAsync;
   o.fetch      = MO.FHttpConsole_fetchAsync;
   o.fetchSync  = MO.FHttpConsole_fetchSync;
   o.fetchAsync = MO.FHttpConsole_fetchAsync;
   o.dispose    = MO.FHttpConsole_dispose;
   return o;
}
MO.FHttpConsole_onComplete = function FHttpConsole_onComplete(event){
   var o = this;
   var connection = event.connection;
   o._pool.free(connection);
}
MO.FHttpConsole_construct = function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = MO.Class.create(MO.FObjectPool);
}
MO.FHttpConsole_create = function FHttpConsole_create(){
   return MO.Class.create(MO.FHttpConnection);
}
MO.FHttpConsole_alloc = function FHttpConsole_alloc(clazz){
   var o = this;
   var pool = o._pool;
   if(!pool.hasFree()){
      o._pool.push(o.create());
   }
   var connection = pool.alloc();
   connection.reset();
   connection.addCompleteListener(o, o.onComplete);
   return connection;
}
MO.FHttpConsole_free = function FHttpConsole_free(connection){
   this._pool.free(connection);
}
MO.FHttpConsole_sendSync = function FHttpConsole_sendSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection.send(url, data);
   return connection.content();
}
MO.FHttpConsole_sendAsync = function FHttpConsole_sendAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_fetchSync = function FHttpConsole_fetchSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection.content();
}
MO.FHttpConsole_fetchAsync = function FHttpConsole_fetchAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FIdleConsole = function FIdleConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope    = MO.EScope.Page;
   o.register = MO.FIdleConsole_register;
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
MO.FJsonConsole = function FJsonConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   o.create = MO.FJsonConsole_create;
   return o;
}
MO.FJsonConsole_create = function FJsonConsole_create(){
   return MO.Class.create(MO.FJsonConnection);
}
MO.FLoggerConsole = function FLoggerConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Global;
   o._socket    = null;
   o.onOutput   = MO.FLoggerConsole_onOutput;
   o.construct  = MO.FLoggerConsole_construct;
   o.connect    = MO.FLoggerConsole_connect;
   o.output     = MO.FLoggerConsole_output;
   o.disconnect = MO.FLoggerConsole_disconnect;
   o.dispose    = MO.FLoggerConsole_dispose;
   return o;
}
MO.FLoggerConsole_onOutput = function FLoggerConsole_onOutput(event){
   var message = event.message;
   this.output(message);
}
MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.Logger.lsnsOutput.register(o, o.onOutput);
}
MO.FLoggerConsole_connect = function FLoggerConsole_connect(url){
   var o = this;
   var socket = o._socket = MO.Class.create(MO.FBufferedSocket);
   socket.connect(url);
}
MO.FLoggerConsole_output = function FLoggerConsole_output(message){
   var socket = this._socket;
   if(socket){
      var url = window.location.toString();
      socket.push('[' + url + '] - ' + message);
      socket.process();
   }
}
MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
   var socket = this._socket;
   if(socket){
      socket.close();
   }
}
MO.FLoggerConsole_dispose = function FLoggerConsole_dispose(){
   var o = this;
   o._socket = MO.Lang.Object.dispose(o._socket);
   o.__base.FConsole.dispose.call(o);
}
MO.FMonitorConsole = function FMonitorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope      = MO.EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new MO.TList();
   o.hWindow    = null;
   o.doInterval = MO.FMonitorConsole_doInterval;
   o.push       = MO.FMonitorConsole_push;
   o.process    = MO.FMonitorConsole_process;
   o.processAll = MO.FMonitorConsole_processAll;
   o.startup    = MO.FMonitorConsole_startup;
   o.wait       = MO.FMonitorConsole_wait;
   o.release    = MO.FMonitorConsole_release;
   return o;
}
MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + MO.Lang.String.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
   if(monitor){
      switch(monitor.status){
         case MO.EMonitor.Sleep:
            break;
         case MO.EMonitor.Active:
            monitor.process(this.interval);
            break;
         case MO.EMonitor.Cancel:
            this.monitors.removeItem(monitor);
            break;
      }
   }
}
MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n = 0; n < monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
   var con = MO.RGlobal.get(FMonitorConsole);
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
MO.FMouseConsole = function FMouseConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._activeCapture = null;
   o.onMouseDown    = MO.FMouseConsole_onMouseDown;
   o.onMouseMove    = MO.FMouseConsole_onMouseMove;
   o.onMouseUp      = MO.FMouseConsole_onMouseUp;
   o.construct      = MO.FMouseConsole_construct;
   o.captureStart   = MO.FMouseConsole_captureStart;
   o.capture        = MO.FMouseConsole_capture;
   o.captureStop    = MO.FMouseConsole_captureStop;
   o.register       = MO.FMouseConsole_register;
   o.unregister     = MO.FMouseConsole_unregister;
   o.clear          = MO.FMouseConsole_clear;
   return o;
}
MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
   var o = this;
   var s = MO.RHtml.searchLinker(p.hSource, MO.MMouseCapture);
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
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      MO.RWindow.setOptionSelect(false);
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
   MO.RWindow.setOptionSelect(true);
}
MO.FMouseConsole_register = function FMouseConsole_register(p){
}
MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
}
MO.FMouseConsole_clear = function FMouseConsole_clear(){
}
MO.FPipeline = function FPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
MO.FProcess = function FProcess(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcess_ohMessage;
   o.onMessage = MO.FProcess_onMessage;
   o.construct = MO.FProcess_construct;
   o.name      = MO.FProcess_name;
   o.start     = MO.FProcess_start;
   o.process   = MO.FProcess_process;
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
   o._events = new MO.TObjects();
}
MO.FProcess_start = function FProcess_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
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
   var e = new MO.SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
MO.FProcessConsole = function FProcessConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FProcessConsole_onLoad;
   o.construct    = MO.FProcessConsole_construct;
   o.alloc        = MO.FProcessConsole_alloc;
   o.process      = MO.FProcessConsole_process;
   o.send         = MO.FProcessConsole_send;
   return o;
}
MO.FProcessConsole_construct = function FProcessConsole_construct(){
   var o = this;
   o._connections = new MO.TObjects();
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
      a = MO.Class.create(MO.FXmlConnection);
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
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
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
MO.FProcessEvent = function FProcessEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data      = MO.Class.register(o, new MO.AGetSet('_data'));
   o._listeners = null;
   o.register   = MO.FProcessEvent_register;
   return o;
}
MO.FProcessEvent_register = function FProcessEvent_register(owner, callback){
   var o = this;
   if(!o._listeners){
      o._listeners = new MO.TListeners();
   }
   o._listeners.register(owner, callback);
}
MO.FProcessor = function FProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcessor_ohMessage;
   o.onMessage = MO.FProcessor_onMessage;
   o.construct = MO.FProcessor_construct;
   o.start     = MO.FProcessor_start;
   o.process   = MO.FProcessor_process;
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
   o._events = new MO.TObjects();
}
MO.FProcessor_start = function FProcessor_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
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
   var event = new MO.SProcessEvent();
   event.index = c;
   event.code = p.code();
   event.data = p.data();
   o._worker.postMessage(event);
}
MO.FProcessServer = function FProcessServer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name               = MO.Class.register(o, new MO.AGetSet('_name'));
   o._handle             = null;
   o._processors         = null;
   o.ohInterval          = MO.FProcessServer_ohInterval;
   o.onInterval          = MO.FProcessServer_onInterval;
   o.ohMessage           = MO.FProcessServer_ohMessage;
   o.onMessage           = MO.FProcessServer_onMessage;
   o.construct           = MO.FProcessServer_construct;
   o.registerProcessor   = MO.FProcessServer_registerProcessor;
   o.unregisterProcessor = MO.FProcessServer_unregisterProcessor;
   o.send                = MO.FProcessServer_send;
   o.process             = MO.FProcessServer_process;
   return o;
}
MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
   MO.FProcessServer.__linker.onInterval();
}
MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
   var o = this;
}
MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
   MO.FProcessServer.__linker.onMessage(p.data);
}
MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
   var o = this;
   console.log('messgae', this, p);
}
MO.FProcessServer_construct = function FProcessServer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._processors = new MO.TDictionary();
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
MO.FServiceConsole = function FServiceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o.construct = MO.FServiceConsole_construct;
   o.send      = MO.FServiceConsole_send;
   o.dispose   = MO.FServiceConsole_dispose;
   return o;
}
MO.FServiceConsole_onLoad = function FServiceConsole_onLoad(connection){
   var o = this;
   o._pool.free(connection);
}
MO.FServiceConsole_construct = function FServiceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FServiceConsole_send = function FServiceConsole_send(code, action, content){
   var o = this;
   var uri = '/' + code + '.ws?action=' + action;
   var url = MO.Window.Browser.hostPath(uri);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, content);
   return connection;
}
MO.FServiceConsole_dispose = function FServiceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FStatistics = function FStatistics(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = null;
   o.reset      = MO.FStatistics_reset;
   o.resetFrame = MO.FStatistics_resetFrame;
   return o;
}
MO.FStatistics_reset = function FStatistics_reset(){
}
MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
}
MO.FStatisticsConsole = function FStatisticsConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._statisticses = MO.Class.register(o, new MO.AGetter('_statisticses'));
   o.construct     = MO.FStatisticsConsole_construct;
   o.register      = MO.FStatisticsConsole_register;
   o.unregister    = MO.FStatisticsConsole_unregister;
   o.find          = MO.FStatisticsConsole_find;
   o.reset         = MO.FStatisticsConsole_reset;
   o.resetFrame    = MO.FStatisticsConsole_resetFrame;
   return o;
}
MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
   var o = this;
   o._statisticses = new MO.TDictionary();
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
MO.FThread = function FThread(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerProcess);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._statusCd   = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EThreadStatus.Sleep);
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
   o._delay      = 0;
   o.construct   = MO.FThread_construct;
   o.start       = MO.FThread_start;
   o.stop        = MO.FThread_stop;
   o.process     = MO.FThread_process;
   return o;
}
MO.FThread_construct = function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FThread_start = function FThread_start(){
   this._statusCd = MO.EThreadStatus.Active;
}
MO.FThread_stop = function FThread_stop(){
   this._statusCd = MO.EThreadStatus.Finish;
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
MO.FThreadConsole = function FThreadConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._active      = true;
   o._requestFlag = false;
   o._interval    = 8;
   o._threads     = MO.Class.register(o, new MO.AGetter('_threads'));
   o._hIntervalId = null;
   o.ohInterval   = MO.FThreadConsole_ohInterval;
   o.construct    = MO.FThreadConsole_construct;
   o.push         = MO.FThreadConsole_push;
   o.start        = MO.FThreadConsole_start;
   o.process      = MO.FThreadConsole_process;
   o.processAll   = MO.FThreadConsole_processAll;
   o.dispose      = MO.FThreadConsole_dispose;
   return o;
}
MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
   var threadConsole = MO.Console.find(MO.FThreadConsole);
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
   o._threads = new MO.TObjects();
      o._hIntervalId = MO.Window.htmlWindow().setInterval(o.ohInterval, o._interval);
}
MO.FThreadConsole_process = function FThreadConsole_process(thread){
   var o = this;
   if(thread){
      var statusCd = thread.statusCd();
      switch(statusCd){
         case MO.EThreadStatus.Sleep:
            break;
         case MO.EThreadStatus.Active:
            thread.process(o._interval);
            break;
         case MO.EThreadStatus.Finish:
            o._threads.remove(thread);
            thread.dispose();
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
   if(o._requestFlag){
      MO.Window.requestAnimationFrame(o.ohInterval);
   }
}
MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
   var o = this;
   if(o._requestFlag){
      MO.Window.cancelRequestAnimationFrame(o.ohInterval);
   }else{
      var hIntervalId = o._hIntervalId;
      if(hIntervalId){
         MO.Window.htmlWindow().clearInterval(hIntervalId);
         o._hIntervalId = null;
      }
   }
   o._threads = MO.Lang.Object.dispose(o._threads);
   o.__base.FConsole.dispose.call(o);
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
MO.FXmlConsole = function FXmlConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   o.create = MO.FXmlConsole_create;
   return o;
}
MO.FXmlConsole_create = function FXmlConsole_create(){
   return MO.Class.create(MO.FXmlConnection);
}
MO.EGraphicError = new function EGraphicError(){
   var o = this;
   o.Unsupport2d    = 'unsupport.2d';
   o.UnsupportWebGL = 'unsupport.webgL';
   return o;
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
      o._graphicContext = context.graphicContext();
   }else{
      throw new MO.TError(o, 'Link graphic context failure. (context={1})', context);
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
MO.Graphic = new function MoGraphicSpace(){
   return this;
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
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._hCanvas   = MO.Class.register(o, new MO.AGetter('_hCanvas', 'htmlCanvas'));
   o.construct  = MO.FGraphicContext_construct;
   o.linkCanvas = MO.Method.virtual(o, 'linkCanvas');
   o.dispose    = MO.FGraphicContext_dispose;
   return o;
}
MO.FGraphicContext_construct = function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
}
MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
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
MO.FG2dContext = function FG2dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._globalScale = MO.Class.register(o, new MO.AGetter('_globalScale'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   o.construct    = MO.FG2dContext_construct;
   o.linkCanvas   = MO.FG2dContext_linkCanvas;
   o.dispose      = MO.FG2dContext_dispose;
   return o;
}
MO.FG2dContext_construct = function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._globalScale = new MO.SSize2(1, 1);
   o._scale = new MO.SSize2(1, 1);
}
MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(hCanvas){
   var o = this;
   o._size.set(hCanvas.width, hCanvas.height);
}
MO.FG2dContext_dispose = function FG2dContext_dispose(){
   var o = this;
   o._globalScale = MO.Lang.Object.dispose(o._globalScale);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o.__base.FGraphicContext.dispose.call(o);
}
MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dContext);
   o._handle              = null;
   o._gridSourceX         = null;
   o._gridSourceY         = null;
   o._gridSourceWidth     = null;
   o._gridSourceHeight    = null;
   o._gridDrawX           = null;
   o._gridDrawY           = null;
   o._gridDrawWidth       = null;
   o._gridDrawHeight      = null;
   o.construct            = MO.FG2dCanvasContext_construct;
   o.linkCanvas           = MO.FG2dCanvasContext_linkCanvas;
   o.setGlobalScale       = MO.FG2dCanvasContext_setGlobalScale;
   o.setScale             = MO.FG2dCanvasContext_setScale;
   o.setAlpha             = MO.FG2dCanvasContext_setAlpha;
   o.setFont              = MO.FG2dCanvasContext_setFont;
   o.store                = MO.FG2dCanvasContext_store;
   o.restore              = MO.FG2dCanvasContext_restore;
   o.prepare              = MO.FG2dCanvasContext_prepare;
   o.clear                = MO.FG2dCanvasContext_clear;
   o.clearRectangle       = MO.FG2dCanvasContext_clearRectangle;
   o.clip                 = MO.FG2dCanvasContext_clip;
   o.textWidth            = MO.FG2dCanvasContext_textWidth;
   o.createLinearGradient = MO.FG2dCanvasContext_createLinearGradient;
   o.drawLine             = MO.FG2dCanvasContext_drawLine;
   o.drawRectangle        = MO.FG2dCanvasContext_drawRectangle;
   o.drawTriangle         = MO.FG2dCanvasContext_drawTriangle;
   o.drawCircle           = MO.FG2dCanvasContext_drawCircle;
   o.drawText             = MO.FG2dCanvasContext_drawText;
   o.drawImage            = MO.FG2dCanvasContext_drawImage;
   o.drawGridImage        = MO.FG2dCanvasContext_drawGridImage;
   o.drawQuadrilateral    = MO.FG2dCanvasContext_drawQuadrilateral;
   o.drawBorderLine       = MO.FG2dCanvasContext_drawBorderLine;
   o.drawBorder           = MO.FG2dCanvasContext_drawBorder;
   o.fillRectangle        = MO.FG2dCanvasContext_fillRectangle;
   o.toBytes              = MO.FG2dCanvasContext_toBytes;
   return o;
}
MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct() {
   var o = this;
   o.__base.FG2dContext.construct.call(o);
   o._gridSourceX = new Array(3);
   o._gridSourceY = new Array(3);
   o._gridSourceWidth = new Array(3);
   o._gridSourceHeight = new Array(3);
   o._gridDrawX = new Array(3);
   o._gridDrawY = new Array(3);
   o._gridDrawWidth = new Array(3);
   o._gridDrawHeight = new Array(3);
}
MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
   if (hCanvas.getContext) {
      var handle = hCanvas.getContext('2d');
      if (!handle) {
         throw new MO.TError(o, "Current browser can't support Context2D technique.");
      }
      o._handle = handle;
   }
   o._hCanvas = hCanvas;
}
MO.FG2dCanvasContext_setGlobalScale = function FG2dCanvasContext_setGlobalScale(width, height){
   var o = this;
   o._globalScale.set(width, height);
   o._handle.scale(width, height);
}
MO.FG2dCanvasContext_setScale = function FG2dCanvasContext_setScale(width, height){
   var o = this;
   if(!o._scale.equalsData(width, height)){
      o._handle.scale(width, height);
      o._scale.set(width, height);
   }
}
MO.FG2dCanvasContext_setAlpha = function FG2dCanvasContext_setAlpha(alpha){
   var o = this;
   this._handle.globalAlpha = alpha;
}
MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
   this._handle.font = font;
}
MO.FG2dCanvasContext_store = function FG2dCanvasContext_store(){
   this._handle.save();
}
MO.FG2dCanvasContext_restore = function FG2dCanvasContext_restore(){
   this._handle.restore();
}
MO.FG2dCanvasContext_prepare = function FG2dCanvasContext_prepare(){
   var o = this;
   var scale = o._globalScale;
   o._handle.setTransform(scale.width, 0, 0, scale.height, 0, 0);
}
MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(){
   var o = this;
   var size = o._size;
   var handle = o._handle;
   var hCanvas = handle.canvas;
   handle.save();
   handle.setTransform(1, 0, 0, 1, 0, 0);
   o._handle.clearRect(0, 0, size.width, size.height);
   handle.restore();
}
MO.FG2dCanvasContext_clearRectangle = function FG2dCanvasContext_clearRectangle(rectangle){
   this._handle.clearRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FG2dCanvasContext_clip = function FG2dCanvasContext_clip(left, top, width, height){
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.rect(left, top, width, height);
   handle.clip();
}
MO.FG2dCanvasContext_textWidth = function FG2dCanvasContext_textWidth(text){
   var info = this._handle.measureText(text);
   return info.width;
}
MO.FG2dCanvasContext_createLinearGradient = function FG2dCanvasContext_createLinearGradient(x1, y1, x2, y2) {
   var o = this;
   var handle = o._handle;
   return handle.createLinearGradient(x1, y1, x2, y2);
}
MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth) {
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = color;
   handle.lineWidth = lineWidth;
   handle.beginPath();
   handle.moveTo(x1, y1);
   handle.lineTo(x2, y2);
   handle.closePath();
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
   if(content.tagName == 'IMG'){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      if(!content.testReady()){
         return;
      }
      data = content.image();
      if(width == null){
         width = data.size().width;
      }
      if(height == null){
         height = data.size().height;
      }
   }else{
      throw new MO.TError(o, 'Unknown content type');
   }
   handle.drawImage(data, x, y, width, height);
}
MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
   var o = this;
   var handle = o._handle;
   var data = null
   if (MO.Class.isClass(content, MO.FImage)) {
      if(!content.testReady()){
         return;
      }
      data = content.image();
   } else {
      throw new TError(o, 'Unknown content type');
   }
   var ssize = content.size();
   var sx = o._gridSourceX;
   sx[0] = 0;
   sx[1] = padding.left;
   sx[2] = ssize.width - padding.right;
   var sy = o._gridSourceY;
   sy[0] = 0;
   sy[1] = padding.top;
   sy[2] = ssize.height - padding.bottom;
   var dx = o._gridDrawX;
   dx[0] = x;
   dx[1] = x + padding.left;
   dx[2] = x + width - padding.right;
   var dy = o._gridDrawY;
   dy[0] = y;
   dy[1] = y + padding.top;
   dy[2] = y + height - padding.bottom;
   var sw = o._gridSourceWidth;
   sw[0] = padding.left;
   sw[1] = ssize.width - padding.left - padding.right;
   sw[2] = padding.right;
   var sh = o._gridSourceHeight;
   sh[0] = padding.top;
   sh[1] = ssize.height - padding.top - padding.bottom;
   sh[2] = padding.bottom;
   var dw = o._gridDrawWidth;
   dw[0] = padding.left;
   dw[1] = width - padding.left - padding.right;
   dw[2] = padding.right;
   var dh = o._gridDrawHeight;
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
MO.FG2dCanvasContext_drawImageRectangle = function FG2dCanvasContext_drawImageRectangle(content, rectangle){
   return this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FG2dCanvasContext_drawBorderLine = function FG2dCanvasContext_drawBorderLine(x1, y1, x2, y2, borderLine){
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = borderLine.color;
   handle.lineWidth = borderLine.width;
   handle.beginPath();
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
MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color) {
   var o = this;
   var handle = o._handle;
   handle.fillStyle = color;
   handle.beginPath();
   handle.fillRect(x, y, width, height);
   handle.closePath();
}
MO.FG2dCanvasContext_drawQuadrilateral = function FG2dCanvasContext_drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.lineTo(x3 + 0.5, y3 + 0.5);
   handle.lineTo(x4 + 0.5, y4 + 0.5);
   handle.lineTo(x1 + 0.5, y1 + 0.5);
   handle.closePath();
   if(lineWidth != null && strokeColor != null){
      handle.stroke();
   }
   if (fillColor != null) {
      handle.fill();
   }
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
   handle.stroke();
}
MO.FG2dCanvasContext_drawCircle = function FG2dCanvasContext_drawCircle(x, y, radius, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.beginPath();
   handle.arc(x, y, radius, 0, 2 * Math.PI, false);
   handle.closePath();
   handle.fill();
   handle.stroke();
}
MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
   var o = this;
   var size = o._size;
   return o._handle.getImageData(0, 0, size.width, size.height);
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
MO.MG3dRegion = function MG3dRegion(o){
   o = MO.Class.inherits(this, o);
   o._changed                    = false;
   o._spaceName                  = MO.Class.register(o, new MO.AGetter('_spaceName'));
   o._technique                  = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._techniquePass              = MO.Class.register(o, new MO.AGetter('_techniquePass'));
   o._camera                     = MO.Class.register(o, new MO.AGetter('_camera'));
   o._projection                 = null;
   o._directionalLight           = MO.Class.register(o, new MO.AGetter('_directionalLight'));
   o._lights                     = MO.Class.register(o, new MO.AGetter('_lights'));
   o._allRenderables             = MO.Class.register(o, new MO.AGetter('_allRenderables'));
   o._renderables                = MO.Class.register(o, new MO.AGetter('_renderables'));
   o._ratioMatrix                = null;
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
   o.construct                   = MO.MG3dRegion_construct;
   o.isChanged                   = MO.MG3dRegion_isChanged;
   o.setTechniquePass            = MO.MG3dRegion_setTechniquePass;
   o.pushRenderable              = MO.MG3dRegion_pushRenderable;
   o.setup                       = MO.MG3dRegion_setup;
   o.change                      = MO.MG3dRegion_change;
   o.prepare                     = MO.MG3dRegion_prepare;
   o.reset                       = MO.MG3dRegion_reset;
   o.calculate                   = MO.MG3dRegion_calculate;
   o.update                      = MO.MG3dRegion_update;
   o.dispose                     = MO.MG3dRegion_dispose;
   return o;
}
MO.MG3dRegion_construct = function MG3dRegion_construct(){
   var o = this;
   o._lights = new MO.TObjects();
   o._renderables = new MO.TObjects();
   o._allRenderables = new MO.TObjects();
   o._ratioMatrix = new MO.SMatrix3d();
   o._cameraPosition = new MO.SPoint3();
   o._cameraDirection = new MO.SVector3();
   o._cameraViewMatrix = new MO.SMatrix3d();
   o._cameraProjectionMatrix = new MO.SMatrix3d();
   o._cameraViewProjectionMatrix = new MO.SMatrix3d();
   o._lightPosition = new MO.SPoint3();
   o._lightDirection = new MO.SVector3();
   o._lightViewMatrix = new MO.SMatrix3d();
   o._lightProjectionMatrix = new MO.SMatrix3d();
   o._lightViewProjectionMatrix = new MO.SMatrix3d();
   o._lightInfo = new MO.SVector4();
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
   var camera = o._camera;
   var projection = camera.projection();
   camera.updateFrustum();
   var pixelRatio = MO.Window.Browser.capability().pixelRatio;
   var ratioMatrix = o._ratioMatrix.identity();
   o._cameraPosition.assign(camera.position());
   o._cameraDirection.assign(camera.direction());
   o._cameraViewMatrix.assign(camera.matrix());
   o._cameraProjectionMatrix.assign(projection.matrix());
   o._cameraViewProjectionMatrix.assign(camera.matrix());
   o._cameraViewProjectionMatrix.append(projection.matrix());
   var light = o._directionalLight;
   var lc = light.camera();
   var lcp = lc.position();
   o._lightPosition.assign(lc.position());
   o._lightDirection.assign(lc.direction());
   o._lightViewMatrix.assign(lc.matrix());
   o._allRenderables.clear();
}
MO.MG3dRegion_reset = function MG3dRegion_reset(){
   var o = this;
   o._renderables.clear();
}
MO.MG3dRegion_calculate = function MG3dRegion_calculate(parameterCd){
   var o = this;
   switch(parameterCd){
      case MO.EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case MO.EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case MO.EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case MO.EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case MO.EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case MO.EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case MO.EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case MO.EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case MO.EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new MO.TError(o, 'Unknown parameter type. (type_cd={1})', parameterCd);
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
   o._ratioMatrix = MO.Lang.Object.free(o._ratioMatrix);
   o._renderables = MO.Lang.Object.free(o._renderables);
   o._allRenderables = MO.Lang.Object.free(o._allRenderables);
}
MO.MG3dRenderable = function MG3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.MGraphicRenderable);
   o._optionMerge   = false;
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix        = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._material      = MO.Class.register(o, new MO.AGetSet('_material'));
   o._activeInfo    = MO.Class.register(o, new MO.AGetter('_activeInfo'));
   o._infos         = null;
   o.construct      = MO.MG3dRenderable_construct;
   o.activeEffect   = MO.MG3dRenderable_activeEffect;
   o.effectFind     = MO.MG3dRenderable_effectFind;
   o.effectSet      = MO.MG3dRenderable_effectSet;
   o.infos          = MO.MG3dRenderable_infos;
   o.selectInfo     = MO.MG3dRenderable_selectInfo;
   o.resetInfos     = MO.MG3dRenderable_resetInfos;
   o.testVisible    = MO.Method.emptyTrue;
   o.update         = MO.Method.empty;
   o.dispose        = MO.MG3dRenderable_dispose;
   return o;
}
MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
   var o = this;
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
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
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   info.effect = effect;
}
MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
   var o = this;
   var infos = o._infos;
   if(!infos){
      infos = o._infos = new MO.TDictionary();
   }
   return infos;
}
MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(code){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
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
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._material = MO.Lang.Object.dispose(o._material);
   o._activeInfo = null;
   o._infos = MO.Lang.Object.dispose(o._infos);
}
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
   o.attributes            = new MO.TArray();
   o.samplers              = new MO.TArray();
   o.attributeContains     = MO.SG3dEffectInfo_attributeContains;
   o.samplerContains       = MO.SG3dEffectInfo_samplerContains;
   o.reset                 = MO.SG3dEffectInfo_reset;
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
   o.fillModeCd = MO.EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = MO.EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = MO.EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = MO.EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = MO.EG3dBlendMode.OneMinusSourceAlpha;
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
MO.SG3dMaterialInfo = function SG3dMaterialInfo(){
   var o = this;
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
   o.vertexColor          = new MO.SColor4();
   o.optionAmbient        = null;
   o.ambientColor         = new MO.SColor4();
   o.ambientShadow        = 1.0;
   o.optionDiffuse        = null;
   o.diffuseColor         = new MO.SColor4();
   o.diffuseShadow        = 1.0;
   o.optionDiffuseView    = null;
   o.diffuseViewColor     = new MO.SColor4();
   o.diffuseViewShadow    = 1.0;
   o.optionSpecular       = null;
   o.specularColor        = new MO.SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.optionSpecularView   = null;
   o.specularViewColor    = new MO.SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.optionReflect        = null;
   o.reflectColor         = new MO.SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.optionRefract        = null;
   o.refractFrontColor    = new MO.SColor4();
   o.refractBackColor     = new MO.SColor4();
   o.optionOpacity        = null;
   o.opacityColor         = new MO.SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.optionEmissive       = null;
   o.emissiveColor        = new MO.SColor4();
   o.assign               = MO.SG3dMaterialInfo_assign;
   o.calculate            = MO.SG3dMaterialInfo_calculate;
   o.reset                = MO.SG3dMaterialInfo_reset;
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
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
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
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
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
MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
   var o = this;
   o.effect   = null;
   o.layout   = null;
   o.material = null;
   o.reset    = MO.SG3dRenderableInfo_reset;
   return o;
}
MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = MO.Lang.Object.dispose(o.layout);
}
MO.FG3dAnimation = function FG3dAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = MO.FG3dAnimation_construct;
   o.findBone     = MO.FG3dAnimation_findBone;
   o.process      = MO.FG3dAnimation_process;
   o.dispose      = MO.FG3dAnimation_dispose;
   return o;
}
MO.FG3dAnimation_construct = function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new MO.TObjects();
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
   var t = MO.Timer.current();
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
MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = null;
   o._info       = MO.Class.register(o, new MO.AGetter('_info'));
   o.construct   = MO.FG3dBaseMaterial_construct;
   o.assignInfo  = MO.FG3dBaseMaterial_assignInfo;
   o.assign      = MO.FG3dBaseMaterial_assign;
   o.calculate   = MO.FG3dBaseMaterial_calculate;
   return o;
}
MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new MO.SG3dMaterialInfo();
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
MO.FG3dBone = function FG3dBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = MO.FG3dBone_update;
   return o;
}
MO.FG3dBone_update = function FG3dBone_update(p){
}
MO.FG3dCamera = function FG3dCamera(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix          = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._position        = MO.Class.register(o, new MO.AGetter('_position'));
   o._target          = null;
   o._direction       = MO.Class.register(o, new MO.AGetter('_direction'));
   o._directionTarget = null;
   o._centerFront     = 0.6;
   o._centerBack      = 1.0;
   o._focalNear       = 0.1;
   o._focalFar        = 200.0;
   o._frustum         = MO.Class.register(o, new MO.AGetter('_frustum'));
   o._planes          = MO.Class.register(o, new MO.AGetter('_planes'));
   o._viewport        = null;
   o.__axisUp         = null;
   o.__axisX          = null;
   o.__axisY          = null;
   o.__axisZ          = null;
   o.construct        = MO.FG3dCamera_construct;
   o.setPosition      = MO.FG3dCamera_setPosition;
   o.setDirection     = MO.FG3dCamera_setDirection;
   o.doWalk           = MO.FG3dCamera_doWalk;
   o.doStrafe         = MO.FG3dCamera_doStrafe;
   o.doFly            = MO.FG3dCamera_doFly;
   o.doPitch          = MO.FG3dCamera_doPitch;
   o.doYaw            = MO.FG3dCamera_doYaw;
   o.doRoll           = MO.FG3dCamera_doRoll;
   o.lookAt           = MO.FG3dCamera_lookAt;
   o.update           = MO.FG3dCamera_update;
   o.updateFrustum    = MO.FG3dCamera_updateFrustum;
   o.dispose          = MO.FG3dCamera_dispose;
   return o;
}
MO.FG3dCamera_construct = function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3();
   o._target = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._directionTarget = new MO.SVector3();
   o._frustum = new MO.SFrustum();
   o._planes = new MO.SFrustumPlanes();
   o._viewport = MO.Class.create(MO.FG3dViewport);
   o.__axisUp = new MO.SVector3(0, 1, 0);
   o.__axisX = new MO.SVector3();
   o.__axisY = new MO.SVector3();
   o.__axisZ = new MO.SVector3();
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
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doYaw = function FG3dCamera_doYaw(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doRoll = function FG3dCamera_doRoll(p){
   throw new MO.TFatal(o, 'Unsupport.')
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
   var m = MO.Lang.Math.matrix;
   m.assign(o._matrix);
   m.append(o._projection.matrix());
   o._planes.updateVision(m.data());
}
MO.FG3dCamera_dispose = function FG3dCamera_dispose(){
   var o = this;
   o._matrix = MO.Lang.Obejct.dispose(o._matrix);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   o._camera    = MO.Class.register(o, new MO.AGetter('_camera'));
   o._viewport  = MO.Class.register(o, new MO.AGetter('_viewport'));
   o._direction = MO.Class.register(o, new MO.AGetter('_direction'));
   o.construct  = MO.FG3dDirectionalLight_construct;
   o.dispose    = MO.FG3dDirectionalLight_dispose;
   return o;
}
MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._camera = MO.Class.create(MO.FG3dCamera);
   o._direction = new MO.SVector3();
}
MO.FG3dDirectionalLight_dispose = function FG3dDirectionalLight_dispose(){
   var o = this;
   o._camera = MO.Lang.Object.dispose(o._camera);
   o.__base.FG3dLight.dispose.call(o);
}
MO.FG3dEffect = function FG3dEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._ready              = null;
   o._code               = MO.Class.register(o, new MO.AGetter('_code'));
   o._stateFillCd        = MO.EG3dFillMode.Face;
   o._stateCullCd        = MO.EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = MO.EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = MO.EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = MO.Class.register(o, new MO.AGetter('_program'));
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = MO.Method.empty;
   o.testReady           = MO.FG3dEffect_testReady;
   o.setParameter        = MO.FG3dEffect_setParameter;
   o.setSampler          = MO.FG3dEffect_setSampler;
   o.drawRenderable      = MO.FG3dEffect_drawRenderable;
   o.drawRenderables     = MO.FG3dEffect_drawRenderables;
   o.drawGroup           = MO.FG3dEffect_drawGroup;
   o.drawRegion          = MO.FG3dEffect_drawRegion;
   o.buildInfo           = MO.FG3dEffect_buildInfo;
   o.loadConfig          = MO.FG3dEffect_loadConfig;
   o.load                = MO.FG3dEffect_load;
   o.build               = MO.FG3dEffect_build;
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
               throw new MO.TError("Can't find renderable vertex buffer. (linker={1})", linker);
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
            o._stateFillCd = MO.Lang.Enum.parse(MO.EG3dFillMode, value);
         }else if(name == 'cull_mode'){
            o._stateCullCd = MO.Lang.Enum.parse(MO.EG3dCullMode, value);
         }else if(name == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = MO.Lang.Enum.parse(MO.EG3dDepthMode, value);
         }else if(name == 'depth_write'){
            o._stateDepthWrite = MO.Lang.Boolean.parse(value);
         }else if(name == 'blend_mode'){
            o._stateBlend = MO.Lang.Boolean.parse(value);
            if(o._stateBlend){
               o._stateBlendSourceCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('source'));
               o._stateBlendTargetCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('target'));
            }
         }else if(name == 'alpha_test'){
            o._stateAlphaTest = MO.RBoolean.parse(value);
         }
      }else if(xnode.isName('Option')){
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'shadow'){
            o._optionShadow = MO.Lang.Boolean.parse(value);
         }else if(name == 'lightmap'){
            o._optionLightMap = MO.Lang.Boolean.parse(value);
         }else if(name == 'fog'){
            o._optionFog = MO.Lang.Boolean.parse(value);
         }
      }else if(xnode.isName('Parameter')){
         var parameter = MO.Class.create(MO.FG3dProgramParameter);
         parameter.loadConfig(xnode);
         program.parameters().set(parameter.name(), parameter);
      }else if(xnode.isName('Attribute')){
         var attribute = MO.Class.create(MO.FG3dProgramAttribute);
         attribute.loadConfig(xnode);
         program.attributes().set(attribute.name(), attribute);
      }else if(xnode.isName('Sampler')){
         var sampler = MO.Class.create(MO.FG3dProgramSampler);
         sampler.loadConfig(xnode);
         program.samplers().set(sampler.name(), sampler);
      }else if(xnode.isName('Source')){
         var name = xnode.get('name');
         if(name == 'vertex'){
            o._vertexSource = xnode.value();
         }else if(name == 'fragment'){
            o._fragmentSource = xnode.value();
         }else{
            throw new MO.TError(o, 'Unknown source type. (name={1})', name);
         }
      }else{
         throw new MO.TError(o, 'Unknown config type. (name={1})', xnode.name());
      }
   }
   var vertexTemplate = o._vertexTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   vertexTemplate.load(o._vertexSource);
   var fragmentTemplate = o._fragmentTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   fragmentTemplate.load(o._fragmentSource);
}
MO.FG3dEffect_build = function FG3dEffect_build(p){
   var o = this;
   var program = o._program;
   var parameters = program.parameters();
   var parameterCount = parameters.count();
   var tagContext = MO.RInstance.get(MO.FTagContext);
   o.buildInfo(tagContext, p);
   var source = o._vertexTemplate.parse(tagContext);
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Vertex, formatSource);
   var source = o._fragmentTemplate.parse(tagContext);
   for(var i = 0; i < parameterCount; i++){
      var parameter = parameters.at(i);
      var parameterName = parameter.name();
      var parameterDefine = parameter.define();
      if(parameterDefine){
         source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
      }
   }
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Fragment, formatSource);
   program.build();
   program.link();
}
MO.FG3dEffect_load = function FG3dEffect_load(){
   var o = this;
   var xconfig = MO.Console.find(MO.FG3dEffectConsole).loadConfig(o._code);
   o.loadConfig(xconfig);
}
MO.FG3dEffectConsole = function FG3dEffectConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = MO.Class.register(o, MO.AGetter('_path'), "/ars/shader/");
   o._effectInfo      = null;
   o._tagContext      = null;
   o._thread          = null;
   o._interval        = 300;
   o.onProcess        = MO.FG3dEffectConsole_onProcess;
   o.construct        = MO.FG3dEffectConsole_construct;
   o.register         = MO.FG3dEffectConsole_register;
   o.unregister       = MO.FG3dEffectConsole_unregister;
   o.create           = MO.FG3dEffectConsole_create;
   o.buildEffectInfo  = MO.FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = MO.FG3dEffectConsole_findTemplate;
   o.find             = MO.FG3dEffectConsole_find;
   o.loadConfig       = MO.FG3dEffectConsole_loadConfig;
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
   o._configs = new MO.TDictionary();
   o._loadEffects = new MO.TLooper();
   o._registerEffects = new MO.TDictionary();
   o._templateEffects = new MO.TDictionary();
   o._effects = new MO.TDictionary();
   o._effectInfo = new MO.SG3dEffectInfo();
   o._tagContext = MO.Class.create(MO.FTagContext);
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
      throw new MO.TError(this, 'Unknown effect type name. (type={1})', t);
   }
   var e = MO.Class.create(t);
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
      effectInfo.mergeStride = renderable.mergeStride();
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
      if(MO.Lang.String.isEmpty(vertexCode)){
         throw new MO.TError(o, 'Vertex buffer code is empty.');
      }
      effectInfo.attributes.push(vertexCode);
   }
   var textures = renderable.textures();
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var textureCode = textures.name(i);
         if(MO.Lang.String.isEmpty(textureCode)){
            throw new MO.TError(o, 'Texture code is empty.');
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
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var effectCode = renderable.material().info().effectCode;
   if(MO.Lang.String.isEmpty(effectCode)){
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
   var u = MO.RBrowser.contentPath(o._path + p + ".xml");
   if(MO.Runtime.isDebug()){
      u += '?' + MO.Lang.Date.format();
   }
   x = MO.Class.create(MO.FXmlConnection).send(u);
   o._configs.set(p, x);
   return x;
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
   o._dirty     = true;
   o._textures  = MO.Class.register(o, new MO.AGetter('_textures'))
   o.setTexture = MO.FG3dMaterial_setTexture;
   o.update     = MO.FG3dMaterial_update;
   return o;
}
MO.FG3dMaterial_setTexture = function FG3dMaterial_setTexture(code, texture){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new MO.TDictionary();
   }
   textures.set(code, texture);
}
MO.FG3dMaterial_update = function FG3dMaterial_update(){
   this._dirty = true;
}
MO.FG3dMaterialMap = function FG3dMaterialMap(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._data      = MO.Class.register(o, new MO.AGetter('_data'));
   o._texture   = MO.Class.register(o, new MO.AGetter('_texture'));
   o._stride    = null;
   o._dirty     = false;
   o.construct  = MO.FG3dMaterialMap_construct;
   o.setup      = MO.FG3dMaterialMap_setup;
   o.resize     = MO.FG3dMaterialMap_resize;
   o.setUint8   = MO.FG3dMaterialMap_setUint8;
   o.setUint16  = MO.FG3dMaterialMap_setUint16;
   o.setUint32  = MO.FG3dMaterialMap_setUint32;
   o.setFloat16 = MO.FG3dMaterialMap_setFloat16;
   o.setFloat32 = MO.FG3dMaterialMap_setFloat32;
   o.update     = MO.FG3dMaterialMap_update;
   return o;
}
MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(width, height){
   var o = this;
   var c = o._graphicContext;
   var texture = o._texture = c.createFlatTexture();
   o.resize(width, height);
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
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
   if(v1.constructor == MO.SColor4){
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
MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o.construct     = MO.FG3dOrthoProjection_construct;
   o.update        = MO.FG3dOrthoProjection_update;
   o.updateFrustum = MO.FG3dOrthoProjection_updateFrustum;
   o.dispose       = MO.FG3dOrthoProjection_dispose;
   return o;
}
MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
}
MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
   var o = this;
   var size = o._size;
   var left = -size.width * 0.5;
   var top = -size.height * 0.5;
   MO.Lang.Matrix.orthoLH(o._matrix, left, top, size.width, size.height, o._znear, o._zfar);
}
MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(frustum){
   var o = this;
   o._znear = frustum.minZ;
   o._zfar = frustum.maxZ;
   o.update();
}
MO.FG3dOrthoProjection_dispose = function FG3dOrthoProjection_dispose(){
   var o = this;
   o.__base.FG3dProjection.dispose.call(o);
}
MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o.construct     = MO.FG3dPerspectiveProjection_construct;
   o.update        = MO.FG3dPerspectiveProjection_update;
   o.updateFrustum = MO.FG3dPerspectiveProjection_updateFrustum;
   o.dispose       = MO.FG3dPerspectiveProjection_dispose;
   return o;
}
MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
}
MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
   var o = this;
   var size = o._size;
   o._fieldOfView = MO.RConst.DEGREE_RATE * o._angle;
   MO.Lang.Matrix.perspectiveFieldOfViewLH(o._matrix, o._fieldOfView, size.width / size.height, o._znear, o._zfar);
}
MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
MO.FG3dPerspectiveProjection_dispose = function FG3dPerspectiveProjection_dispose(){
   var o = this;
   o.__base.FG3dProjection.dispose.call(o);
}
MO.FG3dPointLight = function FG3dPointLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
MO.FG3dProjection = function FG3dProjection(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix      = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o._angle       = MO.Class.register(o, new MO.AGetSet('_angle'), 60.0);
   o._fieldOfView = MO.Class.register(o, new MO.AGetSet('_fieldOfView'), 0);
   o._znear       = MO.Class.register(o, new MO.AGetSet('_znear'), 0.1);
   o._zfar        = MO.Class.register(o, new MO.AGetSet('_zfar'), 200);
   o._zoom        = MO.Class.register(o, new MO.AGetSet('_zoom'), 1);
   o.construct    = MO.FG3dProjection_construct;
   o.distance     = MO.FG3dProjection_distance;
   o.dispose      = MO.FG3dProjection_dispose;
   return o;
}
MO.FG3dProjection_construct = function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._size = new MO.SSize2();
}
MO.FG3dProjection_distance = function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
MO.FG3dProjection_dispose = function FG3dProjection_dispose(){
   var o = this;
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._size = MO.Lang.Object.dispose(o._size);
   o.__base.FObject.dispose.call(o);
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
MO.FG3dTechnique = function FG3dTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._activeMode     = MO.Class.register(o, new MO.AGetter('_activeMode'));
   o._modes          = MO.Class.register(o, new MO.AGetter('_modes'));
   o._passes         = MO.Class.register(o, new MO.AGetter('_passes'));
   o.construct       = MO.FG3dTechnique_construct;
   o.registerMode    = MO.FG3dTechnique_registerMode;
   o.selectMode      = MO.FG3dTechnique_selectMode;
   o.updateRegion    = MO.Method.empty;
   o.clear           = MO.FG3dTechnique_clear;
   o.clearDepth      = MO.FG3dTechnique_clearDepth;
   o.sortRenderables = MO.FG3dTechnique_sortRenderables;
   o.drawRegion      = MO.FG3dTechnique_drawRegion;
   o.present         = MO.FG3dTechnique_present;
   return o;
}
MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._modes = new MO.TObjects();
   o._passes = new MO.TObjects();
}
MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
   var o = this;
   var m = MO.Class.create(MO.FG3dTechniqueMode);
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
MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._techniques = MO.Class.register(o, new MO.AGetter('_techniques'));
   o.construct   = MO.FG3dTechniqueConsole_construct;
   o.find        = MO.FG3dTechniqueConsole_find;
   return o;
}
MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new MO.TDictionary();
}
MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
   var o = this;
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var code = context.hashCode() + '|' + MO.Class.name(clazz);
   var techniques = o._techniques;
   var technique = techniques.get(code);
   if(!technique){
      technique = MO.Class.create(clazz);
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
MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
MO.FG3dTechniquePass = function FG3dTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._fullCode       = MO.Class.register(o, new MO.AGetSet('_fullCode'));
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._index          = null;
   o._finish         = false;
   o._materialMap    = null;
   o.setup           = MO.FG3dTechniquePass_setup;
   o.activeEffects   = MO.FG3dTechniquePass_activeEffects;
   o.sortRenderables = MO.FG3dTechniquePass_sortRenderables;
   o.drawRegion      = MO.FG3dTechniquePass_drawRegion;
   return o;
}
MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
   var o = this;
   var map = o._materialMap = MO.Class.create(MO.FG3dMaterialMap);
   map.linkGraphicContext(o);
   map.setup(MO.EG3dMaterialMap.Count, 32);
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
         info.effect = MO.Console.find(MO.FG3dEffectConsole).find(o._graphicContext, region, renderable);
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
      mm.resize(MO.EG3dMaterialMap.Count, count);
      for(var i = 0; i < count; i++){
         var r = renderables.get(i);
         r._materialId = i;
         var m = r.material();
         var mi = m.info();
         mm.setUint8(i, MO.EG3dMaterialMap.AmbientColor, mi.ambientColor);
         mm.setUint8(i, MO.EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
         mm.setUint8(i, MO.EG3dMaterialMap.SpecularColor, mi.specularColor);
         mm.setUint8(i, MO.EG3dMaterialMap.ReflectColor, mi.reflectColor);
         mm.setUint8(i, MO.EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
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
MO.FG3dTrack = function FG3dTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._frames   = null;
   o.construct = MO.FG3dTrack_construct;
   o.calculate = MO.FG3dTrack_calculate;
   return o;
}
MO.FG3dTrack_construct = function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FG3dTrack_update = function FG3dTrack_update(p){
   var o = this;
   var info = new MO.SG3dFrameInfo();
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
      o._contexts = new MO.TObjects();
      MO.Window.lsnsUnload.register(o, o.onUnload);
      o._setuped = true;
   }
}
MO.REngine3d.prototype.contexts = function REngine3d_contexts(){
   return this._contexts;
}
MO.REngine3d.prototype.createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
   var o = this;
   o.setup();
   var context = MO.Class.create(clazz);
   if(attributes){
      context._optionAlpha = attributes.alpha;
      context._optionAntialias = attributes.antialias;
   }
   if(!context.linkCanvas(hCanvas)){
      return null;
   }
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
      o._contexts = MO.Lang.Object.dispose(contexts);
   }
}
MO.REngine3d = new MO.REngine3d();
MO.Graphic.Context3d = MO.REngine3d;
MO.Engine3d = MO.REngine3d;
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
   o._data   = MO.Class.register(o, new MO.AGetSet('_data'));
   o.isValid = MO.Method.virtual(o, 'isValid');
   o.dispose = MO.FG3dBuffer_dispose;
   return o;
}
MO.FG3dBuffer_dispose = function FG3dBuffer_dispose(){
   var o = this;
   o._data = null;
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dContext = function FG3dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._viewportRectangle  = MO.Class.register(o, new MO.AGetter('_viewportRectangle'));
   o._capability         = MO.Class.register(o, new MO.AGetter('_capability'));
   o._statistics         = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._fillModeCd         = MO.EG3dFillMode.Face;
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
   o.construct           = MO.FG3dContext_construct;
   o.linkCanvas          = MO.FG3dContext_linkCanvas;
   o.createObject        = MO.FG3dContext_createObject;
   o.createProgram       = MO.Method.virtual(o, 'createProgram');
   o.createLayout        = MO.Method.virtual(o, 'createLayout');
   o.createVertexBuffer  = MO.Method.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = MO.Method.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = MO.Method.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = MO.Method.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = MO.Method.virtual(o, 'createRenderTarget');
   o.setViewport         = MO.Method.virtual(o, 'setViewport');
   o.setFillMode         = MO.Method.virtual(o, 'setFillMode');
   o.setDepthMode        = MO.Method.virtual(o, 'setDepthMode');
   o.setCullingMode      = MO.Method.virtual(o, 'setCullingMode');
   o.setBlendFactors     = MO.Method.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = MO.Method.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = MO.Method.virtual(o, 'setRenderTarget');
   o.setProgram          = MO.Method.virtual(o, 'setProgram');
   o.bindVertexBuffer    = MO.Method.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = MO.Method.virtual(o, 'bindTexture');
   o.prepare             = MO.FG3dContext_prepare;
   o.clear               = MO.Method.virtual(o, 'clear');
   o.clearColor          = MO.Method.virtual(o, 'clearColor');
   o.clearDepth          = MO.Method.virtual(o, 'clearDepth');
   o.drawTriangles       = MO.Method.virtual(o, 'drawTriangles');
   o.present             = MO.Method.virtual(o, 'present');
   o.dispose             = MO.FG3dContext_dispose;
   return o;
}
MO.FG3dContext_construct = function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._viewportRectangle = new MO.SRectangle();
   o._statistics = MO.Class.create(MO.FG3dStatistics);
   MO.Console.find(MO.FStatisticsConsole).register('graphic3d.context', o._statistics);
   o._storePrograms = new MO.TObjects();
   o._storeLayouts = new MO.TObjects();
   o._storeBuffers = new MO.TObjects();
   o._storeTextures = new MO.TObjects();
   o._storeTargets = new MO.TObjects();
}
MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
MO.FG3dContext_createObject = function FG3dContext_createObject(clazz){
   var o = this;
   var instance = MO.Class.create(clazz);
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
      o._storePrograms = MO.Lang.Object.dispose(programs);
   }
   var layouts = o._storeLayouts;
   if(layouts){
      var count = layouts.count();
      for(var i = 0; i < count; i++){
         var layout = layouts.at(i);
         layout.dispose();
      }
      o._storeLayouts = MO.Lang.Object.dispose(layouts);
   }
   var buffers = o._storeBuffers;
   if(buffers){
      var count = buffers.count();
      for(var i = 0; i < count; i++){
         var buffer = buffers.at(i);
         buffer.dispose();
      }
      o._storeBuffers = MO.Lang.Object.dispose(buffers);
   }
   var textures = o._storeTextures;
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var texture = textures.at(i);
         texture.dispose();
      }
      o._storeTextures = MO.Lang.Object.dispose(textures);
   }
   var targets = o._storeTargets;
   if(targets){
      var count = targets.count();
      for(var i = 0; i < count; i++){
         var target = targets.at(i);
         target.dispose();
      }
      o._storeTargets = MO.Lang.Object.dispose(targets);
   }
   o._program = null;
   o._viewportRectangle = MO.Lang.Object.dispose(o._viewportRectangle);
   o._capability = MO.Lang.Object.dispose(o._capability);
   o._statistics = MO.Lang.Object.dispose(o._statistics);
   o._handleInstance = null;
   o._handleLayout = null;
   o._handle = null;
   o.__base.FGraphicContext.dispose.call(o);
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
MO.FG3dLayout = function FG3dLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._buffers       = MO.Class.register(o, new MO.AGetter('_buffers'));
   o._samplers      = MO.Class.register(o, new MO.AGetter('_samplers'));
   o.linkBuffers    = MO.FG3dLayout_linkBuffers;
   o.bindBuffers    = MO.FG3dLayout_bindBuffers;
   o.linkSamplers   = MO.FG3dLayout_linkSamplers;
   o.bindSamplers   = MO.FG3dLayout_bindSamplers;
   o.unbindSamplers = MO.FG3dLayout_unbindSamplers;
   o.dispose        = MO.FG3dLayout_dispose;
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
         items = o._buffers = new MO.TObjects();
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
         items = o._samplers = new MO.TObjects();
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
   o._buffers = MO.Lang.Object.dispose(o._buffers);
   o._samplers = MO.Lang.Object.dispose(o._samplers);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dProgram = function FG3dProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = MO.FG3dProgram_hasAttribute;
   o.registerAttribute = MO.FG3dProgram_registerAttribute;
   o.findAttribute     = MO.FG3dProgram_findAttribute;
   o.attributes        = MO.FG3dProgram_attributes;
   o.hasParameter      = MO.FG3dProgram_hasParameter;
   o.registerParameter = MO.FG3dProgram_registerParameter;
   o.findParameter     = MO.FG3dProgram_findParameter;
   o.parameters        = MO.FG3dProgram_parameters;
   o.hasSampler        = MO.FG3dProgram_hasSampler;
   o.registerSampler   = MO.FG3dProgram_registerSampler;
   o.findSampler       = MO.FG3dProgram_findSampler;
   o.samplers          = MO.FG3dProgram_samplers;
   o.vertexShader      = MO.Method.virtual(o, 'vertexShader');
   o.fragmentShader    = MO.Method.virtual(o, 'fragmentShader');
   o.setAttribute      = MO.FG3dProgram_setAttribute;
   o.setParameter      = MO.FG3dProgram_setParameter;
   o.setParameter4     = MO.FG3dProgram_setParameter4;
   o.setSampler        = MO.FG3dProgram_setSampler;
   o.upload            = MO.Method.virtual(o, 'upload');
   o.dispose           = MO.FG3dProgram_dispose;
   return o;
}
MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramAttribute);
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
      r = o._attributes = new MO.TDictionary();
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
   var r = MO.Class.create(MO.FG3dProgramParameter);
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
      r = o._parameters = new MO.TDictionary();
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
   var r = MO.Class.create(MO.FG3dProgramSampler);
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
      r = o._samplers = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
}
MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == MO.SMatrix3d) || (t == MO.SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == MO.SColor4){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == MO.SPoint3) || (t == MO.SVector3)){
      d = MO.Lang.TypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == MO.SPoint4) || (t == MO.SVector4)){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new MO.TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   if(p.attachData(d)){
      o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
   }
}
MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = MO.Lang.TypeArray.float4();
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
      throw new MO.TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   o._graphicContext.bindTexture(p._slot, p._index, pt);
}
MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
   var o = this;
   o._attributes = MO.Lang.Object.dispose(o._attributes, true);
   o._parameters = MO.Lang.Object.dispose(o._parameters, true);
   o._samplers = MO.Lang.Object.dispose(o._samplers, true);
   o._vertexShader = MO.Lang.Object.dispose(o._vertexShader);
   o._fragmentShader = MO.Lang.Object.dispose(o._fragmentShader);
   o.__base.FG3dObject.dispose.call(o);
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
MO.FG3dProgramParameter = function FG3dProgramParameter(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._formatCd   = MO.EG3dParameterFormat.Unknown;
   o._define     = MO.Class.register(o, new MO.AGetter('_define'));
   o._statusUsed = false;
   o._slot       = null;
   o._size       = 0;
   o._buffer     = null;
   o._memory     = null;
   o.attachData  = MO.FG3dProgramParameter_attachData;
   o.loadConfig  = MO.FG3dProgramParameter_loadConfig;
   o.dispose     = MO.FG3dProgramParameter_dispose;
   return o;
}
MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(value){
   var o = this;
   var result = false;
   var clazz = value.constructor;
   if(clazz == MO.SMatrix3d){
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(16);
      }
      result = MO.Lang.Float.attach(memory, value._data, 16);
   }else if(clazz == Float32Array){
      var length = value.length;
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(length);
      }
      result = MO.Lang.Float.attach(memory, value, length);
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   return result;
}
MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dParameterFormat, xconfig.get('format'));
   o._define = xconfig.get('define');
}
MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
   var o = this;
   o._slot = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
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
   o._bind = MO.Lang.Boolean.parse(xconfig.get('bind', 'Y'));
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dTexture, xconfig.get('format', 'Flat2d'));
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
MO.FG3dAutomaticEffect = function FG3dAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dEffect);
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
   o.setup                        = MO.FG3dAutomaticEffect_setup;
   o.buildInfo                    = MO.FG3dAutomaticEffect_buildInfo;
   o.bindAttributes               = MO.FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers                 = MO.FG3dAutomaticEffect_bindSamplers;
   o.bindMaterialSamplers         = MO.FG3dAutomaticEffect_bindMaterialSamplers;
   o.bindMaterial                 = MO.FG3dAutomaticEffect_bindMaterial;
   o.drawRenderable               = MO.FG3dAutomaticEffect_drawRenderable;
   return o;
}
MO.FG3dAutomaticEffect_setup = function FG3dAutomaticEffect_setup(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   o._supportLayout = cp.optionLayout;
}
MO.FG3dAutomaticEffect_buildInfo = function FG3dAutomaticEffect_buildInfo(tagContext, info){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var flag = new MO.TString();
   flag.append(info.techniqueModeCode)
   tagContext.set("technique.mode", info.techniqueModeCode);
   var om = o._optionMerge = info.optionMerge;
   if(om){
      var mergeCount = info.mergeCount;
      var mergeStride = info.mergeStride;
      flag.append("|OI" + mergeCount);
      tagContext.setBoolean("option.instance", true);
      tagContext.set("instance.count", mergeCount);
      tagContext.set("instance.length", mergeStride * mergeCount);
   }
   if(capability.optionMaterialMap){
      flag.append("|OM");
      tagContext.setBoolean("option.material.map", true);
      o._supportMaterialMap = true;
   }
   if(info.optionNormalInvert){
      flag.append("|ON");
      tagContext.setBoolean("option.normal.invert", true);
      o._supportNormalInvert = true;
   }
   if(info.optionColor){
      flag.append("|OC");
      tagContext.setBoolean("option.color", true);
      o.optionAmbient = true;
   }
   if(info.optionAmbient){
      flag.append("|OA");
      tagContext.setBoolean("option.ambient", true);
      o.optionAmbient = true;
   }
   if(info.optionDiffuse){
      flag.append("|OD");
      tagContext.setBoolean("option.diffuse", true);
      o.optionDiffuse = true;
   }
   if(info.optionSpecular){
      flag.append("|OS");
      tagContext.setBoolean("option.specular", true);
      o.optionSpecular = true;
   }
   if(info.optionReflect){
      flag.append("|ORL");
      tagContext.setBoolean("option.reflect", true);
      o.optionReflect = true;
   }
   if(info.optionRefract){
      flag.append("|ORF");
      tagContext.setBoolean("option.refract", true);
      o.optionRefract = true;
   }
   var ac = info.attributeContains(MO.EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      flag.append("|AC");
      tagContext.setBoolean("vertex.attribute.color", true);
   }
   var ad = info.attributeContains(MO.EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      flag.append("|AD");
      tagContext.setBoolean("vertex.attribute.coord", true);
   }
   var an = info.attributeContains(MO.EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      flag.append("|AN");
      tagContext.setBoolean("vertex.attribute.normal", true);
   }
   var ab = info.attributeContains(MO.EG3dAttribute.Binormal);
   var at = info.attributeContains(MO.EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      flag.append("|ANF");
      tagContext.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicVertexNormalCompress = info.optionNormalCompress;
   if(o._dynamicVertexNormalCompress){
      flag.append("|ANC");
      tagContext.setBoolean("vertex.attribute.normal.compress", true);
   }
   o._dynamicInstance = (o._supportInstance && capability.optionInstance);
   if(o._dynamicInstance){
      flag.append("|SI");
      if(info){
         tagContext.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      flag.append("|SS");
      if(info){
         tagContext.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = info.samplerContains(MO.EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      flag.append("|RA");
      if(info){
         tagContext.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      flag.append("|TA");
      if(info){
         tagContext.setBoolean("support.ambient", true);
      }
      if(sdf){
         flag.append("|TAS");
         if(info){
            tagContext.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   if(info.samplerContains(MO.EG3dSampler.Alpha)){
      tagContext.setBoolean("support.alpha.sampler", true);
   }
   var snr = info.samplerContains(MO.EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(info){
         tagContext.setBoolean("support.diffuse", true);
      }
      if(snr){
         flag.append("|TDD");
         if(info){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDN");
         if(info){
            tagContext.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(info){
         tagContext.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         flag.append("|TDVD");
         if(info){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDVN");
         if(info){
            tagContext.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = info.samplerContains(MO.EG3dSampler.SpecularColor);
   var spl = info.samplerContains(MO.EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      flag.append("|TS");
      if(info){
         tagContext.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSC");
         if(info){
            tagContext.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSL");
         if(info){
            tagContext.setBoolean("support.specular.level", true);
         }
      }else{
         flag.append("|NSL");
         if(info){
            tagContext.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      flag.append("|TSV");
      if(info){
         tagContext.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSVC");
         if(info){
            tagContext.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSVL");
         if(info){
            tagContext.setBoolean("support.specular.view.level", true);
         }
      }else{
         flag.append("|NSVL");
         if(info){
            tagContext.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = info.samplerContains(MO.EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      flag.append("|TL");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.light", true);
      }
   }
   var slr = info.samplerContains(MO.EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      flag.append("|TRL");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.reflect", true);
      }
   }
   var slf = info.samplerContains(MO.EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      flag.append("|TRF");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.refract", true);
      }
   }
   var sle = info.samplerContains(MO.EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      flag.append("|TLE");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.emissive", true);
      }
   }
   var shg = info.samplerContains(MO.EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      flag.append("|TH");
      if(info){
         tagContext.setBoolean("support.height", true);
      }
   }
   var sen = info.samplerContains(MO.EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      flag.append("|TE");
      if(info){
         tagContext.setBoolean("support.environment", true);
      }
   }
   if(o._dynamicSkeleton){
      var boneCount = capability.calculateBoneCount(info.vertexBoneCount, info.vertexCount);
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
      throw new MO.TError(o, 'Index buffer is not found.');
   }
   if(o._supportLayout){
      layout.deactive();
   }
}
MO.FG3dSelectAutomaticEffect = function FG3dSelectAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = MO.FG3dSelectAutomaticEffect_drawRenderable;
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
   program.setParameter('vc_vp_matrix', region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
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
MO.FG3dSelectPass = function FG3dSelectPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code         = 'select';
   o._texture      = MO.Class.register(o, new MO.AGetter('_texture'));
   o._renderTarget = null;
   o._position     = null;
   o._data         = null;
   o.construct     = MO.FG3dSelectPass_construct;
   o.setup         = MO.FG3dSelectPass_setup;
   o.drawRegion    = MO.FG3dSelectPass_drawRegion;
   return o;
}
MO.FG3dSelectPass_construct = function FG3dSelectPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   o._data = new Uint8Array(4);
   o._position = new MO.SPoint2();
}
MO.FG3dSelectPass_setup = function FG3dSelectPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   var T = o._texture = c.createFlatTexture();
   T.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   T.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
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
MO.FG3dSelectSkeletonEffect = function FG3dSelectSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = MO.FG3dSelectSkeletonEffect_drawRenderable;
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
   p.setParameter('vc_vp_matrix', pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
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
MO.FG3dSelectTechnique = function FG3dSelectTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code       = 'select';
   o._passSelect = MO.Class.register(o, new MO.AGetter('_passSelect'));
   o.setup       = MO.FG3dSelectTechnique_setup;
   o.test        = MO.FG3dSelectTechnique_test;
   return o;
}
MO.FG3dSelectTechnique_setup = function FG3dSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var pd = o._passSelect = MO.Class.create(MO.FG3dSelectPass);
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
MO.FWglContext = function FWglContext(o){
   o = MO.Class.inherits(this, o, MO.FG3dContext);
   o._handle             = MO.Class.register(o, new MO.AGetter('_handle'));
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
   o.construct           = MO.FWglContext_construct;
   o.isValid             = MO.FWglContext_isValid;
   o.linkCanvas          = MO.FWglContext_linkCanvas;
   o.parameter           = MO.FWglContext_parameter;
   o.parameters          = MO.FWglContext_parameters;
   o.extension           = MO.FWglContext_extension;
   o.extensions          = MO.FWglContext_extensions;
   o.recordBegin         = MO.FWglContext_recordBegin;
   o.recordEnd           = MO.FWglContext_recordEnd;
   o.createProgram       = MO.FWglContext_createProgram;
   o.createLayout        = MO.FWglContext_createLayout;
   o.createVertexBuffer  = MO.FWglContext_createVertexBuffer;
   o.createIndexBuffer   = MO.FWglContext_createIndexBuffer;
   o.createFlatTexture   = MO.FWglContext_createFlatTexture;
   o.createCubeTexture   = MO.FWglContext_createCubeTexture;
   o.createRenderTarget  = MO.FWglContext_createRenderTarget;
   o.setViewport         = MO.FWglContext_setViewport;
   o.setFillMode         = MO.FWglContext_setFillMode;
   o.setDepthMode        = MO.FWglContext_setDepthMode;
   o.setCullingMode      = MO.FWglContext_setCullingMode;
   o.setBlendFactors     = MO.FWglContext_setBlendFactors;
   o.setScissorRectangle = MO.FWglContext_setScissorRectangle;
   o.setRenderTarget     = MO.FWglContext_setRenderTarget;
   o.setProgram          = MO.FWglContext_setProgram;
   o.bindConst           = MO.FWglContext_bindConst;
   o.bindVertexBuffer    = MO.FWglContext_bindVertexBuffer;
   o.bindTexture         = MO.FWglContext_bindTexture;
   o.clear               = MO.FWglContext_clear;
   o.clearColor          = MO.FWglContext_clearColor;
   o.clearDepth          = MO.FWglContext_clearDepth;
   o.readPixels          = MO.FWglContext_readPixels;
   o.drawTriangles       = MO.FWglContext_drawTriangles;
   o.present             = MO.FWglContext_present;
   o.checkError          = MO.FWglContext_checkError;
   o.saveConfig          = MO.FWglContext_saveConfig;
   o.dispose             = MO.FWglContext_dispose;
   return o;
}
MO.FWglContext_construct = function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new MO.SG3dContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
   o._recordBuffers = new MO.TObjects();
   o._recordSamplers = new MO.TObjects();
}
MO.FWglContext_isValid = function FWglContext_isValid(){
   return this._handle;
}
MO.FWglContext_linkCanvas = function FWglContext_linkCanvas(hCanvas){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, hCanvas)
   o._hCanvas = hCanvas;
   if(hCanvas.getContext){
      var parameters = new Object();
      parameters.alpha = o._optionAlpha;
      parameters.antialias = o._optionAntialias;
      var handle = null;
      var codes = ['experimental-webgl2', 'experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl']
      var count = codes.length;
      for(var i = 0; i < count; i++){
         var code = codes[i];
         handle = hCanvas.getContext(code, parameters);
         if(handle){
            MO.Logger.debug(o, 'Create context3d. (code={1}, handle={2})', code, handle);
            break;
         }
      }
      if(!handle){
         MO.Logger.error(o, 'Create context3d failure.');
         var event = new MO.SEvent(o);
         event.code = MO.EGraphicError.UnsupportWebGL;
         event.message = "Current browser can't support WebGL technique.";
         MO.Window.processDeviceError(event);
         event.dispose();
         return false;
      }
      o._handle = handle;
      o._contextAttributes = handle.getContextAttributes();
   }else{
      var event = new MO.SEvent(o);
      event.code = MO.EGraphicError.UnsupportWebGL;
      event.message = "Canvas can't support WebGL technique.";
      MO.Window.processDeviceError(event);
      event.dispose();
      return false;
   }
   var handle = o._handle;
   o.setDepthMode(true, MO.EG3dDepthMode.LessEqual);
   o.setCullingMode(true, MO.EG3dCullMode.Front);
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
   var shader = capability.shader = new Object();
   var vertexPrecision = shader.vertexPrecision = new Object();
   if(handle.getShaderPrecisionFormat){
      vertexPrecision.floatLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_FLOAT);
      vertexPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_FLOAT);
      vertexPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_FLOAT);
      vertexPrecision.intLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_INT);
      vertexPrecision.intMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_INT);
      vertexPrecision.intHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_INT);
   }
   var fragmentPrecision = shader.fragmentPrecision = new Object();
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
   return true;
}
MO.FWglContext_parameter = function FWglContext_parameter(name){
   var parameters = this.parameters();
   return parameters[name];
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
MO.FWglContext_extension = function FWglContext_extension(name){
   var extensions = this.extensions();
   return extensions[name];
}
MO.FWglContext_extensions = function FWglContext_extensions(){
   var o = this;
   var extensions = o._extensions;
   if(!extensions){
      extensions = o._extensions = new Object();
      var handle = o._handle;
      var names = handle.getSupportedExtensions();
      var count = names.length;
      for(var i = 0; i < count; i++){
         var name = names[i];
         extensions[name] = handle.getExtension(name);
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
   var program = o.createObject(MO.FWglProgram);
   o._storePrograms.push(program);
   o._statistics._programTotal++;
   return program;
}
MO.FWglContext_createLayout = function FWglContext_createLayout(){
   var o = this;
   var layout = MO.Class.create(MO.FWglLayout);
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
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglVertexBuffer));
   buffer.linkGraphicContext(o);
   buffer.setup();
   o._storeBuffers.push(buffer);
   o._statistics._vertexBufferTotal++;
   return buffer;
}
MO.FWglContext_createIndexBuffer = function FWglContext_createIndexBuffer(clazz){
   var o = this;
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglIndexBuffer));
   o._storeBuffers.push(buffer);
   o._statistics._indexBufferTotal++;
   return buffer;
}
MO.FWglContext_createFlatTexture = function FWglContext_createFlatTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglFlatTexture));
   o._storeTextures.push(texture);
   o._statistics._flatTextureTotal++;
   return texture;
}
MO.FWglContext_createCubeTexture = function FWglContext_createCubeTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglCubeTexture));
   o._storeTextures.push(texture);
   o._statistics._cubeTextureTotal++;
   return texture;
}
MO.FWglContext_createRenderTarget = function FWglContext_createRenderTarget(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglRenderTarget));
   o._storeTargets.push(target);
   o._statistics._targetTotal++;
   return target;
}
MO.FWglContext_setViewport = function FWglContext_setViewport(left, top, width, height){
   var o = this;
   o._size.set(width, height);
   o._viewportRectangle.set(left, top, width, height);
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
         throw new MO.TError('Invalid parameter. (fill_mode={1})', fillModeCd);
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
      var depthCode = MO.RWglUtility.convertDepthMode(graphic, depthCd);
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
      var cullValue = MO.RWglUtility.convertCullMode(graphic, cullCd);
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
      var sourceValue = MO.RWglUtility.convertBlendFactors(graphic, sourceCd);
      var tagetValue = MO.RWglUtility.convertBlendFactors(graphic, tagetCd);
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
      case MO.EG3dParameterFormat.Float1:{
         graphic.uniform1fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float2:{
         graphic.uniform2fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3:{
         graphic.uniform3fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float4:{
         graphic.uniform4fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3x3:{
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
      case MO.EG3dParameterFormat.Float4x4:{
         var bytes = null;
         if(data.constructor == Float32Array){
            bytes = data;
         }else if(data.writeData){
            bytes = o._data16;
            data.writeData(bytes, 0);
         }else{
            throw new MO.TError('Unknown data type.');
         }
         graphic.uniformMatrix4fv(slot, graphic.FALSE, bytes);
         o._statistics._frameConstLength += bytes.byteLength;
         result = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown format type. (format_cd={1})', formatCd);
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
      var layout = new MO.SG3dLayoutBuffer();
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
      case MO.EG3dAttributeFormat.Float1:
         graphic.vertexAttribPointer(slot, 1, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float2:
         graphic.vertexAttribPointer(slot, 2, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float3:
         graphic.vertexAttribPointer(slot, 3, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float4:
         graphic.vertexAttribPointer(slot, 4, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4Normal:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, true, stride, offset);
         break;
      default:
         throw new MO.TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
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
      var layout = new MO.SG3dLayoutSampler();
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
   var textureCd = texture.textureCd();
   switch(textureCd){
      case MO.EG3dTexture.Flat2d:{
         graphic.bindTexture(graphic.TEXTURE_2D, handle);
         result = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      case MO.EG3dTexture.Cube:{
         graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, handle);
         result = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown texture type.');
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
   var strideValue = MO.RWglUtility.convertIndexStride(graphic, strideCd);
   var offsetValue = 0;
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         offsetValue = offset << 1;
         break;
      case MO.EG3dIndexStride.Uint32:
         offsetValue = offset << 2;
         break;
   }
   var drawModeCd = indexBuffer.drawModeCd();
   var drawModeValue = MO.RWglUtility.convertDrawMode(graphic, drawModeCd);
   switch(drawModeCd){
      case MO.EG3dDrawMode.Line:
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
MO.FWglContext_saveConfig = function FWglContext_saveConfig(xconfig){
   var o = this;
   var parameters = o.parameters();
   var xparameters = xconfig.create('Parameters');
   MO.Lang.Xml.saveObject(xparameters, 'Parameter', parameters);
   var extensions = o.extensions();
   var xextensions = xconfig.create('Extensions');
   MO.Lang.Xml.saveObject(xextensions, 'Extension', extensions);
}
MO.FWglContext_dispose = function FWglContext_dispose(){
   var o = this;
   o._data9 = null;
   o._data16 = null;
   o._recordBuffers = MO.Lang.Object.dispose(o._recordBuffers);
   o._recordSamplers = MO.Lang.Object.dispose(o._recordSamplers);
   o._contextAttributes = null;
   o._parameters = null;
   o._extensions = null;
   o._activeTextureSlot = null;
   o._handleSamplerS3tc = null;
   o._handleDebugShader = null;
   o.__base.FG3dContext.dispose.call(o);
}
MO.FWglCubeTexture = function FWglCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dCubeTexture);
   o._handle    = null;
   o.setup      = MO.FWglCubeTexture_setup;
   o.isValid    = MO.FWglCubeTexture_isValid;
   o.makeMipmap = MO.FWglCubeTexture_makeMipmap;
   o.upload     = MO.FWglCubeTexture_upload;
   o.update     = MO.FWglCubeTexture_update;
   o.dispose    = MO.FWglCubeTexture_dispose;
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
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMinCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
   }
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMagCd);
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
MO.FWglFlatTexture = function FWglFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dFlatTexture);
   o._handle    = null;
   o.setup      = MO.FWglFlatTexture_setup;
   o.isValid    = MO.FWglFlatTexture_isValid;
   o.texture    = MO.FWglFlatTexture_texture;
   o.makeMipmap = MO.FWglFlatTexture_makeMipmap;
   o.uploadData = MO.FWglFlatTexture_uploadData;
   o.upload     = MO.FWglFlatTexture_upload;
   o.update     = MO.FWglFlatTexture_update;
   o.dispose    = MO.FWglFlatTexture_dispose;
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
      throw new MO.TError('Invalid content format.');
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
   }else if(MO.Class.isClass(content, MO.FImage)){
      data = content.image();
   }else if(MO.Class.isClass(content, MO.MCanvasObject)){
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
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMinCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMagCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapS);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_S, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapT);
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
MO.FWglFragmentShader = function FWglFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dFragmentShader);
   o._handle      = null;
   o.setup        = MO.FWglFragmentShader_setup;
   o.targetSource = MO.FWglFragmentShader_targetSource;
   o.upload       = MO.FWglFragmentShader_upload;
   o.dispose      = MO.FWglFragmentShader_dispose;
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
      throw new MO.TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
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
MO.FWglIndexBuffer = function FWglIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dIndexBuffer);
   o._handle = null;
   o.setup   = MO.FWglIndexBuffer_setup;
   o.isValid = MO.FWglIndexBuffer_isValid;
   o.upload  = MO.FWglIndexBuffer_upload;
   o.dispose = MO.FWglIndexBuffer_dispose;
   return o;
}
MO.FWglIndexBuffer_setup = function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._handle = o._graphicContext._handle.createBuffer();
}
MO.FWglIndexBuffer_isValid = function FWglIndexBuffer_isValid(){
   var o = this;
   var handle = o._graphicContext._handle;
   return handle.isBuffer(o._handle);
}
MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(data, count, remain){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   if(remain){
      o._data = data;
   }
   o._count = count;
   var memory = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      if(o._strideCd == MO.EG3dIndexStride.Uint16){
         memory = new Uint16Array(data);
      }else if(o._strideCd == MO.EG3dIndexStride.Uint32){
         memory = new Uint32Array(data);
      }else{
         throw new TError(o, 'Index stride is invalid.');
      }
   }else if(data.constructor == Uint16Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint16){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else if(data.constructor == Uint32Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint32){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else{
      throw new TError(o, 'Upload index data type is invalid. (value={1})', data);
   }
   handle.bindBuffer(handle.ELEMENT_ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bind buffer failure.');
   handle.bufferData(handle.ELEMENT_ARRAY_BUFFER, memory, handle.STATIC_DRAW);
   context.checkError('bufferData', 'Upload buffer data. (count={1})', count);
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
MO.FWglLayout = function FWglLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dLayout);
   o._handle  = null;
   o.setup    = MO.FWglLayout_setup;
   o.bind     = MO.FWglLayout_bind;
   o.unbind   = MO.FWglLayout_unbind;
   o.active   = MO.FWglLayout_active;
   o.deactive = MO.FWglLayout_deactive;
   o.dispose  = MO.FWglLayout_dispose;
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
MO.FWglProgram = function FWglProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dProgram);
   o._handle        = null;
   o.setup          = MO.FWglProgram_setup;
   o.vertexShader   = MO.FWglProgram_vertexShader;
   o.fragmentShader = MO.FWglProgram_fragmentShader;
   o.upload         = MO.FWglProgram_upload;
   o.build          = MO.FWglProgram_build;
   o.link           = MO.FWglProgram_link;
   o.dispose        = MO.FWglProgram_dispose;
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
      shader = o._vertexShader = MO.Class.create(MO.FWglVertexShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_fragmentShader = function FWglProgram_fragmentShader(){
   var o = this;
   var shader = o._fragmentShader;
   if(!shader){
      shader = o._fragmentShader = MO.Class.create(MO.FWglFragmentShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_upload = function FWglProgram_upload(shaderCd, source){
   var o = this;
   if(shaderCd == MO.EG3dShader.Vertex){
      o.vertexShader().upload(source);
   }else if(shaderCd == MO.EG3dShader.Fragment){
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
MO.FWglRenderTarget = function FWglRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dRenderTarget);
   o._optionDepth = true;
   o._handle      = null;
   o._handleDepth = null;
   o.setup        = MO.FWglRenderTarget_setup;
   o.build        = MO.FWglRenderTarget_build;
   o.dispose      = MO.FWglRenderTarget_dispose;
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
MO.FWglVertexBuffer = function FWglVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexBuffer);
   o._handle = null;
   o.setup   = MO.FWglVertexBuffer_setup;
   o.isValid = MO.FWglVertexBuffer_isValid;
   o.upload  = MO.FWglVertexBuffer_upload;
   o.dispose = MO.FWglVertexBuffer_dispose;
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
MO.FWglVertexBuffer_upload = function FWglVertexBuffer_upload(data, stride, count, remain){
   var o = this;
   var context = o._graphicContext;
   var graphics = context._handle;
   if(remain){
      o._data = data;
   }
   o._stride = stride;
   o._count = count;
   var arrays = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      switch(o._formatCd){
         case MO.EG3dAttributeFormat.Float1:
         case MO.EG3dAttributeFormat.Float2:
         case MO.EG3dAttributeFormat.Float3:
         case MO.EG3dAttributeFormat.Float4:
            arrays = new Float32Array(data);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            arrays = new Uint8Array(data);
            break;
         default:
            throw new MO.TError(o, 'Unknown data type.');
      }
   }else if(data.constructor == Uint8Array){
      arrays = data;
   }else if(data.constructor == Float32Array){
      arrays = data;
   }else{
      throw new MO.TError(o, 'Upload vertex data type is invalid. (data={1})', data);
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
MO.FWglVertexShader = function FWglVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexShader);
   o._handle      = null;
   o.setup        = MO.FWglVertexShader_setup;
   o.targetSource = MO.FWglVertexShader_targetSource;
   o.upload       = MO.FWglVertexShader_upload;
   o.dispose      = MO.FWglVertexShader_dispose;
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
      throw new MO.TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
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
MO.MEventDispatcher = function MEventDispatcher(o){
   o = MO.Class.inherits(this, o);
   o.onOperationDown        = MO.Method.empty;
   o.onOperationMove        = MO.Method.empty;
   o.onOperationUp          = MO.Method.empty;
   o.onOperationWheel       = MO.Method.empty;
   o.onOperationKeyDown     = MO.Method.empty;
   o.onOperationKeyPress    = MO.Method.empty;
   o.onOperationKeyUp       = MO.Method.empty;
   o.onOperationResize      = MO.Method.empty;
   o.onOperationVisibility  = MO.Method.empty;
   o.onOperationOrientation = MO.Method.empty;
   o.dispatcherEvent        = MO.MEventDispatcher_dispatcherEvent;
   return o;
}
MO.MEventDispatcher_dispatcherEvent = function MEventDispatcher_dispatcherEvent(event, flag){
   var o = this;
   switch(event.code){
      case MO.EEvent.MouseDown:
         o.onOperationDown(event);
         break;
      case MO.EEvent.MouseMove:
         o.onOperationMove(event);
         break;
      case MO.EEvent.MouseUp:
         o.onOperationUp(event);
         break;
      case MO.EEvent.MouseWheel:
         o.onOperationWheel(event);
         break;
      case MO.EEvent.KeyDown:
         o.onOperationKeyDown(event);
         break;
      case MO.EEvent.KeyPress:
         o.onOperationKeyPress(event);
         break;
      case MO.EEvent.KeyUp:
         o.onOperationKeyUp(event);
         break;
      case MO.EEvent.Resize:
         o.onOperationResize(event);
         break;
      case MO.EEvent.Visibility:
         o.onOperationVisibility(event);
         break;
      case MO.EEvent.Orientation:
         o.onOperationOrientation(event);
         break;
      default:
         throw new MO.TError('Unknown event type.');
   }
}
MO.MReady = function MReady(o){
   o = MO.Class.inherits(this, o);
   o.testReady = MO.Method.virtual(o, 'testReady');
   return o;
}
MO.MRenderableLinker = function MRenderableLinker(o){
   o = MO.Class.inherits(this, o);
   o._renderable = MO.RClass.register(o, new MO.AGetter('_renderable'));
   o.dispose     = MO.MRenderableLinker_dispose;
   return o;
}
MO.MRenderableLinker_dispose = function MRenderableLinker_dispose(){
   var o = this;
   o._renderable = null;
}
MO.MResourceData = function MResourceData(o){
   o = MO.Class.inherits(this, o);
   o._ready          = false;
   o._guid           = null;
   o._index          = -1;
   o._compressData   = MO.Class.register(o, new MO.AGetSet('_compressData'));
   o._data           = null;
   o.testReady       = MO.MResourceData_testReady;
   o.completeData    = MO.MResourceData_completeData;
   o.dispose         = MO.MResourceData_dispose;
   return o;
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
MO.MTimeline = function MTimeline(o){
   o = MO.Class.inherits(this, o, MO.MTimelineWorker);
   return o;
}
MO.MTimelineAction = function MTimelineAction(o){
   o = MO.Class.inherits(this, o, MO.MTimelineWorker);
   return o;
}
MO.MTimelineActions = function MTimelineActions(o){
   o = MO.Class.inherits(this, o);
   o._actions   = MO.Class.register(o, new MO.AGetter('_actions'));
   o.construct  = MO.MTimelineActions_construct;
   o.setup      = MO.MTimelineActions_setup;
   o.pushAction = MO.MTimelineActions_pushAction;
   o.process    = MO.MTimelineActions_process;
   o.dispose    = MO.MTimelineActions_dispose;
   return o;
}
MO.MTimelineActions_construct = function MTimelineActions_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._actions = new MO.TObjects();
}
MO.MTimelineActions_setup = function MTimelineActions_setup(){
   var o = this;
}
MO.MTimelineActions_pushAction = function MTimelineActions_pushAction(action){
   this._actions.push(action);
}
MO.MTimelineActions_process = function MTimelineActions_process(context){
   var o = this;
   var tick = context.tick;
   var actions = o._actions;
   var count = actions.count();
   for(var i = count - 1; i >= 0; i--){
      var action = actions.at(i);
      var actionTick = tick - action.tick;
      if(actionTick < 0){
         continue;
      }
      if(!action.statusStart()){
         action.start();
      }else if(action.statusStop()){
         actions.erase(i);
         action.dispose();
      }else{
         var duration = action.duration();
         if(duration != 0){
            if(actionTick > duration){
               action.stop();
               continue;
            }
         }
         context.tick = actionTick;
         action.process(context);
      }
   }
   context.tick = tick;
}
MO.MTimelineActions_dispose = function MTimelineActions_dispose(){
   var o = this;
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   o.__base.FObject.dispose.call(o);
}
MO.MTimelines = function MTimelines(o){
   o = MO.Class.inherits(this, o);
   o._timelines   = MO.Class.register(o, new MO.AGetter('_timelines'));
   o.construct    = MO.MTimelines_construct;
   o.setup        = MO.MTimelines_setup;
   o.pushTimeline = MO.MTimelines_pushTimeline;
   o.process      = MO.MTimelines_process;
   o.dispose      = MO.MTimelines_dispose;
   return o;
}
MO.MTimelines_construct = function MTimelines_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._timelines = new MO.TObjects();
}
MO.MTimelines_setup = function MTimelines_setup(){
   var o = this;
}
MO.MTimelines_pushTimeline = function MTimelines_pushTimeline(timeline){
   this._timelines.push(timeline);
}
MO.MTimelines_process = function MTimelines_process(context){
   var o = this;
   var tick = context.tick;
   var timelines = o._timelines;
   var count = timelines.count();
   for(var i = count - 1; i >= 0; i--){
      var timeline = timelines.at(i);
      var timelineTick = tick - timeline.tick;
      if(timelineTick < 0){
         continue;
      }
      if(!timeline.statusStart()){
         timeline.start();
      }else if(timeline.statusStop()){
         timelines.erase(i);
         timeline.dispose();
      }else{
         var duration = timeline.duration();
         if(duration != 0){
            if(timelineTick > duration){
               timeline.stop();
               continue;
            }
         }
         context.tick = timelineTick;
         timeline.process(context);
      }
   }
   context.tick = tick;
}
MO.MTimelines_dispose = function MTimelines_dispose(){
   var o = this;
   o._timelines = MO.Lang.Obejct.dispose(o._timelines);
   o.__base.FObject.dispose.call(o);
}
MO.MTimelineWorker = function MTimelineWorker(o){
   o = MO.Class.inherits(this, o);
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._tick        = MO.Class.register(o, new MO.AGetSet('_tick'), 0);
   o._duration    = MO.Class.register(o, new MO.AGetSet('_duration'), 0);
   o._statusStart = MO.Class.register(o, new MO.AGetter('_statusStart'), false);
   o._statusStop  = MO.Class.register(o, new MO.AGetter('_statusStop'), false);
   o.onStart      = MO.MTimelineWorker_onStart;
   o.onStop       = MO.MTimelineWorker_onStop;
   o.construct    = MO.MTimelineWorker_construct;
   o.setup        = MO.MTimelineWorker_setup;
   o.start        = MO.MTimelineWorker_start;
   o.process      = MO.MTimelineWorker_process;
   o.stop         = MO.MTimelineWorker_stop;
   o.dispose      = MO.MTimelineWorker_dispose;
   return o;
}
MO.MTimelineWorker_onStart = function MTimelineWorker_onStart(){
   var o = this;
}
MO.MTimelineWorker_onStop = function MTimelineWorker_onStop(){
   var o = this;
}
MO.MTimelineWorker_construct = function MTimelineWorker_construct(){
   var o = this;
}
MO.MTimelineWorker_setup = function MTimelineWorker_setup(){
   var o = this;
   o._statusStart = false;
}
MO.MTimelineWorker_start = function MTimelineWorker_start(){
   var o = this;
   if(!o._statusStart){
      o.onStart();
      o._statusStart = true;
   }
   o._statusStop = false;
}
MO.MTimelineWorker_process = function MTimelineWorker_process(){
   var o = this;
}
MO.MTimelineWorker_stop = function MTimelineWorker_stop(){
   var o = this;
   if(!o._statusStop){
      o.onStop();
      o._statusStop = true;
   }
}
MO.MTimelineWorker_dispose = function MTimelineWorker_dispose(){
   var o = this;
}
MO.STimelineContext = function STimelineContext(){
   var o = this;
   o._mainTimeline = null;
   o._timeline     = null;
   o._action       = null;
   return o;
}
MO.FCanvas = function FCanvas(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._desktop     = MO.Class.register(o, new MO.AGetSet('_desktop'));
   o._activeStage = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o.construct    = MO.FCanvas_construct;
   o.dispose      = MO.FCanvas_dispose;
   return o;
}
MO.FCanvas_construct = function FCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FCanvas_dispose = function FCanvas_dispose(){
   var o = this;
   o._desktop = null;
   o.__base.FObject.dispose.call(o);
}
MO.FDesktop = function FDesktop(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MEventDispatcher);
   o._size            = MO.Class.register(o, new MO.AGetter('_size'));
   o._sizeRate        = MO.Class.register(o, new MO.AGetter('_sizeRate'), 1);
   o._calculateSize   = MO.Class.register(o, new MO.AGetter('_calculateSize'));
   o._calculateRate   = MO.Class.register(o, new MO.AGetter('_calculateRate'));
   o._logicSize       = MO.Class.register(o, new MO.AGetter('_logicSize'));
   o._logicRate       = MO.Class.register(o, new MO.AGetter('_logicRate'));
   o._screenSize      = MO.Class.register(o, new MO.AGetter('_screenSize'));
   o._canvases        = MO.Class.register(o, new MO.AGetter('_canvases'));
   o.construct        = MO.FDesktop_construct;
   o.canvasRegister   = MO.FDesktop_canvasRegister;
   o.canvasUnregister = MO.FDesktop_canvasUnregister;
   o.setup            = MO.FDesktop_setup;
   o.build            = MO.FDesktop_build;
   o.resize           = MO.FDesktop_resize;
   o.processEvent     = MO.FDesktop_processEvent;
   o.process          = MO.FDesktop_process;
   o.dispose          = MO.FDesktop_dispose;
   return o;
}
MO.FDesktop_construct = function FDesktop_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
   o._calculateSize = new MO.SSize2(1280, 720);
   o._calculateRate = new MO.SSize2(1, 1);
   o._logicSize = new MO.SSize2(1280, 720);
   o._logicRate = new MO.SSize2(1, 1);
   o._screenSize = new MO.SSize2(1280, 720);
   o._canvases = new MO.TObjects();
}
MO.FDesktop_canvasRegister = function FDesktop_canvasRegister(canvas){
   var canvases = this._canvases;
   MO.Assert.debugFalse(canvases.contains(canvas));
   canvases.push(canvas);
}
MO.FDesktop_canvasUnregister = function FDesktop_canvasUnregister(canvas){
   var canvases = this._canvases;
   MO.Assert.debugTrue(canvases.contains(canvas));
   canvases.remove(canvas);
}
MO.FDesktop_setup = function FDesktop_setup(hPanel){
   var o = this;
}
MO.FDesktop_build = function FDesktop_build(hPanel){
   var o = this;
}
MO.FDesktop_resize = function FDesktop_resize(){
   var o = this;
}
MO.FDesktop_processEvent = function FDesktop_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
}
MO.FDesktop_process = function FDesktop_process(){
   var o = this;
}
MO.FDesktop_dispose = function FDesktop_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._calculateSize = MO.Lang.Object.dispose(o._calculateSize);
   o._logicSize = MO.Lang.Object.dispose(o._logicSize);
   o._logicRate = MO.Lang.Object.dispose(o._logicRate);
   o._screenSize = MO.Lang.Object.dispose(o._screenSize);
   o._canvases = MO.Lang.Object.dispose(o._canvases);
   o.__base.FObject.dispose.call(o);
}
MO.FDisplay = function FDisplay(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MGraphicObject);
   o._currentMatrix    = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix           = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._location         = MO.Class.register(o, new MO.AGetter('_location'));
   o._rotation         = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale            = MO.Class.register(o, new MO.AGetter('_scale'));
   o._visible          = true;
   o._renderables      = null;
   o.construct         = MO.FDisplay_construct;
   o.hasRenderable     = MO.FDisplay_hasRenderable;
   o.renderables       = MO.FDisplay_renderables;
   o.pushRenderable    = MO.FDisplay_pushRenderable;
   o.removeRenderable  = MO.FDisplay_removeRenderable;
   o.clearRenderables  = MO.FDisplay_clearRenderables;
   o.push              = MO.FDisplay_push;
   o.remove            = MO.FDisplay_remove;
   o.filterDisplays    = MO.FDisplay_filterDisplays;
   o.filterRenderables = MO.FDisplay_filterRenderables;
   o.show              = MO.FDisplay_show;
   o.hide              = MO.FDisplay_hide;
   o.setVisible        = MO.FDisplay_setVisible;
   o.update            = MO.FDisplay_update;
   o.updateMatrix      = MO.FDisplay_updateMatrix;
   o.process           = MO.FDisplay_process;
   o.dispose           = MO.FDisplay_dispose;
   return o;
}
MO.FDisplay_construct = function FDisplay_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
   o._location = new MO.SPoint3();
   o._rotation = new MO.SVector3();
   o._scale = new MO.SVector3(1, 1, 1);
}
MO.FDisplay_hasRenderable = function FDisplay_hasRenderable(){
   var renderables = this._renderables;
   return renderables ? !renderables.isEmpty() : false;
}
MO.FDisplay_renderables = function FDisplay_renderables(){
   var o = this;
   var renderables = o._renderables;
   if(!renderables){
      renderables = o._renderables = new MO.TObjects();
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
   if(MO.Class.isClass(item, MO.FRenderable)){
      o.pushRenderable(item);
   }else if(MO.Class.isClass(item, MO.MRenderableLinker)){
      o.pushRenderable(item.renderable());
   }else if(MO.Class.isClass(item, MO.FDisplay)){
      o.pushDisplay(item);
   }else{
      throw new MO.TError(o, 'Unknown item type.');
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
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._direction = MO.Lang.Object.dispose(o._direction);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o._renderables = MO.Lang.Object.dispose(o._renderables);
   o.__base.FComponent.dispose.call(o);
}
MO.FDisplayContainer = function FDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FDisplay);
   o._displays         = null;
   o.hasDisplay        = MO.FDisplayContainer_hasDisplay;
   o.findDisplay       = MO.FDisplayContainer_findDisplay;
   o.searchDisplay     = MO.FDisplayContainer_searchDisplay;
   o.displays          = MO.FDisplayContainer_displays;
   o.pushDisplay       = MO.FDisplayContainer_pushDisplay;
   o.removeDisplay     = MO.FDisplayContainer_removeDisplay;
   o.filterDisplays    = MO.FDisplayContainer_filterDisplays;
   o.filterRenderables = MO.FDisplayContainer_filterRenderables;
   o.process           = MO.FDisplayContainer_process;
   o.dispose           = MO.FDisplayContainer_dispose;
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
      displays = o._displays = new MO.TObjects();
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
      o._displays = MO.Lang.Object.dispose(displays);
   }
   o.__base.FDisplay.dispose.call(o);
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
MO.FMainTimeline = function FMainTimeline(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions, MO.MTimeline, MO.MTimelines);
   o._context   = null;
   o._startTick = 0;
   o._lastTick  = 0;
   o._interval  = 0;
   o.construct  = MO.FMainTimeline_construct;
   o.setup      = MO.FMainTimeline_setup;
   o.start      = MO.FMainTimeline_start;
   o.process    = MO.FMainTimeline_process;
   o.dispose    = MO.FMainTimeline_dispose;
   return o;
}
MO.FMainTimeline_construct = function FMainTimeline_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineActions.construct.call(o);
   o._context = new MO.STimelineContext();
   o._timelines = new MO.TObjects();
}
MO.FMainTimeline_setup = function FMainTimeline_setup(){
   var o = this;
}
MO.FMainTimeline_start = function FMainTimeline_start(){
   var o = this;
}
MO.FMainTimeline_process = function FMainTimeline_process(){
   var o = this;
   var tick = MO.Timer.current();
   if(tick - o._lastTick < o._interval){
      return false;
   }
   o._lastTick = tick;
   if(o._startTick == 0){
      o._startTick = tick;
   }
   var context = o._context;
   context.tick = o._startTick - tick;
   o.__base.MTimelineActions.process.call(o, context);
   o.__base.MTimelines.process.call(o, context);
}
MO.FMainTimeline_dispose = function FMainTimeline_dispose(){
   var o = this;
   o._timelines = MO.Lang.Object.dispose(o._timelines);
   o._context = MO.Lang.Object.dispose(o._context);
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FReadyLoader = function FReadyLoader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._items           = MO.Class.register(o, new MO.AGetter('_items'));
   o._listenersChange = MO.Class.register(o, new MO.AListener('_listenersChange', MO.EEvent.Change));
   o._statusEvent     = null;
   o._statusReady     = false;
   o.construct        = MO.FReadyLoader_construct;
   o.testReady        = MO.FReadyLoader_testReady;
   o.push             = MO.FReadyLoader_push;
   o.clear            = MO.FReadyLoader_clear;
   o.dispose          = MO.FReadyLoader_dispose;
   return o;
}
MO.FReadyLoader_construct = function FReadyLoader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._items = new MO.TObjects();
   o._statusEvent = new MO.SEvent();
}
MO.FReadyLoader_testReady = function FReadyLoader_testReady(){
   var o = this;
   var ready = o._statusReady;
   if(!ready){
      var items = o._items;
      var count = items.count();
      for(var i = 0; i < count; i++){
         var item = items.at(i);
         if(!item.testReady()){
            return false;
         }
      }
      var event = o._statusEvent;
      event.ready = true;
      o.processChangeListener(event);
      ready = o._statusReady = true;
   }
   return ready;
}
MO.FReadyLoader_push = function FReadyLoader_push(item){
   var o = this;
   o._items.push(item);
   o._statusReady = false;
}
MO.FReadyLoader_clear = function FReadyLoader_clear(){
   var o = this;
   o._items.clear();
   o._statusReady = true;
}
MO.FReadyLoader_dispose = function FReadyLoader_dispose(){
   var o = this;
   o._items = MO.Lang.Object.dispose(o._items);
   o._statusEvent = MO.Lang.Object.dispose(o._statusEvent);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FRegion = function FRegion(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
MO.FRenderable = function FRenderable(o){
   o = MO.Class.inherits(this, o, MO.FDrawable);
   o._drawables      = null;
   o.hasDrawable     = MO.FRenderable_hasDrawable;
   o.drawables       = MO.FRenderable_drawables;
   o.pushDrawable    = MO.FRenderable_pushDrawable;
   o.removeDrawable  = MO.FRenderable_removeDrawable;
   o.filterDrawables = MO.FRenderable_filterDrawables;
   o.process         = MO.FRenderable_process;
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
      drawables = o._drawables = new MO.TObjects();
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
MO.FStage = function FStage(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MListener);
   o._code                = 'stage';
   o._statusActive        = false;
   o._size                = MO.Class.register(o, new MO.AGetter('_size'));
   o._timer               = MO.Class.register(o, new MO.AGetter('_timer'));
   o._layers              = MO.Class.register(o, new MO.AGetter('_layers'));
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   o.onProcess            = MO.FStage_onProcess;
   o.construct            = MO.FStage_construct;
   o.registerLayer        = MO.FStage_registerLayer;
   o.unregisterLayer      = MO.FStage_unregisterLayer;
   o.active               = MO.FStage_active;
   o.deactive             = MO.FStage_deactive;
   o.process              = MO.FStage_process;
   o.dispose              = MO.FStage_dispose;
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
   o._size = new MO.SSize2(1920, 1080);
   o._timer = MO.Class.create(MO.FTimer);
   o._layers = new MO.TDictionary();
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
      timer = MO.Class.create(MO.FTimer);
      timer.setup();
   }
   o.processEnterFrameListener(o);
   o.onProcess();
   o.processLeaveFrameListener(o);
   timer.update();
}
MO.FStage_dispose = function FStage_dispose(){
   var o = this;
   o._timer = MO.Lang.Object.dispose(o._timer);
   o._layers = MO.Lang.Object.dispose(o._layers);
   o.__base.MListener.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
MO.FTimeline = function FTimeline(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions, MO.MTimeline, MO.MTimelines);
   o._mainTimeline = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   o.construct     = MO.FTimeline_construct;
   o.setup         = MO.FTimeline_setup;
   o.process       = MO.FTimeline_process;
   o.dispose       = MO.FTimeline_dispose;
   return o;
}
MO.FTimeline_construct = function FTimeline_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineActions.construct.call(o);
   o._actions = new MO.TObejcts();
}
MO.FTimeline_setup = function FTimeline_setup(){
   var o = this;
}
MO.FTimeline_process = function FTimeline_process(context){
   var o = this;
   o.__base.MTimelineActions.process.call(o, context);
   o.__base.MTimelines.process.call(o, context);
}
MO.FTimeline_dispose = function FTimeline_dispose(){
   var o = this;
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
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
      MO.Timer.update();
   }catch(e){
      alert(e);
   }
}
MO.RStage.prototype.construct = function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new MO.TListeners();
   o.lsnsLeaveFrame = new MO.TListeners();
}
MO.RStage.prototype.register = function RStage_register(name, stage){
   var o = this;
   var stages = o._stages;
   if(!stages){
      stages = o._stages = new MO.TDictionary();
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
   MO.RE3dEngine.setup();
   o.active();
   MO.Timer.setup();
   if(interval == null){
      interval = o._interval;
   }
   o._interval = parseInt(interval);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   o._started = true;
}
MO.RStage = new MO.RStage();
MO.MAudio = function MAudio(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o._ready         = MO.Class.register(o, new MO.AGetterSource('_ready', 'testReady'), false);
   o._loaded        = MO.Class.register(o, new MO.AGetterSource('_loaded', 'testLoaded'), false);
   o._finish        = MO.Class.register(o, new MO.AGetterSource('_finish', 'testFinish'), false);
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o.construct      = MO.MAudio_construct;
   o.volume         = MO.MAudio_volume;
   o.setVolume      = MO.MAudio_setVolume;
   o.loop           = MO.MAudio_loop;
   o.setLoop        = MO.MAudio_setLoop;
   o.play           = MO.MAudio_play;
   o.pause          = MO.MAudio_pause;
   o.dispose        = MO.MAudio_dispose;
   return o;
}
MO.MAudio_construct = function MAudio_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.MAudio_volume = function MAudio_volume(){
   return 0;
}
MO.MAudio_setVolume = function MAudio_setVolume(value){
}
MO.MAudio_loop = function MAudio_loop(){
   return false;
}
MO.MAudio_setLoop = function MAudio_setLoop(value){
}
MO.MAudio_play = function MAudio_play(position){
}
MO.MAudio_pause = function MAudio_pause(){
}
MO.MAudio_dispose = function MAudio_dispose(){
   var o = this;
   o.__base.MListener.dispose.call(o);
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
MO.FAudio = function FAudio(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAudio);
   o._url      = MO.Class.register(o, new MO.AGetter('_url'));
   o._hAudio   = null;
   o.ohLoad    = MO.FAudio_ohLoad;
   o.ohLoaded  = MO.FAudio_ohLoaded;
   o.ohError   = MO.FAudio_ohError;
   o.construct = MO.FAudio_construct;
   o.volume    = MO.FAudio_volume;
   o.setVolume = MO.FAudio_setVolume;
   o.loop      = MO.FAudio_loop;
   o.setLoop   = MO.FAudio_setLoop;
   o.play      = MO.FAudio_play;
   o.pause     = MO.FAudio_pause;
   o.loadUrl   = MO.FAudio_loadUrl;
   o.select    = MO.FAudio_select;
   o.dispose   = MO.FAudio_dispose;
   return o;
}
MO.FAudio_ohLoad = function FAudio_ohLoad(){
   var o = this.__linker;
   o._ready = true;
   o._hAudio.oncanplay = null;
   MO.Logger.info(o, 'Audio load success. (url={1})', o._url);
}
MO.FAudio_ohLoaded = function FAudio_ohLoaded(event){
   var o = this.__linker;
   o._ready = true;
   o._loaded = true;
   o._finish = true;
   o._hAudio.oncanplaythrough = null;
   MO.Logger.info(o, 'Audio loaded success. (url={1})', o._url);
}
MO.FAudio_ohError = function FAudio_ohError(event){
   var o = this.__linker;
   o._finish = true;
   MO.Logger.error(o, 'Audio load failure. (url={1})', o._url);
}
MO.FAudio_construct = function FAudio_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MAudio.construct.call(o);
}
MO.FAudio_volume = function FAudio_volume(){
   return this._hAudio.volume;
}
MO.FAudio_setVolume = function FAudio_setVolume(value){
   this._hAudio.volume = value;
}
MO.FAudio_loop = function FAudio_loop(){
   return this._hAudio.loop;
}
MO.FAudio_setLoop = function FAudio_setLoop(value){
   this._hAudio.loop = value;
}
MO.FAudio_play = function FAudio_play(position){
   var o = this;
   var hAudio = o._hAudio;
   if(position != null){
      if(hAudio.currentTime != position){
         hAudio.currentTime = position;
      }
   }
   hAudio.play();
   MO.Logger.debug(o, 'Audio play. (url={1}, position={2})', o._url, position);
}
MO.FAudio_pause = function FAudio_pause(){
   var o = this;
   o._hAudio.pause();
   MO.Logger.debug(o, 'Audio pause. (url={1})', o._url);
}
MO.FAudio_loadUrl = function FAudio_loadUrl(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var hAudio = o._hAudio;
   if(!hAudio){
      hAudio = o._hAudio = new Audio();
      hAudio.__linker = o;
      hAudio.oncanplay = o.ohLoad;
      hAudio.oncanplaythrough = o.ohLoaded;
      hAudio.onerror = o.ohError;
      hAudio.loop = false;
   }
   if(!MO.Window.Browser.capability.soundFinish){
      o._ready = true;
      o._loaded = true;
      o._finish = true;
   }
   o._url = url;
   hAudio.src = url;
}
MO.FAudio_select = function FAudio_select(){
   var o = this;
   o._hAudio.play();
   o._hAudio.pause();
}
MO.FAudio_dispose = function FAudio_dispose(){
   var o = this;
   o._hAudio = MO.Window.Html.free(o._hAudio);
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.MAudio.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FAudioBuffer = function FAudioBuffer(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAudio);
   o._context        = MO.Class.register(o, new MO.AGetSet('_context'));
   o._url            = MO.Class.register(o, new MO.AGetSet('_url'));
   o._handle         = MO.Class.register(o, new MO.AGetter('_handle'));
   o._buffer         = MO.Class.register(o, new MO.AGetter('_buffer'));
   o.onDecodeSuccess = MO.FAudioBuffer_onDecodeSuccess;
   o.onDecodeFailure = MO.FAudioBuffer_onDecodeFailure;
   o.onLoad          = MO.FAudioBuffer_onLoad;
   o.construct       = MO.FAudioBuffer_construct;
   o.testReady       = MO.FAudioBuffer_testReady;
   o.loadUrl         = MO.FAudioBuffer_loadUrl;
   o.play            = MO.FAudioBuffer_play;
   o.dispose         = MO.FAudioBuffer_dispose;
   return o;
}
MO.FAudioBuffer_onDecodeSuccess = function FAudioBuffer_onDecodeSuccess(buffer){
   var o = this;
   var contextHandle = o._context.handle();
   var bufferSource = o._buffer = contextHandle.createBufferSource();
   bufferSource.buffer = buffer;
   bufferSource.connect(contextHandle.destination)
   o._ready = true;
   o._loaded = true;
   o._finish = true;
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FAudioBuffer_onDecodeFailure = function FAudioBuffer_onDecodeFailure(buffer){
   var o = this;
   o._finish = true;
   MO.Logger.error(o, 'Decode audio buffer failure. (url={1})', o._url);
}
MO.FAudioBuffer_onLoad = function FAudioBuffer_onLoad(connection){
   var o = this;
   var data = connection.outputData();
   var contextHandle = o._context.handle();
   contextHandle.decodeAudioData(data, o.onDecodeSuccess.bind(o), o.onDecodeFailure.bind(o));
}
MO.FAudioBuffer_construct = function FAudioBuffer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MAudio.construct.call(o);
}
MO.FAudioBuffer_testReady = function FAudioBuffer_testReady(){
   return this._ready;
}
MO.FAudioBuffer_loadUrl = function FAudioBuffer_loadUrl(uri){
   var o = this;
   var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(o._url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FAudioBuffer_play = function FAudioBuffer_play(position){
   this._buffer.start(MO.Lang.Integer.nvl(position));
}
MO.FAudioBuffer_dispose = function FAudioBuffer_dispose(){
   var o = this;
   o.__base.MAudio.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FAudioConsole = function FAudioConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._audios   = null;
   o.construct = MO.FAudioConsole_construct;
   o.create    = MO.FAudioConsole_create;
   o.load      = MO.FAudioConsole_load;
   o.select    = MO.FAudioConsole_select;
   o.dispose   = MO.FAudioConsole_dispose;
   return o;
}
MO.FAudioConsole_construct = function FAudioConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._audios = new MO.TDictionary();
}
MO.FAudioConsole_create = function FAudioConsole_create(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var audio = MO.Class.create(MO.FAudioResource);
   audio.loadUrl(url);
   return audio;
}
MO.FAudioConsole_load = function FAudioConsole_load(uri){
   var o = this;
   var audios = o._audios;
   var audio = audios.get(uri);
   if(!audio){
      audio = o.create(uri);
      audios.set(uri, audio);
   }
   return audio;
}
MO.FAudioConsole_select = function FAudioConsole_select(){
   var o = this;
   var audios = o._audios;
   var count = audios.count();
   for(var i = 0; i < count; i++){
      var audio = audios.at(i);
      audio.select();
   }
}
MO.FAudioConsole_dispose = function FAudioConsole_dispose(){
   var o = this;
   o._audios = MO.Lang.Object.dispose(o._audios);
   o.__base.FConsole.dispose.call(o);
}
MO.FAudioContext = function FAudioContext(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   o._handle      = MO.Class.register(o, new MO.AGetter('_handle'));
   o._buffers     = MO.Class.register(o, new MO.AGetter('_buffers'));
   o.construct    = MO.FAudioContext_construct;
   o.setup        = MO.FAudioContext_setup;
   o.createBuffer = MO.FAudioContext_createBuffer;
   o.dispose      = MO.FAudioContext_dispose;
   return o;
}
MO.FAudioContext_construct = function FAudioContext_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._buffers = new MO.TDictionary();
}
MO.FAudioContext_setup = function FAudioContext_setup(uri) {
   var o = this;
   o._audioBuffers = new MO.TDictionary();
   var context = null;
   if(window.AudioContext){
      context = new AudioContext();
   }else if(window.webkitAudioContext){
      context = new webkitAudioContext();
   }
   if(!context){
      return MO.Logger.error(o, 'Invalid audio context.');
   }
   o._handle = context;
}
MO.FAudioContext_createBuffer = function FAudioContext_createBuffer(uri) {
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var buffer = null;
   o._handle = null;
   if(o._handle){
      buffer = MO.Class.create(MO.FAudioBuffer);
      buffer.setContext(o);
   }else{
      buffer = MO.Class.create(MO.FAudio);
   }
   buffer.loadUrl(url);
   return buffer;
}
MO.FAudioContext_dispose = function FAudioContext_dispose() {
   var o = this;
   o._buffers = MO.Lang.Object.dispose(o._buffers);
   o.__base.FObject.dispose.call(o);
}
MO.FAudioContextConsole = function FAudioContextConsole(o) {
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._contexts = null;
   o.construct = MO.FAudioContextConsole_construct;
   o.create    = MO.FAudioContextConsole_create;
   o.dispose   = MO.FAudioContextConsole_dispose;
   return o;
}
MO.FAudioContextConsole_construct = function FAudioContextConsole_construct() {
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._contexts = new MO.TObjects();
}
MO.FAudioContextConsole_create = function FAudioContextConsole_create(uri) {
   var o = this;
   var context = MO.Class.create(MO.FAudioContext);
   context.setup();
   o._contexts.push(context);
   return context;
}
MO.FAudioContextConsole_dispose = function FAudioContextConsole_dispose(){
   var o = this;
   o._contexts = MO.Lang.Object.dispose(o._contexts);
   o.__base.FConsole.dispose.call(o);
}
MO.FAudioResource = function FAudioResource(o){
   o = MO.Class.inherits(this, o, MO.FAudio);
   return o;
}
MO.FImageConsole = function FImageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._images   = null;
   o.construct = MO.FImageConsole_construct;
   o.create    = MO.FImageConsole_create;
   o.load      = MO.FImageConsole_load;
   o.dispose   = MO.FImageConsole_dispose;
   return o;
}
MO.FImageConsole_construct = function FImageConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._images = new MO.TDictionary();
}
MO.FImageConsole_create = function FImageConsole_create(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var image = MO.Class.create(MO.FImageResource);
   image.loadUrl(url);
   return image;
}
MO.FImageConsole_load = function FImageConsole_load(uri){
   var o = this;
   var images = o._images;
   var image = images.get(uri);
   if(!image){
      image = o.create(uri);
      images.set(uri, image);
   }
   return image;
}
MO.FImageConsole_dispose = function FImageConsole_dispose(){
   var o = this;
   o._images = MO.Lang.Object.dispose(o._images);
   o.__base.FConsole.dispose.call(o);
}
MO.FImageResource = function FImageResource(o){
   o = MO.Class.inherits(this, o, MO.FImage);
   return o;
}
MO.FResource = function FResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._guid         = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code         = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label        = MO.Class.register(o, new MO.AGetSet('_label'));
   return o;
}
MO.FResourceBlockStorage = function FResourceBlockStorage(o){
   o = MO.Class.inherits(this, o, MO.FResourceStorage);
   o._ready      = false;
   o._dataLength = 0;
   o._blockSize  = 0;
   o._blockCount = 0;
   o._blocks     = MO.Class.register(o, new MO.AGetter('_blocks'));
   o._resource   = null;
   o.construct   = MO.FResourceBlockStorage_construct;
   o.testReady   = MO.FResourceBlockStorage_testReady;
   o.load        = MO.FResourceBlockStorage_load;
   o.complete    = MO.FResourceBlockStorage_complete;
   o.dispose     = MO.FResourceBlockStorage_dispose;
   return o;
}
MO.FResourceBlockStorage_construct = function FResourceBlockStorage_construct(){
   var o = this;
   o.__base.FResourceStorage.construct.call(o);
   o._blocks = new MO.TObjects();
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
   var view = MO.Class.create(MO.FDataView);
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
      var block = MO.Class.create(MO.FResourceBlockStorageData);
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
   var stream = MO.Class.create(MO.FDataStream);
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
   var span = MO.Timer.current() - resource._compressStartTick;
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
      o._blocks = MO.Lang.Object.dispose(blocks);
   }
   o.__base.FResourceStorage.dispose.call(o);
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
MO.FResourceConsole = function FResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd          = MO.EScope.Global;
   o._factory          = null;
   o._types            = null;
   o._packages         = null;
   o._resources        = null;
   o._loadResources    = null;
   o._loadingResources = null;
   o._processStorages  = null;
   o._thread           = null;
   o._loadLimit        = 8;
   o._interval         = 150;
   o.onComplete        = MO.FResourceConsole_onComplete;
   o.onLoad            = MO.FResourceConsole_onLoad;
   o.onBlockLoad       = MO.FResourceConsole_onBlockLoad;
   o.onProcess         = MO.FResourceConsole_onProcess;
   o.construct         = MO.FResourceConsole_construct;
   o.registerType      = MO.FResourceConsole_registerType;
   o.factory           = MO.FResourceConsole_factory;
   o.load              = MO.FResourceConsole_load;
   o.loadPackage       = MO.FResourceConsole_loadPackage;
   o.loadPackageByUrl  = MO.FResourceConsole_loadPackageByUrl;
   o.dispose           = MO.FResourceConsole_dispose;
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
   var storage = MO.Class.create(MO.FResourceSingleStorage);
   storage.setResource(resource);
   storage.load(data);
   MO.Console.find(MO.FResourceDataConsole).load(storage);
   o._loadingResources.remove(resource);
   o._processStorages.push(storage);
}
MO.FResourceConsole_onBlockLoad = function FResourceConsole_onBlockLoad(connection){
   var o = this;
   var data = connection.outputData();
   var resource = connection._resource;
   resource._compressLength = data.byteLength;
   resource._compressStartTick = RTimer.current();
   var storage = MO.Class.create(MO.FResourceBlockStorage);
   storage.setResource(resource);
   storage.load(data);
   var dataConsole = MO.Console.find(MO.FResourceDataConsole);
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
   var httpConsole = MO.Console.find(MO.FHttpConsole);
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
   o._factory = MO.Class.create(MO.FClassFactory);
   o._types = new MO.TDictionary();
   o._packages = new MO.TDictionary();
   o._resources = new MO.TDictionary();
   o._loadResources  = new MO.TObjects();
   o._loadingResources = new MO.TObjects();
   o._processStorages = new MO.TLooper();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
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
      throw new MO.TError(o, 'Resource is already loaded. (guid={1})', guid);
   }
   resources.set(guid, resource);
   o._loadResources.push(resource);
   resource._dataLoad = true;
}
MO.FResourceConsole_loadPackage = function FResourceConsole_loadPackage(resourcePackage){
   var o = this;
}
MO.FResourceConsole_loadPackageByUrl = function FResourceConsole_loadPackageByUrl(uri){
   var o = this;
   var resourcePackages = o._packages;
   var resourcePackage = resourcePackages.get(uri);
   if(!resourcePackage){
      var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
      resourcePackage = MO.Class.create(MO.FResourcePackage);
      resourcePackage.loadUrl(url);
      resourcePackages.set(uri, resourcePackage);
   }
   return resourcePackage;
}
MO.FResourceConsole_dispose = function FResourceConsole_dispose(){
   var o = this;
   o._factory = MO.Lang.Object.dispose(o._factory);
   o._types = MO.Lang.Object.dispose(o._types);
   o._packages = MO.Lang.Object.dispose(o._packages);
   o._resources = MO.Lang.Object.dispose(o._resources);
   o._loadResources  = MO.Lang.Object.dispose(o._loadResources);
   o._loadingResources = MO.Lang.Object.dispose(o._loadingResources);
   o._processStorages = MO.Lang.Object.dispose(o._processStorages);
   o.__base.FConsole.dispose.call(o);
}
MO.FResourceDataConsole = function FResourceDataConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd           = MO.EScope.Global;
   o._loadDatas         = null;
   o._processDatas      = null;
   o._pipeline          = null;
   o._pipelinePool      = null;
   o._thread            = null;
   o._processLimit      = 4;
   o._interval          = 200;
   o.onPipelineComplete = MO.FResourceDataConsole_onPipelineComplete;
   o.onProcess          = MO.FResourceDataConsole_onProcess;
   o.construct          = MO.FResourceDataConsole_construct;
   o.allocPipeline      = MO.FResourceDataConsole_allocPipeline;
   o.freePipeline       = MO.FResourceDataConsole_freePipeline;
   o.load               = MO.FResourceDataConsole_load;
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
   o._loadDatas  = new MO.TObjects();
   o._processDatas = new MO.TObjects();
   o._pipelinePool  = MO.Class.create(MO.FObjectPool);
   var capability = MO.Window.Browser.capability();
   if(!capability.optionProcess){
      var pipeline = o._pipeline = MO.Class.create(FResourceSinglePipeline);
      pipeline.setConsole(o);
   }
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FResourceDataConsole_allocPipeline = function FResourceDataConsole_allocPipeline(){
   var o = this;
   var pool = o._pipelinePool;
   if(!pool.hasFree()){
      var pipeline = MO.Class.create(MO.FResourceThreadPipeline);
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
MO.FResourceGroup = function FResourceGroup(o){
   o = MO.Class.inherits(this, o, MO.FResource);
   o._resources = null;
   return o;
}
MO.FResourceObject = function FResourceObject(o){
   o = MO.Class.inherits(this, o, MO.FResource);
   o._typeCode = MO.Class.register(o, new MO.AGetter('_typeCode'));
   return o;
}
MO.FResourcePackage = function FResourcePackage(o){
   o = MO.Class.inherits(this, o, MO.FResource);
   o._uri         = MO.Class.register(o, new MO.AGetSet('_uri'));
   o._url         = MO.Class.register(o, new MO.AGetSet('_url'));
   o._statusReady = false;
   o.onLoad       = MO.FResourcePackage_onLoad;
   o.testReady    = MO.FResourcePackage_testReady;
   o.unserialize  = MO.Method.empty;
   o.load         = MO.FResourcePackage_load;
   return o;
}
MO.FResourcePackage_onLoad = function FResourcePackage_onLoad(event){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(event.content);
   o.unserialize(view);
   view.dispose();
   o._statusReady = true;
   MO.Logger.debug(o, 'Load resource package success. (url={1})', o._url);
}
MO.FResourcePackage_testReady = function FResourcePackage_testReady(){
   return this._statusReady;
}
MO.FResourcePackage_load = function FResourcePackage_load(){
   var o = this;
   var url = o._url;
   if(!url){
      url = o._url = MO.Console.find(MO.FEnvironmentConsole).parse(o._uri);
   }
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(url);
   connection.addLoadListener(o, o.onLoad);
   return connection;
}
MO.FResourcePipeline = function FResourcePipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   o._console    = MO.Class.register(o, new MO.AGetSet('_console'));
   o._compressCd = MO.Class.register(o, new MO.AGetter('_compressCd'));
   o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
   o.dispose     = MO.FResourcePipeline_dispose;
   return o;
}
MO.FResourcePipeline_dispose = function FResourcePipeline_dispose(){
   var o = this;
   o._console = null;
   o._resource = null;
   o.__base.FPipeline.dispose.call(o);
}
MO.FResourceSinglePipeline = function FResourceSinglePipeline(o){
   o = MO.Class.inherits(this, o, MO.FResourcePipeline);
   o._startTime  = 0;
   o._statusBusy = false;
   o._data       = 0;
   o._dataLength = 0;
   o._worker     = null;
   o.onComplete  = MO.FResourceSinglePipeline_onComplete;
   o.construct   = MO.FResourceSinglePipeline_construct;
   o.testBusy    = MO.FResourceSinglePipeline_testBusy;
   o.decompress  = MO.FResourceSinglePipeline_decompress;
   o.dispose     = MO.FResourceSinglePipeline_dispose;
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
      throw new MO.TError(o, 'Unknown buffer type.');
   }
   data.completeData(bufferData);
   var span = MO.Timer.now() - o._startTime;
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
   o._startTime = MO.Timer.current();
   var compressData = data.compressData();
   o._data = data;
   o._dataLength = compressData.byteLength;
   var processData = null;
   if(compressData.constructor == ArrayBuffer){
      processData = new Uint8Array(compressData);
   }else if(compressData.constructor == Uint8Array){
      processData = compressData;
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   LZMAD.decompress(processData, function(buffer){o.onComplete(buffer);}, null);
}
MO.FResourceSinglePipeline_dispose = function FResourceSinglePipeline_dispose(){
   var o = this;
   o._data = null;
   o._worker = null;
   o.__base.FPipeline.dispose.call(o);
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
MO.FResourceStorage = function FResourceStorage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._ready      = false;
   o._dataLength = 0;
   o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
   o.construct   = MO.FResourceStorage_construct;
   o.testReady   = MO.FResourceStorage_testReady;
   o.load        = MO.FResourceStorage_load;
   o.complete    = MO.FResourceStorage_complete;
   o.dispose     = MO.FResourceStorage_dispose;
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
MO.FResourceThreadPipeline = function FResourceThreadPipeline(o){
   o = MO.Class.inherits(this, o, MO.FResourcePipeline);
   o._startTime  = 0;
   o._data       = 0;
   o._dataLength = 0;
   o._worker     = null;
   o.onComplete  = MO.FResourceThreadPipeline_onComplete;
   o.construct   = MO.FResourceThreadPipeline_construct;
   o.worker      = MO.FResourceThreadPipeline_worker;
   o.decompress  = MO.FResourceThreadPipeline_decompress;
   o.dispose     = MO.FResourceThreadPipeline_dispose;
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
      throw new MO.TError(o, 'Unknown buffer type.');
   }
   var data = o._data;
   data.completeData(bufferData);
   var span = MO.Timer.now() - o._startTime;
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
      var uri = MO.RBrowser.contentPath('/ajs/lzma_worker.js');
      worker = o._worker = new LZMA_WORKER(uri);
   }
   return worker;
}
MO.FResourceThreadPipeline_decompress = function FResourceThreadPipeline_decompress(data){
   var o = this;
   o._startTime = MO.Timer.current();
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
MO.FResourceType = function FResourceType(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._pipeline    = MO.Class.register(o, new MO.AGetSet('_pipeline'));
   o._resources   = MO.Class.register(o, new MO.AGetter('_resources'));
   o.construct    = MO.FResourceType_construct;
   o.findResource = MO.FResourceType_findResource;
   o.dispose      = MO.FResourceType_dispose;
   return o;
}
MO.FResourceType_construct = function FResourceType_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._resources = new MO.TDictionary();
}
MO.FResourceType_findResource = function FResourceType_findResource(p){
   return this._resources.get(p);
}
MO.FResourceType_dispose = function FResourceType_dispose(){
   var o = this;
   o._resources = MO.Lang.Object.dispose(o._resources);
   o.__base.FObject.dispose.call(o);
}
MO.FEntity = function FEntity(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MReady);
   o._statusReady = false;
   o.testReady    = MO.FEntity_testReady;
   o.processLoad  = MO.Method.emptyTrue;
   return o;
}
MO.FEntity_testReady = function FEntity_testReady(){
   return this._statusReady;
}
MO.FEntityConsole = function FEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Global;
   o._looperLoad = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = MO.FEntityConsole_onProcess;
   o.construct   = MO.FEntityConsole_construct;
   o.loadEntity  = MO.FEntityConsole_loadEntity;
   o.dispose     = MO.FEntityConsole_dispose;
   return o;
}
MO.FEntityConsole_onProcess = function FEntityConsole_onProcess(){
   var o = this;
   var looper = o._looperLoad;
   looper.record();
   while(looper.next()){
      var entity = looper.current();
      if(entity.processLoad()){
         looper.removeCurrent();
      }
   }
}
MO.FEntityConsole_construct = function FEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._looperLoad = new MO.TLooper();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FEntityConsole_loadEntity = function FEntityConsole_loadEntity(entity){
   this._looperLoad.push(entity);
}
MO.FEntityConsole_dispose = function FEntityConsole_dispose(){
   var o = this;
   o._looperLoad = RObject.dispose(o._looperLoad);
   o.__base.FConsole.dispose.call(o);
}
MO.FE2dCanvas = function FE2dCanvas(o){
   o = MO.Class.inherits(this, o, MO.FCanvas, MO.MCanvasObject, MO.MGraphicObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._hCanvas   = null;
   o.onResize   = MO.FE2dCanvas_onResize;
   o.construct  = MO.FE2dCanvas_construct;
   o.htmlCanvas = MO.FE2dCanvas_htmlCanvas;
   o.build      = MO.FE2dCanvas_build;
   o.setPanel   = MO.FE2dCanvas_setPanel;
   o.resize     = MO.FE2dCanvas_resize;
   o.show       = MO.FE2dCanvas_show;
   o.hide       = MO.FE2dCanvas_hide;
   o.setVisible = MO.FE2dCanvas_setVisible;
   o.reset      = MO.FE2dCanvas_reset;
   o.dispose    = MO.FE2dCanvas_dispose;
   return o;
}
MO.FE2dCanvas_onResize = function FE2dCanvas_onResize(p){
   var o = this;
}
MO.FE2dCanvas_construct = function FE2dCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
}
MO.FE2dCanvas_htmlCanvas = function FE2dCanvas_htmlCanvas(){
   return this._hCanvas;
}
MO.FE2dCanvas_build = function FE2dCanvas_build(hDocument){
   var o = this;
   var size = o._size;
   var width = size.width;
   var height = size.height;
   var hCanvas = o._hCanvas = MO.Window.Builder.create(hDocument, 'CANVAS');
   hCanvas.__linker = o;
   var hStyle = hCanvas.style;
   hStyle.left = '0px';
   hStyle.top = '0px';
   hStyle.width = '100%';
   hStyle.height = '100%';
   var context = o._graphicContext = MO.Class.create(MO.FG2dCanvasContext);
   context.linkCanvas(hCanvas);
   o.resize(width, height);
}
MO.FE2dCanvas_setPanel = function FE2dCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
   o.onResize();
}
MO.FE2dCanvas_resize = function FE2dCanvas_resize(width, height){
   var o = this;
   var hCanvas = o._hCanvas;
   hCanvas.width = width;
   hCanvas.height = height;
   o._size.set(width, height);
   o._graphicContext.size().set(width, height);
   MO.Logger.debug(o, 'Canvas2d resize. (size={1}x{2}, html={3})', width, height, hCanvas.outerHTML);
}
MO.FE2dCanvas_show = function FE2dCanvas_show(){
   this.setVisible(true);
}
MO.FE2dCanvas_hide = function FE2dCanvas_hide(){
   this.setVisible(false);
}
MO.FE2dCanvas_setVisible = function FE2dCanvas_setVisible(visible){
   MO.Window.Html.visibleSet(this._hCanvas, visible);
}
MO.FE2dCanvas_reset = function FE2dCanvas_reset(){
   this._graphicContext.clear();
}
MO.FE2dCanvas_dispose = function FE2dCanvas_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._graphicContext = MO.Lang.Object.dispose(o._graphicContext);
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hCanvas = MO.Window.Html.free(o._hCanvas);
   o.__base.FCanvas.dispose.call(o);
}
MO.FE2dCanvasConsole = function FE2dCanvasConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._pools      = null;
   o.construct   = MO.FE2dCanvasConsole_construct;
   o.allocBySize = MO.FE2dCanvasConsole_allocBySize;
   o.free        = MO.FE2dCanvasConsole_free;
   return o;
}
MO.FE2dCanvasConsole_construct = function FE2dCanvasConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pools = MO.Class.create(MO.FObjectPools);
}
MO.FE2dCanvasConsole_allocBySize = function FE2dCanvasConsole_allocBySize(width, height){
   var o = this;
   var pools = o._pools;
   var code = width + 'x' + height;
   var canvas = pools.alloc(code);
   if(!canvas){
      canvas = MO.Class.create(FE2dCanvas);
      canvas.size().set(width, height);
      canvas.build(MO.RWindow._hDocument);
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
MO.FE2dDrawable = function FE2dDrawable(o){
   o = MO.Class.inherits(this, o, MO.FDrawable);
   return o;
}
MO.ME3dObject = function ME3dObject(o){
   o = MO.Class.inherits(this, o, MO.MGraphicObject, MO.MAttributeCode);
   o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   return o;
}
MO.FE3dCanvas = function FE3dCanvas(o){
   o = MO.Class.inherits(this, o, MO.FCanvas, MO.MGraphicObject, MO.MMouseCapture);
   o._optionAlpha        = true;
   o._optionAntialias    = true;
   o._optionStageProcess = true;
   o._optionResize       = true;
   o._optionMouseCapture = true;
   o._listenerLoad       = MO.Class.register(o, new MO.AListener('_listenerLoad', MO.EEvent.Load));
   o._scaleRate          = 1;
   o._size               = MO.Class.register(o, new MO.AGetter('_size'));
   o._logicSize          = MO.Class.register(o, new MO.AGetter('_logicSize'));
   o._screenSize         = MO.Class.register(o, new MO.AGetter('_screenSize'));
   o._interval           = 10;
   o._hPanel             = null;
   o._hCanvas            = null;
   o.onEnterFrame        = MO.Method.empty;
   o.ohTouchStart        = MO.FE3dCanvas_ohTouchStart;
   o.ohTouchMove         = MO.FE3dCanvas_ohTouchMove;
   o.ohTouchStop         = MO.FE3dCanvas_ohTouchStop;
   o.onMouseCaptureStart = MO.Method.empty;
   o.onMouseCapture      = MO.Method.empty;
   o.onMouseCaptureStop  = MO.Method.empty;
   o.onTouchStart        = MO.Method.empty;
   o.onTouchMove         = MO.Method.empty;
   o.onTouchStop         = MO.Method.empty;
   o.onResize            = MO.FE3dCanvas_onResize;
   o.construct           = MO.FE3dCanvas_construct;
   o.build               = MO.FE3dCanvas_build;
   o.resize              = MO.FE3dCanvas_resize;
   o.show                = MO.FE3dCanvas_show;
   o.hide                = MO.FE3dCanvas_hide;
   o.setVisible          = MO.FE3dCanvas_setVisible;
   o.setPanel            = MO.FE3dCanvas_setPanel;
   o.dispose             = MO.FE3dCanvas_dispose;
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
   this.resize();
}
MO.FE3dCanvas_construct = function FE3dCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
   o._logicSize = new MO.SSize2(1280, 720);
   o._screenSize = new MO.SSize2(1280, 720);
}
MO.FE3dCanvas_build = function FE3dCanvas_build(hPanel){
   var o = this;
   var size = o._size;
   var width = size.width;
   var height = size.height;
   var hCanvas = o._hCanvas = MO.RBuilder.create(hPanel, 'CANVAS');
   hCanvas.__linker = o;
   hCanvas.width = width;
   hCanvas.height = height;
   var hStyle = hCanvas.style;
   hStyle.left = '0px';
   hStyle.top = '0px';
   hStyle.width = '100%';
   hStyle.height = '100%';
   if(!MO.Method.isEmpty(o.onTouchStart)){
      hCanvas.addEventListener('touchstart', o.ohTouchStart, false);
   }
   if(!MO.Method.isEmpty(o.onTouchMove)){
      hCanvas.addEventListener('touchmove', o.ohTouchMove, false);
   }
   if(!MO.Method.isEmpty(o.onTouchStop)){
      hCanvas.addEventListener('touchend', o.ohTouchStop, false);
   }
   var parameters = new Object();
   parameters.alpha = o._optionAlpha;
   parameters.antialias = o._optionAntialias;
   o._graphicContext = MO.Graphic.Context3d.createContext(MO.FWglContext, hCanvas, parameters);
   if(o._optionStageProcess){
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start(o._interval);
   }
   if(o._optionResize){
      MO.Window.lsnsResize.register(o, o.onResize);
      MO.Window.lsnsOrientation.register(o, o.onResize);
   }
   if(o._optionMouseCapture){
      MO.Console.find(MO.FMouseConsole).register(o);
   }
}
MO.FE3dCanvas_resize = function FE3dCanvas_resize(sourceWidth, sourceHeight){
   var o = this;
   if(!sourceWidth || !sourceHeight){
      throw new MO.TError(o, 'Invalid canvas size.');
   }
   o._screenSize.set(sourceWidth, sourceHeight);
   var width = parseInt(sourceWidth * o._scaleRate);
   var height = parseInt(sourceHeight * o._scaleRate);
   var hCanvas = o._hCanvas;
   hCanvas.width = width;
   hCanvas.height = height;
   o._size.set(width, height);
   var context = o._graphicContext;
   context.setViewport(0, 0, width, height);
   MO.Logger.debug(o, 'Canvas3d resize. (size={1}x{2}, buffer={3}x{4}, html={5})', width, height, context._handle.drawingBufferWidth, context._handle.drawingBufferHeight, hCanvas.outerHTML);
}
MO.FE3dCanvas_show = function FE3dCanvas_show(){
   this.setVisible(true);
}
MO.FE3dCanvas_hide = function FE3dCanvas_hide(){
   this.setVisible(false);
}
MO.FE3dCanvas_setVisible = function FE3dCanvas_setVisible(visible){
   MO.Window.Html.visibleSet(this._hCanvas, visible);
}
MO.FE3dCanvas_setPanel = function FE3dCanvas_setPanel(hPanel){
   var o = this;
   hPanel.appendChild(o._hCanvas);
   o._hPanel = hPanel;
   o.resize();
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
   o._graphicContext = MO.Lang.Object.dispose(o._graphicContext);
   o._size = MO.Lang.Object.dispose(o._size);
   o._screenSize = MO.Lang.Object.dispose(o._screenSize);
   o._logicSize = MO.Lang.Object.dispose(o._logicSize);
   o._hPanel = MO.RHtml.free(o._hPanel);
   o._hCanvas = MO.RHtml.free(o._hCanvas);
   o.__base.FCanvas.dispose.call(o);
}
MO.FE3dDisplay = function FE3dDisplay(o){
   o = MO.Class.inherits(this, o, MO.FDisplay);
   o._outline         = null;
   o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));
   o.construct        = MO.FE3dDisplay_construct;
   o.calculateOutline = MO.FE3dDisplay_calculateOutline;
   o.dispose          = MO.FE3dDisplay_dispose;
   return o;
}
MO.FE3dDisplay_construct = function FE3dDisplay_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._outline = new MO.SOutline3();
}
MO.FE3dDisplay_calculateOutline = function FE3dDisplay_calculateOutline(){
   return this._outline;
}
MO.FE3dDisplay_dispose = function FE3dDisplay_dispose(){
   var o = this;
   o._materials = MO.Lang.Object.free(o._materials);
   o.__base.FDisplay.dispose.call(o);
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
MO.FE3dRenderable = function FE3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.FRenderable, MO.MG3dRenderable, MO.MGraphicObject, MO.MLinkerResource);
   o._display           = MO.Class.register(o, new MO.AGetSet('_display'));
   o._outline           = null;
   o._outlineVisible    = true;
   o._calculateMatrix   = null;
   o._vertexCount       = MO.Class.register(o, new MO.AGetSet('_vertexCount'));
   o._vertexBuffers     = MO.Class.register(o, new MO.AGetter('_vertexBuffers'));
   o._indexBuffers      = MO.Class.register(o, new MO.AGetter('_indexBuffers'));
   o._materialReference = MO.Class.register(o, new MO.AGetSet('_materialReference'));
   o._materials         = MO.Class.register(o, new MO.AGetter('_materials'));
   o._bones             = MO.Class.register(o, new MO.AGetter('_bones'));
   o._textures          = MO.Class.register(o, new MO.AGetter('_textures'));
   o.construct          = MO.FE3dRenderable_construct;
   o.setup              = MO.Method.empty;
   o.testReady          = MO.Method.emptyTrue;
   o.testVisible        = MO.FE3dRenderable_testVisible;
   o.findVertexBuffer   = MO.FE3dRenderable_findVertexBuffer;
   o.pushVertexBuffer   = MO.FE3dRenderable_pushVertexBuffer;
   o.pushIndexBuffer    = MO.FE3dRenderable_pushIndexBuffer;
   o.pushMaterial       = MO.FE3dRenderable_pushMaterial;
   o.findTexture        = MO.FE3dRenderable_findTexture;
   o.pushTexture        = MO.FE3dRenderable_pushTexture;
   o.processDelay       = MO.Method.empty;
   o.update             = MO.FE3dRenderable_update;
   o.remove             = MO.FE3dRenderable_remove;
   return o;
}
MO.FE3dRenderable_construct = function FE3dRenderable_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o.__base.MG3dRenderable.construct.call(o);
   o._outline = new MO.SOutline3d();
   o._calculateMatrix = new MO.SMatrix3d();
   o._vertexBuffers = new MO.TDictionary();
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
   if(MO.Lang.String.isEmpty(code)){
      throw new MO.TError('Buffer code is empty.');
   }
   var buffers = o._vertexBuffers;
   if(!buffers){
      buffers =  o._vertexBuffers = new MO.TDictionary();
   }
   buffers.set(code, buffer);
}
MO.FE3dRenderable_pushIndexBuffer = function FE3dRenderable_pushIndexBuffer(buffer){
   var o = this;
   var buffers = o._indexBuffers;
   if(!buffers){
      buffers =  o._indexBuffers = new MO.TObjects();
   }
   buffers.push(buffer);
}
MO.FE3dRenderable_pushMaterial = function FE3dRenderable_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new MO.TObjects();
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
      textures = o._textures = new MO.TDictionary();
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
MO.FE3dStage = function FE3dStage(o){
   o = MO.Class.inherits(this, o, MO.FStage, MO.MGraphicObject);
   o._statistics        = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._technique         = MO.Class.register(o, new MO.AGetter('_technique'));
   o._region            = MO.Class.register(o, new MO.AGetter('_region'));
   o._allDisplays       = null;
   o.onProcess          = MO.FE3dStage_onProcess;
   o.construct          = MO.FE3dStage_construct;
   o.createRegion       = MO.FE3dStage_createRegion;
   o.linkGraphicContext = MO.FE3dStage_linkGraphicContext;
   o.setup              = MO.FE3dStage_setup;
   o.camera             = MO.FE3dStage_camera;
   o.projection         = MO.FE3dStage_projection;
   o.directionalLight   = MO.FE3dStage_directionalLight;
   o.selectTechnique    = MO.FE3dStage_selectTechnique;
   o.filterDisplays     = MO.FE3dStage_filterDisplays;
   o.allDisplays        = MO.FE3dStage_allDisplays;
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
   MO.Console.find(MO.FE3dStageConsole).process(region);
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
   o._statistics = MO.Class.create(MO.FE3dStageStatistics);
   MO.Console.find(MO.FStatisticsConsole).register('engine.stage', o._statistics);
   o._allDisplays = new MO.TObjects();
   var region = o._region = o.createRegion();
   region._timer = o._timer;
}
MO.FE3dStage_createRegion = function FE3dStage_createRegion(){
   return MO.Class.create(MO.FE3dRegion);
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
   var techniqueConsole = MO.Console.find(MO.FG3dTechniqueConsole);
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
MO.FE3dStageConsole = function FE3dStageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._looper   = null;
   o._thread   = null;
   o._interval = 25;
   o._limit    = 8;
   o.onProcess = MO.FE3dStageConsole_onProcess;
   o.construct = MO.FE3dStageConsole_construct;
   o.process   = MO.FE3dStageConsole_process;
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
   o.__base.FConsole.construct.call(o);
   o._looper = new MO.TLooper();
   o._renderables = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
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
MO.RE3dEngine = function RE3dEngine(){
   var o = this;
   o._setuped = false;
   return o;
}
MO.RE3dEngine.prototype.onSetup = function RE3dEngine_onSetup(){
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('select.select.flat', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.control', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.automatic', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.skeleton', MO.FG3dSelectSkeletonEffect);
   effectConsole.register('select.select.skeleton.4', MO.FG3dSelectSkeletonEffect);
   effectConsole.register('control.control.automatic', MO.FE3dControlAutomaticEffect);
   effectConsole.register('control.control.control', MO.FE3dControlAutomaticEffect);
   effectConsole.register('general.color.control', MO.FE3dControlAutomaticEffect);
   effectConsole.register('general.color.flat', MO.FE3dGeneralColorFlatEffect);
   effectConsole.register('general.color.automatic', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skin', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.parallax', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('shadow.depth.automatic', MO.FE3dShadowDepthAutomaticEffect);
   effectConsole.register('shadow.depth.skeleton', MO.FE3dShadowDepthSkeletonEffect);
   effectConsole.register('shadow.color.automatic', MO.FE3dShadowColorAutomaticEffect);
   effectConsole.register('shadow.color.skeleton', MO.FE3dShadowColorSkeletonEffect);
}
MO.RE3dEngine.prototype.setup = function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
MO.RE3dEngine = new MO.RE3dEngine();
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
MO.ME3sGeometry = function ME3sGeometry(o){
   o = MO.Class.inherits(this, o);
   o._outline         = MO.Class.register(o, new MO.AGetter('_outline'));
   o._streams         = MO.Class.register(o, new MO.AGetter('_streams'));
   o.construct        = MO.ME3sGeometry_construct;
   o.findStream       = MO.ME3sGeometry_findStream;
   o.calculateOutline = MO.ME3sGeometry_calculateOutline;
   o.dispose          = MO.ME3sGeometry_dispose;
   return o;
}
MO.ME3sGeometry_construct = function ME3sGeometry_construct(){
   var o = this;
   o._outline = new MO.SOutline3d();
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
   o._outline = MO.Lang.Object.dispose(o._outline);
   o.__base.FE3sSpace.dispose.call(o);
}
MO.SE3sCompressEvent = function SE3sCompressEvent(w, f, d){
   var o = this;
   o.owner   = w;
   o.process = f;
   o.data    = d;
   return o;
}
MO.SE3sMaterialInfo = function SE3sMaterialInfo(){
   var o = this;
   MO.SG3dMaterialInfo.call(o);
   o.unserialize = MO.SE3sMaterialInfo_unserialize;
   o.saveConfig  = MO.SE3sMaterialInfo_saveConfig;
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
MO.SE3sSceneShadow = function SE3sSceneShadow(){
   var o = this;
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   o.unserialize = MO.SE3sSceneShadow_unserialize;
   return o;
}
MO.SE3sSceneShadow_unserialize = function SE3sSceneShadow_unserialize(input){
   var o = this;
   o.base = input.readFloat();
   o.rate = input.readFloat();
   o.level = input.readFloat();
   o.range = input.readFloat();
}
MO.FE3sAnimation = function FE3sAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._model           = null;
   o._skeletonGuid    = MO.Class.register(o, new MO.AGetter('_skeletonGuid'));
   o._skeleton        = null;
   o._frameCount      = MO.Class.register(o, new MO.AGetter('_frameCount'), 0);
   o._frameTick       = MO.Class.register(o, new MO.AGetter('_frameTick'), 0);
   o._frameSpan       = MO.Class.register(o, new MO.AGetter('_frameSpan'), 0);
   o._frameTranslates = null;
   o._frameRotations  = null;
   o._frameScales     = null;
   o._tracks          = MO.Class.register(o, new MO.AGetter('_tracks'));
   o.skeleton         = MO.FE3sAnimation_skeleton;
   o.tracks           = MO.FE3sAnimation_tracks;
   o.unserialize      = MO.FE3sAnimation_unserialize;
   return o;
}
MO.FE3sAnimation_skeleton = function FE3sAnimation_skeleton(){
   var o = this;
   var skeleton = o._skeleton;
   if(!skeleton){
      var guid = o._skeletonGuid;
      if(guid){
         skeleton = o._skeleton = MO.Console.find(MO.FE3sModelConsole).findSkeleton(guid);
      }
   }
   return skeleton;
}
MO.FE3sAnimation_unserialize = function FE3sAnimation_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   o._skeletonGuid = input.readString();
   o._frameCount = input.readUint16();
   o._frameTick = input.readUint16();
   o._frameSpan = input.readUint32();
   var translateCount = input.readUint32();
   var translateBytes = MO.Lang.Integer.strideByte(translateCount);
   if(translateCount > 0){
      var translates = o._frameTranslates = new MO.TObjects();
      for(var i = 0; i < translateCount; i++){
         var translate = new MO.SPoint3();
         translate.unserialize(input);
         translates.push(translate);
      }
   }
   var rotationCount = input.readUint32();
   var rotationBytes = MO.Lang.Integer.strideByte(rotationCount);
   if(rotationCount > 0){
      var rotations = o._frameRotations = new MO.TObjects();
      for(var i = 0; i < rotationCount; i++){
         var rotation = new MO.SQuaternion();
         rotation.unserialize(input);
         rotations.push(rotation);
      }
   }
   var scaleCount = input.readUint32();
   var scaleBytes = MO.Lang.Integer.strideByte(scaleCount);
   if(scaleCount > 0){
      var scales = o._frameScales = new MO.TObjects();
      for(var i = 0; i < scaleCount; i++){
         var scale = new MO.SVector3();
         scale.unserialize(input);
         scales.push(scale);
      }
   }
   var tracks = null;
   var trackCount = input.readUint16();
   if(trackCount > 0){
      tracks = o._tracks = new MO.TObjects();
      for(var n = 0; n < trackCount; n++){
         var track = MO.Class.create(MO.FE3sTrack);
         track.unserialize(input);
         tracks.push(track);
         var frameCount = track._frameCount;
         var frames = track._frames;
         for(var i = 0; i < frameCount; i++){
            var frame = MO.Class.create(MO.FE3sFrame);
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
MO.FE3sBone = function FE3sBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._index      = MO.Class.register(o, new MO.AGetter('_index'));
   o._track      = MO.Class.register(o, new MO.AGetSet('_track'));
   o._bones      = MO.Class.register(o, new MO.AGetter('_bones'));
   o.unserialize = MO.FE3sBone_unserialize;
   return o;
}
MO.FE3sBone_unserialize = function FE3sBone_unserialize(input){
   var o = this;
   o._index = input.readUint8();
   var count = input.readUint8();
   if(count > 0){
      var bones = o._bones = new MO.TObjects();
      for(var i = 0; i < count; i++){
         var bone = MO.Class.create(MO.FE3sBone);
         bone.unserialize(input);
         bones.push(bone);
      }
   }
}
MO.FE3sBoneRefer = function FE3sBoneRefer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._index      = MO.Class.register(o, new MO.AGetter('_index'));
   o._bone       = MO.Class.register(o, new MO.AGetSet('_bone'));
   o._track      = MO.Class.register(o, new MO.AGetSet('_track'));
   o.unserialize = MO.FE3sBoneRefer_unserialize;
   return o;
}
MO.FE3sBoneRefer_unserialize = function FE3sBoneRefer_unserialize(input){
   var o = this;
   o._index = input.readUint8();
}
MO.FE3sCamera = function FE3sCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._typeCd     = MO.Class.register(o, new MO.AGetter('_typeCd'));
   o._position   = MO.Class.register(o, new MO.AGetter('_position'));
   o._direction  = MO.Class.register(o, new MO.AGetter('_direction'));
   o._projection = MO.Class.register(o, new MO.AGetter('_projection'));
   o.construct   = MO.FE3sCamera_construct;
   o.unserialize = MO.FE3sCamera_unserialize;
   o.saveConfig  = MO.FE3sCamera_saveConfig;
   return o;
}
MO.FE3sCamera_construct = function FE3sCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._position = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._projection = MO.Class.create(MO.FE3sProjection);
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
MO.FE3sComponent = function FE3sComponent(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   return o;
}
MO.FE3sDisplay = function FE3sDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sDrawable);
   o._outline         = null;
   o._renderables     = MO.Class.register(o, new MO.AGetter('_renderables'));
   o.construct        = MO.FE3sDisplay_construct;
   o.calculateOutline = MO.FE3sDisplay_calculateOutline;
   o.unserialize      = MO.FE3sDisplay_unserialize;
   o.saveConfig       = MO.FE3sDisplay_saveConfig;
   o.clone            = MO.FE3sDisplay_clone;
   return o;
}
MO.FE3sDisplay_construct = function FE3sDisplay_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   o._outline = new MO.SOutline3d();
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
            var renderable = renderabels.at(i);
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
   var resourceConsole = MO.Console.find(MO.FE3sResourceConsole);
   var renderableCount = input.readUint16();
   if(renderableCount > 0){
      var renderables = o._renderables = new MO.TObjects();
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
MO.FE3sDisplayContainer = function FE3sDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplay);
   o._displays        = MO.Class.register(o, new MO.AGetter('_displays'));
   o.construct        = MO.FE3sDisplayContainer_construct;
   o.pushDisplay      = MO.FE3sDisplayContainer_pushDisplay;
   o.calculateOutline = MO.FE3sDisplayContainer_calculateOutline;
   o.unserialize      = MO.FE3sDisplayContainer_unserialize;
   o.saveConfig       = MO.FE3sDisplayContainer_saveConfig;
   o.clone            = MO.FE3sDisplayContainer_clone;
   return o;
}
MO.FE3sDisplayContainer_construct = function FE3sDisplayContainer_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
}
MO.FE3sDisplayContainer_pushDisplay = function FE3sDisplayContainer_pushDisplay(display){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new MO.TObjects();
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
      var displays = o._displays = new MO.TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = MO.Class.create(MO.FE3sSceneDisplay);
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
MO.FE3sDisplayLayer = function FE3sDisplayLayer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayContainer);
   o._typeCd      = MO.Class.register(o, new MO.AGetSet('_typeCd'));
   o._transformCd = MO.Class.register(o, new MO.AGetSet('_transformCd'));
   o.unserialize  = MO.FE3sDisplayLayer_unserialize;
   o.saveConfig   = MO.FE3sDisplayLayer_saveConfig;
   return o;
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
MO.FE3sDisplayMaterial = function FE3sDisplayMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._groupGuid  = MO.Class.register(o, new MO.AGetter('_groupGuid'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   o.unserialize = MO.FE3sDisplayMaterial_unserialize;
   return o;
}
MO.FE3sDisplayMaterial_unserialize = function FE3sDisplayMaterial_unserialize(p){
   var o = this;
   o._groupGuid = p.readString();
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
MO.FE3sDrawable = function FE3sDrawable(o){
   o = MO.Class.inherits(this, o, MO.FE3sComponent);
   o._matrix     = MO.Class.register(o, new MO.AGetter('_matrix'));
   o.construct   = MO.FE3sDrawable_construct;
   o.matrix      = MO.FE3sDrawable_matrix;
   o.unserialize = MO.FE3sDrawable_unserialize;
   o.saveConfig  = MO.FE3sDrawable_saveConfig;
   o.clone       = MO.FE3sDrawable_clone;
   return o;
}
MO.FE3sDrawable_construct = function FE3sDrawable_construct(){
   var o = this;
   o.__base.FE3sComponent.construct.call(o);
   o._matrix = new MO.SMatrix3d();
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
MO.FE3sFrame = function FE3sFrame(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._tick        = MO.Class.register(o, new MO.AGetter('_tick'));
   o._translation = MO.Class.register(o, new MO.AGetter('_translation'));
   o._quaternion  = MO.Class.register(o, new MO.AGetter('_quaternion'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   return o;
}
MO.FE3sGeometry = function FE3sGeometry(o){
   o = MO.Class.inherits(this, o, MO.FE3sRenderable, MO.ME3sGeometry);
   o.construct   = MO.FE3sGeometry_construct;
   o.unserialize = MO.FE3sGeometry_unserialize;
   o.dispose     = MO.FE3sGeometry_dispose;
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
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
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
MO.FE3sLight = function FE3sLight(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._typeName   = MO.Class.register(o, new MO.AGetter('_typeName'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   o._camera     = MO.Class.register(o, new MO.AGetter('_camera'));
   o.construct   = MO.FE3sLight_construct;
   o.unserialize = MO.FE3sLight_unserialize;
   return o;
}
MO.FE3sLight_construct = function FE3sLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._camera = MO.Class.create(MO.FE3sCamera);
}
MO.FE3sLight_unserialize = function FE3sLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
MO.FE3sMaterial = function FE3sMaterial(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._parentGuid  = MO.Class.register(o, new MO.AGetter('_parentGuid'));
   o._info        = MO.Class.register(o, new MO.AGetter('_info'));
   o._bitmaps     = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   o.construct    = MO.FE3sMaterial_construct;
   o.effectCode   = MO.FE3sMaterial_effectCode;
   o.unserialize  = MO.FE3sMaterial_unserialize;
   o.saveConfig   = MO.FE3sMaterial_saveConfig;
   o.clone        = MO.FE3sMaterial_clone;
   return o;
}
MO.FE3sMaterial_construct = function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new MO.SE3sMaterialInfo();
}
MO.FE3sMaterial_effectCode = function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}
MO.FE3sMaterial_unserialize = function FE3sMaterial_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._parentGuid = input.readString();
   o._info.unserialize(input);
   var packCount = input.readInt16();
   if(packCount > 0){
      var bitmapPacks = o._bitmapPacks = new MO.TDictionary();
      for(var i = 0; i < packCount; i++){
         var bitmapPack = MO.Class.create(MO.FE3sMaterialBitmapPack);
         bitmapPack.unserialize(input);
         bitmapPacks.set(bitmapPack.guid(), bitmapPack);
      }
   }
   var bitmapCount = input.readInt16();
   if(bitmapCount > 0){
      var bitmaps = o._bitmaps = new MO.TObjects();
      for(var i = 0; i < bitmapCount; i++){
         var bitmap = MO.Class.create(MO.FE3sMaterialBitmap);
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
MO.FE3sMaterialBitmap = function FE3sMaterialBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._bitmapPackGuid = MO.Class.register(o, new MO.AGetter('_bitmapPackGuid'));
   o._bitmapPack     = MO.Class.register(o, new MO.AGetSet('_bitmapPack'));
   o._bitmapGuid     = MO.Class.register(o, new MO.AGetter('_bitmapGuid'));
   o._index          = 0;
   o.unserialize     = MO.FE3sMaterialBitmap_unserialize;
   return o;
}
MO.FE3sMaterialBitmap_unserialize = function FE3sMaterialBitmap_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._bitmapPackGuid = input.readString();
   o._bitmapGuid = input.readString();
   o._index = input.readUint16();
}
MO.FE3sMaterialBitmapPack = function FE3sMaterialBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._typeName   = MO.Class.register(o, new MO.AGetter('_typeName'));
   o._formatName = MO.Class.register(o, new MO.AGetter('_formatName'));
   o._size       = MO.Class.register(o, new MO.AGetter('_size'));
   o.construct   = MO.FE3sMaterialBitmapPack_construct;
   o.unserialize = MO.FE3sMaterialBitmapPack_unserialize;
   o.dispose     = MO.FE3sMaterialBitmapPack_dispose;
   return o;
}
MO.FE3sMaterialBitmapPack_construct = function FE3sMaterialBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FE3sMaterialBitmapPack_unserialize = function FE3sMaterialBitmapPack_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._typeName = input.readString();
   o._formatName = input.readString();
   o._size.unserialize(input, MO.EDataType.Uint16);
}
MO.FE3sMaterialBitmapPack_dispose = function FE3sMaterialBitmapPack_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o.__base.FE3sObject.dispose.call(o);
}
MO.FE3sMaterialConsole = function FE3sMaterialConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._resources  = null;
   o._materials  = null;
   o.construct   = MO.FE3sMaterialConsole_construct;
   o.find        = MO.FE3sMaterialConsole_find;
   o.unserialize = MO.FE3sMaterialConsole_unserialize;
   o.loadByGuid  = MO.FE3sMaterialConsole_loadByGuid;
   o.dispose     = MO.FE3sMaterialConsole_dispose;
   return o;
}
MO.FE3sMaterialConsole_construct = function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new MO.TDictionary();
   o._materials = new MO.TDictionary();
}
MO.FE3sMaterialConsole_find = function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}
MO.FE3sMaterialConsole_unserialize = function FE3sMaterialConsole_unserialize(input){
   var o = this;
   var material = MO.Class.create(MO.FE3sMaterial);
   material.unserialize(input);
   var materialGuid = material.guid();
   if(o._materials.contains(materialGuid)){
      throw new MO.TError(o, 'Material is already exists.');
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
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('material');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   resource = MO.Class.create(MO.FE3sMaterialResource);
   resource.setGuid(guid);
   resource.setVendor(vendor);
   resource.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(resource);
   resources.set(guid, resource);
   return resource;
}
MO.FE3sMaterialConsole_dispose = function FE3sMaterialConsole_dispose(){
   var o = this;
   o._resources = MO.Lang.Object.free(o._resources);
   o._materials = MO.Lang.Object.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sMaterialRefer = function FE3sMaterialRefer(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   return o;
}
MO.FE3sMaterialResource = function FE3sMaterialResource(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._typeName     = 'Material';
   o._dataCompress = true;
   o._material     = MO.Class.register(o, new MO.AGetter('_material'));
   o.unserialize   = MO.FE3sMaterialResource_unserialize;
   return o;
}
MO.FE3sMaterialResource_unserialize = function FE3sMaterialResource_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   o._material = MO.Console.find(MO.FE3sMaterialConsole).unserialize(input);
   MO.Logger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
}
MO.FE3sMesh = function FE3sMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace, MO.ME3sGeometry);
   o._dataCompress = true;
   o._typeName     = 'Mesh';
   o._display      = null;
   o._renderable   = null;
   o.construct     = MO.FE3sMesh_construct;
   o.unserialize   = MO.FE3sMesh_unserialize;
   o.saveConfig    = MO.FE3sMesh_saveConfig;
   o.dispose       = MO.FE3sMesh_dispose;
   return o;
}
MO.FE3sMesh_construct = function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
   o._display = MO.Class.create(MO.FE3sMeshDisplay);
}
MO.FE3sMesh_unserialize = function FE3sMesh_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   o._outline.unserialize(input);
   o._outline.update();
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
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
   o._outline = MO.Lang.Object.dispose(o._outline);
   o._display = MO.Lang.Object.dispose(o._display);
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sSpace.dispose.call(o);
}
MO.FE3sMeshConsole = function FE3sMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._venderCode = 'mesh';
   o._serviceUrl = '/cloud.content.mesh.ws'
   o._dataUrl    = '/cloud.content.mesh.wv'
   o._meshs      = MO.Class.register(o, new MO.AGetter('_meshs'));
   o.construct   = MO.FE3sMeshConsole_construct;
   o.find        = MO.FE3sMeshConsole_find;
   o.loadByGuid  = MO.FE3sMeshConsole_loadByGuid;
   o.loadByCode  = MO.FE3sMeshConsole_loadByCode;
   o.dispose     = MO.FE3sMeshConsole_dispose;
   return o;
}
MO.FE3sMeshConsole_construct = function FE3sMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._meshs = new MO.TDictionary();
}
MO.FE3sMeshConsole_find = function FE3sMeshConsole_find(p){
   return this._meshs.get(p);
}
MO.FE3sMeshConsole_loadByGuid = function FE3sMeshConsole_loadByGuid(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = MO.Console.find(MO.FE3sVendorConsole).find(o._venderCode);
   v.set('guid', p);
   var u = v.makeUrl();
   r = MO.Class.create(MO.FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
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
   var v = MO.Console.find(MO.FE3sVendorConsole).find(o._venderCode);
   v.set('code', p);
   var u = v.makeUrl();
   r = MO.Class.create(MO.FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
MO.FE3sMeshConsole_dispose = function FE3sMeshConsole_dispose(){
   var o = this;
   o._meshs = MO.Lang.Object.free(o._meshs);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sMeshDisplay = function FE3sMeshDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._matrix     = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   o._renderable = MO.Class.register(o, new MO.AGetter('_renderable'));
   o.construct   = MO.FE3sMeshDisplay_construct;
   o.unserialize = MO.FE3sMeshDisplay_unserialize;
   o.saveConfig  = MO.FE3sMeshDisplay_saveConfig;
   return o;
}
MO.FE3sMeshDisplay_construct = function FE3sMeshDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._renderable = MO.Class.create(MO.FE3sRenderable);
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
MO.FE3sModel = function FE3sModel(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   o._typeName      = 'Model';
   o._dataCompress  = true;
   o._dataBlock     = true;
   o._meshes        = MO.Class.register(o, new MO.AGetter('_meshes'));
   o._skeletons     = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o._animations    = MO.Class.register(o, new MO.AGetter('_animations'));
   o._display       = MO.Class.register(o, new MO.AGetter('_display'));
   o.construct      = MO.FE3sModel_construct;
   o.findMeshByCode = MO.FE3sModel_findMeshByCode;
   o.unserialize    = MO.FE3sModel_unserialize;
   o.saveConfig     = MO.FE3sModel_saveConfig;
   return o;
}
MO.FE3sModel_construct = function FE3sModel_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   var display = o._display = MO.Class.create(MO.FE3sModelDisplay);
   display._model = o;
}
MO.FE3sModel_findMeshByCode = function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.at(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}
MO.FE3sModel_unserialize = function FE3sModel_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   var modelConsole = MO.Console.find(MO.FE3sModelConsole);
   modelConsole.models().set(o.guid(), o);
   var meshCount = input.readInt16();
   if(meshCount > 0){
      var meshes = o._meshes = new MO.TDictionary();
      for(var i = 0; i < meshCount; i++){
         var mesh = modelConsole.unserialMesh(input)
         var meshGuid = mesh.guid();
         meshes.set(meshGuid, mesh);
      }
   }
   var skeletonCount = input.readInt16();
   if(skeletonCount > 0){
      var s = o._skeletons = new MO.TObjects();
      for(var i = 0; i < skeletonCount; i++){
         var skeleton = modelConsole.unserialSkeleton(input)
         s.push(skeleton);
      }
   }
   var animationCount = input.readInt16();
   if(animationCount > 0){
      var animations = o._animations = new MO.TObjects();
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
MO.FE3sModelConsole = function FE3sModelConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._models           = MO.Class.register(o, new MO.AGetter('_models'));
   o._meshs            = MO.Class.register(o, new MO.AGetter('_meshs'));
   o._skeletons        = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o._animations       = MO.Class.register(o, new MO.AGetter('_animations'));
   o.construct         = MO.FE3sModelConsole_construct;
   o.findModel         = MO.FE3sModelConsole_findModel;
   o.findMesh          = MO.FE3sModelConsole_findMesh;
   o.findSkeleton      = MO.FE3sModelConsole_findSkeleton;
   o.findAnimation     = MO.FE3sModelConsole_findAnimation;
   o.unserialMesh      = MO.FE3sModelConsole_unserialMesh;
   o.unserialSkeleton  = MO.FE3sModelConsole_unserialSkeleton;
   o.unserialAnimation = MO.FE3sModelConsole_unserialAnimation;
   o.load              = MO.FE3sModelConsole_load;
   o.dispose           = MO.FE3sModelConsole_dispose;
   return o;
}
MO.FE3sModelConsole_construct = function FE3sModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new MO.TDictionary();
   o._meshs = new MO.TDictionary();
   o._skeletons = new MO.TDictionary();
   o._animations = new MO.TDictionary();
   var rc = MO.Console.find(MO.FResourceConsole);
   var rp = MO.Class.create(MO.FResourcePipeline);
   var rt = MO.Class.create(MO.FResourceType);
   rt.setCode('resource3d.model');
   rt._pipeline = rp;
   rc.registerType(rt);
}
MO.FE3sModelConsole_findModel = function FE3sModelConsole_findModel(p){
   return this._models.get(p);
}
MO.FE3sModelConsole_findMesh = function FE3sModelConsole_findMesh(p){
   return this._meshs.get(p);
}
MO.FE3sModelConsole_findSkeleton = function FE3sModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}
MO.FE3sModelConsole_findAnimation = function FE3sModelConsole_findAnimation(p){
   return this._animations.get(p);
}
MO.FE3sModelConsole_unserialMesh = function FE3sModelConsole_unserialMesh(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sModelMesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}
MO.FE3sModelConsole_unserialSkeleton = function FE3sModelConsole_unserialSkeleton(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sSkeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}
MO.FE3sModelConsole_unserialAnimation = function FE3sModelConsole_unserialAnimation(m, p){
   var o = this;
   var r = MO.Class.create(MO.FE3sAnimation);
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
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('model');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   model = MO.Class.create(MO.FE3sModel);
   model.setGuid(guid);
   model.setVendor(vendor);
   model.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(model);
   models.set(guid, model);
   return model;
}
MO.FE3sModelConsole_dispose = function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = MO.Lang.Object.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sModelDisplay = function FE3sModelDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplay);
   o._model           = null;
   o._material        = null;
   o.construct        = MO.FE3sModelDisplay_construct;
   o.material         = MO.FE3sModelDisplay_material;
   o.calculateOutline = MO.FE3sModelDisplay_calculateOutline;
   o.unserialize      = MO.FE3sModelDisplay_unserialize;
   o.saveConfig       = MO.FE3sModelDisplay_saveConfig;
   return o;
}
MO.FE3sModelDisplay_construct = function FE3sModelDisplay_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
   o._material = MO.Class.create(MO.FE3sMaterial);
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
MO.FE3sModelMesh = function FE3sModelMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3sGeometry);
   return o;
}
MO.FE3sModelRenderable = function FE3sModelRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sRenderable);
   o._meshGuid   = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._mesh       = MO.Class.register(o, new MO.AGetSet('_mesh'));
   o.construct   = MO.FE3sModelRenderable_construct;
   o.unserialize = MO.FE3sModelRenderable_unserialize;
   o.saveConfig  = MO.FE3sModelRenderable_saveConfig;
   return o;
}
MO.FE3sModelRenderable_construct = function FE3sModelRenderable_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
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
MO.FE3sMovie = function FE3sMovie(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'));
   o._rotation   = MO.Class.register(o, new MO.AGetter('_rotation'));
   o.construct   = MO.FE3sMovie_construct;
   o.unserialize = MO.FE3sMovie_unserialize;
   o.saveConfig  = MO.FE3sMovie_saveConfig;
   o.dispose     = MO.FE3sMovie_dispose;
   return o;
}
MO.FE3sMovie_construct = function FE3sMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._rotation = new MO.SVector3();
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
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o.__base.FE3sObject.disposet.call(o);
}
MO.FE3sObject = function FE3sObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MParent);
   o._typeName   = null;
   o._guid       = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label      = MO.Class.register(o, new MO.AGetSet('_label'));
   o._isClone    = false;
   o.makeLabel   = MO.FE3sObject_makeLabel;
   o.unserialize = MO.FE3sObject_unserialize;
   o.saveConfig  = MO.FE3sObject_saveConfig;
   o.clone       = MO.FE3sObject_clone;
   o.dispose     = MO.FE3sObject_dispose;
   return o;
}
MO.FE3sObject_makeLabel = function FE3sObject_makeLabel(){
   var o = this;
   var result = '';
   if(!MO.Lang.String.isEmpty(o._code)){
      result += o._code;
   }
   if(!MO.Lang.String.isEmpty(o._label)){
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
   if(!MO.Lang.String.isEmpty(o._typeName)){
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
      result = MO.Class.create(o.constructor);
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
MO.FE3sProjection = function FE3sProjection(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._angle      = MO.Class.register(o, MO.AGetter('_angle'), 90);
   o._znear      = MO.Class.register(o, MO.AGetter('_znear'), 1);
   o._zfar       = MO.Class.register(o, MO.AGetter('_zfar'), 200);
   o.unserialize = MO.FE3sProjection_unserialize;
   o.saveConfig  = MO.FE3sProjection_saveConfig;
   return o;
}
MO.FE3sProjection_unserialize = function FE3sProjection_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._angle = input.readFloat();
   o._znear = input.readFloat();
   o._zfar = input.readFloat();
}
MO.FE3sProjection_saveConfig = function FE3sProjection_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.setFloat('angle', o._angle);
   xconfig.setFloat('znear', o._znear);
   xconfig.setFloat('zfar', o._zfar);
}
MO.FE3sRegion = function FE3sRegion(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._optionBackground     = MO.Class.register(o, new MO.AGetSet('_optionBackground'), true);
   o._backgroundColor      = MO.Class.register(o, new MO.AGetter('_backgroundColor'));
   o._moveSpeed            = MO.Class.register(o, new MO.AGetSet('_moveSpeed'), 0.1);
   o._rotationKeySpeed     = MO.Class.register(o, new MO.AGetSet('_rotationKeySpeed'), 0.005);
   o._rotationMouseSpeed   = MO.Class.register(o, new MO.AGetSet('_rotationMouseSpeed'), 0.003);
   o._material             = null;
   o._camera               = MO.Class.register(o, new MO.AGetter('_camera'));
   o._light                = MO.Class.register(o, new MO.AGetter('_light'));
   o.construct             = MO.FE3sRegion_construct;
   o.unserialize           = MO.FE3sRegion_unserialize;
   o.saveConfig            = MO.FE3sRegion_saveConfig;
   return o;
}
MO.FE3sRegion_construct = function FE3sRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new MO.SColor4();
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._camera = MO.Class.create(MO.FE3sCamera);
   o._light = MO.Class.create(MO.FE3sLight);
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
MO.FE3sRenderable = function FE3sRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sDrawable);
   o._materialRefers   = MO.Class.register(o, new MO.AGetter('_materialRefers'));
   o.construct         = MO.FE3sRenderable_construct;
   o.syncMaterialRefer = MO.FE3sRenderable_syncMaterialRefer;
   o.pushMaterialRefer = MO.FE3sRenderable_pushMaterialRefer;
   o.unserialize       = MO.FE3sRenderable_unserialize;
   o.saveConfig        = MO.FE3sRenderable_saveConfig;
   o.clone             = MO.FE3sRenderable_clone;
   return o;
}
MO.FE3sRenderable_construct = function FE3sRenderable_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
}
MO.FE3sRenderable_syncMaterialRefer = function FE3sRenderable_syncMaterialRefer(index){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new MO.TObjects();
   }
   for(var i = materialRefers.count(); i <= index; i++){
      materialRefers.push(MO.Class.create(MO.FE3sMaterialRefer));
   }
   return materialRefers.at(index);
}
MO.FE3sRenderable_pushMaterialRefer = function FE3sRenderable_pushMaterialRefer(materialRefer){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new MO.Objects();
   }
   materialRefers.push(materialRefer);
}
MO.FE3sRenderable_unserialize = function FE3sRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   var count = input.readUint16();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var materialRefer = MO.Class.create(MO.FE3sMaterialRefer);
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
MO.FE3sResource = function FE3sResource(o){
   o = MO.Class.inherits(this, o, MO.FResource, MO.MListener);
   o._dataLoad      = false;
   o._dataReady     = false;
   o._dataSize      = 0;
   o._blockSize     = 0;
   o._blockCount    = 0;
   o._vendor        = MO.Class.register(o, new MO.AGetSet('_vendor'));
   o._loadListeners = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o.onComplete     = MO.FE3sResource_onComplete;
   o.makeLabel      = MO.FE3sResource_makeLabel;
   o.testReady      = MO.FE3sResource_testReady;
   o.unserialize    = MO.FE3sResource_unserialize;
   o.saveConfig     = MO.FE3sResource_saveConfig;
   o.dispose        = MO.FE3sResource_dispose;
   return o;
}
MO.FE3sResource_onComplete = function FE3sResource_onComplete(input){
   var o = this;
   if(MO.Class.isClass(input, MO.MDataStream)){
      o.unserialize(input);
   }else{
      var view = MO.Class.create(MO.FDataView);
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
   if(!MO.Lang.String.isEmpty(o._code)){
      result += o._code;
   }
   if(!MO.Lang.String.isEmpty(o._label)){
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
   if(!MO.String.isEmpty(o._typeName)){
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
MO.FE3sResourceConsole = function FE3sResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._factory            = MO.Class.register(o, new MO.AGetter('_factory'));
   o.construct           = MO.FE3sResourceConsole_construct;
   o.create              = MO.FE3sResourceConsole_create;
   o.unserializeResource = MO.FE3sResourceConsole_unserializeResource;
   o.unserialize         = MO.FE3sResourceConsole_unserialize;
   return o;
}
MO.FE3sResourceConsole_construct = function FE3sResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var factory = o._factory = MO.Class.create(MO.FClassFactory);
   factory.register('Shape', MO.FE3sShape);
   factory.register('Sprite', MO.FE3sSprite);
   factory.register('ModelMesh', MO.FE3sModelMesh);
   factory.register('ModelRenderable', MO.FE3sModelRenderable);
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
MO.FE3sScene = function FE3sScene(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   o._typeName     = 'Scene';
   o._dataCompress = true;
   o._templates    = null;
   o.construct     = MO.FE3sScene_construct;
   o.unserialize   = MO.FE3sScene_unserialize;
   o.saveConfig    = MO.FE3sScene_saveConfig;
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
      var templateConsole = MO.Console.find(MO.FE3sTemplateConsole);
      var templates = o._templates = new MO.TDictionary();
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
MO.FE3sSceneAnimation = function FE3sSceneAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._playRate   = MO.Class.register(o, new MO.AGetSet('_playRate'), 1);
   o.construct   = MO.FE3sSceneAnimation_construct;
   o.unserialize = MO.FE3sSceneAnimation_unserialize;
   o.saveConfig  = MO.FE3sSceneAnimation_saveConfig;
   return o;
}
MO.FE3sSceneAnimation_construct = function FE3sSceneAnimation_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
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
MO.FE3sSceneConsole = function FE3sSceneConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._vendorCode = 'scene';
   o._dataUrl    = '/cloud.content.scene.wv'
   o._scenes     = null;
   o.construct   = MO.FE3sSceneConsole_construct;
   o.loadByGuid  = MO.FE3sSceneConsole_loadByGuid;
   o.loadByCode  = MO.FE3sSceneConsole_loadByCode;
   return o;
}
MO.FE3sSceneConsole_construct = function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new MO.TDictionary();
}
MO.FE3sSceneConsole_loadByGuid = function FE3sSceneConsole_loadByGuid(guid){
   var o = this;
   var scenes = o._scenes;
   var scene = scenes.get(guid);
   if(scene){
      return scene;
   }
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find(o._vendorCode);
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   scene = MO.Class.create(MO.FE3sScene);
   scene.setGuid(guid);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(scene);
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
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find(o._vendorCode);
   vendor.set('code', code);
   var url = vendor.makeUrl();
   scene = MO.Class.create(MO.FE3sScene);
   scene.setCode(code);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(scene);
   scenes.set(code, scene);
   return scene;
}
MO.FE3sSceneDisplay = function FE3sSceneDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sSprite);
   o._templateGuid        = MO.Class.register(o, new MO.AGetter('_templateGuid'));
   o._animations          = MO.Class.register(o, new MO.AGetter('_animations'));
   o._movies              = MO.Class.register(o, new MO.AGetter('_movies'));
   o._renderables         = MO.Class.register(o, new MO.AGetter('_renderables'));
   o.construct            = MO.FE3sSceneDisplay_construct;
   o.findAnimation        = MO.FE3sSceneDisplay_findAnimation;
   o.syncAnimation        = MO.FE3sSceneDisplay_syncAnimation;
   o.unserialize          = MO.FE3sSceneDisplay_unserialize;
   o.saveConfig           = MO.FE3sSceneDisplay_saveConfig;
   o.clone                = MO.FE3sSceneDisplay_clone;
   return o;
}
MO.FE3sSceneDisplay_construct = function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sSprite.construct.call(o);
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
      animations = o._animations = new MO.TDictionary();
   }
   var animation = animations.get(guid);
   if(!animation){
      animation = MO.Class.create(MO.FE3sSceneAnimation);
      animation._guid = guid;
      animations.set(guid, animation);
   }
   return animation;
}
MO.FE3sSceneDisplay_unserialize = function FE3sSceneDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sSprite.unserialize.call(o, input);
   o._templateGuid = input.readString();
   var animationCount = input.readUint16();
   if(animationCount > 0){
      var animations = o._animations = new MO.TDictionary();
      for(var i = 0; i < animationCount; i++){
         var animation = MO.Class.create(MO.FE3sSceneAnimation);
         animation.unserialize(input);
         animations.set(animation.guid(), animation);
      }
   }
   var movieCount = input.readUint16();
   if(movieCount > 0){
      var movies = o._movies = new MO.TObjects();
      for(var i = 0; i < movieCount; i++){
         var movie = MO.Class.create(MO.FE3sMovie);
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
MO.FE3sSceneLayer = function FE3sSceneLayer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayLayer);
   return o;
}
MO.FE3sSceneRenderable = function FE3sSceneRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o.unserialize = MO.FE3sSceneRenderable_unserialize;
   return o;
}
MO.FE3sSceneRenderable_unserialize = function FE3sSceneRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
}
MO.FE3sShape = function FE3sShape(o){
   o = RClass.inherits(this, o, FE3sRenderable);
   o._modelGuid    = MO.Class.register(o, new MO.AGetter('_modelGuid'));
   o._model        = null;
   o._meshGuid     = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._mesh         = null;
   o._materialGuid = MO.Class.register(o, new MO.AGetter('_materialGuid'));
   o._material     = null;
   o.construct     = FE3sShape_construct;
   o.model         = FE3sShape_model;
   o.mesh          = FE3sShape_mesh;
   o.material      = FE3sShape_material;
   o.unserialize   = FE3sShape_unserialize;
   return o;
}
MO.FE3sShape_construct = function FE3sShape_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}
MO.FE3sShape_model = function FE3sShape_model(){
   var o = this;
   var model = o._model;
   if(!model){
      model = o._model = MO.Console.find(MO.FE3sModelConsole).findModel(o._modelGuid);
   }
   return model;
}
MO.FE3sShape_mesh = function FE3sShape_mesh(){
   var o = this;
   var mesh = o._mesh;
   if(!mesh){
      mesh = o._mesh = MO.Console.find(MO.FE3sModelConsole).findMesh(this._meshGuid);
   }
   return mesh;
}
MO.FE3sShape_material = function FE3sShape_material(){
   var o = this;
   var material = o._material;
   if(!material){
      material = o._material = MO.Console.find(MO.FE3sMaterialConsole).find(this._materialGuid);
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
MO.FE3sSkeleton = function FE3sSkeleton(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._bones        = MO.Class.register(o, new MO.AGetter('_bones'));
   o._roots        = MO.Class.register(o, new MO.AGetter('_roots'));
   o._skins        = MO.Class.register(o, new MO.AGetter('_skins'));
   o._animations   = MO.Class.register(o, new MO.AGetter('_animations'));
   o.findBone      = MO.FE3sSkeleton_findBone;
   o.pushAnimation = MO.FE3sSkeleton_pushAnimation;
   o.innerFilter   = MO.FE3sSkeleton_innerFilter;
   o.unserialize   = MO.FE3sSkeleton_unserialize;
   return o;
}
MO.FE3sSkeleton_findBone = function FE3sSkeleton_findBone(p){
   return this._bones.get(p);
}
MO.FE3sSkeleton_pushAnimation = function FE3sSkeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new MO.TObjects();
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
      o._bones = new MO.TDictionary();
      var s = o._roots = new MO.TObjects();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(MO.FE3sBone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new MO.TObjects();
      for(var i = 0; i < c; i++){
         var k = MO.Class.create(MO.FE3sSkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
MO.FE3sSkeletonSkin = function FE3sSkeletonSkin(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._meshGuid   = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._streams    = MO.Class.register(o, new MO.AGetter('_streams'));
   o._boneRefers = MO.Class.register(o, new MO.AGetter('_boneRefers'));
   o.find        = MO.FE3sSkeletonSkin_find;
   o.unserialize = MO.FE3sSkeletonSkin_unserialize;
   return o;
}
MO.FE3sSkeletonSkin_find = function FE3sSkeletonSkin_find(p){
   return this._streams.get(p);
}
MO.FE3sSkeletonSkin_unserialize = function FE3sSkeletonSkin_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   o._meshGuid = input.readString();
   var streamCount = input.readUint8();
   if(streamCount > 0){
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
         stream.unserialize(input);
         streams.push(stream);
      }
   }
   var boneReferCount = input.readUint8();
   if(boneReferCount > 0){
      var boneRefers = o._boneRefers = new MO.TObjects();
      for(var i = 0; i < boneReferCount; i++){
         var boneRefer = MO.Class.create(MO.FE3sBoneRefer);
         boneRefer.unserialize(input);
         boneRefers.push(boneRefer);
      }
   }
}
MO.FE3sSpace = function FE3sSpace(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._typeName   = null;
   o._technique  = MO.Class.register(o, new MO.AGetter('_technique'));
   o._region     = MO.Class.register(o, new MO.AGetter('_region'));
   o._materials  = MO.Class.register(o, new MO.AGetter('_materials'));
   o._displays   = MO.Class.register(o, new MO.AGetter('_displays'));
   o._layers     = MO.Class.register(o, new MO.AGetter('_layers'));
   o.construct   = MO.FE3sSpace_construct;
   o.unserialize = MO.FE3sSpace_unserialize;
   o.saveConfig  = MO.FE3sSpace_saveConfig;
   return o;
}
MO.FE3sSpace_construct = function FE3sSpace_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = MO.Class.create(MO.FE3sTechnique);
   o._region = MO.Class.create(MO.FE3sRegion);
}
MO.FE3sSpace_unserialize = function FE3sSpace_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   var resourceConsole = MO.Console.find(MO.FE3sResourceConsole);
   var materialConsole = MO.Console.find(MO.FE3sMaterialConsole);
   o._technique.unserialize(input);
   o._region.unserialize(input);
   var materialCount = input.readInt16();
   if(materialCount > 0){
      var materials = o._materials = new MO.TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
      }
   }
   var displayCount = input.readInt16();
   if(displayCount > 0){
      var displays = o._displays = new MO.TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = resourceConsole.unserialize(input);
         displays.push(display);
      }
   }
   var layerCount = input.readInt16();
   if(layerCount > 0){
      var layers = o._layers = new MO.TDictionary();
      for(var i = 0; i < layerCount; i++){
         var layer = MO.Class.create(MO.FE3sDisplayLayer);
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
MO.FE3sSprite = function FE3sSprite(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayContainer);
   o._materials   = MO.Class.register(o, new MO.AGetter('_materials'));
   o.construct    = MO.FE3sSprite_construct;
   o.pushMaterial = MO.FE3sSprite_pushMaterial;
   o.unserialize  = MO.FE3sSprite_unserialize;
   o.saveConfig   = MO.FE3sSprite_saveConfig;
   o.clone        = MO.FE3sSprite_clone;
   return o;
}
MO.FE3sSprite_construct = function FE3sSprite_construct(){
   var o = this;
   o.__base.FE3sDisplayContainer.construct.call(o);
}
MO.FE3sSprite_pushMaterial = function FE3sSprite_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new MO.TDictionary();
   }
   materials.set(material.guid(), material);
}
MO.FE3sSprite_unserialize = function FE3sSprite_unserialize(input){
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   var materialCount = input.readUint16();
   if(materialCount > 0){
      var materialConsole = MO.Console.find(MO.FE3sMaterialConsole);
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
MO.FE3sStream = function FE3sStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code             = MO.Class.register(o, new MO.AGetSet('_code'));
   o._elementDataCd    = MO.Class.register(o, new MO.AGetSet('_elementDataCd'), 0);
   o._elementCount     = MO.Class.register(o, new MO.AGetSet('_elementCount'), 0);
   o._elementNormalize = MO.Class.register(o, new MO.AGetSet('_elementNormalize'), false);
   o._dataStride       = MO.Class.register(o, new MO.AGetSet('_dataStride'), 0);
   o._dataCount        = MO.Class.register(o, new MO.AGetSet('_dataCount'), 0);
   o._dataLength       = MO.Class.register(o, new MO.AGetSet('_dataLength'), 0);
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._formatCd         = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o.unserialize       = MO.FE3sStream_unserialize;
   o.dispose           = MO.FE3sStream_dispose;
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
MO.FE3sTechnique = function FE3sTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._techniqueCode = MO.Class.register(o, new MO.AGetter('_techniqueCode'));
   o._passes        = MO.Class.register(o, new MO.AGetter('_passes'));
   o.passes         = MO.FE3sTechnique_passes;
   o.unserialize    = MO.FE3sTechnique_unserialize;
   o.saveConfig     = MO.FE3sTechnique_saveConfig;
   return o;
}
MO.FE3sTechnique_unserialize = function FE3sTechnique_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   var passCount = input.readInt16();
   if(passCount > 0){
      var passes = o._passes = new MO.TObjects();
      for(var i = 0; i < passCount; i++){
         var pass = MO.Class.create(MO.FE3sTechniquePass);
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
MO.FE3sTechniquePass = function FE3sTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._targetWidth  = MO.Class.register(o, new MO.AGetter('_targetWidth'));
   o._targetHeight = MO.Class.register(o, new MO.AGetter('_targetHeight'));
   o.unserialize   = MO.FE3sTechniquePass_unserialize;
   return o;
}
MO.FE3sTechniquePass_unserialize = function FE3sTechniquePass_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._targetWidth = input.readUint16();
   o._targetHeight = input.readUint16();
}
MO.FE3sTemplate = function FE3sTemplate(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   o._typeName     = 'Template';
   o._dataCompress = true;
   return o;
}
MO.FE3sTemplateConsole = function FE3sTemplateConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o.construct   = MO.FE3sTemplateConsole_construct;
   o.unserialize = MO.FE3sTemplateConsole_unserialize;
   o.loadByGuid  = MO.FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = MO.FE3sTemplateConsole_loadByCode;
   o.update      = MO.FE3sTemplateConsole_update;
   return o;
}
MO.FE3sTemplateConsole_construct = function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new MO.TDictionary();
}
MO.FE3sTemplateConsole_unserialize = function FE3sTemplateConsole_unserialize(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sTemplate);
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
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('template');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   template = MO.Class.create(MO.FE3sTemplate);
   template.setGuid(guid);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(template);
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
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('template');
   vendor.set('code', code);
   var url = vendor.makeUrl();
   template = MO.Class.create(MO.FE3sTemplate);
   template.setCode(code);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(template);
   templates.set(code, template);
   return template;
}
MO.FE3sTemplateConsole_update = function FE3sTemplateConsole_update(p){
   var o = this;
   var u = MO.RBrowser.hostPath(o._serviceUrl + '?action=update');
   MO.Console.find(MO.FXmlConsole).send(u, p);
}
MO.FE3sTemplateTheme = function FE3sTemplateTheme(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._materials   = MO.Class.register(o, new MO.AGetter('_materials'));
   o.findMaterial = MO.FE3sTemplateTheme_findMaterial;
   o.materials    = MO.FE3sTemplateTheme_materials;
   o.unserialize  = MO.FE3sTemplateTheme_unserialize;
   return o;
}
MO.FE3sTemplateTheme_findMaterial = function FE3sTemplateTheme_findMaterial(p){
   return this._materials.get(p);
}
MO.FE3sTemplateTheme_unserialize = function FE3sTemplateTheme_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var mc = MO.Console.find(MO.FE3sMaterialConsole);
      var s = o._materials = new MO.TDictionary();
      for(var n = 0; n < c; n++){
         var m = mc.unserialize(p);
         s.set(m.groupGuid(), m);
      }
   }
}
MO.FE3sTexture = function FE3sTexture(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._dataCompress = true;
   o._bitmaps      = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks  = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   o.construct     = MO.FE3sTexture_construct;
   o.unserialize   = MO.FE3sTexture_unserialize;
   o.dispose       = MO.FE3sTexture_dispose;
   return o;
}
MO.FE3sTexture_construct = function FE3sTexture_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
}
MO.FE3sTexture_unserialize = function FE3sTexture_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmaps = new MO.TDictionary();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(FE3sTextureBitmap);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmapPacks = new MO.TDictionary();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(FE3sTextureBitmapPack);
         b._texture = o;
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
}
MO.FE3sTexture_dispose = function FE3sTexture_dispose(){
   var o = this;
   o._bitmaps = MO.Lang.Object.free(o._bitmaps);
   o._bitmapPacks = MO.Lang.Object.free(o._bitmapPacks);
   o.__base.FE3sResource.dispose.call(o);
}
MO.FE3sTextureBitmap = function FE3sTextureBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._packCode   = MO.Class.register(o, new MO.AGetter('_packCode'));
   o.packCode    = MO.FE3sTextureBitmap_packCode;
   o.unserialize = MO.FE3sTextureBitmap_unserialize;
   return o;
}
MO.FE3sTextureBitmap_unserialize = function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._packCode = p.readString();
}
MO.FE3sTextureBitmapPack = function FE3sTextureBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._optionCompress = MO.Class.register(o, new MO.AGetter('_optionCompress'));
   o._size           = MO.Class.register(o, new MO.AGetter('_size'));
   o._data           = MO.Class.register(o, new MO.AGetter('_data'));
   o._typeName       = null;
   o._formatName     = null;
   o.construct       = MO.FE3sTextureBitmapPack_construct;
   o.unserialize     = MO.FE3sTextureBitmapPack_unserialize;
   o.dispose         = MO.FE3sTextureBitmapPack_dispose;
   return o;
}
MO.FE3sTextureBitmapPack_construct = function FE3sTextureBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new MO.SSize2();
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
      throw new MO.TError(o, 'Unserial texture failure ');
   }
}
MO.FE3sTextureBitmapPack_dispose = function FE3sTextureBitmapPack_dispose(){
   var o = this;
   o._data = null;
   o.__base.FE3sObject.dispose.call(o);
}
MO.FE3sTextureConsole = function FE3sTextureConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._textures   = null;
   o.construct   = MO.FE3sTextureConsole_construct;
   o.unserialize = MO.FE3sTextureConsole_unserialize;
   o.load        = MO.FE3sTextureConsole_load;
   o.loadBitmap  = MO.FE3sTextureConsole_loadBitmap;
   o.dispose     = MO.FE3sModelConsole_dispose;
   return o;
}
MO.FE3sTextureConsole_construct = function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new MO.TDictionary();
}
MO.FE3sTextureConsole_unserialize = function FE3sTextureConsole_unserialize(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sTexture);
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
   var v = MO.Console.find(MO.FE3sVendorConsole).find('texture');
   var u = v.makeUrl(p);
   r = MO.Class.create(MO.FE3sTexture);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
MO.FE3sTextureConsole_loadBitmap = function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   var o = this;
   var v = MO.Console.find(MO.FE3sVendorConsole).find('texture.bitmap');
   v.set('guid', pg);
   v.set('code', pc);
   v.set('format', pf);
   var u = v.makeUrl();
   var g = o._image = MO.Class.create(MO.FImage);
   g.loadUrl(u);
   return g;
}
MO.FE3sTextureConsole_dispose = function FE3sTextureConsole_dispose(){
   var o = this;
   o._textures = MO.Lang.Object.free(o._textures);
   o.__base.FConsole.dispose.call(o);
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
MO.FE3sThemeConsole = function FE3sThemeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._path        = '/assets/theme/'
   o._activeTheme = MO.Class.register(o, new MO.AGetter('_activeTheme'));
   o._themes      = null;
   o.construct    = MO.FE3sThemeConsole_construct;
   o.find         = MO.FE3sThemeConsole_find;
   o.select       = MO.FE3sThemeConsole_select;
   return o;
}
MO.FE3sThemeConsole_construct = function FE3sThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new MO.TDictionary();
}
MO.FE3sThemeConsole_find = function FE3sThemeConsole_find(name){
   var theme = this._activeTheme;
   if(theme == null){
      throw new MO.TError('Active theme is empty.');
   }
   return theme.find(name);
}
MO.FE3sThemeConsole_select = function FE3sThemeConsole_select(name){
   var o = this;
   var theme = o._themes.get(name);
   if(theme == null){
      var url = MO.RBrowser.contentPath(o._path + name + '.ser');
      theme = MO.Class.create(MO.FE3sTheme);
      theme.load(url);
      o._themes.set(name, theme);
   }
   o._activeTheme = theme;
   return theme;
}
MO.FE3sTrack = function FE3sTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._meshCode     = MO.Class.register(o, new MO.AGetter('_meshCode'));
   o._boneIndex    = MO.Class.register(o, new MO.AGetter('_boneIndex'), 0);
   o._frameTick    = MO.Class.register(o, new MO.AGetter('_frameTick'), 0);
   o._matrix       = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._matrixInvert = MO.Class.register(o, new MO.AGetter('_matrixInvert'));
   o._frameCount   = MO.Class.register(o, new MO.AGetter('_frameCount'));
   o._frames       = MO.Class.register(o, new MO.AGetter('_frames'));
   o.construct     = MO.FE3sTrack_construct;
   o.calculate     = MO.FE3sTrack_calculate;
   o.unserialize   = MO.FE3sTrack_unserialize;
   return o;
}
MO.FE3sTrack_construct = function FE3sTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._matrixInvert = new MO.SMatrix3d();
}
MO.FE3sTrack_calculate = function FE3sTrack_calculate(info, tick){
   var o = this;
   var frameCount = info.frameCount;
   if(frameCount == 0){
      throw new MO.TError('Frame count is invalid.');
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
   o._frames = new MO.TObjects();
}
MO.FE3sVendor = function FE3sVendor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._contentUrl   = MO.Class.register(o, new MO.AGetSet('_contentUrl'));
   o._parameters   = null;
   o.construct     = MO.FE3sVendor_construct;
   o.get           = MO.FE3sVendor_get;
   o.set           = MO.FE3sVendor_set;
   o.makeSource    = MO.Method.virtual(o, 'makeSource');
   o.makeUrl       = MO.FE3sVendor_makeUrl;
   o.reset         = MO.FE3sVendor_reset;
   o.dispose       = MO.FE3sVendor_dispose;
   return o;
}
MO.FE3sVendor_construct = function FE3sVendor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._parameters = new MO.TAttributes();
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
      r += 'date=' + MO.Lang.Date.format();
   }
   return r;
}
MO.FE3sVendor_reset = function FE3sVendor_reset(){
   this._parameters.clear();
}
MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
   var o = this;
   o._parameters = MO.Lang.Object.dispose(o._parameters);
   o.__base.FObject.dispose.call(o);
}
MO.FE3sVendorConsole = function FE3sVendorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._setuped     = false;
   o._vendors     = null;
   o.construct    = MO.FE3sVendorConsole_construct;
   o.createVendor = MO.FE3sVendorConsole_createVendor;
   o.register     = MO.FE3sVendorConsole_register;
   o.find         = MO.FE3sVendorConsole_find;
   o.setup        = MO.FE3sVendorConsole_setup;
   return o;
}
MO.FE3sVendorConsole_construct = function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._vendors = new MO.TDictionary();
}
MO.FE3sVendorConsole_createVendor = function FE3sVendorConsole_createVendor(c, u){
   var v = MO.Class.create(c);
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
      o._vendors.set('bitmap', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
      o._vendors.set('material', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
      o._vendors.set('mesh', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
      o._vendors.set('model', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
      o._vendors.set('template', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
      o._vendors.set('scene', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
   }else if(p == 'local'){
      o._vendors.set('bitmap', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
      o._vendors.set('material', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/material/{guid}.bin')));
      o._vendors.set('mesh', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
      o._vendors.set('model', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/model/{guid}.bin')));
      o._vendors.set('template', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/template/{guid}.bin')));
      o._vendors.set('scene', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/scene/{guid}.bin')));
   }else{
      throw new MO.TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}
MO.FE3sVendorLocal = function FE3sVendorLocal(o){
   o = MO.Class.inherits(this, o, MO.FE3sVendor);
   o.makeSource = MO.FE3sVendorLocal_makeSource;
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
      u = MO.Lang.String.replace(u, '{' + n + '}', v);
   }
   return u;
}
MO.FE3sVendorNet = function FE3sVendorNet(o){
   o = MO.Class.inherits(this, o, MO.FE3sVendor);
   o.makeSource = MO.FE3sVendorNet_makeSource;
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
      if(!MO.Lang.String.isEmpty(value)){
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
   o.translation  = new MO.SPoint3();
   o.quaternion   = new MO.SQuaternion();
   o.scale        = new MO.SVector3();
   o.matrix       = new MO.SMatrix3d();
   o.update       = MO.SE3rPlayInfo_update;
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
MO.FE3rAnimation = function FE3rAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._valid       = false;
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._tracks      = MO.Class.register(o, new AGetter('_tracks'));
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   o._playInfo    = null;
   o.construct    = MO.FE3rAnimation_construct;
   o.findTrack    = MO.FE3rAnimation_findTrack;
   o.loadResource = MO.FE3rAnimation_loadResource;
   o.record       = MO.FE3rAnimation_record;
   o.process      = MO.Method.virtual(o, 'process');
   o.dispose      = MO.FE3rAnimation_dispose;
   return o;
}
MO.FE3rAnimation_construct = function FE3rAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._playInfo = new MO.SE3rPlayInfo();
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
MO.FE3rAnimation_loadResource = function FE3rAnimation_loadResource(resource){
   var o = this;
   var frameCount = resource.frameCount();
   o._resource = resource;
   var trackResources = resource.tracks();
   if(trackResources){
      var tracks = o._tracks = new MO.TObjects();
      var count = trackResources.count();
      for(var i = 0; i < count; i++){
         var trackResource = trackResources.at(i);
         var track = MO.Class.create(MO.FE3rTrack);
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
MO.FE3rBitmap = function FE3rBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._pack        = null;
   o.construct    = MO.FE3rBitmap_construct;
   o.testReady    = MO.FE3rBitmap_testReady;
   o.texture      = MO.FE3rBitmap_texture;
   o.loadResource = MO.FE3rBitmap_loadResource;
   o.dispose      = MO.FE3rBitmap_dispose;
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
MO.FE3rBitmapConsole = function FE3rBitmapConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._bitmaps  = MO.Class.register(o, new AGetter('_bitmaps'));
   o._dataUrl  = '/cloud.resource.material.wv'
   o.construct = MO.FE3rBitmapConsole_construct;
   o.load      = MO.FE3rBitmapConsole_load;
   o.loadUrl   = MO.FE3rBitmapConsole_loadUrl;
   return o;
}
MO.FE3rBitmapConsole_construct = function FE3rBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}
MO.FE3rBitmapConsole_load = function FE3rBitmapConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = MO.Class.create(MO.FE3rBitmapCubePack);
   }else{
      bitmap = MO.Class.create(MO.FE3rBitmapFlatPack);
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
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = MO.Window.Class.create(MO.FE3rBitmap);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
MO.FE3rBitmapCubePack = function FE3rBitmapCubePack(o){
   o = MO.Class.inherits(this, o, MO.FE3rBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = MO.FE3rBitmapCubePack_onLoad;
   o.construct    = MO.FE3rBitmapCubePack_construct;
   o.loadUrl      = MO.FE3rBitmapCubePack_loadUrl;
   o.dispose      = MO.FE3rBitmapCubePack_dispose;
   return o;
}
MO.FE3rBitmapCubePack_onLoad = function FE3rBitmapCubePack_onLoad(p){
   var o = this;
   var context = o._graphicContext;
   var images = o._images;
   var capability = MO.Window.Browser.capability();
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
   o._images = MO.Lang.Object.dispose(o._images);
   o._dataReady = true;
   o._ready = true;
}
MO.FE3rBitmapCubePack_construct = function FE3rBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
MO.FE3rBitmapCubePack_loadUrl = function FE3rBitmapCubePack_loadUrl(url){
   var o = this;
   o._images = new MO.TObjects();
   for(var i = 0; i < 6; i++){
      var image = MO.Class.create(MO.FImage);
      image._index = i;
      image.setOptionAlpha(false);
      image.loadUrl(url + "&index=" + i);
      image.addLoadListener(o, o.onLoad);
      o._images.push(image);
   }
}
MO.FE3rBitmapCubePack_dispose = function FE3rBitmapCubePack_dispose(){
   var o = this;
   o._images = MO.Lang.Object.dispose(o._images);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
MO.FE3rBitmapFlatPack = function FE3rBitmapFlatPack(o){
   o = MO.Class.inherits(this, o, MO.FE3rBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = MO.FE3rBitmapFlatPack_onLoad;
   o.construct    = MO.FE3rBitmapFlatPack_construct;
   o.loadUrl      = MO.FE3rBitmapFlatPack_loadUrl;
   o.dispose      = MO.FE3rBitmapFlatPack_dispose;
   return o;
}
MO.FE3rBitmapFlatPack_onLoad = function FE3rBitmapFlatPack_onLoad(event){
   var o = this;
   var context = o._graphicContext;
   var texture = o._texture = context.createFlatTexture();
   texture.upload(o._image);
   texture.makeMipmap();
   o._image = MO.Lang.Object.dispose(o._image);
   o._dataReady = true;
}
MO.FE3rBitmapFlatPack_construct = function FE3rBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
MO.FE3rBitmapFlatPack_loadUrl = function FE3rBitmapFlatPack_loadUrl(url){
   var o = this;
   var image = o._image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onLoad);
   image.loadUrl(url);
}
MO.FE3rBitmapFlatPack_dispose = function FE3rBitmapFlatPack_dispose(){
   var o = this;
   o._image = MO.Lang.Object.dispose(o._image);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
MO.FE3rBitmapPack = function FE3rBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = MO.Class.register(o, new AGetter('_texture'));
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = MO.Method.virtual(o, 'onLoad');
   o.construct    = MO.FE3rBitmapPack_construct;
   o.testReady    = MO.FE3rBitmapPack_testReady;
   o.loadUrl      = MO.Method.virtual(o, 'loadUrl');
   o.dispose      = MO.FE3rBitmapPack_dispose;
   return o;
}
MO.FE3rBitmapPack_construct = function FE3rBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
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
MO.FE3rBone = function FE3rBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix        = MO.Class.register(o, new AGetter('_matrix'));
   o._boneResource  = MO.Class.register(o, new AGetter('_boneResource'));
   o._trackResource = MO.Class.register(o, new AGetter('_trackResource'));
   o.construct      = MO.FE3rBone_construct;
   o.loadResource   = MO.FE3rBone_loadResource;
   o.update         = MO.FE3rBone_update;
   o.dispose        = MO.FE3rBone_dispose;
   return o;
}
MO.FE3rBone_construct = function FE3rBone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
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
MO.FE3rDynamicMesh = function FE3rDynamicMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._model            = null;
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = null;
   o.construct         = MO.FE3rDynamicMesh_construct;
   o.mergeCount        = MO.FE3rDynamicMesh_mergeCount;
   o.mergeMaxCount     = MO.FE3rDynamicMesh_mergeMaxCount;
   o.mergeRenderables  = MO.FE3rDynamicMesh_mergeRenderables;
   o.syncVertexBuffer  = MO.FE3rDynamicMesh_syncVertexBuffer;
   o.mergeRenderable   = MO.FE3rDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = MO.FE3rDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = MO.FE3rDynamicMesh_mergeIndexBuffer;
   o.build             = MO.FE3rDynamicMesh_build;
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
         case MO.EG3dAttributeFormat.Float1:
            buffer._data = new Float32Array(1 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float2:
            buffer._data = new Float32Array(2 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float3:
            buffer._data = new Float32Array(3 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float4:
            buffer._data = new Float32Array(4 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            buffer._data = new Uint8Array(4 * vertexTotal);
            break;
         default:
            throw new MO.TError("Unknown code");
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
      if(vt > MO.Lang.Integer.MAX_UINT32){
         return false;
      }
   }else{
      if(vt > MO.Lang.Integer.MAX_UINT16){
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
         MO.Lang.Float.copy(data, 3 * position, d, 0, 3 * dataCount);
         break;
      case 'coord':
         var d = new Float32Array(resource._data);
         MO.Lang.Float.copy(data, 2 * position, d, 0, 2 * dataCount);
         break;
      case 'color':
      case "normal":
      case "binormal":
      case "tangent":
      case "bone_index":
      case "bone_weight":
         var d = new Uint8Array(resource._data);
         MO.Lang.Byte.copy(data, 4 * position, d, 0, 4 * dataCount);
         break;
      default:
         throw new MO.TError("Unknown code");
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
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      indexBuffer._data = new Uint32Array(indexTotal);
   }else{
      indexBuffer.setSstrideCd(MO.EG3dIndexStride.Uint16);
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
MO.FE3rDynamicModel = function FE3rDynamicModel(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._renderables   = MO.Class.register(o, new AGetter('_renderables'));
   o._mergeMaxCount = MO.Class.register(o, new AGetter('_mergeMaxCount'));
   o._mergeStride   = MO.Class.register(o, new AGetter('_mergeStride'), 4);
   o._meshes        = MO.Class.register(o, new AGetter('_meshes'));
   o._updateDate    = 0;
   o.construct      = MO.FE3rDynamicModel_construct;
   o.createMesh     = MO.FE3rDynamicModel_createMesh;
   o.pushRenderable = MO.FE3rDynamicModel_pushRenderable;
   o.build          = MO.FE3rDynamicModel_build;
   o.update         = MO.FE3rDynamicModel_update;
   return o;
}
MO.FE3rDynamicModel_construct = function FE3rDynamicModel_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._renderables = new MO.TObjects();
   o._meshes = new MO.TObjects();
}
MO.FE3rDynamicModel_createMesh = function FE3rDynamicModel_createMesh(){
   var o = this;
   var m = MO.Class.create(MO.FE3rDynamicMesh);
   m._model = o;
   m.linkGraphicContext(o);
   o._meshes.push(m);
   return m;
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
               throw new MO.TError(o, 'Merge renderable failure.');
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
   o._updateDate = MO.Timer.current();
}
MO.FE3rGeometry = function FE3rGeometry(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._ready            = false;
   o._resource         = MO.Class.register(o, new AGetSet('_resource'));
   o._vertexCount      = MO.Class.register(o, new AGetter('_vertexCount'), 0);
   o._vertexBuffers    = MO.Class.register(o, new AGetter('_vertexBuffers'));
   o._indexBuffer      = MO.Class.register(o, new AGetter('_indexBuffer'));
   o._indexBuffers     = MO.Class.register(o, new AGetter('_indexBuffers'));
   o._resourceMaterial = MO.Class.register(o, new AGetter('_resourceMaterial'));
   o._material         = MO.Class.register(o, new AGetter('_material'));
   o._textures         = MO.Class.register(o, new AGetter('_textures'));
   o.construct         = MO.FE3rGeometry_construct;
   o.testReady         = MO.FE3rGeometry_testReady;
   o.findVertexBuffer  = MO.FE3rGeometry_findVertexBuffer;
   o.findTexture       = MO.FE3rGeometry_findTexture;
   o.loadResource      = MO.FE3rGeometry_loadResource;
   o.processLoad       = MO.FE3rGeometry_processLoad;
   return o;
}
MO.FE3rGeometry_construct = function FE3rGeometry_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new MO.TDictionary();
   o._indexBuffers = new MO.TObjects();
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
MO.FE3rGeometry_findVertexBuffer = function FE3rGeometry_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}
MO.FE3rGeometry_findTexture = function FE3rGeometry_findTexture(p){
   return this._textures.get(p);
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
         if(dataCd == MO.EDataType.Uint16){
            buffer.setStrideCd(MO.EG3dIndexStride.Uint16);
         }else if(dataCd == MO.EDataType.Uint32){
            buffer.setStrideCd(MO.EG3dIndexStride.Uint32);
         }else{
            throw new MO.TError(o, "Unknown data type.");
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
MO.FE3rIndexBuffer = function FE3rIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FWglIndexBuffer, MO.MLinkerResource);
   o.dispose = MO.FE3rIndexBuffer_dispose;
   return o;
}
MO.FE3rIndexBuffer_dispose = function FE3rIndexBuffer_dispose(){
   var o = this;
   o.__base.MLinkerResource.dispose.call(o);
   o.__base.FWglIndexBuffer.dispose.call(o);
}
MO.FE3rInstanceMesh = function FE3rInstanceMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rMesh);
   o._merges         = null;
   o.construct       = MO.FE3rInstanceMesh_construct;
   o.mergeRenderable = MO.FE3rInstanceMesh_mergeRenderable;
   o.build           = MO.FE3rInstanceMesh_build;
   return o;
}
MO.FE3rInstanceMesh_construct = function FE3rInstanceMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._merges = new MO.TObjects();
}
MO.FE3rInstanceMesh_mergeRenderable = function FE3rInstanceMesh_mergeRenderable(p){
   this._merges.push(p);
}
MO.FE3rInstanceMesh_build = function FE3rInstanceMesh_build(){
}
MO.FE3rMaterial = function FE3rMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dMaterial, MO.MGraphicObject, MO.MLinkerResource);
   o._ready         = false;
   o._visible       = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o._guid          = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._bitmaps       = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._reference     = MO.Class.register(o, new MO.AGetter('_reference'));
   o.findBitmap     = MO.FE3rMaterial_findBitmap;
   o.testReady      = MO.FE3rMaterial_testReady;
   o.testVisible    = MO.FE3rMaterial_testVisible;
   o.loadResource   = MO.FE3rMaterial_loadResource;
   o.reloadResource = MO.FE3rMaterial_reloadResource;
   o.load           = MO.FE3rMaterial_load;
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
      var bitmapConsole = MO.Console.find(MO.FE3rBitmapConsole)
      var bitmaps = o._bitmaps = new MO.TDictionary();
      var count = bitmapResources.count();
      for(var i = 0; i < count; i++){
         var bitmapResource = bitmapResources.at(i);
         var bitmapCode = bitmapResource.code();
         var bitmapPackResource = bitmapResource.bitmapPack();
         var packCode = bitmapPackResource.code();
         var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
         var bitmap = MO.Class.create(MO.FE3rBitmap);
         bitmap._pack  = bitmapPack;
         bitmap.loadResource(bitmapResource);
         bitmaps.set(bitmapCode, bitmap);
      }
   }
}
MO.FE3rMaterialConsole = function FE3rMaterialConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._materials = null;
   o.construct  = MO.FE3rMaterialConsole_construct;
   o.load       = MO.FE3rMaterialConsole_load;
   return o;
}
MO.FE3rMaterialConsole_construct = function FE3rMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materials = new MO.TDictionary();
}
MO.FE3rMaterialConsole_load = function FE3rMaterialConsole_load(context, guid){
   var o = this;
   if(!context){
      throw new MO.TError('Graphics context is empty');
   }
   if(!guid){
      throw new MO.TError('Material guid is empty');
   }
   var material = o._materials.get(guid);
   if(material){
      return material;
   }
   var resource = MO.Console.find(MO.FE3sMaterialConsole).find(guid);
   material = MO.Class.create(MO.FE3rMaterial);
   material.linkGraphicContext(context);
   material.loadResource(resource);
   material.load();
   o._materials.set(guid, material);
   return material;
}
MO.FE3rMesh = function FE3rMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._ready            = false;
   o._resource         = MO.Class.register(o, new AGetSet('_resource'));
   o._vertexCount      = MO.Class.register(o, new AGetter('_vertexCount'), 0);
   o._vertexBuffers    = MO.Class.register(o, new AGetter('_vertexBuffers'));
   o._indexBuffer      = MO.Class.register(o, new AGetter('_indexBuffer'));
   o._resourceMaterial = MO.Class.register(o, new AGetter('_resourceMaterial'));
   o._material         = MO.Class.register(o, new AGetter('_material'));
   o._textures         = MO.Class.register(o, new AGetter('_textures'));
   o.construct         = MO.FE3rMesh_construct;
   o.testReady         = MO.FE3rMesh_testReady;
   o.findVertexBuffer  = MO.FE3rMesh_findVertexBuffer;
   o.findTexture       = MO.FE3rMesh_findTexture;
   o.loadResource      = MO.FE3rMesh_loadResource;
   o.processLoad       = MO.FE3rMesh_processLoad;
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
MO.FE3rMesh_findTexture = function FE3rMesh_findTexture(p){
   return this._textures.get(p);
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
MO.FE3rMeshAnimation = function FE3rMeshAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3rAnimation);
   o.process = MO.FE3rMeshAnimation_process;
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
MO.FE3rMeshConsole = function FE3rMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._loadMeshs = null;
   o._meshs     = MO.Class.register(o, new AGetter('_meshs'));
   o._thread    = null;
   o._interval  = 200;
   o.onProcess  = MO.FE3rMeshConsole_onProcess;
   o.construct  = MO.FE3rMeshConsole_construct;
   o.findMesh   = MO.FE3rMeshConsole_findMesh;
   o.loadByGuid = MO.FE3rMeshConsole_loadByGuid;
   o.loadByCode = MO.FE3rMeshConsole_loadByCode;
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
   o._loadMeshs = new MO.TLooper();
   o._meshs = new MO.TDictionary();
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
}
MO.FE3rMeshConsole_findMesh = function FE3rMeshConsole_findMesh(p){
   return this._meshs.get(p);
}
MO.FE3rMeshConsole_loadByGuid = function FE3rMeshConsole_loadByGuid(pc, pg){
   var o = this;
   if(!MO.Class.isClass(pc, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Mesh guid is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = MO.Console.find(MO.FE3sMeshConsole);
   var rm = rmc.loadByGuid(pg);
   m = MO.Class.create(MO.FE3rMesh);
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
   if(!MO.Class.isClass(pc, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Mesh code is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = MO.Console.find(MO.FE3sMeshConsole);
   var rm = rmc.loadByCode(pg);
   m = MO.Class.create(MO.FE3rMesh);
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
MO.FE3rModel = function FE3rModel(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._resource            = MO.Class.register(o, new AGetSet('_resource'));
   o._meshes              = MO.Class.register(o, new AGetter('_meshes'));
   o._skeletons           = MO.Class.register(o, new AGetter('_skeletons'));
   o._dataReady           = false;
   o.findMeshByGuid       = MO.FE3rModel_findMeshByGuid;
   o.testReady            = MO.FE3rModel_testReady;
   o.loadResource         = MO.FE3rModel_loadResource;
   o.loadSkeletonResource = MO.FE3rModel_loadSkeletonResource;
   o.processLoad          = MO.FE3rModel_processLoad;
   o.dispose              = MO.FE3rModel_dispose;
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
MO.FE3rModel_testReady = function FE3rModel_testReady(){
   return this._dataReady;
}
MO.FE3rModel_loadSkeletonResource = function FE3rModel_loadSkeletonResource(resource){
   var o = this;
   var modelConsole = MO.Console.find(MO.FE3rModelConsole);
   var skinResources = resource.skins();
   if(skinResources){
      var skinCount = skinResources.count();
      for(var i = 0; i < skinCount; i++){
         var skinResource = skinResources.at(i);
         var skin = MO.Class.create(MO.FE3rSkin);
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
   var modelConsole = MO.Console.find(MO.FE3rModelConsole);
   var meshResources = resource.meshes();
   if(meshResources){
      var meshes = o._meshes = new MO.TObjects();
      var meshCount = meshResources.count();
      for(var i = 0; i < meshCount; i++){
         var meshResource = meshResources.valueAt(i);
         var mesh = MO.Class.create(MO.FE3rModelMesh);
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
   o._meshes = MO.Lang.Object.dispose(o._meshes);
   o._skeletons = MO.Lang.Object.dispose(o._skeletons);
   o.__base.FObject.dispose.call(o);
}
MO.FE3rModelConsole = function FE3rModelConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._loadModels    = null;
   o._models        = MO.Class.register(o, new MO.AGetter('_models'));
   o._meshs         = MO.Class.register(o, new MO.AGetter('_meshs'));
   o._dynamicMeshs  = null;
   o._thread        = null;
   o._interval      = 200;
   o.onProcess      = MO.FE3rModelConsole_onProcess;
   o.construct      = MO.FE3rModelConsole_construct;
   o.findModel      = MO.FE3rModelConsole_findModel;
   o.findMesh       = MO.FE3rModelConsole_findMesh;
   o.load           = MO.FE3rModelConsole_load;
   o.loadMeshByGuid = MO.FE3rModelConsole_loadMeshByGuid;
   o.loadMeshByCode = MO.FE3rModelConsole_loadMeshByCode;
   o.merge          = MO.FE3rModelConsole_merge;
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
   o._loadModels = new MO.TLooper();
   o._models = new MO.TDictionary();
   o._meshs = new MO.TDictionary();
   o._dynamicMeshs = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
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
      throw new MO.TError('Graphics context is empty');
   }
   if(!guid){
      throw new MO.TError('Model guid is empty');
   }
   var model = o._models.get(guid);
   if(model){
      return model;
   }
   var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
   model = MO.Class.create(MO.FE3rModel);
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
      throw new MO.TError('Graphics context is empty');
   }
   if(!guid){
      throw new MO.TError('Model guid is empty');
   }
   var m = o._models.get(pg);
   if(m){
      return m;
   }
   var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
   m = MO.Class.create(MO.FE3rModel);
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
   if(!MO.Class.isClass(context, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Model guid is empty');
   }
   var model = o._models.get(pg);
   if(model){
      return model;
   }
   var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
   model = MO.Class.create(MO.FE3rModel);
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
      model = MO.Class.create(MO.FE3rDynamicModel);
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
MO.FE3rModelMesh = function FE3rModelMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rGeometry);
   o._ready            = false;
   o._resourceMaterial = null;
   o._skins            = MO.Class.register(o, new AGetter('_skins'));
   o._boneIds          = MO.Class.register(o, new AGetter('_boneIds'));
   o.construct         = MO.FE3rModelMesh_construct;
   o.testReady         = MO.FE3rModelMesh_testReady;
   o.guid              = MO.FE3rModelMesh_guid;
   o.pushSkin          = MO.FE3rModelMesh_pushSkin;
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
MO.FE3rModelMesh_pushSkin = function FE3rModelMesh_pushSkin(skin){
   var o = this;
   var skins = o._skins;
   if(!skins){
      skins = o._skins = new MO.TObjects();
   }
   skins.push(skin);
}
MO.FE3rObject = function FE3rObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
MO.FE3rPipeline = function FE3rPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o.construct        = MO.FE3rPipeline_construct;
   o.findVertexBuffer = MO.FE3rPipeline_findVertexBuffer;
   o.loadResource     = MO.FE3rPipeline_loadResource;
   return o;
}
MO.FE3rPipeline_construct = function FE3rPipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new MO.TObjects();
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
MO.FE3rSkeleton = function FE3rSkeleton(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject, MO.MLinkerResource);
   o._bones       = MO.Class.register(o, new AGetter('_bones'));
   o._skins       = MO.Class.register(o, new AGetter('_skins'));
   o.loadResource = MO.FE3rSkeleton_loadResource;
   return o;
}
MO.FE3rSkeleton_loadResource = function FE3rSkeleton_loadResource(resource){
   var o = this;
   o._resource = resource;
   var boneResources = resource._bones;
   var count = boneResources.count();
   if(count > 0){
      var bones = o._bones = new MO.TObjects();
      for(var i = 0; i < count; i++){
         var boneResource = boneResources.at(i);
         var bone = MO.Class.create(MO.FE3rBone);
         bone.loadResource(boneResource);
         bones.push(bone);
      }
   }
}
MO.FE3rSkeletonAnimation = function FE3rSkeletonAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3rAnimation);
   o.process = MO.FE3rSkeletonAnimation_process;
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
MO.FE3rSkin = function FE3rSkin(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   o._streams     = MO.Class.register(o, new AGetter('_streams'));
   o.loadResource = MO.FE3rSkin_loadResource;
   return o;
}
MO.FE3rSkin_loadResource = function FE3rSkin_loadResource(resource){
   var o = this;
   o._resource = resource;
   var streamResources = resource.streams();
   if(streamResources){
      var count = streamResources.count();
      if(count > 0){
         var streams = o._streams = new MO.TObjects();
         for(var i = 0; i < count; i++){
            var streamResource = streamResources.at(i);
            var stream = MO.Class.create(MO.FE3rStream);
            stream.linkGraphicContext(o);
            stream.loadResource(streamResource);
            streams.push(stream);
         }
      }
   }
}
MO.FE3rStream = function FE3rStream(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._resource    = MO.Class.register(o, new MO.AGetter('_resource'));
   o._buffer      = MO.Class.register(o, new MO.AGetter('_buffer'));
   o.loadResource = MO.FE3rStream_loadResource;
   return o;
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
         throw new MO.TError("Unknown code");
   }
   buffer.upload(resource._data, resource._dataStride, dataCount);
}
MO.FE3rTexture = function FE3rTexture(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._resource    = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._bitmaps     = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   o._ready       = false;
   o._dataReady   = false;
   o.construct    = MO.FE3rTexture_construct;
   o.testReady    = MO.FE3rTexture_testReady;
   o.loadBitmap   = MO.FE3rTexture_loadBitmap;
   o.loadResource = MO.FE3rTexture_loadResource;
   o.load         = MO.FE3rTexture_load;
   o.processLoad  = MO.FE3rTexture_processLoad;
   o.dispose      = MO.FE3rTexture_dispose;
   return o;
}
MO.FE3rTexture_construct = function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}
MO.FE3rTexture_testReady = function FE3rTexture_testReady(){
   return this._ready;
}
MO.FE3rTexture_loadBitmap = function FE3rTexture_loadBitmap(p){
   var o = this;
   var s = o._bitmaps;
   var b = s.get(p);
   if(!b){
      b = MO.Class.create(MO.FE3rTextureBitmap);
      s.set(p, b);
   }
   return b;
}
MO.FE3rTexture_loadResource = function FE3rTexture_loadResource(p){
   var o = this;
   var rbps = p.bitmapPacks();
   if(rbps){
      var bps = o._bitmapPacks = new MO.TDictionary();
      var c = rbps.count();
      for(var i = 0; i < c; i++){
         var rbp = rbps.valueAt(i);
         var bp = null;
         if(rbp._typeName == 'flat'){
            bp = MO.Class.create(MO.FE3rTextureBitmapFlatPack);
         }else if(rbp._typeName == 'cube'){
            bp = MO.Class.create(MO.FE3rTextureBitmapCubePack);
         }else{
            throw new MO.TError(o, 'Load resource failure.');
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
         throw new MO.TError('Link pack is not eists.');
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
   o._bitmaps = MO.Lang.Object.dispose(o._bitmaps);
   o.__base.FObject.dispose.call(o);
}
MO.FE3rTextureBitmap = function FE3rTextureBitmap(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._ready      = false;
   o._bitmapPack = null;
   o.construct   = MO.FE3rTextureBitmap_construct;
   o.texture     = MO.FE3rTextureBitmap_texture;
   o.testReady   = MO.FE3rTextureBitmap_testReady;
   o.load        = MO.FE3rTextureBitmap_load;
   o.dispose     = MO.FE3rTextureBitmap_dispose;
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
MO.FE3rTextureBitmap_load = function FE3rTextureBitmap_load(name){
   var o = this;
   o._bitmapPack = name;
   o._ready = true;
}
MO.FE3rTextureBitmap_dispose = function FE3rTextureBitmap_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._bitmapPack = null;
   o.__base.FObject.dispose.call(o);
}
MO.FE3rTextureBitmapCubePack = function FE3rTextureBitmapCubePack(o){
   o = MO.Class.inherits(this, o, MO.FE3rTextureBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = MO.FE3rTextureBitmapCubePack_onLoad;
   o.construct    = MO.FE3rTextureBitmapCubePack_construct;
   o.loadResource = MO.FE3rTextureBitmapCubePack_loadResource;
   o.dispose      = MO.FE3rTextureBitmapCubePack_dispose;
   return o;
}
MO.FE3rTextureBitmapCubePack_onLoad = function FE3rTextureBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   var capability = MO.Window.Browser.capability();
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
         is[i] = MO.Lang.Object.dispose(m);
      }
   }
   o._images = MO.Lang.Object.dispose(o._images);
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
   var capability = MO.Window.Browser.capability();
   var d = p.data();
   var t = p._formatName;
   o._images = new MO.TObjects();
   for(var i = 0; i < 6; i++){
      var g = o._images[i] = MO.Class.create(FImage);
      g._index = i;
      g.setOptionAlpha(false);
      if(capability.blobCreate){
         var blob = new Blob([d[i]], {'type' : 'image/' + t});
         var url = window.URL.createObjectURL(blob);
         g.loadUrl(url);
      }else{
         var url = MO.Window.Browser.hostPath('/cloud.content.texture.bitmap.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
         g.loadUrl(url);
      }
      g.addLoadListener(o, o.onLoad);
   }
}
MO.FE3rTextureBitmapCubePack_dispose = function FE3rTextureBitmapCubePack_dispose(){
   var o = this;
   o._images = MO.Lang.Object.dispose(o._images);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
MO.FE3rTextureBitmapFlatPack = function FE3rTextureBitmapFlatPack(o){
   o = MO.Class.inherits(this, o, MO.FE3rTextureBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = MO.FE3rTextureBitmapFlatPack_onLoad;
   o.construct    = MO.FE3rTextureBitmapFlatPack_construct;
   o.loadResource = MO.FE3rTextureBitmapFlatPack_loadResource;
   o.dispose      = MO.FE3rTextureBitmapFlatPack_dispose;
   return o;
}
MO.FE3rTextureBitmapFlatPack_onLoad = function FE3rTextureBitmapFlatPack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   o._image = MO.Lang.Object.dispose(o._image);
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
   var g = o._image = MO.Console.find(MO.FE3sTextureConsole).loadBitmap(rt._guid, c, p._formatName);
   g.addLoadListener(o, o.onLoad);
}
MO.FE3rTextureBitmapFlatPack_dispose = function FE3rTextureBitmapFlatPack_dispose(){
   var o = this;
   o._image = MO.Lang.Object.dispose(o._image);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
MO.FE3rTextureBitmapPack = function FE3rTextureBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = MO.Class.register(o, new AGetter('_texture'));
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = MO.Method.virtual(o, 'onLoad');
   o.construct    = MO.FE3rTextureBitmapPack_construct;
   o.testReady    = MO.FE3rTextureBitmapPack_testReady;
   o.loadResource = MO.Method.virtual(o, 'loadResource');
   o.dispose      = MO.FE3rTextureBitmapPack_dispose;
   return o;
}
MO.FE3rTextureBitmapPack_construct = function FE3rTextureBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
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
MO.FE3rTextureConsole = function FE3rTextureConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._loadTextures = null;
   o._bitmaps      = MO.Class.register(o, new AGetter('_bitmaps'));
   o._textures     = MO.Class.register(o, new AGetter('_textures'));
   o._thread       = null;
   o._interval     = 200;
   o.onProcess     = MO.FE3rTextureConsole_onProcess;
   o.construct     = MO.FE3rTextureConsole_construct;
   o.load          = MO.FE3rTextureConsole_load;
   o.loadBitmap    = MO.FE3rTextureConsole_loadBitmap;
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
   o._loadTextures = new MO.TLooper();
   o._bitmaps = new MO.TDictionary();
   o._textures = new MO.TDictionary();
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
}
MO.FE3rTextureConsole_load = function FE3rTextureConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var texture = o._textures.get(flag);
   if(texture){
      return texture;
   }
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = MO.Window.Class.create(MO.FE3rTextureCube);
   }else{
      bitmap = MO.Window.Class.create(MO.FE3rTexture);
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
   var rc = MO.Console.find(MO.FE3sTextureConsole);
   var r = rc.load(pt);
   t = MO.Class.create(MO.FE3rTexture);
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
MO.FE3rTrack = function FE3rTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix      = MO.Class.register(o, new AGetter('_matrix'));
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   o.construct    = MO.FE3rTrack_construct;
   o.loadResource = MO.FE3rTrack_loadResource;
   o.dispose      = MO.FE3rTrack_dispose;
   return o;
}
MO.FE3rTrack_construct = function FE3rTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
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
MO.FE3rVertexBuffer = function FE3rVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FWglVertexBuffer, MO.MLinkerResource);
   o.dispose = MO.FE3rVertexBuffer_dispose;
   return o;
}
MO.FE3rVertexBuffer_dispose = function FE3rVertexBuffer_dispose(){
   var o = this;
   o.__base.MLinkerResource.dispose.call(o);
   o.__base.FWglVertexBuffer.dispose.call(o);
}
MO.FE3dAutomaticEffect = function FE3dAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o.drawGroup = MO.FE3dAutomaticEffect_drawGroup;
   return o;
}
MO.FE3dAutomaticEffect_drawGroup = function FE3dAutomaticEffect_drawGroup(region, renderables, offset, count){
   var o = this;
   if(count > 1){
      var modelConsole = MO.Console.find(MO.FE3rModelConsole);
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
            effect = info.effect = MO.Console.find(MO.FG3dEffectConsole).find(context, region, mesh);
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
MO.FE3dControlAutomaticEffect = function FE3dControlAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'control.automatic';
   o.drawRenderable = MO.FE3dControlAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dControlAutomaticEffect_drawRenderable = function FE3dControlAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var matrix = renderable.currentMatrix();
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
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
MO.FE3dControlFrameEffect = function FE3dControlFrameEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'control.frame';
   o.drawRenderable = MO.FE3dControlFrameEffect_drawRenderable;
   return o;
}
MO.FE3dControlFrameEffect_drawRenderable = function FE3dControlFrameEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(MO.EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
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
MO.FE3dControlPass = function FE3dControlPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code = 'control';
   return o;
}
MO.FE3dControlTechnique = function FE3dControlTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechnique);
   o._code        = 'control';
   o._passControl = MO.Class.register(o, new MO.AGetter('_passControl'));
   o.setup        = MO.FE3dControlTechnique_setup;
   o.drawRegion   = MO.FE3dControlTechnique_drawRegion;
   return o;
}
MO.FE3dControlTechnique_setup = function FE3dControlTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var pd = o._passControl = MO.Class.create(MO.FE3dControlPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
}
MO.FE3dControlTechnique_drawRegion = function FE3dControlTechnique_drawRegion(p){
   var o = this;
   if(p.renderables().isEmpty()){
      return;
   }
   o._graphicContext.clearDepth(1);
   o.__base.FG3dTechnique.drawRegion.call(o, p);
}
MO.FE3dGeneralColorAutomaticEffect = function FE3dGeneralColorAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.buildMaterial  = MO.FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = MO.FE3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dGeneralColorAutomaticEffect_buildMaterial = function FE3dGeneralColorAutomaticEffect_buildMaterial(effectInfo, renderable){
   var o = this;
   var material = renderable.material();
   var data = effectInfo.material;
   if(!data){
      data = effectInfo.material = MO.Class.create(MO.FFloatStream);
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
   var cameraPosition = region.calculate(MO.EG3dRegionParameter.CameraPosition);
   var lightDirection = region.calculate(MO.EG3dRegionParameter.LightDirection);
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix)
   var material = renderable.material();
   o.bindMaterial(material);
   if(renderable._optionMerge){
      var mergeRenderables = renderable.mergeRenderables();
      var mergeCount = mergeRenderables.count();
      var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * mergeCount);
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
MO.FE3dGeneralColorFlatEffect = function FE3dGeneralColorFlatEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code          = 'general.color.flat';
   o.drawRenderable = MO.FE3dGeneralColorFlatEffect_drawRenderable;
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
      var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 4 * meshCount);
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
MO.FE3dGeneralColorPass = function FE3dGeneralColorPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code = 'color';
   return o;
}
MO.FE3dGeneralColorSkeletonEffect = function FE3dGeneralColorSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code            = 'general.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = MO.FE3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}
MO.FE3dGeneralColorSkeletonEffect_drawRenderable = function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
   var o = this;
   var c = o._graphicContext;
   var program = o._program;
   var vcp = region.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vld = region.calculate(MO.EG3dRegionParameter.LightDirection);
   var m = renderable.material();
   var mi = m.info();
   o.bindMaterial(m);
   program.setParameter('vc_model_matrix', renderable.currentMatrix());
   program.setParameter('vc_vp_matrix', region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
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
      var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 12 * boneCount);
      for(var i = 0; i < boneCount; i++){
         var bone = bones.at(i);
         var boneMatrix = bone.matrix();
         boneMatrix.writeData4x3(data, 12 * i);
      }
      program.setParameter('vc_bone_matrix', data);
   }
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
MO.FE3dGeneralTechnique = function FE3dGeneralTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   o._code      = 'general';
   o._passColor = MO.Class.register(o, new MO.AGetter('_passColor'));
   o.setup      = MO.FE3dGeneralTechnique_setup;
   return o;
}
MO.FE3dGeneralTechnique_setup = function FE3dGeneralTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Ambient);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseColor);
   o.registerMode(MO.EG3dTechniqueMode.SpecularLevel);
   o.registerMode(MO.EG3dTechniqueMode.SpecularColor);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var p = o._passColor = MO.Class.create(MO.FE3dGeneralColorPass);
   p.linkGraphicContext(o);
   p.setup();
   o._passes.push(p);
}
MO.FE3dShadowColorAutomaticEffect = function FE3dShadowColorAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'shadow.color.automatic';
   o.drawRenderable = MO.FE3dShadowColorAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dShadowColorAutomaticEffect_drawRenderable = function FE3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vcvpm = pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var vld = pg.calculate(MO.EG3dRegionParameter.LightDirection);
   var vlvm = pg.calculate(MO.EG3dRegionParameter.LightViewMatrix);
   var vlvpm = pg.calculate(MO.EG3dRegionParameter.LightViewProjectionMatrix);
   var vlci = pg.calculate(MO.EG3dRegionParameter.LightInfo);
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
MO.FE3dShadowColorPass = function FE3dShadowColorPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code           = 'color';
   o._textureDepth   = MO.Class.register(o, new MO.AGetSet('_textureDepth'));
   o.drawRegion      = MO.FE3dShadowColorPass_drawRegion;
   return o;
}
MO.FE3dShadowColorPass_drawRegion = function FE3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   c.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
MO.FE3dShadowColorSkeletonEffect = function FE3dShadowColorSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = MO.FE3dShadowColorSkeletonEffect_drawRenderable;
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
               throw new MO.TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
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
               throw new MO.TError("Can't find sampler. (linker={1})", ln);
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
      var d = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * bc);
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
MO.FE3dShadowDepthAutomaticEffect = function FE3dShadowDepthAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'shadow.depth.automatic';
   o.drawRenderable = MO.FE3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dShadowDepthAutomaticEffect_drawRenderable = function FE3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var lvm = pg.calculate(MO.EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(MO.EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(MO.EG3dRegionParameter.LightInfo);
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
MO.FE3dShadowDepthPass = function FE3dShadowDepthPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code         = 'depth';
   o._renderTarget = null;
   o._textureDepth = MO.Class.register(o, new MO.AGetter('_textureDepth'));
   o._renderTarget = null;
   o.setup         = MO.FE3dShadowDepthPass_setup;
   o.drawRegion    = MO.FE3dShadowDepthPass_drawRegion;
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
MO.FE3dShadowDepthSkeletonEffect = function FE3dShadowDepthSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code            = 'shadow.depth.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = MO.FE3dShadowDepthSkeletonEffect_drawRenderable;
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
      var d = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * bc);
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
MO.FE3dShadowTechnique = function FE3dShadowTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   o._code        = 'shadow';
   o._passDepth   = MO.Class.register(o, new MO.AGetter('_passDepth'));
   o._passColor   = MO.Class.register(o, new MO.AGetter('_passColor'));
   o.setup        = MO.FE3dShadowTechnique_setup;
   o.updateRegion = MO.FE3dShadowTechnique_updateRegion;
   return o;
}
MO.FE3dShadowTechnique_setup = function FE3dShadowTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Ambient);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseColor);
   o.registerMode(MO.EG3dTechniqueMode.SpecularLevel);
   o.registerMode(MO.EG3dTechniqueMode.SpecularColor);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var ps = o._passes;
   var pd = o._passDepth = MO.Class.create(MO.FE3dShadowDepthPass);
   pd.linkGraphicContext(o);
   pd.setup();
   var pc = o._passColor = MO.Class.create(MO.FE3dShadowColorPass);
   pc.linkGraphicContext(o);
   pc.setup();
   ps.push(pc);
   pc.setTextureDepth(pd.textureDepth());
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
MO.FE3dAnimation = function FE3dAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.ME3dObject, MO.MLinkerResource);
   return o;
}
MO.FE3dCamera = function FE3dCamera(o){
   o = MO.Class.inherits(this, o, MO.FG3dCamera, MO.MLinkerResource);
   o._projection     = MO.Class.register(o, new MO.AGetter('_projection'));
   o._rotation       = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._rotationMatrix = null;
   o._quaternion     = null;
   o._quaternionX    = null;
   o._quaternionY    = null;
   o._quaternionZ    = null;
   o.construct       = MO.FE3dCamera_construct;
   o.doMoveX         = MO.FE3dCamera_doMoveX;
   o.doMoveY         = MO.FE3dCamera_doMoveY;
   o.doMoveZ         = MO.FE3dCamera_doMoveZ;
   o.doForward       = MO.FE3dCamera_doForward;
   o.doPitch         = MO.FE3dCamera_doPitch;
   o.doYaw           = MO.FE3dCamera_doYaw;
   o.doRoll          = MO.FE3dCamera_doRoll;
   o.loadResource    = MO.FE3dCamera_loadResource;
   o.commitResource  = MO.FE3dCamera_commitResource;
   o.update          = MO.FE3dCamera_update;
   return o;
}
MO.FE3dCamera_construct = function FE3dCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._rotation = new MO.SVector3();
   o._rotationMatrix = new MO.SMatrix3x3();
   o._quaternion = new MO.SQuaternion();
   o._quaternionX = new MO.SQuaternion();
   o._quaternionY = new MO.SQuaternion();
   o._quaternionZ = new MO.SQuaternion();
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
   o._quaternionX.fromAxisAngle(MO.Lang.Math.vectorAxisX, r.x);
   o._quaternionY.fromAxisAngle(MO.Lang.Math.vectorAxisY, r.y);
   o._quaternionZ.fromAxisAngle(MO.Lang.Math.vectorAxisZ, r.z);
   var q = o._quaternion.identity();
   q.mul(o._quaternionX);
   q.mul(o._quaternionY);
   q.mul(o._quaternionZ);
   var m = o._rotationMatrix;
   m.build(q);
   var d = o._direction;
   m.transformPoint3(o._directionTarget, d);
   d.normalize();
   o.__base.FG3dCamera.update.call(o);
}
MO.FG3dCamera_dispose = function FG3dCamera_dispose(){
   var o = this;
   o._projection = MO.Lang.Obejct.dispose(o._projection);
   o.__base.FObject.dispose.call(o);
}
MO.FE3dDirectionalLight = function FE3dDirectionalLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dDirectionalLight, MO.MLinkerResource);
   o._material    = MO.Class.register(o, new MO.AGetter('_material'));
   o.construct    = MO.FE3dDirectionalLight_construct;
   o.loadResource = MO.FE3dDirectionalLight_loadResource;
   o.dispose      = MO.FE3dDirectionalLight_dispose;
   return o;
}
MO.FE3dDirectionalLight_construct = function FE3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dDirectionalLight.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dDirectionalLight_loadResource = function FE3dDirectionalLight_loadResource(resource){
   var o = this;
   o.__base.MLinkerResource.loadResource.call(o, resource);
   o._material.loadResource(resource.material());
}
MO.FE3dDirectionalLight_dispose = function FE3dDirectionalLight_dispose(){
   var o = this;
   o._material = MO.Lang.Object.dispose(o._material);
   o.__base.FG3dDirectionalLight.dispose.call(o);
}
MO.FE3dFlatStage = function FE3dFlatStage(o){
   o = MO.Class.inherits(this, o, MO.FE3dStage);
   o._layer    = MO.Class.register(o, new MO.AGetter('_layer'));
   o.construct = MO.FE3dFlatStage_construct;
   return o;
}
MO.FE3dFlatStage_construct = function FE3dFlatStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._layer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('Layer', layer);
}
MO.FE3dInstanceConsole = function FE3dInstanceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._factory   = MO.Class.register(o, new MO.AGetter('_factory'));
   o.construct  = MO.FE3dInstanceConsole_construct;
   o.register   = MO.FE3dInstanceConsole_register;
   o.unregister = MO.FE3dInstanceConsole_unregister;
   o.create     = MO.FE3dInstanceConsole_create;
   return o;
}
MO.FE3dInstanceConsole_construct = function FE3dInstanceConsole_construct(){
   var o = this;
   var factory = o._factory = MO.Class.create(MO.FClassFactory);
   factory.register(MO.EE3dInstance.ModelRenderable, MO.FE3dModelRenderable);
   factory.register(MO.EE3dInstance.TemplateRenderable, MO.FE3dTemplateRenderable);
   factory.register(MO.EE3dInstance.Scene, MO.FE3dScene);
   factory.register(MO.EE3dInstance.SceneLayer, MO.FE3dSceneLayer);
   factory.register(MO.EE3dInstance.SceneDisplay, MO.FE3dSceneDisplay);
   factory.register(MO.EE3dInstance.SceneMaterial, MO.FE3dSceneMaterial);
   factory.register(MO.EE3dInstance.SceneMovie, MO.FE3dMovie);
   factory.register(MO.EE3dInstance.SceneRenderable, MO.FE3dSceneDisplayRenderable);
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
MO.FE3dMaterial = function FE3dMaterial(o){
   o = MO.Class.inherits(this, o, MO.FE3rMaterial);
   o._parent    = null;
   o.loadParent = MO.FE3dRenderable_loadParent;
   return o;
}
MO.FE3dRenderable_loadParent = function FE3dRenderable_loadParent(material){
   var o = this;
   o._parent = material;
}
MO.FE3dMesh = function FE3dMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MLinkerResource, MO.MListenerLoad);
   o._ready         = false;
   o._display       = null;
   o._renderable    = null;
   o._layer         = null;
   o.construct      = MO.FE3dMesh_construct;
   o.testReady      = MO.FE3dMesh_testReady;
   o.loadRenderable = MO.FE3dMesh_loadRenderable;
   o.processLoad    = MO.FE3dMesh_processLoad;
   o.process        = MO.FE3dMesh_process;
   return o;
}
MO.FE3dMesh_construct = function FE3dMesh_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var l = o._layer = MO.Class.create(MO.FDisplayLayer);
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
   var m = MO.Class.create(MO.FE3dMeshRenderable);
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
   var display = o._display = MO.Class.create(MO.FE3dMeshDisplay);
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
MO.FE3dMeshConsole = function FE3dMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._loadMeshs  = null;
   o._meshs      = MO.Class.register(o, new MO.AGetter('_meshs'));
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = MO.FE3dMeshConsole_onProcess;
   o.construct   = MO.FE3dMeshConsole_construct;
   o.meshs       = MO.FE3dMeshConsole_meshs;
   o.allocByGuid = MO.FE3dMeshConsole_allocByGuid;
   o.allocByCode = MO.FE3dMeshConsole_allocByCode;
   o.free        = MO.FE3dMeshConsole_free;
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
   o._loadMeshs = new MO.TLooper();
   o._meshs = new MO.TDictionary();
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
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
   var rmc = MO.Console.find(MO.FE3rMeshConsole);
   var rm = rmc.loadByGuid(pc, pn);
   var m = MO.Class.create(MO.FE3dMesh);
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
   var rmc = MO.Console.find(MO.FE3rMeshConsole);
   var rm = rmc.loadByCode(pc, pn);
   var m = MO.Class.create(MO.FE3dMesh);
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
MO.FE3dMeshDisplay = function FE3dMeshDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MLinkerResource);
   o._material      = MO.Class.register(o, new MO.AGetter('_material'));
   o._renderable    = MO.Class.register(o, new MO.AGetter('_renderable'));
   o.load           = MO.FE3dMeshDisplay_load;
   o.reloadResource = MO.FE3dMeshDisplay_reloadResource;
   return o;
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
MO.FE3dMeshRenderable = function FE3dMeshRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._renderable      = MO.Class.register(o, MO.AGetSet('_renderable'));
   o._activeTrack     = null;
   o.vertexCount      = MO.FE3dMeshRenderable_vertexCount;
   o.findVertexBuffer = MO.FE3dMeshRenderable_findVertexBuffer;
   o.vertexBuffers    = MO.FE3dMeshRenderable_vertexBuffers;
   o.indexBuffers     = MO.FE3dMeshRenderable_indexBuffers;
   o.findTexture      = MO.FE3dMeshRenderable_findTexture;
   o.textures         = MO.FE3dMeshRenderable_textures;
   o.reloadResource   = MO.FE3dMeshRenderable_reloadResource;
   o.process          = MO.FE3dMeshRenderable_process;
   o.processDelay     = MO.FE3dMeshRenderable_processDelay;
   o.update           = MO.FE3dMeshRenderable_update;
   o.dispose          = MO.FE3dMeshRenderable_dispose;
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
   o._modelMatrix = MO.Lang.Object.dispose(o._modelMatrix);
   o._vertexBuffers = MO.Lang.Object.dispose(o._vertexBuffers);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dModel = function FE3dModel(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MPoolAble, MO.MLinkerResource, MO.MListenerLoad);
   o._dataReady     = false;
   o._display       = MO.Class.register(o, new MO.AGetter('_display'));
   o._renderable    = MO.Class.register(o, new MO.AGetSet('_renderable'));
   o.construct      = MO.FE3dModel_construct;
   o.testReady      = MO.FE3dModel_testReady;
   o.loadRenderable = MO.FE3dModel_loadRenderable;
   o.processLoad    = MO.FE3dModel_processLoad;
   return o;
}
MO.FE3dModel_construct = function FE3dModel_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var layer = o._layer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('sprite', layer);
   var display = o._display = MO.Class.create(MO.FE3dModelDisplay);
   layer.pushDisplay(display);
}
MO.FE3dModel_testReady = function FE3dModel_testReady(){
   return this._dataReady;
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
MO.FE3dModelConsole = function FE3dModelConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._looper     = null;
   o._pools      = MO.Class.register(o, new MO.AGetter('_pools'));
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = MO.FE3dModelConsole_onProcess;
   o.construct   = MO.FE3dModelConsole_construct;
   o.pools       = MO.FE3dModelConsole_pools;
   o.allocByGuid = MO.FE3dModelConsole_allocByGuid;
   o.allocByCode = MO.FE3dModelConsole_allocByCode;
   o.free        = MO.FE3dModelConsole_free;
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
   o._looper = new MO.TLooper();
   o._pools = MO.Class.create(MO.FObjectPools);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FE3dModelConsole_allocByGuid = function FE3dModelConsole_allocByGuid(context, guid){
   var o = this;
   var model = o._pools.alloc(guid);
   if(model){
      return model;
   }
   var renderable = MO.Console.find(MO.FE3rModelConsole).load(context, guid);
   var model = MO.Class.create(MO.FE3dModel);
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
MO.FE3dModelDisplay = function FE3dModelDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MLinkerResource);
   o._material      = MO.Class.register(o, new MO.AGetter('_material'));
   o._shapes        = MO.Class.register(o, new MO.AGetter('_shapes'));
   o.construct      = MO.FE3dModelDisplay_construct;
   o.load           = MO.FE3dModelDisplay_load;
   o.reloadResource = MO.FE3dModelDisplay_reloadResource;
   o.dispose        = MO.FE3dModelDisplay_dispose;
   return o;
}
MO.FE3dModelDisplay_construct = function FE3dModelDisplay_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
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
      var shapes = o._shapes = new MO.TObjects();
      for(var i = 0; i < geometryCount; i++){
         var geometryRenderable = geometryRenderables.get(i);
         var shape = instanceConsole.create(MO.EE3dInstance.ModelRenderable);
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
   o._material = MO.Lang.Object.dispose(o._material);
   o.__base.FE3dDisplay.dispose.call(o);
}
MO.FE3dModelRenderable = function FE3dModelRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dMeshRenderable);
   o._ready            = false;
   o._materialResource = null;
   o.testVisible       = MO.FE3dModelRenderable_testVisible;
   o.load              = MO.FE3dModelRenderable_load;
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
MO.FE3dMovie = function FE3dMovie(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MLinkerResource);
   o._interval      = null;
   o._firstTick     = 0;
   o._lastTick      = 0;
   o._matrix        = null;
   o.construct      = MO.FE3dMovie_construct;
   o.loadResource   = MO.FE3dMovie_loadResource;
   o.reloadResource = MO.FE3dMovie_reloadResource;
   o.process        = MO.FE3dMovie_process;
   return o;
}
MO.FE3dMovie_construct = function FE3dMovie_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
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
      o._firstTick = MO.Timer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = MO.Timer.current();
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
MO.FE3dOrthoCamera = function FE3dOrthoCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3dCamera);
   o.construct        = MO.FE3dOrthoCamera_construct;
   o.updateFrustum    = MO.FE3dOrthoCamera_updateFrustum;
   o.updateFromCamera = MO.FE3dOrthoCamera_updateFromCamera;
   o.updateFlatCamera = MO.FE3dOrthoCamera_updateFlatCamera;
   return o;
}
MO.FE3dOrthoCamera_construct = function FE3dOrthoCamera_construct(){
   var o = this;
   o.__base.FE3dCamera.construct.call(o);
   o._projection = MO.Class.create(MO.FG3dOrthoProjection);
}
MO.FE3dOrthoCamera_updateFrustum = function FE3dOrthoCamera_updateFrustum(){
   var o = this;
   o.__base.FE3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
MO.FE3dOrthoCamera_updateFromCamera = function FE3dOrthoCamera_updateFromCamera(p){
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
MO.FE3dOrthoCamera_updateFlatCamera = function FE3dOrthoCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
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
MO.FE3dPerspectiveCamera = function FE3dPerspectiveCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3dCamera, MO.MLinkerResource);
   o._centerFront      = 0.4;
   o.construct         = MO.FE3dPerspectiveCamera_construct;
   o.updateFrustum     = MO.FE3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = MO.FE3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = MO.FE3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = MO.FE3dPerspectiveCamera_updateFlatCamera;
   return o;
}
MO.FE3dPerspectiveCamera_construct = function FE3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FE3dCamera.construct.call(o);
   o._projection = MO.Class.create(MO.FG3dPerspectiveProjection);
   o._rotation = new MO.SVector3();
   o._rotationMatrix = new MO.SMatrix3x3();
   o._quaternion = new MO.SQuaternion();
   o._quaternionX = new MO.SQuaternion();
   o._quaternionY = new MO.SQuaternion();
   o._quaternionZ = new MO.SQuaternion();
}
MO.FE3dPerspectiveCamera_updateFrustum = function FE3dPerspectiveCamera_updateFrustum(){
   var o = this;
   o.__base.FE3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
MO.FE3dPerspectiveCamera_updateFlatFrustum = function FE3dPerspectiveCamera_updateFlatFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
MO.FE3dPerspectiveCamera_updateFromCamera = function FE3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFrustum();
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
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
MO.FE3dPerspectiveCamera_updateFlatCamera = function FE3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFlatFrustum();
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
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
MO.FE3dRegion = function FE3dRegion(o){
   o = MO.Class.inherits(this, o, MO.FRegion, MO.MGraphicObject, MO.MG3dRegion, MO.MLinkerResource);
   o._backgroundColor = MO.Class.register(o, new MO.AGetter('_backgroundColor'));
   o.construct        = MO.FE3dRegion_construct;
   o.selectCamera     = MO.FE3dRegion_selectCamera;
   o.loadResource     = MO.FE3dRegion_loadResource;
   o.reloadResource   = MO.FE3dRegion_reloadResource;
   o.prepare          = MO.FE3dRegion_prepare;
   o.dispose          = MO.FE3dRegion_dispose;
   return o;
}
MO.FE3dRegion_construct = function FE3dRegion_construct(){
   var o = this;
   o.__base.FRegion.construct.call(o);
   o.__base.MG3dRegion.construct.call(o);
   var camera = o._camera = MO.Class.create(MO.FE3dPerspectiveCamera);
   camera.position().set(0, 0, -100);
   camera.lookAt(0, 0, 0);
   camera.update();
   camera.projection().update();
   var light = o._directionalLight = MO.Class.create(MO.FE3dDirectionalLight);
   light.direction().set(0, -1, 0);
   var lightCamera = light.camera();
   lightCamera.position().set(10, 10, -10);
   lightCamera.lookAt(0, 0, 0);
   var backgroundColor = o._backgroundColor = new MO.SColor4();
   backgroundColor.set(0, 0, 0, 1);
   o._calculateCameraMatrix = new MO.SMatrix3d();
}
MO.FE3dRegion_selectCamera = function FE3dRegion_selectCamera(camera){
   this._camera = camera;
}
MO.FE3dRegion_loadResource = function FE3dRegion_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._camera.loadResource(resource.camera());
   o._directionalLight.loadResource(resource.light());
   o.reloadResource();
}
MO.FE3dRegion_reloadResource = function FE3dRegion_reloadResource(){
   var o = this;
   var resource = o._resource;
   var optionBackground = resource.optionBackground();
   if(optionBackground){
      o._backgroundColor.assignPower(resource.backgroundColor());
      o._backgroundColor.alpha = 1;
   }else{
      o._backgroundColor.set(0, 0, 0, 0);
   }
}
MO.FE3dRegion_prepare = function FE3dRegion_prepare(){
   var o = this;
   o.__base.MG3dRegion.prepare.call(o);
   var changed = o._calculateCameraMatrix.attach(o._camera.matrix());
   if(changed){
      o._changed = true;
   }
}
MO.FE3dRegion_dispose = function FE3dRegion_dispose(){
   var o = this;
   o.__base.FRegion.dispose.call(o);
   o.__base.MG3dRegion.dispose.call(o);
}
MO.FE3dScene = function FE3dScene(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MLinkerResource, MO.MListenerLoad);
   o._ready                = false;
   o._dataReady            = false;
   o._resource             = MO.Class.register(o, new MO.AGetter('_resource'));
   o._dirty                = false;
   o.onProcess             = MO.FE3dScene_onProcess;
   o.construct             = MO.FE3dScene_construct;
   o.createRegion          = MO.FE3dScene_createRegion;
   o.loadTechniqueResource = MO.FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = MO.FE3dScene_loadRegionResource;
   o.loadDisplayResource   = MO.FE3dScene_loadDisplayResource;
   o.loadLayerResource     = MO.FE3dScene_loadLayerResource;
   o.loadResource          = MO.FE3dScene_loadResource;
   o.testReady             = MO.FE3dScene_testReady;
   o.dirty                 = MO.FE3dScene_dirty;
   o.processLoad           = MO.FE3dScene_processLoad;
   o.active                = MO.FE3dScene_active;
   o.deactive              = MO.FE3dScene_deactive;
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
   return MO.Class.create(MO.FE3dSceneRegion);
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
   var display = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneDisplay);
   display.linkGraphicContext(o);
   display.loadResource(resource);
   MO.Console.find(MO.FE3dSceneConsole).loadDisplay(display);
   layer.pushDisplay(display);
}
MO.FE3dScene_loadLayerResource = function FE3dScene_loadLayerResource(resource){
   var o = this;
   var layer = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneLayer);
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
   o.selectTechnique(o, MO.FE3dGeneralTechnique);
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
MO.FE3dSceneAnimation = function FE3dSceneAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3dAnimation);
   o._animation        = null;
   o._activeClip       = null;
   o._clips            = null;
   o.clips             = MO.FE3dSceneAnimation_clips;
   o.pushClip          = MO.FE3dSceneAnimation_pushClip;
   o.record            = MO.Method.empty;
   o.process           = MO.Method.empty;
   o.selectClip        = MO.FE3dSceneAnimation_selectClip;
   o.loadAnimation     = MO.FE3dSceneAnimation_loadAnimation;
   o.loadSceneResource = MO.FE3dSceneAnimation_loadSceneResource;
   o.reloadResource    = MO.FE3dSceneAnimation_reloadResource;
   return o;
}
MO.FE3dSceneAnimation_clips = function FE3dSceneAnimation_clips(){
   return this._clips;
}
MO.FE3dSceneAnimation_pushClip = function FE3dSceneAnimation_pushClip(clip){
   var o = this;
   var clips = o._clips;
   if(!clips){
      clips = o._clips = new MO.TDictionary();
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
MO.FE3dSceneAnimationClip = function FE3dSceneAnimationClip(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAttributeCode);
   o._animation  = null;
   o._beginIndex = MO.Class.register(o, new MO.AGetSet('_beginIndex'), 0);
   o._endIndex   = MO.Class.register(o, new MO.AGetSet('_endIndex'), 0);
   o._playRate   = MO.Class.register(o, new MO.AGetSet('_playRate'), 1);
   o.setRange    = MO.FE3dSceneAnimationClip_setRange;
   return o;
}
MO.FE3dSceneAnimationClip_setRange = function FE3dSceneAnimationClip_setRange(beginIndex, endIndex){
   var o = this;
   o._beginIndex = beginIndex;
   o._endIndex = endIndex;
}
MO.FE3dSceneCanvas = function FE3dSceneCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
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
   o.onEnterFrame           = MO.FE3dSceneCanvas_onEnterFrame;
   o.onMouseCaptureStart    = MO.FE3dSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture         = MO.FE3dSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop     = MO.FE3dSceneCanvas_onMouseCaptureStop;
   o.onTouchStart           = MO.FE3dSceneCanvas_onTouchStart;
   o.onTouchMove            = MO.FE3dSceneCanvas_onTouchMove;
   o.onTouchStop            = MO.FE3dSceneCanvas_onTouchStop;
   o.onTouchZoom            = MO.FE3dSceneCanvas_onTouchZoom;
   o.onDataLoaded           = MO.FE3dSceneCanvas_onDataLoaded;
   o.onResize               = MO.FE3dSceneCanvas_onResize;
   o.construct              = MO.FE3dSceneCanvas_construct;
   o.testPlay               = MO.FE3dSceneCanvas_testPlay;
   o.switchPlay             = MO.FE3dSceneCanvas_switchPlay;
   o.testMovie              = MO.FE3dSceneCanvas_testMovie;
   o.switchMovie            = MO.FE3dSceneCanvas_switchMovie;
   o.doAction               = MO.FE3dSceneCanvas_doAction;
   o.loadByGuid             = MO.FE3dSceneCanvas_loadByGuid;
   o.loadByCode             = MO.FE3dSceneCanvas_loadByCode;
   o.dispose                = MO.FE3dSceneCanvas_dispose;
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
   var keyForward = RKeyboard.isPress(MO.EStageKey.Forward);
   var keyBack = RKeyboard.isPress(MO.EStageKey.Back);
   if((keyForward && !keyBack) || o._actionForward){
      camera.doWalk(distance);
   }
   if((!keyForward && keyBack) || o._actionBack){
      camera.doWalk(-distance);
   }
   var keyUp = RKeyboard.isPress(MO.EStageKey.Up);
   var keyDown = RKeyboard.isPress(MO.EStageKey.Down);
   if((keyUp && !keyDown) || o._actionUp){
      camera.doFly(distance);
   }
   if((!keyUp && keyDown) || o._actionDown){
      camera.doFly(-distance);
   }
   var keyLeft = RKeyboard.isPress(MO.EStageKey.RotationLeft);
   var keyRight = RKeyboard.isPress(MO.EStageKey.RotationRight);
   if(keyLeft && !keyRight){
      camera.doYaw(rotation);
   }
   if(!keyLeft && keyRight){
      camera.doYaw(-rotation);
   }
   var keyRotationUp = RKeyboard.isPress(MO.EStageKey.RotationUp);
   var keyRotationDown = RKeyboard.isPress(MO.EStageKey.RotationDown);
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
   var event = new MO.SEvent(o);
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
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureCameraPosition = new MO.SPoint3();
   o._captureCameraRotation = new MO.SVector3();
   o._touchTracker = MO.Class.create(MO.FTouchTracker);
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
         MO.RHtml.fullscreen(o._hPanel, v);
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
   var sceneConsole = MO.Console.find(MO.FE3dSceneConsole);
   if(o._activeSpace){
      sceneConsole.free(o._activeSpace);
   }
   var scene = o._activeSpace = sceneConsole.allocByGuid(o._graphicContext, guid);
   scene.addLoadListener(o, o.onDataLoaded);
   RStage.register('canvas.space', scene);
}
MO.FE3dSceneCanvas_loadByCode = function FE3dSceneCanvas_loadByCode(code){
   var o = this;
   var sceneConsole = MO.Console.find(MO.FE3dSceneConsole);
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
MO.FE3dSceneConsole = function FE3dSceneConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._loadDisplays = null;
   o._loadScenes   = null;
   o._pools        = null;
   o._thread       = null;
   o._interval     = 100;
   o.onProcess     = MO.FE3dSceneConsole_onProcess;
   o.construct     = MO.FE3dSceneConsole_construct;
   o.scenes        = MO.FE3dSceneConsole_scenes;
   o.loadDisplay   = MO.FE3dSceneConsole_loadDisplay;
   o.allocByGuid   = MO.FE3dSceneConsole_allocByGuid;
   o.allocByCode   = MO.FE3dSceneConsole_allocByCode;
   o.free          = MO.FE3dSceneConsole_free;
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
   o._loadDisplays = new MO.TLooper();
   o._loadScenes = new MO.TLooper();
   o._pools = MO.Class.create(MO.FObjectPools);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
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
   var resource = MO.Console.find(MO.FE3sSceneConsole).loadByGuid(guid);
   scene = MO.Class.create(MO.FE3dScene);
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
   var resource = MO.Console.find(MO.FE3sSceneConsole).loadByCode(code);
   scene = MO.Class.create(MO.FE3dScene);
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
MO.FE3dSceneDisplay = function FE3dSceneDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3dSprite, MO.MListenerLoad);
   o._dataReady        = false;
   o._optionPlay       = false;
   o._optionMovie      = false;
   o._movieMatrix      = null;
   o._resource         = null;
   o._materials        = null;
   o._parentMaterials  = null;
   o._template         = null;
   o._sprite           = null;
   o.construct         = MO.FE3dSceneDisplay_construct;
   o.calculateOutline  = MO.FE3dSceneDisplay_calculateOutline;
   o.meshRenderables   = MO.FE3dSceneDisplay_meshRenderables;
   o.loadResource      = MO.FE3dSceneDisplay_loadResource;
   o.loadTemplate      = MO.FE3dSceneDisplay_loadTemplate;
   o.processLoad       = MO.FE3dSceneDisplay_processLoad;
   o.clone             = MO.FE3dSceneDisplay_clone;
   return o;
}
MO.FE3dSceneDisplay_construct = function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._movieMatrix = new MO.SMatrix3d();
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
   var instanceConsole = MO.Console.find(MO.FE3dInstanceConsole);
   o._resource = resource;
   o._code = resource.code();
   o._matrix.assign(resource.matrix());
   var movieResources = resource.movies();
   if(movieResources){
      var movieCount = movieResources.count();
      for(var i = 0; i < movieCount; i++){
         var movieResource = movieResources.at(i);
         var movie = instanceConsole.create(MO.EE3dInstance.SceneMovie);
         movie.loadResource(movieResource);
         o.pushMovie(movie);
      }
   }
   var materialResources = resource.materials();
   if(materialResources){
      var materialCount = materialResources.count();
      var materials = o._materials = new MO.TDictionary();
      var parentMaterials = o._parentMaterials = new MO.TDictionary();
      for(var i = 0; i < materialCount; i++){
         var materialResource = materialResources.at(i);
         var material = instanceConsole.create(MO.EE3dInstance.SceneMaterial);
         material._display = o;
         material.loadSceneResource(materialResource);
         materials.set(materialResource.guid(), material);
         parentMaterials.set(materialResource.parentGuid(), material);
      }
   }
   var templateGuid = resource.templateGuid();
   o._template = MO.Console.find(MO.FE3dTemplateConsole).allocByGuid(o, templateGuid);
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
         var sceneAnimation = MO.Class.create(MO.FE3dSceneAnimation);
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
MO.FE3dSceneDisplayRenderable = function FE3dSceneDisplayRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dTemplateRenderable);
   o.loadMaterial   = MO.FE3dSceneDisplayRenderable_loadMaterial;
   o.reloadResource = MO.FE3dSceneDisplayRenderable_reloadResource;
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
MO.FE3dSceneLayer = function FE3dSceneLayer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayLayer, MO.MLinkerResource);
   o.makeLabel    = MO.FE3dSceneLayer_makeLabel;
   o.loadResource = MO.FE3dSceneLayer_loadResource;
   o.process      = MO.FE3dSceneLayer_process;
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
      if(c == MO.EDisplayTransform.CameraPosition){
         var cp = p.camera().position();
         o._matrix.setTranslate(cp.x, cp.y, cp.z);
         o._matrix.update();
      }
   }
}
MO.FE3dSceneMaterial = function FE3dSceneMaterial(o){
   o = MO.Class.inherits(this, o, MO.FE3dMaterial);
   o._display          = null;
   o._parentMaterial   = null;
   o.loadSceneResource = MO.FE3dSceneMaterial_loadSceneResource;
   o.reloadResource    = MO.FE3dSceneMaterial_reloadResource;
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
MO.FE3dSceneRegion = function FE3dSceneRegion(o){
   o = MO.Class.inherits(this, o, MO.FE3dRegion);
   o._resource      = MO.Class.register(o, new MO.AGetter('_resource'));
   o.construct      = MO.FE3dSceneRegion_construct;
   o.loadResource   = MO.FE3dSceneRegion_loadResource;
   o.reloadResource = MO.FE3dSceneRegion_reloadResource;
   o.dispose        = MO.FE3dSceneRegion_dispose;
   return o;
}
MO.FE3dSceneRegion_construct = function FE3dSceneRegion_construct(){
   var o = this;
   o.__base.FE3dRegion.construct.call(o);
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
MO.FE3dSimpleCanvas = function FE3dSimpleCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
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
   o._stage                 = MO.Class.register(o, new MO.AGetter('_stage'));
   o.onEnterFrame           = MO.FE3dSimpleCanvas_onEnterFrame;
   o.onMouseCaptureStart    = MO.FE3dSimpleCanvas_onMouseCaptureStart;
   o.onMouseCapture         = MO.FE3dSimpleCanvas_onMouseCapture;
   o.onMouseCaptureStop     = MO.FE3dSimpleCanvas_onMouseCaptureStop;
   o.onTouchStart           = MO.FE3dSimpleCanvas_onTouchStart;
   o.onTouchMove            = MO.FE3dSimpleCanvas_onTouchMove;
   o.onTouchStop            = MO.FE3dSimpleCanvas_onTouchStop;
   o.onSceneLoad            = MO.FE3dSimpleCanvas_onSceneLoad;
   o.onResize               = MO.FE3dSimpleCanvas_onResize;
   o.construct              = MO.FE3dSimpleCanvas_construct;
   o.build                  = MO.FE3dSimpleCanvas_build;
   o.setPanel               = MO.FE3dSimpleCanvas_setPanel;
   o.switchPlay             = MO.FE3dSimpleCanvas_switchPlay;
   o.switchMovie            = MO.FE3dSimpleCanvas_switchMovie;
   o.doAction               = MO.FE3dSimpleCanvas_doAction;
   o.dispose                = MO.FE3dSimpleCanvas_dispose;
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
   var kw = MO.Window.Keyboard.isPress(MO.EKeyCode.W);
   var ks = MO.Window.Keyboard.isPress(MO.EKeyCode.S);
   if((kw && !ks) || o._actionForward){
      c.doWalk(d);
   }
   if((!kw && ks) || o._actionBack){
      c.doWalk(-d);
   }
   var ka = MO.Window.Keyboard.isPress(MO.EKeyCode.A);
   var kd = MO.Window.Keyboard.isPress(MO.EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = MO.Window.Keyboard.isPress(MO.EKeyCode.Q);
   var ke = MO.Window.Keyboard.isPress(MO.EKeyCode.E);
   if((kq && !ke) || o._actionUp){
      c.doFly(d);
   }
   if((!kq && ke) || o._actionDown){
      c.doFly(-d);
   }
   var kz = MO.Window.Keyboard.isPress(MO.EKeyCode.Z);
   var kw = MO.Window.Keyboard.isPress(MO.EKeyCode.X);
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
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureCameraPosition = new MO.SPoint3();
   o._captureCameraRotation = new MO.SVector3();
}
MO.FE3dSimpleCanvas_build = function FE3dSimpleCanvas_build(hPanel){
   var o = this;
   o.__base.FE3dCanvas.build.call(o, hPanel);
   var stage = o._stage = o._activeSpace = MO.Class.create(MO.FE3dSimpleStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.selectTechnique(o, FE3dGeneralTechnique);
   MO.RStage.register('simple.stage', stage);
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
MO.FE3dSimpleDesktop = function FE3dSimpleDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._canvas3d = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o.onResize  = MO.FE3dSimpleDesktop_onResize;
   o.construct = MO.FE3dSimpleDesktop_construct;
   o.build     = MO.FE3dSimpleDesktop_build;
   o.dispose   = MO.FE3dSimpleDesktop_dispose;
   return o;
}
MO.FE3dSimpleDesktop_onResize = function FE3dSimpleDesktop_onResize(p){
   var o = this;
}
MO.FE3dSimpleDesktop_construct = function FE3dSimpleDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
}
MO.FE3dSimpleDesktop_build = function FE3dSimpleDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   MO.RWindow.lsnsResize.register(o, o.onResize);
   var canvas = o._canvas3d = MO.RClass.create(MO.FE3dSimpleCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   var size = canvas.size();
   var hCanvas3d = canvas._hCanvas;
   var canvas = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
   canvas.size().assign(size);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   var hCanvas2d = canvas._hCanvas;
   hCanvas2d.style.position = 'absolute';
   hCanvas2d.style.left = hCanvas3d.offsetLeft + 'px';
   hCanvas2d.style.top = hCanvas3d.offsetTop + 'px';
}
MO.FE3dSimpleDesktop_dispose = function FE3dSimpleDesktop_dispose(){
   var o = this;
   o.__base.FDesktop.dispose.call(o);
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
MO.FE3dSpace = function FE3dSpace(o){
   o = MO.Class.inherits(this, o, MO.FE3dStage, MO.MListener);
   o._dataReady            = false;
   o._resource             = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._materials            = MO.Class.register(o, new MO.AGetter('_materials'));
   o._dirty                = false;
   o._loadListeners        = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o.onProcess             = MO.FE3dSpace_onProcess;
   o.construct             = MO.FE3dSpace_construct;
   o.linkGraphicContext    = MO.FE3dSpace_linkGraphicContext;
   o.createRegion          = MO.FE3dSpace_createRegion;
   o.findMaterial          = MO.FE3dSpace_findMaterial;
   o.loadTechniqueResource = MO.FE3dSpace_loadTechniqueResource;
   o.loadRegionResource    = MO.FE3dSpace_loadRegionResource;
   o.loadDisplayResource   = MO.FE3dSpace_loadDisplayResource;
   o.loadLayerResource     = MO.FE3dSpace_loadLayerResource;
   o.loadResource          = MO.FE3dSpace_loadResource;
   o.commitResource        = MO.FE3dSpace_commitResource;
   o.dirty                 = MO.FE3dSpace_dirty;
   o.processLoad           = MO.FE3dSpace_processLoad;
   o.active                = MO.FE3dSpace_active;
   o.deactive              = MO.FE3dSpace_deactive;
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
   o._materials = new MO.TDictionary();
}
MO.FE3dSpace_linkGraphicContext = function FE3dSpace_linkGraphicContext(context){
   var o = this;
   o.__base.FE3dStage.linkGraphicContext.call(o, context);
   o._region.linkGraphicContext(context);
}
MO.FE3dSpace_createRegion = function FE3dSpace_createRegion(){
   return MO.Class.create(MO.FE3dRegion);
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
   var d3 = MO.Console.find(MO.FE3dSpaceConsole).factory().create(EE3dScene.Display);
   d3.linkGraphicContext(o);
   d3.loadSceneResource(pd);
   MO.Console.find(MO.FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
   pl.pushDisplay(d3);
}
MO.FE3dSpace_loadLayerResource = function FE3dSpace_loadLayerResource(p){
   var o = this;
   var l = MO.Console.find(MO.FE3dSpaceConsole).factory().create(EE3dScene.Layer);
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
      var materialConsole = MO.Console.find(MO.FE3rMaterialConsole);
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
MO.FE3dSprite = function FE3dSprite(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplayContainer, MO.MGraphicObject, MO.MLinkerResource);
   o._dataReady       = false;
   o._ready           = false;
   o._shapes          = null;
   o._skeletons       = null;
   o._animations      = null;
   o._movies          = null;
   o._resource        = null;
   o.construct        = MO.FE3dSprite_construct;
   o.testReady        = MO.FE3dSprite_testReady;
   o.makeLabel        = MO.FE3dSprite_makeLabel;
   o.findMeshByCode   = MO.FE3dSprite_findMeshByCode;
   o.meshRenderables  = MO.FE3dSprite_shapes;
   o.skeletons        = MO.FE3dSprite_skeletons;
   o.pushSkeleton     = MO.FE3dSprite_pushSkeleton;
   o.findAnimation    = MO.FE3dSprite_findAnimation;
   o.animations       = MO.FE3dSprite_animations;
   o.pushAnimation    = MO.FE3dSprite_pushAnimation;
   o.movies           = MO.FE3dSprite_movies;
   o.pushMovie        = MO.FE3dSprite_pushMovie;
   o.loadSkeletons    = MO.FE3dSprite_loadSkeletons;
   o.linkAnimation    = MO.FE3dSprite_linkAnimation;
   o.loadAnimations   = MO.FE3dSprite_loadAnimations;
   o.loadResource     = MO.FE3dSprite_loadResource;
   o.reloadResource   = MO.FE3dSprite_reloadResource;
   o.load             = MO.FE3dSprite_load;
   o.updateMatrix     = MO.FE3dSprite_updateMatrix;
   o.selectClip       = MO.FE3dSprite_selectClip;
   o.process          = MO.FE3dSprite_process;
   o.dispose          = MO.FE3dSprite_dispose;
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
      r = o._skeletons = new MO.TDictionary();
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
      animations = o._animations = new MO.TDictionary();
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
      movies = o._movies = new MO.TObjects();
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
         var s = MO.Class.create(MO.FE3rSkeleton);
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
            a = MO.Class.create(MO.FE3rSkeletonAnimation);
         }else{
            a = MO.Class.create(MO.FE3rMeshAnimation);
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
         var renderable = MO.Class.create(MO.FE3dTemplateRenderable);
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
   o._shapes = MO.Lang.Object.dispose(o._shapes);
   o.__base.FE3dDisplayContainer.dispose.call(o);
}
MO.FE3dTemplate = function FE3dTemplate(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MGraphicObject, MO.MListenerLoad);
   o._dataReady       = false;
   o._ready           = false;
   o._sprites         = MO.Class.register(o, new MO.AGetter('_sprites'));
   o._skeletons       = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o._animations      = MO.Class.register(o, new MO.AGetter('_animations'));
   o.construct        = MO.FE3dTemplate_construct;
   o.testReady        = MO.FE3dTemplate_testReady;
   o.sprite           = MO.FE3dTemplate_sprite;
   o.findMeshByCode   = MO.FE3dTemplate_findMeshByCode;
   o.meshRenderables  = MO.FE3dTemplate_sprites;
   o.pushSkeleton     = MO.FE3dTemplate_pushSkeleton;
   o.findAnimation    = MO.FE3dTemplate_findAnimation;
   o.pushAnimation    = MO.FE3dTemplate_pushAnimation;
   o.visible          = MO.FE3dTemplate_visible;
   o.setVisible       = MO.FE3dTemplate_setVisible;
   o.loadSkeletons    = MO.FE3dTemplate_loadSkeletons;
   o.linkAnimation    = MO.FE3dTemplate_linkAnimation;
   o.loadAnimations   = MO.FE3dTemplate_loadAnimations;
   o.loadResource     = MO.FE3dTemplate_loadResource;
   o.reloadResource   = MO.FE3dTemplate_reloadResource;
   o.processLoad      = MO.FE3dTemplate_processLoad;
   o.process          = MO.FE3dTemplate_process;
   o.dispose          = MO.FE3dTemplate_dispose;
   return o;
}
MO.FE3dTemplate_construct = function FE3dTemplate_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var layer = o._layer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('Layer', layer);
   o._sprites = new MO.TObjects();
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
      r = o._skeletons = new MO.TDictionary();
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
      r = o._animations = new MO.TDictionary();
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
         var r = p.at(i);
         var s = MO.Class.create(MO.FE3rSkeleton);
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
            a = MO.Class.create(MO.FE3rSkeletonAnimation);
         }else{
            a = MO.Class.create(MO.FE3rMeshAnimation);
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
            var display = MO.Class.create(MO.FE3dTemplateDisplay);
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
   o._sprites = MO.Lang.Object.dispose(o._sprites);
   o.__base.FE3dSpace.dispose.call(o);
}
MO.FE3dTemplateCanvas = function FE3dTemplateCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   o._activeTemplate     = null;
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = MO.FE3dTemplateCanvas_onEnterFrame;
   o.onMouseCaptureStart = MO.FE3dTemplateCanvas_onMouseCaptureStart;
   o.onMouseCapture      = MO.FE3dTemplateCanvas_onMouseCapture;
   o.onMouseCaptureStop  = MO.FE3dTemplateCanvas_onMouseCaptureStop;
   o.onResize            = MO.FE3dTemplateCanvas_onResize;
   o.onTemplateLoad      = MO.FE3dTemplateCanvas_onTemplateLoad;
   o.construct           = MO.FE3dTemplateCanvas_construct;
   o.loadByGuid          = MO.FE3dTemplateCanvas_loadByGuid;
   o.loadByCode          = MO.FE3dTemplateCanvas_loadByCode;
   o.dispose             = MO.FE3dTemplateCanvas_dispose;
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
   var st = MO.Console.find(MO.FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
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
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
}
MO.FE3dTemplateCanvas_loadByGuid = function FE3dTemplateCanvas_loadByGuid(p){
   var o = this;
   var c = o._graphicContext;
   var sc = MO.Console.find(MO.FE3dSceneConsole);
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
   var templateConsole = MO.Console.find(MO.FE3dTemplateConsole);
   if(o._activeTemplate != null){
      templateConsole.free(o._activeTemplate);
   }
   var template = templateConsole.allocByCode(context, code);
   template.addLoadListener(o, o.onTemplateLoad);
   template.selectTechnique(context, FE3dGeneralTechnique);
   o._stage = o._activeTemplate = template;
   MO.RStage.register('stage.template', template);
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
MO.FE3dTemplateConsole = function FE3dTemplateConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._loadQueue  = null;
   o._pools      = null;
   o._thread     = null;
   o._interval   = 200;
   o.onProcess   = MO.FE3dTemplateConsole_onProcess;
   o.construct   = MO.FE3dTemplateConsole_construct;
   o.allocByGuid = MO.FE3dTemplateConsole_allocByGuid;
   o.allocByCode = MO.FE3dTemplateConsole_allocByCode;
   o.free        = MO.FE3dTemplateConsole_free;
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
   o._loadQueue = new MO.TLooper();
   o._pools = MO.Class.create(MO.FObjectPools);
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
}
MO.FE3dTemplateConsole_allocByGuid = function FE3dTemplateConsole_allocByGuid(context, guid){
   var o = this;
   var template = o._pools.alloc(guid);
   if(template){
      return template;
   }
   var resource = MO.Console.find(MO.FE3sTemplateConsole).loadByGuid(guid);
   template = MO.Class.create(MO.FE3dTemplate);
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
   var resource = MO.Console.find(MO.FE3sTemplateConsole).loadByCode(code);
   template = MO.Class.create(MO.FE3dTemplate);
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
MO.FE3dTemplateDisplay = function FE3dTemplateDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3dSprite, MO.MListenerLoad);
   o._dataReady       = false;
   o._ready           = false;
   o._shapes          = MO.Class.register(o, new MO.AGetter('_shapes'));
   o._skeletons       = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o.construct        = MO.FE3dTemplateDisplay_construct;
   o.testReady        = MO.FE3dTemplateDisplay_testReady;
   o.findMeshByCode   = MO.FE3dTemplateDisplay_findMeshByCode;
   o.pushSkeleton     = MO.FE3dTemplateDisplay_pushSkeleton;
   o.loadSkeletons    = MO.FE3dTemplateDisplay_loadSkeletons;
   o.linkAnimation    = MO.FE3dTemplateDisplay_linkAnimation;
   o.loadAnimations   = MO.FE3dTemplateDisplay_loadAnimations;
   o.loadResource     = MO.FE3dTemplateDisplay_loadResource;
   o.reloadResource   = MO.FE3dTemplateDisplay_reloadResource;
   o.load             = MO.FE3dTemplateDisplay_load;
   o.dispose          = MO.FE3dTemplateDisplay_dispose;
   return o;
}
MO.FE3dTemplateDisplay_construct = function FE3dTemplateDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._shapes = new MO.TObjects();
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
      var m = s.at(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
MO.FE3dTemplateDisplay_pushSkeleton = function FE3dTemplateDisplay_pushSkeleton(skeleton){
   var o = this;
   var resource = skeleton.resource();
   var skeletonGuid = resource.guid();
   var skeletons = o._skeletons;
   if(!skeletons){
      skeletons = o._skeletons = new MO.TDictionary();
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
         var skeleton = MO.Class.create(MO.FE3rSkeleton);
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
         animation = MO.Class.create(MO.FE3rSkeletonAnimation);
      }else{
         animation = MO.Class.create(MO.FE3rMeshAnimation);
      }
      animation._display = o;
      animation.loadResource(animationResource);
      o.pushAnimation(animation);
   }
}
MO.FE3dTemplateDisplay_loadResource = function FE3dTemplateDisplay_loadResource(resource){
   var o = this;
   o._resource = resource;
   var instanceConsole = MO.Console.find(MO.FE3dInstanceConsole);
   o._matrix.assign(resource.matrix());
   var renderableResources = resource.renderables();
   if(renderableResources){
      var shapes = o._shapes;
      var renderableCount = renderableResources.count();
      for(var i = 0; i < renderableCount; i++){
         var renderableResource = renderableResources.at(i);
         var renderable = instanceConsole.create(MO.EE3dInstance.TemplateRenderable);
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
   o._shapes = MO.Lang.Object.dispose(o._shapes);
   o.__base.FE3dSprite.dispose.call(o);
}
MO.FE3dTemplateRenderable = function FE3dTemplateRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dMeshRenderable, MO.MLinkerResource);
   o._ready            = false;
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   o.construct         = MO.FE3dTemplateRenderable_construct;
   o.testReady         = MO.FE3dTemplateRenderable_testReady;
   o.testVisible       = MO.FE3dTemplateRenderable_testVisible;
   o.calculateOutline  = MO.FE3dTemplateRenderable_calculateOutline;
   o.loadResource      = MO.FE3dTemplateRenderable_loadResource;
   o.reloadResource    = MO.FE3dTemplateRenderable_reloadResource;
   o.load              = MO.FE3dTemplateRenderable_load;
   o.dispose           = MO.FE3dTemplateRenderable_dispose;
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
   o._model = MO.Console.find(MO.FE3rModelConsole).load(o, modelGuid);
   var materialGuid = resource.materialGuid();
   if(!MO.Lang.String.isEmpty(materialGuid)){
      var material = o._material = o._materialReference = MO.Console.find(MO.FE3rMaterialConsole).load(o, materialGuid);
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
      o._material = o._materialReference = MO.Class.create(MO.FE3dMaterial);
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
   var renderable = o._renderable = MO.Console.find(MO.FE3rModelConsole).findMesh(meshGuid);
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
         var bones = o._bones = new MO.TObjects();
         for(var i = 0; i < c; i++){
            var boneReferResource = boneReferResources.at(i);
            var boneReferIndex = boneReferResource.index();
            var bone = displaySkeleton.bones().get(boneReferIndex);
            if(!bone){
               throw new MO.TError(o, 'Bone is not exist.');
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
MO.ME3dBoundaryPolygon = function ME3dBoundaryPolygon(o){
   o = MO.Class.inherits(this, o);
   o._positionCount = MO.Class.register(o, new MO.AGetter('_positionCount'));
   o._positions     = MO.Class.register(o, new MO.AGetter('_positions'));
   o._indexCount    = MO.Class.register(o, new MO.AGetter('_indexCount'));
   o._indexes       = MO.Class.register(o, new MO.AGetter('_indexes'));
   o.construct      = MO.ME3dBoundaryPolygon_construct;
   o.dispose        = MO.ME3dBoundaryPolygon_dispose;
   return o;
}
MO.ME3dBoundaryPolygon_construct = function ME3dBoundaryPolygon_construct(){
   var o = this;
}
MO.ME3dBoundaryPolygon_dispose = function ME3dBoundaryPolygon_dispose(){
   var o = this;
   o._positions = null;
   o._indexes = null;
}
MO.ME3dDynamicRenderable = function ME3dDynamicRenderable(o){
   o = MO.Class.inherits(this, o);
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   o.construct = MO.ME3dDynamicRenderable_construct;
   o.dispose   = MO.ME3dDynamicRenderable_dispose;
   return o;
}
MO.ME3dDynamicRenderable_construct = function ME3dDynamicRenderable_construct(){
   var o = this;
   o._color = new MO.SColor4(1, 1, 1, 1);
}
MO.ME3dDynamicRenderable_dispose = function ME3dDynamicRenderable_dispose(){
   var o = this;
   o._color = MO.Lang.Object.dispose(o._color);
}
MO.SE3dRulerPrecision = function SE3dRulerPrecision(o){
   var o = this;
   o.interval = 1;
   o.length   = 0.5;
   o.color    = new MO.SColor4(255, 255, 255, 255);
   return o;
}
MO.SE3dRulerPrecision_assign = function SE3dRulerPrecision_assign(info){
   var o = this;
   o.interval.assign(info.interval);
   o.color.assign(info.color);
}
MO.SE3dRulerStyle = function SE3dRulerStyle(o){
   var o = this;
   o.lineColor    = new MO.SColor4(255, 255, 255, 255);
   o.bothLength   = 0.5;
   o.bothColor    = new MO.SColor4(255, 255, 255, 255);
   o.tickInterval = 1;
   o.tickLength   = 0.3;
   o.tickColor    = new MO.SColor4(255, 255, 255, 255);
   o.precisions   = new MO.TObjects();
   o.assign       = MO.SE3dRulerStyle_assign;
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
MO.FE3dBitmap = function FE3dBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3dFace);
   o.construct = MO.FE3dBitmap_construct;
   o.testReady = MO.FE3dBitmap_testReady;
   o.loadUrl   = MO.FE3dBitmap_loadUrl;
   o.dispose   = MO.FE3dBitmap_dispose;
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
            var event = new MO.SEvent(o);
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
   o._renderable = MO.Console.find(MO.FE3dBitmapConsole).loadDataByUrl(o, url);
   o._ready = false;
}
MO.FE3dBitmap_dispose = function FE3dBitmap_dispose(){
   var o = this;
   o.__base.FE3dFace.dispose.call(o);
}
MO.FE3dBitmapConsole = function FE3dBitmapConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._bitmaps       = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapDatas   = MO.Class.register(o, new MO.AGetter('_bitmapDatas'));
   o._dataUrl       = '/cloud.resource.bitmap.wv'
   o.construct      = MO.FE3dBitmapConsole_construct;
   o.loadByUrl      = MO.FE3dBitmapConsole_loadByUrl;
   o.loadByGuid     = MO.FE3dBitmapConsole_loadByGuid;
   o.loadDataByUrl  = MO.FE3dBitmapConsole_loadDataByUrl;
   o.loadDataByGuid = MO.FE3dBitmapConsole_loadDataByGuid;
   o.dispose        = MO.FE3dBitmapConsole_dispose;
   return o;
}
MO.FE3dBitmapConsole_construct = function FE3dBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new MO.TDictionary();
   o._bitmapDatas = new MO.TDictionary();
}
MO.FE3dBitmapConsole_loadByUrl = function FE3dBitmapConsole_loadByUrl(context, url){
   var o = this;
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = MO.Class.create(MO.FE3dBitmap);
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
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
   return o.loadByUrl(context, url);
}
MO.FE3dBitmapConsole_loadDataByUrl = function FE3dBitmapConsole_loadDataByUrl(context, url){
   var o = this;
   MO.Assert.debugNotNull(context);
   MO.Assert.debugNotNull(url);
   var dataUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap data from url. (url={1})', dataUrl);
   var data = o._bitmapDatas.get(url);
   if(!data){
      data = MO.Class.create(MO.FE3dBitmapData);
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
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
   return o.loadDataByUrl(context, url);
}
MO.FE3dBitmapConsole_dispose = function FE3dBitmapConsole_dispose(){
   var o = this;
   o._bitmaps = MO.Lang.Object.dispose(o._bitmaps);
   o._bitmapDatas = MO.Lang.Object.dispose(o._bitmapDatas);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3dBitmapData = function FE3dBitmapData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o._image      = null;
   o.onImageLoad = MO.FE3dBitmapData_onImageLoad;
   o.construct   = MO.FE3dBitmapData_construct;
   o.loadUrl     = MO.FE3dBitmapData_loadUrl;
   o.dispose     = MO.FE3dBitmapData_dispose;
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
   var adjustWidth = MO.Lang.Integer.pow2(width);
   var adjustHeight = MO.Lang.Integer.pow2(height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
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
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   o._ready = false;
}
MO.FE3dBitmapData_dispose = function FE3dBitmapData_dispose(){
   var o = this;
   o.__base.FE3dFaceData.dispose.call(o);
}
MO.EE3dBoundaryShape = function EE3dBoundaryShape(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._optionSphere     = false;
   o._color            = MO.Class.register(o, new MO.AGetter('_color'));
   o._polygons         = MO.Class.register(o, new MO.AGetter('_polygons'));
   o._faceEffectCode   = MO.Class.register(o, new MO.AGetSet('_faceEffectCode'));
   o._faceRenderable   = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderEffectCode = MO.Class.register(o, new MO.AGetSet('_borderEffectCode'));
   o._borderRenderable = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   o.construct         = MO.EE3dBoundaryShape_construct;
   o.pushPolygon       = MO.EE3dBoundaryShape_pushPolygon;
   o.buildFace         = MO.EE3dBoundaryShape_buildFace;
   o.buildBorder       = MO.EE3dBoundaryShape_buildBorder;
   o.build             = MO.EE3dBoundaryShape_build;
   o.buildFlat         = MO.EE3dBoundaryShape_buildFlat;
   o.buildSphere       = MO.EE3dBoundaryShape_buildSphere;
   o.dispose           = MO.EE3dBoundaryShape_dispose;
   return o;
}
MO.EE3dBoundaryShape_construct = function EE3dBoundaryShape_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._color = new MO.SColor4(0.3, 0.3, 0.3);
   o._polygons = new MO.TObjects();
}
MO.EE3dBoundaryShape_pushPolygon = function EE3dBoundaryShape_pushPolygon(polygon){
   this._polygons.push(polygon);
}
MO.EE3dBoundaryShape_buildFace = function EE3dBoundaryShape_buildFace(){
   var o = this;
   var context = o._graphicContext;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var color = o._color;
   var vertexStart = 0;
   var vertexIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var coordIndex = 0;
   var coordData = new Float32Array(2 * vertexTotal * 2);
   var faceIndex = 0;
   var faceData = new Uint32Array(indexTotal + 3 * 2 * vertexTotal);
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var cx = positions[positionIndex++];
         var cy = positions[positionIndex++];
         var x = cx * MO.Lang.Const.DEGREE_RATE;
         var y = cy * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y);
         vertexData[vertexIndex++] = Math.sin(y);
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y);
         coordData[coordIndex++] = cx / 360 + 0.5;
         coordData[coordIndex++] = 0.5 - cy / 180;
      }
      var indexes = boundary.indexes();
      var indexCount = indexes.length;
      var faceCount = indexCount / 3;
      for(var i = 0; i < faceCount; i++){
         var facePosition = 3 * i;
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 2];
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 1];
         faceData[faceIndex++] = vertexStart + indexes[facePosition    ];
      }
      vertexStart += positionCount;
   }
   var layerStart = vertexStart;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         var y = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 0.9;
         vertexData[vertexIndex++] = (Math.sin(y)) * 0.9;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 0.9;
         coordData[coordIndex++] = x;
         coordData[coordIndex++] = y;
      }
   }
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      for(var i = 0; i < positionCount; i++){
         if(i == positionCount - 1){
            faceData[faceIndex++] = vertexStart + i;
            faceData[faceIndex++] = vertexStart + 0;
            faceData[faceIndex++] = vertexStart + i + layerStart;
            faceData[faceIndex++] = vertexStart + 0;
            faceData[faceIndex++] = vertexStart + layerStart;
            faceData[faceIndex++] = vertexStart + i + layerStart;
         }else{
            faceData[faceIndex++] = vertexStart + i;
            faceData[faceIndex++] = vertexStart + i + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart;
            faceData[faceIndex++] = vertexStart + i + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart;
         }
      }
      vertexStart += positionCount;
   }
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   var positionTotal = vertexTotal * 2;
   for(var i = 0; i < positionTotal; i++){
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.linkGraphicContext(context);
   renderable.setOptionColor(true);
   renderable.setOptionCoord(true);
   renderable.setVertexCount(vertexTotal * 2);
   renderable.setup();
   renderable.color().setHex('#0a5294');
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.vertexCoordBuffer().upload(coordData, 4 * 2, vertexTotal * 2, true);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().upload(faceData, faceIndex, true);
}
MO.EE3dBoundaryShape_buildBorder = function EE3dBoundaryShape_buildBorder(){
   var o = this;
   var context = o._graphicContext;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var color = o._color;
   var vertexStart = 0;
   var vertexIndex = 0;
   var faceIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var borderIndex = 0;
   var borderData = new Uint32Array(2 * vertexTotal + 2 * vertexTotal);
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 1.001;
         vertexData[vertexIndex++] = (Math.sin(y)) * 1.001;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 1.001;
      }
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         if(i == positionCount - 1){
            borderData[borderIndex++] = vertexStart;
         }else{
            borderData[borderIndex++] = vertexStart + i + 1;
         }
      }
      vertexStart += positionCount;
   }
   var layerStart = vertexStart;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 0.98;
         vertexData[vertexIndex++] = (Math.sin(y)) * 0.98;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 0.98;
      }
      vertexStart += positionCount;
   }
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         borderData[borderIndex++] = vertexStart + i + layerStart;
      }
      vertexStart += positionCount;
   }
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x22;
      colors[colorIndex++] = 0xA9;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x96;
      colors[colorIndex++] = 0xB0;
      colors[colorIndex++] = 0xD6;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().setLineWidth(1);
   renderable.indexBuffer().upload(borderData, borderIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
}
MO.EE3dBoundaryShape_build = function EE3dBoundaryShape_build(context){
   var o = this;
   var vertexTotal = 0;
   var indexTotal = 0;
   var boundaries = o._polygons;
   var count = boundaries.count();
   for(var i = 0; i < count; i++){
      var boundary = boundaries.at(i);
      vertexTotal += boundary.positionCount();
      indexTotal += boundary.indexes().length;
   }
   o._vertexTotal = vertexTotal;
   o._indexTotal = indexTotal;
   o.buildFace(context);
   o.buildBorder(context);
}
MO.EE3dBoundaryShape_buildFlat = function EE3dBoundaryShape_buildFlat(context){
   var o = this;
   o._optionSphere = false;
   o.build(context)
}
MO.EE3dBoundaryShape_buildSphere = function EE3dBoundaryShape_buildSphere(context){
   var o = this;
   o._optionSphere = true;
   o.build(context)
}
MO.EE3dBoundaryShape_dispose = function EE3dBoundaryShape_dispose(){
   var o = this;
   o._polygons = MO.Lang.Obejct.dispose(o._polygons);
   o.__base.FObject.dispose.call(o);
}
MO.FE3dBoundBox = function FE3dBoundBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._outline              = MO.Class.create(o, new MO.AGetter('_outline'));
   o._rate                 = 0.2;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = MO.FE3dBoundBox_construct;
   o.setup                 = MO.FE3dBoundBox_setup;
   o.upload                = MO.FE3dBoundBox_upload;
   return o;
}
MO.FE3dBoundBox_construct = function FE3dBoundBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._outline = new MO.SOutline3();
}
MO.FE3dBoundBox_setup = function FE3dBoundBox_setup(){
   var o = this;
   var c = o._graphicContext;
   var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var vertexData = new Uint8Array(4 * 32);
   for(var n = 4 * 32 - 1; n >= 0; n--){
      vertexData[n] = 0xFF;
   }
   var buffer = o._vertexColorBuffer = c.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
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
   buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
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
MO.FE3dCube = function FE3dCube(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup                = MO.FE3dCube_setup;
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
MO.FE3dDataBox = function FE3dDataBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable, MO.ME3dDynamicRenderable);
   o._optionColor          = MO.Class.register(o, new MO.AGetSet('_optionColor'), true);
   o._optionCoord          = MO.Class.register(o, new MO.AGetSet('_optionCoord'), false);
   o._optionNormal         = MO.Class.register(o, new MO.AGetSet('_optionNormal'), false);
   o._vertexPositionBuffer = MO.Class.register(o, new MO.AGetter('_vertexPositionBuffer'));
   o._vertexColorBuffer    = MO.Class.register(o, new MO.AGetter('_vertexColorBuffer'));
   o._vertexCoordBuffer    = MO.Class.register(o, new MO.AGetter('_vertexCoordBuffer'));
   o._vertexNormalBuffer   = MO.Class.register(o, new MO.AGetter('_vertexNormalBuffer'));
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   o.construct             = MO.FE3dDataBox_construct;
   o.setup                 = MO.FE3dDataBox_setup;
   o.dispose               = MO.FE3dDataBox_dispose;
   return o;
}
MO.FE3dDataBox_construct = function FE3dDataBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o.__base.ME3dDynamicRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dDataBox_setup = function FE3dDataBox_setup(vd, vc, id){
   var o = this;
   var c = o._graphicContext;
   var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   if(o._optionColor){
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
   }
   if(o._optionCoord){
      var buffer = o._vertexCoordBuffer = c.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
      o.pushVertexBuffer(buffer);
   }
   if(o._optionNormal){
      var buffer = o._vertexNormalBuffer = c.createVertexBuffer();
      buffer.setCode('normal');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
   }
   var buffer = o._indexBuffer = c.createIndexBuffer();
   o.pushIndexBuffer(buffer);
   var info = o.material().info();
   info.effectCode = 'control';
   info.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dDataBox_dispose = function FE3dDataBox_dispose(){
   var o = this;
   o._material = MO.Class.create(MO.FE3dMaterial);
   o.__base.ME3dDynamicRenderable.dispose.call(o);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dDimensional = function FE3dDimensional(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = MO.FE3dDimensional_construct;
   o.setup                 = MO.FE3dDimensional_setup;
   return o;
}
MO.FE3dDimensional_construct = function FE3dDimensional_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._cellSize = new MO.SSize2();
   o._cellSize.set(1, 1);
   o._size = new MO.SSize2();
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
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(vd, 4 * 3, vc);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   buffer.upload(vcd, 4, vc);
   o.pushVertexBuffer(buffer);
   var buffer = context.createIndexBuffer();
   buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   buffer.upload(id, it);
   o.pushIndexBuffer(buffer);
   var materialInfo = o.material().info();
   materialInfo.effectCode = 'control';
   materialInfo.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dDynamicMesh = function FE3dDynamicMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._shape            = MO.Class.register(o, new MO.AGetSet('_shape'));
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = MO.Class.register(o, new MO.AGetter('_mergeRenderables'));
   o.construct         = MO.FE3dDynamicMesh_construct;
   o.mergeCount        = MO.FE3dDynamicMesh_mergeCount;
   o.mergeMaxCount     = MO.FE3dDynamicMesh_mergeMaxCount;
   o.mergeStride       = MO.FE3dDynamicMesh_mergeStride;
   o.syncVertexBuffer  = MO.FE3dDynamicMesh_syncVertexBuffer;
   o.mergeRenderable   = MO.FE3dDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = MO.FE3dDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = MO.FE3dDynamicMesh_mergeIndexBuffer;
   o.build             = MO.FE3dDynamicMesh_build;
   o.dispose           = MO.FE3dDynamicMesh_dispose;
   return o;
}
MO.FE3dDynamicMesh_construct = function FE3dDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._mergeRenderables = new MO.TObjects();
}
MO.FE3dDynamicMesh_mergeCount = function FE3dDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}
MO.FE3dDynamicMesh_mergeMaxCount = function FE3dDynamicMesh_mergeMaxCount(){
   return this._shape.mergeMaxCount();
}
MO.FE3dDynamicMesh_mergeStride = function FE3dDynamicMesh_mergeStride(){
   return this._shape.mergeStride();
}
MO.FE3dDynamicMesh_syncVertexBuffer = function FE3dDynamicMesh_syncVertexBuffer(vertexBuffer){
   var o = this;
   var code = vertexBuffer.code();
   var buffer = o._vertexBuffers.get(code);
   if(!buffer){
      var formatCd = vertexBuffer.formatCd();
      var vertexTotal = o._vertexTotal;
      buffer = o._graphicContext.createVertexBuffer();
      buffer.setCode(code);
      buffer.setFormatCd(formatCd);
      buffer.setStride(vertexBuffer.stride());
      var bufferData = null;
      switch(formatCd){
         case MO.EG3dAttributeFormat.Float1:
            bufferData = new Float32Array(1 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float2:
            bufferData = new Float32Array(2 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float3:
            bufferData = new Float32Array(3 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float4:
            bufferData = new Float32Array(4 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            bufferData = new Uint8Array(4 * vertexTotal);
            break;
         default:
            throw new MO.TError("Unknown code");
      }
      buffer.setData(bufferData);
      o.pushVertexBuffer(buffer);
   }
   return buffer;
}
MO.FE3dDynamicMesh_mergeRenderable = function FE3dDynamicMesh_mergeRenderable(renderable){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexCount = renderable.vertexCount();
   var indexBuffer = renderable.indexBuffers().first();
   var indexCount = indexBuffer.count();
   var mergeCount = capability.mergeCount;
   if(o._mergeRenderables.count() >= mergeCount){
      return false;
   }
   var vertexLimit = o._vertexTotal + vertexCount;
   if(capability.optionIndex32){
      if(vertexLimit > MO.Lang.Integer.MAX_UINT32){
         return false;
      }
   }else{
      if(vertexLimit > MO.Lang.Integer.MAX_UINT16){
         return false;
      }
   }
   o._vertexTotal += vertexCount;
   o._indexTotal += indexCount;
   o._mergeRenderables.push(renderable);
   return true;
}
MO.FE3dDynamicMesh_mergeVertexBuffer = function FE3dDynamicMesh_mergeVertexBuffer(vertexBuffer){
   var o = this;
   var position = o._vertexPosition;
   var count = vertexBuffer.count();
   var formatCd = vertexBuffer.formatCd();
   var stride = vertexBuffer.stride();
   var data = vertexBuffer.data();
   var mergeVertexBuffer = o.syncVertexBuffer(vertexBuffer);
   var mergeData = mergeVertexBuffer.data();
   switch(formatCd){
      case MO.EG3dAttributeFormat.Float1:
      case MO.EG3dAttributeFormat.Float2:
      case MO.EG3dAttributeFormat.Float3:
      case MO.EG3dAttributeFormat.Float4:
         MO.Lang.Float.copy(mergeData, (stride / 4) * position, data, 0, (stride / 4) * count);
         break;
      case MO.EG3dAttributeFormat.Byte4:
      case MO.EG3dAttributeFormat.Byte4Normal:
         MO.Lang.Byte.copy(mergeData, stride * position, data, 0, stride * count);
         break;
      default:
         throw new MO.TError("Unknown code");
   }
}
MO.FE3dDynamicMesh_mergeIndexBuffer = function FE3dDynamicMesh_mergeIndexBuffer(indexBuffer){
   var o = this;
   var vertexPosition = o._vertexPosition;
   var indexPosition = o._indexPosition;
   var drawModeCd = indexBuffer.drawModeCd();
   var data = indexBuffer.data();
   var mergeData = o._indexBuffer.data();
   var renderableCount = indexBuffer.count();
   for(var i = 0; i < renderableCount; i++){
      mergeData[indexPosition++] = vertexPosition + data[i]
   }
   o._indexBuffer.setDrawModeCd(drawModeCd);
}
MO.FE3dDynamicMesh_build = function FE3dDynamicMesh_build(){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var renderables = o._mergeRenderables;
   var renderableCount = renderables.count();
   var renderable = renderables.first();
   o._material = renderable.material();
   o._textures = renderable.textures();
   var instanceVertexData = new Float32Array(vertexTotal);
   var instanceVertexBuffer = o._instanceVertexBuffer = context.createVertexBuffer();
   instanceVertexBuffer.setCode('instance');
   instanceVertexBuffer.setStride(4);
   instanceVertexBuffer.setFormatCd(MO.EG3dAttributeFormat.Float1);
   instanceVertexBuffer.setData(instanceVertexData);
   o.pushVertexBuffer(instanceVertexBuffer);
   var indexBuffer = o._indexBuffer = context.createIndexBuffer(MO.FE3rIndexBuffer);
   if(capability.optionIndex32){
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      indexBuffer.setData(new Uint32Array(indexTotal));
   }else{
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint16);
      indexBuffer.setData(new Uint16Array(indexTotal));
   }
   indexBuffer.setCount(indexTotal);
   o.pushIndexBuffer(indexBuffer);
   for(var n = 0; n < renderableCount; n++){
      var renderable = renderables.at(n);
      var renderableVertexCount = renderable.vertexCount();
      MO.Lang.Float.fill(instanceVertexData, o._vertexPosition, renderableVertexCount, n);
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         o.mergeVertexBuffer(vertexBuffer);
      }
      var renderableIndexBuffer = renderable.indexBuffers().first();
      var renderableIndexCount = renderableIndexBuffer.count();
      o.mergeIndexBuffer(renderableIndexBuffer);
      o._vertexPosition += renderableVertexCount;
      o._indexPosition += renderableIndexCount;
   }
   var vertexBuffers = o._vertexBuffers;
   var vertexBufferCount = vertexBuffers.count();
   for(var i = 0; i < vertexBufferCount; i++){
      var vertexBuffer = vertexBuffers.at(i);
      var vertexData = vertexBuffer.data();
      var vertexStride = vertexBuffer.stride();
      vertexBuffer.upload(vertexData, vertexStride, vertexTotal);
      vertexBuffer.setData(null);
   }
   var indexData = indexBuffer.data();
   indexBuffer.upload(indexData, indexTotal);
   indexBuffer.setData(null);
   MO.Logger.debug(o, 'Merge mesh. (renderable_count={1}, vertex={2}, index={3})', renderableCount, vertexTotal, indexTotal);
}
MO.FE3dDynamicMesh_dispose = function FE3dDynamicMesh_dispose(){
   var o = this;
   o._mergeRenderables = MO.Lang.Object.dispose(o._mergeRenderables);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dDynamicShape = function FE3dDynamicShape(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay);
   o._mergeMaxCount      = MO.Class.register(o, new MO.AGetter('_mergeMaxCount'));
   o._mergeStride        = MO.Class.register(o, new MO.AGetter('_mergeStride'), 4);
   o._sourceRenderables  = MO.Class.register(o, new MO.AGetter('_sourceRenderables'));
   o._meshes             = MO.Class.register(o, new MO.AGetter('_meshes'));
   o.construct           = MO.FE3dDynamicShape_construct;
   o.createMesh          = MO.FE3dDynamicShape_createMesh;
   o.pushMergeRenderable = MO.FE3dDynamicShape_pushMergeRenderable;
   o.build               = MO.FE3dDynamicShape_build;
   o.dispose             = MO.FE3dDynamicShape_dispose;
   return o;
}
MO.FE3dDynamicShape_construct = function FE3dDynamicShape_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._sourceRenderables = new MO.TObjects();
   o._meshes = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dDynamicShape_createMesh = function FE3dDynamicShape_createMesh(){
   var o = this;
   var mesh = MO.Class.create(MO.FE3dDynamicMesh);
   mesh.linkGraphicContext(o);
   mesh.setShape(o);
   o._meshes.push(mesh);
   o.pushRenderable(mesh);
   return mesh;
}
MO.FE3dDynamicShape_pushMergeRenderable = function FE3dDynamicShape_pushMergeRenderable(renderable){
   this._sourceRenderables.push(renderable);
}
MO.FE3dDynamicShape_build = function FE3dDynamicShape_build(){
   var o = this;
   var renderables = o._sourceRenderables;
   var meshes = o.renderables();
   var count = renderables.count();
   if(count > 0){
      var mesh = o.createMesh();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         if(!mesh.mergeRenderable(renderable)){
            mesh = o.createMesh();
            if(!mesh.mergeRenderable(renderable)){
               throw new MO.TError(o, 'Merge renderable failure.');
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
MO.FE3dDynamicShape_dispose = function FE3dDynamicShape_dispose(){
   var o = this;
   o._sourceRenderables = MO.Lang.Object.dispose(o._sourceRenderables);
   o._meshes = MO.Lang.Object.dispose(o._meshes);
   o.__base.FE3dDisplay.dispose.call(o);
}
MO.FE3dFace = function FE3dFace(o){
   o = MO.Class.inherits(this, o, MO.FE3dMeshRenderable, MO.MListener);
   o._ready           = false;
   o._size            = MO.Class.register(o, new MO.AGetter('_size'));
   o._loadListeners   = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o._statusDirty     = true;
   o.construct        = MO.FE3dFace_construct;
   o.setSize          = MO.FE3dFace_setSize;
   o.setData          = MO.FE3dFace_setData;
   o.findVertexBuffer = MO.FE3dFace_findVertexBuffer;
   o.vertexBuffers    = MO.FE3dFace_vertexBuffers;
   o.findTexture      = MO.FE3dFace_findTexture;
   o.textures         = MO.FE3dFace_textures;
   o.material         = MO.FE3dFace_material;
   o.dirty            = MO.FE3dFace_dirty;
   o.processLoad      = MO.FE3dFace_processLoad;
   o.process          = MO.FE3dFace_process;
   o.dispose          = MO.FE3dFace_dispose;
   return o;
}
MO.FE3dFace_construct = function FE3dFace_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
   o._size = new MO.SSize2();
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
MO.FE3dFaceData = function FE3dFaceData(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._ready                = false;
   o._optionCenter         = MO.Class.register(o, new MO.AGetSet('_optionCenter'), false);
   o._size                 = MO.Class.register(o, new MO.AGetter('_size'));
   o._adjustSize           = MO.Class.register(o, new MO.AGetter('_adjustSize'));
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   o.construct             = MO.FE3dFaceData_construct;
   o.testReady             = MO.FE3dFaceData_testReady;
   o.setup                 = MO.FE3dFaceData_setup;
   o.dispose               = MO.FE3dFaceData_dispose;
   return o;
}
MO.FE3dFaceData_construct = function FE3dFaceData_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._size = new MO.SSize2();
   o._adjustSize = new MO.SSize2();
   o._material = MO.Class.create(MO.FE3dMaterial);
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
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(data, 4 * 3, 4);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('position');
   stream.setDataCount(4);
   stream.setData(data);
   buffer._resource = stream;
   o.pushVertexBuffer(buffer);
   var data = [0, 1, 1, 1, 1, 0, 0, 0];
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(data, 4 * 2, 4);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('coord');
   stream.setDataCount(4);
   stream.setData(data);
   buffer._resource = stream;
   o.pushVertexBuffer(buffer);
   var data = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, 6);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('index16');
   stream.setDataCount(2);
   stream.setData(data);
   buffer._resource = stream;
   o.pushIndexBuffer(buffer);
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   o._material.info().optionDouble = true;
   o._material._textures = o._textures;
}
MO.FE3dFaceData_dispose = function FE3dFaceData_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._adjustSize = MO.Lang.Object.dispose(o._adjustSize);
   o._texture = MO.Lang.Object.dispose(o._texture);
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dPolygon = function FE3dPolygon(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   return o;
}
MO.FE3dRectangle = function FE3dRectangle(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   o.setup                 = MO.FE3dRectangle_setup;
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
MO.FE3dRuler = function FE3dRuler(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._style                = MO.Class.register(o, new MO.AGetter('_style'));
   o._beginPoint           = MO.Class.register(o, new MO.AGetter('_beginPoint'));
   o._endPoint             = MO.Class.register(o, new MO.AGetter('_endPoint'));
   o._direction            = MO.Class.register(o, new MO.AGetter('_direction'));
   o._directionLine        = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._vertexPositionData   = null;
   o._vertexColorData      = null;
   o._indexData            = null;
   o.construct             = MO.FE3dRuler_construct;
   o.setup                 = MO.FE3dRuler_setup;
   o.upload                = MO.FE3dRuler_upload;
   return o;
}
MO.FE3dRuler_construct = function FE3dRuler_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._style = new MO.SE3dRulerStyle();
   o._beginPoint = new MO.SPoint3(0, 0, 0);
   o._endPoint = new MO.SPoint3(0, 10, 0);
   o._direction = new MO.SVector3(1, 0, 0);
   o._directionLine = new MO.SVector3();
   o._vertexPositionData = new MO.TArray();
   o._vertexColorData = new MO.TArray();
   o._indexData = new MO.TArray();
}
MO.FE3dRuler_setup = function FE3dRuler_setup(){
   var o = this;
   var context = o._graphicContext;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var indexBuffer = o._indexBuffer = context.createIndexBuffer();
   indexBuffer.setFillModeCd(MO.EG3dFillMode.Line);
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
MO.FE3dRulerBox = function FE3dRulerBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dSprite);
   o._outline  = MO.Class.register(o, new MO.AGetter('_outline'));
   o._style    = MO.Class.register(o, new MO.AGetter('_style'));
   o._rulerX   = null;
   o._rulerY   = null;
   o._rulerZ   = null;
   o.construct = MO.FE3dRulerBox_construct;
   o.setup     = MO.FE3dRulerBox_setup;
   o.upload    = MO.FE3dRulerBox_upload;
   return o;
}
MO.FE3dRulerBox_construct = function FE3dRulerBox_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._style = new SE3dRulerStyle();
   o._outline = new MO.SOutline3();
   var ruler = o._rulerX = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerY = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerZ = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
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
MO.FE3dShape = function FE3dShape(o){
   o = MO.Class.inherits(this, o, MO.FE3dFace);
   o._ready    = true;
   o.construct = MO.FE3dShape_construct;
   o.dispose   = MO.FE3dShape_dispose;
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
MO.FE3dShapeConsole = function FE3dShapeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._bitmaps  = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o.construct = MO.FE3dShapeConsole_construct;
   o.load      = MO.FE3dShapeConsole_load;
   o.loadUrl   = MO.FE3dShapeConsole_loadUrl;
   return o;
}
MO.FE3dShapeConsole_construct = function FE3dShapeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}
MO.FE3dShapeConsole_load = function FE3dShapeConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = MO.Class.create(MO.FE3rBitmapCubePack);
   }else{
      bitmap = MO.Class.create(MO.FE3rBitmapFlatPack);
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
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = MO.Class.create(MO.FE3dBitmapData);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
MO.FE3dShapeData = function FE3dShapeData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o._graphic  = null;
   o._texture  = null;
   o.construct = MO.FE3dShapeData_construct;
   o.beginDraw = MO.FE3dShapeData_beginDraw;
   o.endDraw   = MO.FE3dShapeData_endDraw;
   o.dispose   = MO.FE3dShapeData_dispose;
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
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
   canvasConsole.free(o._canvas);
   o._canvas = null;
   o._graphic = null;
   o._ready = true;
}
MO.FE3dShapeData_dispose = function FE3dShapeData_dispose(){
   var o = this;
   o.__base.FE3dFaceData.dispose.call(o);
}
MO.FE3dSphere = function FE3dSphere(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._outline              = null;
   o._splitCount           = MO.Class.register(o, new MO.AGetSet('_splitCount'), 8);
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = MO.FE3dSphere_construct;
   o.setup                 = MO.FE3dSphere_setup;
   return o;
}
MO.FE3dSphere_construct = function FE3dSphere_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._outline = new MO.SOutline3();
}
MO.FE3dSphere_setup = function FE3dSphere_setup(){
   var o = this;
   var context = o._graphicContext;
   var positions = new MO.TArray();
   var normals = new MO.TArray();
   var cr = o._splitCount * 2;
   var cz = o._splitCount;
   var stepr = Math.PI * 2 / cr;
   var stepz = Math.PI / cz;
   var count = 0;
   for(var rz = 0; rz <= cz; rz++){
      for(var r = 0; r < cr; r++){
         var radius = stepr * r - Math.PI;
         var radiusZ = stepz * rz - MO.RConst.PI_2;
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
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(new Float32Array(positions.memory()), 4 * 3, count);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('normal');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(new Float32Array(normals.memory()), 4 * 3, count);
   o.pushVertexBuffer(buffer);
   var indexes = new MO.TArray();
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
MO.FE3dVideo = function FE3dVideo(o){
   o = MO.Class.inherits(this, o, MO.FE3dFace);
   o.construct = MO.FE3dVideo_construct;
   o.testReady = MO.FE3dVideo_testReady;
   o.loadUrl   = MO.FE3dVideo_loadUrl;
   o.dispose   = MO.FE3dVideo_dispose;
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
   o._renderable = MO.Console.find(MO.FE3dVideoConsole).loadUrl(context, url);
   o._ready = false;
}
MO.FE3dVideo_dispose = function FE3dVideo_dispose(){
   var o = this;
   o.__base.FE3dFace.dispose.call(o);
}
MO.FE3dVideoConsole = function FE3dVideoConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._videos   = null;
   o._dataUrl  = '/cloud.resource.bitmap.wv'
   o.construct = MO.FE3dVideoConsole_construct;
   o.videos    = MO.FE3dVideoConsole_videos;
   o.load      = MO.FE3dVideoConsole_load;
   o.loadUrl   = MO.FE3dVideoConsole_loadUrl;
   return o;
}
MO.FE3dVideoConsole_construct = function FE3dVideoConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._videos = new MO.TDictionary();
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
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = MO.Class.create(MO.FE3rBitmapCubePack);
   }else{
      bitmap = MO.Class.create(MO.FE3rBitmapFlatPack);
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
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = MO.Class.create(MO.FE3dVideoData);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._videos.set(url, bitmap);
   return bitmap;
}
MO.FE3dVideoData = function FE3dVideoData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o._hVideo      = null;
   o.ohVideoLoad  = MO.FE3dVideoData_ohVideoLoad;
   o.ohVideoEnded = MO.FE3dVideoData_ohVideoEnded;
   o.construct    = MO.FE3dVideoData_construct;
   o.loadUrl      = MO.FE3dVideoData_loadUrl;
   o.process      = MO.FE3dVideoData_process;
   o.dispose      = MO.FE3dVideoData_dispose;
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
MO.FE3dFireworksParticle = function FE3dFireworksParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticle);
   o._angle                = MO.Class.register(o, new MO.AGetSet('_angle'), 0);
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._itemDelay            = MO.Class.register(o, new MO.AGetSet('_itemDelay'), 0);
   o._itemColor            = MO.Class.register(o, new MO.AGetter('_itemColor'));
   o._itemPosition         = MO.Class.register(o, new MO.AGetter('_itemPosition'));
   o._itemRotation         = MO.Class.register(o, new MO.AGetter('_itemRotation'));
   o._itemScale            = MO.Class.register(o, new MO.AGetter('_itemScale'));
   o._itemSpeed            = MO.Class.register(o, new MO.AGetSet('_itemSpeed'), 0);
   o._itemAcceleration     = MO.Class.register(o, new MO.AGetSet('_itemAcceleration'));
   o._itemAttenuation      = MO.Class.register(o, new MO.AGetSet('_itemAttenuation'), 0);
   o._itemSplittingNumber  = MO.Class.register(o, new MO.AGetSet('_itemSplittingNumber'), 0);
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o.construct             = MO.FE3dFireworksParticle_construct;
   o.setup                 = MO.FE3dFireworksParticle_setup;
   o.testInRange           = MO.FE3dFireworksParticle_testInRange;
   o.start                 = MO.FE3dFireworksParticle_start;
   o.dispose               = MO.FE3dFireworksParticle_dispose;
   return o;
}
MO.FE3dFireworksParticle_construct = function FE3dFireworksParticle_construct(){
   var o = this;
   o.__base.FE3dParticle.construct.call(o);
   o._itemColor = new MO.SColor4(1, 1, 1, 1);
   o._itemPosition = new MO.SPoint3(0, 0, 0);
   o._itemRotation = new MO.SVector3(0, 0, 0);
   o._itemScale = new MO.SVector3(1, 1, 1);
   o._itemAcceleration = new MO.SVector3(0, 0, 0);
}
MO.FE3dFireworksParticle_setup = function FE3dFireworksParticle_setup(){
   var o = this;
   o.__base.FE3dParticle.setup.call(o);
}
MO.FE3dFireworksParticle_testInRange = function FE3dFireworksParticle_testInRange(x, y){
   var o = this;
   var position = o._position;
   var idx = parseInt((x + 17) / 20 * 220);
   var idy = parseInt((y + 3) * 6);
   var index = (360 * (60 - idy) + idx) * 4;
   var data = o._data.data;
   if(index >= 0 && index < data.length){
      var r = data[index    ];
      var g = data[index + 1];
      var b = data[index + 2];
      var a = data[index + 3];
   }
   return r > 0;
}
MO.FE3dFireworksParticle_start = function FE3dFireworksParticle_start(){
   var o = this;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var angle = o._angle + angleSingle * i;
      var item = particleConsole.itemAlloc(MO.FE3dFireworksParticleItem);
      item.setParticle(o);
      item.setDelay(o._itemDelay);
      item.position().assign(o._itemPosition);
      item.direction().set(Math.sin(angle), Math.cos(angle), 0);
      item.scale().assign(o._itemScale);
      item.color().assign(o._itemColor);
      item.setSpeed(o._itemSpeed);
      item.acceleration().assign(o._itemAcceleration);
      item.setAttenuation(o._itemAttenuation);
      item.setSplittingDistance(3 + Math.random());
      item.setSplittingNumber(o._itemSplittingNumber);
      item.start();
      o.pushItem(item);
   }
}
MO.FE3dFireworksParticle_dispose = function FE3dFireworksParticle_dispose(){
   var o = this;
   o._itemColor = MO.Lang.Object.dispose(o._itemColor);
   o._itemPosition = MO.Lang.Object.dispose(o._itemPosition);
   o._itemRotation = MO.Lang.Object.dispose(o._itemRotation);
   o._itemScale = MO.Lang.Object.dispose(o._itemScale);
   o._itemAcceleration = MO.Lang.Object.dispose(o._itemAcceleration);
   o.__base.FE3dParticle.dispose.call(o);
}
MO.FE3dFireworksParticleItem = function FE3dFireworksParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticleItem);
   o._priorPosition     = MO.Class.register(o, new MO.AGetter('_priorPosition'));
   o._direction         = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed             = MO.Class.register(o, new MO.AGetSet('_speed'), 0);
   o._acceleration      = MO.Class.register(o, new MO.AGetter('_acceleration'));
   o._attenuation       = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._splittingDistance = MO.Class.register(o, new MO.AGetSet('_splittingDistance'), 1);
   o._splittingNumber   = MO.Class.register(o, new MO.AGetSet('_splittingNumber'), 0);
   o._currentDistance   = null;
   o._currentSpeed      = null;
   o._currentDirection  = null;
   o._statusInRange = false;
   o._storeSpeed      = null;
   o.construct          = MO.FE3dFireworksParticleItem_construct;
   o.start              = MO.FE3dFireworksParticleItem_start;
   o.processSplit       = MO.FE3dFireworksParticleItem_processSplit;
   o.processFrame       = MO.FE3dFireworksParticleItem_processFrame;
   o.dispose            = MO.FE3dFireworksParticleItem_dispose;
   return o;
}
MO.FE3dFireworksParticleItem_construct = function FE3dFireworksParticleItem_construct(){
   var o = this;
   o.__base.FE3dParticleItem.construct.call(o);
   o._priorPosition = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._acceleration = new MO.SVector3();
   o._currentSpeed = new MO.SVector3();
   o._currentDirection = new MO.SVector3();
   o._storeSpeed = new MO.SVector3();
}
MO.FE3dFireworksParticleItem_start = function FE3dFireworksParticleItem_start(){
   var o = this;
   o.__base.FE3dParticleItem.start.call(o);
   o._priorPosition.assign(o._position);
   o._currentDistance = 0;
   o._currentAlpha = 1;
   var direction = o._direction;
   var speed = o._speed;
   o._currentSpeed.x = direction.x * speed;
   o._currentSpeed.y = direction.y * speed;
   o._currentSpeed.z = direction.z * speed;
}
MO.FE3dFireworksParticleItem_processSplit = function FE3dFireworksParticleItem_processSplit(){
   var o = this;
   var particle = o._particle;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   for(var j = 0; j < 4; j++){
      var count = 16;
      var angleSingle = Math.PI * 2 / count;
      for(var i = 0; i < count; i++){
         var angle = angleSingle * i;
         var item = particleConsole.itemAlloc(MO.FE3dFireworksParticleItem);
         item.setSplittingNumber(0);
         item.setParticle(particle);
         item.direction().set(Math.sin(angle), Math.cos(angle), 0);
         item.position().assign(position);
         item.color().assign(o._color);
         item.scale().setAll(0.2);
         item.setDelay(0.02 * j);
         item.setSpeed(o._speed);
         item.acceleration().assign(o._acceleration);
         item.setAttenuation(1);
         item.start();
         particle.pushItem(item);
      }
   }
}
MO.FE3dFireworksParticleItem_processFrame = function FE3dFireworksParticleItem_processFrame(second){
   var o = this;
   var priorPosition = o._priorPosition;
   priorPosition.assign(o._position);
   var position = o._position;
   var inRange = o._particle.testInRange(position.x, position.y);
   if(o._statusInRange != inRange){
      if(inRange){
         o._storeSpeed.assign(o._currentSpeed);
         o._currentSpeed.setAll(0.01);
         o._color.set(1, 0, 0, 1);
      }else{
         o._color.set(1, 1, 1, 1);
         o._currentSpeed.assign(o._storeSpeed);
      }
      o._statusInRange = inRange;
   }
   var speed = o._currentSpeed;
   var distanceX = speed.x * second;
   var distanceY = speed.y * second;
   var distanceZ = speed.z * second;
   var position = o._position;
   position.x += distanceX;
   position.y += distanceY;
   position.z += distanceZ;
   var direction = o._direction;
   direction.x = position.x - priorPosition.x;
   direction.y = position.y - priorPosition.y;
   direction.z = position.z - priorPosition.z;
   o._currentDistance += direction.length();
   direction.normalize();
   var angle = Math.acos(direction.x);
   if(direction.y > 0){
      o._rotation.z = angle;
   }else{
      o._rotation.z = Math.PI * 2 - angle;
   }
   var acceleration = o._acceleration;
   speed.x += acceleration.x * second;
   speed.y += acceleration.y * second;
   speed.z += acceleration.z * second;
   var attenuation = o._attenuation * second;
   if(attenuation > o._currentAlpha){
      o._currentAlpha = 0;
      o._currentFinish = true;
   }else{
      o._currentAlpha -= attenuation;
   }
   if((o._splittingNumber > 0) && (o._currentDistance > o._splittingDistance)){
      o.processSplit();
      o._splittingNumber--;
      if(o._splittingNumber == 0){
         o._currentFinish = true;
      }
   }
   o.dirty();
}
MO.FE3dFireworksParticleItem_dispose = function FE3dFireworksParticleItem_dispose(){
   var o = this;
   o._priorPosition = MO.Lang.Object.dispose(o._priorPosition);
   o._direction = MO.Lang.Object.dispose(o._direction);
   o.__base.FE3dParticleItem.dispose.call(o);
}
MO.FE3dParticle = function FE3dParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._items                = MO.Class.register(o, new MO.AGetter('_items'));
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   o.construct             = MO.FE3dParticle_construct;
   o.setup                 = MO.FE3dParticle_setup;
   o.testReady             = MO.FE3dParticle_testReady;
   o.findTexture           = MO.FE3dParticle_findTexture;
   o.textures              = MO.FE3dParticle_textures;
   o.material              = MO.FE3dParticle_material;
   o.setSize               = MO.FE3dParticle_setSize;
   o.setData               = MO.FE3dParticle_setData;
   o.loadUrl               = MO.FE3dParticle_loadUrl;
   o.createItem            = MO.FE3dParticle_createItem;
   o.pushItem              = MO.FE3dParticle_pushItem;
   o.process               = MO.FE3dParticle_process;
   o.upload                = MO.FE3dParticle_upload;
   o.dispose               = MO.FE3dParticle_dispose;
   return o;
}
MO.FE3dParticle_construct = function FE3dParticle_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._items = new MO.TLooper();
}
MO.FE3dParticle_setup = function FE3dParticle_setup(){
   var o = this;
   var context = o._graphicContext;
   o._vertexCount = 0;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var buffer = o._indexBuffer = context.createIndexBuffer();
   o.pushIndexBuffer(buffer);
}
MO.FE3dParticle_testReady = function FE3dParticle_testReady(){
   var o = this;
   if(!o._ready){
      o._ready = o._renderable.testReady();
   }
   return o._ready;
}
MO.FE3dParticle_findTexture = function FE3dParticle_findTexture(p){
   return this._renderable.findTexture(p);
}
MO.FE3dParticle_textures = function FE3dParticle_textures(){
   return this._renderable.textures();
}
MO.FE3dParticle_material = function FE3dParticle_material(){
   return this._renderable.material();
}
MO.FE3dParticle_setSize = function FE3dParticle_setSize(width, height){
   var o = this;
}
MO.FE3dParticle_setData = function FE3dParticle_setData(data){
   this._renderable = data;
}
MO.FE3dParticle_loadUrl = function FE3dParticle_loadUrl(url){
   var o = this;
   var context = o._graphicContext;
   o._renderable = RConsole.find(FE3dParticleConsole).loadUrl(context, url);
   o._ready = false;
}
MO.FE3dParticle_createItem = function FE3dParticle_createItem(){
   var o = this;
   var item = MO.Class.create(MO.FE3dParticleItem);
   o.pushItem(item);
   return o;
}
MO.FE3dParticle_pushItem = function FE3dParticle_pushItem(item){
   this._items.push(item);
}
MO.FE3dParticle_process = function FE3dParticle_process(){
   var o = this;
   o.__base.FE3dRenderable.process.call(o);
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var items = o._items;
   items.record();
   while(items.next()){
      var item = items.current();
      if(item.currentFinish()){
         items.removeCurrent();
         particleConsole.itemFree(item);
      }
      item.process();
   }
   if(!items.isEmpty()){
      o.upload();
   }
}
MO.FE3dParticle_upload = function FE3dParticle_upload(){
   var o = this;
   var context = o._graphicContext;
   var items = o._items;
   var count = items.count();
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPositionIndex = 0;
   var vertexPositionData = new Float32Array(3 * vertexCount);
   var vertexCoordIndex = 0;
   var vertexCoordData = new Float32Array(2 * vertexCount);
   var vertexColorIndex = 0;
   var vertexColorData = new Uint8Array(4 * vertexCount);
   var indexIndex = 0;
   var indexData = new Uint16Array(2 * 6 * count);
   var visibleCount = 0;
   items.record();
   var index = 0;
   while(items.next()){
      var item = items.current();
      if(!item.visible()){
         continue;
      }
      var matrix = item.currentMatrix();
      var color = item.color();
      var red = parseInt(255 * MO.Lang.Float.toRange(color.red, 0, 1));
      var green = parseInt(255 * color.green);
      var blue = parseInt(255 * color.blue);
      var alpha = parseInt(255 * item.currentAlpha());
      matrix.transform(vertexPositionData, 12 * index, MO.Lang.Math.faceCenterPositions, 0, 4);
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      for(var i = 0; i < 4; i++){
         vertexColorData[vertexColorIndex++] = red;
         vertexColorData[vertexColorIndex++] = green;
         vertexColorData[vertexColorIndex++] = blue;
         vertexColorData[vertexColorIndex++] = alpha;
      }
      var positionIndex = 4 * index;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 1;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 3;
      index++;
   }
   o._vertexPositionBuffer.upload(vertexPositionData, 4 * 3, index);
   o._vertexCoordBuffer.upload(vertexCoordData, 4 * 2, index);
   o._vertexColorBuffer.upload(vertexColorData, 4 * 1, index);
   o._indexBuffer.upload(indexData, 6 * index);
}
MO.FE3dParticle_dispose = function FE3dParticle_dispose(){
   var o = this;
   o._items = MO.Lang.Object.dispose(o._items);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dParticleConsole = function FE3dParticleConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._pools    = MO.Class.register(o, new MO.AGetter('_pools'))
   o.onLoad    = MO.FE3dParticleConsole_onLoad;
   o.construct = MO.FE3dParticleConsole_construct;
   o.itemAlloc = MO.FE3dParticleConsole_itemAlloc;
   o.itemFree  = MO.FE3dParticleConsole_itemFree;
   o.dispose   = MO.FE3dParticleConsole_dispose;
   return o;
}
MO.FE3dParticleConsole_construct = function FE3dParticleConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o)
   o._pools = MO.Class.create(MO.FObjectPools);
}
MO.FE3dParticleConsole_itemAlloc = function FE3dParticleConsole_itemAlloc(clazz){
   var o = this;
   var code = MO.Class.name(clazz);
   var instance = o._pools.alloc(code);
   if(!instance){
      instance = MO.Class.create(clazz);
   }
   return instance;
}
MO.FE3dParticleConsole_itemFree = function FE3dParticleConsole_itemFree(item){
   var o = this;
   var code = MO.Class.name(item);
   o._pools.free(code, item);
}
MO.FE3dParticleConsole_dispose = function FE3dParticleConsole_dispose(){
   var o = this;
   o._pools = MO.Lang.Object.dispose(o._pools);
   o.__base.FConsole.dispose.call(o)
}
MO.FE3dParticleData = function FE3dParticleData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o.onImageLoad = MO.FE3dParticleData_onImageLoad;
   o.construct   = MO.FE3dParticleData_construct;
   o.loadUrl     = MO.FE3dParticleData_loadUrl;
   o.dispose     = MO.FE3dParticleData_dispose;
   return o;
}
MO.FE3dParticleData_onImageLoad = function FE3dParticleData_onImageLoad(event){
   var o = this;
   var image = event.sender;
   o._size.assign(image.size());
   o._texture.upload(image);
   image.dispose();
   o._ready = true;
}
MO.FE3dParticleData_construct = function FE3dParticleData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
   var material = o._material;
   var info = material.info();
   info.effectCode = 'control';
   info.optionAlpha = true;
   info.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dParticleData_loadUrl = function FE3dParticleData_loadUrl(url){
   var o = this;
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   o._ready = false;
}
MO.FE3dParticleData_dispose = function FE3dParticleData_dispose(){
   var o = this;
   o._hVideo = null;
   o.__base.FE3dFaceData.dispose.call(o);
}
MO.FE3dParticleItem = function FE3dParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._particle      = MO.Class.register(o, new MO.AGetSet('_particle'));
   o._visible       = MO.Class.register(o, new MO.AGetSet('_visible'), false);
   o._delay         = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._interval      = MO.Class.register(o, new MO.AGetter('_interval'), 1);
   o._position      = MO.Class.register(o, new MO.AGetter('_position'));
   o._rotation      = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale         = MO.Class.register(o, new MO.AGetter('_scale'));
   o._color         = MO.Class.register(o, new MO.AGetter('_color'));
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._currentAlpha  = MO.Class.register(o, new MO.AGetSet('_currentAlpha'), 0);
   o._currentFinish = MO.Class.register(o, new MO.AGetSet('_currentFinish'), false);
   o._startTick     = 0;
   o._lastTick      = 0;
   o._statusDirty   = false;
   o.construct      = MO.FE3dParticleItem_construct;
   o.start          = MO.FE3dParticleItem_start;
   o.processFrame   = MO.FE3dParticleItem_processFrame;
   o.process        = MO.FE3dParticleItem_process;
   o.dirty          = MO.FE3dParticleItem_dirty;
   o.dispose        = MO.FE3dParticleItem_dispose;
   return o;
}
MO.FE3dParticleItem_construct = function FE3dParticleItem_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._currentMatrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3(0, 0, 0);
   o._rotation = new MO.SVector3(0, 0, 0);
   o._scale = new MO.SVector3(1, 1, 1);
   o._color = new MO.SColor4(1, 1, 1, 1);
}
MO.FE3dParticleItem_start = function FE3dParticleItem_start(){
   var o = this;
   o._visible = false;
   o._currentAlpha = 1;
   o._currentFinish = false;
   o._startTick = MO.Timer.current();
   o._lastTick = 0;
}
MO.FE3dParticleItem_processFrame = function FE3dParticleItem_processFrame(second){
   var o = this;
}
MO.FE3dParticleItem_process = function FE3dParticleItem_process(){
   var o = this;
   var tick = MO.Timer.current();
   if(!o._visible){
      if(tick - o._startTick < o._delay){
         return;
      }
   }
   if(o._lastTick == 0){
      o._lastTick = tick;
      return false;
   }
   var span = tick - o._lastTick;
   if(span <= o._interval){
      return false;
   }
   var second = span / 1000;
   o.processFrame(second);
   o._lastTick = tick;
   if(o._statusDirty){
      var matrix = o._currentMatrix;
      matrix.tx = o._position.x;
      matrix.ty = o._position.y;
      matrix.tz = o._position.z;
      matrix.rx = o._rotation.x;
      matrix.ry = o._rotation.y;
      matrix.rz = o._rotation.z;
      matrix.sx = o._scale.x;
      matrix.sy = o._scale.y;
      matrix.sz = o._scale.z;
      matrix.updateForce();
      o._visible = true;
      o._statusDirty = false;
   }
}
MO.FE3dParticleItem_dirty = function FE3dParticleItem_dirty(){
   this._statusDirty = true;
}
MO.FE3dParticleItem_dispose = function FE3dParticleItem_dispose(){
   var o = this;
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o.__base.FObject.dispose.call(o);
}
MO.FE3dRainFontParticle = function FE3dRainFontParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticle);
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._delay                = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._speed                = MO.Class.register(o, new MO.AGetSet('_speed'), 1);
   o._angle                = MO.Class.register(o, new MO.AGetSet('_angle'), 0);
   o._acceleration         = MO.Class.register(o, new MO.AGetSet('_acceleration'), 0);
   o._attenuation          = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o.construct             = MO.FE3dRainFontParticle_construct;
   o.setup                 = MO.FE3dRainFontParticle_setup;
   o.testInRange           = MO.FE3dRainFontParticle_testInRange;
   o.start                 = MO.FE3dRainFontParticle_start;
   o.dispose               = MO.FE3dRainFontParticle_dispose;
   return o;
}
MO.FE3dRainFontParticle_construct = function FE3dRainFontParticle_construct(){
   var o = this;
   o.__base.FE3dParticle.construct.call(o);
}
MO.FE3dRainFontParticle_setup = function FE3dRainFontParticle_setup(){
   var o = this;
   o.__base.FE3dParticle.setup.call(o);
}
MO.FE3dRainFontParticle_testInRange = function FE3dRainFontParticle_testInRange(x, y){
   var o = this;
   var position = o._position;
   var idx = parseInt((x + 17) / 20 * 220);
   var idy = parseInt((y + 3) * 6);
   var index = (360 * (60 - idy) + idx) * 4;
   var data = o._data.data;
   if(index >= 0 && index < data.length){
      var r = data[index    ];
      var g = data[index + 1];
      var b = data[index + 2];
      var a = data[index + 3];
   }
   return r > 0;
}
MO.FE3dRainFontParticle_start = function FE3dRainFontParticle_start(){
   var o = this;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var value = parseInt(MO.Random.get() * 360) % 360;
      var item = particleConsole.itemAlloc(MO.FE3dRainFontParticleItem);
      item.setParticle(o);
      item.direction().set(0, -1, 0);
      item.position().set(0.1 * value - 12, 5, 0);
      item.rotation().set(0, 0, -Math.PI / 2);
      item.scale().set(0.1, 0.1, 0.1);
      item.setDelay(o._delay);
      item.setSpeed(o._speed);
      item.setAcceleration(o._acceleration);
      item.setAttenuation(o._attenuation);
      item.start();
      o.pushItem(item);
   }
}
MO.FE3dRainFontParticle_dispose = function FE3dRainFontParticle_dispose(){
   var o = this;
   o.__base.FE3dParticle.dispose.call(o);
}
MO.FE3dRainFontParticleItem = function FE3dRainFontParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticleItem);
   o._direction    = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed        = MO.Class.register(o, new MO.AGetSet('_speed'));
   o._acceleration = MO.Class.register(o, new MO.AGetSet('_acceleration'), 1);
   o._attenuation  = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._statusInRange = false;
   o._currentSpeed = 0;
   o._storeSpeed   = 0;
   o.construct    = MO.FE3dRainFontParticleItem_construct;
   o.start        = MO.FE3dRainFontParticleItem_start;
   o.processFrame = MO.FE3dRainFontParticleItem_processFrame;
   o.dispose      = MO.FE3dRainFontParticleItem_dispose;
   return o;
}
MO.FE3dRainFontParticleItem_construct = function FE3dRainFontParticleItem_construct(){
   var o = this;
   o.__base.FE3dParticleItem.construct.call(o);
   o._direction = new MO.SVector3();
}
MO.FE3dRainFontParticleItem_start = function FE3dRainFontParticleItem_start(){
   var o = this;
   o.__base.FE3dParticleItem.start.call(o);
   o._statusInRange = false;
   o._currentSpeed = o._speed;
   o._storeSpeed = 0;
   o._currentAlpha = 0.2;
   o._color.set(0.5, 0.5, 0.5, 1);
}
MO.FE3dRainFontParticleItem_processFrame = function FE3dRainFontParticleItem_processFrame(second){
   var o = this;
   var size = o._particle._graphicContext.size();
   var position = o._position;
   var inRange = o._particle.testInRange(position.x, position.y);
   var attenuation = o._attenuation * second;
   if(o._statusInRange != inRange){
      if(inRange){
         o._storeSpeed = o._currentSpeed;
         o._currentSpeed = 0.2;
         o._color.set(1, 0, 0, 1);
         o._currentAlpha = 1;
      }else{
         o._color.set(1, 1, 1, 1);
         o._currentAlpha = 0.2;
         o._currentSpeed = o._storeSpeed;
      }
      o._statusInRange = inRange;
   }
   var distance = o._currentSpeed * second;
   var direction = o._direction;
   position.x += direction.x * distance;
   position.y += direction.y * distance;
   position.z += direction.z * distance;
   o.dirty();
}
MO.FE3dRainFontParticleItem_dispose = function FE3dRainFontParticleItem_dispose(){
   var o = this;
   o._direction = MO.Lang.Object.dispose(o._direction);
   o.__base.FE3dParticleItem.dispose.call(o);
}
MO.FE3dMeshMergeProcessor = function FE3dMeshMergeProcessor(o){
   o = MO.Class.inherits(this, o, MO.FProcessor);
   o._typeName  = null;
   o._groupName = null;
   o._name      = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
MO.FE3dProcessServer = function FE3dProcessServer(o){
   o = MO.Class.inherits(this, o, MO.FProcessServer);
   o._typeName  = null;
   o._groupName = null;
   o._name      = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
var server = MO.Class.create(MO.FE3dProcessServer);
server.registerProcessor('engine3d.mesh.merge', MO.Class.create(MO.FE3dMeshMergeProcessor));
server.process();
