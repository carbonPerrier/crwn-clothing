import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import CheckoutPage from './pages/checkout/checkout.component';

import { setCurrentUser } from './redux/user/user.actions';

import {connect} from 'react-redux';

class App extends React.Component {

  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null; 

  componentDidMount() {

    const {setCurrentUser, currentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        this.unsubscribeFromSnapshot = userRef.onSnapshot(snapshot => {

          setCurrentUser({
            currentUser : {
              id: snapshot.id,
              ...snapshot.data()
            }
          });

        });
      } else {
        setCurrentUser({
          currentUser : null
        });
      }
      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapshot();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' 
                 render = {
                   () => this.props.currentUser ? (<Redirect to="/"/>) : <SignInAndSignUpPage/>}
          />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    currentUser: user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (payload) => dispatch(setCurrentUser(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);