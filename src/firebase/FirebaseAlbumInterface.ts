import { DocumentData, DocumentReference } from "firebase/firestore";

import { AlbumInterface } from "../common/AlbumInterface";

export interface FirebaseAlbumInterface extends AlbumInterface {
  id: string;
  ref: DocumentReference<DocumentData>;
}
