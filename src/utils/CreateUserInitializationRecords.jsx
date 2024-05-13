import { db } from '../firebase'
import { collection, doc, setDoc } from "firebase/firestore"; 

export const CreateUserInitializationRecords = async (id, firstName, lastName) => {
    const tablesArray = [
        'medal-1', 'medal-2', 'medal-3', 'medal-4', 'medal-5', 'medal-6', 'medal-7', 'medal-8', 'ips-1', 'ips-2', 'ips-3', 'ips-4', 'tubs-memorial', 'coc' 
    ]

    console.log('\n    Initializing User Data for: ', id, firstName, lastName)

    tablesArray.forEach( async (tab) => {
        let initScore = 200
        if (tab.slice(0,3) === 'ips') {
            initScore = 0
        } 

        console.log('\n   Creating table : ', tab, ", InitScore: ", initScore )
        const newTableRef = collection(db, tab)
        /* create a record in the newTable for each golfer in MIGS */
        await setDoc( doc(newTableRef, id), {
            firstName: firstName, 
            lastName: lastName,
            confirmed: false,
            score: initScore,
        })
    }) 
    console.log("\n     Done creating the different competition tables, now for the all-scores record...")
    
    const allScoresTableRef = collection(db, 'all-scores')
    await setDoc( doc(allScoresTableRef, id), {
        firstName: firstName, 
        lastName: lastName,
        scores : [
            {title: 'ips-1', score: 0},
            {title: 'ips-2', score: 0},
            {title: 'ips-3', score: 0},
            {title: 'ips-4', score: 0},
            {title: 'medal-1', score: 200},
            {title: 'medal-2', score: 200},
            {title: 'medal-3', score: 200},
            {title: 'medal-4', score: 200},
            {title: 'medal-5', score: 200},
            {title: 'medal-6', score: 200},
            {title: 'medal-7', score: 200},
            {title: 'medal-8', score: 200},
            {title: 'coc', score: 200},
            {title: 'tubs', score: 200}, 
        ]
    })
    console.log("\n     Done with all-scores table!!!")
}