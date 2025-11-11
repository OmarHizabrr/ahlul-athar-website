import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    Timestamp,
    updateDoc,
    where,
    type CollectionReference,
    type DocumentReference,
    type QueryConstraint,
    type QueryDocumentSnapshot
} from "firebase/firestore";
import { db } from "./firebase";

export class FirestoreApi {
  getCollection(collectionName: string): CollectionReference {
    return collection(db, collectionName);
  }

  getDocument(collectionName: string, docId: string): DocumentReference {
    return doc(db, collectionName, docId);
  }

  async getDocuments(
    collectionRef: CollectionReference,
    field?: string,
    value?: string,
    maxResults?: number,
    constraints: QueryConstraint[] = [],
  ): Promise<QueryDocumentSnapshot[]> {
    try {
      let filters: QueryConstraint[] = [...constraints];

      if (field && value) {
        filters = [...filters, where(field, "==", value)];
      }

      if (maxResults) {
        filters = [...filters, limit(maxResults)];
      }

      const q =
        filters.length > 0 ? query(collectionRef, ...filters) : collectionRef;

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs;
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  }

  async getDocumentData(collectionName: string, docId: string) {
    try {
      const docRef = this.getDocument(collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }

      throw new Error("Document not found");
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  async addData(
    collectionRef: CollectionReference,
    data: Record<string, unknown>,
  ) {
    try {
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      return docRef.id;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  }

  async updateData(
    docRef: DocumentReference,
    data: Record<string, unknown>,
  ) {
    try {
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  async deleteData(docRef: DocumentReference) {
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }
}

export const firestoreApi = new FirestoreApi();

