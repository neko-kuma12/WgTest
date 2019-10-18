var angle_x = 32;
var angle_y = 32;
var battleEndFlg = 0;
var canvas;
var canvasHeight = 576;
var canvasWidth = 992;
var counter;
var ctx;
var curMap;
var curPosX = 0;
var curPosY = 0;
var encountFlg = 0;
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
var message;
var mouseState = -1;
var move = 0;
var player;
var pos_x = 160;
var pos_y = 96;

var playerImg = './img/hiyoco.png';
var fieldImg = './img/field.png';
var fieldImg2 = './img/field2.png';
var fieldImg3 = './img/field3.png';

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

// ※未使用
function clientToCanvas(canvas, clientX, clientY) {
    var cx = clientX - canvas.offsetLeft + document.body.scrollLeft;
    var cy = clientY - canvas.offsetTop + document.body.scrollTop;
    var ret = {
        x: cx,
        y: cy
    };
    return ret;
}

// 描画メイン処理
function drawMain(ctx) {
    // キャンバスのクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // マップ描画
    drawMap(ctx);

    // プレイヤー描画
//    ctx.drawImage(player, 32, 64, 32, 32, pos_x, pos_y, 32, 32); //左
//   ctx.drawImage(player, 126, 32, 32, 32, pos_x, pos_y, 32, 32); //上
//    ctx.drawImage(player, 126, 64, 32, 32, pos_x, pos_y, 32, 32); //右
    ctx.drawImage(player, angle_x, angle_y, 32, 32, pos_x, pos_y, 32, 32); //下

    // ステータ描画
    drawStatus(ctx);
    // メッセージ描画
    drawMessage(ctx);
}

// マップ描画処理
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

        }
    }
}

// メッセージ描画処理
function drawMessage(ctx) {
    // メッセージ内容が存在しない場合
    if(!message){
        return;
    }
    // ウィンドウの色設定
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(280, 490, 550, 80);
    // 文字フォント設定
    ctx.font = "12px monospace";
    ctx.fillStyle = "#ffffff";
    // メッセージ描画
    ctx.fillText(message, 290, 500);
}

// ステータス描画処理
function drawStatus(ctx) {
    // ステータスウィンドウ
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(2, 2, 150, 150);
    // 文字フォント設定
    ctx.font = "24px monospace";
    ctx.fillStyle = "#ffffff";
    // ステータスを設定
    ctx.fillText("Lv", 10, 25)
    drawTextR(ctx, lebel,  138, 25);
    ctx.fillText("HP", 10, 50);
    drawTextR(ctx, myHp,  138, 50);
    ctx.fillText("MP", 10, 75);
    drawTextR(ctx, myMp,  138, 75);
    ctx.fillText("Ex", 10, 100);
    drawTextR(ctx, exp,  138, 100);
}

// テキスト右寄せ
function drawTextR(ctx, str, x, y) {
    ctx.textAlign = "right";
    ctx.fillText(str, x, y);
    ctx.textAlign = "left";
}

// エンカウント処理
function encount() {
    // フィールドBGM停止
    $('#field-bgm').get(0).pause();
    $('#field-bgm').get(0).currentTime = 0;
    // フィールドマップを非表示
    $('#canvas').css('display', 'none');
    // 戦闘開始画面を表示
    $('#encount').css('display', 'block');
    $('#encount').css('background-color', 'black');
    // 戦闘開始効果音
    $('#encount-se').get(0).play();
    // メッセージ表示
    $('#battle-start').addClass('fadein-start');
    encountFlg = 1;

    // 2秒後に初期処理開始
    setTimeout(function(){
        init();
    }, 2000);
}

// エンカウント判定
function encountJudge() {
    if (getRandom(0, 50) < 3) {
        // エンカウント処理
        encount();
    }
}

// 画像読み込み処理
function loadImage() {
    // プレイヤー画像読み込み
    player = new Image();
    player.src = playerImg;
    // マップ画像読み込み
    mapchip = new Image();
    mapchip.src = fieldImg;
    mapchip2 = new Image();
    mapchip2.src = fieldImg2;
    mapchip3 = new Image();
    mapchip3.src = fieldImg3;
}

// 画面サイズ設定
function setSize() {
    var canvas = $('#canvas').get(0);

    // キャンバスの幅と高さを変更
    $('#canvas').attr('width', window.innerWidth);
    $('#canvas').attr('height', window.innerHeight);

    ctx = canvas.getContext('2d');
}

