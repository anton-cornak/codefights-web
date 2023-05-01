import { User } from "next-auth";
import { IUserService } from "./IUserService";
import { firestore } from '../firebase/clientApp'
import { collection, getDocs, query, where, DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export class FirebaseUserService implements IUserService {
  async signInCredentials(email: string, password: string): Promise<User> {
    const usersCollection = collection(firestore, 'usersTEST');
    const usersQuery = query(usersCollection, where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(usersQuery);

    if (querySnapshot.empty) {
      throw new Error("Invalid email or password");
    }

    const userSnapshot = querySnapshot.docs[0] as QueryDocumentSnapshot<DocumentData>;
    const user = userSnapshot.data() as User;
    
    return user;
  }
}

export const userService = new FirebaseUserService();
