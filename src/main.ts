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

    if (!("message" in ricetta)) { //qui sto usando un type guard per controllare il message

    } else {
        throw new Error(ricetta.message)
    };

    const userId = ricetta.userId

    const chefResponse = await fetch(`https://dummyjson.com/users/${userId}`);
    let chef: Chef | { message: string } = await chefResponse.json()

    if ("message" in chef) {
        throw new Error(chef.message)
    }

    return chef.birthDate;
}