var initCanvas;
var initContext;

var textDmgMax = 'ダメージ最大値';
var textDmgMin = 'ダメージ最小値';
var textHpMax = 'HP最大値';
var textHpMin = 'HP最小値';
var textTargetMob = '戦う敵';
var textTargetBackImg = '戦闘背景';
var textTargetBgm = '戦闘BGM';

var selectMob = ['おまかせ','精霊','悪魔','巨人','ガイコツ','死神','ふよふよしたやつ','ボス'];
var selectBackImg = ['おまかせ','昼','夕方','夜'];
var selectBgm = ['おまかせ','戦闘A','戦闘B','戦闘C','戦闘D','戦闘E'];

var setting;
var settingColor= '#ffffff';
var settingFont = 'normal 14px sans-serif';
var settingImg = './img/setting.png';
var settingPhase = 1;


/**
 * 設定画面画像読み込み処理
 */
function loadImageSetting() {
    // 画像読み込み
    setting = new Image();
    setting.src = settingImg;
}

/**
 * ボタン生成
 */
function createButton(x, y, id, val) {
    var e = document.createElement('input');
    e.style.position = 'absolute';
    e.type = 'button';
    e.id = id;
    e.value = val;
    e.style.left = x+'px';
    e.style.top = y+'px';
    return e;
}

/**
 * ボタン生成
 */
function createButtonL(x, y, id, val) {
    var e = document.createElement('input');
    e.style.position = 'absolute';
    e.type = 'button';
    e.id = id;
    e.value = val;
    e.style.left = x+'px';
    e.style.top = y+'px';
    return e;
}

/**
 * 入力フィールド生成
 */
function createInput(x, y, name) {
    var e = document.createElement('input');
    e.style.position = 'absolute';
    e.type = 'number';
    e.name = name;
    e.style.left = x+'px';
    e.style.top = y+'px';
    return e;
}

/**
 * テキストラベル生成
 */
function createLabel(x, y, text) {
    var e = document.createElement('div');
    e.style.position = 'absolute';
    e.style.font = settingFont;
    e.style.color = settingColor;
    e.style.textAlign = 'left';
    e.style.left = x+'px';
    e.style.top = y+'px';
    e.innerHTML = text;
    return e;
}

/**
 * プルダウン生成
 */
function createSelect(x, y, name, arr) {
    var i = 0;
    var len = arr.length;
    var e = document.createElement('select');
    e.name = name;
    while (i < len) {
        if (arr[i] === 'ふよふよしたやつ') {
            e.add((new Option(arr[i], 'A')));
        } else if (arr[i] === 'ボス') {
            e.add((new Option(arr[i], '9999')));
        } else {
            e.add((new Option(arr[i], i)));
        }
        i++;
    }
    e.style.position = 'absolute';
    e.style.textAlign = 'left';
    e.style.left = x+'px';
    e.style.top = y+'px';
    return e;
}

/**
 * 画面ロード時処理
 */
$(window).on('load', function() {
    // 画像読み込み
    loadImageSetting();

    initCanvas = $('#init').get(0);
    initContext = initCanvas.getContext('2d');

    $('#init').attr('width', canvasWidth);
    $('#init').attr('height', canvasHeight);

    // キャンバスのクリア
    initContext.clearRect(0, 0, canvas.width, canvas.height);
    // 画像描画
    initContext.drawImage(setting, 0, 0)

    // 設定画面を非表示
//    $('#init').css('display', 'none');

    var p = initCanvas.parentNode;
    p.appendChild(createButton(50, 50, 'battleMode', '戦闘モード'));
    p.appendChild(createButton(50, 100, 'storyMode', 'ストーリーモード'));

    /**
     * 戦闘モード選択
     */
    $('#battleMode').on('click',function(){
        // モード選択画面を非表示
//        $('#modeSelect').css('display', 'none');
        // 戦闘モードボタンを非表示
        $('#battleMode').css('display', 'none');
        // ストーリーモードボタンを非表示
        $('#storyMode').css('display', 'none');

        // キャンバスのクリア
//        initContext.clearRect(0, 0, canvas.width, canvas.height);
//        initCanvas = $('#init').get(0);
//        initContext = initCanvas.getContext('2d');

//        p = initCanvas.parentNode;

        p.appendChild(createLabel('10', '50', textTargetMob));
        p.appendChild(createLabel('10', '100', textTargetBgm));
        p.appendChild(createLabel('10', '150', textTargetBackImg));
        p.appendChild(createLabel('10', '200', textHpMin));
        p.appendChild(createLabel('10', '250', textHpMax));
        p.appendChild(createLabel('10', '300', textDmgMin));
        p.appendChild(createLabel('10', '350', textDmgMax));

        p.appendChild(createSelect('150', '50', 'mob', selectMob));
        p.appendChild(createSelect('150', '100', 'bgm', selectBgm));
        p.appendChild(createSelect('150', '150', 'back-img', selectBackImg));
        p.appendChild(createInput('150', '200', 'hp-range-min'));
        p.appendChild(createInput('150', '250', 'hp-range-max'));
        p.appendChild(createInput('150', '300', 'dmg-range-min'));
        p.appendChild(createInput('150', '350', 'dmg-range-max'));

        p.appendChild(createButton(50, 400, 'init-btn', 'ゲームスタート'));
    });

    /**
     * ストーリーモード選択
     */
    $('#storyMode').on('click',function(){
        // 設定画面を非表示
        $('#init').css('display', 'none');

        // モード選択画面を非表示
        $('#modeSelect').css('display', 'none');
        // 戦闘モードボタンを非表示
        $('#battleMode').css('display', 'none');
        // ストーリーモードボタンを非表示
        $('#storyMode').css('display', 'none');

        settingPhase = 0;
        // ステータス設定
        setMyStatus();
        // フィールドマップを表示
        $('#canvas').css('display', 'block');
        // フィールドBGM再生
        $('#field-bgm').get(0).play();
    });


    /**
     * ストーリーモード選択
     */
    $('#init-btn').on('click',function(){
    alert('aa');
        // 設定画面を非表示
        $('#init').css('display', 'none');

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



});

