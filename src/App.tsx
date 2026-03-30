import { useState } from 'react';
import LabelParser from './components/LabelParser';
import Menu from './components/Menu';

import './App.css';

function App() {
    const [searchText, setSearchText] = useState("");

    return (
        <div id='app'>
            <Menu onSearchChange={(text) => setSearchText(text)} />
            <LabelParser
                searchText={searchText}
            />
        </div>
    );
}

export default App;
