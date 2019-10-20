var angle = 1;
var angle_x = 32;
var angle_y = 32;
var battleEndFlg = 0;
var battleBossFlg = 0;
var canvas;
var canvasHeight = 576;
var canvasWidth = 992;
var counter;
var ctx;
var curMap;
var curPosX = 0;
var curPosY = 0;
var encountFlg = 0;
var encountMax = 100;
var encountMin = 0;
var encountRt = 0;
var flame = 128;
var key = new Object();
    key.up = false;
    key.down = false;
    key.right = false;
    key.left = false;
    key.push = '';
var keyCodeLeft = 37;
var keyCodeUp = 38;
var keyCodeRight = 39;
var keyCodeDown = 40;
var mapchip;
var mapchip2;
var mapchip3;
var mapchipDungeon
var mapchipDungeon2;
var mapchipDungeon3;
var message;
var mob;
var motion = 0;
var mouseState = -1;
var move = 0;
var oldMotion = 0;
var player;
var pos_x = 160;
var pos_y = 96;

var playerImg = './img/hiyoco.png';
var mobImg = './img/mobchip.png'
var fieldImg = './img/field.png';
var fieldImg2 = './img/field2.png';
var fieldImg3 = './img/field3.png';
var dungeonImg = './img/dungeon.png';
var dungeonImg2 = './img/dungeon2.png';
var dungeonImg3 = './img/dungeon3.png';

var map = [
    ["A1", "A1", "B1", "A1", "C1", "A1", "D1", "B1", "B1", "A1", "A1", "C1", "A1", "F1", "F3", "B1", "A1", "B1", "C1", "B1", "A1", , "B1", "C1", "A1", "D1", "B1", "A1", "C1", "A1", "B1"],
    ["A2", "A2", "B2", "A2", "C2", "A2", "D2", "B2", "B2", "A2", "A2", "C2", "A2", "F2", "F4", "B2", "A2", "B2", "C2", "B2", "A2", 5, "B2", "C2", "A2", "D2", "B2", "A2", "C2", "A2", "B2"],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, "H1", "H2", 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3, "I1", "I3", 3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, "I2", "I4", 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 4, 3, 3, "J1", "J3", "J1", "J3", 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 4, 3, 3, "J2", "J4", "J2", "J4", 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3],
    [3, 3, 3, "E1", "E3", 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 3, 9, 3, 7, 9, 8, 3, 7, 8, 3, 4, 3, 3, 3, 3],
    [3, 3, 3, "E2", "E4", 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3],
    [3, 3, 3, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]

var map2 = [
    ["A1", "A1", "B1", "A1", "C1", "A1", "D1", "B1", "B1", "A1", "A1", "C1", "A1", "F1", "F3", "B1", "A1", "B1", "C1", "B1", "A1", , "B1", "C1", "A1", "D1", "B1", "A1", "C1", "A1", "B1"],
    ["A2", "A2", "B2", "A2", "C2", "A2", "D2", "B2", "B2", "A2", "A2", "C2", "A2", "F2", "F4", "B2", "A2", "B2", "C2", "B2", "A2", 5, "B2", "C2", "A2", "D2", "B2", "A2", "C2", "A2", "B2"],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, "K1", "K2", 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]

