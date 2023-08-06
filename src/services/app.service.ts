import axios from 'axios';


export class AppService {
   
    public async getHospitals(): Promise<any> {
        const response = await axios.get('http://localhost:3080/hospitals');
        return response.data;
        
    }
    public async getHospitalDetails(): Promise<any> {
        const response = await axios.get('http://localhost:3080/hospital-details');
        return response.data;
        
    }

    public async userLogin(users:any):Promise<any>{
        const res = await axios.post('http://localhost:3080/login', { users })
        .then((response:any )=> {
            return response;
        })
        .catch((error:any) => {
            if (error.response) {
                //response status is an error code
               return error.response.status;
            }
            else if (error.request) {
                //response not received though the request was sent
                return error;
            }
            else {
                return error.message;
            }
        });
        return res;
    }

    public async signUp(users:any):Promise<any>{
        const res = await axios.post('http://localhost:3080/signup',{users})
        .then((response:any )=> {
            return response.status;
        })
        // .catch((error:any) => {
        //     if (error.response) {
        //         //response status is an error code
           

        //         console.log(error.response.status);
        //     }
        //     else if (error.request) {
        //         //response not received though the request was sent
        
        //         console.log(error);
        //     }
        //     else {
           
        //         console.log(error.message);
        //     }
        // });
        return res;
    }

}