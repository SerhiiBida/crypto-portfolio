import {getDatabase, ref, set, onValue, off} from "firebase/database";

import {doc, setDoc, onSnapshot} from "firebase/firestore";

import {db} from "@/main.js";

export default class User {
    #db = db;

    addUserRole(user, isAdmin = false) {
        setDoc(doc(this.#db, "users", user.uid), {
            email: user.email,
            is_admin: isAdmin
        });
    }

    listenerUserRole(userId, userStore) {
        const userRef = doc(this.#db, "users", userId);

        return onSnapshot(userRef, (doc) => {
            const data = doc.data();

            if (data) {
                userStore.updateIsAdmin(data.is_admin);
            }
        });
    }

    listenerOff(listenerUser) {
        return listenerUser ? listenerUser() : null;
    }
}