function parseCSVData(csvData) {
    var students = [];
    var alertCount = 0;
    var rows = csvData.split('\n');
    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        if (columns.length === 2) {
            const name = columns[0].trim();
            const numericGrade = parseFloat(columns[1].trim());
            if(numericGrade > 100 || numericGrade < 0){
                alertCount++;
                
            }else{
            students.push(new Student(name, numericGrade));
            }
        }
    }
    if(alertCount > 0){
        alert("ERROR! There are " + alertCount + " input(s) out of bound.\nIt will note be included in Histogram and Stats");
    }
    return students;
}

class Student{
    constructor(name,numericGrade){
        this.name = name;
        this.numericGrade = numericGrade;
    }
}


class LetterGrade {
    static convert(numericGrade) {
        if (numericGrade <= 100 && numericGrade >= document.getElementById("AplusBoundaryInput").value) return "A+";
        else if (numericGrade >= document.getElementById("ABoundaryInput").value) return "A";
        else if (numericGrade >= document.getElementById("AminusBoundaryInput").value) return "A-";
        else if (numericGrade >= document.getElementById("BplusBoundaryInput").value) return "B+";
        else if (numericGrade >= document.getElementById("BBoundaryInput").value) return "B";
        else if (numericGrade >= document.getElementById("BminusBoundaryInput").value) return "B-";
        else if (numericGrade >= document.getElementById("CplusBoundaryInput").value) return "C+";
        else if (numericGrade >= document.getElementById("CBoundaryInput").value) return "C";
        else if (numericGrade >= document.getElementById("CminusBoundaryInput").value) return "C-";
        else if (numericGrade >= document.getElementById("DBoundaryInput").value) return "D";
        else if (numericGrade >= 0) return "F";
        else return "";
        
    }
        
}




//Function that return the number of student that get a specific letter grade
function countStudent(students, desireLetterGrade){
    let count = 0;
    for(const student of students){
        if (student.numericGrade <= 100 && student.numericGrade > 0 && LetterGrade.convert(student.numericGrade) === desireLetterGrade) {
            count++;
        }
    }
    
    return count;
}

//function that return an array which have the number of students getting each letter grade
function fillGrade(students){
    var StudentGrade = [];
    StudentGrade.push(countStudent(students, "A+"));
    StudentGrade.push(countStudent(students, "A"));
    StudentGrade.push(countStudent(students, "A-"));
    StudentGrade.push(countStudent(students, "B+"));
    StudentGrade.push(countStudent(students, "B"));
    StudentGrade.push(countStudent(students, "B-"));
    StudentGrade.push(countStudent(students, "C+"));
    StudentGrade.push(countStudent(students, "C"));
    StudentGrade.push(countStudent(students, "C-"));
    StudentGrade.push(countStudent(students, "D"));
    StudentGrade.push(countStudent(students, "F"));
    return StudentGrade;
}


//Function that update the Histogram with data that is uploaded
function updateHistogram(StudentGrade){
    document.getElementById("Aplus").textContent = StudentGrade[0];
    document.getElementById("A").textContent = StudentGrade[1];
    document.getElementById("Aminus").textContent = StudentGrade[2];
    document.getElementById("Bplus").textContent = StudentGrade[3];
    document.getElementById("B").textContent = StudentGrade[4];
    document.getElementById("Bminus").textContent = StudentGrade[5];
    document.getElementById("Cplus").textContent = StudentGrade[6];
    document.getElementById("C").textContent = StudentGrade[7];
    document.getElementById("Cminus").textContent = StudentGrade[8];
    document.getElementById("D").textContent = StudentGrade[9];
    document.getElementById("F").textContent = StudentGrade[10];
}


//Function that update the Stats with data that is uploaded
function updateStats(students){
    let highest = 0;
    let highestStudent = null;
    let lowest = 100;
    let lowestStudent = null;
    let medianArray = [];
    let mean = 0; 
    let count = 0;
    for(const student of students){
        if (highest < student.numericGrade && student.numericGrade <= 100) {
            highest = student.numericGrade;
            highestStudent = student.name;
        }
        if(lowest > student.numericGrade && student.numericGrade >= 0) {
            lowest = student.numericGrade;
            lowestStudent = student.name;
        }
        if(student.numericGrade <= 100 && student.numericGrade >= 0){
            mean += student.numericGrade;
            medianArray.push(student.numericGrade);
        }
        
    }
    document.getElementById("Highest").textContent = highestStudent + " (" + highest + "%)";
    document.getElementById("Lowest").textContent = lowestStudent + " (" + lowest + "%)";
    if(students.length !== 0){
        mean /= medianArray.length;
    }
    document.getElementById("mean").textContent = mean.toFixed(2);
    document.getElementById("median").textContent = calculateMedian(medianArray).toFixed(2);

}


