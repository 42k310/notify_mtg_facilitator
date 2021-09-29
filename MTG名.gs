function notify() {
  
  try{
    
    var records = get_all_records('MTG名'); // FIXME: シート名を指定
    
    // -------------------------------------------------
    // 通知実施日判定（今日が実施日の三日前なら通知を送り、そうでなかったらスカる）
    // -------------------------------------------------
    Logger.log('★★★ 通知実施日判定 ★★★');
    var today = new Date();
    var three_days_later = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
    var record = get_record(three_days_later, records);
    
    if(record.length == 0){
      Logger.log('通知対象日じゃないので、スカらせておしまい');
      return;
    }
    
    if(record[3] == 'スキップ'){
      Logger.log('今週はスキップ！');
      return;
    }

    // -------------------------------------------------
    // 文面を作って通知を送る
    // -------------------------------------------------    
    Logger.log('★★★ 通知 ★★★');
    var msg = '*📢〇〇MTGファシリ📢* \n' +
      '次回：' + Utilities.formatDate(record[1], 'Asia/Tokyo', 'yyyy/MM/dd')
      + '\nファシリ： <@' + record[3] + '>'
      + '\n:google-spreadsheet:：' + 'https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxx'; // TODO: シートIDを指定
    send_to_slack(msg, SLACK_WEBHOOK_XXXXXXXXX); // FIXME: webhookURLを指定（プロパティ値を利用することを推奨）
    Logger.log('正常終了');
    
  } catch(e){
    var myLog = Logger.getLog();
    Logger.log("予期せぬエラーが発生しました。異常終了として終了します") 
    MailApp.sendEmail('xxxxxxx@gmail.com', '【異常終了】〇〇通知', 'エラーメッセージ\n' + e + '\n\nmyLog\n' + myLog);
  }
}

