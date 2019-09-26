import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import nanoid from 'nanoid';
import { map } from 'lodash';
import { formatQuery } from '../src';
import QueryBuilder from '../src/controls/material/QueryBuilder';
import {
  AddActionElement,
  RemoveActionElement,
  NotToggle,
  ValueEditor,
  ValueSelector,
  CombinatorSelectorElement
} from '../src/controls/material';
import '../src/query-builder.scss';

const preparedFields = {
  primary: [{ name: 'firstName', label: 'First Name' }, { name: 'lastName', label: 'Last Name' }],
  secondary: [
    { name: 'age', label: 'Age' },
    { name: 'birthDate', label: 'Birth Date' },
    { name: 'isMusician', label: 'Is a musician' },
    { name: 'instrument', label: 'Instrument' }
  ],
  generic: [
    { name: 'firstName', label: 'First name' },
    { name: 'lastName', label: 'Last name' },
    { name: 'age', label: 'Age' },
    { name: 'gender', label: 'Gender' },
    { name: 'height', label: 'Height' },
    { name: 'job', label: 'Job' }
  ]
};

const preparedQueries = {
  primary: {
    id: `g-${nanoid()}`,
    rules: [
      {
        id: `r-${nanoid()}`,
        field: 'firstName',
        value: 'Steve',
        operator: '='
      },
      {
        id: `r-${nanoid()}`,
        field: 'lastName',
        value: 'Vai',
        operator: '='
      }
    ],
    combinator: 'and',
    not: false
  },
  secondary: {
    id: `g-${nanoid()}`,
    rules: [
      {
        field: 'age',
        id: `r-${nanoid()}`,
        operator: '>',
        value: '28'
      },
      {
        field: 'isMusician',
        id: `r-${nanoid()}`,
        operator: '=',
        value: true
      },
      {
        field: 'instrument',
        id: `r-${nanoid()}`,
        operator: '=',
        value: 'Guitar'
      }
    ],
    combinator: 'or',
    not: false
  },
  generic: {
    combinator: 'and',
    not: false,
    rules: []
  }
};

const getOperators = (field) => {
  switch (field) {
    case 'instrument':
    case 'isMusician':
      return [{ name: '=', label: 'is' }];

    default:
      return null;
  }
};

const getValueEditorType = (field, operator) => {
  switch (field) {
    case 'gender':
      return 'radio';

    case 'instrument':
      return 'select';

    case 'isMusician':
      return 'checkbox';

    default:
      return 'text';
  }
};

const getInputType = (field, operator) => {
  switch (field) {
    case 'age':
      return 'number';

    case 'date':
      return 'date';

    default:
      return 'text';
  }
};

const getValues = (field, operator) => {
  switch (field) {
    case 'instrument':
      return [
        { name: 'Guitar', label: 'Guitar' },
        { name: 'Piano', label: 'Piano' },
        { name: 'Vocals', label: 'Vocals' },
        { name: 'Drums', label: 'Drums' }
      ];

    case 'gender':
      return [
        { name: 'M', label: 'Male' },
        { name: 'F', label: 'Female' },
        { name: 'O', label: 'Other' }
      ];

    default:
      return [];
  }
};

const RootView = () => {
  const [query, setQuery] = useState(preparedQueries.primary);
  const [fields, setFields] = useState(preparedFields.primary);
  const [format, setFormat] = useState('json');
  const [showCombinatorsBetweenRules, setShowCombinatorsBetweenRules] = useState(false);
  const [showNotToggle, setShowNotToggle] = useState(false);

  /**
   * Reloads a prepared query, a PoC for query updates by props change.
   * If no target is supplied, clear query (generic query).
   * @param {"primary"|"secondary"} target The target query
   */
  const loadQuery = (target) => {
    if (target) {
      setQuery(preparedQueries[target]);
      setFields(preparedFields[target]);
    } else {
      setQuery(preparedQueries.generic);
      setFields(preparedFields.generic);
    }
  };

  const handleQueryChange = (newQuery) => setQuery(newQuery);

  const controlElements = {
    addGroupAction: AddActionElement,
    removeGroupAction: RemoveActionElement,
    addRuleAction: AddActionElement,
    removeRuleAction: RemoveActionElement,
    combinatorSelector: CombinatorSelectorElement,
    fieldSelector: ValueSelector,
    operatorSelector: ValueSelector,
    valueEditor: ValueEditor,
    notToggle: NotToggle
  };

  const translations = {
    fields: {
      title: 'Fields'
    },
    operators: {
      title: 'Operators'
    },
    value: {
      title: 'Value'
    },
    removeRule: {
      label: 'x',
      title: 'Remove rule'
    },
    removeGroup: {
      label: 'x',
      title: 'Remove group'
    },
    addRule: {
      label: 'Rule',
      title: 'Add rule'
    },
    addGroup: {
      label: 'Group',
      title: 'Add group'
    },
    combinators: {
      title: 'Combinators'
    },
    notToggle: {
      title: 'Invert this group'
    }
  };

  const valueProcessor = (field, operator, value) => {
    if (operator === 'in') {
      // Assuming `value` is an array, such as from a multi-select
      return `(${map(value, (v) => `'${v.trim()}'`).join(',')})`;
    } else {
      return `'${value}'`;
    }
  };

  return (
    <div className="flex-box-outer">
      <div className="control-panel">
        <button onClick={() => loadQuery('primary')}>Load primary query</button>
        <button onClick={() => loadQuery('secondary')}>Load secondary query</button>
        <button onClick={() => loadQuery()}>Clear query</button>
        <label>
          <input
            type="checkbox"
            checked={showCombinatorsBetweenRules}
            onChange={(e) => setShowCombinatorsBetweenRules(e.target.checked)}
          />
          Show combinators between rules
        </label>
        <label>
          <input
            type="checkbox"
            checked={showNotToggle}
            onChange={(e) => setShowNotToggle(e.target.checked)}
          />
          Show "not" toggle
        </label>
      </div>
      <hr />
      <div className="flex-box">
        <div className="scroll">
          <QueryBuilder
            query={query}
            fields={fields}
            controlClassnames={{ fields: 'form-control' }}
            controlElements={controlElements}
            onQueryChange={handleQueryChange}
            getOperators={getOperators}
            getValueEditorType={getValueEditorType}
            getInputType={getInputType}
            getValues={getValues}
            showCombinatorsBetweenRules={showCombinatorsBetweenRules}
            showNotToggle={showNotToggle}
            translations={translations}
          />
        </div>
        <div className="shrink query-log scroll">
          <h4>Query</h4>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <label>
              <input type="radio" checked={format === 'json'} onChange={() => setFormat('json')} />
              JSON
            </label>
            <label>
              <input type="radio" checked={format === 'sql'} onChange={() => setFormat('sql')} />
              SQL
            </label>
          </div>
          <pre>{formatQuery(query, format, format === 'sql' ? valueProcessor : undefined)}</pre>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<RootView />, document.querySelector('.container'));
