const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 5000
const cors = require('cors')

app.use (express.json())
app.use(cors())

const db = require('./db.json')

const data = db

app.post('/checkin', (req, res)=>{

    let name = req.body.name
    let mseconds = req.body.checkIn * 1000
    month = new Date(mseconds).getMonth()
    date = new Date(mseconds).getDate()
    

    let userIndex = data.findIndex(obj => obj.name === name)
    if(userIndex === -1){

        let newData = {
            id: 0,
            name: name,
            data: []
        }
    
        let monthObj = newData.data.find(m => m.month === month + 1)
        if (monthObj === undefined){
            monthObj = { 
                month: month + 1,
                dates: []
            }
            newData.data.push(monthObj)
        }
    
        let dateObj = monthObj.dates.find(obj => obj.date === date)
        if(dateObj === undefined){
            dateObj = {
                date: date,
                checkIn: [mseconds],
                checkout: [],
            }
    
            monthObj.dates.push(dateObj)
        }else{
            dateObj.checkIn.push(mseconds)
        }
        data.push(newData)
    }else{
        let userObj = data.find(obj => obj.name === name)
        
        let monthObj = userObj.data.find(m => m.month === month + 1)
        if (monthObj === undefined){
            monthObj = { 
                month: month + 1,
                dates: []
            }
            userObj.data.push(monthObj)
        }
    
        let dateObj = monthObj.dates.find(obj => obj.date === date)
        if(dateObj === undefined){
            dateObj = {
                date: date,
                checkIn: [mseconds],
                checkout: [],
            }
    
            monthObj.dates.push(dateObj)
        }else{
            dateObj.checkIn.push(mseconds)
        }
        data.push(userObj)

        data.splice(userIndex, 1)

    }



    fs.writeFile("db.json", JSON.stringify(data), err=>{
        if (err) throw err
        console.log("Completed")
    })

    console.log(req.body)
    res.send('created')
})

app.post('/checkout', (req, res)=>{

    let name = req.body.name
    let mseconds = req.body.checkout * 1000
    month = new Date(mseconds).getMonth()
    date = new Date(mseconds).getDate()
    

    let userIndex = data.findIndex(obj => obj.name === name)
    if(userIndex === -1){

        let newData = {
            id: 0,
            name: name,
            data: []
        }
    
        let monthObj = newData.data.find(m => m.month === month + 1)
        if (monthObj === undefined){
            monthObj = { 
                month: month + 1,
                dates: []
            }
            newData.data.push(monthObj)
        }
    
        let dateObj = monthObj.dates.find(obj => obj.date === date)
        if(dateObj === undefined){
            dateObj = {
                date: date,
                checkIn: [],
                checkout: [mseconds],
            }
    
            monthObj.dates.push(dateObj)
        }else{
            dateObj.checkout.push(mseconds)
        }
        data.push(newData)
    }else{
        let userObj = data.find(obj => obj.name === name)
        
        let monthObj = userObj.data.find(m => m.month === month + 1)
        if (monthObj === undefined){
            monthObj = { 
                month: month + 1,
                dates: []
            }
            userObj.data.push(monthObj)
        }
    
        let dateObj = monthObj.dates.find(obj => obj.date === date)
        if(dateObj === undefined){
            dateObj = {
                date: date,
                checkIn: [],
                checkout: [mseconds],
            }
    
            monthObj.dates.push(dateObj)
        }else{
            dateObj.checkout.push(mseconds)
        }
        data.push(userObj)

        data.splice(userIndex, 1)

    }



    fs.writeFile("db.json", JSON.stringify(data), err=>{
        if (err) throw err
        console.log("Completed")
    })

    console.log(req.body)
    res.send('created')
})


app.get('/', (req, res)=>{
    fs.readFile("db.json", 'utf8', (err, d)=>{
        res.send(d)
    })
})


app.listen(PORT, ()=>{
    console.log("Server is running on", PORT)
})

