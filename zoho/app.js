const express = require('express')
const axios = require('axios')
const config = require('./config');
const qs = require('qs')

//let jsonParser = bodyParser.json()
// express() creates the http server
const app = express()
//const bodyParser = require('boday-parser')

app.use(express.urlencoded({extended:false}));
app.use(express.json())
//let urlencodedParser = bodyParser.urlencoded({ extended: false })
// express.json() returns a piece of middleware. app.use means we want to use middleware in request processing pipeline
// So this statement automatically parses json object in request processing pipeline

const authorizationCode = '1000.9563ac8364f635e85d2b02873c30c8e7.9cfda60287403136c4f9bbb29f5e515b'
const orgId = config.orgId
let refreshToken = config.refresh_token
let departmentId = "481049000000006907"
let accessToken = null

if(!refreshToken){
// if(true){

  axios.post('https://accounts.zoho.com/oauth/v2/token',null,{
      params: {
        code: authorizationCode,
        client_id: config.client_id,
        client_secret: config.client_secret,
        grant_type:'authorization_code',
        redirect_uri: 'https://cloudinfosystem.com/'
      }
    }
  )
  .then((res) => {
    refreshToken = res.data.refresh_token
    config.setRefreshToken(res.data.refresh_token)
    console.log('refreshToken', res.data)
  })
}


app.get('/', (req, res) => {

  res.send(`hello hi world`)
})


const getAccessToken = async() => {
  // console.log('refreshtoken', refreshToken)
  
  try{

    const res = await axios.post('https://accounts.zoho.com/oauth/v2/token',null,{
      params: {
        refresh_token: refreshToken,
        client_id:config.client_id,
        client_secret: config.client_secret,
        grant_type:'refresh_token',
        redirect_uri: 'https://cloudinfosystem.com/'
      }
    }
    )
    accessToken = res.data.access_token
    
  }catch(e){
    console.log(e)
  }

  return accessToken

}
//

const createTicket = async(contactId,email,user_name, ticketDescription) => {

  //accessToken = await getAccessToken()
  
  if(accessToken){

    try{

      ticketRes = await axios({
        method:'post',
        url: 'https://desk.zoho.com/api/v1/tickets',
        headers : {
          orgId: orgId,
          Authorization: `Zoho-oauthtoken ${accessToken}` 
        },
        data: {
          contactId : contactId,
          subject : user_name + " has raised an issue from Slack",
          dueDate : "",
          departmentId : departmentId,
          channel : "Slack",
          description : ticketDescription,
          priority : "High",
          classification : "",
          email : email,
          status : "Open"
        }
      })
      return ticketRes.data
    }catch(e){
      console.log('ticket error', e.response.data)
    }
  }
  return null
  
}
const getdepartmentName = async() => {
  if(departmentId && accessToken){
  //get department name based on departmentId
  const config = {
    method: 'get',
    url: `https://desk.zoho.com/api/v1/departments/${departmentId}`,
    headers : {
      orgId: orgId,
      Authorization: `Zoho-oauthtoken ${accessToken}` 
    },
    
  };
  
  let department = null
  try{
    const response = await axios(config)
    if(response.data.isEnabled === true){
      department = response.data.name
      console.log(department)
    }else{
      console.log('Department is not Enabled:', response.data.isEnabled)  
    }
  }catch(e){
    console.log('error while getting department', e)
  }
  return department
}
}

const getSlackUserProfile = async(user_id) => {
  
  const config = {
    method: 'get',
    url: `https://slack.com/api/users.profile.get?user=${user_id}`,
    headers: { 
      'Authorization': 'Bearer xoxb-20767781927-2751280251815-BC9NeFrQGuyiLcZp7nlOGWp7', 
    },
    
  };
  
  let profile = null
  try{
    const response = await axios(config)
    if(response.data.ok){
      profile = response.data.profile
    }else{
      console.log('error in getting user profile from slack api', response.data.error)  
    }
  }catch(e){
    console.log('error in getting user profile from slack api', e)
  }
  return profile
}

