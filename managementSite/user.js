const charts = {};

async function onClick() {
    const resultContaine = document.getElementById("ac");
    if (resultContaine) {
        resultContaine.innerHTML = ''; // 以前の検索結果をクリア
    }
    var name = document.getElementById("in_name").value;
    let result = await callAPI(name);
    displayResults(result);
}

async function callAPI(name) {
    try {
        const url = "";//APIのurlを設定
        const headers = {
            "Content-Type": "application/json"
        };

        const body = JSON.stringify({ "httpMethod": "SEARCH_AC", "name": name });

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            const errorDetails = await response.text(); // JSONではなくテキストとしてエラーメッセージを取得
            console.error('Error response:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status} - ${errorDetails}`);
        }

        const result = await response.json();
        return result.body;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        alert('An error occurred, please try again later.');
    }
}

function displayResults(data) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = ''; // 以前の検索結果をクリア

    data.forEach(item => {
        const elem = document.createElement('div');
        elem.textContent = item;
        elem.className = 'clickable-account'; // CSSでスタイルを適用可能
        elem.onclick = function () { handleAccountClick(item); }; // クリック時のイベントハンドラーを設定
        resultContainer.appendChild(elem);
    });
}

async function handleAccountClick(accountName) {
    //ユーザを選択した後のhtmlタグを追加
    const resultContaine = document.getElementById("result");
    resultContaine.innerHTML = ''; // 以前の検索結果をクリア

    const resultContainer1 = document.getElementById("ac");
    const userIdElem1 = document.createElement('div');
    userIdElem1.className = 'square2';
    userIdElem1.id = 'ac_info';
    resultContainer1.appendChild(userIdElem1);

    const resultContainer = document.getElementById("ac_info");
    resultContainer.innerHTML = ''; // 以前の検索結果をクリア
    let ac_info = await callAPI_get_ac(accountName);
    // ユーザーID
    const userIdElem = document.createElement('div');
    userIdElem.textContent = "ユーザーID ";
    userIdElem.className = 'user_id';
    resultContainer.appendChild(userIdElem);

    const userIdElem2 = document.createElement('div');
    userIdElem2.textContent = ac_info.user_id;
    userIdElem2.className = 'user_id_r';
    userIdElem2.id = 'user_id_name'
    resultContainer.appendChild(userIdElem2);

    // メールアドレス
    const emailElem = document.createElement('div');
    emailElem.textContent = "メールアドレス ";
    emailElem.className = 'email';
    resultContainer.appendChild(emailElem);

    const emailElem2 = document.createElement('div');
    emailElem2.textContent = ac_info.mail_address;
    emailElem2.className = 'email_r';
    resultContainer.appendChild(emailElem2);

    // 生年月日
    const birthdayElem = document.createElement('div');
    birthdayElem.textContent = "生年月日 ";
    birthdayElem.className = "birth";
    resultContainer.appendChild(birthdayElem);

    const birthdayElem2 = document.createElement('div');
    birthdayElem2.textContent = ac_info.birthday_year + "/" + ac_info.birthday_month + "/" + ac_info.birthday_day;
    birthdayElem2.className = "birth_r";
    resultContainer.appendChild(birthdayElem2);

    // 居住地
    const residenceElem = document.createElement('div');
    residenceElem.textContent = "居住地 ";
    residenceElem.className = "resi";
    resultContainer.appendChild(residenceElem);

    const residenceElem2 = document.createElement('div');
    residenceElem2.textContent = ac_info.residence;
    residenceElem2.className = "resi_r";
    resultContainer.appendChild(residenceElem2);

    const button = document.createElement('button');
    button.onclick = onClick2;
    button.className = "button2";
    button.textContent = "アカウント削除";
    resultContainer.appendChild(button);

    const glaph = document.createElement('div');
    glaph.className = "glaph";
    glaph.id = "glaph_s";
    resultContainer1.appendChild(glaph);

    //グラフのタグを追加

    const resultContainer2 = document.getElementById("glaph_s");
    resultContainer2.innerHTML = ''; // 以前の検索結果をクリア

    const glaph_done_day = document.createElement('canvas');
    glaph_done_day.id = 'glaph_done_day';
    resultContainer2.appendChild(glaph_done_day);

    const glaph_done_day_in = document.createElement('input');
    glaph_done_day_in.id = 'glaph_done_day_in';
    glaph_done_day_in.name = 'glaph_done_day_in';
    resultContainer2.appendChild(glaph_done_day_in);

    const glaph_done_day_la_f = document.createElement('label');
    glaph_done_day_la_f.textContent = "変更範囲";
    glaph_done_day_la_f.className = 'glaph_done_day_la_f';
    glaph_done_day_la_f.for = 'glaph_done_day_in';
    resultContainer2.appendChild(glaph_done_day_la_f);

    const glaph_done_day_la_b = document.createElement('label');
    glaph_done_day_la_b.textContent = "まで";
    glaph_done_day_la_b.className = 'glaph_done_day_la_b';
    glaph_done_day_la_b.for = 'glaph_done_day_in';
    resultContainer2.appendChild(glaph_done_day_la_b);

    const glaph_done_day_button = document.createElement('button');
    glaph_done_day_button.addEventListener('click', function () {
        change("Day", "done", accountName);
    });
    glaph_done_day_button.className = "glaph_done_day_button";
    glaph_done_day_button.textContent = "変更";
    resultContainer2.appendChild(glaph_done_day_button);

    const glaph_done_month = document.createElement('canvas');
    glaph_done_month.id = 'glaph_done_month';
    resultContainer2.appendChild(glaph_done_month);

    const glaph_done_month_in = document.createElement('input');
    glaph_done_month_in.id = 'glaph_done_month_in';
    glaph_done_month_in.name = 'glaph_done_month_in';
    resultContainer2.appendChild(glaph_done_month_in);

    const glaph_done_month_la_f = document.createElement('label');
    glaph_done_month_la_f.textContent = "変更範囲";
    glaph_done_month_la_f.className = 'glaph_done_month_la_f';
    glaph_done_month_la_f.for = 'glaph_done_month_in';
    resultContainer2.appendChild(glaph_done_month_la_f);

    const glaph_done_month_la_b = document.createElement('label');
    glaph_done_month_la_b.textContent = "まで";
    glaph_done_month_la_b.className = 'glaph_done_month_la_b';
    glaph_done_month_la_b.for = 'glaph_done_month_in';
    resultContainer2.appendChild(glaph_done_month_la_b);

    const glaph_done_month_button = document.createElement('button');
    glaph_done_month_button.addEventListener('click', function () {
        change("Month", "done", accountName);
    });
    glaph_done_month_button.className = "glaph_done_month_button";
    glaph_done_month_button.textContent = "変更";
    resultContainer2.appendChild(glaph_done_month_button);

    const glaph_posted_day = document.createElement('canvas');
    glaph_posted_day.id = 'glaph_posted_day';
    resultContainer2.appendChild(glaph_posted_day);

    const glaph_posted_day_in = document.createElement('input');
    glaph_posted_day_in.id = 'glaph_posted_day_in';
    glaph_posted_day_in.name = 'glaph_posted_day_in';
    resultContainer2.appendChild(glaph_posted_day_in);

    const glaph_posted_day_la_f = document.createElement('label');
    glaph_posted_day_la_f.textContent = "変更範囲";
    glaph_posted_day_la_f.className = 'glaph_posted_day_la_f';
    glaph_posted_day_la_f.for = 'glaph_posted_day_in';
    resultContainer2.appendChild(glaph_posted_day_la_f);

    const glaph_posted_day_la_b = document.createElement('label');
    glaph_posted_day_la_b.textContent = "まで";
    glaph_posted_day_la_b.className = 'glaph_posted_day_la_b';
    glaph_posted_day_la_b.for = 'glaph_posted_day_in';
    resultContainer2.appendChild(glaph_posted_day_la_b);

    const glaph_posted_day_button = document.createElement('button');
    glaph_posted_day_button.addEventListener('click', function () {
        change("Day", "posted", accountName);
    });
    glaph_posted_day_button.className = "glaph_posted_day_button";
    glaph_posted_day_button.textContent = "変更";
    resultContainer2.appendChild(glaph_posted_day_button);

    const glaph_posted_month = document.createElement('canvas');
    glaph_posted_month.id = 'glaph_posted_month';
    resultContainer2.appendChild(glaph_posted_month);

    const glaph_posted_month_in = document.createElement('input');
    glaph_posted_month_in.id = 'glaph_posted_month_in';
    glaph_posted_month_in.name = 'glaph_posted_month_in';
    resultContainer2.appendChild(glaph_posted_month_in);

    const glaph_posted_month_la_f = document.createElement('label');
    glaph_posted_month_la_f.textContent = "変更範囲";
    glaph_posted_month_la_f.className = 'glaph_posted_month_la_f';
    glaph_posted_month_la_f.for = 'glaph_posted_month_in';
    resultContainer2.appendChild(glaph_posted_month_la_f);

    const glaph_posted_month_la_b = document.createElement('label');
    glaph_posted_month_la_b.textContent = "まで";
    glaph_posted_month_la_b.className = 'glaph_posted_month_la_b';
    glaph_posted_month_la_b.for = 'glaph_posted_month_in';
    resultContainer2.appendChild(glaph_posted_month_la_b);

    const glaph_posted_month_button = document.createElement('button');
    glaph_posted_month_button.addEventListener('click', function () {
        change("Month", "posted", accountName);
    });
    glaph_posted_month_button.className = "glaph_posted_month_button";
    glaph_posted_month_button.textContent = "変更";
    resultContainer2.appendChild(glaph_posted_month_button);

    //グラフを書く
    await createGraph("Day", "glaph_done_day", "done", new Date().getDate().toString(), accountName);
    await createGraph("Month", "glaph_done_month", "done", (new Date().getMonth() + 1).toString(), accountName);
    await createGraph("Day", "glaph_posted_day", "posted", new Date().getDate().toString(), accountName);
    await createGraph("Month", "glaph_posted_month", "posted", (new Date().getMonth() + 1).toString(), accountName);
}

