async function onClick() {
    var name = document.getElementById("in_name").value;
    var address = document.getElementById("in_address").value;
    let result = await callAPI(name, address);
    if (result == 200) {
        alert("登録しました！");
    } else {
        alert("登録できませんでした");
    }
}

async function onClick2() {
    const resultContaine = document.getElementById("ac");
    if (resultContaine) {
        resultContaine.innerHTML = ''; // 以前の検索結果をクリア
    }
    var name = document.getElementById("in_name_s").value;
    let result = await callAPI2(name);
    displayResults(result);
}

async function onClick3(item){
    let name = document.getElementById("in_name2").value;
    let address = document.getElementById("in_address2").value;

    if (name == ""){
        name = item['name'];
    }
    if (address == ""){
        address = item['address'];
    }
    
    result = await callAPI3(item['id'], name, address);
    if (result == 200){
        alert("更新できました");
    } else {
        alert("更新できませんでした");
    }
}

async function callAPI(name, address) {
    try {
        const url = "";//APIのurlを設定
        const headers = {
            "Content-Type": "application/json"
        };

        const body = JSON.stringify({ "httpMethod": "POST_STORE", "name": name, "address": address });

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

async function callAPI2(name) {
    try {
        const url = "";//APIのurlを設定
        const headers = {
            "Content-Type": "application/json"
        };

        const body = JSON.stringify({ "httpMethod": "SEARCH_STORE", "name": name });

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

async function callAPI3(id, name, address) {
    try {
        const url = "";//APIのurlを設定
        const headers = {
            "Content-Type": "application/json"
        };

        const body = JSON.stringify({ "httpMethod": "UPDATE_STORE", "id": id, "name": name, "address": address });

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

function displayResults(data) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = ''; // 以前の検索結果をクリア

    data.forEach(item => {
        const elem = document.createElement('div');
        elem.textContent = item['name'];
        elem.className = 'clickable-account'; // CSSでスタイルを適用可能
        elem.onclick = function () { handleStoreClick(item); }; // クリック時のイベントハンドラーを設定
        resultContainer.appendChild(elem);
    });
}

function handleStoreClick(item) {
    const resultContaine = document.getElementById("result");
    resultContaine.innerHTML = ''; // 以前の検索結果をクリア

    const resultContainer1 = document.getElementById("ac");
    const userIdElem1 = document.createElement('div');
    userIdElem1.className = 'square3';
    userIdElem1.id = 'ac_info';
    resultContainer1.appendChild(userIdElem1);

    const resultContainer = document.getElementById("ac_info");
    resultContainer.innerHTML = ''; // 以前の検索結果をクリア
    // ユーザーID
    const userIdElem = document.createElement('h3');
    userIdElem.textContent = "変更情報";
    resultContainer.appendChild(userIdElem);

    const userIdElem2 = document.createElement('label');
    userIdElem2.textContent = "店舗名";
    userIdElem2.className = 'name_name';
    userIdElem2.for = 'in_name2';
    resultContainer.appendChild(userIdElem2);

    const userIdElem3 = document.createElement('input');
    userIdElem3.id = "in_name2";
    userIdElem3.className = 'name';
    userIdElem3.name = 'in_name2';
    resultContainer.appendChild(userIdElem3);

    const userIdElem4 = document.createElement('label');
    userIdElem4.textContent = "店舗住所";
    userIdElem4.className = 'address_name';
    userIdElem4.for = 'in_address2';
    resultContainer.appendChild(userIdElem4);

    const userIdElem5 = document.createElement('input');
    userIdElem5.id = "in_address2";
    userIdElem5.className = 'address';
    userIdElem5.name = 'in_address2';
    resultContainer.appendChild(userIdElem5);

    const button = document.createElement('button');
    button.addEventListener('click', function() {
        onClick3(item);
    });
    button.className = "botan";
    button.textContent = "更新";
    resultContainer.appendChild(button);
}
