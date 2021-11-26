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

const authorizationCode = '1000.c439438b0d36d99ddffb8f8c64169847.21bc61c7e023305c83ec49c5ce01c9cc'
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
    //https://accounts.zoho.com/oauth/v2/auth?access_type=offline&prompt=consent&client_id=1000.V5O4UF1P7AC365048LH5QC0TUETOTS&redirect_uri=https://deluge.zoho.com/delugeauth/callback&response_type=code&scope=Desk.tickets.ALL%2CDesk.search.READ%2CDesk.contacts.ALL&state=Public__709295732__709286518__5000000030468021
    )
    accessToken = res.data.access_token
    
  }catch(e){
    console.log(e)
  }

  return accessToken

}

const createTicket = async(contactId,email, ticketDescription) => {

  // accessToken = await getAccessToken()
  
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
          subject : "Testing subject",
          dueDate : "2022-06-21T16:16:16.000Z",
          departmentId : departmentId,
          channel : "Email",
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

const giveResponseToSlack = (reqObj, responseObj) => {
  
  ///use responseObj as per your need
  var data = JSON.stringify({
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": reqObj.user_id,
          "emoji": true
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
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}


app.post('/check',async(req,res)=> {
  //This code is for sending response on same chat where we put our Slash Command
  
  data1 = req.body
  
  const profile = await getSlackUserProfile(data1.user_id)

  if(profile.email){
    const contactId = await getUserZohoContactId(profile)
    

    if(contactId){
      const ticketObject = await createTicket(contactId,profile.email, data1.text)
      
      if(ticketObject){
        console.log('ticket generated')
        const responseObj = {
          message: 'ticket generated',
          ticket: {...ticketObject},
          slackProfile: profile,
          zohoContactId: contactId
        }
        res.send(responseObj)


        /// Uncomment below command to send response back to slack
        // giveResponseToSlack(data1,responseObj)
      

      }else{
        console.log('ticket not generated')
      }
      
    }else{
      console.log('contactID not generated')
    }
  }else{
    console.log('email not received in profile')
  }

});

  
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