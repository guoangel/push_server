// Modules
const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64')

// Vapid Keys
const vapid = require('./vapid.json')

// Subscriptions
let subscriptions = []

// Create URL safe vapid public key
module.exports.getKey = () => urlsafeBase64.decode( vapid.publicKey )

// Store new subscription
module.exports.addSubscription = (subscription) => {

  // Add to subscriptions array
  subscriptions.push(subscription)

  console.log(subscriptions);
}
