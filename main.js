"use strict";

const CHRHEIGHT = 9; // キャラの高さ
const CHRWIDTH = 8; // キャラの幅
const FONT = "12px monospace"; // 使用フォント
const FONTSTYLE = "#ffffff"; // 文字色
const HEIGHT = 120; // 仮想画面の高さ
const WIDTH = 128; // 仮想画面の幅
const INTERVAL = 33; // フレーム呼び出し間隔
const MAP_HEIGHT = 32; // マップ高さ
const MAP_WIDTH = 32; // マップ幅
const SCR_HEIGHT = 8; // 画面タイルサイズの半分の高さ
const SCR_WIDTH = 8;// 画面タイルサイズの半分の幅
const SCROLL = 1; // スクロール速度
const SMOOTH = 0; // 補間処理
const START_HP = 20; // 開始HP
const START_X = 15; // 開始位置X
const START_Y = 17; // 開始位置Y
const TILECOLUMN = 4; // タイル桁数
const TILEROW = 4; // タイル行数
const TILESIZE = 8; // タイルサイズ(ドット）
const WNDSTYLE = "rgba(0, 0, 0, 0.75)"; // ウィンドウの色

const gKey = new Uint8Array(0x100); // キー入力バッファ

let gAngle = 0; // プレイヤーの向き
let gEx = 0; // プレイヤーの経験値
let gHP = START_HP; // プレイヤーのHP
let gMHP = START_HP; // プレイヤーの最大HP
let gLv = 1; // プレイヤーのレベル
let gCursor = 0; // カーソル位置
let gEnemyHP; // 敵HP
let gEnemyType; // 敵種別
let gFrame = 0; // 内部カウンタ
let gHeight; // 実画面の高さ
let gWidth; // 実画面の幅
let gMessage1 = null; // 表示メッセージ１
let gMessage2 = null; // 表示メッセージ２
let gMoveX = 0; // 移動量X
let gMoveY = 0; // 移動量Y
let gImgBoss; // ラスボス画像
let gImgMap; // マップ画像
let gImgMonster; // モンスター画像
let gImgPlayer; // プレイヤー画像
let gItem = 0; // 所持アイテム
let gOrder; // 行動順
let gPhase = 0; // 戦闘フェーズ
let gPlayerX = START_X * TILESIZE + TILESIZE / 2; // プレイヤー座標X
let gPlayerY = START_Y * TILESIZE + TILESIZE / 2; // プレイヤー座標Y
let gScreen; // 仮想画面

const gFileBoss = "./img/boss.png";
const gFileMap = "./img/map.png";
const gFileMonster = "./img/monster.png";
const gFilePlayer = "./img/player.png";

const gEncounter = [0, 0, 0, 1, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0]; // 敵エンカウント確率
const gMonsterName = ["スライム", "うさぎ", "ナイト", "ドラゴン", "魔王"]; // モンスター名称

// マップ
const gMap = [
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
 0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
 0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
 0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
 7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
];

// 戦闘行動処理
function action() {
    gPhase++; // フェーズ経過

    // 敵の行動順の場合
    if (((gPhase + gOrder) & 1) == 0) {
        if (gPhase == 3) {
            const d = getDamage(gEnemyType + 2);
            setMessage(gMonsterName[gEnemyType] + "の攻撃！", d + " のダメージ！");
            gHP -= d; // プレイヤーのHP減少
            // プレイヤーが死亡した場合
            if (gHP <= 0) {
                gPhase = 7; // 死亡フェーズ
            }
            return;
        }
    }

    // プレイヤーの行動順
    if (gCursor == 0) { //「戦う」選択時
        const d = getDamage(gLv + 1); // ダメージ計算結果取得
        setMessage("あなたの攻撃！", d + " のダメージ！");
        gEnemyHP -= d;
        if (gEnemyHP <= 0) {
            gPhase = 5;
        }
        return;
    }

    if (Math.random() < 0.5) { //「逃げる」成功時
        setMessage("あなたは逃げ出した", null);
        gPhase = 6;
        return;
    }

    // 「逃げる」失敗時
    setMessage("あなたは逃げ出した", "しかし回り込まれた！");
}

// 経験値加算
function addExp(val) {
    gEx += val; // 経験値加算
    // レベルアップ条件を満たしている場合
    while (gLv * (gLv + 1) * 2 <= gEx) {
        gLv++; // レベルアップ
        gMHP += 4 + Math.floor(Math.random() * 3); // 最大HP上昇4～6
    }
}

