const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

const issues = [{
  id: 1,
  status: 'Open',
  owner: 'Ravan',
  created: new Date('2016-08-15'),
  effort: 5,
  completionDate: undefined,
  title: "Error in console when clicking add"
},{
  id: 2,
  status: 'Assigned',
  owner: 'Eddle',
  created: new Date('2016-08-16'),
  effort: 14,
  completionDate: new Date('2016-08-30'),
  title: "Missing bottom border on panel"
}]

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};

const issueFieldType = {
  id: 'required',
  status: 'required',
  owner: 'required',
  effort: 'required',
  created: 'required',
  completionDate: 'required',
  title: 'required',
}

function validateIssue(issue) {
  for(const field in issueFieldType){
    const type = issueFieldType[field];
    if(!type){
      delete issue[field];
    }else if(type === 'required' && !issue[field]){
      return `${field} is required.`;
    }
  }
  if(!validIssueStatus[issue.status]){
    return `${issue.status} is not a valid status`;
  }
  return null;
}

app.post('/api/issues', (req, res) =>{
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
   if(!newIssue.status){
     newIssue.status = 'new';
   }

  const err = validateIssue(newIssue);
    if(err){
      res.status(422).json({message: `Invalid request : ${err}`});
      return;
    }

   issues.push(newIssue)

   res.json(newIssue);
});




app.listen(3000, ()=>{
  console.log('app started on port 3000');
})
