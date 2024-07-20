import './App.css';
import UserCRUD from './components/UserCRUD';
import AccountCRUD from './components/AccountCRUD';

function App() {
    return (
        <>
          <div className="container">
            <UserCRUD />
            <AccountCRUD />
          </div>
        </>
      )
}

export default App;