// 敵出現処理
function appearEnemy(t) {
    gPhase = 1; // 敵出現フェーズ
    gEnemyHP = t * 3 + 5; // 敵HP
    gEnemyType = t;
    setMessage("敵が現れた！", null);
}

// 戦闘コマンド
function commandFight() {
    gPhase = 2; // 戦闘コマンド選択フェーズ
    gCursor = 0;
    setMessage( "　戦う", "　逃げる" );
}

// 戦闘画面描画処理
function drawFight(ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 敵が生存している場合
    if (gPhase <= 5) {
        // ラスボスの場合
        if (isBoss()){
            ctx.drawImage(gImgBoss, WIDTH / 2 - gImgBoss.width / 2, HEIGHT / 2 - gImgBoss.height / 2);
        } else {
            let w = gImgMonster.width / 4;
            let h = gImgMonster.height;
            ctx.drawImage(gImgMonster, gEnemyType * w, 0, w, h, Math.floor( WIDTH / 2 - w / 2 ), Math.floor( HEIGHT / 2 - h / 2 ), w, h);
        }
    }
    // ステータス描画
    drawStatus(ctx);
    // メッセージ描画
    drawMessage(ctx);

    // 戦闘フェーズがコマンド選択中の場合
    if (gPhase == 2) {
        ctx.fillText("⇒", 6, 96 + 14 * gCursor); // カーソル描画
    }
}

// フィールド描画処理
function drawField(ctx) {
    let mx = Math.floor(gPlayerX / TILESIZE); // プレイヤーのタイル座標X
    let my = Math.floor(gPlayerY / TILESIZE); // プレイヤーのタイル座標Y

    for (let dy = -SCR_HEIGHT; dy <= SCR_HEIGHT; dy++ ) {
        let ty = my + dy; // タイル座標Y
        let py = (ty + MAP_HEIGHT) % MAP_HEIGHT; // ループ後タイル座標Y
        for (let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx++) {
            let tx = mx + dx; // タイル座標X
            let px = (tx + MAP_WIDTH) % MAP_WIDTH; // ループ後タイル座標X
            drawTile(ctx,
                    tx * TILESIZE + WIDTH / 2 - gPlayerX,
                    ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                    gMap[py * MAP_WIDTH + px]);
        }
    }

    // プレイヤー
    ctx.drawImage(gImgPlayer,
                (gFrame >> 4 & 1) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
                WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);

    // ステータスウィンドウ
    ctx.fillStyle = WNDSTYLE;
    ctx.fillRect(2, 2, 44, 37);

    // ステータス描画
    drawStatus(ctx);
    // メッセージ描画
    drawMessage(ctx); 
}

function drawMain() {
    // 仮想画面の2D描画コンテキストを取得
    const ctx = gScreen.getContext('2d');

    // マップ移動フェーズの場合
    if (gPhase <= 1) {
        // マップ描画
        drawField(ctx);
    } else {
        drawFight(ctx);
    }

/*
    // ウィンドウの色設定
    ctx.fillStyle = WNDSTYLE;
    ctx.fillRect(20, 3, 105, 15);

    // 文字フォント設定
    ctx.font = FONT;
    ctx.fillStyle = FONTSTYLE;
    ctx.fillText("x=" + gPlayerX + " y=" + gPlayerY + " m=" + gMap[ my * MAP_WIDTH + mx ], 25, 15);
*/
}

// メッセージ描画
function drawMessage(ctx) {
    // メッセージ内容が存在しない場合
    if(!gMessage1){
        return;
    }

    // ウィンドウの色設定
    ctx.fillStyle = WNDSTYLE;
    ctx.fillRect(4, 84, 120, 30);

    // 文字フォント設定
    ctx.font = FONT;
    ctx.fillStyle = FONTSTYLE;

    // メッセージ１行目描画
    ctx.fillText(gMessage1, 6, 96);
    // メッセージ２行目描画
    if (gMessage2) {
        ctx.fillText(gMessage2, 6, 110);
    }
}

// ステータス描画
function drawStatus(ctx) {
    // 文字フォント設定
    ctx.font = FONT;
    ctx.fillStyle = FONTSTYLE;
    // ステータスを設定
    ctx.fillText("Lv", 4, 13); // Lv
    drawTextR(ctx, gLv, 36, 13);
    ctx.fillText("HP", 4, 25); // HP
    drawTextR(ctx, gHP, 36, 25);
    ctx.fillText("Ex", 4, 37); // Ex
    drawTextR(ctx, gEx, 36, 37);
}

