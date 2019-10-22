/* 共通 */
var backImgNo = '1';                    // 選択した背景の初期値
var battleMode = 0;                     // 戦闘モードかどうか
var bgmNo = 'A';                        // 選択した音楽の初期値
var chgFlg = 0;                         // 敵が変身したか判定するフラグ
var chgPer = 50;                        // 変身するHPの割合
var dmgmax = 1000;                      // ダメージレンジ(最大)
var dmgmin = 100;                       // ダメージレンジ(最小)
var escapeFlg = 0;                      // 逃げるが成功したか判定するフラグ
var fadeInTime = 1000;                  // フェードインの時間
var fadeOutTime = 1000;                 // フェードアウトの時間
var flushCounter = 6;                   // 点滅用カウンター
var flushInterval = 100;                // 点滅間隔
var flushTimer;                         // 点滅用タイマー
var getExpMax = 15;                     // 取得経験値(最大)
var getExpMin = 1;                      // 取得経験値(最小)
var hpDngPer = 20;                      // 残HP(瀕死)判定割合
var hpDngColor = "#dc143c"              // 残HP(瀕死)文字色
var hpmax = 10000;                      // HPレンジ(最大)
var hpmin = 5000;                       // HPレンジ(最小)
var hpSafeColor = "white"               // 残HP(安全)文字色
var hpWarnPer = 50;                     // 残HP(注意)判定割合
var hpWarnColor = "#ffa500";            // 残HP(注意)文字色
var lmtSp = 100;                        // SP限界値
var log = "";                           // メッセージログ
var spAcm = 10;                         // 攻撃時SP増加量
var spAcmChar = 50;                     // ためる時SP増加量
var spMaxFlg = 0;                       // SPがMAXになったか判定するフラグ
var useMagicMp = 20;                    // まほうで使用するMP量

/* 敵のパラメータ */
var mhp = 0;                            // 最大HP
var hp = 0;                             // 現在のHP
var hpbar = $('#hp-bar').width();       // HPゲージの幅
var setMob = 1;                         // 選択した敵の初期値
var oldSetMob = 1;                      // 最初に選択した敵を保持

/* 自分のパラメータ */
var myMhp = 0;                          // 最大HP(自分)
var myHp = 0;                           // 現在のHP(自分)
var myHpbar = $('#myhp-bar').width();   // HPゲージの幅(自分)
var myMmp = 200;                        // 最大MP(自分)
var myMp = 200;                         // 現在のMP(自分)
var myMsp = 100;                        // 最大SP(自分)
var mySp = 0;                           // 現在のSP(自分)
var mySpbar = 0;                        // SPゲージの幅(自分)
var lebel = 1;                          // レベル
var exp = 0;                            // 経験値
var exptable = [
11,
23,
35,
52,
70,
94,
137,
195,
262,
359,
463,
505
];
var myHpTable = [
10,
15,
23,
35,
53,
80,
120,
180,
270,
405,
608,
912,
1368
];
var myMpTable = [
0,
8,
12,
17,
24,
34,
48,
68,
96,
135,
189,
265,
371
];

/* ファイル関連 */
var btlBgmPath = "./sound/battle";      // 戦闘BGM
var backImgBoss = "./img/boss.jpg"      // ボス背景
var backImgPath = "./img/forest"        // 背景
var mobImgPath = "./img/mob"            // 敵画像