function calculateMedian(medianArray){
    medianArray.sort(function(a, b){
        return a - b;
    });

    const len = medianArray.length;
    const isOdd = len % 2;

    if(!isOdd){
        return (medianArray[len / 2 - 1] + medianArray[len / 2])/2;
    }
    else{
        return medianArray[Math.floor(len/2)];
    }
}


document.getElementById("AplusBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("ABoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("AminusBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("BplusBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("BBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("BminusBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("CplusBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("CBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("CminusBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});
document.getElementById("DBoundaryInput").addEventListener('input', function(){
    const newValue = this.value;
});



function changeNumberintoChart(StudentGrade){
    var chartValue = [];
    for(let i = 0; i < StudentGrade.length; i++){
        chartValue.push(ParseIntToChartData(StudentGrade[i]));
    }
    return chartValue;
}

function ParseIntToChartData(numberofStudent){
    let count = 0;
    for(let i = 0; i < numberofStudent; i++){
        count++ ;
    }
    if(count > 0){
        let temp = 'O'
        for(let i = 0; i < count - 1; i++){
            temp+="O";
        }
        return temp;
    }
    return null;
}

document.querySelectorAll(".lowerBoundsValue").forEach(input=> {
    input.addEventListener('change', function(){
        const inputValue = input.value;
        const pattern = /^(-?\d+(\.\d)?)$/;
        // Check if the input matches the pattern
        if (!pattern.test(inputValue)) {
            setLowerBoundValueToDefault();
        }


        if(100 < parseFloat(document.getElementById("AplusBoundaryInput").value)
            || parseFloat(document.getElementById("AplusBoundaryInput").value) < parseFloat(document.getElementById("ABoundaryInput").value)
            || parseFloat(document.getElementById("ABoundaryInput").value) < parseFloat(document.getElementById("AminusBoundaryInput").value)
            || parseFloat(document.getElementById("AminusBoundaryInput").value) < parseFloat(document.getElementById("BplusBoundaryInput").value)
            || parseFloat(document.getElementById("BplusBoundaryInput").value) < parseFloat(document.getElementById("BBoundaryInput").value)
            || parseFloat(document.getElementById("BBoundaryInput").value) < parseFloat(document.getElementById("BminusBoundaryInput").value)
            || parseFloat(document.getElementById("BminusBoundaryInput").value) < parseFloat(document.getElementById("CplusBoundaryInput").value)
            || parseFloat(document.getElementById("CplusBoundaryInput").value) < parseFloat(document.getElementById("CBoundaryInput").value)
            || parseFloat(document.getElementById("CBoundaryInput").value) < parseFloat(document.getElementById("CminusBoundaryInput").value)
            || parseFloat(document.getElementById("CminusBoundaryInput").value) < parseFloat(document.getElementById("DBoundaryInput").value)
            || parseFloat(document.getElementById("DBoundaryInput").value) < 0){
            
                setLowerBoundValueToDefault();
        }

    })
})

function setLowerBoundValueToDefault(){
    document.getElementById("AplusBoundaryInput").value = "95.00";
    document.getElementById("ABoundaryInput").value = "90.00";
    document.getElementById("AminusBoundaryInput").value = "85.00";
    document.getElementById("BplusBoundaryInput").value = "80.00";
    document.getElementById("BBoundaryInput").value = "75.00";
    document.getElementById("BminusBoundaryInput").value = "70.00";
    document.getElementById("CplusBoundaryInput").value = "65.00";
    document.getElementById("CBoundaryInput").value = "60.00";
    document.getElementById("CminusBoundaryInput").value = "55.00";
    document.getElementById("DBoundaryInput").value = "50.00";
}

function init(){
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  }
  
  function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }
  
  function handleFileLoad(event){
    const csvData = event.target.result;
    const students = parseCSVData(csvData);

    var histogramData = fillGrade(students);
    var StudentGrade = changeNumberintoChart(histogramData);
    updateHistogram(StudentGrade);
    updateStats(students);
    console.log(StudentGrade);
    
    document.querySelectorAll(".lowerBoundsValue").forEach(input=> {
        input.addEventListener('change', function(){
            histogramData.length = 0;
            StudentGrade.length = 0;
            const newHistogramData = fillGrade(students);
            const newStudentGrade = changeNumberintoChart(newHistogramData);
    
            updateHistogram(newStudentGrade);
            updateStats(students);
            
        })
    })
}

