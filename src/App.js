import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import UseCallbackExample from "./UseCallbackExample";
import BlogV2 from "./blog-v2/Blog";

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        {/*<UseCallbackExample />*/}
        <BlogV2 />
      </div>
    )
  }
}

export default App;
