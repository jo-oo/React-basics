import { useState } from 'react'; //importerar useState-hooken*/funktionen från react biblioteket


//vi kan bara ha en root-komponent (det inom return) så när klistrar in från förra filen och lägger Slaary i den här egnas komponenten/filen så får vi lägga en div runt hela Salary-divarna i return. Därför React skapade en div till oss direkt när vi tog kortkoommandot för koden
//så vill man returnera fler aroot-elelment så ska man alltså lägga en div runt
//finns annars åt som heter REACT FRAGMENT. = <>
const Salary = () => {

    const [salary, setSalary]  = useState(10)//sätter initiala värdet av sakary till 10 i början och a
    const [showSalarySection, setShowSalarySection] =  useState(true)//sätter default på show salary section att vara true så den visas i början
    //const [showSalaryAlert, setShowSalaryAlert] =  useState(true) //NOT IN USE YET
  
    const handleSalaryClick = (amount) => {
        if (salary <= 5) {
            setSalary(5)
            return
        }
    
            console.log("First value of salary is" + salary)
    
        setSalary(salary + amount);	
      }
 
    return (
        <>
        {/*skapa SALARY SECTION OCH DÖLJVISA DEN MED EN KNAPP*/}

        {/*hårdkoda Button  = <button className="btn btn-primary" onClick={()=> setShowSalarySection(!showSalarySection)}>SHOW/HIDE SALARY</button>*/}
        {/* Dynamisk Knapp= if showSalarySection är true så rendera ut detta*/}
        <button className="btn btn-primary" onClick={()=> setShowSalarySection(!showSalarySection)}>
          { showSalarySection && "HIDE SALARY" }
          { !showSalarySection && "SHOW SALARY" }
        </button>
  
        { /* Denna div/sektion om Salary ska bara visas om showSalary = true  . Sätt helöa sektionen innanför detta conditional statement*/}
        { showSalarySection && (
          <div> 
            {  /*CONDITIONAL RENDERING    - båda saker i ett && statemenet måste ju vara true för att det ska köras så då räcker det med att kola om det första är true för annars klörs den ju ändå inte. = rendera BARA om första villkoret är true*/}
  
            <p>Salary per hour: SALARY &euro; { salary }</p>
  
            {salary <10 && (
              <div className="alert alert-warning">You might want to get a second job?</div>
            )}
  
            {/*
            {salary <=5 && (
              <div className="alert alert-warning">
                { !showSalaryAlert && "" }
              </div>
            )}
            */}
  
            {salary == 5 && (
              <div className="alert alert-warning">This is the slave limit. We´ll stop you there</div>
            )}
  
            <div className="buttons">
              <div className="mb-1">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={ () => handleSalaryClick(1) }
                >Raise 1 &euro; 🤑</button>
                <button
                  className="btn btn-warning btn-lg"
                  onClick={ () => handleSalaryClick(-1) }
                >Decrease 1 &euro; 😢</button>
              </div>
          
              <div className="mb-1">
                <button
                  className="btn btn-success btn-lg"
                  onClick={ () => handleSalaryClick(5) }
                >Raise 5 &euro; 🤑🤑🤑</button>
                <button
                  className="btn btn-danger btn-lg"
                  onClick={ () => handleSalaryClick(-5) }
                >Decrease 5 &euro; 😢😢😢</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Salary