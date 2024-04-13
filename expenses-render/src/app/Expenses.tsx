import { useEffect, useState } from "react";

type Expense = {
  id: string;
  name: string;
  cost: number;
};

const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/expenses");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  return response;
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>();

  const fetchExpenses = async () => {
    const fetchedExpenses = await getExpenses();
    setExpenses(fetchedExpenses);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!expenses) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <ul className="entire-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="card">
              <div className="card-text">
                <div>{expense.name}</div>
                <div>{expense.cost}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
