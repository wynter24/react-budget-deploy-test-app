// 단축키 rce
import React, { useState } from 'react'
import "./App.css";
import ExtenseForm from './components/ExtenseForm';
import ExtenseList from './components/ExtenseList';
import Alert from './components/Alert';

const App = () => {
  const [expenses, setExpense] = useState([
    { id: 1, charge: "렌트비", amount: 1600},
    { id: 2, charge: "교통비", amount: 400},
    { id: 3, charge: "식비", amount: 1200},
  ]);
  const [charge,setCharge] = useState('');
  const [amount,setAmount] = useState(0);
  const [alert, setAlert] = useState({ show: false });
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);

  const handleAlert = ({type, text}) => {
    setAlert({ show: true, type, text});
    setTimeout(() => {
      setAlert({show: false})
    }, 7000);
  }

  const handleAdit = (id) => {
    const expense = expenses.find(item => item.id === id);
    const {charge, amount} = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const handleDelet = (id) => {
    const newExpense = expenses.filter(item => item.id !== id)
    setExpense(newExpense);
    handleAlert({type: 'danger', text:'아이템이 삭제되었습니다.'})
  }

  const clearItem = () => {
    setExpense([]);
  }

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge !== '' && amount > 0) {
      if(edit) {
        const newExpense = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        });
        setExpense(newExpense);
        setEdit(false);
        handleAlert({type: 'success', text: '아이템이 수정되었습니다.'})
      } else {
        const newExpense = {id: crypto.randomUUID, charge, amount};
        // 불변성을 지키기 위해 새로운 expense 생성 = 원본 유지하면서 추가
        const newExpenses = [...expenses, newExpense];
        setExpense(newExpenses);
        handleAlert({type: 'success', text: '아이템이 생성되었습니다.'})
      }
      setCharge('');
      setAmount(0);
    } else {
      handleAlert({
        type: 'danger', 
        text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.'
      })
    }
  }

    return (
      <main className='main-container'>
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
        <h1>예산 계산기</h1>

        <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          <ExtenseForm 
            charge={charge} 
            handleCharge={handleCharge} 
            amount={amount} 
            handleAmount={handleAmount} 
            handleSubmit={handleSubmit}
            edit={edit}
        />
        </div>

        <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          <ExtenseList 
            expenses={expenses} 
            handleDelet={handleDelet}
            handleAdit={handleAdit} 
            clearItem={clearItem}
          />
        </div>

        <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
          <p style={{fontSize: '2rem'}}>
            총지출:
            <span>
              {expenses.reduce((acc, cur) => {
                return (acc += cur.amount)
              },0)}
              원
            </span>
          </p>
        </div>
      </main>
    )
}

export default App
