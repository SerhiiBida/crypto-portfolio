import {
    doc, setDoc, onSnapshot,
    collection, query, where,
    addDoc, updateDoc, deleteDoc,
    getDocs, increment
} from "firebase/firestore";

import {db, pinia} from "@/main.js";
import {usePortfoliosStore} from "@/stores/portfolios.js";
import {useUserStore} from "@/stores/auth.js";
import {delay} from "@/utils/utils.js";

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
        this.#userStore = useUserStore(pinia);
    }

    listenerUserPortfolios(userId) {
        const portfoliosRef = query(
            collection(this.#db, "portfolios"),
            where("user_id", "==", userId)
        );

        return onSnapshot(portfoliosRef, (querySnapshot) => {
            const portfolios = [];

            querySnapshot.forEach((doc) => {
                const id = doc.id;
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
            });
        } catch (error) {
            console.log(`Error, addPortfolio: ${error}`);
        }
    }

    async updatePortfolioName(portfolioId, name) {
        try {
            await updateDoc(doc(this.#db, "portfolios", portfolioId), {
                name: name
            });
        } catch (error) {
            console.log(`Error, updatePortfolioName: ${error}`);
        }
    }

    async deletePortfolio(portfolioId) {
        try {
            await deleteDoc(doc(this.#db, "portfolios", portfolioId));
        } catch (error) {
            console.log(`Error, deletePortfolio: ${error}`);
        }
    }

    listenerOff(listenerPortfolios) {
        return listenerPortfolios ? listenerPortfolios() : null;
    }

    async addCoinInPortfolio(portfolioId, {selectedCoin: coinId, coinsAmount, moneyAmount}) {
        try {
            await addDoc(collection(this.#db, "coins_in_portfolios"), {
                portfolio_id: portfolioId,
                coin_id: coinId,
                coins_amount: coinsAmount,
                money_amount: moneyAmount,
                date: new Date()
            });
        } catch (error) {
            console.log(`Error, addCoinInPortfolio: ${error}`);
        }

        // Не чаще 1 раза в секунду
        await delay(1000);
    }
}


export class Coins {
    #db;

    constructor() {
        this.#db = db;
    }

    async getCoins() {
        try {
            const coinsSnapshot = await getDocs(collection(this.#db, "coins"));

            const coins = [];

            coinsSnapshot.forEach((doc) => {
                coins.push(
                    {
                        id: doc.id,
                        name: doc.data().name,
                        image: doc.data().image
                    }
                );
            });

            return coins;

        } catch (error) {
            console.log(`Error, getCoins: ${error}`);
        }
    }
}