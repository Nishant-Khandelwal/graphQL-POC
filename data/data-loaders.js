const restClientBase = 'http://localhost:3000/';
const axios = require('axios');
const DataLoader = require('dataloader');
import jsonContent from './jsonData.json';

export const employeesLoader = new DataLoader(keys => {
    console.log("getEmployee Loader Called")
    return Promise.all(keys.map(getEmployees))
});
export const assetsLoader = new DataLoader(keys => {
  console.log("getAsset Loader Called")
  return Promise.all(keys.map(getAssets))
});
export const employersLoader = new DataLoader(keys => {
  console.log("getEmploers Loader Called")
  return Promise.all(keys.map(getEmployers))
});

function getEmployees(){
 return fetchData('employees')
}
function getAssets(){
 return fetchData('assets')
}
function getEmployers(){
  return fetchData('employers')
}

function fetchData(resourceName){
  console.log("getting results from api for /", resourceName);
  return axios
    .get(restClientBase + resourceName)
    .then(res => {
        return res.data;
    })
    .catch((error) => console.log(`error in fetching data for >> ${resourceName} and error is ${error}`));
}
export function addEmployee(newDetails){
  console.log("updating employee details");
  return axios
      .post(restClientBase + 'employees', {
        firstName:newDetails.firstName,
        lastName:newDetails.lastName,
        gender: newDetails.gender,
        email: newDetails.email,
        supervisorId: newDetails.supervisorId,
        employeeId: newDetails.employeeId
      })
    .then(res => {
        return res.data;
    })
    .catch((error) => console.log(`error in fetching data for >> ${resourceName} and error is ${error}`));  
}