import {doc, setDoc, onSnapshot, collection, query, where, addDoc} from "firebase/firestore";

import {db, pinia} from "@/main.js";
import {usePortfoliosStore} from "@/stores/portfolios.js";
import {useUserStore} from "@/stores/auth.js";

export default class User {
    #db;

    constructor() {
        this.#db = db;
    }

    async addUserRole(user, isAdmin = false) {
        try {
            await setDoc(doc(this.#db, "users", user.uid), {
                email: user.email,
                is_admin: isAdmin
            });
        } catch (error) {
            console.log(`Error, addUserRole: ${error}`);
        }
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
    #userStore;

    constructor() {
        this.#db = db;
        this.#portfoliosStore = usePortfoliosStore(pinia);
        this.#userStore = useUserStore();
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

    async addPortfolio(name) {
        const userId = this.#userStore.getUserId;

        try {
            await addDoc(collection(this.#db, "portfolios"), {
                user_id: userId,
                name,
                portfolio: {}
            });
        } catch (error) {
            console.log(`Error, addPortfolio: ${error}`);
        }
    }

    listenerOff(listenerPortfolios) {
        return listenerPortfolios ? listenerPortfolios() : null;
    }
}