function drawTextR(ctx, str, x, y) {
    ctx.textAlign = "right";
    ctx.fillText(str, x, y);
    ctx.textAlign = "left";
}

function drawTile(ctx, x, y, idx) {
    const ix = (idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN ) * TILESIZE;
    ctx.drawImage(gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
}

// ダメージ量算出
function getDamage(a) {
    return(Math.floor(a * ( 1 + Math.random()))); // 攻撃力の１～２倍
}

function isBoss() {
    return(gEnemyType == gMonsterName.length - 1);
}

function LoadImage() {
    // ラスボス画像読み込み
    gImgBoss = new Image();
    gImgBoss.src = gFileBoss;
    // マップ画像読み込み
    gImgMap = new Image();
    gImgMap.src = gFileMap;
    // モンスター画像読み込み
    gImgMonster = new Image();
    gImgMonster.src = gFileMonster;
    // プレイヤー画像読み込み
    gImgPlayer = new Image();
    gImgPlayer.src = gFilePlayer;
}

// function setMessage( v1, v2 = null ) // IE対応
function setMessage(v1, v2) {
    gMessage1 = v1;
    gMessage2 = v2;
}

// IE対応
function sign(val) {
    if(val == 0) {
        return(0);
    }
    if (val < 0) {
        return(-1);
    }
    return(1);
}

// フィールド進行処理
function tickField() {

    if (gPhase != 0) {
        return;
    }

    // 移動中又はメッセージ表示中の場合
    if(gMoveX != 0 || gMoveY != 0 || gMessage1) {
    } else if(gKey[37]) {
        gAngle = 1;
        gMoveX = -TILESIZE; // 左
    } else if(gKey[38]) {
        gAngle = 3;
        gMoveY = -TILESIZE; // 上
    } else if(gKey[39]) {
        gAngle = 2;
        gMoveX =  TILESIZE; // 右
    } else if(gKey[40]) {
        gAngle = 0;
        gMoveY =  TILESIZE; // 下
    }

    // 移動後のタイル座標判定
    let mx = Math.floor((gPlayerX + gMoveX) / TILESIZE); // 移動後のタイル座標X
    let my = Math.floor((gPlayerY + gMoveY) / TILESIZE); // 移動後のタイル座標Y
    mx += MAP_WIDTH; // マップループ処理X
    mx %= MAP_WIDTH; // マップループ処理X
    my += MAP_HEIGHT; // マップループ処理Y
    my %= MAP_HEIGHT; // マップループ処理Y
    let m = gMap[my * MAP_WIDTH + mx]; // タイル番号
    // 侵入不可の地形の場合
    if (m < 3) {
        gMoveX = 0; // 移動禁止X
        gMoveY = 0; // 移動禁止Y
    }

    if (Math.abs( gMoveX ) + Math.abs( gMoveY ) == SCROLL ) { // マス目移動が終わる直前
        if (m == 8 || m == 9) { // お城
            gHP = gMHP; // HP全回復
            setMessage("魔王を倒して！", null);
        }

        if (m == 10 || m == 11) { // 街
            gHP = gMHP; // HP全回復
            setMessage("西の果てにも村が", "あります");
        }

        if (m == 12 ) { // 村
            gHP = gMHP; // HP全回復
            setMessage("カギは洞窟にあります", null);
        }

        if (m == 13) { // 洞窟
            gItem = 1; // カギ入手
            setMessage("カギを手に入れた", null);
        }

        if (m == 14) { // 扉
            // カギを保持していない場合
            if (gItem == 0 ) {
                gPlayerY -= TILESIZE; // １マス上へ移動
                setMessage("カギが必要です", null);
            } else {
                setMessage("扉が開いた", null);
            }
        }

        if (m == 15) { // ボス
            appearEnemy(gMonsterName.length - 1);
        }

        // ランダムエンカウント
        if (Math.random() * 8 < gEncounter[m]) {
            let t = Math.abs(gPlayerX / TILESIZE - START_X) +
                    Math.abs(gPlayerY / TILESIZE - START_Y);
            // マップタイプが林だった場合
            if (m == 6) {
                t += 8; // 敵レベルを0.5上昇
            }

            // マップタイプが山だった場合
            if (m == 7) {
                t += 16; // 敵レベルを1上昇
            }
            t += Math.random() * 8; // 敵レベルを0～0.5上昇
            t = Math.floor(t / 16);
            t = Math.min(t, gMonsterName.length - 2); // 上限処理
            appearEnemy(t);
        }
    }

    gPlayerX += sign(gMoveX) * SCROLL; // プレイヤー座標移動X
    gPlayerY += sign(gMoveY) * SCROLL; // プレイヤー座標移動Y
    gMoveX -= sign(gMoveX) * SCROLL; // 移動量消費X
    gMoveY -= sign(gMoveY) * SCROLL; // 移動量消費Y

    // マップループ処理
    gPlayerX += (MAP_WIDTH  * TILESIZE);
    gPlayerX %= (MAP_WIDTH  * TILESIZE);
    gPlayerY += (MAP_HEIGHT * TILESIZE);
    gPlayerY %= (MAP_HEIGHT * TILESIZE);
}

function paint() {
    drawMain();

    // canvasの設定
    const canvas = $('#main').get(0);
    // キャンバスのコンテキストを取得
    const ctx = canvas.getContext('2d');
    // 仮想画面のイメージを実画面へ転送
    ctx.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0,  gWidth, gHeight);
}

