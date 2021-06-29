function doPost(e) {
  const event = JSON.parse(e.postData.contents).events[0];
  const message = event.message.text
  const post_user = event.source.userId
  const reply_token = event.replyToken

  const id = members.findIndex(({user_id})=>user_id === post_user)
  
  // record_user_info(post_user)

  if (!isNaN(message)){
    const payment = parseInt(message) * -1
    record_payment(payment, id)
    reply_balance(id, reply_token)
  }else if (message === '残金' || message === '残高'){
    reply_balance(id, reply_token)
  }else if (message === 'みんな'){
    reply_balance_all(reply_token)
  }else if (message === 'ログ' || message === '詳細'){
    reply_message(reply_token, 'https://docs.google.com/spreadsheets/d/1OMdvh5Y9TTK3YR4gAtfjfbvhggWex61JdcPkq3Vufxs/edit?usp=sharing')
  }else if (message === 'トップ' || message === 'ホームページ'){
    reply_message(reply_token, 'https://www.pokemon-card.com/')
  }else if (message.slice(0,3) === '検索　' || message.slice(0, 3) === '検索 '){
    reply_message(reply_token, 'https://www.pokemon-card.com/card-search/index.php?keyword='+message.slice(3)+'&regulation_faq_main_item1=XY')
  }else if (message.slice(0,4) === 'ルール　' || message.slice(0, 4) === 'ルール '){
    reply_message(reply_token, 'https://www.pokemon-card.com/rules/faq/search.php?freeword='+ message.slice(4)+'&regulation_faq_main_item1=XY')
  }else if (message === 'ヘルプ'){
    const help = "入力：アクション\n\n 数字：使用金額の登録\n「残金」：自分の残金の表示\n「みんな」：みんなの残金の表示\n「ログ」：詳細シートのリンク\n「トップ」：公式HPへのリンク\n「検索 X」：Xのカードを検索\n「ルール Y」：Yのルールを検索"
    reply_message(reply_token, help)
  }
}






