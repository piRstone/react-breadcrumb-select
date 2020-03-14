import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './styles';
import BreadcrumbSelect from '../src';

import data from './data.json';

function ExampleApp() {
  const [selectedValue, setSelectedValue] = useState(undefined);

  return (
    <div className="container pt-3">
      <div className="row mb-3">
        <div className="col-12">
          <h1>React Breadcrumb Select</h1>
          <code>npm install --save react-breadcrumb-select</code>
          <a
            href="https://github.com/piRstone/react-breadcrumb-select"
            target="_blank"
            rel="noopener noreferrer"
            className="float-right"
            style={{ color: '#000' }}
          >
            <i className="fa fa-github" />
            <span style={{ marginLeft: '5px' }}>Github</span>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6  mb-4">
          <div style={styles.wrapper}>
            <BreadcrumbSelect
              data={data}
              onChange={e => setSelectedValue(e)}
              placeholder="Select something..."
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div style={styles.wrapper}>
            <h5>Result:</h5>
            {selectedValue ? (
              <pre>{JSON.stringify(selectedValue, null, 1)}</pre>
            ) : (
              <p className="font-italic" style={{ color: '#888' }}>
                Select an element to display its data.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const app = document.getElementById('app');
ReactDOM.render(<ExampleApp />, app);
