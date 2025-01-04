const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteTomorrowOrders = functions.pubsub.schedule('every 24 hours').timeZone('Asia/Kolkata').onRun(async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateKey = tomorrow.getDay()+""+tomorrow.getMonth()+1+""+tomorrow.getFullYear();  // Format: 'datemonthyear'

    const ordersRef = admin.database().ref('ProcessedShopOrders');
    const snapshot = await ordersRef.once('value');

    snapshot.forEach((childSnapshot) => {
      const orderKey = childSnapshot.key;

      if (orderKey === dateKey) {
        // Delete tomorrow's order , this is to make sure that [1112023 don't clash up , if we are doing 1 nov , on 31st oct we need to delete all orders of 11 january.]
        console.log("Found clash on ",dateKey);
        ordersRef.child(orderKey).remove();
      }
    });

    return 'Tomorrow\'s order deleted successfully';
  } catch (error) {
    console.error('Error deleting tomorrow\'s order:', error);
    return null;
  }
});
