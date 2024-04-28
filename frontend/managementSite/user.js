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
        const url = "https://91mi77ivgg.execute-api.ap-northeast-1.amazonaws.com/dev";
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

}

async function callAPI_get_ac(name) {
    try {
        const url = "https://91mi77ivgg.execute-api.ap-northeast-1.amazonaws.com/dev";
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
        const url = "https://91mi77ivgg.execute-api.ap-northeast-1.amazonaws.com/dev";
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