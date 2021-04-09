function isLeap(yy){
    let mrun = yy%100 == 0&&yy%400 == 0?true:(yy%4 == 0?true:false);
    return mrun;
}

// prepare the number of days for months
let months = [31,28,31,30,31,30,31,31,30,31,30,31];
let months2 = [31,29,31,30,31,30,31,31,30,31,30,31]; 

let date  =  new Date();

// 1. first step, get the year, month, and the weekday of first day of cur month
// get year, month
let yy = date.getFullYear();
let mm = date.getMonth(); // returns 0 - 11
console.log(yy, mm)

// check if leap year
let isleap = isLeap(yy);
console.log(isleap)

//get the months for the year
let month = isleap?months2:months;
console.log(month)

// use the year and month get the first day of the month
let begin_date = new Date(yy,mm,1);
let begin_week_day = begin_date.getDay(); // getDay() return 0-6
console.log('begin_date :', begin_date)
console.log('begin week :',begin_week_day)

// 2. second, get num of days for prev, cur and next month
//with week day we know how many days need to fetch for prev month
let pre_num = begin_week_day;
console.log('days from previous month', pre_num)

// 7 days, 6 rows 
let const_num = 7*6;

// num of days for cur month
let cur_num = month[mm];
console.log('num of days for cur month', cur_num)

// num of days for next month
let after_num = const_num-cur_num-pre_num;
console.log('num of days for next month', after_num)

// 3. check the year of prev and next month
let preyy = yy;
let premm = mm;
// check if cur month is Jan, need to get prev year for it
if(premm == 0) {
    preyy -=  1;
}
// get num of days for prev month 
premm = premm-1<0?11:(premm-1);
let pre_max = month[premm];

// get next month, if Dec, need to get next year for it
let afteryy = yy;
let aftermm = mm;
if(aftermm == 11){
    afteryy += 1;
}
aftermm = aftermm+1>11?0:(aftermm+1);

// 4. the canledar array
let dateJson = [];
// days needed from pre month
for(let i = pre_num;i>0;i--){
    let obj = {  
        year:preyy,
        month:premm,
        day:(pre_max-i+1),
        place:'pre'
    };
    dateJson.push(obj);
}
//add cur month days
for(let i = 1; i<= cur_num; i++){
    let obj = {year:yy,month:mm,day:i,place:'cur'};
    dateJson.push(obj);
}
//add next month days
for(let i = 1;i <= after_num; i++){
    let obj = {year:afteryy,month:aftermm,day:i,place:'after'};
    dateJson.push(obj);
}


function drawCalendar(){
    const week_days  =  ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    let json = dateJson;
    let str = "<table class = 'date_table'>"
    for (let i  =  0; i < 7; i++){
        str += "<td>" + week_days[i] + "</td>";
    }
    for(let i  =  0;i<json.length; i++){
    // 7 days a row, i start with 0 so need + 1
    // mod 7  = > result is 1 means start, 0 means end of a row
        if(( i + 1 ) % 7  ==  1){
            str += "<tr>";
        }
        let obj  =  json[i];
        let oclass  =  "";
        // add different class style to dates not from cur month
        switch (obj.place){
            case "pre":oclass = "pre_date";break;
            case "cur":oclass = "cur_date";break;
            case "after":oclass = "after_date";break;
        }
        str +=  "<td class = '"+oclass+"' >"+obj.day+"</td>";
        if((i + 1) % 7  ==  0){
            str +=  "</tr>";
        }
    }
    str +=  "</table>";
    document.getElementById('app').innerHTML  =  str
    return str;
}
drawCalendar()