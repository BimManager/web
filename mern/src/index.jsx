/*const element = React.createElement(
  'div', { title: 'Outer div' },
  React.createElement('h1', { className: 'foo' }, 'Hello, World!')
);*/

/*const element = (
  <div title="Outer div">
    <h1 className="foo">Hello, World!</h1>
  </div>
  );*/

/*const continents = ['Africa', 'North America', 'South America',
                    'Europe', 'Asia', 'Australia'];
const message = continents.map((continent) => `Hello ${continent}!`);
const element = (
  <div title="Outer div">
    <h1>{message}</h1>
  </div>
);
ReactDOM.render(element, document.getElementById('content'));*/

class HelloWorld extends React.Component {
  render() {
    const continents = ['Africa', 'North America', 'South America',
                        'Europe', 'Asia', 'Australia'];
    const helloContinents = Array.from(continents, (continent) => `Hello ${continent}!`);
    const message = helloContinents.join(' ');
    return (
      <div title="Outer div">
        <h1>{message}</h1>
      </div>
    );
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the issue filter.</div>
    );
  }
}

class IssueTable extends React.Component {
  render() {
    return (
      <div>This is a placeholder for a table of issues.</div>
    );
  }
}

class IssueAdd extends React.Component {
  render() {
    return (
      <div>This is a placeholder for a form to add an issue.</div>
    );
  }
}

class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable />
        <hr />
        <IssueAdd />
      </React.Fragment>
    );
  }
}

//const element = <HelloWorld />
const element = <IssueList />
ReactDOM.render(element, document.getElementById('content'));