/*
 初期画面描画処理
*/
$(window).on('load', function() {
    // フィールドマップを非表示
    $('#canvas').css('display', 'none');
    // 設定項目非表示
    $('#settingArea').css('display', 'none');
    // レベルと経験値を非表示
    $('#status').css('display', 'none');

    // 戦闘ボタンを非表示
    $('#init-btn').css('display', 'none');
    // 戦闘ボタンを非表示
    $('#init-btn2').css('display', 'none');
    // フィールドボタンを非表示
    $('#field-btn').css('display', 'none');
    // データ削除ボタンを非表示
    $('#dataDel-btn').css('display', 'none');

    // 魔法エフェクト非表示
    $('#effect').css('visibility', 'hidden');
    // SPエフェクト非表示
    $('#sp-effect1').css('visibility', 'hidden');
    $('#sp-effect2').css('visibility', 'hidden');
    $('#sp-effect3').css('visibility', 'hidden');

    /**
     * 戦闘モード選択
     */
    $('#battleMode').on('click',function(){
        // 戦闘モードボタンを非表示
        $('#battleMode').css('display', 'none');
        // ストーリーモードボタンを非表示
        $('#storyMode').css('display', 'none');
        // 設定項目表示
        $('#settingArea').css('display', 'block');
        // 戦闘ボタンを非表示
        $('#init-btn').css('display', 'block');
        // 戦闘ボタンを非表示
        $('#init-btn2').css('display', 'block');
        battleMode = 1;
    });

    /*
     フィールド表示
    */
    $('#field-btn').on('click',function(){
        settingPhase = 0;
        // 設定画面を非表示
        $('#setting').css('display', 'none');
        // ステータス設定
        setMyStatus();
        // フィールドマップを表示
        $('#canvas').css('display', 'block');
        // フィールドBGM再生
        $('#field-bgm').get(0).play();
    });

    /*
     スタート処理
    */
    $('#init-btn').on('click',function(){
        // 入力チェック
        valid();
        // 設定画面を非表示
        $('#setting').css('display', 'none');

        // エンカウント
        encount();
        // 2秒後に初期処理開始
        setTimeout(function(){
            init();
        }, 2000);
    });

    /*
     短縮スタート
    */
    $('#init-btn2').on('click',function(){
        // 入力チェック
        valid();
        // 設定画面を非表示
        $('#setting').css('display', 'none');

        // 短縮版スタートは戦闘開始画面をスキップ
        init();
    });

    /*
     再戦
    */
    $('#retry-btn').on('click',function(){
        init();
    });

    /*
     データ保存
    */
    $('#save-btn').on('click',function(){
        var lineArr = [];
        // レベルと経験値を設定
        lineArr[0] = lebel;
        lineArr[1] = exp;
        var savedata = lineArr;
        localStorage.setItem('savedata', savedata);
        alert('セーブしました');
    });

    /**
     * ストーリーモード選択
     */
    $('#storyMode').on('click',function(){
        // セーブデータのロード
        loadData();
        // 戦闘モードボタンを非表示
        $('#battleMode').css('display', 'none');
        // ストーリーモードボタンを非表示
        $('#storyMode').css('display', 'none');
        // レベルと経験値を表示
        $('#status').css('display', 'block');
        // データ削除ボタンを表示
        $('#field-btn').css('display', 'block');
        // データ削除ボタンを表示
        $('#dataDel-btn').css('display', 'block');
    });

    /*
     データ削除
    */
    $('#dataDel-btn').on('click', function() {
        if (!confirm('本当に削除しますか？')) {
            return false;
        } else {
            localStorage.clear();
            alert('セーブデータを削除しました');
            // セーブデータのロード
            loadData();
        }
    });

    /*
     攻撃ボタン押下処理
    */
    $('#atk-btn').on('click', function() {
        // 連打防止のためいったん攻撃ボタンを非活性
        $('#atk-btn').prop('disabled', 'true');
        // ランダム要素取得
        var random1 = getRandom(0, 10);
        // 選択したコマンド取得
        var cmd = $('[name=command]').val();

        // 攻撃コマンド選択
        if (cmd == '1' || cmd == '2' || cmd == '9') {
            // ランダムが0ならミス
            if (random1 == 0 && cmd != '9') {
                // ミス効果音
                $('#miss-se').get(0).play();
                log += 'ミス！当たらない！\n';

                // ポップ表示
                $('#pop').addClass('miss-pop');
                $('#pop').html('MISS');
                // 0.5秒後に消す
                setTimeout(function() {
                    $('#pop').html('');
                    $('#pop').removeClass('miss-pop');
                }, 500);

            // ランダムが4なら敵HP回復
            } else if (random1 == 4 && cmd != '9') {
                // 戦闘モードの場合
                if (battleMode === 1) {
                    // 回復するHP量をランダムで決定
                    var cureHp = getRandom(100, 1000);
                    hp += cureHp;
                    // HP最大値を超えて回復した場合は最大に合わせる
                    if (mhp <= hp) {
                        hp = mhp;
                    }
                    $('#hp').html(hp + '/' + mhp);
                    // 残HPに応じてHPゲージ変更
                    $('#hp-bar').width(Math.floor((hp / mhp) * 100) + '%');
                    // HP最大値を超えて回復した場合は最大に合わせる
                    if (hpbar <= $('#hp-bar').width()) {
                        ('#hp-bar').width(hpbar);
                    }
                    // 回復効果音
                    $('#cure-se').get(0).play();
                    log += 'なんと敵のHPが' + cureHp + '回復した！\n';

                    // 回復量をポップ表示
                    $('#pop').addClass('cure-pop');
                    $('#pop').html(cureHp);
                    // 0.5秒後に消す
                    setTimeout(function() {
                        $('#pop').html('');
                        $('#pop').removeClass('cure-pop');
                    }, 500);
                } else {
                    log += '石につまづいてしまった！\n';
                }
            } else {
                // ランダムでダメージ生成
                var dmg = getRandom(dmgmin, dmgmax);

                // 魔法のときは通常よりダメージ倍率アップ
                if (cmd == '2') {
                    dmg = Math.round(dmg * 1.3);
                }

                // ひっさつのときは通常よりダメージ倍率アップ
                if (cmd == '9') {
                    dmg = Math.round(dmg * 3);
                }

                // ランダムが7かつ一定ダメージ以上なら会心の一撃
                if (random1 == 7 && dmg >= 700) {
                    dmg = Math.round(dmg * 1.5);
                    log += 'クリティカルダメージ！！ ';
                }

                // HPからダメージを減算
                hp -= dmg;
                if (hp <= 0) {
                    $('#hp').html(0 + '/' + mhp);
                } else {
                    $('#hp').html(hp + '/' + mhp);
                }
                // 残HPに応じてHPゲージ変更
                $('#hp-bar').width(Math.floor((hp / mhp) * 100) + '%');

                // ダメージをポップ表示
                $('#pop').addClass('hp-pop');
                $('#pop').html(dmg);
                // 0.5秒後に消す
                setTimeout(function() {
                    $('#pop').html('');
                    $('#pop').removeClass('hp-pop');
                }, 500);

                // 魔法を選択
                if (cmd == '2') {
                    // MPを減算
                    myMp -= useMagicMp;
                    if (myMp <= 0) {
                        $('#mymp').html(0 + '/' + myMmp);
                        // MPが尽きたら魔法を使えなくする
                        $('select#command option[value=2]').remove();
                    } else {
                        $('#mymp').html(myMp + '/' + myMmp);
                    }
                    // 残MPに応じてMPゲージ変更
                     $('#mymp-bar').width(Math.floor((myMp / myMmp) * 100) + '%');
                // ひっさつを選択
                } else if (cmd == '9') {
                    // SPを0にする
                    mySp = 0;
                    spMaxFlg = 0;
                    // SPに応じてSPゲージ変更
                    $('#mysp-bar').width(Math.floor((mySp / myMsp) * 100) + '%');
                    $('select#command option[value=9]').remove();
                }

                // 攻撃効果音
                if (cmd == '1') {
                    $('#atk-se').get(0).play();
                } else if (cmd == '2') {
                    $('#magic-se').get(0).play();
                    $('#effect').css('visibility', 'visible');
                    $('#effect').addClass('magic-effect');
                    setTimeout(function() {
                        $('#effect').css('visibility', 'hidden');
                    }, 400);
                    setTimeout(function() {
                        $('#effect').removeClass('magic-effect');
                    }, 1000);
                } else if (cmd == '9') {
                    $('#sp-se').get(0).play();
                    $('#sp-effect1').css('visibility', 'visible');
                    $('#sp-effect1').addClass('sp-effect');
                    setTimeout(function() {
                        $('#sp-se').get(0).pause();
                        $('#sp-se').get(0).currentTime = 0;
                        $('#sp-effect1').css('visibility', 'hidden');
                        $('#sp-effect1').removeClass('sp-effect');
                        $('#sp-se').get(0).play();
                        $('#sp-effect2').css('visibility', 'visible');
                        $('#sp-effect2').addClass('sp-effect');
                    }, 300);
                    setTimeout(function() {
                        $('#sp-se').get(0).pause();
                        $('#sp-se').get(0).currentTime = 0;
                        $('#sp-effect2').css('visibility', 'hidden');
                        $('#sp-effect2').removeClass('sp-effect');
                        $('#sp-se').get(0).play();
                        $('#sp-effect3').css('visibility', 'visible');
                        $('#sp-effect3').addClass('sp-effect');
                    }, 600);
                    setTimeout(function() {
                        $('#sp-effect3').css('visibility', 'hidden');
                        $('#sp-effect3').removeClass('sp-effect');
                    }, 900);
                }

                // 敵の点滅
                flushTimerSet();
                // 敵を揺らすクラスを追加
                $('#mob-img').removeClass('mob-move' + setMob);
                $('#mob-img').addClass('shake');
                // ふよふよしたやつを選んだときはもう１体も揺らす
                if (oldSetMob == 'A') {
                    $('#mob-img2').addClass('shake');
                }
                // 0.5秒後に敵を揺らすクラスを削除
                var $timer = setTimeout(function() {
                    $('#mob-img').removeClass('shake');
                    if (hp > 0) {
                        $('#mob-img').addClass('mob-move' + setMob);
                        // ふよふよしたやつを選んだときはもう１体も戻す
                        if (oldSetMob == 'A') {
                            $('#mob-img2').removeClass('shake');
                        }
                    }
                    clearTimeout($timer);
                }, 500);

                log += dmg + 'のダメージ\n';

                if (cmd != '9') {
                    // 攻撃する度にSP増加
                    chargeSp(spAcm);
                }

                // 戦闘モードの場合
                if (battleMode === 1) {
                    // 敵の体力が少なくなったら変身する
                    if (oldSetMob != 9999) {
                        if (chgFlg == 0 && Math.floor((hp / mhp) * 100) < chgPer && hp > 0 && myHp > 0) {
                            setTimeout(function(){
                                changeMob();
                            }, 200);
                        }
                    }
                }

                // 残りHPで文字色を変える
                hpColorChange('mob');

                // 敵のHPが0になったら終了
                if (hp <= 0) {
                    // 敵を倒した効果音
                    $('#end-se').get(0).play();

                    // BGM停止
                    $('#battle-bgm').get(0).pause();
                    $('#battle-bgm').get(0).currentTime = 0;
                    $('#battle-bgm2').get(0).pause();
                    $('#battle-bgm2').get(0).currentTime = 0;

                    // 敵の動きを停止
                    $('#mob-img').removeClass('mob-move' + setMob);
                    // 敵の非表示
                    $('#mob-img').fadeOut(fadeOutTime);

                    // ふよふよしたやつを選んだときはもう１体の停止と非表示
                    if (oldSetMob == 'A') {
                        $('#mob-img').removeClass('mob-moveA');
                        $('#mob-img2').removeClass('mob-moveB');
                        $('#mob-img2').fadeOut(fadeOutTime);
                    }

                    // HPゲージ変更
                    $('#hp-bar').width(0 + '%');

                    // 攻撃ボタン非表示
                    $('#atk-btn').css('display', 'none');
                    $('#command').css('visibility', 'hidden');
//                    // 再戦ボタンを表示
//                    $('#retry-btn').css('display', '');

                    log += '\n敵を倒した';
                    // 勝利BGM
                    $('#fanfare-se').get(0).play();

                    // 経験値をランダムで取得
                    var getExp = getRandom(getExpMin, getExpMax);
                    exp = parseInt(exp) + parseInt(getExp);
                    log += '\n' + getExp + 'の経験値を取得した';

                    // ストーリーーモードの場合
                    if (battleMode != 1) {
                        // レベルアップ判定
                        while(true){
                            if( exptable[lebel - 1] !== undefined ){
                                var nextLvExp = exptable[lebel - 1];
                                if(exp >= nextLvExp){
                                    //レベルアップ処理
                                    lebel++;
                                    log += '\nレベルアップ！レベルが' + lebel + 'になった';
                                } else {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                        // データセーブ
                        saveData();
                        battleEndFlg = 1;
                    }
                    // レベルに応じたHP設定
                    setMaxHp();
                    // レベルに応じMP設定
                    setMaxMp();
                }
            }

        // かいふくコマンド選択
        } else if (cmd == '3') {
            // 回復するHP量をランダムで決定
            var cureHp = getRandom(200, 2000);
            myHp += cureHp;
            // HP最大値を超えて回復した場合は最大に合わせる
            if (myMhp <= myHp) {
                myHp = myMhp;
            }
            $('#myhp').html(myHp + '/' + myMhp);
            // 残HPに応じてHPゲージ変更
            $('#myhp-bar').width(Math.floor((myHp / myMhp) * 100) + '%');
            // HP最大値を超えて回復した場合は最大に合わせる
            if (myHpbar <= $('#myhp-bar').width()) {
                ('#myhp-bar').width(myHpbar);
            }
            // 残りHPで文字色を変える
            hpColorChange();

            // 回復量をポップ表示
            $('#myPop').addClass('my-cure-pop');
            $('#myPop').html(cureHp);
            // 0.5秒後に消す
            setTimeout(function() {
                $('#myPop').html('');
                $('#myPop').removeClass('my-cure-pop');
            }, 500);

            // 回復効果音
            $('#cure-se').get(0).play();
            log += 'HPが' + cureHp + '回復！\n';

        // にげるコマンド選択
        } else if (cmd == '5') {
            // ランダム要素取得
            var random1 = getRandom(0, 10);

            // 偶数なら逃走成功
            if (random1 % 2 == 0) {
                $('#escape-se').get(0).play();
                // BGM停止
                $('#battle-bgm').get(0).pause();
                $('#battle-bgm').get(0).currentTime = 0;
                $('#battle-bgm2').get(0).pause();
                $('#battle-bgm2').get(0).currentTime = 0;

                // 敵の動きを停止
                $('#mob-img').stop(true);
                // 敵の非表示
                $('#mob-img').fadeOut(fadeOutTime);
                // ふよふよしたやつを選んだときはもう１体の停止と非表示
                if (oldSetMob == 'A') {
                    $('#mob-img2').stop(true);
                    $('#mob-img2').fadeOut(fadeOutTime);
                }

                // 攻撃ボタン非活性
                $('#atk-btn').css('visibility', 'hidden');
                $('#command').css('visibility', 'hidden');

                log += '逃走に成功した\n';
                escapeFlg = 1;
                battleEndFlg = 1;
            } else {
                log += '逃走に失敗した・・\n';
            }
        // ためるコマンド選択
        } else if (cmd == '4') {
            chargeSp(spAcmChar);
        }

        $('#message').html(log);
        $('#message').scrollTop(
                $('#message')[0].scrollHeight - $('#message').height()
        );

        // 敵のHPが残っている場合、敵の攻撃
        if (hp > 0 && escapeFlg == 0) {
            setTimeout(function() {
                // ランダム要素取得
                random1 = getRandom(0, 10);

                // ランダムでダメージ生成
                dmg = getRandom(dmgmin, dmgmax);

                // ランダムが7ならミス
                if (random1 == 7) {
                    // ミス効果音
                    $('#miss-se').get(0).play();
                    log += '敵の攻撃ミス！\n';

                    // ポップ表示
                    $('#myPop').addClass('my-miss-pop');
                    $('#myPop').html('MISS');
                    // 0.5秒後に消す
                    setTimeout(function() {
                        $('#myPop').html('');
                        $('#myPop').removeClass('my-miss-pop');
                    }, 500);
                } else {
                    // ランダムが0なら痛恨の一撃
                    if (random1 == 0) {
                        dmg = Math.round(dmg * 1.5);
                        log += '敵のクリティカル！! ';
                    }

                    // バランス調整で敵のダメージ軽減
                    dmg = Math.round(dmg * 0.8);

                    // HPからダメージを減算
                    myHp -= (dmg);
                    if (myHp <= 0) {
                        $('#myhp').html(0 + '/' + myMhp);
                    } else {
                        $('#myhp').html(myHp + '/' + myMhp);
                    }
                    // 残HPに応じてHPゲージ変更
                    $('#myhp-bar').width(Math.floor((myHp / myMhp) * 100) + '%');
                    // 残りHPで文字色を変える
                    hpColorChange();

                    // ダメージをポップ表示
                    $('#myPop').addClass('my-hp-pop');
                    $('#myPop').html(dmg);
                    // 0.5秒後に消す
                    setTimeout(function() {
                        $('#myPop').html('');
                        $('#myPop').removeClass('my-hp-pop');
                    }, 500);

                    $('#mobatk-se').get(0).play();
                    log += '敵から' + dmg + 'のダメージをくらった\n';

                    // 自分のHPが0になったらゲームオーバー
                    if (myHp <= 0) {
                        // BGM停止
                        $('#battle-bgm').get(0).pause();
                        $('#battle-bgm').get(0).currentTime = 0;
                        $('#battle-bgm2').get(0).pause();
                        $('#battle-bgm2').get(0).currentTime = 0;

                        // 敵の動きを停止
                        $('#mob-img').removeClass('mob-move' + setMob);
                        // 敵の非表示
                        $('#mob-img').fadeOut(fadeOutTime);
                        // ふよふよしたやつを選んだときはもう１体の停止と非表示
                        if (oldSetMob == 'A') {
                            $('#mob-img2').stop(true);
                            $('#mob-img2').fadeOut(fadeOutTime);
                        }

                        // HPゲージ変更
                        $('#myhp-bar').width(0 + '%');
                        // 攻撃ボタン非表示
                        $('#atk-btn').css('display', 'none');
                        $('#command').css('visibility', 'hidden');
                        // 戦闘モードの場合
                        if (battleMode === 1) {
                            // 再戦ボタン表示
                            $('#retry-btn').css('display', '');
                        }
                        log += '\n敵に倒された・・・';
                        // ゲームオーバーBGM
                        $('#gameover-se').get(0).play();
                    }
                }

                $('#message').html(log);
                $('#message').scrollTop(
                    $('#message')[0].scrollHeight - $('#message').height()
                );
            }, 800);
        }

        // 1秒後に攻撃ボタン活性化
        if (hp > 0) {
            setTimeout(function(){
                $('#atk-btn').prop('disabled', '');
            }, 1000);
        }
    });
});

/**
 * BGM変更処理
 */
function changeBgm() {
    // 音楽ファイルパス設定
    var bgmPath = btlBgmPath + 99 + ".mp3";
    $('#battle-bgm2').attr('src', bgmPath);
    $('#battle-bgm2').get(0).play();
}

/**
 * 敵画像変更処理
 */
function changeMob() {
    // 敵の非表示
    $('#mob-img').fadeOut(fadeOutTime);
    // 敵の動きを停止
    $('#mob-img').removeClass('mob-move' + setMob);
    // BGM停止
    $('#battle-bgm').get(0).pause();
    $('#battle-bgm').get(0).currentTime = 0;

    setTimeout(function(){
        // ふよふよしたやつを選んだときは固定の敵に変身
        if (setMob === 'A') {
            setMob = 'B1';
        } else {
            // 変身する敵をランダムで決定
            var chgMob;
            while(true){
                chgMob = getRandom(1, 5);
                // 同じ敵が選ばれたらやり直し
                if(chgMob != setMob){
                    setMob = chgMob;
                    break;
                }
            }
        }

        var imgPath = mobImgPath + setMob + ".png";
        // 画像ファイルパス設定
        $('#mob-img').attr('src', imgPath);

        // ふよふよしたやつを選んだときはもう１体追加
        if (oldSetMob === 'A') {
            setMob = 'B2';
            var imgPath = mobImgPath + setMob + ".png";
            $('#mob-img2').attr('src', imgPath);
            $('#img2').css('display', 'block');
        }

        // 敵が変身済みに更新
        chgFlg = 1;
        // BGM変更
        changeBgm();

        if (oldSetMob === 'A') {
            $('#mob-img').addClass('mob-moveA');
            $('#mob-img2').addClass('mob-moveB');
        } else {
            $('#mob-img').addClass('mob-move' + setMob)
        }
        // 敵の表示
        $('#mob-img').fadeIn(500);
    }, 1000);

    log += '敵の姿が変わった！\n';
}

/**
 * SPチャージ処理
 * @param {Number} num 増加量
 */
function chargeSp(num) {
    // 増加量を現在のSPに加算
    mySp += num;
    // SP最大値を超えた場合は最大に合わせる
    if (myMsp <= mySp) {
        mySp = myMsp;
    }
    // SPに応じてSPゲージ変更
    $('#mysp-bar').width(Math.floor((mySp / myMsp) * 100) + '%');

    // SPがMAXになったら必殺技使用可能
    if (mySp === lmtSp && spMaxFlg === 0) {
        $('select#command option[value=1]').before($('<option>').val('9').text('ひっさつ'));
        $('#command').val('9');
        spMaxFlg = 1;
    }
}

/**
 * 敵を点滅させる
 */
function flush() {
    //カウンターを1減少して0になったら、タイマーをクリア
    flushCounter --;
    if (flushCounter === 0) {
        clearInterval(flushTimer);
        flushCounter = 6;
        $('#mob-img').css('visibility', 'visible');
        $('#mob-img2').css('visibility', 'visible');
        return;
    }

    if ($('#mob-img').css('visibility') == 'visible') {
        $('#mob-img').css('visibility', 'hidden');
        $('#mob-img2').css('visibility', 'hidden');
    } else {
        $('#mob-img').css('visibility', 'visible');
        $('#mob-img2').css('visibility', 'visible');
    }
}

/**
 * 点滅用タイマー設定
 */
function flushTimerSet() {
    flushTimer = setInterval('flush()', flushInterval);
}

/**
 * 乱数生成処理
 * @param  {Number} min 最小値
 * @param  {Number} max 最大値
 * @return {Number} random ランダム生成値
 */
function getRandom(min, max) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
    return random;
}

/**
 * 残りHPで文字色を変える
 * @param {String} obj 敵か自分かの判定パラメータ
 */
function hpColorChange(obj) {
    // 敵のHP文字色を変える
    if ('mob' === obj) {
        if (Math.floor((hp / mhp) * 100) < hpDngPer) {
            $("#hp").css("color", hpDngColor);
        } else if (Math.floor((hp / mhp) * 100) < hpWarnPer) {
            $("#hp").css("color", hpWarnColor);
        } else {
            $("#hp").css("color", hpSafeColor);
        }
    // 自分のHP文字色を変える
    } else {
        if (Math.floor((myHp / myMhp) * 100) < hpDngPer) {
            $("#myhp").css("color", hpDngColor);
        } else if (Math.floor((myHp / myMhp) * 100) < hpWarnPer) {
            $("#myhp").css("color", hpWarnColor);
        } else {
            $("#myhp").css("color", hpSafeColor);
        }
    }
}

/**
 * 初期処理
 */
function init() {
    // 敵画像設定
    setMobImg();
    // 戦闘BGM設定
    setBattleMusic();
    // 背景設定
    setBackImg();
    // ダメージ設定
    setDamege();
    // 敵のステータス設定
    setMobStatus();
    // 戦闘モード時のみ毎回設定
    if (battleMode === 1) {
        // 自分のステータス設定
        setMyStatus();
    }
    // 初期化
    reset();

    // 敵のアニメーション設定
    if (setMob === 'A') {
        $('#mob-img').addClass('mob-moveA')
    } else {
        $('#mob-img').addClass('mob-move' + setMob)
    }

    // 敵の表示
    $('#mob-img').hide();
    $('#mob-img').fadeIn(fadeInTime, function() {
        // 攻撃ボタン活性
        $('#atk-btn').prop('disabled', '');
        log += '敵が現れた\n';
        $('#message').html(log);
    });
    settingPhase = 0;
}

/**
 * データロード処理
 */
function loadData() {
    var mydata = "";
    if(!localStorage.getItem('savedata')) {
        lebel = 1;
        exp = 0;
    } else {
        mydata = localStorage.getItem('savedata');
        // 配列にする
        var lineArr = [];
        lineArr = mydata.split(",");
        // レベルと経験値を設定
        lebel = lineArr[0];
        exp = lineArr[1];
    }
    // レベルと経験値を表示
    $('.lebel').html(lebel);
    $('.exp').html(exp);
}

/**
 * リセット処理
 */
function reset() {
    // セーブデータのロード
    loadData();

    // 音楽の停止
    $('#fanfare-se').get(0).pause();
    $('#fanfare-se').get(0).currentTime = 0;
    $('#gameover-se').get(0).pause();
    $('#gameover-se').get(0).currentTime = 0;
    $('#battle-bgm2').get(0).pause();
    $('#battle-bgm2').get(0).currentTime = 0;

    // 攻撃ボタン非活性
    $('#atk-btn').prop('disabled', 'true');
    // ボタンの表示・非表示
    $('#atk-btn').css('display', '');
    $('#atk-btn').css('visibility', 'visible');
    $('#command').css('visibility', 'visible');
    // 再戦ボタン非表示
    $('#retry-btn').css('display', 'none');

    // HP、MPの初期化
    $('#hp-bar').width(Math.floor((hp / mhp) * 100) + '%');
    $("#hp").css("color","white");
    $('#myhp-bar').width(Math.floor((myHp / myMhp) * 100) + '%');
    $("#myhp").css("color","white");
    if (myMmp > 0) {
        $('#mymp-bar').width(Math.floor((myMp / myMmp) * 100) + '%');
    } else {
        $('#mymp-bar').width(0);
    }

    // 敵2画像非表示
    $('#img2').css('display', 'none');
    // 戦闘開始画面を非表示
    $('#encount').css('display', 'none');
    // 戦闘画面を表示
    $('#main').css('display', 'block');

    // デフォルト「たたかう」を選択
    $('#command').val('1');
    // ストーリーモードの場合
    if (battleMode != 1) {
        // MPが足りない場合は「まほう」コマンド選択不可
        if (myMp <= useMagicMp) {
            $('select#command option[value=2]').remove();
        }
        // レベルが低い間は「回復」コマンド選択不可
        if (lebel <= 5) {
            $('select#command option[value=3]').remove();
        }
    }
    chgFlg = 0;
    escapeFlg = 0;
    log = '';
    $('#message').html(log);
}

/**
 * データセーブ処理
 */
function saveData() {
    var lineArr = [];
    // レベルと経験値を設定
    lineArr[0] = lebel;
    lineArr[1] = exp;
    var savedata = lineArr;
    localStorage.setItem('savedata', savedata);
}

/**
 * 背景設定処理
 */
function setBackImg() {
    // 選択した背景を設定
    backImgNo = $('[name=back-img]').val();
    // おまかせの場合
    if (backImgNo === '0') {
        // 背景をランダムで決定
        backImgNo = getRandom(1, 3);
    }
    var imgPath = backImgPath + backImgNo + ".jpg";
    // ボスの場合
    if (setMob === '9999') {
        imgPath = backImgBoss;
    }

    // ストーリーモードのボス戦
    if (battleBossFlg === 1) {
        imgPath = './img/dungeonBack.png'
    }
    // 画像ファイルパス設定
    $('#main').css('background-image', 'url('+ imgPath +')');
}

/**
 * 戦闘BGM設定処理
 */
function setBattleMusic() {
    // 選択した音楽を設定
    bgmNo = $('[name=bgm]').val();
    // おまかせの場合
    if (bgmNo === '0') {
        // 音楽をランダムで決定
        bgmNo = getRandom(1, 5);
    }
    // ボスの場合
    if (setMob === '9999') {
        bgmNo = 9999;
    }
    // 音楽ファイルパス設定
    var bgmPath = btlBgmPath + bgmNo + ".mp3";
    $('#battle-bgm').attr('src', bgmPath);
    // 音楽を再生
    $('#battle-bgm').get(0).play();
}

/**
 * ダメージ設定処理
 */
function setDamege() {
    // 戦闘モードの場合、入力値とランダムで生成
    if (battleMode === 1) {
        var setDmgMin = Number($('input[name="dmg-range-min"]').val());
        var setDmgMax = Number($('input[name="dmg-range-max"]').val());

        // ダメージ最小値の入力があれば入力値を設定する
        if (setDmgMin != '') {
            dmgmin = setDmgMin;
        }
        // ダメージ最大値の入力があれば入力値を設定する
        if (setDmgMax != '') {
            dmgmax = setDmgMax;
        }
    // ストーリーモードのボス戦
    } else if (battleBossFlg === 1) {
        dmgmin = 30;
        dmgmax = 100;
    } else {
        dmgmin = 1;
        dmgmax = 5;
    }
}

/**
 * 最大HPの設定
 */
function setMaxHp() {
    // レベルに応じたHP設定
    myMhp = myHpTable[lebel-1];

}

/**
 * 最大MPの設定
 */
function setMaxMp() {
    // レベルに応じMP設定
    myMmp = myMpTable[lebel-1];
}

/**
 * 敵画像設定処理
 */
function setMobImg() {
    // 戦闘モードの場合
    if (battleMode === 1) {
        // 選択した画像を設定
        setMob = $('[name=mob]').val();
    }
    if (setMob === 'A') {
        setMob = 'A';
    // おまかせの場合
    } else if (setMob === '0') {
        // 敵をランダムで決定
        setMob = getRandom(1, 5);
    }

    // ストーリーモードのボス戦
    if (battleBossFlg === 1) {
        setMob = '1';
    }

    oldSetMob = setMob;
    var imgPath = mobImgPath + setMob + ".png";
    // 画像ファイルパス設定
    $('#mob-img').attr('src', imgPath);

    // ボスの場合
    if (setMob === '9999') {
        $('.img-block img').css('width', '650px');
        $('.img-block img').css('hight', '320px');
    }
}

/**
 * 敵のステータス設定処理
 */
function setMobStatus() {
    // 戦闘モードの場合、入力値とランダムで生成
    if (battleMode === 1) {
        var setHpMin = Number($('input[name="hp-range-min"]').val());
        var setHpMax = Number($('input[name="hp-range-max"]').val());

        // HP最小値の入力があれば入力値を設定する
        if (setHpMin != '') {
            hpmin = setHpMin;
        }
        // HP最大値の入力があれば入力値を設定する
        if (setHpMax != '') {
            hpmax = setHpMax;
        }
    // ストーリーモードのボス戦
    } else if (battleBossFlg === 1) {
        hpmin = 600;
        hpmax = 1200;
    } else {
        hpmin = 5;
        hpmax = 10;
    }
    // ランダムで敵HP生成
    mhp = getRandom(hpmin, hpmax);
    // 敵HPを設定
    hp = mhp;
    $('#hp').html(hp + '/' + mhp);
}

/**
 * 自分のステータス設定処理
 */
function setMyStatus() {
    // 戦闘モードの場合、入力値とランダムで生成
    if (battleMode === 1) {
        var setHpMin = Number($('input[name="hp-range-min"]').val());
        var setHpMax = Number($('input[name="hp-range-max"]').val());

        // HP最小値の入力があれば入力値を設定する
        if (setHpMin != '') {
            hpmin = setHpMin;
        }
        // HP最大値の入力があれば入力値を設定する
        if (setHpMax != '') {
            hpmax = setHpMax;
        }

        // ランダムで自分のHP生成
        myMhp = getRandom(hpmin, hpmax);
    } else {
        // レベルに応じたHP設定
        myMhp = myHpTable[lebel-1];
        // レベルに応じMP設定
        myMmp = myMpTable[lebel-1];
    }

    // 自分のHPを設定
    myHp = myMhp;
    $('#myhp').html(myHp + '/' + myMhp);

    // 自分のMPを設定
    myMp = myMmp;
    $('#mymp').html(myMp + '/' + myMmp);

    // 自分のSPを設定
    mySp = getRandom(0, 100);
    $('#mysp-bar').width(Math.floor((mySp / myMsp) * 100) + '%');

    // SPがMAXになったら必殺技使用可能
    if (mySp === lmtSp && spMaxFlg === 0) {
        $('select#command option[value=1]').before($('<option>').val('9').text('ひっさつ'));
        $('#command').val('9');
        spMaxFlg = 1;
    }
}

/**
 * 設定値の入力チェック
 */
function valid() {
    var setHpMin = Number($('input[name="hp-range-min"]').val());
    var setHpMax = Number($('input[name="hp-range-max"]').val());
    var setDmgMin = Number($('input[name="dmg-range-min"]').val());
    var setDmgMax = Number($('input[name="dmg-range-max"]').val());

    // HP最大値チェック
    if (setHpMin != '' && setHpMax != '') {
        if (setHpMin >= setHpMax) {
            alert('HP最大値はHP最小値より大きい値を入力してください')
            return false;
        }
    }
    // ダメージ最大値チェック
    if (setDmgMin != '' && setDmgMax != '') {
        if (setDmgMin >= setDmgMax) {
            alert('ダメージ最大値はダメージ最小値より大きい値を入力してください')
            return false;
        }
    }
    // HP最小値、ダメージチェック
    if (setHpMin != '' && setDmgMin != '' && setDmgMax != '') {
        if (setDmgMin >= setHpMin || setDmgMax >= setHpMin) {
            alert('ダメージ値はHP最小値より小さい値を入力してください')
            return false;
        }
    }
}
