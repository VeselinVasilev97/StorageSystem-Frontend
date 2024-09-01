import classes from './PagesStyle.module.css'
import appConfig from '../../appConfig.json';
import { useEffect } from 'react'
const DashboardPage = () => {
  console.log(sessionStorage)
  const getData = async() => {
  const url = appConfig.environment[appConfig.environment.env as 'LOCAL' | 'PROD'].url;
    await fetch(`${url}/orders`,{
      method:"get",
      headers:{
        'Content-Type':'application/json',
        'Authorization':sessionStorage.authToken
      }
    })
    .then(res => res.json())
    .then(result => console.log(result))
  }


  useEffect(()=>{
    getData()
  },[])
  return (
    <div className={classes.mainContentWrapper}>
      <p>DASHBOARD PAGE !!</p>
    </div>
  )
}

export default DashboardPage