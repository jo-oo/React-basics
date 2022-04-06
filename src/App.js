import './App.css';
import { useState } from 'react'; //importerar useState-hooken*/funktionen från react biblioteket

/*//sätter initiala värdet av clicks till 100
const initialClickState = () => {
  return 100    
}
*/



//detta kallas en Template
const App = () => {

  //STATES
  //för att saker som vi gör här ska SKRIVAS ut i webbläsaren så måste vi använda STATES
  //Ordningen på States spelar roll. De går i ovanför-under-ordning.
    //laddar du om sin sidan gör det ingen om du bytt ordning men annars blir det kansigt
  const [message, setMessage] = useState('Message is first this' ) //message: 1a parameter=vad vi vill att vår varibael  ska ha för URSPRUNGLIGT VÄRDE
                                                            //setMessage: 2a parmeter är en funktion vi kallar på för att kunna uppdatera variabeln
                                                            //returnerar en array med 2 element i sig.
  const [clicks, setClicks] = useState(0) //sätter initiala värdet av clicks till 0 i början och anger useState för att ange att det ska kunna uppdateras
                                                          //vi kan också sätte in en funktion här. =useState(initialClickState) Om vi inte kallar på den, vilket blir knasigt så kommer den bara köras en gång. Då sätter vi att det rusprunlgiga statet ska vara hela den här funktionen och inte värdet den returnerar 
                                                          //så det blir 100, och sen 102 och sen 104 osv. (vi kommer inte anvönda detta på kursen nu)
	const [posts, setPosts] = useState([
		{ title: "React Rocks 🤘🏻!", likes: 1337 },
		{ title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ title: "Got State?", likes: 3 },
	]) 
  
  //dessa 3 är initiala värdet av posts

  const [salary, setSalary]  = useState(10)//sätter initiala värdet av sakary till 10 i början och a
  const [showSalarySection, setShowSalarySection] =  useState(true)//sätter default på show salary section att vara true så den visas i början
  //const [showSalaryAlert, setShowSalaryAlert] =  useState(true) //NOT IN USE YET
  const [showPostSection, setShowPostSection] =  useState(true) //Post Section Show is defualt true

  const handleButtonClick = () => {
    console.log("clicks before change:", clicks);
  
    setClicks( prevClicks => prevClicks + 1)  //prevClicks = 0 return 1
                                              //setClicks tar in föregående Clicks, alltså värdet av vad clicks var innan. 
                                              //när vi tar det föregående värdet + 1 så kommer react vänta tills detta värdet är uppdaterat(alltså inladdat) innan den kär nästa setClicks-rad 34

    console.log("clicks after the change:", clicks);

    setClicks( prevClicks => prevClicks + 1) //prevclicks = 1 return 2
    console.log("clicks after the second change:", clicks);

    //göär man många state-uppdateringar efter varandra så är det säkrast att använda en funktion som tar emot den tidigare staten o förändrar den på nåt sätt.
    //ska du bara skriva över den behöver du inte använda en funktion då bara skriver du över den
	          	
              //setClicks(clicks + 1);
              // console.log("You clicked the button mom!") 
                //console.log("Message is:", message) //first value of message
                //setMessage("This is my changed message after onclick on green button:") 
                //{/*värdet på message kommer ändras här OCH SKRIVS UT i WEBBsidan */} 
  }

  const handleSalaryClick = (amount) => {
    if (salary <= 5) {
        setSalary(5)
        return
    }

		console.log("First value of salary is" + salary)

    setSalary(salary + amount);	
  }


  //UPPDATERA POSTS-Funktion
  //ta emot vilken post vi vill uppdatera med mer likes
  const handleLikesClick = (post) => {
      post.likes++
      setPosts([ ...posts ] ) //skapar en ny array här. sprider ut min nuvarande array, som att vi tar varje objekt i posts och skriver ut dom i arrayen
      //setPosts( [ {}, {}, {} ] ) //typ samma princip här. alltså här sätter vi till 3 tomma objekt
                                //den nya arrayen består av samma objekt som den gamla arrayen
  }

  //DELETe POSTs-funktion
  //ska innehålla alla posts FÖRUTOM den vi klickade på.=
  //Filtrera bort den post vi klickade på 
  //använder FILTEr. itererar över posts och gör en jämförelese för varje sak(post) i listan posts
  //allt vi returnerar TRUE på kommer FINNAS med i DEN NYA LISTAN

  const handleDeletePostClicks = (clickedPost) => {
      const listWIthDeletedPost = posts.filter(post => post !== clickedPost)
        setPosts( [ ...listWIthDeletedPost ] )
      //notera att johan gjorde en ännu kortare variant av denna på en rad, utan setPosts på raf 87 men de funkar samma.
    
  /*const handleDeletePostClicks = (clickedPost) => {
      const listWIthDeletedPost = posts.filter(post => {
          return post !== clickedPost
          
          /* = samma som denna if-sats:
          if (post !== clickedPost) {
              return true
          } else {
            return false
          }
          */ 
  }  



  //Add onclicks to the salary-button = onClick={ () => handleSalaryClick(1) }
  return ( 
    <div className="App">
      <h1>React Basics</h1>

      <h2>{ message }</h2>

      <p>You have clicked the button { clicks } times</p>

      <button onClick={handleButtonClick} className="btn btn-success btn-lg">click me!</button>

			<button onClick={ () => { setMessage('Hi dad!') } } className="btn btn-warning btn-lg">Hi dad!</button>

			<hr />



      {      /*skapa SALARY SECTION OCH DÖLJVISA DEN MED EN KNAPP      */}

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
    
    <hr />

      {/* Dynamisk Knapp= if showSalarySection är true så rendera ut detta*/}
          <button className="btn btn-primary" onClick={()=> setShowPostSection(!showPostSection)}>
      { showPostSection && "HIDE POSTS" }
      { !showPostSection && "SHOW POSTS" }
      </button>

      { showPostSection && (
          <div>
            <h2>Posts</h2>

            <ul> 
              {
                posts.map( (post, index) => //UPDATE POSTS WITH LIKES ON EACH ONE + DELETE POSTS
                  (
                    <li key={index}> 
                      {post.title} ({post.likes})
                      <button 
                          className="btn btn-success btn-sm" 
                          onClick={() => handleLikesClick(post)} //add villken post du vill uppdatera med likes
                          
                        >Click here to update posts</button>

                        <button
                          className="btn btn-danger btn-sm" 
                          onClick={() => handleDeletePostClicks(post)}
                        
                        >Delete Post</button>

                    </li> //när dessa iterieras så skrivs en Post ut per gång/loop! 
                  ) 
                )
              }
            </ul>
        </div>
        )}

    </div>//läser in funktionen handleButtonClick för Click-Event. 
    //Vi kan dock inte kalla på den häör som i exemepl:button onClick={ handleButtonClick () } pga då läses den in så fort appen körs

  )
}

export default App;

  //Exempel: värdet i messager kan vi ändra och det ändras men det ändras inte när det skrivs ut i webbläsaren
  /*

  let messgae= "Hello"

  const handleButtonClick = () => {
		console.log("You clicked the button!")
		console.log("Message is:", message)   //value is Hello, prints Hello
		message = "Bye mom"
		console.log("Message after change is:", message) //value is Bye mom, prints Hello
    //värdet på message kommer ändras här men INTE SKRIVA UT i WEBBsidan
  } 
  */


  //Add likes to ALL Posts
  //using function inside here (not preferred coz its a bit long)
  //you should add a function for handle PostsLikesClicks up in the code instead
  /*
  <ul> 
  {
    posts.map( (post, index) =>
      (
        <li key={index}> 
          {post.title} ({post.likes})
          <button 
            className="btn btn-success btn-sm" 
            onClick={() => {
              post.likes++
              //update posts genom att skapa ny array där nya värden skrivs ut i
              setPosts( [...posts] )

            }}
            >Click here to update posts</button>
        </li> //när dessa iterieras så skrivs en Post ut per gång/loop! 
      )
    )
  }
</ul>
*/


