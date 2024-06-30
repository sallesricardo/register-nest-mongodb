
type DBDriverParams = {
    driver: string
    host: string
    port: number
    user: string
    passwd: string
    database: string
}

export const app = {
    port: process.env.PORT,
}

export const mongoDB: DBDriverParams = {
    driver: 'mongodb',
    host: process.env.MONGODB_HOST || 'localhost',
    port: Number(process.env.MONGODB_PORT) || 27017,
    user: process.env.MONGODB_APP_ROOT || 'app',
    passwd: process.env.MONGODB_APP_PASSWORD || 'app',
    database: process.env.MONGODB_DATABASE || 'test',
}

export const databaseUri = (driverParams: DBDriverParams) => {
    const uri = `${driverParams.driver}://${driverParams.user}:${driverParams.passwd}@${driverParams.host}:${driverParams.port}/${driverParams.database}`
    console.log('databaseUri', uri)
    return uri
}

