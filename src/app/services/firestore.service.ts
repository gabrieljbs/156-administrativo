import { Injectable } from '@angular/core';
import { getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Firestore, collection, doc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore
  ) { }

  private dataUser = collection(this.firestore,'user')
  private solicitationCollection = collection(this.firestore, 'solicitation');

 async readUser(){
    const query= (this.dataUser)
    return await getDocs(query)
  }

  async updateUser(data:any){
    console.log('Chamando');
    await setDoc(doc(this.dataUser, data.uid),{
      nome:data.nome,
      email: data.email,
          });
  }

  async readRequests() {
    const q = query(this.solicitationCollection);
    return await getDocs(q);
  }

}