// 画面サイズ設定
function setSize() {
    var canvas = $('#main').get(0);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    // ドットをクッキリ表示
    ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = SMOOTH;

    // 実画面サイズを計測。ドットのアスペクト比を維持したままでの最大サイズを計測する。
    gWidth = canvas.width;
    gHeight = canvas.height;
    if (gWidth / WIDTH < gHeight / HEIGHT) {
        gHeight = gWidth * HEIGHT / WIDTH;
    } else {
        gWidth = gHeight * WIDTH / HEIGHT;
    }
}

// タイマーイベント発生時の処理
function timer() {
    if (!gMessage1) {
        // 内部カウンタを加算
        gFrame++;
        // フィールド進行処理
        tickField();
    }
    // 描画処理
    paint();
}

// キー入力(DOWN)イベント
$(window).keydown(function(ev) {
    // キーコード取得
    let c = ev.keyCode;
    // 既に押下中の場合（キーリピート）
    if (gKey[c] != 0) {
        return;
    }
    gKey[c] = 1;

    // 敵が現れた場合
    if (gPhase == 1) {
        // 戦闘コマンド
        commandFight();
        return;
    }

    // 戦闘コマンド選択中の場合
    if (gPhase == 2) {
        // Enterキー、又はZキーの場合
        if (c == 13 || c == 90) {
            gOrder = Math.floor(Math.random() * 2); // 戦闘行動順
            // 戦闘行動処理
            action();
        } else {
            gCursor = 1 - gCursor; // カーソル移動
        }
        return;
    }

    if (gPhase == 3) {
        // 戦闘行動処理
        action();
        return;
    }

    if (gPhase == 4) {
        // 戦闘コマンド
        commandFight();
        return;
    }

    if (gPhase == 5) {
        gPhase = 6;
        // 経験値加算
        addExp(gEnemyType + 1);
        setMessage("敵をやっつけた！", null);
        return;
    }

    if (gPhase == 6) {
        // 敵がラスボスで、かつ「戦う」選択時
        if (isBoss() && gCursor == 0){
            setMessage("魔王を倒し", "世界に平和が訪れた");
            return;
        }
        gPhase = 0; // マップ移動フェーズ
    }

    if (gPhase == 7) {
        gPhase = 8;
        setMessage("あなたは死亡した", null);
        return;
    }

    if (gPhase == 8) {
        setMessage("ゲームオーバー", null);
        return;
    }
    gMessage1 = null;
});

// キー入力(UP)イベント
$(window).keyup(function(ev) {
    gKey[ev.keyCode] = 0;
});

$(window).on('load', function() {
    LoadImage();

    // 仮想画面の設定
    gScreen = document.createElement('canvas');
    gScreen.width = WIDTH;
    gScreen.height = HEIGHT;

    // 画面サイズ初期化
    setSize();

    // ブラウザサイズ変更時、setSize()が呼ばれるよう指示
    $(window).on('resize', function(){setSize()});
    setInterval(function(){timer()}, 33); // 33ms間隔で、timer()を呼び出すよう指示
});
