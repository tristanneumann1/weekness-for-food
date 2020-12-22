import firebase from 'firebase/app';
import 'firebase/database';

export default class FirebaseClient {
  constructor () {
    this.db = firebase.database()
  }
  read (ref, filters = []) {
    const locationRef = this.db.ref(ref)
    const filteredRef = filters.reduce((locationRef, filter) => {
      if (!filter.value) {
        return locationRef
      }
      return locationRef.orderByChild(filter.key).equalTo(filter.value)
    }, locationRef)
    return new Promise(resolve => {
      filteredRef.on('value', (snapshot => {
        const data = snapshot.val();
        resolve(data)
      }))
    })
  }
  set (ref, value) {
    const locationRef = this.db.ref(ref)
    return new Promise((resolve, reject) => {
      locationRef.set(value).then(err => {
        if (err) {
          reject(err)
          return
        }
        resolve('OK')
      })
    })
  }
  delete (ref) {
    const locationRef = this.db.ref(ref)
    return new Promise((resolve, reject) => {
      locationRef.remove().then(err => {
        if (err) {
          reject(err)
          return
        }
        resolve('OK')
      })
    })
  }
}
