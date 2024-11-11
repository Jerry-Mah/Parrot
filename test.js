// Configuration
import { SerialPort } from "serialport";


// const OCTOPRINT_URL = 'http://localhost:5000';
// const API_KEY = '4F4A25BB923147378E9E96D30E425D13';

// const headers = {
//     'X-Api-Key': API_KEY,
//     'Content-Type': 'application/json'
// };

// printer status 
const serialPortName = 'COM7';
const serialport = new SerialPort({ path: serialPortName, baudRate: 9600 });

async function clearPrintBed() {
    console.log("Clear plate command received");
    serialport.write('1\n');
  }
  
async function getPrinterState() {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/printer`, {
            method: 'GET',
            headers: headers
        });
        return await response.json();
    } catch (error) {
        console.error('Error getting printer state:', error);
    }
}

// cancel print 
async function cancelPrint() {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/job`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                command: "cancel"
            })
        });
        console.log("Cancelled")
        // return await response.json();
    } catch (error) {
        console.error('Error cancelling print:', error);
    }
}

// pause resume based on action provided
async function pauseResumePrint(action) {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/job`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                command: action // "pause" or "resume"
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error with pause/resume:', error);
    }
}

// current job status
async function getJobStatus(){
    try{
        const response = fetch(`${OCTOPRINT_URL}/api/job`,{
            method: "GET",
            headers: headers, 
        })

        return (await response).json()
    }catch(error){
        console.error("error",error)
    }
}

async function setToolTemperature(temp) {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/printer/tool`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                command: "target",
                targets: {
                    tool0: temp
                }
            })
        });
    } catch (error) {
        console.error('Error setting temperature:', error);
    }
}

// Get current job status
async function getCurrentJob() {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/job`, {
            method: 'GET',
            headers: headers
        });
        return await response.json();
    } catch (error) {
        console.error('Error getting job status:', error);
    }
}

// Set bed temperature
async function setBedTemperature(temp) {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/printer/bed`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                command: "target",
                target: temp
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error setting bed temperature:', error);
    }
}








// Get files list
async function getFiles() {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/files`, {
            method: 'GET',
            headers: headers
        });
        return await response.json();
    } catch (error) {
        console.error('Error getting files:', error);
    }
}




async function uploadFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${OCTOPRINT_URL}/api/files/local`, {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY
            },
            body: formData
        });
        return await response.json();
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Start print                                     //review
async function startPrint(filename) {
    try {
        const response = await fetch(`${OCTOPRINT_URL}/api/files/local/${filename}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                command: "select",
                print: true
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error starting print:', error);
    }
}


async function runTests() {
    clearPrintBed()


}

runTests();