const MEMBER_SHEET = SpreadsheetApp.openById(SHEET_ID).getSheetByName('メンバー')
const LOG_SHEET = SpreadsheetApp.openById(SHEET_ID).getSheetByName('ログ')

function record_payment(payment, id){
  const range = members[id].column + ':' + members[id].column
  let rangeData = LOG_SHEET.getRange(range).getValues()
  let last_row = 4;
  for(let i=4; i<rangeData.length; i++){
    if(rangeData[i][0]){
      continue
    }
    last_row = i
    break
  }
  LOG_SHEET.getRange(last_row+1, id*3+1).setValue(new Date())
  LOG_SHEET.getRange(last_row+1, id*3+2).setValue(payment)
}

function describe_border(){
  for (var id = 0; id<members.length; id++){
    const range = members[id].column + ':' + members[id].column
    let rangeData = LOG_SHEET.getRange(range).getValues()
    let last_row = 4;
    for(let i=4; i<rangeData.length; i++){
      if(rangeData[i][0]){
        continue
      }
      last_row = i
      break
    }

    let border = LOG_SHEET.getRange(last_row+1, id*3+1, 1, 2)
    border.setValue('---')
    border.setHorizontalAlignment('center')
    // LOG_SHEET.getRange(last_row+1, id*3+1).setValue('---')
    // LOG_SHEET.getRange(last_row+1, id*3+2).setValue('---')
  }
}

function record_user_info(user_id){

  var sheet =  MEMBER_SHEET
  var lastRow = sheet.getLastRow();
  
  // sheet.getRange(lastRow + 1, 1).setValue(getUserProfile(user_id))
  sheet.getRange(lastRow + 1, 2).setValue(user_id)
}

function getUserProfile(user_id){ 
  var url = 'https://api.line.me/v2/bot/profile/' + user_id;
  var userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + ACCESS_TOKEN,
    },
  })
  return JSON.parse(userProfile).displayName;
}


