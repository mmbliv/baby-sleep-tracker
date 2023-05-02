export function fetchAllData(url) {
  const data = fetch(url)
    .then((res) => res.json())
    .catch((e) => console.log(e));
  return data;
}
