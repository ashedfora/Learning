const xlsx = require('xlsx');
const CollegeProgramme = require('./programmeSchema');

const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/TikTalk';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const saveToDB = async () => {
  const workbook = xlsx.readFile('./jee_advanced_data.xlsx');
  const workbook_sheet = workbook.SheetNames;
  const round6 = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[5]]);
  for (let i = 0; i < round6.length; i++) {
    if (typeof round6[i]['Closing Rank'] === 'string') {
      const str = round6[i]['Closing Rank'];
      round6[i]['Closing Rank'] = Number(str.substr(0, str.length-1));
    }
  }
  for (let i = 0; i < round6.length; i++) {
    if (typeof round6[i]['Opening Rank'] === 'string') {
      const str = round6[i]['Opening Rank'];
      round6[i]['Opening Rank'] = Number(str.substr(0, str.length-1));
    }
  }
  round6.forEach(e => new CollegeProgramme(e).save());
  console.log('Done Saving');
};

(async () =>{
  // await saveToDB();
  const sortStage = {
    $sort: {
      'Opening Rank': 1,
    },
  };
  const arr = await CollegeProgramme.aggregate([
    { $sort: { 'Opening Rank': 1 } },
    { $group: { _id: '$Quota', 
                'bestOpeningRank': {$first: '$Opening Rank'},
                'worstOpeningRank': {$last: '$Opening Rank'},
                entries: { $push: "$$ROOT" },
                top1000: { $push: { $cond: [{$lte: ['$Opening Rank',1000]},'$Opening Rank','$$REMOVE']}
              }
              } }
  ]);
  console.log(arr);

const fileName = 'test.xlsx';

const wb = xlsx.utils.book_new();
for (let i = 0; i < arr.length; i++) {
  ws = xlsx.utils.json_to_sheet(arr[i].entries.map(e => ({
    'Institute Code': e['Institute Code'],
    'Institute': e['Institute'],
    'Academic Program Name': e['Academic Program Name'],
    'Branch Code': e['Branch Code'],
    'Seat Type': e['Seat Type'],
    'Gender': e['Gender'],
    'Opening Rank': e['Opening Rank'],
    'Closing Rank': e['Closing Rank'],
    'Branch': e['Branch'],
    'Degree': e['Degree'],
    'Duration': e['Duration'],
  })));
  xlsx.utils.sheet_add_aoa(ws, [[arr[i]['top1000'].toString()]], { origin: "O1" });

  xlsx.utils.book_append_sheet(wb, ws, arr[i]['_id']);
}

xlsx.writeFile(wb, fileName);

  console.log('End of program');
})();

