const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'content', 'articles_draft.ts');

const yearToIssues = [
  { year: 2000, issues: [832, 833, 834] },
  { year: 2001, issues: [835, 836, 837] },
  { year: 2002, issues: [838, 839, 840, 841] },
  { year: 2003, issues: [842, 843, 844, 845] },
  { year: 2004, issues: [846, 847, 848, 849] },
  { year: 2005, issues: [850, 851, 852, 853] },
  { year: 2006, issues: [854, 855, 856, 857] },
  { year: 2007, issues: [858, 859, 860, 861] },
  { year: 2008, issues: [862, 863, 864, 865] },
  { year: 2009, issues: [866, 867, 868, 869] },
  { year: 2010, issues: [870, 871, 872, 873] },
  { year: 2011, issues: [874, 875, 876, 877] },
  { year: 2012, issues: [878, 879, 880, 881] },
  { year: 2013, issues: [882, 883, 884, 885] },
  { year: 2014, issues: [886, 887, 888, 889] },
  { year: 2015, issues: [890, 891, 892, 893] },
  { year: 2016, issues: [894, 895, 896, 897] },
  { year: 2017, issues: [898, 899, 900, 901] },
  { year: 2018, issues: [902, 903, 904, 905] },
  { year: 2019, issues: [906, 907, 908, 909] },
  { year: 2020, issues: [910, 911, 912, 913] },
  { year: 2021, issues: [914, 915, 916, 917] },
  { year: 2022, issues: [918, 919, 920, 921] },
  { year: 2023, issues: [922, 923, 924, 925] },
  { year: 2025, issues: [926, 927, 928, 929] },
];

const issueToYear = Object.fromEntries(
  yearToIssues.flatMap(({ year, issues }) => issues.map((n) => [n, year]))
);

let src = fs.readFileSync(FILE, 'utf8');

// Remove the runtime IIFE if present to avoid double-setting
src = src.replace(/\n\(\(\) => \{[\s\S]*?\}\)\(\);\n?$/, '\n');

// Replace annee values block-by-block based on numero
// We find article blocks and replace the annee: ... line
src = src.replace(/\{\s*\n([\s\S]*?)\n\s*\}/g, (block) => {
  // Only process blocks that have 'numero:' and 'annee:'
  if (!/\bannee\s*:/.test(block) || !/\bnumero\s*:/.test(block)) return block;

  const numMatch = block.match(/\bnumero\s*:\s*(\d{3})/);
  if (!numMatch) return block;
  const numero = parseInt(numMatch[1], 10);
  const year = issueToYear[numero];
  if (!year) return block;

  // Replace the annee line to the mapped year
  return block.replace(/\bannee\s*:\s*[^,]+,/, `annee: ${year},`);
});

fs.writeFileSync(FILE, src, 'utf8');
console.log('Filled annee values based on numero mapping.');

