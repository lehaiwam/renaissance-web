
import { db } from '../firebase'
import { collection, query, getDocs } from "firebase/firestore"; 
import { CreateUserInitializationRecords } from './CreateUserInitializationRecords';

export const InitializeAllMigsData = async () => {

    // read all data from migs
    const golfersArray = []
    const sourceTable = 'migs'
    const q = query(collection(db, sourceTable))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        console.log('MIGS table is empty? This can never be!!!')
        // setErrorMessage('MIGS table is empty? This can never be!!!')
        return
    } else {
        querySnapshot.forEach( async (docket) => {
            // docket.data() is never undefined for query doc snapshots
            // console.log(docket.id, " => ", docket.data().firstName, docket.data().lastName )
            golfersArray.push({
                id: docket.id, 
                firstName: docket.data().firstName,
                lastName: docket.data().lastName,
            })
        })
    }
    // console.log('Golfers: ', golfersArray)

    // create a record for each golfer in each of the competition games table
    golfersArray.forEach( async (golfer) => {

        CreateUserInitializationRecords( golfer.id, golfer.firstName, golfer.lastName )
    
    }) 
    console.log("\n     Done All MIGS data initialization!!!")
}
