let timetableData = {};

fetch(timetableJsonUrl)
    .then(response => response.json())
    .then(data => {
        timetableData = data;
        updateTimetable();
    })
    .catch(error => console.error("Error loading JSON:", error));

function updateTimetable() {
    const selectedYear = getCheckedValues("filter-year");
    const selectedSemester = getCheckedValues("filter-semester");

    const selectedCategories = getCheckedValues("filter-category");
    const selectedDays = getCheckedValues("filter-day");
    const selectedPeriods = getCheckedValues("filter-period");
    const selectedGrades = getCheckedValues("filter-grade");

    const tbody = document.querySelector("#timetable tbody");
    tbody.innerHTML = "";

    for (const year in timetableData) {
        if (selectedYear.length > 0 && !selectedYear.includes(year)) continue;

        for (const semester in timetableData[year]) {
            if (selectedSemester.length > 0 && !selectedSemester.includes(semester)) continue;

            for (const category in timetableData[year][semester]) {
                if (selectedCategories.length > 0 && !selectedCategories.includes(category)) continue;
        
                for (const subject in timetableData[year][semester][category]) {
                    const details = timetableData[year][semester][category][subject];
        
                    if (selectedDays.length > 0 && !selectedDays.includes(details.Day_of_the_week)) continue;
                    if (selectedPeriods.length > 0 && !selectedPeriods.includes(details.Period.toString())) continue;
                    
                    const gradeMatch = details.Grade.match(/\d+/g); // "2年生" → ["2"], "2~4年生" → ["2", "4"]
                    const expandedGrades = gradeMatch.length === 1 
                        ? [gradeMatch[0]] // 単独の学年（例: "2年生"）
                        : Array.from({ length: gradeMatch[1] - gradeMatch[0] + 1 }, (_, i) => (Number(gradeMatch[0]) + i).toString()); // 範囲展開
                    if (selectedGrades.length > 0 && !selectedGrades.some(g => expandedGrades.includes(g))) continue;
        
        
                    tbody.innerHTML += `
                        <tr>
                            <td>${category}</td>
                            <td>${subject}</td>
                            <td>${details.Instructor}</td>
                            <td>${details.Day_of_the_week}</td>
                            <td>${details.Period}</td>
                            <td>${details.Grade}</td>
                        </tr>
                    `;
                }
            }
        }
    }
}

function getCheckedValues(className) {
    return Array.from(document.querySelectorAll(`.${className}:checked`)).map(el => el.value);
}

document.querySelectorAll(".filter-section input").forEach(input => {
    input.addEventListener("change", updateTimetable);
});
