
var requests = {
///////////////////////Users Requests////////////////////

//return users in house
//LOCATION: App 
getUsers: function() {
  fetch(process.env.Base_URL + '/', {
    method: 'GET',
    headers: {
      //at some point will need to set token on AsynchSt.
      //which acts just as local storage did. Async Storage
      //is promisified, but don't think we need here b/c 
      //we're only retrieving the value
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(users) {
    //update state users array with response
    this.setState({users: users});
  })
},

//gets image for this user 
//LOCATION: App
getUserImage: function() {
  fetch(process.env.Base_URL + '/users/images', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(url) {
    this.state.imageUrl = url[0].userImageUrl || "https://s-media-cache-ak0.pinimg.com/736x/fb/e1/cd/fbe1cdbc1b728fbb5e157375905d576f.jpg";
    this.state.name = url[0].name;
    this.setState({imageUrl: this.state.imageUrl, name: this.state.name});
  })
},

//get the session
//LOCATION: App
getSession: function() {
  AsyncStorage.removeItem('obie')
  fetch(process.env.Base_URL + '/obie/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(function(session) {
    //asyncstorage is promisified
    AsyncStorage.setItem('obie', session)
      .then(function() {
        this.getUserImage();
        this.getHouseCode();
        this.getUsers();
      })
  })
},

//gets the code for the house
//LOCATION: App
getHouseCode: function() {
  fetch(process.env.Base_URL + '/housez/code', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(code) {
    this.setState({houseCode: code[0].token});
    this.setState({houseName: code[0].name});
  })
},

//remove user from house
//LOCATION: App
leaveHouse: function() {
  fetch(process.env.Base_URL + '/users/leave', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(code) {
    AsyncStorage.removeItem('obie')
    .then(function() {
      //may need to be adjusted, not sure exactly what 
      //this does. 
      window.location.href="/registration";
    });
  })
},

//update token after a user leaves the house
//LOCATION: App
updateTokenAfterLeaveHouse: function() {
   fetch(process.env.Base_URL + '/obie/updateLeaveHouse', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(token) {
    AsyncStorage.setItem('obie', token);
  })
},

///////////////REGISTRATION REQs////////////////

//add house to the database
addHouse: function(house) {
   fetch(process.env.Base_URL + '/houses', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify(house)
  })
  .then(function(data) {
    getHouseToken(data.insertId);
  })
},

updateSession: function() {
  fetch(process.env.Base_URL + '/obie/tokenChange', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(session) {
    AsyncStorage.setItem('obie', session)
      .then(function() {
        window.location.href ='/';
      })
  })
},

updateHouseWithLandlordId: function(houseToken) {
  fetch(process.env.Base_URL + '/properties/add/' + houseToken, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(data) {
    alert('Invalid property code or property already has landlord');
  })
},

updateLandlordHouseId: function() {
  fetch(process.env.Base_URL + '/property/landlord/house', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(data) {
    window.location.href = '/logout'
  })
},

updateLandlordHouseId: function(houseId) {
  fetch(process.env.Base_URL + '/houses/users', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify({houseId: houseId})
  })
  .then(function(data) {
    updateSession();
  })
},

////////////////CHORE REQUESTS///////////////////

//load all chores for that house
//LOCATION Chore Component --> Chore Container
loadChores: function() {
  fetch(process.env.Base_URL + '/chores/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(chores) {
    this.setState({chores: chores});
  })
},

//post a new chore
//LOCATION Chore Component --> Chore Container
formSubmit: function(chore) {
  fetch(process.env.Base_URL + '/chores', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify(chore)
  })
  .then(function(data) {
    this.loadChores();
    socket.emit('chore', chore);
  })
},

//update the status of a chore
//LOCATION Chore Component --> Chore Entry
updateChoreStatus: function() {
  //need to get the right chore id to pass in, may not be props
  fetch(process.env.Base_URL + '/chores/' + this.props.chore.id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(data) {
    //want to load the chores again, props may not be right
    this.props.loadChores();
  })
},

/////////////////////FINANCE REQUESTS//////////////////////

//load archive of all paid bills
//LOCATION: Finance Component --> Finance Container
loadBillHistory: function() {
  fetch(process.env.Base_URL + '/payment/completed', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(bills) {
    //update state's bill history
    this.state.billHistory = bills;
    this.setState({billHistory: this.state.billHistory});
  })
},

//load list of all payments made to you
//LOCATION: Fincance Component --> Finance Container 
loadPaymentHistory: function() {
  fetch(process.env.Base_URL + '/payment/completed/owed', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(payments) {
    this.state.paymentHistory = payments; 
    this.setState({paymentHistory: this.state.paymentHistory});
  })
},

//add a bill to the database
//LOCATION: Finance Component --> Finance Container
addBill: function(bill) {
  fetch(process.env.Base_URL + '/payment/bill', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify(bill)
  })
  .then(function(id) {
    this.createPayments(id)
    this.loadBills();
    socket.emit('bill');
  })
},

//add a payment to the database
//LOCATION: Finance Component --> Finance Container
addPayment: function(payment) {
  fetch(process.env.Base_URL + '/payment', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify(payment)
  })
  .then(function(data) {
    socket.emit('bill');
  })
},

//load all bills user owes from the database
//LOCATION: Finance Component --> Finance Container
loadBills: function() {
  fetch(process.env.Base_URL + '/payment/pay', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(bills) {
    this.state.bills = bills; 
    this.setState({bills: this.state.bills});
  })
},

//load all payments made to the user
//LOCATION: Finance Component --> Finance Container
loadPayments: function() {
  fetch(process.env.Base_URL + '/payment/owed', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(payments) {
    this.setState({paymentsOwed: payments});
  })
},

//make a venmo payment
//LOCATION: Finance Component --> Bill Entry
makeVenmoPayment: function(venmoData) {
  fetch(process.env.Base_URL + '/auth/venmo/payment', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify(venmoData)
  })
  .then(function(payments) {
    this.markPaymentAsPaid(venmoData.id);
  })
},

//updates status of payment to paid in the database
//LOCATION: Finance Component --> Bill Entry 
markPaymentAsPaid: function(paymentId) {
  fetch(process.env.Base_URL + 'payment/' + paymentId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(function(data) {
    this.props.loadBills();
  })
},

///////////////////MESSAGES REQUESTS////////////////////

//load all messages for this user
//LOCATION: Message Component --> Message Container
loadMessages: function() {
  fetch(process.env.Base_URL + '/messages', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(messages) {
    this.setState({messages: messages});
  })
},

//post a message to the database
//LOCATION: Message Component --> Message Container
formSubmit: function(message) {
  fetch(process.env.Base_URL + '/messages', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify(message)
  })
  .then(function(messages) {
    this.setState({messages: messages});
  })
},

//////////////////LANDLORD MESSAGE REQs////////////////////

//landlord sees all public messages
//LOCATION: MessageLandLord Component --> Landlord Message Container
loadMessages: function() {
  fetch(process.env.Base_URL + '/messages/landlord', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    }
  })
  .then(function(messages) {
    this.setState({messages: messages});
  })
},

//landlord posts a message 
//LOCATION: MessageLandLord Component --> Landlord Message Container
formSubmit: function(message) {
  fetch(process.env.Base_URL + '/messages/landlord', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': AsyncStorage.getItem('obie')
    },
    body: JSON.stringify(message)
  })
  .then(function(messages) {
    this.loadMessages()
    socket.emit('message', message);
  })
}

}





