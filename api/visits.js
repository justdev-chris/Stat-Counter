let yesterday = 0;
let today = 0;
let total = 0;

export default function handler(req, res) {
  // Increment counts per visit
  today++;
  total++;

  res.status(200).json({ yesterday, today, total });
}
