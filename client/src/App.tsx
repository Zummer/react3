import * as React from 'react';
import {Route} from 'react-router';
import {HomePage} from './components/pages/HomePage';

class App extends React.Component {
  public render() {
    return (
        <div>
            <Route
                path="/"
                exact={true}
                component={HomePage}
            />
        </div>
    );
  }
}

export default App;