const getUserZohoContactId = async(profile) => {
  
  accessToken = await getAccessToken()

  if(accessToken){

    let config = {
      method:'get',
      url: 'https://desk.zoho.com/api/v1/contacts',
      headers : {
        orgId: orgId,
        Authorization: `Zoho-oauthtoken ${accessToken}` 
      },
    }
    
    
    try{
      const res1 = await axios(config)
      
      for(let i = 0 ; i<res1.data.length; i++){
        if(res1.data[i].email === profile.email){
          return res1.data[i].id
        }
      }
    }catch(e){
      console.log(e)
    }

    // execution has come here it means contact id is not found so create contact by this email
    config = {
      method: 'post',
      url: 'https://desk.zoho.com/api/v1/contacts',
      headers : {
        orgId: orgId,
        Authorization: `Zoho-oauthtoken ${accessToken}` 
      },
      data:{
        lastName: profile.last_name,
        firstName: profile.first_name,
        email: profile.email,
        phone: profile.phone
      }
    }
    
    try{
      const res2 = await axios(config)
      return res2.data.id
    }catch(e){
      console.log(e)
    }
    
    return null
  }
}

const giveResponseToSlack = async(reqObj, responseObj) => {
  
  ///use responseObj as per your need
  let assignedto  = responseObj.ticket.assigneeId
  // If ticekt is not assigned then make default value as Unassigned
  if( assignedto === null)
  {
    assignedto = "Unassigned"
  }
  // call department function for getting department Name form ID
  let departmentName =  await getdepartmentName()
  var data11 = JSON.stringify({
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Ticket:* #"+responseObj.ticket.ticketNumber+":\n*Subject: <https://desk.zoho.com/support/demo1aarialife/ShowHomePage.do#Cases/dv/"+responseObj.ticket.id+" | "+responseObj.ticket.subject+">*"
        }
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*Ticket Owner*\n" + assignedto
          },
          {
            "type": "mrkdwn",
            "text": "*Status:*\n" + responseObj.ticket.status
          },
          {
            "type": "mrkdwn",
            "text": "*Department:*\n" + departmentName
          },  
          {
            "type": "mrkdwn",
            "text": "*Submitted On:*\n" + responseObj.ticket.createdTime
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Description:*\n "+responseObj.ticket.description
        }
      }
    ]
  });
  
  var config = {
    method: 'post',
    url: reqObj.response_url,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data11
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data11));
  })
  .catch(function (error) {
    console.log(error);
  });
}


app.post('/check',async(req,res)=> {
  //This code is for sending response on same chat where we put our Slash Command
  let flage = false
  data1 = req.body
  
  const profile = await getSlackUserProfile(data1.user_id)

  if(profile.email){
    const contactId = await getUserZohoContactId(profile)
    

    if(contactId){
      const ticketObject = await createTicket(contactId,profile.email, profile.real_name ,data1.text)
      
      if(ticketObject){
        console.log('ticket generated')
        const responseObj = {
          message: 'ticket generated',
          ticket: {...ticketObject},
          slackProfile: profile,
          zohoContactId: contactId
        }
        res.send("")
        flage = true

        /// Uncomment below command to send response back to slack
        giveResponseToSlack(data1,responseObj)
      

      }else{
        console.log('ticket not generated')
      }
      
    }else{
      console.log('contactID not generated')
    }
  }else{
    console.log('email not received in profile')
  }
  if(!flage)
  {
    res.send("Ticket not Generated!!")
  }
  });

// app.post('/slackSlashCommand', async(req,res) => {
//   ///get ticket description and user details

//   // call zoho api
  
//   const ticketObject = await createTicket()
//   if(ticketObject){
//     console.log('ticket generated', ticketObject)
//   }else{
//     res.send('ticket not generated')
//     console.log('ticket not generated')
//   }
  

  
// })

/*const get_slack_user = async() => {

  const slackaccessToken = "xoxb-20767781927-2751280251815-BC9NeFrQGuyiLcZp7nlOGWp7"
  let userlistRes
  if(accessToken){

    try{

      userlistRes = await axios({
        method:'get',
        url: 'https://slack.com/api/users.list',
        headers : {
          orgId: orgId,
          Authorization: `Bearer ${slackaccessToken}}` 
        },
        data: data
      })
      
    }catch(e){
      console.log(e)
    }
  }
  if(userlistRes){
    return userlistRes.data
  }
  return null
  
}
*/






const port = 3000

app.listen(port)    