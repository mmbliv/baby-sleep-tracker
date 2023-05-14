import axios from "axios";

export async function fetchData(userId, weekOrMonth, date) {
  try {
    const url = `/api/date?userId=${userId}&weekOrMonth=${weekOrMonth}&date=${date}`;

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
