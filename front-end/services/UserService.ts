import { User } from "next-auth";
import { IUserService } from "./IUserService";
import { firestore } from '../firebase/clientApp'
import { collection, getDocs, query, where, DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
import bcrypt from 'bcrypt';
import { addDoc } from "firebase/firestore";

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

interface CustomUser extends User {
  password: string;
}

export class FirebaseUserService implements IUserService {
  async signInCredentials(email: string, password: string): Promise<CustomUser> {
    const usersCollection = collection(firestore, 'usersTEST');
    const usersQuery = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(usersQuery);

    if (querySnapshot.empty) {
      throw new Error("Invalid email or password");
    }

    const userSnapshot = querySnapshot.docs[0] as QueryDocumentSnapshot<DocumentData>;
    const user = userSnapshot.data() as CustomUser;

    console.log(user); // Log the user object

    return user;
  }

  async createUser(email: string, password: string, name: string, role: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user with the hashed password in the database
    // Example code for saving the user to the Firestore database
    const usersCollection = collection(firestore, 'usersTEST');
    await addDoc(usersCollection, {
      email,
      password: hashedPassword,
      name,
      role
    });
  }
}

export const userService = new FirebaseUserService();