async function callAPI_get_ac(name) {
    try {
        const url = "";//APIのurlを設定
        const headers = {
            "Content-Type": "application/json"
        };

        const body = JSON.stringify({ "httpMethod": "GET_AC", "userId": name });

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            const errorDetails = await response.text(); // JSONではなくテキストとしてエラーメッセージを取得
            console.error('Error response:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status} - ${errorDetails}`);
        }

        const result = await response.json();
        return result.body;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        alert('An error occurred, please try again later.');
    }
}

async function onClick2() {
    var response = confirm("本当に削除しますか？");
    if (response) {
        var name = document.getElementById("user_id_name").textContent;
        result = await callAPI_delete(name);
        if (result == 200) {
            alert("削除しました！");
            const resultContaine = document.getElementById("ac");
            if (resultContaine) {
                resultContaine.innerHTML = ''; // 以前の検索結果をクリア
            }
        } else {
            alert("削除できませんでした");
        }
    }
}

async function callAPI_delete(name) {
    try {
        const url = "";//APIのurlを設定
        const headers = {
            "Content-Type": "application/json"
        };

        const body = JSON.stringify({ "httpMethod": "DELETE_AC", "userId": name });

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            const errorDetails = await response.text(); // JSONではなくテキストとしてエラーメッセージを取得
            console.error('Error response:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status} - ${errorDetails}`);
        }

        const result = await response.json();
        return result.statusCode;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        alert('An error occurred, please try again later.');
    }
}

