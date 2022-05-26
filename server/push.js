// Modules
const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64')
const Storage = require('node-storage')

// Vapid Keys
const vapid = require('./vapid.json')

// Configure web-push
webpush.setVapidDetails(
  'mailto:ray@stackacademy.tv',
  vapid.publicKey,
  vapid.privateKey
)

// Subscriptions
const store = new Storage(`${__dirname}/db`)
let subscriptions = store.get('subscriptions') || []

// Create URL safe vapid public key
module.exports.getKey = () => urlsafeBase64.decode( vapid.publicKey )

// Store new subscription
module.exports.addSubscription = (subscription) => {

  // Add to subscriptions array
  subscriptions.push(subscription)

  // Persist subscriptions
  store.put('subscriptions', subscriptions)
}

// Send notifications to all registered subscriptions
module.exports.send = (message) => {

  // Loop subscriptions
  subscriptions.forEach( (subscription, i) => {

    // Send Notification
    webpush.sendNotification( subscription, message )
  })
}
