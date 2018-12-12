const contentNode = document.getElementById('contents');

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });

    form.owner.value = "";
    form.title.value = "";
  }
  render(){
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class IssueFilter extends React.Component {
  render(){
    return (
      <div>this is a placeholder for IssueFilter</div>
    );
  }
}

const IssueRow = (props) => (
      <tr>
        <td>{props.issue._id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
      </tr>
    );

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue}/>);
    return (
      <table className="bordered-tatle">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {issues: []};
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(){
    fetch('/api/issues').then(response=> {
      if(response.ok){
        response.json().then(data=>{
          data.records.forEach(issue=>{
              issue.created = new Date(issue.created);
              if(issue.completionDate)
              issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({ issues: data.records});
        })
      }else {
        response.json().then(error => {
          alert("fail to fetch issue:"+ error.message)
        })
      }
    }).catch(err => {
      alert("error in fetching data to server"+err.message)
    })
  }

  createIssue(newIssue){
    fetch('/api/issues',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newIssue)
    })
    .then(response =>{
      if(response.ok){
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if(updatedIssue.completionDate){
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({issues: newIssues});
        })
      }else {
        response.json().then(err=>{
          alert("fail to add issue:"+ err.message)
        })
      }
    })
    .catch(err =>{
      alert("error in sending data to server"+err.message)
    })
  }

  render(){
    return (
      <div>
        <h1>Issue Tracker</h1>
        <br />
        <IssueFilter />
        <br />
        <IssueTable issues={this.state.issues}/>
        <br />
        <IssueAdd createIssue={this.createIssue}/>
      </div>
    );
  }
}

ReactDOM.render(<IssueList/>, contentNode)
