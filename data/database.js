const _ = require('lodash');
import { employeesLoader, assetsLoader , employersLoader, addEmployee} from './data-loaders.js'

export class Viewer {}
export class Employee {}
export class Employer {}
export class Asset {}

export function getViewer () {
  var viewer = new Viewer()
  viewer.id = 1;
  return viewer;
}

export function getEmployee(employeeID){
    let employeeListPromise = employeesLoader.load('employees');
    return employeeListPromise.then(response => _.find(response, (employee) =>employee.employeeId === employeeID))
}

export function getAssetDetails(assetId){
  let assetListPromise = assetsLoader.load('assets');
  return assetListPromise.then(response => _.find(response, (asset) => asset.assetId === assetId))
}

export function getAllocatedAssetsList(assetIds){
  return assetIds.map(assetId => {
      return getAssetDetails(assetId);
  })
}
export function getEmployer(employerId){
    let employerListPromise = employersLoader.load('employers');
    return employerListPromise.then(response => _.find(response, (employer) => employer.employerId === employerId))
}
export function getAllEmployeesForEmployer(employeeIds){
  return employeeIds.map(employeeId => {
      return getEmployee(employeeId);
  })
}
export function addNewEmployee(newDetails){
  return addEmployee(newDetails)
}