// タイマー処理
function timer(ctx) {
    // 戦闘中は後続処理を行わない
    if (encountFlg === 1) {
        return;
    }

    // マップとプレイヤーを描画
    drawMain(ctx);
    message = "";

    // キーイベント判定
    if (move === 0 ) {
        if (key.left === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            x--;
            if (curMap[y][x] === 4) {
                move = 32;
                key.push = 'left';
                encountJudge();
            }
            angle_x = 32;
            angle_y = 64;
        } else if (key.up === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            if (y > 0) {
                y--;
                if (curMap[y][x] === 4) {
                    move = 32;
                    key.push = 'up';
                    encountJudge();
                }
            }
            angle_x = 126;
            angle_y = 32;
        } else if (key.right === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            x++;
            if (curMap[y][x] === 4) {
                move = 32;
                key.push = 'right';
                encountJudge();
            }
            angle_x = 126;
            angle_y = 64;
        } else if (key.down === true) {
            var x = pos_x / 32;
            var y = pos_y / 32;
            if (y < 16) {
                y++;
                if (curMap[y][x] === 4) {
                    move = 32;
                    key.push = 'down';
                    encountJudge();
                }
            }
            angle_x = 32;
            angle_y = 32;
        }
    }

    // 座標移動
    if (move > 0) {
        move -= 32;
        if (key.push === 'left') pos_x -= 32;
        if (key.push === 'up') pos_y -= 32;
        if (key.push === 'right') pos_x += 32;
        if (key.push === 'down') pos_y += 32;
    }

//TODO
//    // ランダムエンカウント
//    if (pos_x === 224 && pos_y === 256 && encountFlg != 1) {
//        // エンカウントがループしないよう座標をずらしておく
//        pos_x = 224;
//        pos_y = 288;
//        message = "敵が現れた！";
//
//        // エンカウント処理
//        encount();
//
//        // 2秒後に初期処理開始
//        setTimeout(function(){
//            init();
//        }, 2000);
//    }

    // マップ間移動
    if (pos_x === 960 && pos_y === 288) {
        curMap = map2;
        pos_x = 32;
        pos_y = 288;
    } else if (pos_x === 0 && pos_y === 288) {
        curMap = map;
        pos_x = 928;
        pos_y = 288;
    }

//    ctx.fillText("Code = " + key.keyCode, 20, 120);
//    ctx.fillText(curPosX + ", " + curPosY + "(" + mouseState + ")", 20, 60);
//    counter++;
//    console.log(pos_x + ' , ' + pos_y);
}

// 画面ロード時処理
$(window).on('load', function() {
    // 画像読み込み
    loadImage();

    canvas = $('#canvas').get(0);
    ctx = canvas.getContext('2d');

    $('#canvas').attr('width', canvasWidth);
    $('#canvas').attr('height', canvasHeight);

    // 初期マップ設定
    curMap = map;

    // ブラウザサイズ変更時、canvasの幅と高さをリサイズ
    $(window).on('resize', function(){setSize()});
    // 一定間隔でタイマーイベント処理を行う
    setInterval(function(){timer(ctx)}, flame);
});

// キー入力(DOWN)イベント
$(window).keydown(function(ev) {
    // キーコード取得
    var keyCode = ev.keyCode;
    // 方向キーでブラウザがスクロールしないようにする
    ev.preventDefault();

    // 移動処理
    if (keyCode === keyCodeLeft) {
        key.left = true;
    } else if (keyCode === keyCodeUp) {
        key.up = true;
    } else if (keyCode === keyCodeRight) {
        key.right = true;
    }else if (keyCode === keyCodeDown) {
        key.down = true;
    }

    // エンターキーが押された場合
    if (keyCode === 13) {
        // 戦闘終了時のみ処理させる
        if (battleEndFlg == 1) {
            // 戦闘画面を非表示
            $('#main').css('display', 'none');
            // フラグを元に戻す
            encountFlg = 0;
            battleEndFlg = 0;
            // 効果音停止
            $('#fanfare-se').get(0).pause();
            $('#fanfare-se').get(0).currentTime = 0;
            setTimeout(function() {
                // フィールドBGM再生
                $('#field-bgm').get(0).play();
                // フィールド画面を表示
                $('#canvas').css('display', 'block');
            }, 100);
        }
    }
});

// キー入力(UP)イベント
$(window).keyup(function(ev) {
    // キーコード取得
    var keyCode = ev.keyCode;
    // 移動処理
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

//// マウス移動時イベント
//$(window).mousemove(function(ev) {
//    curPosX = ev.clientX;
//    curPosY = ev.clientY;
//    var pos = clientToCanvas(canvas, curPosX, curPosY);
//    curPosX = pos.x;
//    curPosY = pos.y;
//});

// マウスダウン時イベント
$(window).mousedown(function(ev) {
    mouseState = ev.button;
});

// マウスアップ時イベント
$(window).mouseup(function(ev) {
    mouseState = -1;
});
