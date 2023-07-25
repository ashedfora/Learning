const xlsx = require('xlsx');
const mongoose = require('mongoose');
const CollegeProgramme = require('./models/programmeSchema');

const dbURI = 'mongodb://localhost:27017/College';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const saveToDB = async () => {
  const workbook = xlsx.readFile('./jee_advanced_data.xlsx');
  const workbookSheet = workbook.SheetNames;
  const round6 = xlsx.utils.sheet_to_json(workbook.Sheets[workbookSheet[5]]);
  for (let i = 0; i < round6.length; i += 1) {
    if (typeof round6[i]['Closing Rank'] === 'string') {
      const str = round6[i]['Closing Rank'];
      round6[i]['Closing Rank'] = Number(str.substr(0, str.length - 1));
    }
  }
  for (let i = 0; i < round6.length; i += 1) {
    if (typeof round6[i]['Opening Rank'] === 'string') {
      const str = round6[i]['Opening Rank'];
      round6[i]['Opening Rank'] = Number(str.substr(0, str.length - 1));
    }
  }
  round6.forEach((e) => new CollegeProgramme({
    quota: e.Quota,
    instituteCode: e['Institute Code'],
    institute: e.Institute,
    academicProgramName: e['Academic Program Name'],
    branchCode: e['Branch Code'],
    seatType: e['Seat Type'],
    gender: e.Gender,
    openingRank: e['Opening Rank'],
    closingRank: e['Closing Rank'],
    branch: e.Branch,
    degree: e.Degree,
    duration: e.Duration,
  }).save());
  console.log('Done Saving');
};

(async () => {
  await saveToDB();
  const sortByRankStage = {
    $sort: {
      openingRank: 1,
    },
  };
  const groupByInstituteStage = {
    $group: {
      _id: '$quota',
      bestOpeningRank: { $first: '$openingRank' },
      worstOpeningRank: { $last: '$openingRank' },
      entries: { $push: '$$ROOT' },
      top1000: {
        $push: { $cond: [{ $lte: ['$openingRank', 1000] }, '$openingRank', '$$REMOVE'] },
      },
    },
  };
  const arr = await CollegeProgramme.aggregate([
    sortByRankStage,
    groupByInstituteStage,
  ]);
  console.log(arr);

  const fileName = 'test.xlsx';

  const wb = xlsx.utils.book_new();
  for (let i = 0; i < arr.length; i += 1) {
    const ws = xlsx.utils.json_to_sheet(arr[i].entries.map((e) => ({
      instituteCode: e.instituteCode,
      institute: e.institute,
      academicProgramName: e.academicProgramName,
      branchCode: e.branchCode,
      seatType: e.seatType,
      gender: e.Gender,
      openingRank: e.openingRank,
      closingRank: e.closingRank,
      branch: e.Branch,
      degree: e.Degree,
      duration: e.Duration,
    })));
    xlsx.utils.sheet_add_aoa(ws, [[arr[i].top1000.toString()]], { origin: 'O1' });

    xlsx.utils.book_append_sheet(wb, ws, arr[i]._id);
  }

  xlsx.writeFile(wb, fileName);

  console.log('End of program');
})();
