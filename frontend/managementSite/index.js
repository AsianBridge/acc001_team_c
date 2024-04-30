const charts = {};

async function callAPI(period, start, type) {
  try {
    const url =
      "https://91mi77ivgg.execute-api.ap-northeast-1.amazonaws.com/dev";
    const headers = {
      "Content-Type": "application/json",
    };

    let now = start;

    let body;
    if (type == "done") {
      body = JSON.stringify({
        httpMethod: "GET_DONE_BINGO_NUMBER",
        period: period,
        start: now,
      });
    } else if (type == "posted") {
      body = JSON.stringify({
        httpMethod: "GET_POSTED_BINGO_NUMBER",
        period: period,
        start: now,
      });
    } else {
      return -1;
    }
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    alert("An error occurred, please try again later.");
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
  var ctx = document.getElementById(id).getContext("2d");
  let now_num = Number(start);

  // dataが配列であることを確認し、そうでない場合は配列にする
  if (!Array.isArray(data)) {
    data = [data]; // もしdataが単一の値であれば、配列に変換
  }

  data = data.map((item) => parseInt(item, 10));
  data.reverse();
  let label;
  if (type == "done") {
    label = period + "別ビンゴ達成数";
  } else if (type == "posted") {
    label = period + "別ビンゴ投稿数";
  }

  charts[id] = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        (now_num - 5).toString() + period,
        (now_num - 4).toString() + period,
        (now_num - 3).toString() + period,
        (now_num - 2).toString() + period,
        (now_num - 1).toString() + period,
        start + period,
      ],
      datasets: [
        {
          label: label,
          data: data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

async function createGraph(period, id, type, start) {
  data = await callAPI(period, start, type);

  if (charts[id]) {
    charts[id].destroy();
  }
  printGraph(data, period, id, start, type);
}

async function get_number() {
  try {
    const url =
      "https://91mi77ivgg.execute-api.ap-northeast-1.amazonaws.com/dev";
    const headers = {
      "Content-Type": "application/json",
    };

    let body = JSON.stringify({ httpMethod: "GET_ALL_NUMBER" });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const result = await response.json();
    let resultContainer1 = document.getElementById("user_number");
    resultContainer1.textContent = String(result.body[0]) + "人";
    resultContainer1 = document.getElementById("posted_number");
    resultContainer1.textContent = String(result.body[1]) + "ビンゴ";
    resultContainer1 = document.getElementById("done_number");
    resultContainer1.textContent = String(result.body[2]) + "ビンゴ";
    resultContainer1 = document.getElementById("play_number");
    resultContainer1.textContent = String(result.body[3]) + "ビンゴ";
    resultContainer1 = document.getElementById("keep_number");
    resultContainer1.textContent = String(result.body[4]) + "ビンゴ";
    return 0;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    alert("An error occurred, please try again later.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createGraph("Day", "done_day", "done", new Date().getDate().toString());
  createGraph(
    "Month",
    "done_month",
    "done",
    (new Date().getMonth() + 1).toString(),
  );
  createGraph("Year", "done_year", "done", new Date().getFullYear().toString());
  createGraph("Day", "posted_day", "posted", new Date().getDate().toString());
  createGraph(
    "Month",
    "posted_month",
    "posted",
    (new Date().getMonth() + 1).toString(),
  );
  createGraph(
    "Year",
    "posted_year",
    "posted",
    new Date().getFullYear().toString(),
  );
  get_number();
});

function change(period, type) {
  let id;
  if (period == "Day") {
    id = type + "_day";
  } else if (period == "Month") {
    id = type + "_month";
  } else if (period == "Year") {
    id = type + "_year";
  }
  var start = document.getElementById(id + "_in").value;
  createGraph(period, id, type, start);
}
