import { Injectable } from '@angular/core';
import { getDocs, orderBy, query, setDoc, where } from '@angular/fire/firestore';
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
    //Alterar em todos os campos que chama essa função
    await setDoc(doc(this.dataUser, data.id),{
      nome:data.nome,
      email: data.email,
          });
  }

  async updateRequest(data:any){
    console.log(data)
    await setDoc(doc(this.solicitationCollection, data.id),data);

  }

  async readRequests() {
    const q = query(this.solicitationCollection, orderBy('abertura','desc'));
    return await getDocs(q);
  }

}
