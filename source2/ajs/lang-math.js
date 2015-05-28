with(MO){
   MO.SValue3 = function SValue3(x, y, z){
      var o = this;
      o.x           = RRuntime.nvl(x, 0);
      o.y           = RRuntime.nvl(y, 0);
      o.z           = RRuntime.nvl(z, 0);
      o.isEmpty     = SValue3_isEmpty;
      o.assign      = SValue3_assign;
      o.setMin      = SValue3_setMin;
      o.setMax      = SValue3_setMax;
      o.set         = SValue3_set;
      o.absolute    = SValue3_absolute;
      o.normalize   = SValue3_normalize;
      o.negative    = SValue3_negative;
      o.serialize   = SValue3_serialize;
      o.unserialize = SValue3_unserialize;
      o.parse       = SValue3_parse;
      o.toString    = SValue3_toString;
      return o;
   }
   MO.SValue3_isEmpty = function SValue3_isEmpty(p){
      return (this.x == 0) && (this.y == 0) && (this.z == 0);
   }
   MO.SValue3_assign = function SValue3_assign(value){
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
   }
   MO.SValue3_setMin = function SValue3_setMin(){
      this.x = Number.MIN_VALUE;
      this.y = Number.MIN_VALUE;
      this.z = Number.MIN_VALUE;
   }
   MO.SValue3_setMax = function SValue3_setMax(){
      this.x = Number.MAX_VALUE;
      this.y = Number.MAX_VALUE;
      this.z = Number.MAX_VALUE;
   }
   MO.SValue3_set = function SValue3_set(x, y, z){
      this.x = x;
      this.y = y;
      this.z = z;
   }
   MO.SValue3_normalize = function SValue3_normalize(){
      var value = this.absolute();
      if(value != 0){
         var rate = 1 / value;
         this.x *= rate;
         this.y *= rate;
         this.z *= rate;
      }
      return this;
   }
   MO.SValue3_absolute = function SValue3_absolute(){
      return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
   }
   MO.SValue3_negative = function SValue3_negative(value){
      var result = null;
      if(p){
         result = value;
      }else{
         result = new this.constructor();
      }
      result.x = -this.x;
      result.y = -this.y;
      result.z = -this.z;
      return result;
   }
   MO.SValue3_serialize = function SValue3_serialize(output){
      output.writeFloat(this.x);
      output.writeFloat(this.y);
      output.writeFloat(this.z);
   }
   MO.SValue3_unserialize = function SValue3_unserialize(input){
      this.x = input.readFloat();
      this.y = input.readFloat();
      this.z = input.readFloat();
   }
   MO.SValue3_parse = function SValue3_parse(value){
      var items = value.split(',')
      if(items.length == 3){
         this.x = parseFloat(items[0]);
         this.y = parseFloat(items[1]);
         this.z = parseFloat(items[2]);
      }else{
         throw new TError(o, "Parse value failure. (value={1})", value);
      }
   }
   MO.SValue3_toString = function SValue3_toString(){
      return this.x + ',' + this.y + ',' + this.z;
   }
}
with(MO){
   MO.SValue3 = function SValue4(x, y, z, w){
      var o = this;
      o.x           = RRuntime.nvl(x, 0);
      o.y           = RRuntime.nvl(y, 0);
      o.z           = RRuntime.nvl(z, 0);
      o.w           = RRuntime.nvl(w, 1);
      o.assign      = SValue4_assign;
      o.set         = SValue4_set;
      o.absolute    = SValue4_absolute;
      o.normalize   = SValue4_normalize;
      o.negative    = SValue4_negative;
      o.serialize   = SValue4_serialize;
      o.unserialize = SValue4_unserialize;
      o.parse       = SValue4_parse;
      o.toString    = SValue4_toString;
      return o;
   }
   MO.SValue4_assign = function SValue4_assign(value){
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
      this.w = value.w;
   }
   MO.SValue4_set = function SValue4_set(x, y, z, w){
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
   }
   MO.SValue4_absolute = function SValue4_absolute(){
      return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
   }
   MO.SValue4_normalize = function SValue4_normalize(){
      var value = this.absolute();
      if(value != 0){
         var rate = 1 / value;
         this.x *= rate;
         this.y *= rate;
         this.z *= rate;
         this.w *= rate;
      }
   }
   MO.SValue4_negative = function SValue4_negative(value){
      var result = null;
      if(value){
         result = value;
      }else{
         result = new this.constructor();
      }
      result.x = -this.x;
      result.y = -this.y;
      result.z = -this.z;
      result.w = -this.w;
      return result;
   }
   MO.SValue4_serialize = function SValue4_serialize(output){
      output.writeFloat(this.x);
      output.writeFloat(this.y);
      output.writeFloat(this.z);
      output.writeFloat(this.w);
   }
   MO.SValue4_unserialize = function SValue4_unserialize(input){
      this.x = input.readFloat();
      this.y = input.readFloat();
      this.z = input.readFloat();
      this.w = input.readFloat();
   }
   MO.SValue4_parse = function SValue4_parse(value){
      var items = value.split(',')
      if(items.length == 4){
         this.x = parseFloat(items[0]);
         this.y = parseFloat(items[1]);
         this.z = parseFloat(items[2]);
         this.w = parseFloat(items[3]);
      }else{
         throw new TError(o, "Parse value failure. (value={1})", value);
      }
   }
   MO.SValue4_toString = function SValue4_toString(){
      return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
   }
}
