import React, { useState, useEffect } from 'react';

// import logo from '../../src/logo.png'
// import {motion} from 'framer-motion'

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch the list of students from the server
    const storedStudents = localStorage.getItem('studentList');
    console.log(storedStudents);
    if(storedStudents){
      setStudents(JSON.parse(storedStudents));
    }
  }, []); // Only run the effect once

  useEffect(() => {
    // Save the student list to local storage when it changes
    localStorage.setItem("studentList", JSON.stringify(students));
  }, [students]);

  const handleRollNumberChange = event => {
    setRollNumber(event.target.value);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleCheckInTimeChange = event => {
    setCheckInTime(event.target.value);
  };

  const handleCheckOutTimeChange = event => {
    setCheckOutTime(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Add the new student to the list of students
    setStudents([
      ...students,
      { rollNumber, name, checkInTime, checkOutTime }
    ]);

    // Clear the input fields
    setRollNumber('');
    setName('');
    setCheckInTime('');
    setCheckOutTime('');
  };

  const ct = (h,m) => {
    return h*60+m;
  }

  const removeItem=()=>{
    // localStorage.removeItem('studentList');
    setStudents([]);
  }

  const checkAttendance = () => {
    const date = new Date()
    const hours = Number(date.getHours())
    const minutes = Number(date.getMinutes())
    let strength = 0;
    for(let i=0;i<students.length; i++){
      const cintime = students[i].checkInTime
      const couttime = students[i].checkOutTime
      let [cinh, cinm] = cintime.split(':')
      let [couth, coutm] = couttime.split(':')
      cinh = Number(cinh)
      cinm = Number(cinm)
      couth = Number(couth)
      coutm = Number(coutm)
      console.log(typeof(cinh));
      if(ct(hours,minutes) >= ct(cinh,cinm) && ct(hours,minutes) <= ct(couth,coutm)){
        console.log("oij");
        strength++;
      }
    }
    setCount(strength);
  }

  return  (
    <div className='attendance1'>
    <main>
    <div className='attendance'>
      <h1>STUDENT ATTENDANCE FORM</h1>
      <form onSubmit={handleSubmit}>
        <div>
      
        <label>Name</label> 
          <input type="text" value={name} onChange={handleNameChange}  />
        
        </div>

        <div>
          <label >Roll No</label>
          <input type="text" value={rollNumber} onChange={handleRollNumberChange}   />
        
        </div>
      
        <div>
        
        <label>  Check-in Time: </label>
          <input type="time" value={checkInTime}  onChange={handleCheckInTimeChange}  />
        
        </div>
        
        <div>
        <label>  Check-out Time: </label>
          <input  type="time"  value={checkOutTime}  onChange={handleCheckOutTimeChange}  />
        </div>
        <button type="submit">Add Student</button>
      </form>
      
      <h1 style={{fontStyle:'normal'}}> Last Checked Attendance : {count}</h1>

      
      <button type="button" onClick={checkAttendance}> Current Attendance</button>  
      <button type='button' onClick={removeItem}>Start new Attendance</button>
      
      
      
      <br />
      
      </div> 
      
      <div className='students'>
      <h1>STUDENTS</h1>
      <h2>Number of students checked-in: {students.length} </h2>
      <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Check-In Time</th>
                    <th>Check-Out Time</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        students.map( student=>(
                        <tr key={student.rollNumber}>
                            <td>{student.name}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.checkInTime}</td>
                            <td>{student.checkOutTime}</td>
                           
                        </tr>
                        ))
                    }
                </tbody>                

            </table>
      {/* <ul>
        {students?.map(student => (
          <li key={student.rollNumber}>
          Name:  {student.name} (Roll No:-{student.rollNumber}) - Checked in at {student.checkInTime}, Checked out at {student.checkOutTime}
          </li>
        ))}
      </ul> */}
    
    
    {/* <motion.div className='bgImage'
        initial={{
          y:"150vh",
          x:"50%",
          opacity:0,
        }}
        animate={{
          y:"70%",
          x:"50%",
          opacity:1,
        }}
        transition={{delay:1}}
        >
          <img src={logo} alt="Burger" />
        </motion.div> */}
    
    
        
      </div>
      

      </main>
      </div>
  )}

  export default Attendance
