type Recipe = {
    id: number;
    userId: number;
};

type Chef = {
    id: number;
    birthDate: string;
}



async function getChefBirthday(id: number): Promise<string> {
    let ricetta: Recipe | { message: string };

    const responseRicetta = await fetch(`https://dummyjson.com/recipes/${id}`);
    ricetta = await responseRicetta.json();

    if ("message" in ricetta) { //qui sto usando un type guard per controllare il message - se c'è un message c'è un problema con la ricetta
        throw new Error(ricetta.message)
    }
    const userId = ricetta.userId       //se non c'è il message, allora è Recipe ee di conseguenza anche userID è sicuro 

    const chefResponse = await fetch(`https://dummyjson.com/users/${userId}`);
    const chef: Chef | { message: string } = await chefResponse.json()

    if ("message" in chef) {
        throw new Error(chef.message)
    }

    return chef.birthDate;
}


(async () => {
    try {
        const compleannoChef = await getChefBirthday(2);
        console.log('Lo chef è nato il ', compleannoChef);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Si è verificato un errore : ", error.message);
        }

    } finally {
        console.log("Operazione completata!")
    }

})();