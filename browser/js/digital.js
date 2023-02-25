
(()=>{
    // ゼロ埋めして2桁の数値にする
    const zero = n => (n < 10 ) ? "0" + n.toString() : n.toString();

    // 日付の文字列化
    const youbi = ["日","月","火","水","木","金","土"];
    const getDateString = date =>
        `${ date.getFullYear() }年 ${ zero(date.getMonth() + 1) }月  ${ zero(date.getDate()) }日 ${ youbi[date.getDay()] }曜日`;

    // 時間の文字列化
    const getHourString = date =>
        `${ zero(date.getHours()) }: ${ zero(date.getMinutes()) }: ${ zero(date.getSeconds()) }`;

    // DOMの構築を待つ
    window.addEventListener('DOMContentLoaded',()=> {
        // 日時を表示するDOM要素を取得
        const dateDiv = document.getElementById("date");
        const clockDiv = document.getElementById("clock");

        // 現在の日
        let nowDate = null;

        // 1秒周期のタイマーセット
        setInterval( ()=>{
            // 現在の日時を取得
            const now = new Date();
            // 日付が変わったら日付を再表示
            if( nowDate !== now.getDate() ) {
                nowDate = now.getDate();
                dateDiv.innerText = getDateString(now);
            }

            // 時間を再表示
            clockDiv.innerText = getHourString(now);
        },1000);
    });
})();

