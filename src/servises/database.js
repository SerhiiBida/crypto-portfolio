import {doc, setDoc, onSnapshot, collection, query, where, getDocs} from "firebase/firestore";

import {db, pinia} from "@/main.js";
import {usePortfoliosStore} from "@/stores/portfolios.js";

export default class User {
    #db;

    constructor() {
        this.#db = db;
    }

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


export class Portfolios {
    #db;
    #portfoliosStore;

    constructor() {
        this.#db = db;
        this.#portfoliosStore = usePortfoliosStore(pinia);
    }

    listenerUserPortfolios(userId) {
        const portfoliosRef = query(
            collection(this.#db, "portfolios"),
            where("user_id", "==", userId)
        );

        return onSnapshot(portfoliosRef, (querySnapshot) => {
            const portfolios = [];

            querySnapshot.forEach((doc) => {
                const id = doc.data().id;
                const name = doc.data().name;

                portfolios.push({
                    id,
                    name
                });
            });

            this.#portfoliosStore.updateData(portfolios);
        });
    }

    listenerOff(listenerPortfolios) {
        return listenerPortfolios ? listenerPortfolios() : null;
    }
}