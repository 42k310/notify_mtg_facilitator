// -------------------------------------
// Slack操作
// -------------------------------------
function send_to_slack(msg, url){
  var postUrl = url;
  // user_name, icon_emoji はslack側で設定する
  var jsonData = {
    text: msg
  };
  var payload = JSON.stringify(jsonData);
  var options = {
    method: "post",
    contentType: "application/json",
    payload: payload
  };
  UrlFetchApp.fetch(postUrl, options);
}

// -------------------------------------
// シート操作
// -------------------------------------
function get_sheet(sheet_name){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheet_name);
  return sheet;
}

function get_all_records(sheet_name){
  var sheet = get_sheet(sheet_name);
  var records = sheet.getDataRange().getValues();
  records.shift(); // headerを除く
  return records;
}

function get_record(date, records){
  for (var row in records){
    var mtg_date = records[row][1];
    if(Utilities.formatDate(mtg_date, 'Asia/Tokyo', 'yyyy-MM-dd') == Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd')){
      return records[row];
    }
  }
  return [];
}

// -------------------------------------
// 日付操作
// -------------------------------------
function is_week_day(date){
  if(is_holiday(date) || is_sat_or_sun(date)){
    return false;
  } else {
    return true;
  }
}

function is_holiday(date) {
  var calendars = CalendarApp.getCalendarsByName("日本の祝日");
  var holidays = calendars[0];
  var events = holidays.getEventsForDay(date);
  if (events.length > 0) {
    return true;
  }
  return false;
}

function is_sat_or_sun(date){
  var day_of_week = date.getDay()
  if(day_of_week == 0 || day_of_week == 6){
    return true;
  } else {
    return false;
  }
}

// tgt_dateの次の平日を取得する
function get_next_weekday(tgt_date){
  var next_date = new Date(tgt_date.getFullYear(), tgt_date.getMonth(), tgt_date.getDate() + 1);
  while(!is_week_day(next_date)){
    next_date.setDate(next_date.getDate() + 1);
  }
  return next_date;
}

