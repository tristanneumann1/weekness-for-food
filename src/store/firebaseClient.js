import firebase from 'firebase/app';
import 'firebase/database';

export default class FirebaseClient {
  constructor () {
    this.db = firebase.database()
  }
  read (ref) {
    const locationRef = this.db.ref(ref)
    return new Promise(resolve => {
      locationRef.on('value', (snapshot => {
        const data = snapshot.val();
        resolve(data)
      }))
    })
  }
  set (ref, name, value) {
    const locationRef = this.db.ref(ref)
    const pushRef = locationRef.child(name)
    return new Promise((resolve, reject) => {
      pushRef.set(value).then(err => {
        if (err) {
          reject(err)
          return
        }
        resolve('OK')
      })
    })
  }
}
