import { useState, createContext } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [formData, setformData] = useState({
        type: "expense",
        amount: 0,
        description: ""
    });

    const [value, setvalue] = useState("expense");
    const [totalExpense, settotalExpense] = useState(0);
    const [totalIncome, settotalIncome] = useState(0);
    const [allTransactions, setallTransactions] = useState([]);

    function handleFormSubmit(currentFormData) {
        console.log(currentFormData);

        if (!currentFormData.description || !currentFormData.amount) return;

        setallTransactions([...allTransactions, { ...currentFormData, id: Date.now() }]);
    }

    console.log(allTransactions);


    return (
        <GlobalContext.Provider
            value={{
                formData,
                setformData,
                value,
                setvalue,
                totalExpense,
                settotalExpense,
                totalIncome,
                settotalIncome,
                allTransactions,
                setallTransactions,
                handleFormSubmit,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}
