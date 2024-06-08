import { AuthProvider } from './components/AuthContext';
import UserIcon from './components/Navigation/UserIcon';
import Navigation from './components/Navigation/Navigator';
import Footer from './components/footer';
// import Main from './components/Main/main';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/* <header>
          <UserIcon />
        </header> */}
        <Navigation />
        <Footer />
      </div>
    </AuthProvider>
  );
}
export default App;