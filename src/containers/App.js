import React from 'react'
import './App.css'

import FileProvider from '../context/file-context'
import PdfEditor from '../components/PdfEditor/PdfEditor'
import { Provider } from "react-redux";
import store from '../store/store';

function App()
{
  return (
    <Provider store={store}>
      <div className="App">
        <FileProvider>
          <PdfEditor />
        </FileProvider>
      </div>
    </Provider>
  )
}

export default App
