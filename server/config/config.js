import dotnev from 'dotenv'

dotnev.config()  ;

const config =  {
    app : {
        PORT : process.env.PORT 
    } ,

    db : {
        MONGODB_URI : process.env.MONGODB_URI
    }
}

export default config ;



