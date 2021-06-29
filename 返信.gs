const REPLY =  'https://api.line.me/v2/bot/message/reply';

function reply_balance(id, reply_token){
  const balance = LOG_SHEET.getRange(3, id*3 + 3).getValue()
  reply_message(reply_token, members[id].name+' : 残り '+ balance + ' 円')
}

function reply_balance_all(reply_token){
    let reply_all = ''
    for (var i = 0; i < members.length; i++){
      let balance = LOG_SHEET.getRange(3, i*3 + 3).getValue()
      reply_all += members[i].name+' : 残り '+ balance + ' 円\n'
    }
    reply_all = reply_all.slice(0, -1)
  reply_message(reply_token, reply_all)
}

function reply_message(reply_token, message){
  UrlFetchApp.fetch(REPLY, {
    'headers': {
      "Content-Type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },

    'method':'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': message,
    }],
  }),
  })
}