async function createGraph(period, id, type, start, accountName) {
    data = await callAPI2(period, start, type, accountName);

    if (charts[id]) {
        charts[id].destroy();
    }
    printGraph(data, period, id, start, type);
}

async function callAPI2(period, start, type, accountName) {
    try {
        const url = "";//APIのurlを設定
        const headers = {
            "Content-Type": "application/json"
        };

        let now = start;

        let body;
        if (type == "done") {
            body = JSON.stringify({ "httpMethod": "GET_DONE_BINGO_NUMBER", "period": period, "start": now, "userId": accountName});
        } else if (type == "posted") {
            body = JSON.stringify({ "httpMethod": "GET_POSTED_BINGO_NUMBER", "period": period, "start": now, "userId": accountName});
        } else {
            return -1;
        }
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        return result.body;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        alert('An error occurred, please try again later.');
    }
}

function printGraph(data, period, id, start, type) {
    if (period == "Day") {
        period = "日";
    } else if (period == "Month") {
        period = "月";
    } else if (period == "Year") {
        period = "年";
    }
    var ctx = document.getElementById(id).getContext('2d');
    let now_num = Number(start);

    // dataが配列であることを確認し、そうでない場合は配列にする
    if (!Array.isArray(data)) {
        data = [data];  // もしdataが単一の値であれば、配列に変換
    }

    data = data.map(item => parseInt(item, 10));
    data.reverse();
    let label;
    if (type == "done") {
        label = period + "別ビンゴ達成数";
    } else if (type == "posted") {
        label = period + "別ビンゴ投稿数";
    }

    charts[id] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [(now_num - 5).toString() + period, (now_num - 4).toString() + period, (now_num - 3).toString() + period, (now_num - 2).toString() + period, (now_num - 1).toString() + period, start + period],
            datasets: [{
                label: label,
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function change(period, type, accountName){
    let id;
    if (period == "Day"){
        id = type + "_day";
    } else if (period == "Month"){
        id = type + "_month";
    } else if (period == "Year"){
        id = type + "_year";
    }
     id = "glaph_" + id
    var start = document.getElementById(id + "_in").value;
    createGraph(period, id, type, start, accountName);
}
