//==========================================================
// <T>显示面板处理器。</T>
//
// @class
// @author maocy
// @history 151012
//==========================================================
MO.FEaiShowBoardProcessor = function FEaiShowBoardProcessor(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplayContainer);
   //..........................................................
   // @attribute
   o._optionArea    = false;
   o._boardArea     = null;
   o._boardCount    = 8;
   o._boardRotation = 0;
   o._boardRadius   = 700;
   o._autoPlay      = MO.Class.register(o, new MO.AGetter('_autoPlay'));
   o._boards        = MO.Class.register(o, new MO.AGetSet('_boards'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiShowBoardProcessor_construct;
   // @method
   o.setup          = MO.FEaiShowBoardProcessor_setup;
   o.setAutoPlay    = MO.FEaiShowBoardProcessor_setAutoPlay;
   o.showArea       = MO.FEaiShowBoardProcessor_showArea;
   o.process        = MO.FEaiShowBoardProcessor_process;
   // @method
   o.dispose        = MO.FEaiShowBoardProcessor_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_construct = function FEaiShowBoardProcessor_construct() {
   var o = this;
   o.__base.FE3dDisplayContainer.construct.call(o);
   // 配置属性
   o._boards = new MO.TObjects();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_setup = function FEaiShowBoardProcessor_setup() {
   var o = this;
   var boards = o._boards;
   // 创建面板
   for(var i = 1; i <= 8; i++){
      var board = MO.Class.create(MO.FEaiShowBoard);
      board.linkGraphicContext(o);
      board.setUrl('{eai.resource}/show1019/center/' + i + '.mp4');
      board.setup();
      boards.push(board);
      o.pushDisplay(board);
   }
   // 计算位置
   var count = boards.count();
   var angle = Math.PI * 2 / count;
   var radius = o._boardRadius;
   var rotation = o._boardRotation;
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      var boardAngle = angle * i;
      board.setRadius(boardAngle);
      var matrix = board.matrix();
      matrix.tx = Math.cos(boardAngle) * radius;
      matrix.tz = -Math.sin(boardAngle) * radius;
      matrix.updateForce();
   }
}

//==========================================================
// <T>设置自动播放。</T>
//
// @method
// @param flag:Boolean 标志
//==========================================================
MO.FEaiShowBoardProcessor_setAutoPlay = function FEaiShowBoardProcessor_setAutoPlay(flag){
   var o = this;
   // 设置面板
   var boards = o._boards;
   var count = boards.count();
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      board.play(flag);
   }
   // 设置可见性
   o.setVisible(flag);
}

//==========================================================
// <T>显示区域。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_showArea = function FEaiShowBoardProcessor_showArea(areaId){
   var o = this;
   o._optionArea = true;
   var board = o._boards.get(parseInt(areaId) - 1);
   MO.Assert.debugNotNull(board);
   o._boardArea = board;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_process = function FEaiShowBoardProcessor_process() {
   var o = this;
   o.__base.FE3dDisplayContainer.process.call(o);
   // 旋转处理
   var rotation = o._boardRotation;
   if(o._optionArea){
      rotation = o._boardArea.radius();
   }else{
      rotation += 0.0005;
   }
   rotation = rotation % (Math.PI * 2);
   // 设置旋转
   var matrix = o._matrix;
   matrix.ry = rotation;
   matrix.updateForce();
   o._boardRotation = rotation;
   // 逻辑处理
   var boards = o._boards;
   var count = boards.count();
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      var boardAngle = rotation + board.radius();
      var scale = Math.max(Math.sin(boardAngle) + 1, 0) * 0.5 + 0.1;
      var matrix = board.matrix();
      matrix.ry = -rotation;
      matrix.ty = -300 * scale + 100;
      matrix.sx = scale * scale;
      matrix.sy = scale * scale;
      matrix.updateForce();
      board.process();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_dispose = function FEaiShowBoardProcessor_dispose() {
   var o = this;
   o._boards = MO.Lang.Object.dispose(o._boards);
   // 配置属性
   o.__base.FE3dDisplayContainer.construct.call(o);
}
