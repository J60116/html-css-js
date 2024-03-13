// タイマーの識別番号（-1はまだ実行していない状態）
let timerId = -1;
// タグの取得
const btn = document.getElementById('btn');
const select = document.getElementById('select');
const elements = document.getElementsByClassName('minute');
const timer = document.getElementById('timer');
const msg = document.getElementById('msg');

// ドロップダウンリストを選択したときのイベント処理
select.addEventListener('select',()=>{
    if(msg.textContent!==""){
        msg.textContent = "";
    }
    for(let i=0; i<elements.length; i++){
        if(elements[i].selected){
            mm_set = elements[i].value;
            timer.textContent = `0${mm_set}:00`;
            break;
        }
    }
})

// 開始ボタンをクリックしたときのイベント処理
btn.addEventListener('click',()=>{
    if(msg.textContent!==""){
        msg.textContent = "";
    }
    if(timerId===-1){
        // ボタンとリストを利用不可に設定
        btn.disabled = true;
        select.disabled = true;
        // タイマー情報の初期化
        let mm_set = 0;
        let mm = 0;
        let ss = 0;
        // ドロップダウンリストからvalueを取得
        for(let i=0; i<elements.length; i++){
            if(elements[i].selected){
                mm_set = Number(elements[i].value);
                mm = mm_set;
                break;
            }
        }
        // 注意：forEachはエラー
        // elements.forEach((element)=>{
        //     if(element.selected===true){
        //         mm = Number(element.value);
        //     }
        // })
        timer.style.color = 'black';
        timer.textContent = `${make2Num(mm)}:${make2Num(ss)}`;
        // タイマーを実行する（1000ミリ秒毎）
        timerId = window.setInterval(()=>{
            // 1秒引く
            ss -= 1;
            // 残り秒数が0の場合
            if(ss<0){
                // 1分引く
                mm -= 1;
                ss = 59;
            }
            //タイマーが終了したかチェック
            if(mm === 0 && ss===0){
                // タイマーを停止する
                clearInterval(timerId);
                // 停止状態を示す-1に戻す
                timerId = -1;
                // 結果をwebページに表示
                timer.textContent = '00:00';
                msg.textContent = `${mm_set}分経過しました`;
                // ボタンとリストを利用可能に設定
                btn.disabled = false;
                select.disabled = false;
            } else {
                timer.textContent = `${make2Num(mm)}:${make2Num(ss)}`;
            }
        }, 1000);
    }
})

// 2桁表示
function make2Num(value){
    // 受け取った値の先頭に「0」をつけ、末尾2文字を返す
    return ('0'+value).slice(-2);
}
