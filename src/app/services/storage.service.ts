import { Injectable } from '@angular/core';
import { uploadBytesResumable } from '@angular/fire/storage';
import {getStorage,ref,listAll,ListResult, getDownloadURL, uploadBytes,} from 'firebase/storage';
import { Observable, from } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = getStorage();
  private listRef = ref(this.storage, '/pontos turísticos');

  constructor() {}

  async setFiles(input: any): Promise<string> {
    if (!input.files) return '';
    const files: FileList = input.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, `pontos turísticos/${file.name}`);
        await uploadBytesResumable(storageRef, file);


        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      }
    }
    return '';
  }

}
