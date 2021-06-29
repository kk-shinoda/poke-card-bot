const PUSH = "https://api.line.me/v2/bot/message/push";

const MONTH_MONEY = 5000

function createMessage(){
  describe_border()  
  for(var i = 0; i<members.length; i++){
    record_payment(MONTH_MONEY, i)
  }
  let push_all = '月が変わったので'+MONTH_MONEY+'円追加します\n\n'
  for (var i = 0; i < members.length; i++){
    let balance = LOG_SHEET.getRange(3, i*3 + 3).getValue()
    push_all += members[i].name+' : 残り '+ balance + ' 円\n'
  }
  push_all = push_all.slice(0, -1)
  push(push_all)
}

function push(text){
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  const postData = {
    "to" : GROUP_ID,
    "messages" :[
      {
        'type':'text',
        'text': text,
      }
    ]
  };

  const options = {
    "method":"post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(PUSH, options);
}



