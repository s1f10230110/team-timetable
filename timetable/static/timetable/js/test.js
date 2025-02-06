let timetableData = {}; // グローバル変数として保持

fetch(timetableJsonUrl)
    .then(response => response.json())
    .then(data => {
        timetableData = data;
        switchTab("全表示"); // データを取得後に初期表示
    })
    .catch(error => console.error("Error loading JSON:", error));

function loadTimetable(category) {
    const contentArea = document.getElementById("content"); // 1つの共通エリアに表示
    contentArea.innerHTML = ""; // 既存の内容をクリア

    let subjects = {};
    if (category === "全表示") {
        // 全カテゴリの授業を取得
        subjects = Object.assign({}, 
            timetableData["2024"]["秋学期"]["コンピュータ・システム"], 
            timetableData["2024"]["秋学期"]["コンピュータ・ソフトウェア"], 
            timetableData["2024"]["秋学期"]["ユーザ・エクスペリエンス"],
            timetableData["2024"]["秋学期"]["データサイエンス"],
            timetableData["2024"]["秋学期"]["ICT"],
            timetableData["2024"]["秋学期"]["ビジネス"],
            timetableData["2024"]["秋学期"]["コミュニティ"]
        );
    } else {
        subjects = timetableData["2024"]["秋学期"][category] || {};
    }

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>科目群</th>
                <th>授業名</th>
                <th>担当教員</th>
                <th>曜日</th>
                <th>時限</th>
                <th>対象学年</th>
            </tr>
        </thead>
        <tbody>
            ${Object.keys(subjects).map(subject => {
                const details = subjects[subject];
                return `
                    <tr>
                        <td>${category === "全表示" ? findCategory(subject) : category}</td>
                        <td>${subject}</td>
                        <td>${details.Instructor}</td>
                        <td>${details.Day_of_the_week}</td>
                        <td>${details.Period}</td>
                        <td>${details.Grade}</td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    `;

    contentArea.appendChild(table);
}

function findCategory(subjectName) {
    for (const category in timetableData["2024"]["秋学期"]) {
        if (subjectName in timetableData["2024"]["秋学期"][category]) {
            return category;
        }
    }
    return "不明";
}

function switchTab(category) {
    // タブの切り替え
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.toggle("active", tab.textContent === category);
    });

    // 表示データをロード
    loadTimetable(category);
}

// 初期表示は fetch() の完了後に行う
