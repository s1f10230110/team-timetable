let timetableData = {};

// JSONデータを取得
fetch(timetableJsonUrl)
    .then(response => response.json())
    .then(data => {
        timetableData = data;
    })
    .catch(error => console.error("Error loading JSON:", error));

document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("select");
    const cells = document.querySelectorAll(".cell");
    const infoDiv = document.getElementById("class-info");

    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            const selectedValue = select.value.split("_");
            const selectedYear = selectedValue[0];
            const selectedSemester = selectedValue[1];
            console.log(selectedYear)
            const day = cell.getAttribute("data-day");
            const period = cell.getAttribute("data-period");

            let foundClasses = [];


            for (const category in timetableData[selectedYear][selectedSemester]) {
                for (const subject in timetableData[selectedYear][selectedSemester][category]) {
                    const details = timetableData[selectedYear][selectedSemester][category][subject];
                    if (details.Day_of_the_week === day && details.Period === period) {
                        foundClasses.push({
                            name: subject,
                            instructor: details.Instructor,
                            grade: details.Grade
                        });
                        break;
                    }
                }
            }


            if (foundClasses.length > 0) {
                // 授業をリストとして表示し、リセット選択肢を追加
                infoDiv.innerHTML = `
                    <p>以下の授業から選択してください：</p>
                    <ul>
                        ${foundClasses.map(cls => `
                            <li class="selectable-class" data-class-name="${cls.name}">
                                <strong>${cls.name}</strong>（${cls.instructor}, ${cls.grade}）
                            </li>
                        `).join('')}
                        <li class="selectable-class reset-class" data-class-name="">
                            <strong>リセット</strong>（選択を解除）
                        </li>
                    </ul>
                `;

                // 各授業をクリックしたときにマスに表示する処理
                document.querySelectorAll(".selectable-class").forEach(item => {
                    item.addEventListener("click", function () {
                        const selectedClassName = item.getAttribute("data-class-name");
                        if (selectedClassName === "") {
                            cell.textContent = "";  // リセットで空にする
                            infoDiv.innerHTML = `<p>選択をリセットしました。</p>`;
                        } else {
                            cell.textContent = selectedClassName;  // マスに授業名を表示
                            infoDiv.innerHTML = `<p>「${selectedClassName}」を選択しました。</p>`;
                        }
                    });
                });

            } else {
                infoDiv.innerHTML = `<p>この時間の授業はありません。</p>`;
            }
        });
    });
});