var map3 = [
    ["DG99", "DG94", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG93", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99"],
    ["DG99", "DG05", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG08", "DG93", "DG94", "DG02", "DG93", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99", "DG99"],
    ["DG94", "DG06", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG09", "DG08", "DG05", "DG03", "DG08", "DG93", "DG99", "DG94", "DG02", "DG02", "DG93", "DG99"],
    ["DG11", "DG07", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG10", "DG09", "DG06", "DG04", "DG09", "DG12", "DG94", "DG05", "DG03", "DG03", "DG08", "DG93"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG10", "DG07", "DG01", "DG10", "DG12", "DG11", "DG06", "DG04", "DG04", "DG09", "DG12"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG13", "DG14", "DG14", "DG14", "DG14", "DG14", "DG15", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG11", "DG07", "DG01", "DG01", "DG10", "DG12"],
    ["DG11", "DG01", "DG01", "DG13", "DG14", "DG14", "DG14", "DG15", "DG01", "DG01", "DG12", "DG99", "DG99", "DG99", "DG99", "DG99", "DG92", "DG14", "DG14", "DG14", "DG14", "DG14", "DG15", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG01", "DG12"],
    ["DG11", "DG01", "DG01", "DG12", "DG99", "DG99", "DG99", "DG11", "DG01", "DG01", "DG08", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG93", "DG99", "DG94", "DG02", "DG02", "DG05", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG01", "DG12"],
    ["DG11", "DG01", "DG01", "DG08", "DG93", "DG99", "DG99", "DG11", "DG01", "DG01", "DG09", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG08", "DG93", "DG11", "DG03", "DG03", "DG06", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG01", "DG12"],
    ["DG11", "DG01", "DG01", "DG09", "DG08", "DG93", "DG99", "DG11", "DG01", "DG01", "DG10", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG09", "DG12", "DG11", "DG04", "DG04", "DG07", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG13", "DG91"],
    ["DG11", "DG01", "DG01", "DG10", "DG09", "DG08", "DG93", "DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG10", "DG12", "DG11", "DG01", "DG01", "DG01", "DG01", "DG12", "DG11", "DG01", "DG01", "DG13", "DG91", "DG99"],
    ["DG11", "DG01", "DG01", "DG01", "DG10", "DG09", "DG12", "DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG92", "DG14", "DG14", "DG14", "DG14", "DG91", "DG11", "DG01", "DG01", "DG12", "DG99", "DG99"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG10", "DG12", "DG11", "DG01", "DG01", "DG01", "DG13", "DG14", "DG14", "DG14", "DG14", "DG15", "DG01", "DG08", "DG02", "DG02", "DG02", "DG02", "DG02", "DG02", "DG05", "DG01", "DG13", "DG91", "DG99", "DG99"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG12", "DG94", "DG02", "DG02", "DG02", "DG05", "DG01", "DG09", "DG03", "DG03", "DG03", "DG03", "DG03", "DG03", "DG06", "DG01", "DG12", "DG99", "DG99", "DG99"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG12", "DG11", "DG03", "DG03", "DG03", "DG06", "DG01", "DG10", "DG04", "DG04", "DG04", "DG04", "DG04", "DG04", "DG07", "DG01", "DG12", "DG99", "DG99", "DG99"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG12", "DG11", "DG04", "DG04", "DG04", "DG07", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG99", "DG99", "DG99"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG12", "DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG99", "DG99", "DG99"],
    ["DG11", "DG01", "DG01", "DG01", "DG01", "DG01", "DG12", "DG92", "DG14", "DG14", "DG14", "DG91", "DG92", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG14", "DG91", "DG99", "DG99", "DG99"]
]

// �����g�p
function clientToCanvas(canvas, clientX, clientY) {
    var cx = clientX - canvas.offsetLeft + document.body.scrollLeft;
    var cy = clientY - canvas.offsetTop + document.body.scrollTop;
    var ret = {
        x: cx,
        y: cy
    };
    return ret;
}

/**
 * �`�惁�C������
 */
function drawMain(ctx) {
    // �L�����o�X�̃N���A
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // �}�b�v�`��
    drawMap(ctx);

    // �v���C���[�`��
//    ctx.drawImage(player, 32, 64, 32, 32, pos_x, pos_y, 32, 32); //��
//    ctx.drawImage(player, 126, 32, 32, 32, pos_x, pos_y, 32, 32); //��
//    ctx.drawImage(player, 126, 64, 32, 32, pos_x, pos_y, 32, 32); //�E
    ctx.drawImage(player,  angle_x - motion, angle_y, 32, 32, pos_x, pos_y, 32, 32); //��

    if (curMap === map3) {
        ctx.drawImage(mob, 5, 5, 70, 70, 832, 352, 45, 45);
    
    }

    // �X�e�[�^�`��
    drawStatus(ctx);
    // ���b�Z�[�W�`��
    drawMessage(ctx);
}

/**
 * �}�b�v�`�揈��
 */
function drawMap(ctx) {
    for (var y = 0; y < curMap.length; y++) {
        for (var x = 0; x < curMap[y].length; x++) {
            if (curMap[y][x] === 0) ctx.drawImage(mapchip, 0, 64, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === 1) ctx.drawImage(mapchip, 32, 32, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "A1") ctx.drawImage(mapchip, 480, 128, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "A2") ctx.drawImage(mapchip, 480, 160, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "B1") ctx.drawImage(mapchip, 480, 64, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "B2") ctx.drawImage(mapchip, 480, 96, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "C1") ctx.drawImage(mapchip, 448, 0, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "C2") ctx.drawImage(mapchip, 448, 32, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "D1") ctx.drawImage(mapchip, 448, 64, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "D2") ctx.drawImage(mapchip, 448, 96, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "E1") ctx.drawImage(mapchip, 0, 448, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "E2") ctx.drawImage(mapchip, 0, 480, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "E3") ctx.drawImage(mapchip, 32, 448, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "E4") ctx.drawImage(mapchip, 32, 480, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "F1") ctx.drawImage(mapchip, 384, 0, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "F2") ctx.drawImage(mapchip, 384, 32, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "F3") ctx.drawImage(mapchip, 416, 0, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "F4") ctx.drawImage(mapchip, 416, 32, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "G1") ctx.drawImage(mapchip, 448, 128, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "G2") ctx.drawImage(mapchip, 448, 160, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "H1") ctx.drawImage(mapchip, 64, 480, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "H2") ctx.drawImage(mapchip, 96, 480, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "I1") ctx.drawImage(mapchip, 0, 288, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "I2") ctx.drawImage(mapchip, 0, 320, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "I3") ctx.drawImage(mapchip, 32, 288, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "I4") ctx.drawImage(mapchip, 32, 320, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "J1") ctx.drawImage(mapchip, 128, 288, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "J2") ctx.drawImage(mapchip, 128, 320, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "J3") ctx.drawImage(mapchip, 160, 288, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "J4") ctx.drawImage(mapchip, 160, 320, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "K1") ctx.drawImage(mapchip, 128, 480, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === "K2") ctx.drawImage(mapchip, 160, 480, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === 5) ctx.drawImage(mapchip, 0, 384, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === 6) ctx.drawImage(mapchip, 192, 352, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === 7) ctx.drawImage(mapchip, 192, 384, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === 8) ctx.drawImage(mapchip, 160, 384, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === 9) ctx.drawImage(mapchip, 160, 416, 32, 32, 32*x, 32*y, 32, 32);


            if (curMap[y][x] === 3) ctx.drawImage(mapchip2, 224, 0, 32, 32, 32*x, 32*y, 32, 32);
            if (curMap[y][x] === 4) ctx.drawImage(mapchip2, 192, 192, 32, 32, 32*x, 32*y, 32, 32);

            if (curMap[y][x] === "DG01") ctx.drawImage(mapchipDungeon, 0, 0, 32, 32, 32*x, 32*y, 32, 32);       // �_���W�����n��

            if (curMap[y][x] === "DG02") ctx.drawImage(mapchipDungeon2, 32, 64, 32, 32, 32*x, 32*y, 32, 32);    // �_���W������(����)�㕔
            if (curMap[y][x] === "DG03") ctx.drawImage(mapchipDungeon2, 32, 96, 32, 32, 32*x, 32*y, 32, 32);    // �_���W������(����)����
            if (curMap[y][x] === "DG04") ctx.drawImage(mapchipDungeon2, 32, 128, 32, 32, 32*x, 32*y, 32, 32);   // �_���W������(����)����

            if (curMap[y][x] === "DG05") ctx.drawImage(mapchipDungeon2, 64, 64, 32, 32, 32*x, 32*y, 32, 32);    // �_���W������(�E�[)�㕔
            if (curMap[y][x] === "DG06") ctx.drawImage(mapchipDungeon2, 64, 96, 32, 32, 32*x, 32*y, 32, 32);    // �_���W������(�E�[)����
            if (curMap[y][x] === "DG07") ctx.drawImage(mapchipDungeon2, 64, 128, 32, 32, 32*x, 32*y, 32, 32);   // �_���W������(�E�[)����

            if (curMap[y][x] === "DG08") ctx.drawImage(mapchipDungeon2, 0, 64, 32, 32, 32*x, 32*y, 32, 32);     // �_���W������(���[)�㕔
            if (curMap[y][x] === "DG09") ctx.drawImage(mapchipDungeon2, 0, 96, 32, 32, 32*x, 32*y, 32, 32);     // �_���W������(���[)����
            if (curMap[y][x] === "DG10") ctx.drawImage(mapchipDungeon2, 0, 128, 32, 32, 32*x, 32*y, 32, 32);    // �_���W������(���[)����

            if (curMap[y][x] === "DG11") ctx.drawImage(mapchipDungeon2, 64, 32, 32, 32, 32*x, 32*y, 32, 32);    // �_���W������(��)
            if (curMap[y][x] === "DG12") ctx.drawImage(mapchipDungeon2, 0, 32, 32, 32, 32*x, 32*y, 32, 32);     // �_���W������(�E)

            if (curMap[y][x] === "DG13") ctx.drawImage(mapchipDungeon2, 0, 0, 32, 32, 32*x, 32*y, 32, 32);      // �_���W������(�w��)���[
            if (curMap[y][x] === "DG14") ctx.drawImage(mapchipDungeon2, 32, 0, 32, 32, 32*x, 32*y, 32, 32);     // �_���W������(�w��)����
            if (curMap[y][x] === "DG15") ctx.drawImage(mapchipDungeon2, 64, 0, 32, 32, 32*x, 32*y, 32, 32);     // �_���W������(�w��)�E�[

            if (curMap[y][x] === "DG91") ctx.drawImage(mapchipDungeon2, 192, 0, 32, 32, 32*x, 32*y, 32, 32);    // �_���W�������h��(����)
            if (curMap[y][x] === "DG92") ctx.drawImage(mapchipDungeon2, 224, 0, 32, 32, 32*x, 32*y, 32, 32);    // �_���W�������h��(�E��)
            if (curMap[y][x] === "DG93") ctx.drawImage(mapchipDungeon2, 192, 32, 32, 32, 32*x, 32*y, 32, 32);    // �_���W�������h��(����)
            if (curMap[y][x] === "DG94") ctx.drawImage(mapchipDungeon2, 224, 32, 32, 32, 32*x, 32*y, 32, 32);    // �_���W�������h��(�E��)
            if (curMap[y][x] === "DG99") ctx.drawImage(mapchipDungeon2, 32, 32, 32, 32, 32*x, 32*y, 32, 32);    // �_���W�������h��

        }
    }
}

/**
 * �����ύX�i���j
 */
function changeAngleDown() {
    angle_x = 32;
    angle_y = 32;
}

/**
 * �����ύX�i���j
 */
function changeAngleLeft() {
    angle_x = 32;
    angle_y = 64;
}

/**
 * �����ύX�i�E�j
 */
function changeAngleRight() {
    angle_x = 126;
    angle_y = 64;
}

/**
 * �����ύX�i��j
 */
function changeAngleUp() {
    angle_x = 126;
    angle_y = 32;
}

/**
 * �����ύX
 */
function changeMotion() {
    if (motion === -32) {
        motion = 0;
        oldMotion = -32;
    } else if (motion === 0) {
        if (oldMotion === 32) {
            motion = -32;
        } else {
            motion = 32;
        }
    } else if (motion === 32) {
        motion = 0;
        oldMotion = 32;
    }
}

/**
 * ���b�Z�[�W�`�揈��
 */
function drawMessage(ctx) {
    // ���b�Z�[�W���e�����݂��Ȃ��ꍇ
    if(!message){
        return;
    }
    // �E�B���h�E�̐F�ݒ�
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(280, 490, 550, 80);
    // �����t�H���g�ݒ�
    ctx.font = "12px monospace";
    ctx.fillStyle = "#ffffff";
    // ���b�Z�[�W�`��
    ctx.fillText(message, 290, 510);
}

/**
 * �X�e�[�^�X�`�揈��
 */
function drawStatus(ctx) {
    // �X�e�[�^�X�E�B���h�E
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(2, 2, 150, 150);
    // �����t�H���g�ݒ�
    ctx.font = "24px monospace";
    ctx.fillStyle = "#ffffff";
    // �X�e�[�^�X��ݒ�
    ctx.fillText("Lv", 10, 25)
    drawTextR(ctx, lebel,  138, 25);
    ctx.fillText("HP", 10, 50);
    drawTextR(ctx, myHp,  138, 50);
    ctx.fillText("MP", 10, 75);
    drawTextR(ctx, myMp,  138, 75);
    ctx.fillText("Ex", 10, 100);
    drawTextR(ctx, exp,  138, 100);
}

/**
 * �e�L�X�g�E��
 */
function drawTextR(ctx, str, x, y) {
    ctx.textAlign = "right";
    ctx.fillText(str, x, y);
    ctx.textAlign = "left";
}

/**
 * �G���J�E���g����
 */
function encount() {
    // �t�B�[���hBGM��~
    $('#field-bgm').get(0).pause();
    $('#field-bgm').get(0).currentTime = 0;
    // �_���W����BGM��~
    $('#dungeon-bgm').get(0).pause();
    $('#dungeon-bgm').get(0).currentTime = 0;
    // �t�B�[���h�}�b�v���\��
    $('#canvas').css('display', 'none');
    // �퓬�J�n��ʂ�\��
    $('#encount').css('display', 'block');
    $('#encount').css('background-color', 'black');
    // �퓬�J�n���ʉ�
    $('#encount-se').get(0).play();
    // ���b�Z�[�W�\��
    $('#battle-start').addClass('fadein-start');
    encountFlg = 1;
    fieldPhase = 0;

    // 2�b��ɏ��������J�n
    setTimeout(function(){
        init();
    }, 2000);
}

/**
 * �G���J�E���g����
 */
function encountJudge() {
    if (getRandom(encountMin, encountMax) < encountRt) {
        // �G���J�E���g����
        encount();
    }
}

/**
 * �摜�ǂݍ��ݏ���
 */
function loadImage() {
    // �v���C���[�摜�ǂݍ���
    player = new Image();
    player.src = playerImg;
    // �G�摜�ǂݍ���
    mob = new Image();
    mob.src = mobImg;
    // �}�b�v�摜�ǂݍ���
    mapchip = new Image();
    mapchip.src = fieldImg;
    mapchip2 = new Image();
    mapchip2.src = fieldImg2;
    mapchip3 = new Image();
    mapchip3.src = fieldImg3;
    mapchipDungeon = new Image();
    mapchipDungeon.src = dungeonImg;
    mapchipDungeon2 = new Image();
    mapchipDungeon2.src = dungeonImg2;
    mapchipDungeon3 = new Image();
    mapchipDungeon3.src = dungeonImg3;
}

/**
 * �ړ��\����
 */
function movableJudge(y, x) {
    if (curMap[y][x] === 4 || curMap[y][x] === 6 || curMap[y][x] === "DG01") {
        return true;
    } else {
        return false;
    }
}

/**
 * ��ʃT�C�Y�ݒ�
 */
function setSize() {
    var canvas = $('#canvas').get(0);

    // �L�����o�X�̕��ƍ�����ύX
    $('#canvas').attr('width', window.innerWidth);
    $('#canvas').attr('height', window.innerHeight);

    ctx = canvas.getContext('2d');
}

/**
 * �^�C�}�[����
 */
function timer(ctx) {
    counter++;
    // �퓬���͌㑱�������s��Ȃ�
    if (encountFlg === 1) {
        return;
    }

    // �}�b�v�ƃv���C���[��`��
    drawMain(ctx);
    message = "";

    // �L�[�C�x���g����
    if (move === 0 ) {
        if (key.left === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            x--;
            if (movableJudge(y, x)) {
                move = 32;
                key.push = 'left';
                encountJudge();
            }
            changeAngleLeft();
            changeMotion();
            angle = 2;
        } else if (key.up === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            if (y > 0) {
                y--;
                if (movableJudge(y, x)) {
                    move = 32;
                    key.push = 'up';
                    encountJudge();
                }
            }
            changeAngleUp();
            changeMotion();
            angle = 3;
        } else if (key.right === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            x++;
            if (movableJudge(y, x)) {
                move = 32;
                key.push = 'right';
                encountJudge();
            }
            changeAngleRight();
            changeMotion();
            angle = 4;
        } else if (key.down === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            if (y < 16) {
                y++;
                if (movableJudge(y, x)) {
                    move = 32;
                    key.push = 'down';
                    encountJudge();
                }
            }
            changeAngleDown();
            changeMotion();
            angle = 1;
        }
    }

    // ���W�ړ�
    if (move > 0) {
        move -= 32;
        if (key.push === 'left') pos_x -= 32;
        if (key.push === 'up') pos_y -= 32;
        if (key.push === 'right') pos_x += 32;
        if (key.push === 'down') pos_y += 32;
    }

    // �}�b�v���C�x���g
    if (curMap === map) {
        // �}�b�v�ړ�
        if (pos_x === 960 && pos_y === 288) {
            curMap = map2;
            pos_x = 32;
            pos_y = 288;
        }
        // HP��MP�S��
        if (pos_x === 768 && pos_y === 224) {
            // �񕜌��ʉ�
            $('#cure-se').get(0).play();
            myHp = myMhp;
            myMp = myMmp;
        }
    } else if (curMap === map2) {
        // �}�b�v�ړ�
        if (pos_x === 0 && pos_y === 288) {
            curMap = map;
            pos_x = 928;
            pos_y = 288;
        }
        // �}�b�v�ړ�
        if (pos_x === 160 && pos_y === 256) {
            // ���y�̐؂�ւ�
            $('#field-bgm').get(0).pause();
            $('#field-bgm').get(0).currentTime = 0;
            $('#dungeon-bgm').get(0).play();
            curMap = map3;
            pos_x = 32;
            pos_y = 480;
            changeAngleUp();
        }
    } else if (curMap === map3) {
        // �}�b�v�ړ�
        if ((pos_x === 32 || pos_x === 64 || pos_x === 96 || pos_x === 128 || pos_x === 160) && pos_y === 512) {
            // ���y�̐؂�ւ�
            $('#dungeon-bgm').get(0).pause();
            $('#dungeon-bgm').get(0).currentTime = 0;
            $('#field-bgm').get(0).play();
            curMap = map2;
            pos_x = 160;
            pos_y = 288;
            changeAngleDown();
        }
        if (pos_x === 832 && pos_y === 384) {
            battleBossFlg = 1;
            // �G���J�E���g����
            encount();
            pos_x = 832;
            pos_y = 416;
        }
    }

    message = pos_x + ' , ' + pos_y;
//    ctx.fillText("Code = " + key.keyCode, 20, 120);
//    ctx.fillText(curPosX + ", " + curPosY + "(" + mouseState + ")", 20, 60);
//    console.log(pos_x + ' , ' + pos_y);
}

/**
 * ��ʃ��[�h������
 */
$(window).on('load', function() {
    // �摜�ǂݍ���
    loadImage();

    canvas = $('#canvas').get(0);
    ctx = canvas.getContext('2d');

    $('#canvas').attr('width', canvasWidth);
    $('#canvas').attr('height', canvasHeight);

    // �����}�b�v�ݒ�
    curMap = map;

    // �u���E�U�T�C�Y�ύX���Acanvas�̕��ƍ��������T�C�Y
    $(window).on('resize', function(){setSize()});
    // ���Ԋu�Ń^�C�}�[�C�x���g�������s��
    setInterval(function(){timer(ctx)}, flame);
});

/**
 * �L�[����(DOWN)�C�x���g
 */
$(window).keydown(function(ev) {
    //�ݒ��ʂ̓L�[���̓C�x���g�����ɂ���
    if (settingPhase === 1) return;

    // �L�[�R�[�h�擾
    var keyCode = ev.keyCode;
    // �����L�[�Ńu���E�U���X�N���[�����Ȃ��悤�ɂ���
    ev.preventDefault();

    // F5�Ń����[�h�ł���悤�ɂ���
    if (keyCode === 116) {
        location.reload();
    }

    // �G���^�[�L�[�������ꂽ�ꍇ
    if (keyCode === 13) {
        // �퓬�I�����̂ݏ���������
        if (battleEndFlg == 1) {
            // �퓬��ʂ��\��
            $('#main').css('display', 'none');
            // �t���O�����ɖ߂�
            encountFlg = 0;
            battleEndFlg = 0;
            // ���ʉ���~
            $('#fanfare-se').get(0).pause();
            $('#fanfare-se').get(0).currentTime = 0;
            setTimeout(function() {
                // �t�B�[���hBGM�Đ�
                $('#field-bgm').get(0).play();
                // �t�B�[���h��ʂ�\��
                $('#canvas').css('display', 'block');
            }, 100);
        }
    }

    // �ړ�����
    if (keyCode === keyCodeLeft) {
        key.left = true;
    } else if (keyCode === keyCodeUp) {
        key.up = true;
    } else if (keyCode === keyCodeRight) {
        key.right = true;
    }else if (keyCode === keyCodeDown) {
        key.down = true;
    }
});

/**
 * �L�[����(UP)�C�x���g
 */
$(window).keyup(function(ev) {
    // �L�[�R�[�h�擾
    var keyCode = ev.keyCode;
    // �ړ�����
    if (keyCode === keyCodeLeft) {
        key.left = false;
    } else if (keyCode === keyCodeUp) {
        key.up = false;
    } else if (keyCode === keyCodeRight) {
        key.right = false;
    }else if (keyCode === keyCodeDown) {
        key.down = false;
    }
});

/**
 * �}�E�X�ړ����C�x���g
 */
//$(window).mousemove(function(ev) {
//    curPosX = ev.clientX;
//    curPosY = ev.clientY;
//    var pos = clientToCanvas(canvas, curPosX, curPosY);
//    curPosX = pos.x;
//    curPosY = pos.y;
//});

/**
 * �}�E�X�_�E�����C�x���g
 */
$(window).mousedown(function(ev) {
    mouseState = ev.button;
});

/**
 * �}�E�X�A�b�v���C�x���g
 */
$(window).mouseup(function(ev) {
    mouseState = -1;
});
