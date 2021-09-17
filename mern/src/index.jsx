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

const issues = [
  {
    id: 1, status: 'New', owner: 'Ravan', effort: 5,
    created: new Date('2018-08-15'), due: undefined,
    title: 'Error in console when clicking add'
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
    created: new Date('2018-08-16'), due: new Date('2018-08-30'),
    title: 'Missing bottom corner on panel'
  }
];

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

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due : ''}</td>
        <td>{issue.title}</td>
        { /*        <td style={style}>{this.props.issue_title}</td> */ }
      </tr>
    );
  }
}

class IssueTable extends React.Component {
  render() {
    const issueRows = issues.map((issue) =>
    <IssueRow key={issue.id} issue={issue} />);
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Due Date</th>            
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
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
