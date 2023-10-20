const url = "http://localhost:8081/api"


const request = async (path, method, body) => {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${url}${path}`, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  return await response.json();
}

export default request;