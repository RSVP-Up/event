import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import Event from './components/Event';
import data from './sample_data';

ReactDOM.render(<Event data={data} />, document.getElementById('event'));
